const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

const SVGS = {
  search: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  layout: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>,
  code:   () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  shield: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  eye:    () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  pr:     () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M13 6h3a2 2 0 0 1 2 2v7M6 9v12"/></svg>,
}

function Dots({ color }) {
  return (
    <span style={{ display: 'inline-flex', gap: 3, alignItems: 'center' }}>
      {[0, 1, 2].map(i => (
        <span key={i} style={{
          width: 4, height: 4, borderRadius: '50%', background: color, display: 'block',
          animation: 'dot-bounce 1.2s ease-in-out infinite',
          animationDelay: `${i * 0.2}s`,
        }} />
      ))}
    </span>
  )
}

export default function AgentPipeline({ agents, statuses, activeIdx, elapsed, isRunning }) {
  const doneCount = statuses.filter(s => s === 'done').length
  const progress  = Math.round((doneCount / agents.length) * 100)
  const mm = String(Math.floor(elapsed / 60)).padStart(2, '0')
  const ss = String(elapsed % 60).padStart(2, '0')

  return (
    <div className="glass" style={{ padding: 20 }}>

      {/* Header */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 9 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Agent Pipeline
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
            {isRunning && <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.28)', fontFamily: 'monospace' }}>{mm}:{ss}</span>}
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>{doneCount}/{agents.length}</span>
          </div>
        </div>

        {/* Progress track */}
        <div style={{ height: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 2, overflow: 'hidden' }}>
          <div style={{
            height: '100%', borderRadius: 2,
            background: 'linear-gradient(90deg, #ff6b35, #ff4500, #e03000)',
            width: `${progress}%`,
            transition: 'width 0.55s cubic-bezier(0.4, 0, 0.2, 1)',
          }} />
        </div>
      </div>

      {/* Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {agents.map((ag, i) => {
          const st       = statuses[i] || 'waiting'
          const isActive = st === 'active'
          const isDone   = st === 'done'
          const Icon     = SVGS[ag.icon] || SVGS.code

          return (
            <div
              key={ag.id}
              className={isActive ? 'agent-active' : ''}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '11px 14px',
                background: isActive ? `${ag.color}09` : isDone ? 'rgba(74,222,128,0.03)' : 'rgba(255,255,255,0.02)',
                border: `1px solid ${isActive ? `${ag.color}28` : isDone ? 'rgba(74,222,128,0.1)' : 'rgba(255,255,255,0.04)'}`,
                borderLeft: `3px solid ${isActive ? ag.color : isDone ? '#4ade80' : 'rgba(255,255,255,0.07)'}`,
                borderRadius: 10,
                transition: 'background 0.3s, border-color 0.3s',
              }}
            >
              {/* Icon */}
              <div style={{
                width: 30, height: 30, borderRadius: 7, flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: isDone ? 'rgba(74,222,128,0.1)' : isActive ? `${ag.color}18` : 'rgba(255,255,255,0.04)',
                color: isDone ? '#4ade80' : isActive ? ag.color : 'rgba(255,255,255,0.2)',
              }}>
                {isDone ? <CheckIcon /> : <Icon />}
              </div>

              {/* Text */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: st === 'waiting' ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.88)', marginBottom: 2 }}>
                  {ag.label}
                </div>
                <div style={{ fontSize: 11, display: 'flex', alignItems: 'center', gap: 5 }}>
                  {st === 'waiting' && <span style={{ color: 'rgba(255,255,255,0.18)' }}>Queued</span>}
                  {isActive && <><Dots color={ag.color} /><span style={{ color: ag.color }}>Processing</span></>}
                  {isDone   && <span style={{ color: 'rgba(74,222,128,0.7)' }}>Complete</span>}
                </div>
              </div>

              {/* Live dot */}
              {isActive && (
                <div style={{ position: 'relative', width: 8, height: 8, flexShrink: 0 }}>
                  <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: ag.color, animation: 'ripple 1.4s cubic-bezier(0,0,0.2,1) infinite' }} />
                  <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: ag.color }} />
                </div>
              )}
            </div>
          )
        })}
      </div>

    </div>
  )
}
