// ========================================================================
// 03-components.jsx
// ========================================================================
// Icon — set completo del mobile, mismo trazado
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
    case 'compass': return <svg {...p}><circle cx="12" cy="12" r="9"/><path d="m15 9-2 5-5 2 2-5z" fill={color}/></svg>;
    case 'collection': return <svg {...p}><rect x="3" y="5" width="14" height="14" rx="2"/><path d="M7 3h12a2 2 0 0 1 2 2v12"/></svg>;
    case 'plus': return <svg {...p}><path d="M12 5v14M5 12h14"/></svg>;
    case 'users': return <svg {...p}><circle cx="9" cy="8" r="3.5"/><path d="M3 20c0-3 3-5 6-5s6 2 6 5"/><circle cx="17" cy="9" r="2.5"/><path d="M16 14c2.5 0 5 1.5 5 4"/></svg>;
    case 'user': return <svg {...p}><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></svg>;
    case 'calendar': return <svg {...p}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/></svg>;
    case 'arrowLeft': return <svg {...p}><path d="M15 6l-6 6 6 6"/></svg>;
    case 'arrowRight': return <svg {...p}><path d="m9 6 6 6-6 6"/></svg>;
    case 'close': return <svg {...p}><path d="M6 6l12 12M18 6 6 18"/></svg>;
    case 'menu': return <svg {...p}><path d="M4 6h16M4 12h16M4 18h16"/></svg>;
    case 'logout': return <svg {...p}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>;
    case 'bell': return <svg {...p}><path d="M6 8a6 6 0 0 1 12 0c0 5 2 7 2 7H4s2-2 2-7M10 19a2 2 0 0 0 4 0"/></svg>;
    case 'bookmark': return <svg {...p}><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>;
    case 'sparkles': return <svg {...p}><path d="m12 3 1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8zM19 14l.9 2.1L22 17l-2.1.9L19 20l-.9-2.1L16 17l2.1-.9zM5 16l.7 1.6L7.3 18l-1.6.7L5 20.3 4.3 18.7 2.7 18l1.6-.7z"/></svg>;
    case 'settings': return <svg {...p}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.7l.1.1a2 2 0 0 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.7-.3 1.6 1.6 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1a1.6 1.6 0 0 0-1-1.5 1.6 1.6 0 0 0-1.7.3l-.1.1a2 2 0 0 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.7 1.6 1.6 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1a1.6 1.6 0 0 0 1.5-1 1.6 1.6 0 0 0-.3-1.7l-.1-.1a2 2 0 0 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.7.3h.1a1.6 1.6 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.7-.3l.1-.1a2 2 0 0 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.7v.1a1.6 1.6 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1z"/></svg>;
    case 'coffee': return <svg {...p}><path d="M3 8h14v6a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4z"/><path d="M17 9h2a2 2 0 0 1 0 6h-2M6 2v3M10 2v3M14 2v3"/></svg>;
    case 'utensils': return <svg {...p}><path d="M5 2v8a2 2 0 0 0 4 0V2M7 10v12M14 2v20M14 8c0-3 3-5 5-5v19"/></svg>;
    case 'bar': return <svg {...p}><path d="M5 4h14l-2 6a4 4 0 0 1-10 0zM12 14v6M9 20h6"/></svg>;
    case 'palette': return <svg {...p}><path d="M12 3a9 9 0 0 0 0 18c1 0 1.5-1 1-2-.5-1.2.5-2 1.5-2H17a4 4 0 0 0 4-4 9 9 0 0 0-9-10z"/><circle cx="7.5" cy="10.5" r="1" fill={color}/><circle cx="11" cy="7" r="1" fill={color}/><circle cx="15.5" cy="8.5" r="1" fill={color}/></svg>;
    case 'leaf': return <svg {...p}><path d="M11 20A7 7 0 0 1 4 13c0-4 4-9 11-9 1 6-2 16-4 16zM4 13c4 0 8 3 7 7"/></svg>;
    case 'gift': return <svg {...p}><rect x="3" y="9" width="18" height="11" rx="2"/><path d="M3 12h18M12 9v11"/><path d="M8 9c-1.5 0-3-1-3-2.5C5 5 6.5 4 8 5c1.5 1 4 4 4 4s2.5-3 4-4c1.5-1 3 0 3 1.5C19 8 17.5 9 16 9"/></svg>;
    case 'list': return <svg {...p}><path d="M4 6h16M4 12h16M4 18h16"/></svg>;
    case 'map': return <svg {...p}><path d="m3 6 6-2 6 2 6-2v14l-6 2-6-2-6 2zM9 4v14M15 6v14"/></svg>;
    case 'clock': return <svg {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>;
    case 'share': return <svg {...p}><circle cx="6" cy="12" r="3"/><circle cx="18" cy="6" r="3"/><circle cx="18" cy="18" r="3"/><path d="m9 11 6-3M9 13l6 3"/></svg>;
    case 'edit': return <svg {...p}><path d="M11 4H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2v-6"/><path d="M18.5 2.5a2.1 2.1 0 0 1 3 3L12 15l-4 1 1-4z"/></svg>;
    case 'eye': return <svg {...p}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>;
    case 'mail': return <svg {...p}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>;
    case 'lock': return <svg {...p}><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>;
    case 'globe': return <svg {...p}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>;
    case 'thumbsUp': return <svg {...p}><path d="M7 22V11l5-9 1 1-1 7h6a2 2 0 0 1 2 2.5l-2 8a2 2 0 0 1-2 1.5zM3 11h4v11H3z"/></svg>;
    case 'more': return <svg {...p} fill={color} stroke="none"><circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/></svg>;
    case 'umbrella': return <svg {...p}><path d="M12 3a9 9 0 0 1 9 9H3a9 9 0 0 1 9-9zM12 12v7a2 2 0 0 0 4 0"/></svg>;
    case 'moon': return <svg {...p}><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>;
    case 'wineglass': return <svg {...p}><path d="M8 3h8l-1 6a3 3 0 0 1-6 0zM12 12v9M9 21h6"/></svg>;
    case 'verify': return <svg {...p}><path d="M12 2 4 5v6c0 5 3.5 9 8 11 4.5-2 8-6 8-11V5l-8-3z"/><path d="m9 12 2 2 4-4"/></svg>;
    case 'wallet': return <svg {...p}><rect x="3" y="6" width="18" height="14" rx="2"/><path d="M3 10h18M16 15h2"/></svg>;
    case 'briefcase': return <svg {...p}><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/></svg>;
    case 'stats': return <svg {...p}><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg>;
    case 'home': return <svg {...p}><path d="m3 11 9-8 9 8v9a2 2 0 0 1-2 2h-3v-7h-8v7H5a2 2 0 0 1-2-2z"/></svg>;
    case 'megaphone': return <svg {...p}><path d="M3 11v2a2 2 0 0 0 2 2h2l8 4V5L7 9H5a2 2 0 0 0-2 2zM18 8a4 4 0 0 1 0 8"/></svg>;
    case 'photo': return <svg {...p}><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="11" r="2"/><path d="m3 17 5-4 4 3 4-5 5 6"/></svg>;
    case 'send': return <svg {...p}><path d="M22 2 11 13M22 2l-7 20-4-9-9-4z"/></svg>;
    case 'shield': return <svg {...p}><path d="M12 2 4 5v6c0 5 3.5 9 8 11 4.5-2 8-6 8-11V5l-8-3z"/></svg>;
    case 'eyeOff': return <svg {...p}><path d="M3 3l18 18M10.6 6.1A10 10 0 0 1 12 6c6.5 0 10 6 10 6a17 17 0 0 1-3.1 4M6.6 6.6C3.6 8.4 2 12 2 12s3.5 7 10 7c1.7 0 3.2-.4 4.6-1.1M9.9 9.9a3 3 0 0 0 4.2 4.2"/></svg>;
    case 'apple': return <svg {...p} fill={color} stroke="none"><path d="M17.5 12.5c0-2.5 2-3.5 2-3.5-1-1.5-3-1.5-4-1.5-1.5 0-3 1-4 1s-2.5-1-4-1c-2 0-4 1.5-4 4.5 0 4 3 9 5 9 1 0 1.5-.5 3-.5s2 .5 3 .5c2 0 4-3.5 4-3.5-3-1.5-1-5-1-5zM14 4c.5-1 .5-2.5-.5-3.5-1 0-2 .5-2.5 1.5-.5 1-.5 2.5.5 3.5 1 0 2-.5 2.5-1.5z"/></svg>;
    case 'google': return <svg {...p} stroke="none" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.5 12.3c0-.9-.1-1.5-.2-2.2H12v4.1h6c-.1 1-.8 2.5-2.2 3.5l3.4 2.7c2-1.9 3.3-4.6 3.3-8.1z"/><path fill="#34A853" d="M12 23c3 0 5.5-1 7.3-2.7l-3.4-2.7c-1 .7-2.3 1.1-3.9 1.1-3 0-5.5-2-6.4-4.7L2.1 16c1.7 3.4 5.3 7 9.9 7z"/><path fill="#FBBC04" d="M5.6 14c-.2-.7-.4-1.4-.4-2.1s.1-1.4.4-2.1L2.1 7.1C1.4 8.6 1 10.2 1 12s.4 3.4 1.1 4.9z"/><path fill="#EA4335" d="M12 5.2c2.1 0 3.6.9 4.4 1.7L19.5 4C17.5 2.1 14.9 1 12 1 7.4 1 3.8 4.6 2.1 8L5.6 11c.9-2.7 3.4-5.8 6.4-5.8z"/></svg>;
    case 'trash': return <svg {...p}><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M5 6l1 14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-14"/></svg>;
    default: return null;
  }
};

const SpotaLogo = ({ size = 28, color = SPOTA.c.primary }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
    <Icon name="pinFill" size={size} color={color} />
    <span style={{ fontFamily: SPOTA.font.ui, fontWeight: 800, fontSize: size * 0.95, color: SPOTA.c.text, letterSpacing: -0.4 }}>
      Spota
    </span>
  </div>
);

const Btn = ({ children, variant = 'primary', size = 'md', onClick, full, icon, iconRight, style = {}, disabled }) => {
  const sizes = { sm: { h: 36, px: 14, fs: 14, r: 10 }, md: { h: 44, px: 18, fs: 14.5, r: 12 }, lg: { h: 52, px: 22, fs: 16, r: 14 } }[size];
  const palettes = {
    primary: { bg: SPOTA.c.primary, c: '#fff', bd: 'transparent', hover: SPOTA.c.primaryDark },
    secondary: { bg: SPOTA.c.secondary, c: '#fff', bd: 'transparent', hover: SPOTA.c.secondaryDark },
    outline: { bg: 'transparent', c: SPOTA.c.text, bd: SPOTA.c.line, hover: SPOTA.c.bgAlt },
    ghost: { bg: 'transparent', c: SPOTA.c.text, bd: 'transparent', hover: SPOTA.c.lineSoft },
  }[variant];
  const [hover, setHover] = React.useState(false);
  return (
    <button onClick={onClick} disabled={disabled}
      onMouseEnter={() => !disabled && setHover(true)} onMouseLeave={() => setHover(false)}
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

const Avatar = ({ name, size = 40, score }) => (
  <div style={{ position: 'relative', display: 'inline-flex' }}>
    <img src={avatar(name, size * 2)} alt={name}
      style={{ width: size, height: size, borderRadius: 999, objectFit: 'cover',
        border: score ? `2px solid ${SPOTA.c.accent}` : `1.5px solid ${SPOTA.c.line}` }} />
    {score && (
      <span style={{
        position: 'absolute', bottom: -2, right: -4,
        background: SPOTA.c.surface, color: SPOTA.c.text,
        fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 10,
        padding: '1px 5px', borderRadius: 999, border: `1px solid ${SPOTA.c.line}`,
      }}>{score}</span>
    )}
  </div>
);

// Tag — píldora de estado / beneficio (Popular, Nuevo, Recomendado, etc.)
const Tag = ({ children, kind = 'secondary', icon, style = {} }) => {
  const palettes = {
    secondary: { bg: SPOTA.c.secondary, c: '#fff' },
    accent:    { bg: SPOTA.c.accent, c: '#2B2523' },
    primary:   { bg: SPOTA.c.primary, c: '#fff' },
    soft:      { bg: SPOTA.c.secondarySoft, c: SPOTA.c.secondaryDark },
    softG:     { bg: SPOTA.c.primarySoft, c: SPOTA.c.primaryDark },
    softA:     { bg: SPOTA.c.accentSoft, c: '#7A5A12' },
  }[kind];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: '4px 10px', borderRadius: 999,
      background: palettes.bg, color: palettes.c,
      fontFamily: SPOTA.font.ui, fontWeight: 600, fontSize: 11.5, letterSpacing: 0.2,
      ...style,
    }}>
      {icon && <Icon name={icon} size={12} />}
      {children}
    </span>
  );
};

// Proof of Visit — píldora verde con check
const ProofOfVisit = ({ size = 'sm' }) => {
  const isLg = size === 'lg';
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: isLg ? '6px 12px' : '4px 9px', borderRadius: 999,
      background: SPOTA.c.primary, color: '#fff',
      fontFamily: SPOTA.font.ui, fontWeight: 600, fontSize: isLg ? 12.5 : 11,
      boxShadow: '0 1px 3px rgba(47,111,94,0.2)',
    }}>
      <span style={{
        width: isLg ? 16 : 14, height: isLg ? 16 : 14, borderRadius: 999,
        background: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon name="check" size={isLg ? 11 : 9} color={SPOTA.c.primary} strokeWidth={3} />
      </span>
      Visitado
    </span>
  );
};

// FamaScore — variante classic (usada en cards y detalle)
const FamaScore = ({ score = 4.7, count = 256, size = 'sm', onDark = false }) => (
  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
    <Icon name="star" size={size === 'lg' ? 18 : 14} color={SPOTA.c.accent} />
    <span style={{ fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: size === 'lg' ? 15 : 13, color: onDark ? '#fff' : SPOTA.c.text }}>
      {score.toFixed(1)}
    </span>
    <span style={{ fontFamily: SPOTA.font.ui, fontSize: size === 'lg' ? 14 : 12.5, color: onDark ? 'rgba(255,255,255,0.85)' : SPOTA.c.textSoft }}>
      ({count})
    </span>
  </div>
);

// PlaceCard — card de lugar (variante desktop con hover lift)
const PlaceCard = ({ place, onClick, saved, onSave, selected }) => {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        background: SPOTA.c.surface, borderRadius: SPOTA.radius.lg, overflow: 'hidden',
        border: `1.5px solid ${selected ? SPOTA.c.primary : SPOTA.c.lineSoft}`,
        boxShadow: hover || selected ? SPOTA.shadow.cardHover : SPOTA.shadow.card,
        cursor: 'pointer', transform: hover ? 'translateY(-2px)' : 'none',
        transition: 'transform 200ms, box-shadow 200ms, border-color 150ms',
      }}>
      <div style={{ position: 'relative', height: 170, background: SPOTA.c.lineSoft }}>
        <img src={photo(place.img, 600, 400)} alt={place.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        {place.tag && <div style={{ position: 'absolute', top: 10, left: 10 }}><Tag kind="secondary">{place.tag}</Tag></div>}
        <button onClick={(e) => { e.stopPropagation(); onSave && onSave(); }} style={{
          position: 'absolute', top: 8, right: 8, width: 36, height: 36, borderRadius: 999,
          background: 'rgba(255,255,255,0.92)', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon name={saved ? 'heartFill' : 'heart'} size={18} color={saved ? SPOTA.c.secondary : SPOTA.c.text} />
        </button>
        {place.visited && <div style={{ position: 'absolute', bottom: 10, left: 10 }}><ProofOfVisit /></div>}
        {place.benefit && <div style={{ position: 'absolute', bottom: 10, right: 10 }}><Tag kind="accent" icon="gift">{place.benefit}</Tag></div>}
      </div>
      <div style={{ padding: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
          <h3 style={{ margin: 0, fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 16, color: SPOTA.c.text, lineHeight: 1.2 }}>
            {place.name}
          </h3>
          <span style={{ fontFamily: SPOTA.font.ui, fontWeight: 600, fontSize: 13, color: SPOTA.c.textSoft, whiteSpace: 'nowrap' }}>
            {place.price}
          </span>
        </div>
        <p style={{ margin: '4px 0 8px', fontFamily: SPOTA.font.ui, fontSize: 13, color: SPOTA.c.textSoft }}>
          {place.cat} · {place.hood}
        </p>
        <FamaScore score={place.score} count={place.reviews} />
        <AffineRow place={place} />
      </div>
    </div>
  );
};

// AffineRow — chip cualitativo de match + mini-avatares de reseñadores afines.
// Es la traducción humana del Fama Score predictivo. Espejo del componente mobile.
const AffineRow = ({ place }) => {
  const reviewers = (window.AFFINE_REVIEWERS && window.AFFINE_REVIEWERS[place.id]) || [];
  const aff = window.affinityLabel ? window.affinityLabel(place.affinity) : null;
  if (!aff && !reviewers.length) return null;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
      {aff && (
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 4,
          padding: '3px 8px', borderRadius: 999,
          background: aff.tone === 'primary' ? 'rgba(47, 111, 94, 0.10)' : SPOTA.c.bgAlt,
          border: `1px solid ${aff.tone === 'primary' ? 'rgba(47, 111, 94, 0.25)' : SPOTA.c.lineSoft}`,
          fontFamily: SPOTA.font.ui, fontSize: 11, fontWeight: 600,
          color: aff.tone === 'primary' ? SPOTA.c.primary : SPOTA.c.textSoft,
        }}>
          <Icon name="sparkles" size={10} color={aff.tone === 'primary' ? SPOTA.c.primary : SPOTA.c.textSoft} />
          {aff.label}
        </span>
      )}
      {reviewers.length > 0 && (
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <div style={{ display: 'inline-flex' }}>
            {reviewers.slice(0, 3).map((name, i) => (
              <div key={name} style={{ marginLeft: i === 0 ? 0 : -7, border: `2px solid ${SPOTA.c.surface}`, borderRadius: 999, lineHeight: 0 }}>
                <img src={avatar(name, 36)} alt={name} style={{ width: 18, height: 18, borderRadius: 999, display: 'block' }} />
              </div>
            ))}
          </div>
          <span style={{ fontFamily: SPOTA.font.ui, fontSize: 11.5, color: SPOTA.c.textSoft }}>
            <span style={{ fontFamily: SPOTA.font.serif, fontStyle: 'italic' }}>gente como vos</span>
          </span>
        </div>
      )}
    </div>
  );
};

// IntentChips — visualiza las dimensiones interpretadas por interpretQuery.
const INTENT_DIMENSIONS = [
  { key: 'ambiente',  prefix: 'ambiente', icon: 'sparkles' },
  { key: 'compania',  prefix: 'con',      icon: 'users'    },
  { key: 'momento',   prefix: 'cuándo',   icon: 'calendar' },
  { key: 'categoria', prefix: 'tipo',     icon: 'compass'  },
  { key: 'zona',      prefix: 'en',       icon: 'map'      },
];

const IntentChips = ({ intents, label = 'Entendí esto:' }) => {
  const present = INTENT_DIMENSIONS.filter(d => intents && intents[d.key]);
  if (!present.length) return null;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
      <span style={{ fontFamily: SPOTA.font.serif, fontStyle: 'italic', fontSize: 13, color: SPOTA.c.textSoft }}>
        {label}
      </span>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {present.map(d => (
          <span key={d.key} style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '6px 12px', borderRadius: 999,
            background: SPOTA.c.surface, border: `1px solid ${SPOTA.c.line}`,
            fontFamily: SPOTA.font.ui, fontSize: 13,
          }}>
            <Icon name={d.icon} size={12} color={SPOTA.c.primary} />
            <span style={{ fontFamily: SPOTA.font.serif, fontStyle: 'italic', color: SPOTA.c.textSoft }}>
              {d.prefix}
            </span>
            <strong style={{ fontWeight: 600, color: SPOTA.c.text }}>
              {intents[d.key]}
            </strong>
          </span>
        ))}
      </div>
    </div>
  );
};

Object.assign(window, { Icon, SpotaLogo, Btn, Avatar, Tag, ProofOfVisit, FamaScore, PlaceCard,
                        AffineRow, IntentChips, INTENT_DIMENSIONS });
