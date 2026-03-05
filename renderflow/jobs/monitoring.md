---
title: "Monitoring"
description: "Monitor render jobs in real time with a customizable table showing progress, active nodes, elapsed and remaining time, with filtering and batch controls."
"og:title": "RenderFlow Job Monitoring"
"og:description": "Monitor render jobs in real time with RenderFlow's customizable job table, filters, sorting, and visual progress indicators."
"twitter:title": "RenderFlow Job Monitoring"
keywords: ['render farm monitoring', 'render farm dashboard', 'render job progress tracking', 'real-time render monitoring', 'render farm live status']
---

The Jobs view is your primary window into what is happening on the farm. It displays all submitted jobs in a customizable table with real-time progress updates, filtering, sorting, and batch controls.

## Job table

The job table works like a database view. Each row is a job, and columns show key information at a glance. The default columns are: #, Name, User, Status, Priority, Progress, Nodes, Total, Elapsed, Remaining, Created, Started, and Finished.

Progress, the number of active nodes, and the remaining time estimate are all updated in real time as nodes work through tasks.

<Frame caption="Job monitoring table showing jobs in various states with real-time progress">
  <img src="https://placehold.co/900x500?text=Job+monitoring+table" alt="Job table with multiple jobs showing status, progress, and timing information" />
</Frame>

## Customizing columns

Click the **Columns** button in the top-right area above the table to add, remove, or reorder columns. You can drag columns in the list to change their order, and the table updates to match. This lets you focus on the information most relevant to your workflow.

<Frame caption="Column customization panel">
  <img src="https://placehold.co/900x500?text=Column+customization+panel" alt="Column settings showing available columns with drag handles for reordering" />
</Frame>

## Filtering and sorting

The table can be filtered by **My Jobs Only** (shows only jobs you submitted), by **status** (select one or more states from the list), and by **pool** (if your farm uses multiple pools).

Clicking any column header sorts the table by that column. Click again to reverse the sort direction.

## Context menu

Right-click a job (or select multiple jobs and right-click) to access the context menu. The available actions depend on the current state of the selected jobs.

**Start** and **Stop** control whether the job is active in the queue.

**Finish and Stop** lets running frames complete, then suspends the job. No new tasks are assigned and no in-progress work is lost.

**Reset** clears all progress and puts the job back to Pending.

**Edit** opens the full job settings for modification.

**Quick Edit** lets you change Priority, Node Limit, or Whitelist Nodes without opening the full editor. This is the fastest way to reprioritize a job while it is running.

**Archive** moves the job out of the active list.

**Delete** permanently removes the job.

<Frame caption="Context menu with available job actions">
  <img src="https://placehold.co/900x500?text=Job+context+menu" alt="Right-click context menu showing Start, Stop, Reset, Edit, Quick Edit, Archive, Delete" />
</Frame>

## Multi-selection

You can select multiple jobs using **Ctrl + click** to pick individual jobs or **Shift + click** to select a range. Actions from the context menu apply to all selected jobs at once, making it easy to batch-start, batch-stop, or reprioritize several jobs together.

## Visual progress bar

At the bottom of the Jobs page, a horizontal bar shows the aggregate state of all tasks across all visible jobs. Each segment is color-coded: completed, working, suspended, and pending. This gives you an instant, visual read on the overall farm workload.

<Frame caption="Visual progress bar at the bottom of the Jobs page">
  <img src="https://placehold.co/900x500?text=Visual+progress+bar" alt="Horizontal bar showing colored segments for completed, working, suspended, and pending tasks" />
</Frame>

## Going deeper

The job table is designed for a quick overview of the farm's state. For detailed information about a specific job, including per-task progress, frame previews, render logs, and error details, open the job's detail panel. See [Tasks and Details](/renderflow/jobs/tasks-and-details).
