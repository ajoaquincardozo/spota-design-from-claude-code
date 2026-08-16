// ========================================================================
// 07-screens-discover.jsx
// ========================================================================
// CU-06 — Descubrimiento (pantalla protagónica)

const ScreenDiscover = ({ nav }) => {
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');

  const goSearch = (q) => {
    const text = (q || '').trim();
    if (!text) { setSearchOpen(false); return; }
    nav('searchResults', { query: text });
  };

  // Atajos: cada chip de categoría dispara una búsqueda con su nombre como query.
  // El parser interpreta el resultado como categoria=X y el flujo es idéntico.
  const SHORTCUTS = [
    { q: 'cafés',      label: 'Cafés',      icon: 'coffee'   },
    { q: 'comida',     label: 'Comida',     icon: 'utensils' },
    { q: 'bares',      label: 'Bares',      icon: 'bar'      },
    { q: 'cultura',    label: 'Cultura',    icon: 'palette'  },
    { q: 'aire libre', label: 'Aire libre', icon: 'leaf'     },
  ];

  // Ejemplos de prompts para invitar al diálogo en lenguaje natural.
  const EXAMPLES = [
    'café para trabajar con buen wifi',
    'algo tranquilo en Palermo con una amiga',
    'cena romántica el sábado',
  ];

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: SPOTA.c.bg, overflow: 'auto', paddingBottom: 90 }}>
      {/* Header con saludo (compacto para que el input gane jerarquía) */}
      <div style={{ padding: '16px 20px 22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <p style={{ margin: 0, fontFamily: SPOTA.font.ui, fontSize: 13, color: SPOTA.c.textSoft }}>Hola Sol 👋</p>
          <h1 style={{ margin: '2px 0 0', fontFamily: SPOTA.font.ui, fontSize: 22, fontWeight: 700, color: SPOTA.c.text, letterSpacing: -0.4, lineHeight: 1.2 }}>
            ¿Qué hacemos <span style={{ fontFamily: SPOTA.font.serif, fontStyle: 'italic', color: SPOTA.c.secondary, fontWeight: 400 }}>hoy</span>?
          </h1>
        </div>
        <button onClick={() => nav('profile')} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 0 }}>
          <Avatar name="Sol Benítez" size={42} score="87" />
        </button>
      </div>

      {/* Search HERO — bloque visual dominante de la pantalla */}
      <div style={{ padding: '0 20px 22px' }}>
        <SearchBar
          hero
          expanded={searchOpen}
          value={query}
          onChange={setQuery}
          onClick={() => setSearchOpen(true)}
          onSubmit={() => goSearch(query)}
          placeholders={SEARCH_PLACEHOLDERS}
        />
      </div>

      {/* Atajos discretos (apoyo, no protagonista) */}
      <div style={{ padding: '0 20px 6px' }}>
        <p style={{ margin: '0 0 10px', fontFamily: SPOTA.font.serif, fontStyle: 'italic', fontSize: 12.5, color: SPOTA.c.textSoft }}>
          o elegí un atajo
        </p>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {SHORTCUTS.map(s => (
            <button key={s.q} onClick={() => goSearch(s.q)} style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              padding: '6px 10px', borderRadius: 999,
              background: 'transparent', border: `1px solid ${SPOTA.c.lineSoft}`,
              cursor: 'pointer', fontFamily: SPOTA.font.ui, fontSize: 12, fontWeight: 500,
              color: SPOTA.c.textSoft,
            }}>
              <Icon name={s.icon} size={12} color={SPOTA.c.textSoft} />
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Ejemplos clicables */}
      <div style={{ padding: '22px 20px 12px' }}>
        <p style={{ margin: '0 0 10px', fontFamily: SPOTA.font.serif, fontStyle: 'italic', fontSize: 12.5, color: SPOTA.c.textSoft }}>
          probá decirle
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {EXAMPLES.map(ex => (
            <button key={ex} onClick={() => goSearch(ex)} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '12px 14px', borderRadius: 14,
              background: SPOTA.c.surface, border: `1px solid ${SPOTA.c.lineSoft}`,
              cursor: 'pointer', textAlign: 'left',
              fontFamily: SPOTA.font.ui, fontSize: 14, color: SPOTA.c.text,
            }}>
              <Icon name="sparkles" size={14} color={SPOTA.c.accent} />
              <span style={{ flex: 1 }}>"{ex}"</span>
              <Icon name="arrowRight" size={14} color={SPOTA.c.textSoft} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Map view — fake mapa estilizado con barrios, calles principales, parques
const MapView = ({ nav, famaVariant }) => {
  const [selected, setSelected] = React.useState('p1');
  const [filter, setFilter] = React.useState('all'); // all | open | visited | saved
  const place = PLACES.find(p => p.id === selected);
  // Pin positions (fake plot, tipo Palermo)
  const pins = [
    { id: 'p1', x: 28, y: 38 }, { id: 'p2', x: 55, y: 22 }, { id: 'p3', x: 72, y: 48 },
    { id: 'p4', x: 20, y: 62 }, { id: 'p6', x: 62, y: 72 }, { id: 'p7', x: 45, y: 45 },
    { id: 'p8', x: 82, y: 32 }, { id: 'p9', x: 36, y: 80 },
  ];
  return (
    <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
      {/* Base mapa: tono cálido neutro */}
      <div style={{
        position: 'absolute', inset: 0,
        background: '#EDE7DA',
      }}>
        <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }} preserveAspectRatio="none" viewBox="0 0 100 100">
          {/* Parque grande (Bosques de Palermo) */}
          <ellipse cx="78" cy="18" rx="28" ry="14" fill="#CFE3C0" opacity="0.9" />
          <text x="78" y="20" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="2.4" fontWeight="600" fill="#5C7A4F" style={{ textTransform: 'uppercase', letterSpacing: '0.3px' }}>Bosques</text>
          {/* Parque chico */}
          <ellipse cx="12" cy="78" rx="14" ry="9" fill="#CFE3C0" opacity="0.85" />
          <text x="12" y="80" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="2" fontWeight="600" fill="#5C7A4F">Plaza</text>
          {/* Río */}
          <path d="M -2 92 Q 30 88 60 90 T 102 86 L 102 102 L -2 102 Z" fill="#B5D6E3" opacity="0.7" />
          {/* Avenidas principales (gruesas, blancas) */}
          <path d="M 0 50 L 100 46" stroke="#FFFFFF" strokeWidth="2.4" />
          <path d="M 50 0 L 54 100" stroke="#FFFFFF" strokeWidth="2.4" />
          <path d="M 0 70 Q 40 65 100 68" stroke="#FFFFFF" strokeWidth="2.2" />
          {/* Calles secundarias (finitas) */}
          {[15, 30, 60, 85].map(y => (
            <line key={'h'+y} x1="0" y1={y} x2="100" y2={y + 2} stroke="#FFFFFF" strokeWidth="0.8" opacity="0.7" />
          ))}
          {[20, 35, 70, 88].map(x => (
            <line key={'v'+x} x1={x} y1="0" x2={x + 2} y2="100" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.7" />
          ))}
          {/* Manzanas sutiles */}
          {[...Array(6)].map((_, i) => (
            [...Array(5)].map((__, j) => (
              <rect key={`b${i}${j}`} x={i * 17 + 2} y={j * 18 + 5} width="13" height="14" fill="#F5EDE0" opacity="0.5" rx="0.6" />
            ))
          ))}
          {/* Etiquetas de barrios */}
          <text x="30" y="15" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="2.6" fontWeight="700" fill="#8A7960" opacity="0.8" style={{ letterSpacing: '1px', textTransform: 'uppercase' }}>Palermo</text>
          <text x="80" y="92" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="2.4" fontWeight="700" fill="#8A7960" opacity="0.7" style={{ letterSpacing: '1px', textTransform: 'uppercase' }}>Villa Crespo</text>
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
            <button key={p.id} onClick={() => setSelected(p.id)} style={{
              position: 'absolute', left: p.x + '%', top: p.y + '%',
              transform: `translate(-50%, -100%) scale(${isSel ? 1.15 : 1})`,
              border: 'none', background: 'transparent', cursor: 'pointer',
              transition: 'transform 200ms', zIndex: isSel ? 10 : 1,
              padding: 0,
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
      {/* Filtros flotantes arriba */}
      <div style={{ position: 'absolute', top: 12, left: 12, right: 12, display: 'flex', gap: 6, overflowX: 'auto', padding: 2, zIndex: 5 }}>
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
      {/* Controles laterales */}
      <div style={{ position: 'absolute', right: 12, top: 64, display: 'flex', flexDirection: 'column', gap: 6, zIndex: 5 }}>
        {[
          { i: 'plus', t: 'Acercar' },
          { i: 'arrowUp', t: 'Mi ubicación' },
        ].map(c => (
          <button key={c.i} title={c.t} style={{
            width: 38, height: 38, borderRadius: 12, border: 'none', cursor: 'pointer',
            background: SPOTA.c.surface, boxShadow: '0 2px 8px rgba(43,37,35,0.14)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}><Icon name={c.i} size={16} color={SPOTA.c.text} /></button>
        ))}
      </div>
      {/* Botón "buscar en esta zona" */}
      <button style={{
        position: 'absolute', top: 60, left: '50%', transform: 'translateX(-50%)',
        padding: '8px 14px', borderRadius: 999, border: 'none',
        background: SPOTA.c.text, color: '#fff', cursor: 'pointer',
        fontFamily: SPOTA.font.ui, fontSize: 12.5, fontWeight: 600,
        display: 'inline-flex', alignItems: 'center', gap: 6,
        boxShadow: '0 4px 14px rgba(43,37,35,0.25)', zIndex: 5,
      }}><Icon name="search" size={13} color="#fff" />Buscar en esta zona</button>
      {/* Floating selected card */}
      {place && (
        <div onClick={() => nav('placeDetail', { id: place.id })} style={{
          position: 'absolute', bottom: 96, left: 16, right: 16,
          background: SPOTA.c.surface, borderRadius: 16, padding: 12,
          display: 'flex', gap: 12, boxShadow: SPOTA.shadow.pop, cursor: 'pointer',
          animation: 'slideUp 240ms cubic-bezier(.2,.8,.2,1)', zIndex: 6,
        }}>
          <img src={photo(place.img, 200, 200)} style={{ width: 72, height: 72, borderRadius: 12, objectFit: 'cover' }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
              <h3 style={{ margin: 0, fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 16, color: SPOTA.c.text }}>{place.name}</h3>
              <span style={{ fontFamily: SPOTA.font.ui, fontSize: 12, color: SPOTA.c.textSoft }}>{place.price}</span>
            </div>
            <p style={{ margin: '2px 0 6px', fontFamily: SPOTA.font.ui, fontSize: 12.5, color: SPOTA.c.textSoft }}>{place.cat} · {place.hood} · a 320m</p>
            <FamaScore score={place.score} count={place.reviews} affinity={place.affinity} variant={famaVariant} />
          </div>
        </div>
      )}
    </div>
  );
};

// Detalle de lugar
const ScreenPlaceDetail = ({ nav, params, famaVariant }) => {
  const place = PLACES.find(p => p.id === params?.id) || PLACES[0];
  // Estado del CTA según diagrama Proof of Visit:
  // available → declared → visited → published
  const initialState = place.visited ? 'visited' : 'available';
  const [visitState, setVisitState] = React.useState(initialState);
  // P3-36: feedback de Share/Heart con toast efímero.
  const [liked, setLiked] = React.useState(false);
  const [toast, setToast] = React.useState(null);
  const ping = (msg) => {
    setToast(msg);
    window.setTimeout(() => setToast(t => t === msg ? null : t), 1800);
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: SPOTA.c.bg, overflow: 'auto', position: 'relative' }}>
      <div style={{ position: 'relative', height: 280 }}>
        <img src={photo(place.img, 800, 600)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', top: 16, left: 16, right: 16, display: 'flex', justifyContent: 'space-between' }}>
          <button onClick={() => nav('home')} style={{
            width: 40, height: 40, borderRadius: 999, border: 'none', background: 'rgba(255,255,255,0.92)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)',
          }}><Icon name="arrowLeft" size={20} /></button>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => ping('Link copiado')} title="Compartir"
              style={{ width: 40, height: 40, borderRadius: 999, border: 'none', background: 'rgba(255,255,255,0.92)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="share" size={18} />
            </button>
            <button onClick={() => { setLiked(v => !v); ping(liked ? 'Lo sacaste de favoritos' : 'Sumado a favoritos'); }} title={liked ? 'Quitar de favoritos' : 'Agregar a favoritos'}
              style={{ width: 40, height: 40, borderRadius: 999, border: 'none', background: 'rgba(255,255,255,0.92)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name={liked ? 'heartFill' : 'heart'} size={18} color={liked ? SPOTA.c.secondary : SPOTA.c.text} />
            </button>
          </div>
        </div>
        {(visitState === 'visited' || visitState === 'published') && (
          <div style={{ position: 'absolute', bottom: 16, left: 16 }}><ProofOfVisit size="lg" /></div>
        )}
      </div>
      <div style={{ padding: '20px 20px 100px' }}>
        <div style={{ display: 'flex', gap: 6, marginBottom: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          {place.tag && <Tag kind="secondary">{place.tag}</Tag>}
          {place.benefit && <Tag kind="accent" icon="gift">{place.benefit}</Tag>}
          {visitState === 'published' && <Tag kind="softG" icon="check">Reseñado</Tag>}
        </div>
        <h1 style={{ margin: '0 0 4px', fontFamily: SPOTA.font.ui, fontSize: 26, fontWeight: 700, color: SPOTA.c.text, letterSpacing: -0.4 }}>{place.name}</h1>
        <p style={{ margin: '0 0 12px', fontFamily: SPOTA.font.ui, fontSize: 14.5, color: SPOTA.c.textSoft }}>{place.cat} · {place.hood} · {place.price}</p>

        {/* P3-35 CU-006-002 §3.15 — dirección + horario del día (abierto/cerrado). */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Icon name="pin" size={16} color={SPOTA.c.primary} />
            <span style={{ fontFamily: SPOTA.font.ui, fontSize: 13.5, color: SPOTA.c.text }}>Av. Honduras 5230 · Palermo</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Icon name="clock" size={16} color={SPOTA.c.primary} />
            <span style={{ fontFamily: SPOTA.font.ui, fontSize: 13.5, color: SPOTA.c.text }}>
              <span style={{ color: SPOTA.c.success, fontWeight: 700 }}>Abierto</span> · cierra a las 23:00
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 18, padding: '12px 14px', background: SPOTA.c.surface, borderRadius: 14, border: `1px solid ${SPOTA.c.lineSoft}` }}>
          <FamaScore score={place.score} count={place.reviews} affinity={place.affinity} variant={famaVariant} size="lg" />
        </div>
        <p style={{ margin: '0 0 14px', fontFamily: SPOTA.font.ui, fontSize: 15, color: SPOTA.c.text, lineHeight: 1.6 }}>
          Café de especialidad con tostado propio y pastelería casera. Mesas adentro y patio interno con plantas. Wifi rápido, ideal para trabajar a la mañana o tomar algo después del laburo con amigos.
        </p>

        {/* P3-35 CU-006-002 — chips temáticos canónicos. */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 22 }}>
          {['Wifi rápido', 'Patio interno', 'Pet friendly', 'Apto vegano', 'Para trabajar'].map(c => (
            <span key={c} style={{
              fontFamily: SPOTA.font.ui, fontSize: 12, color: SPOTA.c.textSoft,
              padding: '5px 10px', borderRadius: 999, background: SPOTA.c.bgAlt || SPOTA.c.surface,
              border: `1px solid ${SPOTA.c.lineSoft}`,
            }}>{c}</span>
          ))}
        </div>

        {/* Aviso de "intención declarada" — el sistema valida en background */}
        {visitState === 'declared' && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 12, marginBottom: 12,
            background: SPOTA.c.primarySoft, border: `1px dashed ${SPOTA.c.primary}`,
          }}>
            <Icon name="clock" size={18} color={SPOTA.c.primary} />
            <p style={{ margin: 0, fontFamily: SPOTA.font.ui, fontSize: 12.5, color: SPOTA.c.primaryDark, lineHeight: 1.4 }}>
              <strong>Te esperamos hasta las 21:30.</strong> Cuando llegues, validamos tu visita en silencio para que puedas reseñar después.
            </p>
          </div>
        )}

        {/* CTA según estado */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 22 }}>
          {visitState === 'available' && (
            <>
              <Btn variant="primary" full icon="compass" onClick={() => setVisitState('declared')}>Quiero ir</Btn>
              {/* CU-004-001 Alt 5: entry a "Nueva colección" preseleccionando este lugar. */}
              <Btn variant="outline" icon="collection" onClick={() => nav('createCollection', { placeId: place.id, from: 'placeDetail' })}>Guardar</Btn>
            </>
          )}
          {visitState === 'declared' && (
            <>
              <Btn variant="outline" full icon="check" onClick={() => setVisitState('visited')}>Simular llegada</Btn>
              <Btn variant="ghost" onClick={() => setVisitState('available')}>Cancelar</Btn>
            </>
          )}
          {visitState === 'visited' && (
            <>
              <Btn variant="primary" full icon="edit" onClick={() => nav('publish')}>Publicar experiencia</Btn>
              <Btn variant="outline" icon="collection" onClick={() => nav('createCollection', { placeId: place.id, from: 'placeDetail' })}>Guardar</Btn>
            </>
          )}
          {visitState === 'published' && (
            <>
              <Btn variant="primary" full icon="eye" onClick={() => nav('myExperiences')}>Ver tu reseña</Btn>
              <Btn variant="outline" icon="edit" onClick={() => nav('myExperiences')}>Editar</Btn>
            </>
          )}
        </div>
        <SectionTitle>Lo que dice la comunidad</SectionTitle>
        {REVIEWS.slice(0, 2).map(r => (
          <div key={r.id} style={{ background: SPOTA.c.surface, borderRadius: 14, padding: 14, marginBottom: 10, border: `1px solid ${SPOTA.c.lineSoft}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <Avatar name={r.user} size={36} score={r.fama} />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 14, color: SPOTA.c.text }}>{r.user}</div>
                <div style={{ fontFamily: SPOTA.font.ui, fontSize: 12, color: SPOTA.c.textSoft }}>{r.hood} · Fama {r.fama}</div>
              </div>
              <div style={{ display: 'flex' }}>{[...Array(5)].map((_, i) => <Icon key={i} name="star" size={14} color={SPOTA.c.accent} />)}</div>
            </div>
            <p style={{ margin: 0, fontFamily: SPOTA.font.ui, fontSize: 13.5, color: SPOTA.c.text, lineHeight: 1.5 }}>{r.text}</p>
          </div>
        ))}
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

Object.assign(window, { ScreenDiscover, ScreenPlaceDetail, MapView });
