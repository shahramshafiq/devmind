from langgraph.graph import StateGraph, END
from graph.state import AgentState
from agents.analyst import analyst_node
from agents.architect import architect_node
from agents.developer import developer_node
from agents.qa import qa_node
from agents.critic import critic_node
from agents.pr_writer import pr_writer_node

MAX_ITERATIONS = 5


def route_after_critic(state: AgentState) -> str:
    if state["review_decision"] == "APPROVE":
        return "pr_writer"
    if state.get("iteration_count", 0) >= MAX_ITERATIONS:
        return "pr_writer"
    return "developer"


def build_pipeline():
    graph = StateGraph(AgentState)

    graph.add_node("analyst", analyst_node)
    graph.add_node("architect", architect_node)
    graph.add_node("developer", developer_node)
    graph.add_node("qa", qa_node)
    graph.add_node("critic", critic_node)
    graph.add_node("pr_writer", pr_writer_node)

    graph.set_entry_point("analyst")
    graph.add_edge("analyst", "architect")
    graph.add_edge("architect", "developer")
    graph.add_edge("developer", "qa")
    graph.add_edge("qa", "critic")
    graph.add_conditional_edges(
        "critic",
        route_after_critic,
        {
            "developer": "developer",
            "pr_writer": "pr_writer"
        }
    )
    graph.add_edge("pr_writer", END)

    return graph.compile()


pipeline = build_pipeline()
