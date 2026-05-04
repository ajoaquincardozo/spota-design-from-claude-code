// CU-12, CU-13, CU-14 — Planificación grupal

// CU-12: Crear plan grupal
const ScreenCreatePlan = ({ nav }) => {
  const [step, setStep] = React.useState(1);
  const [planName, setPlanName] = React.useState('Cumple de Mica');
  const [collection, setCollection] = React.useState('c2');
  const [invited, setInvited] = React.useState(['Sol B.', 'Tomás R.', 'Mica L.']);
  const total = 3;
  const next = () => step < total ? setStep(step + 1) : nav('planVote', { id: 'newPlan' });
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: SPOTA.c.bg }}>
      <div style={{ padding: '12px 16px 4px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => step > 1 ? setStep(step - 1) : nav('plans')} style={{ width: 40, height: 40, borderRadius: 999, border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name={step > 1 ? 'arrowLeft' : 'close'} size={22} />
        </button>
        <div style={{ flex: 1, display: 'flex', gap: 4 }}>
          {[...Array(total)].map((_, i) => (
            <div key={i} style={{ flex: 1, height: 4, borderRadius: 999, background: i < step ? SPOTA.c.primary : SPOTA.c.line }} />
          ))}
        </div>
      </div>
      <div style={{ flex: 1, overflow: 'auto', padding: '16px 20px 100px' }}>
        {step === 1 && (
          <>
            <h1 style={{ margin: '0 0 8px', fontFamily: SPOTA.font.ui, fontSize: 24, fontWeight: 700, color: SPOTA.c.text, letterSpacing: -0.4 }}>Empezá desde una <span style={{ fontFamily: SPOTA.font.serif, fontStyle: 'italic', color: SPOTA.c.secondary, fontWeight: 400 }}>colección</span></h1>
            <p style={{ margin: '0 0 18px', fontFamily: SPOTA.font.ui, fontSize: 14, color: SPOTA.c.textSoft }}>Spota va a sugerir las mejores opciones del grupo a partir de los lugares que elijas.</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {COLLECTIONS.map(c => (
                <button key={c.id} onClick={() => setCollection(c.id)} style={{
                  padding: 0, border: `2px solid ${collection === c.id ? SPOTA.c.primary : SPOTA.c.lineSoft}`,
                  borderRadius: 14, background: SPOTA.c.surface, cursor: 'pointer', overflow: 'hidden', textAlign: 'left',
                }}>
                  <div style={{ height: 90, position: 'relative' }}>
                    <img src={photo(c.cover, 400, 300)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', top: 6, left: 6, fontSize: 20 }}>{c.emoji}</div>
                    {collection === c.id && <div style={{ position: 'absolute', top: 6, right: 6, width: 26, height: 26, borderRadius: 999, background: SPOTA.c.primary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="check" size={14} color="#fff" strokeWidth={3} /></div>}
                  </div>
                  <div style={{ padding: '10px 12px' }}>
                    <div style={{ fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 13.5, color: SPOTA.c.text }}>{c.name}</div>
                    <div style={{ fontFamily: SPOTA.font.ui, fontSize: 11.5, color: SPOTA.c.textSoft }}>{c.count} lugares</div>
                  </div>
                </button>
              ))}
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <h1 style={{ margin: '0 0 8px', fontFamily: SPOTA.font.ui, fontSize: 24, fontWeight: 700, color: SPOTA.c.text, letterSpacing: -0.4 }}>Ponele un nombre al plan</h1>
            <p style={{ margin: '0 0 18px', fontFamily: SPOTA.font.ui, fontSize: 14, color: SPOTA.c.textSoft }}>Algo que tu grupo entienda.</p>
            <Field label="Nombre del plan" value={planName} onChange={setPlanName} placeholder="Cumple de Mica, after del viernes..." icon="sparkles" />
            <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Field label="Fecha tentativa" value="Sáb 17 de mayo" onChange={() => {}} icon="calendar" />
              <Field label="Horario" value="20:30 hs" onChange={() => {}} icon="clock" />
            </div>
          </>
        )}
        {step === 3 && (
          <>
            <h1 style={{ margin: '0 0 8px', fontFamily: SPOTA.font.ui, fontSize: 24, fontWeight: 700, color: SPOTA.c.text, letterSpacing: -0.4 }}>Invitá a tu grupo</h1>
            <p style={{ margin: '0 0 18px', fontFamily: SPOTA.font.ui, fontSize: 14, color: SPOTA.c.textSoft }}>Spota va a cruzar las preferencias de todos para sugerir las mejores opciones.</p>
            <Field label="" placeholder="Buscar por nombre o email..." icon="search" value="" onChange={() => {}} />
            <div style={{ marginTop: 16, padding: 14, borderRadius: 14, background: SPOTA.c.primarySoft, border: `1px dashed ${SPOTA.c.primary}`, display: 'flex', alignItems: 'center', gap: 12 }}>
              <Icon name="share" size={20} color={SPOTA.c.primary} />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 13.5, color: SPOTA.c.primaryDark }}>Compartí un link de invitación</div>
                <div style={{ fontFamily: SPOTA.font.ui, fontSize: 12, color: SPOTA.c.primaryDark, opacity: 0.8 }}>spota.app/p/cumple-mica</div>
              </div>
              <Btn variant="primary" size="sm">Copiar</Btn>
            </div>
            <h3 style={{ margin: '20px 0 10px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 14, color: SPOTA.c.text }}>Ya invitados ({invited.length})</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {invited.map(n => (
                <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 10, background: SPOTA.c.surface, borderRadius: 12, border: `1px solid ${SPOTA.c.lineSoft}` }}>
                  <Avatar name={n} size={36} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: SPOTA.font.ui, fontWeight: 600, fontSize: 14, color: SPOTA.c.text }}>{n}</div>
                    <div style={{ fontFamily: SPOTA.font.ui, fontSize: 12, color: SPOTA.c.textSoft }}>Invitación enviada</div>
                  </div>
                  <Icon name="check" size={18} color={SPOTA.c.primary} strokeWidth={3} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <div style={{ padding: '12px 20px 16px', borderTop: `1px solid ${SPOTA.c.lineSoft}`, background: SPOTA.c.bg }}>
        <Btn variant="primary" size="lg" full iconRight="arrowRight" onClick={next}>
          {step < total ? 'Continuar' : 'Crear plan y empezar a votar'}
        </Btn>
      </div>
    </div>
  );
};

// CU-13: Votar opciones del plan grupal
const ScreenPlanVote = ({ nav, params }) => {
  const [votes, setVotes] = React.useState({ op1: true, op3: false });
  const [confirmed, setConfirmed] = React.useState(true);
  const togVote = (id) => setVotes(v => ({ ...v, [id]: !v[id] }));
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: SPOTA.c.bg }}>
      <AppHeader title="Cumple de Mica" leftIcon="arrowLeft" onLeft={() => nav('plans')} rightIcon="more" />
      <div style={{ flex: 1, overflow: 'auto', padding: '16px 20px 100px' }}>
        <div style={{ background: `linear-gradient(135deg, ${SPOTA.c.primary}, ${SPOTA.c.primaryDark})`, color: '#fff', borderRadius: 16, padding: 16, marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <Icon name="users" size={16} color="#fff" />
            <span style={{ fontFamily: SPOTA.font.ui, fontSize: 12.5, opacity: 0.9 }}>4 personas · Sáb 17 de mayo · 20:30</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: -10 }}>
            {['Sol B.', 'Tomás R.', 'Mica L.', 'Vos'].map((n, i) => (
              <div key={n} style={{ marginLeft: i === 0 ? 0 : -10, position: 'relative', zIndex: 4 - i }}>
                <Avatar name={n} size={36} />
              </div>
            ))}
            <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
              <div style={{ fontFamily: SPOTA.font.ui, fontSize: 12, opacity: 0.85 }}>Votación abre</div>
              <div style={{ fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 14 }}>2d 4hs</div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <Icon name="sparkles" size={16} color={SPOTA.c.accent} />
          <p style={{ margin: 0, fontFamily: SPOTA.font.ui, fontSize: 13, color: SPOTA.c.textSoft }}>Sugerencias para <strong style={{ color: SPOTA.c.text }}>tu grupo</strong> (afinidad cruzada)</p>
        </div>

        {PLAN_OPTIONS.map(o => {
          const voted = votes[o.id];
          const pct = Math.round((o.votes / 4) * 100);
          return (
            <div key={o.id} style={{
              background: SPOTA.c.surface, borderRadius: 16, padding: 12, marginBottom: 12,
              border: `1.5px solid ${voted ? SPOTA.c.primary : SPOTA.c.lineSoft}`,
              boxShadow: voted ? '0 4px 14px rgba(47,111,94,0.12)' : 'none',
            }}>
              <div style={{ display: 'flex', gap: 12 }}>
                <img src={photo(o.place.img, 200, 200)} style={{ width: 80, height: 80, borderRadius: 12, objectFit: 'cover' }} />
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: 0, fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 15.5, color: SPOTA.c.text }}>{o.place.name}</h3>
                  <p style={{ margin: '2px 0 6px', fontFamily: SPOTA.font.ui, fontSize: 12.5, color: SPOTA.c.textSoft }}>{o.place.cat} · {o.place.hood} · {o.place.price}</p>
                  <FamaScore score={o.place.score} count={o.place.reviews} variant="classic" />
                </div>
              </div>
              <div style={{ marginTop: 10, padding: 10, background: SPOTA.c.bgAlt, borderRadius: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <span style={{ fontFamily: SPOTA.font.ui, fontSize: 12, color: SPOTA.c.textSoft }}>{o.votes} de 4 votos</span>
                  <span style={{ fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 13, color: SPOTA.c.primary }}>{pct}%</span>
                </div>
                <div style={{ height: 6, borderRadius: 999, background: SPOTA.c.line, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: pct + '%', background: SPOTA.c.primary, transition: 'width 300ms' }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: -8, marginTop: 8 }}>
                  {o.voters.map((v, i) => (
                    <div key={v} style={{ marginLeft: i === 0 ? 0 : -8 }}>
                      <Avatar name={v} size={22} />
                    </div>
                  ))}
                </div>
              </div>
              <button onClick={() => togVote(o.id)} style={{
                width: '100%', marginTop: 10, height: 42, borderRadius: 10, cursor: 'pointer',
                background: voted ? SPOTA.c.primary : 'transparent',
                color: voted ? '#fff' : SPOTA.c.primary,
                border: `1.5px solid ${SPOTA.c.primary}`,
                fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 14,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              }}>
                <Icon name={voted ? 'checkCircle' : 'thumbsUp'} size={16} /> {voted ? 'Voto registrado' : 'Votar por este'}
              </button>
            </div>
          );
        })}

        <div style={{ marginTop: 18, padding: 14, borderRadius: 14, background: SPOTA.c.surface, border: `1px solid ${SPOTA.c.lineSoft}` }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 14, color: SPOTA.c.text }}>¿Vas a poder?</div>
              <div style={{ fontFamily: SPOTA.font.ui, fontSize: 12, color: SPOTA.c.textSoft }}>Confirmá tu asistencia</div>
            </div>
            <button onClick={() => setConfirmed(c => !c)} style={{
              width: 56, height: 30, borderRadius: 999, border: 'none', cursor: 'pointer',
              background: confirmed ? SPOTA.c.primary : SPOTA.c.line, position: 'relative', transition: 'background 200ms',
            }}>
              <div style={{ position: 'absolute', top: 3, left: confirmed ? 28 : 3, width: 24, height: 24, borderRadius: 999, background: '#fff', transition: 'left 200ms' }} />
            </button>
          </div>
        </div>

        <div style={{ marginTop: 14 }}>
          <Btn variant="secondary" full icon="check" onClick={() => nav('planClose')}>Cerrar votación (sos creadora)</Btn>
        </div>
      </div>
    </div>
  );
};

// CU-14: Cerrar plan grupal
const ScreenPlanClose = ({ nav }) => {
  const winner = PLAN_OPTIONS[0];
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: SPOTA.c.bg }}>
      <AppHeader title="Cerrar plan" leftIcon="arrowLeft" onLeft={() => nav('planVote')} />
      <div style={{ flex: 1, overflow: 'auto', padding: 20 }}>
        <div style={{ textAlign: 'center', marginBottom: 18 }}>
          <div style={{ width: 72, height: 72, borderRadius: 999, background: SPOTA.c.accentSoft, margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="sparkles" size={32} color={SPOTA.c.accent} />
          </div>
          <h1 style={{ margin: '0 0 4px', fontFamily: SPOTA.font.ui, fontSize: 22, fontWeight: 700, color: SPOTA.c.text, letterSpacing: -0.4 }}>
            ¡Ganó <span style={{ fontFamily: SPOTA.font.serif, fontStyle: 'italic', color: SPOTA.c.secondary, fontWeight: 400 }}>{winner.place.name}</span>!
          </h1>
          <p style={{ margin: 0, fontFamily: SPOTA.font.ui, fontSize: 14, color: SPOTA.c.textSoft }}>Con 4 de 4 votos del grupo.</p>
        </div>
        <div style={{ borderRadius: 16, overflow: 'hidden', background: SPOTA.c.surface, border: `1px solid ${SPOTA.c.lineSoft}`, marginBottom: 16 }}>
          <img src={photo(winner.place.img, 800, 400)} style={{ width: '100%', height: 160, objectFit: 'cover' }} />
          <div style={{ padding: 14 }}>
            <h2 style={{ margin: 0, fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 17, color: SPOTA.c.text }}>{winner.place.name}</h2>
            <p style={{ margin: '2px 0 8px', fontFamily: SPOTA.font.ui, fontSize: 13, color: SPOTA.c.textSoft }}>{winner.place.cat} · {winner.place.hood}</p>
            <FamaScore score={winner.place.score} count={winner.place.reviews} variant="classic" />
          </div>
        </div>
        <div style={{ background: SPOTA.c.surface, borderRadius: 14, padding: 14, marginBottom: 14, border: `1px solid ${SPOTA.c.lineSoft}` }}>
          <h3 style={{ margin: '0 0 12px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 14, color: SPOTA.c.text }}>Confirmá los detalles</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Field label="Fecha" value="Sábado 17 de mayo" onChange={() => {}} icon="calendar" />
            <Field label="Hora" value="20:30 hs" onChange={() => {}} icon="clock" />
          </div>
        </div>
        <div style={{ background: SPOTA.c.surface, borderRadius: 14, padding: 14, marginBottom: 18, border: `1px solid ${SPOTA.c.lineSoft}` }}>
          <h3 style={{ margin: '0 0 10px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 14, color: SPOTA.c.text }}>Confirman asistencia</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[{ n: 'Sol B.', s: 'Voy' }, { n: 'Tomás R.', s: 'Voy' }, { n: 'Mica L.', s: 'Voy' }, { n: 'Vos', s: 'Voy' }].map(p => (
              <div key={p.n} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Avatar name={p.n} size={28} />
                <span style={{ flex: 1, fontFamily: SPOTA.font.ui, fontSize: 13.5, color: SPOTA.c.text }}>{p.n}</span>
                <Tag kind="softG" icon="check">{p.s}</Tag>
              </div>
            ))}
          </div>
        </div>
        <Btn variant="primary" size="lg" full onClick={() => nav('plans')}>Confirmar y notificar al grupo</Btn>
      </div>
    </div>
  );
};

// Lista de planes (entrada al CU-13)
const ScreenPlans = ({ nav }) => {
  const plans = [
    { id: 'pl1', name: 'Cumple de Mica', date: 'Sáb 17 de mayo', members: 4, status: 'voting', cover: 'cocteles' },
    { id: 'pl2', name: 'Brunch del domingo', date: 'Dom 18 de mayo', members: 3, status: 'closed', cover: 'brunch', winner: 'Café Cobrand' },
    { id: 'pl3', name: 'After del viernes', date: 'Vie 23 de mayo', members: 6, status: 'voting', cover: 'cervezaArtesanal' },
  ];
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: SPOTA.c.bg }}>
      <div style={{ padding: '14px 20px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1 style={{ margin: 0, fontFamily: SPOTA.font.ui, fontSize: 22, fontWeight: 700, color: SPOTA.c.text, letterSpacing: -0.4 }}>
          Tus <span style={{ fontFamily: SPOTA.font.serif, fontStyle: 'italic', color: SPOTA.c.secondary, fontWeight: 400 }}>planes</span>
        </h1>
        <button onClick={() => nav('createPlan')} style={{ width: 40, height: 40, borderRadius: 999, border: 'none', background: SPOTA.c.primary, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="plus" size={22} color="#fff" />
        </button>
      </div>
      <div style={{ flex: 1, overflow: 'auto', padding: '12px 20px 24px' }}>
        {plans.map(p => (
          <div key={p.id} onClick={() => nav('planVote', { id: p.id })} style={{
            background: SPOTA.c.surface, borderRadius: 16, marginBottom: 12, overflow: 'hidden',
            border: `1px solid ${SPOTA.c.lineSoft}`, boxShadow: SPOTA.shadow.card, cursor: 'pointer',
          }}>
            <div style={{ display: 'flex', height: 96 }}>
              <img src={photo(p.cover, 200, 200)} style={{ width: 96, height: '100%', objectFit: 'cover' }} />
              <div style={{ flex: 1, padding: 12, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h3 style={{ margin: 0, fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 15, color: SPOTA.c.text }}>{p.name}</h3>
                    <p style={{ margin: '2px 0 0', fontFamily: SPOTA.font.ui, fontSize: 12.5, color: SPOTA.c.textSoft }}>{p.date}</p>
                  </div>
                  <Tag kind={p.status === 'voting' ? 'soft' : 'softG'} icon={p.status === 'voting' ? 'clock' : 'check'}>
                    {p.status === 'voting' ? 'Votando' : 'Confirmado'}
                  </Tag>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex' }}>
                    {[...Array(p.members)].slice(0, 4).map((_, i) => (
                      <div key={i} style={{ marginLeft: i === 0 ? 0 : -8 }}>
                        <Avatar name={p.name + i} size={24} />
                      </div>
                    ))}
                  </div>
                  {p.winner && <span style={{ fontFamily: SPOTA.font.ui, fontSize: 12, fontWeight: 600, color: SPOTA.c.primary }}>→ {p.winner}</span>}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

Object.assign(window, { ScreenCreatePlan, ScreenPlanVote, ScreenPlanClose, ScreenPlans });
