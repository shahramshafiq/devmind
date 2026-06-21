# DevMind

**Autonomous AI code engineer.** Paste a GitHub issue URL and DevMind's 6-agent pipeline analyzes your codebase, writes production code, runs tests, and opens a real pull request. No human in the loop.

**Live demo:** https://devmind-theta.vercel.app

---

## How it works

```
GitHub Issue URL
       |
       v
 [1] Issue Analyst      - Fetches the issue, runs RAG search over the full codebase
       |
       v
 [2] Architect          - Plans the implementation with specific file paths and function signatures
       |
       v
 [3] Developer          - Writes production code that matches your codebase's patterns
       |
       v
 [4] QA Engineer        - Writes pytest tests, runs them in an isolated sandbox
       |
       v
 [5] Code Critic        - Reviews code quality, security, and test coverage
       |                   Rejects and loops back to Developer (up to 5 iterations)
       |
       v
 [6] PR Writer          - Commits code to a new branch, opens a real GitHub PR
```

---

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | React + Vite, Framer Motion, inline styles |
| Backend | FastAPI, Python |
| Agent Orchestration | LangGraph |
| LLM | Groq API (llama3) |
| RAG / Codebase Indexing | ChromaDB + sentence-transformers |
| GitHub Integration | PyGithub, GitPython |
| Database | SQLite (run history) |
| Code Execution | pytest sandbox (subprocess) |
| Frontend Hosting | Vercel |
| Backend Hosting | Railway |

---

## Features

- Works with any public GitHub repository in any language
- Streaming UI: watch each agent complete in real time
- Self-correcting critic loop: the Code Critic can reject and send the Developer back up to 5 times
- ChromaDB caches indexed repos so repeat runs are significantly faster
- Full run history stored locally with PR links, test results, and iteration counts

---

## Running locally

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
pip install -r requirements.txt
```

Create a `.env` file in `backend/`:

```
GROQ_API_KEY=your_groq_api_key
GITHUB_TOKEN=your_github_personal_access_token
```

```bash
uvicorn main:app --reload
```

Backend runs at `http://localhost:8000`.

### Frontend

```bash
cd frontend
npm install
```

Create a `.env` file in `frontend/`:

```
VITE_API_URL=http://localhost:8000
```

```bash
npm run dev
```

Frontend runs at `http://localhost:5173`.

---

## Project structure

```
DevMind/
├── frontend/
│   └── src/
│       ├── App.jsx                  # Main app, page routing
│       ├── components/
│       │   ├── AgentPipeline.jsx    # Live pipeline progress UI
│       │   ├── LogTimeline.jsx      # Agent log stream
│       │   ├── ResultPanel.jsx      # PR result display
│       │   ├── History.jsx          # Past runs
│       │   └── ...
│       └── hooks/
│           └── useWindowWidth.js
└── backend/
    ├── main.py                      # FastAPI app, /api/run-stream endpoint
    ├── agents/
    │   ├── analyst.py
    │   ├── architect.py
    │   ├── developer.py
    │   ├── qa.py
    │   ├── critic.py
    │   └── pr_writer.py
    ├── graph/
    │   └── pipeline.py              # LangGraph state machine
    ├── rag/
    │   ├── indexer.py               # ChromaDB ingestion
    │   └── retriever.py             # Semantic search
    ├── github_client/
    │   └── client.py                # Issue fetching, PR creation
    ├── sandbox/
    │   └── runner.py                # pytest execution
    └── database/
        └── db.py                    # SQLite run history
```

---

## Built by

Shahram Shafiq, BSCS, FAST-NUCES Islamabad  
[github.com/shahramshafiq](https://github.com/shahramshafiq)
