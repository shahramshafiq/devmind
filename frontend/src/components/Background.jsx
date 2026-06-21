import { useEffect, useRef } from 'react'

const NOISE = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`

function ParticleCanvas() {
  const ref = useRef(null)
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const cvs = ref.current
    if (!cvs) return
    const ctx = cvs.getContext('2d')

    const onMove = e => { mouse.current = { x: e.clientX, y: e.clientY } }
    window.addEventListener('mousemove', onMove, { passive: true })

    const resize = () => {
      cvs.width = window.innerWidth
      cvs.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    const N = 85
    const pts = Array.from({ length: N }, () => ({
      x: Math.random() * cvs.width,
      y: Math.random() * cvs.height,
      z: 0.2 + Math.random() * 0.8,
      vx: (Math.random() - 0.5) * 1.1,
      vy: (Math.random() - 0.5) * 1.1,
    }))

    let raf
    const tick = () => {
      ctx.clearRect(0, 0, cvs.width, cvs.height)

      const hw = cvs.width / 2
      const hh = cvs.height / 2
      const mx = mouse.current.x || hw
      const my = mouse.current.y || hh

      const disp = pts.map(p => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < -10) p.x = cvs.width + 10
        if (p.x > cvs.width + 10) p.x = -10
        if (p.y < -10) p.y = cvs.height + 10
        if (p.y > cvs.height + 10) p.y = -10
        return {
          x: p.x + (mx - hw) * p.z * 0.028,
          y: p.y + (my - hh) * p.z * 0.028,
          z: p.z,
        }
      })

      ctx.lineWidth = 0.7
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = disp[i].x - disp[j].x
          const dy = disp[i].y - disp[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < 180) {
            const a = (1 - d / 180) * 0.22 * ((disp[i].z + disp[j].z) / 2)
            ctx.beginPath()
            ctx.moveTo(disp[i].x, disp[i].y)
            ctx.lineTo(disp[j].x, disp[j].y)
            ctx.strokeStyle = `rgba(255,69,0,${a})`
            ctx.stroke()
          }
        }
      }

      disp.forEach(p => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, 1.0 + p.z * 2.8, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,${Math.round(55 + p.z * 65)},0,${0.3 + p.z * 0.6})`
        ctx.fill()
      })

      raf = requestAnimationFrame(tick)
    }
    tick()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <canvas ref={ref} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 1 }} />
  )
}

const RINGS = [
  { size: 220, top: '12%', left: '4%',  dur: 8,  del: 0 },
  { size: 140, top: '55%', right: '5%', dur: 10, del: -3 },
  { size: 100, top: '30%', right: '18%',dur: 7,  del: -1 },
  { size: 70,  top: '70%', left: '20%', dur: 9,  del: -5 },
]

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

      {/* 3D perspective grid */}
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
          animation: 'grid-scroll 3.5s linear infinite',
        }} />
      </div>

      {/* Grid fade top + bottom */}
      <div style={{
        position: 'absolute', inset: 0,
        background:
          'linear-gradient(to bottom,' +
          '#080808 0%,' +
          'transparent 38%,' +
          'transparent 75%,' +
          '#080808 100%)',
      }} />

      {/* Particle network with mouse parallax */}
      <ParticleCanvas />

      {/* Floating wireframe rings */}
      {RINGS.map((r, i) => (
        <div key={i} style={{
          position: 'absolute',
          top: r.top, left: r.left, right: r.right,
          width: r.size, height: r.size,
          borderRadius: '50%',
          border: '1px solid rgba(255,69,0,0.09)',
          animation: `orb-float ${r.dur}s ease-in-out ${r.del}s infinite`,
          opacity: 0.65,
          flexShrink: 0,
        }}>
          <div style={{
            position: 'absolute', inset: '22%',
            borderRadius: '50%',
            border: '1px solid rgba(255,69,0,0.06)',
          }}>
            <div style={{
              position: 'absolute', inset: '30%',
              borderRadius: '50%',
              border: '1px solid rgba(255,69,0,0.04)',
            }} />
          </div>
        </div>
      ))}

      {/* Ambient orange orbs */}
      <div style={{
        position: 'absolute', top: '18%', right: '12%',
        width: 520, height: 520, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,55,0,0.09) 0%, transparent 68%)',
        filter: 'blur(48px)',
        animation: 'orb-float 8s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute', bottom: '28%', left: '8%',
        width: 420, height: 420, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,120,0,0.07) 0%, transparent 68%)',
        filter: 'blur(56px)',
        animation: 'orb-float 11s ease-in-out infinite reverse',
      }} />
      <div style={{
        position: 'absolute', top: '60%', right: '40%',
        width: 300, height: 300, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(200,40,0,0.05) 0%, transparent 65%)',
        filter: 'blur(40px)',
        animation: 'orb-float 13s ease-in-out infinite 2s',
      }} />

    </div>
  )
}
