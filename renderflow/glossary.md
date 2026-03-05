---
title: "Glossary"
description: "Definitions of render farm terminology including jobs, tasks, nodes, pools, repositories, spawner mode, and other key concepts used in RenderFlow."
"og:title": "RenderFlow Glossary"
"og:description": "Definitions of key terms in RenderFlow: jobs, tasks, nodes, pools, templates, requirements, sanity checks, and more."
"twitter:title": "RenderFlow Glossary"
keywords: ['render farm glossary', 'render farm terminology', 'render farm definitions', 'what is a render node', 'render farm terms explained']
---

**API Key.** A secret token required to authenticate with the RenderFlow REST API, SDKs, and CLI. Generated in Settings > API Keys.

**Archive.** Moving a completed job out of the active job list into the repository's archive directory. Archived jobs can be restored at any time.

**Batch Size.** The number of consecutive frames a node renders without unloading the scene from memory. Higher values reduce scene load overhead for heavy scenes and GPU rendering.

**CPU Affinity.** A setting that limits how many CPU cores a node dedicates to rendering. Useful for workstations where an artist is also working.

**DCC.** Digital Content Creation application. Refers to 3D software like 3ds Max, Blender, or Cinema 4D.

**Dependency.** A relationship between jobs where one job waits for another to complete before starting.

**Distributed Rendering (DR).** A technique where multiple computers collaborate on rendering a single image simultaneously. Supported via Corona DR and V-Ray DR job types.

**Finish and Stop.** A job command that lets currently running frames complete, then suspends the job. Unlike Stop, no in-progress work is lost.

**Host Application.** The main DCC application used to create and render a scene (for example, 3ds Max is the host, V-Ray is the engine).

**Integration.** A connection to a third-party service (Slack, Teams, or a webhook) configured in Settings > Integrations and used for job notifications.

**Interruptible.** A job setting that allows higher-priority jobs to pull nodes away. The interrupted frame is lost and re-queued.

**Job.** A collection of tasks submitted to RenderFlow for processing. A job defines what to render and how.

**Job Type.** The category of work a job performs, determined by the application and workflow. Examples: 3ds Max Render, Scene Manager, Blender, Corona DR, V-Ray Standalone.

**Node.** Any computer connected to RenderFlow. Nodes can be servers, workstations, or dedicated render nodes.

**Pool.** A named group of nodes. Jobs are submitted to a specific pool, and only nodes in that pool can work on them. Pools keep farm resources separated between teams or projects.

**Priority.** A value from 0 to 100 assigned to each job. Higher values get nodes first. Jobs with equal priority follow first-in, first-out order.

**Render Engine.** The software that produces the final image from a 3D scene. Examples: V-Ray, Corona, Arnold, Cycles, EEVEE, FStorm.

**Render Node.** A computer dedicated to rendering. It does not need a monitor or active user session.

**Repository.** A shared network folder configured during server setup. RenderFlow uses it to store job data, backups, archives, and temporary files. All connected machines must have access to this folder.

**Requirements.** Automatic software compatibility checks that RenderFlow enforces before assigning a node to a job. Built from the scene's detected applications, engines, plugins, and network drives.

**Sanity Check.** An automated validation that runs on a scene before submission to catch common configuration mistakes. Written in MaxScript for 3ds Max.

**Scheduler.** A weekly calendar that automates node and system actions at specific times (activate, suspend, restart, shutdown, etc.).

**Server.** The computer running the RenderFlow server process. It coordinates all jobs and nodes but does not render.

**Spawner Mode.** A special node state used for Corona DR distributed rendering. Nodes in spawner mode act as DR helpers instead of picking up regular jobs.

**Tag.** A label attached to a node for categorization and filtering. Used in the node table filter and for quick-selecting nodes during job whitelisting.

**Task.** A single unit of work within a job, typically representing one frame or one tile. Each task is processed by exactly one node.

**Template.** A saved set of job settings that can be reused when creating new jobs. System templates define per-application defaults. Custom templates save your own configurations.

**UNC Path.** A Universal Naming Convention path for network resources, formatted as `\\server\share\folder`. Required for assets and outputs so that all nodes can access them.

**Validation Level.** Controls how strictly RenderFlow compares software versions in job requirements. Options range from Low (software exists) to High (exact version match).

**VFB.** Virtual Frame Buffer. The render preview window. RenderFlow can show live VFB previews during rendering for 3ds Max jobs.

**Workstation.** An artist's computer that can also contribute to the render farm when idle or with reduced CPU affinity.
