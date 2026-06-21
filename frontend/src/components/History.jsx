import { useState, useEffect } from 'react'

const API = import.meta.env.VITE_API_URL || 'http://localhost:8000'

function Badge({ decision }) {
  const approved = decision === 'APPROVE'
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700,
      background: approved ? 'rgba(74,222,128,0.1)' : 'rgba(248,113,113,0.1)',
      border: `1px solid ${approved ? 'rgba(74,222,128,0.3)' : 'rgba(248,113,113,0.3)'}`,
      color: approved ? '#4ade80' : '#f87171',
      letterSpacing: '0.04em',
    }}>
      <div style={{ width: 5, height: 5, borderRadius: '50%', background: approved ? '#4ade80' : '#f87171' }} />
      {approved ? 'APPROVED' : 'REJECTED'}
    </span>
  )
}

function ExpandedRow({ run }) {
  return (
    <tr>
      <td colSpan={7} style={{ padding: '0 0 2px 0' }}>
        <div style={{
          margin: '0 0 8px 0', padding: '18px 22px',
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 10, fontSize: 13,
        }}>
          {run.pr_title && (
            <div style={{ marginBottom: 10 }}>
              <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 11, fontWeight: 600, letterSpacing: '0.06em' }}>PR TITLE</span>
              <div style={{ color: 'rgba(255,255,255,0.85)', marginTop: 3, fontWeight: 500 }}>{run.pr_title}</div>
            </div>
          )}
          {run.pr_body && (
            <div style={{ marginBottom: 10 }}>
              <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 11, fontWeight: 600, letterSpacing: '0.06em' }}>PR BODY</span>
              <pre style={{
                marginTop: 6, whiteSpace: 'pre-wrap', wordBreak: 'break-word',
                color: 'rgba(255,255,255,0.55)', fontSize: 12, lineHeight: 1.7,
                background: 'rgba(0,0,0,0.2)', padding: '12px 14px', borderRadius: 8,
                maxHeight: 220, overflowY: 'auto',
              }}>{run.pr_body}</pre>
            </div>
          )}
          {run.pr_url && (
            <a href={run.pr_url} target="_blank" rel="noreferrer" style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              fontSize: 12, color: '#a78bfa', textDecoration: 'none', fontWeight: 500,
            }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
              View PR on GitHub
            </a>
          )}
        </div>
      </td>
    </tr>
  )
}

export default function History() {
  const [runs, setRuns]         = useState([])
  const [loading, setLoading]   = useState(true)
  const [expanded, setExpanded] = useState(null)

  useEffect(() => {
    fetch(`${API}/api/history`)
      .then(r => r.json())
      .then(d => { setRuns(d.runs || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const toggle = (id) => setExpanded(prev => prev === id ? null : id)

  const fmtDate = (iso) => {
    if (!iso) return '—'
    const d = new Date(iso)
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      + ' ' + d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  }

  const thStyle = {
    padding: '10px 14px', textAlign: 'left',
    fontSize: 11, fontWeight: 600, letterSpacing: '0.07em',
    color: 'rgba(255,255,255,0.3)', borderBottom: '1px solid rgba(255,255,255,0.07)',
  }
  const tdStyle = {
    padding: '13px 14px', fontSize: 13,
    color: 'rgba(255,255,255,0.7)', borderBottom: '1px solid rgba(255,255,255,0.04)',
    verticalAlign: 'middle',
  }

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 32px 60px', animation: 'fade-in 0.4s ease-out' }}>

      {/* Page header */}
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: '#f1f0ff', letterSpacing: '-0.03em', margin: 0 }}>
          Run History
        </h2>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', marginTop: 5 }}>
          Every pipeline run. Click a row to expand PR details.
        </p>
      </div>

      {/* Table */}
      <div className="glass" style={{ padding: 0, overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: 48, textAlign: 'center', color: 'rgba(255,255,255,0.25)', fontSize: 14 }}>
            Loading…
          </div>
        ) : runs.length === 0 ? (
          <div style={{ padding: 48, textAlign: 'center', color: 'rgba(255,255,255,0.25)', fontSize: 14 }}>
            No runs yet. Submit a GitHub issue to get started.
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={thStyle}>#</th>
                <th style={thStyle}>ISSUE</th>
                <th style={thStyle}>REPO</th>
                <th style={thStyle}>DECISION</th>
                <th style={thStyle}>ITERS</th>
                <th style={thStyle}>TESTS</th>
                <th style={thStyle}>DATE</th>
              </tr>
            </thead>
            <tbody>
              {runs.map(run => [
                <tr
                  key={run.id}
                  onClick={() => toggle(run.id)}
                  style={{ cursor: 'pointer', transition: 'background 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <td style={{ ...tdStyle, color: 'rgba(255,255,255,0.25)', fontSize: 12, fontFamily: 'monospace' }}>
                    {run.issue_number ? `#${run.issue_number}` : `—`}
                  </td>
                  <td style={{ ...tdStyle, maxWidth: 280 }}>
                    <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: 500 }}>
                      {run.issue_title || '—'}
                    </div>
                  </td>
                  <td style={{ ...tdStyle, fontFamily: 'monospace', fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
                    {run.repo_name || '—'}
                  </td>
                  <td style={tdStyle}>
                    <Badge decision={run.review_decision} />
                  </td>
                  <td style={{ ...tdStyle, textAlign: 'center' }}>
                    {run.iterations ?? '—'}
                  </td>
                  <td style={tdStyle}>
                    {run.tests_total != null ? (
                      <span style={{ fontFamily: 'monospace', fontSize: 12 }}>
                        <span style={{ color: '#4ade80' }}>{run.tests_passed}</span>
                        <span style={{ color: 'rgba(255,255,255,0.2)' }}>/</span>
                        <span style={{ color: 'rgba(255,255,255,0.5)' }}>{run.tests_total}</span>
                      </span>
                    ) : '—'}
                  </td>
                  <td style={{ ...tdStyle, fontSize: 12, color: 'rgba(255,255,255,0.35)', whiteSpace: 'nowrap' }}>
                    {fmtDate(run.created_at)}
                  </td>
                </tr>,
                expanded === run.id && <ExpandedRow key={`exp-${run.id}`} run={run} />
              ])}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
