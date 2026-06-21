import { useState, useEffect, useRef } from 'react'
import Background from './components/Background'
import Header from './components/Header'
import Hero from './components/Hero'
import InputPanel from './components/InputPanel'
import AgentPipeline from './components/AgentPipeline'
import LogTimeline from './components/LogTimeline'
import ResultPanel from './components/ResultPanel'
import TestResultPanel from './components/TestResultPanel'
import History from './components/History'

const API = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const AGENTS = [
  { id: 'analyst',   label: 'Issue Analyst', icon: 'search', color: '#818cf8', startAt: 2   },
  { id: 'architect', label: 'Architect',      icon: 'layout', color: '#a78bfa', startAt: 20  },
  { id: 'developer', label: 'Developer',      icon: 'code',   color: '#c084fc', startAt: 40  },
  { id: 'qa',        label: 'QA Engineer',    icon: 'shield', color: '#e879f9', startAt: 75  },
  { id: 'critic',    label: 'Code Critic',    icon: 'eye',    color: '#f472b6', startAt: 100 },
  { id: 'pr_writer', label: 'PR Writer',      icon: 'pr',     color: '#fb7185', startAt: 120 },
]

const FAKE_LOGS = {
  analyst:   ['Parsing GitHub issue URL...', 'Querying RAG codebase for context...', 'Analyzing issue title and description...', 'Cross-referencing affected components...'],
  architect: ['Reading analyst output...', 'Mapping implementation to file structure...', 'Identifying dependencies and touch points...', 'Writing step-by-step implementation plan...'],
  developer: ['Loading architecture plan and code context...', 'Writing code changes for affected files...', 'Applying logic to existing codebase patterns...', 'Code generation complete.'],
  qa:        ['Reviewing generated code changes...', 'Writing pytest unit tests...', 'Adding edge cases and boundary conditions...', 'Test suite finalized.'],
  critic:    ['Running code review pass...', 'Checking implementation correctness...', 'Evaluating test coverage quality...', 'Rendering decision...'],
  pr_writer: ['Summarizing all agent outputs...', 'Writing PR title and description...', 'Formatting markdown for GitHub...', 'Pull request content ready.'],
}

function parseSlug(url) {
  const m = url.match(/github\.com\/([^/]+\/[^/]+)\/issues\/(\d+)/)
  return m ? `${m[1]} #${m[2]}` : url
}

export default function App() {
  const [page, setPage]       = useState('home')   // home | history
  const [screen, setScreen]   = useState('idle')   // idle | running | done | error
  const [issueUrl, setIssueUrl] = useState('')
  const [statuses, setStatuses] = useState(Array(6).fill('waiting'))
  const [activeIdx, setActiveIdx] = useState(-1)
  const [logs, setLogs]       = useState([])
  const [result, setResult]   = useState(null)
  const [errMsg, setErrMsg]   = useState('')
  const [elapsed, setElapsed] = useState(0)
  const [backendOk, setBackendOk] = useState(null)

  const timers  = useRef([])
  const ticker  = useRef(null)
  const runUrl  = useRef('')

  // Health check once
  useEffect(() => {
    fetch(`${API}/health`)
      .then(r => setBackendOk(r.ok))
      .catch(() => setBackendOk(false))
  }, [])

  const clearAll = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
    if (ticker.current) { clearInterval(ticker.current); ticker.current = null }
  }

  const addLog = (agent, msg) =>
    setLogs(prev => [...prev, { agent, msg, ts: Date.now() }])

  const startSim = () => {
    const t0 = Date.now()
    ticker.current = setInterval(() =>
      setElapsed(Math.floor((Date.now() - t0) / 1000)), 1000)

    AGENTS.forEach((ag, i) => {
      const t = setTimeout(() => {
        setActiveIdx(i)
        setStatuses(prev => {
          const s = [...prev]
          if (i > 0) s[i - 1] = 'done'
          s[i] = 'active'
          return s
        })
        ;(FAKE_LOGS[ag.id] || []).forEach((msg, j) => {
          const sub = setTimeout(() => addLog(ag.label, msg), j * 3600)
          timers.current.push(sub)
        })
      }, ag.startAt * 1000)
      timers.current.push(t)
    })
  }

  const handleRun = async () => {
    const url = issueUrl.trim()
    if (!url) return
    runUrl.current = url

    setScreen('running')
    setStatuses(Array(6).fill('waiting'))
    setActiveIdx(-1)
    setLogs([])
    setElapsed(0)
    setResult(null)
    setErrMsg('')
    clearAll()
    startSim()

    try {
      const res  = await fetch(`${API}/api/run-from-issue`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ issue_url: url }),
      })
      const data = await res.json()
      clearAll()

      if (!res.ok || data.error) {
        setErrMsg(data.error || data.detail || 'Something went wrong.')
        setScreen('error')
        return
      }

      setStatuses(Array(6).fill('done'))
      setActiveIdx(-1)
      if (data.logs?.length) {
        setLogs(data.logs.map((msg, i) => ({ agent: 'DevMind', msg, ts: i })))
      }
      setResult(data)
      setScreen('done')
    } catch (err) {
      clearAll()
      setErrMsg(err.message || 'Could not reach backend at localhost:8000.')
      setScreen('error')
    }
  }

  const handleReset = () => {
    clearAll()
    setScreen('idle')
    setIssueUrl('')
    setStatuses(Array(6).fill('waiting'))
    setActiveIdx(-1)
    setLogs([])
    setResult(null)
    setErrMsg('')
    setElapsed(0)
  }

  useEffect(() => () => clearAll(), [])

  const slug = parseSlug(runUrl.current)
  const mm   = String(Math.floor(elapsed / 60)).padStart(2, '0')
  const ss   = String(elapsed % 60).padStart(2, '0')

  return (
    <div style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      <Background />
      <Header backendOk={backendOk} page={page} setPage={setPage} />

      <main style={{ position: 'relative', zIndex: 10 }}>
        {page === 'history' && <History />}

        {page === 'home' && screen === 'idle' && (
          <div style={{ animation: 'fade-in 0.5s ease-out' }}>
            <Hero />
            <InputPanel issueUrl={issueUrl} setIssueUrl={setIssueUrl} onRun={handleRun} />
          </div>
        )}

        {page === 'home' && screen !== 'idle' && (
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '22px 32px 60px', animation: 'fade-in 0.4s ease-out' }}>

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
                    <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#a855f7', animation: 'ripple 1.2s cubic-bezier(0,0,0.2,1) infinite' }} />
                    <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#a855f7' }} />
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
                  {screen === 'running' ? 'Running on' : screen === 'done' ? 'Completed —' : 'Failed —'}
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
                    ← New Issue
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
        )}

      </main>
    </div>
  )
}
