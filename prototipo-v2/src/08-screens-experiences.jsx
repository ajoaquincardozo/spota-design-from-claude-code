// ========================================================================
// 08-screens-experiences.jsx
// ========================================================================
// CU-07 a CU-09 — Experiencias y Reputación

// CU-07: Publicar experiencia (multi-paso)
const ScreenPublish = ({ nav }) => {
  const [step, setStep] = React.useState(1);
  const [place, setPlace] = React.useState(null);
  const [score, setScore] = React.useState(0);
  const [text, setText] = React.useState('');
  const [visibility, setVisibility] = React.useState('public');
  const [hostRated, setHostRated] = React.useState(0);
  const [chips, setChips] = React.useState([]);
  const togChip = (t) => setChips(c => c.includes(t) ? c.filter(x => x !== t) : [...c, t]);
  const total = 3;

  // Visitas con Proof of Visit ya validado y aún sin reseñar.
  // El Paso "validar presencia" se da por sentado: el sistema ya verificó en background
  // según el doc Proof_of_Visit_Mecanismo_y_Flujo_de_Experiencia.md.
  // Mock: algunas visitas tuvieron host contratado (Alt 2 §3.16). El bloque "Calificá al host"
  // se muestra solo cuando la visita seleccionada tiene `host`.
  const pendingVisits = [
    { ...PLACES[0], visitedAt: 'ayer · 19:40', host: { name: 'Federico M.', fama: 92 } },
    { ...PLACES[3], visitedAt: 'sábado · 22:10' },
    { ...PLACES[5], visitedAt: 'jueves · 13:20' },
  ];
  const selectedVisit = pendingVisits.find(v => v.id === place) || null;
  const hasHost = !!(selectedVisit && selectedVisit.host);

  // CU-003-001 §3.16 paso 33: redirect al detalle del lugar con la reseña visible.
  const next = () => step < total
    ? setStep(step + 1)
    : nav('placeDetail', { id: place || pendingVisits[0].id });

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: SPOTA.c.bg }}>
      <div style={{ padding: '12px 16px 4px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => step > 1 ? setStep(step - 1) : nav('home')} style={{ width: 40, height: 40, borderRadius: 999, border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name={step > 1 ? 'arrowLeft' : 'close'} size={22} />
        </button>
        <div style={{ flex: 1, display: 'flex', gap: 4 }}>
          {[...Array(total)].map((_, i) => (
            <div key={i} style={{ flex: 1, height: 4, borderRadius: 999, background: i < step ? SPOTA.c.primary : SPOTA.c.line, transition: 'background 200ms' }} />
          ))}
        </div>
      </div>
      <div style={{ flex: 1, overflow: 'auto', padding: '16px 20px 100px' }}>
        <p style={{ margin: '0 0 4px', fontFamily: SPOTA.font.ui, fontSize: 12, fontWeight: 700, color: SPOTA.c.primary, letterSpacing: 0.4, textTransform: 'uppercase' }}>Paso {step} de {total}</p>

        {step === 1 && (
          <>
            <h1 style={{ margin: '0 0 8px', fontFamily: SPOTA.font.ui, fontSize: 24, fontWeight: 700, color: SPOTA.c.text, letterSpacing: -0.4 }}>¿Qué visita querés contar?</h1>
            <p style={{ margin: '0 0 18px', fontFamily: SPOTA.font.ui, fontSize: 14, color: SPOTA.c.textSoft, lineHeight: 1.5 }}>
              Estas son las visitas que validamos por vos y todavía no reseñaste.
            </p>
            {pendingVisits.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {pendingVisits.map(p => (
                  <button key={p.id} onClick={() => setPlace(p)} style={{
                    display: 'flex', alignItems: 'center', gap: 12, padding: 10, borderRadius: 14,
                    background: place?.id === p.id ? SPOTA.c.primarySoft : SPOTA.c.surface,
                    border: `1.5px solid ${place?.id === p.id ? SPOTA.c.primary : SPOTA.c.lineSoft}`,
                    cursor: 'pointer', textAlign: 'left',
                  }}>
                    <div style={{ position: 'relative' }}>
                      <img src={photo(p.img, 200, 200)} style={{ width: 56, height: 56, borderRadius: 10, objectFit: 'cover' }} />
                      <div style={{ position: 'absolute', bottom: -4, right: -4, width: 22, height: 22, borderRadius: 999, background: SPOTA.c.primary, border: '2px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon name="check" size={12} color="#fff" strokeWidth={3.2} />
                      </div>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 14, color: SPOTA.c.text }}>{p.name}</div>
                      <div style={{ fontFamily: SPOTA.font.ui, fontSize: 12, color: SPOTA.c.textSoft }}>{p.cat} · {p.hood}</div>
                      <div style={{ fontFamily: SPOTA.font.ui, fontSize: 11.5, color: SPOTA.c.primary, fontWeight: 600, marginTop: 2 }}>Visitado {p.visitedAt}</div>
                    </div>
                    {place?.id === p.id && <Icon name="checkCircle" size={22} color={SPOTA.c.primary} />}
                  </button>
                ))}
              </div>
            ) : (
              <div style={{ background: SPOTA.c.surface, borderRadius: 18, padding: 28, textAlign: 'center', border: `1px dashed ${SPOTA.c.line}` }}>
                <div style={{ width: 64, height: 64, borderRadius: 999, background: SPOTA.c.bgAlt, margin: '0 auto 14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name="pinFill" size={28} color={SPOTA.c.textMuted} />
                </div>
                <h3 style={{ margin: '0 0 6px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 16, color: SPOTA.c.text }}>Todavía no hay visitas pendientes</h3>
                <p style={{ margin: '0 0 14px', fontFamily: SPOTA.font.ui, fontSize: 13, color: SPOTA.c.textSoft, lineHeight: 1.5 }}>
                  Cuando encuentres un lugar, declará tu intención con <strong style={{ color: SPOTA.c.primary }}>"Quiero ir"</strong> en Descubrir. Validamos tu llegada en silencio.
                </p>
                <Btn variant="primary" icon="compass" onClick={() => nav('home')}>Ir a Descubrir</Btn>
              </div>
            )}
          </>
        )}

        {step === 2 && (
          <>
            <h1 style={{ margin: '0 0 8px', fontFamily: SPOTA.font.ui, fontSize: 24, fontWeight: 700, color: SPOTA.c.text, letterSpacing: -0.4 }}>¿Cómo lo viviste?</h1>
            <p style={{ margin: '0 0 18px', fontFamily: SPOTA.font.ui, fontSize: 14, color: SPOTA.c.textSoft }}>Tu reseña ayuda a otros como vos.</p>
            <div style={{ background: SPOTA.c.surface, borderRadius: 14, padding: 18, border: `1px solid ${SPOTA.c.lineSoft}`, marginBottom: 14, textAlign: 'center' }}>
              <p style={{ margin: '0 0 10px', fontFamily: SPOTA.font.ui, fontSize: 13, color: SPOTA.c.textSoft }}>Tu valoración</p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 6 }}>
                {[1, 2, 3, 4, 5].map(i => (
                  <button key={i} onClick={() => setScore(i)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 0 }}>
                    <Icon name={i <= score ? 'star' : 'starOutline'} size={36} color={i <= score ? SPOTA.c.accent : SPOTA.c.line} />
                  </button>
                ))}
              </div>
            </div>
            <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Contale a la comunidad qué te pareció..." style={{
              width: '100%', minHeight: 120, padding: 14, borderRadius: 14, boxSizing: 'border-box',
              border: `1.5px solid ${SPOTA.c.line}`, background: SPOTA.c.surface,
              fontFamily: SPOTA.font.ui, fontSize: 15, color: SPOTA.c.text, resize: 'vertical', outline: 'none',
            }} />
            <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
              {['Excelente café', 'Buena onda', 'Lindo lugar', 'Volvería', 'Pastelería rica', 'Wifi rápido', 'Para trabajar', 'Buena música', 'Atención amable', 'Buen precio'].map(t => {
                const on = chips.includes(t);
                return (
                  <button key={t} onClick={() => togChip(t)} style={{
                    padding: '6px 12px', borderRadius: 999, cursor: 'pointer',
                    background: on ? SPOTA.c.primary : SPOTA.c.surface,
                    color: on ? '#fff' : SPOTA.c.textSoft,
                    border: `1px solid ${on ? SPOTA.c.primary : SPOTA.c.line}`,
                    fontFamily: SPOTA.font.ui, fontSize: 12, fontWeight: on ? 600 : 500,
                    transition: 'background 150ms, color 150ms',
                  }}>{on ? '✓' : '+'} {t}</button>
                );
              })}
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h1 style={{ margin: '0 0 8px', fontFamily: SPOTA.font.ui, fontSize: 24, fontWeight: 700, color: SPOTA.c.text, letterSpacing: -0.4 }}>¿Quién la puede ver?</h1>
            <p style={{ margin: '0 0 18px', fontFamily: SPOTA.font.ui, fontSize: 14, color: SPOTA.c.textSoft }}>Podés cambiar esto después.</p>
            {[
              { id: 'public', icon: 'globe', t: 'Pública', s: 'La comunidad de Spota la ve y suma a tu Fama Score.' },
              { id: 'private', icon: 'lock', t: 'Privada', s: 'Sólo vos la ves. Útil para tu propio registro.' },
            ].map(o => (
              <button key={o.id} onClick={() => setVisibility(o.id)} style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 14, padding: 16, borderRadius: 14, marginBottom: 10,
                background: visibility === o.id ? SPOTA.c.primarySoft : SPOTA.c.surface,
                border: `1.5px solid ${visibility === o.id ? SPOTA.c.primary : SPOTA.c.lineSoft}`,
                cursor: 'pointer', textAlign: 'left',
              }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: SPOTA.c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name={o.icon} size={20} color={SPOTA.c.primary} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 15, color: SPOTA.c.text }}>{o.t}</div>
                  <div style={{ fontFamily: SPOTA.font.ui, fontSize: 13, color: SPOTA.c.textSoft, marginTop: 2 }}>{o.s}</div>
                </div>
                {visibility === o.id && <Icon name="checkCircle" size={22} color={SPOTA.c.primary} />}
              </button>
            ))}
            {hasHost && (
              <div style={{ marginTop: 20, padding: 14, borderRadius: 14, background: SPOTA.c.bgAlt, border: `1px dashed ${SPOTA.c.line}` }}>
                <p style={{ margin: '0 0 10px', fontFamily: SPOTA.font.ui, fontSize: 13, fontWeight: 600, color: SPOTA.c.text }}>Calificá al host</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Avatar name={selectedVisit.host.name} size={36} score={selectedVisit.host.fama} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: SPOTA.font.ui, fontWeight: 600, fontSize: 13.5, color: SPOTA.c.text }}>{selectedVisit.host.name}</div>
                    <div style={{ display: 'flex', gap: 3, marginTop: 3 }}>
                      {[1, 2, 3, 4, 5].map(i => (
                        <button key={i} onClick={() => setHostRated(i)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 0 }}>
                          <Icon name={i <= hostRated ? 'star' : 'starOutline'} size={18} color={i <= hostRated ? SPOTA.c.accent : SPOTA.c.line} />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <div style={{ padding: '12px 20px 16px', borderTop: `1px solid ${SPOTA.c.lineSoft}`, background: SPOTA.c.bg }}>
        <Btn variant="primary" size="lg" full iconRight={step < total ? 'arrowRight' : 'check'} onClick={next}>
          {step < total ? 'Continuar' : 'Publicar'}
        </Btn>
      </div>
    </div>
  );
};

// CU-003-002 ⚪ Absorbido en CU-003-001 (publish). La valoración de reseñas ajenas pasa a ser
// implícita silenciosa: el sistema infiere "me sirvió" según las reseñas navegadas durante
// discovery. La pantalla ScreenRateCommunity y la ruta `rate` quedan retiradas del prototipo
// para alinear con la decisión canónica (`propuestas_mejora_cu.md` §3.17).

// CU-09: Gestionar experiencias propias
// CU-003-003 §3.2 — visibilidades canónicas con set de 3 opciones
const VISIBILITY_OPTIONS = [
  { id: 'public',  label: 'Pública',      icon: 'globe', tone: 'softG' },
  { id: 'private', label: 'Privada',      icon: 'lock',  tone: 'soft' },
  { id: 'friends', label: 'Solo amigos',  icon: 'users', tone: 'softA' },
];
const visMeta = (v) => VISIBILITY_OPTIONS.find(o => o.id === v) || VISIBILITY_OPTIONS[0];
const ScreenMyExperiences = ({ nav, famaVariant }) => {
  const [tab, setTab] = React.useState('all');
  const [myExp, setMyExp] = React.useState([
    { id: 'e1', place: PLACES[0], score: 5, text: 'Encontré un café de barrio increíble...', date: 'hace 3 días', visibility: 'public', likes: 24 },
    { id: 'e2', place: PLACES[5], score: 4, text: 'Buen lugar para una copa de vino tranquilo...', date: 'la semana pasada', visibility: 'public', likes: 12 },
    { id: 'e3', place: PLACES[2], score: 5, text: 'Una librería preciosa, me quedé toda la tarde.', date: 'hace 2 semanas', visibility: 'private', likes: 0 },
  ]);
  // Sheet de "Cambiar visibilidad" — guarda la reseña en edición + la nueva visibilidad tentativa.
  const [editing, setEditing] = React.useState(null); // { id, next }
  const openEdit = (id) => setEditing({ id, next: myExp.find(e => e.id === id).visibility });
  const confirmEdit = () => {
    if (!editing) return;
    setMyExp(list => list.map(e => e.id === editing.id ? { ...e, visibility: editing.next } : e));
    setEditing(null);
  };
  // Lugares visitados pendientes de valorar (CU-07 entry desde acá)
  const pending = [
    { id: 'pd1', place: PLACES[3], date: 'ayer' },
    { id: 'pd2', place: PLACES[7], date: 'el sábado' },
  ];
  // CU-003-002 ⚪ Absorbido: la valoración de reseñas ajenas pasa a ser implícita silenciosa
  // dentro de publish (CU-003-001 §3.16 pasos 16-23). Se retiran el set communityToRate y
  // la sección "Reseñas de la comunidad".
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: SPOTA.c.bg }}>
      <AppHeader title="Mis experiencias" leftIcon="arrowLeft" onLeft={() => nav('profile')} rightIcon="plus" onRight={() => nav('publish')} />
      <div style={{ padding: '14px 20px', background: `linear-gradient(135deg, ${SPOTA.c.primary}, ${SPOTA.c.primaryDark})`, color: '#fff', display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ width: 56, height: 56, borderRadius: 999, background: 'rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="sparkles" size={26} color={SPOTA.c.accent} />
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ margin: 0, fontFamily: SPOTA.font.ui, fontSize: 12.5, opacity: 0.85 }}>Tu Fama Score</p>
          <h2 style={{ margin: '2px 0 0', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 26 }}>87 <span style={{ fontSize: 13, fontWeight: 500, opacity: 0.85 }}>· {myExp.length} reseñas · 36 likes</span></h2>
        </div>
      </div>
      <div style={{ display: 'flex', borderBottom: `1px solid ${SPOTA.c.lineSoft}`, padding: '0 20px', background: SPOTA.c.bg, gap: 6 }}>
        {[
          { id: 'all', t: 'Todas', n: myExp.length },
          { id: 'pending', t: 'Por valorar', n: pending.length },
          { id: 'public', t: 'Públicas', n: myExp.filter(e => e.visibility === 'public').length },
          { id: 'private', t: 'Privadas', n: myExp.filter(e => e.visibility === 'private').length },
        ].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            padding: '14px 4px', border: 'none', background: 'transparent', cursor: 'pointer',
            fontFamily: SPOTA.font.ui, fontWeight: tab === t.id ? 700 : 500, fontSize: 13.5,
            color: tab === t.id ? SPOTA.c.primary : SPOTA.c.textSoft,
            borderBottom: `2px solid ${tab === t.id ? SPOTA.c.primary : 'transparent'}`,
            display: 'inline-flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap',
          }}>{t.t} {t.n > 0 && <span style={{ background: tab === t.id ? SPOTA.c.primary : SPOTA.c.lineSoft, color: tab === t.id ? '#fff' : SPOTA.c.textSoft, padding: '1px 7px', borderRadius: 999, fontSize: 11, fontWeight: 700 }}>{t.n}</span>}</button>
        ))}
      </div>
      <div style={{ flex: 1, overflow: 'auto', padding: 20 }}>
        {tab === 'pending' && (
          <>
            <h3 style={{ margin: '0 0 4px', fontFamily: SPOTA.font.ui, fontSize: 13, fontWeight: 700, color: SPOTA.c.primary, textTransform: 'uppercase', letterSpacing: 0.4 }}>Visitados sin valorar</h3>
            <p style={{ margin: '0 0 12px', fontFamily: SPOTA.font.ui, fontSize: 13, color: SPOTA.c.textSoft }}>Compartí lo que pensaste y sumá Fama Score.</p>
            {pending.map(p => (
              <div key={p.id} style={{ display: 'flex', gap: 12, padding: 12, background: SPOTA.c.surface, borderRadius: 14, border: `1px solid ${SPOTA.c.lineSoft}`, marginBottom: 10 }}>
                <img src={photo(p.place.img, 200, 200)} style={{ width: 60, height: 60, borderRadius: 10, objectFit: 'cover' }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 14.5, color: SPOTA.c.text }}>{p.place.name}</div>
                  <div style={{ fontFamily: SPOTA.font.ui, fontSize: 12.5, color: SPOTA.c.textSoft, marginBottom: 8 }}>{p.place.hood} · Visitado {p.date}</div>
                  <Btn variant="primary" size="sm" icon="star" onClick={() => nav('publish')}>Valorar lugar</Btn>
                </div>
              </div>
            ))}
            {/* CU-003-002 ⚪ Absorbido: la sección "Reseñas de la comunidad" se retira porque
                la valoración pasa a ser implícita silenciosa dentro de publish. */}
          </>
        )}
        {tab !== 'pending' && myExp.filter(e => tab === 'all' || e.visibility === tab).map(e => {
          const meta = visMeta(e.visibility);
          return (
          <div key={e.id} style={{ background: SPOTA.c.surface, borderRadius: 14, padding: 14, marginBottom: 12, border: `1px solid ${SPOTA.c.lineSoft}` }}>
            <div style={{ display: 'flex', gap: 12, marginBottom: 10 }}>
              <img src={photo(e.place.img, 200, 200)} style={{ width: 56, height: 56, borderRadius: 10, objectFit: 'cover' }} />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ margin: 0, fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 15, color: SPOTA.c.text }}>{e.place.name}</h3>
                  <Tag kind={meta.tone} icon={meta.icon}>{meta.label}</Tag>
                </div>
                <div style={{ fontFamily: SPOTA.font.ui, fontSize: 12.5, color: SPOTA.c.textSoft, marginTop: 2 }}>{e.place.hood} · {e.date}</div>
                <div style={{ display: 'flex', gap: 2, marginTop: 4 }}>{[...Array(5)].map((_, i) => <Icon key={i} name={i < e.score ? 'star' : 'starOutline'} size={13} color={SPOTA.c.accent} />)}</div>
              </div>
            </div>
            <p style={{ margin: '0 0 10px', fontFamily: SPOTA.font.ui, fontSize: 13.5, color: SPOTA.c.text, lineHeight: 1.5 }}>{e.text}</p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 10, borderTop: `1px solid ${SPOTA.c.lineSoft}` }}>
              <div style={{ display: 'flex', gap: 14, fontFamily: SPOTA.font.ui, fontSize: 12.5, color: SPOTA.c.textSoft }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Icon name="heartFill" size={13} color={SPOTA.c.secondary} /> {e.likes}</span>
                {e.place.visited && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Icon name="check" size={13} color={SPOTA.c.primary} strokeWidth={3} /> Verificada</span>}
              </div>
              <button onClick={() => openEdit(e.id)} title="Cambiar visibilidad" style={{
                height: 30, padding: '0 10px', borderRadius: 999, border: `1px solid ${SPOTA.c.line}`,
                background: SPOTA.c.surface, color: SPOTA.c.primary, cursor: 'pointer',
                fontFamily: SPOTA.font.ui, fontWeight: 600, fontSize: 12,
                display: 'inline-flex', alignItems: 'center', gap: 6,
              }}>
                <Icon name="eye" size={13} color={SPOTA.c.primary} /> Cambiar visibilidad
              </button>
            </div>
          </div>
        );})}
      </div>
      {/* Sheet de "Cambiar visibilidad" — CU-003-003 §3.2 pasos 5-11 */}
      {editing && (() => {
        const current = myExp.find(e => e.id === editing.id);
        const currentMeta = visMeta(current.visibility);
        const nextMeta = visMeta(editing.next);
        const sameAsCurrent = editing.next === current.visibility;
        const turningPrivate = current.visibility === 'public' && editing.next !== 'public';
        return (
          <div onClick={() => setEditing(null)} style={{
            position: 'absolute', inset: 0, background: 'rgba(43,37,35,0.55)',
            display: 'flex', alignItems: 'flex-end', zIndex: 80,
          }}>
            <div onClick={(e) => e.stopPropagation()} style={{
              background: SPOTA.c.bg, width: '100%',
              borderTopLeftRadius: 22, borderTopRightRadius: 22,
              padding: '12px 22px 26px',
              animation: 'slideUp 260ms cubic-bezier(.2,.8,.2,1)',
            }}>
              <div style={{ width: 40, height: 4, borderRadius: 999, background: SPOTA.c.line, margin: '0 auto 14px' }} />
              <h2 style={{ margin: '0 0 6px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 19, color: SPOTA.c.text }}>Cambiar visibilidad</h2>
              <p style={{ margin: '0 0 14px', fontFamily: SPOTA.font.ui, fontSize: 13, color: SPOTA.c.textSoft }}>
                Actualmente <strong style={{ color: SPOTA.c.text }}>{currentMeta.label}</strong>. Las valoraciones recibidas se conservan.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>
                {VISIBILITY_OPTIONS.map(o => {
                  const on = editing.next === o.id;
                  return (
                    <button key={o.id} onClick={() => setEditing(s => ({ ...s, next: o.id }))} style={{
                      display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', borderRadius: 12,
                      background: on ? SPOTA.c.primarySoft : SPOTA.c.surface,
                      border: `1.5px solid ${on ? SPOTA.c.primary : SPOTA.c.lineSoft}`,
                      cursor: 'pointer', textAlign: 'left',
                    }}>
                      <Icon name={o.icon} size={18} color={on ? SPOTA.c.primary : SPOTA.c.textSoft} />
                      <span style={{ flex: 1, fontFamily: SPOTA.font.ui, fontWeight: on ? 700 : 600, fontSize: 14, color: SPOTA.c.text }}>{o.label}</span>
                      {on && <Icon name="checkCircle" size={18} color={SPOTA.c.primary} />}
                    </button>
                  );
                })}
              </div>
              {turningPrivate && !sameAsCurrent && (
                <p style={{ margin: '0 0 14px', fontFamily: SPOTA.font.ui, fontSize: 12.5, color: SPOTA.c.textSoft, lineHeight: 1.5, padding: 10, background: SPOTA.c.surface, borderRadius: 10, border: `1px solid ${SPOTA.c.lineSoft}` }}>
                  Al pasar a {nextMeta.label}, la reseña deja de aparecer en los feeds de la comunidad.
                </p>
              )}
              <div style={{ display: 'flex', gap: 10 }}>
                <Btn variant="outline" full onClick={() => setEditing(null)}>Cancelar</Btn>
                <Btn variant="primary" full disabled={sameAsCurrent} icon="check" onClick={confirmEdit}>
                  {sameAsCurrent ? 'Misma visibilidad' : 'Confirmar'}
                </Btn>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};

Object.assign(window, { ScreenPublish, ScreenMyExperiences });
