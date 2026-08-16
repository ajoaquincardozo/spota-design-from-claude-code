// ========================================================================
// 06-screens-onboarding.jsx
// ========================================================================
// CU-01 a CU-05 — Onboarding y Perfil

// CU-01 / CU-001-001: Registrar cuenta — full bleed, contenido centrado verticalmente.
// Incluye fecha de nacimiento + validación 18 años (§3.11 pasos 10-12) y aceptación
// de T&C (§3.11 pasos 13-14). El CTA encadena con verifyCode antes de preferences.
function ageFromBirthAR(s) {
  const m = (s || '').match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!m) return null;
  const d = parseInt(m[1], 10), mo = parseInt(m[2], 10) - 1, y = parseInt(m[3], 10);
  const dt = new Date(y, mo, d);
  if (dt.getFullYear() !== y || dt.getMonth() !== mo || dt.getDate() !== d) return null;
  const today = new Date();
  let age = today.getFullYear() - y;
  const beforeBirthday = today.getMonth() < mo || (today.getMonth() === mo && today.getDate() < d);
  if (beforeBirthday) age -= 1;
  return age;
}
const ScreenRegister = ({ nav }) => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [pwd, setPwd] = React.useState('');
  const [birth, setBirth] = React.useState('');
  const [accepted, setAccepted] = React.useState(false);
  const age = ageFromBirthAR(birth);
  const ageError = birth && age != null && age < 18;
  const formatError = birth && age == null;
  const ready = name && email && pwd && birth && !formatError && !ageError && accepted;
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: SPOTA.c.bg, position: 'relative' }}>
      {/* Botón volver flotante */}
      <button onClick={() => nav('login')} style={{
        position: 'absolute', top: 14, left: 14, width: 40, height: 40, borderRadius: 999,
        border: 'none', background: SPOTA.c.surface, cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 3px rgba(43,37,35,0.08)', zIndex: 5,
      }}><Icon name="arrowLeft" size={18} /></button>
      {/* Contenido scrolleable */}
      <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '64px 24px 16px' }}>
        <SpotaLogo size={32} />
        <h1 style={{ margin: '20px 0 6px', fontFamily: SPOTA.font.ui, fontSize: 28, fontWeight: 700, color: SPOTA.c.text, letterSpacing: -0.5 }}>
          Creá tu cuenta <span style={{ fontFamily: SPOTA.font.serif, fontStyle: 'italic', color: SPOTA.c.secondary, fontWeight: 400 }}>gratis</span>
        </h1>
        <p style={{ margin: '0 0 22px', fontFamily: SPOTA.font.ui, fontSize: 15, color: SPOTA.c.textSoft, lineHeight: 1.5 }}>
          Sumá puntos en tu Fama Score y descubrí lo bueno cerca tuyo.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Field label="¿Cómo te llamás?" placeholder="Sol Benítez" icon="user" value={name} onChange={setName} />
          <Field label="Email" type="email" placeholder="vos@email.com" icon="mail" value={email} onChange={setEmail} />
          <Field label="Contraseña" type="password" placeholder="Mínimo 8 caracteres" icon="lock" value={pwd} onChange={setPwd} />
          <Field
            label="Fecha de nacimiento (DD/MM/AAAA)"
            placeholder="17/05/1995"
            icon="calendar"
            value={birth}
            onChange={setBirth}
            error={formatError ? 'Usá el formato DD/MM/AAAA.' : ageError ? 'Spota está disponible para mayores de 18 años.' : null}
          />
        </div>
        <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginTop: 16, cursor: 'pointer' }}>
          <input type="checkbox" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} style={{ marginTop: 4 }} />
          <span style={{ fontFamily: SPOTA.font.ui, fontSize: 12.5, color: SPOTA.c.textSoft, lineHeight: 1.5 }}>
            Acepto los <a style={{ color: SPOTA.c.primary, fontWeight: 600 }}>Términos y Condiciones</a> y la <a style={{ color: SPOTA.c.primary, fontWeight: 600 }}>Política de Privacidad</a> de Spota.
          </span>
        </label>
      </div>
      {/* CTA + footer fijo abajo */}
      <div style={{ padding: '12px 24px 28px', background: SPOTA.c.bg }}>
        <Btn variant="primary" size="lg" full iconRight="arrowRight" disabled={!ready} onClick={() => nav('verifyCode', { from: 'register' })}>Continuar</Btn>
        <p style={{ margin: '14px 0 0', fontFamily: SPOTA.font.ui, fontSize: 13, color: SPOTA.c.textSoft, textAlign: 'center' }}>
          ¿Ya tenés cuenta? <a onClick={() => nav('login')} style={{ color: SPOTA.c.primary, fontWeight: 700, cursor: 'pointer' }}>Iniciar sesión</a>
        </p>
      </div>
    </div>
  );
};

// CU-02: Iniciar sesión — full bleed, contenido centrado, dos perfiles (usuario / negocio)
const ScreenLogin = ({ nav }) => {
  const [profile, setProfile] = React.useState('user'); // user | biz
  const [emailUser, setEmailUser] = React.useState('sol@spota.com');
  const [emailBiz, setEmailBiz] = React.useState('');
  const [pwd, setPwd] = React.useState('••••••••');
  const [recover, setRecover] = React.useState(false);
  const isBiz = profile === 'biz';
  const email = isBiz ? emailBiz : emailUser;
  const setEmail = isBiz ? setEmailBiz : setEmailUser;
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: SPOTA.c.bg, position: 'relative', overflow: 'hidden' }}>
      {/* Fondo: imagen + gradiente full-bleed. Más oscuro que el de Splash porque acá el contenido vive en la franja media. */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `linear-gradient(180deg, rgba(43,37,35,0.40) 0%, rgba(43,37,35,0.75) 50%, rgba(43,37,35,0.95) 100%), url(${photo('cafePalermo', 1200, 1800)})`,
        backgroundSize: 'cover', backgroundPosition: 'center',
      }} />
      {/* Contenido centrado */}
      <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 24px', zIndex: 1 }}>
        <SpotaLogo size={32} dark color={SPOTA.c.secondary} />
        <h1 style={{ margin: '20px 0 6px', fontFamily: SPOTA.font.ui, fontSize: 28, fontWeight: 700, color: '#fff', letterSpacing: -0.5, textShadow: '0 2px 6px rgba(0,0,0,0.45)' }}>
          {isBiz ? <>Entrá a tu <span style={{ fontFamily: SPOTA.font.serif, fontStyle: 'italic', color: SPOTA.c.accent, fontWeight: 400 }}>panel</span></> : <>Bienvenida de <span style={{ fontFamily: SPOTA.font.serif, fontStyle: 'italic', color: SPOTA.c.accent, fontWeight: 400 }}>vuelta</span></>}
        </h1>
        <p style={{ margin: '0 0 18px', fontFamily: SPOTA.font.ui, fontSize: 15, color: 'rgba(255,255,255,0.92)', textShadow: '0 1px 3px rgba(0,0,0,0.4)' }}>
          {isBiz ? 'Gestioná beneficios, campañas e insights de tu local.' : 'Tus planes, colecciones y favoritos te están esperando.'}
        </p>
        {/* Toggle usuario / negocio */}
        <div style={{ display: 'inline-flex', padding: 3, borderRadius: 999, background: SPOTA.c.surface, border: `1px solid ${SPOTA.c.line}`, marginBottom: 16, alignSelf: 'flex-start' }}>
          {[{ id: 'user', t: 'Usuario' }, { id: 'biz', t: 'Negocio' }].map(o => {
            const on = profile === o.id;
            return <button key={o.id} onClick={() => setProfile(o.id)} style={{
              padding: '7px 16px', borderRadius: 999, border: 'none', cursor: 'pointer',
              background: on ? (isBiz ? SPOTA.c.secondary : SPOTA.c.primary) : 'transparent',
              color: on ? '#fff' : SPOTA.c.textSoft,
              fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 12.5, letterSpacing: 0.2,
              transition: 'all 180ms',
            }}>{o.t}</button>;
          })}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Field label="Email" type="email" placeholder={isBiz ? 'negocio@email.com' : 'vos@email.com'} icon="mail" value={email} onChange={setEmail} onDark />
          <Field label="Contraseña" type="password" icon="lock" value={pwd} onChange={setPwd} onDark />
          <a onClick={() => nav('recover')} style={{ alignSelf: 'flex-end', fontFamily: SPOTA.font.ui, fontSize: 13, color: '#fff', fontWeight: 600, cursor: 'pointer', marginTop: -4, textDecoration: 'underline', textUnderlineOffset: 3 }}>
            ¿Olvidaste tu contraseña?
          </a>
        </div>
      </div>
      {/* CTA fijo abajo */}
      <div style={{ position: 'relative', padding: '12px 24px 28px', zIndex: 1 }}>
        <Btn variant={isBiz ? 'secondary' : 'primary'} size="lg" full onClick={() => nav(isBiz ? 'bizHome' : 'verifyCode', isBiz ? undefined : { from: 'login' })}>Iniciar sesión</Btn>
        <p style={{ margin: '14px 0 0', fontFamily: SPOTA.font.ui, fontSize: 13, color: 'rgba(255,255,255,0.85)', textAlign: 'center' }}>
          {isBiz
            ? <>¿Aún no registraste tu negocio? <a onClick={() => nav('bizRegister', { from: 'login' })} style={{ color: '#fff', fontWeight: 700, cursor: 'pointer' }}>Sumalo</a></>
            : <>¿No tenés cuenta? <a onClick={() => nav('register')} style={{ color: '#fff', fontWeight: 700, cursor: 'pointer' }}>Crear cuenta</a></>}
        </p>
      </div>
      {recover && <RecoverModal onClose={() => setRecover(false)} />}
    </div>
  );
};

// CU-001-002 §3.1 — Verificación por código enviado al email (6 dígitos).
// Estados: input vacío / completo / inválido / vencido / bloqueado.
const ScreenVerifyCode = ({ nav, params }) => {
  const [digits, setDigits] = React.useState(['', '', '', '', '', '']);
  const [state, setState] = React.useState('idle'); // idle | invalid | expired | blocked
  const [remaining, setRemaining] = React.useState(300); // 5 minutos
  // CU-001-001 §3.11 paso 21: canónico = 60s entre reenvíos.
  const [resendIn, setResendIn] = React.useState(60);
  const [attempts, setAttempts] = React.useState(0);
  const refs = React.useRef([]);

  React.useEffect(() => {
    if (state === 'blocked') return;
    const t = setInterval(() => {
      setRemaining(r => Math.max(0, r - 1));
      setResendIn(r => Math.max(0, r - 1));
    }, 1000);
    return () => clearInterval(t);
  }, [state]);

  React.useEffect(() => {
    if (remaining === 0 && state !== 'blocked') setState('expired');
  }, [remaining, state]);

  const onDigit = (i, v) => {
    if (state === 'expired' || state === 'blocked') return;
    const digit = (v || '').replace(/[^0-9]/g, '').slice(-1);
    const next = [...digits];
    next[i] = digit;
    setDigits(next);
    if (digit && i < 5) refs.current[i + 1]?.focus();
  };

  const filled = digits.every(d => d.length === 1);
  const value = digits.join('');

  const submit = () => {
    if (value === '000000') {
      const a = attempts + 1;
      setAttempts(a);
      if (a >= 3) setState('blocked'); else setState('invalid');
    } else {
      // CU-001-001 §3.11 paso 22: tras verificar, alta nueva va al wizard de preferencias;
      // login va a Home.
      const from = params && params.from;
      if (from === 'register') nav('preferences', { mode: 'onboarding' });
      else nav('home');
    }
  };

  const resend = () => {
    if (resendIn > 0) return;
    setDigits(['','','','','','']);
    setState('idle');
    setRemaining(300);
    setResendIn(60);
  };

  const mm = String(Math.floor(remaining / 60)).padStart(2, '0');
  const ss = String(remaining % 60).padStart(2, '0');

  const message = {
    idle: 'Te enviamos un código de 6 dígitos. Llega en menos de 2 minutos.',
    invalid: 'El código no coincide. Volvé a ingresarlo o pedí uno nuevo.',
    expired: 'El código venció. Pedí uno nuevo para continuar.',
    blocked: 'Cuenta bloqueada por intentos fallidos. Probá más tarde o recuperá tu contraseña.',
  }[state];

  const messageColor = state === 'idle' ? SPOTA.c.textSoft : SPOTA.c.danger;

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: SPOTA.c.bg }}>
      <AppHeader title="Verificación" leftIcon="arrowLeft" onLeft={() => nav(params && params.from === 'register' ? 'register' : 'login')} />
      <div style={{ flex: 1, padding: '20px 24px 28px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ width: 72, height: 72, borderRadius: 999, background: SPOTA.c.primarySoft, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '8px 0 18px' }}>
          <Icon name="shield" size={32} color={SPOTA.c.primary} />
        </div>
        <h1 style={{ margin: '0 0 6px', fontFamily: SPOTA.font.ui, fontSize: 24, fontWeight: 700, color: SPOTA.c.text, letterSpacing: -0.4 }}>
          Ingresá el código
        </h1>
        <p style={{ margin: '0 0 24px', fontFamily: SPOTA.font.ui, fontSize: 14, color: messageColor, lineHeight: 1.5 }}>
          {message}
        </p>
        <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
          {digits.map((d, i) => (
            <input key={i} ref={el => refs.current[i] = el}
              value={d} onChange={(e) => onDigit(i, e.target.value)}
              inputMode="numeric" maxLength={1}
              disabled={state === 'expired' || state === 'blocked'}
              style={{
                flex: 1, minWidth: 0, width: 0, height: 56, padding: 0,
                textAlign: 'center', borderRadius: 12,
                border: `1.5px solid ${state === 'invalid' ? SPOTA.c.danger : (d ? SPOTA.c.primary : SPOTA.c.line)}`,
                background: state === 'blocked' ? SPOTA.c.lineSoft : SPOTA.c.surface,
                fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 22, color: SPOTA.c.text, outline: 'none',
              }}
            />
          ))}
        </div>
        <p style={{ margin: '0 0 14px', fontFamily: SPOTA.font.ui, fontSize: 11.5, fontStyle: 'italic', color: SPOTA.c.textMuted }}>
          Tip prototipo: ingresá <strong style={{ fontStyle: 'normal' }}>123456</strong> para pasar · <strong style={{ fontStyle: 'normal' }}>000000</strong> simula código inválido.
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <span style={{ fontFamily: SPOTA.font.ui, fontSize: 13, color: SPOTA.c.textSoft }}>
            {state === 'expired' ? 'Código vencido' : state === 'blocked' ? 'Cuenta bloqueada' : `Vigente: ${mm}:${ss}`}
          </span>
          <button onClick={resend} disabled={resendIn > 0 || state === 'blocked'} style={{
            border: 'none', background: 'transparent',
            cursor: (resendIn > 0 || state === 'blocked') ? 'not-allowed' : 'pointer',
            fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 13,
            color: (resendIn > 0 || state === 'blocked') ? SPOTA.c.textMuted : SPOTA.c.primary,
          }}>
            {resendIn > 0 && state !== 'blocked' ? `Reenviar (${resendIn}s)` : 'Reenviar código'}
          </button>
        </div>
        <div style={{ marginTop: 'auto' }}>
          <Btn variant="primary" size="lg" full disabled={!filled || state === 'expired' || state === 'blocked'} onClick={submit}>
            Verificar y continuar
          </Btn>
          {state === 'blocked' && (
            <Btn variant="ghost" size="md" full onClick={() => nav('recover')} style={{ marginTop: 10 }}>
              Recuperar contraseña
            </Btn>
          )}
        </div>
      </div>
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

// CU-04: Gestionar preferencias (onboarding). Wizard de 5 pasos: el 5to es
// "Restricciones alimentarias y de accesibilidad" (opcional) — CU-001-004 §3.13.
const ScreenPreferences = ({ nav, embedded, params }) => {
  // CU-001-004 §3.13: dos modos del wizard (onboarding ↔ edit). El flag puede
  // venir como prop `embedded` (legacy) o como params.mode='onboarding'.
  const isOnboarding = embedded || (params && params.mode === 'onboarding');
  const isEdit = !isOnboarding;
  const finishTarget = isEdit ? 'profile' : 'home';
  const [step, setStep] = React.useState(1);
  const [types, setTypes] = React.useState(['Cafés', 'Cultura']);
  const [zones, setZones] = React.useState(['Palermo', 'Villa Crespo']);
  const [context, setContext] = React.useState('Pareja');
  const [freq, setFreq] = React.useState('Varias por semana');
  const [restrictions, setRestrictions] = React.useState([]);
  const total = 5;

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
            <div style={{ marginBottom: 8 }}>
              <Icon name={it.icon} size={22} color={on ? '#fff' : SPOTA.c.secondary} />
            </div>
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
        { label: 'Cafés', icon: 'coffee' }, { label: 'Comida', icon: 'utensils' },
        { label: 'Bares', icon: 'wineglass' }, { label: 'Cultura', icon: 'palette' },
        { label: 'Aire libre', icon: 'leaf' }, { label: 'Música en vivo', icon: 'music' },
        { label: 'Cine y teatro', icon: 'mask' }, { label: 'Bienestar', icon: 'yoga' },
      ], types, setTypes),
    },
    2: {
      title: '¿Por qué barrios te movés?',
      subtitle: 'Sumá los que recorrés más seguido.',
      content: optionGrid([
        { label: 'Palermo', icon: 'pin' }, { label: 'Villa Crespo', icon: 'pin' },
        { label: 'San Telmo', icon: 'pin' }, { label: 'Recoleta', icon: 'pin' },
        { label: 'Belgrano', icon: 'pin' }, { label: 'Caballito', icon: 'pin' },
        { label: 'Chacarita', icon: 'pin' }, { label: 'Almagro', icon: 'pin' },
      ], zones, setZones),
    },
    3: {
      title: '¿Con quién salís más seguido?',
      subtitle: 'Esto define el estilo de las recomendaciones.',
      content: optionGrid([
        { label: 'Solo/a', icon: 'walk' }, { label: 'Pareja', icon: 'twoUsers' },
        { label: 'Amigos', icon: 'users' }, { label: 'Familia', icon: 'family' },
      ], context, setContext, false),
    },
    4: {
      title: '¿Con qué frecuencia salís?',
      subtitle: 'Para poder sugerirte planes nuevos al ritmo correcto.',
      content: optionGrid([
        { label: 'Varias por semana', icon: 'fire' }, { label: 'Una vez por semana', icon: 'calendar' },
        { label: 'Cada quince días', icon: 'clock' }, { label: 'Una vez por mes', icon: 'moon' },
      ], freq, setFreq, false),
    },
    5: {
      title: 'Restricciones (opcional)',
      subtitle: 'Si tenés alguna restricción alimentaria o de accesibilidad, las usamos para filtrar recomendaciones.',
      content: optionGrid([
        { label: 'Vegetariano', icon: 'leaf' }, { label: 'Vegano', icon: 'leaf' },
        { label: 'Sin gluten', icon: 'check' }, { label: 'Sin lactosa', icon: 'check' },
        { label: 'Movilidad reducida', icon: 'walk' }, { label: 'Sin restricciones', icon: 'sparkles' },
      ], restrictions, setRestrictions),
    },
  }[step];

  // P3-42: feedback de "Preferencias guardadas" antes de navegar al destino.
  const [toast, setToast] = React.useState(null);
  const next = () => {
    if (step < total) { setStep(step + 1); return; }
    setToast(isEdit ? 'Preferencias guardadas' : '¡Listo! Vamos a Descubrir');
    window.setTimeout(() => nav(finishTarget), 900);
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: SPOTA.c.bg, position: 'relative' }}>
      <div style={{ padding: '12px 16px 4px', display: 'flex', alignItems: 'center', gap: 12 }}>
        {step > 1 ? (
          <button onClick={() => setStep(step - 1)} style={{ width: 40, height: 40, borderRadius: 999, border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="arrowLeft" size={22} />
          </button>
        ) : isEdit ? (
          <button onClick={() => nav('profile')} style={{ width: 40, height: 40, borderRadius: 999, border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="arrowLeft" size={22} />
          </button>
        ) : null}
        <div style={{ flex: 1, display: 'flex', gap: 4 }}>
          {[...Array(total)].map((_, i) => (
            <div key={i} style={{
              flex: 1, height: 4, borderRadius: 999,
              background: i < step ? SPOTA.c.primary : SPOTA.c.line,
              transition: 'background 200ms',
            }} />
          ))}
        </div>
        {isOnboarding && (
          <button onClick={() => nav('home')} style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: SPOTA.font.ui, fontSize: 13, fontWeight: 600, color: SPOTA.c.textSoft }}>
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
            {step === total ? (isEdit ? 'Guardar preferencias' : 'Empezar a explorar') : 'Continuar'}
          </Btn>
          {step === 5 && (
            <button onClick={() => { setRestrictions(['Sin restricciones']); next(); }} style={{
              marginTop: 12, width: '100%', border: 'none', background: 'transparent', cursor: 'pointer',
              fontFamily: SPOTA.font.ui, fontSize: 13.5, fontWeight: 600, color: SPOTA.c.textSoft,
            }}>
              Saltar este paso
            </button>
          )}
        </div>
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

// CU-05: Gestionar credenciales
// CU-05: Credenciales y privacidad — mismo set de campos que el desktop (email + cambiar contraseña + zona de peligro).
// Nombre, username, bio y zona viven en editProfile (pendiente en mobile, ver backlog).
const ScreenCredentials = ({ nav }) => {
  const [cur, setCur] = React.useState('');
  const [nu, setNu] = React.useState('');
  const [cf, setCf] = React.useState('');
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(false);
  const [confirmDelete, setConfirmDelete] = React.useState(false);
  const submit = () => {
    setSuccess(false);
    if (!cur || !nu || !cf) { setError('Completá los tres campos.'); return; }
    if (nu.length < 8) { setError('La contraseña nueva debe tener al menos 8 caracteres.'); return; }
    if (nu !== cf) { setError('La contraseña nueva y la confirmación no coinciden.'); return; }
    setError(null);
    setSuccess(true);
    setCur(''); setNu(''); setCf('');
    setTimeout(() => setSuccess(false), 3000);
  };
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: SPOTA.c.bg, position: 'relative' }}>
      <AppHeader title="Credenciales y privacidad" leftIcon="arrowLeft" onLeft={() => nav('profile')} />
      <div style={{ flex: 1, overflow: 'auto', padding: 20 }}>
        {/* Email — solo lectura en MVP (CU-001-005 §3.14). El cambio de email no está en alcance. */}
        <div style={{ background: SPOTA.c.surface, borderRadius: 14, padding: 16, marginBottom: 12, border: `1px solid ${SPOTA.c.lineSoft}`, display: 'flex', alignItems: 'center', gap: 12 }}>
          <Icon name="mail" size={20} color={SPOTA.c.primary} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <h3 style={{ margin: '0 0 2px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 14.5, color: SPOTA.c.text }}>Email</h3>
            <p style={{ margin: 0, fontFamily: SPOTA.font.ui, fontSize: 12.5, color: SPOTA.c.textSoft, overflow: 'hidden', textOverflow: 'ellipsis' }}>sol.b•••••@correo.com</p>
          </div>
          <span style={{ fontFamily: SPOTA.font.ui, fontSize: 11.5, color: SPOTA.c.textMuted, fontStyle: 'italic' }}>Solo lectura</span>
        </div>

        {/* Cambiar contraseña */}
        <div style={{ background: SPOTA.c.surface, borderRadius: 14, padding: 16, marginBottom: 12, border: `1px solid ${SPOTA.c.lineSoft}` }}>
          <h3 style={{ margin: '0 0 12px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 14.5, color: SPOTA.c.text }}>Cambiar contraseña</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Field label="Contraseña actual" type="password" value={cur} placeholder="Tu contraseña actual" onChange={setCur} icon="lock" />
            <Field label="Contraseña nueva" type="password" value={nu} placeholder="Mínimo 8 caracteres" onChange={setNu} icon="lock" />
            <Field label="Confirmar contraseña" type="password" value={cf} placeholder="Repetí la nueva" onChange={setCf} icon="lock" />
          </div>
          {error && (
            <p style={{ margin: '10px 0 0', fontFamily: SPOTA.font.ui, fontSize: 12.5, color: SPOTA.c.danger }}>{error}</p>
          )}
          {success && (
            <p style={{ margin: '10px 0 0', fontFamily: SPOTA.font.ui, fontSize: 12.5, color: SPOTA.c.success }}>Contraseña actualizada. Cerramos otras sesiones por seguridad.</p>
          )}
          <div style={{ marginTop: 14 }}>
            <Btn variant="primary" full icon="check" onClick={submit}>Actualizar contraseña</Btn>
          </div>
        </div>

        {/* Zona de peligro */}
        <div style={{ background: SPOTA.c.surface, borderRadius: 14, padding: 16, border: `1px solid ${SPOTA.c.danger}33` }}>
          <h3 style={{ margin: '0 0 6px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 14.5, color: SPOTA.c.danger }}>Zona de peligro</h3>
          <p style={{ margin: '0 0 12px', fontFamily: SPOTA.font.ui, fontSize: 12.5, color: SPOTA.c.textSoft, lineHeight: 1.5 }}>
            Eliminar tu cuenta es irreversible. Vamos a borrar tu perfil, tus reseñas y tus colecciones privadas.
            Las reseñas públicas quedan como anónimas para preservar la integridad del Fama Score de la comunidad.
          </p>
          <button onClick={() => setConfirmDelete(true)} style={{
            padding: '10px 14px', borderRadius: 10, cursor: 'pointer',
            background: 'transparent', color: SPOTA.c.danger, border: `1.5px solid ${SPOTA.c.danger}`,
            fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 13.5,
            display: 'inline-flex', alignItems: 'center', gap: 6,
          }}>
            <Icon name="trash" size={15} color={SPOTA.c.danger} /> Eliminar cuenta
          </button>
        </div>
      </div>
      {/* Modal de confirmación de eliminación (Alt 1 §3.14) */}
      {confirmDelete && (
        <div onClick={() => setConfirmDelete(false)} style={{
          position: 'absolute', inset: 0, background: 'rgba(43,37,35,0.55)',
          display: 'flex', alignItems: 'flex-end', zIndex: 80,
        }}>
          <div onClick={(e) => e.stopPropagation()} style={{
            background: SPOTA.c.bg, width: '100%',
            borderTopLeftRadius: 22, borderTopRightRadius: 22,
            padding: '14px 22px 24px', animation: 'slideUp 260ms cubic-bezier(.2,.8,.2,1)',
          }}>
            <div style={{ width: 40, height: 4, borderRadius: 999, background: SPOTA.c.line, margin: '0 auto 14px' }} />
            <h2 style={{ margin: '0 0 8px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 20, color: SPOTA.c.danger }}>Eliminar cuenta</h2>
            <p style={{ margin: '0 0 16px', fontFamily: SPOTA.font.ui, fontSize: 13.5, color: SPOTA.c.text, lineHeight: 1.5 }}>
              Esta acción es <strong>irreversible</strong>. Vamos a borrar tu perfil, tus reseñas privadas y tus colecciones privadas. Las reseñas públicas quedan anónimas.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <Btn variant="outline" full onClick={() => setConfirmDelete(false)}>Cancelar</Btn>
              <Btn variant="primary" full icon="trash" style={{ background: SPOTA.c.danger }} onClick={() => { setConfirmDelete(false); nav('login'); }}>Eliminar</Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

Object.assign(window, { ScreenRegister, ScreenLogin, ScreenVerifyCode, ScreenPreferences, ScreenCredentials });
