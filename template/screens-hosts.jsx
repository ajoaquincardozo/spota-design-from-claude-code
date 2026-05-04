// CU-15 a CU-18 — Marketplace de Hosts

// CU-15: Publicar Oferta de Viaje
const ScreenCreateOffer = ({ nav }) => {
  const [step, setStep] = React.useState(1);
  const [budget, setBudget] = React.useState(8000);
  const [people, setPeople] = React.useState(2);
  const [type, setType] = React.useState('Cafés de especialidad');
  const total = 3;
  const next = () => step < total ? setStep(step + 1) : nav('hostMarketplace');
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: SPOTA.c.bg }}>
      <div style={{ padding: '12px 16px 4px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => step > 1 ? setStep(step - 1) : nav('hostMarketplace')} style={{ width: 40, height: 40, borderRadius: 999, border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name={step > 1 ? 'arrowLeft' : 'close'} size={22} /></button>
        <div style={{ flex: 1, display: 'flex', gap: 4 }}>
          {[...Array(total)].map((_, i) => <div key={i} style={{ flex: 1, height: 4, borderRadius: 999, background: i < step ? SPOTA.c.primary : SPOTA.c.line }} />)}
        </div>
      </div>
      <div style={{ flex: 1, overflow: 'auto', padding: '16px 20px 100px' }}>
        {step === 1 && (
          <>
            <h1 style={{ margin: '0 0 8px', fontFamily: SPOTA.font.ui, fontSize: 24, fontWeight: 700, color: SPOTA.c.text, letterSpacing: -0.4 }}>¿Qué <span style={{ fontFamily: SPOTA.font.serif, fontStyle: 'italic', color: SPOTA.c.secondary, fontWeight: 400 }}>experiencia</span> buscás?</h1>
            <p style={{ margin: '0 0 18px', fontFamily: SPOTA.font.ui, fontSize: 14, color: SPOTA.c.textSoft }}>Contale a los hosts qué te gustaría vivir.</p>
            <Field label="Tipo de experiencia" value={type} onChange={setType} icon="sparkles" />
            <div style={{ height: 12 }} />
            <textarea placeholder="Quiero recorrer cafés de especialidad por Palermo y Villa Crespo, somos dos personas, nos gusta charlar con baristas..." style={{ width: '100%', minHeight: 110, padding: 14, borderRadius: 14, boxSizing: 'border-box', border: `1.5px solid ${SPOTA.c.line}`, background: SPOTA.c.surface, fontFamily: SPOTA.font.ui, fontSize: 14, color: SPOTA.c.text, outline: 'none', resize: 'vertical' }} defaultValue="Quiero recorrer cafés de especialidad por Palermo y Villa Crespo. Nos gusta charlar con baristas y conocer la historia de cada lugar." />
          </>
        )}
        {step === 2 && (
          <>
            <h1 style={{ margin: '0 0 8px', fontFamily: SPOTA.font.ui, fontSize: 24, fontWeight: 700, color: SPOTA.c.text, letterSpacing: -0.4 }}>¿Cuándo y con quién?</h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 14 }}>
              <Field label="Fecha" value="Sábado 17 de mayo" onChange={() => {}} icon="calendar" />
              <Field label="Horario" value="14:00 - 18:00 hs" onChange={() => {}} icon="clock" />
              <Field label="Zona" value="Palermo, Villa Crespo" onChange={() => {}} icon="pin" />
              <div style={{ background: SPOTA.c.surface, borderRadius: 12, padding: 14, border: `1.5px solid ${SPOTA.c.line}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <span style={{ fontFamily: SPOTA.font.ui, fontWeight: 600, fontSize: 13, color: SPOTA.c.text }}>Cantidad de personas</span>
                  <span style={{ fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 16, color: SPOTA.c.primary }}>{people}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <button onClick={() => setPeople(Math.max(1, people - 1))} style={{ width: 36, height: 36, borderRadius: 999, border: `1.5px solid ${SPOTA.c.line}`, background: SPOTA.c.bg, cursor: 'pointer', fontSize: 18 }}>−</button>
                  <input type="range" min="1" max="10" value={people} onChange={(e) => setPeople(+e.target.value)} style={{ flex: 1, accentColor: SPOTA.c.primary }} />
                  <button onClick={() => setPeople(Math.min(10, people + 1))} style={{ width: 36, height: 36, borderRadius: 999, border: `1.5px solid ${SPOTA.c.line}`, background: SPOTA.c.bg, cursor: 'pointer', fontSize: 18 }}>+</button>
                </div>
              </div>
            </div>
          </>
        )}
        {step === 3 && (
          <>
            <h1 style={{ margin: '0 0 8px', fontFamily: SPOTA.font.ui, fontSize: 24, fontWeight: 700, color: SPOTA.c.text, letterSpacing: -0.4 }}>¿Cuánto querés gastar?</h1>
            <p style={{ margin: '0 0 18px', fontFamily: SPOTA.font.ui, fontSize: 14, color: SPOTA.c.textSoft }}>Es un presupuesto orientativo. Los hosts ajustarán su propuesta.</p>
            <div style={{ background: SPOTA.c.surface, borderRadius: 14, padding: 18, border: `1px solid ${SPOTA.c.lineSoft}`, textAlign: 'center' }}>
              <p style={{ margin: '0 0 6px', fontFamily: SPOTA.font.ui, fontSize: 12.5, color: SPOTA.c.textSoft }}>Presupuesto por persona</p>
              <h2 style={{ margin: '0 0 12px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 36, color: SPOTA.c.primary }}>${budget.toLocaleString('es-AR')}</h2>
              <input type="range" min="3000" max="25000" step="500" value={budget} onChange={(e) => setBudget(+e.target.value)} style={{ width: '100%', accentColor: SPOTA.c.primary }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                <span style={{ fontFamily: SPOTA.font.ui, fontSize: 11, color: SPOTA.c.textMuted }}>$3.000</span>
                <span style={{ fontFamily: SPOTA.font.ui, fontSize: 11, color: SPOTA.c.textMuted }}>$25.000</span>
              </div>
            </div>
            <p style={{ margin: '14px 0 0', fontFamily: SPOTA.font.ui, fontSize: 12, color: SPOTA.c.textSoft, textAlign: 'center', lineHeight: 1.5 }}>Spota cobra una comisión del 12%. La plata queda en custodia hasta que termine la experiencia.</p>
          </>
        )}
      </div>
      <div style={{ padding: '12px 20px 16px', borderTop: `1px solid ${SPOTA.c.lineSoft}`, background: SPOTA.c.bg }}>
        <Btn variant="primary" size="lg" full iconRight="arrowRight" onClick={next}>{step < total ? 'Continuar' : 'Publicar oferta'}</Btn>
      </div>
    </div>
  );
};

// CU-16: Contratar Host (lista de postulaciones)
const ScreenHireHost = ({ nav }) => {
  const [selected, setSelected] = React.useState(null);
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: SPOTA.c.bg }}>
      <AppHeader title="Postulaciones recibidas" leftIcon="arrowLeft" onLeft={() => nav('hostMarketplace')} />
      <div style={{ padding: '12px 20px 0' }}>
        <div style={{ background: SPOTA.c.primarySoft, borderRadius: 12, padding: 12, display: 'flex', gap: 10, alignItems: 'center' }}>
          <Icon name="sparkles" size={18} color={SPOTA.c.primary} />
          <p style={{ margin: 0, fontFamily: SPOTA.font.ui, fontSize: 12.5, color: SPOTA.c.primaryDark }}>
            <strong>{HOSTS.length} hosts</strong> se postularon a tu oferta "Cafés de especialidad"
          </p>
        </div>
      </div>
      <div style={{ flex: 1, overflow: 'auto', padding: 20 }}>
        {HOSTS.map(h => (
          <div key={h.id} style={{ background: SPOTA.c.surface, borderRadius: 16, padding: 14, marginBottom: 12, border: `1.5px solid ${selected === h.id ? SPOTA.c.primary : SPOTA.c.lineSoft}`, boxShadow: SPOTA.shadow.card }}>
            <div style={{ display: 'flex', gap: 12, marginBottom: 10 }}>
              <Avatar name={h.name} size={56} score={h.fama} badge={h.verified} />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <h3 style={{ margin: 0, fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 15.5, color: SPOTA.c.text }}>{h.name}</h3>
                  {h.verified && <Tag kind="primary" icon="verify" style={{ padding: '2px 7px', fontSize: 10.5 }}>Certificado</Tag>}
                </div>
                <div style={{ fontFamily: SPOTA.font.ui, fontSize: 12.5, color: SPOTA.c.textSoft, marginTop: 2 }}>
                  <Icon name="pin" size={11} /> {h.hood} · {h.reviews} experiencias
                </div>
                <div style={{ display: 'flex', gap: 4, marginTop: 6, flexWrap: 'wrap' }}>
                  {h.expertise.map(e => <Tag key={e} kind="softG">{e}</Tag>)}
                </div>
              </div>
            </div>
            <p style={{ margin: '0 0 10px', fontFamily: SPOTA.font.ui, fontSize: 13.5, color: SPOTA.c.text, lineHeight: 1.5 }}>{h.bio}</p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 10, borderTop: `1px solid ${SPOTA.c.lineSoft}` }}>
              <div>
                <span style={{ fontFamily: SPOTA.font.ui, fontSize: 11, color: SPOTA.c.textSoft, textTransform: 'uppercase', letterSpacing: 0.4 }}>Propuesta</span>
                <div style={{ fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 18, color: SPOTA.c.text }}>${h.price.toLocaleString('es-AR')}<span style={{ fontSize: 12, color: SPOTA.c.textSoft, fontWeight: 500 }}> /persona</span></div>
              </div>
              <Btn variant={selected === h.id ? 'primary' : 'outline'} size="sm" onClick={() => setSelected(h.id)}>
                {selected === h.id ? '✓ Elegido' : 'Elegir'}
              </Btn>
            </div>
          </div>
        ))}
      </div>
      {selected && (
        <div style={{ padding: '12px 20px 16px', borderTop: `1px solid ${SPOTA.c.lineSoft}`, background: SPOTA.c.bg, animation: 'slideUp 200ms' }}>
          <Btn variant="primary" size="lg" full icon="wallet" onClick={() => nav('plans')}>Contratar y pagar</Btn>
        </div>
      )}
    </div>
  );
};

// Marketplace home (entry para CU-15 y CU-16)
const ScreenHostMarketplace = ({ nav }) => {
  const [tab, setTab] = React.useState('offers');
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: SPOTA.c.bg }}>
      <AppHeader title="Marketplace de Hosts" leftIcon="arrowLeft" onLeft={() => nav('profile')} />
      <div style={{ padding: '12px 20px 8px', background: `linear-gradient(135deg, ${SPOTA.c.primary}, ${SPOTA.c.primaryDark})`, color: '#fff' }}>
        <h2 style={{ margin: '0 0 4px', fontFamily: SPOTA.font.ui, fontSize: 18, fontWeight: 700 }}>Vivila con un host local</h2>
        <p style={{ margin: '0 0 12px', fontFamily: SPOTA.font.ui, fontSize: 13, opacity: 0.9 }}>Publicá lo que querés vivir y dejá que se postulen.</p>
        <Btn variant="secondary" size="md" full icon="plus" onClick={() => nav('createOffer')}>Publicar Oferta de Viaje</Btn>
      </div>
      <div style={{ display: 'flex', borderBottom: `1px solid ${SPOTA.c.lineSoft}`, padding: '0 20px' }}>
        {[{ id: 'offers', t: 'Mis ofertas' }, { id: 'browse', t: 'Hosts' }].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{ flex: 1, padding: '14px 0', border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: SPOTA.font.ui, fontWeight: tab === t.id ? 700 : 500, fontSize: 14, color: tab === t.id ? SPOTA.c.primary : SPOTA.c.textSoft, borderBottom: `2px solid ${tab === t.id ? SPOTA.c.primary : 'transparent'}` }}>{t.t}</button>
        ))}
      </div>
      <div style={{ flex: 1, overflow: 'auto', padding: 20 }}>
        {tab === 'offers' ? (
          <>
            <div onClick={() => nav('hireHost')} style={{ background: SPOTA.c.surface, borderRadius: 14, padding: 14, marginBottom: 12, border: `1px solid ${SPOTA.c.lineSoft}`, cursor: 'pointer', boxShadow: SPOTA.shadow.card }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <div>
                  <h3 style={{ margin: 0, fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 15, color: SPOTA.c.text }}>Cafés de especialidad</h3>
                  <p style={{ margin: '2px 0 0', fontFamily: SPOTA.font.ui, fontSize: 12.5, color: SPOTA.c.textSoft }}>Sáb 17 mayo · 2 personas · Palermo</p>
                </div>
                <Tag kind="secondary" icon="users">3 postulan</Tag>
              </div>
              <div style={{ paddingTop: 8, borderTop: `1px solid ${SPOTA.c.lineSoft}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: SPOTA.font.ui, fontSize: 12, color: SPOTA.c.textSoft }}>Hasta $8.000 / persona</span>
                <span style={{ fontFamily: SPOTA.font.ui, fontSize: 13, fontWeight: 600, color: SPOTA.c.primary }}>Ver postulaciones →</span>
              </div>
            </div>
          </>
        ) : (
          HOSTS.map(h => (
            <div key={h.id} style={{ background: SPOTA.c.surface, borderRadius: 14, padding: 12, marginBottom: 10, border: `1px solid ${SPOTA.c.lineSoft}`, display: 'flex', gap: 12, alignItems: 'center' }}>
              <Avatar name={h.name} size={48} score={h.fama} badge={h.verified} />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 14.5, color: SPOTA.c.text }}>{h.name}</div>
                <div style={{ fontFamily: SPOTA.font.ui, fontSize: 12, color: SPOTA.c.textSoft }}>{h.expertise[0]} · {h.hood}</div>
              </div>
              <Btn variant="outline" size="sm">Ver perfil</Btn>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// CU-17: Registrarse como Host
const ScreenRegisterHost = ({ nav }) => {
  const [type, setType] = React.useState(null);
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: SPOTA.c.bg }}>
      <AppHeader title="Ser host en Spota" leftIcon="arrowLeft" onLeft={() => nav('profile')} />
      <div style={{ flex: 1, overflow: 'auto', padding: 20 }}>
        <div style={{ textAlign: 'center', padding: '8px 0 18px' }}>
          <div style={{ width: 72, height: 72, borderRadius: 999, background: SPOTA.c.accentSoft, margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="briefcase" size={32} color={SPOTA.c.secondary} /></div>
          <h1 style={{ margin: '0 0 6px', fontFamily: SPOTA.font.ui, fontSize: 22, fontWeight: 700, color: SPOTA.c.text, letterSpacing: -0.4 }}>Compartí lo que <span style={{ fontFamily: SPOTA.font.serif, fontStyle: 'italic', color: SPOTA.c.secondary, fontWeight: 400 }}>sabés</span></h1>
          <p style={{ margin: 0, fontFamily: SPOTA.font.ui, fontSize: 14, color: SPOTA.c.textSoft, lineHeight: 1.5 }}>Elegí cómo querés sumarte. Podés cambiar de modalidad después.</p>
        </div>
        {[
          { id: 'casual', t: 'Host casual', s: 'Ideal para empezar. Datos básicos, zona y disponibilidad. Aprobación inmediata.', tag: 'Más rápido', icon: 'sparkles', color: SPOTA.c.secondary },
          { id: 'cert', t: 'Host certificado', s: 'Profesional con portfolio y verificación. Acceso a ofertas premium y comisión menor.', tag: 'Premium', icon: 'verify', color: SPOTA.c.primary },
        ].map(o => (
          <button key={o.id} onClick={() => setType(o.id)} style={{
            width: '100%', display: 'flex', gap: 14, padding: 16, marginBottom: 10, borderRadius: 16,
            background: type === o.id ? SPOTA.c.primarySoft : SPOTA.c.surface,
            border: `1.5px solid ${type === o.id ? SPOTA.c.primary : SPOTA.c.lineSoft}`,
            cursor: 'pointer', textAlign: 'left',
          }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: o.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon name={o.icon} size={22} color="#fff" /></div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                <h3 style={{ margin: 0, fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 15, color: SPOTA.c.text }}>{o.t}</h3>
                <Tag kind="softA">{o.tag}</Tag>
              </div>
              <p style={{ margin: 0, fontFamily: SPOTA.font.ui, fontSize: 13, color: SPOTA.c.textSoft, lineHeight: 1.5 }}>{o.s}</p>
            </div>
          </button>
        ))}
        {type && (
          <div style={{ marginTop: 18, animation: 'slideUp 200ms' }}>
            <h3 style={{ margin: '0 0 12px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 15, color: SPOTA.c.text }}>{type === 'casual' ? 'Datos básicos' : 'Tu portfolio profesional'}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Field label="Tu zona principal" value="Palermo" onChange={() => {}} icon="pin" />
              <Field label="Tipo de experiencia" value="Cafés de especialidad" onChange={() => {}} icon="coffee" />
              {type === 'cert' && <>
                <Field label="Credencial / título" placeholder="Ej. Guía profesional CABA" value="" onChange={() => {}} icon="verify" />
                <Field label="Link de portfolio" placeholder="https://..." value="" onChange={() => {}} icon="globe" />
              </>}
            </div>
            <div style={{ marginTop: 16 }}><Btn variant="primary" size="lg" full onClick={() => nav('hostDashboard')}>Crear perfil de host</Btn></div>
          </div>
        )}
      </div>
    </div>
  );
};

// CU-18: Postularse a Oferta de Viaje (Host dashboard)
const ScreenHostDashboard = ({ nav }) => {
  const [applying, setApplying] = React.useState(null);
  const offers = [
    { id: 'of1', title: 'Cafés de especialidad', user: 'Sol B.', date: 'Sáb 17 mayo', people: 2, hood: 'Palermo', budget: 8000, type: 'café' },
    { id: 'of2', title: 'Tour de bares en San Telmo', user: 'Tomás R.', date: 'Vie 23 mayo', people: 4, hood: 'San Telmo', budget: 12000, type: 'noche' },
    { id: 'of3', title: 'Brunch para una primera cita', user: 'Mica L.', date: 'Dom 18 mayo', people: 2, hood: 'Villa Crespo', budget: 6500, type: 'brunch' },
  ];
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: SPOTA.c.bg }}>
      <AppHeader title="Modo Host" leftIcon="arrowLeft" onLeft={() => nav('profile')} rightIcon="bell" />
      <div style={{ padding: '14px 20px', background: `linear-gradient(135deg, ${SPOTA.c.secondary}, ${SPOTA.c.secondaryDark})`, color: '#fff', display: 'flex', gap: 14, alignItems: 'center' }}>
        <Avatar name="Federico M." size={48} />
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: SPOTA.font.ui, fontSize: 12, opacity: 0.9 }}>Federico M. · Certificado</div>
          <div style={{ fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 18 }}>Fama 4.9 · 87 experiencias</div>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, padding: '14px 20px', background: SPOTA.c.bg }}>
        {[{ n: '3', l: 'Postulaciones' }, { n: '2', l: 'Contratos' }, { n: '$48k', l: 'Mes' }].map(s => (
          <div key={s.l} style={{ padding: 12, background: SPOTA.c.surface, borderRadius: 12, border: `1px solid ${SPOTA.c.lineSoft}`, textAlign: 'center' }}>
            <div style={{ fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 18, color: SPOTA.c.text }}>{s.n}</div>
            <div style={{ fontFamily: SPOTA.font.ui, fontSize: 11, color: SPOTA.c.textSoft }}>{s.l}</div>
          </div>
        ))}
      </div>
      <div style={{ flex: 1, overflow: 'auto', padding: '0 20px 24px' }}>
        <SectionTitle>Ofertas en tu zona</SectionTitle>
        {offers.map(o => (
          <div key={o.id} style={{ background: SPOTA.c.surface, borderRadius: 14, padding: 14, marginBottom: 10, border: `1.5px solid ${applying === o.id ? SPOTA.c.primary : SPOTA.c.lineSoft}`, boxShadow: SPOTA.shadow.card }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: 0, fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 15, color: SPOTA.c.text }}>{o.title}</h3>
                <p style={{ margin: '2px 0 0', fontFamily: SPOTA.font.ui, fontSize: 12.5, color: SPOTA.c.textSoft }}>por {o.user} · {o.date} · {o.people} personas</p>
              </div>
              <Tag kind="softG" icon="pin">{o.hood}</Tag>
            </div>
            <div style={{ paddingTop: 10, borderTop: `1px solid ${SPOTA.c.lineSoft}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontFamily: SPOTA.font.ui, fontSize: 11, color: SPOTA.c.textSoft, textTransform: 'uppercase' }}>Budget</span>
                <div style={{ fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 15, color: SPOTA.c.text }}>${o.budget.toLocaleString('es-AR')}</div>
              </div>
              <Btn variant={applying === o.id ? 'primary' : 'outline'} size="sm" onClick={() => setApplying(applying === o.id ? null : o.id)}>
                {applying === o.id ? '✓ Postulado' : 'Postularme'}
              </Btn>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

Object.assign(window, { ScreenCreateOffer, ScreenHireHost, ScreenHostMarketplace, ScreenRegisterHost, ScreenHostDashboard });
