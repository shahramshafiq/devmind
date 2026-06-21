import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Background from './components/Background'
import Header from './components/Header'
import Hero from './components/Hero'
import HowItWorks from './components/HowItWorks'
import Features from './components/Features'
import Footer from './components/Footer'
import InputPanel from './components/InputPanel'
import AgentPipeline from './components/AgentPipeline'
import LogTimeline from './components/LogTimeline'
import ResultPanel from './components/ResultPanel'
import TestResultPanel from './components/TestResultPanel'
import History from './components/History'
import IndexedRepos from './components/IndexedRepos'
import About from './components/About'
import Contact from './components/Contact'

const API = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const AGENTS = [
  { id: 'analyst',   label: 'Issue Analyst', icon: 'search', color: '#ff6b35' },
  { id: 'architect', label: 'Architect',      icon: 'layout', color: '#ff8c42' },
  { id: 'developer', label: 'Developer',      icon: 'code',   color: '#ffab3e' },
  { id: 'qa',        label: 'QA Engineer',    icon: 'shield', color: '#ff5c28' },
  { id: 'critic',    label: 'Code Critic',    icon: 'eye',    color: '#ff4500' },
  { id: 'pr_writer', label: 'PR Writer',      icon: 'pr',     color: '#e03500' },
]

const NODE_TO_IDX = {
  analyst: 0, architect: 1, developer: 2, qa: 3, critic: 4, pr_writer: 5,
}

function parseSlug(url) {
  const m = url.match(/github\.com\/([^/]+\/[^/]+)\/issues\/(\d+)/)
  return m ? `${m[1]} #${m[2]}` : url
}

const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.22 } },
}

export default function App() {
  const [page, setPage]       = useState('home')
  const [screen, setScreen]   = useState('idle')
  const [issueUrl, setIssueUrl] = useState('')
  const [statuses, setStatuses] = useState(Array(6).fill('waiting'))
  const [activeIdx, setActiveIdx] = useState(-1)
  const [logs, setLogs]       = useState([])
  const [result, setResult]   = useState(null)
  const [errMsg, setErrMsg]   = useState('')
  const [elapsed, setElapsed] = useState(0)
  const [backendOk, setBackendOk] = useState(null)

  const ticker = useRef(null)
  const runUrl = useRef('')

  useEffect(() => {
    fetch(`${API}/health`)
      .then(r => setBackendOk(r.ok))
      .catch(() => setBackendOk(false))
  }, [])

  const stopTicker = () => {
    if (ticker.current) { clearInterval(ticker.current); ticker.current = null }
  }

  const startTicker = () => {
    const t0 = Date.now()
    ticker.current = setInterval(() => setElapsed(Math.floor((Date.now() - t0) / 1000)), 1000)
  }

  const handleRun = async () => {
    const url = issueUrl.trim()
    if (!url) return
    runUrl.current = url

    setScreen('running')
    const initStatuses = Array(6).fill('waiting')
    initStatuses[0] = 'active'
    setStatuses(initStatuses)
    setActiveIdx(0)
    setLogs([])
    setElapsed(0)
    setResult(null)
    setErrMsg('')
    stopTicker()
    startTicker()
    window.scrollTo({ top: 0, behavior: 'smooth' })

    try {
      const res = await fetch(`${API}/api/run-stream`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ issue_url: url }),
      })

      if (!res.ok) {
        const data = await res.json()
        stopTicker()
        setErrMsg(data.error || data.detail || 'Something went wrong.')
        setScreen('error')
        return
      }

      const reader  = res.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop()

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue
          let event
          try { event = JSON.parse(line.slice(6)) } catch { continue }

          if (event.type === 'agent_done') {
            const idx = NODE_TO_IDX[event.agent]
            if (idx !== undefined) {
              setStatuses(prev => {
                const s = [...prev]
                s[idx] = 'done'
                if (event.agent === 'critic' && event.decision === 'REJECT') {
                  s[2] = 'active'
                } else if (idx + 1 < 6) {
                  s[idx + 1] = 'active'
                }
                return s
              })
              const nextIdx = (event.agent === 'critic' && event.decision === 'REJECT') ? 2 : (idx + 1 < 6 ? idx + 1 : -1)
              setActiveIdx(nextIdx)
              if (event.logs?.length) {
                const label = AGENTS[idx].label
                setLogs(prev => [...prev, ...event.logs.map(msg => ({ agent: label, msg, ts: Date.now() }))])
              }
            }
          } else if (event.type === 'error') {
            stopTicker()
            setErrMsg(event.message)
            setScreen('error')
            return
          } else if (event.type === 'result') {
            stopTicker()
            setStatuses(Array(6).fill('done'))
            setActiveIdx(-1)
            setResult(event)
            setScreen('done')
          }
        }
      }
    } catch (err) {
      stopTicker()
      setErrMsg(err.message || 'Could not reach backend.')
      setScreen('error')
    }
  }

  const handleReset = () => {
    stopTicker()
    setScreen('idle')
    setIssueUrl('')
    setStatuses(Array(6).fill('waiting'))
    setActiveIdx(-1)
    setLogs([])
    setResult(null)
    setErrMsg('')
    setElapsed(0)
  }

  useEffect(() => () => stopTicker(), [])

  const slug = parseSlug(runUrl.current)
  const mm   = String(Math.floor(elapsed / 60)).padStart(2, '0')
  const ss   = String(elapsed % 60).padStart(2, '0')

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      <Background />

      <div style={{ position: 'relative', zIndex: 10 }}>
        <Header backendOk={backendOk} page={page} setPage={setPage} />

        <main>
          <AnimatePresence mode="wait">

            {/* History page */}
            {page === 'history' && (
              <motion.div key="history" {...pageTransition}>
                <History />
              </motion.div>
            )}

            {/* About page */}
            {page === 'about' && (
              <motion.div key="about" {...pageTransition}>
                <About setPage={setPage} />
                <Footer />
              </motion.div>
            )}

            {/* Contact page */}
            {page === 'contact' && (
              <motion.div key="contact" {...pageTransition}>
                <Contact />
                <Footer />
              </motion.div>
            )}

            {/* Landing page */}
            {page === 'home' && screen === 'idle' && (
              <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
                <Hero />
                <HowItWorks />
                <Features />

                {/* CTA / Try It section */}
                <section id="try-it" style={{ padding: '80px 24px 100px', position: 'relative' }}>
                  {/* Subtle glow behind input */}
                  <div style={{
                    position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)',
                    width: 700, height: 350, pointerEvents: 'none',
                    background: 'radial-gradient(ellipse, rgba(255,69,0,0.07), transparent 70%)',
                  }} />

                  <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.65 }}
                    viewport={{ once: true }}
                    style={{ textAlign: 'center', marginBottom: 36 }}
                  >
                    <div className="section-label" style={{ justifyContent: 'center', marginBottom: 20 }}>Try It Free</div>
                    <h2 style={{
                      fontFamily: "'Syne', sans-serif",
                      fontSize: 'clamp(32px, 4vw, 56px)',
                      fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.05,
                      color: '#ffffff', marginBottom: 16,
                    }}>
                      Ready to Automate<br />Your PRs?
                    </h2>
                    <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.4)', lineHeight: 1.7 }}>
                      Drop a GitHub issue link and watch DevMind build the fix.
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.12 }}
                    viewport={{ once: true }}
                  >
                    <InputPanel issueUrl={issueUrl} setIssueUrl={setIssueUrl} onRun={handleRun} />
                    <IndexedRepos />
                  </motion.div>
                </section>

                <Footer />
              </motion.div>
            )}

            {/* Pipeline / running / done / error view */}
            {page === 'home' && screen !== 'idle' && (
              <motion.div key="pipeline" {...pageTransition}>
                <div style={{ maxWidth: 1200, margin: '0 auto', padding: '28px 32px 60px' }}>

                  {/* Status bar */}
                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '11px 18px', marginBottom: 20,
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: 12,
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      {screen === 'running' && (
                        <div style={{ position: 'relative', width: 8, height: 8, flexShrink: 0 }}>
                          <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#ff4500', animation: 'ripple 1.2s cubic-bezier(0,0,0.2,1) infinite' }} />
                          <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#ff4500' }} />
                        </div>
                      )}
                      {screen === 'done' && (
                        <div style={{ width: 16, height: 16, borderRadius: '50%', background: 'rgba(74,222,128,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                        </div>
                      )}
                      {screen === 'error' && (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2">
                          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                        </svg>
                      )}
                      <span style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.5)' }}>
                        {screen === 'running' ? 'Running on' : screen === 'done' ? 'Completed:' : 'Failed:'}
                      </span>
                      <span style={{ fontSize: 13, fontFamily: "'JetBrains Mono', monospace", color: screen === 'done' ? '#4ade80' : screen === 'error' ? '#f87171' : 'rgba(255,255,255,0.3)' }}>
                        {slug}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      {screen === 'running' && (
                        <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.28)', fontFamily: 'monospace' }}>{mm}:{ss}</span>
                      )}
                      {screen !== 'running' && (
                        <button onClick={handleReset} style={{ padding: '5px 12px', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 7, color: 'rgba(255,255,255,0.4)', fontSize: 12, cursor: 'pointer', fontWeight: 500 }}>
                          New Issue
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Main grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: 20, alignItems: 'start' }}>
                    <AgentPipeline agents={AGENTS} statuses={statuses} activeIdx={activeIdx} elapsed={elapsed} isRunning={screen === 'running'} />

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                      {screen === 'error' && (
                        <div className="glass" style={{ padding: 36, textAlign: 'center' }}>
                          <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(248,113,113,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2">
                              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                              <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                            </svg>
                          </div>
                          <h3 style={{ fontSize: 18, fontWeight: 700, color: '#f87171', marginBottom: 8 }}>Pipeline Failed</h3>
                          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, lineHeight: 1.7, marginBottom: 24 }}>{errMsg}</p>
                          <button onClick={handleReset} className="glow-btn" style={{ padding: '10px 28px', border: 'none', borderRadius: 10, color: 'white', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                            Try Again
                          </button>
                        </div>
                      )}

                      {screen === 'done' && result && <ResultPanel result={result} />}
                      {screen === 'done' && result?.test_result && <TestResultPanel testResult={result.test_result} />}

                      <LogTimeline logs={logs} isRunning={screen === 'running'} />
                    </div>
                  </div>

                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}
