from typing import TypedDict, Annotated, List
import operator


class AgentState(TypedDict):
    # Input
    repo_url: str
    repo_name: str
    collection_name: str
    issue_title: str
    issue_body: str
    issue_number: int

    # Analyst output
    code_context: str
    analysis: str

    # Architect output
    plan: str

    # Developer output
    code_changes: str

    # QA output
    tests: str

    # Critic output
    review_decision: str   # "APPROVE" or "REJECT"
    review_feedback: str

    # PR Writer output
    pr_title: str
    pr_body: str

    # Control
    iteration_count: int

    # Append-only log stream for frontend
    logs: Annotated[List[str], operator.add]
