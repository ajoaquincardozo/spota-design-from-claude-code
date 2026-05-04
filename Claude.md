# Prompt completo para prototipo de Spota

---

## Contexto del proyecto

Sos el diseñador UI/UX de **Spota**, la plataforma tecnológica de **Nexo Local S.A.S.**, una empresa de servicios que conecta tres actores en un ecosistema de experiencias urbanas locales en Buenos Aires, Argentina.

Spota funciona como un **concierge inteligente** — no un buscador más — que interpreta la intención del usuario y le recomienda experiencias alineadas a sus gustos, contexto y compañía. La plataforma es **gratuita para el usuario final**; la monetización se construye sobre comisiones por contratación de hosts, SaaS de insights B2B, publicidad segmentada y alianzas exclusivas con negocios locales.

El mercado objetivo son residentes urbanos de 18 a 45 años en CABA/AMBA, con hábitos digitales consolidados y cultura de salidas frecuentes. El problema central que resuelve Spota es la **fatiga de decisión**: las personas no carecen de opciones, carecen de certeza sobre cuál elegir.

---

## Estado actual del prototipo (mayo 2026)

- **Source of truth en runtime (mobile):** `prototipo/Spota Prototipo.html`. Único archivo autocontenido que carga React 18 y Babel-standalone por CDN y compila JSX en el browser. Se levanta con `python3 -m http.server 8000` desde `prototipo/`.
- **Source of truth en runtime (desktop):** `prototipo-desktop/Spota Prototipo Desktop.html`. Mismo enfoque autocontenido. Breakpoint mínimo 1024 px. Se levanta con `python3 -m http.server 8001` desde `prototipo-desktop/`. Cubre los 23 CUs en paralelo al mobile, con TopNav + footer en lugar de TabBar inferior, layouts multi-columna donde aplica, modales en vez de full-screen para acciones cortas, y un panel B2B con `BizFrame` (sidebar dedicado).
- **Cobertura funcional:** mobile y desktop cubren los 23 CUs más auxiliares (login, register, recover, editProfile, etc.). En mobile, el `login` con foto es la única entrada de auth (Splash/Welcome se eliminó tras la unificación). En desktop, `welcome` sigue siendo landing pública y `login` se resolvió en layout split (foto + hero a la izquierda 55 %, form sobre crema a la derecha 45 %; el modo `centered` y su toggle se retiraron). Cero pantallas en estado "próxima fase" en desktop tras Fase 7. Pendiente único: `editProfile` mobile.
- **Concierge-first en Discover:** mobile y desktop tratan al input de búsqueda como bloque hero (alto generoso, fondo blanco, borde primary, shadow tinted) y descartan el feed de recomendaciones por default. El home queda como saludo + input + atajos discretos por categoría + ejemplos clicables; las recomendaciones aparecen recién en `searchResults`, donde un parser heurístico (`interpretQuery`) extrae las dimensiones de la query y las muestra como `IntentChips` ("ambiente · tranquilo", "con amiga", "en Palermo"). El Fama Score predictivo se traduce a `AffineRow` en cada card (chip cualitativo de match + mini-avatares de "gente como vos"). Detalle en D18.
- **UI Kit / Design System:** página de referencia accesible en ambos prototipos. Mobile: Perfil → Cuenta → "UI Kit · Design System". Desktop: ícono ✦ del TopNav.
- **Backup histórico:** `template/` conserva el estado original recibido (incluye `.jsx` sueltos que están desfasados respecto al HTML; no se cargan en runtime).
- **Docs de entrega:**
  - [`entrega/justificacion-diseno.md`](entrega/justificacion-diseno.md) — justificación de decisiones de diseño compartidas (paleta, navegación, regla 5±2, Fitts, leyes UX, diagramas de estado).
  - [`entrega/plan-desktop.md`](entrega/plan-desktop.md) — plan de las 6 fases del prototipo desktop, todas completadas.
  - [`entrega/backlog.md`](entrega/backlog.md) — items diferidos, decisiones cerradas que no van, mejoras técnicas para producción.
  - Este `CLAUDE.md` es el brief operativo y la memoria de decisiones (D1-D18).
- **Material de cátedra y referencia:** `docs/` (excluido del repo por peso, ~60 MB).

---

## Identidad visual — Paleta "Cercanía Local"

| Rol        | Color            | Hex       | Uso                                                                 |
|------------|------------------|-----------|---------------------------------------------------------------------|
| Primario   | Verde petróleo   | `#2F6F5E` | Botones principales, navbar, íconos activos, badges verificados     |
| Secundario | Terracota        | `#B85C38` | Tags (Popular, Nuevo, Recomendado), CTAs secundarios, acentos cálidos |
| Acento     | Arena dorada     | `#E9A23B` | Estrellas de rating, highlights, badges premium, Fama Score         |
| Fondo      | Crema            | `#FFF8ED` | Fondo general de la app, cards, superficies principales              |
| Texto      | Marrón oscuro    | `#2B2523` | Títulos, cuerpo de texto, labels                                    |

**Psicología de la paleta:** El verde petróleo transmite equilibrio, confianza y cercanía; el terracota remite a lo local, humano, artesanal y presencial; el dorado refuerza beneficios, valor y experiencias destacadas. La identidad es humana, barrial, cálida, vinculada a negocios locales y experiencias reales.

**Tipografía implementada:** **DM Sans** como sans-serif principal (UI, cuerpo, navegación) + **Fraunces** serif en cursiva para acentos cortos sobre titulares ("cerca tuyo", "hoy", "vuelta", nombres de niveles). Pesos: regular 400, semibold 600, bold 700. Tamaño mínimo de cuerpo 14 px. Justificación detallada en `entrega/justificacion-diseno.md` §5.

**Estilo general:** Interfaz moderna pero cálida. Bordes redondeados (8-12px). Sombras sutiles en cards. Fotografías reales de experiencias urbanas. Íconos lineales con trazo consistente. Espaciado generoso. Evitar que se sienta como "tech startup fría" — debe sentirse comunitaria y cercana a los comercios.

---

## Referencia visual — Landing page aprobada

La landing page ya diseñada (adjunta como imagen de referencia) establece el tono visual del producto. Elementos clave a mantener:

- **Logo:** Ícono de pin de mapa verde petróleo + "Spota" en tipografía bold marrón oscuro
- **Navbar:** Explorar · Guardados · Reseñas · Para negocios · Blog | Iniciar sesión · Crear cuenta (botón verde petróleo)
- **Hero:** Título en cursiva serif para "cerca tuyo", barra de búsqueda con filtros (¿Dónde? · Categoría · ¿Cuándo?) y botón de búsqueda redondo terracota
- **Cards de experiencias:** Imagen + tag de estado (Popular/Nuevo/Recomendado en terracota) + corazón para favoritos + nombre + categoría · barrio + rating con estrellas doradas + precio
- **Sección de valores:** 4 íconos (Apoyás lo local · Hecho por la comunidad · Experiencias auténticas · Seguridad y confianza)
- **Testimonios:** Avatar circular + nombre + barrio + estrellas doradas + texto
- **Negocios asociados:** Logos de comercios locales en fila
- **CTA final:** Banner verde petróleo con ilustración de fachadas de barrio + "Crear cuenta gratis" (botón terracota) + "Explorar experiencias" (botón outline)
- **Footer:** 4 columnas (Navegación · Sobre Spota · Ayuda · Seguinos) + selector de país

---

## Los 3 actores del ecosistema

### Usuario (consumidor)
Persona de 18-45 años que quiere descubrir experiencias locales con confianza. Busca reducir el tiempo de decisión, acceder a recomendaciones verificadas, coordinar salidas grupales y obtener beneficios exclusivos.

### Host (guía de experiencias)
Persona con conocimiento local que monetiza su saber. Puede ser **casual** (sin credenciales, onboarding simplificado) o **certificado** (profesional con portfolio y verificación). Se postula a Ofertas de Viaje publicadas por usuarios.

### Negocio local (socio comercial)
Dueño de bar, restaurante, espacio cultural, etc. Reclama el perfil de su lugar, publica beneficios exclusivos, configura campañas publicitarias segmentadas y accede a un panel de insights con datos agregados y anónimos.

---

## Funcionalidades clave del producto

### Motor de búsqueda semántica contextual
Interpreta la intención del usuario en lenguaje natural (ej: "algo tranquilo para tomar un café el sábado con una amiga en Palermo"). Los resultados se ordenan por afinidad con el perfil del usuario o del grupo. Visualización dual: listado + mapa integrado.

### Fama Score predictivo
Sistema de reputación que pondera las reseñas según el perfil de quien las emite. Un foodie experto que califica bien un lugar genera una nota que vale más para usuarios con gustos similares. No es un promedio plano de estrellas — es recomendación por afinidad.

### Proof of Visit
Validación por geolocalización que certifica que quien reseña efectivamente estuvo en el lugar. Elimina reseñas falsas. Badge visual de verificación en cada experiencia publicada.

### Colecciones
Agrupaciones temáticas de lugares creadas por usuarios. Pueden ser públicas (compartidas con la comunidad) o privadas. Funcionan como base para la planificación grupal.

### Planificación grupal
Crear un plan a partir de una Colección, invitar participantes, cruzar preferencias automáticamente, votar opciones y confirmar asistencia. Reemplaza la coordinación caótica por WhatsApp.

### Marketplace de Hosts
El usuario publica una Oferta de Viaje describiendo lo que busca. Los hosts se postulan. El usuario elige, contrata dentro de la plataforma (con comisión) y califica después.

### Panel de negocios
Los negocios reclaman su perfil, publican beneficios exclusivos, configuran campañas segmentadas por afinidad y acceden a insights agregados sobre comportamiento de usuarios en su zona.

---

## 23 Casos de uso → Pantallas a prototipar

### Bloque 1: Onboarding y Perfil (CU-01 a CU-05)

| CU   | Pantalla                    | Actor   | Descripción                                                                                         |
|------|-----------------------------|---------|-----------------------------------------------------------------------------------------------------|
| CU-01 | Registrar cuenta           | Usuario | Formulario de registro (email, contraseña, nombre). Paso 1 del onboarding.                          |
| CU-02 | Iniciar sesión             | Usuario | Login con email/contraseña. Link a recuperar contraseña. Acceso rápido con Google/Apple.             |
| CU-03 | Recuperar contraseña       | Usuario | Modal o pantalla de recuperación por email. Puede vivir como modal dentro de CU-02.                  |
| CU-04 | Gestionar preferencias     | Usuario | Configurar tipos de experiencia, zona geográfica, contexto de uso (solo/pareja/grupo/familia), frecuencia. Onboarding inicial + editable después desde perfil. |
| CU-05 | Gestionar credenciales     | Usuario | Editar email, contraseña, datos de cuenta. Sección dentro de configuración del perfil.               |

### Bloque 2: Descubrimiento (CU-06)

| CU   | Pantalla                              | Actor   | Descripción                                                                                         |
|------|---------------------------------------|---------|-----------------------------------------------------------------------------------------------------|
| CU-06 | Descubrir experiencias por intención | Usuario | **Pantalla principal / Home.** Barra de búsqueda semántica + filtros (dónde, categoría, cuándo). Resultados en listado y mapa. Cards de lugares con: imagen, nombre, categoría, barrio, rating (Fama Score), precio, tags (Popular/Nuevo/Recomendado), badge Proof of Visit, beneficios exclusivos si hay alianza. |

### Bloque 3: Experiencias y Reputación (CU-07 a CU-09)

| CU   | Pantalla                                 | Actor   | Descripción                                                                                         |
|------|------------------------------------------|---------|-----------------------------------------------------------------------------------------------------|
| CU-07 | Publicar experiencia                    | Usuario | Flujo multi-paso: seleccionar lugar(es) visitado(s) → validar Proof of Visit (GPS) → escribir descripción + puntuación → elegir visibilidad (pública/privada) → si hubo host contratado, calificar servicio. |
| CU-08 | Valorar experiencia de la comunidad     | Usuario | Desde el feed o detalle de una experiencia publicada por otro usuario: dar valoración que alimenta su Fama Score. La valoración se pondera por afinidad de perfil. |
| CU-09 | Gestionar experiencias propias          | Usuario | Listado de experiencias publicadas por el usuario. Ver valoraciones recibidas, Fama Score acumulado, editar visibilidad, eliminar. |

### Bloque 4: Colecciones (CU-10 a CU-11)

| CU   | Pantalla                                 | Actor   | Descripción                                                                                         |
|------|------------------------------------------|---------|-----------------------------------------------------------------------------------------------------|
| CU-10 | Crear Colección                         | Usuario | Crear agrupación temática: nombre, descripción, agregar lugares. Elegir pública o privada. Puede crearse desde descubrimiento o desde sección de colecciones. |
| CU-11 | Explorar Colecciones de la comunidad    | Usuario | Feed de Colecciones públicas de otros usuarios. Filtrar por tema, zona, popularidad. Guardar colecciones ajenas. Usar como base para plan grupal. |

### Bloque 5: Planificación Grupal (CU-12 a CU-14)

| CU   | Pantalla                                 | Actor       | Descripción                                                                                         |
|------|------------------------------------------|-------------|-----------------------------------------------------------------------------------------------------|
| CU-12 | Crear plan grupal                       | Usuario     | Partir de una Colección → poner nombre al plan → invitar participantes (por link o usuario). La plataforma cruza preferencias de todos los perfiles y sugiere las mejores opciones para el grupo. |
| CU-13 | Votar opciones del plan grupal          | Participante | Tablero del plan en curso: ver opciones sugeridas, votar, ver votos de otros. Confirmar asistencia integrada en el voto. Estado del plan visible para todos. |
| CU-14 | Cerrar plan grupal                      | Usuario     | El creador del plan cierra la votación, define la opción ganadora, confirma fecha/hora/lugar. Notificación a todos los participantes. |

### Bloque 6: Marketplace de Hosts (CU-15 a CU-18)

| CU   | Pantalla                                 | Actor       | Descripción                                                                                         |
|------|------------------------------------------|-------------|-----------------------------------------------------------------------------------------------------|
| CU-15 | Publicar Oferta de Viaje                | Usuario     | Formulario: descripción de la experiencia buscada, fecha, horario, zona, cantidad de participantes, presupuesto estimado. Publicar para que hosts se postulen. |
| CU-16 | Contratar Host                          | Usuario     | Ver postulaciones recibidas: perfil del host, Fama Score, experiencias previas, propuesta de servicio, precio. Comparar y seleccionar. Contratación con comisión de plataforma. |
| CU-17 | Registrarse como Host                   | Host        | Flujo diferenciado: casual (datos básicos, zona, tipo de experiencia, disponibilidad) vs certificado (+ credenciales, portfolio, verificación). |
| CU-18 | Postularse a Oferta de Viaje            | Host        | Ver ofertas publicadas en su zona y tipo de experiencia. Postularse con propuesta de servicio y precio. Gestionar postulaciones activas. |

### Bloque 7: Negocios y Visibilidad (CU-19 a CU-23)

| CU   | Pantalla                                 | Actor   | Descripción                                                                                         |
|------|------------------------------------------|---------|-----------------------------------------------------------------------------------------------------|
| CU-19 | Reclamar perfil del lugar               | Negocio | Buscar el lugar en la plataforma → reclamar titularidad → proceso de verificación. El lugar ya existe porque los usuarios lo reseñan; el negocio reclama la gestión. |
| CU-20 | Registrar negocio asociado              | Negocio | Completar datos comerciales, aceptar términos de alianza, activar herramientas comerciales. Login separado del flujo de usuario. |
| CU-21 | Gestionar beneficios exclusivos         | Negocio | Crear y administrar beneficios: tipo (descuento, reserva, menú exclusivo, etc.), condiciones de acceso, vigencia. Los beneficios aparecen en las cards del descubrimiento. |
| CU-22 | Configurar campaña publicitaria         | Negocio | Crear campaña segmentada por afinidad de experiencias. Definir presupuesto, duración, segmento objetivo, formato. Vista previa de cómo se verá en la plataforma. |
| CU-23 | Acceder al panel de insights            | Negocio | Dashboard con datos agregados y anónimos: preferencias de usuarios en zona, tendencias de búsqueda, métricas de campañas activas (impresiones, interacciones, conversiones). Filtros por período y segmento. |

---

## Navegación principal

### App del usuario — mobile (tab bar inferior)
1. **Descubrir** (Home) → CU-06
2. **Colecciones** → CU-10, CU-11
3. **Publicar** (FAB central) → CU-07
4. **Planes** → CU-12, CU-13, CU-14
5. **Perfil** → CU-04, CU-05, CU-09

### App del usuario — desktop (TopNav superior)
1. **Descubrir** (Home) → CU-06
2. **Colecciones** → CU-10, CU-11
3. **Planes** → CU-12, CU-13, CU-14

El acceso al **Perfil** en desktop es exclusivamente vía el avatar en el extremo derecho del TopNav (D13). "Publicar" vive como botón terracota dedicado en el TopNav, no como tab.

### Accesos secundarios
- **Marketplace de Hosts:** entrada **contextual desde el plan grupal** únicamente. Aparece como bloque "¿Necesitan un host?" en `ScreenCreatePlan` y `ScreenPlanVote` (sub-estado *Sin host*) y como card del host contratado en `ScreenPlanClose` (sub-estado *Con host*). No tiene entrada directa desde Discover ni desde el perfil del usuario, porque contratar un host sin un plan que lo ancle es decisión sin contexto.
- **Registrarse como Host:** desde menú de perfil, flujo diferenciado (es una evolución natural del rol del usuario — cualquier persona puede convertir su conocimiento local en servicio).
- **Postularse a Oferta:** dashboard del host dentro de su perfil.
- **Login de Negocios:** toggle Usuario / Negocio dentro de `ScreenLogin` (mobile y desktop). Una sola pantalla de auth, dos contextos. En modo Negocio el accent es terracota y el submit va a `bizHome`. Coherente con D3.

### App de negocios (login separado)
- Dashboard principal con accesos a: CU-19, CU-20, CU-21, CU-22, CU-23
- Flujo independiente del usuario — el negocio tiene su propio login y panel
- **Asimetría con Host (importante):** un usuario *se vuelve* Host (extensión de identidad), pero *es* dueño de un Negocio (identidad separada). Por eso el entry point de Negocio **no aparece en el perfil del usuario**: vive solamente en (a) el splash con el link "Soy un negocio", y (b) el login dedicado al panel de negocios (toggle Usuario/Negocio).

---

## Especificaciones técnicas del prototipo

- **Tipo:** Aplicación web responsive (SPA — Single Page Application)
- **Breakpoints:** Mobile-first (375px) → Tablet (768px) → Desktop (1280px+)
- **Stack en el prototipo navegable:** React 18 + estilos inline (no Tailwind, no build) servido vía Babel-standalone. La elección prioriza iteración rápida sobre la pulcritud de código de producción; cuando la fase pase de prototipo a implementación, conviene migrar a Vite + módulos `.jsx` reales (ver §6 del apéndice de `entrega/justificacion-diseno.md`).
- **Estados a considerar:** Empty states, loading, error, éxito, hover, active, disabled
- **Componentes reutilizables:** Cards de lugar, cards de experiencia, barra de búsqueda, sistema de rating (Fama Score + estrellas), badges (Proof of Visit, Popular, Nuevo, Recomendado, Beneficio exclusivo), avatares con Fama Score, modales de confirmación, sistema de votación grupal

---

## Directivas de diseño

1. **Mobile-first:** Diseñar primero para 375px y escalar. El 98% del segmento objetivo accede desde smartphone.
2. **Consistencia con la landing:** Mantener el tono visual de la landing ya aprobada — cálido, comunitario, con fotografía real.
3. **Jerarquía de información clara:** El usuario debe entender en menos de 3 segundos qué puede hacer en cada pantalla.
4. **Confianza visible:** Badges de Proof of Visit, Fama Score y beneficios exclusivos deben ser prominentes en las cards — son el diferenciador.
5. **Acciones principales destacadas:** Botones primarios en verde petróleo, CTAs de conversión en terracota.
6. **Sin exceso de decoración:** Clean, funcional, cálido. El contenido (fotos, experiencias, lugares) es el protagonista.
7. **Accesibilidad:** Contraste suficiente sobre fondo crema, tamaños de fuente legibles (mínimo 14px en body), áreas de toque de 44px mínimo en mobile.

---

## Entregable esperado

Prototipar las **23 pantallas** correspondientes a los CU listados, organizadas por bloque funcional. Cada pantalla debe incluir:
- Layout responsive (al menos versión mobile)
- Todos los elementos interactivos visibles
- Estados relevantes (vacío, con datos, cargando cuando aplique)
- Navegación entre pantallas consistente con el mapa de navegación
- Aplicación estricta de la paleta de colores y el estilo visual definido

---

## Resumen del ecosistema de valor

```
Usuario busca experiencia
    → Descubre por intención (búsqueda semántica)
    → Ve recomendaciones por afinidad (Fama Score)
    → Vive la experiencia
    → Publica con Proof of Visit
    → Alimenta recomendaciones para otros
    → Puede crear Colecciones y Planes grupales
    → Puede contratar un Host via Oferta de Viaje

Host ofrece experiencia
    → Se registra (casual o certificado)
    → Ve Ofertas de Viaje en su zona
    → Se postula → es contratado → cobra (menos comisión)

Negocio local se asocia
    → Reclama perfil del lugar
    → Publica beneficios exclusivos
    → Configura campañas segmentadas
    → Accede a insights de comportamiento
    → Genera tráfico cualificado
```

---

## Decisiones de implementación

Decisiones tomadas durante el prototipado que no estaban en el brief original. Se conservan acá como referencia rápida; el detalle argumentativo vive en `entrega/justificacion-diseno.md`.

| # | Decisión | Detalle en doc de entrega |
|---|---|---|
| D1 | **Niveles del Fama Score:** Nuevo · Conocido · Habitué · Referente · Maestro. Léxico barrial coherente con la marca; descarta "Pro" / "Premium" por sabor SaaS. | Apéndice §1 |
| D2 | **Iconografía de Preferences y Nueva colección:** SVG lineales del Icon system con tinte terracota, no emojis nativos del OS. Aplica al onboarding de preferencias y al picker de tema de Colecciones. | Apéndice §2 |
| D3 | **Asimetría Host/Negocio:** entry de Negocio fuera del perfil del usuario; Host adentro porque es evolución del rol. Negocio entra solo desde splash y toggle Usuario/Negocio del login. | §3 + Apéndice §3 |
| D4 | **Layout full-bleed para auth (Register / Recover mobile, Welcome desktop):** contenido vertical-centrado con CTA fijo abajo. Refuerza la calidez del onboarding. Login mobile evolucionó a foto integrada (ver D15); el resto mantiene full-bleed sobre crema. | Apéndice §4 |
| D5 | **Mapa funcional Discover:** estilo plano de Palermo con avenidas, manzanas, parques (Bosques + plaza), río, etiquetas de barrio, pin "tu ubicación" con pulso, filtros flotantes (Todos / Abre ahora / Visitados / Guardados), zoom + mi-ubicación, "Buscar en esta zona". | Apéndice §5 |
| D6 | **Arquitectura técnica del prototipo:** un único HTML autocontenido con React + Babel CDN. Los `.jsx` sueltos del `template/` no se cargan. | Apéndice §6 |
| D7 | **Routing IDs alineados a SCREENS array:** `nav('home')` para Discover (no `'discover'`), todas las pantallas registradas en SCREENS para evitar fallback silencioso a Splash. | Sección de navegación |
| D8 | **Diagrama de estados del CTA en detalle de lugar:** Disponible → Intención declarada → Visitado → Publicado, con rama de "no verificado" si la ventana de Proof of Visit cierra sin GPS dentro del radio. Reemplaza el contradictorio "Marcar como visitado". Espejo del modelo definido en `docs/Proof_of_Visit_Mecanismo_y_Flujo_de_Experiencia.md`. | Apéndice §7 |
| D9 | **Wizard publicar de 3 pasos (no 4):** se elimina el paso de "validando presencia por GPS" porque el Proof of Visit ya se resolvió en background. Paso 1 ahora lista solamente visitas validadas pendientes de reseñar; pasos 2 y 3 son valoración + reseña + chips y visibilidad + rating de host. | Apéndice §8 |
| D10 | **Sub-máquina del host dentro del plan grupal:** dos estados (*Sin host* — default sin etiqueta visible — y *Con host* — card visible con avatar/Fama/propuesta), transición irreversible (no hay cancelación). El bloque vive como slot persistente en `ScreenCreatePlan`, `ScreenPlanVote` y `ScreenPlanClose`. Reemplaza el teaser del Marketplace en Discover, que se elimina. Solo el creador del plan opera la sub-máquina. | Apéndice §9 |
| D11 | **Prototipo desktop como archivo separado, no responsive del mobile:** vive en `prototipo-desktop/`, mismo stack autocontenido. Adaptar el mobile vía media queries forzaba layouts; un prototipo nuevo permite recomponer con libertad sin contaminar el mobile estable. Si en una segunda fase se quiere consolidar, se puede extraer un `design-system.js` común. | Plan-desktop §2 |
| D12 | **SearchResults desktop = lista + mapa simultáneos, no toggle:** la pantalla de resultados desktop usa dos columnas (lista 60 % a la izquierda, mapa SVG 40 % sticky a la derecha). El toggle Lista/Mapa del mobile no aplica porque hay espacio para ambos. Sincronización bidireccional: click en card resalta el pin, click en pin selecciona la card. *Nota:* esta decisión nació apuntando al `Discover` desktop, pero al pasar el home a concierge-first (D18) las recomendaciones se mudaron a `searchResults` y D12 las acompañó. El home concierge-first no tiene feed por default. | Plan-desktop §3 |
| D13 | **"Perfil" fuera del navbar desktop:** el avatar en top-right es la única entrada al perfil. El navbar queda enfocado en producto (Descubrir / Colecciones / Planes). Coherente con apps consumer que tratan al avatar como affordance universal (Twitter, Instagram, GitHub). El avatar tiene active state visual cuando estás en cualquier sub-pantalla del área de perfil. | Apéndice §10 |
| D14 | **Preferences single-page con `mode` flag (onboarding ↔ edit):** una sola pantalla `ScreenPreferences` cubre dos contextos. Cuando se entra desde `Register` (`mode='onboarding'`), el copy es de bienvenida, sin breadcrumb, CTA "Empezar a explorar" → home. Cuando se entra desde Perfil (`mode='edit'`, default), el copy es de edición, con breadcrumb y botones Cancelar/Guardar. Mismo formulario, dos copys. Es el patrón canónico que ya usa el mobile (donde wizard de onboarding y editor de prefs son la misma pantalla con flag). | Apéndice §11 |
| D15 | **Welcome y Login unificados en mobile:** `ScreenSplash` se eliminó. El login con foto Café Palermo + gradient + form integrado es ahora la primera pantalla y única entry de auth para usuarios no autenticados. Logo terracota arriba, textos blancos con `text-shadow` para legibilidad sobre la foto. Reduce el tap-count para entrar (sin pantalla intermedia) y unifica marketing + funcionalidad en una sola superficie. | Apéndice §12 |
| D16 | **Desktop login con layout split (decisión cerrada):** la pantalla pivote del flujo de auth en desktop usa dos columnas (foto + gradient + hero "Lo bueno está cerca tuyo" al pie a la izquierda 55 %, form sobre crema a la derecha 45 %). Patrón estándar de auth en SaaS modernos (Stripe, Linear, Notion). Se evaluó un modo `centered` alterno con toggle Split/Centrado durante el prototipo para A/B; el modo split ganó y el toggle se retiró. | Apéndice §13 |
| D17 | **Back contextual de `bizRegister`:** la pantalla recibe `params.from` y adapta el copy + destino del back link según el origen. Desde el footer logged-in del DesktopFrame (`from: 'home'`) → "¿Volvés a la app? Vista usuario" → home. Desde `welcome` (`from: 'welcome'`) → "¿Querés explorar antes? Volver" → welcome. Desde `login` (`from: 'login'`) → "¿Te equivocaste? Volver al login" → login. Resuelve la asimetría del entry point B2B sin duplicar pantallas. | Apéndice §14 |
| D18 | **Concierge-first en Discover (mobile y desktop):** el home no muestra recomendaciones por default; el input es bloque visual dominante (alto generoso, fondo blanco, borde primary, shadow tinted). El feed pasa a `searchResults`, donde `interpretQuery` extrae las dimensiones de la query y las muestra como `IntentChips`. Cada `PlaceCard` suma `AffineRow` (chip cualitativo de match + mini-avatares de "gente como vos") como traducción humana del Fama Score predictivo. La búsqueda ocurre tras una pausa narrativa de 750 ms ("Leyendo tus gustos…") que comunica que hay un cerebro detrás, no un SQL. El header de resultados permite refinar la query in-place y dispara nuevamente la pausa. Como corolario, el buscador permanente del TopNav desktop se eliminó: era ruido competitivo contra el input hero del home y rompía la tesis de "buscar es expresar intención", no "tener un campo siempre visible". | Apéndice §15 |

Cuando se tome una nueva decisión que afecte la marca, la navegación o la jerarquía visual: se suma una fila acá con el resumen y se profundiza la justificación en el doc de entrega.