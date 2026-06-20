from langchain_groq import ChatGroq
from config import GROQ_API_KEY, LLM_MODEL, LLM_TEMPERATURE


def get_llm(temperature=None):
    return ChatGroq(
        api_key=GROQ_API_KEY,
        model=LLM_MODEL,
        temperature=temperature if temperature is not None else LLM_TEMPERATURE,
    )
