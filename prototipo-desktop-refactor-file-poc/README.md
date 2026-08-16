# POC — Prototipo desktop modular con build por concatenación

Prueba de concepto para editar el prototipo desktop como **módulos `.jsx` separados** y
entregarlo igual como **un único HTML autocontenido**, sin Node, sin Python y sin servidor.

El entregable sigue abriéndose con doble click (`file:///`) y sigue funcionando copiado
crudo a IIS. Lo único que cambia es cómo se edita.

---

## 1. El problema que resuelve

| | Un solo HTML de 6.129 líneas | Módulos `.jsx` servidos con `src=` | **Este POC** |
|---|---|---|---|
| Abrir con doble click (`file:///`) | ✅ | ❌ CORS bloquea el fetch de Babel | ✅ |
| Deploy en IIS sin configurar nada | ✅ | ⚠️ requiere MIME para `.jsx` | ✅ |
| Editar / diffear por módulo | ❌ | ✅ | ✅ |
| Necesita runtime instalado | ❌ | ✅ (algún server) | ❌ |

La clave: los `.jsx` **nunca se sirven**. Se concatenan en tiempo de build y sólo se
publica el HTML resultante. Por eso no hay problema de CORS ni de MIME types, y por eso
las fuentes pueden conservar la extensión `.jsx` (mejor soporte del editor) sin costo.

---

## 2. Estructura

```
prototipo-desktop-refactor-poc/
├── build.cmd                     ← Windows. cmd.exe nativo, cero dependencias.
├── build.sh                      ← macOS / Linux. Mismo contrato, con `cat`.
├── Spota Prototipo Desktop.html  ← GENERADO. No editar.
└── src/
    ├── manifest.txt              ← orden de carga de los módulos
    ├── _head.html                ← <head>, CSS, CDNs y apertura del <script>
    ├── 01-tokens.jsx  …  19-app.jsx
    └── _tail.html                ← cierre del <script> y del documento
```

Los 19 módulos salieron de los bloques que el HTML original **ya tenía rotulados**
(`<!-- tokens.jsx -->`, `<!-- screens-discover.jsx -->`, …). El corte respeta esos límites
exactamente: no se movió ni una línea de código de lugar.

El prefijo numérico del nombre es el orden de carga, para que el orden del disco coincida
con el orden real de evaluación.

---

## 3. Cómo se usa

**Windows** — doble click en `build.cmd`, o desde consola:

```bat
build.cmd
```

Por dentro arma la lista y ejecuta un solo comando:

```bat
copy /b src\_head.html+src\01-tokens.jsx+ … +src\_tail.html "Spota Prototipo Desktop.html"
```

**macOS / Linux** — `./build.sh` (usa `cat`, sirve para probar fuera de Windows).

Para agregar un módulo: creá el `.jsx` en `src/` y sumá su nombre a `src/manifest.txt` en
la posición que corresponda. Los dos builds leen el mismo manifest, así que no hay dos
listas que puedan desincronizarse.

---

## 4. Reglas que hay que respetar

No hay bundler que las verifique. Son cuatro y son cortas:

1. **Nada de `import` / `export`.** Todo termina en un único scope global compartido,
   igual que hoy. Un módulo usa lo que declararon los anteriores, y listo.
2. **El orden importa.** No hay resolución de dependencias: `manifest.txt` *es* el grafo.
   Si `screens-discover` usa `PlaceCard`, `components` va antes. Siempre.
3. **Cada archivo termina con salto de línea.** `copy /b` concatena bytes crudos, sin
   agregar separadores: si un archivo no cierra con newline, su última línea se pega con
   la primera del siguiente.
4. **Nombres únicos en el top level.** Como todo comparte scope, dos `const Btn` en
   módulos distintos rompen la app. Ya era así antes del split, pero ahora es más fácil
   olvidarlo porque los archivos se ven aislados.

---

## 5. Verificación

Este POC se validó contra el original en `../prototipo-desktop/`:

- **Payload JS idéntico** — 5.724 líneas de código, byte a byte iguales al original
  (comparación ignorando los banners `// ==== NN-nombre.jsx ====` que agrega el split).
- **Sin redeclaraciones** — chequeadas todas las declaraciones top-level de los 19 módulos:
  ningún nombre repetido, así que fusionar los 19 `<script>` en uno solo es seguro.
- **DOM renderizado idéntico** — ambos archivos cargados en Chrome headless desde
  `file:///`; el árbol del `#app` sale igual en los dos.
- **Corre desde `file:///`** — verificado, sin servidor de por medio.

---

## 6. Qué NO resuelve

- **La duplicación mobile ↔ desktop.** Sigue habiendo dos design systems copiados. Este
  POC es sólo la mitad desktop; recién cuando el mobile esté partido igual se puede
  extraer un `00-design-system.jsx` compartido por los dos builds. Ahí está la ganancia
  grande de mantenibilidad.
- **El tiempo de compilación en el browser.** Babel sigue compilando ~5.700 líneas en cada
  F5. El split no lo cambia (de hecho ahora es un solo bloque en vez de 19, que si algo es
  marginalmente más rápido).
- **El versionado del artefacto generado.** El HTML generado hay que commitearlo igual,
  porque es lo que consume GitHub Pages. Va a aparecer en todos los diffs junto al `.jsx`
  que lo originó — ruido inevitable sin CI.
