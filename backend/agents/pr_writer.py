from langchain_core.messages import SystemMessage, HumanMessage
from llm.client import get_llm
from graph.state import AgentState

SYSTEM = """You are a technical writer who creates clear, professional GitHub pull request descriptions. \
You are concise and focus on what changed and why."""


def pr_writer_node(state: AgentState) -> dict:
    iterations = state.get("iteration_count", 1)
    llm = get_llm()
    prompt = f"""ISSUE SOLVED: {state['issue_title']}

ISSUE BODY:
{state['issue_body']}

CODE CHANGES MADE:
{state['code_changes']}

TESTS ADDED:
{state['tests']}

Write a professional GitHub PR. Respond in EXACTLY this format:

TITLE: [concise title under 72 characters, start with a verb like Fix/Add/Update]
BODY:
## Summary
[2-3 sentences: what was the problem and what was done to fix it]

## Changes
[bullet points listing specific files/functions changed and what was changed]

## Testing
[bullet points describing what the tests cover]

Closes #{state.get('issue_number', 'N/A')}
"""

    response = llm.invoke([SystemMessage(content=SYSTEM), HumanMessage(content=prompt)])
    raw = response.content.strip()

    pr_title = ""
    pr_body = ""
    lines = raw.splitlines()
    body_start = None

    for i, line in enumerate(lines):
        if line.startswith("TITLE:"):
            pr_title = line.replace("TITLE:", "").strip()
        if line.startswith("BODY:"):
            body_start = i + 1
            break

    if body_start is not None:
        pr_body = "\n".join(lines[body_start:]).strip()

    return {
        "pr_title": pr_title,
        "pr_body": pr_body,
        "logs": [f"[PR Writer] PR ready after {iterations} developer iteration(s)."]
    }
