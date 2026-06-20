from rag.embedder import embed
from rag.indexer import get_chroma


def query_codebase(collection_name, query, top_k=5):
    client = get_chroma()
    collection = client.get_collection(name=collection_name)

    query_embedding = embed([query])
    results = collection.query(query_embeddings=query_embedding, n_results=top_k)

    hits = []
    for doc, meta in zip(results['documents'][0], results['metadatas'][0]):
        hits.append({
            'content': doc,
            'file': meta['file'],
            'repo': meta['repo']
        })
    return hits
