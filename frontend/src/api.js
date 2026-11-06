// Backend address. Visiting the site with ?api=https://<name>.trycloudflare.com points it at a
// temporary tunnel to a backend running on the owner's PC (see scripts/start-demo.ps1) and
// remembers it in this browser. ?api=reset clears it. Only tunnel and localhost hosts are accepted.
const DEFAULT_API = import.meta.env.VITE_API_URL || 'http://localhost:8000'
const ALLOWED = /^https:\/\/[a-z0-9-]+\.trycloudflare\.com$|^http:\/\/localhost:\d+$/

function resolveApi() {
  try {
    const q = new URLSearchParams(window.location.search).get('api')
    const clean = q && q.replace(/\/+$/, '')
    if (q === 'reset') localStorage.removeItem('devmind_api')
    else if (clean && ALLOWED.test(clean)) localStorage.setItem('devmind_api', clean)
    const saved = localStorage.getItem('devmind_api')
    if (saved && ALLOWED.test(saved)) return saved
  } catch { /* storage unavailable: fall through to the default */ }
  return DEFAULT_API
}

export const API = resolveApi()
