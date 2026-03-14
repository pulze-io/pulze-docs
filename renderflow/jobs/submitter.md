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

**From the RenderFlow app.** Go to the Jobs view and click **Create**, or press **Ctrl + N**. A template picker opens first so you can choose the job type before the Submitter loads.

<Frame caption="Create button and Ctrl+N shortcut in the Jobs view">
  <img src="/images/renderflow/rf_submitter_create_button.png" alt="Create button in the RenderFlow Jobs view" />
</Frame>

**From inside a supported application.** In 3ds Max, Blender, and Cinema 4D, click the RenderFlow button in the toolbar. The Submitter opens with the current scene already selected and all properties pre-filled from your live session.

<Frame caption="RenderFlow toolbar button in 3ds Max">
  <img src="/images/renderflow/rf_submitter_toolbar_3dsmax.png" alt="RenderFlow submit button in the 3ds Max toolbar" />
</Frame>

**Right-click a file in Windows Explorer.** Supported file types (`.max`, `.blend`, `.c4d`, `.vrscene`, `.comp`) show a **Submit to RenderFlow** option in the Windows context menu. Selecting it opens the Submitter with the file already loaded. This is the fastest way to submit a job without opening RenderFlow first.

<Frame caption="Submit to RenderFlow in the Windows right-click context menu">
  <img src="/images/renderflow/rf_submitter_context_menu_explorer.png" alt="Windows Explorer right-click context menu showing Submit to RenderFlow option" />
</Frame>

**Drag and drop onto the Jobs view.** Drag a supported file from Windows Explorer and drop it directly onto the Jobs area in RenderFlow. The Submitter opens with the file pre-selected.

<Frame caption="Dragging a file onto the RenderFlow Jobs view">
  <img src="/images/renderflow/rf_submitter_drag_drop.png" alt="Dragging a scene file onto the RenderFlow job list" />
</Frame>

## Selecting a file

The Submitter gives you two ways to choose which file to render.

**Pick from open instances.** If you have a supported application running, RenderFlow can connect directly to your open session and pull the latest scene information. This is a unique feature. Rather than relying on saved file data, it reads live from your open project, so any unsaved changes to render settings, cameras, or outputs are captured.

<Frame caption="Selecting a file from an open application instance">
  <img src="/images/renderflow/rf_submitter_pick_instance.png" alt="Submitter file selection from open application instances" />
</Frame>

**Browse a file.** You can also browse for a file on disk. Some formats can be read directly: .max files (3ds Max) and .comp files (Fusion) will populate scene properties even without the application running. For Blender and Cinema 4D, browsing a file will detect the application version but will not fill in scene properties. In those cases, opening the file in the application and selecting it from the dropdown is recommended.

<Frame caption="Browsing for a file on disk">
  <img src="/images/renderflow/rf_submitter_browse_file.png" alt="Submitter file browser" />
</Frame>

<Info>
If you browse a Blender or Cinema 4D file without overriding any properties, the file will render "as it is" using whatever settings are saved in the scene.
</Info>

## Scene properties

Once a file is selected, RenderFlow reads and displays the scene properties. It also detects the application version, render engine, compatible plugins, and any network drives used by the scene.

For 3ds Max, the Submitter goes further. It scans all scene assets and presents a full list with missing-file indicators and a total project size calculation. It also runs [Sanity Checks](/renderflow/jobs/sanity-checks) to catch common mistakes before you submit.

**Camera** - the active camera used for rendering. You can switch to any camera defined in the scene.

<Frame caption="Camera selection">
  <img src="/images/renderflow/rf_submitter_prop_camera.png" alt="Submitter camera property" />
</Frame>

**Resolution** - the output width and height. These are read from the scene and can be overridden before submission.

<Frame caption="Resolution settings">
  <img src="/images/renderflow/rf_submitter_prop_resolution.png" alt="Submitter resolution property" />
</Frame>

**Frame settings** - choose between **Single** (one frame), **Range** (e.g., 0-100 with an optional step value, defaults to 1), or **List** (specific frames like 1,3,5-12).

<Frame caption="Frame settings">
  <img src="/images/renderflow/rf_submitter_prop_frames.png" alt="Submitter frame range property" />
</Frame>

**Tiled** - for still images, this splits a single frame into multiple tiles that are rendered in parallel across nodes, then stitched together.

<Frame caption="Tiled rendering option for still images">
  <img src="/images/renderflow/rf_submitter_prop_tiled.png" alt="Tiled rendering setting in the Submitter" />
</Frame>

**Render settings** - the render engine and quality settings detected from the scene, such as renderer type, GI settings, and image sampler configuration.

<Frame caption="Render settings">
  <img src="/images/renderflow/rf_submitter_prop_render_settings.png" alt="Submitter render settings property" />
</Frame>

**Render output** - the output file path and format. This is where rendered frames are saved. Use UNC paths so all nodes can write to the same location.

<Frame caption="Render output">
  <img src="/images/renderflow/rf_submitter_prop_render_output.png" alt="Submitter render output property" />
</Frame>

## Job settings

The right side of the Submitter contains the job settings that control how the job behaves on the farm.

**Pool** - which pool the job is submitted to. Nodes only process jobs from their assigned pool.

<Frame caption="Pool selection">
  <img src="/images/renderflow/rf_submitter_prop_pool.png" alt="Submitter pool property" />
</Frame>

**Whitelist Nodes** - restricts the job to specific nodes. When enabled, only the selected nodes can work on the job. You can quickly select groups of nodes using [tags](/renderflow/nodes/tags).

<Frame caption="Whitelist nodes selection">
  <img src="/images/renderflow/rf_submitter_prop_whitelist_nodes.png" alt="Submitter whitelist nodes property" />
</Frame>

**Node Limit** - the maximum number of nodes that can work on the job simultaneously.

<Frame caption="Node limit setting">
  <img src="/images/renderflow/rf_submitter_prop_node_limit.png" alt="Submitter node limit property" />
</Frame>

**Priority** - ranges from 0 (lowest) to 100 (highest). Higher-priority jobs get nodes first.

<Frame caption="Priority setting">
  <img src="/images/renderflow/rf_submitter_prop_priority.png" alt="Submitter priority property" />
</Frame>

**Schedule** - when the job starts. **Now** puts it in the queue immediately. **Schedule** lets you set a specific date and time. **Later** creates the job in a Suspended state so you can start it manually when ready.

<Frame caption="Start time setting">
  <img src="/images/renderflow/rf_submitter_prop_start_time.png" alt="Submitter start time property" />
</Frame>

**Interruptible** - allows tasks of this job to be interrupted by a higher-priority job. When a more important job enters the queue and needs nodes, RenderFlow can pull nodes away from interruptible jobs. The interrupted frame is lost and returns to Pending for another node to pick up.

<Frame caption="Interruptible setting">
  <img src="/images/renderflow/rf_submitter_prop_interruptible.png" alt="Submitter interruptible property" />
</Frame>

**Dependency** - other jobs that must complete before this job can start. The dependent job stays in a waiting state until all its dependencies finish.

<Frame caption="Dependency setting">
  <img src="/images/renderflow/rf_submitter_prop_dependency.png" alt="Submitter dependency property" />
</Frame>

**Max Batch Size** - how many tasks a node processes in a single batch before unloading the scene from memory. Only available for animation jobs. A batch size of 5 means a node will render 5 consecutive frames without unloading the scene between them. Especially useful for GPU rendering or scenes with heavy textures that take a long time to load.

<Frame caption="Max batch size setting">
  <img src="/images/renderflow/rf_submitter_prop_max_batch_size.png" alt="Submitter max batch size property" />
</Frame>

**Notifications** - alerts for when the job completes. You can add multiple notifications per job across different channels: Email, Desktop, Slack, Teams, and Webhook. See [Notifications](/renderflow/jobs/notifications) for setup details.

<Frame caption="Notifications setting">
  <img src="/images/renderflow/rf_submitter_prop_notifications.png" alt="Submitter notifications property" />
</Frame>

**Cleanup** defines what happens to the job after it completes. You can choose to **archive** or **delete** the job automatically after a specified number of hours or days. This is the easiest way to keep your job list clean without manually archiving old jobs. For example, setting cleanup to "After 24 hours" means completed jobs disappear from the active list after a day but remain fully accessible in the [archive panel](/renderflow/jobs/monitoring#archived-jobs) if you need them later.

<Frame caption="Cleanup setting">
  <img src="/images/renderflow/rf_submitter_prop_cleanup.png" alt="Submitter cleanup property" />
</Frame>

## Submitting via API

Jobs can also be submitted programmatically using the [REST API](/renderflow/developers/rest-api), [CLI](/renderflow/developers/cli), [JavaScript SDK](/renderflow/developers/javascript-sdk), or [Python SDK](/renderflow/developers/python-sdk).
