# Mapa de navegación — Spota v3

**22 CU** · 5 tabs · CU-08 absorbido en CU-07 · Marketplace contextual · Planes como tab propio

---

## Spota App (raíz)

```
Spota App
│
├── Pre-login (sin sesión)
│   ├── [CU-01] Registrar cuenta ......................... N1
│   ├── [CU-02] Iniciar sesión ........................... N1
│   │   └── [CU-03] Recuperar contraseña ................. N2
│
├── Post-login — Tab bar (acceso permanente)
│   │
│   ├── Tab 1 · Descubrir
│   │   └── [CU-06] Descubrir experiencias por intención . N1
│   │
│   ├── Tab 2 · Colecciones
│   │   ├── [CU-10] Crear colección ...................... N2
│   │   └── [CU-11] Explorar colecciones comunidad ....... N2
│   │
│   ├── Tab 3 · Publicar
│   │   └── [CU-07] Publicar experiencia ................. N1
│   │         (incluye valoración de experiencias ajenas,
│   │          ex CU-08 — absorbido en v3)
│   │
│   ├── Tab 4 · Planes                                    Δ v3
│   │   └── [CU-12] Crear plan grupal .................... N1
│   │       ├── [CU-13] Votar opciones del plan grupal ... N2
│   │       └── [CU-14] Cerrar plan grupal ............... N2
│   │
│   └── Tab 5 · Perfil
│       ├── [CU-04] Gestionar preferencias ............... N2
│       ├── [CU-05] Gestionar credenciales ............... N2
│       ├── [CU-09] Gestionar experiencias propias ....... N2
│       ├── [CU-17] Registrarse como host ................ N2
│       │   └── [CU-18] Postularse a oferta de viaje ..... N3
│
├── Marketplace — acceso contextual                       Δ v3
│   ├── [CU-15] Publicar oferta de viaje ................. N2 (ctx)
│   │   └── [CU-16] Contratar host ....................... N3
│   │
│   Puntos de entrada:
│     · Desde Descubrir (CU-06)
│     · Desde una Colección (CU-10)
│     · Desde un Plan grupal (CU-12)
│
└── Portal Negocios (app/login separado)
    ├── [CU-20] Registrar negocio asociado ............... N1
    │   └── [CU-19] Reclamar perfil del lugar ............ N2
    ├── [CU-21] Gestionar beneficios exclusivos .......... N1
    ├── [CU-22] Configurar campaña publicitaria .......... N1
    └── [CU-23] Acceder al panel de insights ............. N1
```

---

## Leyenda

| Símbolo | Significado |
|---------|-------------|
| N1 | Acceso directo (nivel 1) |
| N2 | Se accede desde el padre (nivel 2) |
| N3 | Se accede desde el abuelo (nivel 3) |
| ctx | Acceso contextual (múltiples puntos de entrada) |
| Δ v3 | Cambio incorporado en esta versión |

---

## Cambios en v3 respecto a v2

| Cambio | Detalle |
|--------|---------|
| CU-08 absorbido | "Valorar experiencia de la comunidad" pasa a ser un paso dentro de CU-07 "Publicar experiencia". La valoración solo tiene sentido si el usuario vivió la experiencia, y la tasa de participación sube cuando está embebida en un flujo que el usuario ya está completando. Conteo baja de 23 a 22. |
| Marketplace contextual | CU-15 y CU-16 salen de Perfil. El usuario piensa en contratar un host mientras planifica un viaje, no mientras gestiona su cuenta. El acceso aparece desde Descubrir, Colecciones y Planes. |
| Planes como tab propio | CU-12, CU-13 y CU-14 pasan a tab independiente. Una colección es un objeto pasivo (lista de lugares), un plan grupal es un objeto activo (participantes, votación, estado). Son intenciones distintas del usuario. |

---

## Cobertura por actor

| Actor | CU | Rango |
|-------|-----|-------|
| Usuario | 16 | CU-01 a CU-16 (excepto CU-08 absorbido) |
| Host | 2 | CU-17, CU-18 |
| Negocio | 5 | CU-19 a CU-23 |
| **Total** | **22** | |

---

## Cobertura por fuente de ingreso

| Fuente de ingreso | CU que la instrumenta |
|-------------------|-----------------------|
| Comisión por contratación de hosts | CU-16 Contratar host |
| Alianzas exclusivas | CU-21 Gestionar beneficios exclusivos |
| Publicidad segmentada | CU-22 Configurar campaña publicitaria |
| SaaS de insights B2B | CU-23 Acceder al panel de insights |
