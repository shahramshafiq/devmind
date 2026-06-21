export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(255,255,255,0.055)',
      padding: '40px 32px',
    }}>
      <div style={{
        maxWidth: 1160, margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: 20,
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <div style={{
            width: 26, height: 26, borderRadius: 7,
            background: 'linear-gradient(135deg, #ff4500 0%, #ff8c00 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <span style={{ fontSize: 14.5, fontWeight: 700, color: '#f1f0ff', letterSpacing: '-0.03em' }}>DevMind</span>
        </div>

        <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.2)', textAlign: 'center' }}>
          Multi-Agent Autonomous Code Engineer. Powered by LangGraph, FastAPI, ChromaDB, and Groq.
        </p>

        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.14)' }}>
          © 2025 DevMind
        </p>
      </div>
    </footer>
  )
}
