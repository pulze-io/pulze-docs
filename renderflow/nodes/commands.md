---
title: "Commands"
description: "Remote commands for managing render nodes: suspend, restart, shutdown, wake, and more."
"og:title": "RenderFlow Node Commands"
"og:description": "Control render nodes remotely with RenderFlow. Suspend, activate, restart, shutdown, wake up, and manage spawner mode from the node table."
"twitter:title": "RenderFlow Node Commands"
keywords: ['render farm remote management', 'render node remote commands', 'Wake-on-LAN render farm', 'remote shutdown render nodes', 'render node remote control']
---

RenderFlow lets you control nodes remotely from the Nodes table. Select one or more nodes, right-click to open the context menu, and choose a command. You can select individual nodes with **Ctrl + click** or a range with **Shift + click** to apply commands in batch.

## Available commands

**Activate** puts a suspended or reserved node back into the active pool so it can pick up new tasks.

**Suspend** pauses the node immediately. Any currently running task is interrupted and the node stops accepting work.

**Finish Task and Suspend** lets the node complete its current task, then suspends it. No new tasks are assigned and no in-progress work is lost. This is the graceful way to take a node offline.

**Reserve** sets the node to a reserved state. Reserved nodes do not pick up regular jobs. This is used primarily for [Spawner Mode](/renderflow/nodes/spawner-mode).

**Pool** reassigns the node to a different pool.

**CPU Affinity** controls how many CPU cores the node uses for rendering. See [CPU Affinity](/renderflow/nodes/cpu-affinity).

**Edit Tags** opens the tag editor for the selected nodes. See [Tags](/renderflow/nodes/tags).

**Refresh Software** re-runs the software scan on the node. Use this after installing a new application or plugin on the machine so RenderFlow picks up the change.

**Restart** restarts the RenderFlow service on the node.

**Shutdown** shuts down the computer remotely.

**Wakeup** sends a Wake-on-LAN signal to power on the computer. The target machine must have Wake-on-LAN enabled in its BIOS settings.

**Start Spawner** and **Stop Spawner** control [Spawner Mode](/renderflow/nodes/spawner-mode) for distributed rendering.

**Delete** removes the node from RenderFlow. The node will reappear if it reconnects.

## Additional commands in node details

The node detail panel offers a few extra options not available in the context menu. **Errors** shows any errors the node has encountered. **Remote Desktop** opens a remote desktop connection to the node.

<Frame caption="Node context menu with batch commands">
  <img src="/images/renderflow/rf_nodes_context_menu.png" alt="Right-click context menu showing status, pool, restart, shutdown, and other commands" />
</Frame>
