// CU-06 — Descubrimiento (pantalla protagónica)

const ScreenDiscover = ({ nav, famaVariant, density: dens }) => {
  const [view, setView] = React.useState('list'); // list | map
  const [cat, setCat] = React.useState(null);
  const [saved, setSaved] = React.useState(['p1']);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const toggleSave = (id) => setSaved(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: SPOTA.c.bg, overflow: 'hidden' }}>
      {/* Header con saludo */}
      <div style={{ padding: '14px 20px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <p style={{ margin: 0, fontFamily: SPOTA.font.ui, fontSize: 13, color: SPOTA.c.textSoft }}>Hola Sol 👋</p>
          <h1 style={{ margin: '2px 0 0', fontFamily: SPOTA.font.ui, fontSize: 22, fontWeight: 700, color: SPOTA.c.text, letterSpacing: -0.4 }}>
            ¿Qué hacemos <span style={{ fontFamily: SPOTA.font.serif, fontStyle: 'italic', color: SPOTA.c.secondary, fontWeight: 400 }}>hoy</span>?
          </h1>
        </div>
        <button onClick={() => nav('profile')} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 0 }}>
          <Avatar name="Sol Benítez" size={42} score="87" />
        </button>
      </div>

      {/* Search */}
      <div style={{ padding: '8px 20px 12px' }}>
        <SearchBar
          expanded={searchOpen}
          onClick={() => setSearchOpen(true)}
          onChange={() => {}}
          onSubmit={() => setSearchOpen(false)}
          placeholders={SEARCH_PLACEHOLDERS}
        />
      </div>

      {/* Cat chips */}
      <div style={{ display: 'flex', gap: 8, padding: '0 20px 12px', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
        <Chip active={cat === null} onClick={() => setCat(null)} icon="sparkles">Para vos</Chip>
        {CATEGORIES.map(c => (
          <Chip key={c.id} active={cat === c.id} onClick={() => setCat(c.id)} icon={c.icon}>{c.label}</Chip>
        ))}
      </div>

      {/* Toggle list/map */}
      <div style={{ padding: '0 20px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <p style={{ margin: 0, fontFamily: SPOTA.font.ui, fontSize: 13, color: SPOTA.c.textSoft }}>
          <strong style={{ color: SPOTA.c.text }}>{PLACES.length} lugares</strong> alineados a tu perfil
        </p>
        <div style={{ display: 'inline-flex', borderRadius: 999, background: SPOTA.c.surface, padding: 3, border: `1px solid ${SPOTA.c.line}` }}>
          {[{ id: 'list', i: 'list' }, { id: 'map', i: 'map' }].map(t => (
            <button key={t.id} onClick={() => setView(t.id)} style={{
              border: 'none', cursor: 'pointer', padding: '6px 12px', borderRadius: 999,
              background: view === t.id ? SPOTA.c.primary : 'transparent',
              color: view === t.id ? '#fff' : SPOTA.c.textSoft,
              display: 'inline-flex', alignItems: 'center', gap: 5,
              fontFamily: SPOTA.font.ui, fontSize: 12.5, fontWeight: 600,
            }}>
              <Icon name={t.i} size={14} /> {t.id === 'list' ? 'Lista' : 'Mapa'}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {view === 'list' ? (
        <div style={{ flex: 1, overflow: 'auto', padding: '4px 20px 24px' }}>
          {/* Hero featured card */}
          <div onClick={() => nav('placeDetail', { id: 'p1' })} style={{
            position: 'relative', borderRadius: 18, overflow: 'hidden', height: 200, marginBottom: 16,
            boxShadow: SPOTA.shadow.cardHover, cursor: 'pointer',
          }}>
            <img src={photo('cafePalermo', 800, 500)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 30%, rgba(43,37,35,0.85) 100%)' }} />
            <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', gap: 6 }}>
              <Tag kind="accent" icon="sparkles">Destacado para vos</Tag>
            </div>
            <div style={{ position: 'absolute', top: 12, right: 12 }}>
              <ProofOfVisit />
            </div>
            <div style={{ position: 'absolute', bottom: 14, left: 16, right: 16, color: '#fff' }}>
              <h2 style={{ margin: 0, fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 22, lineHeight: 1.15 }}>Café Cobrand</h2>
              <p style={{ margin: '4px 0 8px', fontFamily: SPOTA.font.ui, fontSize: 13.5, opacity: 0.9 }}>
                Cafetería · Palermo · Abierto ahora
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <FamaScore score={4.8} count={312} affinity={94} variant={famaVariant} />
                <span style={{ fontFamily: SPOTA.font.ui, fontSize: 12, opacity: 0.8 }}>· $$ · −15% en café</span>
              </div>
            </div>
          </div>

          {/* Section: Para vos */}
          <SectionTitle action="Ver todo" onAction={() => {}}>Planes y lugares para vos</SectionTitle>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 22 }}>
            {PLACES.slice(1, 5).map(p => (
              <PlaceCard key={p.id} place={p} density={dens} famaVariant={famaVariant}
                saved={saved.includes(p.id)} onSave={() => toggleSave(p.id)}
                onClick={() => nav('placeDetail', { id: p.id })} />
            ))}
          </div>

          {/* Section: Cerca */}
          <SectionTitle action="Ver todo">Cerca tuyo</SectionTitle>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 22 }}>
            {PLACES.slice(5, 9).map(p => (
              <PlaceCard key={p.id} place={p} density={dens} famaVariant={famaVariant}
                saved={saved.includes(p.id)} onSave={() => toggleSave(p.id)}
                onClick={() => nav('placeDetail', { id: p.id })} />
            ))}
          </div>

          {/* Marketplace teaser */}
          <div onClick={() => nav('hostMarketplace')} style={{
            background: `linear-gradient(135deg, ${SPOTA.c.primary} 0%, ${SPOTA.c.primaryDark} 100%)`,
            borderRadius: 18, padding: 20, color: '#fff', display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer',
            marginBottom: 20,
          }}>
            <div style={{ width: 56, height: 56, borderRadius: 999, background: 'rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon name="users" size={26} color="#fff" />
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: '0 0 2px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 16 }}>Buscás algo único?</h3>
              <p style={{ margin: 0, fontFamily: SPOTA.font.ui, fontSize: 13, opacity: 0.9 }}>Contratá un host local que arme tu salida ideal.</p>
            </div>
            <Icon name="arrowRight" size={20} color="#fff" />
          </div>

          <SectionTitle>Más para descubrir</SectionTitle>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {PLACES.slice(9, 12).map(p => (
              <PlaceCard key={p.id} place={p} density={dens} famaVariant={famaVariant}
                saved={saved.includes(p.id)} onSave={() => toggleSave(p.id)}
                onClick={() => nav('placeDetail', { id: p.id })} />
            ))}
          </div>
        </div>
      ) : (
        <MapView nav={nav} famaVariant={famaVariant} />
      )}
    </div>
  );
};

// Map view — fake mapa estilizado
const MapView = ({ nav, famaVariant }) => {
  const [selected, setSelected] = React.useState('p1');
  const place = PLACES.find(p => p.id === selected);
  // Pin positions (fake plot)
  const pins = [
    { id: 'p1', x: 30, y: 35 }, { id: 'p2', x: 55, y: 25 }, { id: 'p3', x: 70, y: 50 },
    { id: 'p4', x: 22, y: 60 }, { id: 'p6', x: 60, y: 70 }, { id: 'p7', x: 45, y: 45 },
    { id: 'p8', x: 80, y: 30 }, { id: 'p9', x: 35, y: 80 },
  ];
  return (
    <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
      {/* Mapa fake */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `
          radial-gradient(ellipse at 20% 30%, ${SPOTA.c.primarySoft} 0%, transparent 40%),
          radial-gradient(ellipse at 70% 70%, ${SPOTA.c.accentSoft} 0%, transparent 40%),
          ${SPOTA.c.bgAlt}`,
      }}>
        {/* Calles SVG */}
        <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
          {[...Array(8)].map((_, i) => (
            <line key={'h' + i} x1="0" y1={50 + i * 50} x2="500" y2={70 + i * 60} stroke={SPOTA.c.lineSoft} strokeWidth="2" />
          ))}
          {[...Array(6)].map((_, i) => (
            <line key={'v' + i} x1={50 + i * 60} y1="0" x2={70 + i * 70} y2="900" stroke={SPOTA.c.lineSoft} strokeWidth="2" />
          ))}
          <path d="M 0 400 Q 200 350, 400 380 T 800 360" stroke={SPOTA.c.line} strokeWidth="14" fill="none" opacity="0.5" />
        </svg>
        {/* Pins */}
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
            }}>
              <div style={{
                background: isSel ? SPOTA.c.secondary : SPOTA.c.primary,
                color: '#fff', borderRadius: 999, padding: '6px 10px',
                fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 12,
                display: 'inline-flex', alignItems: 'center', gap: 4,
                boxShadow: isSel ? '0 6px 16px rgba(184,92,56,0.4)' : '0 3px 10px rgba(47,111,94,0.3)',
                border: '2px solid #fff',
              }}>
                <Icon name="star" size={12} color={SPOTA.c.accent} /> {pl.score}
              </div>
              <div style={{
                width: 0, height: 0, margin: '0 auto',
                borderLeft: '6px solid transparent', borderRight: '6px solid transparent',
                borderTop: `8px solid ${isSel ? SPOTA.c.secondary : SPOTA.c.primary}`,
              }} />
            </button>
          );
        })}
      </div>
      {/* Floating selected card */}
      {place && (
        <div onClick={() => nav('placeDetail', { id: place.id })} style={{
          position: 'absolute', bottom: 16, left: 16, right: 16,
          background: SPOTA.c.surface, borderRadius: 16, padding: 12,
          display: 'flex', gap: 12, boxShadow: SPOTA.shadow.pop, cursor: 'pointer',
          animation: 'slideUp 240ms cubic-bezier(.2,.8,.2,1)',
        }}>
          <img src={photo(place.img, 200, 200)} style={{ width: 72, height: 72, borderRadius: 12, objectFit: 'cover' }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
              <h3 style={{ margin: 0, fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 16, color: SPOTA.c.text }}>{place.name}</h3>
              <span style={{ fontFamily: SPOTA.font.ui, fontSize: 12, color: SPOTA.c.textSoft }}>{place.price}</span>
            </div>
            <p style={{ margin: '2px 0 6px', fontFamily: SPOTA.font.ui, fontSize: 12.5, color: SPOTA.c.textSoft }}>{place.cat} · {place.hood}</p>
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
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: SPOTA.c.bg, overflow: 'auto' }}>
      <div style={{ position: 'relative', height: 280 }}>
        <img src={photo(place.img, 800, 600)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', top: 16, left: 16, right: 16, display: 'flex', justifyContent: 'space-between' }}>
          <button onClick={() => nav('discover')} style={{
            width: 40, height: 40, borderRadius: 999, border: 'none', background: 'rgba(255,255,255,0.92)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)',
          }}><Icon name="arrowLeft" size={20} /></button>
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={{ width: 40, height: 40, borderRadius: 999, border: 'none', background: 'rgba(255,255,255,0.92)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="share" size={18} /></button>
            <button style={{ width: 40, height: 40, borderRadius: 999, border: 'none', background: 'rgba(255,255,255,0.92)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="heart" size={18} /></button>
          </div>
        </div>
        {place.visited && <div style={{ position: 'absolute', bottom: 16, left: 16 }}><ProofOfVisit size="lg" /></div>}
      </div>
      <div style={{ padding: '20px 20px 100px' }}>
        <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
          {place.tag && <Tag kind="secondary">{place.tag}</Tag>}
          {place.benefit && <Tag kind="accent" icon="gift">{place.benefit}</Tag>}
        </div>
        <h1 style={{ margin: '0 0 4px', fontFamily: SPOTA.font.ui, fontSize: 26, fontWeight: 700, color: SPOTA.c.text, letterSpacing: -0.4 }}>{place.name}</h1>
        <p style={{ margin: '0 0 12px', fontFamily: SPOTA.font.ui, fontSize: 14.5, color: SPOTA.c.textSoft }}>{place.cat} · {place.hood} · {place.price}</p>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 18, padding: '12px 14px', background: SPOTA.c.surface, borderRadius: 14, border: `1px solid ${SPOTA.c.lineSoft}` }}>
          <FamaScore score={place.score} count={place.reviews} affinity={place.affinity} variant={famaVariant} size="lg" />
        </div>
        <p style={{ margin: '0 0 18px', fontFamily: SPOTA.font.ui, fontSize: 15, color: SPOTA.c.text, lineHeight: 1.6 }}>
          Café de especialidad con tostado propio y pastelería casera. Mesas adentro y patio interno con plantas. Wifi rápido, ideal para trabajar a la mañana o tomar algo después del laburo con amigos.
        </p>
        <div style={{ display: 'flex', gap: 10, marginBottom: 22 }}>
          <Btn variant="primary" full icon="calendar">Hacer reserva</Btn>
          <Btn variant="outline" icon="collection">Guardar</Btn>
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
    </div>
  );
};

Object.assign(window, { ScreenDiscover, ScreenPlaceDetail });
