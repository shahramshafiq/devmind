const PARTICLES = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  x:   (i * 13 + 7)  % 97,
  y:   (i * 17 + 11) % 95,
  sz:  (i % 3) + 1,
  del: ((i * 0.42) % 5).toFixed(1),
  dur: 12 + (i % 9),
  col: ['#7c3aed', '#a855f7', '#e879f9'][i % 3],
}))

export default function Background() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>

      {/* HD nebula background image */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'url("/nebula.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        opacity: 0.32,
        filter: 'saturate(1.4) hue-rotate(20deg)',
      }} />

      {/* Dot grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: [
          'linear-gradient(rgba(255,255,255,0.016) 1px, transparent 1px)',
          'linear-gradient(90deg, rgba(255,255,255,0.016) 1px, transparent 1px)',
        ].join(','),
        backgroundSize: '64px 64px',
      }} />

      {/* Orb 1 — deep violet, top-left */}
      <div style={{
        position: 'absolute', top: -220, left: -160,
        width: 900, height: 900, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(109,40,217,0.2) 0%, transparent 70%)',
        filter: 'blur(72px)',
        animation: 'orb-drift-1 24s ease-in-out infinite',
      }} />

      {/* Orb 2 — purple, center-right */}
      <div style={{
        position: 'absolute', top: '12%', right: -120,
        width: 680, height: 680, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(168,85,247,0.14) 0%, transparent 70%)',
        filter: 'blur(65px)',
        animation: 'orb-drift-2 30s ease-in-out infinite',
      }} />

      {/* Orb 3 — fuchsia, bottom-center */}
      <div style={{
        position: 'absolute', bottom: -170, left: '32%',
        width: 780, height: 780, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(232,121,249,0.11) 0%, transparent 70%)',
        filter: 'blur(85px)',
        animation: 'orb-drift-3 36s ease-in-out infinite',
      }} />

      {/* Floating particles */}
      {PARTICLES.map(p => (
        <div key={p.id} style={{
          position: 'absolute',
          left: `${p.x}%`, top: `${p.y}%`,
          width: p.sz, height: p.sz, borderRadius: '50%',
          background: p.col,
          animation: `particle-float ${p.dur}s ${p.del}s ease-in-out infinite`,
        }} />
      ))}

      {/* Edge vignette */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 50% 50%, transparent 35%, rgba(6,4,15,0.75) 100%)',
      }} />
    </div>
  )
}
