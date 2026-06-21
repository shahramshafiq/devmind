export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(255,255,255,0.06)',
      padding: '44px 48px',
      background: '#080808',
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: 24,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 7,
            background: '#ff4500',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 12px rgba(255,69,0,0.4)',
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <span style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 15, fontWeight: 800, color: '#ffffff', letterSpacing: '-0.03em',
          }}>
            DevMind
          </span>
        </div>

        <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.2)', textAlign: 'center' }}>
          Multi-Agent Autonomous Code Engineer. Powered by LangGraph, FastAPI, ChromaDB, and Groq.
        </p>

        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.14)' }}>
          © 2026 DevMind
        </p>
      </div>
    </footer>
  )
}
