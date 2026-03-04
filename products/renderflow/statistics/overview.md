---
title: "Statistics"
sidebarTitle: "Farm Dashboards"
description: "Dashboards and charts showing render farm utilization, performance, and usage patterns."
"og:title": "RenderFlow Statistics Dashboard"
"og:description": "Monitor render farm performance with RenderFlow's statistics dashboards. Track node utilization, render times, user activity, software usage, and benchmark rankings."
"twitter:title": "RenderFlow Statistics Dashboard"
keywords: ['render farm statistics', 'render farm utilization dashboard', 'render farm analytics', 'render node utilization tracking', 'render time statistics', 'render farm performance metrics']
---

The Statistics section is a collection of dashboards and charts that give you insights into how your render farm is being used. It is accessible from the main menu. Statistics work with any farm size, but they become especially valuable in larger studios with many workstations and render nodes.

<Info>
Statistics are calculated and updated once per hour. Recent activity may not appear immediately.
</Info>

## Available dashboards

### Node Utilization Timeline

A timeline showing render sessions per node. Each line represents a period when a node was working on a job. You can filter by individual node, sort by name or duration, and set a date range using presets (1 hour to 7 days) or a custom range. This is helpful for reviewing weekend render sessions or verifying which machines were active during a specific period.

### Node Utilization %

A line chart showing what percentage of total capacity was used over a time range. View the entire farm or drill down to individual nodes. A node at 100% was rendering continuously during that period. This is one of the clearest indicators of whether your farm is being used efficiently.

### Jobs per Type

A breakdown of completed jobs by type (3ds Max, Blender, Scene Manager, etc.) over a date range. Useful for understanding your workload distribution across applications.

### Jobs per User

The same breakdown, but grouped by user. See who is submitting the most jobs and how workload is distributed across the team.

### Node Render Time

A ranking of nodes by total render time within a time range, including the number of jobs and tasks each node processed. The top of the list shows your most utilized machines. The bottom is equally interesting: under-utilized nodes may have errors, hardware problems, or simply be misconfigured.

### User Render Time

A ranking of users by total render time. See who is consuming the most farm resources.

### Software Usage Count

A bar chart showing how many times each application and plugin has been used across jobs. In larger studios, this helps identify which plugins are actively used and which are rarely touched, informing decisions about software subscriptions.

### Benchmark Score

A ranking of nodes by [benchmark](/products/renderflow/nodes/benchmark) score. Select the benchmark type (V-Ray CPU, Blender, Corona, Cinebench) to compare hardware performance across your farm.

### Job Status

A donut chart showing the current distribution of jobs by status (pending, working, completed, suspended, etc.). A quick snapshot of the farm's current state.

<Frame caption="Node Utilization Timeline showing render sessions across the farm">
  <img src="https://placehold.co/900x500?text=Node+Utilization+Timeline" alt="Timeline chart showing render sessions per node over a date range" />
</Frame>

<Frame caption="Node Render Time ranking showing most and least utilized machines">
  <img src="https://placehold.co/900x500?text=Node+Render+Time+ranking" alt="Bar chart ranking nodes by total render time" />
</Frame>
