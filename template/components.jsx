// Spota Components — primitives reutilizables

// ─────────────────────────────────────────────────────────────
// Iconos (lineales, 24px, stroke 1.75)
// ─────────────────────────────────────────────────────────────
const Icon = ({ name, size = 24, color = 'currentColor', strokeWidth = 1.75, fill = 'none' }) => {
  const p = { width: size, height: size, viewBox: '0 0 24 24', fill, stroke: color, strokeWidth, strokeLinecap: 'round', strokeLinejoin: 'round' };
  switch (name) {
    case 'pin': return <svg {...p}><path d="M12 21s-7-7.5-7-12a7 7 0 0 1 14 0c0 4.5-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/></svg>;
    case 'pinFill': return <svg {...p} fill={color} stroke="none"><path d="M12 21s-7-7.5-7-12a7 7 0 0 1 14 0c0 4.5-7 12-7 12zM12 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/></svg>;
    case 'search': return <svg {...p}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>;
    case 'heart': return <svg {...p}><path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/></svg>;
    case 'heartFill': return <svg {...p} fill={color} stroke="none"><path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/></svg>;
    case 'star': return <svg {...p} fill={color} stroke="none"><path d="m12 3 2.7 5.5 6 .9-4.3 4.2 1 6-5.4-2.8L6.6 19.6l1-6L3.3 9.4l6-.9z"/></svg>;
    case 'starOutline': return <svg {...p}><path d="m12 3 2.7 5.5 6 .9-4.3 4.2 1 6-5.4-2.8L6.6 19.6l1-6L3.3 9.4l6-.9z"/></svg>;
    case 'check': return <svg {...p}><path d="m4 12 5 5L20 6"/></svg>;
    case 'checkCircle': return <svg {...p}><circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/></svg>;
    case 'verify': return <svg {...p}><path d="M12 2 4 5v6c0 5 3.5 9 8 11 4.5-2 8-6 8-11V5l-8-3z"/><path d="m9 12 2 2 4-4"/></svg>;
    case 'compass': return <svg {...p}><circle cx="12" cy="12" r="9"/><path d="m15 9-2 5-5 2 2-5z" fill={color}/></svg>;
    case 'collection': return <svg {...p}><rect x="3" y="5" width="14" height="14" rx="2"/><path d="M7 3h12a2 2 0 0 1 2 2v12"/></svg>;
    case 'plus': return <svg {...p}><path d="M12 5v14M5 12h14"/></svg>;
    case 'plusBig': return <svg {...p} strokeWidth={2.2}><path d="M12 6v12M6 12h12"/></svg>;
    case 'users': return <svg {...p}><circle cx="9" cy="8" r="3.5"/><path d="M3 20c0-3 3-5 6-5s6 2 6 5"/><circle cx="17" cy="9" r="2.5"/><path d="M16 14c2.5 0 5 1.5 5 4"/></svg>;
    case 'user': return <svg {...p}><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></svg>;
    case 'calendar': return <svg {...p}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/></svg>;
    case 'clock': return <svg {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>;
    case 'filter': return <svg {...p}><path d="M3 5h18l-7 9v6l-4-2v-4z"/></svg>;
    case 'list': return <svg {...p}><path d="M4 6h16M4 12h16M4 18h16"/></svg>;
    case 'map': return <svg {...p}><path d="m3 6 6-2 6 2 6-2v14l-6 2-6-2-6 2zM9 4v14M15 6v14"/></svg>;
    case 'arrowLeft': return <svg {...p}><path d="M15 6l-6 6 6 6"/></svg>;
    case 'arrowRight': return <svg {...p}><path d="m9 6 6 6-6 6"/></svg>;
    case 'arrowUp': return <svg {...p}><path d="m6 15 6-6 6 6"/></svg>;
    case 'close': return <svg {...p}><path d="M6 6l12 12M18 6 6 18"/></svg>;
    case 'menu': return <svg {...p}><path d="M4 6h16M4 12h16M4 18h16"/></svg>;
    case 'more': return <svg {...p} fill={color} stroke="none"><circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/></svg>;
    case 'eye': return <svg {...p}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>;
    case 'eyeOff': return <svg {...p}><path d="M3 3l18 18M10.6 6.1A10 10 0 0 1 12 6c6.5 0 10 6 10 6a17 17 0 0 1-3.1 4M6.6 6.6C3.6 8.4 2 12 2 12s3.5 7 10 7c1.7 0 3.2-.4 4.6-1.1M9.9 9.9a3 3 0 0 0 4.2 4.2"/></svg>;
    case 'mail': return <svg {...p}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>;
    case 'lock': return <svg {...p}><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>;
    case 'sparkles': return <svg {...p}><path d="m12 3 1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8zM19 14l.9 2.1L22 17l-2.1.9L19 20l-.9-2.1L16 17l2.1-.9zM5 16l.7 1.6L7.3 18l-1.6.7L5 20.3 4.3 18.7 2.7 18l1.6-.7z"/></svg>;
    case 'gift': return <svg {...p}><rect x="3" y="9" width="18" height="11" rx="2"/><path d="M3 12h18M12 9v11"/><path d="M8 9c-1.5 0-3-1-3-2.5C5 5 6.5 4 8 5c1.5 1 4 4 4 4s2.5-3 4-4c1.5-1 3 0 3 1.5C19 8 17.5 9 16 9"/></svg>;
    case 'edit': return <svg {...p}><path d="M11 4H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2v-6"/><path d="M18.5 2.5a2.1 2.1 0 0 1 3 3L12 15l-4 1 1-4z"/></svg>;
    case 'trash': return <svg {...p}><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M5 6l1 14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-14"/></svg>;
    case 'send': return <svg {...p}><path d="M22 2 11 13M22 2l-7 20-4-9-9-4z"/></svg>;
    case 'share': return <svg {...p}><circle cx="6" cy="12" r="3"/><circle cx="18" cy="6" r="3"/><circle cx="18" cy="18" r="3"/><path d="m9 11 6-3M9 13l6 3"/></svg>;
    case 'bell': return <svg {...p}><path d="M6 8a6 6 0 0 1 12 0c0 5 2 7 2 7H4s2-2 2-7M10 19a2 2 0 0 0 4 0"/></svg>;
    case 'briefcase': return <svg {...p}><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/></svg>;
    case 'stats': return <svg {...p}><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg>;
    case 'bar': return <svg {...p}><path d="M5 4h14l-2 6a4 4 0 0 1-10 0zM12 14v6M9 20h6"/></svg>;
    case 'coffee': return <svg {...p}><path d="M3 8h14v6a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4z"/><path d="M17 9h2a2 2 0 0 1 0 6h-2M6 2v3M10 2v3M14 2v3"/></svg>;
    case 'utensils': return <svg {...p}><path d="M5 2v8a2 2 0 0 0 4 0V2M7 10v12M14 2v20M14 8c0-3 3-5 5-5v19"/></svg>;
    case 'palette': return <svg {...p}><path d="M12 3a9 9 0 0 0 0 18c1 0 1.5-1 1-2-.5-1.2.5-2 1.5-2H17a4 4 0 0 0 4-4 9 9 0 0 0-9-10z"/><circle cx="7.5" cy="10.5" r="1" fill={color}/><circle cx="11" cy="7" r="1" fill={color}/><circle cx="15.5" cy="8.5" r="1" fill={color}/></svg>;
    case 'leaf': return <svg {...p}><path d="M11 20A7 7 0 0 1 4 13c0-4 4-9 11-9 1 6-2 16-4 16zM4 13c4 0 8 3 7 7"/></svg>;
    case 'shield': return <svg {...p}><path d="M12 2 4 5v6c0 5 3.5 9 8 11 4.5-2 8-6 8-11V5l-8-3z"/></svg>;
    case 'megaphone': return <svg {...p}><path d="M3 11v2a2 2 0 0 0 2 2h2l8 4V5L7 9H5a2 2 0 0 0-2 2zM18 8a4 4 0 0 1 0 8"/></svg>;
    case 'home': return <svg {...p}><path d="m3 11 9-8 9 8v9a2 2 0 0 1-2 2h-3v-7h-8v7H5a2 2 0 0 1-2-2z"/></svg>;
    case 'apple': return <svg {...p} fill={color} stroke="none"><path d="M17.5 12.5c0-2.5 2-3.5 2-3.5-1-1.5-3-1.5-4-1.5-1.5 0-3 1-4 1s-2.5-1-4-1c-2 0-4 1.5-4 4.5 0 4 3 9 5 9 1 0 1.5-.5 3-.5s2 .5 3 .5c2 0 4-3.5 4-3.5-3-1.5-1-5-1-5zM14 4c.5-1 .5-2.5-.5-3.5-1 0-2 .5-2.5 1.5-.5 1-.5 2.5.5 3.5 1 0 2-.5 2.5-1.5z"/></svg>;
    case 'google': return <svg {...p} stroke="none" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.5 12.3c0-.9-.1-1.5-.2-2.2H12v4.1h6c-.1 1-.8 2.5-2.2 3.5l3.4 2.7c2-1.9 3.3-4.6 3.3-8.1z"/><path fill="#34A853" d="M12 23c3 0 5.5-1 7.3-2.7l-3.4-2.7c-1 .7-2.3 1.1-3.9 1.1-3 0-5.5-2-6.4-4.7L2.1 16c1.7 3.4 5.3 7 9.9 7z"/><path fill="#FBBC04" d="M5.6 14c-.2-.7-.4-1.4-.4-2.1s.1-1.4.4-2.1L2.1 7.1C1.4 8.6 1 10.2 1 12s.4 3.4 1.1 4.9z"/><path fill="#EA4335" d="M12 5.2c2.1 0 3.6.9 4.4 1.7L19.5 4C17.5 2.1 14.9 1 12 1 7.4 1 3.8 4.6 2.1 8L5.6 11c.9-2.7 3.4-5.8 6.4-5.8z"/></svg>;
    case 'wallet': return <svg {...p}><rect x="3" y="6" width="18" height="14" rx="2"/><path d="M3 10h18M16 15h2"/></svg>;
    case 'globe': return <svg {...p}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>;
    case 'thumbsUp': return <svg {...p}><path d="M7 22V11l5-9 1 1-1 7h6a2 2 0 0 1 2 2.5l-2 8a2 2 0 0 1-2 1.5zM3 11h4v11H3z"/></svg>;
    case 'flag': return <svg {...p}><path d="M5 21V4M5 4h13l-2 4 2 4H5"/></svg>;
    case 'photo': return <svg {...p}><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="11" r="2"/><path d="m3 17 5-4 4 3 4-5 5 6"/></svg>;
    default: return null;
  }
};

// ─────────────────────────────────────────────────────────────
// Brand: Logo Spota
// ─────────────────────────────────────────────────────────────
const SpotaLogo = ({ size = 28, color = SPOTA.c.primary, dark = false }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
    <Icon name="pinFill" size={size} color={color} />
    <span style={{ fontFamily: SPOTA.font.ui, fontWeight: 800, fontSize: size * 0.95, color: dark ? '#fff' : SPOTA.c.text, letterSpacing: -0.4 }}>
      Spota
    </span>
  </div>
);

// ─────────────────────────────────────────────────────────────
// Botones
// ─────────────────────────────────────────────────────────────
const Btn = ({ children, variant = 'primary', size = 'md', onClick, full, icon, iconRight, style = {}, disabled }) => {
  const sizes = {
    sm: { h: 36, px: 14, fs: 14, r: 10 },
    md: { h: 48, px: 18, fs: 15, r: 12 },
    lg: { h: 56, px: 22, fs: 16, r: 14 },
  }[size];
  const palettes = {
    primary: { bg: SPOTA.c.primary, c: '#fff', bd: 'transparent', hover: SPOTA.c.primaryDark },
    secondary: { bg: SPOTA.c.secondary, c: '#fff', bd: 'transparent', hover: SPOTA.c.secondaryDark },
    outline: { bg: 'transparent', c: SPOTA.c.text, bd: SPOTA.c.line, hover: SPOTA.c.bgAlt },
    ghost: { bg: 'transparent', c: SPOTA.c.text, bd: 'transparent', hover: SPOTA.c.lineSoft },
    light: { bg: SPOTA.c.surface, c: SPOTA.c.text, bd: SPOTA.c.line, hover: SPOTA.c.bgAlt },
    dark: { bg: SPOTA.c.text, c: '#fff', bd: 'transparent', hover: '#000' },
  }[variant];
  const [hover, setHover] = React.useState(false);
  return (
    <button onClick={onClick} disabled={disabled}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        height: sizes.h, padding: `0 ${sizes.px}px`, borderRadius: sizes.r,
        background: hover && !disabled ? palettes.hover : palettes.bg, color: palettes.c,
        border: `1px solid ${palettes.bd === 'transparent' ? 'transparent' : palettes.bd}`,
        fontFamily: SPOTA.font.ui, fontWeight: 600, fontSize: sizes.fs,
        cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        width: full ? '100%' : 'auto', transition: 'background 120ms, transform 120ms',
        transform: hover && !disabled ? 'translateY(-1px)' : 'none',
        ...style,
      }}>
      {icon && <Icon name={icon} size={18} />}
      {children}
      {iconRight && <Icon name={iconRight} size={18} />}
    </button>
  );
};

// ─────────────────────────────────────────────────────────────
// Badge / Tag (Popular / Nuevo / Recomendado / Beneficio / etc)
// ─────────────────────────────────────────────────────────────
const Tag = ({ children, kind = 'secondary', icon, style = {} }) => {
  const palettes = {
    secondary: { bg: SPOTA.c.secondary, c: '#fff' },           // terracota lleno (Popular/Nuevo/Recomendado)
    accent: { bg: SPOTA.c.accent, c: '#2B2523' },
    primary: { bg: SPOTA.c.primary, c: '#fff' },
    soft: { bg: SPOTA.c.secondarySoft, c: SPOTA.c.secondaryDark },
    softG: { bg: SPOTA.c.primarySoft, c: SPOTA.c.primaryDark },
    softA: { bg: SPOTA.c.accentSoft, c: '#7A5A12' },
    line: { bg: 'rgba(255,255,255,0.92)', c: SPOTA.c.text, bd: SPOTA.c.line },
  }[kind];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: '4px 10px', borderRadius: 999,
      background: palettes.bg, color: palettes.c,
      fontFamily: SPOTA.font.ui, fontWeight: 600, fontSize: 11.5, letterSpacing: 0.2,
      border: palettes.bd ? `1px solid ${palettes.bd}` : 'none',
      ...style,
    }}>
      {icon && <Icon name={icon} size={12} />}
      {children}
    </span>
  );
};

// ─────────────────────────────────────────────────────────────
// Proof of Visit pill — verde petróleo con micro-animación
// ─────────────────────────────────────────────────────────────
const ProofOfVisit = ({ size = 'sm', style = {} }) => {
  const [hover, setHover] = React.useState(false);
  const isLg = size === 'lg';
  return (
    <span
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 5,
        padding: isLg ? '6px 12px' : '4px 9px',
        borderRadius: 999,
        background: SPOTA.c.primary, color: '#fff',
        fontFamily: SPOTA.font.ui, fontWeight: 600, fontSize: isLg ? 12.5 : 11,
        boxShadow: hover ? '0 4px 12px rgba(47,111,94,0.35)' : '0 1px 3px rgba(47,111,94,0.2)',
        transform: hover ? 'translateY(-1px) scale(1.02)' : 'none',
        transition: 'transform 200ms cubic-bezier(.2,.7,.2,1), box-shadow 200ms',
        ...style,
      }}>
      <span style={{
        width: isLg ? 16 : 14, height: isLg ? 16 : 14, borderRadius: 999,
        background: '#fff', color: SPOTA.c.primary,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        transform: hover ? 'rotate(360deg)' : 'rotate(0)', transition: 'transform 500ms ease',
      }}>
        <Icon name="check" size={isLg ? 11 : 9} color={SPOTA.c.primary} strokeWidth={3} />
      </span>
      Visitado
    </span>
  );
};

// ─────────────────────────────────────────────────────────────
// Fama Score — 3 variantes (toggle por tweak)
// ─────────────────────────────────────────────────────────────
const FamaScore = ({ score = 4.7, count = 256, affinity = 92, variant = 'classic', size = 'sm' }) => {
  if (variant === 'ring') {
    const r = size === 'lg' ? 22 : 14;
    const circ = 2 * Math.PI * r;
    const off = circ - (score / 5) * circ;
    return (
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
        <div style={{ position: 'relative', width: r * 2 + 6, height: r * 2 + 6 }}>
          <svg width={r * 2 + 6} height={r * 2 + 6}>
            <circle cx={r + 3} cy={r + 3} r={r} stroke={SPOTA.c.lineSoft} strokeWidth={3} fill="none" />
            <circle cx={r + 3} cy={r + 3} r={r} stroke={SPOTA.c.accent} strokeWidth={3} fill="none"
              strokeDasharray={circ} strokeDashoffset={off} strokeLinecap="round"
              transform={`rotate(-90 ${r + 3} ${r + 3})`} />
          </svg>
          <span style={{
            position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: size === 'lg' ? 13 : 10, color: SPOTA.c.text,
          }}>{score.toFixed(1)}</span>
        </div>
        <span style={{ fontFamily: SPOTA.font.ui, fontSize: size === 'lg' ? 13 : 12, color: SPOTA.c.textSoft }}>
          ({count})
        </span>
      </div>
    );
  }
  if (variant === 'affinity') {
    const pct = affinity;
    return (
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 5,
          padding: '3px 8px 3px 6px', borderRadius: 999,
          background: SPOTA.c.accentSoft, color: '#7A5A12',
          fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: size === 'lg' ? 13 : 11.5,
        }}>
          <Icon name="sparkles" size={12} color="#7A5A12" strokeWidth={2} />
          {pct}% para vos
        </div>
        <span style={{ fontFamily: SPOTA.font.ui, fontSize: 12, color: SPOTA.c.textSoft }}>
          · {score.toFixed(1)} ({count})
        </span>
      </div>
    );
  }
  // classic
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
      <Icon name="star" size={size === 'lg' ? 18 : 14} color={SPOTA.c.accent} />
      <span style={{ fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: size === 'lg' ? 15 : 13, color: SPOTA.c.text }}>
        {score.toFixed(1)}
      </span>
      <span style={{ fontFamily: SPOTA.font.ui, fontSize: size === 'lg' ? 14 : 12.5, color: SPOTA.c.textSoft }}>
        ({count})
      </span>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// Place Card (descubrimiento)
// ─────────────────────────────────────────────────────────────
const PlaceCard = ({ place, density = 'cozy', famaVariant = 'classic', onClick, saved, onSave }) => {
  const d = window.density(density);
  const [imgLoaded, setImgLoaded] = React.useState(false);
  return (
    <div onClick={onClick} style={{
      background: SPOTA.c.surface, borderRadius: SPOTA.radius.lg,
      overflow: 'hidden', boxShadow: SPOTA.shadow.card, cursor: 'pointer',
      border: `1px solid ${SPOTA.c.lineSoft}`, transition: 'transform 200ms, box-shadow 200ms',
    }}
    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = SPOTA.shadow.cardHover; }}
    onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = SPOTA.shadow.card; }}
    >
      <div style={{ position: 'relative', height: d.imgH, background: SPOTA.c.lineSoft }}>
        <img src={photo(place.img)} alt={place.name}
          onLoad={() => setImgLoaded(true)}
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: imgLoaded ? 1 : 0, transition: 'opacity 300ms' }} />
        {/* tag estado */}
        {place.tag && (
          <div style={{ position: 'absolute', top: 10, left: 10 }}>
            <Tag kind="secondary">{place.tag}</Tag>
          </div>
        )}
        {/* corazón */}
        <button onClick={(e) => { e.stopPropagation(); onSave && onSave(); }} style={{
          position: 'absolute', top: 8, right: 8, width: 36, height: 36, borderRadius: 999,
          background: 'rgba(255,255,255,0.92)', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backdropFilter: 'blur(8px)',
        }}>
          <Icon name={saved ? 'heartFill' : 'heart'} size={18} color={saved ? SPOTA.c.secondary : SPOTA.c.text} />
        </button>
        {/* proof of visit */}
        {place.visited && (
          <div style={{ position: 'absolute', bottom: 10, left: 10 }}>
            <ProofOfVisit />
          </div>
        )}
        {/* beneficio */}
        {place.benefit && (
          <div style={{ position: 'absolute', bottom: 10, right: 10 }}>
            <Tag kind="accent" icon="gift">{place.benefit}</Tag>
          </div>
        )}
      </div>
      <div style={{ padding: d.cardPad + 2 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
          <h3 style={{ margin: 0, fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 16 * d.fontScale, color: SPOTA.c.text, lineHeight: 1.2 }}>
            {place.name}
          </h3>
          <span style={{ fontFamily: SPOTA.font.ui, fontWeight: 600, fontSize: 13, color: SPOTA.c.textSoft, whiteSpace: 'nowrap' }}>
            {place.price}
          </span>
        </div>
        <p style={{ margin: '3px 0 8px', fontFamily: SPOTA.font.ui, fontSize: 13 * d.fontScale, color: SPOTA.c.textSoft }}>
          {place.cat} · {place.hood}
        </p>
        <FamaScore score={place.score} count={place.reviews} affinity={place.affinity} variant={famaVariant} />
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// Avatar (con opcional Fama Score ring)
// ─────────────────────────────────────────────────────────────
const Avatar = ({ name, size = 40, score, badge }) => (
  <div style={{ position: 'relative', display: 'inline-flex' }}>
    <img src={avatar(name, size * 2)} alt={name}
      style={{ width: size, height: size, borderRadius: 999, objectFit: 'cover',
        border: score ? `2px solid ${SPOTA.c.accent}` : `1.5px solid ${SPOTA.c.line}` }} />
    {score && (
      <span style={{
        position: 'absolute', bottom: -2, right: -4,
        background: SPOTA.c.surface, color: SPOTA.c.text,
        fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 10,
        padding: '1px 5px', borderRadius: 999,
        border: `1px solid ${SPOTA.c.line}`,
      }}>{score}</span>
    )}
    {badge && (
      <span style={{
        position: 'absolute', top: -2, right: -2,
        width: 14, height: 14, borderRadius: 999,
        background: SPOTA.c.primary, border: '2px solid #fff',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      }}><Icon name="check" size={8} color="#fff" strokeWidth={3.5} /></span>
    )}
  </div>
);

// ─────────────────────────────────────────────────────────────
// Search bar (con placeholder rotando)
// ─────────────────────────────────────────────────────────────
const SearchBar = ({ onClick, expanded, onSubmit, value, onChange, placeholders = [] }) => {
  const [phIdx, setPhIdx] = React.useState(0);
  React.useEffect(() => {
    if (!placeholders.length) return;
    const t = setInterval(() => setPhIdx(i => (i + 1) % placeholders.length), 3200);
    return () => clearInterval(t);
  }, [placeholders.length]);
  const ph = placeholders[phIdx] || '¿Qué vas a descubrir hoy?';
  return (
    <div onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '0 14px', height: 52,
      background: SPOTA.c.surface, borderRadius: SPOTA.radius.pill,
      border: `1px solid ${SPOTA.c.line}`, boxShadow: SPOTA.shadow.card,
      cursor: 'text',
    }}>
      <Icon name="search" size={20} color={SPOTA.c.textSoft} />
      {expanded ? (
        <input autoFocus value={value} onChange={(e) => onChange && onChange(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter' && onSubmit) onSubmit(); }}
          placeholder={ph}
          style={{
            flex: 1, border: 'none', outline: 'none', background: 'transparent',
            fontFamily: SPOTA.font.ui, fontSize: 15, color: SPOTA.c.text,
          }} />
      ) : (
        <div style={{ flex: 1, position: 'relative', height: 22, overflow: 'hidden' }}>
          {placeholders.map((p, i) => (
            <span key={i} style={{
              position: 'absolute', inset: 0, display: 'flex', alignItems: 'center',
              fontFamily: SPOTA.font.ui, fontSize: 14.5, color: SPOTA.c.textSoft,
              opacity: i === phIdx ? 1 : 0,
              transform: i === phIdx ? 'translateY(0)' : 'translateY(8px)',
              transition: 'opacity 300ms, transform 300ms',
            }}>
              {p}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// App Header (brand + acciones)
// ─────────────────────────────────────────────────────────────
const AppHeader = ({ title, leftIcon = 'arrowLeft', onLeft, rightIcon, onRight, dark, showLogo, transparent }) => (
  <div style={{
    height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '0 16px',
    background: transparent ? 'transparent' : (dark ? SPOTA.c.primary : SPOTA.c.bg),
    borderBottom: transparent ? 'none' : `1px solid ${dark ? 'rgba(255,255,255,0.1)' : SPOTA.c.lineSoft}`,
  }}>
    <div style={{ width: 40 }}>
      {onLeft && (
        <button onClick={onLeft} style={{
          width: 40, height: 40, borderRadius: 999, border: 'none', background: 'transparent',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        }}>
          <Icon name={leftIcon} size={22} color={dark ? '#fff' : SPOTA.c.text} />
        </button>
      )}
    </div>
    {showLogo ? (
      <SpotaLogo size={22} dark={dark} color={dark ? '#fff' : SPOTA.c.primary} />
    ) : (
      <h1 style={{ margin: 0, fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 17, color: dark ? '#fff' : SPOTA.c.text }}>
        {title}
      </h1>
    )}
    <div style={{ width: 40, display: 'flex', justifyContent: 'flex-end' }}>
      {rightIcon && (
        <button onClick={onRight} style={{
          width: 40, height: 40, borderRadius: 999, border: 'none', background: 'transparent',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        }}>
          <Icon name={rightIcon} size={22} color={dark ? '#fff' : SPOTA.c.text} />
        </button>
      )}
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────
// TabBar inferior con FAB central
// ─────────────────────────────────────────────────────────────
const TabBar = ({ active, onChange, onPublish }) => {
  const tabs = [
    { id: 'discover', label: 'Descubrir', icon: 'compass' },
    { id: 'collections', label: 'Colecciones', icon: 'collection' },
    { id: 'fab', fab: true },
    { id: 'plans', label: 'Planes', icon: 'users' },
    { id: 'profile', label: 'Perfil', icon: 'user' },
  ];
  return (
    <div style={{
      position: 'relative', height: 78,
      background: SPOTA.c.surface, borderTop: `1px solid ${SPOTA.c.lineSoft}`,
      boxShadow: SPOTA.shadow.nav,
      display: 'flex', alignItems: 'flex-start', justifyContent: 'space-around',
      paddingTop: 10, paddingBottom: 12,
    }}>
      {tabs.map(t => {
        if (t.fab) return (
          <button key="fab" onClick={onPublish} style={{
            width: 58, height: 58, borderRadius: 999, border: 'none', cursor: 'pointer',
            background: SPOTA.c.secondary,
            transform: 'translateY(-18px)',
            boxShadow: '0 8px 18px rgba(184,92,56,0.4), 0 2px 6px rgba(184,92,56,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'transform 200ms',
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-22px) scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(-18px) scale(1)'}
          >
            <Icon name="plusBig" size={26} color="#fff" />
          </button>
        );
        const isActive = active === t.id;
        return (
          <button key={t.id} onClick={() => onChange && onChange(t.id)} style={{
            border: 'none', background: 'transparent', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
            padding: '4px 8px', minWidth: 60,
          }}>
            <Icon name={t.icon} size={22} color={isActive ? SPOTA.c.primary : SPOTA.c.textMuted}
              strokeWidth={isActive ? 2.2 : 1.75} />
            <span style={{
              fontFamily: SPOTA.font.ui, fontSize: 10.5, fontWeight: isActive ? 700 : 500,
              color: isActive ? SPOTA.c.primary : SPOTA.c.textMuted,
            }}>{t.label}</span>
          </button>
        );
      })}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// Input field
// ─────────────────────────────────────────────────────────────
const Field = ({ label, type = 'text', value, onChange, placeholder, icon, hint, error }) => {
  const [focus, setFocus] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const isPwd = type === 'password';
  return (
    <label style={{ display: 'block' }}>
      {label && <div style={{ fontFamily: SPOTA.font.ui, fontWeight: 600, fontSize: 13, color: SPOTA.c.text, marginBottom: 6 }}>{label}</div>}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        height: 50, padding: '0 14px',
        background: SPOTA.c.surface, borderRadius: 12,
        border: `1.5px solid ${error ? SPOTA.c.danger : (focus ? SPOTA.c.primary : SPOTA.c.line)}`,
        transition: 'border-color 150ms',
      }}>
        {icon && <Icon name={icon} size={18} color={SPOTA.c.textSoft} />}
        <input
          type={isPwd && !show ? 'password' : (isPwd ? 'text' : type)}
          value={value} onChange={(e) => onChange && onChange(e.target.value)}
          onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          placeholder={placeholder}
          style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent',
            fontFamily: SPOTA.font.ui, fontSize: 15, color: SPOTA.c.text }}
        />
        {isPwd && (
          <button onClick={(e) => { e.preventDefault(); setShow(s => !s); }} style={{
            border: 'none', background: 'transparent', cursor: 'pointer', padding: 4, color: SPOTA.c.textSoft,
          }}><Icon name={show ? 'eyeOff' : 'eye'} size={18} color={SPOTA.c.textSoft} /></button>
        )}
      </div>
      {(hint || error) && (
        <div style={{ fontFamily: SPOTA.font.ui, fontSize: 12, marginTop: 6,
          color: error ? SPOTA.c.danger : SPOTA.c.textSoft }}>{error || hint}</div>
      )}
    </label>
  );
};

// ─────────────────────────────────────────────────────────────
// Section heading
// ─────────────────────────────────────────────────────────────
const SectionTitle = ({ children, action, onAction }) => (
  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 10 }}>
    <h2 style={{ margin: 0, fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 18, color: SPOTA.c.text }}>{children}</h2>
    {action && (
      <button onClick={onAction} style={{
        border: 'none', background: 'transparent', cursor: 'pointer',
        fontFamily: SPOTA.font.ui, fontSize: 13, fontWeight: 600, color: SPOTA.c.primary,
      }}>{action} →</button>
    )}
  </div>
);

// Pill chip (filter)
const Chip = ({ children, active, onClick, icon }) => (
  <button onClick={onClick} style={{
    display: 'inline-flex', alignItems: 'center', gap: 6,
    height: 36, padding: '0 14px', borderRadius: 999, cursor: 'pointer',
    background: active ? SPOTA.c.primary : SPOTA.c.surface,
    color: active ? '#fff' : SPOTA.c.text,
    border: `1px solid ${active ? SPOTA.c.primary : SPOTA.c.line}`,
    fontFamily: SPOTA.font.ui, fontWeight: 600, fontSize: 13.5,
    whiteSpace: 'nowrap', transition: 'all 150ms',
  }}>
    {icon && <Icon name={icon} size={14} />}
    {children}
  </button>
);

// Empty state
const EmptyState = ({ icon, title, subtitle, action }) => (
  <div style={{ padding: '40px 20px', textAlign: 'center' }}>
    <div style={{
      width: 72, height: 72, borderRadius: 999, background: SPOTA.c.primarySoft,
      display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px',
    }}><Icon name={icon || 'sparkles'} size={32} color={SPOTA.c.primary} /></div>
    <h3 style={{ margin: '0 0 6px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 18, color: SPOTA.c.text }}>{title}</h3>
    {subtitle && <p style={{ margin: '0 0 16px', fontFamily: SPOTA.font.ui, fontSize: 14, color: SPOTA.c.textSoft }}>{subtitle}</p>}
    {action}
  </div>
);

Object.assign(window, {
  Icon, SpotaLogo, Btn, Tag, ProofOfVisit, FamaScore, PlaceCard, Avatar,
  SearchBar, AppHeader, TabBar, Field, SectionTitle, Chip, EmptyState,
});
