from langchain_core.messages import SystemMessage, HumanMessage
from llm.client import get_llm
from graph.state import AgentState

SYSTEM = """You are a Senior Software Developer. You write clean, correct, production-ready code. \
You follow the implementation plan exactly and output complete file contents — never partial snippets."""


def developer_node(state: AgentState) -> dict:
    iteration = state.get("iteration_count", 0)
    feedback_section = ""
    if iteration > 0:
        feedback_section = f"""
CRITIC FEEDBACK FROM PREVIOUS ATTEMPT (fix these issues):
{state.get('review_feedback', '')}
"""

    llm = get_llm(temperature=0.05)
    prompt = f"""IMPLEMENTATION PLAN:
{state['plan']}

RELEVANT CODE CONTEXT:
{state['code_context']}
{feedback_section}
For each file that needs to be created or modified, output the COMPLETE file content using this format:

FILE: path/to/file.py
```python
# complete file content here — do NOT truncate
```

Output every file that needs changes. Never output partial files.
"""

    response = llm.invoke([SystemMessage(content=SYSTEM), HumanMessage(content=prompt)])
    code_changes = response.content

    return {
        "code_changes": code_changes,
        "iteration_count": iteration + 1,
        "logs": [f"[Developer] Code written (iteration {iteration + 1})."]
    }
