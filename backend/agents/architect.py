from langchain_core.messages import SystemMessage, HumanMessage
from llm.client import get_llm
from graph.state import AgentState

SYSTEM = """You are a Software Architect. You create precise, step-by-step implementation \
plans that developers can follow exactly. You never write code — only plans."""


def architect_node(state: AgentState) -> dict:
    llm = get_llm()
    prompt = f"""ISSUE: {state['issue_title']}

ISSUE BODY:
{state['issue_body']}

CODEBASE ANALYSIS:
{state['analysis']}

Create a detailed implementation plan. For each step include:
- The exact file path to modify (or create)
- What specifically to add, change, or remove
- The reason for that change

Be precise. The developer will follow this plan without asking questions.
"""

    response = llm.invoke([SystemMessage(content=SYSTEM), HumanMessage(content=prompt)])
    plan = response.content

    return {
        "plan": plan,
        "logs": ["[Architect] Implementation plan created."]
    }
