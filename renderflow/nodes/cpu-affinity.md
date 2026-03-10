---
title: "CPU Affinity"
description: "Set CPU affinity in RenderFlow to control how many cores a workstation dedicates to rendering, keeping the machine responsive for artists during the day."
"og:title": "RenderFlow CPU Affinity"
"og:description": "Set CPU affinity in RenderFlow to control how many cores a workstation dedicates to rendering, keeping the machine responsive for artists during the day."
"twitter:title": "RenderFlow CPU Affinity"
keywords: ['render node CPU affinity', 'limit render cores', 'workstation render while working', 'CPU cores rendering', 'render farm core allocation']
---

CPU affinity lets you control how many CPU cores a node dedicates to rendering. This is especially useful for workstations where an artist is actively working while the machine also contributes to the render farm.

## When to use it

During the day, an artist might be doing lightweight tasks like reviewing references, writing emails, or working in Photoshop. Their powerful workstation has spare capacity that could be rendering frames. By setting CPU affinity to use, say, half the available cores, the machine can render without making the artist's work sluggish.

## How to set it

Select one or more nodes in the Nodes table, right-click, and choose **CPU Affinity**. A slider lets you set the number of cores dedicated to rendering, from 1 up to the node's total core count.

<Frame caption="CPU affinity setting for a workstation node">
  <img src="/images/renderflow/rf_nodes_cpu_affinity.png" alt="CPU affinity control showing core allocation for rendering" />
</Frame>

<Warning>
Changes to CPU affinity take effect on the next job or task. Currently running tasks are not affected. If a node is mid-render, the new affinity setting will apply when it picks up its next task.
</Warning>
