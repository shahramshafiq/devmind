import { useState } from 'react'
import useWindowWidth from '../hooks/useWindowWidth'

const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="rgba(255,255,255,0.28)" style={{ flexShrink: 0 }}>
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
)

export default function InputPanel({ issueUrl, setIssueUrl, onRun }) {
  const [focused, setFocused] = useState(false)
  const vw = useWindowWidth()
  const isMob = vw < 480
  const valid = issueUrl.includes('github.com') && issueUrl.includes('/issues/')

  return (
    <section className="su6" style={{ maxWidth: 680, margin: '0 auto', padding: isMob ? '0 0 60px' : '0 24px 80px' }}>

      <div style={{
        background: '#111111',
        border: `1px solid ${focused ? 'rgba(255,69,0,0.45)' : 'rgba(255,255,255,0.09)'}`,
        borderRadius: 16, padding: 4,
        boxShadow: focused ? '0 0 0 3px rgba(255,69,0,0.08), 0 0 36px rgba(255,69,0,0.1)' : 'none',
        transition: 'border-color 0.2s, box-shadow 0.2s',
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
            placeholder={isMob ? 'github.com/.../issues/42' : 'https://github.com/owner/repo/issues/42'}
            style={{
              flex: 1, background: 'transparent', border: 'none', outline: 'none',
              color: '#ffffff', fontSize: 15,
              fontFamily: "'JetBrains Mono', monospace",
              caretColor: '#ff4500',
              minWidth: 0,
            }}
          />

          {!isMob && (
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
                fontFamily: 'Inter, sans-serif',
              }}
            >
              Run DevMind
            </button>
          )}
        </div>

        {isMob && (
          <div style={{ padding: '0 6px 6px' }}>
            <button
              onClick={onRun}
              disabled={!valid}
              className={valid ? 'glow-btn' : ''}
              style={{
                width: '100%', padding: '13px', border: 'none', borderRadius: 12,
                color: valid ? 'white' : 'rgba(255,255,255,0.22)',
                fontSize: 14, fontWeight: 700,
                cursor: valid ? 'pointer' : 'not-allowed',
                background: valid ? undefined : 'rgba(255,255,255,0.04)',
                letterSpacing: '0.01em',
                transition: 'all 0.2s',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              Run DevMind
            </button>
          </div>
        )}
      </div>

      <p style={{ textAlign: 'center', marginTop: 14, fontSize: 12, color: 'rgba(255,255,255,0.2)' }}>
        Press{' '}
        <kbd style={{
          padding: '1px 6px',
          background: '#111111',
          borderRadius: 5,
          border: '1px solid rgba(255,255,255,0.08)',
          fontSize: 11,
          color: 'rgba(255,255,255,0.35)',
          fontFamily: "'JetBrains Mono', monospace",
        }}>Enter</kbd>{' '}
        to run · Paste any public GitHub issue URL
      </p>

    </section>
  )
}
