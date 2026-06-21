import { useState } from 'react'
import { motion } from 'framer-motion'

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
    desc: 'Reviews the generated code for correctness, security, and test coverage. If it finds issues, it rejects and sends the Developer back — up to 5 iterations.',
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

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const cardVariants = {
  hidden:  { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.62, ease: [0.25, 0.46, 0.45, 0.94] } },
}

function AgentCard({ agent }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '26px 24px',
        background: hovered ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.025)',
        border: `1px solid ${hovered ? agent.color + '30' : 'rgba(255,255,255,0.07)'}`,
        borderRadius: 16,
        position: 'relative', overflow: 'hidden',
        cursor: 'default',
        boxShadow: hovered ? `0 8px 28px rgba(0,0,0,0.22), 0 0 32px ${agent.color}0d` : 'none',
        transition: 'all 0.25s ease',
      }}
    >
      {/* Ambient glow */}
      <div style={{
        position: 'absolute', top: -50, right: -50,
        width: 130, height: 130, borderRadius: '50%',
        background: `radial-gradient(circle, ${agent.color}14, transparent 70%)`,
        pointerEvents: 'none',
        opacity: hovered ? 1 : 0.5,
        transition: 'opacity 0.3s',
      }} />

      {/* Number */}
      <div style={{
        fontSize: 11, fontFamily: "'JetBrains Mono', monospace",
        color: agent.color, fontWeight: 600, letterSpacing: '0.05em',
        marginBottom: 14, opacity: 0.65,
      }}>
        {agent.num}
      </div>

      {/* Icon */}
      <div style={{
        width: 42, height: 42, borderRadius: 11,
        background: `${agent.color}14`,
        border: `1px solid ${agent.color}28`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: agent.color, marginBottom: 16,
        transition: 'background 0.25s',
        ...(hovered ? { background: `${agent.color}20` } : {}),
      }}>
        {agent.icon}
      </div>

      {/* Name */}
      <div style={{ fontSize: 15.5, fontWeight: 700, color: '#f1f0ff', marginBottom: 8, letterSpacing: '-0.01em' }}>
        {agent.name}
      </div>

      {/* Desc */}
      <div style={{ fontSize: 13.5, color: 'rgba(241,240,255,0.42)', lineHeight: 1.65 }}>
        {agent.desc}
      </div>
    </motion.div>
  )
}

export default function HowItWorks() {
  return (
    <section id="how-it-works" style={{ padding: '100px 24px', maxWidth: 1160, margin: '0 auto' }}>

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65 }}
        viewport={{ once: true, margin: '-80px' }}
        style={{ textAlign: 'center', marginBottom: 68 }}
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
          The Pipeline
        </div>

        <h2 style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 'clamp(30px, 4vw, 52px)',
          fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.1,
          color: '#f1f0ff', marginBottom: 16,
        }}>
          How DevMind works
        </h2>

        <p style={{ fontSize: 17, color: 'rgba(241,240,255,0.44)', maxWidth: 500, margin: '0 auto', lineHeight: 1.72 }}>
          Six AI agents collaborate in sequence. Each hands off full context to the next,
          building toward a production-ready pull request.
        </p>
      </motion.div>

      {/* Cards */}
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
        {AGENTS.map(agent => <AgentCard key={agent.name} agent={agent} />)}
      </motion.div>

      {/* Footer note */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.7 }}
        viewport={{ once: true }}
        style={{ textAlign: 'center', marginTop: 44 }}
      >
        <span style={{
          display: 'inline-block',
          padding: '5px 18px',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 100,
          background: 'rgba(255,255,255,0.02)',
          fontSize: 12.5, color: 'rgba(255,255,255,0.2)',
        }}>
          The Critic loops back to the Developer up to 5 times for self-correction
        </span>
      </motion.div>

    </section>
  )
}
