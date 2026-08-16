// ========================================================================
// 12-screens-business.jsx
// ========================================================================
// CU-19 a CU-23 — Negocios y Visibilidad

// CU-19 / CU-007-001: Reclamar perfil del lugar
const CLAIM_ROLES = ['Dueño', 'Socio', 'Apoderado', 'Gerente'];
const ScreenClaimPlace = ({ nav }) => {
  const [step, setStep] = React.useState(1);
  const [search, setSearch] = React.useState('Café Cobrand');
  const [selected, setSelected] = React.useState('p1');
  const [role, setRole] = React.useState('Dueño');
  const [cuit, setCuit] = React.useState('30-71234567-8');
  const [phone, setPhone] = React.useState('+54 11 5555-1234');
  const [fileName, setFileName] = React.useState(null);
  const fileRef = React.useRef(null);
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: SPOTA.c.bg }}>
      <AppHeader title="Reclamar mi lugar" leftIcon="arrowLeft" onLeft={() => nav('bizHome')} />
      <div style={{ flex: 1, overflow: 'auto', padding: 20 }}>
        {step === 1 && (
          <>
            <h1 style={{ margin: '0 0 6px', fontFamily: SPOTA.font.ui, fontSize: 22, fontWeight: 700, color: SPOTA.c.text, letterSpacing: -0.4 }}>Buscá tu negocio</h1>
            <p style={{ margin: '0 0 16px', fontFamily: SPOTA.font.ui, fontSize: 13.5, color: SPOTA.c.textSoft, lineHeight: 1.5 }}>Tu lugar ya puede estar en Spota porque la comunidad lo reseña. Reclamá la gestión.</p>
            <Field label="" placeholder="Nombre del negocio o dirección" icon="search" value={search} onChange={setSearch} />
            <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {PLACES.slice(0, 3).map(p => (
                <button key={p.id} onClick={() => setSelected(p.id)} style={{
                  display: 'flex', gap: 12, padding: 10, borderRadius: 12, alignItems: 'center',
                  background: selected === p.id ? SPOTA.c.primarySoft : SPOTA.c.surface,
                  border: `1.5px solid ${selected === p.id ? SPOTA.c.primary : SPOTA.c.lineSoft}`,
                  cursor: 'pointer', textAlign: 'left',
                }}>
                  <img src={photo(p.img, 200, 200)} style={{ width: 48, height: 48, borderRadius: 10, objectFit: 'cover' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: SPOTA.font.ui, fontWeight: 600, fontSize: 14, color: SPOTA.c.text }}>{p.name}</div>
                    <div style={{ fontFamily: SPOTA.font.ui, fontSize: 12, color: SPOTA.c.textSoft }}>{p.cat} · {p.hood} · {p.reviews} reseñas</div>
                  </div>
                  {selected === p.id && <Icon name="checkCircle" size={22} color={SPOTA.c.primary} />}
                </button>
              ))}
            </div>
            <div style={{ marginTop: 18 }}><Btn variant="primary" size="lg" full onClick={() => setStep(2)}>Reclamar este lugar</Btn></div>
          </>
        )}
        {step === 2 && (
          <>
            <h1 style={{ margin: '0 0 6px', fontFamily: SPOTA.font.ui, fontSize: 22, fontWeight: 700, color: SPOTA.c.text, letterSpacing: -0.4 }}>Verificá la titularidad</h1>
            <p style={{ margin: '0 0 18px', fontFamily: SPOTA.font.ui, fontSize: 13.5, color: SPOTA.c.textSoft, lineHeight: 1.5 }}>Spota va a verificar que sos el dueño. Tarda 24-48 hs.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Field label="CUIT del negocio (XX-XXXXXXXX-X)" value={cuit} onChange={setCuit} icon="briefcase" />
              <div>
                <div style={{ fontFamily: SPOTA.font.ui, fontWeight: 600, fontSize: 13, color: SPOTA.c.text, marginBottom: 6 }}>Tu rol en el lugar</div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {CLAIM_ROLES.map(r => <Chip key={r} active={role === r} onClick={() => setRole(r)}>{r}</Chip>)}
                </div>
              </div>
              <Field label="Teléfono comercial (+54 11 XXXX-XXXX)" value={phone} onChange={setPhone} />
            </div>
            <button onClick={() => fileRef.current && fileRef.current.click()} style={{
              marginTop: 16, padding: 14, borderRadius: 12, border: `1.5px dashed ${fileName ? SPOTA.c.primary : SPOTA.c.line}`,
              background: fileName ? SPOTA.c.primarySoft : SPOTA.c.surface, textAlign: 'center', width: '100%', cursor: 'pointer',
            }}>
              <Icon name={fileName ? 'checkCircle' : 'photo'} size={28} color={fileName ? SPOTA.c.primary : SPOTA.c.textSoft} />
              <p style={{ margin: '8px 0 4px', fontFamily: SPOTA.font.ui, fontWeight: 600, fontSize: 13.5, color: SPOTA.c.text }}>
                {fileName ? fileName : 'Subí un comprobante'}
              </p>
              <p style={{ margin: 0, fontFamily: SPOTA.font.ui, fontSize: 12, color: SPOTA.c.textSoft }}>
                {fileName ? 'Tocá para reemplazar' : 'Habilitación, factura, contrato'}
              </p>
              <input ref={fileRef} type="file" accept="image/*,application/pdf" onChange={(e) => e.target.files && e.target.files[0] && setFileName(e.target.files[0].name)} style={{ display: 'none' }} />
            </button>
            <div style={{ marginTop: 18 }}>
              <Btn variant="primary" size="lg" full disabled={!cuit || !phone || !fileName} onClick={() => nav('bizHome')}>Enviar para verificación</Btn>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// CU-007-002 §3.5 — Refactor a wizard de 4 secciones: identidad, dirección+padrón,
// facturación, medio de pago. Indicadores visuales de validación y cobro testigo.
const RUBROS = ['Gastronomía', 'Cultura', 'Bar', 'Espacio cultural', 'Otro'];
const IVA_OPTIONS = ['Responsable inscripto', 'Monotributista', 'Exento'];
const COMP_OPTIONS = ['Factura A', 'Factura B', 'Factura C'];
const ScreenRegisterBiz = ({ nav, params }) => {
  const backTarget = (params && params.from === 'login') ? 'login' : 'home';
  const [step, setStep] = React.useState(1);
  const totalSteps = 3;
  const [showPaywall, setShowPaywall] = React.useState(false);
  const [registered, setRegistered] = React.useState(false);
  const [form, setForm] = React.useState({
    razon: 'Café Cobrand', cuit: '30-71234567-8',
    calle: 'Honduras', numero: '4900', barrio: 'Palermo', ciudad: 'CABA',
    email: 'hola@cafecobrand.ar', pwd: '', rubro: 'Gastronomía',
    iva: 'Responsable inscripto', comprobante: 'Factura A', emailFact: 'admin@cafecobrand.ar',
    cardTipo: 'Tarjeta de crédito', cardNumero: '', cardVenc: '', cardCvv: '',
    accepted: false,
  });
  const set = (k, v) => setForm(s => ({ ...s, [k]: v }));
  const [validating, setValidating] = React.useState(false);
  const [validated, setValidated] = React.useState(false);
  const [testCharge, setTestCharge] = React.useState('pending'); // pending | running | ok
  const triggerValidate = () => {
    setValidating(true);
    setTimeout(() => { setValidating(false); setValidated(true); }, 900);
  };
  const triggerTest = () => {
    setTestCharge('running');
    setTimeout(() => setTestCharge('ok'), 1000);
  };
  const titleByStep = {
    1: 'Identidad del negocio',
    2: 'Dirección y titularidad',
    3: 'Datos de facturación',
  };
  if (registered) return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: SPOTA.c.bg }}>
      <AppHeader title="" leftIcon="arrowLeft" onLeft={() => nav('bizHome')} />
      <div style={{ flex: 1, overflow: 'auto', padding: 24, display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
        <div style={{ width: 76, height: 76, borderRadius: 999, background: SPOTA.c.primarySoft, margin: '0 auto 18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="mail" size={34} color={SPOTA.c.primary} />
        </div>
        <h1 style={{ margin: '0 0 8px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 22, color: SPOTA.c.text }}>Revisá tu email</h1>
        <p style={{ margin: '0 0 22px', fontFamily: SPOTA.font.ui, fontSize: 13.5, color: SPOTA.c.textSoft, lineHeight: 1.55 }}>
          Te enviamos un email a <strong style={{ color: SPOTA.c.text }}>{form.email}</strong> para verificar tu cuenta de negocio. Confirmá el enlace para activarla — el medio de pago ya quedó validado.
        </p>
        <Btn variant="primary" size="lg" full iconRight="arrowRight" onClick={() => nav('bizHome')}>Ya verifiqué, ir al panel</Btn>
      </div>
    </div>
  );
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: SPOTA.c.bg }}>
      <AppHeader title="" leftIcon="arrowLeft" onLeft={() => step > 1 ? setStep(step - 1) : nav(backTarget)} />
      <div style={{ flex: 1, overflow: 'auto', padding: '8px 24px 24px' }}>
        <SpotaLogo size={28} />
        <div style={{ marginTop: 4, display: 'inline-block', padding: '3px 8px', borderRadius: 999, background: SPOTA.c.primarySoft, fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 11, color: SPOTA.c.primary, letterSpacing: 0.4 }}>NEGOCIOS</div>
        <h1 style={{ margin: '14px 0 6px', fontFamily: SPOTA.font.ui, fontSize: 24, fontWeight: 700, color: SPOTA.c.text, letterSpacing: -0.5 }}>Sumá tu local a <span style={{ fontFamily: SPOTA.font.serif, fontStyle: 'italic', color: SPOTA.c.secondary, fontWeight: 400 }}>Spota</span></h1>
        <p style={{ margin: '0 0 14px', fontFamily: SPOTA.font.ui, fontSize: 13.5, color: SPOTA.c.textSoft, lineHeight: 1.45 }}>Configurá identidad, facturación y medio de pago — habilita Insights, beneficios y campañas desde el día uno.</p>
        <div style={{ display: 'flex', gap: 4, marginBottom: 14 }}>
          {[...Array(totalSteps)].map((_, i) => (
            <div key={i} style={{ flex: 1, height: 4, borderRadius: 999, background: i < step ? SPOTA.c.primary : SPOTA.c.line }} />
          ))}
        </div>
        <p style={{ margin: '0 0 4px', fontFamily: SPOTA.font.ui, fontSize: 12, fontWeight: 700, color: SPOTA.c.primary, letterSpacing: 0.4, textTransform: 'uppercase' }}>Paso {step} de {totalSteps}</p>
        <h2 style={{ margin: '0 0 14px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 18, color: SPOTA.c.text }}>{titleByStep[step]}</h2>

        {step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Field label="Razón social" value={form.razon} onChange={(v) => set('razon', v)} icon="briefcase" />
            <Field label="CUIT (XX-XXXXXXXX-X)" value={form.cuit} onChange={(v) => set('cuit', v)} />
            <Field label="Email comercial" type="email" value={form.email} onChange={(v) => set('email', v)} icon="mail" />
            <Field label="Contraseña (mínimo 8 caracteres)" type="password" value={form.pwd} onChange={(v) => set('pwd', v)} icon="lock" />
            <div>
              <div style={{ fontFamily: SPOTA.font.ui, fontWeight: 600, fontSize: 13, color: SPOTA.c.text, marginBottom: 6 }}>Rubro</div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {RUBROS.map(r => <Chip key={r} active={form.rubro === r} onClick={() => set('rubro', r)}>{r}</Chip>)}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Field label="Calle" value={form.calle} onChange={(v) => set('calle', v)} icon="pin" />
            <div style={{ display: 'flex', gap: 10 }}>
              <Field label="Número" value={form.numero} onChange={(v) => set('numero', v)} />
              <Field label="Barrio" value={form.barrio} onChange={(v) => set('barrio', v)} />
            </div>
            <Field label="Ciudad" value={form.ciudad} onChange={(v) => set('ciudad', v)} />
            <div style={{
              padding: 12, borderRadius: 12,
              background: validated ? SPOTA.c.primarySoft : SPOTA.c.surface,
              border: `1.5px solid ${validated ? SPOTA.c.primary : SPOTA.c.line}`,
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <Icon name={validated ? 'checkCircle' : 'shield'} size={20} color={validated ? SPOTA.c.primary : SPOTA.c.textSoft} />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 13.5, color: SPOTA.c.text }}>
                  {validating ? 'Validando contra padrón externo…' : validated ? 'Titularidad verificada' : 'Validación de titularidad'}
                </div>
                <div style={{ fontFamily: SPOTA.font.ui, fontSize: 11.5, color: SPOTA.c.textSoft }}>
                  Cruzamos CUIT + dirección con padrón externo.
                </div>
              </div>
              {!validating && !validated && (
                <Btn variant="outline" size="sm" onClick={triggerValidate}>Validar</Btn>
              )}
            </div>
          </div>
        )}

        {step === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div>
              <div style={{ fontFamily: SPOTA.font.ui, fontWeight: 600, fontSize: 13, color: SPOTA.c.text, marginBottom: 6 }}>Condición frente al IVA</div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {IVA_OPTIONS.map(o => <Chip key={o} active={form.iva === o} onClick={() => set('iva', o)}>{o}</Chip>)}
              </div>
            </div>
            <div>
              <div style={{ fontFamily: SPOTA.font.ui, fontWeight: 600, fontSize: 13, color: SPOTA.c.text, marginBottom: 6 }}>Tipo de comprobante a emitir</div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {COMP_OPTIONS.map(o => <Chip key={o} active={form.comprobante === o} onClick={() => set('comprobante', o)}>{o}</Chip>)}
              </div>
            </div>
            <Field label="Email para envío de comprobantes" type="email" value={form.emailFact} onChange={(v) => set('emailFact', v)} icon="mail" />
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginTop: 4, cursor: 'pointer' }}>
              <input type="checkbox" checked={form.accepted} onChange={(e) => set('accepted', e.target.checked)} style={{ marginTop: 2 }} />
              <span style={{ fontFamily: SPOTA.font.ui, fontSize: 12.5, color: SPOTA.c.textSoft, lineHeight: 1.5 }}>
                Acepto los <a style={{ color: SPOTA.c.primary, fontWeight: 600 }}>términos comerciales</a> y la <a style={{ color: SPOTA.c.primary, fontWeight: 600 }}>política de comisiones</a> de Spota Negocios.
              </span>
            </label>
          </div>
        )}

        <div style={{ marginTop: 22, display: 'flex', gap: 10 }}>
          <Btn variant="outline" full onClick={() => step > 1 ? setStep(step - 1) : nav('login')}>
            {step > 1 ? 'Atrás' : 'Cancelar'}
          </Btn>
          {step < totalSteps ? (
            <Btn variant="primary" full iconRight="arrowRight" disabled={step === 2 && !validated} onClick={() => setStep(step + 1)}>Continuar</Btn>
          ) : (
            <Btn variant="primary" full icon="wallet" disabled={!form.accepted} onClick={() => setShowPaywall(true)}>Continuar al pago</Btn>
          )}
        </div>
        <p style={{ marginTop: 18, fontFamily: SPOTA.font.ui, fontSize: 12.5, color: SPOTA.c.textSoft, textAlign: 'center' }}>¿Ya tenés cuenta? <a onClick={() => nav('login')} style={{ color: SPOTA.c.primary, fontWeight: 700, cursor: 'pointer' }}>Iniciar sesión</a></p>
      </div>
      {showPaywall && (
        <PaywallVariantA
          amount={1}
          subtitle="Validación del medio de pago para activar tu cuenta de negocio. Se cobra y reembolsa $1."
          ctaLabel="Validar y activar"
          onCancel={() => setShowPaywall(false)}
          onConfirm={() => { setShowPaywall(false); setRegistered(true); }}
        />
      )}
    </div>
  );
};

// Biz home / dashboard root
const ScreenBizHome = ({ nav }) => {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: SPOTA.c.bg }}>
      <div style={{ padding: '14px 20px', background: SPOTA.c.text, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Icon name="pinFill" size={22} color={SPOTA.c.accent} />
          <span style={{ fontFamily: SPOTA.font.ui, fontWeight: 800, fontSize: 18 }}>Spota</span>
          <span style={{ padding: '2px 7px', borderRadius: 999, background: SPOTA.c.accent, color: SPOTA.c.text, fontFamily: SPOTA.font.ui, fontSize: 10, fontWeight: 700, letterSpacing: 0.4 }}>NEGOCIOS</span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => nav('home')} title="Cambiar a vista de usuario" style={{ height: 36, padding: '0 12px', borderRadius: 999, border: '1px solid rgba(255,255,255,0.28)', background: 'transparent', color: '#fff', cursor: 'pointer', fontFamily: SPOTA.font.ui, fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}><Icon name="compass" size={14} color="#fff" />Vista usuario</button>
          <button onClick={() => nav('login')} title="Cerrar sesión" style={{ width: 36, height: 36, borderRadius: 999, border: 'none', background: 'rgba(255,255,255,0.12)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="logout" size={16} color="#fff" /></button>
        </div>
      </div>
      <div style={{ flex: 1, overflow: 'auto', padding: 20 }}>
        <div style={{ background: SPOTA.c.surface, borderRadius: 16, padding: 14, marginBottom: 16, border: `1px solid ${SPOTA.c.lineSoft}`, display: 'flex', alignItems: 'center', gap: 12 }}>
          <img src={photo('cafePalermo', 200, 200)} style={{ width: 56, height: 56, borderRadius: 12, objectFit: 'cover' }} />
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <h2 style={{ margin: 0, fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 16, color: SPOTA.c.text }}>Café Cobrand</h2>
              <Tag kind="primary" icon="verify" style={{ padding: '2px 6px', fontSize: 10 }}>Verificado</Tag>
            </div>
            <div style={{ fontFamily: SPOTA.font.ui, fontSize: 12.5, color: SPOTA.c.textSoft, marginTop: 2 }}>Cafetería · Palermo</div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, marginBottom: 16 }}>
          {[{ n: '1.4k', l: 'Vistas/mes', c: SPOTA.c.primary }, { n: '312', l: 'Reseñas', c: SPOTA.c.secondary }, { n: '4.8', l: 'Fama Score', c: SPOTA.c.accent }, { n: '$48k', l: 'Tráfico generado', c: SPOTA.c.primary }].map(s => (
            <div key={s.l} style={{ padding: 14, background: SPOTA.c.surface, borderRadius: 12, border: `1px solid ${SPOTA.c.lineSoft}` }}>
              <div style={{ fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 22, color: s.c }}>{s.n}</div>
              <div style={{ fontFamily: SPOTA.font.ui, fontSize: 12, color: SPOTA.c.textSoft }}>{s.l}</div>
            </div>
          ))}
        </div>
        <SectionTitle>Herramientas</SectionTitle>
        {[
          { id: 'bizBenefits', t: 'Beneficios exclusivos', s: '3 activos', i: 'gift', c: SPOTA.c.secondary },
          { id: 'bizCampaign', t: 'Campañas publicitarias', s: '1 corriendo · $4.200 invertido', i: 'megaphone', c: SPOTA.c.primary },
          { id: 'bizInsights', t: 'Insights de tu zona', s: 'Datos agregados de Palermo', i: 'stats', c: SPOTA.c.accent },
          { id: 'bizSubscribe', t: 'Suscribirse a Tier', s: 'Reportes ilimitados · Mensual o Anual', i: 'sparkles', c: SPOTA.c.primary },
          { id: 'claimPlace', t: 'Reclamar otro lugar', s: 'Sumar otra sucursal', i: 'plus', c: SPOTA.c.text },
        ].map(o => (
          <button key={o.id} onClick={() => nav(o.id)} style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: 14, padding: 14, marginBottom: 8,
            background: SPOTA.c.surface, borderRadius: 14, border: `1px solid ${SPOTA.c.lineSoft}`,
            cursor: 'pointer', textAlign: 'left',
          }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: o.c + '22', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name={o.i} size={20} color={o.c} /></div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 14.5, color: SPOTA.c.text }}>{o.t}</div>
              <div style={{ fontFamily: SPOTA.font.ui, fontSize: 12.5, color: SPOTA.c.textSoft, marginTop: 2 }}>{o.s}</div>
            </div>
            <Icon name="arrowRight" size={18} color={SPOTA.c.textSoft} />
          </button>
        ))}
      </div>
    </div>
  );
};

// CU-21 / CU-007-003: Gestionar beneficios exclusivos. Formulario estructurado en
// secuencia de pasos para reducir carga cognitiva (decisión §3.26 rehecho).
const BENEFIT_DAYS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
const BENEFIT_PAYMENT = ['Efectivo', 'Tarjeta de crédito', 'Tarjeta de débito', 'QR', 'Transferencia bancaria'];
const BENEFIT_TYPES = ['Descuento', 'Cortesía', 'Promo Nx1', 'Combo especial', 'Acceso preferencial'];
const COURTESY_ITEMS = ['Bebida', 'Postre', 'Entrada', 'Comida principal', 'Acompañamiento', 'Otro'];
const ACCESS_TYPES = ['Reserva sin cargo', 'Mesa preferencial', 'Fila prioritaria', 'Otro'];
const ScreenBizBenefits = ({ nav }) => {
  const [editing, setEditing] = React.useState(false);
  const [step, setStep] = React.useState(1);
  const [form, setForm] = React.useState({
    tipo: 'Descuento', titulo: '',
    descPct: '', descTope: '',
    cortesiaItem: 'Bebida',
    promoN: '2', promoItem: 'Bebida',
    comboDesc: '',
    accesoTipo: 'Reserva sin cargo',
    desde: '', hasta: '', sinVencimiento: false,
    dias: ['Lun','Mar','Mié','Jue','Vie'],
    horaDesde: '', horaHasta: '',
    minimo: '',
    medios: ['Efectivo','Tarjeta de débito'],
    cupo: '1',
    terminos: '',
  });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const togDia = (d) => set('dias', form.dias.includes(d) ? form.dias.filter(x => x !== d) : [...form.dias, d]);
  const togMedio = (m) => set('medios', form.medios.includes(m) ? form.medios.filter(x => x !== m) : [...form.medios, m]);
  const close = () => { setEditing(false); setStep(1); };
  const totalSteps = 5;
  // P3-40: lista de beneficios como estado para que trash elimine y edit ofrezca feedback.
  const [benefits, setBenefits] = React.useState([
    { id: 'b1', t: '15% off en café de filtro', cond: 'De lunes a jueves de 9 a 13', vence: 'Vigente · 8 usos esta semana', active: true },
    { id: 'b2', t: 'Postre cortesía con almuerzo', cond: 'Mostrar el código en la app', vence: 'Vigente · 3 usos esta semana', active: true },
    { id: 'b3', t: 'Menú degustación 2x1', cond: 'Sólo con cupo previo coordinado', vence: 'Pausado', active: false },
  ]);
  const [toast, setToast] = React.useState(null);
  const ping = (msg) => {
    setToast(msg);
    window.setTimeout(() => setToast(t => t === msg ? null : t), 1800);
  };
  const removeBenefit = (id) => {
    if (window.confirm('¿Eliminar este beneficio? La acción no se puede deshacer.')) {
      setBenefits(list => list.filter(b => b.id !== id));
      ping('Beneficio eliminado');
    }
  };
  const editBenefit = () => {
    setEditing(true);
    setStep(1);
  };
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: SPOTA.c.bg }}>
      <AppHeader title="Beneficios exclusivos" leftIcon="arrowLeft" onLeft={() => editing ? close() : nav('bizHome')} rightIcon={editing ? null : 'plus'} onRight={() => setEditing(true)} />
      <div style={{ flex: 1, overflow: 'auto', padding: 20 }}>
        {editing ? (
          <>
            {/* Stepper */}
            <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
              {[...Array(totalSteps)].map((_, i) => (
                <div key={i} style={{ flex: 1, height: 4, borderRadius: 999, background: i < step ? SPOTA.c.primary : SPOTA.c.line }} />
              ))}
            </div>
            <p style={{ margin: '0 0 4px', fontFamily: SPOTA.font.ui, fontSize: 12, fontWeight: 700, color: SPOTA.c.primary, letterSpacing: 0.4, textTransform: 'uppercase' }}>
              Paso {step} de {totalSteps}
            </p>
            <h2 style={{ margin: '0 0 14px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 19, color: SPOTA.c.text }}>
              {step === 1 && 'Tipo y título'}
              {step === 2 && 'Datos económicos'}
              {step === 3 && 'Vigencia y días aplicables'}
              {step === 4 && 'Condiciones de uso'}
              {step === 5 && 'Cupo y términos'}
            </h2>

            {step === 1 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div>
                  <div style={{ fontFamily: SPOTA.font.ui, fontWeight: 600, fontSize: 13, color: SPOTA.c.text, marginBottom: 6 }}>Tipo de beneficio</div>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {BENEFIT_TYPES.map(t => (
                      <Chip key={t} active={form.tipo === t} onClick={() => set('tipo', t)}>{t}</Chip>
                    ))}
                  </div>
                </div>
                <Field label="Título" placeholder="Ej. 15% off en café de filtro" value={form.titulo} onChange={(v) => set('titulo', v)} />
              </div>
            )}

            {step === 2 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {form.tipo === 'Descuento' && (
                  <>
                    <Field label="Porcentaje de descuento (1-100)" placeholder="15" value={form.descPct} onChange={(v) => set('descPct', v)} />
                    <Field label="Tope máximo (opcional, $#######)" placeholder="$5.000" value={form.descTope} onChange={(v) => set('descTope', v)} />
                  </>
                )}
                {form.tipo === 'Cortesía' && (
                  <div>
                    <div style={{ fontFamily: SPOTA.font.ui, fontWeight: 600, fontSize: 13, color: SPOTA.c.text, marginBottom: 6 }}>Categoría del ítem ofrecido</div>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      {COURTESY_ITEMS.map(t => (
                        <Chip key={t} active={form.cortesiaItem === t} onClick={() => set('cortesiaItem', t)}>{t}</Chip>
                      ))}
                    </div>
                  </div>
                )}
                {form.tipo === 'Promo Nx1' && (
                  <>
                    <Field label="N en paga 1 lleva N (2-5)" placeholder="2" value={form.promoN} onChange={(v) => set('promoN', v)} />
                    <div>
                      <div style={{ fontFamily: SPOTA.font.ui, fontWeight: 600, fontSize: 13, color: SPOTA.c.text, marginBottom: 6 }}>Categoría del ítem</div>
                      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                        {COURTESY_ITEMS.filter(x => x !== 'Acompañamiento').map(t => (
                          <Chip key={t} active={form.promoItem === t} onClick={() => set('promoItem', t)}>{t}</Chip>
                        ))}
                      </div>
                    </div>
                  </>
                )}
                {form.tipo === 'Combo especial' && (
                  <Field label="Descripción del combo (máx 100 car.)" placeholder="Bowl + bebida + postre $4.500" value={form.comboDesc} onChange={(v) => set('comboDesc', v)} />
                )}
                {form.tipo === 'Acceso preferencial' && (
                  <div>
                    <div style={{ fontFamily: SPOTA.font.ui, fontWeight: 600, fontSize: 13, color: SPOTA.c.text, marginBottom: 6 }}>Tipo de acceso</div>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      {ACCESS_TYPES.map(t => (
                        <Chip key={t} active={form.accesoTipo === t} onClick={() => set('accesoTipo', t)}>{t}</Chip>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {step === 3 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <Field label="Vigencia desde (DD/MM/AAAA)" placeholder="17/05/2026" value={form.desde} onChange={(v) => set('desde', v)} icon="calendar" />
                <Field label="Vigencia hasta (DD/MM/AAAA)" placeholder="31/05/2026" value={form.sinVencimiento ? '' : form.hasta} onChange={(v) => set('hasta', v)} icon="calendar" />
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                  <input type="checkbox" checked={form.sinVencimiento} onChange={(e) => set('sinVencimiento', e.target.checked)} />
                  <span style={{ fontFamily: SPOTA.font.ui, fontSize: 13, color: SPOTA.c.text }}>Sin vencimiento</span>
                </label>
                <div>
                  <div style={{ fontFamily: SPOTA.font.ui, fontWeight: 600, fontSize: 13, color: SPOTA.c.text, marginBottom: 6 }}>Días aplicables</div>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {BENEFIT_DAYS.map(d => (
                      <Chip key={d} active={form.dias.includes(d)} onClick={() => togDia(d)}>{d}</Chip>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'flex', gap: 10 }}>
                  <Field label="Horario desde (HH:MM, opcional)" placeholder="09:00" value={form.horaDesde} onChange={(v) => set('horaDesde', v)} icon="clock" />
                  <Field label="Horario hasta (HH:MM, opcional)" placeholder="13:00" value={form.horaHasta} onChange={(v) => set('horaHasta', v)} icon="clock" />
                </div>
                <Field label="Monto mínimo de consumo (opcional, $#######)" placeholder="$3.500" value={form.minimo} onChange={(v) => set('minimo', v)} />
                <div>
                  <div style={{ fontFamily: SPOTA.font.ui, fontWeight: 600, fontSize: 13, color: SPOTA.c.text, marginBottom: 6 }}>Medios de pago aceptados</div>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {BENEFIT_PAYMENT.map(m => (
                      <Chip key={m} active={form.medios.includes(m)} onClick={() => togMedio(m)}>{m}</Chip>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 5 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div>
                  <div style={{ fontFamily: SPOTA.font.ui, fontWeight: 600, fontSize: 13, color: SPOTA.c.text, marginBottom: 6 }}>Cupo por usuario</div>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {['1','3','5','Sin límite'].map(c => (
                      <Chip key={c} active={form.cupo === c} onClick={() => set('cupo', c)}>{c}</Chip>
                    ))}
                  </div>
                </div>
                <Field label="Términos adicionales (texto libre, máx 200, opcional)" placeholder="No acumulable con otras promos." value={form.terminos} onChange={(v) => set('terminos', v)} />
              </div>
            )}

            <div style={{ marginTop: 22, display: 'flex', gap: 10 }}>
              <Btn variant="outline" full onClick={() => step > 1 ? setStep(step - 1) : close()}>
                {step > 1 ? 'Atrás' : 'Cancelar'}
              </Btn>
              {step < totalSteps ? (
                <Btn variant="primary" full iconRight="arrowRight" onClick={() => setStep(step + 1)}>Continuar</Btn>
              ) : (
                <Btn variant="primary" full icon="check" onClick={close}>Crear</Btn>
              )}
            </div>
          </>
        ) : (
          benefits.map(b => (
            <div key={b.id} style={{ background: SPOTA.c.surface, borderRadius: 14, padding: 14, marginBottom: 10, border: `1px solid ${SPOTA.c.lineSoft}`, opacity: b.active ? 1 : 0.6 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                <h3 style={{ margin: 0, fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 15, color: SPOTA.c.text }}>{b.t}</h3>
                <Tag kind={b.active ? 'softG' : 'soft'} icon={b.active ? 'check' : 'clock'}>{b.active ? 'Activo' : 'Pausado'}</Tag>
              </div>
              <p style={{ margin: '0 0 10px', fontFamily: SPOTA.font.ui, fontSize: 13, color: SPOTA.c.textSoft, lineHeight: 1.5 }}>{b.cond}</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 10, borderTop: `1px solid ${SPOTA.c.lineSoft}` }}>
                <span style={{ fontFamily: SPOTA.font.ui, fontSize: 12, color: SPOTA.c.textSoft }}>{b.vence}</span>
                <div style={{ display: 'flex', gap: 4 }}>
                  <button onClick={editBenefit} title="Editar beneficio"
                    style={{ width: 32, height: 32, borderRadius: 8, border: 'none', background: 'transparent', cursor: 'pointer' }}>
                    <Icon name="edit" size={15} color={SPOTA.c.textSoft} />
                  </button>
                  <button onClick={() => removeBenefit(b.id)} title="Eliminar beneficio"
                    style={{ width: 32, height: 32, borderRadius: 8, border: 'none', background: 'transparent', cursor: 'pointer' }}>
                    <Icon name="trash" size={15} color={SPOTA.c.textSoft} />
                  </button>
                </div>
              </div>
            </div>
          ))
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

// CU-22 / CU-007-004 §3.10: Refactor con campo nombre, set unificado con Insights,
// formato del aviso y paywall Variante B inline antes de lanzar.
const CAMPAIGN_FORMATS = ['Card destacada en feed', 'Banner superior'];
const ScreenBizCampaign = ({ nav }) => {
  const [name, setName] = React.useState('');
  const [budget, setBudget] = React.useState(8000);
  const [days, setDays] = React.useState(14);
  const [audience, setAudience] = React.useState(['Café', 'Arte y cultura']);
  const [format, setFormat] = React.useState('Card destacada en feed');
  const [showPaywall, setShowPaywall] = React.useState(false);
  const [showCardPaywall, setShowCardPaywall] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const tog = (v) => setAudience(a => a.includes(v) ? a.filter(x => x !== v) : [...a, v]);
  const reach = Math.round((budget / 50) + (days * 18));
  const launchReady = name && audience.length > 0;
  if (done) {
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: SPOTA.c.bg }}>
        <AppHeader title="Campaña activa" />
        <div style={{ flex: 1, padding: 24, textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
          <div style={{ width: 80, height: 80, borderRadius: 999, background: SPOTA.c.primarySoft, margin: '20px auto 18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="megaphone" size={36} color={SPOTA.c.primary} />
          </div>
          <h1 style={{ margin: '0 0 8px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 22, color: SPOTA.c.text }}>"{name}" está corriendo</h1>
          <p style={{ margin: '0 0 22px', fontFamily: SPOTA.font.ui, fontSize: 14, color: SPOTA.c.textSoft, lineHeight: 1.5 }}>
            Cobramos ${budget.toLocaleString('es-AR')} por adelantado. Corre hasta consumir el presupuesto o cumplir {days} días.
          </p>
          <Btn variant="primary" size="lg" full onClick={() => nav('bizHome')}>Volver al panel</Btn>
        </div>
      </div>
    );
  }
  return (
    <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', background: SPOTA.c.bg, position: 'relative' }}>
      <AppHeader title="Nueva campaña" leftIcon="arrowLeft" onLeft={() => nav('bizHome')} />
      <div style={{ flex: 1, minHeight: 0, overflow: 'auto', padding: 20 }}>
        <div style={{ background: SPOTA.c.surface, borderRadius: 14, padding: 14, marginBottom: 14, border: `1px solid ${SPOTA.c.lineSoft}` }}>
          <Field label="Nombre de la campaña (máx 60 caracteres)" placeholder="Café de filtro · invierno" value={name} onChange={(v) => setName(v.slice(0, 60))} icon="megaphone" />
        </div>
        <div style={{ background: SPOTA.c.surface, borderRadius: 14, padding: 14, marginBottom: 14, border: `1px solid ${SPOTA.c.lineSoft}` }}>
          <h3 style={{ margin: '0 0 6px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 14, color: SPOTA.c.text }}>Segmento de afinidad</h3>
          <p style={{ margin: '0 0 10px', fontFamily: SPOTA.font.ui, fontSize: 12.5, color: SPOTA.c.textSoft }}>Llegás a usuarios con afinidad a:</p>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {ACTIVITY_OPTIONS.filter(a => a !== 'Todas').map(t => (
              <Chip key={t} active={audience.includes(t)} onClick={() => tog(t)}>{t}</Chip>
            ))}
          </div>
        </div>
        <div style={{ background: SPOTA.c.surface, borderRadius: 14, padding: 14, marginBottom: 14, border: `1px solid ${SPOTA.c.lineSoft}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <h3 style={{ margin: 0, fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 14, color: SPOTA.c.text }}>Presupuesto total</h3>
            <span style={{ fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 17, color: SPOTA.c.primary }}>${budget.toLocaleString('es-AR')}</span>
          </div>
          <input type="range" min="2000" max="50000" step="500" value={budget} onChange={(e) => setBudget(+e.target.value)} style={{ width: '100%', accentColor: SPOTA.c.primary }} />
        </div>
        <div style={{ background: SPOTA.c.surface, borderRadius: 14, padding: 14, marginBottom: 14, border: `1px solid ${SPOTA.c.lineSoft}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <h3 style={{ margin: 0, fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 14, color: SPOTA.c.text }}>Duración</h3>
            <span style={{ fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 17, color: SPOTA.c.primary }}>{days} días</span>
          </div>
          <input type="range" min="3" max="60" value={days} onChange={(e) => setDays(+e.target.value)} style={{ width: '100%', accentColor: SPOTA.c.primary }} />
        </div>
        <div style={{ background: SPOTA.c.surface, borderRadius: 14, padding: 14, marginBottom: 14, border: `1px solid ${SPOTA.c.lineSoft}` }}>
          <h3 style={{ margin: '0 0 8px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 14, color: SPOTA.c.text }}>Formato del aviso</h3>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {CAMPAIGN_FORMATS.map(f => <Chip key={f} active={format === f} onClick={() => setFormat(f)}>{f}</Chip>)}
          </div>
        </div>
        <div style={{ background: SPOTA.c.primarySoft, borderRadius: 14, padding: 14, marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <Icon name="sparkles" size={16} color={SPOTA.c.primary} />
            <h3 style={{ margin: 0, fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 14, color: SPOTA.c.primaryDark }}>Alcance estimado</h3>
          </div>
          <p style={{ margin: 0, fontFamily: SPOTA.font.ui, fontSize: 13, color: SPOTA.c.primaryDark }}><strong>{reach.toLocaleString('es-AR')}</strong> impresiones · ~{Math.round(reach * 0.04)} interacciones</p>
        </div>
        <div style={{ background: SPOTA.c.surface, borderRadius: 14, padding: 12, marginBottom: 16, border: `1px dashed ${SPOTA.c.line}` }}>
          <p style={{ margin: '0 0 8px', fontFamily: SPOTA.font.ui, fontSize: 12, fontWeight: 600, color: SPOTA.c.textSoft, textTransform: 'uppercase', letterSpacing: 0.4 }}>Vista previa · {format}</p>
          <PlaceCard place={{ ...PLACES[0], tag: 'Patrocinado' }} density="cozy" famaVariant="classic" onClick={() => {}} />
        </div>

        <Btn variant="primary" size="lg" full disabled={!launchReady} icon="check" onClick={() => setShowCardPaywall(true)}>Lanzar campaña</Btn>
      </div>

      {showCardPaywall && (
        <PaywallVariantA
          amount={budget}
          savedMedio={{ tipo: 'Tarjeta de crédito', last4: '4821', note: 'Configurada en el registro del negocio.' }}
          chargeNote={'Cobramos $' + budget.toLocaleString('es-AR') + ' por adelantado al lanzar.'}
          subtitle={<>Campaña "{name}" · <strong style={{ color: SPOTA.c.text }}>${budget.toLocaleString('es-AR')}</strong> · {days} días.</>}
          ctaLabel="Cobrar y lanzar"
          onCancel={() => setShowCardPaywall(false)}
          onConfirm={() => { setShowCardPaywall(false); setDone(true); }}
        />
      )}
    </div>
  );
};

// CU-007-005 §3.8 — Pantalla previa de filtros obligatorios (Período / Actividad /
// Segmento / Comparativa). Sin filtros con valor no se puede ejecutar.
const INSIGHTS_PERIODS = ['7 días', '30 días', '90 días', 'Personalizado'];
const INSIGHTS_SEGMENTS = ['18-24 años', '25-34 años', '35-44 años', '45+ años', 'Todas las edades'];
const INSIGHTS_COMPARE = ['Sin comparar', 'vs período anterior', 'vs promedio de zona'];
const REPORT_PRICE = 4900;
const ScreenBizInsights = ({ nav, params }) => {
  const [period, setPeriod] = React.useState(null);
  const [customFrom, setCustomFrom] = React.useState('');
  const [customTo, setCustomTo] = React.useState('');
  const [activity, setActivity] = React.useState(null);
  const [segment, setSegment] = React.useState(null);
  const [compare, setCompare] = React.useState(null);
  const [showCharge, setShowCharge] = React.useState(false);
  // Modalidad del negocio: One-off (default) o Tier vigente. Toggle para verlo en el prototipo.
  const [tier, setTier] = React.useState(false);
  const ready = period && activity && segment && compare && (period !== 'Personalizado' || (customFrom && customTo));

  const execute = () => {
    if (tier) {
      nav('bizInsightsResult', { period, activity, segment, compare, customFrom, customTo, tier: true });
    } else {
      setShowCharge(true);
    }
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: SPOTA.c.bg }}>
      <AppHeader title="Nuevo reporte" leftIcon="arrowLeft" onLeft={() => nav('bizHome')} />
      <div style={{ flex: 1, overflow: 'auto', padding: 20 }}>
        <p style={{ margin: '0 0 14px', fontFamily: SPOTA.font.ui, fontSize: 13.5, color: SPOTA.c.textSoft, lineHeight: 1.5 }}>
          Insights es una herramienta de consulta paga. Definí los filtros y ejecutá para obtener el reporte.
        </p>
        {/* Toggle visual de modalidad solo para el prototipo */}
        <div style={{ background: SPOTA.c.surface, padding: 10, borderRadius: 12, marginBottom: 14, border: `1px solid ${SPOTA.c.lineSoft}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontFamily: SPOTA.font.ui, fontSize: 12.5, color: SPOTA.c.textSoft }}>Modalidad: <strong style={{ color: SPOTA.c.text }}>{tier ? 'Tier vigente' : 'One-off'}</strong></span>
          <button onClick={() => setTier(!tier)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 12, color: SPOTA.c.primary }}>
            Simular {tier ? 'One-off' : 'Tier'}
          </button>
        </div>

        <h3 style={{ margin: '0 0 8px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 14.5, color: SPOTA.c.text }}>Período</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
          {INSIGHTS_PERIODS.map(o => <Chip key={o} active={period === o} onClick={() => setPeriod(o)}>{o}</Chip>)}
        </div>
        {period === 'Personalizado' && (
          <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
            <Field label="Desde (DD/MM/AAAA)" value={customFrom} placeholder="01/05/2026" onChange={setCustomFrom} icon="calendar" />
            <Field label="Hasta (DD/MM/AAAA)" value={customTo} placeholder="31/05/2026" onChange={setCustomTo} icon="calendar" />
          </div>
        )}

        <h3 style={{ margin: '0 0 8px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 14.5, color: SPOTA.c.text }}>Tipo de actividad</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
          {ACTIVITY_OPTIONS.filter(a => a !== 'Todas').map(o => <Chip key={o} active={activity === o} onClick={() => setActivity(o)}>{o}</Chip>)}
        </div>

        <h3 style={{ margin: '0 0 8px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 14.5, color: SPOTA.c.text }}>Segmento de audiencia</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
          {INSIGHTS_SEGMENTS.map(o => <Chip key={o} active={segment === o} onClick={() => setSegment(o)}>{o}</Chip>)}
        </div>

        <h3 style={{ margin: '0 0 8px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 14.5, color: SPOTA.c.text }}>Comparativa</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 22 }}>
          {INSIGHTS_COMPARE.map(o => <Chip key={o} active={compare === o} onClick={() => setCompare(o)}>{o}</Chip>)}
        </div>

        <div style={{ marginTop: 'auto' }}>
          <Btn variant="primary" size="lg" full disabled={!ready} onClick={execute}>
            {tier ? 'Ejecutar reporte (sin cargo)' : `Ejecutar reporte · $${REPORT_PRICE.toLocaleString('es-AR')}`}
          </Btn>
          {!ready && (
            <p style={{ margin: '10px 0 0', fontFamily: SPOTA.font.ui, fontSize: 12, color: SPOTA.c.textMuted, textAlign: 'center' }}>
              Elegí los cuatro selectores para continuar.
            </p>
          )}
        </div>
      </div>
      {showCharge && (
        <PaywallVariantA
          amount={REPORT_PRICE}
          savedMedio={{ tipo: 'Visa', last4: '4821', note: 'Configurada en el registro del negocio.' }}
          chargeNote={'Cobramos $' + REPORT_PRICE.toLocaleString('es-AR') + ' por este reporte (modalidad One-off). Pasá a Tier para reportes ilimitados.'}
          subtitle={<>Cobro del reporte de insights · <strong style={{ color: SPOTA.c.text }}>${REPORT_PRICE.toLocaleString('es-AR')}</strong> (One-off).</>}
          ctaLabel="Confirmar y ejecutar"
          onCancel={() => setShowCharge(false)}
          onConfirm={() => {
            setShowCharge(false);
            nav('bizInsightsResult', { period, activity, segment, compare, customFrom, customTo, tier: false });
          }}
        />
      )}
    </div>
  );
};

// CU-007-005 §3.8 — Modal de cobro al ejecutar reporte (One-off). Solo aparece
// si la modalidad es One-off; Tier vigente libera sin modal.
const InsightsChargeModal = ({ price, onClose, onConfirm, onChangeCard }) => (
  <div onClick={onClose} style={{
    position: 'absolute', inset: 0, background: 'rgba(43,37,35,0.55)',
    display: 'flex', alignItems: 'flex-end', zIndex: 80,
  }}>
    <div onClick={(e) => e.stopPropagation()} style={{
      background: SPOTA.c.bg, width: '100%',
      borderTopLeftRadius: 22, borderTopRightRadius: 22,
      padding: '14px 22px 26px',
      animation: 'slideUp 260ms cubic-bezier(.2,.8,.2,1)',
    }}>
      <div style={{ width: 40, height: 4, borderRadius: 999, background: SPOTA.c.line, margin: '0 auto 14px' }} />
      <h2 style={{ margin: '0 0 6px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 20, color: SPOTA.c.text }}>Cobro del reporte</h2>
      <p style={{ margin: '0 0 16px', fontFamily: SPOTA.font.ui, fontSize: 13.5, color: SPOTA.c.textSoft, lineHeight: 1.5 }}>
        Modalidad One-off: se cobra por reporte. Pasá a Tier para liberar reportes ilimitados.
      </p>
      <div style={{ padding: 14, background: SPOTA.c.surface, borderRadius: 12, marginBottom: 12, border: `1px solid ${SPOTA.c.lineSoft}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <span style={{ fontFamily: SPOTA.font.ui, fontSize: 13, color: SPOTA.c.textSoft }}>Importe</span>
          <span style={{ fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 22, color: SPOTA.c.primary }}>${price.toLocaleString('es-AR')}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 8, borderTop: `1px solid ${SPOTA.c.lineSoft}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Icon name="wallet" size={16} color={SPOTA.c.primary} />
            <span style={{ fontFamily: SPOTA.font.ui, fontSize: 13, color: SPOTA.c.text }}>Visa •••• 4821</span>
          </div>
          <button onClick={onChangeCard} style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 12.5, color: SPOTA.c.primary }}>Cambiar medio</button>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
        <Btn variant="outline" full onClick={onClose}>Cancelar</Btn>
        <Btn variant="primary" full onClick={onConfirm} icon="check">Confirmar y ejecutar</Btn>
      </div>
    </div>
  </div>
);

// CU-007-005 §3.8 — Pantalla de resultado del reporte ejecutado.
const ScreenBizInsightsResult = ({ nav, params }) => {
  const p = params || {};
  const cmp = p.compare && p.compare !== 'Sin comparar' ? p.compare : null;
  const sub = `${p.period === 'Personalizado' ? `${p.customFrom} - ${p.customTo}` : (p.period || '—')} · ${p.activity || '—'} · ${p.segment || '—'}`;
  // P3-39: satélites con feedback efímero.
  const [toast, setToast] = React.useState(null);
  const ping = (msg) => {
    setToast(msg);
    window.setTimeout(() => setToast(t => t === msg ? null : t), 1800);
  };
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: SPOTA.c.bg, position: 'relative' }}>
      <AppHeader title="Reporte" leftIcon="arrowLeft" onLeft={() => nav('bizInsights')} />
      <div style={{ flex: 1, overflow: 'auto', padding: 20 }}>
        <div style={{ padding: '12px 14px', background: SPOTA.c.primarySoft, borderRadius: 12, marginBottom: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ margin: 0, fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 14.5, color: SPOTA.c.primaryDark }}>Reporte ejecutado</h3>
              <p style={{ margin: '2px 0 0', fontFamily: SPOTA.font.ui, fontSize: 12.5, color: SPOTA.c.primaryDark }}>{sub}</p>
            </div>
            <Tag kind="primary" icon={p.tier ? 'sparkles' : 'wallet'}>{p.tier ? 'Tier' : 'One-off'}</Tag>
          </div>
        </div>

        <div style={{ background: SPOTA.c.surface, borderRadius: 14, padding: 16, marginBottom: 12, border: `1px solid ${SPOTA.c.lineSoft}` }}>
          <h3 style={{ margin: '0 0 12px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 15, color: SPOTA.c.text }}>Tráfico por día</h3>
          <svg width="100%" height="120" viewBox="0 0 320 120">
            {[40, 65, 50, 80, 70, 95, 110, 90, 105, 75, 85, 100, 115, 95].map((h, i) => (
              <rect key={i} x={i * 22 + 4} y={120 - h} width="14" height={h} rx="3" fill={i === 12 ? SPOTA.c.secondary : SPOTA.c.primary} opacity={i === 12 ? 1 : 0.7} />
            ))}
          </svg>
        </div>

        <div style={{ background: SPOTA.c.surface, borderRadius: 14, padding: 16, marginBottom: 12, border: `1px solid ${SPOTA.c.lineSoft}` }}>
          <h3 style={{ margin: '0 0 8px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 15, color: SPOTA.c.text }}>Tendencias en zona</h3>
          {[{ t: 'café de especialidad', g: '+34%' }, { t: 'brunch dominical', g: '+22%' }, { t: 'after office', g: '+18%' }, { t: 'plan económico', g: '+12%' }].map(t => (
            <div key={t.t} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderTop: `1px solid ${SPOTA.c.lineSoft}` }}>
              <span style={{ fontFamily: SPOTA.font.ui, fontSize: 13.5, color: SPOTA.c.text }}>"{t.t}"</span>
              <Tag kind="softG">{t.g}</Tag>
            </div>
          ))}
        </div>

        <div style={{ background: SPOTA.c.surface, borderRadius: 14, padding: 16, marginBottom: 12, border: `1px solid ${SPOTA.c.lineSoft}` }}>
          <h3 style={{ margin: '0 0 8px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 15, color: SPOTA.c.text }}>Perfil de audiencia · {p.segment || '—'}</h3>
          {[{ l: '25-34 años', pct: 62 }, { l: '35-44 años', pct: 24 }, { l: '18-24 años', pct: 14 }].map(a => (
            <div key={a.l} style={{ marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: SPOTA.font.ui, fontSize: 12.5, color: SPOTA.c.textSoft, marginBottom: 4 }}>
                <span>{a.l}</span><span style={{ fontWeight: 700, color: SPOTA.c.text }}>{a.pct}%</span>
              </div>
              <div style={{ height: 6, borderRadius: 999, background: SPOTA.c.line, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: a.pct + '%', background: SPOTA.c.primary }} />
              </div>
            </div>
          ))}
        </div>

        {cmp && (
          <div style={{ background: SPOTA.c.surface, borderRadius: 14, padding: 16, marginBottom: 12, border: `1px solid ${SPOTA.c.lineSoft}` }}>
            <h3 style={{ margin: '0 0 8px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 15, color: SPOTA.c.text }}>Comparativa · {cmp}</h3>
            <p style={{ margin: 0, fontFamily: SPOTA.font.ui, fontSize: 13, color: SPOTA.c.textSoft, lineHeight: 1.5 }}>
              Tráfico ↑ 18% · Interacciones ↑ 24% · Nuevos visitantes ↑ 9% respecto a {cmp.toLowerCase()}.
            </p>
          </div>
        )}

        <div style={{ background: SPOTA.c.surface, borderRadius: 14, padding: 16, marginBottom: 12, border: `1px solid ${SPOTA.c.lineSoft}` }}>
          <h3 style={{ margin: '0 0 8px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 15, color: SPOTA.c.text }}>Funcionalidades</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Btn variant="outline" full icon="send" onClick={() => ping('Reporte exportado')}>Exportar reporte (PDF / CSV)</Btn>
            <Btn variant="outline" full icon="bookmark" onClick={() => ping('Preset guardado')}>Guardar configuración como preset</Btn>
            <Btn variant="outline" full icon="bell" disabled={!p.tier} onClick={() => p.tier && ping('Alerta configurada')}>
              Configurar alerta {p.tier ? '' : '(solo Tier)'}
            </Btn>
          </div>
        </div>

        {!p.tier && (
          <button onClick={() => nav('bizSubscribe')} style={{
            width: '100%', padding: 14, marginTop: 4, borderRadius: 14, cursor: 'pointer',
            background: `linear-gradient(135deg, ${SPOTA.c.primary} 0%, ${SPOTA.c.primaryDark} 100%)`,
            color: '#fff', border: 'none', textAlign: 'left',
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <Icon name="sparkles" size={22} color={SPOTA.c.accent} />
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 14 }}>Pasá a Tier · reportes ilimitados</div>
              <div style={{ fontFamily: SPOTA.font.ui, fontSize: 12, opacity: 0.9 }}>Mensual o anual con descuento.</div>
            </div>
            <Icon name="arrowRight" size={16} color="#fff" />
          </button>
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

// CU-007-006 §3.7 — Suscribirse a Tier de Insights. Comparativa Mensual/Anual
// con descuento, resumen del cobro y aceptación de términos.
const TIER_PLANS = [
  { id: 'mensual', t: 'Mensual', price: 14900, period: 'por mes', renew: 'Se renueva cada 30 días.', save: null },
  { id: 'anual', t: 'Anual', price: 149000, period: 'por año', renew: 'Equivale a $12.417 por mes.', save: '17% off vs. Mensual' },
];
const TIER_BENEFITS = [
  'Reportes ilimitados',
  'Exportar PDF / CSV',
  'Alertas sobre indicadores',
  'Soporte prioritario',
];
const ScreenBizSubscribe = ({ nav }) => {
  const [plan, setPlan] = React.useState('anual');
  const [showPaywall, setShowPaywall] = React.useState(false);
  const [accepted, setAccepted] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const selected = TIER_PLANS.find(p => p.id === plan);
  if (done) {
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: SPOTA.c.bg }}>
        <AppHeader title="Suscripción activada" />
        <div style={{ flex: 1, padding: '24px 24px', textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
          <div style={{ width: 80, height: 80, borderRadius: 999, background: SPOTA.c.primarySoft, margin: '20px auto 18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="sparkles" size={36} color={SPOTA.c.primary} />
          </div>
          <h1 style={{ margin: '0 0 8px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 22, color: SPOTA.c.text }}>Sos Tier {selected.t}</h1>
          <p style={{ margin: '0 0 18px', fontFamily: SPOTA.font.ui, fontSize: 14, color: SPOTA.c.textSoft, lineHeight: 1.55 }}>
            Cobramos ${selected.price.toLocaleString('es-AR')} {selected.period}. Mandamos el comprobante a tu email de facturación.
          </p>
          <Btn variant="primary" size="lg" full iconRight="arrowRight" onClick={() => nav('bizInsights')}>Ir a Insights</Btn>
        </div>
      </div>
    );
  }
  return (
    <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', background: SPOTA.c.bg }}>
      <AppHeader title="Pasar a Tier" leftIcon="arrowLeft" onLeft={() => nav('bizInsights')} />
      <div style={{ flex: 1, minHeight: 0, overflow: 'auto', padding: 20 }}>
        <h1 style={{ margin: '0 0 6px', fontFamily: SPOTA.font.ui, fontSize: 22, fontWeight: 700, color: SPOTA.c.text, letterSpacing: -0.4 }}>
          Reportes <span style={{ fontFamily: SPOTA.font.serif, fontStyle: 'italic', color: SPOTA.c.secondary, fontWeight: 400 }}>ilimitados</span>
        </h1>
        <p style={{ margin: '0 0 16px', fontFamily: SPOTA.font.ui, fontSize: 13.5, color: SPOTA.c.textSoft, lineHeight: 1.5 }}>
          Pasá a Tier para dejar de pagar por reporte. Elegí entre Mensual y Anual.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 14 }}>
          {TIER_PLANS.map(o => {
            const on = plan === o.id;
            return (
              <button key={o.id} onClick={() => setPlan(o.id)} style={{
                padding: 14, borderRadius: 14, cursor: 'pointer', textAlign: 'left',
                background: on ? SPOTA.c.primarySoft : SPOTA.c.surface,
                border: `1.5px solid ${on ? SPOTA.c.primary : SPOTA.c.lineSoft}`,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 16, color: SPOTA.c.text }}>{o.t}</div>
                    <div style={{ fontFamily: SPOTA.font.ui, fontSize: 12.5, color: SPOTA.c.textSoft }}>{o.renew}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 18, color: SPOTA.c.primary }}>
                      ${o.price.toLocaleString('es-AR')}
                    </div>
                    <div style={{ fontFamily: SPOTA.font.ui, fontSize: 11.5, color: SPOTA.c.textSoft }}>{o.period}</div>
                    {o.save && <Tag kind="accent" style={{ marginTop: 4 }}>{o.save}</Tag>}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
        <div style={{ background: SPOTA.c.surface, borderRadius: 14, padding: 14, marginBottom: 14, border: `1px solid ${SPOTA.c.lineSoft}` }}>
          <h3 style={{ margin: '0 0 8px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 13, color: SPOTA.c.text, textTransform: 'uppercase', letterSpacing: 0.4 }}>Incluye</h3>
          {TIER_BENEFITS.map(b => (
            <div key={b} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', fontFamily: SPOTA.font.ui, fontSize: 13, color: SPOTA.c.text }}>
              <Icon name="check" size={14} color={SPOTA.c.primary} /> {b}
            </div>
          ))}
        </div>
        <div style={{ background: SPOTA.c.surface, borderRadius: 14, padding: 14, marginBottom: 14, border: `1px solid ${SPOTA.c.lineSoft}` }}>
          <h3 style={{ margin: '0 0 10px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 13, color: SPOTA.c.text, textTransform: 'uppercase', letterSpacing: 0.4 }}>Resumen del cobro</h3>
          {[
            { l: 'Plan', v: selected.t },
            { l: 'Importe', v: `$${selected.price.toLocaleString('es-AR')}` },
            { l: 'Ciclo', v: selected.period },
            { l: 'Inicio', v: '18/05/2026' },
            { l: 'Próxima renovación', v: plan === 'mensual' ? '17/06/2026' : '17/05/2027' },
          ].map(r => (
            <div key={r.l} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontFamily: SPOTA.font.ui, fontSize: 13 }}>
              <span style={{ color: SPOTA.c.textSoft }}>{r.l}</span>
              <span style={{ color: SPOTA.c.text, fontWeight: 600 }}>{r.v}</span>
            </div>
          ))}
        </div>
        <label style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 18, cursor: 'pointer' }}>
          <input type="checkbox" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} style={{ marginTop: 4 }} />
          <span style={{ fontFamily: SPOTA.font.ui, fontSize: 12.5, color: SPOTA.c.textSoft, lineHeight: 1.5 }}>
            Acepto los términos comerciales del plan Tier (renovación automática hasta cancelación).
          </span>
        </label>
        <Btn variant="primary" size="lg" full disabled={!accepted} icon="check" onClick={() => setShowPaywall(true)}>
          Activar suscripción
        </Btn>
      </div>
      {showPaywall && (
        <PaywallVariantA
          amount={selected.price}
          savedMedio={{ tipo: 'Visa', last4: '4821', note: 'Configurada en el registro del negocio.' }}
          chargeNote={'Cobramos $' + selected.price.toLocaleString('es-AR') + ' ' + selected.period + ' (renovación automática hasta cancelación).'}
          subtitle={<>Suscripción Tier <strong style={{ color: SPOTA.c.text }}>{selected.t}</strong> · ${selected.price.toLocaleString('es-AR')} {selected.period}.</>}
          ctaLabel="Activar suscripción"
          onCancel={() => setShowPaywall(false)}
          onConfirm={() => { setShowPaywall(false); setDone(true); }}
        />
      )}
    </div>
  );
};

Object.assign(window, { ScreenClaimPlace, ScreenRegisterBiz, ScreenBizHome, ScreenBizBenefits, ScreenBizCampaign, ScreenBizInsights, ScreenBizInsightsResult, InsightsChargeModal, ScreenBizSubscribe });
