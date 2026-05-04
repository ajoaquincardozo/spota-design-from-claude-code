# Prototipo Spota — Desktop

Versión desktop del prototipo navegable. Paralelo al mobile que vive en `prototipo/`.

## Cómo correr

Desde esta carpeta:

```bash
python3 -m http.server 8001
```

Luego abrir `http://localhost:8001/Spota%20Prototipo%20Desktop.html` en el browser. El servidor del mobile (puerto 8000) puede correr en paralelo.

## Estado actual

**6 fases completadas — paridad funcional con el mobile sobre las 23 CUs.**

| Fase | Pantallas | Outcome |
|---|---|---|
| 1.A | Skeleton + design system + TopNav + UI Kit | Shell aprobable |
| 1.B | Discover desktop con lista + mapa simultáneos | Pivote del producto |
| 2 | Detalle de lugar + Colecciones + Detalle de colección | Flujo de descubrimiento completo |
| 3 | Publicar (3 pasos) + Planes (lista, votar, cerrar) + HostBlock | Flujo de experiencias y coordinación |
| 4 | Marketplace de Hosts + Crear oferta + Postulaciones + Registrar host + Dashboard host | Flujo de hosts |
| 5 | Negocios B2B (Registrar, Reclamar, Dashboard, Beneficios, Campañas, Insights) con BizFrame | Flujo B2B con shell separado |
| 6 | Perfil de usuario + polish (hover unificado, micro-transitions) | Entregable |

## Pantallas y rutas

### App de usuario (DesktopFrame con TopNav)
- `home` · Discover (CU-06)
- `placeDetail` · Detalle de lugar con sub-máquina del CTA (D8)
- `collections` · Mis colecciones / De la comunidad (CU-10, CU-11)
- `collectionDetail` · Detalle de colección
- `publish` · Wizard 3 pasos (CU-07, D9)
- `plans` · Lista de planes (CU-12)
- `createPlan` · Wizard 3 pasos (CU-13)
- `planVote` · Tablero de votación con HostBlock
- `planClose` · Cerrar plan con Con host (CU-14)
- `hostMarketplace` · Marketplace contextual desde plan (CU-15)
- `createOffer` · Wizard publicar oferta
- `hireHost` · Postulaciones recibidas (CU-16)
- `registerHost` · Onboarding host (CU-17)
- `hostDashboard` · Panel del host con ofertas (CU-18)
- `profile` · Perfil con Fama Score, stats, Mi actividad, Ser host, Cuenta

### Panel B2B (BizFrame con sidebar)
- `bizRegister` · Alta sin frame (entry point separado, D3)
- `bizHome` · Dashboard del negocio
- `claimPlace` · Reclamar perfil del lugar (CU-19)
- `bizBenefits` · Beneficios exclusivos (CU-21)
- `bizCampaign` · Campañas publicitarias (CU-22)
- `bizInsights` · Insights de zona (CU-23)

### Referencia
- `uikit` · UI Kit / Design System (accesible vía ✦ del TopNav)

## Decisiones de arquitectura

- HTML autocontenido (igual estrategia que el mobile): React 18 + Babel CDN, sin build.
- Breakpoint mínimo: **1024 px**. Por debajo, se muestra un aviso con redirect sugerido al mobile.
- Routing 3-vías:
  - `NO_FRAME_SCREENS` (bizRegister): sin chrome, full-bleed.
  - `BIZ_SCREENS` (panel B2B): `BizFrame` con sidebar permanente.
  - Resto: `DesktopFrame` con TopNav y footer.
- Design system copiado del mobile, no compartido por archivo. Si en una segunda fase se quiere consolidar, se puede extraer un `design-system.js` común.
- Decisiones de mobile honradas: D2 (iconos SVG), D3 (asimetría Host/Negocio), D8 (sub-máquina del CTA), D9 (wizard 3 pasos), D10 (HostBlock).

## Detalle del plan

El detalle completo del plan, transformaciones de mobile→desktop y trade-offs vive en [`../entrega/plan-desktop.md`](../entrega/plan-desktop.md).
