import { useState } from 'react'

const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="rgba(255,255,255,0.3)" style={{ flexShrink: 0 }}>
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
)

export default function InputPanel({ issueUrl, setIssueUrl, onRun }) {
  const [focused, setFocused] = useState(false)
  const valid = issueUrl.includes('github.com') && issueUrl.includes('/issues/')

  return (
    <section className="su6" style={{ maxWidth: 660, margin: '0 auto', padding: '0 24px 80px' }}>

      {/* Input wrapper */}
      <div style={{
        background: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: `1px solid ${focused ? 'rgba(168,85,247,0.38)' : 'rgba(255,255,255,0.08)'}`,
        borderRadius: 16, padding: 4,
        transition: 'border-color 0.2s, box-shadow 0.2s',
        ...(focused ? { boxShadow: '0 0 0 3px rgba(124,58,237,0.1), 0 0 32px rgba(124,58,237,0.13)' } : {}),
      }}>
        <div style={{ display: 'flex', alignItems: 'center', padding: '10px 10px 10px 18px', gap: 10 }}>
          <GithubIcon />

          <input
            type="url"
            value={issueUrl}
            onChange={e => setIssueUrl(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onKeyDown={e => e.key === 'Enter' && valid && onRun()}
            placeholder="https://github.com/owner/repo/issues/42"
            style={{
              flex: 1, background: 'transparent', border: 'none', outline: 'none',
              color: '#f1f0ff', fontSize: 15,
              fontFamily: "'JetBrains Mono', monospace",
              caretColor: '#a855f7',
            }}
          />

          <button
            onClick={onRun}
            disabled={!valid}
            className={valid ? 'glow-btn' : ''}
            style={{
              padding: '11px 22px', border: 'none', borderRadius: 11,
              color: valid ? 'white' : 'rgba(255,255,255,0.22)',
              fontSize: 14, fontWeight: 700,
              cursor: valid ? 'pointer' : 'not-allowed',
              background: valid ? undefined : 'rgba(255,255,255,0.04)',
              whiteSpace: 'nowrap', letterSpacing: '0.01em',
              transition: 'all 0.2s',
            }}
          >
            Run DevMind →
          </button>
        </div>
      </div>

      {/* Hint */}
      <p style={{ textAlign: 'center', marginTop: 13, fontSize: 12, color: 'rgba(255,255,255,0.18)' }}>
        Press <kbd style={{ padding: '1px 5px', background: 'rgba(255,255,255,0.06)', borderRadius: 4, border: '1px solid rgba(255,255,255,0.08)', fontSize: 11 }}>Enter</kbd> to run · Backend must be running at localhost:8000
      </p>

    </section>
  )
}
