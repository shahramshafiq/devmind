import os
from dotenv import load_dotenv

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")

# Groq retires models; override via env var without a redeploy of code.
LLM_MODEL = os.getenv("LLM_MODEL", "openai/gpt-oss-120b")
LLM_TEMPERATURE = 0.1

CHROMADB_PATH = "./chromadb_store"
REPOS_PATH = "./repos"
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./devmind.db")
