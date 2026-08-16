// ========================================================================
// 08-screens-collections.jsx
// ========================================================================
// CU-004-002: feed de colecciones filtrado por Ámbito + Actividad. La selección de
// filtros vive en collectionsFilter (pantalla previa); acá se reciben como params.
const ScreenCollections = ({ nav, params }) => {
  const scope = (params && params.scope) || 'Mías';
  const activity = (params && params.activity) || 'Todas';
  const list = COLLECTIONS.filter(c => collectionInScope(c, scope));
  const showSavedTag = scope === 'De la comunidad' || scope === 'Todas';

  return (
    <section>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20, gap: 16 }}>
        <div>
          <h1 style={{ margin: 0, fontFamily: SPOTA.font.ui, fontSize: 32, fontWeight: 700, color: SPOTA.c.text, letterSpacing: -0.6 }}>
            <span style={{ fontFamily: SPOTA.font.serif, fontStyle: 'italic', color: SPOTA.c.secondary, fontWeight: 400 }}>Tus</span> colecciones
          </h1>
          <p style={{ margin: '6px 0 0', fontFamily: SPOTA.font.ui, fontSize: 14, color: SPOTA.c.textSoft }}>
            Listas temáticas de lugares. Pueden ser privadas o compartidas con la comunidad.
          </p>
        </div>
        <Btn variant="primary" icon="plus" onClick={() => nav('createCollection')}>Nueva colección</Btn>
      </div>

      {/* Resumen de filtros activos + cambiar filtros */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 14px', borderRadius: 999, background: SPOTA.c.surface, border: `1px solid ${SPOTA.c.lineSoft}` }}>
          <Icon name="filter" size={15} color={SPOTA.c.primary} />
          <span style={{ fontFamily: SPOTA.font.ui, fontSize: 13.5, fontWeight: 600, color: SPOTA.c.text }}>
            {scope} · {activity}
          </span>
        </div>
        <Btn variant="outline" size="sm" icon="edit" onClick={() => nav('collectionsFilter', { scope, activity })}>Cambiar filtros</Btn>
        <span style={{ marginLeft: 'auto', fontFamily: SPOTA.font.ui, fontSize: 13, color: SPOTA.c.textSoft }}>
          {list.length} {list.length === 1 ? 'colección' : 'colecciones'} en este filtro
        </span>
      </div>

      {/* Grid 3 columnas */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
        {list.map(c => (
          <CollectionCard key={c.id} collection={c} activity={activity}
            savedShown={showSavedTag && collectionIsSaved(c)}
            onClick={() => nav('collectionDetail', { id: c.id, scope, activity })} />
        ))}
        {list.length === 0 && (
          <div style={{ gridColumn: '1 / -1', padding: 40, textAlign: 'center', color: SPOTA.c.textSoft }}>
            No hay colecciones que coincidan con el filtro actual.
          </div>
        )}
      </div>
    </section>
  );
};

const CollectionCard = ({ collection, activity, savedShown, onClick }) => {
  const matches = collectionMatchCount(collection, activity);
  const [hover, setHover] = React.useState(false);
  return (
    <div onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        background: SPOTA.c.surface, borderRadius: SPOTA.radius.lg, overflow: 'hidden',
        border: `1px solid ${SPOTA.c.lineSoft}`,
        boxShadow: hover ? SPOTA.shadow.cardHover : SPOTA.shadow.card,
        cursor: 'pointer', transform: hover ? 'translateY(-2px)' : 'none',
        transition: 'transform 200ms, box-shadow 200ms',
      }}>
      <div style={{ position: 'relative', height: 180 }}>
        <img src={photo(collection.cover, 600, 400)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 50%, rgba(20,15,12,0.65) 100%)' }} />
        <div style={{ position: 'absolute', top: 12, left: 12, width: 38, height: 38, borderRadius: 12, background: SPOTA.c.surface, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name={collection.themeIcon} size={20} color={SPOTA.c.secondary} strokeWidth={1.9} />
        </div>
        <div style={{ position: 'absolute', top: 12, right: 12, display: 'flex', gap: 6 }}>
          {!collection.public && <Tag kind="soft" icon="lock">Privada</Tag>}
          {savedShown && <Tag kind="softG" icon="bookmark">Guardada</Tag>}
        </div>
        <div style={{ position: 'absolute', bottom: 14, left: 14, right: 14, color: '#fff' }}>
          <h3 style={{ margin: 0, fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 18, textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>{collection.name}</h3>
        </div>
      </div>
      <div style={{ padding: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Avatar name={collection.by} size={28} />
          <span style={{ fontFamily: SPOTA.font.ui, fontSize: 13, color: SPOTA.c.textSoft }}>{collection.by}</span>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontFamily: SPOTA.font.ui, fontSize: 13, fontWeight: 600, color: SPOTA.c.text }}>
            {collection.count} lugares
          </div>
          {matches != null && (
            <div style={{ fontFamily: SPOTA.font.ui, fontSize: 11.5, fontWeight: 600, color: SPOTA.c.primary, marginTop: 2 }}>
              {matches} de {collection.count} matchean
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ScreenCollectionDetail = ({ nav, params }) => {
  const c = COLLECTIONS.find(x => x.id === params?.id) || COLLECTIONS[0];
  const scope = (params && params.scope) || 'Mías';
  const activity = (params && params.activity) || 'Todas';
  const places = PLACES.slice(0, c.count > 8 ? 8 : c.count);
  const matched = activity !== 'Todas' ? places.filter(p => matchesActivity(p, activity)) : places;
  const unmatched = activity !== 'Todas' ? places.filter(p => !matchesActivity(p, activity)) : [];
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

  return (
    <section>
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, fontFamily: SPOTA.font.ui, fontSize: 13, color: SPOTA.c.textSoft }}>
        <button onClick={() => nav('collections', { scope, activity })} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: SPOTA.c.textSoft, fontFamily: SPOTA.font.ui, fontSize: 13, padding: 0, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
          <Icon name="arrowLeft" size={14} /> Colecciones
        </button>
        <span style={{ color: SPOTA.c.textMuted }}>/</span>
        <span style={{ color: SPOTA.c.text, fontWeight: 600 }}>{c.name}</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 2fr)', gap: 32, alignItems: 'start' }}>
        {/* Columna izquierda: cabezal sticky */}
        <aside style={{ position: 'sticky', top: 96 }}>
          <div style={{ position: 'relative', borderRadius: SPOTA.radius.xl, overflow: 'hidden', height: 280, marginBottom: 18 }}>
            <img src={photo(c.cover, 800, 500)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 40%, rgba(20,15,12,0.7) 100%)' }} />
            <div style={{ position: 'absolute', top: 16, left: 16, width: 48, height: 48, borderRadius: 14, background: SPOTA.c.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: SPOTA.shadow.card }}>
              <Icon name={c.themeIcon} size={26} color={SPOTA.c.secondary} strokeWidth={1.9} />
            </div>
          </div>
          <h1 style={{ margin: '0 0 8px', fontFamily: SPOTA.font.ui, fontSize: 28, fontWeight: 700, color: SPOTA.c.text, letterSpacing: -0.5 }}>{c.name}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
            <Avatar name={c.by} size={28} />
            <span style={{ fontFamily: SPOTA.font.ui, fontSize: 13.5, color: SPOTA.c.textSoft }}>
              por <strong style={{ color: SPOTA.c.text }}>{c.by}</strong>
            </span>
            {c.public ? <Tag kind="softG" icon="globe">Pública</Tag> : <Tag kind="soft" icon="lock">Privada</Tag>}
          </div>
          <p style={{ margin: '0 0 18px', fontFamily: SPOTA.font.ui, fontSize: 14.5, color: SPOTA.c.text, lineHeight: 1.55 }}>
            Una selección de lugares pensada para esos días que pintan tranquilos. Café de especialidad, librerías cálidas y rincones donde quedarse un rato sin apuro.
          </p>
          <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
            {showSaveBtn && <Btn variant="primary" icon="bookmark" onClick={onSave}>Guardar colección</Btn>}
            {!isMine && savedLocal && <Btn variant="outline" icon="check" disabled>Ya guardada</Btn>}
            <Btn variant="outline" icon="share" onClick={onShare}>Compartir</Btn>
          </div>
          {(savedToast || shareToast) && (
            <div style={{
              padding: '8px 14px', borderRadius: 8, background: SPOTA.c.primarySoft,
              color: SPOTA.c.primaryDark, fontFamily: SPOTA.font.ui, fontSize: 13, fontWeight: 600,
              marginBottom: 12,
            }}>{savedToast ? 'Colección guardada en "Guardadas".' : 'Link copiado al portapapeles.'}</div>
          )}
          <p style={{ margin: 0, fontFamily: SPOTA.font.ui, fontSize: 13, color: SPOTA.c.textSoft }}>
            <strong style={{ color: SPOTA.c.text }}>{places.length} lugares</strong>
            {activity !== 'Todas' && (
              <> · <strong style={{ color: SPOTA.c.primary }}>{matched.length} de {places.length} matchean tu filtro: {activity}</strong></>
            )}
          </p>
        </aside>

        {/* Columna derecha: grid de lugares */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
            {matched.map(p => (
              <div key={p.id} style={{
                position: 'relative',
                borderRadius: SPOTA.radius.lg,
                outline: activity !== 'Todas' ? `2px solid ${SPOTA.c.primary}` : 'none',
              }}>
                <PlaceCard place={p} onClick={() => nav('placeDetail', { id: p.id })} />
                {activity !== 'Todas' && (
                  <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 2 }}>
                    <Tag kind="primary" icon="check">Coincide con: {activity}</Tag>
                  </div>
                )}
              </div>
            ))}
          </div>
          {unmatched.length > 0 && (
            <>
              <div style={{ marginTop: 14, fontFamily: SPOTA.font.ui, fontSize: 13, fontWeight: 600, color: SPOTA.c.textSoft, textTransform: 'uppercase', letterSpacing: 0.4 }}>
                Otros lugares de la colección
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
                {unmatched.map(p => (
                  <div key={p.id} style={{ opacity: 0.45, filter: 'saturate(0.7)' }}>
                    <PlaceCard place={p} onClick={() => nav('placeDetail', { id: p.id })} />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

// CU-004-002 §3.4 — Pantalla previa de filtros (Ámbito + Actividad). Habilita
// "Ver colecciones" sólo cuando ambos selectores tienen valor. Si llega con scope/activity
// en params, los pre-aplica (deep link desde Perfil → "Mis colecciones").
const ScreenCollectionsFilter = ({ nav, params }) => {
  const [scope, setScope] = React.useState((params && params.scope) || null);
  const [activity, setActivity] = React.useState((params && params.activity) || null);
  const ready = scope && activity;
  return (
    <section>
      <div style={{ maxWidth: 760 }}>
        <h1 style={{ margin: 0, fontFamily: SPOTA.font.ui, fontSize: 32, fontWeight: 700, color: SPOTA.c.text, letterSpacing: -0.6 }}>
          Explorar <span style={{ fontFamily: SPOTA.font.serif, fontStyle: 'italic', color: SPOTA.c.secondary, fontWeight: 400 }}>colecciones</span>
        </h1>
        <p style={{ margin: '8px 0 24px', fontFamily: SPOTA.font.ui, fontSize: 14.5, color: SPOTA.c.textSoft, lineHeight: 1.5 }}>
          Elegí el ámbito y la actividad para ver las colecciones que se alinean con tu intención.
          Lo que elegís acá define qué cards ves a continuación.
        </p>

        <div style={{ background: SPOTA.c.surface, borderRadius: 16, padding: 24, border: `1px solid ${SPOTA.c.lineSoft}`, marginBottom: 14 }}>
          <h3 style={{ margin: '0 0 12px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 15.5, color: SPOTA.c.text }}>Ámbito</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
            {SCOPE_OPTIONS.map(o => (
              <button key={o} onClick={() => setScope(o)} style={{
                padding: '12px 14px', borderRadius: 12, cursor: 'pointer', textAlign: 'center',
                background: scope === o ? SPOTA.c.primary : SPOTA.c.bg,
                color: scope === o ? '#fff' : SPOTA.c.text,
                border: `1.5px solid ${scope === o ? SPOTA.c.primary : SPOTA.c.line}`,
                fontFamily: SPOTA.font.ui, fontWeight: scope === o ? 700 : 600, fontSize: 13.5,
              }}>{o}</button>
            ))}
          </div>
        </div>

        <div style={{ background: SPOTA.c.surface, borderRadius: 16, padding: 24, border: `1px solid ${SPOTA.c.lineSoft}`, marginBottom: 22 }}>
          <h3 style={{ margin: '0 0 12px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 15.5, color: SPOTA.c.text }}>Actividad</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {ACTIVITY_OPTIONS.map(o => (
              <button key={o} onClick={() => setActivity(o)} style={{
                padding: '8px 16px', borderRadius: 999, cursor: 'pointer',
                background: activity === o ? SPOTA.c.primary : SPOTA.c.bg,
                color: activity === o ? '#fff' : SPOTA.c.text,
                border: `1.5px solid ${activity === o ? SPOTA.c.primary : SPOTA.c.line}`,
                fontFamily: SPOTA.font.ui, fontWeight: activity === o ? 700 : 500, fontSize: 13.5,
              }}>{o}</button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ margin: 0, fontFamily: SPOTA.font.ui, fontSize: 12.5, color: SPOTA.c.textMuted }}>
            {ready ? 'Listo. Tocá "Ver colecciones" para continuar.' : 'Elegí los dos selectores para continuar.'}
          </p>
          <Btn variant="primary" size="lg" iconRight="arrowRight" disabled={!ready} onClick={() => nav('collections', { scope, activity })}>
            Ver colecciones
          </Btn>
        </div>
      </div>
    </section>
  );
};

Object.assign(window, { ScreenCollections, ScreenCollectionDetail, ScreenCollectionsFilter });
