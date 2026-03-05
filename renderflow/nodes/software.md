---
title: "Software"
description: "RenderFlow automatically detects applications, render engines, and plugins on each node. View versions, compare across machines, and refresh scans on demand."
"og:title": "RenderFlow Node Software Detection"
"og:description": "RenderFlow automatically detects all supported applications, render engines, and plugins installed on each node. View versions, refresh scans, and launch apps remotely."
"twitter:title": "RenderFlow Node Software Detection"
keywords: ['render farm software detection', 'render node installed software', 'render farm plugin detection', 'render node software versions']
---

The Software section in the node detail panel lists all supported applications and plugins detected on the machine. RenderFlow scans for installed software automatically during startup and uses this information for [job requirements](/renderflow/jobs/requirements) matching.

## What is detected

Each supported application is listed with its version. Applications like 3ds Max can be expanded to show all detected render engines and plugins with their individual versions. This gives you a complete picture of what each node is capable of rendering.

## Quick actions

On your own computer, some applications have quick-action buttons next to them. You can start the application or open its installation folder directly from RenderFlow.

## Refreshing the scan

If you install a new application or plugin on a node after RenderFlow is already running, the software list will not update automatically. Click the **Refresh** button to re-run the scan and update the detected software. You can also trigger this from the [Commands](/renderflow/nodes/commands) context menu using **Refresh Software**.

<Frame caption="Software details showing 3ds Max with render engines and plugins expanded">
  <img src="/images/renderflow/rf_nodes_software_details.png" alt="Software panel with expandable application list showing engines and plugins with versions" />
</Frame>
