import { useState } from 'react'
import { motion } from 'framer-motion'

const FEATURES = [
  {
    title: 'RAG Codebase Indexing',
    desc: 'The entire GitHub repository is indexed with ChromaDB and sentence-transformers before any agent writes a line of code. Every decision is grounded in your real codebase, not generic patterns.',
    color: '#ff6b35',
    large: false,
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
    large: false,
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
    color: '#ffab3e',
    large: false,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/>
        <path d="M13 6h3a2 2 0 0 1 2 2v7"/><line x1="6" y1="9" x2="6" y2="21"/>
      </svg>
    ),
  },
  {
    title: 'Critic Review Loop',
    desc: 'The Code Critic reviews generated output and loops the Developer back up to 5 times until the code meets quality standards. Self-correcting by design.',
    color: '#ff5c28',
    large: false,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <polyline points="23 4 23 10 17 10"/>
        <path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/>
      </svg>
    ),
  },
  {
    title: 'pytest Sandbox',
    desc: 'Every test suite runs in an isolated tempfile environment before the PR is created. Tests must pass before any code reaches GitHub.',
    color: '#ff4500',
    large: false,
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
    large: false,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
}
const cardVariants = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.62, ease: [0.25, 0.46, 0.45, 0.94] } },
}

function FeatureCard({ f }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        gridColumn: f.large ? 'span 2' : 'span 1',
        padding: f.large ? '34px 30px' : '26px 24px',
        background: hovered ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.025)',
        border: `1px solid ${hovered ? f.color + '28' : 'rgba(255,255,255,0.07)'}`,
        borderRadius: 18,
        position: 'relative', overflow: 'hidden',
        cursor: 'default',
        boxShadow: hovered ? `0 10px 32px rgba(0,0,0,0.24), 0 0 40px ${f.color}0c` : 'none',
        transition: 'all 0.25s ease',
      }}
    >
      {/* Ambient glow */}
      <div style={{
        position: 'absolute', top: -60, right: -60,
        width: f.large ? 220 : 150, height: f.large ? 220 : 150,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${f.color}12, transparent 70%)`,
        pointerEvents: 'none',
        opacity: hovered ? 1 : 0.6,
        transition: 'opacity 0.3s',
      }} />

      {/* Icon */}
      <div style={{
        width: 46, height: 46, borderRadius: 13,
        background: `${f.color}12`,
        border: `1px solid ${f.color}24`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: f.color, marginBottom: 18,
        transition: 'background 0.25s',
        ...(hovered ? { background: `${f.color}1e` } : {}),
      }}>
        {f.icon}
      </div>

      {/* Title */}
      <div style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: f.large ? 22 : 16.5, fontWeight: 700,
        color: '#f1f0ff', marginBottom: 10,
        letterSpacing: '-0.02em',
      }}>
        {f.title}
      </div>

      {/* Desc */}
      <div style={{
        fontSize: f.large ? 15 : 13.5,
        color: 'rgba(241,240,255,0.43)',
        lineHeight: 1.66,
        maxWidth: f.large ? 540 : undefined,
      }}>
        {f.desc}
      </div>
    </motion.div>
  )
}

export default function Features() {
  return (
    <section id="features" style={{ padding: '80px 24px 100px', maxWidth: 1160, margin: '0 auto' }}>

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65 }}
        viewport={{ once: true, margin: '-80px' }}
        style={{ textAlign: 'center', marginBottom: 64 }}
      >
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 7,
          padding: '5px 16px',
          background: 'rgba(255,69,0,0.07)',
          border: '1px solid rgba(255,69,0,0.22)',
          borderRadius: 100,
          fontSize: 11.5, color: 'rgba(255,140,66,0.8)', fontWeight: 600,
          letterSpacing: '0.08em', textTransform: 'uppercase',
          marginBottom: 22,
        }}>
          Features
        </div>

        <h2 style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 'clamp(30px, 4vw, 52px)',
          fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.1,
          color: '#f1f0ff', marginBottom: 16,
        }}>
          Built for real engineering
        </h2>

        <p style={{ fontSize: 17, color: 'rgba(241,240,255,0.44)', maxWidth: 500, margin: '0 auto', lineHeight: 1.72 }}>
          Every part of DevMind is designed to produce output
          you would actually want to merge.
        </p>
      </motion.div>

      {/* Bento grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 14,
        }}
      >
        {FEATURES.map(f => <FeatureCard key={f.title} f={f} />)}
      </motion.div>

    </section>
  )
}
