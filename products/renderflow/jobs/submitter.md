---
title: "Submitter"
description: "Create and submit render jobs in RenderFlow. Configure scene properties, job settings, pools, priority, dependencies, and notifications from one form."
"og:title": "RenderFlow Job Submitter"
"og:description": "Learn how to submit render jobs in RenderFlow, configure scene properties and job settings, and use the submitter from 3ds Max, Blender, or Cinema 4D."
"twitter:title": "RenderFlow Job Submitter"
keywords: ['submit render job', 'render farm job submission', 'render farm batch submit', 'network render submission', 'render farm job settings', 'RenderFlow submitter']
---

The Submitter is the central form for creating new jobs in RenderFlow. It is where you select a file, review scene properties, configure job settings, and send the job to the queue.

## Opening the Submitter

There are several ways to open the Submitter.

From the RenderFlow app, go to the Jobs view and click the **Create** button, or press **Ctrl + N**.

From inside a supported application (3ds Max, Blender, Cinema 4D), use the RenderFlow toolbar button. When launched from an application, the Submitter opens with the current scene already selected and its properties pre-filled.

<Frame caption="Opening the Submitter from the RenderFlow app">
  <img src="https://placehold.co/900x500?text=Submitter+opened+from+RenderFlow" alt="Submitter opened from the RenderFlow app" />
</Frame>

## Selecting a file

The Submitter gives you two ways to choose which file to render.

**Pick from open instances.** If you have a supported application running, RenderFlow can connect directly to your open session and pull the latest scene information. This is a unique feature. Rather than relying on saved file data, it reads live from your open project, so any unsaved changes to render settings, cameras, or outputs are captured.

**Browse a file.** You can also browse for a file on disk. Some formats can be read directly: .max files (3ds Max) and .comp files (Fusion) will populate scene properties even without the application running. For Blender and Cinema 4D, browsing a file will detect the application version but will not fill in scene properties. In those cases, opening the file in the application and selecting it from the dropdown is recommended.

<Info>
If you browse a Blender or Cinema 4D file without overriding any properties, the file will render "as it is" using whatever settings are saved in the scene.
</Info>

## Scene properties

Once a file is selected, RenderFlow reads and displays the following scene properties (where available): filename, resolution, frame settings, render settings, and render output. It also detects the application version, render engine, compatible plugins, and any network drives used by the scene.

For 3ds Max, the Submitter goes further. It scans all scene assets and presents a full list with missing-file indicators and a total project size calculation. It also runs [Sanity Checks](/products/renderflow/jobs/sanity-checks) to catch common mistakes before you submit.

<Frame caption="Submitter showing scene properties and asset list for a 3ds Max job">
  <img src="https://placehold.co/900x500?text=Submitter+scene+properties+and+assets" alt="Submitter with scene properties, asset list, and sanity check results" />
</Frame>

## Job settings

The right side of the Submitter contains the job settings that control how the job behaves on the farm.

**Pool** determines which pool the job is submitted to. Nodes only process jobs from their assigned pool.

**Whitelist Nodes** restricts the job to specific nodes. When enabled, only the selected nodes can work on the job. You can quickly select groups of nodes using [tags](/products/renderflow/nodes/tags).

**Node Limit** sets the maximum number of nodes that can work on the job simultaneously.

**Max Batch Size** controls how many tasks a node processes in a single batch before unloading the scene from memory. This is only available for animation jobs. A batch size of 5 means a node will render 5 consecutive frames without unloading the scene between them. This is especially useful for GPU rendering or scenes with heavy textures that take a long time to load.

**Priority** ranges from 0 (lowest) to 100 (highest). Higher-priority jobs get nodes first.

**Schedule** controls when the job starts. **Now** puts it in the queue immediately. **Scheduled** lets you set a specific date and time. **Later** creates the job in a Suspended state so you can start it manually when ready.

**Interruptible** allows tasks of this job to be interrupted by a higher-priority job. When a more important job enters the queue and needs nodes, RenderFlow can pull nodes away from interruptible jobs. The interrupted frame is lost and returns to Pending for another node to pick up.

**Dependency** lets you select other jobs that must complete before this job can start. The dependent job stays in a waiting state until all its dependencies finish.

**Notifications** configures alerts for when the job completes. You can add multiple notifications per job across different channels: Email, Desktop, Slack, Teams, and Webhook. See [Notifications](/products/renderflow/jobs/notifications) for setup details.

**Cleanup** defines what happens to the job after it completes. You can choose to archive or delete it after a specified number of hours or days.

<Frame caption="Submitter job settings panel">
  <img src="https://placehold.co/900x500?text=Submitter+job+settings+panel" alt="Job settings panel showing pool, priority, schedule, and other options" />
</Frame>

## Submitting via API

Jobs can also be submitted programmatically using the [REST API](/products/renderflow/developers/rest-api), [CLI](/products/renderflow/developers/cli), [JavaScript SDK](/products/renderflow/developers/javascript-sdk), or [Python SDK](/products/renderflow/developers/python-sdk).
