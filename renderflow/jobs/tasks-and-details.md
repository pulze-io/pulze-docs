---
title: "Tasks and Details"
description: "Inspect individual tasks, view render logs, preview frames, and manage job details."
"og:title": "RenderFlow Tasks and Job Details"
"og:description": "Dive into job details in RenderFlow: inspect individual tasks, preview renders live, open completed frames, and manage per-node errors and logs."
"twitter:title": "RenderFlow Tasks and Job Details"
keywords: ['render farm task management', 'render frame preview', 'render progress per frame', 'VFB live preview render farm', 'render farm job details']
---

The job detail panel is where you go for everything beyond the overview table: per-task progress, frame previews, render logs, error diagnosis, and full job properties.

## Opening job details

Double-click a job row in the [Monitoring](/renderflow/jobs/monitoring) table, or click the **Open** button next to the job name. The detail panel slides in from the right as a side panel.

Press **Esc** to close it. Use the **up and down arrow keys** to navigate to the previous or next job without closing the panel.

You can also **detach** the detail panel into a floating toolbar. This is useful when you want to keep job details visible while navigating to other parts of the interface.

<Frame caption="Job detail side panel with tasks, controls, and properties">
  <img src="/images/renderflow/rf_jobs_detail_panel.png" alt="Job detail panel showing task list, controls, and job properties" />
</Frame>

<br/>

<Frame caption="Detached floating toolbar">
  <img src="/images/renderflow/rf_jobs_detached_windows.png" alt="Floating job detail toolbar" />
</Frame>

## Job controls

At the top of the detail panel, you will see the job name and its type icon, followed by a row of context-aware controls. These are the same actions available in the table context menu: Start/Stop, Reset, Edit, Duplicate, Archive, Delete, and an Error indicator when applicable. The controls are enabled or disabled based on the job's current state.

## Tasks

The Tasks section is the core of the detail panel. It shows every task in the job and its current state.

### Table view

The default view is a table with the following columns: frame number, node, status, progress, info, render time, remaining, started, and finished. This gives you a detailed per-frame breakdown of the job's progress.

<Frame caption="Task table view with per-frame progress">
  <img src="/images/renderflow/rf_jobs_task_table.png" alt="Task table showing frame-by-frame status and progress" />
</Frame>

### Grid view

For animation jobs, there is also a grid view. Each task appears as a small color-coded rectangle representing its status. The grid is a visual overview only and does not support direct actions. Use the table view for task management.

<Frame caption="Grid view showing color-coded task status">
  <img src="/images/renderflow/rf_jobs_task_grid.png" alt="Grid view with color-coded rectangles for each task" />
</Frame>

### Task actions

You can select one or more tasks and take actions on them. **Reset** puts selected tasks back to Pending so they re-enter the queue. **Enable/Disable** controls whether a task is available for rendering. **Mark as Completed** manually marks tasks as done.

<Frame caption="Task actions for selected tasks">
  <img src="/images/renderflow/rf_jobs_task_actions.png" alt="Task action controls: Reset, Enable, Disable, Mark as Completed" />
</Frame>

### Selection tools

RenderFlow provides several ways to select tasks efficiently. You can select **by status** (for example, all failed tasks), **by computer** (all tasks rendered by a specific node, useful if one machine produced bad output), or **by frame list or frame range** (specify exact frame numbers or a range).

<Frame caption="Task selection tools for filtering by status, computer, or frame range">
  <img src="/images/renderflow/rf_jobs_task_selection.png" alt="Task selection tools with status, computer, and frame range options" />
</Frame>

### Opening rendered frames

When a task is completed, you can open the rendered frame directly. The image opens in your operating system's default viewer for that file type.

For animations, if **DJV** or **Chaos Player** is installed on your system, a button lets you open the entire sequence in the player with one click.

<Frame caption="Opening a rendered frame from the task list">
  <img src="/images/renderflow/rf_jobs_open_rendered_frame.png" alt="Open rendered frame button in the task list" />
</Frame>

### Live VFB preview

During rendering, an eye icon appears next to active tasks for supported job types. Hovering over it shows a live preview of the frame buffer (VFB), letting you check the render in progress without waiting for it to finish. This feature is available for all 3ds Max render engines.

<Frame caption="Live VFB preview on hover during rendering">
  <img src="/images/renderflow/rf_jobs_vfb_preview.png" alt="Eye icon with live frame buffer preview tooltip" />
</Frame>

### Pagination

Tasks are paginated at 100 per page. For jobs with hundreds or thousands of frames, use the page controls at the bottom of the task list to navigate.

## Nodes

The Nodes section shows all nodes associated with the job, grouped by their relationship: currently working, previously completed, produced an error, or whitelisted and expected to work.

For each node, you can access the render log and any error details. If a node encountered an issue, you can reset or retry it from this section.

<Frame caption="Nodes section showing associated nodes grouped by relationship">
  <img src="/images/renderflow/rf_jobs_detail_nodes.png" alt="Job detail nodes section with working, completed, errored, and whitelisted nodes" />
</Frame>

## Statistics

Basic job statistics are displayed in a dedicated section: progress percentage, total render time, remaining time, elapsed time, average frame time, start date, estimated finish date, finish date, and scheduled date (if applicable).

<Frame caption="Job statistics section">
  <img src="/images/renderflow/rf_jobs_detail_statistics.png" alt="Job statistics showing progress, render time, and timing information" />
</Frame>

## Scene properties

All the scene-based properties that were defined during submission are shown here for reference: job file path, original file path (with options to open their containing folders), resolution, frame settings, render output (with an option to open the output folder), and render settings.

<Frame caption="Scene properties section in job details">
  <img src="/images/renderflow/rf_jobs_detail_scene_properties.png" alt="Scene properties showing file path, resolution, frames, and render output" />
</Frame>

## Job properties

The job's operational settings are listed: priority, user who submitted the job, and the assigned pool.

<Frame caption="Job properties section in job details">
  <img src="/images/renderflow/rf_jobs_detail_job_properties.png" alt="Job properties showing priority, user, and pool" />
</Frame>

## Requirements and Notifications

The detail panel also shows the full list of enabled [requirements](/renderflow/jobs/requirements) and any [notifications](/renderflow/jobs/notifications) configured for the job.
