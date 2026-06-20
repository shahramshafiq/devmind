import { useRef, useEffect } from 'react'

const COLORS = {
  'Issue Analyst': '#818cf8',
  'Architect':     '#a78bfa',
  'Developer':     '#c084fc',
  'QA Engineer':   '#e879f9',
  'Code Critic':   '#f472b6',
  'PR Writer':     '#fb7185',
  'DevMind':       '#94a3b8',
}

export default function LogTimeline({ logs, isRunning }) {
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [logs.length])

  return (
    <div className="glass" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', minHeight: 320 }}>

      {/* Header */}
      <div style={{
        padding: '15px 20px',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexShrink: 0,
      }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Agent Output
        </span>
        {isRunning ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#a78bfa', fontWeight: 700 }}>
            <div style={{ position: 'relative', width: 6, height: 6 }}>
              <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#a78bfa', animation: 'ripple 1s ease-in-out infinite' }} />
              <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#a78bfa' }} />
            </div>
            LIVE
          </div>
        ) : (
          logs.length > 0 && (
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.18)' }}>{logs.length} entries</span>
          )
        )}
      </div>

      {/* Entries */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '14px 20px', display: 'flex', flexDirection: 'column', gap: 7 }}>
        {logs.length === 0 && (
          <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.13)', fontSize: 13, paddingTop: 28 }}>
            <div style={{ fontSize: 22, marginBottom: 8 }}>⏳</div>
            Waiting for agents to start...
          </div>
        )}

        {logs.map((entry, i) => {
          const col = COLORS[entry.agent] || '#94a3b8'
          return (
            <div key={i} className="log-entry" style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: col, marginTop: 8, flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: col, marginRight: 6, fontFamily: "'JetBrains Mono', monospace" }}>
                  [{entry.agent}]
                </span>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.62)', lineHeight: 1.6 }}>
                  {entry.msg}
                </span>
              </div>
            </div>
          )
        })}

        <div ref={bottomRef} />
      </div>

    </div>
  )
}
