// CU-10, CU-11 — Colecciones

// CU-10: Crear Colección
const ScreenCreateCollection = ({ nav }) => {
  const [name, setName] = React.useState('Sábado lluvioso');
  const [desc, setDesc] = React.useState('');
  const [emoji, setEmoji] = React.useState('☔');
  const [pub, setPub] = React.useState(true);
  const [places, setPlaces] = React.useState(['p1', 'p2']);
  const toggle = (id) => setPlaces(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: SPOTA.c.bg }}>
      <AppHeader title="Nueva colección" leftIcon="close" onLeft={() => nav('collections')} />
      <div style={{ flex: 1, overflow: 'auto', padding: 20 }}>
        <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
          <div style={{ width: 72, height: 72, borderRadius: 16, background: SPOTA.c.primarySoft, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 34 }}>{emoji}</div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Field label="" placeholder="Nombre de tu colección" value={name} onChange={setName} />
            <div style={{ display: 'flex', gap: 6 }}>
              {['☔', '🍝', '🎉', '🍳', '🌳', '🎨', '🍷', '🌙'].map(e => (
                <button key={e} onClick={() => setEmoji(e)} style={{
                  width: 34, height: 34, borderRadius: 10, border: `1.5px solid ${emoji === e ? SPOTA.c.primary : SPOTA.c.line}`,
                  background: SPOTA.c.surface, cursor: 'pointer', fontSize: 18,
                }}>{e}</button>
              ))}
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
        <Btn variant="primary" size="lg" full onClick={() => nav('collections')}>Crear colección</Btn>
      </div>
    </div>
  );
};

// CU-11: Explorar Colecciones de la comunidad
const ScreenCollections = ({ nav }) => {
  const [tab, setTab] = React.useState('mine');
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: SPOTA.c.bg }}>
      <div style={{ padding: '14px 20px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1 style={{ margin: 0, fontFamily: SPOTA.font.ui, fontSize: 22, fontWeight: 700, color: SPOTA.c.text, letterSpacing: -0.4 }}>
          <span style={{ fontFamily: SPOTA.font.serif, fontStyle: 'italic', color: SPOTA.c.secondary, fontWeight: 400 }}>Tus</span> colecciones
        </h1>
        <button onClick={() => nav('createCollection')} style={{ width: 40, height: 40, borderRadius: 999, border: 'none', background: SPOTA.c.primary, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="plus" size={22} color="#fff" />
        </button>
      </div>
      <div style={{ display: 'flex', gap: 6, padding: '8px 20px 12px' }}>
        {[{ id: 'mine', t: 'Mías' }, { id: 'saved', t: 'Guardadas' }, { id: 'community', t: 'Comunidad' }].map(o => (
          <Chip key={o.id} active={tab === o.id} onClick={() => setTab(o.id)}>{o.t}</Chip>
        ))}
      </div>
      <div style={{ flex: 1, overflow: 'auto', padding: '4px 20px 24px' }}>
        {tab === 'community' && (
          <div style={{ marginBottom: 18, padding: 14, borderRadius: 14, background: `linear-gradient(135deg, ${SPOTA.c.accentSoft}, ${SPOTA.c.secondarySoft})` }}>
            <Icon name="sparkles" size={18} color={SPOTA.c.secondary} />
            <p style={{ margin: '4px 0 0', fontFamily: SPOTA.font.ui, fontWeight: 600, fontSize: 14, color: SPOTA.c.text }}>
              Inspirate con colecciones armadas por gente con tus mismos gustos.
            </p>
          </div>
        )}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {COLLECTIONS.map(c => (
            <div key={c.id} onClick={() => nav('collectionDetail', { id: c.id })} style={{
              background: SPOTA.c.surface, borderRadius: 14, overflow: 'hidden',
              border: `1px solid ${SPOTA.c.lineSoft}`, cursor: 'pointer', boxShadow: SPOTA.shadow.card,
            }}>
              <div style={{ position: 'relative', height: 110, background: SPOTA.c.lineSoft }}>
                <img src={photo(c.cover, 400, 300)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 50%, rgba(43,37,35,0.4) 100%)' }} />
                <div style={{ position: 'absolute', top: 8, left: 8, fontSize: 22 }}>{c.emoji}</div>
                {!c.public && <div style={{ position: 'absolute', top: 8, right: 8 }}><Tag kind="line" icon="lock">Privada</Tag></div>}
              </div>
              <div style={{ padding: 12 }}>
                <h3 style={{ margin: 0, fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 14.5, color: SPOTA.c.text }}>{c.name}</h3>
                <p style={{ margin: '4px 0 0', fontFamily: SPOTA.font.ui, fontSize: 12, color: SPOTA.c.textSoft }}>
                  {c.count} lugares · por {c.by}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { ScreenCreateCollection, ScreenCollections });
