---
title: "Python SDK"
description: "Official Python SDK for the RenderFlow API. Automate job submission, node management, and farm monitoring with a fully typed, async-ready client."
"og:title": "RenderFlow Python SDK"
"og:description": "Official Python SDK for the RenderFlow API. Full typed access to jobs, tasks, nodes, pools, and real-time events."
"twitter:title": "RenderFlow Python SDK"
keywords: ['render farm Python SDK', 'render farm Python automation', 'Python render farm scripting', 'RenderFlow Python SDK']
---

The official RenderFlow Python SDK provides typed access to the full REST API with Pydantic models.

<div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
  <a href="https://pypi.org/project/pulze-renderflow/"><img src="https://img.shields.io/pypi/v/pulze-renderflow" alt="PyPI version" /></a>
</div>

## Installation

```bash
pip install pulze-renderflow
```

Requires Python 3.10+. Dependencies: `httpx` (0.23.0+), `pydantic` (2.0.0+).

## Quick start

```python
from renderflow import RenderFlow

rf = RenderFlow(api_key="your_api_key")

jobs = rf.jobs.list()
print(f"Found {len(jobs)} jobs")
```

<Info>
Generate an API key from **Settings → API Keys** in the RenderFlow UI. See the [Authentication](/renderflow/developers/authentication) page for details.
</Info>

## Jobs

### Submit a job

```python
from renderflow import RenderFlow, IPublicJobCreate
from renderflow.models import ISoftwareValue, IEngineValue, SoftwareId, EngineId

rf = RenderFlow(api_key="your_api_key")

job = rf.jobs.create(IPublicJobCreate(
    name="Exterior Shot",
    file="C:/projects/scene.max",
    type="3dsmax.render",
    host=ISoftwareValue(id=SoftwareId._3dsmax, name="3ds Max", version="2026"),
    engine=IEngineValue(id=EngineId.vray, name="V-Ray", version="7.20.04"),
    frame="1-100",
    resolution="1920x1080",
    priority=75,
    status="pending"
))

rf.jobs.start(job.id)
```

### Manage jobs

```python
# Get a specific job
job = rf.jobs.get("job_id")

# Update job settings
rf.jobs.update("job_id", IPublicJobUpdate(
    priority=100,
    limit=5,
    max_batch_size=10
))

# Control jobs
rf.jobs.stop("job_id")
rf.jobs.reset("job_id")
rf.jobs.archive("job_id")
rf.jobs.delete("job_id")
```

## Tasks

```python
# List tasks for a job (paginated)
tasks = rf.tasks.list("job_id", page=1, limit=50)

# Get a specific task
task = rf.tasks.get("task_id")

# Get task logs
logs = rf.tasks.logs("task_id", offset=0, limit=500)

# Get task thumbnail
thumbnail = rf.tasks.thumbnail("task_id")
```

## Nodes

```python
# List all nodes
nodes = rf.nodes.list()

# Get node details
node = rf.nodes.get("node_id")

# Update node status
rf.nodes.update_status("node_id", "suspended")

# Assign to a pool
rf.nodes.update_pool("node_id", "pool_id")

# Get node utilization
util = rf.nodes.utilization("node_id")

# Get benchmark rankings
benchmarks = rf.nodes.benchmarks("vray")
```

## Pools

```python
pools = rf.pools.list()
pool = rf.pools.get("pool_id")
```

## Users

```python
users = rf.users.list()
user = rf.users.get("user_id")
```

## Errors

```python
errors = rf.errors.list()
job_errors = rf.errors.by_job("job_id")
node_errors = rf.errors.by_node("node_id")
```

## Real-time events

Subscribe to live updates using Server-Sent Events:

```python
# Listen to all job changes
listener = rf.jobs.on(lambda event: print(
    event.type,      # "insert" | "update" | "delete" | "replace"
    event.document,  # full job document
    event.updated,   # changed fields (on update)
    event.time       # event timestamp
))

# Listen to task events for a specific job
task_listener = rf.tasks.on("job_id", lambda event: print(
    f"Task {event.document['_id']}: {event.document['status']}"
))

# Listen to node events
node_listener = rf.nodes.on(lambda event: print(
    f"Node {event.document['name']}: {event.document['status']}"
))

# Error handling
listener = rf.jobs.on(
    lambda event: print(event),
    lambda error: print(f"Connection error: {error}")
)

# Stop listening
listener.close()

# Also works as a context manager
with rf.jobs.on(on_event) as listener:
    import time
    time.sleep(60)
```

## Service info

```python
info = rf.info.get()
print(f"RenderFlow {info.version} ({info.node_type})")
```

## API reference

The SDK maps directly to the [REST API](/renderflow/developers/rest-api) endpoints. Every method returns typed Pydantic models matching the API schemas.

| SDK method | REST endpoint |
|------------|--------------|
| `rf.jobs.list()` | `GET /jobs` |
| `rf.jobs.get(id)` | `GET /jobs/{id}` |
| `rf.jobs.create(data)` | `POST /jobs/create` |
| `rf.jobs.update(id, data)` | `PATCH /jobs/{id}` |
| `rf.jobs.delete(id)` | `DELETE /jobs/{id}` |
| `rf.jobs.start(id)` | `POST /jobs/{id}/start` |
| `rf.jobs.stop(id)` | `POST /jobs/{id}/stop` |
| `rf.jobs.reset(id)` | `POST /jobs/{id}/reset` |
| `rf.jobs.archive(id)` | `POST /jobs/{id}/archive` |
| `rf.tasks.list(job_id, page, limit)` | `GET /tasks` |
| `rf.tasks.get(id)` | `GET /tasks/{id}` |
| `rf.tasks.logs(id, offset, limit)` | `GET /tasks/{id}/logs` |
| `rf.tasks.thumbnail(id)` | `GET /tasks/{id}/thumbnail` |
| `rf.nodes.list()` | `GET /nodes` |
| `rf.nodes.get(id)` | `GET /nodes/{id}` |
| `rf.nodes.update_status(id, status)` | `PATCH /nodes/{id}/status` |
| `rf.nodes.update_pool(id, pool_id)` | `PATCH /nodes/{id}/pool` |
| `rf.nodes.utilization(id)` | `GET /nodes/{id}/utilization` |
| `rf.nodes.benchmarks(type)` | `GET /nodes/benchmarks/ranking` |
| `rf.pools.list()` | `GET /pools` |
| `rf.pools.get(id)` | `GET /pools/{id}` |
| `rf.users.list()` | `GET /users` |
| `rf.users.get(id)` | `GET /users/{id}` |
| `rf.errors.list()` | `GET /errors` |
| `rf.errors.by_job(id)` | `GET /errors/job/{id}` |
| `rf.errors.by_node(id)` | `GET /errors/node/{id}` |
| `rf.info.get()` | `GET /info` |

---
