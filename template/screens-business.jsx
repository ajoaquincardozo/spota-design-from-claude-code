// CU-19 a CU-23 — Negocios y Visibilidad

// CU-19: Reclamar perfil del lugar
const ScreenClaimPlace = ({ nav }) => {
  const [step, setStep] = React.useState(1);
  const [search, setSearch] = React.useState('Café Cobrand');
  const [selected, setSelected] = React.useState('p1');
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
              <Field label="CUIT del negocio" value="30-71234567-8" onChange={() => {}} icon="briefcase" />
              <Field label="Tu rol en el lugar" value="Dueño / socio" onChange={() => {}} icon="user" />
              <Field label="Teléfono comercial" value="+54 11 5555-1234" onChange={() => {}} />
            </div>
            <div style={{ marginTop: 16, padding: 14, borderRadius: 12, border: `1.5px dashed ${SPOTA.c.line}`, background: SPOTA.c.surface, textAlign: 'center' }}>
              <Icon name="photo" size={28} color={SPOTA.c.textSoft} />
              <p style={{ margin: '8px 0 4px', fontFamily: SPOTA.font.ui, fontWeight: 600, fontSize: 13.5, color: SPOTA.c.text }}>Subí un comprobante</p>
              <p style={{ margin: 0, fontFamily: SPOTA.font.ui, fontSize: 12, color: SPOTA.c.textSoft }}>Habilitación, factura, contrato</p>
            </div>
            <div style={{ marginTop: 18 }}><Btn variant="primary" size="lg" full onClick={() => nav('bizHome')}>Enviar para verificación</Btn></div>
          </>
        )}
      </div>
    </div>
  );
};

// CU-20: Registrar negocio asociado
const ScreenRegisterBiz = ({ nav }) => {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: SPOTA.c.bg }}>
      <AppHeader title="" leftIcon="arrowLeft" onLeft={() => nav('home')} />
      <div style={{ flex: 1, overflow: 'auto', padding: '8px 24px 24px' }}>
        <SpotaLogo size={28} />
        <div style={{ marginTop: 4, display: 'inline-block', padding: '3px 8px', borderRadius: 999, background: SPOTA.c.primarySoft, fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 11, color: SPOTA.c.primary, letterSpacing: 0.4 }}>NEGOCIOS</div>
        <h1 style={{ margin: '20px 0 6px', fontFamily: SPOTA.font.ui, fontSize: 26, fontWeight: 700, color: SPOTA.c.text, letterSpacing: -0.5 }}>Sumá tu local a <span style={{ fontFamily: SPOTA.font.serif, fontStyle: 'italic', color: SPOTA.c.secondary, fontWeight: 400 }}>Spota</span></h1>
        <p style={{ margin: '0 0 22px', fontFamily: SPOTA.font.ui, fontSize: 14.5, color: SPOTA.c.textSoft, lineHeight: 1.5 }}>Llegá a usuarios cualificados, publicá beneficios y accedé a insights de tu zona.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Field label="Nombre del negocio" value="Café Cobrand" onChange={() => {}} icon="briefcase" />
          <Field label="Email comercial" type="email" value="hola@cafecobrand.ar" onChange={() => {}} icon="mail" />
          <Field label="CUIT" value="30-71234567-8" onChange={() => {}} />
          <Field label="Categoría" value="Cafetería" onChange={() => {}} icon="coffee" />
          <Field label="Contraseña" type="password" value="" placeholder="Mínimo 8 caracteres" onChange={() => {}} icon="lock" />
        </div>
        <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginTop: 16, cursor: 'pointer' }}>
          <div style={{ width: 22, height: 22, borderRadius: 6, background: SPOTA.c.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
            <Icon name="check" size={14} color="#fff" strokeWidth={3} />
          </div>
          <span style={{ fontFamily: SPOTA.font.ui, fontSize: 12.5, color: SPOTA.c.textSoft, lineHeight: 1.5 }}>Acepto los <a style={{ color: SPOTA.c.primary, fontWeight: 600 }}>términos comerciales</a> y la <a style={{ color: SPOTA.c.primary, fontWeight: 600 }}>política de comisiones</a> de Spota Negocios.</span>
        </label>
        <div style={{ marginTop: 18 }}><Btn variant="primary" size="lg" full onClick={() => nav('bizHome')}>Activar herramientas comerciales</Btn></div>
        <p style={{ marginTop: 18, fontFamily: SPOTA.font.ui, fontSize: 12.5, color: SPOTA.c.textSoft, textAlign: 'center' }}>¿Ya tenés cuenta? <a onClick={() => nav('login')} style={{ color: SPOTA.c.primary, fontWeight: 700, cursor: 'pointer' }}>Iniciar sesión</a></p>
      </div>
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
        <button onClick={() => nav('home')} style={{ width: 36, height: 36, borderRadius: 999, border: 'none', background: 'rgba(255,255,255,0.12)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="user" size={18} color="#fff" /></button>
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
          { id: 'claim', t: 'Reclamar otro lugar', s: 'Sumar otra sucursal', i: 'plus', c: SPOTA.c.text },
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

// CU-21: Gestionar beneficios
const ScreenBizBenefits = ({ nav }) => {
  const [editing, setEditing] = React.useState(false);
  const benefits = [
    { id: 'b1', t: '15% off en café de filtro', cond: 'De lunes a jueves de 9 a 13', vence: 'Activo · 8 usos esta semana', active: true },
    { id: 'b2', t: 'Postre cortesía con almuerzo', cond: 'Mostrar el código en la app', vence: 'Activo · 3 usos esta semana', active: true },
    { id: 'b3', t: 'Menú degustación 2x1', cond: 'Reserva previa requerida', vence: 'Pausado', active: false },
  ];
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: SPOTA.c.bg }}>
      <AppHeader title="Beneficios exclusivos" leftIcon="arrowLeft" onLeft={() => nav('bizHome')} rightIcon="plus" onRight={() => setEditing(true)} />
      <div style={{ flex: 1, overflow: 'auto', padding: 20 }}>
        {editing ? (
          <>
            <h2 style={{ margin: '0 0 12px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 17, color: SPOTA.c.text }}>Nuevo beneficio</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Field label="Tipo" value="Descuento" onChange={() => {}} icon="gift" />
              <Field label="Título" placeholder="15% off en café de filtro" value="" onChange={() => {}} />
              <Field label="Condiciones" placeholder="Días, horarios, mínimos" value="" onChange={() => {}} />
              <Field label="Vigencia hasta" value="31 de mayo" onChange={() => {}} icon="calendar" />
            </div>
            <div style={{ marginTop: 18, display: 'flex', gap: 10 }}>
              <Btn variant="outline" full onClick={() => setEditing(false)}>Cancelar</Btn>
              <Btn variant="primary" full onClick={() => setEditing(false)}>Crear</Btn>
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
                  <button style={{ width: 32, height: 32, borderRadius: 8, border: 'none', background: 'transparent', cursor: 'pointer' }}><Icon name="edit" size={15} color={SPOTA.c.textSoft} /></button>
                  <button style={{ width: 32, height: 32, borderRadius: 8, border: 'none', background: 'transparent', cursor: 'pointer' }}><Icon name="trash" size={15} color={SPOTA.c.textSoft} /></button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// CU-22: Configurar campaña publicitaria
const ScreenBizCampaign = ({ nav }) => {
  const [budget, setBudget] = React.useState(8000);
  const [days, setDays] = React.useState(14);
  const [audience, setAudience] = React.useState(['Cafés', 'Cultura']);
  const tog = (v) => setAudience(a => a.includes(v) ? a.filter(x => x !== v) : [...a, v]);
  const reach = Math.round((budget / 50) + (days * 18));
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: SPOTA.c.bg }}>
      <AppHeader title="Nueva campaña" leftIcon="arrowLeft" onLeft={() => nav('bizHome')} />
      <div style={{ flex: 1, overflow: 'auto', padding: 20 }}>
        <div style={{ background: SPOTA.c.surface, borderRadius: 14, padding: 14, marginBottom: 14, border: `1px solid ${SPOTA.c.lineSoft}` }}>
          <h3 style={{ margin: '0 0 10px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 14, color: SPOTA.c.text }}>Tu segmento</h3>
          <p style={{ margin: '0 0 10px', fontFamily: SPOTA.font.ui, fontSize: 12.5, color: SPOTA.c.textSoft }}>Llegás a usuarios con afinidad a:</p>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {['Cafés', 'Cultura', 'Bares', 'Aire libre', 'Comida', 'Bienestar'].map(t => (
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
        <div style={{ background: SPOTA.c.primarySoft, borderRadius: 14, padding: 14, marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <Icon name="sparkles" size={16} color={SPOTA.c.primary} />
            <h3 style={{ margin: 0, fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 14, color: SPOTA.c.primaryDark }}>Alcance estimado</h3>
          </div>
          <p style={{ margin: 0, fontFamily: SPOTA.font.ui, fontSize: 13, color: SPOTA.c.primaryDark }}><strong>{reach.toLocaleString('es-AR')}</strong> impresiones · ~{Math.round(reach * 0.04)} interacciones</p>
        </div>
        <div style={{ background: SPOTA.c.surface, borderRadius: 14, padding: 12, marginBottom: 16, border: `1px dashed ${SPOTA.c.line}` }}>
          <p style={{ margin: '0 0 8px', fontFamily: SPOTA.font.ui, fontSize: 12, fontWeight: 600, color: SPOTA.c.textSoft, textTransform: 'uppercase', letterSpacing: 0.4 }}>Vista previa</p>
          <PlaceCard place={{ ...PLACES[0], tag: 'Patrocinado' }} density="cozy" famaVariant="classic" onClick={() => {}} />
        </div>
        <Btn variant="primary" size="lg" full onClick={() => nav('bizHome')}>Lanzar campaña</Btn>
      </div>
    </div>
  );
};

// CU-23: Panel de insights
const ScreenBizInsights = ({ nav }) => {
  const [period, setPeriod] = React.useState('30d');
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: SPOTA.c.bg }}>
      <AppHeader title="Insights" leftIcon="arrowLeft" onLeft={() => nav('bizHome')} rightIcon="filter" />
      <div style={{ display: 'flex', gap: 6, padding: '12px 20px 8px', overflowX: 'auto' }}>
        {[{ id: '7d', t: '7 días' }, { id: '30d', t: '30 días' }, { id: '90d', t: '90 días' }].map(o => (
          <Chip key={o.id} active={period === o.id} onClick={() => setPeriod(o.id)}>{o.t}</Chip>
        ))}
      </div>
      <div style={{ flex: 1, overflow: 'auto', padding: '4px 20px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, marginBottom: 14 }}>
          {[{ n: '1.4k', l: 'Impresiones', d: '+18%' }, { n: '312', l: 'Clicks', d: '+24%' }, { n: '87', l: 'Reservas', d: '+9%' }, { n: '$48k', l: 'GMV', d: '+31%' }].map(s => (
            <div key={s.l} style={{ padding: 14, background: SPOTA.c.surface, borderRadius: 12, border: `1px solid ${SPOTA.c.lineSoft}` }}>
              <div style={{ fontFamily: SPOTA.font.ui, fontSize: 11.5, color: SPOTA.c.textSoft, textTransform: 'uppercase', letterSpacing: 0.3 }}>{s.l}</div>
              <div style={{ fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 22, color: SPOTA.c.text, marginTop: 2 }}>{s.n}</div>
              <div style={{ fontFamily: SPOTA.font.ui, fontSize: 12, color: SPOTA.c.success, fontWeight: 600 }}>↑ {s.d}</div>
            </div>
          ))}
        </div>
        <div style={{ background: SPOTA.c.surface, borderRadius: 14, padding: 16, marginBottom: 14, border: `1px solid ${SPOTA.c.lineSoft}` }}>
          <h3 style={{ margin: '0 0 12px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 15, color: SPOTA.c.text }}>Tráfico por día</h3>
          <svg width="100%" height="120" viewBox="0 0 320 120">
            {[40, 65, 50, 80, 70, 95, 110, 90, 105, 75, 85, 100, 115, 95].map((h, i) => (
              <rect key={i} x={i * 22 + 4} y={120 - h} width="14" height={h} rx="3" fill={i === 12 ? SPOTA.c.secondary : SPOTA.c.primary} opacity={i === 12 ? 1 : 0.7} />
            ))}
          </svg>
        </div>
        <div style={{ background: SPOTA.c.surface, borderRadius: 14, padding: 16, marginBottom: 14, border: `1px solid ${SPOTA.c.lineSoft}` }}>
          <h3 style={{ margin: '0 0 12px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 15, color: SPOTA.c.text }}>Tendencias en Palermo</h3>
          {[{ t: 'café de especialidad', g: '+34%' }, { t: 'brunch dominical', g: '+22%' }, { t: 'after office', g: '+18%' }, { t: 'plan económico', g: '+12%' }].map(t => (
            <div key={t.t} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderTop: `1px solid ${SPOTA.c.lineSoft}` }}>
              <span style={{ fontFamily: SPOTA.font.ui, fontSize: 13.5, color: SPOTA.c.text }}>"{t.t}"</span>
              <Tag kind="softG">{t.g}</Tag>
            </div>
          ))}
        </div>
        <div style={{ background: SPOTA.c.surface, borderRadius: 14, padding: 16, border: `1px solid ${SPOTA.c.lineSoft}` }}>
          <h3 style={{ margin: '0 0 12px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 15, color: SPOTA.c.text }}>Perfil de tu audiencia</h3>
          {[{ l: '25-34 años', p: 62 }, { l: '35-44 años', p: 24 }, { l: '18-24 años', p: 14 }].map(a => (
            <div key={a.l} style={{ marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: SPOTA.font.ui, fontSize: 12.5, color: SPOTA.c.textSoft, marginBottom: 4 }}>
                <span>{a.l}</span><span style={{ fontWeight: 700, color: SPOTA.c.text }}>{a.p}%</span>
              </div>
              <div style={{ height: 6, borderRadius: 999, background: SPOTA.c.line, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: a.p + '%', background: SPOTA.c.primary }} />
              </div>
            </div>
          ))}
          <p style={{ margin: '8px 0 0', fontFamily: SPOTA.font.ui, fontSize: 11, color: SPOTA.c.textMuted, fontStyle: 'italic' }}>Datos agregados y anónimos.</p>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { ScreenClaimPlace, ScreenRegisterBiz, ScreenBizHome, ScreenBizBenefits, ScreenBizCampaign, ScreenBizInsights });
