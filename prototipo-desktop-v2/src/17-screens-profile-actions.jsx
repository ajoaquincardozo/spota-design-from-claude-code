// ========================================================================
// 17-screens-profile-actions.jsx
// ========================================================================
// Helpers locales para formularios consistentes
const FormField = ({ label, icon, type = 'text', value, onChange, placeholder, hint }) => (
  <div>
    <label style={{ display: 'block', marginBottom: 6, fontFamily: SPOTA.font.ui, fontSize: 13, fontWeight: 600, color: SPOTA.c.textSoft }}>{label}</label>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 14px', height: 46, borderRadius: 12, background: SPOTA.c.surface, border: `1.5px solid ${SPOTA.c.line}` }}>
      {icon && <Icon name={icon} size={17} color={SPOTA.c.textSoft} />}
      <input type={type} defaultValue={value} placeholder={placeholder}
        onChange={(e) => onChange && onChange(e.target.value)}
        style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontFamily: SPOTA.font.ui, fontSize: 14.5, color: SPOTA.c.text }} />
    </div>
    {hint && <p style={{ margin: '6px 0 0', fontFamily: SPOTA.font.ui, fontSize: 12, color: SPOTA.c.textMuted, lineHeight: 1.4 }}>{hint}</p>}
  </div>
);

// CU-10: Crear colección — desktop con preview en vivo
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
  // CU-004-001 Alt 5: si llega placeId desde placeDetail, se preselecciona en la lista.
  const seedPlace = params?.placeId;
  const [name, setName] = React.useState('Sábado lluvioso');
  const [desc, setDesc] = React.useState('');
  const [theme, setTheme] = React.useState('umbrella');
  const [pub, setPub] = React.useState(true);
  const [places, setPlaces] = React.useState(seedPlace ? [seedPlace] : ['p1', 'p2']);
  const togglePlace = (id) => setPlaces(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
  // P3-42: feedback de creación antes de navegar al detalle.
  const [toast, setToast] = React.useState(null);
  const create = () => {
    setToast('Colección creada');
    window.setTimeout(() => nav('collectionDetail', { id: 'cnew', scope: 'Mías', activity: 'Todas' }), 900);
  };

  const previewCollection = {
    name: name || 'Sin nombre',
    cover: PLACES.find(p => places.includes(p.id))?.img || 'cafePalermo',
    themeIcon: theme,
    by: 'Vos',
    public: pub,
    count: places.length,
  };

  return (
    <section>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, fontFamily: SPOTA.font.ui, fontSize: 13, color: SPOTA.c.textSoft }}>
        <button onClick={() => nav('collections')} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: SPOTA.c.textSoft, fontFamily: SPOTA.font.ui, fontSize: 13, padding: 0, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
          <Icon name="arrowLeft" size={14} /> Colecciones
        </button>
        <span style={{ color: SPOTA.c.textMuted }}>/</span>
        <span style={{ color: SPOTA.c.text, fontWeight: 600 }}>Nueva colección</span>
      </div>

      <div style={{ marginBottom: 24 }}>
        <h1 style={{ margin: 0, fontFamily: SPOTA.font.ui, fontSize: 28, fontWeight: 700, color: SPOTA.c.text, letterSpacing: -0.5 }}>
          Nueva <span style={{ fontFamily: SPOTA.font.serif, fontStyle: 'italic', color: SPOTA.c.secondary, fontWeight: 400 }}>colección</span>
        </h1>
        <p style={{ margin: '4px 0 0', fontFamily: SPOTA.font.ui, fontSize: 14, color: SPOTA.c.textSoft }}>
          Agrupá lugares por tema. Pueden ser privadas para vos o compartidas con la comunidad.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)', gap: 32, alignItems: 'start' }}>
        {/* Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <FormField label="Nombre" value={name} onChange={setName} placeholder="Sábado lluvioso, Brunch dominical, Plan económico..." />

          <div>
            <label style={{ display: 'block', marginBottom: 8, fontFamily: SPOTA.font.ui, fontSize: 13, fontWeight: 600, color: SPOTA.c.textSoft }}>Tema</label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {themes.map(it => {
                const on = theme === it.id;
                return (
                  <button key={it.id} onClick={() => setTheme(it.id)} title={it.t} style={{
                    width: 56, height: 56, borderRadius: 14,
                    border: `1.5px solid ${on ? SPOTA.c.primary : SPOTA.c.line}`,
                    background: on ? SPOTA.c.primarySoft : SPOTA.c.surface,
                    cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2,
                    transition: 'background 150ms, border-color 150ms',
                  }}>
                    <Icon name={it.id} size={22} color={on ? SPOTA.c.primary : SPOTA.c.secondary} strokeWidth={1.9} />
                    <span style={{ fontFamily: SPOTA.font.ui, fontSize: 9.5, fontWeight: on ? 700 : 500, color: on ? SPOTA.c.primary : SPOTA.c.textSoft }}>{it.t}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: 6, fontFamily: SPOTA.font.ui, fontSize: 13, fontWeight: 600, color: SPOTA.c.textSoft }}>Descripción <span style={{ fontWeight: 400, color: SPOTA.c.textMuted }}>(opcional)</span></label>
            <textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Una pequeña descripción de qué tienen en común estos lugares..." style={{
              width: '100%', minHeight: 90, padding: 14, borderRadius: 12, boxSizing: 'border-box',
              border: `1.5px solid ${SPOTA.c.line}`, background: SPOTA.c.surface,
              fontFamily: SPOTA.font.ui, fontSize: 14, color: SPOTA.c.text, resize: 'vertical', outline: 'none',
            }} />
          </div>

          {/* Visibilidad */}
          <div>
            <label style={{ display: 'block', marginBottom: 8, fontFamily: SPOTA.font.ui, fontSize: 13, fontWeight: 600, color: SPOTA.c.textSoft }}>Visibilidad</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {[
                { id: true, i: 'globe', t: 'Pública', s: 'Cualquiera puede verla y guardarla' },
                { id: false, i: 'lock', t: 'Privada', s: 'Sólo vos la ves' },
              ].map(o => {
                const on = pub === o.id;
                return (
                  <button key={String(o.id)} onClick={() => setPub(o.id)} style={{
                    padding: 14, borderRadius: 12, cursor: 'pointer', textAlign: 'left',
                    background: on ? SPOTA.c.primarySoft : SPOTA.c.surface,
                    border: `1.5px solid ${on ? SPOTA.c.primary : SPOTA.c.lineSoft}`,
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <Icon name={o.i} size={17} color={on ? SPOTA.c.primary : SPOTA.c.textSoft} />
                      <span style={{ fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 14, color: SPOTA.c.text }}>{o.t}</span>
                      {on && <Icon name="checkCircle" size={16} color={SPOTA.c.primary} style={{ marginLeft: 'auto' }} />}
                    </div>
                    <p style={{ margin: 0, fontFamily: SPOTA.font.ui, fontSize: 12.5, color: SPOTA.c.textSoft }}>{o.s}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Lugares */}
          <div>
            <label style={{ display: 'block', marginBottom: 8, fontFamily: SPOTA.font.ui, fontSize: 13, fontWeight: 600, color: SPOTA.c.textSoft }}>
              Lugares <span style={{ fontWeight: 400, color: SPOTA.c.textMuted }}>({places.length} elegidos)</span>
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {PLACES.slice(0, 6).map(p => {
                const on = places.includes(p.id);
                return (
                  <button key={p.id} onClick={() => togglePlace(p.id)} style={{
                    display: 'flex', alignItems: 'center', gap: 12, padding: 10, borderRadius: 12, textAlign: 'left',
                    background: on ? SPOTA.c.primarySoft : SPOTA.c.surface,
                    border: `1.5px solid ${on ? SPOTA.c.primary : SPOTA.c.lineSoft}`,
                    cursor: 'pointer',
                  }}>
                    <img src={photo(p.img, 200, 200)} style={{ width: 48, height: 48, borderRadius: 10, objectFit: 'cover' }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 14, color: SPOTA.c.text }}>{p.name}</div>
                      <div style={{ fontFamily: SPOTA.font.ui, fontSize: 12, color: SPOTA.c.textSoft }}>{p.cat} · {p.hood}</div>
                    </div>
                    <div style={{ width: 26, height: 26, borderRadius: 8, background: on ? SPOTA.c.primary : 'transparent', border: `1.5px solid ${on ? SPOTA.c.primary : SPOTA.c.line}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {on && <Icon name="check" size={15} color="#fff" strokeWidth={3} />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer actions */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 8, paddingTop: 18, borderTop: `1px solid ${SPOTA.c.lineSoft}` }}>
            <Btn variant="ghost" onClick={() => nav('collections')}>Cancelar</Btn>
            <Btn variant="primary" size="lg" icon="check"
              disabled={!name.trim() || places.length === 0}
              onClick={create}>
              Crear colección
            </Btn>
          </div>
        </div>

        {/* Preview en vivo */}
        <aside style={{ position: 'sticky', top: 96 }}>
          <p style={{ margin: '0 0 10px', fontFamily: SPOTA.font.ui, fontSize: 11, fontWeight: 700, color: SPOTA.c.textMuted, textTransform: 'uppercase', letterSpacing: 0.5 }}>Vista previa</p>
          <CollectionCard collection={previewCollection} onClick={() => {}} />
          <p style={{ margin: '14px 0 0', fontFamily: SPOTA.font.ui, fontSize: 12, color: SPOTA.c.textMuted, lineHeight: 1.5 }}>
            Así se va a ver tu colección {pub ? 'en la comunidad' : 'en tu perfil'} cuando la guardes.
          </p>
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

// Editar perfil — auxiliar de CU-04 / CU-05
const ScreenEditProfile = ({ nav }) => (
  <section>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, fontFamily: SPOTA.font.ui, fontSize: 13, color: SPOTA.c.textSoft }}>
      <button onClick={() => nav('profile')} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: SPOTA.c.textSoft, fontFamily: SPOTA.font.ui, fontSize: 13, padding: 0, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
        <Icon name="arrowLeft" size={14} /> Perfil
      </button>
      <span style={{ color: SPOTA.c.textMuted }}>/</span>
      <span style={{ color: SPOTA.c.text, fontWeight: 600 }}>Editar perfil</span>
    </div>

    <div style={{ maxWidth: 720 }}>
      <h1 style={{ margin: '0 0 4px', fontFamily: SPOTA.font.ui, fontSize: 28, fontWeight: 700, color: SPOTA.c.text, letterSpacing: -0.5 }}>Editar perfil</h1>
      <p style={{ margin: '0 0 24px', fontFamily: SPOTA.font.ui, fontSize: 14, color: SPOTA.c.textSoft }}>Esta info es la que ve la comunidad. Tu email y contraseña se editan en Credenciales.</p>

      {/* Foto */}
      <div style={{ background: SPOTA.c.surface, borderRadius: 16, padding: 20, marginBottom: 14, border: `1px solid ${SPOTA.c.lineSoft}`, display: 'flex', alignItems: 'center', gap: 18 }}>
        <Avatar name="Sol Benítez" size={80} score="87" />
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: '0 0 4px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 15, color: SPOTA.c.text }}>Foto de perfil</h3>
          <p style={{ margin: 0, fontFamily: SPOTA.font.ui, fontSize: 13, color: SPOTA.c.textSoft }}>JPG o PNG, máximo 4MB. Cuadrada queda mejor.</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Btn variant="outline" icon="photo">Cambiar</Btn>
          <Btn variant="ghost">Quitar</Btn>
        </div>
      </div>

      {/* Datos */}
      <div style={{ background: SPOTA.c.surface, borderRadius: 16, padding: 20, marginBottom: 14, border: `1px solid ${SPOTA.c.lineSoft}`, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <h3 style={{ margin: 0, fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 15, color: SPOTA.c.text }}>Datos públicos</h3>
        <FormField label="Nombre" value="Sol Benítez" placeholder="Cómo te ven los demás" />
        <FormField label="Username" value="solbenitez" icon="user" hint="Tu @ único en Spota. Solo letras, números y guiones bajos." />
        <div>
          <label style={{ display: 'block', marginBottom: 6, fontFamily: SPOTA.font.ui, fontSize: 13, fontWeight: 600, color: SPOTA.c.textSoft }}>Bio <span style={{ fontWeight: 400, color: SPOTA.c.textMuted }}>(opcional)</span></label>
          <textarea defaultValue="Foodie de Palermo. Me gustan los cafés con buen tostado, los bares chiquitos y los paseos sin apuro." style={{
            width: '100%', minHeight: 80, padding: 14, borderRadius: 12, boxSizing: 'border-box',
            border: `1.5px solid ${SPOTA.c.line}`, background: SPOTA.c.bg,
            fontFamily: SPOTA.font.ui, fontSize: 14, color: SPOTA.c.text, resize: 'vertical', outline: 'none',
          }} />
          <p style={{ margin: '6px 0 0', fontFamily: SPOTA.font.ui, fontSize: 12, color: SPOTA.c.textMuted }}>140 caracteres como máximo.</p>
        </div>
        <FormField label="Zona principal" value="Palermo" icon="pin" hint="Aparece junto a tu nombre y se usa para sugerirte planes cerca." />
      </div>

      {/* Footer actions */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
        <Btn variant="ghost" onClick={() => nav('profile')}>Cancelar</Btn>
        <Btn variant="primary" size="lg" icon="check" onClick={() => nav('profile')}>Guardar cambios</Btn>
      </div>
    </div>
  </section>
);

// CU-05: Credenciales y privacidad
const ScreenCredentials = ({ nav }) => {
  const [cur, setCur] = React.useState('');
  const [nu, setNu] = React.useState('');
  const [cf, setCf] = React.useState('');
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(false);
  const [confirmDelete, setConfirmDelete] = React.useState(false);
  const submit = () => {
    setSuccess(false);
    if (!cur || !nu || !cf) { setError('Completá los tres campos.'); return; }
    if (nu.length < 8) { setError('La contraseña nueva debe tener al menos 8 caracteres.'); return; }
    if (nu !== cf) { setError('La contraseña nueva y la confirmación no coinciden.'); return; }
    setError(null);
    setSuccess(true);
    setCur(''); setNu(''); setCf('');
    setTimeout(() => setSuccess(false), 3000);
  };
  return (
    <section>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, fontFamily: SPOTA.font.ui, fontSize: 13, color: SPOTA.c.textSoft }}>
        <button onClick={() => nav('profile')} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: SPOTA.c.textSoft, fontFamily: SPOTA.font.ui, fontSize: 13, padding: 0, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
          <Icon name="arrowLeft" size={14} /> Perfil
        </button>
        <span style={{ color: SPOTA.c.textMuted }}>/</span>
        <span style={{ color: SPOTA.c.text, fontWeight: 600 }}>Credenciales y privacidad</span>
      </div>

      <div style={{ maxWidth: 720 }}>
        <h1 style={{ margin: '0 0 4px', fontFamily: SPOTA.font.ui, fontSize: 28, fontWeight: 700, color: SPOTA.c.text, letterSpacing: -0.5 }}>
          Credenciales y <span style={{ fontFamily: SPOTA.font.serif, fontStyle: 'italic', color: SPOTA.c.secondary, fontWeight: 400 }}>privacidad</span>
        </h1>
        <p style={{ margin: '0 0 24px', fontFamily: SPOTA.font.ui, fontSize: 14, color: SPOTA.c.textSoft }}>Datos sensibles de tu cuenta.</p>

        {/* Email — solo lectura en MVP (CU-001-005 §3.14). El cambio queda fuera de alcance. */}
        <div style={{ background: SPOTA.c.surface, borderRadius: 16, padding: 20, marginBottom: 14, border: `1px solid ${SPOTA.c.lineSoft}`, display: 'flex', alignItems: 'center', gap: 14 }}>
          <Icon name="mail" size={20} color={SPOTA.c.primary} />
          <div style={{ flex: 1 }}>
            <h3 style={{ margin: '0 0 2px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 14.5, color: SPOTA.c.text }}>Email</h3>
            <p style={{ margin: 0, fontFamily: SPOTA.font.ui, fontSize: 13, color: SPOTA.c.textSoft }}>sol.b•••••@correo.com</p>
          </div>
          <span style={{ fontFamily: SPOTA.font.ui, fontSize: 12.5, color: SPOTA.c.textMuted, fontStyle: 'italic' }}>Solo lectura</span>
        </div>

        {/* Contraseña */}
        <div style={{ background: SPOTA.c.surface, borderRadius: 16, padding: 20, marginBottom: 14, border: `1px solid ${SPOTA.c.lineSoft}` }}>
          <h3 style={{ margin: '0 0 14px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 14.5, color: SPOTA.c.text }}>Cambiar contraseña</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <FormField label="Contraseña actual" type="password" icon="lock" placeholder="Tu contraseña actual" value={cur} onChange={setCur} />
            <FormField label="Contraseña nueva" type="password" icon="lock" placeholder="Mínimo 8 caracteres" value={nu} onChange={setNu} />
            <FormField label="Confirmar contraseña" type="password" icon="lock" placeholder="Repetí la nueva" value={cf} onChange={setCf} />
          </div>
          {error && (
            <p style={{ margin: '12px 0 0', fontFamily: SPOTA.font.ui, fontSize: 13, color: SPOTA.c.danger }}>{error}</p>
          )}
          {success && (
            <p style={{ margin: '12px 0 0', fontFamily: SPOTA.font.ui, fontSize: 13, color: SPOTA.c.success }}>Contraseña actualizada. Cerramos otras sesiones por seguridad.</p>
          )}
          <div style={{ marginTop: 16, display: 'flex', justifyContent: 'flex-end' }}>
            <Btn variant="primary" icon="check" onClick={submit}>Actualizar contraseña</Btn>
          </div>
        </div>

        {/* Zona de peligro */}
        <div style={{ background: SPOTA.c.surface, borderRadius: 16, padding: 20, border: `1px solid ${SPOTA.c.danger}33` }}>
          <h3 style={{ margin: '0 0 6px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 14.5, color: SPOTA.c.danger }}>Zona de peligro</h3>
          <p style={{ margin: '0 0 14px', fontFamily: SPOTA.font.ui, fontSize: 13, color: SPOTA.c.textSoft, lineHeight: 1.5 }}>
            Eliminar tu cuenta es irreversible. Vamos a borrar tu perfil, tus reseñas y tus colecciones privadas.
            Las reseñas públicas quedan como anónimas para preservar la integridad del Fama Score de la comunidad.
          </p>
          <button onClick={() => setConfirmDelete(true)} style={{
            padding: '10px 16px', borderRadius: 10, cursor: 'pointer',
            background: 'transparent', color: SPOTA.c.danger, border: `1.5px solid ${SPOTA.c.danger}`,
            fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 13.5,
            display: 'inline-flex', alignItems: 'center', gap: 6,
          }}>
            <Icon name="trash" size={15} color={SPOTA.c.danger} /> Eliminar cuenta
          </button>
        </div>
        {/* Modal de confirmación de eliminación (Alt 1 §3.14) */}
        {confirmDelete && (
          <div onClick={() => setConfirmDelete(false)} style={{
            position: 'fixed', inset: 0, background: 'rgba(43,37,35,0.55)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: 24,
          }}>
            <div onClick={(e) => e.stopPropagation()} style={{
              background: SPOTA.c.bg, width: 'min(520px, 100%)',
              borderRadius: 18, padding: '24px 28px', boxShadow: SPOTA.shadow.pop,
            }}>
              <h2 style={{ margin: '0 0 8px', fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 22, color: SPOTA.c.danger }}>Eliminar cuenta</h2>
              <p style={{ margin: '0 0 18px', fontFamily: SPOTA.font.ui, fontSize: 14, color: SPOTA.c.text, lineHeight: 1.5 }}>
                Esta acción es <strong>irreversible</strong>. Vamos a borrar tu perfil, tus reseñas privadas y tus colecciones privadas. Las reseñas públicas quedan anónimas para preservar la integridad del Fama Score de la comunidad.
              </p>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                <Btn variant="ghost" onClick={() => setConfirmDelete(false)}>Cancelar</Btn>
                <Btn variant="primary" icon="trash" style={{ background: SPOTA.c.danger }} onClick={() => { setConfirmDelete(false); nav('login'); }}>Eliminar</Btn>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

Object.assign(window, { ScreenCreateCollection, ScreenEditProfile, ScreenCredentials });
