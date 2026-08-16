// ========================================================================
// 11-screens-hosts.jsx
// ========================================================================
// CU-15 a CU-18 — Marketplace de Hosts

// CU-15: Publicar Oferta de Viaje
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
            <textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Contales a los hosts qué te gustaría vivir..." style={{ width: '100%', minHeight: 110, padding: 14, borderRadius: 14, boxSizing: 'border-box', border: `1.5px solid ${SPOTA.c.line}`, background: SPOTA.c.surface, fontFamily: SPOTA.font.ui, fontSize: 14, color: SPOTA.c.text, outline: 'none', resize: 'vertical' }} />
          </>
        )}
        {step === 2 && (
          <>
            <h1 style={{ margin: '0 0 8px', fontFamily: SPOTA.font.ui, fontSize: 24, fontWeight: 700, color: SPOTA.c.text, letterSpacing: -0.4 }}>¿Cuándo y con quién?</h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 14 }}>
              <Field label="Fecha (DD/MM/AAAA)" value={date} onChange={setDate} icon="calendar" />
              <Field label="Horario (HH:MM - HH:MM)" value={time} onChange={setTime} icon="clock" />
              <Field label="Zona" value={zone} onChange={setZone} icon="pin" />
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
        <Btn variant="primary" size="lg" full iconRight="arrowRight"
          disabled={(step === 1 && (!type || !desc)) || (step === 2 && (!date || !time || !zone))}
          onClick={next}>{step < total ? 'Continuar' : 'Publicar oferta'}</Btn>
      </div>
      {showSuccess && (
        <div style={{
          position: 'absolute', bottom: 90, left: '50%', transform: 'translateX(-50%)',
          padding: '10px 18px', borderRadius: 999, background: SPOTA.c.primary, color: '#fff',
          fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 13.5,
          boxShadow: '0 6px 16px rgba(47,111,94,0.35)', zIndex: 20,
        }}>Oferta publicada · te avisamos cuando lleguen postulaciones</div>
      )}
    </div>
  );
};

// CU-16: Contratar Host (lista de postulaciones)
// CU-006-002 §3.9 — Contratar Host. Flujo: resumen pre-pago → paywall Variante A
// (usuario sin medio configurado) → confirmación post-cobro → redirect a Planes.
const PARTICIPANTS = 4; // mock: cantidad de participantes del plan asociado
const COMMISSION_PCT = 0.12;

// Paywall Variante A (mobile) — reutilizable. Sub-flujo de ingreso de tarjeta + facturación.
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
  return (
    <div style={{ position: 'absolute', inset: 0, background: SPOTA.c.bg, zIndex: 90, display: 'flex', flexDirection: 'column', animation: 'slideUp 240ms' }}>
      <AppHeader title="Datos de pago" leftIcon="close" onLeft={processing ? undefined : onCancel} />
      <div style={{ flex: 1, overflow: 'auto', padding: 20 }}>
        {subtitle && (
          <p style={{ margin: '0 0 16px', fontFamily: SPOTA.font.ui, fontSize: 13.5, color: SPOTA.c.textSoft, lineHeight: 1.5 }}>{subtitle}</p>
        )}
        {usingSaved ? (
          <div style={{ background: SPOTA.c.surface, borderRadius: 14, padding: 16, border: `1px solid ${SPOTA.c.lineSoft}` }}>
            <h3 style={{ margin: '0 0 10px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 15, color: SPOTA.c.text }}>Medio de pago</h3>
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
            <h3 style={{ margin: '0 0 10px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 15, color: SPOTA.c.text }}>Medio de pago</h3>
            <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
              {['Tarjeta de crédito', 'Tarjeta de débito'].map(t => (
                <Chip key={t} active={card.tipo === t} onClick={() => setC('tipo', t)}>{t}</Chip>
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 18 }}>
              <Field label="Número de tarjeta (16 dígitos)" placeholder="4111 1111 1111 1111" value={card.numero} onChange={(v) => setC('numero', v)} icon="wallet" />
              <div style={{ display: 'flex', gap: 10 }}>
                <Field label="Vencimiento (MM/AAAA)" placeholder="12/2028" value={card.venc} onChange={(v) => setC('venc', v)} />
                <Field label="Código (3 o 4 dígitos)" placeholder="123" value={card.cvv} onChange={(v) => setC('cvv', v)} />
              </div>
            </div>
            <h3 style={{ margin: '0 0 10px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 15, color: SPOTA.c.text }}>Facturación</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 12 }}>
              <Field label="Nombre completo" placeholder="Sol Benítez" value={bill.nombre} onChange={(v) => setB('nombre', v)} icon="user" />
              <Field label="DNI (XX.XXX.XXX)" placeholder="34.567.890" value={bill.dni} onChange={(v) => setB('dni', v)} />
              <div>
                <div style={{ fontFamily: SPOTA.font.ui, fontWeight: 600, fontSize: 13, color: SPOTA.c.text, marginBottom: 6 }}>Condición frente al IVA</div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {['Consumidor final', 'Monotributista'].map(o => (
                    <Chip key={o} active={bill.iva === o} onClick={() => setB('iva', o)}>{o}</Chip>
                  ))}
                </div>
              </div>
              <Field label="Email para comprobantes" placeholder="vos@correo.com" value={bill.email} onChange={(v) => setB('email', v)} icon="mail" />
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, cursor: 'pointer' }}>
              <input type="checkbox" checked={save} onChange={(e) => setSave(e.target.checked)} />
              <span style={{ fontFamily: SPOTA.font.ui, fontSize: 13, color: SPOTA.c.text }}>Guardar medio de pago y datos de facturación para próximas veces.</span>
            </label>
          </React.Fragment>
        )}
      </div>
      <div style={{ padding: '12px 20px 18px', background: SPOTA.c.bg, borderTop: `1px solid ${SPOTA.c.lineSoft}` }}>
        <Btn variant="primary" size="lg" full disabled={processing || !canConfirm} icon="check" onClick={doConfirm}>
          {processing ? 'Procesando pago…' : (ctaLabel || ('Pagar $' + amount.toLocaleString('es-AR')))}
        </Btn>
      </div>
    </div>
  );
};

const ScreenHireHost = ({ nav }) => {
  const [selected, setSelected] = React.useState(null);
  const [phase, setPhase] = React.useState('list'); // list | summary | paywall | confirmed
  const host = HOSTS.find(h => h.id === selected);
  const total = host ? host.price * PARTICIPANTS : 0;
  const commission = Math.round(total * COMMISSION_PCT);
  const net = total - commission;
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: SPOTA.c.bg, position: 'relative' }}>
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
      {selected && phase === 'list' && (
        <div style={{ padding: '12px 20px 16px', borderTop: `1px solid ${SPOTA.c.lineSoft}`, background: SPOTA.c.bg, animation: 'slideUp 200ms' }}>
          <Btn variant="primary" size="lg" full icon="wallet" onClick={() => setPhase('summary')}>Contratar y pagar</Btn>
        </div>
      )}

      {/* Modal resumen pre-pago (item 13) */}
      {phase === 'summary' && host && (
        <div onClick={() => setPhase('list')} style={{
          position: 'absolute', inset: 0, background: 'rgba(43,37,35,0.55)',
          display: 'flex', alignItems: 'flex-end', zIndex: 80,
        }}>
          <div onClick={(e) => e.stopPropagation()} style={{
            background: SPOTA.c.bg, width: '100%',
            borderTopLeftRadius: 22, borderTopRightRadius: 22,
            padding: '14px 22px 24px',
            animation: 'slideUp 260ms cubic-bezier(.2,.8,.2,1)',
          }}>
            <div style={{ width: 40, height: 4, borderRadius: 999, background: SPOTA.c.line, margin: '0 auto 14px' }} />
            <h2 style={{ margin: '0 0 12px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 20, color: SPOTA.c.text }}>Resumen de la contratación</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: `1px solid ${SPOTA.c.lineSoft}` }}>
              <Avatar name={host.name} size={42} />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 14.5, color: SPOTA.c.text }}>{host.name}</div>
                <div style={{ fontFamily: SPOTA.font.ui, fontSize: 12.5, color: SPOTA.c.textSoft }}>Fama {host.fama} · {host.expertise[0]}</div>
              </div>
            </div>
            {[
              { l: 'Propuesta por persona', v: `$${host.price.toLocaleString('es-AR')}` },
              { l: 'Cantidad de participantes', v: String(PARTICIPANTS) },
              { l: 'Monto total', v: `$${total.toLocaleString('es-AR')}` },
              { l: 'Comisión de plataforma (12%)', v: `$${commission.toLocaleString('es-AR')}` },
              { l: 'Monto neto al host', v: `$${net.toLocaleString('es-AR')}` },
            ].map(r => (
              <div key={r.l} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontFamily: SPOTA.font.ui, fontSize: 13.5 }}>
                <span style={{ color: SPOTA.c.textSoft }}>{r.l}</span>
                <span style={{ color: SPOTA.c.text, fontWeight: 600 }}>{r.v}</span>
              </div>
            ))}
            <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
              <Btn variant="outline" full onClick={() => setPhase('list')}>Cancelar</Btn>
              <Btn variant="primary" full icon="wallet" onClick={() => setPhase('paywall')}>Continuar al pago</Btn>
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
        <div style={{ position: 'absolute', inset: 0, background: SPOTA.c.bg, zIndex: 95, display: 'flex', flexDirection: 'column', animation: 'fadeIn 200ms' }}>
          <AppHeader title="Contratación confirmada" />
          <div style={{ flex: 1, overflow: 'auto', padding: '24px 24px' }}>
            <div style={{ width: 80, height: 80, borderRadius: 999, background: SPOTA.c.primarySoft, margin: '20px auto 18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="check" size={42} color={SPOTA.c.primary} strokeWidth={3} />
            </div>
            <h1 style={{ margin: '0 0 8px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 22, color: SPOTA.c.text, textAlign: 'center' }}>
              ¡Listo! Pagaste y reservaste a {host.name}
            </h1>
            <p style={{ margin: '0 0 22px', fontFamily: SPOTA.font.ui, fontSize: 14, color: SPOTA.c.textSoft, textAlign: 'center', lineHeight: 1.55 }}>
              El comprobante fue enviado a tu email. Los fondos quedan en custodia y se liberan al host cuando finalice el servicio.
            </p>
            <div style={{ background: SPOTA.c.surface, borderRadius: 14, padding: 14, marginBottom: 14, border: `1px solid ${SPOTA.c.lineSoft}` }}>
              <h3 style={{ margin: '0 0 8px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 13, color: SPOTA.c.text, textTransform: 'uppercase', letterSpacing: 0.4 }}>Detalle</h3>
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
          </div>
          <div style={{ padding: '12px 24px 24px', background: SPOTA.c.bg, borderTop: `1px solid ${SPOTA.c.lineSoft}` }}>
            <Btn variant="primary" size="lg" full iconRight="arrowRight" onClick={() => nav('plans')}>
              Ir a tus planes
            </Btn>
          </div>
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
      <AppHeader title="Marketplace de Hosts" leftIcon="arrowLeft" onLeft={() => nav('plans')} />
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
              <Btn variant="outline" size="sm" onClick={() => nav('hireHost', { hostId: h.id })}>Ver perfil</Btn>
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
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: SPOTA.c.bg, position: 'relative' }}>
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
              <Field label="Tu zona principal" value={zone} onChange={setZone} icon="pin" />
              <Field label="Tipo de experiencia" value={expType} onChange={setExpType} icon="coffee" />
              {type === 'cert' && <>
                <Field label="Credencial / título" placeholder="Ej. Guía profesional CABA" value={credential} onChange={setCredential} icon="verify" />
                <Field label="Link de portfolio" placeholder="https://..." value={portfolio} onChange={setPortfolio} icon="globe" />
              </>}
            </div>
            <div style={{ marginTop: 16 }}>
              <Btn variant="primary" size="lg" full disabled={!ready}
                onClick={createHost}>
                Crear perfil de host
              </Btn>
            </div>
          </div>
        )}
      </div>
      {toast && (
        <div style={{
          position: 'fixed', left: '50%', bottom: 110, transform: 'translateX(-50%)',
          background: SPOTA.c.text, color: SPOTA.c.bg,
          fontFamily: SPOTA.font.ui, fontSize: 13, fontWeight: 500,
          padding: '10px 18px', borderRadius: 999, boxShadow: SPOTA.shadow.lg,
          zIndex: 60, pointerEvents: 'none',
        }}>{toast}</div>
      )}
    </div>
  );
};

// CU-18: Postularse a Oferta de Viaje (Host dashboard)
// CU-006-004: dashboard del Host. Cards del listado en formato mínimo + modal
// de detalle con info del solicitante, descripción, postulados y botón Postularme.
const ScreenHostDashboard = ({ nav, params }) => {
  // CU-006-003: la modalidad elegida en registerHost ('casual' | 'certified') define el badge.
  const modalidad = params?.modalidad === 'casual' ? 'Casual' : 'Certificado';
  const offers = [
    { id: 'of1', title: 'Cafés de especialidad', user: 'Sol B.', userFama: 4.9, date: '17/05/2026', time: '10:00 - 13:00', people: 2, hood: 'Palermo', budget: 8000, postulants: 3, desc: 'Quiero un recorrido por cafés de tercera ola en Palermo con alguien que sepa del rubro. Charla tranquila, cata corta, sin apuro.' },
    { id: 'of2', title: 'Tour de bares en San Telmo', user: 'Tomás R.', userFama: 4.6, date: '23/05/2026', time: '20:00 - 00:30', people: 4, hood: 'San Telmo', budget: 12000, postulants: 5, desc: 'Salida con tres amigos: queremos un recorrido por bares de barrio con historia. Que el host arme la ruta y nos cuente.' },
    { id: 'of3', title: 'Brunch para una primera cita', user: 'Mica L.', userFama: 4.8, date: '18/05/2026', time: '12:00 - 14:30', people: 2, hood: 'Villa Crespo', budget: 6500, postulants: 2, desc: 'Primera cita un domingo a la mañana. Necesito sugerencia de lugar, mesa reservada y que el host nos reciba para presentar.' },
  ];
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
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: SPOTA.c.bg, position: 'relative' }}>
      <AppHeader title="Modo Host" leftIcon="arrowLeft" onLeft={() => nav('profile')} rightIcon="bell" />
      <div style={{ padding: '14px 20px', background: `linear-gradient(135deg, ${SPOTA.c.secondary}, ${SPOTA.c.secondaryDark})`, color: '#fff', display: 'flex', gap: 14, alignItems: 'center' }}>
        <Avatar name="Federico M." size={48} />
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: SPOTA.font.ui, fontSize: 12, opacity: 0.9 }}>Federico M. · {modalidad}</div>
          <div style={{ fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 18 }}>Fama 4.9 · 87 experiencias</div>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, padding: '14px 20px', background: SPOTA.c.bg }}>
        {[{ n: String(applied.size + 3), l: 'Postulaciones' }, { n: '2', l: 'Contratos' }, { n: '$48k', l: 'Mes' }].map(s => (
          <div key={s.l} style={{ padding: 12, background: SPOTA.c.surface, borderRadius: 12, border: `1px solid ${SPOTA.c.lineSoft}`, textAlign: 'center' }}>
            <div style={{ fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 18, color: SPOTA.c.text }}>{s.n}</div>
            <div style={{ fontFamily: SPOTA.font.ui, fontSize: 11, color: SPOTA.c.textSoft }}>{s.l}</div>
          </div>
        ))}
      </div>
      <div style={{ flex: 1, overflow: 'auto', padding: '0 20px 24px' }}>
        <SectionTitle>Ofertas en tu zona</SectionTitle>
        {offers.map(o => {
          const isApplied = applied.has(o.id);
          return (
            <button key={o.id} onClick={() => setSelected(o)} style={{
              width: '100%', textAlign: 'left', cursor: 'pointer',
              background: SPOTA.c.surface, borderRadius: 14, padding: 14, marginBottom: 10,
              border: `1.5px solid ${isApplied ? SPOTA.c.primary : SPOTA.c.lineSoft}`, boxShadow: SPOTA.shadow.card,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                <h3 style={{ margin: 0, fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 15, color: SPOTA.c.text }}>{o.title}</h3>
                {isApplied && <Tag kind="primary" icon="check">Postulado</Tag>}
              </div>
              <p style={{ margin: '2px 0 8px', fontFamily: SPOTA.font.ui, fontSize: 12.5, color: SPOTA.c.textSoft }}>
                por {o.user} · {o.date} · {o.people} personas
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10, borderTop: `1px solid ${SPOTA.c.lineSoft}` }}>
                <Tag kind="softG" icon="pin">{o.hood}</Tag>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontFamily: SPOTA.font.ui, fontSize: 10.5, color: SPOTA.c.textSoft, textTransform: 'uppercase', letterSpacing: 0.4 }}>Por persona</span>
                  <div style={{ fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 15, color: SPOTA.c.text }}>${o.budget.toLocaleString('es-AR')}</div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
      {selected && (
        <div onClick={close} style={{
          position: 'absolute', inset: 0, background: 'rgba(43,37,35,0.55)',
          display: 'flex', alignItems: 'flex-end', zIndex: 50,
        }}>
          <div onClick={(e) => e.stopPropagation()} style={{
            background: SPOTA.c.bg, width: '100%',
            borderTopLeftRadius: 22, borderTopRightRadius: 22,
            padding: '12px 22px 28px', maxHeight: '90%', overflow: 'auto',
            animation: 'slideUp 260ms cubic-bezier(.2,.8,.2,1)',
          }}>
            <div style={{ width: 40, height: 4, borderRadius: 999, background: SPOTA.c.line, margin: '0 auto 14px' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <Avatar name={selected.user} size={48} />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 15.5, color: SPOTA.c.text }}>{selected.user}</div>
                <div style={{ fontFamily: SPOTA.font.ui, fontSize: 12.5, color: SPOTA.c.textSoft }}>
                  Fama {selected.userFama} · Anfitrión de eventos
                </div>
              </div>
              <button onClick={close} style={{ width: 36, height: 36, borderRadius: 999, border: 'none', background: SPOTA.c.surface, cursor: 'pointer' }}>
                <Icon name="close" size={16} />
              </button>
            </div>
            <h2 style={{ margin: '0 0 8px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 19, color: SPOTA.c.text }}>{selected.title}</h2>
            <p style={{ margin: '0 0 16px', fontFamily: SPOTA.font.ui, fontSize: 13.5, color: SPOTA.c.text, lineHeight: 1.55 }}>{selected.desc}</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, marginBottom: 16 }}>
              {[
                { l: 'Fecha', v: selected.date, i: 'calendar' },
                { l: 'Horario', v: selected.time, i: 'clock' },
                { l: 'Zona', v: selected.hood, i: 'pin' },
                { l: 'Personas', v: String(selected.people), i: 'users' },
                { l: 'Presupuesto por persona', v: `$${selected.budget.toLocaleString('es-AR')}`, i: 'wallet' },
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
            <Btn variant={applied.has(selected.id) ? 'outline' : 'primary'} full size="lg" onClick={toggleApply}>
              {applied.has(selected.id) ? 'Retirar postulación' : 'Postularme'}
            </Btn>
            <p style={{ margin: '10px 0 0', fontFamily: SPOTA.font.ui, fontSize: 11.5, color: SPOTA.c.textMuted, textAlign: 'center' }}>
              Tu tarifa se hereda de tu perfil de host. Podés ajustarla desde "Ser host en Spota".
            </p>
          </div>
        </div>
      )}
      {toast && (
        <div style={{
          position: 'fixed', left: '50%', bottom: 110, transform: 'translateX(-50%)',
          background: SPOTA.c.text, color: SPOTA.c.bg,
          fontFamily: SPOTA.font.ui, fontSize: 13, fontWeight: 500,
          padding: '10px 18px', borderRadius: 999, boxShadow: SPOTA.shadow.lg,
          zIndex: 80, pointerEvents: 'none',
        }}>{toast}</div>
      )}
    </div>
  );
};

Object.assign(window, { ScreenCreateOffer, ScreenHireHost, ScreenHostMarketplace, ScreenRegisterHost, ScreenHostDashboard, PaywallVariantA });
