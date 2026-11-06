from chromadb.utils.embedding_functions import DefaultEmbeddingFunction

_ef = None


def embed(texts, batch=16):
    # ChromaDB's bundled ONNX build of all-MiniLM-L6-v2: same model and vector size as
    # sentence-transformers, but no PyTorch. Small batches keep peak RAM under 512 MB
    # (batch=100 peaked at ~800 MB on a 2k-chunk repo).
    global _ef
    if _ef is None:
        _ef = DefaultEmbeddingFunction()
    out = []
    for i in range(0, len(texts), batch):
        out += [v.tolist() for v in _ef(texts[i:i + batch])]
    return out
