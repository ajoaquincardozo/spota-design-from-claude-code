// ========================================================================
// 13-biz-shell.jsx
// ========================================================================
// BizFrame: shell para todas las pantallas del panel de negocios.
// Asimetría D3 — el panel vive separado del producto de usuario, con su propio chrome.
// TopBar oscuro + Sidebar lateral con secciones del panel.

const BIZ_NAV = [
  { id: 'bizHome',     label: 'Dashboard',     icon: 'home' },
  { id: 'bizBenefits', label: 'Beneficios',    icon: 'gift' },
  { id: 'bizCampaign', label: 'Campañas',      icon: 'megaphone' },
  { id: 'bizInsights', label: 'Insights',      icon: 'stats' },
  { id: 'bizSubscribe',label: 'Suscripción Tier', icon: 'sparkles' },
  { id: 'claimPlace',  label: 'Reclamar otro lugar', icon: 'plus' },
];

const BizTopbar = ({ nav }) => (
  <header style={{
    position: 'sticky', top: 0, zIndex: 50,
    background: SPOTA.c.text, color: '#fff',
    borderBottom: `1px solid rgba(255,255,255,0.1)`,
  }}>
    <div style={{
      maxWidth: 1440, margin: '0 auto',
      padding: '14px 32px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <Icon name="pinFill" size={26} color={SPOTA.c.accent} />
        <span style={{ fontFamily: SPOTA.font.ui, fontWeight: 800, fontSize: 20, color: '#fff', letterSpacing: -0.4 }}>Spota</span>
        <span style={{
          padding: '3px 9px', borderRadius: 999,
          background: SPOTA.c.accent, color: SPOTA.c.text,
          fontFamily: SPOTA.font.ui, fontSize: 10.5, fontWeight: 800, letterSpacing: 0.6,
        }}>NEGOCIOS</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <button onClick={() => nav('home')} title="Cambiar a vista de usuario" style={{
          height: 38, padding: '0 14px', borderRadius: 999,
          border: '1px solid rgba(255,255,255,0.28)', background: 'transparent', color: '#fff',
          cursor: 'pointer', fontFamily: SPOTA.font.ui, fontSize: 13, fontWeight: 600,
          display: 'inline-flex', alignItems: 'center', gap: 7,
        }}>
          <Icon name="compass" size={15} color="#fff" /> Vista usuario
        </button>
        <button onClick={() => nav('login')} title="Cerrar sesión" style={{
          width: 38, height: 38, borderRadius: 999, border: 'none',
          background: 'rgba(255,255,255,0.12)', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon name="logout" size={16} color="#fff" />
        </button>
      </div>
    </div>
  </header>
);

const BizSidebar = ({ current, nav }) => (
  <aside style={{
    width: 240, flexShrink: 0,
    padding: '24px 16px', background: SPOTA.c.surface,
    borderRight: `1px solid ${SPOTA.c.line}`,
    minHeight: 'calc(100vh - 67px)',
  }}>
    <div style={{ padding: '0 8px 18px', borderBottom: `1px solid ${SPOTA.c.lineSoft}`, marginBottom: 12 }}>
      <p style={{ margin: 0, fontFamily: SPOTA.font.ui, fontSize: 11, color: SPOTA.c.textMuted, textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 700 }}>Mi negocio</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8 }}>
        <img src={photo('cafePalermo', 100, 100)} style={{ width: 36, height: 36, borderRadius: 8, objectFit: 'cover' }} />
        <div style={{ minWidth: 0 }}>
          <div style={{ fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 14, color: SPOTA.c.text, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Café Cobrand</div>
          <div style={{ fontFamily: SPOTA.font.ui, fontSize: 11.5, color: SPOTA.c.textSoft }}>Cafetería · Palermo</div>
        </div>
      </div>
    </div>
    <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {BIZ_NAV.map(it => {
        const active = current === it.id;
        return (
          <button key={it.id} onClick={() => nav(it.id)} style={{
            display: 'flex', alignItems: 'center', gap: 11,
            padding: '10px 12px', borderRadius: 10, cursor: 'pointer', textAlign: 'left',
            background: active ? SPOTA.c.primarySoft : 'transparent',
            color: active ? SPOTA.c.primaryDark : SPOTA.c.textSoft,
            border: 'none', fontFamily: SPOTA.font.ui, fontWeight: active ? 700 : 500, fontSize: 13.5,
          }}>
            <Icon name={it.icon} size={17} color={active ? SPOTA.c.primary : SPOTA.c.textSoft} />
            {it.label}
          </button>
        );
      })}
    </nav>
  </aside>
);

const BizFrame = ({ children, current, nav }) => (
  <div style={{ minHeight: '100vh', background: SPOTA.c.bg, display: 'flex', flexDirection: 'column' }}>
    <BizTopbar nav={nav} />
    <div style={{ flex: 1, display: 'flex', maxWidth: 1440, width: '100%', margin: '0 auto' }}>
      <BizSidebar current={current} nav={nav} />
      <main style={{ flex: 1, padding: '28px 32px 48px', minWidth: 0 }}>
        {children}
      </main>
    </div>
  </div>
);

Object.assign(window, { BizFrame, BizTopbar, BizSidebar, BIZ_NAV });
