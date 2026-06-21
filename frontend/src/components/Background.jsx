import { useEffect, useRef } from 'react'

const NOISE = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`

function ParticleCanvas() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let w = (canvas.width  = window.innerWidth)
    let h = (canvas.height = window.innerHeight)

    const COUNT = 55
    const pts = Array.from({ length: COUNT }, () => ({
      x:  Math.random() * w,
      y:  Math.random() * h,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r:  Math.random() * 1.5 + 0.5,
    }))

    let raf

    function draw() {
      ctx.clearRect(0, 0, w, h)

      for (let i = 0; i < COUNT; i++) {
        for (let j = i + 1; j < COUNT; j++) {
          const dx   = pts[i].x - pts[j].x
          const dy   = pts[i].y - pts[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 170) {
            const alpha = (1 - dist / 170) * 0.18
            ctx.strokeStyle = `rgba(255,80,20,${alpha})`
            ctx.lineWidth   = 0.8
            ctx.beginPath()
            ctx.moveTo(pts[i].x, pts[i].y)
            ctx.lineTo(pts[j].x, pts[j].y)
            ctx.stroke()
          }
        }
      }

      for (const p of pts) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,100,30,0.5)`
        ctx.fill()

        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1
      }

      raf = requestAnimationFrame(draw)
    }

    draw()

    const onResize = () => {
      w = canvas.width  = window.innerWidth
      h = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', onResize, { passive: true })

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        opacity: 0.6,
      }}
    />
  )
}

export default function Background() {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 0,
      pointerEvents: 'none',
      background: '#080808',
      overflow: 'hidden',
    }}>

      {/* Film grain */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: NOISE,
        backgroundRepeat: 'repeat',
        backgroundSize: '400px 400px',
        opacity: 0.032,
        mixBlendMode: 'screen',
      }} />

      {/* 3-D perspective grid — scrolls toward viewer */}
      <div style={{
        position: 'absolute',
        top: '44%', left: '-80%', right: '-80%', bottom: '-40%',
        perspective: '600px',
        perspectiveOrigin: '50% 0%',
        overflow: 'visible',
      }}>
        <div style={{
          width: '100%', height: '100%',
          backgroundImage:
            'linear-gradient(rgba(255,69,0,0.11) 1px, transparent 1px),' +
            'linear-gradient(90deg, rgba(255,69,0,0.11) 1px, transparent 1px)',
          backgroundSize: '90px 90px',
          transform: 'rotateX(72deg)',
          transformOrigin: '50% 0%',
          animation: 'grid-scroll 7s linear infinite',
        }} />
      </div>

      {/* Fade grid — top & bottom */}
      <div style={{
        position: 'absolute', inset: 0,
        background:
          'linear-gradient(to bottom,' +
          '#080808 0%,' +
          'transparent 38%,' +
          'transparent 75%,' +
          '#080808 100%)',
      }} />

      {/* Particle network */}
      <ParticleCanvas />

      {/* Ambient orange orbs */}
      <div style={{
        position: 'absolute', top: '18%', right: '12%',
        width: 520, height: 520, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,55,0,0.09) 0%, transparent 68%)',
        filter: 'blur(48px)',
        animation: 'orb-float 18s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute', bottom: '28%', left: '8%',
        width: 420, height: 420, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,120,0,0.07) 0%, transparent 68%)',
        filter: 'blur(56px)',
        animation: 'orb-float 24s ease-in-out infinite reverse',
      }} />
      <div style={{
        position: 'absolute', top: '60%', right: '40%',
        width: 300, height: 300, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(200,40,0,0.05) 0%, transparent 65%)',
        filter: 'blur(40px)',
        animation: 'orb-float 30s ease-in-out infinite 4s',
      }} />

    </div>
  )
}
