import { useState } from 'react'
import { motion } from 'framer-motion'

const FEATURES = [
  {
    title: 'RAG Codebase Indexing',
    desc: 'The entire GitHub repository is indexed with ChromaDB and sentence-transformers before any agent writes a line of code. Every decision is grounded in your real codebase, not generic patterns.',
    color: '#ff6b35',
    accent: false,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <ellipse cx="12" cy="5" rx="9" ry="3"/>
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
      </svg>
    ),
  },
  {
    title: '6-Agent AI Pipeline',
    desc: 'Analyst, Architect, Developer, QA, Critic, and PR Writer — each specialized and handed full context from the one before.',
    color: '#ff8c42',
    accent: false,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
      </svg>
    ),
  },
  {
    title: 'Real Pull Requests',
    desc: 'Not simulated output. DevMind pushes code to a new branch and opens an actual GitHub PR with a professional description.',
    color: '#ffffff',
    accent: true,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/>
        <path d="M13 6h3a2 2 0 0 1 2 2v7"/><line x1="6" y1="9" x2="6" y2="21"/>
      </svg>
    ),
  },
  {
    title: 'Self-Correcting Critic Loop',
    desc: 'The Code Critic reviews generated output and loops the Developer back up to 5 times until the code meets quality standards. Self-correcting by design.',
    color: '#ff5c28',
    accent: false,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <polyline points="23 4 23 10 17 10"/>
        <path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/>
      </svg>
    ),
  },
  {
    title: 'pytest Sandbox',
    desc: 'Every test suite runs in an isolated environment before the PR is created. Tests must pass before any code reaches GitHub.',
    color: '#ff4500',
    accent: false,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"/>
      </svg>
    ),
  },
  {
    title: 'Multi-Repo Support',
    desc: 'Works with any public GitHub repository in any language. ChromaDB caches indexed repos for significantly faster repeat runs.',
    color: '#e03500',
    accent: false,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
]

function FeatureCard({ f, index }) {
  const [hovered, setHovered] = useState(false)

  if (f.accent) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
        viewport={{ once: true, margin: '-40px' }}
        style={{
          padding: '28px 26px',
          background: '#ff4500',
          borderRadius: 18,
          position: 'relative', overflow: 'hidden',
          cursor: 'default',
        }}
      >
        <div style={{
          position: 'absolute', top: -40, right: -40,
          width: 160, height: 160, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.12), transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{
          width: 44, height: 44, borderRadius: 12,
          background: 'rgba(255,255,255,0.18)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#ffffff', marginBottom: 18,
        }}>
          {f.icon}
        </div>

        <div style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: 16.5, fontWeight: 700, color: '#ffffff',
          marginBottom: 10, letterSpacing: '-0.01em',
        }}>
          {f.title}
        </div>

        <div style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.75)', lineHeight: 1.65 }}>
          {f.desc}
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      viewport={{ once: true, margin: '-40px' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '28px 26px',
        background: hovered ? '#161616' : '#111111',
        border: `1px solid ${hovered ? f.color + '25' : 'rgba(255,255,255,0.07)'}`,
        borderRadius: 18,
        position: 'relative', overflow: 'hidden',
        cursor: 'default',
        transition: 'background 0.2s, border-color 0.2s, transform 0.2s',
        transform: hovered ? 'translateY(-4px)' : 'none',
      }}
    >
      <div style={{
        position: 'absolute', top: -50, right: -50,
        width: 150, height: 150, borderRadius: '50%',
        background: `radial-gradient(circle, ${f.color}14, transparent 70%)`,
        opacity: hovered ? 1 : 0.5,
        transition: 'opacity 0.25s',
        pointerEvents: 'none',
      }} />

      <div style={{
        width: 44, height: 44, borderRadius: 12,
        background: `${f.color}14`,
        border: `1px solid ${f.color}22`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: f.color, marginBottom: 18,
        transition: 'background 0.2s',
        ...(hovered ? { background: `${f.color}20` } : {}),
      }}>
        {f.icon}
      </div>

      <div style={{
        fontFamily: "'Syne', sans-serif",
        fontSize: 16.5, fontWeight: 700, color: '#ffffff',
        marginBottom: 10, letterSpacing: '-0.01em',
      }}>
        {f.title}
      </div>

      <div style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.4)', lineHeight: 1.65 }}>
        {f.desc}
      </div>
    </motion.div>
  )
}

export default function Features() {
  return (
    <section id="features" style={{ padding: '0 48px 120px', maxWidth: 1200, margin: '0 auto' }}>

      {/* Header */}
      <div style={{ marginBottom: 64 }}>
        <div className="section-label">Features</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
          <h2 style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 'clamp(34px, 4.5vw, 58px)',
            fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.05,
            color: '#ffffff',
          }}>
            Built for Real<br />Engineering
          </h2>
          <p style={{
            fontSize: 16, color: 'rgba(255,255,255,0.42)',
            maxWidth: 400, lineHeight: 1.7, marginBottom: 4,
          }}>
            Every part of DevMind is designed to produce output you would actually want to merge.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
        {FEATURES.map((f, i) => <FeatureCard key={f.title} f={f} index={i} />)}
      </div>

    </section>
  )
}
