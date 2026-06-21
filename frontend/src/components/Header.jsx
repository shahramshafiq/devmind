import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useWindowWidth from '../hooks/useWindowWidth'

const ICONS = {
  Features: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
      <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
    </svg>
  ),
  'How It Works': (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/>
      <line x1="7" y1="12" x2="10" y2="12"/><line x1="14" y1="12" x2="17" y2="12"/>
    </svg>
  ),
  About: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
    </svg>
  ),
  Contact: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/>
    </svg>
  ),
  History: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 15"/>
    </svg>
  ),
}

const NAV = [
  { label: 'Features',     action: 'scroll', target: 'features' },
  { label: 'How It Works', action: 'scroll', target: 'how-it-works' },
  { label: 'About',        action: 'page',   target: 'about' },
  { label: 'Contact',      action: 'page',   target: 'contact' },
  { label: 'History',      action: 'page',   target: 'history' },
]

function NavItem({ item, active, onClick }) {
  const [hovered, setHovered] = useState(false)
  const [scanKey, setScanKey] = useState(0)

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => { setHovered(true); setScanKey(k => k + 1) }}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative', overflow: 'hidden',
        display: 'flex', alignItems: 'center', gap: 6,
        padding: '7px 15px',
        background: active ? '#ff4500' : hovered ? 'rgba(255,69,0,0.07)' : 'transparent',
        border: `1px solid ${active ? 'transparent' : hovered ? 'rgba(255,69,0,0.32)' : 'rgba(255,255,255,0.08)'}`,
        borderRadius: 100,
        color: active ? '#fff' : hovered ? '#fff' : 'rgba(255,255,255,0.5)',
        fontSize: 13, fontWeight: active ? 600 : 500,
        cursor: 'pointer', fontFamily: 'Inter, sans-serif',
        boxShadow: active
          ? '0 0 22px rgba(255,69,0,0.45), inset 0 1px 0 rgba(255,255,255,0.15)'
          : hovered ? '0 0 12px rgba(255,69,0,0.18)' : 'none',
        transition: 'background 0.18s, border-color 0.18s, color 0.18s, box-shadow 0.18s',
        letterSpacing: '-0.01em',
      }}
    >
      {/* Shimmer scan on hover */}
      {hovered && !active && (
        <motion.div
          key={scanKey}
          initial={{ x: '-100%' }}
          animate={{ x: '220%' }}
          transition={{ duration: 0.46, ease: 'easeOut' }}
          style={{
            position: 'absolute', top: 0, left: 0, width: '55%', height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,100,30,0.38), transparent)',
            pointerEvents: 'none',
          }}
        />
      )}
      <span style={{
        position: 'relative', zIndex: 1,
        color: active ? '#fff' : hovered ? '#ff8c42' : 'rgba(255,255,255,0.3)',
        display: 'flex', flexShrink: 0,
        transition: 'color 0.18s',
      }}>
        {ICONS[item.label]}
      </span>
      <span style={{ position: 'relative', zIndex: 1 }}>{item.label}</span>
    </button>
  )
}

export default function Header({ backendOk, page, setPage, setScreen }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const w = useWindowWidth()
  const isMobile = w < 768

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!isMobile) setMobileOpen(false)
  }, [isMobile])

  const goHome = () => { setPage('home'); setScreen?.('idle'); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  const handleNav = (item) => {
    if (item.action === 'scroll') {
      setPage('home')
      setScreen?.('idle')
      setTimeout(() => document.getElementById(item.target)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50)
    } else {
      setPage(item.target)
    }
    setMobileOpen(false)
  }

  const handleGetStarted = () => {
    setPage('home')
    setTimeout(() => document.getElementById('try-it')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50)
    setMobileOpen(false)
  }

  const isActive = (item) => item.action === 'page' && page === item.target

  const statusColor = backendOk === null ? 'rgba(255,255,255,0.25)' : backendOk ? '#4ade80' : '#f87171'
  const statusLabel = backendOk === null ? 'Connecting' : backendOk ? 'Online' : 'Offline'

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          position: 'sticky', top: 0, left: 0, right: 0, zIndex: 100,
          padding: isMobile ? '0 20px' : '0 40px',
          height: 64,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: scrolled ? 'rgba(8,8,8,0.94)' : 'rgba(8,8,8,0.55)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
          transition: 'background 0.3s, border-color 0.3s',
        }}
      >
        {/* Logo */}
        <div onClick={goHome} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', userSelect: 'none', flexShrink: 0 }}>
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

        {/* Desktop Nav */}
        {!isMobile && (
          <nav style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            {NAV.map(item => (
              <NavItem key={item.label} item={item} active={isActive(item)} onClick={() => handleNav(item)} />
            ))}
          </nav>
        )}

        {/* Right */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {!isMobile && (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 500, color: statusColor }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: statusColor }} />
                {statusLabel}
              </div>
              <button onClick={handleGetStarted} className="btn-white">Get Started</button>
            </>
          )}

          {isMobile && (
            <button
              onClick={() => setMobileOpen(v => !v)}
              aria-label="Toggle navigation"
              style={{
                width: 38, height: 38, borderRadius: 9,
                background: 'rgba(255,255,255,0.05)',
                border: `1px solid ${mobileOpen ? 'rgba(255,69,0,0.4)' : 'rgba(255,255,255,0.1)'}`,
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                justifyContent: 'center', gap: 5, cursor: 'pointer', padding: 0,
                transition: 'border-color 0.2s',
              }}
            >
              <span style={{
                display: 'block', width: 16, height: 1.5,
                background: mobileOpen ? '#ff4500' : 'rgba(255,255,255,0.7)',
                borderRadius: 2, transition: 'all 0.25s',
                transform: mobileOpen ? 'rotate(45deg) translate(4px, 4.5px)' : 'none',
              }} />
              <span style={{
                display: 'block', width: 16, height: 1.5,
                background: 'rgba(255,255,255,0.7)', borderRadius: 2,
                opacity: mobileOpen ? 0 : 1, transition: 'opacity 0.2s',
              }} />
              <span style={{
                display: 'block', width: 16, height: 1.5,
                background: mobileOpen ? '#ff4500' : 'rgba(255,255,255,0.7)',
                borderRadius: 2, transition: 'all 0.25s',
                transform: mobileOpen ? 'rotate(-45deg) translate(4px, -4.5px)' : 'none',
              }} />
            </button>
          )}
        </div>
      </motion.header>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {isMobile && mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              position: 'fixed', top: 64, left: 0, right: 0, zIndex: 99,
              background: 'rgba(8,8,8,0.98)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              borderBottom: '1px solid rgba(255,255,255,0.07)',
              overflow: 'hidden',
            }}
          >
            <div style={{ padding: '12px 20px 20px' }}>
              {NAV.map((item, i) => (
                <motion.button
                  key={item.label}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.2 }}
                  onClick={() => handleNav(item)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: 12,
                    padding: '13px 16px', marginBottom: 4, borderRadius: 12,
                    background: isActive(item) ? 'rgba(255,69,0,0.1)' : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${isActive(item) ? 'rgba(255,69,0,0.25)' : 'rgba(255,255,255,0.07)'}`,
                    color: isActive(item) ? '#ff7640' : 'rgba(255,255,255,0.7)',
                    fontSize: 14, fontWeight: isActive(item) ? 600 : 500,
                    cursor: 'pointer', fontFamily: 'Inter, sans-serif', textAlign: 'left',
                    transition: 'all 0.15s',
                  }}
                >
                  <span style={{ color: isActive(item) ? '#ff7640' : 'rgba(255,255,255,0.3)', display: 'flex' }}>
                    {ICONS[item.label]}
                  </span>
                  {item.label}
                  <svg style={{ marginLeft: 'auto', opacity: 0.25 }} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </motion.button>
              ))}
              <div style={{ marginTop: 8, paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: 12 }}>
                <button onClick={handleGetStarted} className="btn-primary" style={{ flex: 1, justifyContent: 'center', fontSize: 14 }}>
                  Get Started
                </button>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 500, color: statusColor, flexShrink: 0 }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: statusColor }} />
                  {statusLabel}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
