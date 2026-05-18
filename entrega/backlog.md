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
- **Command palette global (cmd+K) en desktop.** Después de retirar el buscador permanente del TopNav (D18), si en el futuro se necesita un atajo de búsqueda accesible desde cualquier pantalla, el patrón correcto es un command palette estilo Linear con resultados unificados (lugares + colecciones + hosts), no reintroducir el campo persistente. Disparable con `cmd+K` / `ctrl+K` y un ícono discreto en el TopNav.
- **`interpretQuery` real con LLM.** El parser heurístico actual reconoce ~6 dimensiones por keyword matching y alcanza para el prototipo. La versión productiva debería pasar la query a un modelo (Claude / GPT) que devuelva el mismo schema (`ambiente`, `compania`, `momento`, `categoria`, `zona`), con tolerancia a errores de tipeo, sinónimos y combinaciones que el heurístico no cubre. La UI no cambia: `IntentChips` consume el mismo objeto.

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
- **Flow de pago en custodia.** El prototipo ya implementa la UI del flow (resumen pre-pago + paywall Variante A reutilizable + confirmación post-cobro + custodia visible) tras la Sesión B 2026-05-18. Falta lo no-visual: pasarela real (Mercado Pago, Stripe), reglas de liberación de fondos, disputas y reembolsos.
- **Verificación de negocios.** "Verificación 24-48 hs" es un copy. El prototipo agrega indicadores visuales de "validación contra padrón externo" y "cobro testigo" en `bizRegister` (Sesión B 2026-05-18), pero el proceso operativo real (qué padrón, qué fallback manual, SLA de moderación) sigue por definir.
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
- **Feed de recomendaciones por default en Discover.** El home anterior pusheaba 12 cards (Hero "Café Cobrand" + secciones "Para vos / Cerca tuyo / Más para descubrir") sin que el usuario hubiera expresado intención. Decidido en D18: contradice la tesis del producto ("interpreta intención") y vuelve a Spota visualmente equivalente a TripAdvisor. El feed migró a `searchResults`, que ahora es la pantalla pivote del descubrimiento. No vuelve.
- **Buscador permanente en el TopNav desktop.** Existió como input chico con shortcut `/` arriba de cada pantalla. Decidido en D18: una vez que el input del home pasó a ser hero, el TopNav search competía contra el protagonista. La interacción correcta es ir al home (botón "Descubrir") y expresar intención ahí, no tener un campo siempre encendido. Si más adelante se necesita un atajo global, va por command palette (sección 3 del backlog), no por el campo persistente.
- **Chips hardcoded en SearchResults (`['Palermo','Tranquilo','Café','Abre ahora']`).** Aparecían siempre, no reflejaban la query del usuario. Reemplazados en D18 por `IntentChips` derivados de `interpretQuery(query)`. No vuelve la versión hardcoded ni siquiera como fallback: si el parser no detecta nada, no hay chips.

---

## 7. Implementaciones aplicadas en Sesión B (2026-05-18)

Bloque cerrado tras la auditoría de CUs del TP (registro original: `Apunte_tech/docs/iteracion-cu/pendientes-prototipo.md`, 22 items en 🟢 Implementado). Se documenta acá porque el repo de `spota raw` es la fuente de verdad del prototipo; el registro del TP se conserva separado para preservar trazabilidad CU↔ítem. Todos los cambios viven en `prototipo/Spota Prototipo.html` (mobile) y `prototipo-desktop/Spota Prototipo Desktop.html` (desktop).

### 7.1 Onboarding y Auth (CU-001-002 · CU-001-004 · CU-001-005)
- **Pantalla nueva `verifyCode`** intercalada entre `login` y `home` — input numérico de 6 dígitos, contador de 5 min de vigencia, reenvío deshabilitado 30 s, estados visuales: vacío / completo / inválido / vencido / bloqueado (3 intentos). Mobile + Desktop.
- **5to paso opcional en wizard `preferences`:** "Restricciones alimentarias y de accesibilidad" con multi-select sobre Vegetariano / Vegano / Sin gluten / Sin lactosa / Movilidad reducida / Sin restricciones + botón "Saltar". Mobile + Desktop.
- **Email solo lectura en `credentials`:** el botón "Cambiar" se reemplazó por la leyenda "Solo lectura". El cambio de email queda fuera del MVP.

### 7.2 Colecciones (CU-004-002)
- **Pantalla nueva `collectionsFilter`** con dos selectores obligatorios (Ámbito · Actividad). Es la pantalla previa al feed cuando se entra desde el tab "Colecciones". El deep link desde Perfil → "Mis colecciones" la saltea pre-aplicando Ámbito = Mías + Actividad = Todas.
- **Refactor del header de `collections`:** los chips Mías / Guardadas / Comunidad se reemplazaron por un resumen de filtros activos ("Comunidad · Café") + botón "Cambiar filtros" + "+" Nueva siempre visible.
- **Cards del feed:** indicador "X de Y matchean" y tag "Guardada" condicionales según ámbito + actividad activa.
- **`collectionDetail`:** contador "X de Y matchean tu filtro: actividad" en header, borde primario + badge "Coincide con: actividad" en PlaceCards matcheadas, los no matcheados aparecen atenuados debajo, y botón "Guardar colección" visible cuando la colección no es propia y aún no está guardada.
- **Helpers compartidos en ambos prototipos:** `SCOPE_OPTIONS`, `ACTIVITY_OPTIONS`, `CAT_TO_ACTIVITY`, `matchesActivity`, `collectionMatchCount`, `collectionIsSaved`, `collectionIsMine`, `collectionInScope` — fuente única para evitar drift.

### 7.3 Marketplace de Hosts (CU-006-002 · CU-006-004)
- **Refactor de `hostDashboard`:** cards mínimas (título / autor / fecha / personas / barrio / presupuesto por persona) sin botón inline ni valoración del solicitante. El click abre un **modal de detalle** con avatar + Fama Score como anfitrión + descripción + datos del evento + cantidad de postulados + botón "Postularme" / "Retirar postulación". Validaciones de vigencia al abrir el modal, no al postularse.
- **Sub-flujo de contratación de Host en `hireHost`:** Resumen pre-pago (modal con propuesta por persona, participantes, monto total, comisión 15 %, neto al host) → **Paywall Variante A** (tarjeta + facturación + "guardar para próxima vez") → Confirmación post-cobro (comprobante + custodia activa + redirect a Planes).
- **`PaywallVariantA` como componente reutilizable** exportado a `window` y consumido también desde Campañas y futuros CUs con cobro al usuario.

### 7.4 Negocios B2B (CU-007-002 · CU-007-003 · CU-007-004 · CU-007-005 · CU-007-006)
- **Refactor significativo de `bizRegister`** a wizard de 4 secciones: Identidad → Dirección + validación contra padrón externo → Facturación (IVA + comprobante + email) → Medio de pago + cobro testigo. Indicadores visuales de validación y cobro testigo en estado pending / running / ok. Modalidad de pago inicial = One-off.
- **Refactor de `bizBenefits`** a wizard de 5 pasos con ~13 campos estructurados según el tipo de beneficio (Descuento / Cortesía / Promo Nx1 / Combo / Acceso preferencial). Vigencia desde-hasta + "Sin vencimiento", días aplicables como chips, horario opcional, monto mínimo, medios de pago multi-select, cupo por usuario, términos adicionales.
- **Refactor de `bizCampaign`:** se sumó "Nombre de la campaña" (máx 60 car.), el set de chips se unificó con Insights (Café / Cena / Trago / Arte y cultura / Trabajo nómade / Tarde con amigos / Cita romántica / Deporte) y se agregó selector de formato (Card destacada en feed / Banner superior). Antes de "Lanzar campaña" se aplica **Paywall Variante B inline** (medio configurado + opción de cambiar → dispara Variante A).
- **`bizInsights` rediseñado como pantalla de filtros obligatorios** (Período / Tipo de actividad / Segmento de audiencia / Comparativa). Sin capa gratuita — el negocio paga por reporte (One-off) o tiene Tier vigente. Toggle visual de modalidad incluido en el prototipo.
- **Modal de cobro de reporte** (importe en `$#######`, medio configurado, opción de cambiar, confirmar) que solo aparece en modalidad One-off.
- **Pantalla nueva `bizInsightsResult`** con tráfico por día, tendencias en zona, perfil de audiencia detallado por segmento, bloque de comparativa cuando aplica + funcionalidades satélite (Exportar PDF/CSV · Guardar configuración como preset · Configurar alerta — esta última deshabilitada en One-off con CTA a Tier).
- **Pantalla nueva `bizSubscribe`** con comparativa Mensual / Anual, beneficios listados, precio en formato `$#######`, descuento explícito por compromiso anual, resumen del cobro con próxima renovación y aceptación de términos.

### 7.5 Items que dejan de estar diferidos por estas implementaciones
- "Flow de pago en custodia" (§5): la UI completa del flow está implementada; lo pendiente es la pasarela real (nota actualizada en §5).
- "Verificación de negocios" (§5): los indicadores visuales del proceso están implementados; pendiente el proceso operativo real (nota actualizada en §5).

### 7.6 Estado de sincronización
- `Apunte_tech/docs/iteracion-cu/pendientes-prototipo.md` queda con los 22 items en 🟢 Implementado.
- Esta sección absorbe el registro como log de cambios del prototipo; las decisiones de CU que originan cada cambio están en `Apunte_tech/docs/iteracion-cu/propuestas_mejora_cu.md` §3.

## 8. Roadmap del audit `prototipo_vs_cu.md` — items aplicados y diferidos

Sesión B cerró el audit aplicando **36/42 items** (P0 5/5, P1 11/11, P2 13/14, P3 7/12). Los 6 ítems restantes quedan acá como referencia explícita:

### 8.1 Items diferidos del audit (con razón)

- **Audit #31 · home queries recientes/populares** — feature add: panel con últimas búsquedas + populares en zona. Suma valor pero **no es canónico del CU-006-001**, por eso no se aplica.
- **Audit #33 · searchResults empty state Alt 4** — feature add: cuando la query no devuelve ningún resultado, mostrar copy de "Probá relajar criterios" + chips de la query original para des-tildar.
- **Audit #34 · searchResults IntentChips editables uno a uno** — feature add: hoy las chips son lectura (badges "entendí esto: ambiente · tranquilo · zona · Palermo"). El refinamiento se hace re-escribiendo la query. Permitir tap-to-toggle por chip levantaría afinación granular del filtro.

### 8.2 Resueltos durante Sesión B (que aparecían como diferidos en versiones previas del backlog)

- ~~Audit #21 · `myExperiences` desktop tab "Reseñas comunidad"~~ → resuelto **eliminando** la sección legacy de mobile + `ScreenRateCommunity` + route `rate`. CU-003-002 ⚪ Absorbido en CU-003-001 (la valoración pasa a ser implícita silenciosa dentro de publish).
- ~~Audit #35 · `placeDetail` dirección/horario/chips temáticos~~ → sumados los tres campos en mobile + desktop bajo CU-006-002 §3.15.
- ~~Audit #41 · `uikit` page sync con D11-D18~~ → mobile sumó D4-D7 y D11-D18; desktop estrena sección "Decisiones de diseño" con D1-D18 completas.

### 8.3 Estado de los servidores
- Mobile `python3 -m http.server 8000` desde `prototipo/`.
- Desktop `python3 -m http.server 8001` desde `prototipo-desktop/`.
- Ambos en 200 al cierre de Sesión B; balance de llaves/paréntesis verificado.
