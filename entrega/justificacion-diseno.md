# Justificación del diseño — Spota

Documento que justifica las decisiones de diseño del prototipo navegable de Spota, conforme al pedido de la Entrega Informal definido en `Clase 4 - Promp org semana.pdf`. La argumentación se construye sobre el modelo de negocio antes que sobre las capacidades técnicas; las decisiones de implementación se mencionan como medio para sostener el argumento de producto.

Versión: v1 · Fecha: 2026-05-03

---

## 1. Sitio navegable e inventario de pantallas

El prototipo se sirve localmente desde `prototipo/Spota Prototipo.html`, un único archivo autocontenido que se levanta con `python3 -m http.server` y queda accesible en `http://localhost:8000/Spota%20Prototipo.html`. La elección del archivo único responde a la necesidad de iterar diseño sin fricción de build durante la fase de prototipado.

El prototipo cubre 31 pantallas, agrupadas por bloque funcional. El requerimiento mínimo de la cátedra es 20; la cobertura actual excede ese umbral para permitir flujos completos en cada actor del ecosistema.

| Grupo | CU | Pantalla | Componente |
|---|---|---|---|
| Onboarding | — | Splash / Welcome | `ScreenSplash` |
| Onboarding | CU-01 | Crear cuenta | `ScreenRegister` |
| Onboarding | CU-02 | Iniciar sesión (toggle Usuario / Negocio) | `ScreenLogin` |
| Onboarding | CU-03 | Recuperar contraseña | `ScreenRecover` |
| Onboarding | CU-04 | Preferencias iniciales (4 pasos) | `ScreenPreferences` |
| Onboarding | CU-05 | Credenciales y privacidad | `ScreenCredentials` |
| Descubrimiento | CU-06 | Descubrir / home (lista + mapa) | `ScreenDiscover` |
| Descubrimiento | CU-06 | Detalle de lugar | `ScreenPlaceDetail` |
| Descubrimiento | CU-06 | Resultados de búsqueda | `ScreenSearchResults` |
| Experiencias | CU-07 | Publicar experiencia | `ScreenPublish` |
| Experiencias | CU-08 | Valorar reseña de la comunidad | `ScreenRateCommunity` |
| Experiencias | CU-09 | Mis experiencias | `ScreenMyExperiences` |
| Colecciones | CU-10 | Mis colecciones | `ScreenCollections` |
| Colecciones | CU-10 | Crear colección | `ScreenCreateCollection` |
| Colecciones | CU-11 | Detalle de colección | `ScreenCollectionDetail` |
| Planificación | CU-12 | Mis planes | `ScreenPlans` |
| Planificación | CU-13 | Crear plan grupal | `ScreenCreatePlan` |
| Planificación | CU-14 | Votar plan | `ScreenPlanVote` |
| Planificación | CU-14 | Cerrar plan | `ScreenPlanClose` |
| Hosts | CU-15 | Marketplace de hosts | `ScreenHostMarketplace` |
| Hosts | CU-15 | Publicar oferta de viaje | `ScreenCreateOffer` |
| Hosts | CU-16 | Contratar host | `ScreenHireHost` |
| Hosts | CU-17 | Ser host en Spota (registro) | `ScreenRegisterHost` |
| Hosts | CU-18 | Dashboard de host | `ScreenHostDashboard` |
| Negocios | CU-19 | Reclamar mi lugar | `ScreenClaimPlace` |
| Negocios | CU-20 | Registrar negocio | `ScreenRegisterBiz` |
| Negocios | — | Panel de negocios (home) | `ScreenBizHome` |
| Negocios | CU-21 | Beneficios exclusivos | `ScreenBizBenefits` |
| Negocios | CU-22 | Campaña publicitaria | `ScreenBizCampaign` |
| Negocios | CU-23 | Insights de zona | `ScreenBizInsights` |
| Otros | — | Perfil | `ScreenProfile` |

---

## 2. Arquitectura de información

La estructura de navegación se organiza alrededor de una tab bar inferior de cinco posiciones, con el botón central de publicar en color contrastante para diferenciar la acción primaria de las pestañas de exploración. El borrador completo del mapa convive en `por-validar/Mapa_Navegacion_Spota_v3.md` y se profundizará en una sección posterior.

La premisa de diseño que guía la arquitectura es la regla práctica de mantener cualquier acción esencial a una distancia máxima de tres pulsaciones desde la pantalla principal. La tab bar resuelve la primera capa; las pantallas internas aplican entradas directas desde cards o cabeceras.

---

## 3. Justificación de la navegación

La decisión de centralizar el descubrimiento en una pantalla home semántica responde al problema de negocio que da origen a Spota: la fatiga de decisión. Las personas no carecen de opciones, carecen de certeza sobre cuál elegir. Por eso la primera pantalla útil tras el login no es un menú de funcionalidades sino una vitrina de recomendaciones por afinidad, con la búsqueda semántica visible y los planes destacados.

La tab bar de cinco entradas sigue la regla mnemotécnica de mantenerse en el rango óptimo de elementos que el usuario procesa de un vistazo. Los cinco lugares se asignan a Descubrir, Colecciones, Publicar (acción central, terracota), Planes y Perfil. La asimetría visual del centro responde a la Ley de Fitts y a la importancia estratégica de la publicación: alimentar el Fama Score y el Proof of Visit con experiencias reales es la condición que sostiene todo el diferencial competitivo.

El acceso a Marketplace de Hosts y al onboarding de Host vive dentro del Perfil, en línea con el principio de que ese rol es una evolución natural del usuario. Quien conoce su barrio puede transformar ese conocimiento en servicio sin necesidad de salir de la app del usuario. El acceso a Negocios, en cambio, no aparece en el perfil del consumidor: un usuario *se vuelve* Host, pero *es* dueño de un Negocio. Esa asimetría conceptual se refleja en la arquitectura: el panel de negocios tiene login separado, y su entry point vive solamente en el splash y en el toggle Usuario/Negocio del login.

Los flujos en wizard (publicar experiencia, crear colección, crear plan, publicar oferta de viaje) usan progress bar superior y un único botón de cierre con ícono X en el primer paso, que cambia a flecha de retroceso a partir del segundo. Esa convención reduce la ambigüedad sobre qué significa "salir": la X cancela el flujo completo, la flecha vuelve un paso.

---

## 4. Paleta de colores según orientación del negocio

Spota no es un servicio tecnológico genérico ni un agregador frío de opiniones. El producto se posiciona como concierge inteligente con identidad barrial, comunitaria y cálida, asociado a comercios y experiencias reales. Esa orientación descarta los códigos cromáticos del sector tech (azul corporativo, gris neutro) y los códigos del entretenimiento masivo (rojo intenso, negro).

La paleta elegida se nombra **Cercanía Local** y se construye sobre tres tonos cálidos de raíz natural más un fondo crema y un texto marrón oscuro:

| Rol | Color | Hex | Justificación de negocio |
|---|---|---|---|
| Primario | Verde petróleo | `#2F6F5E` | Equilibrio, confianza, cercanía. Aporta seriedad sin caer en el azul corporativo. Funciona como botón principal y elemento de navegación. |
| Secundario | Terracota | `#B85C38` | Lo local, lo humano, lo artesanal. Remite al ladrillo, al barro cocido, a la fachada del barrio. Conduce las acciones de conversión y los tags emocionales. |
| Acento | Arena dorada | `#E9A23B` | Valor, beneficio, distinción. Refuerza el Fama Score y los premios visuales sin sonar a tier pago. |
| Fondo | Crema | `#FFF8ED` | Calidez ambiente. Reemplaza al blanco puro, que asocia el producto con superficies clínicas o tech genérico. |
| Texto | Marrón oscuro | `#2B2523` | Contraste alto sobre crema sin la dureza del negro. Mantiene el carácter cálido del conjunto. |

El ejemplo del enunciado de cátedra ilustra el criterio inverso: una propuesta de comedia justificaría rojo y marrón porque su orientación de negocio convoca emoción y lo análogo; una propuesta tecnológica justificaría azul o gris porque su orientación convoca racionalidad y precisión. En Spota la orientación es local-cálida, por lo que la paleta se construye con verdes, ocres y arenas, alejándose de los códigos tech y de los códigos del espectáculo.

---

## 5. Tipografía

Se utilizan dos familias complementarias. La principal es **DM Sans**, sans-serif moderna y legible, que cubre toda la interfaz funcional (botones, inputs, cards, navegación, cuerpo de texto). La secundaria es **Fraunces** en cursiva, una serif contemporánea que aparece exclusivamente en acentos cortos sobre titulares ("cerca tuyo", "hoy", "vuelta", "Maestro"). El contraste entre la geometría neutra de DM Sans y el carácter expresivo de Fraunces produce un efecto editorial sin sacrificar legibilidad.

La jerarquía tipográfica respeta tres pesos: regular para cuerpo, semibold para énfasis y subtítulos, bold para titulares de pantalla. El tamaño mínimo de cuerpo es 14 px, conforme a las recomendaciones de accesibilidad para mobile-first.

---

## 6. Diseño según teoría

El diseño aplica conceptos visuales que sostienen la usabilidad sin requerir explicación al usuario. Esta sección describe los aplicados en el prototipo; pendiente profundizar con bibliografía cuando corresponda.

**Jerarquía visual.** Cada pantalla establece un único punto focal por momento de interacción. En el detalle de lugar, la imagen domina la mitad superior; el nombre del lugar y el Fama Score capturan la mirada inmediatamente debajo, antes de la descripción. La acción primaria (Marcar como visitado) recibe contraste cromático máximo.

**Principios Gestalt.** La agrupación por proximidad ordena las cards de lugares en grids consistentes. La similitud cromática separa categorías de información: los tags de estado (Popular, Nuevo, Recomendado) viven en terracota; los badges de verificación, en verde; el rating y los beneficios, en dorado. La continuidad guía el recorrido visual desde la cabecera hasta la acción.

**Affordance y consistencia.** Los elementos interactivos comparten un repertorio acotado: botones primarios con relleno verde petróleo, secundarios con outline, cards con sombra sutil sobre fondo crema. La repetición del lenguaje permite que el usuario aprenda una vez y reconozca por toda la app.

**Heurísticas de Nielsen.** El sistema mantiene el estado visible (progress bar en wizards, tab activa marcada), permite reversibilidad (back en cada pantalla interna, X para cancelar wizards), y prioriza el reconocimiento sobre el recuerdo (placeholders semánticos en la búsqueda que rotan ejemplos reales).

### Las 10 leyes de UX/UI aplicadas a Spota

La tabla siguiente sintetiza las 10 leyes principales de UX/UI ([referencia](https://uxenespanol.com/articulo/10-leyes-principales-de-uxui)) y describe cómo se aplican concretamente en el prototipo. Las leyes que requieren tratamiento extendido (Fitts y Miller) se desarrollan en sus propias secciones a continuación.

| # | Ley | Aplicación concreta en Spota |
|---|---|---|
| 1 | **Ley de Fitts** | Detallada en §8. Botón Publicar central de la tab bar, áreas táctiles de 44 px mínimo, CTAs primarios siempre dentro del thumb-zone. |
| 2 | **Ley de Hick** | El tiempo de decisión crece con la cantidad de opciones visibles. La tab bar inferior se mantiene en 5 entradas, los filtros del mapa funcional en 4, los stats del perfil en 3. Cada decisión que carga al usuario se mantiene en el rango bajo. |
| 3 | **Ley de Miller (5 ± 2)** | Detallada en §7. La memoria de trabajo retiene de cinco a nueve unidades, con foco práctico en siete. |
| 4 | **Ley de Jakob** | El usuario espera que el producto funcione como otros que ya conoce. Spota adopta patrones reconocibles del ecosistema mobile contemporáneo: tab bar inferior con FAB central (Instagram, Airbnb), cards de lugar con foto dominante y rating (Airbnb, Tripadvisor), login con Google/Apple, swipe entre tabs, sheets modales para acciones rápidas. |
| 5 | **Ley de Pareto (80/20)** | El 80 % del valor proviene del 20 % de las funciones. Las acciones de mayor frecuencia (descubrir, publicar, planificar en grupo) ocupan la tab bar y el FAB central; el resto del catálogo funcional vive en niveles secundarios accesibles desde tarjetas, perfil o contextos específicos. |
| 6 | **Ley de Tesler (conservación de la complejidad)** | Existe un mínimo irreductible de complejidad que alguien debe asumir. En Spota, el motor de recomendación absorbe la complejidad (interpretación semántica de la búsqueda, ponderación del Fama Score por afinidad, cruce de preferencias del grupo). El usuario expresa la intención en lenguaje natural y recibe resultados ordenados, sin necesidad de aplicar filtros obligatorios. |
| 7 | **Ley de proximidad (Gestalt)** | Elementos cercanos se perciben como grupo. Los stats del perfil (Visitados / Reseñas / Colecciones) se agrupan en una grilla compacta; los chips de categoría comparten contenedor; los bullets de beneficio del entry-card Host se distribuyen en una sola línea visual. |
| 8 | **Ley de similitud (Gestalt)** | Elementos similares se perciben como relacionados. La paleta cumple este rol con un código consistente: terracota identifica estados de descubrimiento (Popular, Nuevo, Recomendado), verde identifica verificación y confianza (Proof of Visit, badges activos), arena identifica valor (rating, beneficios exclusivos, niveles del Fama Score). |
| 9 | **Efecto Von Restorff (aislamiento)** | Lo que rompe la consistencia se recuerda mejor. El FAB central en terracota destaca sobre la tab bar verde; el badge "Visitado" en verde se separa de los tags emocionales en terracota; el CTA primario de cada pantalla recibe el contraste cromático máximo. |
| 10 | **Ley de Doherty (umbral 400 ms)** | Las interfaces que responden por debajo de 400 ms se sienten fluidas. Las transiciones se mantienen cortas (slideUp 240 ms para sheets, hover 150 ms), los placeholders semánticos rotan con fadeIn de 250 ms, y la animación de pulso del pin de ubicación se prolonga a 2 s porque comunica presencia ambiental, no respuesta a una acción. |

---

## 7. Regla 5±2 (memoria de trabajo)

La capacidad de la memoria de trabajo para retener elementos no relacionados se ubica en torno a siete unidades, con margen práctico de cinco a nueve. El diseño respeta ese límite en los puntos donde la decisión exige carga cognitiva.

**Tab bar inferior: 5 elementos.** Descubrir, Colecciones, Publicar, Planes, Perfil. Se mantiene en el extremo bajo del rango para permitir reconocimiento instantáneo y compatibilidad con un alcance pulgar cómodo.

**Filtros del mapa funcional: 4 elementos.** Todos, Abre ahora, Visitados, Guardados. La cantidad permite ver todas las opciones a la vez sin scroll, lo que sostiene una decisión rápida sin recordar opciones ocultas.

**Stats del perfil: 3 elementos.** Visitados, Reseñas, Colecciones. La síntesis prioriza los indicadores que el usuario asocia a su identidad en la plataforma.

**Categorías de Preferences (CU-04): 8 elementos.** Cafés, Comida, Bares, Cultura, Aire libre, Música en vivo, Cine y teatro, Bienestar. Excede el rango porque el contexto es distinto: no se requiere memorizar una lista para decidir, se trata de una exploración pasiva donde el usuario reconoce visualmente cada opción y selecciona las que aplican. La regla de 5±2 aplica a la decisión bajo carga, no al reconocimiento bajo affordance visual.

---

## 8. Ley de Fitts

La Ley de Fitts establece que el tiempo necesario para alcanzar un objetivo crece con la distancia y decrece con el tamaño del objetivo. El diseño aplica esa relación en tres dimensiones.

**Tamaño mínimo de área táctil: 44 px.** Todos los botones, chips y elementos de navegación cumplen ese piso, conforme a la guía de Apple Human Interface y Material. Los íconos de back flotantes sobre imágenes se renderizan en círculos de 40 px con borde y sombra para garantizar contraste con la imagen de fondo.

**Botón de publicar en posición central de la tab bar.** La acción de publicar experiencia es el motor que alimenta el Fama Score y, por extensión, todo el modelo de recomendación. Su ubicación central y su tratamiento cromático en terracota (color secundario, máximo contraste contra el primario verde de la nav) reducen el costo de inicio a un movimiento mínimo del pulgar.

**Acciones primarias dentro del thumb-zone.** Los CTA de cada pantalla (Continuar, Iniciar sesión, Marcar como visitado, Enviar valoración) se posicionan en el tercio inferior, donde el pulgar opera con menor desplazamiento sobre dispositivos sostenidos con una mano. Las acciones secundarias o de navegación destructiva (Cancelar, Eliminar) se ubican en posiciones que requieren intención explícita, evitando aciertos accidentales.

---

## 9. Especificación de requerimientos por pantalla

Pendiente de desarrollo completo en próxima iteración. La sección se construirá tomando cada uno de los 23 casos de uso definidos en `Claude.md` y especificando para cada pantalla las entradas, salidas, validaciones y casos borde que el front-end deberá manejar.

Estructura propuesta de la tabla por pantalla:

| Campo | Contenido |
|---|---|
| ID y CU | Identificador interno + caso de uso del enunciado |
| Entradas | Datos que recibe (params, contexto del usuario, estado previo) |
| Salidas | Acciones disparadas y navegación posterior |
| Validaciones | Reglas de negocio que se ejecutan antes de avanzar |
| Casos borde | Estados vacíos, errores, sin conexión, datos parciales |

---

## 10. Separación de funcionalidades por orientación (FE / BE / BO)

Pendiente de desarrollo completo. La separación se construirá mapeando cada CU a las capas que lo sostienen.

Lineamiento general:

- **Frontend (app del usuario).** Todos los CUs del bloque Usuario (onboarding, descubrimiento, experiencias, colecciones, planificación, contratación de hosts).
- **Backend.** Servicios que sostienen el motor de recomendación (Fama Score, Proof of Visit), la persistencia de experiencias, el matching del marketplace de hosts y la validación geolocalizada.
- **Backoffice / panel de negocios.** Login separado, gestión de beneficios, configuración de campañas y acceso a insights agregados. Conforme a la asimetría descripta en la sección de navegación, este panel mantiene su propia identidad de aplicación y comparte únicamente la capa de datos con el front del usuario.

---

## Apéndice — Decisiones de implementación tomadas durante el prototipado

Las decisiones que siguen no estaban en el brief original y se tomaron durante la construcción del prototipo. Se documentan aquí para preservar la trazabilidad del razonamiento.

1. **Niveles del Fama Score: Nuevo · Conocido · Habitué · Referente · Maestro.** El brief no definía un sistema de niveles. La progresión elegida usa léxico cotidiano del barrio porteño y evita términos del lenguaje SaaS ("Pro", "Premium") que contradicen la orientación de marca.

2. **Iconografía de Preferences y Nueva colección: SVG lineales con tinte terracota.** Reemplaza los emojis nativos del sistema operativo, que rompen consistencia visual entre dispositivos y tienen estilo "fluffy 3D" incompatible con la interfaz plana. Los íconos se integran al Icon system existente del prototipo y se aplican al onboarding de preferencias y al picker de tema de las Colecciones.

3. **Asimetría Host/Negocio en la arquitectura.** Detallado en la sección de Justificación de la navegación. El entry point de Negocio se eliminó del perfil del usuario y queda accesible solamente desde el splash y el toggle Usuario/Negocio del login.

4. **Layout full-bleed para Welcome, Login, Register y Recover.** Contenido centrado verticalmente, CTA fijo en el pie, sin AppHeader convencional. Refuerza la calidez del onboarding y libera espacio visual en pantallas de baja densidad informativa.

5. **Mapa funcional del Discover.** Estilizado tipo plano de Palermo con avenidas principales, calles secundarias, manzanas, dos espacios verdes (Bosques y plaza), río al sur, etiquetas de barrio, pin de "tu ubicación" con animación de pulso, filtros flotantes superiores, controles laterales de zoom y mi-ubicación, y botón "Buscar en esta zona". La estilización refuerza el carácter local del producto sin requerir integración con un proveedor de mapas en esta fase.

6. **Arquitectura técnica del prototipo: HTML autocontenido.** El prototipo vive en un único archivo `Spota Prototipo.html` que carga React y Babel desde CDN y compila JSX en el browser. Los archivos `.jsx` sueltos del directorio `template/` reflejan un estado anterior y no se cargan en runtime; se conservan como respaldo histórico.

7. **Diagrama de estados del CTA en el detalle de lugar.** El brief no especificaba qué acción primaria mostrar en cada momento del ciclo de vida de una visita. La primera versión del prototipo mostraba siempre "Marcar como visitado", lo que generaba contradicción cuando el lugar ya tenía el badge Visitado activo. Para resolverlo, se modeló el ciclo de la interacción del usuario con un lugar como una máquina de estados de cuatro estados visibles, alineada al mecanismo de Proof of Visit definido en `docs/Proof_of_Visit_Mecanismo_y_Flujo_de_Experiencia.md`.

   ```
                            ┌─────────────────────────────────┐
                            │           DISPONIBLE             │
                            │   CTA: [Quiero ir]              │◄──── estado inicial
                            └────────────┬────────────────────┘
                                         │
                               tap "Quiero ir"
                                         │
                                         ▼
                            ┌─────────────────────────────────┐
                            │       INTENCIÓN DECLARADA        │
                            │   CTA: [En camino · cancelar]   │
                            │   (ventana de validación abierta)│
                            └──────┬──────────────────┬───────┘
                                   │                  │
                     GPS dentro    │                  │  ventana cerró
                     del radio     │                  │  sin validar
                                   ▼                  ▼
                     ┌──────────────────────┐   ┌──────────────────────┐
                     │      VISITADO         │   │   NO VERIFICADO      │
                     │  Badge: Visitado     │   │  Sin badge           │
                     │  CTA: [Publicar      │   │  CTA: [Quiero ir]    │
                     │   experiencia]       │   │  o publicar sin      │
                     │                      │   │  verificar (fallback)│
                     └──────────┬───────────┘   └──────────────────────┘
                                │
                          publica reseña
                                │
                                ▼
                     ┌──────────────────────┐
                     │      PUBLICADO        │
                     │  Badge: Visitado     │
                     │  Chip: Reseñado      │
                     │  CTA: [Ver tu reseña]│
                     └──────────────────────┘
   ```

   El estado **Intención declarada** introduce un comportamiento explícito de la plataforma: una vez que el usuario tocó "Quiero ir", aparece un aviso visible ("Te esperamos hasta las 21:30") que comunica la ventana de validación. Esto refuerza la confianza del usuario en el sistema antes de que la verificación ocurra. La acción "Guardar" (favoritos) es ortogonal y permanece disponible en cualquier estado.

8. **Wizard de publicación de experiencia: tres pasos en lugar de cuatro.** La primera versión del wizard incluía un paso intermedio de validación de presencia por GPS al momento de publicar. Esta forma del flujo es incompatible con el mecanismo de Proof of Visit, que valida la visita en silencio dentro de una ventana temporal abierta cuando el usuario tocó "Quiero ir" en el descubrimiento. Si la validación ya se resolvió antes, repetirla en el momento de publicar es redundante; si no se resolvió, no tiene sentido pedirla cuando el usuario está en su casa horas después.

   El wizard reorganizado tiene tres pasos:

   - **Paso 1 — ¿Qué visita querés contar?** Lista filtrada exclusivamente a las visitas con Proof of Visit ya validado y aún no reseñadas. No hay entrada manual de lugar. Si el usuario no tiene visitas pendientes, se muestra un empty state que lo redirige a Descubrir para declarar una intención.
   - **Paso 2 — ¿Cómo lo viviste?** Valoración con estrellas, reseña en texto libre y chips de etiquetas sugeridas que el usuario puede sumar al cuerpo del comentario.
   - **Paso 3 — ¿Quién la puede ver?** Visibilidad pública o privada y, si la experiencia involucró a un host contratado, calificación del servicio.

   El paso eliminado era de tipo "loading visual" sin valor funcional. Su remoción reduce el costo cognitivo del flujo de publicación y elimina la incongruencia entre la promesa del modelo (validación silenciosa en background) y la implementación inicial (validación interactiva en línea).
