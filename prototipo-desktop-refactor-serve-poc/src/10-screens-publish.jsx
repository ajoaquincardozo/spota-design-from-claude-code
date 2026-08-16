// ========================================================================
// 10-screens-publish.jsx
// ========================================================================
// Wizard publicar — 3 pasos (D9 del CLAUDE.md, fidelidad al doc Proof of Visit).
// Paso 1: lista de visitas con Proof of Visit ya validado, pendientes de resenar.
// Paso 2: rating + reseña + chips de etiquetas.
// Paso 3: visibilidad + rating de host opcional.
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

  // Alt 2 §3.16: bloque "Calificá al host" condicional al flag de visita con host.
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
  const back = () => step > 1 ? setStep(step - 1) : nav('home');

  return (
    <section>
      {/* Header con close + título */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
        <button onClick={back} style={{
          width: 40, height: 40, borderRadius: 999, border: `1px solid ${SPOTA.c.line}`,
          background: SPOTA.c.surface, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon name={step > 1 ? 'arrowLeft' : 'close'} size={18} />
        </button>
        <div style={{ flex: 1 }}>
          <p style={{ margin: 0, fontFamily: SPOTA.font.ui, fontSize: 12.5, fontWeight: 700, color: SPOTA.c.primary, letterSpacing: 0.4, textTransform: 'uppercase' }}>Publicar experiencia</p>
          <h1 style={{ margin: '2px 0 0', fontFamily: SPOTA.font.ui, fontSize: 22, fontWeight: 700, color: SPOTA.c.text, letterSpacing: -0.4 }}>
            Paso {step} de {total}
          </h1>
        </div>
      </div>

      <Stepper steps={['Visita', 'Tu reseña', 'Visibilidad']} current={step} />

      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        {step === 1 && (
          <>
            <h2 style={{ margin: '0 0 8px', fontFamily: SPOTA.font.ui, fontSize: 26, fontWeight: 700, color: SPOTA.c.text, letterSpacing: -0.5 }}>¿Qué visita querés contar?</h2>
            <p style={{ margin: '0 0 24px', fontFamily: SPOTA.font.ui, fontSize: 14.5, color: SPOTA.c.textSoft, lineHeight: 1.5 }}>
              Estas son las visitas que validamos por vos y todavía no reseñaste.
            </p>
            {pendingVisits.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {pendingVisits.map(p => {
                  const on = place?.id === p.id;
                  return (
                    <button key={p.id} onClick={() => setPlace(p)} style={{
                      display: 'flex', alignItems: 'center', gap: 14, padding: 14, borderRadius: 14,
                      background: on ? SPOTA.c.primarySoft : SPOTA.c.surface,
                      border: `1.5px solid ${on ? SPOTA.c.primary : SPOTA.c.lineSoft}`,
                      cursor: 'pointer', textAlign: 'left',
                    }}>
                      <div style={{ position: 'relative', flexShrink: 0 }}>
                        <img src={photo(p.img, 200, 200)} style={{ width: 64, height: 64, borderRadius: 12, objectFit: 'cover' }} />
                        <div style={{ position: 'absolute', bottom: -4, right: -4, width: 24, height: 24, borderRadius: 999, background: SPOTA.c.primary, border: '2px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Icon name="check" size={12} color="#fff" strokeWidth={3.2} />
                        </div>
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 15, color: SPOTA.c.text }}>{p.name}</div>
                        <div style={{ fontFamily: SPOTA.font.ui, fontSize: 13, color: SPOTA.c.textSoft }}>{p.cat} · {p.hood}</div>
                        <div style={{ fontFamily: SPOTA.font.ui, fontSize: 12, color: SPOTA.c.primary, fontWeight: 600, marginTop: 2 }}>Visitado {p.visitedAt}</div>
                      </div>
                      {on && <Icon name="checkCircle" size={24} color={SPOTA.c.primary} />}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div style={{ background: SPOTA.c.surface, borderRadius: 18, padding: 32, textAlign: 'center', border: `1px dashed ${SPOTA.c.line}` }}>
                <div style={{ width: 72, height: 72, borderRadius: 999, background: SPOTA.c.bgAlt, margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name="pinFill" size={32} color={SPOTA.c.textMuted} />
                </div>
                <h3 style={{ margin: '0 0 6px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 18, color: SPOTA.c.text }}>Todavía no hay visitas pendientes</h3>
                <p style={{ margin: '0 0 16px', fontFamily: SPOTA.font.ui, fontSize: 14, color: SPOTA.c.textSoft, lineHeight: 1.5, maxWidth: 420, marginLeft: 'auto', marginRight: 'auto' }}>
                  Cuando encuentres un lugar, declará tu intención con <strong style={{ color: SPOTA.c.primary }}>"Quiero ir"</strong>. Validamos tu llegada en silencio.
                </p>
                <Btn variant="primary" icon="compass" onClick={() => nav('home')}>Ir a Descubrir</Btn>
              </div>
            )}
          </>
        )}

        {step === 2 && (
          <>
            <h2 style={{ margin: '0 0 8px', fontFamily: SPOTA.font.ui, fontSize: 26, fontWeight: 700, color: SPOTA.c.text, letterSpacing: -0.5 }}>¿Cómo lo viviste?</h2>
            <p style={{ margin: '0 0 24px', fontFamily: SPOTA.font.ui, fontSize: 14.5, color: SPOTA.c.textSoft }}>Tu reseña ayuda a otros como vos.</p>

            <div style={{ background: SPOTA.c.surface, borderRadius: 16, padding: 24, border: `1px solid ${SPOTA.c.lineSoft}`, marginBottom: 16, textAlign: 'center' }}>
              <p style={{ margin: '0 0 14px', fontFamily: SPOTA.font.ui, fontSize: 13.5, color: SPOTA.c.textSoft }}>Tu valoración</p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
                {[1, 2, 3, 4, 5].map(i => (
                  <button key={i} onClick={() => setScore(i)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 0 }}>
                    <Icon name={i <= score ? 'star' : 'starOutline'} size={42} color={i <= score ? SPOTA.c.accent : SPOTA.c.line} />
                  </button>
                ))}
              </div>
            </div>

            <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Contale a la comunidad qué te pareció..." style={{
              width: '100%', minHeight: 140, padding: 16, borderRadius: 14, boxSizing: 'border-box',
              border: `1.5px solid ${SPOTA.c.line}`, background: SPOTA.c.surface,
              fontFamily: SPOTA.font.ui, fontSize: 15, color: SPOTA.c.text, resize: 'vertical', outline: 'none',
            }} />

            <div style={{ display: 'flex', gap: 8, marginTop: 14, flexWrap: 'wrap' }}>
              {['Excelente café', 'Buena onda', 'Lindo lugar', 'Volvería', 'Pastelería rica', 'Wifi rápido', 'Para trabajar', 'Buena música', 'Atención amable', 'Buen precio'].map(t => {
                const on = chips.includes(t);
                return (
                  <button key={t} onClick={() => togChip(t)} style={{
                    padding: '8px 14px', borderRadius: 999, cursor: 'pointer',
                    background: on ? SPOTA.c.primary : SPOTA.c.surface,
                    color: on ? '#fff' : SPOTA.c.textSoft,
                    border: `1px solid ${on ? SPOTA.c.primary : SPOTA.c.line}`,
                    fontFamily: SPOTA.font.ui, fontSize: 13, fontWeight: on ? 600 : 500,
                    transition: 'background 150ms, color 150ms',
                  }}>{on ? '✓' : '+'} {t}</button>
                );
              })}
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h2 style={{ margin: '0 0 8px', fontFamily: SPOTA.font.ui, fontSize: 26, fontWeight: 700, color: SPOTA.c.text, letterSpacing: -0.5 }}>¿Quién la puede ver?</h2>
            <p style={{ margin: '0 0 24px', fontFamily: SPOTA.font.ui, fontSize: 14.5, color: SPOTA.c.textSoft }}>Podés cambiar esto después.</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
              {[
                { id: 'public', icon: 'globe', t: 'Pública', s: 'La comunidad de Spota la ve y suma a tu Fama Score.' },
                { id: 'private', icon: 'lock', t: 'Privada', s: 'Sólo vos la ves. Útil para tu propio registro.' },
              ].map(o => {
                const on = visibility === o.id;
                return (
                  <button key={o.id} onClick={() => setVisibility(o.id)} style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: 16, padding: 18, borderRadius: 14,
                    background: on ? SPOTA.c.primarySoft : SPOTA.c.surface,
                    border: `1.5px solid ${on ? SPOTA.c.primary : SPOTA.c.lineSoft}`,
                    cursor: 'pointer', textAlign: 'left',
                  }}>
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: SPOTA.c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon name={o.icon} size={22} color={SPOTA.c.primary} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 16, color: SPOTA.c.text }}>{o.t}</div>
                      <div style={{ fontFamily: SPOTA.font.ui, fontSize: 13.5, color: SPOTA.c.textSoft, marginTop: 2 }}>{o.s}</div>
                    </div>
                    {on && <Icon name="checkCircle" size={24} color={SPOTA.c.primary} />}
                  </button>
                );
              })}
            </div>

            {hasHost && (
              <div style={{ padding: 18, borderRadius: 14, background: SPOTA.c.bgAlt, border: `1px dashed ${SPOTA.c.line}` }}>
                <p style={{ margin: '0 0 12px', fontFamily: SPOTA.font.ui, fontSize: 14, fontWeight: 600, color: SPOTA.c.text }}>Calificá al host que te acompañó</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <Avatar name={selectedVisit.host.name} size={44} score={String(selectedVisit.host.fama)} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: SPOTA.font.ui, fontWeight: 600, fontSize: 14.5, color: SPOTA.c.text }}>{selectedVisit.host.name}</div>
                    <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
                      {[1, 2, 3, 4, 5].map(i => (
                        <button key={i} onClick={() => setHostRated(i)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 0 }}>
                          <Icon name={i <= hostRated ? 'star' : 'starOutline'} size={22} color={i <= hostRated ? SPOTA.c.accent : SPOTA.c.line} />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* Footer con CTA */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 32, gap: 10 }}>
          {step > 1 && <Btn variant="ghost" onClick={back}>Atrás</Btn>}
          <Btn variant="primary" size="lg" iconRight={step < total ? 'arrowRight' : 'check'} onClick={next}>
            {step < total ? 'Continuar' : 'Publicar'}
          </Btn>
        </div>
      </div>
    </section>
  );
};

Object.assign(window, { ScreenPublish });
