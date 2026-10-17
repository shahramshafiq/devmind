<div align="center">

# DevMind

A multi-agent system that reads a GitHub issue, writes the fix and its tests, and opens a pull request.

![Python](https://img.shields.io/badge/Python-FastAPI-3776AB?style=flat-square&logo=python&logoColor=white)
![LangGraph](https://img.shields.io/badge/LangGraph-Agents-1C3C3C?style=flat-square&logo=langchain&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white)
![ChromaDB](https://img.shields.io/badge/ChromaDB-RAG-FF6446?style=flat-square)

</div>

## Overview

Fixing a GitHub issue means reading the codebase, planning a change, writing code, testing it and describing it in a pull request. DevMind splits that work across six agents wired together as a LangGraph state graph. Given an issue URL, it indexes the target repository into ChromaDB, retrieves the code most relevant to the issue, plans and writes the change, generates and runs pytest tests, passes the result through a critic review loop, and opens a pull request on a new branch.

## Demo

- Live app: [devmind-theta.vercel.app](https://devmind-theta.vercel.app)
- [Watch the demo video](demo.mp4)

## Key Features

- **Six-agent pipeline:** Issue Analyst, Architect, Developer, QA Engineer, Code Critic and PR Writer run as nodes of one LangGraph state graph (`backend/graph/pipeline.py`).
- **Retrieval over the target repository:** source and doc files are split into 800 character chunks, embedded with `all-MiniLM-L6-v2` and stored in ChromaDB. The analyst searches with the issue title and body. Repositories that are already indexed are reused.
- **Critic feedback loop:** when the critic rejects the code, its reason is fed back to the Developer, for up to 5 iterations. If the limit is reached, the pull request is still opened with a "Needs Work" note in its description.
- **Generated tests are executed:** the QA agent writes pytest tests, which run in a temporary directory subprocess with a 60 second timeout. Pass and fail counts are stored with the run.
- **Real pull requests:** the PR Writer step creates a `devmind/issue-<number>` branch, commits each generated file through the GitHub API, and opens a pull request that closes the original issue.
- **Live progress:** the backend streams agent updates as server-sent events from `/api/run-stream`, and the React UI marks each agent as it finishes.
- **Run history:** every run is saved with SQLAlchemy (SQLite by default, PostgreSQL through `DATABASE_URL`) and shown on the History page.
- **Rate-limit handling:** Groq 429 responses are retried up to 3 times, waiting as long as the API asks (capped at 90 seconds).

## Tech Stack

| Area | Technology |
|---|---|
| Backend | Python, FastAPI, Uvicorn |
| Agent orchestration | LangGraph, LangChain |
| LLM | Groq API (`llama-3.3-70b-versatile`) via `langchain-groq` |
| Retrieval | ChromaDB, sentence-transformers (`all-MiniLM-L6-v2`) |
| GitHub integration | PyGithub |
| Persistence | SQLAlchemy, SQLite or PostgreSQL (`psycopg2`) |
| Frontend | React 19, Vite, Tailwind CSS 4, Framer Motion |
| Deployment | Vercel (frontend), Railway (backend, `Procfile` and `nixpacks.toml`) |

## Project Structure

```text
devmind/
|-- backend/
|   |-- main.py            # FastAPI app and routes, SSE stream at /api/run-stream
|   |-- config.py          # Model name, ChromaDB path, database URL
|   |-- agents/            # analyst, architect, developer, qa, critic, pr_writer
|   |-- graph/             # LangGraph state and pipeline (critic loop, 5 iterations max)
|   |-- rag/               # Repo download, chunking, embeddings, semantic search
|   |-- github_client/     # Issue fetching, branch and commit creation, PR opening
|   |-- sandbox/           # Runs generated pytest tests in a temporary directory
|   |-- database/          # SQLAlchemy run history
|   |-- llm/               # Groq client with rate-limit retry
|   `-- requirements.txt
|-- frontend/
|   `-- src/components/    # Pipeline view, results, history, about, contact
|-- demo.mp4               # Recorded walkthrough
`-- vercel.json
```

## Getting Started

### Prerequisites

- Python 3 and `pip`
- Node.js and `npm`
- A [Groq](https://console.groq.com) API key
- A GitHub personal access token that can create branches, commit files and open pull requests on the repository you want DevMind to work on

### Installation

Backend:

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env            # Windows: copy .env.example .env
```

Set these variables in `backend/.env`:

| Variable | Purpose |
|---|---|
| `GROQ_API_KEY` | Groq API key used by every agent |
| `GITHUB_TOKEN` | GitHub token used to read issues and repositories and to open pull requests |
| `DATABASE_URL` | Optional. Defaults to `sqlite:///./devmind.db`. PostgreSQL URLs are also accepted |

Frontend:

```bash
cd frontend
npm install
```

The frontend calls `http://localhost:8000` by default. To point it at another backend, set `VITE_API_URL` in `frontend/.env`.

### Run

Start the API (from `backend/`):

```bash
uvicorn main:app --reload
```

Start the UI (from `frontend/`):

```bash
npm run dev
```

The API is served at `http://localhost:8000` and the UI at `http://localhost:5173`.

## Usage

Open the UI, paste a public issue URL such as `https://github.com/owner/repo/issues/42`, and watch the six agents complete one by one. The result view links to the pull request, and the History page lists past runs.

The same flow is available over HTTP:

```bash
curl -N -X POST http://localhost:8000/api/run-stream \
  -H "Content-Type: application/json" \
  -d '{"issue_url": "https://github.com/owner/repo/issues/42"}'
```

| Endpoint | Description |
|---|---|
| `POST /api/run-stream` | Runs the pipeline and streams agent events (server-sent events) |
| `POST /api/run-from-issue` | Same pipeline, returns a single JSON response when finished |
| `POST /api/index-repo` | Indexes a repository into ChromaDB |
| `POST /api/query-rag` | Semantic search over an indexed repository |
| `GET /api/indexed-repos` | Lists indexed repositories |
| `GET /api/history` | Returns the 50 most recent runs |
| `GET /health` | Health check |

## Limitations and Roadmap

- The GitHub token must have write access to the target repository, because the branch, commits and pull request are created directly on it.
- The QA agent writes pytest tests, so test results are most meaningful for Python repositories. Results are recorded and shown, but they do not block the pull request.
- Generated tests run in a temporary-directory subprocess with a timeout. A container-based sandbox would give stronger isolation.
- DevMind has no automated test suite of its own yet.

## Author

**Shahram Shafiq** - [GitHub](https://github.com/shahramshafiq) | [LinkedIn](https://www.linkedin.com/in/shahramshafiq/)
