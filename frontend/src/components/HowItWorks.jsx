import { useState } from 'react'
import { motion } from 'framer-motion'
import useWindowWidth from '../hooks/useWindowWidth'

const AGENTS = [
  {
    num: '01', name: 'Issue Analyst', color: '#ff6b35',
    desc: 'Parses your GitHub issue and runs semantic RAG search over the entire codebase to understand the full context before any code is touched.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
        <path d="M8 11h6M11 8v6"/>
      </svg>
    ),
  },
  {
    num: '02', name: 'Architect', color: '#ff8c42',
    desc: 'Maps the implementation to your actual file structure. Creates a concrete step-by-step plan with specific file paths and function signatures.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
        <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
      </svg>
    ),
  },
  {
    num: '03', name: 'Developer', color: '#ffab3e',
    desc: 'Writes production-quality code that follows your existing codebase patterns and conventions. No generic boilerplate. Real implementation.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
  },
  {
    num: '04', name: 'QA Engineer', color: '#ff5c28',
    desc: 'Writes comprehensive pytest tests covering success paths, edge cases, and expected failures. Runs them in an isolated sandbox before the PR is created.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    num: '05', name: 'Code Critic', color: '#ff4500',
    desc: 'Reviews the generated code for correctness, security, and test coverage. If it finds issues, it rejects and sends the Developer back up to 5 iterations.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    ),
  },
  {
    num: '06', name: 'PR Writer', color: '#e03500',
    desc: 'Commits the approved code to a new branch, writes a professional pull request description referencing the original issue, and opens it on GitHub.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/>
        <path d="M13 6h3a2 2 0 0 1 2 2v7"/><line x1="6" y1="9" x2="6" y2="21"/>
      </svg>
    ),
  },
]

function AgentCard({ agent, index }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      viewport={{ once: true, margin: '-40px' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '28px 26px',
        background: hovered ? '#161616' : '#111111',
        border: `1px solid ${hovered ? agent.color + '28' : 'rgba(255,255,255,0.07)'}`,
        borderRadius: 18,
        position: 'relative', overflow: 'hidden',
        cursor: 'default',
        transition: 'background 0.2s, border-color 0.2s, transform 0.2s',
        transform: hovered ? 'translateY(-4px)' : 'none',
      }}
    >
      {/* Top-right glow */}
      <div style={{
        position: 'absolute', top: -50, right: -50,
        width: 140, height: 140, borderRadius: '50%',
        background: `radial-gradient(circle, ${agent.color}18, transparent 70%)`,
        opacity: hovered ? 1 : 0.45,
        transition: 'opacity 0.25s',
        pointerEvents: 'none',
      }} />

      {/* Number */}
      <div style={{
        fontSize: 11, fontFamily: "'JetBrains Mono', monospace",
        color: agent.color, fontWeight: 600, letterSpacing: '0.06em',
        marginBottom: 16, opacity: 0.7,
      }}>
        {agent.num}
      </div>

      {/* Icon */}
      <div style={{
        width: 44, height: 44, borderRadius: 12,
        background: `${agent.color}14`,
        border: `1px solid ${agent.color}25`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: agent.color, marginBottom: 18,
        transition: 'background 0.2s',
        ...(hovered ? { background: `${agent.color}22` } : {}),
      }}>
        {agent.icon}
      </div>

      {/* Name */}
      <div style={{
        fontSize: 15.5, fontWeight: 700, color: '#ffffff',
        marginBottom: 10, letterSpacing: '-0.01em',
        fontFamily: "'Syne', sans-serif",
      }}>
        {agent.name}
      </div>

      {/* Desc */}
      <div style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.4)', lineHeight: 1.65 }}>
        {agent.desc}
      </div>
    </motion.div>
  )
}

export default function HowItWorks() {
  const vw = useWindowWidth()
  const isMob = vw < 640
  const isTab = vw < 1024
  const cols = isMob ? '1fr' : isTab ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)'

  return (
    <section id="how-it-works" style={{ padding: isMob ? '80px 20px' : isTab ? '100px 32px' : '120px 48px', maxWidth: 1200, margin: '0 auto' }}>

      {/* Header row */}
      <div style={{ marginBottom: 64 }}>
        <div className="section-label">The Pipeline</div>
        <div style={{ display: 'flex', flexDirection: isMob ? 'column' : 'row', alignItems: isMob ? 'flex-start' : 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
          <h2 style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 'clamp(34px, 4.5vw, 58px)',
            fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.05,
            color: '#ffffff',
          }}>
            How DevMind<br />Works
          </h2>
          <p style={{
            fontSize: 16, color: 'rgba(255,255,255,0.42)',
            maxWidth: 400, lineHeight: 1.7, marginBottom: 4,
          }}>
            Six AI agents collaborate in sequence. Each hands off full context to the next, building toward a production-ready pull request.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: cols,
        gap: 14,
      }}>
        {AGENTS.map((agent, i) => <AgentCard key={agent.name} agent={agent} index={i} />)}
      </div>

      {/* Self-correction note */}
      <motion.div
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }} viewport={{ once: true }}
        style={{ marginTop: 40, display: 'flex', justifyContent: 'center' }}
      >
        <span style={{
          padding: '6px 20px',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 100,
          background: '#111111',
          fontSize: 12.5, color: 'rgba(255,255,255,0.22)',
        }}>
          The Critic loops back to the Developer up to 5 times for self-correction
        </span>
      </motion.div>

    </section>
  )
}
