# Plan — Prototipo Desktop de Spota

Documento de trabajo. Define alcance, decisiones de diseño y fases de implementación para la versión desktop del prototipo, paralela al mobile actual.

---

## 1. Objetivo y restricciones

Implementar la versión **desktop** del prototipo, con paridad funcional al mobile y alineada a las decisiones consolidadas hasta hoy.

Se mantiene:
- Las 23 CUs definidas en `CLAUDE.md`.
- La paleta "Cercanía Local" y la tipografía DM Sans + Fraunces.
- Los diagramas de estado decididos: Proof of Visit en detalle de lugar (D8), wizard publicar de 3 pasos (D9), sub-máquina del host en plan grupal (D10).
- Las decisiones D1 a D10 ya consolidadas en `CLAUDE.md` y `entrega/justificacion-diseno.md`.

Se prohíbe:
- Rediseñar casos de uso.
- Agregar features que existan solo en desktop.
- Repensar la marca.

## 2. Ubicación y stack

```
prototipo-desktop/
├── Spota Prototipo Desktop.html     ← autocontenido, React 18 + Babel CDN
└── README.md                         ← cómo correr (python3 -m http.server 8001)
```

Mismo stack que el mobile. Decisión deliberada: prototipo independiente, no responsive del mismo archivo. Adaptar el mobile vía media queries terminaría forzando layouts; un prototipo nuevo permite repensar la composición con libertad sin contaminar el mobile estable.

Breakpoint objetivo: **1280 px o más**, con fallback razonable a 1024 px. Por debajo de 1024, mostrar aviso "abrí en mobile o ampliá la ventana".

## 3. Decisiones desktop fundamentales

| Mobile | Desktop |
|---|---|
| TabBar inferior con FAB central | TopNav fija arriba: logo + 4 ítems + buscador global + Avatar |
| Bottom sheets / pantallas full-screen para acciones cortas | Modales centrados con overlay (login, recover, nueva colección, crear plan) |
| Toggle Lista/Mapa en Discover | Dos columnas siempre: lista a la izquierda (60 %), mapa a la derecha (40 %) sticky |
| Wizards full-screen | Wizards en modal con stepper horizontal |
| Cards apiladas verticales | Grids de 3-4 columnas, hover con elevación |
| Sin hover (touch) | Estados hover en cards, botones, items de lista |
| Bottom nav permanente | Breadcrumb + back contextual |
| Scroll touch horizontal en chips | Chips visibles + flechas si hay overflow |

## 4. Transformación de pantallas

Las 31 pantallas actuales del mobile se mapean al desktop así:

| Pantalla mobile | Tratamiento desktop |
|---|---|
| Splash | Eliminada o reemplazada por landing pública |
| Welcome / Login / Register / Recover | Modales centrados sobre fondo de landing, ancho ~480 px |
| Preferences (onboarding) | Wizard en modal o página dedicada con stepper horizontal |
| **Discover (home)** | **Pivote del prototipo desktop.** Lista + mapa simultáneos, no toggle. Filtros chips arriba, hero card opcional |
| Detalle de lugar | 2 columnas: izquierda foto grande + info + CTA con sub-máquina; derecha reseñas + lugares cercanos |
| Detalle de colección | 2 columnas: cabezal + descripción a la izquierda, grid de lugares a la derecha |
| Crear colección | Modal con preview a un lado, formulario al otro |
| Mis colecciones | Grid 3 columnas |
| Plan (vote / close) | Tablero de 3 columnas: info plan / opciones con votos / asistencia + bloque de host |
| Marketplace de hosts | Grid de hosts a la izquierda, panel de detalle/oferta a la derecha |
| Crear oferta | Modal multi-paso |
| Dashboard de negocios | Layout tipo SaaS: sidebar izquierda + main + KPIs |
| Insights | Dashboard con filtros arriba + grid de gráficos |

## 5. Componentes

**Reutilizables 1:1 desde mobile:** `Icon`, `Tag`, `Btn`, `FamaScore`, `Avatar`, `ProofOfVisit`, `HostBlock`.

**Reutilizables con variante desktop:** `SearchBar` (más ancha, atajo de teclado `/`), `PlaceCard` (variante grid horizontal), `Field`.

**Nuevos:** `TopNav`, `Modal`, `Tooltip`, `ContextMenu`, `Breadcrumb`, `TwoColumnLayout`, `Sidebar` (para dashboards de negocio).

Estos componentes viven dentro del mismo HTML autocontenido del desktop. Si en una segunda fase se quiere consolidar mobile y desktop, se puede extraer un `design-system.js` común.

## 6. Documentación

A crear o actualizar:

- **Crear** `entrega/plan-desktop.md` (este archivo).
- **Crear** `entrega/justificacion-desktop.md` con las decisiones específicas de transformación de layout, hover, density, modales vs full-screen. Espejo de `justificacion-diseno.md`.
- **Actualizar** `CLAUDE.md`: agregar sección "Estado actual del prototipo desktop", decisión D11 ("Prototipo desktop como archivo separado, no responsive del mobile") y D12 ("Discover desktop = lista + mapa simultáneos, no toggle").

## 7. Fases de implementación

| Fase | Contenido | Estado |
|---|---|---|
| 1.A | Skeleton + design system + TopNav + UI Kit | Completada |
| 1.B | Discover desktop con lista + mapa simultáneos | Completada |
| 2 | Detalle de lugar + Colecciones + Detalle de colección | Completada |
| 3 | Publicar (3 pasos) + Planes + HostBlock | Completada |
| 4 | Marketplace de hosts + Crear oferta + Postulaciones + Registrar host + Dashboard | Completada |
| 5 | Negocios B2B (Registrar, Dashboard, Reclamar, Beneficios, Campañas, Insights) con BizFrame | Completada |
| 6 | Perfil de usuario + polish (hover unificado, micro-transitions) | Completada |

**Resultado:** prototipo desktop con paridad funcional sobre las 23 CUs. ~3000 líneas en un único HTML autocontenido. 22 pantallas implementadas + 1 página de referencia (UI Kit).

## 8. Riesgos y trade-offs

| Riesgo | Mitigación |
|---|---|
| Divergencia conceptual entre mobile y desktop | Tabla de equivalencias en `justificacion-desktop.md` |
| Tentación de "rediseñar" pantallas | Restricción explícita: las 23 CUs son las mismas, los diagramas de estado son los mismos. Solo cambia composición visual |
| Sobrecosto de mantener dos prototipos | Aceptable porque es entrega académica, no producción |
| Mapa funcional desktop más exigente | Reusar el SVG estilizado del mobile + zoom/pan adicional. Integrar Mapbox/Leaflet queda fuera de alcance |

## 9. Decisiones de scope tomadas

- Landing pública dentro del prototipo desktop como pantalla `landing` (refuerza la coherencia narrativa de la entrega).
- Skeleton primero (TopNav + paleta + 1 pantalla placeholder) antes de comprometer el shape de Discover.
- Login y recover viven como modales centrados, no como pantallas separadas.
