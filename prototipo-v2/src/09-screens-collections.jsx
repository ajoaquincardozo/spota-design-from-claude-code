// ========================================================================
// 09-screens-collections.jsx
// ========================================================================
// CU-10, CU-11 — Colecciones

// CU-10: Crear Colección
const ScreenCreateCollection = ({ nav, params }) => {
  const themes = [
    { id: 'umbrella', t: 'Lluvia' },
    { id: 'utensils', t: 'Comida' },
    { id: 'sparkles', t: 'Fiesta' },
    { id: 'coffee',   t: 'Brunch' },
    { id: 'leaf',     t: 'Aire libre' },
    { id: 'palette',  t: 'Arte' },
    { id: 'wineglass',t: 'Tragos' },
    { id: 'moon',     t: 'Noche' },
  ];
  // CU-004-001 Alt 5: si llega un placeId desde placeDetail, queda preseleccionado.
  const seedPlace = params?.placeId;
  const [name, setName] = React.useState('Sábado lluvioso');
  const [desc, setDesc] = React.useState('');
  const [theme, setTheme] = React.useState('umbrella');
  const [pub, setPub] = React.useState(true);
  const [places, setPlaces] = React.useState(seedPlace ? [seedPlace] : ['p1', 'p2']);
  // P3-42: feedback de creación antes de navegar al detalle de la colección.
  const [toast, setToast] = React.useState(null);
  const create = () => {
    setToast('Colección creada');
    window.setTimeout(() => nav('collectionDetail', { id: 'cnew', scope: 'Mías', activity: 'Todas' }), 900);
  };
  const toggle = (id) => setPlaces(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: SPOTA.c.bg }}>
      <AppHeader title="Nueva colección" leftIcon="close" onLeft={() => nav('collections')} />
      <div style={{ flex: 1, overflow: 'auto', padding: 20 }}>
        <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
          <div style={{ width: 72, height: 72, borderRadius: 16, background: SPOTA.c.primarySoft, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Icon name={theme} size={36} color={SPOTA.c.secondary} strokeWidth={1.8} />
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Field label="" placeholder="Nombre de tu colección" value={name} onChange={setName} />
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {themes.map(it => {
                const on = theme === it.id;
                return (
                  <button key={it.id} onClick={() => setTheme(it.id)} title={it.t} style={{
                    width: 34, height: 34, borderRadius: 10,
                    border: `1.5px solid ${on ? SPOTA.c.primary : SPOTA.c.line}`,
                    background: on ? SPOTA.c.primarySoft : SPOTA.c.surface,
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon name={it.id} size={18} color={on ? SPOTA.c.primary : SPOTA.c.secondary} strokeWidth={1.9} />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Una descripción corta (opcional)..." style={{
          width: '100%', minHeight: 70, padding: 14, borderRadius: 14, boxSizing: 'border-box',
          border: `1.5px solid ${SPOTA.c.line}`, background: SPOTA.c.surface,
          fontFamily: SPOTA.font.ui, fontSize: 14, color: SPOTA.c.text, resize: 'vertical', outline: 'none', marginBottom: 16,
        }} />

        <div style={{ background: SPOTA.c.surface, borderRadius: 14, padding: '4px 14px', border: `1px solid ${SPOTA.c.lineSoft}`, marginBottom: 18 }}>
          {[{ id: true, i: 'globe', t: 'Pública', s: 'Cualquiera puede verla y guardarla' }, { id: false, i: 'lock', t: 'Privada', s: 'Sólo vos la ves' }].map((o, i, a) => (
            <button key={String(o.id)} onClick={() => setPub(o.id)} style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0',
              border: 'none', background: 'transparent', cursor: 'pointer',
              borderBottom: i < a.length - 1 ? `1px solid ${SPOTA.c.lineSoft}` : 'none',
              textAlign: 'left',
            }}>
              <Icon name={o.i} size={20} color={SPOTA.c.primary} />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: SPOTA.font.ui, fontWeight: 600, fontSize: 14, color: SPOTA.c.text }}>{o.t}</div>
                <div style={{ fontFamily: SPOTA.font.ui, fontSize: 12, color: SPOTA.c.textSoft }}>{o.s}</div>
              </div>
              <div style={{ width: 22, height: 22, borderRadius: 999, border: `2px solid ${pub === o.id ? SPOTA.c.primary : SPOTA.c.line}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {pub === o.id && <div style={{ width: 12, height: 12, borderRadius: 999, background: SPOTA.c.primary }} />}
              </div>
            </button>
          ))}
        </div>

        <h3 style={{ margin: '0 0 10px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 15, color: SPOTA.c.text }}>Agregá lugares ({places.length})</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {PLACES.slice(0, 6).map(p => {
            const on = places.includes(p.id);
            return (
              <button key={p.id} onClick={() => toggle(p.id)} style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: 10, borderRadius: 12,
                background: on ? SPOTA.c.primarySoft : SPOTA.c.surface,
                border: `1.5px solid ${on ? SPOTA.c.primary : SPOTA.c.lineSoft}`,
                cursor: 'pointer', textAlign: 'left',
              }}>
                <img src={photo(p.img, 200, 200)} style={{ width: 48, height: 48, borderRadius: 8, objectFit: 'cover' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: SPOTA.font.ui, fontWeight: 600, fontSize: 14, color: SPOTA.c.text }}>{p.name}</div>
                  <div style={{ fontFamily: SPOTA.font.ui, fontSize: 12, color: SPOTA.c.textSoft }}>{p.cat} · {p.hood}</div>
                </div>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: on ? SPOTA.c.primary : 'transparent', border: `1.5px solid ${on ? SPOTA.c.primary : SPOTA.c.line}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {on && <Icon name="check" size={16} color="#fff" strokeWidth={3} />}
                </div>
              </button>
            );
          })}
        </div>
      </div>
      <div style={{ padding: '12px 20px 16px', borderTop: `1px solid ${SPOTA.c.lineSoft}` }}>
        <Btn variant="primary" size="lg" full disabled={!name.trim() || places.length === 0}
          onClick={create}>
          Crear colección
        </Btn>
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

// CU-11: Explorar Colecciones de la comunidad
// CU-004-002: feed de colecciones filtradas (la pantalla previa collectionsFilter
// envía los selectores; si se entra sin params, se aplica el deep link "Mías").
const ScreenCollections = ({ nav, params }) => {
  const scope = (params && params.scope) || 'Mías';
  const activity = (params && params.activity) || 'Todas';
  const filtered = COLLECTIONS.filter(c => collectionInScope(c, scope));
  const showSavedTag = scope === 'De la comunidad' || scope === 'Todas';
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: SPOTA.c.bg }}>
      <div style={{ padding: '14px 20px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
        <h1 style={{ margin: 0, fontFamily: SPOTA.font.ui, fontSize: 22, fontWeight: 700, color: SPOTA.c.text, letterSpacing: -0.4 }}>
          <span style={{ fontFamily: SPOTA.font.serif, fontStyle: 'italic', color: SPOTA.c.secondary, fontWeight: 400 }}>Tus</span> colecciones
        </h1>
        <button onClick={() => nav('createCollection')} title="Nueva colección" style={{ width: 40, height: 40, borderRadius: 999, border: 'none', background: SPOTA.c.primary, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="plus" size={22} color="#fff" />
        </button>
      </div>
      {/* Resumen de filtros activos + botón cambiar filtros */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '4px 20px 12px' }}>
        <div style={{ flex: 1, display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 12px', borderRadius: 999, background: SPOTA.c.surface, border: `1px solid ${SPOTA.c.lineSoft}` }}>
          <Icon name="filter" size={14} color={SPOTA.c.primary} />
          <span style={{ fontFamily: SPOTA.font.ui, fontSize: 13, fontWeight: 600, color: SPOTA.c.text }}>
            {scope} · {activity}
          </span>
        </div>
        <button onClick={() => nav('collectionsFilter', { scope, activity })} style={{
          height: 36, padding: '0 14px', borderRadius: 999, border: `1px solid ${SPOTA.c.line}`,
          background: SPOTA.c.surface, color: SPOTA.c.primary, cursor: 'pointer',
          fontFamily: SPOTA.font.ui, fontWeight: 600, fontSize: 12.5,
          display: 'inline-flex', alignItems: 'center', gap: 6,
        }}>
          <Icon name="edit" size={13} color={SPOTA.c.primary} /> Cambiar filtros
        </button>
      </div>
      <div style={{ flex: 1, overflow: 'auto', padding: '4px 20px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {filtered.map(c => {
            const matches = collectionMatchCount(c, activity);
            const saved = collectionIsSaved(c);
            return (
              <div key={c.id} onClick={() => nav('collectionDetail', { id: c.id, scope, activity })} style={{
                background: SPOTA.c.surface, borderRadius: 14, overflow: 'hidden',
                border: `1px solid ${SPOTA.c.lineSoft}`, cursor: 'pointer', boxShadow: SPOTA.shadow.card,
              }}>
                <div style={{ position: 'relative', height: 110, background: SPOTA.c.lineSoft }}>
                  <img src={photo(c.cover, 400, 300)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 50%, rgba(43,37,35,0.4) 100%)' }} />
                  <div style={{ position: 'absolute', top: 8, left: 8, fontSize: 22 }}>{c.emoji}</div>
                  <div style={{ position: 'absolute', top: 8, right: 8, display: 'flex', gap: 4 }}>
                    {!c.public && <Tag kind="line" icon="lock">Privada</Tag>}
                    {showSavedTag && saved && <Tag kind="softG" icon="bookmark">Guardada</Tag>}
                  </div>
                </div>
                <div style={{ padding: 12 }}>
                  <h3 style={{ margin: 0, fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 14.5, color: SPOTA.c.text }}>{c.name}</h3>
                  <p style={{ margin: '4px 0 0', fontFamily: SPOTA.font.ui, fontSize: 12, color: SPOTA.c.textSoft }}>
                    {c.count} lugares · por {c.by}
                  </p>
                  {matches != null && (
                    <p style={{ margin: '4px 0 0', fontFamily: SPOTA.font.ui, fontSize: 11.5, fontWeight: 600, color: SPOTA.c.primary }}>
                      {matches} de {c.count} matchean
                    </p>
                  )}
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div style={{ gridColumn: '1 / -1' }}>
              <EmptyState
                icon="collection"
                title="No hay colecciones todavía"
                subtitle="Probá cambiar los filtros o crear la primera."
                action={<Btn variant="primary" size="sm" onClick={() => nav('collectionsFilter')}>Cambiar filtros</Btn>}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { ScreenCreateCollection, ScreenCollections });
