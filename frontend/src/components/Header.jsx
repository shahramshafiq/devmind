import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

function NavItem({ label, hasArrow, active, onClick }) {
  const [h, setH] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 4,
        padding: '6px 14px',
        background: active ? 'rgba(255,69,0,0.1)' : h ? 'rgba(255,255,255,0.06)' : 'transparent',
        border: '1px solid',
        borderColor: active ? 'rgba(255,69,0,0.25)' : h ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.07)',
        borderRadius: 100,
        color: active ? '#ff8c42' : h ? '#ffffff' : 'rgba(255,255,255,0.55)',
        fontSize: 13, fontWeight: 500,
        cursor: 'pointer', fontFamily: 'Inter, sans-serif',
        transition: 'all 0.15s',
      }}
    >
      {label}
      {hasArrow && (
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      )}
    </button>
  )
}

export default function Header({ backendOk, page, setPage }) {
  const [scrolled, setScrolled] = useState(false)
  const [tryH, setTryH] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const goHome = () => { setPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const scrollTo = id => {
    setPage('home')
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50)
  }

  const statusColor = backendOk === null ? 'rgba(255,255,255,0.25)' : backendOk ? '#4ade80' : '#f87171'
  const statusLabel = backendOk === null ? 'Connecting' : backendOk ? 'Online' : 'Offline'

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        position: 'sticky', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '0 40px',
        height: 64,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled ? 'rgba(8,8,8,0.92)' : 'rgba(8,8,8,0.55)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent',
        transition: 'background 0.3s, border-color 0.3s',
      }}
    >
      {/* Logo */}
      <div
        style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', userSelect: 'none', flexShrink: 0 }}
        onClick={goHome}
      >
        <div style={{
          width: 32, height: 32, borderRadius: 8,
          background: '#ff4500',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 16px rgba(255,69,0,0.5)',
        }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
        </div>
        <span style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: 17, fontWeight: 800,
          letterSpacing: '-0.03em', color: '#ffffff',
        }}>
          DevMind
        </span>
      </div>

      {/* Nav */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <NavItem label="Features"     active={false}               onClick={() => scrollTo('features')} />
        <NavItem label="How It Works" active={false}               onClick={() => scrollTo('how-it-works')} />
        <NavItem label="About"        active={page === 'about'}    onClick={() => setPage('about')} />
        <NavItem label="Contact"      active={page === 'contact'}  onClick={() => setPage('contact')} />
        <NavItem label="History"      active={page === 'history'}  onClick={() => setPage('history')} />
      </nav>

      {/* Right */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          fontSize: 12, fontWeight: 500, color: statusColor,
        }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: statusColor }} />
          {statusLabel}
        </div>

        <button
          onClick={() => { setPage('contact') }}
          onMouseEnter={() => setTryH(true)}
          onMouseLeave={() => setTryH(false)}
          className="btn-white"
          style={{
            transform: tryH ? 'translateY(-1px)' : 'none',
            transition: 'transform 0.15s, background 0.15s',
          }}
        >
          Get Started
        </button>
      </div>
    </motion.header>
  )
}
