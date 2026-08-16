# Prototipo mobile v2 — una fuente, dos salidas, un solo comando

Mismo esquema que `../prototipo-desktop-v2/`: los 13 módulos del prototipo se editan
sueltos en `src/`, y de ahí salen dos artefactos generados. El modo lo elige la máquina,
no vos.

```
                    src/ + src/manifest.txt          <- lo unico que se edita
                              |
                    +---------+---------+
                    |                   |
              index.html          Spota Prototipo.html
        (13 modulos por HTTP)      (monolito autocontenido)
                    |                   |
              modo servidor         modo archivo
              F5 en caliente        file:/// e IIS, cero permisos
```

## 1. Estructura

```
prototipo-v2/
├── spota.command                 ← EJECUTAR (macOS / Linux)
├── spota.cmd                     ← EJECUTAR (Windows)
├── index.html                    ← GENERADO
├── Spota Prototipo.html          ← GENERADO
├── src/                          ← lo que se edita
│   ├── manifest.txt              ← orden de carga de los 13 modulos
│   ├── _head.html                ← <head>, CSS y CDNs
│   ├── _open.html / _sep.html / _close.html   ← apertura, separador y cierre
│   ├── _bootstrap.html           ← el motor que evalua los modulos (ver §3)
│   ├── _index_note.html          ← comentario del index.html (ver §3, nota del `!`)
│   ├── _tail.html
│   └── 01-ios-frame.jsx … 13-app.jsx
└── tools/                        ← interno, no se ejecuta a mano
    ├── build.sh / build.cmd
    └── serve.sh / serve.ps1
```

Puerto por defecto **8000** (el desktop v2 usa 8002, así que pueden correr en paralelo).

## 2. Modos

| Comando | Qué hace |
|---|---|
| `spota.cmd` / `./spota.command` | Genera, levanta el server. **Si no puede, cae al archivo y lo abre.** |
| `… 9001` | Igual, en otro puerto |
| `… --serve [puerto]` | Sólo server, **sin** fallback — para diagnosticar |
| `… --file` | Sólo generar y abrir el archivo |
| `… --output [ruta]` | Sólo generar, sin abrir nada |
| `… --help` | Los modos |

`--output` se comporta igual que en el desktop: rutas relativas a donde estás parado,
`.html` = nombre / si no = carpeta, crea directorios faltantes, imprime la ruta absoluta,
avisa `Sobrescribi` cuando pisa, y emite **sólo el monolito** (el `index.html` necesita
`src/` al lado, así que no es portable).

---

## 3. En qué se diferencia del desktop

El mobile **no** es una copia del desktop con otro contenido. Tiene una arquitectura de
carga propia, y hay que respetarla.

### Cada módulo va en su propio `<script>`

En el desktop los 19 módulos se concatenan dentro de **un solo** `<script>`. Acá no: cada
módulo va en su propio bloque, separados por `src/_sep.html`.

No es cosmético. El mobile trae un **bootstrap propio** que evalúa cada módulo con `eval`
indirecto, o sea **cada uno en su propio scope**. Lo que se comparte entre módulos es lo
que cada uno publica a mano con `Object.assign(window, {...})` — hay 13 de esos en el
código. Fusionar los bloques rompería ese aislamiento.

Y rompería de verdad, no en teoría: **`TabBar` está declarado dos veces**, en
`05-components.jsx` (versión vieja, con props `{active, onChange, onPublish}`) y en
`13-app.jsx` (la que se usa, con `{current, nav}`). La primera se exporta a `window` pero
**no la usa nadie**: es código muerto de una iteración anterior. Con scopes aislados
convive sin problema; en un scope compartido tira
`Identifier 'TabBar' has already been declared` y se cae la app entera.

Se dejó como está. Limpiarla es una decisión sobre el prototipo, no sobre el build.

### `type="text/spota-jsx"` en vez de `text/babel`

Cambiar ese atributo arregló un **bug latente que el mobile ya tenía**.

Babel standalone corre solo los scripts `text/babel` y `text/jsx`, inyectándolos como
`<script>` reales — que **comparten** el scope léxico global. Con el HTML original pasaba
esto, en este orden:

1. Babel arranca solo, procesa los bloques, choca con el `TabBar` duplicado y tira
   `Uncaught SyntaxError: Identifier 'TabBar' has already been declared`.
2. Recién ahí corre el bootstrap propio, que con sus scopes aislados evalúa todo bien.

O sea: **funcionaba, pero ejecutando dos veces y dejando un error rojo en consola.**
Verificado cargando `../prototipo/Spota Prototipo.html` y leyendo la consola.

Con un `type` propio, Babel los ignora y los módulos se evalúan una sola vez, en el
bootstrap. El error desapareció y el DOM renderizado quedó idéntico.

### El bootstrap ahora también baja módulos externos

Es la única pieza que se tocó, y era necesaria: el bootstrap original leía
`s.textContent`, que viene **vacío** en un `<script src>`. Sin eso, el modo servidor no
podía funcionar. Se le agregó bajar los externos con `fetch` (en paralelo, pero
evaluándolos en el orden de los tags, que `Promise.all` conserva).

Gracias a eso los dos artefactos usan **el mismo motor**: no hay un camino de ejecución
para el archivo y otro para el servidor.

---

## 4. Qué se verificó

Probado en esta máquina (macOS), con Chrome headless contra `../prototipo/`:

- ✅ **Payload JS idéntico** al original: 6.063 líneas de código, byte a byte.
- ✅ **Modo archivo (`file:///`): DOM renderizado idéntico** al original (44.528 bytes).
- ✅ **Modo servidor: DOM renderizado idéntico** al original, con los 13 módulos servidos.
- ✅ **Consola limpia en los dos modos** — sin el `SyntaxError` que sí tiene el original.
- ✅ **Fallback real:** con el puerto ocupado, detecta, avisa y abre el archivo.
- ✅ **`--output` en sus tres formas**, resolviendo contra el cwd del usuario.

**No probado:**

- ⚠️ **Nada del lado Windows se ejecutó acá** (macOS, sin `cmd` ni `pwsh`): `spota.cmd`,
  `tools\build.cmd` y `tools\serve.ps1`. Los dos últimos son casi idénticos a los del
  desktop v2, que sí probaste y andan; la diferencia real está en `build.cmd`, que acá
  intercala `_sep.html` entre módulos. Vale la pena mirar que el monolito generado en
  Windows tenga **13** bloques `<script type="text/spota-jsx">` y no uno solo.

## 5. Qué sigue

Con mobile y desktop partidos igual, queda servido lo que motivó todo esto: extraer un
**design system compartido**. Hoy la paleta y los primitives viven duplicados —
`03-tokens.jsx` acá y `01-tokens.jsx` en el desktop — y un cambio de color son dos
ediciones que pueden divergir en silencio.

Ojo con una asimetría al hacerlo: el desktop comparte scope entre módulos y el mobile los
aísla. Un módulo común tiene que funcionar en los dos, así que conviene que publique lo
suyo con `Object.assign(window, {...})`, que es el mecanismo que sirve para ambos.
