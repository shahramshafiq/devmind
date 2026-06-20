export default function ResultPanel({ result }) {
  const approved = result.review_decision === 'APPROVE'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

      {/* Success card */}
      <div style={{
        background: 'rgba(74,222,128,0.04)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(74,222,128,0.15)',
        borderRadius: 16, padding: 22,
      }}>
        {/* Title row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 13, marginBottom: 18 }}>
          <div style={{
            width: 42, height: 42, borderRadius: 11, flexShrink: 0,
            background: 'rgba(74,222,128,0.12)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#4ade80', marginBottom: 3 }}>
              Pull Request Opened
            </div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.38)' }}>{result.issue}</div>
          </div>
        </div>

        {/* PR URL */}
        <a
          href={result.pr_url}
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '11px 14px', marginBottom: 16,
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 10, textDecoration: 'none',
            color: '#c4b5fd', overflow: 'hidden',
            transition: 'border-color 0.2s',
          }}
        >
          <span style={{ fontSize: 12, fontFamily: "'JetBrains Mono', monospace", overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
            {result.pr_url}
          </span>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0, marginLeft: 9, opacity: 0.55 }}>
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
        </a>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {[
            { label: 'Decision',   val: result.review_decision,          col: approved ? '#4ade80' : '#f87171' },
            { label: 'Iterations', val: result.iterations,                col: '#c4b5fd' },
            { label: 'Files',      val: result.files_committed?.length ?? 0, col: '#c4b5fd' },
          ].map(s => (
            <div key={s.label} style={{ padding: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 9, textAlign: 'center' }}>
              <div style={{ fontSize: 19, fontWeight: 800, color: s.col, letterSpacing: '-0.02em' }}>{s.val}</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.28)', marginTop: 3, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Files committed */}
      {result.files_committed?.length > 0 && (
        <div className="glass" style={{ padding: '17px 20px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.28)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 11 }}>
            Files Committed
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {result.files_committed.map(f => (
              <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', background: 'rgba(74,222,128,0.04)', border: '1px solid rgba(74,222,128,0.08)', borderRadius: 8 }}>
                <span style={{ color: '#4ade80', fontSize: 13, fontWeight: 700, flexShrink: 0 }}>+</span>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.62)', fontFamily: "'JetBrains Mono', monospace", overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {f}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PR summary */}
      {result.pr_title && (
        <div className="glass" style={{ padding: '17px 20px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.28)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>
            PR Summary
          </div>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.85)', marginBottom: 10, lineHeight: 1.5 }}>
            {result.pr_title}
          </div>
          {result.pr_body && (
            <div style={{
              fontSize: 12, color: 'rgba(255,255,255,0.38)', lineHeight: 1.8,
              whiteSpace: 'pre-wrap', maxHeight: 200, overflowY: 'auto',
              borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 10,
              fontFamily: "'JetBrains Mono', monospace",
            }}>
              {result.pr_body}
            </div>
          )}
        </div>
      )}

    </div>
  )
}
