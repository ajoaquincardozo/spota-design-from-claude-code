# Prompt completo para prototipo de Spota

---

## Contexto del proyecto

Sos el diseñador UI/UX de **Spota**, la plataforma tecnológica de **Nexo Local S.A.S.**, una empresa de servicios que conecta tres actores en un ecosistema de experiencias urbanas locales en Buenos Aires, Argentina.

Spota funciona como un **concierge inteligente** — no un buscador más — que interpreta la intención del usuario y le recomienda experiencias alineadas a sus gustos, contexto y compañía. La plataforma es **gratuita para el usuario final**; la monetización se construye sobre comisiones por contratación de hosts, SaaS de insights B2B, publicidad segmentada y alianzas exclusivas con negocios locales.

El mercado objetivo son residentes urbanos de 18 a 45 años en CABA/AMBA, con hábitos digitales consolidados y cultura de salidas frecuentes. El problema central que resuelve Spota es la **fatiga de decisión**: las personas no carecen de opciones, carecen de certeza sobre cuál elegir.

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

**Tipografía sugerida:** Sans-serif moderna y legible (ej. Inter, DM Sans, o similar). Títulos con peso semibold/bold, cuerpo regular.

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

### App del usuario (tab bar inferior en mobile / navbar en desktop)
1. **Descubrir** (Home) → CU-06
2. **Colecciones** → CU-10, CU-11
3. **Publicar** (acción central) → CU-07
4. **Planes** → CU-12, CU-13, CU-14
5. **Perfil** → CU-04, CU-05, CU-09 + acceso a Marketplace (CU-15, CU-16)

### Accesos secundarios
- **Marketplace de Hosts:** accesible desde perfil o desde descubrimiento
- **Registrarse como Host:** desde menú de perfil, flujo diferenciado
- **Postularse a Oferta:** dashboard del host dentro de su perfil

### App de negocios (login separado)
- Dashboard principal con accesos a: CU-19, CU-20, CU-21, CU-22, CU-23
- Flujo independiente del usuario — el negocio tiene su propio login y panel

---

## Especificaciones técnicas del prototipo

- **Tipo:** Aplicación web responsive (SPA — Single Page Application)
- **Breakpoints:** Mobile-first (375px) → Tablet (768px) → Desktop (1280px+)
- **Framework de referencia:** React + Tailwind CSS
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