"""Smoke tests: run from backend/ with `python -m pytest tests -q`.
Needs GROQ_API_KEY and an indexed 'click' collection (see /api/index-repo).
Skips the PR Writer on purpose so no GitHub side effects."""
import os
import sys

import pytest

sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from config import GROQ_API_KEY  # noqa: E402

needs_llm = pytest.mark.skipif(not GROQ_API_KEY, reason="GROQ_API_KEY not set")


def test_health():
    from fastapi.testclient import TestClient
    from main import app
    r = TestClient(app).get("/health")
    assert r.status_code == 200 and r.json()["status"] == "running"


def test_file_parsers_ignore_markdown_bold():
    from github_client.client import parse_code_changes
    from sandbox.runner import parse_files
    text = "**FILE: pkg/a.py**\n```python\nx = 1\n```\nFILE: b.py\n```python\ny = 2\n```"
    want = {"pkg/a.py": "x = 1", "b.py": "y = 2"}
    assert parse_code_changes(text) == want and parse_files(text) == want


@needs_llm
def test_llm_model_is_live():
    from llm.client import get_llm
    assert get_llm().invoke("Reply with the single word OK").content.strip()


@needs_llm
def test_agents_through_critic():
    from agents.analyst import analyst_node
    from agents.architect import architect_node
    from agents.developer import developer_node
    from agents.qa import qa_node
    from agents.critic import critic_node
    from rag.indexer import get_chroma

    if "click" not in [c.name for c in get_chroma().list_collections()]:
        pytest.skip("click collection not indexed")

    state = {
        "repo_url": "https://github.com/pallets/click", "repo_name": "click",
        "collection_name": "click",
        "issue_title": "Add a helper that converts a string to snake_case",
        "issue_body": "Add `to_snake_case(s: str) -> str` in click/utils.py. "
                      "'HelloWorld' -> 'hello_world'; empty string returns ''.",
        "issue_number": 1, "code_context": "", "analysis": "", "plan": "",
        "code_changes": "", "tests": "", "review_decision": "", "review_feedback": "",
        "pr_title": "", "pr_body": "", "iteration_count": 0, "logs": [],
    }
    for node in (analyst_node, architect_node, developer_node, qa_node, critic_node):
        state.update({k: v for k, v in node(state).items() if k != "logs"})

    assert state["plan"].strip()
    assert "FILE:" in state["code_changes"], "developer output not in FILE: format"
    assert "FILE:" in state["tests"], "qa output not in FILE: format"
    assert state["review_decision"] in ("APPROVE", "REJECT")
