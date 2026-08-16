// ========================================================================
// 15-screens-profile.jsx
// ========================================================================
// Perfil de usuario — 2 cols: identidad + Fama a la izquierda, secciones a la derecha
const ScreenProfile = ({ nav }) => (
  <section>
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 360px) minmax(0, 1fr)', gap: 32, alignItems: 'start' }}>
      {/* Columna izquierda: identidad sticky */}
      <aside style={{ position: 'sticky', top: 96, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ background: SPOTA.c.surface, borderRadius: 18, padding: 24, border: `1px solid ${SPOTA.c.lineSoft}`, textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', justifyContent: 'center', marginBottom: 14 }}>
            <Avatar name="Sol Benítez" size={88} score="87" />
          </div>
          <h1 style={{ margin: 0, fontFamily: SPOTA.font.ui, fontSize: 22, fontWeight: 700, color: SPOTA.c.text, letterSpacing: -0.4 }}>Sol Benítez</h1>
          <p style={{ margin: '4px 0 16px', fontFamily: SPOTA.font.ui, fontSize: 13.5, color: SPOTA.c.textSoft }}>@solbenitez · Palermo</p>
          <Btn variant="outline" full icon="edit" onClick={() => nav('editProfile')}>Editar perfil</Btn>
        </div>

        {/* Fama Score card */}
        <div style={{ background: `linear-gradient(135deg, ${SPOTA.c.primary} 0%, ${SPOTA.c.primaryDark} 100%)`, color: '#fff', borderRadius: 18, padding: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
            <div>
              <p style={{ margin: 0, fontFamily: SPOTA.font.ui, fontSize: 11.5, opacity: 0.85, textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 700 }}>Fama Score</p>
              <p style={{ margin: '2px 0 0', fontFamily: SPOTA.font.ui, fontSize: 36, fontWeight: 800, letterSpacing: -1, lineHeight: 1 }}>
                87<span style={{ fontSize: 16, opacity: 0.7 }}>/100</span>
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ margin: 0, fontFamily: SPOTA.font.ui, fontSize: 11.5, opacity: 0.85, textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 700 }}>Nivel</p>
              <p style={{ margin: '2px 0 0', fontFamily: SPOTA.font.serif, fontStyle: 'italic', fontSize: 24, fontWeight: 500 }}>Referente</p>
            </div>
          </div>
          <div style={{ height: 6, borderRadius: 999, background: 'rgba(255,255,255,0.22)', overflow: 'hidden', marginBottom: 10 }}>
            <div style={{ height: '100%', width: '87%', background: SPOTA.c.accent, borderRadius: 999 }} />
          </div>
          <p style={{ margin: 0, fontFamily: SPOTA.font.ui, fontSize: 12.5, opacity: 0.92, lineHeight: 1.45 }}>
            <strong>13 puntos</strong> para llegar a Maestro · Reseñá 2 lugares más esta semana
          </p>
        </div>

        {/* Stats compactos */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          {[
            { n: '47', l: 'Visitados', id: 'myExperiences' },
            { n: '12', l: 'Reseñas', id: 'myExperiences' },
            { n: '4', l: 'Colecciones', id: 'collections' },
          ].map(s => (
            <button key={s.l} onClick={() => nav(s.id)} style={{
              padding: '14px 8px', textAlign: 'center', cursor: 'pointer',
              background: SPOTA.c.surface, border: `1px solid ${SPOTA.c.lineSoft}`, borderRadius: 12,
              transition: 'border-color 150ms, transform 150ms',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = SPOTA.c.primary; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = SPOTA.c.lineSoft; }}>
              <div style={{ fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 22, color: SPOTA.c.text, lineHeight: 1, letterSpacing: -0.4 }}>{s.n}</div>
              <div style={{ fontFamily: SPOTA.font.ui, fontSize: 12, color: SPOTA.c.textSoft, marginTop: 6 }}>{s.l}</div>
            </button>
          ))}
        </div>
      </aside>

      {/* Columna derecha: secciones */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        {/* Mi actividad */}
        <div>
          <h2 style={{ margin: '0 0 14px', fontFamily: SPOTA.font.ui, fontSize: 20, fontWeight: 700, color: SPOTA.c.text, letterSpacing: -0.3 }}>Mi actividad</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {[
              { id: 'myExperiences', t: 'Mis experiencias', s: '12 reseñas · 3 por valorar', i: 'compass' },
              { id: 'collections', t: 'Mis colecciones', s: '4 listas guardadas', i: 'bookmark', params: { scope: 'Mías', activity: 'Todas' } },
              { id: 'plans', t: 'Mis planes', s: '2 planes activos', i: 'calendar' },
            ].map(o => (
              <button key={o.id} onClick={() => nav(o.id, o.params)} style={{
                padding: 16, background: SPOTA.c.surface, borderRadius: 14, cursor: 'pointer', textAlign: 'left',
                border: `1px solid ${SPOTA.c.lineSoft}`, display: 'flex', flexDirection: 'column', gap: 12,
                transition: 'box-shadow 150ms, transform 150ms',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = SPOTA.shadow.cardHover; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none'; }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: SPOTA.c.primarySoft, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name={o.i} size={20} color={SPOTA.c.primary} />
                </div>
                <div>
                  <div style={{ fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 15, color: SPOTA.c.text }}>{o.t}</div>
                  <div style={{ fontFamily: SPOTA.font.ui, fontSize: 13, color: SPOTA.c.textSoft, marginTop: 2 }}>{o.s}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Tu rol en Spota — host (extensión natural del rol del usuario, D3) */}
        <div>
          <h2 style={{ margin: '0 0 6px', fontFamily: SPOTA.font.ui, fontSize: 20, fontWeight: 700, color: SPOTA.c.text, letterSpacing: -0.3 }}>Tu rol en Spota</h2>
          <p style={{ margin: '0 0 14px', fontFamily: SPOTA.font.ui, fontSize: 13.5, color: SPOTA.c.textSoft, lineHeight: 1.5, maxWidth: 640 }}>
            Convertí tu conocimiento del barrio en experiencias para otros. Cualquier persona puede ser host — es una evolución natural del rol del usuario.
          </p>
          <button onClick={() => nav('registerHost')} style={{
            width: '100%', padding: 22, borderRadius: 18, cursor: 'pointer', textAlign: 'left', position: 'relative',
            background: `linear-gradient(135deg, ${SPOTA.c.secondary} 0%, ${SPOTA.c.secondaryDark} 100%)`,
            border: 'none', color: '#fff', overflow: 'hidden', boxShadow: '0 6px 18px rgba(184,92,56,0.25)',
            transition: 'transform 150ms, box-shadow 150ms',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 24px rgba(184,92,56,0.32)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 6px 18px rgba(184,92,56,0.25)'; }}>
            {/* Decoración */}
            <div style={{ position: 'absolute', top: -40, right: -30, width: 160, height: 160, borderRadius: 999, background: 'rgba(255,255,255,0.08)' }} />
            <div style={{ position: 'absolute', top: 20, right: 50, width: 70, height: 70, borderRadius: 999, background: 'rgba(255,255,255,0.06)' }} />
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 16, marginBottom: 14 }}>
              <div style={{ width: 56, height: 56, borderRadius: 14, background: 'rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>
                <Icon name="briefcase" size={28} color="#fff" />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontFamily: SPOTA.font.ui, fontSize: 12, fontWeight: 700, opacity: 0.85, textTransform: 'uppercase', letterSpacing: 0.6 }}>Hosts</p>
                <h3 style={{ margin: '4px 0 0', fontFamily: SPOTA.font.ui, fontSize: 22, fontWeight: 700, letterSpacing: -0.4 }}>Ser anfitrión local</h3>
              </div>
              <Icon name="arrowRight" size={22} color="#fff" />
            </div>
            <p style={{ position: 'relative', margin: '0 0 14px', fontFamily: SPOTA.font.ui, fontSize: 14, opacity: 0.95, lineHeight: 1.5, maxWidth: 480 }}>
              Diseñá experiencias en tu barrio, contestá ofertas de viaje y monetizá lo que mejor conocés.
            </p>
            <div style={{ position: 'relative', display: 'flex', gap: 16, fontFamily: SPOTA.font.ui, fontSize: 12.5, fontWeight: 600 }}>
              {['Ganás plata', 'Tu agenda', 'Sin fee inicial'].map(t => (
                <span key={t} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, opacity: 0.95 }}>
                  <Icon name="check" size={13} color="#fff" strokeWidth={2.5} /> {t}
                </span>
              ))}
            </div>
          </button>
          <p style={{ margin: '12px 0 0', fontFamily: SPOTA.font.ui, fontSize: 12.5, color: SPOTA.c.textSoft, textAlign: 'right' }}>
            ¿Ya sos host?{' '}
            <a onClick={() => nav('hostDashboard')} style={{ color: SPOTA.c.primary, fontWeight: 700, cursor: 'pointer' }}>Ir al dashboard →</a>
          </p>
        </div>

        {/* Cuenta */}
        <div>
          <h2 style={{ margin: '0 0 14px', fontFamily: SPOTA.font.ui, fontSize: 20, fontWeight: 700, color: SPOTA.c.text, letterSpacing: -0.3 }}>Cuenta</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { id: 'preferences', t: 'Preferencias', s: 'Tipos de experiencia, zona, contexto', i: 'sparkles' },
              { id: 'credentials', t: 'Credenciales y privacidad', s: 'Email, contraseña, datos personales', i: 'lock' },
            ].map(o => (
              <button key={o.id} onClick={() => nav(o.id)} style={{
                display: 'flex', alignItems: 'center', gap: 14, padding: 14, width: '100%', textAlign: 'left',
                background: SPOTA.c.surface, borderRadius: 12, border: `1px solid ${SPOTA.c.lineSoft}`, cursor: 'pointer',
                transition: 'border-color 150ms, background 150ms',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = SPOTA.c.line; e.currentTarget.style.background = SPOTA.c.bgAlt; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = SPOTA.c.lineSoft; e.currentTarget.style.background = SPOTA.c.surface; }}>
                <Icon name={o.i} size={18} color={SPOTA.c.primary} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: SPOTA.font.ui, fontWeight: 600, fontSize: 14.5, color: SPOTA.c.text }}>{o.t}</div>
                  <div style={{ fontFamily: SPOTA.font.ui, fontSize: 12.5, color: SPOTA.c.textSoft, marginTop: 2 }}>{o.s}</div>
                </div>
                <Icon name="arrowRight" size={16} color={SPOTA.c.textSoft} />
              </button>
            ))}
          </div>
        </div>

        {/* Cerrar sesión — vuelve al login (welcome no es CU canónico, alineado con mobile). */}
        <div style={{ paddingTop: 16, borderTop: `1px solid ${SPOTA.c.lineSoft}` }}>
          <button onClick={() => nav('login')} style={{
            background: 'transparent', border: 'none', cursor: 'pointer',
            fontFamily: SPOTA.font.ui, fontWeight: 600, fontSize: 14, color: SPOTA.c.textSoft,
            display: 'inline-flex', alignItems: 'center', gap: 8, padding: 0,
          }}>
            <Icon name="logout" size={16} color={SPOTA.c.textSoft} /> Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  </section>
);

Object.assign(window, { ScreenProfile });
