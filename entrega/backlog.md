# Backlog — Spota

Items diferidos durante el prototipado, ordenados por categoría. No es un roadmap comprometido: es una lista de lo que queda servido para iteraciones futuras, con el racional suficiente para retomarlas sin perder contexto.

---

## 1. Pantallas pendientes en el prototipo desktop

Estas pantallas existen en el mobile y todavía no se portaron al desktop. Hoy ruteán a `ScreenSoon` con label propio para no romper la navegación.

| Pantalla | CU | Origen del trigger | Esfuerzo |
|---|---|---|---|
| `login` + `register` + `recover` + `welcome` | CU-01, CU-02, CU-03 | Botón "Volver a entrar" en `loggedOut`. Hoy va a `home` (asume sesión activa). | Medio — modal centrado ~480 px, 4 vistas relacionadas |
| `createCollection` | CU-10 | Botón "Nueva colección" en `ScreenCollections`. | Bajo — modal con preview + form |
| `credentials` | CU-05 | Sección Cuenta del perfil. | Bajo — form simple |
| `editProfile` | (auxiliar de CU-04/05) | Botón "Editar perfil" del header del perfil. | Bajo — form de avatar + nombre + bio + zona |
| `preferences` | CU-04 | Sección Cuenta del perfil. | Medio — wizard si lo queremos coherente con onboarding mobile |
| `myExperiences` | CU-09 | Stats del perfil ("12 reseñas", "47 visitados"). | Medio — lista con visibilidad + edit |

**Plan sugerido (Fase 7):**
- **7.A — Auth desktop:** login + register + recover + welcome juntos. Cierra el loop de "Cerrar sesión → volver a entrar".
- **7.B — Acciones del perfil:** createCollection + editProfile + credentials. Formularios simples que comparten estructura.
- **7.C — Perfil completo:** preferences + myExperiences. Más opcional, puede diferirse.

---

## 2. Decisiones de UX abiertas

Decisiones discutidas pero no aplicadas todavía. Cuando se apliquen, se suman al `CLAUDE.md` como D-nuevo.

### D-pendiente · Sacar "Perfil" del navbar desktop
- **Estado:** acordado conceptualmente, falta aplicar.
- **Razón:** el avatar en top-right ya es entry al perfil; el ítem extra es redundante.
- **Trade-off resuelto:** se prefiere navbar más enfocado en producto (Descubrir / Colecciones / Planes) sobre redundancia accesible.

### D-pendiente · Avatar dropdown en TopNav
- **Estado:** debate abierto.
- **Pros:** consolida acciones (ver perfil, configuración, vista de negocio, cerrar sesión) en una sola affordance bien posicionada.
- **Contras:** añade complejidad; el click directo es más rápido para el caso "ir al perfil".
- **Decisión pendiente:** definir si conviene reemplazar el click directo por dropdown, o sumar dropdown solo al hover/right-click.

---

## 3. Features sugeridas, no priorizadas

Ideas que aparecieron durante el prototipado y quedaron fuera de alcance. Prioridad baja salvo que el product fit las traiga al frente.

- **Notificaciones.** Hub centralizado para invitaciones a planes, beneficios cercanos, mensajes de hosts. No existe en mobile, se quitó del desktop hasta que haya un modelo simétrico.
- **Centro de mensajes con host contratado.** Hoy la conversación es 0 → contratación. Falta el canal post-contratación.
- **Historial de pagos / facturas.** Para el usuario que contrata hosts y para el negocio que invierte en campañas.
- **Modo oscuro.** La paleta "Cercanía Local" tiene tono cálido sobre crema. Un dark mode coherente requiere repensar los grises y el rol del terracota.
- **Búsqueda global desde el TopNav desktop.** Hoy el campo en TopNav es visual; sin handler. Podría abrir un comand-palette estilo Linear con resultados unificados (lugares + colecciones + hosts).

---

## 4. Mejoras técnicas

Items de deuda técnica. No bloquean el prototipo, sí complican la transición a producción.

- **Extraer design system compartido.** Hoy mobile y desktop tienen su propia copia de tokens + Icon + Btn + FamaScore + HostBlock. Cuando se migre a producción, extraer un `design-system.js` (o paquete) compartido. Mientras tanto, cualquier cambio de token tiene que aplicarse en los dos archivos.
- **Pasar de HTML autocontenido a Vite + módulos `.jsx`.** El prototipo prioriza iteración rápida sobre pulcritud de código. Para producción, build con módulos, tree-shaking y CSS-in-JS o Tailwind real.
- **Mapa real en Discover.** El SVG estilizado del Palermo prototipo es deliberado para esta fase. Producción requiere Mapbox o Leaflet con geocoding real.
- **Tests E2E.** Playwright o similar sobre los flujos críticos: descubrir → detalle → publicar; crear plan → votar → cerrar; reclamar lugar → activar campaña.
- **Persistencia de estado.** Hoy todo se reinicia al refresh. Para demos largas conviene `localStorage` o un estado global (Zustand / Context).

---

## 5. Decisiones por escalar a la versión productiva

Decisiones de negocio o producto que el prototipo asume hardcodeadas y que requieren validación real antes de productivizar.

- **Política de comisiones del Marketplace de Hosts.** El copy dice 12 % en custodia. Definir el porcentaje real, condiciones de devolución, plazos.
- **Verificación real de Proof of Visit.** El doc fuente (`docs/Proof_of_Visit_Mecanismo_y_Flujo_de_Experiencia.md`) define el mecanismo: ventana temporal + checks puntuales de GPS + radio en zona urbana. Falta especificar tolerancias finales y el fallback EXIF.
- **Flow de pago en custodia.** "Contratar y pagar" es un placeholder. Definir pasarela (Mercado Pago, Stripe), reglas de liberación de fondos y disputas.
- **Verificación de negocios.** "Verificación 24-48 hs" es un copy. Definir el proceso operativo real de validación de titularidad.
- **Política de moderación de reseñas.** Quién valida si una reseña es válida, cómo se reporta, qué pasa con reseñas de hosts.

---

## 6. Cosas que se decidieron y no van

Para que el siguiente que lea esto no lo proponga de nuevo:

- **Marketplace de Hosts como entry directo desde Discover o Profile.** Decidido en D10: solo entra contextualmente desde un plan grupal. Sin plan de anclaje, contratar host no tiene contexto.
- **Estado "Pendiente" o "Cancelado" en la sub-máquina del host.** Decidido en D10: sin cancelaciones, todo o nada. La irreversibilidad le da peso a la decisión.
- **Paso de validación GPS en wizard de publicar.** Decidido en D9: eliminado. La validación es silenciosa en background, no en línea con la publicación.
- **Niveles del Fama Score como "Pro" / "Premium".** Decidido en D1: léxico barrial (Nuevo, Conocido, Habitué, Referente, Maestro). Evitar términos SaaS.
