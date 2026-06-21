import { useState, useEffect } from 'react'

const API = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export default function IndexedRepos() {
  const [repos, setRepos] = useState([])

  useEffect(() => {
    fetch(`${API}/api/indexed-repos`)
      .then(r => r.json())
      .then(d => setRepos(d.repos || []))
      .catch(() => {})
  }, [])

  if (repos.length === 0) return null

  return (
    <div style={{ maxWidth: 660, margin: '0 auto', padding: '0 24px 32px' }}>
      <div style={{
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: 12, padding: '13px 18px',
      }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.08em', marginBottom: 10 }}>
          CACHED REPOS / READY TO RUN
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
          {repos.map(r => (
            <span key={r} style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              padding: '4px 10px', borderRadius: 20, fontSize: 12,
              background: 'rgba(255,69,0,0.08)',
              border: '1px solid rgba(255,69,0,0.2)',
              color: '#ff8c42', fontFamily: "'JetBrains Mono', monospace",
            }}>
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
              {r.replace(/_/g, '/')}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
