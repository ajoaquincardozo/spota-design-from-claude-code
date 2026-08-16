// ========================================================================
// 13-app.jsx
// ========================================================================
const { useState, useEffect, useRef, useMemo } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "density": "cozy",
  "famaVariant": "classic",
  "showSidebar": true,
  "darkChrome": true
}/*EDITMODE-END*/;

// ===== Pantallas que faltan: implementaciones simples inline =====
// CU-03: Recuperar contraseña (full screen, centrado)
const ScreenRecover = ({ nav }) => {
  const [sent, setSent] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: SPOTA.c.bg, position: 'relative' }}>
      <button onClick={() => nav('login')} style={{
        position: 'absolute', top: 14, left: 14, width: 40, height: 40, borderRadius: 999,
        border: 'none', background: SPOTA.c.surface, cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 3px rgba(43,37,35,0.08)', zIndex: 5,
      }}><Icon name="arrowLeft" size={18} /></button>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 24px' }}>
        {!sent ? (
          <>
            <h1 style={{ margin: '0 0 8px', fontFamily: SPOTA.font.ui, fontSize: 28, fontWeight: 700, color: SPOTA.c.text, letterSpacing: -0.5 }}>
              Recuperá tu <span style={{ fontFamily: SPOTA.font.serif, fontStyle: 'italic', color: SPOTA.c.secondary, fontWeight: 400 }}>contraseña</span>
            </h1>
            <p style={{ margin: '0 0 22px', fontFamily: SPOTA.font.ui, fontSize: 15, color: SPOTA.c.textSoft, lineHeight: 1.5 }}>
              Te mandamos un link al mail para resetearla. Expira en 15 minutos.
            </p>
            <Field label="Email (texto@dominio.tld)" type="email" placeholder="vos@correo.com" value={email} onChange={setEmail} icon="mail" />
          </>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: 88, height: 88, borderRadius: 999, background: SPOTA.c.primarySoft, margin: '0 auto 18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="mail" size={40} color={SPOTA.c.primary} />
            </div>
            <h2 style={{ margin: '0 0 8px', fontFamily: SPOTA.font.ui, fontSize: 24, fontWeight: 700, color: SPOTA.c.text }}>Revisá tu mail</h2>
            <p style={{ margin: '0 0 18px', fontFamily: SPOTA.font.ui, fontSize: 14.5, color: SPOTA.c.textSoft, lineHeight: 1.5 }}>
              Si el email está registrado, te llega un link para resetear la contraseña. Vence en 15 minutos.
            </p>
            {/* CU-001-003 §3.12 paso 10: el usuario abre el mail y hace click en el link. En el prototipo simulamos ese paso. */}
            <div style={{ padding: '12px 14px', borderRadius: 12, background: SPOTA.c.accentSoft, border: `1px dashed ${SPOTA.c.accent}`, marginTop: 6 }}>
              <p style={{ margin: '0 0 8px', fontFamily: SPOTA.font.ui, fontSize: 12, fontWeight: 700, color: SPOTA.c.text, letterSpacing: 0.3, textTransform: 'uppercase' }}>Tip prototipo</p>
              <p style={{ margin: '0 0 10px', fontFamily: SPOTA.font.ui, fontSize: 12.5, color: SPOTA.c.text, lineHeight: 1.45 }}>
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
        )}
      </div>
      <div style={{ padding: '12px 24px 28px' }}>
        {!sent
          ? <Btn variant="primary" size="lg" full disabled={!valid} onClick={() => setSent(true)}>Enviar link</Btn>
          : <Btn variant="outline" size="lg" full onClick={() => nav('login')}>Volver al login</Btn>}
      </div>
    </div>
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
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: SPOTA.c.bg, position: 'relative' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 24px' }}>
        <div style={{ width: 88, height: 88, borderRadius: 999, background: SPOTA.c.primarySoft, margin: '0 auto 18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="lock" size={36} color={SPOTA.c.primary} />
        </div>
        <h1 style={{ margin: '0 0 8px', fontFamily: SPOTA.font.ui, fontSize: 26, fontWeight: 700, color: SPOTA.c.text, letterSpacing: -0.4, textAlign: 'center' }}>
          Elegí una <span style={{ fontFamily: SPOTA.font.serif, fontStyle: 'italic', color: SPOTA.c.secondary, fontWeight: 400 }}>nueva contraseña</span>
        </h1>
        <p style={{ margin: '0 0 22px', fontFamily: SPOTA.font.ui, fontSize: 14, color: SPOTA.c.textSoft, lineHeight: 1.5, textAlign: 'center' }}>
          Mínimo 8 caracteres. Al guardar, cerramos cualquier sesión activa en otros dispositivos.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Field label="Contraseña nueva" type="password" placeholder="Mínimo 8 caracteres" value={pwd} onChange={setPwd} icon="lock" error={tooShort ? 'Tiene que tener al menos 8 caracteres.' : null} />
          <Field label="Confirmar contraseña" type="password" placeholder="Repetí la nueva" value={confirm} onChange={setConfirm} icon="lock" error={mismatch ? 'No coincide con la nueva contraseña.' : null} />
        </div>
      </div>
      <div style={{ padding: '12px 24px 28px' }}>
        <Btn variant="primary" size="lg" full disabled={!valid} onClick={submit}>Actualizar contraseña</Btn>
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

const ScreenSearchResults = ({ nav, params }) => {
  const tweaks = window.__SPOTA_TWEAKS || {};
  const initialQuery = (params && params.query) || 'algo tranquilo en Palermo con una amiga el sábado';

  const [activeQuery, setActiveQuery] = React.useState(initialQuery);
  const [draftQuery, setDraftQuery] = React.useState(initialQuery);
  const [loading, setLoading] = React.useState(true);
  const [view, setView] = React.useState('list'); // list | map
  const intents = window.interpretQuery(activeQuery);

  React.useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 750);
    return () => clearTimeout(t);
  }, [activeQuery]);

  const submit = () => {
    const q = (draftQuery || '').trim();
    if (!q || q === activeQuery) return;
    setActiveQuery(q);
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: SPOTA.c.bg }}>
      {/* Header: back + input editable refinable */}
      <div style={{ padding: '10px 16px 8px', display: 'flex', alignItems: 'center', gap: 10, background: SPOTA.c.bg }}>
        <button onClick={() => nav('home')} style={{ width: 40, height: 40, borderRadius: 999, border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Icon name="arrowLeft" size={20} />
        </button>
        <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', background: SPOTA.c.surface, borderRadius: 999, border: `1.5px solid ${SPOTA.c.line}` }}>
          <Icon name="search" size={16} color={SPOTA.c.textSoft} />
          <input
            value={draftQuery}
            onChange={(e) => setDraftQuery(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.target.blur(); submit(); } }}
            style={{
              flex: 1, minWidth: 0, border: 'none', outline: 'none', background: 'transparent',
              fontFamily: SPOTA.font.ui, fontSize: 14, color: SPOTA.c.text,
            }}
          />
          {draftQuery && draftQuery !== activeQuery && (
            <button onClick={submit} style={{
              border: 'none', background: SPOTA.c.primary, color: '#fff',
              fontFamily: SPOTA.font.ui, fontSize: 11.5, fontWeight: 600,
              padding: '4px 10px', borderRadius: 999, cursor: 'pointer', flexShrink: 0,
            }}>Refinar</button>
          )}
        </div>
      </div>

      {loading ? (
        <ConciergeLoading intents={intents} />
      ) : (
        <React.Fragment>
          <div style={{ padding: '4px 16px 12px' }}>
            <IntentChips intents={intents} />
          </div>

          {/* Toggle Lista/Mapa + contador */}
          <div style={{ padding: '0 16px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
            <p style={{ margin: 0, fontFamily: SPOTA.font.ui, fontSize: 13, color: SPOTA.c.textSoft }}>
              <strong style={{ color: SPOTA.c.text }}>{PLACES.length} lugares</strong> por afinidad
            </p>
            <div style={{ display: 'inline-flex', borderRadius: 999, background: SPOTA.c.surface, padding: 3, border: `1px solid ${SPOTA.c.line}` }}>
              {[{ id: 'list', i: 'list', l: 'Lista' }, { id: 'map', i: 'map', l: 'Mapa' }].map(t => (
                <button key={t.id} onClick={() => setView(t.id)} style={{
                  border: 'none', cursor: 'pointer', padding: '6px 12px', borderRadius: 999,
                  background: view === t.id ? SPOTA.c.primary : 'transparent',
                  color: view === t.id ? '#fff' : SPOTA.c.textSoft,
                  display: 'inline-flex', alignItems: 'center', gap: 5,
                  fontFamily: SPOTA.font.ui, fontSize: 12.5, fontWeight: 600,
                }}>
                  <Icon name={t.i} size={14} /> {t.l}
                </button>
              ))}
            </div>
          </div>

          {view === 'list' ? (
            <div style={{ flex: 1, overflow: 'auto', padding: '0 16px 24px' }}>
              {PLACES.map(p => (
                <div key={p.id} style={{ marginBottom: 14 }}>
                  <PlaceCard place={p}
                    density={tweaks.density || 'cozy'}
                    famaVariant={tweaks.famaVariant || 'classic'}
                    onClick={() => nav('placeDetail', { id: p.id })} />
                </div>
              ))}
            </div>
          ) : (
            <SearchResultsMap nav={nav} famaVariant={tweaks.famaVariant || 'classic'} />
          )}
        </React.Fragment>
      )}
    </div>
  );
};

// Wrapper para reusar el MapView del módulo de Discover desde SearchResults.
// JSX no acepta `<window.X />` (member access en lowercase), así que se
// envuelve para mantener el componente original como fuente de verdad.
const SearchResultsMap = (props) => {
  const M = window.MapView;
  return M ? <M {...props} /> : null;
};

// ConciergeLoading — pausa narrativa entre submit y resultados.
// Comunica que hay un cerebro detrás, no un SQL. Dura ~750ms.
const ConciergeLoading = ({ intents }) => {
  const dims = Object.values(intents || {}).filter(Boolean);
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', gap: 16 }}>
      <div style={{ display: 'inline-flex', gap: 6 }}>
        {[0, 1, 2].map(i => (
          <span key={i} style={{
            width: 8, height: 8, borderRadius: 999, background: SPOTA.c.primary,
            opacity: 0.35, animation: `pulse 1.2s ease-in-out ${i * 0.15}s infinite`,
          }} />
        ))}
      </div>
      <p style={{ margin: 0, textAlign: 'center', fontFamily: SPOTA.font.ui, fontSize: 15, color: SPOTA.c.text }}>
        <span style={{ fontFamily: SPOTA.font.serif, fontStyle: 'italic' }}>Leyendo</span> tus gustos…
      </p>
      {dims.length > 0 && (
        <p style={{ margin: 0, textAlign: 'center', fontFamily: SPOTA.font.ui, fontSize: 12.5, color: SPOTA.c.textSoft, maxWidth: 280, lineHeight: 1.5 }}>
          Cruzando {dims.join(' · ')} con tu Fama Score
        </p>
      )}
    </div>
  );
};

const ScreenCollectionDetail = ({ nav, params }) => {
  const c = (params && params.id ? COLLECTIONS.find(x => x.id === params.id) : null) || COLLECTIONS[0];
  const scope = (params && params.scope) || 'Mías';
  const activity = (params && params.activity) || 'Todas';
  const tweaks = window.__SPOTA_TWEAKS || {};
  // PlaceCards de la colección. Para el prototipo tomamos los primeros N lugares.
  const N = Math.min(c.count, 6);
  const placesAll = PLACES.slice(0, N);
  const isMine = collectionIsMine(c);
  const [savedLocal, setSavedLocal] = React.useState(collectionIsSaved(c));
  const [savedToast, setSavedToast] = React.useState(false);
  const [shareToast, setShareToast] = React.useState(false);
  const showSaveBtn = !isMine && !savedLocal;
  const onSave = () => {
    SAVED_COLLECTION_IDS.add(c.id);
    setSavedLocal(true);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2200);
  };
  const onShare = () => {
    setShareToast(true);
    setTimeout(() => setShareToast(false), 2200);
  };
  // Ordenamos: matcheados arriba, no matcheados atenuados debajo.
  const matched = activity !== 'Todas' ? placesAll.filter(p => matchesActivity(p, activity)) : placesAll;
  const unmatched = activity !== 'Todas' ? placesAll.filter(p => !matchesActivity(p, activity)) : [];
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: SPOTA.c.bg }}>
      <div style={{ position: 'relative', height: 200, background: `url(${photo(c.cover, 800, 400)}) center/cover` }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.6))' }} />
        <button onClick={() => nav('collections', { scope, activity })} style={{ position: 'absolute', top: 14, left: 14, width: 40, height: 40, borderRadius: 999, border: 'none', background: 'rgba(255,255,255,0.92)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="arrowLeft" size={18} /></button>
        <div style={{ position: 'absolute', top: 14, right: 14, display: 'flex', gap: 8 }}>
          {showSaveBtn && (
            <button title="Guardar colección" onClick={onSave} style={{ width: 40, height: 40, borderRadius: 999, border: 'none', background: SPOTA.c.primary, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="bookmark" size={16} color="#fff" />
            </button>
          )}
          {!isMine && savedLocal && (
            <span title="Guardada" style={{ width: 40, height: 40, borderRadius: 999, background: 'rgba(255,255,255,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="check" size={16} color={SPOTA.c.primary} strokeWidth={3} />
            </span>
          )}
          <button title="Compartir" onClick={onShare} style={{ width: 40, height: 40, borderRadius: 999, border: 'none', background: 'rgba(255,255,255,0.92)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="share" size={16} />
          </button>
        </div>
        {(savedToast || shareToast) && (
          <div style={{
            position: 'absolute', bottom: 14, left: '50%', transform: 'translateX(-50%)',
            padding: '8px 14px', borderRadius: 999, background: 'rgba(43,37,35,0.9)',
            color: '#fff', fontFamily: SPOTA.font.ui, fontSize: 12.5, fontWeight: 600,
            zIndex: 5,
          }}>{savedToast ? 'Colección guardada' : 'Link copiado'}</div>
        )}
        <div style={{ position: 'absolute', bottom: 14, left: 16, right: 16, color: '#fff' }}>
          <h1 style={{ margin: 0, fontFamily: SPOTA.font.ui, fontSize: 26, fontWeight: 700, letterSpacing: -0.5 }}>{c.name}</h1>
          <p style={{ margin: '4px 0 0', fontFamily: SPOTA.font.ui, fontSize: 13, opacity: 0.9 }}>
            {c.count} lugares · {c.public ? 'Pública' : 'Privada'} · por {c.by}
          </p>
          {activity !== 'Todas' && (
            <p style={{ margin: '4px 0 0', fontFamily: SPOTA.font.ui, fontSize: 12.5, fontWeight: 600, color: SPOTA.c.accent }}>
              {matched.length} de {placesAll.length} matchean tu filtro: {activity}
            </p>
          )}
        </div>
      </div>
      <div style={{ flex: 1, overflow: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>
        {/* Matcheados (o todos cuando actividad = Todas) */}
        {matched.map(p => (
          <div key={p.id} style={{
            borderRadius: SPOTA.radius.lg,
            outline: activity !== 'Todas' ? `2px solid ${SPOTA.c.primary}` : 'none',
            position: 'relative',
          }}>
            <PlaceCard place={p} density={tweaks.density || 'cozy'} famaVariant={tweaks.famaVariant || 'classic'} onClick={() => nav('placeDetail', { id: p.id })} />
            {activity !== 'Todas' && (
              <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 2 }}>
                <Tag kind="primary" icon="check">Coincide con: {activity}</Tag>
              </div>
            )}
          </div>
        ))}
        {unmatched.length > 0 && (
          <>
            <div style={{ marginTop: 6, fontFamily: SPOTA.font.ui, fontSize: 12.5, fontWeight: 600, color: SPOTA.c.textSoft, textTransform: 'uppercase', letterSpacing: 0.4 }}>
              Otros lugares de la colección
            </div>
            {unmatched.map(p => (
              <div key={p.id} style={{ opacity: 0.45, filter: 'saturate(0.7)' }}>
                <PlaceCard place={p} density={tweaks.density || 'cozy'} famaVariant={tweaks.famaVariant || 'classic'} onClick={() => nav('placeDetail', { id: p.id })} />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

const ScreenProfile = ({ nav }) => (
  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: SPOTA.c.bg, paddingBottom: 80, overflow: 'auto' }}>
    {/* Header limpio: avatar + identidad + botón ajustes */}
    <div style={{ padding: '20px 20px 14px', display: 'flex', alignItems: 'center', gap: 14 }}>
      <Avatar name="Sol B." size={64} score="87" />
      <div style={{ flex: 1, minWidth: 0 }}>
        <h2 style={{ margin: 0, fontFamily: SPOTA.font.ui, fontSize: 20, fontWeight: 700, color: SPOTA.c.text, letterSpacing: -0.3 }}>Sol Benítez</h2>
        <p style={{ margin: '2px 0 0', fontFamily: SPOTA.font.ui, fontSize: 13, color: SPOTA.c.textSoft }}>@solbenitez · Palermo</p>
      </div>
      <button onClick={() => nav('credentials')} title="Ajustes" style={{ width: 40, height: 40, borderRadius: 999, border: `1px solid ${SPOTA.c.line}`, background: SPOTA.c.surface, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon name="settings" size={18} color={SPOTA.c.textSoft} />
      </button>
    </div>
    {/* Fama Score card */}
    <div style={{ margin: '0 20px 16px', padding: 16, borderRadius: 16, background: `linear-gradient(135deg, ${SPOTA.c.primary} 0%, ${SPOTA.c.primaryDark} 100%)`, color: '#fff' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <div>
          <div style={{ fontFamily: SPOTA.font.ui, fontSize: 11.5, opacity: 0.85, textTransform: 'uppercase', letterSpacing: 0.5 }}>Fama Score</div>
          <div style={{ fontFamily: SPOTA.font.ui, fontSize: 32, fontWeight: 800, letterSpacing: -1, lineHeight: 1 }}>87<span style={{ fontSize: 16, opacity: 0.7 }}>/100</span></div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontFamily: SPOTA.font.ui, fontSize: 11.5, opacity: 0.85, textTransform: 'uppercase', letterSpacing: 0.5 }}>Nivel</div>
          <div style={{ fontFamily: SPOTA.font.serif, fontStyle: 'italic', fontSize: 22, fontWeight: 500 }}>Referente</div>
        </div>
      </div>
      <div style={{ height: 5, borderRadius: 999, background: 'rgba(255,255,255,0.22)', overflow: 'hidden', marginBottom: 8 }}>
        <div style={{ height: '100%', width: '87%', background: SPOTA.c.accent, borderRadius: 999 }} />
      </div>
      <p style={{ margin: 0, fontFamily: SPOTA.font.ui, fontSize: 12.5, opacity: 0.9 }}>13 puntos para llegar a <strong>Maestro</strong> · Reseñá 2 lugares más esta semana</p>
    </div>
    {/* Stats compactos */}
    <div style={{ margin: '0 20px 18px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
      {[{ n: '47', l: 'Visitados', id: 'myExperiences' }, { n: '12', l: 'Reseñas', id: 'myExperiences' }, { n: '4', l: 'Colecciones', id: 'collections', params: { scope: 'Mías', activity: 'Todas' } }].map(s => (
        <button key={s.l} onClick={() => nav(s.id, s.params)} style={{ padding: '12px 8px', textAlign: 'center', border: `1px solid ${SPOTA.c.lineSoft}`, background: SPOTA.c.surface, borderRadius: 12, cursor: 'pointer' }}>
          <div style={{ fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 18, color: SPOTA.c.text, lineHeight: 1 }}>{s.n}</div>
          <div style={{ fontFamily: SPOTA.font.ui, fontSize: 11.5, color: SPOTA.c.textSoft, marginTop: 4 }}>{s.l}</div>
        </button>
      ))}
    </div>
    <div style={{ padding: '0 16px' }}>
      <SectionTitle>Mi actividad</SectionTitle>
      {[
        { id: 'myExperiences', t: 'Mis experiencias', s: '12 reseñas · 3 por valorar', i: 'compass' },
        { id: 'collections', t: 'Mis colecciones', s: '4 listas guardadas', i: 'bookmark', params: { scope: 'Mías', activity: 'Todas' } },
        { id: 'plans', t: 'Mis planes', s: '2 planes activos', i: 'calendar' },
      ].map(o => (
        <button key={o.id} onClick={() => nav(o.id, o.params)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: 14, marginBottom: 6, background: SPOTA.c.surface, borderRadius: 12, border: `1px solid ${SPOTA.c.lineSoft}`, cursor: 'pointer', textAlign: 'left' }}>
          <Icon name={o.i} size={18} color={SPOTA.c.primary} />
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: SPOTA.font.ui, fontWeight: 600, fontSize: 14, color: SPOTA.c.text }}>{o.t}</div>
            <div style={{ fontFamily: SPOTA.font.ui, fontSize: 12, color: SPOTA.c.textSoft }}>{o.s}</div>
          </div>
          <Icon name="arrowRight" size={16} color={SPOTA.c.textSoft} />
        </button>
      ))}
      <SectionTitle>Tu rol en Spota</SectionTitle>
      <p style={{ margin: '-2px 4px 12px', fontFamily: SPOTA.font.ui, fontSize: 12.5, color: SPOTA.c.textSoft, lineHeight: 1.45 }}>
        Convertí tu conocimiento del barrio en experiencias para otros, y monetizá lo que mejor sabés.
      </p>
      {/* Card 1: Host — fondo color saturado */}
      <button onClick={() => nav('registerHost')} style={{
        width: '100%', padding: 16, marginBottom: 10, borderRadius: 18, cursor: 'pointer', textAlign: 'left', position: 'relative',
        background: `linear-gradient(135deg, ${SPOTA.c.secondary} 0%, #9D4A2D 100%)`,
        border: 'none', color: '#fff', overflow: 'hidden',
        boxShadow: '0 6px 18px rgba(184,92,56,0.28)',
      }}>
        {/* Decoración: círculos sutiles */}
        <div style={{ position: 'absolute', top: -30, right: -20, width: 120, height: 120, borderRadius: 999, background: 'rgba(255,255,255,0.08)' }} />
        <div style={{ position: 'absolute', top: 20, right: 30, width: 60, height: 60, borderRadius: 999, background: 'rgba(255,255,255,0.06)' }} />
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>
            <Icon name="compass" size={22} color="#fff" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: SPOTA.font.ui, fontSize: 11, fontWeight: 700, opacity: 0.85, textTransform: 'uppercase', letterSpacing: 0.6 }}>Hosts</div>
            <div style={{ fontFamily: SPOTA.font.ui, fontSize: 18, fontWeight: 700, letterSpacing: -0.3 }}>Ser anfitrión local</div>
          </div>
          <Icon name="arrowRight" size={18} color="#fff" />
        </div>
        <p style={{ position: 'relative', margin: '0 0 12px', fontFamily: SPOTA.font.ui, fontSize: 13, opacity: 0.92, lineHeight: 1.45, maxWidth: 260 }}>
          Diseñá experiencias en tu barrio y monetizá lo que mejor conocés.
        </p>
        <div style={{ position: 'relative', display: 'flex', gap: 12, fontFamily: SPOTA.font.ui, fontSize: 11.5, fontWeight: 600 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, opacity: 0.95 }}><Icon name="check" size={11} color="#fff" />Ganás plata</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, opacity: 0.95 }}><Icon name="check" size={11} color="#fff" />Tu agenda</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, opacity: 0.95 }}><Icon name="check" size={11} color="#fff" />Sin fee inicial</span>
        </div>
      </button>
      <p style={{ margin: '4px 4px 12px', fontFamily: SPOTA.font.ui, fontSize: 12, color: SPOTA.c.textSoft, textAlign: 'right' }}>
        ¿Ya sos host? <a onClick={() => nav('hostDashboard')} style={{ color: SPOTA.c.primary, fontWeight: 700, cursor: 'pointer' }}>Ir al dashboard →</a>
      </p>
      <SectionTitle>Cuenta</SectionTitle>
      {[
        { id: 'preferences', t: 'Preferencias', i: 'sparkles' },
        { id: 'credentials', t: 'Credenciales y privacidad', i: 'lock' },
        { id: 'uikit',       t: 'UI Kit · Design System',    i: 'palette' },
      ].map(o => (
        <button key={o.id} onClick={() => nav(o.id)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: 14, marginBottom: 6, background: SPOTA.c.surface, borderRadius: 12, border: `1px solid ${SPOTA.c.lineSoft}`, cursor: 'pointer', textAlign: 'left' }}>
          <Icon name={o.i} size={18} color={SPOTA.c.primary} />
          <span style={{ flex: 1, fontFamily: SPOTA.font.ui, fontWeight: 500, fontSize: 14, color: SPOTA.c.text }}>{o.t}</span>
          <Icon name="arrowRight" size={16} color={SPOTA.c.textSoft} />
        </button>
      ))}
      <button style={{ marginTop: 18, width: '100%', height: 44, border: 'none', background: 'transparent', fontFamily: SPOTA.font.ui, fontSize: 13.5, fontWeight: 600, color: SPOTA.c.textSoft, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }} onClick={() => nav('login')}>
        <Icon name="logout" size={16} color={SPOTA.c.textSoft} />Cerrar sesión
      </button>
    </div>
  </div>
);

// Pantalla de referencia del design system. Accesible desde Profile > Cuenta y desde el Sidebar.
// No es parte del flujo de producto; vive como referencia permanente de UI/UX.
const ScreenDesignSystem = ({ nav }) => {
  const swatches = [
    { c: SPOTA.c.primary,   name: 'Primario',   hex: '#2F6F5E', use: 'Verde petróleo · CTAs principales, navbar, badges verificados' },
    { c: SPOTA.c.secondary, name: 'Secundario', hex: '#B85C38', use: 'Terracota · tags Popular/Nuevo, CTAs secundarios, FAB' },
    { c: SPOTA.c.accent,    name: 'Acento',     hex: '#E9A23B', use: 'Arena dorada · estrellas, highlights, Fama Score' },
    { c: SPOTA.c.bg,        name: 'Fondo',      hex: '#FFF8ED', use: 'Crema · fondo general, cards, superficies' },
    { c: SPOTA.c.text,      name: 'Texto',      hex: '#2B2523', use: 'Marrón oscuro · títulos, cuerpo, labels' },
  ];

  const sampleIcons = ['compass', 'bookmark', 'calendar', 'user', 'star', 'heart', 'pinFill', 'sparkles', 'check', 'gift', 'briefcase', 'megaphone'];

  const Section = ({ title, hint, children }) => (
    <div style={{ marginBottom: 24 }}>
      <h3 style={{ margin: '0 0 4px', fontFamily: SPOTA.font.ui, fontSize: 11.5, fontWeight: 700, color: SPOTA.c.primary, textTransform: 'uppercase', letterSpacing: 0.6 }}>{title}</h3>
      {hint && <p style={{ margin: '0 0 12px', fontFamily: SPOTA.font.ui, fontSize: 12.5, color: SPOTA.c.textSoft, lineHeight: 1.45 }}>{hint}</p>}
      {!hint && <div style={{ height: 12 }} />}
      {children}
    </div>
  );

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: SPOTA.c.bg, overflow: 'auto' }}>
      <AppHeader title="UI Kit · Design System" leftIcon="arrowLeft" onLeft={() => nav('profile')} />
      <div style={{ flex: 1, padding: '12px 20px 32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
          <Icon name="sparkles" size={22} color={SPOTA.c.primary} />
          <h1 style={{ margin: 0, fontFamily: SPOTA.font.ui, fontSize: 22, fontWeight: 700, color: SPOTA.c.text, letterSpacing: -0.4 }}>
            UI Kit <span style={{ fontFamily: SPOTA.font.serif, fontStyle: 'italic', color: SPOTA.c.secondary, fontWeight: 400 }}>de Spota</span>
          </h1>
        </div>
        <p style={{ margin: '0 0 20px', fontFamily: SPOTA.font.ui, fontSize: 13.5, color: SPOTA.c.textSoft, lineHeight: 1.5 }}>
          Página de referencia del design system. Documenta paleta, tipografía y primitives. No es parte del flujo del producto.
        </p>

        {/* Paleta */}
        <Section title="Paleta · Cercanía Local" hint="Verde petróleo + terracota + arena dorada sobre crema. Identidad cálida, barrial, no SaaS.">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {swatches.map(s => (
              <div key={s.name} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 10, borderRadius: 12, background: SPOTA.c.surface, border: `1px solid ${SPOTA.c.lineSoft}` }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: s.c, border: s.c === SPOTA.c.bg ? `1px solid ${SPOTA.c.line}` : 'none', flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                    <span style={{ fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 13.5, color: SPOTA.c.text }}>{s.name}</span>
                    <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: 11.5, color: SPOTA.c.textMuted }}>{s.hex}</span>
                  </div>
                  <p style={{ margin: '2px 0 0', fontFamily: SPOTA.font.ui, fontSize: 11.5, color: SPOTA.c.textSoft, lineHeight: 1.4 }}>{s.use}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Tipografía */}
        <Section title="Tipografía" hint="DM Sans para UI y cuerpo. Fraunces serif italic para acentos cortos sobre titulares.">
          <div style={{ padding: 16, borderRadius: 14, background: SPOTA.c.surface, border: `1px solid ${SPOTA.c.lineSoft}` }}>
            <div style={{ fontFamily: SPOTA.font.ui, fontSize: 22, fontWeight: 700, color: SPOTA.c.text, letterSpacing: -0.4, lineHeight: 1.2 }}>
              ¿Qué hacemos <span style={{ fontFamily: SPOTA.font.serif, fontStyle: 'italic', fontWeight: 400, color: SPOTA.c.secondary }}>hoy</span>?
            </div>
            <p style={{ margin: '8px 0 0', fontFamily: SPOTA.font.ui, fontSize: 13, color: SPOTA.c.textSoft, lineHeight: 1.5 }}>
              Cuerpo de texto: párrafos, bullets, copy de UI. Pesos disponibles: 400, 500, 600, 700, 800.
            </p>
            <div style={{ height: 1, background: SPOTA.c.lineSoft, margin: '12px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'ui-monospace, monospace', fontSize: 11, color: SPOTA.c.textMuted }}>
              <span>DM Sans</span>
              <span>Fraunces (italic)</span>
            </div>
          </div>
        </Section>

        {/* Botones */}
        <Section title="Botones">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Btn variant="primary" full icon="compass">Acción primaria</Btn>
            <Btn variant="secondary" full icon="plus">Acción secundaria</Btn>
            <Btn variant="outline" full>Acción terciaria</Btn>
            <Btn variant="ghost" full>Ghost</Btn>
          </div>
        </Section>

        {/* Tags */}
        <Section title="Tags y badges" hint="Píldoras de estado, beneficios y verificación.">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            <Tag kind="secondary">Popular</Tag>
            <Tag kind="secondary">Nuevo</Tag>
            <Tag kind="secondary">Recomendado</Tag>
            <Tag kind="accent" icon="gift">−15% café</Tag>
            <Tag kind="softG" icon="check">Activo</Tag>
            <Tag kind="soft" icon="lock">Privada</Tag>
            <Tag kind="primary" icon="verify">Certificado</Tag>
            <ProofOfVisit />
          </div>
        </Section>

        {/* FamaScore */}
        <Section title="FamaScore" hint="Sistema de reputación. Variante classic en cards y detalle.">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: 14, borderRadius: 12, background: SPOTA.c.surface, border: `1px solid ${SPOTA.c.lineSoft}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: SPOTA.font.ui, fontSize: 12, color: SPOTA.c.textSoft }}>Tamaño base</span>
              <FamaScore score={4.8} count={312} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: SPOTA.font.ui, fontSize: 12, color: SPOTA.c.textSoft }}>Tamaño grande</span>
              <FamaScore score={4.8} count={312} size="lg" />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', borderRadius: 8, background: SPOTA.c.text }}>
              <span style={{ fontFamily: SPOTA.font.ui, fontSize: 12, color: 'rgba(255,255,255,0.85)' }}>Sobre fondo oscuro</span>
              <FamaScore score={4.8} count={312} onDark />
            </div>
          </div>
        </Section>

        {/* PlaceCard preview */}
        <Section title="PlaceCard" hint="Card de lugar usada en Discover y Detalle de colección.">
          <PlaceCard place={PLACES[0]} density="cozy" famaVariant="classic" saved={true} onSave={() => {}} onClick={() => {}} />
        </Section>

        {/* Avatar */}
        <Section title="Avatar" hint="Con y sin Fama Score. Bordeado dorado cuando hay puntaje.">
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 14, borderRadius: 12, background: SPOTA.c.surface, border: `1px solid ${SPOTA.c.lineSoft}` }}>
            <Avatar name="Sol Benítez" size={32} />
            <Avatar name="Tomás Romero" size={44} score="87" />
            <Avatar name="Federico Mella" size={56} score="92" badge />
            <Avatar name="Camila V." size={64} score="95" />
          </div>
        </Section>

        {/* Iconos */}
        <Section title="Iconografía" hint="SVG lineales 24px, stroke 1.75. Tinte primario o textSoft según contexto.">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 8, padding: 14, borderRadius: 12, background: SPOTA.c.surface, border: `1px solid ${SPOTA.c.lineSoft}` }}>
            {sampleIcons.map(n => (
              <div key={n} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <Icon name={n} size={22} color={SPOTA.c.primary} />
                <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: 9.5, color: SPOTA.c.textMuted, textAlign: 'center' }}>{n}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* Decisiones */}
        <Section title="Decisiones de diseño" hint="Decisiones D1-D18. El detalle vive en CLAUDE.md y entrega/justificacion-diseno.md.">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { d: 'D1', t: 'Niveles del Fama: Nuevo · Conocido · Habitué · Referente · Maestro' },
              { d: 'D2', t: 'Iconografía SVG en Preferences y Nueva colección, no emojis nativos' },
              { d: 'D3', t: 'Asimetría Host (en perfil) vs Negocio (entry separado)' },
              { d: 'D4', t: 'Layout full-bleed en auth (Register / Recover / Welcome desktop)' },
              { d: 'D5', t: 'Mapa funcional en Discover con filtros, zoom y "Buscar en esta zona"' },
              { d: 'D6', t: 'Arquitectura técnica: HTML autocontenido con React + Babel CDN' },
              { d: 'D7', t: 'IDs de routing alineados al array SCREENS, sin fallback a Splash' },
              { d: 'D8', t: 'Sub-máquina del CTA en detalle de lugar (Proof of Visit)' },
              { d: 'D9', t: 'Wizard publicar de 3 pasos, validación implícita' },
              { d: 'D10', t: 'Sub-máquina del host en plan grupal (todo o nada)' },
              { d: 'D11', t: 'Prototipo desktop separado, no responsive del mobile' },
              { d: 'D12', t: 'SearchResults desktop: lista + mapa simultáneos, no toggle' },
              { d: 'D13', t: '"Perfil" fuera del navbar desktop, sólo desde el avatar' },
              { d: 'D14', t: 'Preferences single-page con flag onboarding ↔ edit (params.mode)' },
              { d: 'D15', t: 'Welcome y Login mobile unificados (foto integrada al login)' },
              { d: 'D16', t: 'Desktop login con layout split (foto+hero 55% / form 45%)' },
              { d: 'D17', t: 'Back contextual de bizRegister según params.from (login/welcome/home)' },
              { d: 'D18', t: 'Concierge-first en Discover · feed solo en searchResults · IntentChips + AffineRow' },
            ].map(o => (
              <div key={o.d} style={{ display: 'flex', gap: 10, padding: 10, borderRadius: 10, background: SPOTA.c.surface, border: `1px solid ${SPOTA.c.lineSoft}` }}>
                <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: 11, fontWeight: 700, color: SPOTA.c.secondary, flexShrink: 0, width: 28 }}>{o.d}</span>
                <span style={{ fontFamily: SPOTA.font.ui, fontSize: 12.5, color: SPOTA.c.text, lineHeight: 1.4 }}>{o.t}</span>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
};

// CU-004-002 §3.4 — Pantalla previa de filtros obligatorios para explorar colecciones.
// Dos selectores: Ámbito y Actividad. Botón "Ver colecciones" deshabilitado hasta tener
// ambos seleccionados. Si llega con scope+activity en params, los pre-aplica.
const ScreenCollectionsFilter = ({ nav, params }) => {
  const [scope, setScope] = React.useState((params && params.scope) || null);
  const [activity, setActivity] = React.useState((params && params.activity) || null);
  const ready = scope && activity;
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: SPOTA.c.bg }}>
      <div style={{ padding: '14px 20px 8px' }}>
        <h1 style={{ margin: 0, fontFamily: SPOTA.font.ui, fontSize: 22, fontWeight: 700, color: SPOTA.c.text, letterSpacing: -0.4 }}>
          Explorar <span style={{ fontFamily: SPOTA.font.serif, fontStyle: 'italic', color: SPOTA.c.secondary, fontWeight: 400 }}>colecciones</span>
        </h1>
        <p style={{ margin: '6px 0 0', fontFamily: SPOTA.font.ui, fontSize: 13.5, color: SPOTA.c.textSoft, lineHeight: 1.45 }}>
          Elegí el ámbito y la actividad para ver las colecciones que te interesan.
        </p>
      </div>
      <div style={{ flex: 1, overflow: 'auto', padding: '12px 20px 24px' }}>
        <div style={{ marginBottom: 18 }}>
          <h3 style={{ margin: '0 0 8px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 14.5, color: SPOTA.c.text }}>Ámbito</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {SCOPE_OPTIONS.map(o => (
              <button key={o} onClick={() => setScope(o)} style={{
                padding: '12px 14px', borderRadius: 12, cursor: 'pointer', textAlign: 'left',
                background: scope === o ? SPOTA.c.primary : SPOTA.c.surface,
                color: scope === o ? '#fff' : SPOTA.c.text,
                border: `1.5px solid ${scope === o ? SPOTA.c.primary : SPOTA.c.line}`,
                fontFamily: SPOTA.font.ui, fontWeight: 600, fontSize: 13.5,
              }}>{o}</button>
            ))}
          </div>
        </div>
        <div>
          <h3 style={{ margin: '0 0 8px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 14.5, color: SPOTA.c.text }}>Actividad</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {ACTIVITY_OPTIONS.map(o => (
              <Chip key={o} active={activity === o} onClick={() => setActivity(o)}>{o}</Chip>
            ))}
          </div>
        </div>
        <div style={{ marginTop: 28 }}>
          <Btn variant="primary" size="lg" full disabled={!ready}
            onClick={() => nav('collections', { scope, activity })}>
            Ver colecciones
          </Btn>
          {!ready && (
            <p style={{ margin: '10px 0 0', fontFamily: SPOTA.font.ui, fontSize: 12, color: SPOTA.c.textMuted, textAlign: 'center' }}>
              Elegí los dos selectores para continuar.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { ScreenRecover, ScreenResetPassword, ScreenSearchResults, ScreenCollectionDetail, ScreenProfile, ScreenDesignSystem, ScreenCollectionsFilter });

// Aliases para que el SCREENS map encuentre todos los componentes
window.ScreenHome = window.ScreenDiscover;

// ===== Mapa de pantallas =====
const SCREENS = [
  { id: 'register',         cu: 'CU-01',   title: 'Crear cuenta',              group: 'Onboarding',     comp: 'ScreenRegister' },
  { id: 'login',            cu: 'CU-02',   title: 'Iniciar sesión',            group: 'Onboarding',     comp: 'ScreenLogin' },
  { id: 'verifyCode',       cu: 'CU-02',   title: 'Verificación por código',   group: 'Onboarding',     comp: 'ScreenVerifyCode' },
  { id: 'recover',          cu: 'CU-03',   title: 'Recuperar contraseña',      group: 'Onboarding',     comp: 'ScreenRecover' },
  { id: 'resetPassword',    cu: 'CU-03',   title: 'Nueva contraseña',          group: 'Onboarding',     comp: 'ScreenResetPassword' },
  { id: 'preferences',      cu: 'CU-04',   title: 'Preferencias iniciales',    group: 'Onboarding',     comp: 'ScreenPreferences' },
  { id: 'credentials',      cu: 'CU-05',   title: 'Credenciales y privacidad', group: 'Onboarding',     comp: 'ScreenCredentials' },
  { id: 'home',             cu: 'CU-06',   title: 'Descubrir (home)',          group: 'Descubrimiento', comp: 'ScreenDiscover' },
  { id: 'placeDetail',      cu: 'CU-06',   title: 'Detalle de lugar',          group: 'Descubrimiento', comp: 'ScreenPlaceDetail' },
  { id: 'searchResults',    cu: 'CU-06',   title: 'Resultados de búsqueda',    group: 'Descubrimiento', comp: 'ScreenSearchResults' },
  { id: 'publish',          cu: 'CU-07',   title: 'Publicar experiencia',      group: 'Experiencias',   comp: 'ScreenPublish' },
  // CU-08 (CU-003-002) ⚪ Absorbido en CU-003-001: la pantalla `rate` queda retirada del prototipo.
  { id: 'myExperiences',    cu: 'CU-09',   title: 'Mis experiencias',          group: 'Experiencias',   comp: 'ScreenMyExperiences' },
  { id: 'collectionsFilter',cu: 'CU-11',   title: 'Filtros de colecciones',    group: 'Colecciones',    comp: 'ScreenCollectionsFilter' },
  { id: 'collections',      cu: 'CU-10',   title: 'Mis colecciones',           group: 'Colecciones',    comp: 'ScreenCollections' },
  { id: 'collectionDetail', cu: 'CU-11',   title: 'Detalle de colección',      group: 'Colecciones',    comp: 'ScreenCollectionDetail' },
  { id: 'createCollection', cu: 'CU-10',   title: 'Crear colección',           group: 'Colecciones',    comp: 'ScreenCreateCollection' },
  { id: 'plans',            cu: 'CU-12',   title: 'Mis planes',                group: 'Planificación',  comp: 'ScreenPlans' },
  { id: 'createPlan',       cu: 'CU-12',   title: 'Crear plan grupal',         group: 'Planificación',  comp: 'ScreenCreatePlan' },
  { id: 'planVote',         cu: 'CU-13',   title: 'Votar plan',                group: 'Planificación',  comp: 'ScreenPlanVote' },
  { id: 'planClose',        cu: 'CU-14',   title: 'Cerrar plan',               group: 'Planificación',  comp: 'ScreenPlanClose' },
  { id: 'hostMarketplace',  cu: 'CU-16',   title: 'Marketplace de hosts',      group: 'Hosts',          comp: 'ScreenHostMarketplace' },
  { id: 'createOffer',      cu: 'CU-15',   title: 'Publicar oferta de viaje',  group: 'Hosts',          comp: 'ScreenCreateOffer' },
  { id: 'hireHost',         cu: 'CU-16',   title: 'Contratar host',            group: 'Hosts',          comp: 'ScreenHireHost' },
  { id: 'registerHost',     cu: 'CU-17',   title: 'Ser host en Spota',         group: 'Hosts',          comp: 'ScreenRegisterHost' },
  { id: 'hostDashboard',    cu: 'CU-18',   title: 'Dashboard de host',         group: 'Hosts',          comp: 'ScreenHostDashboard' },
  { id: 'bizRegister',      cu: 'CU-20',   title: 'Registrar negocio',         group: 'Negocios',       comp: 'ScreenRegisterBiz' },
  { id: 'bizHome',          cu: '—',       title: 'Panel de negocios',         group: 'Negocios',       comp: 'ScreenBizHome' },
  { id: 'claimPlace',       cu: 'CU-19',   title: 'Reclamar mi lugar',         group: 'Negocios',       comp: 'ScreenClaimPlace' },
  { id: 'bizBenefits',      cu: 'CU-21',   title: 'Gestionar beneficios',      group: 'Negocios',       comp: 'ScreenBizBenefits' },
  { id: 'bizCampaign',      cu: 'CU-22',   title: 'Campaña publicitaria',      group: 'Negocios',       comp: 'ScreenBizCampaign' },
  { id: 'bizInsights',      cu: 'CU-23',   title: 'Insights: filtros',         group: 'Negocios',       comp: 'ScreenBizInsights' },
  { id: 'bizInsightsResult',cu: 'CU-23',   title: 'Insights: resultado',       group: 'Negocios',       comp: 'ScreenBizInsightsResult' },
  // bizSubscribe es auxiliar de CU-23 (sub-flujo de monetización Tier para Insights). El brief sólo lista CU-01..CU-23 — no existe CU-24.
  { id: 'bizSubscribe',     cu: 'CU-23',   title: 'Suscribirse a Tier',        group: 'Negocios',       comp: 'ScreenBizSubscribe' },
  { id: 'profile',          cu: '—',       title: 'Perfil',                    group: 'Otros',          comp: 'ScreenProfile' },
  { id: 'uikit',            cu: '—',       title: 'UI Kit · Design System',    group: 'Referencia',     comp: 'ScreenDesignSystem' },
];

const GROUP_ORDER = ['Onboarding', 'Descubrimiento', 'Experiencias', 'Colecciones', 'Planificación', 'Hosts', 'Negocios', 'Otros', 'Referencia'];
const GROUP_ICONS = {
  'Onboarding':     'user',
  'Descubrimiento': 'sparkles',
  'Experiencias':   'compass',
  'Colecciones':    'bookmark',
  'Planificación':  'calendar',
  'Hosts':          'briefcase',
  'Negocios':       'megaphone',
  'Otros':          'more',
  'Referencia':     'sparkles',
};

// ===== Tab bar con FAB central (CU-07 entry) =====
const COLLECTIONS_TAB_FAMILY = new Set(['collections', 'collectionsFilter', 'collectionDetail', 'createCollection']);
const TabBar = ({ current, nav }) => {
  const items = [
    { id: 'home',          icon: 'compass',  label: 'Descubrir' },
    { id: 'collections',   icon: 'bookmark', label: 'Colecciones', target: 'collectionsFilter' },
    { id: '__fab',         icon: 'plus',     label: 'Publicar' },
    { id: 'plans',         icon: 'calendar', label: 'Planes' },
    { id: 'profile',       icon: 'user',     label: 'Perfil' },
  ];
  return (
    <div style={{
      position: 'absolute', left: 0, right: 0, bottom: 0,
      background: SPOTA.c.surface,
      borderTop: `1px solid ${SPOTA.c.lineSoft}`,
      paddingBottom: 18, paddingTop: 6,
      display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', alignItems: 'center',
      zIndex: 10,
    }}>
      {items.map(it => {
        if (it.id === '__fab') {
          return (
            <div key="fab-slot" style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <button onClick={() => nav('publish')} style={{
                width: 56, height: 56, borderRadius: 999, border: 'none',
                background: `linear-gradient(135deg, ${SPOTA.c.secondary}, ${SPOTA.c.secondaryDark})`,
                boxShadow: '0 8px 18px rgba(184, 92, 56, 0.45)',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginTop: -22,
              }}>
                <Icon name="plus" size={26} color="#fff" strokeWidth={2.5} />
              </button>
            </div>
          );
        }
        const active = it.id === 'collections'
          ? COLLECTIONS_TAB_FAMILY.has(current)
          : current === it.id;
        return (
          <button key={it.id} onClick={() => nav(it.target || it.id)} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
            border: 'none', background: 'transparent', cursor: 'pointer',
            padding: '6px 4px',
            color: active ? SPOTA.c.primary : SPOTA.c.textMuted,
          }}>
            <Icon name={it.icon} size={22} color={active ? SPOTA.c.primary : SPOTA.c.textMuted} strokeWidth={active ? 2.4 : 2} />
            <span style={{ fontFamily: SPOTA.font.ui, fontSize: 10.5, fontWeight: active ? 700 : 500 }}>{it.label}</span>
          </button>
        );
      })}
    </div>
  );
};

// ===== Sidebar con índice de pantallas =====
const SCREENS_WITH_TAB = new Set(['home', 'collections', 'collectionsFilter', 'plans', 'profile']);

const Sidebar = ({ current, nav, onClose }) => {
  const grouped = useMemo(() => {
    const g = {};
    GROUP_ORDER.forEach(k => g[k] = []);
    SCREENS.forEach(s => { (g[s.group] = g[s.group] || []).push(s); });
    return g;
  }, []);
  return (
    <aside style={{
      width: 280, height: '100vh', position: 'sticky', top: 0,
      background: 'rgba(20, 17, 15, 0.96)',
      borderRight: '1px solid rgba(245, 237, 224, 0.08)',
      backdropFilter: 'blur(12px)',
      display: 'flex', flexDirection: 'column',
      overflow: 'hidden', flexShrink: 0,
    }}>
      <div style={{ padding: '22px 22px 14px', borderBottom: '1px solid rgba(245, 237, 224, 0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: SPOTA.c.secondary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="pinFill" size={16} color="#fff" />
            </div>
            <div>
              <div style={{ fontFamily: SPOTA.font.ui, fontWeight: 800, fontSize: 16, letterSpacing: -0.3 }}>Spota</div>
              <div style={{ fontFamily: SPOTA.font.ui, fontSize: 10.5, color: 'rgba(245, 237, 224, 0.5)', letterSpacing: 0.6, textTransform: 'uppercase' }}>Prototipo · v1</div>
            </div>
          </div>
          {onClose && (
            <button onClick={onClose} style={{ width: 28, height: 28, borderRadius: 8, border: 'none', background: 'rgba(255,255,255,0.06)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f5ede0' }}>
              <Icon name="close" size={14} color="#f5ede0" />
            </button>
          )}
        </div>
        <p style={{ margin: '14px 0 0', fontFamily: SPOTA.font.ui, fontSize: 12, color: 'rgba(245, 237, 224, 0.55)', lineHeight: 1.5 }}>
          23 casos de uso · iOS · español rioplatense
        </p>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 12px 24px' }}>
        {GROUP_ORDER.map(group => (
          <div key={group} style={{ marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px 6px' }}>
              <Icon name={GROUP_ICONS[group]} size={12} color="rgba(245, 237, 224, 0.45)" />
              <span style={{ fontFamily: SPOTA.font.ui, fontSize: 10.5, fontWeight: 700, color: 'rgba(245, 237, 224, 0.45)', textTransform: 'uppercase', letterSpacing: 0.8 }}>{group}</span>
            </div>
            {(grouped[group] || []).map(s => {
              const active = current === s.id;
              return (
                <button key={s.id} onClick={() => nav(s.id)} style={{
                  display: 'flex', alignItems: 'center', gap: 10, width: '100%',
                  padding: '8px 10px', border: 'none',
                  background: active ? 'rgba(184, 92, 56, 0.18)' : 'transparent',
                  borderRadius: 8, cursor: 'pointer', textAlign: 'left',
                  marginBottom: 1,
                }}>
                  <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: 10, color: active ? SPOTA.c.secondaryLight : 'rgba(245, 237, 224, 0.4)', flexShrink: 0, width: 38 }}>{s.cu}</span>
                  <span style={{ fontFamily: SPOTA.font.ui, fontSize: 13, color: active ? '#f5ede0' : 'rgba(245, 237, 224, 0.75)', fontWeight: active ? 600 : 500, flex: 1, lineHeight: 1.3 }}>{s.title}</span>
                  {active && <span style={{ width: 6, height: 6, borderRadius: 999, background: SPOTA.c.secondary }} />}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </aside>
  );
};

// ===== Top toolbar =====
const TopBar = ({ screen, onToggleSidebar, sidebarOpen, onPrev, onNext }) => {
  const idx = SCREENS.findIndex(s => s.id === screen?.id);
  return (
    <header style={{
      height: 56, padding: '0 20px',
      display: 'flex', alignItems: 'center', gap: 14,
      background: 'rgba(20, 17, 15, 0.6)',
      borderBottom: '1px solid rgba(245, 237, 224, 0.06)',
      flexShrink: 0, backdropFilter: 'blur(8px)',
    }}>
      <button onClick={onToggleSidebar} style={{ width: 36, height: 36, borderRadius: 10, border: 'none', background: 'rgba(245, 237, 224, 0.06)', cursor: 'pointer', color: '#f5ede0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon name={sidebarOpen ? 'close' : 'menu'} size={16} color="#f5ede0" />
      </button>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: 11, padding: '3px 8px', borderRadius: 999, background: 'rgba(184, 92, 56, 0.2)', color: SPOTA.c.secondaryLight, fontWeight: 700, letterSpacing: 0.4 }}>
          {screen?.cu || '—'}
        </span>
        <span style={{ fontFamily: SPOTA.font.ui, fontSize: 14, fontWeight: 600, color: '#f5ede0' }}>
          {screen?.title || ''}
        </span>
        <span style={{ fontFamily: SPOTA.font.ui, fontSize: 11.5, color: 'rgba(245, 237, 224, 0.4)', marginLeft: 4 }}>
          {idx + 1} / {SCREENS.length}
        </span>
      </div>
      <button onClick={onPrev} style={{ width: 36, height: 36, borderRadius: 10, border: 'none', background: 'rgba(245, 237, 224, 0.06)', cursor: 'pointer', color: '#f5ede0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon name="arrowLeft" size={16} color="#f5ede0" />
      </button>
      <button onClick={onNext} style={{ width: 36, height: 36, borderRadius: 10, border: 'none', background: 'rgba(245, 237, 224, 0.06)', cursor: 'pointer', color: '#f5ede0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon name="arrowRight" size={16} color="#f5ede0" />
      </button>
    </header>
  );
};

// ===== App root =====
const App = () => {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [current, setCurrent] = useState(() => {
    const hash = window.location.hash.replace('#', '');
    return SCREENS.find(s => s.id === hash) ? hash : 'login';
  });
  const [navParams, setNavParams] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    window.location.hash = current;
  }, [current]);

  useEffect(() => {
    const onPop = () => {
      const hash = window.location.hash.replace('#', '');
      if (SCREENS.find(s => s.id === hash)) setCurrent(hash);
    };
    window.addEventListener('hashchange', onPop);
    return () => window.removeEventListener('hashchange', onPop);
  }, []);

  // Make tweaks globally readable by screens
  useEffect(() => { window.__SPOTA_TWEAKS = tweaks; }, [tweaks]);

  const nav = (id, params) => { setNavParams(params || {}); setCurrent(id); };

  const screen = SCREENS.find(s => s.id === current) || SCREENS[0];
  const ScreenComp = window[screen.comp];
  const showTab = SCREENS_WITH_TAB.has(screen.id);

  const idx = SCREENS.findIndex(s => s.id === current);
  const onPrev = () => nav(SCREENS[(idx - 1 + SCREENS.length) % SCREENS.length].id);
  const onNext = () => nav(SCREENS[(idx + 1) % SCREENS.length].id);

  const showSidebar = tweaks.showSidebar && sidebarOpen;

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {showSidebar && <Sidebar current={current} nav={nav} onClose={() => setSidebarOpen(false)} />}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <TopBar screen={screen} onToggleSidebar={() => setSidebarOpen(o => !o)} sidebarOpen={sidebarOpen && tweaks.showSidebar} onPrev={onPrev} onNext={onNext} />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px 16px 32px', overflow: 'auto' }}>
          <IOSDevice width={390} height={844}>
            <div style={{ height: 54, flexShrink: 0 }} />
            {ScreenComp ? (
              <ScreenComp nav={nav} tweaks={tweaks} params={navParams} />
            ) : (
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, textAlign: 'center', fontFamily: SPOTA.font.ui, color: SPOTA.c.textSoft }}>
                Pantalla no encontrada: {screen.comp}
              </div>
            )}
            {showTab && <TabBar current={current} nav={nav} />}
          </IOSDevice>
        </div>
      </main>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Densidad de cards" hint="Cuánto aire dejan las tarjetas en Descubrir">
          <TweakRadio
            value={tweaks.density}
            onChange={(v) => setTweak('density', v)}
            options={[
              { value: 'compact', label: 'Compacta' },
              { value: 'cozy',    label: 'Cómoda' },
              { value: 'roomy',   label: 'Espaciosa' },
            ]}
          />
        </TweakSection>
        <TweakSection label="Visualización del Fama Score" hint="Cómo se muestra el score en cards y perfiles">
          <TweakRadio
            value={tweaks.famaVariant}
            onChange={(v) => setTweak('famaVariant', v)}
            options={[
              { value: 'classic', label: 'Estrella + número' },
              { value: 'orbit',   label: 'Anillo radial' },
              { value: 'badge',   label: 'Pill compacto' },
            ]}
          />
        </TweakSection>
        <TweakSection label="Navegación del prototipo">
          <TweakToggle
            label="Mostrar sidebar de pantallas"
            value={tweaks.showSidebar}
            onChange={(v) => setTweak('showSidebar', v)}
          />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('app')).render(<App />);
