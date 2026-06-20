import os
from pathlib import Path
import chromadb
import git
from langchain_text_splitters import RecursiveCharacterTextSplitter
from rag.embedder import embed
from config import CHROMADB_PATH, REPOS_PATH

CODE_EXTENSIONS = {
    '.py', '.js', '.ts', '.jsx', '.tsx',
    '.java', '.cpp', '.c', '.h', '.go',
    '.rs', '.cs', '.rb', '.php',
    '.html', '.css', '.md', '.json', '.yaml', '.yml'
}

SKIP_DIRS = {'node_modules', '.git', 'venv', '__pycache__', '.venv', 'dist', 'build', '.next'}

_chroma = None

def get_chroma():
    global _chroma
    if _chroma is None:
        os.makedirs(CHROMADB_PATH, exist_ok=True)
        _chroma = chromadb.PersistentClient(path=CHROMADB_PATH)
    return _chroma


def clone_repo(repo_url, repo_name):
    target = os.path.join(REPOS_PATH, repo_name)
    if os.path.exists(target):
        return target
    os.makedirs(REPOS_PATH, exist_ok=True)
    git.Repo.clone_from(repo_url, target, depth=1)
    return target


def collect_files(repo_path):
    collected = []
    for path in Path(repo_path).rglob('*'):
        if not path.is_file():
            continue
        if path.suffix not in CODE_EXTENSIONS:
            continue
        if any(skip in path.parts for skip in SKIP_DIRS):
            continue
        collected.append(path)
    return collected


def index_repo(repo_url, repo_name):
    repo_path = clone_repo(repo_url, repo_name)
    files = collect_files(repo_path)

    splitter = RecursiveCharacterTextSplitter(chunk_size=800, chunk_overlap=100)

    all_docs = []
    all_metas = []
    all_ids = []
    chunk_id = 0

    for fpath in files:
        try:
            content = fpath.read_text(encoding='utf-8', errors='ignore')
            if not content.strip():
                continue
            rel = str(fpath.relative_to(repo_path)).replace('\\', '/')
            chunks = splitter.split_text(content)
            for chunk in chunks:
                all_docs.append(chunk)
                all_metas.append({'file': rel, 'repo': repo_name, 'ext': fpath.suffix})
                all_ids.append(f'chunk_{chunk_id}')
                chunk_id += 1
        except Exception:
            continue

    collection_name = repo_name.replace('-', '_').replace('/', '_').replace('.', '_')
    client = get_chroma()

    try:
        client.delete_collection(collection_name)
    except Exception:
        pass

    collection = client.create_collection(name=collection_name)

    batch = 100
    for i in range(0, len(all_docs), batch):
        batch_docs = all_docs[i:i+batch]
        batch_embeddings = embed(batch_docs)
        collection.add(
            documents=batch_docs,
            embeddings=batch_embeddings,
            metadatas=all_metas[i:i+batch],
            ids=all_ids[i:i+batch]
        )

    return {
        'repo': repo_name,
        'collection': collection_name,
        'files_indexed': len(files),
        'chunks_stored': chunk_id
    }
