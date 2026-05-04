# Prototipo Spota — Desktop

Versión desktop del prototipo navegable. Paralelo al mobile que vive en `prototipo/`.

## Cómo correr

Desde esta carpeta:

```bash
python3 -m http.server 8001
```

Luego abrir `http://localhost:8001/Spota%20Prototipo%20Desktop.html` en el browser. El servidor del mobile (puerto 8000) puede correr en paralelo.

## Estado actual

**Fase 1.A — Skeleton.** TopNav + design system + pantalla placeholder. Verificación de paleta, tipografía y nav.

Próxima: Fase 1.B — Discover desktop completo con lista + mapa simultáneos.

El detalle del plan vive en [`../entrega/plan-desktop.md`](../entrega/plan-desktop.md).

## Decisiones de arquitectura

- HTML autocontenido (igual estrategia que el mobile): React 18 + Babel CDN, sin build.
- Breakpoint mínimo: **1024 px**. Por debajo, se muestra un aviso con redirect sugerido al mobile.
- Design system copiado del mobile, no compartido por archivo. Si en una segunda fase se quiere consolidar, se puede extraer un `design-system.js` común.
- Routing por `useState` (igual que el mobile). Sin `react-router` para mantener el archivo único.
