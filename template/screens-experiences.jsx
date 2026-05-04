// CU-07 a CU-09 — Experiencias y Reputación

// CU-07: Publicar experiencia (multi-paso)
const ScreenPublish = ({ nav }) => {
  const [step, setStep] = React.useState(1);
  const [place, setPlace] = React.useState(null);
  const [score, setScore] = React.useState(0);
  const [text, setText] = React.useState('');
  const [visibility, setVisibility] = React.useState('public');
  const [hostRated, setHostRated] = React.useState(0);
  const total = 4;

  const next = () => step < total ? setStep(step + 1) : nav('discover');

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: SPOTA.c.bg }}>
      <div style={{ padding: '12px 16px 4px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => step > 1 ? setStep(step - 1) : nav('discover')} style={{ width: 40, height: 40, borderRadius: 999, border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
            <h1 style={{ margin: '0 0 8px', fontFamily: SPOTA.font.ui, fontSize: 24, fontWeight: 700, color: SPOTA.c.text, letterSpacing: -0.4 }}>¿Dónde estuviste?</h1>
            <p style={{ margin: '0 0 18px', fontFamily: SPOTA.font.ui, fontSize: 14, color: SPOTA.c.textSoft }}>Elegí el lugar que querés reseñar.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {PLACES.slice(0, 5).map(p => (
                <button key={p.id} onClick={() => setPlace(p)} style={{
                  display: 'flex', alignItems: 'center', gap: 12, padding: 10, borderRadius: 14,
                  background: place?.id === p.id ? SPOTA.c.primarySoft : SPOTA.c.surface,
                  border: `1.5px solid ${place?.id === p.id ? SPOTA.c.primary : SPOTA.c.lineSoft}`,
                  cursor: 'pointer', textAlign: 'left',
                }}>
                  <img src={photo(p.img, 200, 200)} style={{ width: 56, height: 56, borderRadius: 10, objectFit: 'cover' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 14, color: SPOTA.c.text }}>{p.name}</div>
                    <div style={{ fontFamily: SPOTA.font.ui, fontSize: 12, color: SPOTA.c.textSoft }}>{p.cat} · {p.hood}</div>
                  </div>
                  {place?.id === p.id && <Icon name="checkCircle" size={22} color={SPOTA.c.primary} />}
                </button>
              ))}
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h1 style={{ margin: '0 0 8px', fontFamily: SPOTA.font.ui, fontSize: 24, fontWeight: 700, color: SPOTA.c.text, letterSpacing: -0.4 }}>Validando que estuviste</h1>
            <p style={{ margin: '0 0 24px', fontFamily: SPOTA.font.ui, fontSize: 14, color: SPOTA.c.textSoft, lineHeight: 1.5 }}>
              Spota verifica tu visita por GPS para que tu reseña tenga el badge <strong style={{ color: SPOTA.c.primary }}>Visitado ✓</strong>.
            </p>
            <div style={{ background: SPOTA.c.surface, borderRadius: 18, padding: 24, textAlign: 'center', border: `1px solid ${SPOTA.c.lineSoft}` }}>
              <div style={{ width: 96, height: 96, borderRadius: 999, background: SPOTA.c.primarySoft, margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <div style={{ position: 'absolute', inset: 0, borderRadius: 999, border: `2px solid ${SPOTA.c.primary}`, opacity: 0.3, animation: 'pulse 1.6s infinite' }} />
                <Icon name="pinFill" size={44} color={SPOTA.c.primary} />
              </div>
              <h3 style={{ margin: '0 0 4px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 17, color: SPOTA.c.text }}>Verificando ubicación...</h3>
              <p style={{ margin: '0 0 16px', fontFamily: SPOTA.font.ui, fontSize: 13, color: SPOTA.c.textSoft }}>Café Cobrand · Palermo</p>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 999, background: SPOTA.c.primarySoft }}>
                <Icon name="check" size={14} color={SPOTA.c.primary} strokeWidth={3} />
                <span style={{ fontFamily: SPOTA.font.ui, fontWeight: 600, fontSize: 13, color: SPOTA.c.primaryDark }}>Visita confirmada</span>
              </div>
            </div>
          </>
        )}

        {step === 3 && (
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
            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
              {['Excelente café', 'Buena onda', 'Lindo lugar', 'Volvería'].map(t => (
                <button key={t} style={{ padding: '6px 12px', borderRadius: 999, background: SPOTA.c.surface, border: `1px solid ${SPOTA.c.line}`, fontFamily: SPOTA.font.ui, fontSize: 12, color: SPOTA.c.textSoft, cursor: 'pointer' }}>+ {t}</button>
              ))}
            </div>
          </>
        )}

        {step === 4 && (
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
            <div style={{ marginTop: 20, padding: 14, borderRadius: 14, background: SPOTA.c.bgAlt, border: `1px dashed ${SPOTA.c.line}` }}>
              <p style={{ margin: '0 0 10px', fontFamily: SPOTA.font.ui, fontSize: 13, fontWeight: 600, color: SPOTA.c.text }}>¿Hubo un host? Calificalo</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Avatar name="Federico M." size={36} score={4.9} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: SPOTA.font.ui, fontWeight: 600, fontSize: 13.5, color: SPOTA.c.text }}>Federico M.</div>
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

// CU-08: Valorar experiencia de la comunidad
const ScreenRateCommunity = ({ nav }) => {
  const [helpful, setHelpful] = React.useState(null);
  const [affinity, setAffinity] = React.useState(0);
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: SPOTA.c.bg }}>
      <AppHeader title="Valorar reseña" leftIcon="arrowLeft" onLeft={() => nav('experiencesList')} />
      <div style={{ flex: 1, overflow: 'auto', padding: 20 }}>
        <div style={{ background: SPOTA.c.surface, borderRadius: 14, padding: 16, marginBottom: 16, border: `1px solid ${SPOTA.c.lineSoft}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <Avatar name="Sol B." size={42} score="92" />
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 14.5, color: SPOTA.c.text }}>Sol B. <span style={{ color: SPOTA.c.textSoft, fontWeight: 500, fontSize: 12 }}>· Fama 92</span></div>
              <div style={{ fontFamily: SPOTA.font.ui, fontSize: 12, color: SPOTA.c.textSoft }}>Reseñó <strong style={{ color: SPOTA.c.text }}>Café Cobrand</strong></div>
            </div>
            <ProofOfVisit />
          </div>
          <div style={{ display: 'flex', gap: 3, marginBottom: 10 }}>{[1,2,3,4,5].map(i => <Icon key={i} name="star" size={16} color={SPOTA.c.accent} />)}</div>
          <p style={{ margin: 0, fontFamily: SPOTA.font.ui, fontSize: 14, color: SPOTA.c.text, lineHeight: 1.6 }}>
            Encontré un café de barrio increíble, atención impecable y mesas en patio interno con plantas. Volvería sin dudarlo.
          </p>
        </div>

        <div style={{ background: SPOTA.c.surface, borderRadius: 14, padding: 16, border: `1px solid ${SPOTA.c.lineSoft}`, marginBottom: 14 }}>
          <h3 style={{ margin: '0 0 12px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 15, color: SPOTA.c.text }}>¿Te resultó útil?</h3>
          <div style={{ display: 'flex', gap: 10 }}>
            {[{ id: 'yes', t: 'Sí, útil', i: 'thumbsUp' }, { id: 'no', t: 'No mucho', i: 'flag' }].map(o => (
              <button key={o.id} onClick={() => setHelpful(o.id)} style={{
                flex: 1, padding: '14px 12px', borderRadius: 12, cursor: 'pointer',
                background: helpful === o.id ? SPOTA.c.primary : SPOTA.c.bg,
                color: helpful === o.id ? '#fff' : SPOTA.c.text,
                border: `1.5px solid ${helpful === o.id ? SPOTA.c.primary : SPOTA.c.line}`,
                fontFamily: SPOTA.font.ui, fontWeight: 600, fontSize: 14,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}><Icon name={o.i} size={16} /> {o.t}</button>
            ))}
          </div>
        </div>

        <div style={{ background: SPOTA.c.surface, borderRadius: 14, padding: 16, border: `1px solid ${SPOTA.c.lineSoft}`, marginBottom: 16 }}>
          <h3 style={{ margin: '0 0 4px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 15, color: SPOTA.c.text }}>¿Qué tan afín a tus gustos es Sol?</h3>
          <p style={{ margin: '0 0 12px', fontFamily: SPOTA.font.ui, fontSize: 12.5, color: SPOTA.c.textSoft }}>Esto pondera el peso de su reseña en tu feed.</p>
          <div style={{ display: 'flex', gap: 4 }}>
            {[1, 2, 3, 4, 5].map(i => (
              <button key={i} onClick={() => setAffinity(i)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 4 }}>
                <Icon name={i <= affinity ? 'sparkles' : 'starOutline'} size={26} color={i <= affinity ? SPOTA.c.accent : SPOTA.c.line} />
              </button>
            ))}
          </div>
        </div>

        <Btn variant="primary" size="lg" full onClick={() => nav('experiencesList')}>Enviar valoración</Btn>
      </div>
    </div>
  );
};

// CU-09: Gestionar experiencias propias
const ScreenMyExperiences = ({ nav, famaVariant }) => {
  const [tab, setTab] = React.useState('all');
  const myExp = [
    { id: 'e1', place: PLACES[0], score: 5, text: 'Encontré un café de barrio increíble...', date: 'hace 3 días', visibility: 'public', likes: 24 },
    { id: 'e2', place: PLACES[5], score: 4, text: 'Buen lugar para una copa de vino tranquilo...', date: 'la semana pasada', visibility: 'public', likes: 12 },
    { id: 'e3', place: PLACES[2], score: 5, text: 'Una librería preciosa, me quedé toda la tarde.', date: 'hace 2 semanas', visibility: 'private', likes: 0 },
  ];
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
      <div style={{ display: 'flex', borderBottom: `1px solid ${SPOTA.c.lineSoft}`, padding: '0 20px', background: SPOTA.c.bg }}>
        {[{ id: 'all', t: 'Todas' }, { id: 'public', t: 'Públicas' }, { id: 'private', t: 'Privadas' }].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            flex: 1, padding: '14px 0', border: 'none', background: 'transparent', cursor: 'pointer',
            fontFamily: SPOTA.font.ui, fontWeight: tab === t.id ? 700 : 500, fontSize: 14,
            color: tab === t.id ? SPOTA.c.primary : SPOTA.c.textSoft,
            borderBottom: `2px solid ${tab === t.id ? SPOTA.c.primary : 'transparent'}`,
          }}>{t.t}</button>
        ))}
      </div>
      <div style={{ flex: 1, overflow: 'auto', padding: 20 }}>
        {myExp.filter(e => tab === 'all' || e.visibility === tab).map(e => (
          <div key={e.id} style={{ background: SPOTA.c.surface, borderRadius: 14, padding: 14, marginBottom: 12, border: `1px solid ${SPOTA.c.lineSoft}` }}>
            <div style={{ display: 'flex', gap: 12, marginBottom: 10 }}>
              <img src={photo(e.place.img, 200, 200)} style={{ width: 56, height: 56, borderRadius: 10, objectFit: 'cover' }} />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ margin: 0, fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 15, color: SPOTA.c.text }}>{e.place.name}</h3>
                  <Tag kind={e.visibility === 'public' ? 'softG' : 'soft'} icon={e.visibility === 'public' ? 'globe' : 'lock'}>
                    {e.visibility === 'public' ? 'Pública' : 'Privada'}
                  </Tag>
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
              <div style={{ display: 'flex', gap: 4 }}>
                <button style={{ width: 32, height: 32, borderRadius: 8, border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="edit" size={15} color={SPOTA.c.textSoft} /></button>
                <button style={{ width: 32, height: 32, borderRadius: 8, border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="trash" size={15} color={SPOTA.c.textSoft} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

Object.assign(window, { ScreenPublish, ScreenRateCommunity, ScreenMyExperiences });
