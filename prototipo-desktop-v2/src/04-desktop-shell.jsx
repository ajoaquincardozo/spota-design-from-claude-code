// ========================================================================
// 04-desktop-shell.jsx
// ========================================================================
// TopNav: barra fija superior. Reemplaza al TabBar inferior del mobile.
// Decisión D-pendiente del backlog (sacar Perfil del navbar): el avatar en top-right
// es entry suficiente al perfil. Las 3 secciones del navbar quedan enfocadas en producto.
// CU-004-002 §3.4 — el tab "Colecciones" abre la pantalla previa de filtros
// (collectionsFilter). El TopNav highlight aplica a toda la familia.
const COLLECTIONS_TAB_FAMILY = new Set(['collections', 'collectionsFilter', 'collectionDetail', 'createCollection']);
const NAV_ITEMS = [
  { id: 'home',        label: 'Descubrir',   icon: 'compass'  },
  { id: 'collections', label: 'Colecciones', icon: 'bookmark', target: 'collectionsFilter' },
  { id: 'plans',       label: 'Planes',      icon: 'calendar' },
];

// Botón con hover unificado para acciones del TopNav.
const NavIconBtn = ({ children, onClick, title, active = false, prominent = false }) => {
  const [hover, setHover] = React.useState(false);
  if (prominent) {
    return (
      <button onClick={onClick} title={title}
        onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '9px 16px', borderRadius: 999, cursor: 'pointer',
          background: hover ? SPOTA.c.secondaryDark : SPOTA.c.secondary, color: '#fff', border: 'none',
          fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 13.5,
          boxShadow: '0 4px 10px rgba(184,92,56,0.3)', marginRight: 6,
          transform: hover ? 'translateY(-1px)' : 'none',
          transition: 'background 150ms, transform 150ms',
        }}>
        {children}
      </button>
    );
  }
  return (
    <button onClick={onClick} title={title}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        width: 40, height: 40, borderRadius: 999, border: 'none',
        background: active ? SPOTA.c.primarySoft : (hover ? SPOTA.c.lineSoft : 'transparent'),
        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'background 150ms',
      }}>
      {children}
    </button>
  );
};

const TopNav = ({ current, nav }) => {
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'rgba(255, 248, 237, 0.92)', backdropFilter: 'blur(14px)',
      borderBottom: `1px solid ${SPOTA.c.line}`,
    }}>
      <div style={{
        maxWidth: 1440, margin: '0 auto',
        padding: '14px 32px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32,
      }}>
        {/* Logo + Nav central (agrupados a la izquierda) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <button onClick={() => nav('home')} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}>
            <SpotaLogo size={26} />
          </button>
          <nav style={{ display: 'flex', gap: 4 }}>
            {NAV_ITEMS.map(it => {
              const active = it.id === 'collections'
                ? COLLECTIONS_TAB_FAMILY.has(current)
                : current === it.id;
              return (
                <button key={it.id} onClick={() => nav(it.target || it.id)} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 7,
                  padding: '8px 14px', borderRadius: 999, cursor: 'pointer',
                  background: active ? SPOTA.c.primary : 'transparent',
                  color: active ? '#fff' : SPOTA.c.textSoft,
                  border: 'none', fontFamily: SPOTA.font.ui, fontWeight: active ? 700 : 600, fontSize: 14,
                  transition: 'background 150ms',
                }}>
                  <Icon name={it.icon} size={17} color={active ? '#fff' : SPOTA.c.textSoft} />
                  {it.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Acciones derecha */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <NavIconBtn onClick={() => nav('publish')} title="Publicar experiencia" prominent>
            <Icon name="plus" size={16} color="#fff" strokeWidth={2.4} /> Publicar
          </NavIconBtn>
          <NavIconBtn onClick={() => nav('uikit')} title="UI Kit · Design system de Spota" active={current === 'uikit'}>
            <Icon name="sparkles" size={18} color={current === 'uikit' ? SPOTA.c.primary : SPOTA.c.textSoft} />
          </NavIconBtn>
          <NavIconBtn title="Notificaciones">
            <Icon name="bell" size={19} color={SPOTA.c.textSoft} />
          </NavIconBtn>
          <button onClick={() => nav('profile')} title="Tu perfil" style={{
            background: current === 'profile' ? SPOTA.c.primarySoft : 'transparent',
            border: 'none', cursor: 'pointer', padding: 4, marginLeft: 4, borderRadius: 999,
            display: 'flex', alignItems: 'center', gap: 8,
            transition: 'background 150ms',
          }}>
            <Avatar name="Sol Benítez" size={36} score="87" />
          </button>
        </div>
      </div>
    </header>
  );
};

// DesktopFrame: contenedor general. Hace de wrapper de cualquier pantalla.
const DesktopFrame = ({ children, current, nav }) => (
  <div style={{ minHeight: '100vh', background: SPOTA.c.bg, display: 'flex', flexDirection: 'column' }}>
    <TopNav current={current} nav={nav} />
    <main style={{ flex: 1, maxWidth: 1440, width: '100%', margin: '0 auto', padding: '24px 32px 32px' }}>
      {children}
    </main>
    {/* Footer minimalista — D3: entry de Negocios fuera del perfil del usuario, accesible desde acá. */}
    <footer style={{
      maxWidth: 1440, width: '100%', margin: '0 auto', padding: '16px 32px 32px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
      borderTop: `1px solid ${SPOTA.c.lineSoft}`,
    }}>
      <p style={{ margin: 0, fontFamily: SPOTA.font.ui, fontSize: 12.5, color: SPOTA.c.textMuted }}>
        Spota · Nexo Local S.A.S. · Buenos Aires
      </p>
      <button onClick={() => nav('bizRegister', { from: 'home' })} style={{
        background: 'transparent', border: 'none', cursor: 'pointer', padding: 0,
        fontFamily: SPOTA.font.ui, fontSize: 12.5, fontWeight: 600, color: SPOTA.c.textSoft,
        display: 'inline-flex', alignItems: 'center', gap: 6,
      }}>
        <Icon name="briefcase" size={14} color={SPOTA.c.textSoft} /> ¿Tenés un negocio? Sumalo a Spota →
      </button>
    </footer>
  </div>
);

// Guarda para viewports chicos: si la ventana es muy angosta, sugerimos abrir en mobile.
const SmallViewportGuard = ({ children }) => {
  const [w, setW] = React.useState(typeof window !== 'undefined' ? window.innerWidth : 1280);
  React.useEffect(() => {
    const onResize = () => setW(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  if (w < 1024) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 32, background: SPOTA.c.bg,
      }}>
        <div style={{
          maxWidth: 420, padding: 28, borderRadius: 18,
          background: SPOTA.c.surface, border: `1px solid ${SPOTA.c.line}`, textAlign: 'center',
        }}>
          <SpotaLogo size={32} />
          <h1 style={{ margin: '16px 0 8px', fontFamily: SPOTA.font.ui, fontSize: 20, fontWeight: 700 }}>
            Esta es la versión <span style={{ fontFamily: SPOTA.font.serif, fontStyle: 'italic', color: SPOTA.c.secondary, fontWeight: 500 }}>desktop</span>
          </h1>
          <p style={{ margin: 0, fontFamily: SPOTA.font.ui, fontSize: 14, color: SPOTA.c.textSoft, lineHeight: 1.5 }}>
            Pensada para pantallas de 1024 px o más. Ampliá la ventana, o abrí el prototipo mobile en{' '}
            <code style={{ fontFamily: 'ui-monospace, monospace', fontSize: 13, color: SPOTA.c.text }}>prototipo/</code>.
          </p>
        </div>
      </div>
    );
  }
  return children;
};

Object.assign(window, { TopNav, DesktopFrame, SmallViewportGuard });
