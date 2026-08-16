// ========================================================================
// 05-screens-designsystem.jsx
// ========================================================================
// Pantalla de referencia del design system. Accesible vía el ícono ✦ del TopNav.
// No es parte del producto; vive como referencia permanente de UI/UX.
const ScreenDesignSystem = ({ current, nav }) => {
  return (
    <section>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
        <Icon name="sparkles" size={26} color={SPOTA.c.primary} />
        <h1 style={{ margin: 0, fontFamily: SPOTA.font.ui, fontSize: 30, fontWeight: 700, letterSpacing: -0.5 }}>
          UI Kit <span style={{ fontFamily: SPOTA.font.serif, fontStyle: 'italic', fontWeight: 500, color: SPOTA.c.secondary }}>de Spota</span>
        </h1>
      </div>
      <p style={{ margin: '0 0 28px', fontFamily: SPOTA.font.ui, fontSize: 15, color: SPOTA.c.textSoft, lineHeight: 1.55, maxWidth: 720 }}>
        Página de referencia del design system. Documenta paleta, tipografía y primitives.
        No es parte del flujo de producto; vive acá como tercera URL de consulta de UI/UX, junto al
        prototipo mobile y al desktop.
      </p>

      {/* Smoke test: muestra la paleta, los pesos tipográficos y los componentes base para verificar el render. */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
        <div style={{
          padding: 20, borderRadius: 16, background: SPOTA.c.surface, border: `1px solid ${SPOTA.c.lineSoft}`,
        }}>
          <h3 style={{ margin: '0 0 12px', fontFamily: SPOTA.font.ui, fontSize: 14, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, color: SPOTA.c.textMuted }}>Paleta</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8 }}>
            {[
              { c: SPOTA.c.primary, label: 'Primario' },
              { c: SPOTA.c.secondary, label: 'Secundario' },
              { c: SPOTA.c.accent, label: 'Acento' },
              { c: SPOTA.c.bg, label: 'Fondo' },
              { c: SPOTA.c.text, label: 'Texto' },
            ].map(s => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{ height: 48, borderRadius: 10, background: s.c, border: s.c === SPOTA.c.bg ? `1px solid ${SPOTA.c.line}` : 'none' }} />
                <div style={{ fontFamily: SPOTA.font.ui, fontSize: 11, color: SPOTA.c.textSoft, marginTop: 6 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{
          padding: 20, borderRadius: 16, background: SPOTA.c.surface, border: `1px solid ${SPOTA.c.lineSoft}`,
        }}>
          <h3 style={{ margin: '0 0 12px', fontFamily: SPOTA.font.ui, fontSize: 14, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, color: SPOTA.c.textMuted }}>Tipografía</h3>
          <div style={{ fontFamily: SPOTA.font.ui, fontSize: 22, fontWeight: 700, color: SPOTA.c.text, letterSpacing: -0.4 }}>
            ¿Qué hacemos <span style={{ fontFamily: SPOTA.font.serif, fontStyle: 'italic', fontWeight: 400, color: SPOTA.c.secondary }}>hoy</span>?
          </div>
          <p style={{ margin: '8px 0 0', fontFamily: SPOTA.font.ui, fontSize: 14, color: SPOTA.c.textSoft, lineHeight: 1.5 }}>
            DM Sans para UI · Fraunces serif italic para acentos cortos.
          </p>
        </div>

        <div style={{
          padding: 20, borderRadius: 16, background: SPOTA.c.surface, border: `1px solid ${SPOTA.c.lineSoft}`,
        }}>
          <h3 style={{ margin: '0 0 12px', fontFamily: SPOTA.font.ui, fontSize: 14, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, color: SPOTA.c.textMuted }}>Botones</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-start' }}>
            <Btn variant="primary" icon="compass">Descubrir lugares</Btn>
            <Btn variant="secondary" icon="plus">Crear plan</Btn>
            <Btn variant="outline">Ver más</Btn>
          </div>
        </div>
      </div>

      {/* Sample de PlaceCard */}
      <div style={{ marginTop: 32 }}>
        <h3 style={{ margin: '0 0 12px', fontFamily: SPOTA.font.ui, fontSize: 14, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, color: SPOTA.c.textMuted }}>PlaceCard (preview)</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18, maxWidth: 900 }}>
          {PLACES.slice(0, 3).map(p => (
            <PlaceCard key={p.id} place={p} saved={p.id === 'p1'} onSave={() => {}} onClick={() => {}} />
          ))}
        </div>
      </div>

      {/* Decisiones D1-D18 — sincronizadas con CLAUDE.md y entrega/justificacion-diseno.md */}
      <div style={{ marginTop: 32 }}>
        <h3 style={{ margin: '0 0 4px', fontFamily: SPOTA.font.ui, fontSize: 14, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, color: SPOTA.c.textMuted }}>Decisiones de diseño</h3>
        <p style={{ margin: '0 0 14px', fontFamily: SPOTA.font.ui, fontSize: 13, color: SPOTA.c.textSoft }}>D1-D18. El detalle argumentativo vive en CLAUDE.md y entrega/justificacion-diseno.md.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
          {[
            { d: 'D1', t: 'Niveles del Fama: Nuevo · Conocido · Habitué · Referente · Maestro' },
            { d: 'D2', t: 'Iconografía SVG en Preferences y Nueva colección, no emojis nativos' },
            { d: 'D3', t: 'Asimetría Host (en perfil) vs Negocio (entry separado)' },
            { d: 'D4', t: 'Layout full-bleed en auth (Register / Recover / Welcome desktop)' },
            { d: 'D5', t: 'Mapa funcional en Discover con filtros, zoom y "Buscar en esta zona"' },
            { d: 'D6', t: 'Arquitectura técnica: HTML autocontenido con React + Babel CDN' },
            { d: 'D7', t: 'IDs de routing alineados al array SCREENS, sin fallback a Splash' },
            { d: 'D8', t: 'Sub-máquina del CTA en detalle de lugar (Proof of Visit)' },
            { d: 'D9', t: 'Wizard publicar de 3 pasos, validación implícita' },
            { d: 'D10', t: 'Sub-máquina del host en plan grupal (todo o nada)' },
            { d: 'D11', t: 'Prototipo desktop separado, no responsive del mobile' },
            { d: 'D12', t: 'SearchResults desktop: lista + mapa simultáneos, no toggle' },
            { d: 'D13', t: '"Perfil" fuera del navbar desktop, sólo desde el avatar' },
            { d: 'D14', t: 'Preferences single-page con flag onboarding ↔ edit (params.mode)' },
            { d: 'D15', t: 'Welcome y Login mobile unificados (foto integrada al login)' },
            { d: 'D16', t: 'Desktop login con layout split (foto+hero 55% / form 45%)' },
            { d: 'D17', t: 'Back contextual de bizRegister según params.from' },
            { d: 'D18', t: 'Concierge-first en Discover · feed solo en searchResults · IntentChips + AffineRow' },
          ].map(o => (
            <div key={o.d} style={{ display: 'flex', gap: 10, padding: 12, borderRadius: 10, background: SPOTA.c.surface, border: `1px solid ${SPOTA.c.lineSoft}` }}>
              <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: 11, fontWeight: 700, color: SPOTA.c.secondary, flexShrink: 0, width: 32 }}>{o.d}</span>
              <span style={{ fontFamily: SPOTA.font.ui, fontSize: 13, color: SPOTA.c.text, lineHeight: 1.45 }}>{o.t}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Estado del prototipo */}
      <div style={{ marginTop: 32, padding: 20, borderRadius: 16, background: SPOTA.c.bgAlt, border: `1px dashed ${SPOTA.c.line}` }}>
        <h3 style={{ margin: '0 0 8px', fontFamily: SPOTA.font.ui, fontSize: 14, fontWeight: 700, color: SPOTA.c.text }}>Estado del prototipo desktop</h3>
        <p style={{ margin: 0, fontFamily: SPOTA.font.ui, fontSize: 13, color: SPOTA.c.textSoft, lineHeight: 1.5 }}>
          Las 7 fases del plan están completadas. Detalle en{' '}
          <code style={{ fontFamily: 'ui-monospace, monospace', fontSize: 13, color: SPOTA.c.text }}>entrega/plan-desktop.md</code>.
          Cobertura de los 23 CUs + auxiliares en paralelo al prototipo mobile.
        </p>
      </div>
    </section>
  );
};

Object.assign(window, { ScreenDesignSystem });
