---
title: "Nodes Overview"
sidebarTitle: "How Nodes Work"
description: "Manage render nodes, workstations, and servers in RenderFlow. Understand node states, pools, types, connections, and the real-time monitoring table."
"og:title": "RenderFlow Node Management"
"og:description": "Manage render nodes, workstations, and servers in RenderFlow. Understand node states, pools, types, and the real-time monitoring table."
"twitter:title": "RenderFlow Node Management"
keywords: ['render farm node management', 'render node states', 'render farm pools', 'manage render nodes', 'render farm computer management']
---

A **node** is any computer connected to RenderFlow. The term covers all machine types: the server, workstations where artists work, and dedicated render nodes. Each node appears in the Nodes view with a type icon next to its name to help you identify it at a glance.

| Icon | Type | Description |
|------|------|-------------|
| Home | Your computer | The machine you are currently using |
| Database | Server | The RenderFlow server coordinating all jobs |
| Monitor | Workstation | An artist's machine that can also render |
| Server | Render node | A dedicated machine for rendering |

## Node states

Every node has a state that reflects what it is currently doing.

**Offline** means the node is not connected to the server.

**Loading** means the node is starting up or preparing for work.

**Idle** means the node is connected and ready to pick up tasks.

**Busy** means the node is actively working on a task.

**Finishing** means the node is completing its current task before changing state (for example, after a Finish Task and Suspend command).

**Suspended** means the node has been manually paused. It will not pick up new tasks.

**Reserved** means the node is set aside for a special purpose, such as [Spawner Mode](/products/renderflow/nodes/spawner-mode).

**Error** means the node encountered a problem with its last task.

## Connecting nodes

Nodes connect to the server during the [configuration process](/products/renderflow/getting-started/installation). The server address can be set through the setup UI, a command-line argument, an environment variable, or by editing the config file at `C:\ProgramData\RenderFlow\service.json`. Nodes can also discover the server automatically if it is broadcasting on the same network.

When a node connects for the first time, it is placed in the default pool. You can change its pool assignment at any time.

## Pools

Pools let you organize nodes into groups. Nodes only work on jobs submitted to their own pool. A node in the "GPU" pool will not pick up jobs submitted to the "CPU" pool.

The **default pool** is always present and cannot be deleted. New nodes join the default pool automatically. You can create additional pools with the **Add Pool** button. If you delete a pool, its nodes and jobs are moved back to the default pool.

Each pool has a distribution mode. **Default** assigns nodes based on job priority and submission order. **Balanced** distributes nodes evenly across active jobs in the pool.

## The Nodes table

The Nodes view uses the same table interface as the [Jobs view](/products/renderflow/jobs/monitoring). You can sort by clicking column headers, filter by status, type, pool, or tag, and customize which columns are visible.

The default columns are: #, Name, User, Status, Info, Job, Task, CPU activity, and RAM usage. Additional columns include License, CPU model, CPU cores, RAM total, Disk usage, Last seen, IP, Tags, and Version.

<Frame caption="Node monitoring table with status, hardware, and job information">
  <img src="https://placehold.co/900x500?text=Nodes+monitoring+table" alt="Nodes table showing connected machines with status, CPU, RAM, and current job" />
</Frame>

## Node details

Double-click a node row or press the **Open** button to view its details. The detail panel shows hardware information, installed software, benchmark scores, and current activity.

## Editing a node

Press the **edit button** (pen icon) in the node details to open the edit modal. You can change the **display name** (this renames the node inside RenderFlow without changing the actual computer name), assign a different **pool**, and add or remove **[tags](/products/renderflow/nodes/tags)**. A reset button restores the display name to the original computer name.
