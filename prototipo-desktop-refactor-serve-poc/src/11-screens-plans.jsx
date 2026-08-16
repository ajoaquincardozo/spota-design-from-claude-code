// ========================================================================
// 11-screens-plans.jsx
// ========================================================================
// HostBlock — sub-máquina del host dentro del plan grupal (D10).
// Estados: 'sin' (default sin etiqueta) y 'con' (card visible). Sin cancelaciones.
const HostBlock = ({ state = 'sin', postEvent = false, onAdd, onRate }) => {
  if (state === 'sin') {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', gap: 14,
        padding: '14px 18px', borderRadius: 14,
        background: SPOTA.c.surface, border: `1px dashed ${SPOTA.c.line}`,
      }}>
        <div style={{ width: 44, height: 44, borderRadius: 999, background: SPOTA.c.bgAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Icon name="users" size={20} color={SPOTA.c.textSoft} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 14.5, color: SPOTA.c.text, lineHeight: 1.3 }}>¿Necesitan un host?</div>
          <p style={{ margin: '2px 0 0', fontFamily: SPOTA.font.ui, fontSize: 13, color: SPOTA.c.textSoft, lineHeight: 1.45 }}>
            Alguien que arme la experiencia y se ocupe de la logística.
          </p>
        </div>
        <Btn variant="outline" onClick={onAdd}>Sumar host</Btn>
      </div>
    );
  }
  return (
    <div style={{
      padding: 16, borderRadius: 14,
      background: SPOTA.c.surface, border: `1px solid ${SPOTA.c.lineSoft}`,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
        <Icon name="users" size={14} color={SPOTA.c.primary} />
        <span style={{ fontFamily: SPOTA.font.ui, fontSize: 11.5, fontWeight: 700, color: SPOTA.c.primary, textTransform: 'uppercase', letterSpacing: 0.5 }}>Host del plan</span>
      </div>
      <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
        <Avatar name="Federico M." size={56} score="92" />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 15.5, color: SPOTA.c.text }}>
            Federico M. <span style={{ fontWeight: 500, color: SPOTA.c.textSoft, fontSize: 13 }}>· Fama 92</span>
          </div>
          <p style={{ margin: '4px 0 0', fontFamily: SPOTA.font.ui, fontSize: 13.5, color: SPOTA.c.textSoft, lineHeight: 1.45 }}>
            Tour de cafés de especialidad por Palermo · 3 hs
          </p>
        </div>
        <span style={{ fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 16, color: SPOTA.c.text, whiteSpace: 'nowrap' }}>$12.500</span>
      </div>
      {postEvent && (
        <button onClick={onRate} style={{
          marginTop: 14, width: '100%', padding: '10px 14px', borderRadius: 12,
          background: SPOTA.c.accentSoft, border: 'none', cursor: 'pointer',
          fontFamily: SPOTA.font.ui, fontWeight: 600, fontSize: 14, color: '#7A5A12',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}>
          <Icon name="star" size={16} color={SPOTA.c.accent} /> Calificar al host
        </button>
      )}
    </div>
  );
};

// Lista de planes — entrada al flujo
const ScreenPlans = ({ nav }) => {
  const plans = [
    { id: 'pl1', name: 'Cumple de Mica', date: 'Sáb 17 de mayo', members: 4, status: 'voting', cover: 'cocteles' },
    { id: 'pl2', name: 'Brunch del domingo', date: 'Dom 18 de mayo', members: 3, status: 'closed', cover: 'brunch', winner: 'Café Cobrand' },
    { id: 'pl3', name: 'After del viernes', date: 'Vie 23 de mayo', members: 6, status: 'voting', cover: 'cervezaArtesanal' },
  ];
  return (
    <section>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24, gap: 16 }}>
        <div>
          <h1 style={{ margin: 0, fontFamily: SPOTA.font.ui, fontSize: 32, fontWeight: 700, color: SPOTA.c.text, letterSpacing: -0.6 }}>
            Tus <span style={{ fontFamily: SPOTA.font.serif, fontStyle: 'italic', color: SPOTA.c.secondary, fontWeight: 400 }}>planes</span>
          </h1>
          <p style={{ margin: '6px 0 0', fontFamily: SPOTA.font.ui, fontSize: 14, color: SPOTA.c.textSoft }}>
            Coordinación grupal de salidas. Spota cruza preferencias y sugiere las mejores opciones.
          </p>
        </div>
        <Btn variant="primary" icon="plus" onClick={() => nav('createPlan')}>Crear plan</Btn>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
        {plans.map(p => (
          <div key={p.id} onClick={() => nav('planVote', { id: p.id })} style={{
            background: SPOTA.c.surface, borderRadius: SPOTA.radius.lg, overflow: 'hidden',
            border: `1px solid ${SPOTA.c.lineSoft}`, boxShadow: SPOTA.shadow.card, cursor: 'pointer',
          }}>
            <div style={{ position: 'relative', height: 140 }}>
              <img src={photo(p.cover, 600, 400)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 50%, rgba(20,15,12,0.55) 100%)' }} />
              <div style={{ position: 'absolute', top: 12, right: 12 }}>
                <Tag kind={p.status === 'voting' ? 'soft' : 'softG'} icon={p.status === 'voting' ? 'clock' : 'check'}>
                  {p.status === 'voting' ? 'Votando' : 'Confirmado'}
                </Tag>
              </div>
            </div>
            <div style={{ padding: 16 }}>
              <h3 style={{ margin: '0 0 4px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 16, color: SPOTA.c.text }}>{p.name}</h3>
              <p style={{ margin: '0 0 12px', fontFamily: SPOTA.font.ui, fontSize: 13, color: SPOTA.c.textSoft }}>{p.date}</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex' }}>
                  {[...Array(p.members)].slice(0, 4).map((_, i) => (
                    <div key={i} style={{ marginLeft: i === 0 ? 0 : -8 }}>
                      <Avatar name={p.name + i} size={26} />
                    </div>
                  ))}
                </div>
                {p.winner && <span style={{ fontFamily: SPOTA.font.ui, fontSize: 12.5, fontWeight: 600, color: SPOTA.c.primary }}>→ {p.winner}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// Wizard crear plan — 3 pasos
const ScreenCreatePlan = ({ nav }) => {
  const [step, setStep] = React.useState(1);
  const [planName, setPlanName] = React.useState('Cumple de Mica');
  const [collection, setCollection] = React.useState('c2');
  const [invited, setInvited] = React.useState(['Sol B.', 'Tomás R.', 'Mica L.']);
  const total = 3;
  const next = () => step < total ? setStep(step + 1) : nav('planVote', { id: 'newPlan' });
  const back = () => step > 1 ? setStep(step - 1) : nav('plans');

  return (
    <section>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
        <button onClick={back} style={{ width: 40, height: 40, borderRadius: 999, border: `1px solid ${SPOTA.c.line}`, background: SPOTA.c.surface, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name={step > 1 ? 'arrowLeft' : 'close'} size={18} />
        </button>
        <div style={{ flex: 1 }}>
          <p style={{ margin: 0, fontFamily: SPOTA.font.ui, fontSize: 12.5, fontWeight: 700, color: SPOTA.c.primary, letterSpacing: 0.4, textTransform: 'uppercase' }}>Crear plan grupal</p>
          <h1 style={{ margin: '2px 0 0', fontFamily: SPOTA.font.ui, fontSize: 22, fontWeight: 700, color: SPOTA.c.text, letterSpacing: -0.4 }}>
            Paso {step} de {total}
          </h1>
        </div>
      </div>

      <Stepper steps={['Colección', 'Detalles', 'Invitados']} current={step} />

      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        {step === 1 && (
          <>
            <h2 style={{ margin: '0 0 8px', fontFamily: SPOTA.font.ui, fontSize: 26, fontWeight: 700, color: SPOTA.c.text, letterSpacing: -0.5 }}>
              Empezá desde una <span style={{ fontFamily: SPOTA.font.serif, fontStyle: 'italic', color: SPOTA.c.secondary, fontWeight: 400 }}>colección</span>
            </h2>
            <p style={{ margin: '0 0 24px', fontFamily: SPOTA.font.ui, fontSize: 14.5, color: SPOTA.c.textSoft }}>
              Spota va a sugerir las mejores opciones del grupo a partir de los lugares que elijas.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
              {COLLECTIONS.slice(0, 4).map(c => {
                const on = collection === c.id;
                return (
                  <button key={c.id} onClick={() => setCollection(c.id)} style={{
                    padding: 0, border: `2px solid ${on ? SPOTA.c.primary : SPOTA.c.lineSoft}`,
                    borderRadius: 14, background: SPOTA.c.surface, cursor: 'pointer', overflow: 'hidden', textAlign: 'left',
                  }}>
                    <div style={{ height: 110, position: 'relative' }}>
                      <img src={photo(c.cover, 400, 300)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <div style={{ position: 'absolute', top: 8, left: 8, width: 32, height: 32, borderRadius: 10, background: SPOTA.c.surface, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon name={c.themeIcon} size={16} color={SPOTA.c.secondary} />
                      </div>
                      {on && <div style={{ position: 'absolute', top: 8, right: 8, width: 28, height: 28, borderRadius: 999, background: SPOTA.c.primary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="check" size={14} color="#fff" strokeWidth={3} /></div>}
                    </div>
                    <div style={{ padding: 12 }}>
                      <div style={{ fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 14.5, color: SPOTA.c.text }}>{c.name}</div>
                      <div style={{ fontFamily: SPOTA.font.ui, fontSize: 12.5, color: SPOTA.c.textSoft }}>{c.count} lugares</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h2 style={{ margin: '0 0 8px', fontFamily: SPOTA.font.ui, fontSize: 26, fontWeight: 700, color: SPOTA.c.text, letterSpacing: -0.5 }}>Ponele un nombre al plan</h2>
            <p style={{ margin: '0 0 24px', fontFamily: SPOTA.font.ui, fontSize: 14.5, color: SPOTA.c.textSoft }}>Algo que tu grupo entienda.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { label: 'Nombre del plan', val: planName, set: setPlanName, icon: 'sparkles' },
                { label: 'Fecha tentativa', val: 'Sáb 17 de mayo', set: () => {}, icon: 'calendar' },
                { label: 'Horario', val: '20:30 hs', set: () => {}, icon: 'clock' },
              ].map(f => (
                <div key={f.label}>
                  <label style={{ display: 'block', marginBottom: 6, fontFamily: SPOTA.font.ui, fontSize: 13, fontWeight: 600, color: SPOTA.c.textSoft }}>{f.label}</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 14px', height: 48, borderRadius: 12, background: SPOTA.c.surface, border: `1.5px solid ${SPOTA.c.line}` }}>
                    <Icon name={f.icon} size={18} color={SPOTA.c.textSoft} />
                    <input value={f.val} onChange={(e) => f.set(e.target.value)} style={{
                      flex: 1, border: 'none', background: 'transparent', outline: 'none',
                      fontFamily: SPOTA.font.ui, fontSize: 15, color: SPOTA.c.text,
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h2 style={{ margin: '0 0 8px', fontFamily: SPOTA.font.ui, fontSize: 26, fontWeight: 700, color: SPOTA.c.text, letterSpacing: -0.5 }}>Invitá a tu grupo</h2>
            <p style={{ margin: '0 0 20px', fontFamily: SPOTA.font.ui, fontSize: 14.5, color: SPOTA.c.textSoft }}>
              Spota va a cruzar las preferencias de todos para sugerir las mejores opciones.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 14px', height: 48, borderRadius: 12, background: SPOTA.c.surface, border: `1.5px solid ${SPOTA.c.line}`, marginBottom: 16 }}>
              <Icon name="search" size={18} color={SPOTA.c.textSoft} />
              <input placeholder="Buscar por nombre o email..." style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontFamily: SPOTA.font.ui, fontSize: 15, color: SPOTA.c.text }} />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 16, borderRadius: 14, background: SPOTA.c.primarySoft, border: `1px dashed ${SPOTA.c.primary}`, marginBottom: 20 }}>
              <Icon name="share" size={20} color={SPOTA.c.primary} />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 14, color: SPOTA.c.primaryDark }}>Compartí un link de invitación</div>
                <div style={{ fontFamily: SPOTA.font.ui, fontSize: 12.5, color: SPOTA.c.primaryDark, opacity: 0.85 }}>spota.app/p/cumple-mica</div>
              </div>
              <Btn variant="primary" size="sm">Copiar</Btn>
            </div>

            <h3 style={{ margin: '0 0 12px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 14.5, color: SPOTA.c.text }}>Ya invitados ({invited.length})</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
              {invited.map(n => (
                <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, background: SPOTA.c.surface, borderRadius: 12, border: `1px solid ${SPOTA.c.lineSoft}` }}>
                  <Avatar name={n} size={36} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: SPOTA.font.ui, fontWeight: 600, fontSize: 14, color: SPOTA.c.text }}>{n}</div>
                    <div style={{ fontFamily: SPOTA.font.ui, fontSize: 12, color: SPOTA.c.textSoft }}>Invitación enviada</div>
                  </div>
                  <Icon name="check" size={18} color={SPOTA.c.primary} strokeWidth={3} />
                </div>
              ))}
            </div>

            <HostBlock state="sin" onAdd={() => nav('hostMarketplace')} />
          </>
        )}

        {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 32, gap: 10 }}>
          {step > 1 && <Btn variant="ghost" onClick={back}>Atrás</Btn>}
          <Btn variant="primary" size="lg" iconRight="arrowRight" onClick={next}>
            {step < total ? 'Continuar' : 'Crear plan y empezar a votar'}
          </Btn>
        </div>
      </div>
    </section>
  );
};

// Tablero de votación — 3 columnas: info plan + opciones + asistencia/host
const ScreenPlanVote = ({ nav, params }) => {
  const [votes, setVotes] = React.useState({ op1: true, op3: false });
  const [confirmed, setConfirmed] = React.useState(true);
  const togVote = (id) => setVotes(v => ({ ...v, [id]: !v[id] }));

  return (
    <section>
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, fontFamily: SPOTA.font.ui, fontSize: 13, color: SPOTA.c.textSoft }}>
        <button onClick={() => nav('plans')} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: SPOTA.c.textSoft, fontFamily: SPOTA.font.ui, fontSize: 13, padding: 0, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
          <Icon name="arrowLeft" size={14} /> Planes
        </button>
        <span style={{ color: SPOTA.c.textMuted }}>/</span>
        <span style={{ color: SPOTA.c.text, fontWeight: 600 }}>Cumple de Mica</span>
      </div>

      {/* Hero del plan */}
      <div style={{ background: `linear-gradient(135deg, ${SPOTA.c.primary}, ${SPOTA.c.primaryDark})`, color: '#fff', borderRadius: 18, padding: 24, marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
          <div>
            <p style={{ margin: 0, fontFamily: SPOTA.font.ui, fontSize: 12.5, opacity: 0.85, textTransform: 'uppercase', letterSpacing: 0.4 }}>Plan grupal · Votación abierta</p>
            <h1 style={{ margin: '4px 0 0', fontFamily: SPOTA.font.ui, fontSize: 28, fontWeight: 700, letterSpacing: -0.5 }}>Cumple de Mica</h1>
            <p style={{ margin: '6px 0 0', fontFamily: SPOTA.font.ui, fontSize: 14, opacity: 0.9 }}>Sáb 17 de mayo · 20:30 · 4 personas</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ margin: 0, fontFamily: SPOTA.font.ui, fontSize: 12.5, opacity: 0.85 }}>Votación cierra</p>
            <p style={{ margin: '2px 0 0', fontFamily: SPOTA.font.ui, fontSize: 18, fontWeight: 700 }}>2d 4hs</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 0, marginTop: 14 }}>
          {['Sol B.', 'Tomás R.', 'Mica L.', 'Vos'].map((n, i) => (
            <div key={n} style={{ marginLeft: i === 0 ? 0 : -10, position: 'relative', zIndex: 4 - i }}>
              <Avatar name={n} size={36} />
            </div>
          ))}
        </div>
      </div>

      {/* Layout 2 columnas: opciones + lateral */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: 28, alignItems: 'start' }}>
        {/* Columna izquierda: opciones */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <Icon name="sparkles" size={16} color={SPOTA.c.accent} />
            <p style={{ margin: 0, fontFamily: SPOTA.font.ui, fontSize: 14, color: SPOTA.c.textSoft }}>
              Sugerencias para <strong style={{ color: SPOTA.c.text }}>tu grupo</strong> (afinidad cruzada)
            </p>
          </div>

          {PLAN_OPTIONS.map(o => {
            const voted = votes[o.id];
            const pct = Math.round((o.votes / 4) * 100);
            return (
              <div key={o.id} style={{
                background: SPOTA.c.surface, borderRadius: 16, padding: 16, marginBottom: 14,
                border: `1.5px solid ${voted ? SPOTA.c.primary : SPOTA.c.lineSoft}`,
                boxShadow: voted ? '0 4px 14px rgba(47,111,94,0.12)' : SPOTA.shadow.card,
              }}>
                <div style={{ display: 'flex', gap: 14 }}>
                  <img src={photo(o.place.img, 200, 200)} style={{ width: 96, height: 96, borderRadius: 12, objectFit: 'cover' }} />
                  <div style={{ flex: 1 }}>
                    <h3 style={{ margin: 0, fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 17, color: SPOTA.c.text }}>{o.place.name}</h3>
                    <p style={{ margin: '2px 0 8px', fontFamily: SPOTA.font.ui, fontSize: 13, color: SPOTA.c.textSoft }}>{o.place.cat} · {o.place.hood} · {o.place.price}</p>
                    <FamaScore score={o.place.score} count={o.place.reviews} />
                  </div>
                  <button onClick={() => togVote(o.id)} style={{
                    alignSelf: 'flex-start', padding: '10px 18px', borderRadius: 10, cursor: 'pointer',
                    background: voted ? SPOTA.c.primary : 'transparent',
                    color: voted ? '#fff' : SPOTA.c.primary,
                    border: `1.5px solid ${SPOTA.c.primary}`,
                    fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 13.5,
                    display: 'inline-flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap',
                  }}>
                    <Icon name={voted ? 'checkCircle' : 'thumbsUp'} size={16} /> {voted ? 'Voto registrado' : 'Votar'}
                  </button>
                </div>
                <div style={{ marginTop: 14, padding: 12, background: SPOTA.c.bgAlt, borderRadius: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <span style={{ fontFamily: SPOTA.font.ui, fontSize: 12.5, color: SPOTA.c.textSoft }}>{o.votes} de 4 votos</span>
                    <span style={{ fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 13, color: SPOTA.c.primary }}>{pct}%</span>
                  </div>
                  <div style={{ height: 6, borderRadius: 999, background: SPOTA.c.line, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: pct + '%', background: SPOTA.c.primary, transition: 'width 300ms' }} />
                  </div>
                  <div style={{ display: 'flex', marginTop: 10 }}>
                    {o.voters.map((v, i) => (
                      <div key={v} style={{ marginLeft: i === 0 ? 0 : -8 }}>
                        <Avatar name={v} size={24} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Columna derecha: asistencia + host + cierre */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: 14, position: 'sticky', top: 96 }}>
          <div style={{ padding: 16, borderRadius: 14, background: SPOTA.c.surface, border: `1px solid ${SPOTA.c.lineSoft}` }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 15, color: SPOTA.c.text }}>¿Vas a poder?</div>
                <div style={{ fontFamily: SPOTA.font.ui, fontSize: 12.5, color: SPOTA.c.textSoft }}>Confirmá tu asistencia</div>
              </div>
              <button onClick={() => setConfirmed(c => !c)} style={{
                width: 56, height: 30, borderRadius: 999, border: 'none', cursor: 'pointer',
                background: confirmed ? SPOTA.c.primary : SPOTA.c.line, position: 'relative', transition: 'background 200ms',
              }}>
                <div style={{ position: 'absolute', top: 3, left: confirmed ? 28 : 3, width: 24, height: 24, borderRadius: 999, background: '#fff', transition: 'left 200ms' }} />
              </button>
            </div>
          </div>

          <HostBlock state="sin" onAdd={() => nav('hostMarketplace')} />

          <Btn variant="secondary" full size="lg" icon="check" onClick={() => nav('planClose')}>Cerrar votación</Btn>
        </aside>
      </div>
    </section>
  );
};

// Cierre del plan — confirmación con plan resuelto + Con host como demo
const ScreenPlanClose = ({ nav }) => {
  const winner = PLAN_OPTIONS[0];
  // CU-005-003 §3.3 paso 4-5: el creador confirma fecha y hora antes de notificar al grupo.
  const [planDate, setPlanDate] = React.useState('Sábado 17 de mayo');
  const [planTime, setPlanTime] = React.useState('20:30');
  const [editing, setEditing] = React.useState(false);
  const participants = [
    { name: 'Sol B.', confirmed: true },
    { name: 'Tomás R.', confirmed: true },
    { name: 'Mica L.', confirmed: true },
    { name: 'Vos', confirmed: true },
  ];
  // P3-42: feedback de notificación antes de volver al listado de planes.
  const [toast, setToast] = React.useState(null);
  const confirmClose = () => {
    setToast('Plan confirmado · grupo notificado');
    window.setTimeout(() => nav('plans'), 1100);
  };
  return (
    <section style={{ position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, fontFamily: SPOTA.font.ui, fontSize: 13, color: SPOTA.c.textSoft }}>
        <button onClick={() => nav('planVote')} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: SPOTA.c.textSoft, fontFamily: SPOTA.font.ui, fontSize: 13, padding: 0, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
          <Icon name="arrowLeft" size={14} /> Cumple de Mica
        </button>
        <span style={{ color: SPOTA.c.textMuted }}>/</span>
        <span style={{ color: SPOTA.c.text, fontWeight: 600 }}>Cerrar plan</span>
      </div>

      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ width: 80, height: 80, borderRadius: 999, background: SPOTA.c.accentSoft, margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="sparkles" size={36} color={SPOTA.c.accent} />
          </div>
          <h1 style={{ margin: '0 0 6px', fontFamily: SPOTA.font.ui, fontSize: 28, fontWeight: 700, color: SPOTA.c.text, letterSpacing: -0.5 }}>
            ¡Ganó <span style={{ fontFamily: SPOTA.font.serif, fontStyle: 'italic', color: SPOTA.c.secondary, fontWeight: 400 }}>{winner.place.name}</span>!
          </h1>
          <p style={{ margin: 0, fontFamily: SPOTA.font.ui, fontSize: 14.5, color: SPOTA.c.textSoft }}>Con 4 de 4 votos del grupo.</p>
        </div>

        <div style={{ borderRadius: 16, overflow: 'hidden', background: SPOTA.c.surface, border: `1px solid ${SPOTA.c.lineSoft}`, marginBottom: 18 }}>
          <img src={photo(winner.place.img, 800, 400)} style={{ width: '100%', height: 200, objectFit: 'cover' }} />
          <div style={{ padding: 18 }}>
            <h2 style={{ margin: 0, fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 19, color: SPOTA.c.text }}>{winner.place.name}</h2>
            <p style={{ margin: '4px 0 10px', fontFamily: SPOTA.font.ui, fontSize: 13.5, color: SPOTA.c.textSoft }}>{winner.place.cat} · {winner.place.hood}</p>
            <FamaScore score={winner.place.score} count={winner.place.reviews} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 16 }}>
          <div style={{ background: SPOTA.c.surface, borderRadius: 14, padding: 16, border: `1px solid ${SPOTA.c.lineSoft}` }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <h3 style={{ margin: 0, fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 14, color: SPOTA.c.text }}>Detalles</h3>
              <button onClick={() => setEditing(e => !e)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, fontFamily: SPOTA.font.ui, fontSize: 12.5, color: SPOTA.c.primary, fontWeight: 600 }}>
                {editing ? 'Listo' : 'Editar'}
              </button>
            </div>
            {editing ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label style={{ display: 'flex', flexDirection: 'column', gap: 4, fontFamily: SPOTA.font.ui, fontSize: 12, color: SPOTA.c.textSoft, fontWeight: 600 }}>
                  Fecha
                  <input type="text" value={planDate} onChange={e => setPlanDate(e.target.value)} placeholder="Sábado 17 de mayo"
                    style={{ padding: '8px 10px', borderRadius: 8, border: `1px solid ${SPOTA.c.line}`, fontFamily: SPOTA.font.ui, fontSize: 13.5, color: SPOTA.c.text, background: SPOTA.c.bg }} />
                </label>
                <label style={{ display: 'flex', flexDirection: 'column', gap: 4, fontFamily: SPOTA.font.ui, fontSize: 12, color: SPOTA.c.textSoft, fontWeight: 600 }}>
                  Hora
                  <input type="text" value={planTime} onChange={e => setPlanTime(e.target.value)} placeholder="20:30"
                    style={{ padding: '8px 10px', borderRadius: 8, border: `1px solid ${SPOTA.c.line}`, fontFamily: SPOTA.font.ui, fontSize: 13.5, color: SPOTA.c.text, background: SPOTA.c.bg }} />
                </label>
              </div>
            ) : (
              <>
                <p style={{ margin: '0 0 4px', fontFamily: SPOTA.font.ui, fontSize: 13.5, color: SPOTA.c.text }}>📅 {planDate}</p>
                <p style={{ margin: 0, fontFamily: SPOTA.font.ui, fontSize: 13.5, color: SPOTA.c.text }}>🕐 {planTime} hs</p>
              </>
            )}
          </div>
          <div style={{ background: SPOTA.c.surface, borderRadius: 14, padding: 16, border: `1px solid ${SPOTA.c.lineSoft}` }}>
            <h3 style={{ margin: '0 0 10px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 14, color: SPOTA.c.text }}>Confirman asistencia</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {participants.map(p => (
                <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Avatar name={p.name} size={28} />
                  <span style={{ flex: 1, fontFamily: SPOTA.font.ui, fontSize: 13.5, color: SPOTA.c.text }}>{p.name}</span>
                  <Icon name="checkCircle" size={16} color={SPOTA.c.primary} />
                </div>
              ))}
            </div>
            <p style={{ margin: '10px 0 0', fontFamily: SPOTA.font.ui, fontSize: 12.5, color: SPOTA.c.textSoft }}>{participants.filter(p => p.confirmed).length} de {participants.length} personas</p>
          </div>
        </div>

        {/* HostBlock en estado Con host (demo) */}
        <div style={{ marginBottom: 24 }}>
          <HostBlock state="con" />
        </div>

        <Btn variant="primary" size="lg" full onClick={confirmClose}>Confirmar y notificar al grupo</Btn>
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

Object.assign(window, { HostBlock, ScreenPlans, ScreenCreatePlan, ScreenPlanVote, ScreenPlanClose });
