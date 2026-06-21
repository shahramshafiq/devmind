import { motion } from 'framer-motion'

const TECH_STACK = ['LangGraph', 'FastAPI', 'ChromaDB', 'Groq', 'GitHub']

const AGENTS = [
  { label: 'Issue Analyst', color: '#ff6b35' },
  { label: 'Architect',     color: '#ff8c42' },
  { label: 'Developer',     color: '#ffab3e' },
  { label: 'QA Engineer',   color: '#ff5c28' },
  { label: 'Code Critic',   color: '#ff4500' },
  { label: 'PR Writer',     color: '#e03500' },
]

export default function Hero() {
  const scrollTry = () => document.getElementById('try-it')?.scrollIntoView({ behavior: 'smooth' })
  const scrollHow = () => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="hero" style={{ position: 'relative', minHeight: 'calc(100vh - 64px)', overflow: 'hidden' }}>

      {/* ── Dramatic hero background visual ── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>

        {/* Main orange radial glow — upper right */}
        <div style={{
          position: 'absolute',
          top: '-10%', right: '-5%',
          width: '65%', height: '110%',
          background: 'radial-gradient(ellipse at 60% 35%, rgba(210,70,0,0.95) 0%, rgba(170,40,0,0.80) 18%, rgba(100,18,0,0.55) 38%, rgba(40,6,0,0.25) 60%, transparent 80%)',
          animation: 'hero-glow-pulse 6s ease-in-out infinite',
        }} />

        {/* Secondary warm layer */}
        <div style={{
          position: 'absolute',
          top: '10%', right: '5%',
          width: '50%', height: '70%',
          background: 'radial-gradient(ellipse at 50% 30%, rgba(255,120,0,0.35) 0%, rgba(200,60,0,0.15) 40%, transparent 70%)',
          filter: 'blur(40px)',
        }} />

        {/* Geometric light columns (vertical lines) */}
        {[62, 72, 80].map((left, i) => (
          <div key={i} style={{
            position: 'absolute',
            top: 0, bottom: 0,
            left: `${left}%`,
            width: 1,
            background: `linear-gradient(to bottom, transparent, rgba(255,${100 - i * 20},0,${0.22 - i * 0.06}) 20%, rgba(255,${80 - i * 20},0,${0.12 - i * 0.03}) 70%, transparent)`,
          }} />
        ))}

        {/* Horizontal scan line */}
        <div style={{
          position: 'absolute',
          top: '28%', left: '40%', right: 0,
          height: 1,
          background: 'linear-gradient(to right, transparent, rgba(255,120,0,0.18) 30%, rgba(255,160,0,0.3) 60%, rgba(255,100,0,0.1) 90%, transparent)',
        }} />

        {/* Dark left overlay so text stays readable */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, #080808 38%, rgba(8,8,8,0.88) 52%, rgba(8,8,8,0.35) 72%, transparent 100%)',
        }} />

        {/* Bottom fade to body */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '22%',
          background: 'linear-gradient(to bottom, transparent, #080808)',
        }} />
      </div>

      {/* ── Content ── */}
      <div style={{ position: 'relative', zIndex: 2, maxWidth: 1200, margin: '0 auto', padding: '100px 48px 0' }}>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}>

          {/* Label */}
          <div className="section-label" style={{ marginBottom: 28 }}>
            Multi-agent autonomous code engineer
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 'clamp(50px, 7.5vw, 96px)',
            fontWeight: 800,
            lineHeight: 1.0,
            letterSpacing: '-0.04em',
            color: '#ffffff',
            marginBottom: 28,
            maxWidth: 640,
          }}>
            From GitHub<br />
            Issue to<br />
            <em className="display-italic" style={{
              fontSize: '0.92em',
              color: 'rgba(255,255,255,0.82)',
              letterSpacing: '-0.02em',
            }}>
              Merged PR.
            </em>
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: 16, lineHeight: 1.72,
            color: 'rgba(255,255,255,0.48)',
            maxWidth: 420, marginBottom: 44,
            fontWeight: 400,
          }}>
            Paste a GitHub issue URL. DevMind's 6-agent pipeline analyzes your codebase, writes production code, runs tests, reviews it, and opens a real pull request automatically.
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 64, flexWrap: 'wrap' }}>
            <button className="btn-primary" onClick={scrollTry}>
              Get started
              <span style={{
                width: 26, height: 26, borderRadius: '50%',
                background: 'rgba(255,255,255,0.22)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </span>
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ display: 'flex' }}>
                {AGENTS.slice(0, 3).map((a, i) => (
                  <div key={i} style={{
                    width: 34, height: 34, borderRadius: '50%',
                    background: a.color,
                    border: '2px solid #080808',
                    marginLeft: i > 0 ? -10 : 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, fontWeight: 800,
                    color: '#fff',
                    flexShrink: 0,
                    zIndex: 3 - i,
                    position: 'relative',
                  }}>
                    {a.label[0]}
                  </div>
                ))}
              </div>
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 600, color: '#ffffff', lineHeight: 1.3 }}>800+ Repos indexed</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.38)', marginTop: 1 }}>across 3+ years</div>
              </div>
            </div>
          </div>

          {/* Stat cards */}
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 80 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}
              style={{
                padding: '24px 28px', borderRadius: 16,
                background: '#111111', border: '1px solid rgba(255,255,255,0.07)',
                minWidth: 155,
              }}
            >
              <div style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 42, fontWeight: 800, lineHeight: 1,
                color: '#ffffff', letterSpacing: '-0.04em',
              }}>6</div>
              <div style={{
                marginTop: 6, fontSize: 11,
                color: 'rgba(255,255,255,0.38)', fontWeight: 500,
                letterSpacing: '0.05em', textTransform: 'uppercase',
              }}>
                Specialized Agents
              </div>
              <div style={{
                marginTop: 18, width: 22, height: 22, borderRadius: '50%',
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.06)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42, duration: 0.6 }}
              style={{
                padding: '24px 28px', borderRadius: 16,
                background: '#ff4500',
                minWidth: 155,
              }}
            >
              <div style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 42, fontWeight: 800, lineHeight: 1,
                color: '#ffffff', letterSpacing: '-0.04em',
              }}>RAG</div>
              <div style={{
                marginTop: 6, fontSize: 11,
                color: 'rgba(255,255,255,0.72)', fontWeight: 500,
                letterSpacing: '0.05em', textTransform: 'uppercase',
              }}>
                Codebase Indexing
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.54, duration: 0.6 }}
              style={{
                padding: '24px 28px', borderRadius: 16,
                background: '#111111', border: '1px solid rgba(255,255,255,0.07)',
                minWidth: 155,
              }}
            >
              <div style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 42, fontWeight: 800, lineHeight: 1,
                color: '#ffffff', letterSpacing: '-0.04em',
              }}>Real</div>
              <div style={{
                marginTop: 6, fontSize: 11,
                color: 'rgba(255,255,255,0.38)', fontWeight: 500,
                letterSpacing: '0.05em', textTransform: 'uppercase',
              }}>
                GitHub PRs
              </div>
            </motion.div>
          </div>

        </motion.div>
      </div>

      {/* Partner logos bar */}
      <div style={{
        position: 'relative', zIndex: 2,
        maxWidth: 1200, margin: '0 auto',
        padding: '20px 48px 36px',
        display: 'flex', alignItems: 'center', gap: 32, flexWrap: 'wrap',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}>
        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.22)', fontWeight: 500, marginRight: 8 }}>Powered by</span>
        {TECH_STACK.map(t => (
          <span key={t} style={{
            fontSize: 13, fontWeight: 600,
            color: 'rgba(255,255,255,0.28)',
            letterSpacing: '0.02em',
          }}>{t}</span>
        ))}
      </div>

    </section>
  )
}
