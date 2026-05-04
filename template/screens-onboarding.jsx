// CU-01 a CU-05 — Onboarding y Perfil

// CU-01: Registrar cuenta
const ScreenRegister = ({ nav }) => {
  const [step, setStep] = React.useState(1);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [pwd, setPwd] = React.useState('');
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: SPOTA.c.bg }}>
      <AppHeader leftIcon="arrowLeft" onLeft={() => nav('home')} title="" />
      <div style={{ flex: 1, padding: '8px 24px 24px', display: 'flex', flexDirection: 'column' }}>
        <SpotaLogo size={32} />
        <h1 style={{ margin: '24px 0 6px', fontFamily: SPOTA.font.ui, fontSize: 28, fontWeight: 700, color: SPOTA.c.text, letterSpacing: -0.5 }}>
          Creá tu cuenta <span style={{ fontFamily: SPOTA.font.serif, fontStyle: 'italic', color: SPOTA.c.secondary, fontWeight: 400 }}>gratis</span>
        </h1>
        <p style={{ margin: '0 0 28px', fontFamily: SPOTA.font.ui, fontSize: 15, color: SPOTA.c.textSoft, lineHeight: 1.5 }}>
          Empezá a descubrir lo mejor de tu ciudad, con recomendaciones hechas por gente como vos.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Field label="¿Cómo te llamás?" placeholder="Sol Benítez" icon="user" value={name} onChange={setName} />
          <Field label="Email" type="email" placeholder="vos@email.com" icon="mail" value={email} onChange={setEmail} />
          <Field label="Contraseña" type="password" placeholder="Mínimo 8 caracteres" icon="lock" value={pwd} onChange={setPwd} hint="Usá una combinación de letras y números" />
        </div>
        <div style={{ marginTop: 20 }}>
          <Btn variant="primary" size="lg" full iconRight="arrowRight" onClick={() => nav('preferences')}>Continuar</Btn>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '20px 0' }}>
          <div style={{ flex: 1, height: 1, background: SPOTA.c.line }} />
          <span style={{ fontFamily: SPOTA.font.ui, fontSize: 12, color: SPOTA.c.textMuted }}>o registrate con</span>
          <div style={{ flex: 1, height: 1, background: SPOTA.c.line }} />
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <Btn variant="light" full icon="google">Google</Btn>
          <Btn variant="dark" full icon="apple">Apple</Btn>
        </div>
        <p style={{ marginTop: 'auto', paddingTop: 16, fontFamily: SPOTA.font.ui, fontSize: 13, color: SPOTA.c.textSoft, textAlign: 'center' }}>
          ¿Ya tenés cuenta? <a onClick={() => nav('login')} style={{ color: SPOTA.c.primary, fontWeight: 700, cursor: 'pointer' }}>Iniciar sesión</a>
        </p>
      </div>
    </div>
  );
};

// CU-02: Iniciar sesión
const ScreenLogin = ({ nav }) => {
  const [email, setEmail] = React.useState('sol@spota.com');
  const [pwd, setPwd] = React.useState('••••••••');
  const [recover, setRecover] = React.useState(false);
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: SPOTA.c.bg, position: 'relative' }}>
      <AppHeader leftIcon="arrowLeft" onLeft={() => nav('home')} title="" />
      <div style={{ flex: 1, padding: '8px 24px 24px', display: 'flex', flexDirection: 'column' }}>
        <SpotaLogo size={32} />
        <h1 style={{ margin: '24px 0 6px', fontFamily: SPOTA.font.ui, fontSize: 28, fontWeight: 700, color: SPOTA.c.text, letterSpacing: -0.5 }}>
          Bienvenida de <span style={{ fontFamily: SPOTA.font.serif, fontStyle: 'italic', color: SPOTA.c.secondary, fontWeight: 400 }}>vuelta</span>
        </h1>
        <p style={{ margin: '0 0 28px', fontFamily: SPOTA.font.ui, fontSize: 15, color: SPOTA.c.textSoft }}>
          Tus planes, colecciones y favoritos te están esperando.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Field label="Email" type="email" placeholder="vos@email.com" icon="mail" value={email} onChange={setEmail} />
          <Field label="Contraseña" type="password" icon="lock" value={pwd} onChange={setPwd} />
          <a onClick={() => setRecover(true)} style={{ alignSelf: 'flex-end', fontFamily: SPOTA.font.ui, fontSize: 13, color: SPOTA.c.primary, fontWeight: 600, cursor: 'pointer', marginTop: -4 }}>
            ¿Olvidaste tu contraseña?
          </a>
        </div>
        <div style={{ marginTop: 20 }}>
          <Btn variant="primary" size="lg" full onClick={() => nav('discover')}>Iniciar sesión</Btn>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '20px 0' }}>
          <div style={{ flex: 1, height: 1, background: SPOTA.c.line }} />
          <span style={{ fontFamily: SPOTA.font.ui, fontSize: 12, color: SPOTA.c.textMuted }}>o</span>
          <div style={{ flex: 1, height: 1, background: SPOTA.c.line }} />
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <Btn variant="light" full icon="google">Google</Btn>
          <Btn variant="dark" full icon="apple">Apple</Btn>
        </div>
        <p style={{ marginTop: 'auto', paddingTop: 16, fontFamily: SPOTA.font.ui, fontSize: 13, color: SPOTA.c.textSoft, textAlign: 'center' }}>
          ¿No tenés cuenta? <a onClick={() => nav('register')} style={{ color: SPOTA.c.primary, fontWeight: 700, cursor: 'pointer' }}>Crear cuenta</a>
        </p>
      </div>
      {recover && <RecoverModal onClose={() => setRecover(false)} />}
    </div>
  );
};

// CU-03: Recuperar contraseña (modal)
const RecoverModal = ({ onClose }) => {
  const [sent, setSent] = React.useState(false);
  const [email, setEmail] = React.useState('');
  return (
    <div style={{
      position: 'absolute', inset: 0, background: 'rgba(43,37,35,0.4)',
      display: 'flex', alignItems: 'flex-end', zIndex: 50,
      backdropFilter: 'blur(2px)',
    }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{
        background: SPOTA.c.bg, width: '100%',
        borderTopLeftRadius: 24, borderTopRightRadius: 24,
        padding: '12px 24px 28px', animation: 'slideUp 280ms cubic-bezier(.2,.8,.2,1)',
      }}>
        <div style={{ width: 40, height: 4, borderRadius: 999, background: SPOTA.c.line, margin: '0 auto 18px' }} />
        {!sent ? (
          <>
            <h2 style={{ margin: '0 0 6px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 22, color: SPOTA.c.text }}>
              Recuperar contraseña
            </h2>
            <p style={{ margin: '0 0 18px', fontFamily: SPOTA.font.ui, fontSize: 14, color: SPOTA.c.textSoft, lineHeight: 1.5 }}>
              Te mandamos un link a tu email para que puedas crear una nueva.
            </p>
            <Field label="Email" placeholder="vos@email.com" icon="mail" value={email} onChange={setEmail} />
            <div style={{ marginTop: 18, display: 'flex', gap: 10 }}>
              <Btn variant="outline" full onClick={onClose}>Cancelar</Btn>
              <Btn variant="primary" full onClick={() => setSent(true)}>Enviar link</Btn>
            </div>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '8px 0' }}>
            <div style={{ width: 64, height: 64, borderRadius: 999, background: SPOTA.c.primarySoft,
              display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
              <Icon name="mail" size={28} color={SPOTA.c.primary} />
            </div>
            <h2 style={{ margin: '0 0 6px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 20, color: SPOTA.c.text }}>
              Revisá tu email
            </h2>
            <p style={{ margin: '0 0 20px', fontFamily: SPOTA.font.ui, fontSize: 14, color: SPOTA.c.textSoft, lineHeight: 1.5 }}>
              Te enviamos un link de recuperación. Llega en menos de 2 minutos.
            </p>
            <Btn variant="primary" full onClick={onClose}>Entendido</Btn>
          </div>
        )}
      </div>
    </div>
  );
};

// CU-04: Gestionar preferencias (onboarding)
const ScreenPreferences = ({ nav, embedded }) => {
  const [step, setStep] = React.useState(1);
  const [types, setTypes] = React.useState(['Cafés', 'Cultura']);
  const [zones, setZones] = React.useState(['Palermo', 'Villa Crespo']);
  const [context, setContext] = React.useState('Pareja');
  const [freq, setFreq] = React.useState('Varias por semana');
  const total = 4;

  const toggle = (set, v, list) => set(list.includes(v) ? list.filter(x => x !== v) : [...list, v]);

  const optionGrid = (items, selected, onSelect, multi = true) => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
      {items.map(it => {
        const on = multi ? selected.includes(it.label) : selected === it.label;
        return (
          <button key={it.label} onClick={() => multi ? toggle(onSelect, it.label, selected) : onSelect(it.label)} style={{
            padding: '16px 14px', borderRadius: 14, cursor: 'pointer', textAlign: 'left',
            background: on ? SPOTA.c.primary : SPOTA.c.surface,
            color: on ? '#fff' : SPOTA.c.text,
            border: `1.5px solid ${on ? SPOTA.c.primary : SPOTA.c.line}`,
            fontFamily: SPOTA.font.ui, transition: 'all 150ms',
          }}>
            <div style={{ fontSize: 22, marginBottom: 6 }}>{it.emoji}</div>
            <div style={{ fontWeight: 600, fontSize: 14 }}>{it.label}</div>
          </button>
        );
      })}
    </div>
  );

  const stepConfig = {
    1: {
      title: '¿Qué experiencias te gustan?',
      subtitle: 'Elegí al menos 3. Esto nos ayuda a recomendarte lo mejor.',
      content: optionGrid([
        { label: 'Cafés', emoji: '☕' }, { label: 'Comida', emoji: '🍝' },
        { label: 'Bares', emoji: '🍷' }, { label: 'Cultura', emoji: '🎨' },
        { label: 'Aire libre', emoji: '🌳' }, { label: 'Música en vivo', emoji: '🎷' },
        { label: 'Cine y teatro', emoji: '🎭' }, { label: 'Bienestar', emoji: '🧘' },
      ], types, setTypes),
    },
    2: {
      title: '¿Por qué barrios te movés?',
      subtitle: 'Sumá los que recorrés más seguido.',
      content: optionGrid([
        { label: 'Palermo', emoji: '🌳' }, { label: 'Villa Crespo', emoji: '🎨' },
        { label: 'San Telmo', emoji: '🏛️' }, { label: 'Recoleta', emoji: '🥖' },
        { label: 'Belgrano', emoji: '🌸' }, { label: 'Caballito', emoji: '🚲' },
        { label: 'Chacarita', emoji: '🍺' }, { label: 'Almagro', emoji: '🎵' },
      ], zones, setZones),
    },
    3: {
      title: '¿Con quién salís más seguido?',
      subtitle: 'Esto define el estilo de las recomendaciones.',
      content: optionGrid([
        { label: 'Solo/a', emoji: '🚶' }, { label: 'Pareja', emoji: '💑' },
        { label: 'Amigos', emoji: '👯' }, { label: 'Familia', emoji: '👨‍👩‍👧' },
      ], context, setContext, false),
    },
    4: {
      title: '¿Con qué frecuencia salís?',
      subtitle: 'Para poder sugerirte planes nuevos al ritmo correcto.',
      content: optionGrid([
        { label: 'Varias por semana', emoji: '🔥' }, { label: 'Una vez por semana', emoji: '📅' },
        { label: 'Cada quince días', emoji: '🗓️' }, { label: 'Una vez por mes', emoji: '🌙' },
      ], freq, setFreq, false),
    },
  }[step];

  const next = () => step < total ? setStep(step + 1) : nav('discover');

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: SPOTA.c.bg }}>
      <div style={{ padding: '12px 16px 4px', display: 'flex', alignItems: 'center', gap: 12 }}>
        {step > 1 && (
          <button onClick={() => setStep(step - 1)} style={{ width: 40, height: 40, borderRadius: 999, border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="arrowLeft" size={22} />
          </button>
        )}
        <div style={{ flex: 1, display: 'flex', gap: 4 }}>
          {[...Array(total)].map((_, i) => (
            <div key={i} style={{
              flex: 1, height: 4, borderRadius: 999,
              background: i < step ? SPOTA.c.primary : SPOTA.c.line,
              transition: 'background 200ms',
            }} />
          ))}
        </div>
        {!embedded && (
          <button onClick={() => nav('discover')} style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: SPOTA.font.ui, fontSize: 13, fontWeight: 600, color: SPOTA.c.textSoft }}>
            Saltar
          </button>
        )}
      </div>
      <div style={{ flex: 1, padding: '16px 24px 24px', display: 'flex', flexDirection: 'column' }}>
        <p style={{ margin: '0 0 6px', fontFamily: SPOTA.font.ui, fontSize: 13, fontWeight: 700, color: SPOTA.c.primary, letterSpacing: 0.4, textTransform: 'uppercase' }}>
          Paso {step} de {total}
        </p>
        <h1 style={{ margin: '0 0 8px', fontFamily: SPOTA.font.ui, fontSize: 26, fontWeight: 700, color: SPOTA.c.text, letterSpacing: -0.4, lineHeight: 1.2 }}>
          {stepConfig.title}
        </h1>
        <p style={{ margin: '0 0 24px', fontFamily: SPOTA.font.ui, fontSize: 14.5, color: SPOTA.c.textSoft, lineHeight: 1.5 }}>
          {stepConfig.subtitle}
        </p>
        {stepConfig.content}
        <div style={{ marginTop: 'auto', paddingTop: 24 }}>
          <Btn variant="primary" size="lg" full iconRight="arrowRight" onClick={next}>
            {step === total ? 'Empezar a explorar' : 'Continuar'}
          </Btn>
        </div>
      </div>
    </div>
  );
};

// CU-05: Gestionar credenciales
const ScreenCredentials = ({ nav }) => {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: SPOTA.c.bg }}>
      <AppHeader title="Cuenta y seguridad" leftIcon="arrowLeft" onLeft={() => nav('profile')} />
      <div style={{ flex: 1, overflow: 'auto', padding: 20 }}>
        <div style={{ background: SPOTA.c.surface, borderRadius: 14, padding: 16, marginBottom: 16, border: `1px solid ${SPOTA.c.lineSoft}` }}>
          <h3 style={{ margin: '0 0 14px', fontFamily: SPOTA.font.ui, fontSize: 15, fontWeight: 700, color: SPOTA.c.text }}>Datos personales</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <Field label="Nombre" value="Sol Benítez" onChange={() => {}} icon="user" />
            <Field label="Email" type="email" value="sol@spota.com" onChange={() => {}} icon="mail" />
            <Field label="Teléfono" value="+54 11 5555-1234" onChange={() => {}} hint="Verificado · sólo se muestra a hosts contratados" />
          </div>
        </div>
        <div style={{ background: SPOTA.c.surface, borderRadius: 14, padding: 16, marginBottom: 16, border: `1px solid ${SPOTA.c.lineSoft}` }}>
          <h3 style={{ margin: '0 0 14px', fontFamily: SPOTA.font.ui, fontSize: 15, fontWeight: 700, color: SPOTA.c.text }}>Seguridad</h3>
          <Field label="Contraseña actual" type="password" value="••••••••••" onChange={() => {}} icon="lock" />
          <div style={{ height: 12 }} />
          <Field label="Nueva contraseña" type="password" placeholder="Mínimo 8 caracteres" value="" onChange={() => {}} icon="lock" />
        </div>
        <div style={{ background: SPOTA.c.surface, borderRadius: 14, padding: 16, marginBottom: 16, border: `1px solid ${SPOTA.c.lineSoft}` }}>
          <h3 style={{ margin: '0 0 14px', fontFamily: SPOTA.font.ui, fontSize: 15, fontWeight: 700, color: SPOTA.c.text }}>Cuentas vinculadas</h3>
          {[{ n: 'Google', i: 'google', linked: true, sub: 'sol@gmail.com' }, { n: 'Apple', i: 'apple', linked: false, sub: 'No vinculada' }].map(a => (
            <div key={a.n} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderTop: `1px solid ${SPOTA.c.lineSoft}` }}>
              <Icon name={a.i} size={22} color={SPOTA.c.text} />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: SPOTA.font.ui, fontWeight: 600, fontSize: 14, color: SPOTA.c.text }}>{a.n}</div>
                <div style={{ fontFamily: SPOTA.font.ui, fontSize: 12, color: SPOTA.c.textSoft }}>{a.sub}</div>
              </div>
              <Btn variant={a.linked ? 'outline' : 'primary'} size="sm">{a.linked ? 'Desvincular' : 'Vincular'}</Btn>
            </div>
          ))}
        </div>
        <Btn variant="primary" size="lg" full>Guardar cambios</Btn>
        <button style={{ marginTop: 16, width: '100%', height: 48, border: 'none', background: 'transparent', fontFamily: SPOTA.font.ui, fontSize: 14, fontWeight: 600, color: SPOTA.c.danger, cursor: 'pointer' }}>
          Eliminar mi cuenta
        </button>
      </div>
    </div>
  );
};

Object.assign(window, { ScreenRegister, ScreenLogin, ScreenPreferences, ScreenCredentials });
