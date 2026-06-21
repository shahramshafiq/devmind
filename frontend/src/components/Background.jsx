const NOISE = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`

export default function Background() {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 0,
      pointerEvents: 'none',
      background: '#080808',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: NOISE,
        backgroundRepeat: 'repeat',
        backgroundSize: '400px 400px',
        opacity: 0.035,
        mixBlendMode: 'screen',
      }} />
    </div>
  )
}
