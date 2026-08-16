// ========================================================================
// 06-screens-discover.jsx
// ========================================================================
// MapView desktop — SVG estilizado tipo plano de Palermo, sin "Buscar en esta zona"
// (en desktop el mapa siempre está visible).
const MapView = ({ selected, onSelect }) => {
  const pins = [
    { id: 'p1', x: 28, y: 38 }, { id: 'p2', x: 55, y: 22 }, { id: 'p3', x: 72, y: 48 },
    { id: 'p4', x: 20, y: 62 }, { id: 'p6', x: 62, y: 72 }, { id: 'p7', x: 45, y: 45 },
    { id: 'p8', x: 82, y: 32 }, { id: 'p9', x: 36, y: 80 },
  ];
  const [filter, setFilter] = React.useState('all');
  const place = PLACES.find(p => p.id === selected);

  return (
    <div style={{ position: 'relative', height: '100%', borderRadius: SPOTA.radius.lg, overflow: 'hidden', border: `1px solid ${SPOTA.c.lineSoft}` }}>
      <div style={{ position: 'absolute', inset: 0, background: '#EDE7DA' }}>
        <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }} preserveAspectRatio="none" viewBox="0 0 100 100">
          <ellipse cx="78" cy="18" rx="28" ry="14" fill="#CFE3C0" opacity="0.9" />
          <text x="78" y="20" textAnchor="middle" fontFamily="DM Sans, sans-serif" fontSize="2.4" fontWeight="600" fill="#5C7A4F" style={{ textTransform: 'uppercase', letterSpacing: '0.3px' }}>Bosques</text>
          <ellipse cx="12" cy="78" rx="14" ry="9" fill="#CFE3C0" opacity="0.85" />
          <text x="12" y="80" textAnchor="middle" fontFamily="DM Sans, sans-serif" fontSize="2" fontWeight="600" fill="#5C7A4F">Plaza</text>
          <path d="M -2 92 Q 30 88 60 90 T 102 86 L 102 102 L -2 102 Z" fill="#B5D6E3" opacity="0.7" />
          <path d="M 0 50 L 100 46" stroke="#FFFFFF" strokeWidth="2.4" />
          <path d="M 50 0 L 54 100" stroke="#FFFFFF" strokeWidth="2.4" />
          <path d="M 0 70 Q 40 65 100 68" stroke="#FFFFFF" strokeWidth="2.2" />
          {[15, 30, 60, 85].map(y => <line key={'h'+y} x1="0" y1={y} x2="100" y2={y + 2} stroke="#FFFFFF" strokeWidth="0.8" opacity="0.7" />)}
          {[20, 35, 70, 88].map(x => <line key={'v'+x} x1={x} y1="0" x2={x + 2} y2="100" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.7" />)}
          {[...Array(6)].map((_, i) => (
            [...Array(5)].map((__, j) => (
              <rect key={`b${i}${j}`} x={i * 17 + 2} y={j * 18 + 5} width="13" height="14" fill="#F5EDE0" opacity="0.5" rx="0.6" />
            ))
          ))}
          <text x="30" y="15" textAnchor="middle" fontFamily="DM Sans, sans-serif" fontSize="2.6" fontWeight="700" fill="#8A7960" opacity="0.8" style={{ letterSpacing: '1px', textTransform: 'uppercase' }}>Palermo</text>
          <text x="80" y="92" textAnchor="middle" fontFamily="DM Sans, sans-serif" fontSize="2.4" fontWeight="700" fill="#8A7960" opacity="0.7" style={{ letterSpacing: '1px', textTransform: 'uppercase' }}>Villa Crespo</text>
        </svg>
        {/* Pin "tu ubicación" */}
        <div style={{ position: 'absolute', left: '48%', top: '52%', transform: 'translate(-50%, -50%)' }}>
          <div style={{ position: 'absolute', inset: -16, borderRadius: 999, background: SPOTA.c.primary, opacity: 0.18, animation: 'pulse 2s ease-out infinite' }} />
          <div style={{ width: 18, height: 18, borderRadius: 999, background: SPOTA.c.primary, border: '3px solid #fff', boxShadow: '0 2px 6px rgba(0,0,0,0.2)', position: 'relative' }} />
        </div>
        {/* Pins lugares */}
        {pins.map(p => {
          const pl = PLACES.find(x => x.id === p.id);
          if (!pl) return null;
          const isSel = p.id === selected;
          return (
            <button key={p.id} onClick={() => onSelect(p.id)} style={{
              position: 'absolute', left: p.x + '%', top: p.y + '%',
              transform: `translate(-50%, -100%) scale(${isSel ? 1.15 : 1})`,
              border: 'none', background: 'transparent', cursor: 'pointer',
              transition: 'transform 200ms', zIndex: isSel ? 10 : 1, padding: 0,
            }}>
              <div style={{
                background: isSel ? SPOTA.c.secondary : SPOTA.c.primary,
                color: '#fff', borderRadius: 999, padding: '5px 9px',
                fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 12,
                display: 'inline-flex', alignItems: 'center', gap: 4,
                boxShadow: isSel ? '0 6px 16px rgba(184,92,56,0.4)' : '0 3px 10px rgba(47,111,94,0.3)',
                border: '2px solid #fff',
              }}>
                <Icon name="star" size={11} color={SPOTA.c.accent} /> {pl.score}
              </div>
              <div style={{
                width: 0, height: 0, margin: '0 auto',
                borderLeft: '5px solid transparent', borderRight: '5px solid transparent',
                borderTop: `7px solid ${isSel ? SPOTA.c.secondary : SPOTA.c.primary}`,
              }} />
            </button>
          );
        })}
      </div>

      {/* Filtros flotantes */}
      <div style={{ position: 'absolute', top: 14, left: 14, right: 14, display: 'flex', gap: 6, overflowX: 'auto', zIndex: 5 }}>
        {[
          { id: 'all', t: 'Todos' },
          { id: 'open', t: 'Abre ahora' },
          { id: 'visited', t: 'Visitados' },
          { id: 'saved', t: 'Guardados' },
        ].map(f => {
          const on = filter === f.id;
          return (
            <button key={f.id} onClick={() => setFilter(f.id)} style={{
              padding: '7px 12px', borderRadius: 999, cursor: 'pointer', whiteSpace: 'nowrap',
              border: 'none', background: on ? SPOTA.c.text : SPOTA.c.surface,
              color: on ? '#fff' : SPOTA.c.text,
              fontFamily: SPOTA.font.ui, fontSize: 12.5, fontWeight: 600,
              boxShadow: '0 2px 8px rgba(43,37,35,0.12)',
            }}>{f.t}</button>
          );
        })}
      </div>

      {/* Card del lugar seleccionado, abajo del mapa */}
      {place && (
        <div style={{
          position: 'absolute', bottom: 14, left: 14, right: 14,
          background: SPOTA.c.surface, borderRadius: 14, padding: 12,
          display: 'flex', gap: 12, alignItems: 'center', boxShadow: SPOTA.shadow.pop, zIndex: 6,
        }}>
          <img src={photo(place.img, 200, 200)} style={{ width: 64, height: 64, borderRadius: 10, objectFit: 'cover', flexShrink: 0 }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
              <h3 style={{ margin: 0, fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 15, color: SPOTA.c.text }}>{place.name}</h3>
              <span style={{ fontFamily: SPOTA.font.ui, fontSize: 12.5, color: SPOTA.c.textSoft }}>{place.price}</span>
            </div>
            <p style={{ margin: '2px 0 4px', fontFamily: SPOTA.font.ui, fontSize: 12.5, color: SPOTA.c.textSoft }}>{place.cat} · {place.hood} · a 320m</p>
            <FamaScore score={place.score} count={place.reviews} />
          </div>
        </div>
      )}
    </div>
  );
};

// Discover desktop — concierge-first.
// El home no muestra recomendaciones por default. El input es el bloque visual
// dominante; los atajos por categoría y los ejemplos clicables son apoyos
// discretos. Las recomendaciones aparecen recién en SearchResults.
const ScreenDiscover = ({ nav }) => {
  const [query, setQuery] = React.useState('');

  const goSearch = (q) => {
    const text = (q || '').trim();
    if (!text) return;
    nav('searchResults', { query: text });
  };

  // Atajos: cada chip dispara una búsqueda con su nombre como query.
  const SHORTCUTS = [
    { q: 'cafés',      label: 'Cafés',      icon: 'coffee'   },
    { q: 'comida',     label: 'Comida',     icon: 'utensils' },
    { q: 'bares',      label: 'Bares',      icon: 'bar'      },
    { q: 'cultura',    label: 'Cultura',    icon: 'palette'  },
    { q: 'aire libre', label: 'Aire libre', icon: 'leaf'     },
  ];

  const EXAMPLES = [
    'café para trabajar con buen wifi',
    'algo tranquilo en Palermo con una amiga',
    'cena romántica el sábado',
  ];

  // Placeholder rotativo para reforzar la idea del concierge.
  const [phIdx, setPhIdx] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setPhIdx(i => (i + 1) % SEARCH_PLACEHOLDERS.length), 3200);
    return () => clearInterval(t);
  }, []);
  const ph = SEARCH_PLACEHOLDERS[phIdx];

  return (
    <section style={{ paddingTop: 32 }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        {/* Saludo */}
        <div style={{ marginBottom: 22 }}>
          <p style={{ margin: 0, fontFamily: SPOTA.font.ui, fontSize: 14, color: SPOTA.c.textSoft }}>Hola Sol 👋</p>
          <h1 style={{ margin: '4px 0 0', fontFamily: SPOTA.font.ui, fontSize: 30, fontWeight: 700, color: SPOTA.c.text, letterSpacing: -0.5, lineHeight: 1.2 }}>
            ¿Qué hacemos <span style={{ fontFamily: SPOTA.font.serif, fontStyle: 'italic', color: SPOTA.c.secondary, fontWeight: 400 }}>hoy</span>?
          </h1>
        </div>

        {/* Input HERO */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 14,
          padding: '0 22px', height: 72,
          background: '#FFFFFF', borderRadius: 999,
          border: `1.5px solid ${SPOTA.c.primary}`,
          boxShadow: '0 10px 28px rgba(47, 111, 94, 0.14), 0 1px 3px rgba(47, 111, 94, 0.08)',
          marginBottom: 22,
        }}>
          <Icon name="search" size={22} color={SPOTA.c.primary} strokeWidth={2.2} />
          <div style={{ flex: 1, position: 'relative', height: 26, display: 'flex', alignItems: 'center' }}>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value.slice(0, 200))}
              onKeyDown={(e) => { if (e.key === 'Enter') goSearch(query); }}
              maxLength={200}
              placeholder=""
              style={{
                position: 'absolute', inset: 0, width: '100%',
                border: 'none', outline: 'none', background: 'transparent',
                fontFamily: SPOTA.font.ui, fontSize: 17, color: SPOTA.c.text,
              }}
            />
            {!query && (
              <span style={{
                pointerEvents: 'none',
                fontFamily: SPOTA.font.ui, fontSize: 17, color: SPOTA.c.textSoft,
              }}>
                {ph}
              </span>
            )}
          </div>
          {/* P3-32: contador 200 chars al lado del CTA, color de alerta a partir de 180. */}
          {query && (
            <span style={{ fontFamily: SPOTA.font.ui, fontSize: 12, color: query.length >= 180 ? SPOTA.c.secondary : SPOTA.c.textSoft, fontVariantNumeric: 'tabular-nums' }}>
              {query.length}/200
            </span>
          )}
          {query && (
            <button onClick={() => goSearch(query)} style={{
              border: 'none', cursor: 'pointer',
              background: SPOTA.c.primary, color: '#fff',
              fontFamily: SPOTA.font.ui, fontSize: 13, fontWeight: 600,
              padding: '10px 18px', borderRadius: 999,
              display: 'inline-flex', alignItems: 'center', gap: 6,
            }}>
              Buscar <Icon name="arrowRight" size={14} color="#fff" />
            </button>
          )}
        </div>

        {/* Atajos discretos */}
        <div style={{ marginBottom: 28 }}>
          <p style={{ margin: '0 0 10px', fontFamily: SPOTA.font.serif, fontStyle: 'italic', fontSize: 13, color: SPOTA.c.textSoft }}>
            o elegí un atajo
          </p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {SHORTCUTS.map(s => (
              <button key={s.q} onClick={() => goSearch(s.q)} style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                padding: '8px 14px', borderRadius: 999,
                background: 'transparent', border: `1px solid ${SPOTA.c.lineSoft}`,
                cursor: 'pointer', fontFamily: SPOTA.font.ui, fontSize: 13, fontWeight: 500,
                color: SPOTA.c.textSoft, transition: 'background 120ms, border-color 120ms, color 120ms',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = SPOTA.c.surface; e.currentTarget.style.borderColor = SPOTA.c.line; e.currentTarget.style.color = SPOTA.c.text; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = SPOTA.c.lineSoft; e.currentTarget.style.color = SPOTA.c.textSoft; }}
              >
                <Icon name={s.icon} size={13} color={SPOTA.c.textSoft} />
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Ejemplos clicables — 3 columnas en desktop */}
        <div>
          <p style={{ margin: '0 0 12px', fontFamily: SPOTA.font.serif, fontStyle: 'italic', fontSize: 13, color: SPOTA.c.textSoft }}>
            probá decirle
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {EXAMPLES.map(ex => (
              <button key={ex} onClick={() => goSearch(ex)} style={{
                display: 'flex', alignItems: 'flex-start', gap: 10,
                padding: '14px 16px', borderRadius: 14,
                background: SPOTA.c.surface, border: `1px solid ${SPOTA.c.lineSoft}`,
                cursor: 'pointer', textAlign: 'left',
                fontFamily: SPOTA.font.ui, fontSize: 14, color: SPOTA.c.text,
                transition: 'border-color 150ms, transform 150ms, box-shadow 150ms',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = SPOTA.c.primary; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = SPOTA.shadow.card; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = SPOTA.c.lineSoft; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <Icon name="sparkles" size={14} color={SPOTA.c.accent} />
                <span style={{ flex: 1, lineHeight: 1.4 }}>"{ex}"</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// SearchResults desktop — D12: lista (60%) + mapa (40%) simultáneos.
// Header con input editable y refinable. Loading narrativo al entrar y al refinar.
// Espejo conceptual del SearchResults mobile, adaptado al canvas desktop.
const ScreenSearchResults = ({ nav, params }) => {
  const initialQuery = (params && params.query) || 'algo tranquilo en Palermo con una amiga el sábado';
  const [activeQuery, setActiveQuery] = React.useState(initialQuery);
  const [draftQuery, setDraftQuery] = React.useState(initialQuery);
  const [loading, setLoading] = React.useState(true);
  const [selectedPin, setSelectedPin] = React.useState('p1');
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
    <section style={{ paddingTop: 8 }}>
      {/* Header refinable */}
      <div style={{ marginBottom: 18, display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => nav('home')} title="Volver" style={{
          width: 40, height: 40, borderRadius: 999, border: `1px solid ${SPOTA.c.line}`,
          background: SPOTA.c.surface, cursor: 'pointer',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <Icon name="arrowLeft" size={18} color={SPOTA.c.text} />
        </button>
        <div style={{
          flex: 1, display: 'flex', alignItems: 'center', gap: 12,
          padding: '0 18px', height: 56,
          background: '#FFFFFF', borderRadius: 999,
          border: `1.5px solid ${SPOTA.c.primary}`,
          boxShadow: '0 6px 18px rgba(47, 111, 94, 0.10)',
        }}>
          <Icon name="search" size={18} color={SPOTA.c.primary} />
          <input
            value={draftQuery}
            onChange={(e) => setDraftQuery(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') submit(); }}
            style={{
              flex: 1, border: 'none', outline: 'none', background: 'transparent',
              fontFamily: SPOTA.font.ui, fontSize: 15, color: SPOTA.c.text,
            }}
          />
          {draftQuery && draftQuery !== activeQuery && (
            <button onClick={submit} style={{
              border: 'none', cursor: 'pointer',
              background: SPOTA.c.primary, color: '#fff',
              fontFamily: SPOTA.font.ui, fontSize: 12.5, fontWeight: 600,
              padding: '7px 14px', borderRadius: 999,
            }}>Refinar</button>
          )}
        </div>
      </div>

      {loading ? (
        <ConciergeLoadingDesktop intents={intents} />
      ) : (
        <React.Fragment>
          {/* Chips de intención + contador */}
          <div style={{ marginBottom: 18, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
            <IntentChips intents={intents} />
            <p style={{ margin: 0, fontFamily: SPOTA.font.ui, fontSize: 13.5, color: SPOTA.c.textSoft }}>
              <strong style={{ color: SPOTA.c.text }}>{PLACES.length} lugares</strong> por afinidad
            </p>
          </div>

          {/* D12 — lista 60% + mapa 40% sticky */}
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)', gap: 24, alignItems: 'start' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
              {PLACES.map(p => (
                <PlaceCard key={p.id} place={p}
                  selected={selectedPin === p.id}
                  onClick={() => nav('placeDetail', { id: p.id })} />
              ))}
            </div>
            <div style={{ position: 'sticky', top: 96, height: 'calc(100vh - 120px)' }}>
              <MapView selected={selectedPin} onSelect={setSelectedPin} />
            </div>
          </div>
        </React.Fragment>
      )}
    </section>
  );
};

// ConciergeLoadingDesktop — pausa narrativa entre submit y resultados.
const ConciergeLoadingDesktop = ({ intents }) => {
  const dims = Object.values(intents || {}).filter(Boolean);
  return (
    <div style={{
      minHeight: 420,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: '60px 24px', gap: 18,
    }}>
      <div style={{ display: 'inline-flex', gap: 8 }}>
        {[0, 1, 2].map(i => (
          <span key={i} style={{
            width: 10, height: 10, borderRadius: 999, background: SPOTA.c.primary,
            opacity: 0.35, animation: `pulse 1.2s ease-in-out ${i * 0.15}s infinite`,
          }} />
        ))}
      </div>
      <p style={{ margin: 0, textAlign: 'center', fontFamily: SPOTA.font.ui, fontSize: 17, color: SPOTA.c.text }}>
        <span style={{ fontFamily: SPOTA.font.serif, fontStyle: 'italic' }}>Leyendo</span> tus gustos…
      </p>
      {dims.length > 0 && (
        <p style={{ margin: 0, textAlign: 'center', fontFamily: SPOTA.font.ui, fontSize: 13.5, color: SPOTA.c.textSoft, maxWidth: 420, lineHeight: 1.5 }}>
          Cruzando {dims.join(' · ')} con tu Fama Score
        </p>
      )}
    </div>
  );
};

Object.assign(window, { ScreenDiscover, ScreenSearchResults });
