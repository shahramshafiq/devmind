export default function Header({ backendOk, page, setPage }) {
  const statusColor  = backendOk === null ? 'rgba(255,255,255,0.25)' : backendOk ? '#4ade80' : '#f87171'
  const statusBg     = backendOk === null ? 'rgba(255,255,255,0.04)' : backendOk ? 'rgba(74,222,128,0.08)' : 'rgba(248,113,113,0.08)'
  const statusBorder = backendOk === null ? 'rgba(255,255,255,0.07)'  : backendOk ? 'rgba(74,222,128,0.2)'  : 'rgba(248,113,113,0.2)'
  const statusLabel  = backendOk === null ? 'Connecting…' : backendOk ? 'Backend Online' : 'Backend Offline'

  return (
    <header style={{
      position: 'relative', zIndex: 20,
      padding: '18px 32px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: 'linear-gradient(135deg, #7c3aed, #e879f9)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 22px rgba(124,58,237,0.5)',
          flexShrink: 0,
        }}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
        </div>
        <div>
          <div style={{ fontSize: 17, fontWeight: 800, letterSpacing: '-0.035em', color: '#f1f0ff', lineHeight: 1 }}>
            Dev<span className="text-gradient">Mind</span>
          </div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.08em', marginTop: 2, fontWeight: 500 }}>
            AI CODE ENGINEER
          </div>
        </div>
      </div>

      {/* Nav */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        {['home', 'history'].map(p => (
          <button key={p} onClick={() => setPage(p)} style={{
            padding: '6px 14px', borderRadius: 8, fontSize: 13, fontWeight: 600,
            border: 'none', cursor: 'pointer', transition: 'all 0.18s',
            background: page === p ? 'rgba(139,92,246,0.18)' : 'transparent',
            color: page === p ? '#c084fc' : 'rgba(255,255,255,0.35)',
            textTransform: 'capitalize',
          }}>
            {p === 'home' ? 'Home' : 'History'}
          </button>
        ))}
      </div>

      {/* Right */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.18)', fontFamily: "'JetBrains Mono', monospace" }}>
          v0.1.0
        </span>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 7,
          padding: '5px 13px',
          background: statusBg,
          border: `1px solid ${statusBorder}`,
          borderRadius: 20,
          fontSize: 12, fontWeight: 500, color: statusColor,
          transition: 'all 0.35s',
        }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: statusColor, transition: 'background 0.35s' }} />
          {statusLabel}
        </div>
      </div>
    </header>
  )
}
