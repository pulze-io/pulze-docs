---
title: "Spawner Mode"
description: "Put render nodes into spawner mode for Corona distributed rendering in RenderFlow. Automate spawner scheduling with the built-in scheduler."
"og:title": "RenderFlow Spawner Mode"
"og:description": "Put render nodes into spawner mode for Corona DR distributed rendering in RenderFlow. Automate spawner scheduling with the built-in scheduler."
"twitter:title": "RenderFlow Spawner Mode"
keywords: ['V-Ray spawner mode', 'Corona spawner render farm', 'distributed rendering spawner', 'DR spawner setup']
---

Spawner mode is a special node state used for distributed rendering jobs, specifically [Corona DR](/renderflow/job-types/corona-dr). When a node is in spawner mode, it acts as a DR helper rather than picking up regular render tasks.

<Info>
[V-Ray DR](/renderflow/job-types/vray-dr) does not require spawner mode. RenderFlow manages V-Ray spawners automatically.
</Info>

## Starting spawner mode

Select one or more nodes in the Nodes table, right-click, and choose **Start Spawner**. A popup window appears showing a grid of available host application and render engine combinations (for example, 3ds Max + V-Ray, 3ds Max + Corona). The list is context-sensitive based on the software installed on the selected nodes. Choose the combination you need and confirm. The selected nodes switch to the **Reserved** state and will not pick up regular jobs while in spawner mode.

<Frame caption="Spawner mode options popup">
  <img src="/images/renderflow/rf_nodes_spawner_mode.png" alt="Spawner mode configuration popup with options" />
</Frame>

## Stopping spawner mode

Select the nodes in spawner mode, right-click, and choose **Stop Spawner**. The nodes return to their previous state and resume picking up regular jobs.

## Scheduling spawner mode

You can automate the start and stop of spawner mode using the [Scheduler](/renderflow/scheduler/overview). This is useful when you want specific nodes to act as DR helpers during off-hours and return to regular rendering during the day.
