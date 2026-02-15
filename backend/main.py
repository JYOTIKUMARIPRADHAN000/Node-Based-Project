from fastapi import FastAPI
from pydantic import BaseModel
from collections import defaultdict, deque
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# ---- CORS (allow React) ----
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---- Request Model ----
class Pipeline(BaseModel):
    nodes: list
    edges: list

# ---- DAG CHECK ----
def is_dag(nodes, edges):
    graph = defaultdict(list)
    indegree = defaultdict(int)

    # initialize nodes
    for node in nodes:
        indegree[node["id"]] = 0

    # build graph
    for edge in edges:
        src = edge["source"]
        tgt = edge["target"]
        graph[src].append(tgt)
        indegree[tgt] += 1

    # Kahn's Algorithm
    queue = deque([n for n in indegree if indegree[n] == 0])
    visited = 0

    while queue:
        node = queue.popleft()
        visited += 1
        for neighbor in graph[node]:
            indegree[neighbor] -= 1
            if indegree[neighbor] == 0:
                queue.append(neighbor)

    return visited == len(nodes)

# ---- API ----
@app.post("/pipelines/parse")
def parse_pipeline(pipeline: Pipeline):

    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    dag = is_dag(pipeline.nodes, pipeline.edges)

    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": dag
    }
