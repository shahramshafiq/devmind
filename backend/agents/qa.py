from langchain_core.messages import SystemMessage, HumanMessage
from llm.client import get_llm
from graph.state import AgentState

SYSTEM = """You are a QA Engineer. You write thorough unit tests that cover normal cases, \
edge cases, and error conditions. You use pytest."""


def qa_node(state: AgentState) -> dict:
    llm = get_llm(temperature=0.05)
    prompt = f"""IMPLEMENTATION PLAN:
{state['plan']}

CODE CHANGES:
{state['code_changes']}

Write unit tests for the changed code. Cover:
1. Happy path (normal usage)
2. Edge cases (empty inputs, boundary values)
3. Error conditions (invalid inputs, exceptions)

Output complete test file(s) in this format:

FILE: tests/test_changes.py
```python
# complete test code here
```
"""

    response = llm.invoke([SystemMessage(content=SYSTEM), HumanMessage(content=prompt)])
    tests = response.content

    return {
        "tests": tests,
        "logs": ["[QA Engineer] Unit tests written."]
    }
