# Backlog — Spota

Items diferidos durante el prototipado, ordenados por categoría. No es un roadmap comprometido: es una lista de lo que queda servido para iteraciones futuras, con el racional suficiente para retomarlas sin perder contexto.

---

## 1. Pantallas pendientes — paridad mobile/desktop

### Mobile · `editProfile` (auxiliar de CU-04/05)
- **Estado:** falta. La vieja versión de `ScreenCredentials` mobile mezclaba Nombre / Email / Teléfono / Contraseña en una sola pantalla. Al alinear con el desktop (que separa `editProfile` para datos públicos y `credentials` para datos sensibles), Nombre y Teléfono quedaron sin lugar en mobile.
- **Acción sugerida:** crear `ScreenEditProfile` mobile con avatar + nombre + username + bio + zona, igual que el desktop. Acceso desde Perfil → Cuenta → "Editar perfil" (sumar entry).
- **Esfuerzo:** Bajo.

### Desktop — pantallas portadas durante Fase 7 (✅)

Las siguientes pantallas se portaron al desktop durante Fase 7 (commits `1d741b1`, `a2e8a05`, `68e1655`) y ya no están pendientes:

- ✅ `login` + `register` + `recover` + `welcome` (Fase 7.A)
- ✅ `createCollection` + `editProfile` + `credentials` (Fase 7.B)
- ✅ `preferences` + `myExperiences` (Fase 7.C)

---

## 2. Decisiones de UX abiertas

Decisiones discutidas pero no aplicadas todavía. Cuando se apliquen, se suman al `CLAUDE.md` como D-nuevo.

### ✅ Aplicado · Sacar "Perfil" del navbar desktop
- **Estado:** aplicado en commit `bf951b2..ea29a37` región (desktop).
- **Resultado:** el avatar en top-right es el único entry al perfil. Active state visual del avatar cuando estás en el área de perfil (`profile`, `preferences`, `credentials`, `editProfile`, `myExperiences`, `registerHost`, `hostDashboard`).
- **Razón:** el avatar es affordance universal. El navbar quedó más enfocado en producto (Descubrir / Colecciones / Planes).

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
- **Avatar dropdown en TopNav desktop.** Evaluado y descartado. El dropdown es estándar en SaaS (GitHub, Notion) porque el patrón mental es "login → trabajo → logout". Spota es consumer: el usuario explora y guarda, no hay sesión que pesee. El avatar como entry directo al Perfil es más simple y coherente con el mobile (que tampoco tiene dropdown). Si el producto agrega switchers de cuenta o multi-workspace, ahí sí ganaría sentido.
- **OAuth (Google / Apple) en Login y Register.** Evaluado y descartado para esta fase. En un prototipo conceptual son ruido visual: implican integración OAuth real, política de privacidad de proveedores, etc. El flujo email + password alcanza para mostrar el patrón.
- **"Sesiones activas" y "Privacidad" en Credenciales del desktop.** Existían como cards extras y se sacaron. Sesiones excede el alcance de CU-05; Privacidad no pertenecía al apartado de credenciales. Si Privacidad vuelve, debería vivir en Preferencias (pero la visibilidad ya se elige por reseña en el wizard de publicar, no requiere setting global).
- **Notificaciones en Perfil del desktop.** Se quitó (sección 3 de este backlog). No tiene equivalente en mobile ni CU asignado.
- **`ScreenSplash` mobile como pantalla separada del login.** Se eliminó (D15). El login con foto integrada cumple las dos funciones (presentación de marca + form) y ahorra un tap. El splash no vuelve.
- **Login mobile sobre crema con form centrado y botón volver al splash.** Reemplazado por el login con foto fullscreen integrada (D15). El back button al splash dejaba de tener destino y la composición original perdió su justificación.
- **Login desktop modo `centered` (form centrado sobre crema sin foto).** Existió temporalmente como alternativa al split durante el prototipo, accesible vía toggle. Se evaluó en A/B, ganó el split. El modo centered y el toggle se retiraron para no acumular código muerto. Si en el futuro se quiere reabrir el debate (por ejemplo con foto que no carga bien), el código vive en el historial de git.
