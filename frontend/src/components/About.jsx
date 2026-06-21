import { motion } from 'framer-motion'

const SKILLS = [
  'Agentic AI', 'LangGraph', 'Python', 'FastAPI',
  'RAG Systems', 'LLM Fine-tuning', 'C++', 'Java',
  'Automation', 'Data Structures', 'ChromaDB', 'Groq',
]

const STATS = [
  { val: '4th',  label: 'Semester' },
  { val: 'FAST', label: 'NUCES' },
  { val: 'AI',   label: 'Specialization' },
  { val: '6',    label: 'Agents Built' },
]

const fadeUp = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
}

export default function About() {
  return (
    <div style={{ minHeight: '100vh', padding: '0 0 100px' }}>

      {/* ── Hero banner ── */}
      <section style={{
        position: 'relative',
        padding: '100px 48px 80px',
        maxWidth: 1200, margin: '0 auto',
        overflow: 'hidden',
      }}>

        {/* Orange accent line */}
        <div style={{
          position: 'absolute', top: 0, left: 48, right: 48, height: 1,
          background: 'linear-gradient(to right, #ff4500, rgba(255,69,0,0.1))',
        }} />

        <motion.div
          initial="hidden" animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.div variants={fadeUp} transition={{ duration: 0.6 }}>
            <div className="section-label">About the Creator</div>
          </motion.div>

          <motion.h1
            variants={fadeUp} transition={{ duration: 0.65, delay: 0.05 }}
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 'clamp(42px, 6vw, 80px)',
              fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.0,
              color: '#ffffff', marginBottom: 20, maxWidth: 700,
            }}
          >
            Meet the Mind<br />
            <em className="display-italic" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.88em' }}>
              Behind DevMind
            </em>
          </motion.h1>

          <motion.p
            variants={fadeUp} transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontSize: 17, color: 'rgba(255,255,255,0.42)',
              maxWidth: 500, lineHeight: 1.75,
            }}
          >
            A student builder shipping production-grade AI systems
            while still in university. DevMind is proof of what's possible.
          </motion.p>
        </motion.div>
      </section>

      {/* ── Main content ── */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 32, alignItems: 'start' }}>

          {/* Left — photo + contact card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true }}
          >
            {/* Photo */}
            <div style={{
              position: 'relative',
              borderRadius: 24,
              overflow: 'hidden',
              aspectRatio: '3/4',
              marginBottom: 20,
              background: '#111111',
              border: '1px solid rgba(255,255,255,0.07)',
              boxShadow: '0 40px 100px rgba(0,0,0,0.6), 0 0 60px rgba(255,69,0,0.06)',
            }}>
              <img
                src="/img.png"
                alt="Shahram Shafiq Goraya"
                style={{
                  width: '100%', height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center top',
                  display: 'block',
                }}
              />
              {/* Orange gradient overlay at bottom */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%',
                background: 'linear-gradient(to top, rgba(8,8,8,0.85) 0%, transparent 100%)',
              }} />
              {/* Name overlay */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                padding: '28px 24px',
              }}>
                <div style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: 22, fontWeight: 800, color: '#ffffff',
                  letterSpacing: '-0.02em', marginBottom: 4,
                }}>
                  Shahram Shafiq Goraya
                </div>
                <div style={{
                  fontSize: 13, color: '#ff6b35', fontWeight: 600,
                  letterSpacing: '0.04em',
                }}>
                  BSCS Student · FAST-NUCES
                </div>
              </div>
            </div>

            {/* Contact card */}
            <div style={{
              background: '#111111',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 18, padding: '24px',
            }}>
              <div style={{
                fontSize: 11, fontWeight: 700,
                color: 'rgba(255,255,255,0.28)',
                letterSpacing: '0.1em', textTransform: 'uppercase',
                marginBottom: 16,
              }}>
                Contact
              </div>

              <div
                onClick={() => { window.location.href = 'mailto:shahramshafiqgoraya4363@gmail.com' }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '12px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  cursor: 'pointer',
                  transition: 'opacity 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: 'rgba(255,69,0,0.1)', border: '1px solid rgba(255,69,0,0.18)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round">
                    <rect x="2" y="4" width="20" height="16" rx="2"/>
                    <path d="M2 7l10 7 10-7"/>
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginBottom: 2 }}>Email</div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', fontWeight: 500, wordBreak: 'break-all' }}>
                    shahramshafiqgoraya4363@gmail.com
                  </div>
                </div>
              </div>

              <div
                onClick={() => { window.location.href = 'tel:+923055575290' }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '12px 0',
                  cursor: 'pointer',
                  transition: 'opacity 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: 'rgba(255,69,0,0.1)', border: '1px solid rgba(255,69,0,0.18)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.7A2 2 0 012.18 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.08 6.08l1.27-.66a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 15.42z"/>
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginBottom: 2 }}>Phone</div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', fontWeight: 500 }}>
                    +92 305 557 5290
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — bio + stats + skills */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true }}
            style={{ paddingTop: 8 }}
          >
            {/* Stats row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 32 }}>
              {STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  viewport={{ once: true }}
                  style={{
                    padding: '18px 16px',
                    background: i === 1 ? '#ff4500' : '#111111',
                    border: i !== 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                    borderRadius: 14,
                    textAlign: 'center',
                  }}
                >
                  <div style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: 22, fontWeight: 800, lineHeight: 1,
                    color: '#ffffff', marginBottom: 5,
                    letterSpacing: '-0.02em',
                  }}>{s.val}</div>
                  <div style={{
                    fontSize: 10, color: i === 1 ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.32)',
                    textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600,
                  }}>{s.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Bio */}
            <div style={{
              background: '#111111',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 20, padding: '32px',
              marginBottom: 20,
            }}>
              <div style={{
                fontSize: 11, fontWeight: 700,
                color: 'rgba(255,255,255,0.28)',
                letterSpacing: '0.1em', textTransform: 'uppercase',
                marginBottom: 18,
              }}>
                Background
              </div>

              <p style={{
                fontSize: 16, lineHeight: 1.8,
                color: 'rgba(255,255,255,0.6)',
                marginBottom: 20,
              }}>
                I'm <strong style={{ color: '#ffffff', fontWeight: 600 }}>Shahram Shafiq Goraya</strong>, a 4th-semester BSCS student at{' '}
                <strong style={{ color: '#ff6b35', fontWeight: 600 }}>FAST-NUCES</strong>, building production AI systems between classes.
              </p>
              <p style={{
                fontSize: 16, lineHeight: 1.8,
                color: 'rgba(255,255,255,0.6)',
                marginBottom: 20,
              }}>
                My focus is on <strong style={{ color: '#ffffff', fontWeight: 600 }}>agentic AI</strong> and developer automation: building systems where multiple AI agents collaborate to complete complex, real-world engineering tasks without human intervention.
              </p>
              <p style={{
                fontSize: 16, lineHeight: 1.8,
                color: 'rgba(255,255,255,0.6)',
              }}>
                DevMind started as a semester project and turned into a full multi-agent system using LangGraph, FastAPI, ChromaDB, and Groq. It can analyze codebases and open real GitHub pull requests autonomously.
              </p>
            </div>

            {/* Skills */}
            <div style={{
              background: '#111111',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 20, padding: '28px',
              marginBottom: 20,
            }}>
              <div style={{
                fontSize: 11, fontWeight: 700,
                color: 'rgba(255,255,255,0.28)',
                letterSpacing: '0.1em', textTransform: 'uppercase',
                marginBottom: 18,
              }}>
                Skills & Stack
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {SKILLS.map((s, i) => (
                  <motion.span
                    key={s}
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                    viewport={{ once: true }}
                    style={{
                      padding: '7px 14px',
                      background: i % 5 === 0 ? 'rgba(255,69,0,0.1)' : 'rgba(255,255,255,0.04)',
                      border: `1px solid ${i % 5 === 0 ? 'rgba(255,69,0,0.22)' : 'rgba(255,255,255,0.07)'}`,
                      borderRadius: 100,
                      fontSize: 12.5, fontWeight: 500,
                      color: i % 5 === 0 ? '#ff8c42' : 'rgba(255,255,255,0.55)',
                    }}
                  >
                    {s}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div style={{ display: 'flex', gap: 12 }}>
              <button
                className="btn-primary"
                onClick={() => { window.location.href = 'mailto:shahramshafiqgoraya4363@gmail.com' }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="M2 7l10 7 10-7"/>
                </svg>
                Get In Touch
              </button>
              <button
                className="btn-ghost"
                onClick={() => { window.open('https://github.com/shahramshafiq', '_blank', 'noopener') }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
                GitHub
              </button>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  )
}
