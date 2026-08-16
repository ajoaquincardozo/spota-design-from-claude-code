// ========================================================================
// 12-screens-hosts.jsx
// ========================================================================
// Marketplace de Hosts (CU-15 entry + CU-16 ver postulaciones)
// Layout desktop: hero arriba + 2 cols (mis ofertas + hosts disponibles)
const ScreenHostMarketplace = ({ nav }) => {
  return (
    <section>
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, fontFamily: SPOTA.font.ui, fontSize: 13, color: SPOTA.c.textSoft }}>
        <button onClick={() => nav('plans')} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: SPOTA.c.textSoft, fontFamily: SPOTA.font.ui, fontSize: 13, padding: 0, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
          <Icon name="arrowLeft" size={14} /> Planes
        </button>
        <span style={{ color: SPOTA.c.textMuted }}>/</span>
        <span style={{ color: SPOTA.c.text, fontWeight: 600 }}>Marketplace de Hosts</span>
      </div>

      {/* Hero */}
      <div style={{ background: `linear-gradient(135deg, ${SPOTA.c.primary}, ${SPOTA.c.primaryDark})`, color: '#fff', borderRadius: 18, padding: 28, marginBottom: 28, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
        <div style={{ flex: 1 }}>
          <h1 style={{ margin: '0 0 6px', fontFamily: SPOTA.font.ui, fontSize: 26, fontWeight: 700, letterSpacing: -0.5 }}>
            Vivila con un <span style={{ fontFamily: SPOTA.font.serif, fontStyle: 'italic', fontWeight: 400 }}>host local</span>
          </h1>
          <p style={{ margin: 0, fontFamily: SPOTA.font.ui, fontSize: 14.5, opacity: 0.9, maxWidth: 540 }}>
            Publicá lo que querés vivir y dejá que los hosts se postulen. Vos elegís a quién contratar
            según su Fama Score, propuesta y precio.
          </p>
        </div>
        <Btn variant="secondary" size="lg" icon="plus" onClick={() => nav('createOffer')}>Publicar oferta</Btn>
      </div>

      {/* 2 columnas: mis ofertas + hosts disponibles */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div>
          <h2 style={{ margin: '0 0 16px', fontFamily: SPOTA.font.ui, fontSize: 18, fontWeight: 700, color: SPOTA.c.text }}>Mis ofertas activas</h2>
          {OFFERS.slice(0, 1).map(o => (
            <button key={o.id} onClick={() => nav('hireHost', { id: o.id })} style={{
              width: '100%', textAlign: 'left',
              background: SPOTA.c.surface, borderRadius: 14, padding: 16, marginBottom: 12,
              border: `1px solid ${SPOTA.c.lineSoft}`, boxShadow: SPOTA.shadow.card, cursor: 'pointer',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <div>
                  <h3 style={{ margin: 0, fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 16, color: SPOTA.c.text }}>{o.title}</h3>
                  <p style={{ margin: '2px 0 0', fontFamily: SPOTA.font.ui, fontSize: 13, color: SPOTA.c.textSoft }}>{o.date} · {o.people} personas · {o.hood}</p>
                </div>
                <Tag kind="secondary" icon="users">{o.postulants} postulan</Tag>
              </div>
              <div style={{ paddingTop: 10, borderTop: `1px solid ${SPOTA.c.lineSoft}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: SPOTA.font.ui, fontSize: 12.5, color: SPOTA.c.textSoft }}>Hasta ${o.budget.toLocaleString('es-AR')} / persona</span>
                <span style={{ fontFamily: SPOTA.font.ui, fontSize: 13.5, fontWeight: 700, color: SPOTA.c.primary, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  Ver postulaciones <Icon name="arrowRight" size={14} color={SPOTA.c.primary} />
                </span>
              </div>
            </button>
          ))}
          <div style={{
            padding: 18, borderRadius: 14, background: SPOTA.c.bgAlt, border: `1px dashed ${SPOTA.c.line}`,
            textAlign: 'center',
          }}>
            <p style={{ margin: '0 0 10px', fontFamily: SPOTA.font.ui, fontSize: 13, color: SPOTA.c.textSoft, lineHeight: 1.5 }}>
              ¿Tenés otra experiencia en mente?
            </p>
            <Btn variant="primary" size="sm" icon="plus" onClick={() => nav('createOffer')}>Publicar otra oferta</Btn>
          </div>
        </div>

        <div>
          <h2 style={{ margin: '0 0 16px', fontFamily: SPOTA.font.ui, fontSize: 18, fontWeight: 700, color: SPOTA.c.text }}>Hosts en tu zona</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {HOSTS.map(h => (
              <div key={h.id} style={{
                background: SPOTA.c.surface, borderRadius: 14, padding: 14,
                border: `1px solid ${SPOTA.c.lineSoft}`, display: 'flex', gap: 12, alignItems: 'center',
              }}>
                <Avatar name={h.name} size={52} score={h.fama} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 14.5, color: SPOTA.c.text }}>{h.name}</span>
                    {h.verified && <Tag kind="primary" icon="verify" style={{ padding: '2px 7px', fontSize: 10.5 }}>Certificado</Tag>}
                  </div>
                  <p style={{ margin: '2px 0 4px', fontFamily: SPOTA.font.ui, fontSize: 12.5, color: SPOTA.c.textSoft }}>
                    {h.expertise[0]} · {h.hood} · {h.reviews} experiencias
                  </p>
                </div>
                <Btn variant="outline" size="sm" onClick={() => nav('hireHost', { hostId: h.id })}>Ver perfil</Btn>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// CU-15: Crear oferta — wizard 3 pasos
const ScreenCreateOffer = ({ nav }) => {
  const [step, setStep] = React.useState(1);
  const [budget, setBudget] = React.useState(8000);
  const [people, setPeople] = React.useState(2);
  const [type, setType] = React.useState('Cafés de especialidad');
  const [desc, setDesc] = React.useState('Quiero recorrer cafés de especialidad por Palermo y Villa Crespo. Nos gusta charlar con baristas y conocer la historia de cada lugar.');
  const [date, setDate] = React.useState('17/05/2026');
  const [time, setTime] = React.useState('14:00 - 18:00');
  const [zone, setZone] = React.useState('Palermo, Villa Crespo');
  const [showSuccess, setShowSuccess] = React.useState(false);
  const total = 3;
  const next = () => {
    if (step < total) { setStep(step + 1); return; }
    setShowSuccess(true);
    setTimeout(() => nav('hostMarketplace'), 1200);
  };
  const back = () => step > 1 ? setStep(step - 1) : nav('hostMarketplace');

  return (
    <section>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
        <button onClick={back} style={{ width: 40, height: 40, borderRadius: 999, border: `1px solid ${SPOTA.c.line}`, background: SPOTA.c.surface, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name={step > 1 ? 'arrowLeft' : 'close'} size={18} />
        </button>
        <div style={{ flex: 1 }}>
          <p style={{ margin: 0, fontFamily: SPOTA.font.ui, fontSize: 12.5, fontWeight: 700, color: SPOTA.c.primary, letterSpacing: 0.4, textTransform: 'uppercase' }}>Publicar Oferta de Viaje</p>
          <h1 style={{ margin: '2px 0 0', fontFamily: SPOTA.font.ui, fontSize: 22, fontWeight: 700, color: SPOTA.c.text, letterSpacing: -0.4 }}>Paso {step} de {total}</h1>
        </div>
      </div>

      <Stepper steps={['Experiencia', 'Cuándo y quiénes', 'Presupuesto']} current={step} />

      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        {step === 1 && (
          <>
            <h2 style={{ margin: '0 0 8px', fontFamily: SPOTA.font.ui, fontSize: 26, fontWeight: 700, color: SPOTA.c.text, letterSpacing: -0.5 }}>
              ¿Qué <span style={{ fontFamily: SPOTA.font.serif, fontStyle: 'italic', color: SPOTA.c.secondary, fontWeight: 400 }}>experiencia</span> buscás?
            </h2>
            <p style={{ margin: '0 0 24px', fontFamily: SPOTA.font.ui, fontSize: 14.5, color: SPOTA.c.textSoft }}>Contale a los hosts qué te gustaría vivir.</p>
            <label style={{ display: 'block', marginBottom: 6, fontFamily: SPOTA.font.ui, fontSize: 13, fontWeight: 600, color: SPOTA.c.textSoft }}>Tipo de experiencia</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 14px', height: 48, borderRadius: 12, background: SPOTA.c.surface, border: `1.5px solid ${SPOTA.c.line}`, marginBottom: 16 }}>
              <Icon name="sparkles" size={18} color={SPOTA.c.textSoft} />
              <input value={type} onChange={(e) => setType(e.target.value)} style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontFamily: SPOTA.font.ui, fontSize: 15, color: SPOTA.c.text }} />
            </div>
            <label style={{ display: 'block', marginBottom: 6, fontFamily: SPOTA.font.ui, fontSize: 13, fontWeight: 600, color: SPOTA.c.textSoft }}>Descripción</label>
            <textarea value={desc} onChange={(e) => setDesc(e.target.value)} style={{
              width: '100%', minHeight: 140, padding: 14, borderRadius: 12, boxSizing: 'border-box',
              border: `1.5px solid ${SPOTA.c.line}`, background: SPOTA.c.surface,
              fontFamily: SPOTA.font.ui, fontSize: 14.5, color: SPOTA.c.text, outline: 'none', resize: 'vertical',
            }} />
          </>
        )}

        {step === 2 && (
          <>
            <h2 style={{ margin: '0 0 8px', fontFamily: SPOTA.font.ui, fontSize: 26, fontWeight: 700, color: SPOTA.c.text, letterSpacing: -0.5 }}>¿Cuándo y con quién?</h2>
            <p style={{ margin: '0 0 24px', fontFamily: SPOTA.font.ui, fontSize: 14.5, color: SPOTA.c.textSoft }}>Spota va a usar estos datos para sugerir hosts disponibles.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { label: 'Fecha (DD/MM/AAAA)', val: date, set: setDate, icon: 'calendar' },
                { label: 'Horario (HH:MM - HH:MM)', val: time, set: setTime, icon: 'clock' },
                { label: 'Zona', val: zone, set: setZone, icon: 'pin' },
              ].map(f => (
                <div key={f.label}>
                  <label style={{ display: 'block', marginBottom: 6, fontFamily: SPOTA.font.ui, fontSize: 13, fontWeight: 600, color: SPOTA.c.textSoft }}>{f.label}</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 14px', height: 48, borderRadius: 12, background: SPOTA.c.surface, border: `1.5px solid ${SPOTA.c.line}` }}>
                    <Icon name={f.icon} size={18} color={SPOTA.c.textSoft} />
                    <input value={f.val} onChange={(e) => f.set(e.target.value)} style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontFamily: SPOTA.font.ui, fontSize: 15, color: SPOTA.c.text }} />
                  </div>
                </div>
              ))}
              <div style={{ background: SPOTA.c.surface, borderRadius: 12, padding: 16, border: `1.5px solid ${SPOTA.c.line}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <span style={{ fontFamily: SPOTA.font.ui, fontWeight: 600, fontSize: 14, color: SPOTA.c.text }}>Cantidad de personas</span>
                  <span style={{ fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 18, color: SPOTA.c.primary }}>{people}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <button onClick={() => setPeople(Math.max(1, people - 1))} style={{ width: 40, height: 40, borderRadius: 999, border: `1.5px solid ${SPOTA.c.line}`, background: SPOTA.c.bg, cursor: 'pointer', fontSize: 20, color: SPOTA.c.text }}>−</button>
                  <input type="range" min="1" max="10" value={people} onChange={(e) => setPeople(+e.target.value)} style={{ flex: 1, accentColor: SPOTA.c.primary }} />
                  <button onClick={() => setPeople(Math.min(10, people + 1))} style={{ width: 40, height: 40, borderRadius: 999, border: `1.5px solid ${SPOTA.c.line}`, background: SPOTA.c.bg, cursor: 'pointer', fontSize: 20, color: SPOTA.c.text }}>+</button>
                </div>
              </div>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h2 style={{ margin: '0 0 8px', fontFamily: SPOTA.font.ui, fontSize: 26, fontWeight: 700, color: SPOTA.c.text, letterSpacing: -0.5 }}>¿Cuánto querés gastar?</h2>
            <p style={{ margin: '0 0 24px', fontFamily: SPOTA.font.ui, fontSize: 14.5, color: SPOTA.c.textSoft }}>
              Es un presupuesto orientativo. Los hosts ajustan su propuesta a partir de este valor.
            </p>
            <div style={{ background: SPOTA.c.surface, borderRadius: 16, padding: 28, border: `1px solid ${SPOTA.c.lineSoft}`, textAlign: 'center', marginBottom: 16 }}>
              <p style={{ margin: '0 0 8px', fontFamily: SPOTA.font.ui, fontSize: 13.5, color: SPOTA.c.textSoft }}>Presupuesto por persona</p>
              <h2 style={{ margin: '0 0 18px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 48, color: SPOTA.c.primary, letterSpacing: -1 }}>${budget.toLocaleString('es-AR')}</h2>
              <input type="range" min="3000" max="25000" step="500" value={budget} onChange={(e) => setBudget(+e.target.value)} style={{ width: '100%', accentColor: SPOTA.c.primary }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                <span style={{ fontFamily: SPOTA.font.ui, fontSize: 12, color: SPOTA.c.textMuted }}>$3.000</span>
                <span style={{ fontFamily: SPOTA.font.ui, fontSize: 12, color: SPOTA.c.textMuted }}>$25.000</span>
              </div>
            </div>
            <div style={{ padding: 14, borderRadius: 12, background: SPOTA.c.primarySoft, border: `1px dashed ${SPOTA.c.primary}`, display: 'flex', alignItems: 'center', gap: 12 }}>
              <Icon name="shield" size={18} color={SPOTA.c.primary} />
              <p style={{ margin: 0, fontFamily: SPOTA.font.ui, fontSize: 13, color: SPOTA.c.primaryDark, lineHeight: 1.45 }}>
                Spota cobra una comisión del 12 %. La plata queda en custodia hasta que termine la experiencia.
              </p>
            </div>
          </>
        )}

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 32, gap: 10 }}>
          {step > 1 && <Btn variant="ghost" onClick={back}>Atrás</Btn>}
          <Btn variant="primary" size="lg" iconRight={step < total ? 'arrowRight' : 'check'}
            disabled={(step === 1 && (!type || !desc)) || (step === 2 && (!date || !time || !zone))}
            onClick={next}>
            {step < total ? 'Continuar' : 'Publicar oferta'}
          </Btn>
        </div>
        {showSuccess && (
          <div style={{
            position: 'fixed', bottom: 32, left: '50%', transform: 'translateX(-50%)',
            padding: '12px 22px', borderRadius: 999, background: SPOTA.c.primary, color: '#fff',
            fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 14,
            boxShadow: '0 8px 24px rgba(47,111,94,0.35)', zIndex: 100,
          }}>Oferta publicada · te avisamos cuando lleguen postulaciones</div>
        )}
      </div>
    </section>
  );
};

// CU-16: Contratar Host — lista de postulaciones a una oferta
// CU-006-002 §3.9 — Paywall Variante A. Sub-flujo reutilizable.
const PaywallVariantA = ({ amount, onCancel, onConfirm, subtitle, ctaLabel, savedMedio, chargeNote }) => {
  const [card, setCard] = React.useState({ tipo: 'Tarjeta de crédito', numero: '', venc: '', cvv: '' });
  const [bill, setBill] = React.useState({ nombre: '', dni: '', iva: 'Consumidor final', email: '' });
  const [save, setSave] = React.useState(true);
  const [expanded, setExpanded] = React.useState(!savedMedio);
  const [processing, setProcessing] = React.useState(false);
  const setC = (k, v) => setCard(s => ({ ...s, [k]: v }));
  const setB = (k, v) => setBill(s => ({ ...s, [k]: v }));
  const usingSaved = savedMedio && !expanded;
  const filled = card.numero && card.venc && card.cvv && bill.nombre && bill.dni && bill.email;
  const canConfirm = usingSaved || filled;
  const doConfirm = () => {
    setProcessing(true);
    setTimeout(() => onConfirm({ card: usingSaved ? savedMedio : card, bill, save }), 1100);
  };
  const inputBox = (placeholder, value, onChange, icon) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 14px', height: 44, borderRadius: 10, background: SPOTA.c.bg, border: `1.5px solid ${SPOTA.c.line}` }}>
      {icon && <Icon name={icon} size={16} color={SPOTA.c.textSoft} />}
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontFamily: SPOTA.font.ui, fontSize: 14.5, color: SPOTA.c.text }} />
    </div>
  );
  return (
    <div onClick={processing ? undefined : onCancel} style={{
      position: 'fixed', inset: 0, background: 'rgba(43,37,35,0.55)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: 24,
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        background: SPOTA.c.bg, width: 'min(620px, 100%)', maxHeight: '92vh', overflow: 'auto',
        borderRadius: 18, padding: '22px 26px', boxShadow: SPOTA.shadow.pop,
      }}>
        <h2 style={{ margin: '0 0 6px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 22, color: SPOTA.c.text }}>Datos de pago</h2>
        <p style={{ margin: '0 0 16px', fontFamily: SPOTA.font.ui, fontSize: 13.5, color: SPOTA.c.textSoft }}>
          {subtitle || <>Total a pagar: <strong style={{ color: SPOTA.c.text }}>${amount.toLocaleString('es-AR')}</strong> · Los fondos quedan en custodia hasta finalizar el servicio.</>}
        </p>

        {usingSaved ? (
          <div style={{ background: SPOTA.c.surface, borderRadius: 14, padding: 18, border: `1px solid ${SPOTA.c.lineSoft}`, marginBottom: 4 }}>
            <h3 style={{ margin: '0 0 10px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 14.5, color: SPOTA.c.text }}>Medio de pago</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Icon name="wallet" size={18} color={SPOTA.c.primary} />
                <div>
                  <div style={{ fontFamily: SPOTA.font.ui, fontWeight: 600, fontSize: 14, color: SPOTA.c.text }}>{savedMedio.tipo} •••• {savedMedio.last4}</div>
                  <div style={{ fontFamily: SPOTA.font.ui, fontSize: 12.5, color: SPOTA.c.textSoft }}>{savedMedio.note}</div>
                </div>
              </div>
              <Btn variant="ghost" size="sm" disabled={processing} onClick={() => setExpanded(true)}>Cambiar</Btn>
            </div>
            {chargeNote && (
              <p style={{ margin: '10px 0 0', fontFamily: SPOTA.font.ui, fontSize: 12.5, color: SPOTA.c.textMuted }}>{chargeNote}</p>
            )}
          </div>
        ) : (
          <React.Fragment>
            <h3 style={{ margin: '6px 0 8px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 14.5, color: SPOTA.c.text }}>Medio de pago</h3>
            <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
              {['Tarjeta de crédito', 'Tarjeta de débito'].map(t => <ChipBtn key={t} active={card.tipo === t} onClick={() => setC('tipo', t)}>{t}</ChipBtn>)}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
              {inputBox('Número de tarjeta (16 dígitos)', card.numero, (v) => setC('numero', v), 'wallet')}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {inputBox('Vencimiento (MM/AAAA)', card.venc, (v) => setC('venc', v))}
                {inputBox('Código (3 o 4 dígitos)', card.cvv, (v) => setC('cvv', v))}
              </div>
            </div>

            <h3 style={{ margin: '6px 0 8px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 14.5, color: SPOTA.c.text }}>Facturación</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 12 }}>
              {inputBox('Nombre completo', bill.nombre, (v) => setB('nombre', v), 'user')}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {inputBox('DNI (XX.XXX.XXX)', bill.dni, (v) => setB('dni', v))}
                <div>
                  <div style={{ fontFamily: SPOTA.font.ui, fontWeight: 600, fontSize: 12.5, color: SPOTA.c.text, marginBottom: 4 }}>Condición IVA</div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {['Consumidor final', 'Monotributista'].map(o => <ChipBtn key={o} active={bill.iva === o} onClick={() => setB('iva', o)}>{o}</ChipBtn>)}
                  </div>
                </div>
              </div>
              {inputBox('Email para comprobantes', bill.email, (v) => setB('email', v), 'mail')}
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14, cursor: 'pointer' }}>
              <input type="checkbox" checked={save} onChange={(e) => setSave(e.target.checked)} />
              <span style={{ fontFamily: SPOTA.font.ui, fontSize: 13, color: SPOTA.c.text }}>Guardar medio y datos de facturación para próximas veces.</span>
            </label>
          </React.Fragment>
        )}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 16 }}>
          <Btn variant="ghost" disabled={processing} onClick={onCancel}>Cancelar</Btn>
          <Btn variant="primary" icon="check" disabled={processing || !canConfirm} onClick={doConfirm}>{processing ? 'Procesando pago…' : (ctaLabel || ('Pagar $' + amount.toLocaleString('es-AR')))}</Btn>
        </div>
      </div>
    </div>
  );
};

const PARTICIPANTS_DEFAULT = 4;
const COMMISSION_PCT = 0.12;

const ScreenHireHost = ({ nav, params }) => {
  const offer = OFFERS.find(o => o.id === params?.id) || OFFERS[0];
  const [selected, setSelected] = React.useState(null);
  const [phase, setPhase] = React.useState('list'); // list | summary | paywall | confirmed
  const host = HOSTS.find(h => h.id === selected);
  const total = host ? host.price * (offer.people || PARTICIPANTS_DEFAULT) : 0;
  const commission = Math.round(total * COMMISSION_PCT);
  const net = total - commission;

  return (
    <section>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, fontFamily: SPOTA.font.ui, fontSize: 13, color: SPOTA.c.textSoft }}>
        <button onClick={() => nav('hostMarketplace')} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: SPOTA.c.textSoft, fontFamily: SPOTA.font.ui, fontSize: 13, padding: 0, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
          <Icon name="arrowLeft" size={14} /> Marketplace
        </button>
        <span style={{ color: SPOTA.c.textMuted }}>/</span>
        <span style={{ color: SPOTA.c.text, fontWeight: 600 }}>Postulaciones</span>
      </div>

      <div style={{ marginBottom: 24 }}>
        <h1 style={{ margin: '0 0 6px', fontFamily: SPOTA.font.ui, fontSize: 28, fontWeight: 700, color: SPOTA.c.text, letterSpacing: -0.5 }}>{offer.title}</h1>
        <p style={{ margin: '0 0 14px', fontFamily: SPOTA.font.ui, fontSize: 14.5, color: SPOTA.c.textSoft }}>
          {offer.date} · {offer.people} personas · {offer.hood} · hasta ${offer.budget.toLocaleString('es-AR')} / persona
        </p>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 14px', borderRadius: 999, background: SPOTA.c.primarySoft }}>
          <Icon name="sparkles" size={15} color={SPOTA.c.primary} />
          <span style={{ fontFamily: SPOTA.font.ui, fontWeight: 600, fontSize: 13, color: SPOTA.c.primaryDark }}>
            {HOSTS.length} hosts se postularon a tu oferta
          </span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: 16 }}>
        {HOSTS.map(h => {
          const on = selected === h.id;
          return (
            <div key={h.id} style={{
              background: SPOTA.c.surface, borderRadius: 16, padding: 18,
              border: `1.5px solid ${on ? SPOTA.c.primary : SPOTA.c.lineSoft}`,
              boxShadow: on ? SPOTA.shadow.cardHover : SPOTA.shadow.card,
            }}>
              <div style={{ display: 'flex', gap: 14, marginBottom: 12 }}>
                <Avatar name={h.name} size={56} score={h.fama} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <h3 style={{ margin: 0, fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 16, color: SPOTA.c.text }}>{h.name}</h3>
                    {h.verified && <Tag kind="primary" icon="verify" style={{ padding: '2px 7px', fontSize: 10.5 }}>Certificado</Tag>}
                  </div>
                  <p style={{ margin: '2px 0 6px', fontFamily: SPOTA.font.ui, fontSize: 12.5, color: SPOTA.c.textSoft }}>
                    <Icon name="pin" size={11} color={SPOTA.c.textSoft} /> {h.hood} · {h.reviews} experiencias
                  </p>
                  <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                    {h.expertise.map(e => <Tag key={e} kind="softG">{e}</Tag>)}
                  </div>
                </div>
              </div>
              <p style={{ margin: '0 0 12px', fontFamily: SPOTA.font.ui, fontSize: 13.5, color: SPOTA.c.text, lineHeight: 1.5 }}>{h.bio}</p>
              <div style={{ paddingTop: 12, borderTop: `1px solid ${SPOTA.c.lineSoft}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontFamily: SPOTA.font.ui, fontSize: 11, color: SPOTA.c.textSoft, textTransform: 'uppercase', letterSpacing: 0.4 }}>Propuesta</span>
                  <div style={{ fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 18, color: SPOTA.c.text }}>
                    ${h.price.toLocaleString('es-AR')}<span style={{ fontSize: 12, color: SPOTA.c.textSoft, fontWeight: 500 }}> /persona</span>
                  </div>
                </div>
                <Btn variant={on ? 'primary' : 'outline'} onClick={() => setSelected(h.id)} icon={on ? 'check' : undefined}>
                  {on ? 'Elegido' : 'Elegir'}
                </Btn>
              </div>
            </div>
          );
        })}
      </div>

      {selected && phase === 'list' && (
        <div style={{
          position: 'sticky', bottom: 16, marginTop: 24,
          padding: 16, borderRadius: 14,
          background: SPOTA.c.surface, border: `1px solid ${SPOTA.c.line}`,
          boxShadow: SPOTA.shadow.pop, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16,
          animation: 'fadeIn 200ms',
        }}>
          <p style={{ margin: 0, fontFamily: SPOTA.font.ui, fontSize: 13.5, color: SPOTA.c.text }}>
            Vas a contratar a <strong>{host.name}</strong>. La plata queda en custodia hasta que termine la experiencia.
          </p>
          <Btn variant="primary" size="lg" icon="wallet" onClick={() => setPhase('summary')}>Contratar y pagar</Btn>
        </div>
      )}

      {/* Modal de resumen pre-pago (item 13) */}
      {phase === 'summary' && host && (
        <div onClick={() => setPhase('list')} style={{
          position: 'fixed', inset: 0, background: 'rgba(43,37,35,0.55)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: 24,
        }}>
          <div onClick={(e) => e.stopPropagation()} style={{
            background: SPOTA.c.bg, width: 'min(560px, 100%)',
            borderRadius: 18, padding: '24px 28px', boxShadow: SPOTA.shadow.pop,
          }}>
            <h2 style={{ margin: '0 0 14px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 22, color: SPOTA.c.text }}>Resumen de la contratación</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: `1px solid ${SPOTA.c.lineSoft}` }}>
              <Avatar name={host.name} size={48} />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 15, color: SPOTA.c.text }}>{host.name}</div>
                <div style={{ fontFamily: SPOTA.font.ui, fontSize: 13, color: SPOTA.c.textSoft }}>Fama {host.fama} · {host.expertise[0]}</div>
              </div>
            </div>
            {[
              { l: 'Propuesta por persona', v: `$${host.price.toLocaleString('es-AR')}` },
              { l: 'Cantidad de participantes', v: String(offer.people || PARTICIPANTS_DEFAULT) },
              { l: 'Monto total', v: `$${total.toLocaleString('es-AR')}` },
              { l: 'Comisión de plataforma (12%)', v: `$${commission.toLocaleString('es-AR')}` },
              { l: 'Monto neto al host', v: `$${net.toLocaleString('es-AR')}` },
            ].map(r => (
              <div key={r.l} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontFamily: SPOTA.font.ui, fontSize: 13.5 }}>
                <span style={{ color: SPOTA.c.textSoft }}>{r.l}</span>
                <span style={{ color: SPOTA.c.text, fontWeight: 600 }}>{r.v}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 14 }}>
              <Btn variant="ghost" onClick={() => setPhase('list')}>Cancelar</Btn>
              <Btn variant="primary" icon="wallet" onClick={() => setPhase('paywall')}>Continuar al pago</Btn>
            </div>
          </div>
        </div>
      )}

      {/* Paywall Variante A (item 14) */}
      {phase === 'paywall' && (
        <PaywallVariantA
          amount={total}
          savedMedio={{ tipo: 'Tarjeta de crédito', last4: '4821', note: 'Guardada en tu perfil.' }}
          chargeNote={'Cobramos $' + total.toLocaleString('es-AR') + ' · los fondos quedan en custodia hasta finalizar la experiencia.'}
          subtitle={<>Contratación de host · <strong style={{ color: SPOTA.c.text }}>${total.toLocaleString('es-AR')}</strong>.</>}
          onCancel={() => setPhase('summary')}
          onConfirm={() => setPhase('confirmed')}
        />
      )}

      {/* Confirmación post-cobro (item 15) */}
      {phase === 'confirmed' && host && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(43,37,35,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: 24 }}>
          <div style={{ background: SPOTA.c.bg, width: 'min(520px, 100%)', borderRadius: 18, padding: '28px', textAlign: 'center', boxShadow: SPOTA.shadow.pop }}>
            <div style={{ width: 72, height: 72, borderRadius: 999, background: SPOTA.c.primarySoft, margin: '6px auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="check" size={36} color={SPOTA.c.primary} strokeWidth={3} />
            </div>
            <h2 style={{ margin: '0 0 8px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 22, color: SPOTA.c.text }}>
              ¡Listo! Reservaste a {host.name}
            </h2>
            <p style={{ margin: '0 0 18px', fontFamily: SPOTA.font.ui, fontSize: 14, color: SPOTA.c.textSoft, lineHeight: 1.55 }}>
              El comprobante fue enviado a tu email. Los fondos quedan en custodia hasta finalizar la experiencia.
            </p>
            <div style={{ background: SPOTA.c.surface, borderRadius: 12, padding: 14, marginBottom: 16, border: `1px solid ${SPOTA.c.lineSoft}`, textAlign: 'left' }}>
              {[
                { l: 'Plan asociado', v: 'Cumple de Mica' },
                { l: 'Monto cobrado', v: `$${total.toLocaleString('es-AR')}` },
                { l: 'Comprobante', v: 'comprobante-2641 (PDF)' },
                { l: 'Custodia', v: 'Activa hasta finalizar' },
              ].map(r => (
                <div key={r.l} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontFamily: SPOTA.font.ui, fontSize: 13 }}>
                  <span style={{ color: SPOTA.c.textSoft }}>{r.l}</span>
                  <span style={{ color: SPOTA.c.text, fontWeight: 600 }}>{r.v}</span>
                </div>
              ))}
            </div>
            <Btn variant="primary" size="lg" full iconRight="arrowRight" onClick={() => nav('plans')}>Ir a tus planes</Btn>
          </div>
        </div>
      )}
    </section>
  );
};

// CU-17: Registrarse como Host
const ScreenRegisterHost = ({ nav }) => {
  const [type, setType] = React.useState(null);
  const [zone, setZone] = React.useState('Palermo');
  const [expType, setExpType] = React.useState('Cafés de especialidad');
  const [credential, setCredential] = React.useState('');
  const [portfolio, setPortfolio] = React.useState('');
  const ready = type && zone && expType && (type === 'casual' || (credential && portfolio));
  // P3-42: feedback de alta antes de navegar al dashboard de host.
  const [toast, setToast] = React.useState(null);
  const createHost = () => {
    setToast('Perfil de host creado');
    window.setTimeout(() => nav('hostDashboard', { modalidad: type }), 1000);
  };
  return (
    <section style={{ position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, fontFamily: SPOTA.font.ui, fontSize: 13, color: SPOTA.c.textSoft }}>
        <button onClick={() => nav('profile')} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: SPOTA.c.textSoft, fontFamily: SPOTA.font.ui, fontSize: 13, padding: 0, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
          <Icon name="arrowLeft" size={14} /> Perfil
        </button>
        <span style={{ color: SPOTA.c.textMuted }}>/</span>
        <span style={{ color: SPOTA.c.text, fontWeight: 600 }}>Ser host</span>
      </div>

      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ width: 80, height: 80, borderRadius: 999, background: SPOTA.c.accentSoft, margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="briefcase" size={36} color={SPOTA.c.secondary} />
          </div>
          <h1 style={{ margin: '0 0 6px', fontFamily: SPOTA.font.ui, fontSize: 28, fontWeight: 700, color: SPOTA.c.text, letterSpacing: -0.5 }}>
            Compartí lo que <span style={{ fontFamily: SPOTA.font.serif, fontStyle: 'italic', color: SPOTA.c.secondary, fontWeight: 400 }}>sabés</span>
          </h1>
          <p style={{ margin: 0, fontFamily: SPOTA.font.ui, fontSize: 14.5, color: SPOTA.c.textSoft, lineHeight: 1.55 }}>
            Elegí cómo querés sumarte. Podés cambiar de modalidad después.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 24 }}>
          {[
            { id: 'casual', t: 'Host casual', s: 'Datos básicos, zona y disponibilidad. Aprobación inmediata.', tag: 'Más rápido', icon: 'sparkles', color: SPOTA.c.secondary },
            { id: 'cert', t: 'Host certificado', s: 'Profesional con portfolio y verificación. Acceso a ofertas premium y comisión menor.', tag: 'Premium', icon: 'verify', color: SPOTA.c.primary },
          ].map(o => {
            const on = type === o.id;
            return (
              <button key={o.id} onClick={() => setType(o.id)} style={{
                padding: 18, borderRadius: 16,
                background: on ? SPOTA.c.primarySoft : SPOTA.c.surface,
                border: `1.5px solid ${on ? SPOTA.c.primary : SPOTA.c.lineSoft}`,
                cursor: 'pointer', textAlign: 'left',
              }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: o.color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                  <Icon name={o.icon} size={22} color="#fff" />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                  <h3 style={{ margin: 0, fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 16, color: SPOTA.c.text }}>{o.t}</h3>
                  <Tag kind="softA">{o.tag}</Tag>
                </div>
                <p style={{ margin: 0, fontFamily: SPOTA.font.ui, fontSize: 13.5, color: SPOTA.c.textSoft, lineHeight: 1.5 }}>{o.s}</p>
              </button>
            );
          })}
        </div>

        {type && (
          <div style={{ animation: 'fadeIn 200ms' }}>
            <h3 style={{ margin: '0 0 14px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 17, color: SPOTA.c.text }}>
              {type === 'casual' ? 'Datos básicos' : 'Tu portfolio profesional'}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { label: 'Tu zona principal', val: zone, set: setZone, icon: 'pin' },
                { label: 'Tipo de experiencia', val: expType, set: setExpType, icon: 'coffee' },
                ...(type === 'cert' ? [
                  { label: 'Credencial / título', val: credential, set: setCredential, placeholder: 'Ej. Guía profesional CABA', icon: 'verify' },
                  { label: 'Link de portfolio', val: portfolio, set: setPortfolio, placeholder: 'https://...', icon: 'globe' },
                ] : []),
              ].map(f => (
                <div key={f.label}>
                  <label style={{ display: 'block', marginBottom: 6, fontFamily: SPOTA.font.ui, fontSize: 13, fontWeight: 600, color: SPOTA.c.textSoft }}>{f.label}</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 14px', height: 48, borderRadius: 12, background: SPOTA.c.surface, border: `1.5px solid ${SPOTA.c.line}` }}>
                    <Icon name={f.icon} size={18} color={SPOTA.c.textSoft} />
                    <input value={f.val} onChange={(e) => f.set(e.target.value)} placeholder={f.placeholder} style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontFamily: SPOTA.font.ui, fontSize: 15, color: SPOTA.c.text }} />
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 24, display: 'flex', justifyContent: 'flex-end' }}>
              <Btn variant="primary" size="lg" icon="check" disabled={!ready}
                onClick={createHost}>
                Crear perfil de host
              </Btn>
            </div>
          </div>
        )}
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

// CU-006-004 (CU-18): Postularse a Oferta de Viaje. Cards mínimas + modal de detalle
// con info del solicitante, descripción, datos del evento y botón Postularme/Retirar.
const ScreenHostDashboard = ({ nav, params }) => {
  // CU-006-003: la modalidad elegida en registerHost ('casual' | 'certified') define el badge.
  const modalidad = params?.modalidad === 'casual' ? 'Casual' : 'Certificado';
  const offers = OFFERS.map(o => ({
    ...o,
    userFama: 4.7 + (Math.abs(hashStr(o.id)) % 30) / 100,
    time: '12:00 - 14:30',
    desc: o.title.includes('Cafés')
      ? 'Quiero un recorrido por cafés de tercera ola en Palermo con alguien que sepa del rubro. Charla tranquila, cata corta, sin apuro.'
      : o.title.includes('bares')
        ? 'Salida con tres amigos: queremos un recorrido por bares de barrio con historia. Que el host arme la ruta y nos cuente.'
        : 'Primera cita un domingo a la mañana. Necesito sugerencia de lugar, mesa reservada y que el host nos reciba para presentar.',
    fechaCanonica: o.date,
  }));
  const [selected, setSelected] = React.useState(null);
  const [applied, setApplied] = React.useState(new Set());
  const [toast, setToast] = React.useState(null);
  const close = () => setSelected(null);
  // CU-18: tras postularse / retirar, actualizar set + cerrar modal + dar feedback.
  const toggleApply = () => {
    if (!selected) return;
    const id = selected.id;
    const wasApplied = applied.has(id);
    setApplied(prev => {
      const n = new Set(prev);
      if (wasApplied) n.delete(id); else n.add(id);
      return n;
    });
    setSelected(null);
    setToast(wasApplied ? 'Postulación retirada' : 'Postulación enviada');
    window.setTimeout(() => setToast(t => (t === (wasApplied ? 'Postulación retirada' : 'Postulación enviada') ? null : t)), 1800);
  };
  return (
    <section style={{ position: 'relative' }}>
      {/* Hero del host */}
      <div style={{ background: `linear-gradient(135deg, ${SPOTA.c.secondary}, ${SPOTA.c.secondaryDark})`, color: '#fff', borderRadius: 18, padding: 24, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16 }}>
        <Avatar name="Federico M." size={72} />
        <div style={{ flex: 1 }}>
          <p style={{ margin: 0, fontFamily: SPOTA.font.ui, fontSize: 12.5, opacity: 0.9, textTransform: 'uppercase', letterSpacing: 0.4 }}>Modo Host · {modalidad}</p>
          <h1 style={{ margin: '4px 0 2px', fontFamily: SPOTA.font.ui, fontSize: 26, fontWeight: 700, letterSpacing: -0.5 }}>Federico M.</h1>
          <p style={{ margin: 0, fontFamily: SPOTA.font.ui, fontSize: 14, opacity: 0.92 }}>Fama 4.9 · 87 experiencias · Palermo</p>
        </div>
        <Btn variant="ghost" icon="settings" style={{ background: 'rgba(255,255,255,0.18)', color: '#fff', borderColor: 'transparent' }}>Editar perfil</Btn>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 28 }}>
        {[
          { n: String(applied.size + 3), l: 'Postulaciones activas', i: 'send' },
          { n: '2', l: 'Contratos del mes', i: 'check' },
          { n: '$48.500', l: 'Total facturado del mes', i: 'wallet' },
          { n: '4.9', l: 'Tu Fama', i: 'star' },
        ].map(s => (
          <div key={s.l} style={{ padding: 18, background: SPOTA.c.surface, borderRadius: 14, border: `1px solid ${SPOTA.c.lineSoft}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <Icon name={s.i} size={16} color={SPOTA.c.primary} />
              <span style={{ fontFamily: SPOTA.font.ui, fontSize: 12, color: SPOTA.c.textSoft, textTransform: 'uppercase', letterSpacing: 0.4 }}>{s.l}</span>
            </div>
            <div style={{ fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 26, color: SPOTA.c.text, letterSpacing: -0.5 }}>{s.n}</div>
          </div>
        ))}
      </div>

      <h2 style={{ margin: '0 0 16px', fontFamily: SPOTA.font.ui, fontSize: 20, fontWeight: 700, color: SPOTA.c.text }}>Ofertas en tu zona</h2>
      <p style={{ margin: '-8px 0 16px', fontFamily: SPOTA.font.ui, fontSize: 13, color: SPOTA.c.textSoft }}>
        Tocá una oferta para ver el detalle completo y postularte.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: 14 }}>
        {offers.map(o => {
          const isApplied = applied.has(o.id);
          return (
            <button key={o.id} onClick={() => setSelected(o)} style={{
              textAlign: 'left', cursor: 'pointer',
              background: SPOTA.c.surface, borderRadius: 14, padding: 18,
              border: `1.5px solid ${isApplied ? SPOTA.c.primary : SPOTA.c.lineSoft}`,
              boxShadow: SPOTA.shadow.card,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10, gap: 12 }}>
                <h3 style={{ margin: 0, fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 16, color: SPOTA.c.text }}>{o.title}</h3>
                {isApplied && <Tag kind="primary" icon="check">Postulado</Tag>}
              </div>
              <p style={{ margin: '0 0 12px', fontFamily: SPOTA.font.ui, fontSize: 12.5, color: SPOTA.c.textSoft }}>
                por {o.user} · {o.fechaCanonica} · {o.people} personas
              </p>
              <div style={{ paddingTop: 12, borderTop: `1px solid ${SPOTA.c.lineSoft}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Tag kind="softG" icon="pin">{o.hood}</Tag>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontFamily: SPOTA.font.ui, fontSize: 11, color: SPOTA.c.textSoft, textTransform: 'uppercase', letterSpacing: 0.4 }}>Por persona</span>
                  <div style={{ fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 16, color: SPOTA.c.text }}>${o.budget.toLocaleString('es-AR')}</div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Modal de detalle de la oferta — CU-006-004 §3.24 */}
      {selected && (
        <div onClick={close} style={{
          position: 'fixed', inset: 0, background: 'rgba(43,37,35,0.55)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 200, padding: 24,
        }}>
          <div onClick={(e) => e.stopPropagation()} style={{
            background: SPOTA.c.bg, width: 'min(640px, 100%)', maxHeight: '92vh',
            borderRadius: 18, padding: '24px 28px', overflow: 'auto',
            boxShadow: SPOTA.shadow.pop,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
              <Avatar name={selected.user} size={56} />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 16.5, color: SPOTA.c.text }}>{selected.user}</div>
                <div style={{ fontFamily: SPOTA.font.ui, fontSize: 13, color: SPOTA.c.textSoft }}>
                  Fama {selected.userFama.toFixed(1)} · Anfitrión de eventos
                </div>
              </div>
              <button onClick={close} style={{ width: 36, height: 36, borderRadius: 999, border: 'none', background: SPOTA.c.surface, cursor: 'pointer' }}>
                <Icon name="close" size={16} />
              </button>
            </div>
            <h2 style={{ margin: '0 0 10px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 22, color: SPOTA.c.text, letterSpacing: -0.4 }}>{selected.title}</h2>
            <p style={{ margin: '0 0 18px', fontFamily: SPOTA.font.ui, fontSize: 14, color: SPOTA.c.text, lineHeight: 1.55 }}>{selected.desc}</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 18 }}>
              {[
                { l: 'Fecha', v: selected.fechaCanonica, i: 'calendar' },
                { l: 'Horario', v: selected.time, i: 'clock' },
                { l: 'Zona', v: selected.hood, i: 'pin' },
                { l: 'Personas', v: String(selected.people), i: 'users' },
                { l: 'Por persona', v: `$${selected.budget.toLocaleString('es-AR')}`, i: 'wallet' },
                { l: 'Hosts postulados', v: String(selected.postulants), i: 'briefcase' },
              ].map(d => (
                <div key={d.l} style={{ padding: 12, background: SPOTA.c.surface, borderRadius: 12, border: `1px solid ${SPOTA.c.lineSoft}` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                    <Icon name={d.i} size={13} color={SPOTA.c.primary} />
                    <span style={{ fontFamily: SPOTA.font.ui, fontSize: 10.5, color: SPOTA.c.textSoft, textTransform: 'uppercase', letterSpacing: 0.4 }}>{d.l}</span>
                  </div>
                  <div style={{ fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 14, color: SPOTA.c.text }}>{d.v}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
              <Btn variant="ghost" onClick={close}>Cerrar</Btn>
              <Btn variant={applied.has(selected.id) ? 'outline' : 'primary'} size="lg" onClick={toggleApply}>
                {applied.has(selected.id) ? 'Retirar postulación' : 'Postularme'}
              </Btn>
            </div>
            <p style={{ margin: '10px 0 0', fontFamily: SPOTA.font.ui, fontSize: 11.5, color: SPOTA.c.textMuted, textAlign: 'right' }}>
              Tu tarifa por persona se hereda de tu perfil de host.
            </p>
          </div>
        </div>
      )}
      {toast && (
        <div style={{
          position: 'fixed', left: '50%', bottom: 32, transform: 'translateX(-50%)',
          background: SPOTA.c.text, color: SPOTA.c.bg,
          fontFamily: SPOTA.font.ui, fontSize: 13.5, fontWeight: 500,
          padding: '11px 20px', borderRadius: 999, boxShadow: SPOTA.shadow.lg,
          zIndex: 80, pointerEvents: 'none',
        }}>{toast}</div>
      )}
    </section>
  );
};

Object.assign(window, { ScreenHostMarketplace, ScreenCreateOffer, ScreenHireHost, ScreenRegisterHost, ScreenHostDashboard, PaywallVariantA });
