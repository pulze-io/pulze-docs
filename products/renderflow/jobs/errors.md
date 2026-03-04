---
title: "Errors"
description: "How RenderFlow detects render errors from application logs, classifies them by severity, retries failed tasks automatically, and links to documented solutions."
"og:title": "RenderFlow Error Handling"
"og:description": "Understand how RenderFlow detects render errors from application logs, classifies them by severity, retries failed tasks, and links to solutions."
"twitter:title": "RenderFlow Error Handling"
keywords: ['render farm error handling', 'render farm troubleshooting', 'render crash diagnosis', 'render farm automatic retry', '3ds Max render errors', 'render node error log']
---

Renders can fail for many reasons: a plugin crash, a missing asset, an out-of-memory condition, a slow network timeout, or a version mismatch between the scene and the node's software. RenderFlow monitors for these issues automatically and surfaces them so you can diagnose and fix problems quickly.

## How errors are detected

When a render node processes a task, RenderFlow traces the application log in real time. Whenever a warning or error appears in the log, RenderFlow checks it against an internal error database. Based on the match, it determines how serious the problem is and what action to take.

## Error levels

Each error is classified into one of three levels.

**Warning** means something unexpected happened but the render may still complete. The task continues running.

**Error** means a significant problem occurred. The node will attempt to retry the task (see below).

**Fatal** means a critical failure, typically an application crash. A fatal error ejects the node from the job immediately with no retry. This prevents the node from repeatedly crashing on the same problematic task.

## Automatic retries

For non-fatal errors, a node can retry the same task up to 3 times. This retry count is fixed and cannot be changed. If the task fails on all retry attempts, the node is removed from the job and the task returns to Pending so another node can try it.

## Error catalogue

RenderFlow maintains an error catalogue that maps detected errors to explanations, common causes, and suggested solutions. When an error is registered on a job, it includes a link to the relevant catalogue entry. This saves you from having to search through raw logs to understand what went wrong.

The most common causes of render errors include third-party plugin or script crashes, missing or corrupted assets, running out of memory (the scene uses more RAM than the node has), slow or interrupted network connections to shared storage, and incompatible plugin or engine versions between the artist's workstation and the render node.

## Where errors appear

Errors are surfaced in several places within RenderFlow.

In the **Nodes table**, a node that has encountered an error shows an error indicator in its status column.

In the **Job details** panel, errors appear at the top of the detail view. You can also see per-node errors in the Nodes section of the detail panel, along with the option to view the full render log for that node.

<Frame caption="Error indicator in the job detail panel with a link to the error catalogue">
  <img src="https://placehold.co/900x500?text=Error+indicator+in+job+details" alt="Job detail panel showing error badge and per-node error list" />
</Frame>

## Render logs

Detailed logs for each render session are stored on the render node at `C:\ProgramData\RenderFlow\logs`. These logs are not transferred automatically. When you open a node's log in the job detail panel, RenderFlow fetches it on demand from the node.

For collecting and sending logs to Pulze support, see [Collecting Logs](/products/renderflow/support/collecting-logs).

## Troubleshooting workflow

When a job has errors, the typical workflow is:

1. Open the job details and check the error summary at the top.
2. Click the error link to read the catalogue entry for the specific error.
3. Expand the affected node and open its render log for full context.
4. Fix the underlying issue (install the missing plugin, free up disk space, update the scene, etc.).
5. Reset the failed tasks or the entire job to send them back to the queue.
