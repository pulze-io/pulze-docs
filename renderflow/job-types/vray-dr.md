---
title: "V-Ray DR"
description: "Use V-Ray Distributed Rendering through RenderFlow to render a single image across multiple nodes."
"og:title": "V-Ray Distributed Rendering with RenderFlow"
"og:description": "Render a single V-Ray image across multiple computers using RenderFlow's fully managed V-Ray DR workflow. No manual spawner setup required."
"twitter:title": "V-Ray Distributed Rendering with RenderFlow"
keywords: ['V-Ray distributed rendering', 'V-Ray DR setup', 'V-Ray DR render farm', 'V-Ray multi-computer rendering', 'V-Ray spawner managed']
---

V-Ray Distributed Rendering (DR) allows multiple computers to work together on a single still image, similar to [Corona DR](/renderflow/job-types/corona-dr). The key difference is that V-Ray DR in RenderFlow is **fully managed**. You do not need to start Spawner Mode or launch V-Ray Spawner manually on any node.

## How it works

When you submit a V-Ray DR job, the first node assigned becomes the **master**. It opens the scene and starts the render. RenderFlow automatically starts the V-Ray Spawner process on the other assigned nodes, which then join the master as DR helpers. When the job finishes, RenderFlow stops the spawner processes automatically.

This is simpler than the Corona DR workflow because RenderFlow handles the entire spawner lifecycle for you.


## Submission

The submission properties are the same as a standard [3ds Max](/renderflow/job-types/3ds-max) render job. Select the **V-Ray DR** template, pick your file, and configure settings as usual.

<Info>
V-Ray DR supports a maximum of 20 nodes per job and is available for still images only. This limit is set by RenderFlow. In practice, distributed rendering has diminishing returns beyond this point as network overhead outweighs the benefit of additional nodes. Studios that need higher limits can contact support.
</Info>
