import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useWindowWidth from '../hooks/useWindowWidth'

const CONTACT_INFO = [
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round">
        <rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/>
      </svg>
    ),
    label: 'Email',
    value: 'shahramshafiqgoraya4363@gmail.com',
    href:  'mailto:shahramshafiqgoraya4363@gmail.com',
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 0118.82 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.08 6.08l1.27-.66a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 15.42z"/>
      </svg>
    ),
    label: 'Phone',
    value: '+92 305 557 5290',
    href:  'tel:+923055575290',
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
      </svg>
    ),
    label: 'GitHub',
    value: 'github.com/shahramshafiq',
    href:  'https://github.com/shahramshafiq',
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    ),
    label: 'University',
    value: 'FAST-NUCES, Islamabad',
    href:  null,
  },
]

export default function Contact() {
  const vw = useWindowWidth()
  const isMob = vw < 640
  const isTab = vw < 1024
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return

    setSending(true)
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      form.phone ? `Phone: ${form.phone}` : null,
      form.subject ? `Subject: ${form.subject}` : null,
      '',
      `Message:\n${form.message}`,
    ].filter(Boolean).join('\n')

    const subject = form.subject || `Message from ${form.name} via DevMind`
    const mailtoLink = `mailto:shahramshafiqgoraya4363@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

    setTimeout(() => {
      window.location.href = mailtoLink
      setSending(false)
      setSent(true)
      setForm({ name: '', email: '', phone: '', subject: '', message: '' })
    }, 600)
  }

  return (
    <div style={{ minHeight: '100vh', padding: '0 0 120px' }}>

      {/* ── Header ── */}
      <section style={{
        position: 'relative',
        padding: isMob ? '72px 20px 60px' : isTab ? '100px 32px 72px' : '100px 48px 80px',
        maxWidth: 1200, margin: '0 auto',
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 48, right: 48, height: 1,
          background: 'linear-gradient(to right, #ff4500, rgba(255,69,0,0.1))',
        }} />

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
          <div className="section-label">Get In Touch</div>
          <h1 style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 'clamp(42px, 6vw, 80px)',
            fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.0,
            color: '#ffffff', marginBottom: 20,
          }}>
            Let's Work<br />
            <em className="display-italic" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.88em' }}>
              Together.
            </em>
          </h1>
          <p style={{
            fontSize: 17, color: 'rgba(255,255,255,0.42)',
            maxWidth: 460, lineHeight: 1.75,
          }}>
            Have a project in mind, want to collaborate, or just want to talk AI? Send a message and I'll get back to you.
          </p>
        </motion.div>
      </section>

      {/* ── Two-column layout ── */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: isMob ? '0 20px' : isTab ? '0 32px' : '0 48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMob ? '1fr' : '1fr 1.7fr', gap: 28, alignItems: 'start' }}>

          {/* Left — info cards */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true }}
            style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
          >
            {/* Profile mini-card */}
            <div style={{
              background: '#ff4500',
              borderRadius: 20, padding: '28px',
              marginBottom: 4,
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: -30, right: -30,
                width: 160, height: 160, borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)',
              }} />
              <div style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 26, fontWeight: 800, color: '#ffffff',
                marginBottom: 6, lineHeight: 1.1,
              }}>
                Shahram<br />Shafiq Goraya
              </div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', fontWeight: 500, marginBottom: 16 }}>
                BSCS Student · AI Engineer
              </div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '6px 14px',
                background: 'rgba(255,255,255,0.18)',
                borderRadius: 100,
                fontSize: 12, fontWeight: 600, color: '#ffffff',
              }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80' }} />
                Open to opportunities
              </div>
            </div>

            {/* Contact links */}
            {CONTACT_INFO.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                viewport={{ once: true }}
              >
                {item.href ? (
                  <a href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none', display: 'block' }}
                  >
                    <ContactCard item={item} />
                  </a>
                ) : (
                  <ContactCard item={item} />
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true }}
          >
            <div style={{
              background: '#111111',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 24, padding: '40px',
              position: 'relative', overflow: 'hidden',
            }}>
              {/* Top-right glow */}
              <div style={{
                position: 'absolute', top: -60, right: -60,
                width: 250, height: 250, borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255,69,0,0.08) 0%, transparent 70%)',
                pointerEvents: 'none',
              }} />

              <div style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 22, fontWeight: 800, color: '#ffffff',
                marginBottom: 6, letterSpacing: '-0.02em',
              }}>
                Send a Message
              </div>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.35)', marginBottom: 32 }}>
                Fill in the details below and your mail client will open pre-filled.
              </p>

              <AnimatePresence>
                {sent && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    style={{
                      padding: '16px 20px', borderRadius: 12, marginBottom: 24,
                      background: 'rgba(74,222,128,0.06)',
                      border: '1px solid rgba(74,222,128,0.18)',
                      display: 'flex', alignItems: 'center', gap: 12,
                    }}
                  >
                    <div style={{
                      width: 28, height: 28, borderRadius: '50%',
                      background: 'rgba(74,222,128,0.12)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </div>
                    <span style={{ fontSize: 14, color: '#4ade80', fontWeight: 500 }}>
                      Mail client opened with your message filled in!
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: isMob ? '1fr' : '1fr 1fr', gap: 14, marginBottom: 14 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.35)', marginBottom: 8, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                      Full Name *
                    </label>
                    <input
                      className="form-field"
                      type="text" required
                      value={form.name} onChange={set('name')}
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.35)', marginBottom: 8, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                      Email *
                    </label>
                    <input
                      className="form-field"
                      type="email" required
                      value={form.email} onChange={set('email')}
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: isMob ? '1fr' : '1fr 1fr', gap: 14, marginBottom: 14 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.35)', marginBottom: 8, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                      Phone
                    </label>
                    <input
                      className="form-field"
                      type="tel"
                      value={form.phone} onChange={set('phone')}
                      placeholder="+1 234 567 8900"
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.35)', marginBottom: 8, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                      Subject
                    </label>
                    <input
                      className="form-field"
                      type="text"
                      value={form.subject} onChange={set('subject')}
                      placeholder="What's this about?"
                    />
                  </div>
                </div>

                <div style={{ marginBottom: 28 }}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.35)', marginBottom: 8, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    Message *
                  </label>
                  <textarea
                    className="form-field"
                    required rows={5}
                    value={form.message} onChange={set('message')}
                    placeholder="Tell me about your project, idea, or question..."
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary"
                  disabled={sending}
                  style={{
                    width: '100%', justifyContent: 'center',
                    fontSize: 15, padding: '15px 28px',
                    opacity: sending ? 0.75 : 1,
                    cursor: sending ? 'wait' : 'pointer',
                    borderRadius: 12,
                    transition: 'all 0.2s',
                  }}
                >
                  {sending ? (
                    <>Opening Mail Client...</>
                  ) : (
                    <>
                      Send Message
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                      </svg>
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

function ContactCard({ item }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 14,
      padding: '16px 18px',
      background: '#111111',
      border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: 14,
      transition: 'background 0.18s, border-color 0.18s',
      cursor: item.href ? 'pointer' : 'default',
    }}
    onMouseEnter={e => {
      if (item.href) {
        e.currentTarget.style.background = '#161616'
        e.currentTarget.style.borderColor = 'rgba(255,69,0,0.2)'
      }
    }}
    onMouseLeave={e => {
      e.currentTarget.style.background = '#111111'
      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
    }}
    >
      <div style={{
        width: 38, height: 38, borderRadius: 10, flexShrink: 0,
        background: 'rgba(255,69,0,0.09)',
        border: '1px solid rgba(255,69,0,0.16)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {item.icon}
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.28)', marginBottom: 3, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
          {item.label}
        </div>
        <div style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.72)', fontWeight: 500, wordBreak: 'break-all' }}>
          {item.value}
        </div>
      </div>
    </div>
  )
}
