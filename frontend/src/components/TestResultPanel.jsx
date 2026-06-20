export default function TestResultPanel({ testResult }) {
  if (!testResult) return null

  const { ran, passed, total, passed_count, failed_count, output } = testResult
  const statusColor = !ran ? '#94a3b8' : passed ? '#4ade80' : '#f87171'
  const statusLabel = !ran ? 'SKIPPED' : passed ? 'ALL PASS' : 'FAILED'
  const bgColor     = !ran ? 'rgba(148,163,184,0.04)' : passed ? 'rgba(74,222,128,0.04)' : 'rgba(248,113,113,0.04)'
  const borderColor = !ran ? 'rgba(148,163,184,0.1)' : passed ? 'rgba(74,222,128,0.12)' : 'rgba(248,113,113,0.12)'

  return (
    <div style={{
      background: bgColor,
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: `1px solid ${borderColor}`,
      borderRadius: 16,
      padding: '17px 20px',
    }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 30, height: 30, borderRadius: 9, flexShrink: 0,
            background: `${statusColor}14`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {passed ? (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={statusColor} strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            ) : (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={statusColor} strokeWidth="2.5">
                <path d="M9 2h6l1 7H8L9 2z"/><path d="M8 9v6a4 4 0 0 0 8 0V9"/>
              </svg>
            )}
          </div>
          <span style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Test Sandbox
          </span>
        </div>
        <div style={{
          padding: '3px 11px', borderRadius: 6,
          background: `${statusColor}14`,
          border: `1px solid ${statusColor}28`,
          fontSize: 11, fontWeight: 800, color: statusColor, letterSpacing: '0.08em',
        }}>
          {statusLabel}
        </div>
      </div>

      {/* Stats */}
      {ran && total > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 14 }}>
          {[
            { label: 'Total',  val: total,        col: '#c4b5fd' },
            { label: 'Passed', val: passed_count, col: '#4ade80' },
            { label: 'Failed', val: failed_count, col: failed_count > 0 ? '#f87171' : 'rgba(255,255,255,0.2)' },
          ].map(s => (
            <div key={s.label} style={{
              padding: '9px 12px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: 8, textAlign: 'center',
            }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: s.col, letterSpacing: '-0.02em' }}>{s.val}</div>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.25)', marginTop: 2, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{s.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Terminal output */}
      {output && (
        <div style={{
          background: 'rgba(0,0,0,0.4)',
          border: '1px solid rgba(255,255,255,0.05)',
          borderRadius: 10,
          padding: '12px 14px',
          maxHeight: 240,
          overflowY: 'auto',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          lineHeight: 1.75,
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-all',
        }}>
          {output.split('\n').map((line, i) => {
            let col = 'rgba(255,255,255,0.38)'
            if (/PASSED/.test(line))                        col = '#4ade80'
            else if (/FAILED|ERROR/.test(line))             col = '#f87171'
            else if (/ passed/.test(line))                  col = '#4ade80'
            else if (/ failed/.test(line))                  col = '#f87171'
            else if (/^(WARNINGS|WARNING)/.test(line))      col = '#fbbf24'
            else if (/^[A-Z_]+\.py/.test(line))             col = '#c4b5fd'
            else if (/^\s{2,}/.test(line))                  col = 'rgba(255,255,255,0.22)'
            return (
              <div key={i} style={{ color: col }}>{line || ' '}</div>
            )
          })}
        </div>
      )}

    </div>
  )
}
