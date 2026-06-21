import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

function NavBtn({ children, active, onClick }) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '6px 14px', borderRadius: 8,
        fontSize: 13, fontWeight: 500,
        border: 'none', cursor: 'pointer',
        transition: 'all 0.15s ease',
        background: active ? 'rgba(255,69,0,0.12)' : hovered ? 'rgba(255,255,255,0.05)' : 'transparent',
        color: active ? '#ff8c42' : hovered ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.4)',
      }}
    >
      {children}
    </button>
  )
}

export default function Header({ backendOk, page, setPage }) {
  const [scrolled, setScrolled] = useState(false)
  const [tryHovered, setTryHovered] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const goHome = () => {
    setPage('home')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollTo = id => {
    setPage('home')
    setTimeout(() => {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)
  }

  const statusColor = backendOk === null ? 'rgba(255,255,255,0.25)' : backendOk ? '#4ade80' : '#f87171'
  const statusBg    = backendOk ? 'rgba(74,222,128,0.07)' : 'rgba(255,255,255,0.04)'
  const statusBdr   = backendOk ? 'rgba(74,222,128,0.18)' : 'rgba(255,255,255,0.07)'
  const statusLabel = backendOk === null ? 'Connecting' : backendOk ? 'Online' : 'Offline'

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        position: 'sticky', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '0 32px',
        height: 62,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled ? 'rgba(5,5,8,0.88)' : 'rgba(5,5,8,0.5)',
        backdropFilter: 'blur(22px) saturate(160%)',
        WebkitBackdropFilter: 'blur(22px) saturate(160%)',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        transition: 'background 0.3s, border-color 0.3s',
      }}
    >
      {/* Logo */}
      <div
        style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', userSelect: 'none' }}
        onClick={goHome}
      >
        <div style={{
          width: 33, height: 33, borderRadius: 9,
          background: 'linear-gradient(135deg, #ff4500 0%, #ff8c00 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 18px rgba(255,69,0,0.45)',
          flexShrink: 0,
        }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
        </div>
        <div>
          <div style={{ fontSize: 16, fontWeight: 800, letterSpacing: '-0.04em', color: '#f1f0ff', lineHeight: 1 }}>
            Dev<span className="text-gradient">Mind</span>
          </div>
          <div style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.18)', letterSpacing: '0.1em', marginTop: 2, fontWeight: 600 }}>
            AI CODE ENGINEER
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <NavBtn active={page === 'home'} onClick={goHome}>Home</NavBtn>
        <NavBtn active={false} onClick={() => scrollTo('how-it-works')}>How it works</NavBtn>
        <NavBtn active={false} onClick={() => scrollTo('features')}>Features</NavBtn>
        <NavBtn active={page === 'history'} onClick={() => setPage('history')}>History</NavBtn>
      </nav>

      {/* Right side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '4px 12px',
          background: statusBg,
          border: `1px solid ${statusBdr}`,
          borderRadius: 20,
          fontSize: 12, fontWeight: 500, color: statusColor,
          transition: 'all 0.35s',
        }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: statusColor }} />
          {statusLabel}
        </div>

        <button
          onClick={() => scrollTo('try-it')}
          onMouseEnter={() => setTryHovered(true)}
          onMouseLeave={() => setTryHovered(false)}
          style={{
            padding: '7px 18px',
            background: 'linear-gradient(135deg, #ff4500 0%, #ff8c00 100%)',
            border: 'none', borderRadius: 9,
            color: 'white', fontSize: 13, fontWeight: 600,
            cursor: 'pointer',
            boxShadow: tryHovered ? '0 0 28px rgba(255,69,0,0.65)' : '0 0 16px rgba(255,69,0,0.38)',
            transform: tryHovered ? 'translateY(-1px)' : 'translateY(0)',
            transition: 'box-shadow 0.2s, transform 0.15s',
          }}
        >
          Try it free
        </button>
      </div>
    </motion.header>
  )
}
