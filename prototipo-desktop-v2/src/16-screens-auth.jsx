// ========================================================================
// 16-screens-auth.jsx
// ========================================================================
// Layout compartido para las pantallas de auth. Mismo patrón que bizRegister:
// fondo crema full-bleed, card centrado de 480 px máx con sombra suave.
const AuthCard = ({ children, footer, maxWidth = 480 }) => (
  <div style={{ minHeight: '100vh', background: SPOTA.c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
    <div style={{
      maxWidth, width: '100%',
      background: SPOTA.c.surface, borderRadius: 18, padding: 36,
      boxShadow: SPOTA.shadow.pop, border: `1px solid ${SPOTA.c.lineSoft}`,
    }}>
      {children}
      {footer && <div style={{ marginTop: 22, paddingTop: 18, borderTop: `1px solid ${SPOTA.c.lineSoft}`, textAlign: 'center' }}>{footer}</div>}
    </div>
  </div>
);

// Input con label, icono y opcional toggle de visibilidad para passwords.
const AuthField = ({ label, icon, type = 'text', value, onChange, placeholder, autoComplete }) => {
  const [show, setShow] = React.useState(false);
  const isPwd = type === 'password';
  const realType = isPwd && show ? 'text' : type;
  return (
    <div>
      <label style={{ display: 'block', marginBottom: 6, fontFamily: SPOTA.font.ui, fontSize: 13, fontWeight: 600, color: SPOTA.c.textSoft }}>{label}</label>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 14px', height: 46, borderRadius: 12, background: SPOTA.c.bg, border: `1.5px solid ${SPOTA.c.line}` }}>
        {icon && <Icon name={icon} size={17} color={SPOTA.c.textSoft} />}
        <input
          type={realType} defaultValue={value} placeholder={placeholder} autoComplete={autoComplete}
          onChange={(e) => onChange && onChange(e.target.value)}
          style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontFamily: SPOTA.font.ui, fontSize: 14.5, color: SPOTA.c.text }}
        />
        {isPwd && (
          <button onClick={() => setShow(s => !s)} type="button" style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 4, display: 'flex' }}>
            <Icon name={show ? 'eyeOff' : 'eye'} size={17} color={SPOTA.c.textSoft} />
          </button>
        )}
      </div>
    </div>
  );
};

// Pantalla de Welcome — landing pública para usuarios no autenticados.
const ScreenWelcome = ({ nav }) => (
  <div style={{ minHeight: '100vh', background: SPOTA.c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
    <div style={{ maxWidth: 920, width: '100%', display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)', gap: 48, alignItems: 'center' }}>
      <div>
        <SpotaLogo size={32} />
        <h1 style={{ margin: '24px 0 14px', fontFamily: SPOTA.font.ui, fontSize: 44, fontWeight: 700, color: SPOTA.c.text, letterSpacing: -1, lineHeight: 1.1 }}>
          Experiencias urbanas <span style={{ fontFamily: SPOTA.font.serif, fontStyle: 'italic', color: SPOTA.c.secondary, fontWeight: 400 }}>cerca tuyo</span>
        </h1>
        <p style={{ margin: '0 0 28px', fontFamily: SPOTA.font.ui, fontSize: 17, color: SPOTA.c.textSoft, lineHeight: 1.55, maxWidth: 520 }}>
          Spota interpreta lo que querés vivir y te recomienda experiencias locales con afinidad real a tu perfil.
          Cafés de barrio, planes con amigos, hosts que arman la salida ideal.
        </p>
        <div style={{ display: 'flex', gap: 12, marginBottom: 18 }}>
          <Btn variant="primary" size="lg" icon="compass" onClick={() => nav('register')}>Crear cuenta gratis</Btn>
          <Btn variant="outline" size="lg" onClick={() => nav('login')}>Iniciar sesión</Btn>
        </div>
        <p style={{ margin: 0, fontFamily: SPOTA.font.ui, fontSize: 13, color: SPOTA.c.textMuted }}>
          ¿Tenés un negocio? <a onClick={() => nav('bizRegister', { from: 'welcome' })} style={{ color: SPOTA.c.primary, fontWeight: 700, cursor: 'pointer' }}>Sumalo a Spota</a>
        </p>
      </div>
      <div style={{
        background: SPOTA.c.surface, borderRadius: 24, padding: 28,
        border: `1px solid ${SPOTA.c.lineSoft}`, boxShadow: SPOTA.shadow.pop,
      }}>
        {[
          { i: 'sparkles', t: 'Búsqueda semántica', s: 'Pedile lo que querés en lenguaje natural y Spota lo interpreta.' },
          { i: 'verify',   t: 'Reseñas verificadas', s: 'Proof of Visit: solo reseña quien efectivamente estuvo.' },
          { i: 'users',    t: 'Planes grupales',     s: 'Coordinás salidas cruzando preferencias del grupo.' },
          { i: 'briefcase',t: 'Marketplace de hosts',s: 'Contratá un guía local que arme la experiencia por vos.' },
        ].map((f, i) => (
          <div key={f.t} style={{ display: 'flex', gap: 12, paddingTop: i === 0 ? 0 : 14, paddingBottom: i === 3 ? 0 : 14, borderBottom: i === 3 ? 'none' : `1px solid ${SPOTA.c.lineSoft}` }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: SPOTA.c.primarySoft, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon name={f.i} size={18} color={SPOTA.c.primary} />
            </div>
            <div>
              <div style={{ fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 14, color: SPOTA.c.text }}>{f.t}</div>
              <p style={{ margin: '2px 0 0', fontFamily: SPOTA.font.ui, fontSize: 12.5, color: SPOTA.c.textSoft, lineHeight: 1.45 }}>{f.s}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Login desktop — split layout (D16). 55% foto+hero a la izquierda, 45% form a la derecha.
// Toggle Usuario/Negocio dentro del form (D3: una sola entry de auth, dos contextos).
const ScreenLogin = ({ nav }) => {
  const [profile, setProfile] = React.useState('user');
  const [email, setEmail] = React.useState('');
  const [pwd, setPwd] = React.useState('');
  const isBiz = profile === 'biz';
  const accent = isBiz ? SPOTA.c.secondary : SPOTA.c.primary;
  const ready = email && pwd;

  return (
    <div style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '55fr 45fr', background: SPOTA.c.bg }}>
      {/* Left: foto + gradient + hero. El logo vive con el form, no acá. */}
      <div style={{
        position: 'relative', overflow: 'hidden',
        backgroundImage: `linear-gradient(180deg, rgba(43,37,35,0.40) 0%, rgba(43,37,35,0.65) 50%, rgba(43,37,35,0.92) 100%), url(${photo('cafePalermo', 1600, 2000)})`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        color: '#fff',
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        padding: '40px 48px',
      }}>
        <h1 style={{ margin: 0, fontFamily: SPOTA.font.ui, fontSize: 48, fontWeight: 700, letterSpacing: -1.2, lineHeight: 1.05, textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}>
          Lo bueno está <span style={{ fontFamily: SPOTA.font.serif, fontStyle: 'italic', color: SPOTA.c.accent, fontWeight: 400 }}>cerca tuyo</span>.
        </h1>
        <p style={{ margin: '18px 0 0', fontFamily: SPOTA.font.ui, fontSize: 17, opacity: 0.92, lineHeight: 1.5, maxWidth: 460, textShadow: '0 1px 4px rgba(0,0,0,0.35)' }}>
          Descubrí lugares reales que recomienda gente real, en tu barrio.
        </p>
      </div>

      {/* Right: form */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 48px', overflowY: 'auto' }}>
        <div style={{ maxWidth: 420, width: '100%' }}>
          <div style={{ marginBottom: 18 }}>
            <SpotaLogo size={28} color={SPOTA.c.secondary} />
            <h1 style={{ margin: '20px 0 6px', fontFamily: SPOTA.font.ui, fontSize: 26, fontWeight: 700, color: SPOTA.c.text, letterSpacing: -0.5 }}>
              {isBiz
                ? <>Entrá a tu <span style={{ fontFamily: SPOTA.font.serif, fontStyle: 'italic', color: SPOTA.c.secondary, fontWeight: 400 }}>panel</span></>
                : <>Iniciá <span style={{ fontFamily: SPOTA.font.serif, fontStyle: 'italic', color: SPOTA.c.secondary, fontWeight: 400 }}>sesión</span></>}
            </h1>
            <p style={{ margin: 0, fontFamily: SPOTA.font.ui, fontSize: 14, color: SPOTA.c.textSoft }}>
              {isBiz ? 'Gestioná beneficios, campañas e insights de tu local.' : 'Volvé a tus experiencias y planes guardados.'}
            </p>
          </div>
          {/* Toggle Usuario / Negocio */}
          <div style={{ display: 'inline-flex', padding: 3, borderRadius: 999, background: SPOTA.c.bg, border: `1px solid ${SPOTA.c.line}`, marginBottom: 18 }}>
            {[{ id: 'user', t: 'Usuario' }, { id: 'biz', t: 'Negocio' }].map(o => {
              const on = profile === o.id;
              return (
                <button key={o.id} onClick={() => setProfile(o.id)} style={{
                  padding: '8px 18px', borderRadius: 999, border: 'none', cursor: 'pointer',
                  background: on ? accent : 'transparent',
                  color: on ? '#fff' : SPOTA.c.textSoft,
                  fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 13, letterSpacing: 0.2,
                  transition: 'all 180ms',
                }}>{o.t}</button>
              );
            })}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <AuthField label="Email" icon="mail" type="email" autoComplete="email" placeholder={isBiz ? 'negocio@correo.com' : 'vos@correo.com'} value={email} onChange={setEmail} />
            <AuthField label="Contraseña" icon="lock" type="password" autoComplete="current-password" placeholder="Tu contraseña" value={pwd} onChange={setPwd} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
            <a onClick={() => nav('recover')} style={{ fontFamily: SPOTA.font.ui, fontSize: 13, color: accent, fontWeight: 600, cursor: 'pointer' }}>
              ¿Olvidaste tu contraseña?
            </a>
          </div>
          <div style={{ marginTop: 18 }}>
            <Btn variant={isBiz ? 'secondary' : 'primary'} size="lg" full disabled={!ready} onClick={() => nav(isBiz ? 'bizHome' : 'verifyCode', isBiz ? undefined : { from: 'login' })}>
              Iniciar sesión
            </Btn>
          </div>
          <div style={{ marginTop: 22, paddingTop: 18, borderTop: `1px solid ${SPOTA.c.lineSoft}`, textAlign: 'center' }}>
            <p style={{ margin: 0, fontFamily: SPOTA.font.ui, fontSize: 13.5, color: SPOTA.c.textSoft }}>
              {isBiz
                ? <>¿Aún no registraste tu negocio? <a onClick={() => nav('bizRegister', { from: 'login' })} style={{ color: SPOTA.c.secondary, fontWeight: 700, cursor: 'pointer' }}>Sumalo</a></>
                : <>¿No tenés cuenta? <a onClick={() => nav('register')} style={{ color: SPOTA.c.primary, fontWeight: 700, cursor: 'pointer' }}>Crear cuenta</a></>}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// CU-001-001 §3.11 — Registrar cuenta con fecha de nacimiento + validación 18 años
// + aceptación T&C. CTA encadena con verifyCode antes de preferences.
function ageFromBirthAR(s) {
  const m = (s || '').match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!m) return null;
  const d = parseInt(m[1], 10), mo = parseInt(m[2], 10) - 1, y = parseInt(m[3], 10);
  const dt = new Date(y, mo, d);
  if (dt.getFullYear() !== y || dt.getMonth() !== mo || dt.getDate() !== d) return null;
  const today = new Date();
  let age = today.getFullYear() - y;
  const before = today.getMonth() < mo || (today.getMonth() === mo && today.getDate() < d);
  if (before) age -= 1;
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
    <AuthCard footer={
      <p style={{ margin: 0, fontFamily: SPOTA.font.ui, fontSize: 13.5, color: SPOTA.c.textSoft }}>
        ¿Ya tenés cuenta? <a onClick={() => nav('login')} style={{ color: SPOTA.c.primary, fontWeight: 700, cursor: 'pointer' }}>Iniciar sesión</a>
      </p>
    }>
      <div style={{ marginBottom: 24 }}>
        <SpotaLogo size={28} />
        <h1 style={{ margin: '20px 0 6px', fontFamily: SPOTA.font.ui, fontSize: 26, fontWeight: 700, color: SPOTA.c.text, letterSpacing: -0.5 }}>
          Sumate a <span style={{ fontFamily: SPOTA.font.serif, fontStyle: 'italic', color: SPOTA.c.secondary, fontWeight: 400 }}>Spota</span>
        </h1>
        <p style={{ margin: 0, fontFamily: SPOTA.font.ui, fontSize: 14, color: SPOTA.c.textSoft }}>Es gratis. Mantenemos privadas tus reseñas hasta que vos elijas.</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <AuthField label="Nombre completo" icon="user" placeholder="Sol Benítez" autoComplete="name" value={name} onChange={setName} />
        <AuthField label="Email" icon="mail" type="email" placeholder="vos@correo.com" autoComplete="email" value={email} onChange={setEmail} />
        <AuthField label="Contraseña" icon="lock" type="password" placeholder="Mínimo 8 caracteres" autoComplete="new-password" value={pwd} onChange={setPwd} />
        <div>
          <AuthField label="Fecha de nacimiento (DD/MM/AAAA)" icon="calendar" placeholder="17/05/1995" value={birth} onChange={setBirth} />
          {formatError && (
            <p style={{ margin: '6px 0 0', fontFamily: SPOTA.font.ui, fontSize: 12, color: SPOTA.c.danger }}>
              Usá el formato DD/MM/AAAA.
            </p>
          )}
          {ageError && (
            <p style={{ margin: '6px 0 0', fontFamily: SPOTA.font.ui, fontSize: 12, color: SPOTA.c.danger }}>
              Spota está disponible para mayores de 18 años.
            </p>
          )}
        </div>
      </div>
      <label onClick={() => setAccepted(a => !a)} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginTop: 16, cursor: 'pointer' }}>
        <div style={{
          width: 22, height: 22, borderRadius: 6,
          background: accepted ? SPOTA.c.primary : 'transparent',
          border: `1.5px solid ${accepted ? SPOTA.c.primary : SPOTA.c.line}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1,
        }}>
          {accepted && <Icon name="check" size={14} color="#fff" strokeWidth={3} />}
        </div>
        <span style={{ fontFamily: SPOTA.font.ui, fontSize: 12.5, color: SPOTA.c.textSoft, lineHeight: 1.5 }}>
          Acepto los <a style={{ color: SPOTA.c.primary, fontWeight: 600 }}>Términos y Condiciones</a> y la <a style={{ color: SPOTA.c.primary, fontWeight: 600 }}>Política de Privacidad</a> de Spota.
        </span>
      </label>
      <div style={{ marginTop: 20 }}>
        <Btn variant="primary" size="lg" full disabled={!ready} onClick={() => nav('verifyCode', { from: 'register' })}>Crear cuenta</Btn>
      </div>
    </AuthCard>
  );
};

// Recover password
const ScreenRecover = ({ nav }) => {
  const [sent, setSent] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  return (
    <AuthCard footer={
      <a onClick={() => nav('login')} style={{ fontFamily: SPOTA.font.ui, fontSize: 13.5, color: SPOTA.c.primary, fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 5 }}>
        <Icon name="arrowLeft" size={14} color={SPOTA.c.primary} /> Volver a iniciar sesión
      </a>
    }>
      <div style={{ marginBottom: 24 }}>
        <SpotaLogo size={28} />
        <h1 style={{ margin: '20px 0 6px', fontFamily: SPOTA.font.ui, fontSize: 26, fontWeight: 700, color: SPOTA.c.text, letterSpacing: -0.5 }}>
          ¿Olvidaste tu <span style={{ fontFamily: SPOTA.font.serif, fontStyle: 'italic', color: SPOTA.c.secondary, fontWeight: 400 }}>contraseña</span>?
        </h1>
        <p style={{ margin: 0, fontFamily: SPOTA.font.ui, fontSize: 14, color: SPOTA.c.textSoft, lineHeight: 1.55 }}>
          Ingresá el email de tu cuenta y te mandamos un link para restablecerla.
        </p>
      </div>
      {sent ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{
            padding: 18, borderRadius: 12,
            background: SPOTA.c.primarySoft, border: `1px dashed ${SPOTA.c.primary}`,
            display: 'flex', gap: 12, alignItems: 'flex-start',
          }}>
            <Icon name="mail" size={20} color={SPOTA.c.primary} />
            <div>
              <div style={{ fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 14, color: SPOTA.c.primaryDark }}>Listo, te enviamos el link</div>
              <p style={{ margin: '4px 0 0', fontFamily: SPOTA.font.ui, fontSize: 13, color: SPOTA.c.primaryDark, lineHeight: 1.5 }}>
                Si el email está registrado, te llega un link para resetear la contraseña. Vence en 15 minutos.
              </p>
            </div>
          </div>
          {/* CU-001-003 §3.12 paso 10: simulamos el click en el link del mail. */}
          <div style={{ padding: '12px 14px', borderRadius: 12, background: SPOTA.c.accentSoft, border: `1px dashed ${SPOTA.c.accent}` }}>
            <p style={{ margin: '0 0 6px', fontFamily: SPOTA.font.ui, fontSize: 11.5, fontWeight: 700, color: SPOTA.c.text, letterSpacing: 0.3, textTransform: 'uppercase' }}>Tip prototipo</p>
            <p style={{ margin: '0 0 8px', fontFamily: SPOTA.font.ui, fontSize: 13, color: SPOTA.c.text, lineHeight: 1.45 }}>
              En un escenario real, abrís el mail y clickeás el link. Acá simulamos ese paso:
            </p>
            <a onClick={() => nav('resetPassword', { token: 'demo-token' })} style={{
              fontFamily: SPOTA.font.ui, fontSize: 13.5, fontWeight: 700, color: SPOTA.c.primary,
              cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 5,
            }}>
              Simular click en el link del mail <Icon name="arrowRight" size={14} color={SPOTA.c.primary} />
            </a>
          </div>
        </div>
      ) : (
        <>
          <AuthField label="Email (texto@dominio.tld)" icon="mail" type="email" placeholder="vos@correo.com" autoComplete="email" value={email} onChange={setEmail} />
          <div style={{ marginTop: 20 }}>
            <Btn variant="primary" size="lg" full disabled={!valid} onClick={() => setSent(true)}>Enviar link de recuperación</Btn>
          </div>
        </>
      )}
    </AuthCard>
  );
};

// CU-001-003 §3.12 pasos 12-21 — pantalla de nueva contraseña, alcanzada por el link del mail.
const ScreenResetPassword = ({ nav }) => {
  const [pwd, setPwd] = React.useState('');
  const [confirm, setConfirm] = React.useState('');
  const [toast, setToast] = React.useState(null);
  const tooShort = pwd.length > 0 && pwd.length < 8;
  const mismatch = confirm.length > 0 && pwd !== confirm;
  const valid = pwd.length >= 8 && pwd === confirm;
  const submit = () => {
    if (!valid) return;
    setToast('Contraseña actualizada · cerramos otras sesiones');
    window.setTimeout(() => nav('login'), 1200);
  };
  return (
    <AuthCard footer={
      <a onClick={() => nav('login')} style={{ fontFamily: SPOTA.font.ui, fontSize: 13.5, color: SPOTA.c.primary, fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 5 }}>
        <Icon name="arrowLeft" size={14} color={SPOTA.c.primary} /> Volver a iniciar sesión
      </a>
    }>
      <div style={{ marginBottom: 24 }}>
        <SpotaLogo size={28} />
        <h1 style={{ margin: '20px 0 6px', fontFamily: SPOTA.font.ui, fontSize: 26, fontWeight: 700, color: SPOTA.c.text, letterSpacing: -0.5 }}>
          Elegí una <span style={{ fontFamily: SPOTA.font.serif, fontStyle: 'italic', color: SPOTA.c.secondary, fontWeight: 400 }}>nueva contraseña</span>
        </h1>
        <p style={{ margin: 0, fontFamily: SPOTA.font.ui, fontSize: 14, color: SPOTA.c.textSoft, lineHeight: 1.55 }}>
          Mínimo 8 caracteres. Al guardar, cerramos cualquier sesión activa en otros dispositivos.
        </p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <AuthField label="Contraseña nueva" icon="lock" type="password" placeholder="Mínimo 8 caracteres" value={pwd} onChange={setPwd} error={tooShort ? 'Tiene que tener al menos 8 caracteres.' : null} />
        <AuthField label="Confirmar contraseña" icon="lock" type="password" placeholder="Repetí la nueva" value={confirm} onChange={setConfirm} error={mismatch ? 'No coincide con la nueva contraseña.' : null} />
      </div>
      <div style={{ marginTop: 20 }}>
        <Btn variant="primary" size="lg" full disabled={!valid} onClick={submit}>Actualizar contraseña</Btn>
      </div>
      {toast && (
        <div style={{
          position: 'fixed', left: '50%', bottom: 32, transform: 'translateX(-50%)',
          background: SPOTA.c.text, color: SPOTA.c.bg,
          fontFamily: SPOTA.font.ui, fontSize: 13.5, fontWeight: 500,
          padding: '11px 20px', borderRadius: 999, boxShadow: SPOTA.shadow.lg,
          zIndex: 80, pointerEvents: 'none',
        }}>{toast}</div>
      )}
    </AuthCard>
  );
};

// CU-001-002 §3.1 — Verificación por código enviado al email (6 dígitos)
const ScreenVerifyCode = ({ nav, params }) => {
  const [digits, setDigits] = React.useState(['','','','','','']);
  const [state, setState] = React.useState('idle');
  const [remaining, setRemaining] = React.useState(300);
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
    idle: 'Te enviamos un código de 6 dígitos al email registrado. Vence en 5 minutos.',
    invalid: 'El código no coincide. Volvé a ingresarlo o pedí uno nuevo.',
    expired: 'El código venció. Pedí uno nuevo para continuar.',
    blocked: 'Cuenta bloqueada por intentos fallidos. Probá más tarde o recuperá tu contraseña.',
  }[state];
  const messageColor = state === 'idle' ? SPOTA.c.textSoft : SPOTA.c.danger;

  return (
    <AuthCard>
      <SpotaLogo size={28} color={SPOTA.c.secondary} />
      <div style={{ marginTop: 18, display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 48, height: 48, borderRadius: 12, background: SPOTA.c.primarySoft, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="shield" size={24} color={SPOTA.c.primary} />
        </div>
        <div>
          <h1 style={{ margin: 0, fontFamily: SPOTA.font.ui, fontSize: 24, fontWeight: 700, color: SPOTA.c.text, letterSpacing: -0.4 }}>
            Verificá tu acceso
          </h1>
          <p style={{ margin: '2px 0 0', fontFamily: SPOTA.font.ui, fontSize: 13, color: messageColor }}>{message}</p>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 22, marginBottom: 10 }}>
        {digits.map((d, i) => (
          <input key={i} ref={el => refs.current[i] = el}
            value={d} onChange={(e) => onDigit(i, e.target.value)}
            inputMode="numeric" maxLength={1}
            disabled={state === 'expired' || state === 'blocked'}
            style={{
              flex: 1, minWidth: 0, width: 0, height: 56, padding: 0,
              textAlign: 'center', borderRadius: 12,
              border: `1.5px solid ${state === 'invalid' ? SPOTA.c.danger : (d ? SPOTA.c.primary : SPOTA.c.line)}`,
              background: state === 'blocked' ? SPOTA.c.lineSoft : SPOTA.c.bg,
              fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 22, color: SPOTA.c.text, outline: 'none',
            }}
          />
        ))}
      </div>
      <p style={{ margin: '0 0 14px', fontFamily: SPOTA.font.ui, fontSize: 11.5, fontStyle: 'italic', color: SPOTA.c.textMuted }}>
        Tip prototipo: ingresá <strong style={{ fontStyle: 'normal' }}>123456</strong> para pasar · <strong style={{ fontStyle: 'normal' }}>000000</strong> simula código inválido.
      </p>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
      <div style={{ marginTop: 22, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Btn variant="primary" size="lg" full disabled={!filled || state === 'expired' || state === 'blocked'} onClick={submit}>
          Verificar y continuar
        </Btn>
        {state === 'blocked' && (
          <Btn variant="ghost" size="md" full onClick={() => nav('recover')}>Recuperar contraseña</Btn>
        )}
      </div>
      <p style={{ margin: '18px 0 0', fontFamily: SPOTA.font.ui, fontSize: 12.5, color: SPOTA.c.textMuted, textAlign: 'center' }}>
        <a onClick={() => nav('login')} style={{ color: SPOTA.c.primary, fontWeight: 700, cursor: 'pointer' }}>Volver al login</a>
      </p>
    </AuthCard>
  );
};

Object.assign(window, { ScreenWelcome, ScreenLogin, ScreenRegister, ScreenRecover, ScreenResetPassword, ScreenVerifyCode });
