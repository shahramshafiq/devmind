import os
from dotenv import load_dotenv

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")

LLM_MODEL = "llama-3.3-70b-versatile"
LLM_TEMPERATURE = 0.1

CHROMADB_PATH = "./chromadb_store"
REPOS_PATH = "./repos"
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./devmind.db")
