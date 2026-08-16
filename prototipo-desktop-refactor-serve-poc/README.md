# POC v2 — Módulos servidos por HTTP con un server nativo del SO

Prueba de **factibilidad**, no un reemplazo del v1. La pregunta que responde:

> ¿Se puede levantar un servidor estático usando sólo lo que ya trae Windows/macOS,
> y servir los `.jsx` sueltos sin concatenar nada?

**Respuesta corta: sí, funciona.** Está verificado abajo. Pero tiene un costo que conviene
mirar antes de elegirlo — sección 5.

La diferencia con el v1 es dónde se unen los módulos:

| | v1 (`prototipo-desktop-refactor-poc`) | v2 (este) |
|---|---|---|
| Los módulos se unen… | en **build time**, con `copy /b` | en **runtime**, el browser baja 19 archivos |
| El HTML tiene… | un `<script>` con todo adentro | 19 `<script src="src/…">` |
| Para ver un cambio | correr `build.cmd`, abrir | apretar F5 |
| Para entregarlo | un archivo | una carpeta + un server |

---

## 1. Estructura

```
prototipo-desktop-refactor-poc-v2/
├── index.html         ← 19 <script type="text/babel" src="src/…"> en orden
├── serve.cmd          ← Windows: lanzador (doble click, saltea ExecutionPolicy)
├── serve.ps1          ← Windows: server real (System.Net.HttpListener)
├── serve.command      ← macOS/Linux: server (ruby → python3 → php)
└── src/               ← los mismos 19 módulos del v1, sin tocar
```

`src/` es una **copia** de la del v1 para que los dos POCs sean independientes y se puedan
comparar. Si alguna vez se adopta este esquema, hay una sola `src/` y los dos modos
—concatenar o servir— comen del mismo lugar.

## 2. Cómo se levanta

**Windows** — doble click en `serve.cmd` (o `serve.cmd 9000` para cambiar el puerto).
Abre `http://localhost:8002/` solo.

**macOS / Linux** — doble click en `serve.command`, o `./serve.command` desde la terminal.

Los dos servers mandan `Cache-Control: no-store`, así que editás un `.jsx`, apretás F5 y
ves el cambio. Ese es todo el atractivo de este esquema.

---

## 3. Qué se verificó (y qué no)

Probado de verdad, en esta máquina, con Chrome headless:

- ✅ **Babel carga los 19 módulos por HTTP y los ejecuta en orden.** Era la duda central:
  `type="text/babel"` con `src=` funciona, y respeta el orden de los tags.
- ✅ **DOM renderizado idéntico al original** de `../prototipo-desktop/`, comparado nodo a
  nodo. Igual resultado sirviendo con `ruby -run -e httpd` directo y vía `serve.command`.
- ✅ **El MIME no importa.** WEBrick devuelve los `.jsx` como `application/octet-stream` y
  Babel los procesa igual, porque los baja por XHR y usa el texto crudo. Esto explica por
  qué IIS también serviría, aunque conviene el MIME correcto igual.
- ✅ **Ruby está en macOS de fábrica**, PHP ya no (Apple lo sacó en macOS 12) y `python3`
  tampoco viene por defecto desde macOS 12.3. El orden de fallback del `serve.command`
  sale de eso, no de una preferencia.

**No probado — importante:**

- ⚠️ **`serve.ps1` no se pudo ejecutar acá**: esta máquina es macOS y no tiene `pwsh`
  instalado. El script está escrito conservador (HttpListener es API estándar de .NET) y
  contempla el error de permisos, pero **hay que probarlo en la máquina Windows real
  antes de confiar en él.** Es exactamente el escenario que preocupa.

---

## 4. La contraprueba: por qué el v1 existe

El mismo `index.html` abierto con doble click (`file:///`) **no renderiza nada**. Pantalla
en blanco. El error es literal:

```
Access to XMLHttpRequest at 'file:///…/src/01-tokens.jsx' from origin 'null'
has been blocked by CORS policy: Cross origin requests are only supported for
protocol schemes: chrome, chrome-extension, chrome-untrusted, data, http, https.
```

`file://` no está en la lista de esquemas permitidos, y no hay forma de agregarlo sin
flags de Chrome. No es un detalle configurable: es la razón entera de ser del v1.

---

## 5. Los riesgos reales en una máquina que no controlás

El v2 depende de poder **abrir un socket**, y eso es justo lo que una máquina de
universidad o corporativa restringe. Cuatro cosas pueden fallar, en orden de probabilidad:

1. **ExecutionPolicy.** Muchos Windows vienen en `Restricted` y no corren un `.ps1`.
   Por eso el `serve.cmd` invoca con `-ExecutionPolicy Bypass` — cubre el caso común,
   pero una política aplicada por GPO a nivel máquina puede ganarle igual.
2. **Reserva de la URL.** `HttpListener` puede tirar *Acceso denegado* al registrar el
   prefijo. Se arregla con `netsh http add urlacl` **desde una consola admin**, que es
   precisamente lo que no vas a tener. El script detecta este error y lo explica.
3. **Firewall.** Un proceso escuchando puede disparar el prompt de Windows Defender, que
   requiere credenciales de administrador para aprobarse.
4. **Puerto ocupado.** El menos grave: `serve.cmd 9000` y listo.

Ninguno de los cuatro aplica al v1, porque el v1 no escucha en ningún lado.

---

## 6. Veredicto

**Técnicamente factible, operativamente frágil.** Tu intuición era correcta: se puede
servir con shell-scripting nativo, y varía por plataforma pero se resuelve. Lo que no se
resuelve es el permiso para escuchar en un socket en una máquina ajena.

La forma sana de usar los dos no es elegir uno:

- **v2 para desarrollar.** F5 en vez de rebuild. Vale en tu máquina, donde los permisos
  son tuyos y el loop de edición importa.
- **v1 para entregar.** Un archivo, doble click, cero supuestos sobre la máquina de
  destino. Es lo que va a GitHub Pages, a IIS o a un pendrive.

Comparten la misma `src/`, así que no es mantener dos cosas: es la misma fuente con dos
salidas. Si `serve.ps1` falla en la máquina de la facultad, no perdiste nada — el v1 sigue
funcionando y ya está verificado.
