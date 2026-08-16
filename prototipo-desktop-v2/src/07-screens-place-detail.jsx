// ========================================================================
// 07-screens-place-detail.jsx
// ========================================================================
// Detalle de lugar — versión desktop con CTA de 4 estados (D8 del CLAUDE.md)
// Estados: available → declared → visited → published
const ScreenPlaceDetail = ({ nav, params }) => {
  const place = PLACES.find(p => p.id === params?.id) || PLACES[0];
  const initial = place.visited ? 'visited' : 'available';
  const [visitState, setVisitState] = React.useState(initial);
  const nearby = PLACES.filter(p => p.id !== place.id).slice(0, 4);
  // P3-36: feedback de Share/Heart con toast efímero.
  const [liked, setLiked] = React.useState(false);
  const [toast, setToast] = React.useState(null);
  const ping = (msg) => {
    setToast(msg);
    window.setTimeout(() => setToast(t => t === msg ? null : t), 1800);
  };

  const ctaRow = () => {
    if (visitState === 'available') return (
      <>
        <Btn variant="primary" icon="compass" onClick={() => setVisitState('declared')}>Quiero ir</Btn>
        {/* CU-004-001 Alt 5: entry a "Nueva colección" preseleccionando este lugar. */}
        <Btn variant="outline" icon="collection" onClick={() => nav('createCollection', { placeId: place.id, from: 'placeDetail' })}>Guardar</Btn>
      </>
    );
    if (visitState === 'declared') return (
      <>
        <Btn variant="outline" icon="check" onClick={() => setVisitState('visited')}>Simular llegada</Btn>
        <Btn variant="ghost" onClick={() => setVisitState('available')}>Cancelar</Btn>
      </>
    );
    if (visitState === 'visited') return (
      <>
        <Btn variant="primary" icon="edit" onClick={() => nav('publish')}>Publicar experiencia</Btn>
        <Btn variant="outline" icon="collection" onClick={() => nav('createCollection', { placeId: place.id, from: 'placeDetail' })}>Guardar</Btn>
      </>
    );
    return (
      <>
        <Btn variant="primary" icon="eye" onClick={() => nav('myExperiences')}>Ver tu reseña</Btn>
        <Btn variant="outline" icon="edit" onClick={() => nav('myExperiences')}>Editar</Btn>
      </>
    );
  };

  return (
    <section>
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, fontFamily: SPOTA.font.ui, fontSize: 13, color: SPOTA.c.textSoft }}>
        <button onClick={() => nav('home')} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: SPOTA.c.textSoft, fontFamily: SPOTA.font.ui, fontSize: 13, padding: 0, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
          <Icon name="arrowLeft" size={14} /> Descubrir
        </button>
        <span style={{ color: SPOTA.c.textMuted }}>/</span>
        <span style={{ color: SPOTA.c.text, fontWeight: 600 }}>{place.name}</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.6fr) minmax(0, 1fr)', gap: 32, alignItems: 'start' }}>
        {/* Columna izquierda: foto + info + CTA */}
        <div>
          <div style={{ position: 'relative', borderRadius: SPOTA.radius.xl, overflow: 'hidden', height: 480, marginBottom: 24 }}>
            <img src={photo(place.img, 1200, 800)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', top: 16, right: 16, display: 'flex', gap: 8 }}>
              <button onClick={() => ping('Link copiado')} title="Compartir"
                style={{ width: 42, height: 42, borderRadius: 999, border: 'none', background: 'rgba(255,255,255,0.92)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)' }}>
                <Icon name="share" size={18} />
              </button>
              <button onClick={() => { setLiked(v => !v); ping(liked ? 'Lo sacaste de favoritos' : 'Sumado a favoritos'); }} title={liked ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                style={{ width: 42, height: 42, borderRadius: 999, border: 'none', background: 'rgba(255,255,255,0.92)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)' }}>
                <Icon name={liked ? 'heartFill' : 'heart'} size={18} color={liked ? SPOTA.c.secondary : SPOTA.c.text} />
              </button>
            </div>
            {(visitState === 'visited' || visitState === 'published') && (
              <div style={{ position: 'absolute', bottom: 16, left: 16 }}><ProofOfVisit size="lg" /></div>
            )}
          </div>

          {/* Tags */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            {place.tag && <Tag kind="secondary">{place.tag}</Tag>}
            {place.benefit && <Tag kind="accent" icon="gift">{place.benefit}</Tag>}
            {visitState === 'published' && <Tag kind="softG" icon="check">Reseñado</Tag>}
          </div>

          <h1 style={{ margin: '0 0 6px', fontFamily: SPOTA.font.ui, fontSize: 34, fontWeight: 700, color: SPOTA.c.text, letterSpacing: -0.6 }}>{place.name}</h1>
          <p style={{ margin: '0 0 14px', fontFamily: SPOTA.font.ui, fontSize: 15, color: SPOTA.c.textSoft }}>{place.cat} · {place.hood} · {place.price}</p>

          {/* P3-35 CU-006-002 §3.15 — dirección + horario del día (abierto/cerrado). */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Icon name="pin" size={16} color={SPOTA.c.primary} />
              <span style={{ fontFamily: SPOTA.font.ui, fontSize: 14, color: SPOTA.c.text }}>Av. Honduras 5230 · Palermo</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Icon name="clock" size={16} color={SPOTA.c.primary} />
              <span style={{ fontFamily: SPOTA.font.ui, fontSize: 14, color: SPOTA.c.text }}>
                <span style={{ color: SPOTA.c.success, fontWeight: 700 }}>Abierto</span> · cierra a las 23:00
              </span>
            </div>
          </div>

          <div style={{ display: 'inline-flex', gap: 14, alignItems: 'center', marginBottom: 22, padding: '12px 18px', background: SPOTA.c.surface, borderRadius: 14, border: `1px solid ${SPOTA.c.lineSoft}` }}>
            <FamaScore score={place.score} count={place.reviews} size="lg" />
          </div>

          <p style={{ margin: '0 0 16px', fontFamily: SPOTA.font.ui, fontSize: 16, color: SPOTA.c.text, lineHeight: 1.6, maxWidth: 680 }}>
            Café de especialidad con tostado propio y pastelería casera. Mesas adentro y patio interno con plantas. Wifi rápido, ideal para trabajar a la mañana o tomar algo después del laburo con amigos.
          </p>

          {/* P3-35 CU-006-002 — chips temáticos canónicos. */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 22, maxWidth: 680 }}>
            {['Wifi rápido', 'Patio interno', 'Pet friendly', 'Apto vegano', 'Para trabajar'].map(c => (
              <span key={c} style={{
                fontFamily: SPOTA.font.ui, fontSize: 12.5, color: SPOTA.c.textSoft,
                padding: '6px 12px', borderRadius: 999, background: SPOTA.c.surface,
                border: `1px solid ${SPOTA.c.lineSoft}`,
              }}>{c}</span>
            ))}
          </div>

          {/* Aviso de "intención declarada" */}
          {visitState === 'declared' && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', borderRadius: 12, marginBottom: 16, maxWidth: 680,
              background: SPOTA.c.primarySoft, border: `1px dashed ${SPOTA.c.primary}`,
            }}>
              <Icon name="clock" size={18} color={SPOTA.c.primary} />
              <p style={{ margin: 0, fontFamily: SPOTA.font.ui, fontSize: 13, color: SPOTA.c.primaryDark, lineHeight: 1.45 }}>
                <strong>Te esperamos hasta las 21:30.</strong> Cuando llegues, validamos tu visita en silencio para que puedas reseñar después.
              </p>
            </div>
          )}

          {/* CTA según estado */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 32 }}>
            {ctaRow()}
          </div>
        </div>

        {/* Columna derecha: reseñas + lugares cercanos */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: 28, position: 'sticky', top: 96 }}>
          <div>
            <h2 style={{ margin: '0 0 14px', fontFamily: SPOTA.font.ui, fontSize: 18, fontWeight: 700, color: SPOTA.c.text }}>Lo que dice la comunidad</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {REVIEWS.slice(0, 3).map(r => (
                <div key={r.id} style={{ background: SPOTA.c.surface, borderRadius: 14, padding: 14, border: `1px solid ${SPOTA.c.lineSoft}` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <Avatar name={r.user} size={36} score={r.fama} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 14, color: SPOTA.c.text }}>{r.user}</div>
                      <div style={{ fontFamily: SPOTA.font.ui, fontSize: 12, color: SPOTA.c.textSoft }}>{r.hood} · Fama {r.fama}</div>
                    </div>
                    <div style={{ display: 'flex' }}>{[...Array(r.score)].map((_, i) => <Icon key={i} name="star" size={13} color={SPOTA.c.accent} />)}</div>
                  </div>
                  <p style={{ margin: 0, fontFamily: SPOTA.font.ui, fontSize: 13.5, color: SPOTA.c.text, lineHeight: 1.5 }}>{r.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 style={{ margin: '0 0 14px', fontFamily: SPOTA.font.ui, fontSize: 18, fontWeight: 700, color: SPOTA.c.text }}>Cerca de acá</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {nearby.map(p => (
                <button key={p.id} onClick={() => nav('placeDetail', { id: p.id })} style={{
                  display: 'flex', alignItems: 'center', gap: 12, padding: 10, borderRadius: 12,
                  background: SPOTA.c.surface, border: `1px solid ${SPOTA.c.lineSoft}`,
                  cursor: 'pointer', textAlign: 'left',
                }}>
                  <img src={photo(p.img, 200, 200)} style={{ width: 56, height: 56, borderRadius: 10, objectFit: 'cover' }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 14, color: SPOTA.c.text }}>{p.name}</div>
                    <div style={{ fontFamily: SPOTA.font.ui, fontSize: 12, color: SPOTA.c.textSoft, marginBottom: 2 }}>{p.cat} · {p.hood}</div>
                    <FamaScore score={p.score} count={p.reviews} />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>
      {toast && (
        <div style={{
          position: 'fixed', left: '50%', bottom: 32, transform: 'translateX(-50%)',
          background: SPOTA.c.text, color: SPOTA.c.bg,
          fontFamily: SPOTA.font.ui, fontSize: 13.5, fontWeight: 500,
          padding: '11px 20px', borderRadius: 999, boxShadow: SPOTA.shadow.lg,
          zIndex: 60, pointerEvents: 'none',
        }}>{toast}</div>
      )}
    </section>
  );
};

Object.assign(window, { ScreenPlaceDetail });
