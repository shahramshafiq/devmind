const NOISE_BG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id:  i,
  x:   (i * 19 + 9)  % 96,
  y:   (i * 27 + 13) % 93,
  sz:  (i % 3) + 1,
  del: ((i * 0.6) % 7).toFixed(2),
  dur: 14 + (i % 12),
  col: ['#ff6b35', '#ff4500', '#ff8c00', '#ff5c28', '#ff7a00'][i % 5],
}))

export default function Background() {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 0,
      pointerEvents: 'none', overflow: 'hidden',
      background: '#0a0a0a',
    }}>

      {/* Grain noise texture */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: NOISE_BG,
        backgroundRepeat: 'repeat',
        backgroundSize: '400px 400px',
        opacity: 0.06,
      }} />

      {/* Top orange accent line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg, transparent 0%, rgba(255,69,0,0.4) 10%, rgba(255,107,0,0.9) 28%, #ff4500 50%, rgba(255,107,0,0.9) 72%, rgba(255,69,0,0.4) 90%, transparent 100%)',
        animation: 'grad-shift 5s ease-in-out infinite',
      }} />

      {/* Orb 1 — deep orange-red, upper-left */}
      <div style={{
        position: 'absolute', top: -300, left: -200,
        width: 1100, height: 950, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(200,50,0,0.22) 0%, rgba(200,50,0,0.06) 40%, transparent 68%)',
        filter: 'blur(60px)',
        animation: 'orb-drift-1 26s ease-in-out infinite',
      }} />

      {/* Orb 2 — vivid orange, upper-right */}
      <div style={{
        position: 'absolute', top: '2%', right: -240,
        width: 900, height: 820, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,107,0,0.18) 0%, rgba(255,107,0,0.05) 45%, transparent 68%)',
        filter: 'blur(65px)',
        animation: 'orb-drift-2 33s ease-in-out infinite',
      }} />

      {/* Orb 3 — centre amber mega-glow */}
      <div style={{
        position: 'absolute', top: '22%', left: '50%',
        width: 1200, height: 650, borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(255,69,0,0.08) 0%, transparent 58%)',
        filter: 'blur(90px)',
        animation: 'orb-drift-3 42s ease-in-out infinite',
      }} />

      {/* Orb 4 — amber, lower-left */}
      <div style={{
        position: 'absolute', bottom: -200, left: '15%',
        width: 880, height: 760, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,140,0,0.14) 0%, rgba(255,140,0,0.03) 45%, transparent 68%)',
        filter: 'blur(78px)',
        animation: 'orb-drift-1 38s ease-in-out infinite reverse',
      }} />

      {/* Orb 5 — deep red, mid-right */}
      <div style={{
        position: 'absolute', top: '48%', right: '5%',
        width: 540, height: 540, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(180,30,0,0.13) 0%, transparent 65%)',
        filter: 'blur(52px)',
        animation: 'orb-drift-2 28s ease-in-out infinite reverse',
      }} />

      {/* Radial dot grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '36px 36px',
        opacity: 0.22,
      }} />

      {/* Glowing orange particles */}
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

      {/* Radial vignette */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 50% 38%, transparent 26%, rgba(10,10,10,0.75) 100%)',
      }} />

      {/* Bottom fade */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '28%',
        background: 'linear-gradient(to bottom, transparent, rgba(10,10,10,0.6))',
      }} />

    </div>
  )
}
