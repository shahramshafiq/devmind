# DevMind backend for Hugging Face Spaces (Docker SDK, free CPU tier).
# Clones the public repo at build time, so the Space itself needs only this
# Dockerfile and README.md. Use "Factory rebuild" on the Space to pull new commits.
FROM python:3.11-slim

RUN apt-get update && apt-get install -y --no-install-recommends git \
    && rm -rf /var/lib/apt/lists/*

# Spaces run as uid 1000; the app writes chromadb_store/, repos/ and devmind.db
RUN useradd -m -u 1000 user
USER user
ENV HOME=/home/user \
    PATH=/home/user/.local/bin:$PATH \
    HF_HOME=/home/user/.cache/huggingface \
    PYTHONUNBUFFERED=1

WORKDIR /home/user
RUN git clone --depth 1 https://github.com/shahramshafiq/devmind.git app
WORKDIR /home/user/app/backend

# CPU-only torch keeps the image small; sentence-transformers would otherwise pull CUDA wheels
RUN pip install --no-cache-dir torch --index-url https://download.pytorch.org/whl/cpu \
    && pip install --no-cache-dir -r requirements.txt

# Bake the embedding model into the image so the first request is not a cold download
RUN python -c "from sentence_transformers import SentenceTransformer; SentenceTransformer('all-MiniLM-L6-v2')"

EXPOSE 7860
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7860"]
