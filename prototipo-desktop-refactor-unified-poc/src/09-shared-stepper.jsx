// ========================================================================
// 09-shared-stepper.jsx
// ========================================================================
// Stepper horizontal para wizards desktop. 3 segmentos con número, label y línea conectiva.
const Stepper = ({ steps, current }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 12, maxWidth: 720, margin: '0 auto 32px' }}>
    {steps.map((s, i) => {
      const done = i + 1 < current;
      const active = i + 1 === current;
      return (
        <React.Fragment key={s}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 999,
              background: done || active ? SPOTA.c.primary : SPOTA.c.surface,
              border: `1.5px solid ${done || active ? SPOTA.c.primary : SPOTA.c.line}`,
              color: done || active ? '#fff' : SPOTA.c.textMuted,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: SPOTA.font.ui, fontWeight: 700, fontSize: 13.5,
            }}>
              {done ? <Icon name="check" size={14} color="#fff" strokeWidth={3} /> : i + 1}
            </div>
            <span style={{
              fontFamily: SPOTA.font.ui, fontWeight: active ? 700 : 500, fontSize: 13.5,
              color: active ? SPOTA.c.text : SPOTA.c.textSoft, whiteSpace: 'nowrap',
            }}>{s}</span>
          </div>
          {i < steps.length - 1 && (
            <div style={{ flex: 1, height: 2, background: done ? SPOTA.c.primary : SPOTA.c.line, borderRadius: 999 }} />
          )}
        </React.Fragment>
      );
    })}
  </div>
);

Object.assign(window, { Stepper });
