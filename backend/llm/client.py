import re
import time
from langchain_groq import ChatGroq
from config import GROQ_API_KEY, LLM_MODEL, LLM_TEMPERATURE


def _parse_retry_seconds(msg: str) -> float:
    m = re.search(r'try again in ([\d.]+)(m)?(s)?', str(msg))
    if not m:
        return 0
    val = float(m.group(1))
    if m.group(2) == 'm':
        val *= 60
    return val


class RetryingLLM:
    def __init__(self, llm, max_retries=3):
        self._llm = llm
        self._max_retries = max_retries

    def invoke(self, messages):
        for attempt in range(self._max_retries):
            try:
                return self._llm.invoke(messages)
            except Exception as e:
                msg = str(e)
                if '429' not in msg and 'rate_limit' not in msg.lower():
                    raise
                wait = _parse_retry_seconds(msg)
                if wait > 90 or attempt == self._max_retries - 1:
                    raise
                time.sleep(min(wait + 2, 90))
        return self._llm.invoke(messages)


def get_llm(temperature=None):
    llm = ChatGroq(
        api_key=GROQ_API_KEY,
        model=LLM_MODEL,
        temperature=temperature if temperature is not None else LLM_TEMPERATURE,
    )
    return RetryingLLM(llm)
