import os
import sys
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()
sys.path.insert(0, os.path.dirname(__file__))

from database.db import init_db, save_run, get_history
init_db()

app = FastAPI(title="DevMind API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class TestRequest(BaseModel):
    message: str


class IndexRepoRequest(BaseModel):
    repo_url: str
    repo_name: str


class QueryRAGRequest(BaseModel):
    collection_name: str
    query: str
    top_k: int = 5


class RunPipelineRequest(BaseModel):
    repo_name: str
    collection_name: str
    issue_title: str
    issue_body: str
    issue_number: int = 0


class RunFromIssueRequest(BaseModel):
    issue_url: str


@app.get("/health")
def health():
    return {"status": "running", "project": "DevMind"}


@app.get("/api/history")
def history():
    return {"runs": get_history()}


@app.post("/api/test-llm")
def test_llm(body: TestRequest):
    from llm.client import get_llm
    llm = get_llm()
    response = llm.invoke(body.message)
    return {"response": response.content}


@app.post("/api/index-repo")
def index_repo(body: IndexRepoRequest):
    from rag.indexer import index_repo as do_index
    result = do_index(body.repo_url, body.repo_name)
    return result


@app.post("/api/query-rag")
def query_rag(body: QueryRAGRequest):
    from rag.retriever import query_codebase
    hits = query_codebase(body.collection_name, body.query, body.top_k)
    return {"results": hits}


@app.post("/api/run-from-issue")
def run_from_issue(body: RunFromIssueRequest):
    from github_client.client import parse_issue_url, fetch_issue, create_pr
    from rag.indexer import index_repo, get_chroma
    from graph.pipeline import pipeline

    owner, repo_name, issue_number = parse_issue_url(body.issue_url)
    repo_full_name = f"{owner}/{repo_name}"
    repo_url = f"https://github.com/{repo_full_name}"
    collection_name = repo_name.replace('-', '_').replace('.', '_')

    issue = fetch_issue(repo_full_name, issue_number)
    if issue["state"] != "open":
        return {"error": f"Issue #{issue_number} is already {issue['state']}."}

    chroma = get_chroma()
    try:
        chroma.get_collection(collection_name)
        repo_indexed = False
    except Exception:
        index_repo(repo_url, repo_name)
        repo_indexed = True

    initial_state = {
        "repo_url": repo_url,
        "repo_name": repo_name,
        "collection_name": collection_name,
        "issue_title": issue["title"],
        "issue_body": issue["body"],
        "issue_number": issue_number,
        "code_context": "",
        "analysis": "",
        "plan": "",
        "code_changes": "",
        "tests": "",
        "review_decision": "",
        "review_feedback": "",
        "pr_title": "",
        "pr_body": "",
        "iteration_count": 0,
        "logs": []
    }
    final_state = pipeline.invoke(initial_state)

    from sandbox.runner import run_tests
    test_result = run_tests(
        final_state.get("code_changes", ""),
        final_state.get("tests", "")
    )

    pr_body = final_state["pr_body"] or ""
    if final_state.get("review_decision") == "REJECT":
        pr_body = (
            "> **AI Review: Needs Work** — This PR reached the iteration limit without a full approval. "
            "The code represents the best attempt but may need manual review before merging.\n\n"
            + pr_body
        )

    pr_result = create_pr(
        repo_full_name=repo_full_name,
        issue_number=issue_number,
        pr_title=final_state["pr_title"],
        pr_body=pr_body,
        code_changes_text=final_state["code_changes"]
    )

    tr = test_result or {}
    save_run({
        "issue_title":     issue["title"],
        "issue_number":    issue_number,
        "repo_name":       repo_name,
        "review_decision": final_state["review_decision"],
        "iterations":      final_state["iteration_count"],
        "pr_url":          pr_result.get("pr_url"),
        "pr_title":        final_state["pr_title"],
        "pr_body":         pr_body,
        "tests_passed":    tr.get("passed"),
        "tests_failed":    tr.get("failed"),
        "tests_total":     tr.get("total"),
    })

    return {
        "issue": f"#{issue_number}: {issue['title']}",
        "repo_freshly_indexed": repo_indexed,
        "review_decision": final_state["review_decision"],
        "iterations": final_state["iteration_count"],
        "pr_url": pr_result["pr_url"],
        "pr_title": final_state["pr_title"],
        "pr_body": pr_body,
        "branch": pr_result["branch"],
        "files_committed": pr_result["files_committed"],
        "logs": final_state["logs"],
        "test_result": test_result
    }


@app.post("/api/run-pipeline")
def run_pipeline(body: RunPipelineRequest):
    from graph.pipeline import pipeline
    initial_state = {
        "repo_url": "",
        "repo_name": body.repo_name,
        "collection_name": body.collection_name,
        "issue_title": body.issue_title,
        "issue_body": body.issue_body,
        "issue_number": body.issue_number,
        "code_context": "",
        "analysis": "",
        "plan": "",
        "code_changes": "",
        "tests": "",
        "review_decision": "",
        "review_feedback": "",
        "pr_title": "",
        "pr_body": "",
        "iteration_count": 0,
        "logs": []
    }
    final_state = pipeline.invoke(initial_state)
    return {
        "analysis": final_state["analysis"],
        "plan": final_state["plan"],
        "code_changes": final_state["code_changes"],
        "tests": final_state["tests"],
        "review_decision": final_state["review_decision"],
        "iterations": final_state["iteration_count"],
        "pr_title": final_state["pr_title"],
        "pr_body": final_state["pr_body"],
        "logs": final_state["logs"]
    }
