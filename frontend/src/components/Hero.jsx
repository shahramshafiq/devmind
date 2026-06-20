const PILLS = [
  { label: 'Issue Analyst', color: '#818cf8' },
  { label: 'Architect',     color: '#a78bfa' },
  { label: 'Developer',     color: '#c084fc' },
  { label: 'QA Engineer',   color: '#e879f9' },
  { label: 'Code Critic',   color: '#f472b6' },
  { label: 'PR Writer',     color: '#fb7185' },
]

const STATS = [
  { val: '6',    label: 'Specialized Agents' },
  { val: 'RAG',  label: 'Codebase Indexing'  },
  { val: 'Real', label: 'GitHub PRs Opened'  },
]

export default function Hero() {
  return (
    <section style={{ textAlign: 'center', padding: '72px 24px 52px', maxWidth: 840, margin: '0 auto' }}>

      {/* Badge */}
      <div className="su1" style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        padding: '6px 16px',
        background: 'rgba(124,58,237,0.1)',
        border: '1px solid rgba(124,58,237,0.25)',
        borderRadius: 20,
        fontSize: 13, color: '#c4b5fd', fontWeight: 500,
        marginBottom: 28,
      }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
        </svg>
        Multi-Agent Autonomous Code Engineer
      </div>

      {/* Title */}
      <h1 className="su2" style={{
        fontSize: 'clamp(38px, 5.5vw, 68px)',
        fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.08,
        color: '#f1f0ff', marginBottom: 22,
      }}>
        From GitHub Issue<br />
        to <span className="text-gradient">Merged PR.</span>
      </h1>

      {/* Subtitle */}
      <p className="su3" style={{
        fontSize: 17, color: 'rgba(241,240,255,0.48)',
        maxWidth: 560, margin: '0 auto 50px', lineHeight: 1.78,
      }}>
        Paste any GitHub issue URL. DevMind's 6-agent AI pipeline analyzes it,
        writes production code, tests it, reviews it, and opens a real pull
        request. Fully automated.
      </p>

      {/* Agent pills */}
      <div className="su4" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8, marginBottom: 50 }}>
        {PILLS.map(p => (
          <div key={p.label} style={{
            display: 'flex', alignItems: 'center', gap: 7,
            padding: '7px 15px',
            background: 'rgba(255,255,255,0.03)',
            border: `1px solid ${p.color}20`,
            borderRadius: 20,
            fontSize: 13, color: p.color, fontWeight: 500,
          }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: p.color, display: 'block', flexShrink: 0 }} />
            {p.label}
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="su5" style={{ display: 'flex', justifyContent: 'center', gap: 36 }}>
        {STATS.map(s => (
          <div key={s.label} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#c4b5fd', letterSpacing: '-0.025em' }}>{s.val}</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.28)', marginTop: 3, fontWeight: 500, letterSpacing: '0.03em' }}>{s.label}</div>
          </div>
        ))}
      </div>

    </section>
  )
}
