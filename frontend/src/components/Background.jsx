// SVG fractal noise — baked into a data URI so no external fetch needed
const NOISE_BG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`

const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id:  i,
  x:   (i * 19 + 9)  % 96,
  y:   (i * 27 + 13) % 93,
  sz:  (i % 3) + 1,
  del: ((i * 0.6) % 7).toFixed(2),
  dur: 14 + (i % 12),
  col: ['#818cf8', '#a855f7', '#e879f9', '#c084fc', '#fb7185'][i % 5],
}))

export default function Background() {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 0,
      pointerEvents: 'none', overflow: 'hidden',
      background: '#020206',
    }}>

      {/* ── Grain noise texture (the #1 premium touch) ───────────── */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: NOISE_BG,
        backgroundRepeat: 'repeat',
        backgroundSize: '400px 400px',
        opacity: 0.055,
      }} />

      {/* ── Top prismatic line ────────────────────────────────────── */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg, transparent 0%, rgba(124,58,237,0.5) 10%, rgba(139,92,246,0.9) 25%, rgba(192,132,252,1) 40%, rgba(232,121,249,1) 55%, rgba(192,132,252,1) 70%, rgba(139,92,246,0.9) 85%, transparent 100%)',
        animation: 'grad-shift 6s ease-in-out infinite',
      }} />

      {/* ── Orb 1 — deep violet, upper-left ─────────────────────── */}
      <div style={{
        position: 'absolute', top: -320, left: -220,
        width: 1100, height: 1000, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(109,40,217,0.28) 0%, rgba(109,40,217,0.08) 40%, transparent 68%)',
        filter: 'blur(55px)',
        animation: 'orb-drift-1 26s ease-in-out infinite',
      }} />

      {/* ── Orb 2 — vivid purple, right ──────────────────────────── */}
      <div style={{
        position: 'absolute', top: '5%', right: -240,
        width: 900, height: 820, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(168,85,247,0.22) 0%, rgba(168,85,247,0.06) 45%, transparent 68%)',
        filter: 'blur(62px)',
        animation: 'orb-drift-2 33s ease-in-out infinite',
      }} />

      {/* ── Orb 3 — centre mega glow (very subtle) ───────────────── */}
      <div style={{
        position: 'absolute', top: '18%', left: '50%', transform: 'translateX(-50%)',
        width: 1300, height: 700, borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(124,58,237,0.09) 0%, transparent 58%)',
        filter: 'blur(90px)',
        animation: 'orb-drift-3 42s ease-in-out infinite',
      }} />

      {/* ── Orb 4 — fuchsia, lower-left ──────────────────────────── */}
      <div style={{
        position: 'absolute', bottom: -180, left: '18%',
        width: 900, height: 780, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(232,121,249,0.16) 0%, rgba(232,121,249,0.04) 45%, transparent 68%)',
        filter: 'blur(75px)',
        animation: 'orb-drift-1 38s ease-in-out infinite reverse',
      }} />

      {/* ── Orb 5 — indigo accent, mid-right ─────────────────────── */}
      <div style={{
        position: 'absolute', top: '45%', right: '8%',
        width: 560, height: 560, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99,102,241,0.14) 0%, transparent 65%)',
        filter: 'blur(50px)',
        animation: 'orb-drift-2 28s ease-in-out infinite reverse',
      }} />

      {/* ── Radial dot grid (premium over line grid) ─────────────── */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.13) 1px, transparent 1px)',
        backgroundSize: '34px 34px',
        opacity: 0.28,
      }} />

      {/* ── Glowing particles ─────────────────────────────────────── */}
      {PARTICLES.map(p => (
        <div key={p.id} style={{
          position: 'absolute',
          left: `${p.x}%`, top: `${p.y}%`,
          width: p.sz + 1, height: p.sz + 1,
          borderRadius: '50%',
          background: p.col,
          boxShadow: `0 0 ${(p.sz + 2) * 5}px 1px ${p.col}99`,
          animation: `particle-float ${p.dur}s ${p.del}s ease-in-out infinite`,
        }} />
      ))}

      {/* ── Radial vignette ───────────────────────────────────────── */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 50% 40%, transparent 28%, rgba(2,2,6,0.72) 100%)',
      }} />

      {/* ── Bottom fade ───────────────────────────────────────────── */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '25%',
        background: 'linear-gradient(to bottom, transparent, rgba(2,2,6,0.55))',
      }} />

    </div>
  )
}
