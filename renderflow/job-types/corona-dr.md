---
title: "Corona DR"
description: "Use Corona Distributed Rendering through RenderFlow to render a single image across multiple nodes."
"og:title": "Corona Distributed Rendering with RenderFlow"
"og:description": "Render a single Corona image across multiple computers using RenderFlow's managed Corona DR workflow with automatic spawner configuration."
"twitter:title": "Corona Distributed Rendering with RenderFlow"
keywords: ['Corona distributed rendering', 'Corona DR setup', 'Corona DR render farm', 'Corona multi-computer rendering', 'single image multiple computers Corona']
---

Corona Distributed Rendering (DR) is a special job type that harnesses multiple computers to render a single still image together. Instead of splitting frames across nodes, all participating nodes collaborate on the same frame, reducing render time for complex stills.

## How it works

When you submit a Corona DR job, the first node assigned becomes the **master**. It opens the scene and begins rendering. Other nodes join as DR helpers, contributing their processing power to the same image.

RenderFlow handles the setup automatically. When a Corona DR job is submitted, it enables distributed rendering in the Corona render settings and turns on the "Search on LAN" feature, which discovers available Corona spawners. All nodes that are in [Spawner Mode](/renderflow/nodes/spawner-mode) are automatically added to the DR list.


## Spawner Mode requirement

Because of how Corona DR works internally, RenderFlow cannot directly assign specific render nodes to a DR session (beyond the master). Instead, participating nodes need to be in [Spawner Mode](/renderflow/nodes/spawner-mode). You can enable this on selected nodes from the Nodes context menu, or automate it with the [Scheduler](/renderflow/scheduler/overview).

## Submission

The submission properties are the same as a standard [3ds Max](/renderflow/job-types/3ds-max) render job. Select the **Corona DR** template, pick your file, and configure settings as usual.

<Info>
Corona DR is available for still images only. Animation jobs are not supported for this job type, as distributed rendering is designed for single-frame workloads.
</Info>

## Multiple DR jobs

If you submit multiple Corona DR jobs at the same time, Corona itself controls which spawner nodes join which job. RenderFlow does not have control over this assignment. In practice, Corona will distribute available spawners across the active DR sessions.
