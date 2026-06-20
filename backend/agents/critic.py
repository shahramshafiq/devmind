from langchain_core.messages import SystemMessage, HumanMessage
from llm.client import get_llm
from graph.state import AgentState

SYSTEM = """You are a pragmatic Senior Code Reviewer. Your job is to decide if code is good enough to merge.

APPROVE when: the code correctly solves the stated issue, has no logic bugs, and has at least basic test coverage.
REJECT only when: there is a real bug, completely wrong logic, missing core functionality, or zero meaningful tests.

Do NOT reject for: style preferences, DRY violations across files, incomplete docstrings, missing edge cases for rare inputs, or minor nitpicks.
Be reasonable — production code doesn't need to be perfect, it needs to be correct and functional."""


def critic_node(state: AgentState) -> dict:
    llm = get_llm(temperature=0.0)
    prompt = f"""ORIGINAL ISSUE: {state['issue_title']}

CODE CHANGES:
{state['code_changes']}

TESTS:
{state['tests']}

Review this implementation. Focus only on:
1. Does the code correctly solve the stated issue?
2. Are there any real bugs or logic errors that would cause failures?
3. Do the tests actually verify the core functionality?

If yes to 1, no to 2, and yes to 3 — APPROVE.
Only REJECT if there is a concrete, specific bug or missing core logic.

Respond in EXACTLY this format (no other text):
DECISION: APPROVE
REASON: [one sentence]

OR:
DECISION: REJECT
REASON: [the specific bug or missing logic — one sentence, actionable]
"""

    response = llm.invoke([SystemMessage(content=SYSTEM), HumanMessage(content=prompt)])
    raw = response.content.strip()

    decision = "APPROVE"
    feedback = ""

    for line in raw.splitlines():
        if line.startswith("DECISION:"):
            decision = "APPROVE" if "APPROVE" in line.upper() else "REJECT"
        elif line.startswith("REASON:"):
            feedback = line.replace("REASON:", "").strip()

    log_msg = f"[Critic] Decision: {decision}. {feedback}"
    return {
        "review_decision": decision,
        "review_feedback": feedback,
        "logs": [log_msg]
    }
