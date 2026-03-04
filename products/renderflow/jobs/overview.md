---
title: "Jobs Overview"
sidebarTitle: "How Jobs Work"
description: "Understand the job and task model in RenderFlow. How jobs move through their lifecycle, how nodes pick up work, and how priority and scheduling interact."
"og:title": "RenderFlow Jobs Overview"
"og:description": "Understand the job and task model in RenderFlow, including lifecycle states, priority, and how nodes pick up work."
"twitter:title": "RenderFlow Jobs Overview"
keywords: ['render farm job management', 'render job lifecycle', 'render farm job queue', 'render farm task distribution', 'render job priority', 'how render farm jobs work']
---

A **job** in RenderFlow is a collection of tasks. Each task represents a single unit of work, typically one frame of an animation or one tile of a still image. When you submit a scene with frames 1 through 100, RenderFlow creates one job containing 100 tasks.

Each task carries everything a node needs to do its work: which application to open, which scene file to load, the resolution, the frame number, the output path, render settings, and more. The specifics vary by application. See the Job Types section for per-app details.

A node can only work on one task at a time, and a task can only be processed by one node. This one-to-one relationship keeps things simple and predictable.

## How nodes pick up work

RenderFlow treats jobs and tasks as stationary items. Nodes come to them, not the other way around. When a node finishes its current task (or becomes idle), it looks at the job queue and picks up the next available task based on priority and submission order.

This mental model matters when you think about scaling. Adding more nodes to your farm means more workers pulling from the same queue. You do not need to manually assign work.

## Job lifecycle

Every job moves through a set of states from creation to completion.

**Pending** is the default state when a job is first submitted. It means the job is in the queue and ready for nodes to pick up its tasks.

**Working** means at least one node has been assigned and is actively processing tasks.

**Completed** means all tasks have finished successfully (100% progress).

**Suspended** means the job has been manually stopped. When you suspend a job, any currently working nodes are removed and unfinished frames are lost. The job stays in the list and can be restarted at any time.

**Scheduled** means the job has a future start time. It will automatically move to Pending when that time arrives.

<Frame caption="Job lifecycle: Pending to Working to Completed, with Suspended and Scheduled branches">
  <img src="https://placehold.co/900x400?text=Job+lifecycle+state+diagram" alt="Job lifecycle state diagram" />
</Frame>

## Priority

Jobs have a priority value between 0 and 100. Higher numbers mean higher importance. When two jobs are both pending, nodes will pick up tasks from the higher-priority job first. If two jobs share the same priority, the older one takes precedence (first in, first out).

You can change a job's priority after submission through the [Quick Edit](/products/renderflow/jobs/monitoring) option in the context menu.

## Job actions

You can control jobs at any point in their lifecycle.

**Start** moves a suspended or scheduled job into the active queue.

**Stop** suspends a running job. Currently working nodes are removed and any unfinished frames are lost.

**Finish and Stop** lets nodes complete their current frames, then suspends the job. No new tasks are assigned. This is useful when you need your farm capacity for something else but do not want to waste the frames already in progress and do not want to babysit the process.

**Reset** clears all progress and puts every task back to Pending. The job re-enters the queue as if it were freshly submitted.

**Archive** moves the job to the repository's archive directory, removing it from the active job list while preserving all data. Archived jobs can be fully restored at any time.

**Delete** permanently removes the job and all of its data.

## Task-level control

You do not have to manage entire jobs at once. Individual tasks can be reset, enabled, disabled, or marked as completed. This is useful when a specific frame renders incorrectly and you want to re-render just that one frame without touching the rest of the job.

For details on working with tasks, see [Tasks and Details](/products/renderflow/jobs/tasks-and-details).

<Frame caption="Job list showing jobs in various states">
  <img src="https://placehold.co/900x500?text=Job+list+with+multiple+states" alt="Job list showing Pending, Working, Completed, and Suspended jobs" />
</Frame>
