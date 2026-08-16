// ========================================================================
// 18-screens-prefs-experiences.jsx
// ========================================================================
// CU-04: Preferencias — single page que sirve como onboarding (mode='onboarding')
// y como editor de settings (mode='edit', default cuando se accede desde Perfil).
const ScreenPreferences = ({ nav, params }) => {
  const isOnboarding = params?.mode === 'onboarding';
  // Sets alineados con el canónico CU-001-004 §3.13 (mismas opciones que ScreenPreferences mobile).
  const TYPES = [
    { id: 'cafes',     label: 'Cafés',           icon: 'coffee' },
    { id: 'comida',    label: 'Comida',          icon: 'utensils' },
    { id: 'bares',     label: 'Bares',           icon: 'wineglass' },
    { id: 'cultura',   label: 'Cultura',         icon: 'palette' },
    { id: 'aire',      label: 'Aire libre',      icon: 'leaf' },
    { id: 'musica',    label: 'Música en vivo',  icon: 'music' },
    { id: 'cine',      label: 'Cine y teatro',   icon: 'mask' },
    { id: 'bienestar', label: 'Bienestar',       icon: 'yoga' },
  ];
  const ZONES = ['Palermo', 'Villa Crespo', 'San Telmo', 'Recoleta', 'Belgrano', 'Caballito', 'Chacarita', 'Almagro'];
  const CONTEXTS = [
    { id: 'solo',    label: 'Solo/a',   sub: 'Lugares para mí' },
    { id: 'pareja',  label: 'Pareja',   sub: 'Cenas, paseos, planes íntimos' },
    { id: 'amigos',  label: 'Amigos',   sub: 'Salidas grupales, after office' },
    { id: 'familia', label: 'Familia',  sub: 'Aire libre, planes con chicos' },
  ];
  const FREQ = [
    { id: 'mucha', label: 'Varias por semana' },
    { id: 'media', label: 'Una vez por semana' },
    { id: 'pocas', label: 'Cada quince días' },
    { id: 'raras', label: 'Una vez por mes' },
  ];

  const RESTRICTIONS = [
    { id: 'vegetariano',  label: 'Vegetariano',         icon: 'leaf' },
    { id: 'vegano',       label: 'Vegano',              icon: 'leaf' },
    { id: 'singluten',    label: 'Sin gluten',          icon: 'check' },
    { id: 'sinlactosa',   label: 'Sin lactosa',         icon: 'check' },
    { id: 'movilidad',    label: 'Movilidad reducida',  icon: 'walk' },
    { id: 'ninguna',      label: 'Sin restricciones',   icon: 'sparkles' },
  ];

  const [types, setTypes] = React.useState(['cafes', 'cultura', 'aire']);
  const [zones, setZones] = React.useState(['Palermo', 'Villa Crespo']);
  const [context, setContext] = React.useState('amigos');
  const [freq, setFreq] = React.useState('media');
  const [restrictions, setRestrictions] = React.useState([]);
  const togType = (id) => setTypes(t => t.includes(id) ? t.filter(x => x !== id) : [...t, id]);
  const togZone = (id) => setZones(z => z.includes(id) ? z.filter(x => x !== id) : [...z, id]);
  const togRestriction = (id) => setRestrictions(r => r.includes(id) ? r.filter(x => x !== id) : [...r, id]);

  // P3-42: feedback explícito antes de navegar.
  const [toast, setToast] = React.useState(null);
  const save = () => {
    setToast(isOnboarding ? '¡Listo! Vamos a Descubrir' : 'Preferencias guardadas');
    window.setTimeout(() => nav(isOnboarding ? 'home' : 'profile'), 900);
  };

  return (
    <section style={{ position: 'relative' }}>
      {!isOnboarding && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, fontFamily: SPOTA.font.ui, fontSize: 13, color: SPOTA.c.textSoft }}>
          <button onClick={() => nav('profile')} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: SPOTA.c.textSoft, fontFamily: SPOTA.font.ui, fontSize: 13, padding: 0, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <Icon name="arrowLeft" size={14} /> Perfil
          </button>
          <span style={{ color: SPOTA.c.textMuted }}>/</span>
          <span style={{ color: SPOTA.c.text, fontWeight: 600 }}>Preferencias</span>
        </div>
      )}

      <div style={{ maxWidth: 760 }}>
        {isOnboarding && (
          <p style={{ margin: '0 0 6px', fontFamily: SPOTA.font.ui, fontSize: 12.5, fontWeight: 700, color: SPOTA.c.primary, letterSpacing: 0.4, textTransform: 'uppercase' }}>
            Bienvenida a Spota
          </p>
        )}
        <h1 style={{ margin: '0 0 4px', fontFamily: SPOTA.font.ui, fontSize: 28, fontWeight: 700, color: SPOTA.c.text, letterSpacing: -0.5 }}>
          {isOnboarding
            ? <>Antes de <span style={{ fontFamily: SPOTA.font.serif, fontStyle: 'italic', color: SPOTA.c.secondary, fontWeight: 400 }}>empezar</span></>
            : <>Tus <span style={{ fontFamily: SPOTA.font.serif, fontStyle: 'italic', color: SPOTA.c.secondary, fontWeight: 400 }}>preferencias</span></>}
        </h1>
        <p style={{ margin: '0 0 24px', fontFamily: SPOTA.font.ui, fontSize: 14.5, color: SPOTA.c.textSoft, lineHeight: 1.5 }}>
          {isOnboarding
            ? 'Contanos qué te gusta para que las recomendaciones tengan sentido desde el primer día. Podés cambiarlo cuando quieras desde tu perfil.'
            : 'Spota usa esto para entender qué te puede interesar y para ponderar las reseñas de quienes tienen perfil parecido al tuyo (afinidad cruzada).'}
        </p>

        {/* Tipos de experiencia */}
        <div style={{ background: SPOTA.c.surface, borderRadius: 16, padding: 22, marginBottom: 14, border: `1px solid ${SPOTA.c.lineSoft}` }}>
          <h3 style={{ margin: '0 0 4px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 15.5, color: SPOTA.c.text }}>Tipos de experiencia que más te gustan</h3>
          <p style={{ margin: '0 0 14px', fontFamily: SPOTA.font.ui, fontSize: 13, color: SPOTA.c.textSoft }}>Elegí los que apliquen. {types.length} seleccionados.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
            {TYPES.map(t => {
              const on = types.includes(t.id);
              return (
                <button key={t.id} onClick={() => togType(t.id)} style={{
                  padding: '14px 10px', borderRadius: 12, cursor: 'pointer',
                  background: on ? SPOTA.c.primarySoft : SPOTA.c.bg,
                  border: `1.5px solid ${on ? SPOTA.c.primary : SPOTA.c.line}`,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                  transition: 'background 150ms, border-color 150ms',
                }}>
                  <Icon name={t.icon} size={20} color={on ? SPOTA.c.primary : SPOTA.c.secondary} strokeWidth={1.9} />
                  <span style={{ fontFamily: SPOTA.font.ui, fontWeight: on ? 700 : 500, fontSize: 13, color: SPOTA.c.text }}>{t.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Zonas */}
        <div style={{ background: SPOTA.c.surface, borderRadius: 16, padding: 22, marginBottom: 14, border: `1px solid ${SPOTA.c.lineSoft}` }}>
          <h3 style={{ margin: '0 0 4px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 15.5, color: SPOTA.c.text }}>Zonas geográficas favoritas</h3>
          <p style={{ margin: '0 0 14px', fontFamily: SPOTA.font.ui, fontSize: 13, color: SPOTA.c.textSoft }}>Spota va a priorizar lugares de estas zonas. {zones.length} seleccionadas.</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {ZONES.map(z => {
              const on = zones.includes(z);
              return (
                <button key={z} onClick={() => togZone(z)} style={{
                  padding: '8px 14px', borderRadius: 999, cursor: 'pointer',
                  background: on ? SPOTA.c.primary : SPOTA.c.bg,
                  color: on ? '#fff' : SPOTA.c.text,
                  border: `1.5px solid ${on ? SPOTA.c.primary : SPOTA.c.line}`,
                  fontFamily: SPOTA.font.ui, fontWeight: on ? 700 : 500, fontSize: 13,
                }}>{z}</button>
              );
            })}
          </div>
        </div>

        {/* Contexto */}
        <div style={{ background: SPOTA.c.surface, borderRadius: 16, padding: 22, marginBottom: 14, border: `1px solid ${SPOTA.c.lineSoft}` }}>
          <h3 style={{ margin: '0 0 4px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 15.5, color: SPOTA.c.text }}>Cómo solés salir</h3>
          <p style={{ margin: '0 0 14px', fontFamily: SPOTA.font.ui, fontSize: 13, color: SPOTA.c.textSoft }}>Tu contexto principal. Podés cambiarlo cuando quieras.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
            {CONTEXTS.map(c => {
              const on = context === c.id;
              return (
                <button key={c.id} onClick={() => setContext(c.id)} style={{
                  padding: 14, borderRadius: 12, cursor: 'pointer', textAlign: 'left',
                  background: on ? SPOTA.c.primarySoft : SPOTA.c.bg,
                  border: `1.5px solid ${on ? SPOTA.c.primary : SPOTA.c.line}`,
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <span style={{ fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 14.5, color: SPOTA.c.text }}>{c.label}</span>
                    {on && <Icon name="checkCircle" size={18} color={SPOTA.c.primary} />}
                  </div>
                  <p style={{ margin: 0, fontFamily: SPOTA.font.ui, fontSize: 12.5, color: SPOTA.c.textSoft }}>{c.sub}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Frecuencia */}
        <div style={{ background: SPOTA.c.surface, borderRadius: 16, padding: 22, marginBottom: 14, border: `1px solid ${SPOTA.c.lineSoft}` }}>
          <h3 style={{ margin: '0 0 4px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 15.5, color: SPOTA.c.text }}>Frecuencia con la que salís</h3>
          <p style={{ margin: '0 0 14px', fontFamily: SPOTA.font.ui, fontSize: 13, color: SPOTA.c.textSoft }}>Para calibrar la cantidad de sugerencias que te mostramos.</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {FREQ.map(f => {
              const on = freq === f.id;
              return (
                <button key={f.id} onClick={() => setFreq(f.id)} style={{
                  padding: '10px 18px', borderRadius: 999, cursor: 'pointer',
                  background: on ? SPOTA.c.primary : SPOTA.c.bg,
                  color: on ? '#fff' : SPOTA.c.text,
                  border: `1.5px solid ${on ? SPOTA.c.primary : SPOTA.c.line}`,
                  fontFamily: SPOTA.font.ui, fontWeight: on ? 700 : 500, fontSize: 13.5,
                }}>{f.label}</button>
              );
            })}
          </div>
        </div>

        {/* Restricciones (5to paso opcional) — CU-001-004 §3.13 */}
        <div style={{ background: SPOTA.c.surface, borderRadius: 16, padding: 22, marginBottom: 22, border: `1px solid ${SPOTA.c.lineSoft}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
            <div>
              <h3 style={{ margin: '0 0 4px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 15.5, color: SPOTA.c.text }}>
                Restricciones alimentarias y de accesibilidad <span style={{ fontWeight: 500, color: SPOTA.c.textMuted, fontSize: 13 }}>(opcional)</span>
              </h3>
              <p style={{ margin: '0 0 14px', fontFamily: SPOTA.font.ui, fontSize: 13, color: SPOTA.c.textSoft }}>
                Si las completás, el motor filtra las recomendaciones para que respeten lo que necesitás.
              </p>
            </div>
            <button onClick={() => setRestrictions([])} style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: SPOTA.font.ui, fontSize: 12.5, fontWeight: 600, color: SPOTA.c.textSoft }}>Saltar este paso</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
            {RESTRICTIONS.map(r => {
              const on = restrictions.includes(r.id);
              return (
                <button key={r.id} onClick={() => togRestriction(r.id)} style={{
                  padding: '14px 12px', borderRadius: 12, cursor: 'pointer', textAlign: 'left',
                  display: 'flex', alignItems: 'center', gap: 10,
                  background: on ? SPOTA.c.primarySoft : SPOTA.c.bg,
                  border: `1.5px solid ${on ? SPOTA.c.primary : SPOTA.c.line}`,
                }}>
                  <Icon name={r.icon} size={18} color={on ? SPOTA.c.primary : SPOTA.c.secondary} strokeWidth={1.9} />
                  <span style={{ fontFamily: SPOTA.font.ui, fontWeight: on ? 700 : 500, fontSize: 13.5, color: SPOTA.c.text }}>{r.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
          <p style={{ margin: 0, fontFamily: SPOTA.font.ui, fontSize: 12.5, color: SPOTA.c.textMuted, lineHeight: 1.5 }}>
            {isOnboarding
              ? 'Estos valores los podés ajustar después desde tu perfil.'
              : 'Tus cambios afectan las recomendaciones desde la próxima búsqueda.'}
          </p>
          <div style={{ display: 'flex', gap: 10 }}>
            {!isOnboarding && <Btn variant="ghost" onClick={() => nav('profile')}>Cancelar</Btn>}
            <Btn variant="primary" size="lg" iconRight={isOnboarding ? 'arrowRight' : undefined} icon={!isOnboarding ? 'check' : undefined} onClick={save}>
              {isOnboarding ? 'Empezar a explorar' : 'Guardar preferencias'}
            </Btn>
          </div>
        </div>
      </div>
      {toast && (
        <div style={{
          position: 'fixed', left: '50%', bottom: 32, transform: 'translateX(-50%)',
          background: SPOTA.c.text, color: SPOTA.c.bg,
          fontFamily: SPOTA.font.ui, fontSize: 13.5, fontWeight: 500,
          padding: '11px 20px', borderRadius: 999, boxShadow: SPOTA.shadow.lg,
          zIndex: 60, pointerEvents: 'none',
        }}>{toast}</div>
      )}
    </section>
  );
};

// CU-09: Mis experiencias
// CU-003-003 §3.2 — visibilidades canónicas con set de 3 opciones
const VISIBILITY_OPTIONS = [
  { id: 'public',  label: 'Pública',     icon: 'globe', tone: 'softG' },
  { id: 'private', label: 'Privada',     icon: 'lock',  tone: 'soft' },
  { id: 'friends', label: 'Solo amigos', icon: 'users', tone: 'softA' },
];
const visMeta = (v) => VISIBILITY_OPTIONS.find(o => o.id === v) || VISIBILITY_OPTIONS[0];
const ScreenMyExperiences = ({ nav }) => {
  const [myExp, setMyExp] = React.useState([
    { id: 'e1', place: PLACES[0], score: 5, text: 'Encontré un café de barrio increíble, atención impecable y mesas en patio interno con plantas. Volvería sin dudarlo.', date: 'hace 3 días', visibility: 'public', likes: 24 },
    { id: 'e2', place: PLACES[5], score: 4, text: 'Buen lugar para una copa de vino tranquilo después del laburo. Mozo atento, carta corta y bien curada.', date: 'la semana pasada', visibility: 'public', likes: 12 },
    { id: 'e3', place: PLACES[2], score: 5, text: 'Una librería preciosa, me quedé toda la tarde leyendo en el sillón del fondo.', date: 'hace 2 semanas', visibility: 'private', likes: 0 },
  ]);
  const [editing, setEditing] = React.useState(null);
  const openEdit = (id) => setEditing({ id, next: myExp.find(e => e.id === id).visibility });
  const confirmEdit = () => {
    if (!editing) return;
    setMyExp(list => list.map(e => e.id === editing.id ? { ...e, visibility: editing.next } : e));
    setEditing(null);
  };
  const pending = [
    { id: 'pd1', place: PLACES[3], date: 'ayer' },
    { id: 'pd2', place: PLACES[7], date: 'el sábado' },
  ];
  const [tab, setTab] = React.useState('all');
  const counts = {
    all: myExp.length,
    pending: pending.length,
    public: myExp.filter(e => e.visibility === 'public').length,
    private: myExp.filter(e => e.visibility === 'private').length,
  };
  const visible = tab === 'pending' ? [] : myExp.filter(e => tab === 'all' || e.visibility === tab);

  return (
    <section>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, fontFamily: SPOTA.font.ui, fontSize: 13, color: SPOTA.c.textSoft }}>
        <button onClick={() => nav('profile')} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: SPOTA.c.textSoft, fontFamily: SPOTA.font.ui, fontSize: 13, padding: 0, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
          <Icon name="arrowLeft" size={14} /> Perfil
        </button>
        <span style={{ color: SPOTA.c.textMuted }}>/</span>
        <span style={{ color: SPOTA.c.text, fontWeight: 600 }}>Mis experiencias</span>
      </div>

      {/* Hero con Fama Score */}
      <div style={{ background: `linear-gradient(135deg, ${SPOTA.c.primary}, ${SPOTA.c.primaryDark})`, color: '#fff', borderRadius: 18, padding: 28, marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div style={{ width: 64, height: 64, borderRadius: 999, background: 'rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="sparkles" size={30} color={SPOTA.c.accent} />
          </div>
          <div>
            <p style={{ margin: 0, fontFamily: SPOTA.font.ui, fontSize: 12.5, opacity: 0.85, textTransform: 'uppercase', letterSpacing: 0.4, fontWeight: 700 }}>Tu Fama Score</p>
            <h1 style={{ margin: '4px 0 2px', fontFamily: SPOTA.font.ui, fontSize: 32, fontWeight: 800, letterSpacing: -1, lineHeight: 1 }}>
              87 <span style={{ fontFamily: SPOTA.font.serif, fontStyle: 'italic', fontSize: 22, fontWeight: 500, opacity: 0.95 }}>· Referente</span>
            </h1>
            <p style={{ margin: '4px 0 0', fontFamily: SPOTA.font.ui, fontSize: 13.5, opacity: 0.92 }}>{myExp.length} reseñas publicadas · {myExp.reduce((s, e) => s + e.likes, 0)} likes recibidos</p>
          </div>
        </div>
        <Btn variant="secondary" icon="plus" onClick={() => nav('publish')}>Publicar experiencia</Btn>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 22, borderBottom: `1px solid ${SPOTA.c.lineSoft}` }}>
        {[
          { id: 'all',     t: 'Todas',       n: counts.all },
          { id: 'pending', t: 'Por valorar', n: counts.pending, accent: true },
          { id: 'public',  t: 'Públicas',    n: counts.public },
          { id: 'private', t: 'Privadas',    n: counts.private },
        ].map(t => {
          const on = tab === t.id;
          const accentColor = t.accent ? SPOTA.c.secondary : SPOTA.c.primary;
          return (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              padding: '12px 20px', border: 'none', background: 'transparent', cursor: 'pointer',
              fontFamily: SPOTA.font.ui, fontWeight: on ? 700 : 500, fontSize: 14.5,
              color: on ? accentColor : SPOTA.c.textSoft,
              borderBottom: `2px solid ${on ? accentColor : 'transparent'}`,
              marginBottom: -1, display: 'inline-flex', alignItems: 'center', gap: 6,
            }}>
              {t.t} {t.n > 0 && <span style={{ background: on ? accentColor : SPOTA.c.lineSoft, color: on ? '#fff' : SPOTA.c.textSoft, padding: '1px 8px', borderRadius: 999, fontSize: 11.5, fontWeight: 700 }}>{t.n}</span>}
            </button>
          );
        })}
      </div>

      {/* Contenido del tab */}
      {tab === 'pending' ? (
        <>
          <p style={{ margin: '0 0 14px', fontFamily: SPOTA.font.ui, fontSize: 13.5, color: SPOTA.c.textSoft, lineHeight: 1.5 }}>
            Visitas con Proof of Visit ya validado, esperando que las reseñes. Sumá tu opinión para mejorar tu Fama Score.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: 14 }}>
            {pending.map(p => (
              <div key={p.id} style={{
                background: SPOTA.c.surface, borderRadius: 14, padding: 16,
                border: `1px solid ${SPOTA.c.lineSoft}`, display: 'flex', gap: 12, alignItems: 'center',
              }}>
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <img src={photo(p.place.img, 200, 200)} style={{ width: 64, height: 64, borderRadius: 12, objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', bottom: -4, right: -4, width: 24, height: 24, borderRadius: 999, background: SPOTA.c.primary, border: '2px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name="check" size={12} color="#fff" strokeWidth={3.2} />
                  </div>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 15, color: SPOTA.c.text }}>{p.place.name}</div>
                  <div style={{ fontFamily: SPOTA.font.ui, fontSize: 12.5, color: SPOTA.c.textSoft }}>{p.place.cat} · {p.place.hood}</div>
                  <div style={{ fontFamily: SPOTA.font.ui, fontSize: 12, color: SPOTA.c.primary, fontWeight: 600, marginTop: 2 }}>Visitado {p.date}</div>
                </div>
                <Btn variant="primary" size="sm" icon="star" onClick={() => nav('publish')}>Reseñar</Btn>
              </div>
            ))}
          </div>
        </>
      ) : visible.length === 0 ? (
        <div style={{ background: SPOTA.c.surface, borderRadius: 16, padding: 40, textAlign: 'center', border: `1px dashed ${SPOTA.c.line}` }}>
          <div style={{ width: 64, height: 64, borderRadius: 999, background: SPOTA.c.bgAlt, margin: '0 auto 14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="compass" size={28} color={SPOTA.c.textMuted} />
          </div>
          <h3 style={{ margin: '0 0 6px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 17, color: SPOTA.c.text }}>No hay experiencias acá todavía</h3>
          <p style={{ margin: '0 0 14px', fontFamily: SPOTA.font.ui, fontSize: 14, color: SPOTA.c.textSoft, maxWidth: 380, marginLeft: 'auto', marginRight: 'auto' }}>
            Publicá tu primera reseña y sumá Fama Score. Validamos tu visita en silencio cuando declarás "Quiero ir" desde Descubrir.
          </p>
          <Btn variant="primary" icon="compass" onClick={() => nav('home')}>Ir a Descubrir</Btn>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(420px, 1fr))', gap: 16 }}>
          {visible.map(e => {
            const meta = visMeta(e.visibility);
            return (
            <div key={e.id} style={{
              background: SPOTA.c.surface, borderRadius: 14, padding: 18,
              border: `1px solid ${SPOTA.c.lineSoft}`, boxShadow: SPOTA.shadow.card,
            }}>
              <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                <img src={photo(e.place.img, 200, 200)} style={{ width: 64, height: 64, borderRadius: 12, objectFit: 'cover' }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                    <h3 style={{ margin: 0, fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 16, color: SPOTA.c.text }}>{e.place.name}</h3>
                    <Tag kind={meta.tone} icon={meta.icon}>{meta.label}</Tag>
                  </div>
                  <div style={{ fontFamily: SPOTA.font.ui, fontSize: 13, color: SPOTA.c.textSoft, marginTop: 2 }}>{e.place.hood} · {e.date}</div>
                  <div style={{ display: 'flex', gap: 2, marginTop: 4 }}>
                    {[...Array(5)].map((_, i) => <Icon key={i} name={i < e.score ? 'star' : 'starOutline'} size={14} color={SPOTA.c.accent} />)}
                  </div>
                </div>
              </div>
              <p style={{ margin: '0 0 14px', fontFamily: SPOTA.font.ui, fontSize: 13.5, color: SPOTA.c.text, lineHeight: 1.55 }}>{e.text}</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 12, borderTop: `1px solid ${SPOTA.c.lineSoft}` }}>
                <div style={{ display: 'flex', gap: 14, fontFamily: SPOTA.font.ui, fontSize: 12.5, color: SPOTA.c.textSoft }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    <Icon name="heartFill" size={13} color={SPOTA.c.secondary} /> {e.likes} {e.likes === 1 ? 'like' : 'likes'}
                  </span>
                  {e.place.visited && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                      <Icon name="check" size={13} color={SPOTA.c.primary} strokeWidth={3} /> Verificada
                    </span>
                  )}
                </div>
                <Btn variant="outline" size="sm" icon="eye" onClick={() => openEdit(e.id)}>Cambiar visibilidad</Btn>
              </div>
            </div>
          );})}
        </div>
      )}

      {/* Modal de "Cambiar visibilidad" — CU-003-003 §3.2 pasos 5-11 */}
      {editing && (() => {
        const current = myExp.find(e => e.id === editing.id);
        const currentMeta = visMeta(current.visibility);
        const nextMeta = visMeta(editing.next);
        const sameAsCurrent = editing.next === current.visibility;
        const turningPrivate = current.visibility === 'public' && editing.next !== 'public';
        return (
          <div onClick={() => setEditing(null)} style={{
            position: 'fixed', inset: 0, background: 'rgba(43,37,35,0.55)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: 24,
          }}>
            <div onClick={(ev) => ev.stopPropagation()} style={{
              background: SPOTA.c.bg, width: 'min(520px, 100%)',
              borderRadius: 18, padding: '24px 28px', boxShadow: SPOTA.shadow.pop,
            }}>
              <h2 style={{ margin: '0 0 6px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 22, color: SPOTA.c.text }}>Cambiar visibilidad</h2>
              <p style={{ margin: '0 0 18px', fontFamily: SPOTA.font.ui, fontSize: 13.5, color: SPOTA.c.textSoft }}>
                Actualmente <strong style={{ color: SPOTA.c.text }}>{currentMeta.label}</strong>. Las valoraciones recibidas se conservan.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>
                {VISIBILITY_OPTIONS.map(o => {
                  const on = editing.next === o.id;
                  return (
                    <button key={o.id} onClick={() => setEditing(s => ({ ...s, next: o.id }))} style={{
                      display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderRadius: 12,
                      background: on ? SPOTA.c.primarySoft : SPOTA.c.surface,
                      border: `1.5px solid ${on ? SPOTA.c.primary : SPOTA.c.lineSoft}`,
                      cursor: 'pointer', textAlign: 'left',
                    }}>
                      <Icon name={o.icon} size={20} color={on ? SPOTA.c.primary : SPOTA.c.textSoft} />
                      <span style={{ flex: 1, fontFamily: SPOTA.font.ui, fontWeight: on ? 700 : 600, fontSize: 14.5, color: SPOTA.c.text }}>{o.label}</span>
                      {on && <Icon name="checkCircle" size={20} color={SPOTA.c.primary} />}
                    </button>
                  );
                })}
              </div>
              {turningPrivate && !sameAsCurrent && (
                <p style={{ margin: '0 0 16px', fontFamily: SPOTA.font.ui, fontSize: 13, color: SPOTA.c.textSoft, lineHeight: 1.5, padding: 12, background: SPOTA.c.surface, borderRadius: 10, border: `1px solid ${SPOTA.c.lineSoft}` }}>
                  Al pasar a {nextMeta.label}, la reseña deja de aparecer en los feeds de la comunidad.
                </p>
              )}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                <Btn variant="ghost" onClick={() => setEditing(null)}>Cancelar</Btn>
                <Btn variant="primary" disabled={sameAsCurrent} icon="check" onClick={confirmEdit}>
                  {sameAsCurrent ? 'Misma visibilidad' : 'Confirmar'}
                </Btn>
              </div>
            </div>
          </div>
        );
      })()}
    </section>
  );
};

Object.assign(window, { ScreenPreferences, ScreenMyExperiences });
