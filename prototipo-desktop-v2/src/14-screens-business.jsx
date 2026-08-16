// ========================================================================
// 14-screens-business.jsx
// ========================================================================
// Chip helper local para campañas
const Chip = ({ active, onClick, children }) => (
  <button onClick={onClick} style={{
    padding: '7px 14px', borderRadius: 999, cursor: 'pointer',
    background: active ? SPOTA.c.primary : SPOTA.c.surface,
    color: active ? '#fff' : SPOTA.c.text,
    border: `1.5px solid ${active ? SPOTA.c.primary : SPOTA.c.line}`,
    fontFamily: SPOTA.font.ui, fontWeight: 600, fontSize: 13,
  }}>{children}</button>
);

// CU-20: Registrar negocio asociado — entry point separado, sin frames.
// El back link se adapta al estado anterior (params.from): si vino del login, vuelve a login;
// si vino de la app autenticada, vuelve a home; si vino del welcome, vuelve a welcome.
// CU-007-002 §3.5 — Refactor a wizard de 4 secciones con padrón + facturación + medio de pago.
const RUBROS = ['Gastronomía', 'Cultura', 'Bar', 'Espacio cultural', 'Otro'];
const IVA_OPTIONS = ['Responsable inscripto', 'Monotributista', 'Exento'];
const COMP_OPTIONS = ['Factura A', 'Factura B', 'Factura C'];
const ScreenBizRegister = ({ nav, params }) => {
  const from = params?.from || 'home';
  const backCopy = {
    home:    { prefix: '¿Volvés a la app?',     label: 'Vista usuario', target: 'home' },
    login:   { prefix: '¿Te equivocaste?',       label: 'Volver al login', target: 'login' },
    welcome: { prefix: '¿Querés explorar antes?', label: 'Volver',         target: 'welcome' },
  }[from] || { prefix: '¿Volvés a la app?', label: 'Vista usuario', target: 'home' };
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
  const [testCharge, setTestCharge] = React.useState('pending');
  const triggerValidate = () => {
    setValidating(true);
    setTimeout(() => { setValidating(false); setValidated(true); }, 900);
  };
  const triggerTest = () => {
    setTestCharge('running');
    setTimeout(() => setTestCharge('ok'), 1000);
  };
  const inputBox = (placeholder, value, onChange, icon, type) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 14px', height: 44, borderRadius: 10, background: SPOTA.c.bg, border: `1.5px solid ${SPOTA.c.line}` }}>
      {icon && <Icon name={icon} size={16} color={SPOTA.c.textSoft} />}
      <input type={type || 'text'} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontFamily: SPOTA.font.ui, fontSize: 14.5, color: SPOTA.c.text }} />
    </div>
  );
  const labelChip = (label) => (
    <label style={{ display: 'block', marginBottom: 6, fontFamily: SPOTA.font.ui, fontSize: 13, fontWeight: 600, color: SPOTA.c.textSoft }}>{label}</label>
  );
  if (registered) return (
    <div style={{ minHeight: '100vh', background: SPOTA.c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
      <div style={{ maxWidth: 480, width: '100%', background: SPOTA.c.surface, borderRadius: 18, padding: 40, boxShadow: SPOTA.shadow.pop, border: `1px solid ${SPOTA.c.lineSoft}`, textAlign: 'center' }}>
        <div style={{ width: 76, height: 76, borderRadius: 999, background: SPOTA.c.primarySoft, margin: '0 auto 18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="mail" size={34} color={SPOTA.c.primary} />
        </div>
        <h1 style={{ margin: '0 0 8px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 24, color: SPOTA.c.text }}>Revisá tu email</h1>
        <p style={{ margin: '0 0 22px', fontFamily: SPOTA.font.ui, fontSize: 14.5, color: SPOTA.c.textSoft, lineHeight: 1.55 }}>
          Te enviamos un email a <strong style={{ color: SPOTA.c.text }}>{form.email}</strong> para verificar tu cuenta de negocio. Confirmá el enlace para activarla — el medio de pago ya quedó validado.
        </p>
        <Btn variant="primary" size="lg" iconRight="arrowRight" onClick={() => nav('bizHome')}>Ya verifiqué, ir al panel</Btn>
      </div>
    </div>
  );
  return (
  <div style={{ minHeight: '100vh', background: SPOTA.c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
    <div style={{ maxWidth: 640, width: '100%', background: SPOTA.c.surface, borderRadius: 18, padding: 32, boxShadow: SPOTA.shadow.pop, border: `1px solid ${SPOTA.c.lineSoft}` }}>
      <SpotaLogo size={28} />
      <div style={{ marginTop: 8, display: 'inline-block', padding: '3px 9px', borderRadius: 999, background: SPOTA.c.accent, color: SPOTA.c.text, fontFamily: SPOTA.font.ui, fontWeight: 800, fontSize: 10.5, letterSpacing: 0.6 }}>NEGOCIOS</div>
      <h1 style={{ margin: '18px 0 6px', fontFamily: SPOTA.font.ui, fontSize: 26, fontWeight: 700, color: SPOTA.c.text, letterSpacing: -0.5 }}>
        Sumá tu local a <span style={{ fontFamily: SPOTA.font.serif, fontStyle: 'italic', color: SPOTA.c.secondary, fontWeight: 400 }}>Spota</span>
      </h1>
      <p style={{ margin: '0 0 18px', fontFamily: SPOTA.font.ui, fontSize: 14, color: SPOTA.c.textSoft, lineHeight: 1.5 }}>
        Configurá identidad, facturación y medio de pago — Insights, beneficios y campañas quedan habilitados desde el día uno.
      </p>
      <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
        {[...Array(totalSteps)].map((_, i) => (
          <div key={i} style={{ flex: 1, height: 5, borderRadius: 999, background: i < step ? SPOTA.c.primary : SPOTA.c.lineSoft }} />
        ))}
      </div>
      <p style={{ margin: '0 0 4px', fontFamily: SPOTA.font.ui, fontSize: 12.5, fontWeight: 700, color: SPOTA.c.primary, letterSpacing: 0.4, textTransform: 'uppercase' }}>Paso {step} de {totalSteps}</p>
      <h2 style={{ margin: '0 0 18px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 20, color: SPOTA.c.text }}>
        {step === 1 && 'Identidad del negocio'}
        {step === 2 && 'Dirección y titularidad'}
        {step === 3 && 'Datos de facturación'}
      </h2>

      {step === 1 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {labelChip('Razón social')}
          {inputBox('Café Cobrand', form.razon, (v) => set('razon', v), 'briefcase')}
          {labelChip('CUIT (XX-XXXXXXXX-X)')}
          {inputBox('30-71234567-8', form.cuit, (v) => set('cuit', v))}
          {labelChip('Email comercial')}
          {inputBox('hola@correo.com', form.email, (v) => set('email', v), 'mail', 'email')}
          {labelChip('Contraseña (mínimo 8 caracteres)')}
          {inputBox('Mínimo 8 caracteres', form.pwd, (v) => set('pwd', v), 'lock', 'password')}
          {labelChip('Rubro')}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {RUBROS.map(r => <ChipBtn key={r} active={form.rubro === r} onClick={() => set('rubro', r)}>{r}</ChipBtn>)}
          </div>
        </div>
      )}

      {step === 2 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div>{labelChip('Calle')}{inputBox('Honduras', form.calle, (v) => set('calle', v), 'pin')}</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 12 }}>
            <div>{labelChip('Número')}{inputBox('4900', form.numero, (v) => set('numero', v))}</div>
            <div>{labelChip('Barrio')}{inputBox('Palermo', form.barrio, (v) => set('barrio', v))}</div>
          </div>
          <div>{labelChip('Ciudad')}{inputBox('CABA', form.ciudad, (v) => set('ciudad', v))}</div>
          <div style={{
            padding: 14, borderRadius: 12,
            background: validated ? SPOTA.c.primarySoft : SPOTA.c.bg,
            border: `1.5px solid ${validated ? SPOTA.c.primary : SPOTA.c.line}`,
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <Icon name={validated ? 'checkCircle' : 'shield'} size={22} color={validated ? SPOTA.c.primary : SPOTA.c.textSoft} />
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 14, color: SPOTA.c.text }}>
                {validating ? 'Validando contra padrón externo…' : validated ? 'Titularidad verificada' : 'Validación de titularidad'}
              </div>
              <div style={{ fontFamily: SPOTA.font.ui, fontSize: 12.5, color: SPOTA.c.textSoft }}>
                Cruzamos CUIT + dirección con el padrón externo.
              </div>
            </div>
            {!validating && !validated && <Btn variant="outline" size="sm" onClick={triggerValidate}>Validar</Btn>}
          </div>
        </div>
      )}

      {step === 3 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {labelChip('Condición frente al IVA')}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {IVA_OPTIONS.map(o => <ChipBtn key={o} active={form.iva === o} onClick={() => set('iva', o)}>{o}</ChipBtn>)}
          </div>
          {labelChip('Tipo de comprobante a emitir')}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {COMP_OPTIONS.map(o => <ChipBtn key={o} active={form.comprobante === o} onClick={() => set('comprobante', o)}>{o}</ChipBtn>)}
          </div>
          {labelChip('Email para envío de comprobantes')}
          {inputBox('admin@correo.com', form.emailFact, (v) => set('emailFact', v), 'mail', 'email')}
          <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginTop: 8, cursor: 'pointer' }}>
            <input type="checkbox" checked={form.accepted} onChange={(e) => set('accepted', e.target.checked)} style={{ marginTop: 2 }} />
            <span style={{ fontFamily: SPOTA.font.ui, fontSize: 12.5, color: SPOTA.c.textSoft, lineHeight: 1.5 }}>
              Acepto los <a style={{ color: SPOTA.c.primary, fontWeight: 600 }}>términos comerciales</a> y la <a style={{ color: SPOTA.c.primary, fontWeight: 600 }}>política de comisiones</a> de Spota Negocios.
            </span>
          </label>
        </div>
      )}

      <div style={{ marginTop: 22, display: 'flex', justifyContent: 'space-between', gap: 10 }}>
        <Btn variant="ghost" onClick={() => step > 1 ? setStep(step - 1) : nav(backCopy.target)}>
          {step > 1 ? 'Atrás' : 'Cancelar'}
        </Btn>
        {step < totalSteps ? (
          <Btn variant="primary" iconRight="arrowRight" disabled={step === 2 && !validated} onClick={() => setStep(step + 1)}>Continuar</Btn>
        ) : (
          <Btn variant="primary" icon="wallet" disabled={!form.accepted} onClick={() => setShowPaywall(true)}>Continuar al pago</Btn>
        )}
      </div>
      <p style={{ margin: '18px 0 0', fontFamily: SPOTA.font.ui, fontSize: 12.5, color: SPOTA.c.textSoft, textAlign: 'center' }}>
        {backCopy.prefix} <a onClick={() => nav(backCopy.target)} style={{ color: SPOTA.c.primary, fontWeight: 700, cursor: 'pointer' }}>{backCopy.label}</a>
      </p>
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
  </div>
  );
};

// CU-19 / CU-007-001: Reclamar perfil del lugar — wizard 2 pasos
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
    <section>
      <div style={{ marginBottom: 20 }}>
        <p style={{ margin: 0, fontFamily: SPOTA.font.ui, fontSize: 12.5, fontWeight: 700, color: SPOTA.c.primary, letterSpacing: 0.4, textTransform: 'uppercase' }}>Reclamar mi lugar · Paso {step} de 2</p>
        <h1 style={{ margin: '4px 0 0', fontFamily: SPOTA.font.ui, fontSize: 26, fontWeight: 700, color: SPOTA.c.text, letterSpacing: -0.5 }}>
          {step === 1 ? 'Buscá tu negocio' : 'Verificá la titularidad'}
        </h1>
      </div>

      <div style={{ maxWidth: 720 }}>
        {step === 1 && (
          <>
            <p style={{ margin: '0 0 18px', fontFamily: SPOTA.font.ui, fontSize: 14.5, color: SPOTA.c.textSoft, lineHeight: 1.55 }}>
              Tu lugar ya puede estar en Spota porque la comunidad lo reseña. Reclamá la gestión.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 14px', height: 48, borderRadius: 12, background: SPOTA.c.surface, border: `1.5px solid ${SPOTA.c.line}`, marginBottom: 16 }}>
              <Icon name="search" size={18} color={SPOTA.c.textSoft} />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Nombre del negocio o dirección" style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontFamily: SPOTA.font.ui, fontSize: 15, color: SPOTA.c.text }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {PLACES.slice(0, 3).map(p => {
                const on = selected === p.id;
                return (
                  <button key={p.id} onClick={() => setSelected(p.id)} style={{
                    display: 'flex', gap: 14, padding: 12, borderRadius: 12, alignItems: 'center',
                    background: on ? SPOTA.c.primarySoft : SPOTA.c.surface,
                    border: `1.5px solid ${on ? SPOTA.c.primary : SPOTA.c.lineSoft}`,
                    cursor: 'pointer', textAlign: 'left',
                  }}>
                    <img src={photo(p.img, 200, 200)} style={{ width: 56, height: 56, borderRadius: 10, objectFit: 'cover' }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 15, color: SPOTA.c.text }}>{p.name}</div>
                      <div style={{ fontFamily: SPOTA.font.ui, fontSize: 12.5, color: SPOTA.c.textSoft }}>{p.cat} · {p.hood} · {p.reviews} reseñas</div>
                    </div>
                    {on && <Icon name="checkCircle" size={24} color={SPOTA.c.primary} />}
                  </button>
                );
              })}
            </div>
            <div style={{ marginTop: 24, display: 'flex', justifyContent: 'flex-end' }}>
              <Btn variant="primary" size="lg" iconRight="arrowRight" onClick={() => setStep(2)}>Reclamar este lugar</Btn>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <p style={{ margin: '0 0 18px', fontFamily: SPOTA.font.ui, fontSize: 14.5, color: SPOTA.c.textSoft, lineHeight: 1.55 }}>
              Spota verifica que sos el dueño del lugar. Tarda entre 24 y 48 horas.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ display: 'block', marginBottom: 6, fontFamily: SPOTA.font.ui, fontSize: 13, fontWeight: 600, color: SPOTA.c.textSoft }}>CUIT del negocio (XX-XXXXXXXX-X)</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 14px', height: 48, borderRadius: 12, background: SPOTA.c.surface, border: `1.5px solid ${SPOTA.c.line}` }}>
                  <Icon name="briefcase" size={18} color={SPOTA.c.textSoft} />
                  <input value={cuit} onChange={(e) => setCuit(e.target.value)} style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontFamily: SPOTA.font.ui, fontSize: 15, color: SPOTA.c.text }} />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: 6, fontFamily: SPOTA.font.ui, fontSize: 13, fontWeight: 600, color: SPOTA.c.textSoft }}>Tu rol en el lugar</label>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {CLAIM_ROLES.map(r => <Chip key={r} active={role === r} onClick={() => setRole(r)}>{r}</Chip>)}
                </div>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: 6, fontFamily: SPOTA.font.ui, fontSize: 13, fontWeight: 600, color: SPOTA.c.textSoft }}>Teléfono comercial (+54 11 XXXX-XXXX)</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 14px', height: 48, borderRadius: 12, background: SPOTA.c.surface, border: `1.5px solid ${SPOTA.c.line}` }}>
                  <input value={phone} onChange={(e) => setPhone(e.target.value)} style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontFamily: SPOTA.font.ui, fontSize: 15, color: SPOTA.c.text }} />
                </div>
              </div>
            </div>
            <button onClick={() => fileRef.current && fileRef.current.click()} style={{
              marginTop: 18, padding: 18, borderRadius: 14,
              border: `1.5px dashed ${fileName ? SPOTA.c.primary : SPOTA.c.line}`,
              background: fileName ? SPOTA.c.primarySoft : SPOTA.c.surface,
              textAlign: 'center', width: '100%', cursor: 'pointer',
            }}>
              <Icon name={fileName ? 'checkCircle' : 'photo'} size={32} color={fileName ? SPOTA.c.primary : SPOTA.c.textSoft} />
              <p style={{ margin: '10px 0 4px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 14.5, color: SPOTA.c.text }}>
                {fileName ? fileName : 'Subí un comprobante'}
              </p>
              <p style={{ margin: 0, fontFamily: SPOTA.font.ui, fontSize: 12.5, color: SPOTA.c.textSoft }}>
                {fileName ? 'Tocá para reemplazar' : 'Habilitación, factura o contrato'}
              </p>
              <input ref={fileRef} type="file" accept="image/*,application/pdf" onChange={(e) => e.target.files && e.target.files[0] && setFileName(e.target.files[0].name)} style={{ display: 'none' }} />
            </button>
            <div style={{ marginTop: 24, display: 'flex', justifyContent: 'space-between' }}>
              <Btn variant="ghost" onClick={() => setStep(1)}>Atrás</Btn>
              <Btn variant="primary" size="lg" icon="check" disabled={!cuit || !phone || !fileName} onClick={() => nav('bizHome')}>Enviar para verificación</Btn>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

// Dashboard del negocio
const ScreenBizHome = ({ nav }) => (
  <section>
    <div style={{ marginBottom: 24 }}>
      <h1 style={{ margin: '0 0 4px', fontFamily: SPOTA.font.ui, fontSize: 28, fontWeight: 700, color: SPOTA.c.text, letterSpacing: -0.5 }}>
        Hola <span style={{ fontFamily: SPOTA.font.serif, fontStyle: 'italic', color: SPOTA.c.secondary, fontWeight: 400 }}>Café Cobrand</span>
      </h1>
      <p style={{ margin: 0, fontFamily: SPOTA.font.ui, fontSize: 14, color: SPOTA.c.textSoft }}>Resumen de tu actividad en Spota.</p>
    </div>

    {/* Card de identidad del lugar */}
    <div style={{ background: SPOTA.c.surface, borderRadius: 16, padding: 18, marginBottom: 22, border: `1px solid ${SPOTA.c.lineSoft}`, display: 'flex', alignItems: 'center', gap: 16 }}>
      <img src={photo('cafePalermo', 200, 200)} style={{ width: 72, height: 72, borderRadius: 14, objectFit: 'cover' }} />
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <h2 style={{ margin: 0, fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 18, color: SPOTA.c.text }}>Café Cobrand</h2>
          <Tag kind="primary" icon="verify">Verificado</Tag>
        </div>
        <p style={{ margin: '4px 0 0', fontFamily: SPOTA.font.ui, fontSize: 13.5, color: SPOTA.c.textSoft }}>Cafetería · Palermo · CUIT 30-71234567-8</p>
      </div>
      <Btn variant="outline" icon="edit" onClick={() => nav('claimPlace')}>Editar perfil</Btn>
    </div>

    {/* KPIs */}
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 28 }}>
      {[
        { n: '1.4k', l: 'Vistas en 30 días', d: '+18%', c: SPOTA.c.primary },
        { n: '312', l: 'Reseñas totales', d: '+9 esta semana', c: SPOTA.c.secondary },
        { n: '4.8', l: 'Fama Score', d: 'top 5% de Palermo', c: SPOTA.c.accent },
        { n: '$48k', l: 'Tráfico generado', d: '+31%', c: SPOTA.c.primary },
      ].map(s => (
        <div key={s.l} style={{ padding: 18, background: SPOTA.c.surface, borderRadius: 14, border: `1px solid ${SPOTA.c.lineSoft}` }}>
          <div style={{ fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 28, color: s.c, letterSpacing: -0.5 }}>{s.n}</div>
          <div style={{ fontFamily: SPOTA.font.ui, fontSize: 12.5, color: SPOTA.c.textSoft, marginTop: 4 }}>{s.l}</div>
          <div style={{ fontFamily: SPOTA.font.ui, fontSize: 12, color: SPOTA.c.success, fontWeight: 600, marginTop: 4 }}>↑ {s.d}</div>
        </div>
      ))}
    </div>

    {/* Quick actions a las herramientas */}
    <h2 style={{ margin: '0 0 14px', fontFamily: SPOTA.font.ui, fontSize: 18, fontWeight: 700, color: SPOTA.c.text }}>Herramientas comerciales</h2>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
      {[
        { id: 'bizBenefits', t: 'Beneficios exclusivos', s: '3 activos', i: 'gift', c: SPOTA.c.secondary },
        { id: 'bizCampaign', t: 'Campañas publicitarias', s: '1 corriendo · $4.200', i: 'megaphone', c: SPOTA.c.primary },
        { id: 'bizInsights', t: 'Insights de tu zona', s: 'Datos agregados Palermo', i: 'stats', c: SPOTA.c.accent },
      ].map(o => (
        <button key={o.id} onClick={() => nav(o.id)} style={{
          padding: 18, borderRadius: 14, cursor: 'pointer', textAlign: 'left',
          background: SPOTA.c.surface, border: `1px solid ${SPOTA.c.lineSoft}`,
          display: 'flex', flexDirection: 'column', gap: 12,
        }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: o.c + '22', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name={o.i} size={22} color={o.c} />
          </div>
          <div>
            <div style={{ fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 15, color: SPOTA.c.text }}>{o.t}</div>
            <div style={{ fontFamily: SPOTA.font.ui, fontSize: 13, color: SPOTA.c.textSoft, marginTop: 2 }}>{o.s}</div>
          </div>
          <span style={{ fontFamily: SPOTA.font.ui, fontSize: 13, fontWeight: 700, color: SPOTA.c.primary, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            Abrir <Icon name="arrowRight" size={14} color={SPOTA.c.primary} />
          </span>
        </button>
      ))}
    </div>
  </section>
);

// CU-21: Beneficios
// CU-007-003 §3.26 rehecho — formulario estructurado en wizard de 5 pasos.
const BENEFIT_DAYS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
const BENEFIT_PAYMENT = ['Efectivo', 'Tarjeta de crédito', 'Tarjeta de débito', 'QR', 'Transferencia bancaria'];
const BENEFIT_TYPES = ['Descuento', 'Cortesía', 'Promo Nx1', 'Combo especial', 'Acceso preferencial'];
const COURTESY_ITEMS = ['Bebida', 'Postre', 'Entrada', 'Comida principal', 'Acompañamiento', 'Otro'];
const ACCESS_TYPES = ['Reserva sin cargo', 'Mesa preferencial', 'Fila prioritaria', 'Otro'];
const ChipBtn = ({ active, onClick, children }) => (
  <button onClick={onClick} style={{
    padding: '8px 14px', borderRadius: 999, cursor: 'pointer',
    background: active ? SPOTA.c.primary : SPOTA.c.surface,
    color: active ? '#fff' : SPOTA.c.text,
    border: `1.5px solid ${active ? SPOTA.c.primary : SPOTA.c.line}`,
    fontFamily: SPOTA.font.ui, fontWeight: active ? 700 : 500, fontSize: 13,
  }}>{children}</button>
);
const ScreenBizBenefits = ({ nav }) => {
  const [editing, setEditing] = React.useState(false);
  const [step, setStep] = React.useState(1);
  const totalSteps = 5;
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
  const labeledField = (label, hint) => (
    <div>
      <div style={{ fontFamily: SPOTA.font.ui, fontWeight: 600, fontSize: 13.5, color: SPOTA.c.text, marginBottom: 6 }}>{label}</div>
      {hint && <p style={{ margin: '0 0 8px', fontFamily: SPOTA.font.ui, fontSize: 12.5, color: SPOTA.c.textSoft }}>{hint}</p>}
    </div>
  );
  const inputBox = (placeholder, value, onChange, icon) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 14px', height: 44, borderRadius: 10, background: SPOTA.c.bg, border: `1.5px solid ${SPOTA.c.line}` }}>
      {icon && <Icon name={icon} size={16} color={SPOTA.c.textSoft} />}
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontFamily: SPOTA.font.ui, fontSize: 14.5, color: SPOTA.c.text }} />
    </div>
  );
  // P3-40: lista de beneficios como estado para que trash elimine y edit ofrezca feedback.
  const [benefits, setBenefits] = React.useState([
    { id: 'b1', t: '15% off en café de filtro', cond: 'De lunes a jueves de 9 a 13', vence: '8 usos esta semana', active: true },
    { id: 'b2', t: 'Postre cortesía con almuerzo', cond: 'Mostrar el código en la app', vence: '3 usos esta semana', active: true },
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
    <section style={{ position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24, gap: 16 }}>
        <div>
          <h1 style={{ margin: 0, fontFamily: SPOTA.font.ui, fontSize: 26, fontWeight: 700, color: SPOTA.c.text, letterSpacing: -0.5 }}>Beneficios exclusivos</h1>
          <p style={{ margin: '4px 0 0', fontFamily: SPOTA.font.ui, fontSize: 14, color: SPOTA.c.textSoft }}>Aparecen en las cards de descubrimiento de los usuarios cualificados.</p>
        </div>
        {!editing && <Btn variant="primary" icon="plus" onClick={() => setEditing(true)}>Nuevo beneficio</Btn>}
      </div>

      {editing ? (
        <div style={{ maxWidth: 720, background: SPOTA.c.surface, borderRadius: 16, padding: 28, border: `1px solid ${SPOTA.c.lineSoft}` }}>
          {/* Stepper */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
            {[...Array(totalSteps)].map((_, i) => (
              <div key={i} style={{ flex: 1, height: 5, borderRadius: 999, background: i < step ? SPOTA.c.primary : SPOTA.c.lineSoft }} />
            ))}
          </div>
          <p style={{ margin: '0 0 4px', fontFamily: SPOTA.font.ui, fontSize: 12.5, fontWeight: 700, color: SPOTA.c.primary, letterSpacing: 0.4, textTransform: 'uppercase' }}>Paso {step} de {totalSteps}</p>
          <h2 style={{ margin: '0 0 18px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 20, color: SPOTA.c.text }}>
            {step === 1 && 'Tipo y título'}
            {step === 2 && 'Datos económicos'}
            {step === 3 && 'Vigencia y días aplicables'}
            {step === 4 && 'Condiciones de uso'}
            {step === 5 && 'Cupo y términos'}
          </h2>

          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {labeledField('Tipo de beneficio')}
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {BENEFIT_TYPES.map(t => <ChipBtn key={t} active={form.tipo === t} onClick={() => set('tipo', t)}>{t}</ChipBtn>)}
              </div>
              {labeledField('Título del beneficio', 'Texto libre, máximo 80 caracteres.')}
              {inputBox('Ej. 15% off en café de filtro', form.titulo, (v) => set('titulo', v))}
            </div>
          )}

          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {form.tipo === 'Descuento' && (
                <>
                  {labeledField('Porcentaje de descuento', 'Numérico entre 1 y 100.')}
                  {inputBox('15', form.descPct, (v) => set('descPct', v))}
                  {labeledField('Tope máximo (opcional)', 'Formato $#######.')}
                  {inputBox('$5.000', form.descTope, (v) => set('descTope', v))}
                </>
              )}
              {form.tipo === 'Cortesía' && (
                <>
                  {labeledField('Categoría del ítem ofrecido')}
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {COURTESY_ITEMS.map(t => <ChipBtn key={t} active={form.cortesiaItem === t} onClick={() => set('cortesiaItem', t)}>{t}</ChipBtn>)}
                  </div>
                </>
              )}
              {form.tipo === 'Promo Nx1' && (
                <>
                  {labeledField('Valor de N (paga 1 lleva N)', 'Numérico entre 2 y 5.')}
                  {inputBox('2', form.promoN, (v) => set('promoN', v))}
                  {labeledField('Categoría del ítem aplicable')}
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {COURTESY_ITEMS.filter(x => x !== 'Acompañamiento').map(t => <ChipBtn key={t} active={form.promoItem === t} onClick={() => set('promoItem', t)}>{t}</ChipBtn>)}
                  </div>
                </>
              )}
              {form.tipo === 'Combo especial' && (
                <>
                  {labeledField('Descripción del combo', 'Texto libre, máximo 100 caracteres.')}
                  {inputBox('Bowl + bebida + postre $4.500', form.comboDesc, (v) => set('comboDesc', v))}
                </>
              )}
              {form.tipo === 'Acceso preferencial' && (
                <>
                  {labeledField('Tipo de acceso')}
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {ACCESS_TYPES.map(t => <ChipBtn key={t} active={form.accesoTipo === t} onClick={() => set('accesoTipo', t)}>{t}</ChipBtn>)}
                  </div>
                </>
              )}
            </div>
          )}

          {step === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  {labeledField('Vigencia desde', 'Formato DD/MM/AAAA.')}
                  {inputBox('17/05/2026', form.desde, (v) => set('desde', v), 'calendar')}
                </div>
                <div>
                  {labeledField('Vigencia hasta', 'Formato DD/MM/AAAA o Sin vencimiento.')}
                  {inputBox('31/05/2026', form.sinVencimiento ? '' : form.hasta, (v) => set('hasta', v), 'calendar')}
                </div>
              </div>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                <input type="checkbox" checked={form.sinVencimiento} onChange={(e) => set('sinVencimiento', e.target.checked)} />
                <span style={{ fontFamily: SPOTA.font.ui, fontSize: 13.5, color: SPOTA.c.text }}>Sin vencimiento</span>
              </label>
              {labeledField('Días aplicables', 'Selección múltiple.')}
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {BENEFIT_DAYS.map(d => <ChipBtn key={d} active={form.dias.includes(d)} onClick={() => togDia(d)}>{d}</ChipBtn>)}
              </div>
            </div>
          )}

          {step === 4 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  {labeledField('Horario desde (opcional)', 'Formato HH:MM.')}
                  {inputBox('09:00', form.horaDesde, (v) => set('horaDesde', v), 'clock')}
                </div>
                <div>
                  {labeledField('Horario hasta (opcional)', 'Formato HH:MM.')}
                  {inputBox('13:00', form.horaHasta, (v) => set('horaHasta', v), 'clock')}
                </div>
              </div>
              {labeledField('Monto mínimo de consumo (opcional)', 'Formato $#######.')}
              {inputBox('$3.500', form.minimo, (v) => set('minimo', v))}
              {labeledField('Medios de pago aceptados', 'Selección múltiple.')}
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {BENEFIT_PAYMENT.map(m => <ChipBtn key={m} active={form.medios.includes(m)} onClick={() => togMedio(m)}>{m}</ChipBtn>)}
              </div>
            </div>
          )}

          {step === 5 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {labeledField('Cupo por usuario')}
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {['1','3','5','Sin límite'].map(c => <ChipBtn key={c} active={form.cupo === c} onClick={() => set('cupo', c)}>{c}</ChipBtn>)}
              </div>
              {labeledField('Términos adicionales (opcional)', 'Texto libre, máximo 200 caracteres.')}
              {inputBox('No acumulable con otras promos.', form.terminos, (v) => set('terminos', v))}
            </div>
          )}

          <div style={{ marginTop: 22, display: 'flex', justifyContent: 'space-between', gap: 10 }}>
            <Btn variant="ghost" onClick={() => step > 1 ? setStep(step - 1) : close()}>{step > 1 ? 'Atrás' : 'Cancelar'}</Btn>
            {step < totalSteps
              ? <Btn variant="primary" iconRight="arrowRight" onClick={() => setStep(step + 1)}>Continuar</Btn>
              : <Btn variant="primary" icon="check" onClick={close}>Crear beneficio</Btn>}
          </div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: 14 }}>
          {benefits.map(b => (
            <div key={b.id} style={{
              background: SPOTA.c.surface, borderRadius: 14, padding: 18,
              border: `1px solid ${SPOTA.c.lineSoft}`, opacity: b.active ? 1 : 0.65,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <h3 style={{ margin: 0, fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 16, color: SPOTA.c.text }}>{b.t}</h3>
                <Tag kind={b.active ? 'softG' : 'soft'} icon={b.active ? 'check' : 'clock'}>{b.active ? 'Activo' : 'Pausado'}</Tag>
              </div>
              <p style={{ margin: '0 0 12px', fontFamily: SPOTA.font.ui, fontSize: 13.5, color: SPOTA.c.textSoft, lineHeight: 1.5 }}>{b.cond}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 12, borderTop: `1px solid ${SPOTA.c.lineSoft}` }}>
                <span style={{ fontFamily: SPOTA.font.ui, fontSize: 12.5, color: SPOTA.c.textSoft }}>{b.vence}</span>
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
          ))}
        </div>
      )}
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

// CU-22: Campaña publicitaria
// CU-007-004 §3.10 — Refactor de bizCampaign: nombre + set unificado + formato + paywall B.
const CAMPAIGN_FORMATS = ['Card destacada en feed', 'Banner superior'];
const ScreenBizCampaign = ({ nav }) => {
  const [name, setName] = React.useState('');
  const [budget, setBudget] = React.useState(8000);
  const [days, setDays] = React.useState(14);
  const [audience, setAudience] = React.useState(['Café', 'Arte y cultura']);
  const [format, setFormat] = React.useState('Card destacada en feed');
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [showCardPaywall, setShowCardPaywall] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const tog = (v) => setAudience(a => a.includes(v) ? a.filter(x => x !== v) : [...a, v]);
  const reach = Math.round((budget / 50) + (days * 18));
  const launchReady = name && audience.length > 0;
  if (done) {
    return (
      <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <div style={{ maxWidth: 480, textAlign: 'center' }}>
          <div style={{ width: 80, height: 80, borderRadius: 999, background: SPOTA.c.primarySoft, margin: '0 auto 18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="megaphone" size={36} color={SPOTA.c.primary} />
          </div>
          <h1 style={{ margin: '0 0 8px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 26, color: SPOTA.c.text }}>"{name}" está corriendo</h1>
          <p style={{ margin: '0 0 22px', fontFamily: SPOTA.font.ui, fontSize: 14.5, color: SPOTA.c.textSoft, lineHeight: 1.55 }}>
            Cobramos ${budget.toLocaleString('es-AR')} por adelantado. Corre hasta consumir el presupuesto o cumplir {days} días.
          </p>
          <Btn variant="primary" size="lg" onClick={() => nav('bizHome')}>Volver al panel</Btn>
        </div>
      </section>
    );
  }
  return (
    <section>
      <div style={{ marginBottom: 22 }}>
        <h1 style={{ margin: 0, fontFamily: SPOTA.font.ui, fontSize: 26, fontWeight: 700, color: SPOTA.c.text, letterSpacing: -0.5 }}>Nueva campaña publicitaria</h1>
        <p style={{ margin: '4px 0 0', fontFamily: SPOTA.font.ui, fontSize: 14, color: SPOTA.c.textSoft }}>Llegá a usuarios de Spota con afinidad a tu rubro.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)', gap: 24, alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Nombre */}
          <div style={{ background: SPOTA.c.surface, borderRadius: 14, padding: 18, border: `1px solid ${SPOTA.c.lineSoft}` }}>
            <h3 style={{ margin: '0 0 8px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 15, color: SPOTA.c.text }}>Nombre de la campaña</h3>
            <p style={{ margin: '0 0 8px', fontFamily: SPOTA.font.ui, fontSize: 12.5, color: SPOTA.c.textSoft }}>Texto libre, máximo 60 caracteres.</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 14px', height: 44, borderRadius: 10, background: SPOTA.c.bg, border: `1.5px solid ${SPOTA.c.line}` }}>
              <Icon name="megaphone" size={16} color={SPOTA.c.textSoft} />
              <input value={name} onChange={(e) => setName(e.target.value.slice(0, 60))} placeholder="Café de filtro · invierno" style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontFamily: SPOTA.font.ui, fontSize: 14.5, color: SPOTA.c.text }} />
            </div>
          </div>

          {/* Segmento */}
          <div style={{ background: SPOTA.c.surface, borderRadius: 14, padding: 18, border: `1px solid ${SPOTA.c.lineSoft}` }}>
            <h3 style={{ margin: '0 0 4px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 15, color: SPOTA.c.text }}>Segmento de afinidad</h3>
            <p style={{ margin: '0 0 12px', fontFamily: SPOTA.font.ui, fontSize: 13, color: SPOTA.c.textSoft }}>Llegás a usuarios con afinidad a:</p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {ACTIVITY_OPTIONS.filter(a => a !== 'Todas').map(t => (
                <ChipBtn key={t} active={audience.includes(t)} onClick={() => tog(t)}>{t}</ChipBtn>
              ))}
            </div>
          </div>

          {/* Formato */}
          <div style={{ background: SPOTA.c.surface, borderRadius: 14, padding: 18, border: `1px solid ${SPOTA.c.lineSoft}` }}>
            <h3 style={{ margin: '0 0 12px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 15, color: SPOTA.c.text }}>Formato del aviso</h3>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {CAMPAIGN_FORMATS.map(f => <ChipBtn key={f} active={format === f} onClick={() => setFormat(f)}>{f}</ChipBtn>)}
            </div>
          </div>

          {/* Presupuesto */}
          <div style={{ background: SPOTA.c.surface, borderRadius: 14, padding: 18, border: `1px solid ${SPOTA.c.lineSoft}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <h3 style={{ margin: 0, fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 15, color: SPOTA.c.text }}>Presupuesto total</h3>
              <span style={{ fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 22, color: SPOTA.c.primary }}>${budget.toLocaleString('es-AR')}</span>
            </div>
            <input type="range" min="2000" max="50000" step="500" value={budget} onChange={(e) => setBudget(+e.target.value)} style={{ width: '100%', accentColor: SPOTA.c.primary }} />
          </div>

          {/* Duración */}
          <div style={{ background: SPOTA.c.surface, borderRadius: 14, padding: 18, border: `1px solid ${SPOTA.c.lineSoft}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <h3 style={{ margin: 0, fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 15, color: SPOTA.c.text }}>Duración</h3>
              <span style={{ fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 22, color: SPOTA.c.primary }}>{days} días</span>
            </div>
            <input type="range" min="3" max="60" value={days} onChange={(e) => setDays(+e.target.value)} style={{ width: '100%', accentColor: SPOTA.c.primary }} />
          </div>

        </div>

        {/* Sticky lateral con preview + alcance */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: 14, position: 'sticky', top: 96 }}>
          <div style={{ background: SPOTA.c.primarySoft, borderRadius: 14, padding: 18, border: `1px solid ${SPOTA.c.primary}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <Icon name="sparkles" size={17} color={SPOTA.c.primary} />
              <h3 style={{ margin: 0, fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 14, color: SPOTA.c.primaryDark }}>Alcance estimado</h3>
            </div>
            <p style={{ margin: 0, fontFamily: SPOTA.font.ui, fontSize: 14, color: SPOTA.c.primaryDark, lineHeight: 1.5 }}>
              <strong style={{ fontSize: 22 }}>{reach.toLocaleString('es-AR')}</strong> impresiones<br />
              ~{Math.round(reach * 0.04)} interacciones esperadas
            </p>
          </div>

          <div style={{ background: SPOTA.c.surface, borderRadius: 14, padding: 14, border: `1px dashed ${SPOTA.c.line}` }}>
            <p style={{ margin: '0 0 10px', fontFamily: SPOTA.font.ui, fontSize: 11, fontWeight: 700, color: SPOTA.c.textSoft, textTransform: 'uppercase', letterSpacing: 0.4 }}>Vista previa · {format}</p>
            <PlaceCard place={{ ...PLACES[0], tag: 'Patrocinado' }} onClick={() => {}} />
          </div>

          <Btn variant="primary" size="lg" full icon="megaphone" disabled={!launchReady} onClick={() => setShowCardPaywall(true)}>Lanzar campaña</Btn>
        </aside>
      </div>

      {showCardPaywall && (
        <PaywallVariantA
          amount={budget}
          savedMedio={{ tipo: 'Tarjeta de crédito', last4: '4821', note: 'Configurada en el registro del negocio.' }}
          chargeNote={'Cobramos $' + budget.toLocaleString('es-AR') + ' por adelantado al lanzar.'}
          subtitle={<>Total a pagar: <strong style={{ color: SPOTA.c.text }}>${budget.toLocaleString('es-AR')}</strong> · campaña "{name}" · {days} días.</>}
          ctaLabel="Cobrar y lanzar"
          onCancel={() => setShowCardPaywall(false)}
          onConfirm={() => { setShowCardPaywall(false); setDone(true); }}
        />
      )}
    </section>
  );
};

// CU-23: Insights
// CU-007-005 §3.8 — Pantalla previa de filtros obligatorios. Sin acceso libre al panel.
const INSIGHTS_PERIODS = ['7 días', '30 días', '90 días', 'Personalizado'];
const INSIGHTS_SEGMENTS = ['18-24 años', '25-34 años', '35-44 años', '45+ años', 'Todas las edades'];
const INSIGHTS_COMPARE = ['Sin comparar', 'vs período anterior', 'vs promedio de zona'];
const REPORT_PRICE = 4900;
const ScreenBizInsights = ({ nav }) => {
  const [period, setPeriod] = React.useState(null);
  const [customFrom, setCustomFrom] = React.useState('');
  const [customTo, setCustomTo] = React.useState('');
  const [activity, setActivity] = React.useState(null);
  const [segment, setSegment] = React.useState(null);
  const [compare, setCompare] = React.useState(null);
  const [showCharge, setShowCharge] = React.useState(false);
  const [tier, setTier] = React.useState(false);
  const ready = period && activity && segment && compare && (period !== 'Personalizado' || (customFrom && customTo));
  const execute = () => {
    if (tier) nav('bizInsightsResult', { period, activity, segment, compare, customFrom, customTo, tier: true });
    else setShowCharge(true);
  };
  return (
    <section>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 18, gap: 16 }}>
        <div>
          <h1 style={{ margin: 0, fontFamily: SPOTA.font.ui, fontSize: 26, fontWeight: 700, color: SPOTA.c.text, letterSpacing: -0.5 }}>Insights · Nuevo reporte</h1>
          <p style={{ margin: '4px 0 0', fontFamily: SPOTA.font.ui, fontSize: 14, color: SPOTA.c.textSoft, maxWidth: 640 }}>
            Insights es una herramienta de consulta paga. Definí los filtros y ejecutá para obtener el reporte.
          </p>
        </div>
        <button onClick={() => setTier(!tier)} style={{ border: 'none', background: SPOTA.c.surface, padding: '8px 14px', borderRadius: 999, cursor: 'pointer', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 12.5, color: SPOTA.c.primary }}>
          Modalidad: {tier ? 'Tier' : 'One-off'} · simular {tier ? 'One-off' : 'Tier'}
        </button>
      </div>

      <div style={{ maxWidth: 880, background: SPOTA.c.surface, borderRadius: 16, padding: 24, border: `1px solid ${SPOTA.c.lineSoft}` }}>
        <h3 style={{ margin: '0 0 10px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 15, color: SPOTA.c.text }}>Período</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
          {INSIGHTS_PERIODS.map(o => <ChipBtn key={o} active={period === o} onClick={() => setPeriod(o)}>{o}</ChipBtn>)}
        </div>
        {period === 'Personalizado' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
            <div>
              <div style={{ fontFamily: SPOTA.font.ui, fontWeight: 600, fontSize: 13, color: SPOTA.c.text, marginBottom: 6 }}>Desde (DD/MM/AAAA)</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 14px', height: 44, borderRadius: 10, background: SPOTA.c.bg, border: `1.5px solid ${SPOTA.c.line}` }}>
                <Icon name="calendar" size={16} color={SPOTA.c.textSoft} />
                <input value={customFrom} onChange={(e) => setCustomFrom(e.target.value)} placeholder="01/05/2026" style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontFamily: SPOTA.font.ui, fontSize: 14.5, color: SPOTA.c.text }} />
              </div>
            </div>
            <div>
              <div style={{ fontFamily: SPOTA.font.ui, fontWeight: 600, fontSize: 13, color: SPOTA.c.text, marginBottom: 6 }}>Hasta (DD/MM/AAAA)</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 14px', height: 44, borderRadius: 10, background: SPOTA.c.bg, border: `1.5px solid ${SPOTA.c.line}` }}>
                <Icon name="calendar" size={16} color={SPOTA.c.textSoft} />
                <input value={customTo} onChange={(e) => setCustomTo(e.target.value)} placeholder="31/05/2026" style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontFamily: SPOTA.font.ui, fontSize: 14.5, color: SPOTA.c.text }} />
              </div>
            </div>
          </div>
        )}

        <h3 style={{ margin: '0 0 10px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 15, color: SPOTA.c.text }}>Tipo de actividad</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
          {ACTIVITY_OPTIONS.filter(a => a !== 'Todas').map(o => <ChipBtn key={o} active={activity === o} onClick={() => setActivity(o)}>{o}</ChipBtn>)}
        </div>

        <h3 style={{ margin: '0 0 10px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 15, color: SPOTA.c.text }}>Segmento de audiencia</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
          {INSIGHTS_SEGMENTS.map(o => <ChipBtn key={o} active={segment === o} onClick={() => setSegment(o)}>{o}</ChipBtn>)}
        </div>

        <h3 style={{ margin: '0 0 10px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 15, color: SPOTA.c.text }}>Comparativa</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 22 }}>
          {INSIGHTS_COMPARE.map(o => <ChipBtn key={o} active={compare === o} onClick={() => setCompare(o)}>{o}</ChipBtn>)}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 16, borderTop: `1px solid ${SPOTA.c.lineSoft}` }}>
          <p style={{ margin: 0, fontFamily: SPOTA.font.ui, fontSize: 13, color: SPOTA.c.textMuted }}>
            {ready ? 'Listo para ejecutar.' : 'Elegí los cuatro selectores para continuar.'}
          </p>
          <Btn variant="primary" size="lg" disabled={!ready} onClick={execute}>
            {tier ? 'Ejecutar reporte (sin cargo)' : `Ejecutar reporte · $${REPORT_PRICE.toLocaleString('es-AR')}`}
          </Btn>
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
    </section>
  );
};

// CU-007-005 §3.8 — Modal de cobro de reporte. Sólo One-off.
const InsightsChargeModal = ({ price, onClose, onConfirm, onChangeCard }) => (
  <div onClick={onClose} style={{
    position: 'fixed', inset: 0, background: 'rgba(43,37,35,0.55)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: 24,
  }}>
    <div onClick={(e) => e.stopPropagation()} style={{
      background: SPOTA.c.bg, width: 'min(520px, 100%)',
      borderRadius: 18, padding: '24px 28px', boxShadow: SPOTA.shadow.pop,
    }}>
      <h2 style={{ margin: '0 0 6px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 22, color: SPOTA.c.text }}>Cobro del reporte</h2>
      <p style={{ margin: '0 0 16px', fontFamily: SPOTA.font.ui, fontSize: 13.5, color: SPOTA.c.textSoft, lineHeight: 1.5 }}>
        Modalidad One-off: se cobra por reporte. Pasá a Tier para liberar reportes ilimitados.
      </p>
      <div style={{ padding: 16, background: SPOTA.c.surface, borderRadius: 12, marginBottom: 16, border: `1px solid ${SPOTA.c.lineSoft}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <span style={{ fontFamily: SPOTA.font.ui, fontSize: 13.5, color: SPOTA.c.textSoft }}>Importe</span>
          <span style={{ fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 22, color: SPOTA.c.primary }}>${price.toLocaleString('es-AR')}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10, borderTop: `1px solid ${SPOTA.c.lineSoft}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Icon name="wallet" size={16} color={SPOTA.c.primary} />
            <span style={{ fontFamily: SPOTA.font.ui, fontSize: 13.5, color: SPOTA.c.text }}>Visa de crédito ···· 4821</span>
          </div>
          <button onClick={onChangeCard} style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 12.5, color: SPOTA.c.primary }}>Cambiar medio</button>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
        <Btn variant="ghost" onClick={onClose}>Cancelar</Btn>
        <Btn variant="primary" icon="check" onClick={onConfirm}>Confirmar y ejecutar</Btn>
      </div>
    </div>
  </div>
);

const ScreenBizInsightsResult = ({ nav, params }) => {
  const p = params || {};
  const cmp = p.compare && p.compare !== 'Sin comparar' ? p.compare : null;
  // P3-39: satélites con feedback efímero.
  const [toast, setToast] = React.useState(null);
  const ping = (msg) => {
    setToast(msg);
    window.setTimeout(() => setToast(t => t === msg ? null : t), 1800);
  };
  return (
    <section style={{ position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 18, gap: 16 }}>
        <div>
          <button onClick={() => nav('bizInsights')} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: SPOTA.c.textSoft, fontFamily: SPOTA.font.ui, fontSize: 13, padding: 0, display: 'inline-flex', alignItems: 'center', gap: 4, marginBottom: 8 }}>
            <Icon name="arrowLeft" size={14} /> Nuevo reporte
          </button>
          <h1 style={{ margin: 0, fontFamily: SPOTA.font.ui, fontSize: 26, fontWeight: 700, color: SPOTA.c.text, letterSpacing: -0.5 }}>Reporte ejecutado</h1>
          <p style={{ margin: '4px 0 0', fontFamily: SPOTA.font.ui, fontSize: 13.5, color: SPOTA.c.textSoft }}>
            {p.period === 'Personalizado' ? `${p.customFrom} - ${p.customTo}` : (p.period || '—')} · {p.activity || '—'} · {p.segment || '—'}
          </p>
        </div>
        <Tag kind="primary" icon={p.tier ? 'sparkles' : 'wallet'}>{p.tier ? 'Tier' : 'One-off'}</Tag>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <div style={{ background: SPOTA.c.surface, borderRadius: 14, padding: 20, border: `1px solid ${SPOTA.c.lineSoft}` }}>
          <h3 style={{ margin: '0 0 14px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 16, color: SPOTA.c.text }}>Tráfico por día</h3>
          <svg width="100%" height="160" viewBox="0 0 320 160" preserveAspectRatio="none">
            {[40, 65, 50, 80, 70, 95, 110, 90, 105, 75, 85, 100, 115, 95].map((h, i) => (
              <rect key={i} x={i * 22 + 4} y={160 - h} width="14" height={h} rx="3" fill={i === 12 ? SPOTA.c.secondary : SPOTA.c.primary} opacity={i === 12 ? 1 : 0.7} />
            ))}
          </svg>
        </div>
        <div style={{ background: SPOTA.c.surface, borderRadius: 14, padding: 20, border: `1px solid ${SPOTA.c.lineSoft}` }}>
          <h3 style={{ margin: '0 0 14px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 16, color: SPOTA.c.text }}>Tendencias en zona</h3>
          {[
            { t: 'café de especialidad', g: '+34%' },
            { t: 'brunch dominical', g: '+22%' },
            { t: 'after office', g: '+18%' },
            { t: 'plan económico', g: '+12%' },
          ].map((t, i) => (
            <div key={t.t} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderTop: i === 0 ? 'none' : `1px solid ${SPOTA.c.lineSoft}` }}>
              <span style={{ fontFamily: SPOTA.font.ui, fontSize: 14, color: SPOTA.c.text }}>"{t.t}"</span>
              <Tag kind="softG">{t.g}</Tag>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: SPOTA.c.surface, borderRadius: 14, padding: 20, border: `1px solid ${SPOTA.c.lineSoft}`, marginBottom: 16 }}>
        <h3 style={{ margin: '0 0 14px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 16, color: SPOTA.c.text }}>Perfil de audiencia · {p.segment || '—'}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { l: '25-34 años', pct: 62 },
            { l: '35-44 años', pct: 24 },
            { l: '18-24 años', pct: 14 },
          ].map(a => (
            <div key={a.l}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: SPOTA.font.ui, fontSize: 13, color: SPOTA.c.textSoft, marginBottom: 4 }}>
                <span>{a.l}</span><span style={{ fontWeight: 700, color: SPOTA.c.text }}>{a.pct}%</span>
              </div>
              <div style={{ height: 8, borderRadius: 999, background: SPOTA.c.line, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: a.pct + '%', background: SPOTA.c.primary }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {cmp && (
        <div style={{ background: SPOTA.c.surface, borderRadius: 14, padding: 20, border: `1px solid ${SPOTA.c.lineSoft}`, marginBottom: 16 }}>
          <h3 style={{ margin: '0 0 8px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 16, color: SPOTA.c.text }}>Comparativa · {cmp}</h3>
          <p style={{ margin: 0, fontFamily: SPOTA.font.ui, fontSize: 14, color: SPOTA.c.textSoft, lineHeight: 1.5 }}>
            Tráfico ↑ 18% · Interacciones ↑ 24% · Nuevos visitantes ↑ 9% respecto a {cmp.toLowerCase()}.
          </p>
        </div>
      )}

      <div style={{ background: SPOTA.c.surface, borderRadius: 14, padding: 18, border: `1px solid ${SPOTA.c.lineSoft}`, marginBottom: 16 }}>
        <h3 style={{ margin: '0 0 10px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 15, color: SPOTA.c.text }}>Funcionalidades</h3>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <Btn variant="outline" icon="send" onClick={() => ping('Reporte exportado')}>Exportar PDF / CSV</Btn>
          <Btn variant="outline" icon="bookmark" onClick={() => ping('Preset guardado')}>Guardar configuración como preset</Btn>
          <Btn variant="outline" icon="bell" disabled={!p.tier} onClick={() => p.tier && ping('Alerta configurada')}>Configurar alerta {p.tier ? '' : '(solo Tier)'}</Btn>
        </div>
      </div>

      {!p.tier && (
        <button onClick={() => nav('bizSubscribe')} style={{
          width: '100%', padding: 18, borderRadius: 16, cursor: 'pointer',
          background: `linear-gradient(135deg, ${SPOTA.c.primary} 0%, ${SPOTA.c.primaryDark} 100%)`,
          color: '#fff', border: 'none', textAlign: 'left',
          display: 'flex', alignItems: 'center', gap: 14,
        }}>
          <Icon name="sparkles" size={26} color={SPOTA.c.accent} />
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 15.5 }}>Pasá a Tier · reportes ilimitados</div>
            <div style={{ fontFamily: SPOTA.font.ui, fontSize: 13, opacity: 0.92 }}>Mensual o anual con descuento por compromiso anual.</div>
          </div>
          <Icon name="arrowRight" size={18} color="#fff" />
        </button>
      )}
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

// CU-007-006 §3.7 — Suscribirse a Tier de Insights.
const TIER_PLANS = [
  { id: 'mensual', t: 'Mensual', price: 14900, period: 'por mes', renew: 'Se renueva cada 30 días.', save: null },
  { id: 'anual',   t: 'Anual',   price: 149000, period: 'por año', renew: 'Equivale a $12.417 por mes.', save: '17% off vs. Mensual' },
];
const TIER_BENEFITS = [
  'Reportes ilimitados',
  'Exportar PDF / CSV',
  'Alertas sobre indicadores',
  'Soporte prioritario',
];
const ScreenBizSubscribe = ({ nav }) => {
  const [plan, setPlan] = React.useState('anual');
  const [accepted, setAccepted] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const [showPaywall, setShowPaywall] = React.useState(false);
  const selected = TIER_PLANS.find(p => p.id === plan);
  if (done) {
    return (
      <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <div style={{ maxWidth: 480, textAlign: 'center' }}>
          <div style={{ width: 80, height: 80, borderRadius: 999, background: SPOTA.c.primarySoft, margin: '0 auto 18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="sparkles" size={36} color={SPOTA.c.primary} />
          </div>
          <h1 style={{ margin: '0 0 8px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 26, color: SPOTA.c.text }}>Sos Tier {selected.t}</h1>
          <p style={{ margin: '0 0 22px', fontFamily: SPOTA.font.ui, fontSize: 14.5, color: SPOTA.c.textSoft, lineHeight: 1.55 }}>
            Cobramos ${selected.price.toLocaleString('es-AR')} {selected.period}. Mandamos el comprobante a tu email de facturación.
          </p>
          <Btn variant="primary" size="lg" iconRight="arrowRight" onClick={() => nav('bizInsights')}>Ir a Insights</Btn>
        </div>
      </section>
    );
  }
  return (
    <section>
      <div style={{ marginBottom: 22 }}>
        <button onClick={() => nav('bizInsights')} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: SPOTA.c.textSoft, fontFamily: SPOTA.font.ui, fontSize: 13, padding: 0, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
          <Icon name="arrowLeft" size={14} /> Insights
        </button>
        <h1 style={{ margin: '8px 0 6px', fontFamily: SPOTA.font.ui, fontSize: 28, fontWeight: 700, color: SPOTA.c.text, letterSpacing: -0.5 }}>
          Reportes <span style={{ fontFamily: SPOTA.font.serif, fontStyle: 'italic', color: SPOTA.c.secondary, fontWeight: 400 }}>ilimitados</span> con Tier
        </h1>
        <p style={{ margin: '0 0 24px', fontFamily: SPOTA.font.ui, fontSize: 14.5, color: SPOTA.c.textSoft, maxWidth: 640 }}>
          Pasá a Tier para dejar de pagar por reporte. Elegí entre Mensual y Anual.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)', gap: 24, alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {TIER_PLANS.map(o => {
              const on = plan === o.id;
              return (
                <button key={o.id} onClick={() => setPlan(o.id)} style={{
                  padding: 22, borderRadius: 16, cursor: 'pointer', textAlign: 'left',
                  background: on ? SPOTA.c.primarySoft : SPOTA.c.surface,
                  border: `1.5px solid ${on ? SPOTA.c.primary : SPOTA.c.lineSoft}`,
                  position: 'relative',
                }}>
                  {o.save && <Tag kind="accent" style={{ position: 'absolute', top: 14, right: 14 }}>{o.save}</Tag>}
                  <h3 style={{ margin: '0 0 6px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 17, color: SPOTA.c.text }}>{o.t}</h3>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 6 }}>
                    <span style={{ fontFamily: SPOTA.font.ui, fontWeight: 800, fontSize: 28, color: SPOTA.c.primary, letterSpacing: -0.5 }}>${o.price.toLocaleString('es-AR')}</span>
                    <span style={{ fontFamily: SPOTA.font.ui, fontSize: 13, color: SPOTA.c.textSoft }}>{o.period}</span>
                  </div>
                  <p style={{ margin: 0, fontFamily: SPOTA.font.ui, fontSize: 13, color: SPOTA.c.textSoft }}>{o.renew}</p>
                </button>
              );
            })}
          </div>

          <div style={{ background: SPOTA.c.surface, borderRadius: 14, padding: 18, border: `1px solid ${SPOTA.c.lineSoft}` }}>
            <h3 style={{ margin: '0 0 10px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 14, color: SPOTA.c.text, textTransform: 'uppercase', letterSpacing: 0.4 }}>Incluye</h3>
            {TIER_BENEFITS.map(b => (
              <div key={b} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', fontFamily: SPOTA.font.ui, fontSize: 14, color: SPOTA.c.text }}>
                <Icon name="check" size={16} color={SPOTA.c.primary} /> {b}
              </div>
            ))}
          </div>
        </div>

        <aside style={{ position: 'sticky', top: 96, background: SPOTA.c.surface, borderRadius: 16, padding: 22, border: `1px solid ${SPOTA.c.lineSoft}` }}>
          <h3 style={{ margin: '0 0 12px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 14, color: SPOTA.c.text, textTransform: 'uppercase', letterSpacing: 0.4 }}>Resumen del cobro</h3>
          {[
            { l: 'Plan', v: selected.t },
            { l: 'Importe', v: `$${selected.price.toLocaleString('es-AR')}` },
            { l: 'Ciclo', v: selected.period },
            { l: 'Inicio', v: '18/05/2026' },
            { l: 'Próxima renovación', v: plan === 'mensual' ? '17/06/2026' : '17/05/2027' },
          ].map(r => (
            <div key={r.l} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontFamily: SPOTA.font.ui, fontSize: 13.5 }}>
              <span style={{ color: SPOTA.c.textSoft }}>{r.l}</span>
              <span style={{ color: SPOTA.c.text, fontWeight: 600 }}>{r.v}</span>
            </div>
          ))}
          <label style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginTop: 16, cursor: 'pointer' }}>
            <input type="checkbox" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} style={{ marginTop: 4 }} />
            <span style={{ fontFamily: SPOTA.font.ui, fontSize: 12.5, color: SPOTA.c.textSoft, lineHeight: 1.5 }}>
              Acepto los términos comerciales del plan Tier (renovación automática hasta cancelación).
            </span>
          </label>
          <div style={{ marginTop: 16 }}>
            <Btn variant="primary" size="lg" full disabled={!accepted} icon="check" onClick={() => setShowPaywall(true)}>Activar suscripción</Btn>
          </div>
        </aside>
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
    </section>
  );
};

Object.assign(window, { ScreenBizRegister, ScreenClaimPlace, ScreenBizHome, ScreenBizBenefits, ScreenBizCampaign, ScreenBizInsights, ScreenBizInsightsResult, InsightsChargeModal, ScreenBizSubscribe });
