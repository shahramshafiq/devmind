# Go live for free: runs the DevMind backend on this PC and exposes it through a
# Cloudflare quick tunnel (no account, no card). Prints a link that points the
# Vercel site at your PC. Stop with Ctrl+C. Usage:  .\scripts\start-demo.ps1
#
# - Needs backend\.env (GROQ_API_KEY, GITHUB_TOKEN) and: winget install Cloudflare.cloudflared
# - While this runs, anyone with the printed link can start runs that use YOUR keys.
# - Cloudflare drops requests that send nothing for ~100 s, so index big repos first
#   (curl.exe -X POST localhost:8000/api/index-repo -H "Content-Type: application/json"
#    -d '{"repo_url":"https://github.com/owner/repo","repo_name":"repo"}') and demo on cached ones.
param([int]$Port = 8000)
$ErrorActionPreference = 'Stop'

$backend = Join-Path (Split-Path -Parent $PSScriptRoot) 'backend'
$python = Join-Path $backend 'venv\Scripts\python.exe'
if (-not (Test-Path $python)) { $python = 'python' }
if (-not (Test-Path (Join-Path $backend '.env'))) { throw 'backend\.env is missing. Copy backend\.env.example and add your keys.' }
$cf = Get-Command cloudflared -ErrorAction SilentlyContinue
if (-not $cf) { throw 'cloudflared not found. Run: winget install Cloudflare.cloudflared (then reopen this terminal).' }

$log = Join-Path $env:TEMP 'devmind-tunnel.log'
Remove-Item $log -ErrorAction SilentlyContinue
$procs = @()
try {
    $procs += Start-Process $python -ArgumentList '-m', 'uvicorn', 'main:app', '--port', $Port `
        -WorkingDirectory $backend -PassThru -WindowStyle Minimized
    Write-Host 'Starting backend (first start takes up to a minute)...'
    $up = $false
    1..60 | ForEach-Object {
        if (-not $up) {
            try { $up = (Invoke-RestMethod "http://localhost:$Port/health" -TimeoutSec 2).status -eq 'running' } catch { Start-Sleep 2 }
        }
    }
    if (-not $up) { throw 'Backend did not start. Run it by hand from backend\ to see the error.' }

    $procs += Start-Process $cf.Source -ArgumentList 'tunnel', '--no-autoupdate', '--url', "http://localhost:$Port" `
        -RedirectStandardError $log -PassThru -WindowStyle Hidden
    $url = $null
    1..30 | ForEach-Object {
        if (-not $url) {
            Start-Sleep 1
            if (Test-Path $log) {
                $m = [regex]::Match((Get-Content $log -Raw), 'https://[a-z0-9-]+\.trycloudflare\.com')
                if ($m.Success) { $url = $m.Value }
            }
        }
    }
    if (-not $url) { throw "Tunnel did not start. See $log" }

    Write-Host ''
    Write-Host 'DevMind is LIVE. Open this link:' -ForegroundColor Green
    Write-Host "  https://devmind-theta.vercel.app/?api=$url" -ForegroundColor Cyan
    Write-Host ''
    Write-Host 'Keep this window open. Press Ctrl+C to stop and go offline.'
    while ($true) { Start-Sleep 5 }
}
finally {
    $procs | ForEach-Object { if ($_ -and -not $_.HasExited) { Stop-Process -Id $_.Id -Force -ErrorAction SilentlyContinue } }
    Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction SilentlyContinue |
        ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }
}
