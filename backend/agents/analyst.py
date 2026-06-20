from langchain_core.messages import SystemMessage, HumanMessage
from llm.client import get_llm
from rag.retriever import query_codebase
from graph.state import AgentState

SYSTEM = """You are a Codebase Analyst. Your job is to understand a GitHub issue \
and identify the relevant parts of the codebase that need to change."""


def analyst_node(state: AgentState) -> dict:
    issue_title = state["issue_title"]
    issue_body = state["issue_body"]
    collection = state["collection_name"]

    hits_title = query_codebase(collection, issue_title, top_k=4)
    hits_body = query_codebase(collection, issue_body[:300], top_k=4)

    seen = set()
    combined = []
    for hit in hits_title + hits_body:
        key = hit["file"] + hit["content"][:50]
        if key not in seen:
            seen.add(key)
            combined.append(hit)

    code_context = ""
    for hit in combined[:8]:
        code_context += f"\n--- {hit['file']} ---\n{hit['content']}\n"

    llm = get_llm()
    prompt = f"""ISSUE TITLE: {issue_title}

ISSUE BODY:
{issue_body}

RELEVANT CODE FROM THE CODEBASE:
{code_context}

Provide:
1. A clear summary of what needs to be fixed or implemented
2. Which files are most likely involved and why
3. Current behavior vs expected behavior
4. Any important constraints or edge cases to watch for
"""

    response = llm.invoke([SystemMessage(content=SYSTEM), HumanMessage(content=prompt)])
    analysis = response.content

    return {
        "code_context": code_context,
        "analysis": analysis,
        "logs": [f"[Analyst] Indexed {len(combined)} relevant code chunks. Analysis complete."]
    }
