---
title: "Jobs Overview"
sidebarTitle: "How Jobs Work"
description: "Understand the job and task model in RenderFlow. How jobs move through their lifecycle, how nodes pick up work, and how priority and scheduling interact."
"og:title": "RenderFlow Jobs Overview"
"og:description": "Understand the job and task model in RenderFlow, including lifecycle states, priority, and how nodes pick up work."
"twitter:title": "RenderFlow Jobs Overview"
keywords: ['render farm job management', 'render job lifecycle', 'render farm job queue', 'render farm task distribution', 'render job priority', 'how render farm jobs work']
---

<Frame caption="Job list showing jobs in various states">
  <img src="/images/renderflow/rf_jobs_list_states.png" alt="Job list showing Pending, Working, Completed, and Suspended jobs" />
</Frame>

A **job** in RenderFlow is a collection of tasks. Each task represents a single unit of work, typically one frame of an animation or one tile of a still image. When you submit a scene with frames 1 through 100, RenderFlow creates one job containing 100 tasks.

Each task carries everything a node needs to do its work: which application to open, which scene file to load, the resolution, the frame number, the output path, render settings, and more. The specifics vary by application. See the Job Types section for per-app details.

A node can only work on one task at a time, and a task can only be processed by one node. This one-to-one relationship keeps things simple and predictable.

## How nodes pick up work

RenderFlow treats jobs and tasks as stationary items. Nodes come to them, not the other way around. When a node finishes its current task (or becomes idle), it looks at the job queue and picks up the next available task based on priority and submission order.

This mental model matters when you think about scaling. Adding more nodes to your farm means more workers pulling from the same queue. You do not need to manually assign work.

## Job lifecycle

Every job moves through a set of states from creation to completion.

**Pending** - the default state when a job is first submitted. The job is in the queue and ready for nodes to pick up its tasks.

**Working** - at least one node has been assigned and is actively processing tasks.

**Completed** - all tasks have finished successfully (100% progress).

**Suspended** - the job has been manually stopped. Any currently working nodes are removed and unfinished frames are lost. The job stays in the list and can be restarted at any time.

**Scheduled** - the job has a future start time. It will automatically move to Pending when that time arrives.


## Priority

Jobs have a priority value between 0 and 100. Higher numbers mean higher importance. When two jobs are both pending, nodes will pick up tasks from the higher-priority job first. If two jobs share the same priority, the older one takes precedence (first in, first out).

You can change a job's priority after submission through the [Quick Edit](/renderflow/jobs/monitoring) option in the context menu.

## Job actions

You can control jobs at any point in their lifecycle.

**Start** - moves a suspended or scheduled job into the active queue.

**Stop** - suspends a running job. Currently working nodes are removed and any unfinished frames are lost.

**Finish and Stop** - lets nodes complete their current frames, then suspends the job. No new tasks are assigned. Useful when you need your farm capacity for something else but do not want to waste the frames already in progress.

**Reset** - clears all progress and puts every task back to Pending. The job re-enters the queue as if it were freshly submitted.

**Archive** moves the job out of the active job list and into the repository's archive directory. The job's state is preserved exactly as it was - a completed job stays completed, a partially rendered job keeps its progress. Archiving is non-destructive: it simply moves the job files from the active folder to the archived folder in the repository.

**Delete** - permanently removes the job and all of its data.

<Frame caption="Job actions available from the context menu">
  <img src="/images/renderflow/rf_jobs_actions.png" alt="Job actions context menu" />
</Frame>

To access archived jobs, click the **Archive** button in the job table toolbar (next to the filter and column controls). This opens a panel where you can search through archived jobs by name, browse the list, and restore any job back to the active list. Once restored, the job returns to the job table in its original state. If the job was partially completed, you can start it again and rendering will continue from where it left off.

Archiving is useful for keeping your active job list clean without losing data. Studios often archive jobs after delivery and restore them weeks later if a client requests revisions.

<Tip>

You can automate this. In the [Submitter](/renderflow/jobs/submitter), the **Cleanup** setting lets you auto-archive (or auto-delete) jobs after a specified number of hours or days. Set it once in a [template](/renderflow/jobs/templates) and every job your team submits will clean itself up automatically.

</Tip>

## Task-level control

You do not have to manage entire jobs at once. Individual tasks can be reset, enabled, disabled, or marked as completed. This is useful when a specific frame renders incorrectly and you want to re-render just that one frame without touching the rest of the job.

For details on working with tasks, see [Tasks and Details](/renderflow/jobs/tasks-and-details).

<Frame caption="Jobs view with the detail panel open">
  <img src="/images/renderflow/rf_jobs_detail_panel.png" alt="Job list with the detail side panel showing task progress and job properties" />
</Frame>
