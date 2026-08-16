# POC unificado — una fuente, dos salidas, un solo comando

Junta los dos POCs anteriores (`-file-poc` y `-serve-poc`) en uno. El problema que
resuelve no era tener dos modos: era tener **dos `src/`**. Acá hay una sola fuente y el
modo lo elige la máquina, no vos.

```
                    src/ + src/manifest.txt          <- lo unico que se edita
                              |
                    +---------+---------+
                    |                   |
              index.html          Spota Prototipo Desktop.html
         (etiquetas script+src)        (monolito autocontenido)
                    |                   |
              modo servidor         modo archivo
              F5 en caliente        file:/// e IIS, cero permisos
```

Los dos HTML son **generados**. Ninguno se edita a mano, así que no hay nada que se pueda
desincronizar: un solo `manifest.txt` manda sobre los dos.

---

## 1. Estructura

```
prototipo-desktop-refactor-unified-poc/
├── spota.command                 ← EJECUTAR (macOS / Linux)
├── spota.cmd                     ← EJECUTAR (Windows)
├── index.html                    ← GENERADO
├── Spota Prototipo Desktop.html  ← GENERADO
├── src/                          ← lo que se edita
│   ├── manifest.txt              ← orden de carga de los 19 modulos
│   ├── _head.html                ← <head>, CSS y CDNs (comun a los dos artefactos)
│   ├── _open.html / _close.html  ← apertura y cierre del script (solo monolito)
│   ├── _tail.html                ← cierre del documento (comun)
│   └── 01-tokens.jsx … 19-app.jsx
└── tools/                        ← interno, no se ejecuta a mano
    ├── build.sh / build.cmd
    └── serve.sh / serve.ps1
```

En la raíz hay **un solo script por plataforma**. Todo lo demás vive en `tools/` y se
invoca desde `spota.*`; no hay que elegir cuál correr.

El cascarón está partido en cuatro piezas justamente para que los dos artefactos compartan
`_head` y `_tail`, y sólo el monolito use `_open`/`_close`.

### Por qué `spota` y no `start`

`start` es un **comando interno de cmd**. Si el archivo se llamara `start.cmd`, tipear
`start` parado en la carpeta abriría una ventana nueva en vez de correr el script: el
builtin le gana al archivo del directorio actual. Funcionaría con doble click y tipeando
`start.cmd` completo, pero es una trampa silenciosa justo para quien prueba desde consola.
`spota` no colisiona con nada, y de paso el nombre dice de qué proyecto es.

## 2. Modos

| Comando | Qué hace |
|---|---|
| `spota.cmd` / `./spota.command` | Genera, levanta el server. **Si no puede, cae al archivo y lo abre.** |
| `… 9000` | Igual, en otro puerto |
| `… --serve [puerto]` | Sólo server, **sin** fallback — para diagnosticar por qué falla |
| `… --file` | Sólo generar y abrir el archivo |
| `… --output [ruta]` | Sólo generar, sin abrir nada |
| `… --help` | Los modos |

Doble click = modo default. En tu máquina levanta el server y tenés F5; en la de la
facultad, si el firewall lo bloquea, se abre el archivo y mostrás igual — sin que tengas
que saber de antemano cuál de los dos casos te tocó.

## 3. `--output`: semántica de rutas

```sh
./spota.command --output                     # los dos artefactos, aca
./spota.command --output ../dist             # solo el monolito -> ../dist/Spota Prototipo Desktop.html
./spota.command --output ../dist/demo.html   # solo el monolito -> ../dist/demo.html
./spota.command --output ../../prototipo-desktop   # publicar sobre el prototipo oficial
```

- **Relativas a donde estás parado**, no a donde vive el script.
- Si termina en `.html` es el nombre final; si no, es una carpeta y usa el nombre por defecto.
- **Crea los directorios que falten.** Es un output de build, no un archivo del usuario.
- Imprime la **ruta absoluta** de lo que escribió y sale con `0`. Encadenable.
- Si el archivo ya existía dice `Sobrescribi`, no `Generado`. Sobrescribe sin preguntar
  —es un build— pero te lo dice.
- **Emite sólo el monolito.** `index.html` necesita `src/` al lado; copiado a un destino
  arbitrario quedaría roto. Los dos artefactos no son igual de portables, y esa asimetría
  es la que define qué se exporta.

## 4. Cómo se decide el fallback

El punto delicado: `serve` **bloquea** mientras corre, así que "el script terminó" es
ambiguo — puede ser que falló al arrancar, o que apretaste Ctrl+C después de una sesión
normal. Si no se distingue, cada vez que cortás el server se te abre una ventana de
browser al pedo.

Se resuelve con un **código de salida dedicado: `3` = no pude levantar**. `spota.*` cae al
archivo *sólo* con 3; cualquier otro código significa que el server sí corrió.

Ese 3 se decide en dos capas:

1. **Pre-chequeo de bind, antes de arrancar.** Es la autoridad principal: es la única forma
   de saberlo sin ambigüedad. En Windows es el `try/catch` sobre `HttpListener.Start()`;
   en macOS/Linux, un bind de prueba.

   Con una trampa que costó encontrar: `TCPServer.new` activa `SO_REUSEADDR`, y en BSD/macOS
   eso **deja bindear `127.0.0.1` aunque haya alguien escuchando en `0.0.0.0`** del mismo
   puerto. El pre-chequeo ingenuo daba falso negativo y el fallback nunca se disparaba. Hay
   que bindear la misma dirección que va a usar el servidor y con `REUSEADDR` en 0.

2. **Heurística de duración, como red de seguridad.** Si el server sale con error en menos
   de 3 segundos, no llegó a arrancar. Si duró más, arrancó bien y su salida no es motivo
   de fallback. Eso deja el Ctrl+C afuera sin depender de qué código devuelve cada runtime
   —que, comprobado, no es parejo entre ruby, python3 y php.

---

## 5. Qué se verificó

Probado en esta máquina (macOS), con Chrome headless contra `../prototipo-desktop/`:

- ✅ **Monolito: payload JS idéntico** al original, 5.724 líneas byte a byte.
- ✅ **Modo servidor: DOM renderizado idéntico** al original.
- ✅ **Modo archivo (`file:///`): DOM renderizado idéntico** al original.
- ✅ **Fallback real:** con el puerto ocupado, detecta, avisa y abre el archivo. Exit 0.
- ✅ **Sin falso positivo:** en un puerto libre arranca el server normal.
- ✅ **`--output` en sus tres formas** (carpeta anidada inexistente, nombre `.html`,
  sobrescritura), resolviendo contra el cwd del usuario y sin ensuciar la carpeta del POC.

**No probado:**

- ⚠️ **Nada del lado Windows se ejecutó acá**: esta máquina es macOS, sin `cmd` ni `pwsh`.
  Eso cubre `spota.cmd`, `tools\build.cmd` y `tools\serve.ps1`.
- ⚠️ **`serve.ps1` fue probado en Windows, pero antes de mudarse a `tools\`.** Al bajarlo
  una carpeta hubo que cambiar cómo resuelve `$rootFull`, que además es el guard de path
  traversal: si apunta mal, el servidor sirve la carpeta equivocada. Esa edición **no está
  probada**; conviene mirar la línea `Sirviendo :` al arrancar y confirmar que dice la raíz
  del prototipo y no `...\tools`.
- Los `.cmd` están escritos evitando bloques `( )` alrededor de rutas —un path con
  paréntesis, el clásico `Program Files (x86)`, cierra el bloque antes de tiempo— pero eso
  es cuidado al escribir, no verificación.

## 6. Qué sigue

- Correr `spota.cmd` en Windows y confirmar los tres modos.
- Si anda, esto reemplaza a `prototipo-desktop/` y pasa a llamarse `prototipo-desktop-v2`.
  Los dos POCs viejos quedan obsoletos.
- Recién después: partir el mobile igual y extraer un `00-design-system.jsx` compartido.
  Ahí está la ganancia grande — hoy la paleta vive duplicada en dos archivos de 6.000
  líneas que pueden divergir en silencio.
