// ========================================================================
// 19-app.jsx
// ========================================================================
// Metadata para pantallas que aún no están implementadas pero deben tener label propio en ScreenSoon.
// (Vacío por ahora — todas las pantallas referenciadas tienen implementación real.)
const SCREEN_META = {};

// Pantalla "en construcción" para rutas todavía no implementadas en este prototipo.
const ScreenSoon = ({ current, nav }) => {
  const meta = SCREEN_META[current] || NAV_ITEMS.find(n => n.id === current) || { label: current, icon: 'sparkles' };
  return (
    <section style={{ padding: '80px 0', textAlign: 'center', maxWidth: 480, margin: '0 auto' }}>
      <div style={{ width: 72, height: 72, borderRadius: 999, background: SPOTA.c.primarySoft, margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon name={meta.icon} size={32} color={SPOTA.c.primary} />
      </div>
      <h1 style={{ margin: '0 0 8px', fontFamily: SPOTA.font.ui, fontSize: 26, fontWeight: 700, letterSpacing: -0.4 }}>
        {meta.label} <span style={{ fontFamily: SPOTA.font.serif, fontStyle: 'italic', color: SPOTA.c.secondary, fontWeight: 500 }}>(próxima fase)</span>
      </h1>
      <p style={{ margin: '0 0 20px', fontFamily: SPOTA.font.ui, fontSize: 14, color: SPOTA.c.textSoft, lineHeight: 1.55 }}>
        Esta sección se implementa en una fase posterior del prototipo desktop. Mientras tanto,
        explorá Discover o el UI Kit.
      </p>
      <div style={{ display: 'inline-flex', gap: 10 }}>
        <Btn variant="primary" icon="compass" onClick={() => nav('home')}>Ir a Descubrir</Btn>
        <Btn variant="outline" icon="sparkles" onClick={() => nav('uikit')}>Ver UI Kit</Btn>
      </div>
    </section>
  );
};

const SCREENS = {
  home:             ScreenDiscover,
  searchResults:    ScreenSearchResults,
  placeDetail:      ScreenPlaceDetail,
  collections:      ScreenCollections,
  collectionsFilter: ScreenCollectionsFilter,
  collectionDetail: ScreenCollectionDetail,
  publish:          ScreenPublish,
  plans:            ScreenPlans,
  createPlan:       ScreenCreatePlan,
  planVote:         ScreenPlanVote,
  planClose:        ScreenPlanClose,
  hostMarketplace:  ScreenHostMarketplace,
  createOffer:      ScreenCreateOffer,
  hireHost:         ScreenHireHost,
  registerHost:     ScreenRegisterHost,
  hostDashboard:    ScreenHostDashboard,
  bizRegister:      ScreenBizRegister,
  bizHome:          ScreenBizHome,
  claimPlace:       ScreenClaimPlace,
  bizBenefits:      ScreenBizBenefits,
  bizCampaign:      ScreenBizCampaign,
  bizInsights:      ScreenBizInsights,
  bizInsightsResult: ScreenBizInsightsResult,
  bizSubscribe:     ScreenBizSubscribe,
  uikit:            ScreenDesignSystem,
  profile:          ScreenProfile,
  // Auth (Fase 7.A)
  welcome:          ScreenWelcome,
  login:            ScreenLogin,
  register:         ScreenRegister,
  recover:          ScreenRecover,
  resetPassword:    ScreenResetPassword,
  verifyCode:       ScreenVerifyCode,
  // Acciones del perfil (Fase 7.B)
  createCollection: ScreenCreateCollection,
  editProfile:      ScreenEditProfile,
  credentials:      ScreenCredentials,
  // Perfil completo (Fase 7.C)
  preferences:      ScreenPreferences,
  myExperiences:    ScreenMyExperiences,
};

// Mapping de pantalla a ítem del nav (para resaltar el tab activo cuando estás en una pantalla hija).
const NAV_PARENT = {
  searchResults: 'home',
  placeDetail: 'home',
  collectionsFilter: 'collections',
  collectionDetail: 'collections',
  createCollection: 'collections',
  createPlan: 'plans',
  planVote: 'plans',
  planClose: 'plans',
  hostMarketplace: 'plans',
  createOffer: 'plans',
  hireHost: 'plans',
  registerHost: 'profile',
  hostDashboard: 'profile',
  preferences: 'profile',
  credentials: 'profile',
  editProfile: 'profile',
  myExperiences: 'profile',
};

// Pantallas del panel de Negocios — usan BizFrame en lugar del DesktopFrame.
const BIZ_SCREENS = new Set(['bizHome', 'claimPlace', 'bizBenefits', 'bizCampaign', 'bizInsights', 'bizInsightsResult', 'bizSubscribe']);
// Pantallas sin frame (entry sin auth, full-bleed).
const NO_FRAME_SCREENS = new Set(['bizRegister', 'welcome', 'login', 'register', 'recover', 'resetPassword', 'verifyCode']);

function App() {
  // Initial state alineado con mobile (D15): la primer pantalla es `login`, no `home`.
  // `welcome` queda en el código (preservado por D16) pero sin entry points — no es un CU canónico.
  const [current, setCurrent] = React.useState('login');
  const [params, setParams] = React.useState({});
  const nav = (id, p = {}) => { setCurrent(id); setParams(p); window.scrollTo(0, 0); };
  const Screen = SCREENS[current] || ScreenSoon;
  const navHighlight = NAV_PARENT[current] || current;

  let content;
  if (NO_FRAME_SCREENS.has(current)) {
    content = <Screen current={current} nav={nav} params={params} />;
  } else if (BIZ_SCREENS.has(current)) {
    content = (
      <BizFrame current={current} nav={nav}>
        <Screen current={current} nav={nav} params={params} />
      </BizFrame>
    );
  } else {
    content = (
      <DesktopFrame current={navHighlight} nav={nav}>
        <Screen current={current} nav={nav} params={params} />
      </DesktopFrame>
    );
  }

  return <SmallViewportGuard>{content}</SmallViewportGuard>;
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);
