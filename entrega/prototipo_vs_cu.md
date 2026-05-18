# Prototipo vs CUs — auditoría por pantalla (v2)

> Auditoría exhaustiva pantalla por pantalla de los dos prototipos. Cruza el flujo principal y los caminos alternativos de cada CU canónico contra los elementos reales de la UI, mide alcance navegacional (¿se llega haciendo click?), funcionalidad de los formularios (¿persiste el estado al tipear?) y handlers de botones (¿hay onClick real?).

**Fecha:** 2026-05-18 · post-Sesión B (22 ítems aplicados) + 10 fixes correctivos.
**Cobertura:** 34 ids de pantalla únicos · 64 audits individuales (mobile + desktop).
**Reemplaza:** versión v1 (auditoría por CU, demasiado superficial).

**Fuentes:**
- Canónico de CUs: `Apunte_tech/docs/iteracion-cu/propuestas_mejora_cu.md` §3.1 a §3.26.
- Criterios transversales: `Apunte_tech/docs/iteracion-cu/criterios_cu_transversales.md`.
- Mobile: `prototipo/Spota Prototipo.html` (este repo).
- Desktop: `prototipo-desktop/Spota Prototipo Desktop.html` (este repo).

---

## 1. Metodología y limitaciones

Cada pantalla se audita en **6 dimensiones**:

1. **Registro y ubicación** — componente `Screen*` y entrada en `SCREENS` (mobile array / desktop map).
2. **Inbound** — ¿desde qué pantalla(s) se llega haciendo click? Se enumera cada `nav('<id>')` que apunta acá, con su contexto (botón / link / acción). Si no hay inbound: **ORPHAN**.
3. **Outbound** — ¿adónde se puede ir desde acá? Cada `nav()` del componente con su trigger.
4. **Form fields** — para cada input/Field/Chip: ¿hay `value` controlled + `onChange` que persiste estado? Si usa `value="X" onChange={() => {}}` o `defaultValue` sin onChange y la lógica downstream lo necesita → **DEAD INPUT**.
5. **Buttons** — para cada `<Btn>` / `<button>`: ¿hay `onClick` funcional? Si no → **DEAD BUTTON**.
6. **Cobertura del CU** — paso por paso del flujo principal + caminos alternativos del §3.X canónico.

**Severidad de issues:**
- **P0** — bloqueante: el flujo principal del CU no se puede completar.
- **P1** — crítico: el flujo se puede completar pero con bugs visibles (botón hace lo equivocado, input muerto en un campo importante).
- **P2** — medio: alt no implementado, falta validación, asimetría mobile/desktop.
- **P3** — menor: gap cosmético, feedback de éxito ausente, copy desalineado.

**Limitación principal:** la auditoría se hizo por lectura estática del código de ambos prototipos. Lo verificable es: navegación (cadenas `nav()`), state lifting (props `value`/`onChange`), handlers (`onClick`), cobertura paso-a-paso. **No verificable estáticamente:** overflow visual, errores runtime, regresiones CSS. Esos se ven navegando en navegador.

---

## 2. Resumen ejecutivo

### Conteo por veredicto

| Bloque | Pantallas | ✅ | ⚠️ | ❌ |
|---|---|---|---|---|
| Auth y Onboarding | 6 | 0 (M) / 0 (D) | 4 / 4 | 2 / 2 |
| Descubrimiento | 4 | 2 / 2 | 1 / 1 | 0 / 0 (1 ORPHAN justificado) |
| Experiencias + Colecciones | 6 | 2 / 2 | 4 / 4 | 0 / 0 |
| Planes grupales | 4 | 2 / 2 | 2 / 2 | 0 / 0 |
| Marketplace de Hosts | 5 | 3 / 3 | 2 / 2 | 0 / 0 |
| Negocios B2B | 8 | 6 / 6 | 2 / 2 | 0 / 0 |
| Perfil y misc | 4 | 2 / 2 | 1 / 1 | 0 / 1 (welcome ORPHAN runtime) |

**Total:** 37 pantallas únicas; ~17 con veredicto ✅, ~16 con ⚠️, **4 con issues bloqueantes** (`credentials` ambos, `recover` ambos por inputs muertos; `welcome` desktop ORPHAN).

### TOP issues bloqueantes (P0)

1. **`credentials` mobile y desktop** — todos los inputs son DEAD (`Field value="" onChange={() => {}}` mobile; `FormField` sin `value/onChange` desktop). Los 2 CTAs ("Actualizar contraseña", "Eliminar cuenta") tampoco tienen `onClick`. La pantalla es 100% mockup; CU-001-005 no se puede ejecutar.
2. **`recover` mobile y desktop** — el input de email es DEAD en ambos (mobile: `onChange={() => {}}`; desktop: `AuthField` sin props de estado). El usuario no puede tipear su email. Solo cubre los pasos 1-9 del CU §3.12; los pasos 10-21 (reset efectivo) no tienen pantalla.
3. **Desktop `Btn` ignora la prop `disabled`** — afecta a `register` (CTA "Crear cuenta") y `verifyCode` (CTA "Verificar y continuar") desktop. El gate de validación es decorativo: click sin completar avanza igual. Bug del design system desktop.
4. **`welcome` desktop ORPHAN en runtime** — `App` arranca en `home` (línea 5667), no en `welcome`. La única forma de llegar es dev-tools. La landing pre-auth no existe operativamente.

### TOP issues críticos (P1)

5. **Desktop `placeDetail` botones rotos** — "Publicar experiencia" no abre el wizard (hace `setVisitState('published')` local en lugar de `nav('publish')`); "Ver tu reseña" navega a `home` en lugar de `myExperiences`. Mobile sí funciona en ambos.
6. **Desktop `login` AuthFields sin `value`/`onChange`** — el usuario tipea pero el sistema nunca sabe qué tipeó. Al hacer click "Iniciar sesión", se navega con state vacío.
7. **`collectionDetail` botón "Guardar colección" sin onClick** — ambos prototipos. La condición de visibilidad `showSaveBtn` está bien (visible solo si `!isMine && !isSaved`), pero el botón es decorativo.
8. **`createCollection` redirect equivocado** — ambos prototipos redirigen a `collections` en lugar de `collectionDetail` de la nueva (CU-004-001 §3.18 paso 19).
9. **`publish` redirect equivocado** — ambos redirigen a `home` en lugar de `placeDetail` con la reseña visible (CU-003-001 paso 33).
10. **Id divergente `claim` (mobile) vs `claimPlace` (desktop)** — único caso del bloque B2B.
11. **`createOffer` 5 form fields DEAD** — descripción, fecha, horario, zona en ambos prototipos. El usuario solo puede mover sliders.
12. **`registerHost` 4 form fields DEAD** — zona, tipo de experiencia, credencial, portfolio. Ambos prototipos.
13. **Mobile `createPlan` paso 2 fechas DEAD** — Fecha y Hora con `onChange={() => {}}`. Apariencia editable pero inerte.
14. **`hostMarketplace` mobile back va a `profile`** — rompe la lógica D10 (debería volver a `plans` o al plan origen).

### Hallazgos transversales

- **Patrón recurrente de DEAD inputs:** `value="X" onChange={() => {}}` aparece en `createPlan`, `planClose`, `createOffer`, `registerHost`, `claim`, `credentials`, `recover` y otros. Suelen ser placeholders visuales que se hicieron al armar el mockup y nunca se cablearon. Total: **~25 inputs muertos** en el prototipo combinado.
- **Patrón recurrente de DEAD buttons:** `<Btn>...</Btn>` sin `onClick` en `placeDetail` (Share/Heart/Guardar/Editar), `collectionDetail` (Guardar/Compartir), `bizHome` desktop (Editar perfil), `bizInsightsResult` (Exportar/Guardar preset/Configurar alerta), `editProfile` desktop (Cambiar/Quitar foto), `credentials` (Actualizar/Eliminar), `hostMarketplace` (Ver perfil), `bizBenefits` (edit/trash de cards). Total: **~25 botones sin handler**.
- **Toasts de feedback de éxito ausentes** sistemáticamente: `preferences`, `credentials`, `createCollection`, `planClose`, `createOffer`, `publish`, `registerHost`. La transición es siempre "click → nav directo", sin confirmación visible.
- **Formatos canónicos no respetados de manera uniforme:** fechas `DD/MM/AAAA` y horas `HH:MM` aparecen como lenguaje natural ("Sáb 17 de mayo", "20:30 hs") en `createPlan`, `planClose`, `createOffer`.

---

## 3. Tabla maestra

| # | Pantalla | Mobile | Desktop | Veredicto global |
|---|---|---|---|---|
| 1 | `register` | ⚠️ | ⚠️ | Faltan validaciones; desktop CTA no gateado por bug de Btn |
| 2 | `login` | ⚠️ | ❌ | Desktop inputs DEAD; mobile biz email hardcoded |
| 3 | `verifyCode` | ✅ | ⚠️ | Desktop CTA no gateado |
| 4 | `recover` | ❌ | ❌ | Inputs DEAD; pasos 10-21 sin pantalla |
| 5 | `preferences` | ⚠️ | ⚠️ | Sin validación de mínimos; mobile ignora `mode` |
| 6 | `credentials` | ❌ | ❌ | Inputs y CTAs DEAD — 100% mockup |
| 7 | `home` | ✅ | ✅ | Concierge-first cumplido; sin panel queries recientes |
| 8 | `searchResults` | ✅ | ✅ | D12 OK; sin empty state ni edición chip-a-chip |
| 9 | `placeDetail` | ⚠️ | ❌ | Desktop CTAs rotos (P1); 5+ dead buttons |
| 10 | `rate` | ⚠️ | n/a | Pantalla huérfana por absorción CU-003-002 |
| 11 | `publish` | ⚠️ | ⚠️ | Redirect equivocado paso 33; sin validación |
| 12 | `myExperiences` | ✅ | ⚠️ | Desktop sin tab "Reseñas comunidad" |
| 13 | `collectionsFilter` | ✅ | ✅ | Sets canónicos exactos |
| 14 | `collections` | ✅ | ✅ | Desktop empty state sin CTA |
| 15 | `collectionDetail` | ⚠️ | ⚠️ | Guardar/Compartir sin onClick |
| 16 | `createCollection` | ⚠️ | ⚠️ | Redirect a `collections` no a `collectionDetail` |
| 17 | `plans` | ✅ | ✅ | OK; stat duplicado en profile |
| 18 | `createPlan` | ⚠️ | ⚠️ | Fechas DEAD; search invitados sin state; Copiar sin handler |
| 19 | `planVote` | ✅ | ✅ | Botón "more" header mobile dead (cosmético) |
| 20 | `planClose` | ⚠️ | ⚠️ | Mobile dates inertes; desktop no editable; sin toast |
| 21 | `hostMarketplace` | ⚠️ | ✅ | Mobile back rompe D10; "Ver perfil" host dead |
| 22 | `createOffer` | ⚠️ | ⚠️ | 5 form fields DEAD |
| 23 | `hireHost` | ✅ | ✅ | 4 fases bien modeladas; comisión 12% OK |
| 24 | `registerHost` | ⚠️ | ⚠️ | 4 form fields DEAD; modalidad no propaga al dashboard |
| 25 | `hostDashboard` | ✅ | ✅ | Refactor §3.24 OK; "Editar perfil" desktop dead |
| 26 | `bizRegister` | ✅ | ✅ | Wizard 4 secciones cableado; mobile sin `params.from` |
| 27 | `bizHome` | ✅ | ⚠️ | Desktop "Editar perfil" dead |
| 28 | `claim` (M) / `claimPlace` (D) | ⚠️ | ⚠️ | Id divergente; CUIT/Tel/Comprobante DEAD |
| 29 | `bizBenefits` | ✅ | ✅ | Wizard 5 pasos cableado; edit/trash de cards dead |
| 30 | `bizCampaign` | ✅ | ✅ | Paywall B inline OK |
| 31 | `bizInsights` | ✅ | ✅ | 4 filtros + modal cobro + Tier toggle OK |
| 32 | `bizInsightsResult` | ⚠️ | ⚠️ | 3 satélites sin onClick |
| 33 | `bizSubscribe` | ✅ | ✅ | OK |
| 34 | `profile` | ✅ | ✅ | OK; mobile sin entrada a editProfile (backlog) |
| 35 | `welcome` (desktop) | n/a | ❌ | ORPHAN en runtime |
| 36 | `editProfile` (desktop) | n/a | ⚠️ | Cambiar/Quitar foto sin onClick; bio sin contador |
| 37 | `uikit` | ✅ | ✅ | Desincronizado con D11-D18 |

---

## 4. Auth y Onboarding (6 pantallas)

### 4.1 `register` · CU-001-001 §3.11

**Mobile:** `ScreenRegister` L1853-1909. Registrada en SCREENS L5787. ✅
**Desktop:** `ScreenRegister` L4601-4660. Registrada L5628; en `NO_FRAME_SCREENS` L5664. ✅

**Inbound:** mobile: `login` "Crear cuenta" L1962 (solo perfil Usuario). Desktop: `welcome` L4473, `login` L4578. Sin orphan.

**Outbound:** ambos al CTA principal → `nav('verifyCode', { from: 'register' })`. Mobile back flotante → `nav('login')`. Footer "Iniciar sesión" → `nav('login')`.

**Form fields:**
| Campo | Mobile | Desktop |
|---|---|---|
| name | controlled ✅ | uncontrolled (defaultValue) pero onChange ✅ |
| email | controlled ✅ | idem ⚠️ |
| pwd | controlled ✅ | idem ⚠️ |
| birth | controlled + `ageFromBirthAR` + validación 18+ ✅ | idem ✅ |
| T&C checkbox | `checked={accepted}` ✅ | label custom con `setAccepted` ✅ |

**Buttons sin handler:** ninguno.

**Cobertura §3.11 (22 pasos):** ✅ nombre, email, pwd, birth + validación 18, T&C checkbox; ✅ chain a `verifyCode` con `from:'register'` (Sesión B fix 9). ⚠️ formato email no validado; longitud pwd no gateada (solo truthy). ❌ Alt 1 (email duplicado → redirigir a login pre-llenado) no implementado.

**Veredicto:** ⚠️ Cumplido con divergencias.

**Issues:**
- **P0** Desktop CTA "Crear cuenta" L4656: `disabled={!ready}` no funciona porque `Btn` desktop ignora la prop (línea 369). Click avanza con form vacío.
- **P3** Sin validación de formato email ni longitud password.
- **P3** Alt 1 sin chain ("Iniciar sesión" no pre-llena email).

---

### 4.2 `login` · CU-001-002 §3.1

**Mobile:** `ScreenLogin` L1912-1968. Pantalla inicial por default L6001. Registrada L5788. ✅
**Desktop:** `ScreenLogin` L4507-4585. Registrada L5627; en `NO_FRAME_SCREENS`. ✅

**Inbound:** mobile: estado inicial + back de register/recover/verifyCode + "Cerrar sesión" de profile. Desktop: `welcome` L4474 + back equivalentes.

**Outbound:** ambos al CTA → `nav(isBiz ? 'bizHome' : 'verifyCode', isBiz ? undefined : {from:'login'})`. ⚠️ **biz salta verifyCode** — divergencia §3.1.

**Form fields:**
| Campo | Mobile | Desktop |
|---|---|---|
| Email user | controlled ✅ (pre-fill `sol@spota.com`) | **AuthField sin `value` ni `onChange` ❌ DEAD** |
| Email biz | **hardcoded `'cobrand@spota.com'` literal** ⚠️ semi-dead | idem ❌ DEAD |
| Password | controlled ✅ | **sin handler ❌ DEAD** |

**Buttons sin handler:** ninguno (toggle, recover, CTA tienen handler).

**Cobertura §3.1:** ✅ toggle Usuario/Negocio, CTA encadenado a `verifyCode` para user. ⚠️ biz brinca verifyCode (divergencia deliberada sin documentar). ❌ sin validación de formato email ni longitud pwd. **`RecoverModal` L2100-2147 es código muerto** (flag `recover` nunca se setea).

**Veredicto:** Mobile ⚠️ / Desktop ❌.

**Issues:**
- **P0** Desktop login: AuthFields sin `value`/`onChange` → al iniciar sesión se navega con state vacío.
- **P2** Mobile biz email hardcoded — el usuario no puede tipear.
- **P2** Mobile biz link "Sumalo" → `nav('bizRegister')` sin `from:'login'` (D17 no aplica back contextual).
- **P3** Biz brinca verifyCode (divergencia §3.1 sin documentar como D-fija).
- **P3** Mobile `RecoverModal` dead code — borrar o cablear.

---

### 4.3 `verifyCode` · CU-001-002 §3.1 + encadenado §3.11

**Mobile:** `ScreenVerifyCode` L1972-2097. Registrada L5789. ✅
**Desktop:** `ScreenVerifyCode` L4707-4832. Registrada L5630; en `NO_FRAME_SCREENS`. ✅

**Inbound:** mobile: `login` L1958 (`{from:'login'}` solo user) + `register` L1902 (`{from:'register'}`). Desktop: idem L4570 + L4656. ✅ Chains cumplidos.

**Outbound:** ambos: back contextual a `register`/`login` según `params.from` (mobile L2041; desktop ⚠️ link footer no respeta). Submit → si OK y `from==='register'` → `nav('preferences', {mode:'onboarding'})`; else → `nav('home')`.

**Form fields:** 6 inputs single-digit, todos controlled con `onDigit`. ✅ ambos.

**Buttons sin handler:** ninguno.

**Cobertura §3.1 pasos 12-17 + §3.11 pasos 16-20:** ✅ código 6 dígitos vigencia 5 min, estados invalid/expired/blocked, reenvío con cooldown ⚠️ 30s (canónico Alt 4 dice 60s).

**Veredicto:** Mobile ✅ / Desktop ⚠️.

**Issues:**
- **P0** Desktop CTA "Verificar y continuar" L4820: `disabled={!filled || ...}` no funciona por bug de `Btn` desktop. Click sin dígitos navega igual.
- **P2** Desktop link "Volver al login" del footer L4828 no respeta `params.from='register'`.
- **P3** Reenvío 30s vs canónico 60s.

---

### 4.4 `recover` · CU-001-003 §3.12

**Mobile:** `ScreenRecover` L5203-5242. Registrada L5790. ✅
**Desktop:** `ScreenRecover` L4663-4704. Registrada L5629; en `NO_FRAME_SCREENS`. ✅

**Inbound:** ambos: `login` "¿Olvidaste tu contraseña?" + `verifyCode` cuando state=blocked.

**Outbound:** ambos: CTA "Enviar link" → `setSent(true)` (no nav). "Volver al login" → `nav('login')`.

**Form fields:**
| Campo | Mobile | Desktop |
|---|---|---|
| Email | **`value="sol@spota.com"` + `onChange={() => {}}` ❌ DEAD** | **`AuthField` sin `value`/`onChange` ❌ DEAD** |

**Buttons sin handler:** ninguno (todos los handlers existen, aunque inputs dead).

**Cobertura §3.12:** ✅ pasos 1-9 (envío del link + mensaje genérico "Si el email está registrado..." + vigencia 15 min, alineado con canónico tras Fix 3). ❌ pasos 10-21 (reset efectivo) **sin pantalla** — el flow del link cae fuera del prototipo.

**Veredicto:** Mobile ❌ / Desktop ❌.

**Issues:**
- **P0** Email input DEAD en ambos — imposible tipear.
- **P1** Pasos 10-21 sin pantalla (reset efectivo). Documentar como out-of-scope o crear pantalla.
- **P2** Mobile `RecoverModal` L2100-2147 = código muerto.

---

### 4.5 `preferences` · CU-001-004 §3.13

**Mobile:** `ScreenPreferences` L2151-2284 — wizard 5 pasos. Registrada L5791. ✅ Recibe prop `embedded` (no `mode`).
**Desktop:** `ScreenPreferences` L5134-5343 — single-page con todas las dimensiones. Registrada L5636. NAV_PARENT='profile'. ✅ Recibe `params.mode`.

**Inbound:** ambos: `verifyCode` post-register con `{mode:'onboarding'}` + `profile` → "Preferencias" (sin mode → default `edit`).

**Outbound:** mobile: CTA → `nav('home')` siempre (⚠️ ignora `mode`). "Saltar" L2252 → `nav('home')`. Desktop: CTA → `nav(isOnboarding ? 'home' : 'profile')`; "Cancelar" solo si `!isOnboarding` → `nav('profile')`.

**Form fields:** todos los selectores controlled. ✅ ambos.

**Buttons sin handler:** ninguno.

**Cobertura §3.13 (22 pasos · 5 dimensiones):** ✅ sets canónicos exactos en ambos tras Fix 5 (categorías, barrios, contexto, frecuencia, restricciones). ❌ Alt 1 (validación mínimos: 3 categorías, 1 barrio) no implementada en ningún prototipo. ⚠️ Mobile ignora `params.mode` (no lee el flag — espera `embedded` que nunca le llega).

**Veredicto:** ⚠️ Cumplido con divergencias.

**Issues:**
- **P2** Mobile ignora `params.mode` → "Saltar" visible siempre + redirect a `home` siempre, incluso en edit.
- **P2** Sin validación "min 3 categorías" en ningún breakpoint (Alt 1 §3.13).
- **P3** Desktop preferences renderiza con DesktopFrame (TopNav visible) en modo onboarding — UX rara post-register.
- **P3** Desktop "Saltar este paso" de restricciones limpia el set sin registrar "Sin restricciones".

---

### 4.6 `credentials` · CU-001-005 §3.14

**Mobile:** `ScreenCredentials` L2289-2336. Registrada L5792. ✅
**Desktop:** `ScreenCredentials` L5066-5125. Registrada L5634. NAV_PARENT='profile'. ✅

**Inbound:** ambos: `profile` → "Credenciales y privacidad" + (mobile) botón ⚙ del profile header.

**Outbound:** ambos: header back → `nav('profile')`. CTAs sin onClick (ver abajo).

**Form fields:**
| Campo | Mobile | Desktop |
|---|---|---|
| Email | bloque solo lectura enmascarado ✅ (Fix Sesión B) | idem ✅ |
| Contraseña actual | **`onChange={() => {}}` ❌ DEAD** | **sin `value`/`onChange` ❌ DEAD** |
| Contraseña nueva | ❌ DEAD | ❌ DEAD |
| Confirmar contraseña | ❌ DEAD | ❌ DEAD |

**Buttons sin handler:**
- Mobile L2313 "Actualizar contraseña" ❌
- Mobile L2324 "Eliminar cuenta" ❌
- Desktop L5102 "Actualizar contraseña" ❌
- Desktop L5113 "Eliminar cuenta" ❌

**Cobertura §3.14:** ✅ shell visual de 3 bloques (Email + Cambiar contraseña + Zona de peligro). ❌ pasos 4-19 (validar contraseña actual, persistir, cerrar sesiones, feedback): nada cableado. ❌ Alt 1 (Eliminar cuenta): botón presente sin modal de confirmación ni handler.

**Veredicto:** ❌ Faltante/incompleto — la pantalla es 100% mockup visual.

**Issues:**
- **P0** Inputs DEAD en ambos.
- **P0** Dos CTAs ("Actualizar", "Eliminar") sin onClick en ambos.
- **P1** Alt 1 (Eliminar cuenta) sin modal de confirmación.

---

## 5. Descubrimiento (4 pantallas)

### 5.1 `home` · ScreenDiscover · CU-002-001 §3.15

**Mobile:** L2346-2445. SCREENS L5793. ✅
**Desktop:** L986-1124. SCREENS L5599. ✅ Concierge-first D18.

**Inbound:** ambos (8+ inbounds): TabBar/TopNav, back de placeDetail/searchResults/publish/myExperiences, post-onboarding, toggle "Vista usuario" desde panel B2B.

**Outbound:** input hero → `nav('searchResults', { query })` (mobile L2353, desktop L992). Avatar → `nav('profile')`. TabBar / TopNav a las otras secciones.

**Form fields:** input hero controlled con `value={query} onChange={setQuery}` + Enter / botón "Buscar". ✅ ambos.

**Buttons sin handler:** ninguno (chips de atajo y ejemplos disparan `goSearch`).

**Cobertura §3.15:** ✅ input hero, parsing con `interpretQuery`. ❌ paso 2 (panel de queries recientes/populares) ausente en ambos. ⚠️ paso 3: sin `maxLength=200` ni contador.

**Veredicto:** ✅ Cumplido — D18 concierge-first respetado.

**Issues:**
- **P3** Sin panel de queries recientes/populares.
- **P3** Sin maxLength=200 ni contador en input.
- **P4** Alt 8 (query vacía): falla en silencio, sin toast/error.

---

### 5.2 `searchResults` · ScreenSearchResults · CU-002-001 §3.15

**Mobile:** L5244-5340. SCREENS L5795. ✅
**Desktop:** L1129-1217. SCREENS L5600. ✅ D12 doble columna (lista + mapa sticky).

**Inbound:** único entry desde `home` con `query`. ✅

**Outbound:** back → `nav('home')`. Card → `nav('placeDetail', { id })`. Mobile toggle Lista/Mapa interno; desktop sin toggle (doble columna simultánea).

**Form fields:** input refinable `draftQuery` controlled con submit. ✅ ambos.

**Buttons sin handler:** ninguno.

**Cobertura §3.15:** ✅ `interpretQuery` aplicado, `IntentChips` visibles, `ConciergeLoading` con pausa narrativa de 750ms. ⚠️ chips no editables individualmente (solo via refinar query completa). ⚠️ PlaceCard falta distancia y "Abierto ahora". ❌ Alt 4 (sin resultados → empty state) ausente. ❌ Alt 5 (sin preferencias) no contemplado.

**Veredicto:** ✅ Cumplido — pilares D12/D18 OK, gaps cosméticos.

**Issues:**
- **P2** Sin empty state (Alt 4).
- **P3** IntentChips no editables uno a uno (Alt 6 §3.15).
- **P3** PlaceCard sin distancia ni "Abierto ahora" (paso 11).
- **P4** Desktop: click en pin no hace scroll a la card matching (sync incompleto).

---

### 5.3 `placeDetail` · ScreenPlaceDetail · CU-002-001 paso 15+

**Mobile:** L2598-2695. SCREENS L5794. ✅
**Desktop:** L1255-1398. SCREENS L5601. ✅

**Inbound:** ambos: `searchResults`, `collectionDetail` matched/unmatched, mobile MapView floating card.

**Outbound:**
- Mobile: back → `nav('home')`. visited → `nav('publish')` L2667 ✅. published → `nav('myExperiences')` L2673 ✅.
- Desktop: breadcrumb back → `nav('home')`. **visited "Publicar experiencia" L1276 → `setVisitState('published')` LOCAL** ❌ no navega al wizard. **published "Ver tu reseña" L1282 → `nav('home')`** ❌ debería ir a `myExperiences`.

**Form fields:** ninguno (pantalla de lectura).

**Buttons sin handler:**
- Mobile: Share L2615, Heart L2616, Guardar (available y visited) L2656/2668, Editar (published) L2674.
- Desktop: Share L1305, Heart L1308, Guardar L1265/1277, Editar L1283.
**Total: ~10 dead buttons** entre ambos.

**Sub-máquina D8:** estados `available` / `declared` / `visited` / `published` visibles con copy y banner correctos.

**Veredicto:** Mobile ⚠️ / Desktop ❌.

**Issues:**
- **P1** Desktop "Publicar experiencia" L1276: hace `setVisitState('published')` en lugar de `nav('publish')`. Rompe integración con CU-003-001.
- **P1** Desktop "Ver tu reseña" L1282: `nav('home')` en lugar de `nav('myExperiences')`.
- **P2** ~10 dead buttons (Share/Heart/Guardar/Editar) en ambos prototipos.
- **P3** Faltan dirección, horario actual ("Abierto ahora · cierra a las X"), chips temáticos del lugar (paso 15 del CU).
- **P3** Toast paso 23 ("Anotamos tu visita"): no implementado; se usa banner persistente.

---

### 5.4 `rate` · ScreenRateCommunity

**Mobile:** L2878-2932. SCREENS L5797 (`cu:'CU-08'`). ✅
**Desktop:** **NO EXISTE** ni componente ni entrada en SCREENS (CU-003-002 absorbido en §3.16 paso 24-28 como valoración implícita silenciosa).

**Inbound:** mobile: `myExperiences` tab "Por valorar" → bloque "Reseñas de la comunidad" L3017 (entry contradictorio con la absorción del CU-003-002).

**Outbound:** mobile: header back y "Enviar valoración" → `nav('myExperiences')`. No hay link al lugar reseñado ni al perfil del autor.

**Form fields:** `helpful` (Sí/No) + `affinity` (1-5 estrellas), ambos con setters reales. ✅

**Buttons sin handler:** ninguno funcional. ⚠️ "Enviar valoración" no valida que haya selección.

**Cobertura:** N/A — CU-003-002 absorbido por CU-003-001. Esta pantalla es histórica.

**Veredicto:** ⚠️ Asimetría sin justificar.

**Issues:**
- **P2** Decisión arquitectónica pendiente: si CU-003-002 está absorbido, mobile debería retirar la pantalla `rate` + bloque "Reseñas de la comunidad" en `myExperiences` para alinearse con desktop. O documentar como D-fija que rate sobrevive en mobile.
- **P3** CTA sin validación.

---

## 6. Experiencias y Colecciones (6 pantallas)

### 6.1 `publish` · ScreenPublish · CU-003-001 §3.16 (33 pasos)

**Mobile:** L2706-2875. SCREENS L5796. ✅
**Desktop:** L1707-1896. SCREENS L5605. ✅

**Inbound:** ambos: FAB central (mobile) / TopNav prominent "Publicar" (desktop), `myExperiences` hero + tab "Por valorar", `placeDetail` visited (⚠️ desktop roto, ver 5.3).

**Outbound:** ambos: header back → `nav('home')`, CTA final "Publicar" → `nav('home')`. ❌ paso 33 §3.16 pide redirect a `placeDetail` con reseña visible.

**Form fields:** todos controlled (place, score, text, chips, visibility, hostRated). ✅ ambos.

**Buttons sin handler:** ninguno crítico.

**Cobertura §3.16:** ✅ wizard 3 pasos, set 10 chips canónicos, visibilidad Pública/Privada (sin "Solo amigos") según D9. ⚠️ bloque host siempre visible (Alt 2: visita sin host → no mostrar bloque, no respetado). ❌ paso 33 redirect equivocado. ❌ sin validación de campos (Alt 3).

**Veredicto:** ⚠️ Cumplido con divergencias.

**Issues:**
- **P2** Paso 33 redirect: ambos van a `home` en lugar de `placeDetail`.
- **P2** Bloque "Calificá al host" siempre visible (Alt 2 ignorado).
- **P3** Sin validación de campos obligatorios.
- **P3** Sin feedback visual de éxito.

---

### 6.2 `myExperiences` · ScreenMyExperiences · CU-003-003 §3.2

**Mobile:** L2942-3113. SCREENS L5798. ✅
**Desktop:** L5353-5564. SCREENS L5637. ✅

**Inbound:** ambos desde `profile`. Mobile también desde `placeDetail` "Ver tu reseña" y `rate`. ⚠️ Desktop sin chain desde `placeDetail` por bug de §5.3.

**Outbound:** ambos: back a `profile`, tabs filtran local, tab "Por valorar" → `publish`. Mobile sub-tab "Reseñas comunidad" → `rate`. ⚠️ Desktop no expone "Reseñas comunidad".

**Form fields:** sheet de "Cambiar visibilidad" usa `editing` state. ✅ ambos.

**Buttons sin handler:** ninguno crítico tras Fix 10.

**Cobertura §3.2 (16 pasos):** ✅ pasos 1-13 (header + 4 tabs + listado + cards + sheet "Cambiar visibilidad" con set Pública/Privada/Solo amigos + advertencia turning-private + persist via state mutation). ⚠️ paso 14 (feedback visual éxito) implícito.

**Veredicto:** Mobile ✅ / Desktop ⚠️.

**Issues:**
- **P2** Desktop sin tab "Reseñas de la comunidad" (asimetría con mobile).
- **P3** Sin toast tras confirmar cambio.

---

### 6.3 `collectionsFilter` · ScreenCollectionsFilter · CU-004-002 §3.4

**Mobile:** L5726-5777. SCREENS L5799. ✅
**Desktop:** L1602-1658. SCREENS L5603. ✅

**Inbound:** ambos: TabBar/TopNav "Colecciones" (con `target:'collectionsFilter'`), `collections` "Cambiar filtros", `collections` empty state.

**Outbound:** ambos: CTA "Ver colecciones" → `nav('collections', { scope, activity })`. ⚠️ Sin botón back/close visible.

**Form fields:** `scope` y `activity` controlled. ✅ ambos.

**Sets canónicos:**
- `SCOPE_OPTIONS = ['Mías', 'Guardadas', 'De la comunidad', 'Todas']` ✅ exacto en ambos.
- `ACTIVITY_OPTIONS = ['Café', 'Cena', 'Trago', 'Arte y cultura', 'Trabajo nómade', 'Tarde con amigos', 'Cita romántica', 'Deporte', 'Todas']` ✅ exacto en ambos.

**Cobertura §3.4 pasos 2-7:** ✅ todos. `ready = scope && activity` gateando CTA correctamente.

**Veredicto:** ✅ Cumplido.

**Issues:**
- **P3** Sin botón back/close para volver a `home` sin completar el filter (intencional: pantalla obligatoria, pero confuso para nuevo usuario).

---

### 6.4 `collections` · ScreenCollections · CU-004-002 §3.4

**Mobile:** L3228-3307. SCREENS L5800. ✅
**Desktop:** L1407-1456. SCREENS L5602. ✅

**Inbound:** ambos: desde `collectionsFilter` (CTA), `collectionDetail` (back), `createCollection` (close/cancel/crear), `profile` (stat y sección actividad con params).

**Outbound:** "+" → `createCollection`. "Cambiar filtros" → `collectionsFilter` con params. Cards → `collectionDetail` con params.

**Form fields:** N/A (listado).

**Buttons sin handler:** ninguno crítico.

**Cobertura §3.4 pasos 8-12:** ✅ header con resumen filtros + "+" + "Cambiar filtros"; feed con `collectionInScope`; cards con cover/emoji/nombre/count/autor/"X de Y matchean"/tag "Guardada" condicional.

**Veredicto:** ✅ Cumplido.

**Issues:**
- **P3** Desktop empty state sin CTA "Cambiar filtros" (mobile sí lo tiene).

---

### 6.5 `collectionDetail` · ScreenCollectionDetail · CU-004-002 §3.4

**Mobile:** L5376-5448. SCREENS L5801. ✅
**Desktop:** L1505-1597. SCREENS L5604. ✅

**Inbound:** ambos: `collections` card click con `{id, scope, activity}`.

**Outbound:** back → `collections` con params. PlaceCard → `placeDetail`.

**Form fields:** N/A (lectura).

**Buttons sin handler:**
- Mobile L5397 "Guardar colección" ❌
- Mobile L5401 "Compartir" ❌
- Desktop L1549 "Guardar colección" ❌
- Desktop L1550 "Ya guardada" (display only)
- Desktop L1551 "Compartir" ❌

**Cobertura §3.4 pasos 13-16:** ✅ cover + título + count + visibilidad + autor + contador match. ✅ PlaceCards matcheadas con outline primary + Tag "Coincide con: actividad"; unmatched con opacity 0.45. ✅ botón "Guardar colección" condicional por `showSaveBtn = !isMine && !isSaved`.

**Veredicto:** ⚠️ Cumplido con divergencias.

**Issues:**
- **P1** "Guardar colección" sin onClick en ambos. La lógica condicional de visibilidad está bien pero el click es no-op.
- **P2** "Compartir" sin onClick en ambos.
- **P3** Mobile sin descripción de la colección (desktop sí muestra párrafo hardcoded).

---

### 6.6 `createCollection` · ScreenCreateCollection · CU-004-001 §3.18

**Mobile:** L3124-3223. SCREENS L5802. ✅
**Desktop:** L4854-5009. SCREENS L5632. ✅

**Inbound:** ambos solo desde `collections` "+". ❌ Alt 5 §3.18 (entry desde `placeDetail` "Guardar en colección") **no implementado**.

**Outbound:** ambos: cierre/cancelar/crear → `nav('collections')`. ❌ Paso 19 §3.18 pide redirect a `collectionDetail` de la nueva.

**Form fields:**
| Campo | Mobile | Desktop |
|---|---|---|
| name | controlled ✅ | uncontrolled (defaultValue) pero onChange ⚠️ |
| theme (8 opciones) | controlled ✅ | controlled ✅ |
| desc | controlled ✅ | controlled ✅ |
| pub | controlled ✅ | controlled ✅ |
| places | controlled ✅ | controlled ✅ |

**Set de 8 temas canónico:** ✅ exacto en ambos (Lluvia umbrella, Comida utensils, Fiesta sparkles, Brunch coffee, Aire libre leaf, Arte palette, Tragos wineglass, Noche moon).

**Buttons sin handler:** ninguno.

**Cobertura §3.18 (19 pasos):** ✅ pasos 3-13 OK. ❌ paso 14 (validar campos obligatorios) sin enforce. ❌ paso 18 (feedback éxito) ausente. ❌ paso 19 (redirect a `collectionDetail` de la nueva) → ambos redirigen a `collections`.

**Veredicto:** ⚠️ Cumplido con divergencias.

**Issues:**
- **P1** Paso 19 redirect a `collectionDetail` de la nueva en lugar de `collections`.
- **P2** Alt 5 §3.18 (entry desde `placeDetail`) ausente.
- **P3** Desktop name field uncontrolled (defaultValue).
- **P3** Sin validación de mínimos (nombre, ≥1 lugar).

---

## 7. Planes grupales (4 pantallas)

### 7.1 `plans` · ScreenPlans (sin CU dedicado)

**Mobile:** L3631-3682. SCREENS L5803. ✅
**Desktop:** L1962-2016. SCREENS L5606. ✅

**Inbound:** ambos: TabBar/TopNav, back de createPlan/planVote/planClose. Sin orphan.

**Outbound:** "+" → `createPlan`. Card → `nav('planVote', { id })`.

**Form fields:** N/A.

**Buttons sin handler:** ninguno.

**Cobertura:** ✅ lista 3 planes mock (1 confirmado, 2 votando). ⚠️ `params.id` viaja a `planVote` pero ese no lo consume — header siempre dice "Cumple de Mica" hardcoded. ⚠️ sin empty state ("0 planes").

**Veredicto:** ✅ Cumplido.

**Issues:**
- **P3** `planVote` no consume `params.id` (coherencia mock).
- **P3** Falta empty state.

---

### 7.2 `createPlan` · ScreenCreatePlan · CU-005-001 §3.19

**Mobile:** L3376-3470. SCREENS L5804. ✅
**Desktop:** L2019-2153. SCREENS L5607. ✅

**Inbound:** ambos solo desde `plans` "+".

**Outbound:** ambos: back a `plans`, CTA final → `nav('planVote', {id:'newPlan'})`. HostBlock state="sin" → `nav('hostMarketplace')` ✅.

**Form fields:**
| Campo | Mobile | Desktop |
|---|---|---|
| Colección selección | controlled ✅ | controlled ✅ |
| Nombre del plan | controlled ✅ | controlled ✅ |
| Fecha tentativa | **`onChange={() => {}}` ❌ DEAD** + formato "Sáb 17 de mayo" no `DD/MM/AAAA` | idem ❌ DEAD |
| Horario | **❌ DEAD** + formato "20:30 hs" no `HH:MM` | idem ❌ DEAD |
| Buscar invitados | **❌ DEAD** mobile | sin `value`/`onChange` ❌ DEAD desktop |
| Link compartible "Copiar" | botón sin onClick ❌ | idem ❌ |

**Buttons sin handler:** "Copiar" link de invitación en ambos.

**Cobertura §3.19 (26 pasos):** ✅ wizard 3 pasos, HostBlock D10 cumplido. ⚠️ pasos 9-12 formato fecha/hora canónico no aplicado + campos inertes. ⚠️ paso 16 (invitar nominalmente) no captura input.

**Veredicto:** ⚠️ Cumplido con divergencias.

**Issues:**
- **P1** Fecha y Hora paso 2 inertes en ambos; formato `DD/MM/AAAA` y `HH:MM` no aplicado.
- **P1** Search de invitados sin state real.
- **P2** "Copiar" sin handler (mobile y desktop).
- **P3** `params.id:'newPlan'` propagado pero no consumido.

---

### 7.3 `planVote` · ScreenPlanVote · CU-005-002 §3.20

**Mobile:** L3473-3576. SCREENS L5805. ✅
**Desktop:** L2156-2277. SCREENS L5608. ✅

**Inbound:** ambos desde `plans` card click + `createPlan` paso final.

**Outbound:** back → `plans`. "Cerrar votación" → `planClose`. HostBlock → `hostMarketplace`.

**Form fields:** toggle de voto por opción + toggle Sí/No asistencia. ✅ ambos.

**Buttons sin handler:** Mobile `rightIcon="more"` del AppHeader sin `onRight` ⚠️.

**Cobertura §3.20 (17 pasos):** ✅ render unificado completo, voto = toggle independiente sin "Enviar voto" final, asistencia separada.

**Veredicto:** ✅ Cumplido.

**Issues:**
- **P3** Mobile botón "more" del header sin handler — dead.
- **P3** `params.id` recibido pero no usado; nombre del plan hardcoded.

---

### 7.4 `planClose` · ScreenPlanClose · CU-005-003 §3.3

**Mobile:** L3579-3628. SCREENS L5806. ✅
**Desktop:** L2280-2340. SCREENS L5609. ✅

**Inbound:** ambos desde `planVote` "Cerrar votación".

**Outbound:** back → `planVote`. "Confirmar y notificar al grupo" → `plans`.

**Form fields:**
| Campo | Mobile | Desktop |
|---|---|---|
| Fecha (editable según CU) | **Field con `onChange={() => {}}` ❌ DEAD** + formato narrativo | **texto plano con emoji 📅 ❌ no editable** |
| Hora (editable según CU) | **❌ DEAD** + "20:30 hs" | **❌ no editable** |
| Asistencia | Lista nominal con Tag "Voy" ✅ | Solo avatares + "4 de 4 personas" ⚠️ sin lista nominal |

**Cobertura §3.3 (16 pasos):** ✅ bloque ganador completo, HostBlock state="con" con datos. ❌ paso 4 (Fecha/Hora **editables**): mobile inerte; desktop no editable. ❌ paso 5 (lista de participantes con estado de asistencia): mobile sí; desktop no. ❌ paso 15 (toast "Plan confirmado") ausente en ambos.

**Veredicto:** ⚠️ Cumplido con divergencias.

**Issues:**
- **P1** Mobile: Field Fecha/Hora inertes + formato canónico ausente.
- **P1** Desktop: Fecha/Hora como texto plano no editable (rompe paso 4).
- **P2** Desktop: sin lista nominal de participantes con estado (rompe paso 5).
- **P2** Toast de éxito ausente en ambos.

---

## 8. Marketplace de Hosts (5 pantallas)

### 8.1 `hostMarketplace` · ScreenHostMarketplace

**Mobile:** L3967-4014. SCREENS L5807. ✅
**Desktop:** L2349-2437. SCREENS L5610. ✅

**Inbound:** ambos: solo desde `HostBlock state="sin"` en `createPlan` y `planVote`. ✅ Cumple D10 (entry contextual exclusiva desde plan grupal).

**Outbound:**
- Mobile L3971: header back → **`nav('profile')`** ⚠️ rompe D10 (debería volver a `plans`).
- Desktop L2354: breadcrumb "Planes" → `nav('plans')` ✅.
- Ambos: "Publicar Oferta" → `createOffer`. Card → `hireHost`.

**Form fields:** N/A.

**Buttons sin handler:**
- Mobile L4007 "Ver perfil" host ❌
- Desktop L2429 "Ver perfil" host ❌

**Cobertura:** ✅ listado de "Mis ofertas activas" + tab "Hosts disponibles". El hub no está en el CU §3.21 (que define solo publicación), pero sirve de pasarela.

**Veredicto:** Mobile ⚠️ / Desktop ✅.

**Issues:**
- **P1** Mobile back va a `profile` en lugar de `plans` — rompe D10.
- **P2** "Ver perfil" host sin onClick en ambos.
- **P3** Sin empty state.

---

### 8.2 `createOffer` · ScreenCreateOffer · CU-006-001 §3.21

**Mobile:** L3693-3761. SCREENS L5808. ✅
**Desktop:** L2440-2550. SCREENS L5611. ✅

**Inbound:** ambos solo desde `hostMarketplace`.

**Outbound:** back y CTA → `nav('hostMarketplace')`.

**Form fields:**
| Campo | Mobile | Desktop |
|---|---|---|
| Tipo de experiencia | controlled ✅ | controlled ✅ |
| Descripción (textarea) | **defaultValue sin onChange ❌ DEAD** | **❌ DEAD** |
| Fecha | **❌ DEAD** | **❌ DEAD** |
| Horario | **❌ DEAD** | **❌ DEAD** |
| Zona | **❌ DEAD** | **❌ DEAD** |
| Cantidad personas (range + ±) | controlled ✅ | controlled ✅ |
| Presupuesto (range) | controlled ✅ | controlled ✅ |

**Buttons sin handler:** ninguno.

**Cobertura §3.21:** ✅ wizard 3 pasos, comisión 12% correcta tras Fix 2. ❌ pasos 3-9 (descripción, fecha, horario, zona) con campos dead — el usuario solo puede mover sliders. ❌ paso 19-20 (feedback de éxito antes del redirect) ausente.

**Veredicto:** ⚠️ Cumplido con divergencias.

**Issues:**
- **P1** 5 form fields DEAD (descripción + fecha + horario + zona en ambos prototipos).
- **P3** Sin feedback visual de éxito al publicar.

---

### 8.3 `hireHost` · ScreenHireHost · CU-006-002 §3.9

**Mobile:** L3825-3964 + `PaywallVariantA` L3770-3823. SCREENS L5809. ✅
**Desktop:** L2623-2786 + `PaywallVariantA` L2554-2618. SCREENS L5612. ✅

**Inbound:** ambos desde `hostMarketplace` card click.

**Outbound:** ambos: 4 fases (list/summary/paywall/confirmed) con state machine coherente. Final → `nav('plans')`.

**Form fields PaywallVariantA:** los 9 campos (tipo tarjeta, número, vencimiento, código, nombre, DNI, IVA, email, "guardar para próxima vez") **todos controlled con onChange real** en ambos prototipos. ✅

**Buttons sin handler:** ninguno.

**Cobertura §3.9 (27 pasos):** ✅ todas las 4 fases implementadas. Comisión 12% en resumen tras Fix 2 ✅. PaywallVariantA con validación `filled` activa el CTA. Confirmation con comprobante + custodia + CTA "Ir a tus planes" ✅.

**Veredicto:** ✅ Cumplido — la pantalla más sólida del bloque.

**Issues:**
- **P3** Mobile no usa `params.id`; banner hardcodea "Cafés de especialidad".
- **P3** Mobile back AppHeader sin breadcrumb visual del flujo.

---

### 8.4 `registerHost` · ScreenRegisterHost · CU-006-003 §3.22

**Mobile:** L4017-4065. SCREENS L5810. ✅
**Desktop:** L2789-2871. SCREENS L5613. ✅

**Inbound:** ambos solo desde `profile` card "Ser anfitrión local" (cumple D3).

**Outbound:** back → `profile`. CTA → `nav('hostDashboard')`.

**Form fields:**
| Campo | Mobile | Desktop |
|---|---|---|
| Toggle Casual / Certificado | controlled ✅ | controlled ✅ |
| Zona principal | **❌ DEAD** | **❌ DEAD** |
| Tipo de experiencia | **❌ DEAD** | **❌ DEAD** |
| Credencial (solo Certificado) | **❌ DEAD** | **❌ DEAD** |
| Link portfolio (solo Certificado) | **❌ DEAD** | **❌ DEAD** |

**Buttons sin handler:** ninguno.

**Cobertura §3.22:** ✅ dos modalidades con visual distinto, formularios condicionales. ❌ los 4 form fields nominales son DEAD. ❌ paso 20 (badge "Pendiente de verificación" en hostDashboard) no se refleja — siempre es "Federico M. · Certificado". ❌ Alt 7 (usuario ya tiene perfil → bypass) no implementado.

**Veredicto:** ⚠️ Cumplido con divergencias.

**Issues:**
- **P1** 4 form fields DEAD en ambos.
- **P2** `hostDashboard` no refleja la modalidad recién elegida.
- **P3** Falta feedback de éxito ("Listo, ya sos host") entre click y redirect.

---

### 8.5 `hostDashboard` · ScreenHostDashboard · CU-006-004 §3.24

**Mobile:** L4070-4189. SCREENS L5811. ✅
**Desktop:** L2875-3021. SCREENS L5614. ✅

**Inbound:** ambos: `registerHost` post-alta + `profile` link "¿Ya sos host?".

**Outbound:** ambos: back a `profile`, click card abre modal local, "Postularme"/"Retirar" toggle local.

**Form fields:** N/A.

**Buttons sin handler:**
- Desktop L2909 `Btn "Editar perfil"` ❌
- Mobile L4090 AppHeader `rightIcon="bell"` sin onRight ⚠️

**Cobertura §3.24 (19 pasos):** ✅ refactor a modal completo — cards mínimas (título/autor/fecha/personas/barrio/presupuesto/persona) **sin botón "Postularme" inline**. Click abre modal con avatar + nombre + Fama "anfitrión de eventos" + descripción + 6 datos + botón Postularme/Retirar.

**Veredicto:** ✅ Cumplido — la segunda pantalla más sólida.

**Issues:**
- **P2** Desktop "Editar perfil" en hero sin onClick.
- **P3** Mobile campana del AppHeader sin handler.
- **P3** Hero hardcoded "Federico M. · Certificado".

---

## 9. Negocios B2B (8 pantallas)

### 9.1 `bizRegister` · ScreenRegisterBiz/ScreenBizRegister · CU-007-002 §3.5

**Mobile:** `ScreenRegisterBiz` L4267-4428 · id `bizRegister` (unificado tras Fix 1) ✅. SCREENS L5812.
**Desktop:** `ScreenBizRegister` L3153-3329 · `NO_FRAME_SCREENS` L5664. ✅

**Inbound:** mobile: login biz + InsightsChargeModal + bizSubscribe "Cambiar medio". Desktop: footer DesktopFrame, welcome, login biz, InsightsChargeModal, bizSubscribe (todos con `params.from`).

**Outbound:** ambos: wizard 4 secciones, back contextual D17 (desktop), CTA final → `nav('bizHome')`.

**Form fields:** todos los campos del wizard (razón social, CUIT, calle/número/barrio/ciudad, email, contraseña, rubro, IVA, comprobante, email fact, tarjeta/venc/CVV, términos) **controlled con setters reales**. ✅ ambos.

**Indicadores visuales:** validación padrón (pending/validating/validated) + cobro testigo (pending/running/ok) bien implementados con timeouts. Step 2 disabled hasta `validated`; step 4 disabled hasta `testCharge==='ok' && form.accepted`. ✅

**Buttons sin handler:** ninguno (los `<a>` de términos son links no críticos).

**Cobertura §3.5 (28 pasos):** ✅ todos los datos del wizard. ❌ pasos 25-26 (verificación email) no representados — al confirmar va directo a `bizHome`. Aceptable para prototipo.

**Veredicto:** ✅ Cumplido.

**Issues:**
- **P3** Mobile no usa `params.from` (asimetría con D17 desktop).
- **P3** Verificación de email (pasos 25-26) no implementada.

---

### 9.2 `bizHome` · ScreenBizHome

**Mobile:** L4431-4487. SCREENS L5813. ✅
**Desktop:** L3434-3499 · envuelta en `BizFrame`. SCREENS L5615. ✅

**Inbound:** ambos: login biz, activar bizRegister, back de pantallas hijas. Desktop también sidebar BIZ_NAV.

**Outbound:** toggle "Vista usuario" → `home`. Logout → `login`. Cards → `bizBenefits`/`bizCampaign`/`bizInsights`/`claim`(M)/`claimPlace`(D).

**Form fields:** N/A.

**Buttons sin handler:**
- Desktop L3453 `Btn "Editar perfil"` ❌ (dead button prominente en hero)

**Cobertura:** read-only dashboard con KPIs + identidad + Tools. ✅

**Veredicto:** Mobile ✅ / Desktop ⚠️.

**Issues:**
- **P2** Desktop "Editar perfil" sin onClick.

---

### 9.3 `claim` (M) / `claimPlace` (D) · ScreenClaimPlace · CU-007-001 §3.25

**Mobile:** `ScreenClaimPlace` L4201-4260 · id **`claim`** L5814. ⚠️
**Desktop:** `ScreenClaimPlace` L3333-3431 · id **`claimPlace`** L5617. ⚠️

⚠️ **Id divergente entre prototipos. Único caso del bloque B2B.**

**Inbound:** mobile: `bizHome` tile. Desktop: sidebar BIZ_NAV.

**Outbound:** ambos: enviar verificación → `nav('bizHome')`.

**Form fields step 2:**
| Campo | Mobile | Desktop |
|---|---|---|
| Buscador `search` | controlled ✅ | controlled ✅ |
| PLACES selección | controlled ✅ | controlled ✅ |
| CUIT step 2 | **`onChange={() => {}}` ❌ DEAD** | **`defaultValue` sin onChange ❌ DEAD** |
| Rol Chips | controlled ✅ (Fix 6) | controlled ✅ (Fix 6) |
| Teléfono step 2 | **❌ DEAD** | **❌ DEAD** |
| Subir comprobante | block decorativo sin input file ni onClick ❌ | idem ❌ |

**Buttons sin handler:** comprobante (ambos).

**Cobertura §3.25 (23 pasos):** ✅ buscar negocio, seleccionar lugar, rol como selector (Fix 6). ❌ CUIT y teléfono inertes en step 2. ❌ subir comprobante decorativo. ❌ feedback final "Verificación pendiente" ausente.

**Veredicto:** ⚠️ Cumplido con divergencias.

**Issues:**
- **P1** Id divergente `claim` vs `claimPlace`. Recomendar unificar a `claimPlace` (alinea con el patrón `bizXxx`).
- **P2** CUIT y Teléfono step 2 DEAD en ambos.
- **P2** Subir comprobante sin input file ni handler.
- **P3** Sin feedback final visible.

---

### 9.4 `bizBenefits` · ScreenBizBenefits · CU-007-003 §3.26 (wizard 5 pasos)

**Mobile:** L4496-4691. SCREENS L5815. ✅
**Desktop:** L3517-3727. SCREENS L5618. ✅

**Inbound:** ambos: `bizHome` tile + (desktop) sidebar BIZ_NAV.

**Outbound:** back → `bizHome`. `editing` cierra a listado.

**Form fields wizard 5 pasos:** todos los campos (tipo, título, datos económicos según tipo, vigencia desde/hasta, sinVencimiento, días, horario, monto mínimo, medios de pago, cupo, términos) **controlled con setters reales**. ✅ ambos.

**Buttons sin handler:** edit/trash de cards existentes (ambos prototipos) ❌.

**Cobertura §3.26 (37 pasos):** ✅ wizard 5 pasos con 13 campos estructurados y ramificación según `form.tipo`. ⚠️ sin validación step-to-step (título vacío permite avanzar). ⚠️ "Crear" no agrega a la lista visible.

**Veredicto:** ✅ Cumplido.

**Issues:**
- **P3** Edit/trash de cards existentes sin onClick.
- **P3** Sin validación step-to-step.
- **P3** Crear no agrega a lista visible.

---

### 9.5 `bizCampaign` · ScreenBizCampaign · CU-007-004 §3.10

**Mobile:** L4696-4825. SCREENS L5816. ✅
**Desktop:** L3732-3885. SCREENS L5619. ✅

**Inbound:** `bizHome` tile + (desktop) sidebar.

**Outbound:** "Cambiar" medio → `PaywallVariantA`. "Lanzar campaña" → confirm sheet → done CTA → `bizHome`.

**Form fields:** nombre (slice 60), segmento Chip multi unificado (ACTIVITY_OPTIONS sin 'Todas'), formato (2 opciones), budget slider 2000-50000, days slider 3-60. Todos controlled ✅.

**Paywall Variante B:** modal de confirmación con rows Campaña/Importe/Duración/Medio + Cobrar y lanzar. ✅
**Variante A (cambiar medio):** dispara `PaywallVariantA`. ✅

**Buttons sin handler:** ninguno.

**Cobertura §3.10 (22 pasos):** ✅ todo el flujo. Set unificado con Insights ✅. Cobro upfront con paywall Variante B inline ✅.

**Veredicto:** ✅ Cumplido — uno de los más limpios.

**Issues:** ninguna bloqueante.

---

### 9.6 `bizInsights` · ScreenBizInsights · CU-007-005 §3.8 (filtros)

**Mobile:** L4833-4918. SCREENS L5817. ✅
**Desktop:** L3893-3983. SCREENS L5620. ✅

**Inbound:** `bizHome` tile + back de bizInsightsResult + back de bizSubscribe.

**Outbound:** Tier toggle → ejecuta directo (`bizInsightsResult` con `tier:true`). One-off → modal cobro → confirm → `bizInsightsResult`. "Cambiar medio" → `bizRegister` con `{from:'home'}`.

**Form fields:** los 4 selectores obligatorios (período + actividad + segmento + comparativa) + fechas custom si Personalizado + Tier toggle. Todos controlled ✅.

**InsightsChargeModal:** importe + medio configurado + "Cambiar medio" + Confirmar. ✅

**Cobertura §3.8 (18 pasos):** ✅ todo. `ready` gateando CTA correctamente.

**Veredicto:** ✅ Cumplido — implementación ejemplar.

**Issues:** ninguna bloqueante.

---

### 9.7 `bizInsightsResult` · ScreenBizInsightsResult · CU-007-005 §3.8 (resultado)

**Mobile:** L4960-5049. SCREENS L5818. ✅
**Desktop:** L4020-4118. SCREENS L5621. ✅

**Inbound:** ambos desde `bizInsights` (ejecutar Tier o post-charge).

**Outbound:** back → `bizInsights`. Banner "Pasá a Tier" si `!tier` → `bizSubscribe`.

**Form fields:** N/A.

**Buttons sin handler:**
- Mobile L5023 "Exportar PDF/CSV" ❌
- Mobile L5024 "Guardar preset" ❌
- Mobile L5025 "Configurar alerta" ❌ (correctamente disabled si !tier)
- Desktop L4095/4096/4097 ídem ❌

**Cobertura §3.8 (4 bloques de resultado):** ✅ tráfico SVG bars, tendencias zona, perfil audiencia con barras %, comparativa condicional, banner Tier condicional.

**Veredicto:** ⚠️ Cumplido con divergencias (satélites placeholder).

**Issues:**
- **P3** Exportar/Guardar preset/Configurar alerta sin onClick en ambos. Documentar como placeholder de feature future, o sumar feedback visual.

---

### 9.8 `bizSubscribe` · ScreenBizSubscribe · CU-007-006 §3.7

**Mobile:** L5063-5163. SCREENS L5819. ✅
**Desktop:** L4131-4234. SCREENS L5622. ✅

**Inbound:** ambos desde `bizInsightsResult` banner "Pasá a Tier".

**Outbound:** back → `bizInsights`. Done CTA → `bizInsights`. "Cambiar medio" → `bizRegister` con `{from:'home'}`.

**Form fields:** plan (mensual/anual) + accepted checkbox. ✅ ambos.

**Resumen del cobro:** Plan / Importe / Ciclo / Inicio (18/05/2026) / Próxima renovación (17/06/2026 si mensual, 17/05/2027 si anual). ✅ dinámicas.

**Buttons sin handler:** ninguno.

**Cobertura §3.7 (16 pasos):** ✅ todo. CTA disabled hasta accepted ✅.

**Veredicto:** ✅ Cumplido.

**Issues:** ninguna bloqueante.

---

## 10. Perfil y misc (4 pantallas)

### 10.1 `profile` · ScreenProfile

**Mobile:** L5450-5558. SCREENS L5820. Tab "Perfil" en TabBar. ✅
**Desktop:** L4242-4412. SCREENS L5624. Avatar TopNav. ✅

**Inbound:** mobile (8): TabBar + 7 back-links. Desktop (10): avatar TopNav + 7 breadcrumbs + editProfile/credentials.

**Outbound (mobile):** ⚙ → `credentials`, stats (Visitados, Reseñas, Colecciones con params Mías/Todas), Mi actividad (myExperiences, collections, plans), card host → `registerHost`, "¿Ya sos host?" → `hostDashboard`, Cuenta (preferences, credentials, uikit), Cerrar sesión → `login`.

**Outbound (desktop):** idem + "Editar perfil" → `editProfile`. Omite `uikit` del menú Cuenta (vive en TopNav ✦).

**Form fields:** N/A.

**Buttons sin handler:** ninguno.

**Cobertura (hub):** ✅ todos los entries cableados.

**Veredicto:** ✅ Cumplido — robusto.

**Issues:**
- **P2** Mobile stats "Visitados" y "Reseñas" tienen mismo destino `myExperiences`. Diferenciar con sub-filtro o unificar.
- **P2** Mobile sin "Editar perfil" — asimetría con desktop (cubierto en backlog §1).
- **P3** Desktop stat "Colecciones" sin params; mobile pasa `{scope:'Mías', activity:'Todas'}` (Fix Sesión B).
- **P3** Mobile botón ⚙ etiquetado "Ajustes" pero navega a `credentials` (engañoso).

---

### 10.2 `welcome` · ScreenWelcome (solo desktop)

**Desktop:** L4460-4503. SCREENS L5626; en `NO_FRAME_SCREENS`. ✅

**Inbound:** **CERO `nav('welcome')` en el archivo.** App arranca en `home` (L5667). Único path posible: dev-tools.

**Outbound:** "Crear cuenta gratis" → `register`. "Iniciar sesión" → `login`. "Sumalo a Spota" → `bizRegister` con `{from:'welcome'}` (D17).

**Form fields:** N/A.

**Buttons sin handler:** ninguno.

**Veredicto:** ❌ **ORPHAN en runtime**.

**Issues:**
- **P0** Pantalla inalcanzable en navegación normal. Decidir: (a) arrancar App con `welcome` cuando no haya sesión, (b) aceptar como referencia muerta y documentar.
- **P3** Panel de features no interactivo.

---

### 10.3 `editProfile` · ScreenEditProfile (solo desktop)

**Desktop:** L5012-5063. SCREENS L5633. NAV_PARENT='profile'. ✅
**Mobile:** no existe (backlog §1).

**Inbound:** único entry desde `profile` "Editar perfil" L4253.

**Outbound:** breadcrumb back + Cancelar + Guardar → `nav('profile')`.

**Form fields:**
| Campo | Estado |
|---|---|
| Nombre | `value="..."` sin onChange (uncontrolled via defaultValue) ⚠️ |
| Username | idem ⚠️ |
| Bio textarea | `defaultValue=...` sin onChange ⚠️ |
| Zona principal | idem ⚠️ |
| Foto (Cambiar) | **sin onClick ❌** |
| Foto (Quitar) | **sin onClick ❌** |

**Buttons sin handler:**
- L5034 "Cambiar" foto ❌
- L5035 "Quitar" foto ❌

**Veredicto:** ⚠️ Pantalla performativa (todo lo de guardar es ficticio, aceptable en prototipo) + 2 dead buttons reales.

**Issues:**
- **P1** Botones de foto sin onClick.
- **P2** Sin contador real de Bio (texto estático "140 caracteres como máximo").
- **P3** Sin paridad mobile (cubierto en backlog).

---

### 10.4 `uikit` · ScreenDesignSystem

**Mobile:** L5562-5721. SCREENS L5821 (group "Referencia"). ✅
**Desktop:** L780-862. SCREENS L5623. ✅

**Inbound:** mobile: `profile` Cuenta → "UI Kit · Design System". Desktop: TopNav icono ✦.

**Outbound:** mobile back → `profile`. Desktop sin back propio (hereda TopNav).

**Form fields:** N/A.

**Buttons sin handler:** los Btn samples no tienen onClick — esperado en una galería de UI Kit.

**Cobertura:**
- Mobile: paleta, tipografía, botones, tags, FamaScore, PlaceCard, Avatar, iconografía, decisiones (D1-D10).
- Desktop: paleta reducida, tipografía, 3 botones, 3 PlaceCards. **Más light.**

**Veredicto:** ✅ Cumplido (gallery role).

**Issues:**
- **P2** Desktop incompleto vs mobile (faltan Tags, FamaScore, Avatar, iconografía).
- **P2** Mobile lista decisiones **D1-D10** pero se tomaron D11-D18 (desincronizado con CLAUDE.md).
- **P2** Desktop dice "Fase 1.B completada" pero CLAUDE.md indica las 7 fases cerradas.

---

## 11. Roadmap accionable (priorizado)

### P0 — Bloqueantes (correr antes de mostrar el prototipo)

| # | Pantalla | Issue | Acción | Archivo · Línea |
|---|---|---|---|---|
| 1 | `credentials` mobile + desktop | Inputs DEAD (3 fields cada uno) + CTAs sin onClick | Lift state + handler con `useState` para los 3 campos; sumar onClick a "Actualizar contraseña" y "Eliminar cuenta" con modal de confirmación | mobile L2308-2324; desktop L5097-5113 |
| 2 | `recover` mobile + desktop | Email input DEAD | `useState(email)` + onChange; opcionalmente sumar pantalla post-link con nueva contraseña + confirm (pasos 10-19 del CU) | mobile L5221; desktop L4696 |
| 3 | Desktop `Btn` ignora `disabled` | Bug del componente que afecta `register`, `verifyCode` | Arreglar componente `Btn` desktop (~L360-380) para respetar `disabled` (cambiar `cursor` + `opacity` + bloquear `onClick`) | desktop ~L360 |
| 4 | Desktop `login` AuthFields sin state | Login no captura email/pwd | Pasar `value` + `onChange` a los AuthField del login desktop | desktop L4561-4562 |
| 5 | Desktop `welcome` ORPHAN | Inalcanzable en runtime | Decisión: arrancar App en `welcome` cuando no haya sesión, o documentar como referencia muerta en backlog | desktop L5667 |

### P1 — Críticos (bugs visibles que rompen flujos)

| # | Pantalla | Issue | Acción |
|---|---|---|---|
| 6 | Desktop `placeDetail` | "Publicar experiencia" no abre wizard | Cambiar `setVisitState('published')` por `nav('publish')` | desktop L1276 |
| 7 | Desktop `placeDetail` | "Ver tu reseña" → `home` | Cambiar a `nav('myExperiences')` | desktop L1282 |
| 8 | `collectionDetail` mobile + desktop | "Guardar colección" sin onClick | Sumar handler que actualice `SAVED_COLLECTION_IDS` + feedback | mobile L5397; desktop L1549 |
| 9 | `createCollection` mobile + desktop | Redirect a `collections` no a `collectionDetail` de la nueva | Cambiar `nav('collections')` por `nav('collectionDetail', {id})` | mobile L3219; desktop L4994 |
| 10 | `publish` mobile + desktop | Redirect a `home` no a `placeDetail` | Cambiar `nav('home')` por `nav('placeDetail', {id})` | mobile L2726; desktop L1717 |
| 11 | `claim`/`claimPlace` | Id divergente entre prototipos | Unificar a `claimPlace` en mobile (cambiar SCREENS y todas las `nav('claim')`) | mobile L5814 + L4469 |
| 12 | `createOffer` mobile + desktop | 5 form fields DEAD (descripción, fecha, horario, zona) | Lift state con `useState` y `onChange` reales | mobile L3712-3736; desktop L2470-2495 |
| 13 | `registerHost` mobile + desktop | 4 form fields DEAD (zona, exp, credencial, portfolio) | Lift state | mobile L4052-4056; desktop L2858 |
| 14 | Mobile `createPlan` | Fecha y Hora paso 2 DEAD + formato no canónico | Lift state + formato `DD/MM/AAAA` y `HH:MM` con placeholder | mobile L3426-3427 |
| 15 | `hostMarketplace` mobile | Back → `profile` rompe D10 | Cambiar a `nav('plans')` | mobile L3971 |
| 16 | `editProfile` desktop | "Cambiar"/"Quitar" foto sin onClick | Sumar al menos `onClick={() => {}}` o toast "Función no disponible" | desktop L5034-5035 |

### P2 — Medios

| # | Pantalla | Issue | Acción | Estado |
|---|---|---|---|---|
| 17 | Mobile `preferences` | Ignora `params.mode` | Cambiar `embedded` prop por lectura de `params.mode === 'onboarding'` | 🟢 hecho |
| 18 | Mobile `login` biz | Email hardcoded "cobrand@spota.com" | Hacerlo controlled como en perfil user | 🟢 hecho |
| 19 | Mobile `login` biz | "Sumalo" sin `{from:'login'}` | Sumar params para que D17 aplique | 🟢 hecho |
| 20 | `claim`/`claimPlace` step 2 | CUIT y Teléfono DEAD; Comprobante sin handler | Lift state + sumar input file | 🟢 hecho |
| 21 | `myExperiences` desktop | Sin tab "Reseñas comunidad" | Decidir asimetría (sumar o quitar de mobile alineado con absorción CU-003-002) | 🟢 hecho · quitado de mobile (sección "Reseñas de la comunidad" + `ScreenRateCommunity` + route `rate` retirados) por alineación con CU-003-002 ⚪ Absorbido (`propuestas_mejora_cu.md` §3.17) |
| 22 | `collectionDetail` ambos | "Compartir" sin onClick | Sumar handler con toast "Link copiado" | 🟢 hecho |
| 23 | `createCollection` Alt 5 | Entry desde `placeDetail` ausente | Sumar CTA "Guardar en colección" en `placeDetail` que abra `createCollection` con `place` pre-cargado | 🟢 hecho |
| 24 | `publish` Alt 2 | Bloque host siempre visible | Renderizar condicional al flag de "visita con host contratado" | 🟢 hecho |
| 25 | Desktop `planClose` | Fecha/Hora no editable | Cambiar texto plano por inputs editables | 🟢 hecho |
| 26 | Desktop `planClose` | Sin lista nominal asistencia | Renderizar lista como mobile | 🟢 hecho |
| 27 | Mobile `createPlan` | Search invitados sin state, "Copiar" sin onClick | Lift state + handler con toast "Link copiado" | 🟢 hecho |
| 28 | `hostMarketplace` ambos | "Ver perfil" sin onClick | Sumar onClick o eliminar el botón | 🟢 hecho · nav a `hireHost` con `hostId` |
| 29 | `bizHome` desktop | "Editar perfil" sin onClick | Sumar onClick → futuro `bizEditProfile` o sacar el botón | 🟢 hecho · nav a `claimPlace` como proxy |
| 30 | `registerHost` ambos | `hostDashboard` no refleja modalidad recién elegida | Pasar `params.modalidad` desde registerHost y leer en hostDashboard | 🟢 hecho |

### P3 — Menores (gaps cosméticos)

| # | Pantalla | Issue | Estado |
|---|---|---|---|
| 31 | `home` ambos | Sin panel de queries recientes/populares | ⏸ feature add — deferred al backlog |
| 32 | `home` ambos | Sin `maxLength=200` ni contador | 🟢 hecho · slice + contador 180→alerta |
| 33 | `searchResults` ambos | Sin empty state Alt 4 | ⏸ feature add — deferred al backlog |
| 34 | `searchResults` ambos | IntentChips no editables uno a uno | ⏸ feature add — deferred al backlog |
| 35 | `placeDetail` ambos | Faltan dirección, horario actual, chips temáticos | 🟢 hecho · sumados los tres campos en mobile + desktop (CU-006-002 §3.15) |
| 36 | `placeDetail` ambos | ~10 dead buttons (Share, Heart, Guardar, Editar) | 🟢 hecho · Share toast, Heart con estado, Editar nav |
| 37 | `verifyCode` ambos | Reenvío 30s vs canónico 60s | 🟢 hecho · ambos en 60s |
| 38 | `rate` mobile | Sin validación del CTA | 🟢 hecho · disabled hasta helpful+afinidad |
| 39 | `bizInsightsResult` ambos | Satélites Exportar/Guardar preset/Configurar alerta sin onClick | 🟢 hecho · 3 onClick con toast |
| 40 | `bizBenefits` ambos | Edit/trash de cards sin onClick | 🟢 hecho · edit reabre wizard, trash con confirm |
| 41 | `uikit` ambos | Desincronizado con D11-D18 | 🟢 hecho · mobile sumó D4-D7, D11-D18; desktop estrena sección "Decisiones de diseño" con D1-D18 completas |
| 42 | Toasts de feedback de éxito ausentes en `preferences`, `credentials`, `createCollection`, `planClose`, `createOffer`, `publish`, `registerHost` | 🟢 hecho · `createOffer` y `credentials` ya los tenían; sumados en los restantes |

---

## 12. Notas finales

- **Cobertura D10 confirmada:** Marketplace de Hosts (`hostMarketplace`) tiene entry exclusiva desde `HostBlock state="sin"` en `createPlan` y `planVote`. Sin entries directos desde Discover ni Perfil de usuario. ✅
- **Cobertura D3 confirmada:** `registerHost` vive en Perfil (sección "Ser anfitrión local"); `bizRegister` vive fuera del perfil (login biz + welcome + footer). ✅
- **Cobertura D17 confirmada en desktop:** `bizRegister` desktop resuelve `params.from` con 3 copys distintos (home/login/welcome). ⚠️ Mobile no lo implementa.
- **Pasarela §1.1 implementada:** `PaywallVariantA` como componente reutilizable (`hireHost`, `bizCampaign` "Cambiar medio", `bizInsights` "Cambiar medio") + Variante B inline en `bizCampaign` y `bizSubscribe`. ✅
- **Sets canónicos exactos:** `SCOPE_OPTIONS`, `ACTIVITY_OPTIONS`, `BENEFIT_TYPES`, `BENEFIT_DAYS`, `BENEFIT_PAYMENT`, `COURTESY_ITEMS`, `ACCESS_TYPES`, `INSIGHTS_PERIODS`, `INSIGHTS_SEGMENTS`, `INSIGHTS_COMPARE`, `CAMPAIGN_FORMATS`, `RUBROS`, `IVA_OPTIONS`, `COMP_OPTIONS`, `TIER_PLANS`, `VISIBILITY_OPTIONS`, `CLAIM_ROLES` — todos verificados contra el canónico. ✅
- **Conteos físicos:** ~25 dead inputs y ~25 dead buttons distribuidos en el prototipo combinado. La mayoría son P2/P3 (placeholders visuales esperables en prototipo), salvo los listados en P0 y P1.

Para arrancar correcciones, abordar P0 (1-5) primero — sin esos, los flujos auth/credentials/recover quedan inutilizables. Después P1 (6-16) elimina los bugs visibles que rompen flujos completos. P2 y P3 pueden agendarse en pasadas posteriores sin bloquear la entrega.

---

## 13. Estado de ejecución (cierre de Sesión B / mayo 2026)

**P0 (5/5)** — todos resueltos. **P1 (11/11)** — todos resueltos. **P2 (14/14)** — #21 resuelto eliminando la sección legacy de mobile (alineación con CU-003-002 ⚪ Absorbido). **P3 (9/12)** — al cierre quedaron resueltos #32, #35, #36-40, #41, #42. Los 3 ítems restantes son feature adds explícitos: #31 (panel de queries recientes, no pedido por el CU), #33 (empty state Alt 4 de `searchResults`), #34 (IntentChips tap-to-toggle).

Total: **39/42 items aplicados** entre Sesión A y Sesión B. Los 3 restantes están explícitamente deferred al backlog con su razón — ninguno bloquea la entrega ni rompe flujos canónicos.

---

## 14. Cruce 1:1 Pantalla ↔ CU — pasada de validación (Sesión B+)

Detectado tras pedido explícito de "no puede haber pantalla sin CU" + "el cruce es 1 a 1, de CU a pantalla y de prototipo a CU":

### 14.1 CU mismatches corregidos en `SCREENS` mobile

| Pantalla | CU declarado (incorrecto) | CU correcto | Justificación |
|---|---|---|---|
| `createPlan` | CU-13 | **CU-12** | CU-12 = Crear plan grupal (CLAUDE.md tabla §6) |
| `planVote` | CU-14 | **CU-13** | CU-13 = Votar opciones del plan |
| `hostMarketplace` | CU-15 | **CU-16** | CU-16 = Contratar Host; CU-15 es Publicar Oferta (que sigue siendo `createOffer`) |
| `bizSubscribe` | **CU-24** (fantasma) | **CU-23** | El brief lista CU-01..CU-23 estrictamente. No existe CU-24. `bizSubscribe` es auxiliar de CU-23 (sub-flujo de monetización Tier para Insights, igual que `verifyCode` es auxiliar de CU-02) |

Desktop ya estaba alineado por usar `SCREENS` como key→component sin metadata de CU.

### 14.2 Navegabilidad — entries faltantes resueltos

- **`bizSubscribe`** no tenía entry directo desde `bizHome`. Sólo se alcanzaba tras `bizInsights → ejecutar reporte → result → "Pasá a Tier"` (4 clicks). Sumado en mobile como tile "Suscribirse a Tier · reportes ilimitados" en Herramientas; en desktop como ítem del `BIZ_NAV` con label "Suscripción Tier".

### 14.3 Pantalla canónica faltante — `resetPassword`

CU-001-003 §3.12 tiene 21 pasos. El prototipo cubría sólo 1-9 (pedir email + confirmación visual). Faltaban los pasos 10-21: el usuario abre el mail, clickea el link, ingresa nueva contraseña + confirmación, y vuelve al login. Sumadas:

- **Pantalla `resetPassword`** en mobile + desktop con form de nueva contraseña + confirmación + validación (mínimo 8 chars, coincidencia) + toast "Contraseña actualizada · cerramos otras sesiones" + redirect a `login`.
- **Tip prototipo** en el success state de `recover` (mobile + desktop): "Simular click en el link del mail → `nav('resetPassword')`". Misma mecánica que el tip "ingresá 123456" del `verifyCode`, ya que el prototipo no puede recibir mails reales.
- Registrada en `SCREENS` mobile como `cu: 'CU-03'` auxiliar y en `SCREENS` desktop dentro de `NO_FRAME_SCREENS`.

### 14.4 `welcome` desktop — decisión revisada: queda oculto

**Verificación canónica:** `welcome` NO es un CU. En `propuestas_mejora_cu.md` la frase "landing pública" sólo aparece como paso 1 dentro de CU-001-001 (register) y CU-007-001 (bizRegister), como referencia conceptual a la página de marketing. No existe un CU "Welcome" / "Landing".

**Asimetría detectada por el usuario:** mobile no tiene welcome (D15 lo eliminó), desktop sí lo tenía y arrancaba en `home`. La asimetría no estaba justificada.

**Resuelto:**
- **Initial state desktop** cambiado de `'home'` a `'login'` para alinear con mobile.
- **Logout** vuelve a `nav('login')` (revertido al estado pre-Sesión B).
- **Link "Conocé Spota"** del footer del login removido (apuntaba a pantalla oculta).
- `ScreenWelcome` queda en el código por D16 / compatibilidad con el handler `from: 'welcome'` de `bizRegister` (D17), pero sin entry points activos. `nav('welcome')` count = 0 en runtime.

### 14.5 Bugs visuales corregidos

- **Pasarela mobile** — `<Field>` dentro de flex row se desbordaba (input no tenía `minWidth: 0` ni el `<label>` wrapper tenía `flex: 1`). Fix global en el componente `Field`: `flex: 1`, `minWidth: 0`, `width: 0` en el input.
- **Modal "Postularme" / "Retirar postulación"** en `hostDashboard` (mobile + desktop) — `toggleApply` actualizaba el set `applied` pero no cerraba el modal ni daba feedback. Per CU-18 ("postularse → gestionar postulaciones activas"), el flujo natural es cerrar al confirmar. Fix: `setSelected(null)` + toast de "Postulación enviada" / "Postulación retirada".
