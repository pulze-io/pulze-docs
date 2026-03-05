---
title: "JavaScript SDK"
description: "Official TypeScript and JavaScript SDK for the RenderFlow API. Full typed access to jobs, tasks, nodes, pools, events, and real-time render monitoring."
"og:title": "RenderFlow JavaScript SDK"
"og:description": "Official TypeScript/JavaScript SDK for the RenderFlow API. Typed access to jobs, tasks, nodes, pools, and real-time events."
"twitter:title": "RenderFlow JavaScript SDK"
keywords: ['render farm JavaScript SDK', 'render farm Node.js integration', 'render farm TypeScript SDK', 'RenderFlow JavaScript SDK']
---

The official RenderFlow JavaScript SDK provides typed access to the full REST API from Node.js and TypeScript projects.

<div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
  <a href="https://www.npmjs.com/package/@pulze-io/renderflow"><img src="https://img.shields.io/npm/v/@pulze-io/renderflow" alt="npm version" /></a>
</div>

## Installation

```bash
npm install @pulze-io/renderflow
```

## Quick start

```typescript
import { RenderFlow } from "@pulze-io/renderflow";

const rf = new RenderFlow({
    apiKey: process.env.RENDERFLOW_API_KEY
});

const jobs = await rf.jobs.list();
console.log(`Found ${jobs.length} jobs`);
```

<Info>
Generate an API key from **Settings → API Keys** in the RenderFlow UI. See the [Authentication](/renderflow/developers/authentication) page for details.
</Info>

## Jobs

### Submit a job

```typescript
const job = await rf.jobs.create({
    name: "Exterior Shot",
    file: "C:/projects/scene.max",
    type: "3dsmax.render",
    host: { id: "3dsmax", name: "3ds Max", version: "2026" },
    engine: { id: "vray", name: "V-Ray", version: "7.20.04" },
    frame: "1-100",
    resolution: "1920x1080",
    priority: 75,
    status: "pending"
});

await rf.jobs.start(job.id);
```

### Manage jobs

```typescript
// Get a specific job
const job = await rf.jobs.get("job_id");

// Update job settings
await rf.jobs.update("job_id", {
    priority: 100,
    limit: 5,
    max_batch_size: 10
});

// Control jobs
await rf.jobs.stop("job_id");
await rf.jobs.reset("job_id");
await rf.jobs.archive("job_id");
await rf.jobs.delete("job_id");
```

## Tasks

```typescript
// List tasks for a job (paginated)
const tasks = await rf.tasks.list("job_id", 1, 50);

// Get a specific task
const task = await rf.tasks.get("task_id");

// Get task logs
const logs = await rf.tasks.logs("task_id", 0, 500);

// Get task thumbnail
const thumbnail = await rf.tasks.thumbnail("task_id");
```

## Nodes

```typescript
// List all nodes
const nodes = await rf.nodes.list();

// Get node details
const node = await rf.nodes.get("node_id");

// Update node status
await rf.nodes.updateStatus("node_id", "suspended");

// Assign to a pool
await rf.nodes.updatePool("node_id", "pool_id");

// Get node utilization
const util = await rf.nodes.utilization("node_id");

// Get benchmark rankings
const benchmarks = await rf.nodes.benchmarks("vray");
```

## Pools

```typescript
const pools = await rf.pools.list();
const pool = await rf.pools.get("pool_id");
```

## Users

```typescript
const users = await rf.users.list();
const user = await rf.users.get("user_id");
```

## Errors

```typescript
const errors = await rf.errors.list();
const jobErrors = await rf.errors.byJob("job_id");
const nodeErrors = await rf.errors.byNode("node_id");
```

## Real-time events

Subscribe to live updates using Server-Sent Events:

```typescript
// Listen to all job changes
const listener = rf.jobs.on((event) => {
    console.log(event.type);      // "insert" | "update" | "delete" | "replace"
    console.log(event.document);  // full job document
    console.log(event.updated);   // changed fields (on update)
    console.log(event.time);      // event timestamp
});

// Listen to task events for a specific job
const taskListener = rf.tasks.on("job_id", (event) => {
    console.log(`Task ${event.document._id}: ${event.document.status}`);
});

// Listen to node events
const nodeListener = rf.nodes.on((event) => {
    console.log(`Node ${event.document.name}: ${event.document.status}`);
});

// Error handling
const listener = rf.jobs.on(
    (event) => console.log(event),
    (error) => console.error("Connection error:", error)
);

// Stop listening
listener.close();
```

## Service info

```typescript
const info = await rf.info.get();
console.log(`RenderFlow ${info.version} (${info.node_type})`);
```

## API reference

The SDK maps directly to the [REST API](/renderflow/developers/rest-api) endpoints. Every method returns typed responses matching the API schemas.

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
| `rf.tasks.list(jobId, page, limit)` | `GET /tasks` |
| `rf.tasks.get(id)` | `GET /tasks/{id}` |
| `rf.tasks.logs(id, offset, limit)` | `GET /tasks/{id}/logs` |
| `rf.tasks.thumbnail(id)` | `GET /tasks/{id}/thumbnail` |
| `rf.nodes.list()` | `GET /nodes` |
| `rf.nodes.get(id)` | `GET /nodes/{id}` |
| `rf.nodes.updateStatus(id, status)` | `PATCH /nodes/{id}/status` |
| `rf.nodes.updatePool(id, poolId)` | `PATCH /nodes/{id}/pool` |
| `rf.nodes.utilization(id)` | `GET /nodes/{id}/utilization` |
| `rf.nodes.benchmarks(type)` | `GET /nodes/benchmarks/ranking` |
| `rf.pools.list()` | `GET /pools` |
| `rf.pools.get(id)` | `GET /pools/{id}` |
| `rf.users.list()` | `GET /users` |
| `rf.users.get(id)` | `GET /users/{id}` |
| `rf.errors.list()` | `GET /errors` |
| `rf.errors.byJob(id)` | `GET /errors/job/{id}` |
| `rf.errors.byNode(id)` | `GET /errors/node/{id}` |
| `rf.info.get()` | `GET /info` |

---
