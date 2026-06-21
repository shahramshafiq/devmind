import { useState } from 'react'
import { motion } from 'framer-motion'

const AGENTS = [
  { label: 'Issue Analyst', color: '#818cf8' },
  { label: 'Architect',     color: '#a78bfa' },
  { label: 'Developer',     color: '#c084fc' },
  { label: 'QA Engineer',   color: '#e879f9' },
  { label: 'Code Critic',   color: '#f472b6' },
  { label: 'PR Writer',     color: '#fb7185' },
]

const STATS = [
  { val: '6',    label: 'Specialized Agents' },
  { val: 'RAG',  label: 'Codebase Indexing'  },
  { val: 'Real', label: 'GitHub PRs'         },
  { val: 'Auto', label: 'Test Runner'        },
]

const ctr = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
}
const up = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] } },
}

function PrimaryBtn({ children, onClick }) {
  const [h, setH] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        padding: '13px 30px',
        background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
        border: 'none', borderRadius: 12,
        color: 'white', fontSize: 15, fontWeight: 700,
        cursor: 'pointer',
        boxShadow: h
          ? '0 0 40px rgba(124,58,237,0.7), 0 8px 28px rgba(0,0,0,0.35)'
          : '0 0 26px rgba(124,58,237,0.42), 0 4px 16px rgba(0,0,0,0.25)',
        transform: h ? 'translateY(-2px)' : 'translateY(0)',
        transition: 'box-shadow 0.2s, transform 0.18s',
        letterSpacing: '0.01em',
      }}
    >
      {children}
    </button>
  )
}

function SecondaryBtn({ children, onClick }) {
  const [h, setH] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        padding: '13px 28px',
        background: h ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.04)',
        border: `1px solid ${h ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.09)'}`,
        borderRadius: 12,
        color: h ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.7)',
        fontSize: 15, fontWeight: 600,
        cursor: 'pointer',
        transform: h ? 'translateY(-1px)' : 'translateY(0)',
        transition: 'all 0.18s',
      }}
    >
      {children}
    </button>
  )
}

export default function Hero() {
  const scrollTry = () => document.getElementById('try-it')?.scrollIntoView({ behavior: 'smooth' })
  const scrollHow = () => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="hero" style={{
      minHeight: 'calc(100vh - 62px)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      textAlign: 'center',
      padding: '80px 24px 80px',
    }}>
      <motion.div
        variants={ctr}
        initial="hidden"
        animate="visible"
        style={{ maxWidth: 900, width: '100%', margin: '0 auto' }}
      >
        {/* Badge */}
        <motion.div variants={up} style={{ marginBottom: 30 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 18px',
            background: 'rgba(124,58,237,0.08)',
            border: '1px solid rgba(124,58,237,0.28)',
            borderRadius: 100,
            fontSize: 13, color: '#c4b5fd', fontWeight: 500,
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
            </svg>
            Multi-Agent Autonomous Code Engineer
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1 variants={up} style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 'clamp(42px, 6.2vw, 80px)',
          fontWeight: 900,
          letterSpacing: '-0.045em',
          lineHeight: 1.05,
          color: '#f1f0ff',
          marginBottom: 24,
        }}>
          From GitHub Issue<br />
          to <span className="text-gradient">Merged PR.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p variants={up} style={{
          fontSize: 18, lineHeight: 1.75,
          color: 'rgba(241,240,255,0.48)',
          maxWidth: 560, margin: '0 auto 44px',
        }}>
          Paste any GitHub issue URL. DevMind's 6-agent pipeline analyzes your
          codebase, writes production code, runs tests, reviews it, and opens a
          real pull request. Automatically.
        </motion.p>

        {/* CTA */}
        <motion.div variants={up} style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 52 }}>
          <PrimaryBtn onClick={scrollTry}>Try DevMind Free →</PrimaryBtn>
          <SecondaryBtn onClick={scrollHow}>See how it works</SecondaryBtn>
        </motion.div>

        {/* Agent pills */}
        <motion.div variants={ctr} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8, marginBottom: 52 }}>
          {AGENTS.map(a => (
            <motion.div
              key={a.label}
              variants={up}
              whileHover={{ scale: 1.06, transition: { duration: 0.15 } }}
              style={{
                display: 'flex', alignItems: 'center', gap: 7,
                padding: '7px 15px',
                background: 'rgba(255,255,255,0.03)',
                border: `1px solid ${a.color}22`,
                borderRadius: 100,
                fontSize: 13, color: a.color, fontWeight: 500,
              }}
            >
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: a.color, display: 'block', flexShrink: 0 }} />
              {a.label}
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div variants={up} style={{ display: 'flex', justifyContent: 'center', gap: 48, flexWrap: 'wrap' }}>
          {STATS.map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 26, fontWeight: 900,
                color: '#c4b5fd', letterSpacing: '-0.035em',
              }}>
                {s.val}
              </div>
              <div style={{
                fontSize: 11, color: 'rgba(255,255,255,0.28)',
                marginTop: 4, fontWeight: 500,
                letterSpacing: '0.06em', textTransform: 'uppercase',
              }}>
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.7 }}
          onClick={scrollHow}
          style={{ marginTop: 64, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, cursor: 'pointer' }}
        >
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.18)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeLinecap="round">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
