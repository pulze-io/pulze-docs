---
title: "3ds Max"
description: "Submit 3ds Max render jobs to RenderFlow as still images, tiled renders, or animations."
"og:title": "3ds Max Rendering with RenderFlow"
"og:description": "Render 3ds Max scenes on your farm with RenderFlow. Supports still images, tiled rendering, and animations with V-Ray, Corona, Arnold, and more. No 3ds Max license required on render nodes."
"twitter:title": "3ds Max Rendering with RenderFlow"
keywords: ['3ds Max network rendering', '3ds Max render farm without license', '3ds Max distributed rendering', '3ds Max server flag rendering', '3ds Max free render node', 'render 3ds Max on farm']
---

3ds Max is the most mature integration in RenderFlow. It supports still image, tiled, and animation rendering, with full scene property detection, asset scanning, [sanity checks](/renderflow/jobs/sanity-checks), and [automatic requirements](/renderflow/jobs/requirements).

<Info>
**No 3ds Max license required on render nodes.** RenderFlow uses 3ds Max in network rendering mode (the `-server` flag). Render nodes only need 3ds Max installed. You do not need to activate a license or have a paid subscription on those machines.
</Info>

## How to submit

There are two ways to submit a 3ds Max job.

**From 3ds Max**, click the RenderFlow button in the toolbar. The [Submitter](/renderflow/jobs/submitter) opens with your current scene already selected and all properties pre-filled.

**From the RenderFlow app**, go to Jobs > Create and select the **3ds Max** template. You can then browse for a .max file on disk or pick from a currently open 3ds Max instance on your network. Both options populate the scene properties. If the file has been opened and saved at least once since RenderFlow was installed, the full set of render settings and plugin data will be available even when 3ds Max is closed.

<Frame caption="Submitting a 3ds Max job from the RenderFlow app">
  <img src="/images/renderflow/rf_jobtypes_3dsmax_submitter.png" alt="3ds Max job submitter showing scene properties and job settings" />
</Frame>

## Scene properties

The following properties are read from the scene and can be reviewed or overridden in the Submitter: Scene File, Camera, Resolution, Frame range, Render Output, and Render Settings.

For still images, the **Tiled** option is available. This splits a single frame into multiple tiles that are rendered in parallel across nodes, then stitched together.

All other settings are carried over from the file and rendered as they are. Render elements, gamma settings, color management, and plugin configurations are all preserved exactly as saved in the scene.

## Supported versions and engines

For the full list of supported 3ds Max versions, render engines, and plugins, see [Supported Apps](/renderflow/getting-started/supported-apps).

## Common workflow

The typical 3ds Max workflow is straightforward: set up your scene, make sure all assets are on [shared storage](/renderflow/getting-started/windows-network-setup) using UNC paths, open the Submitter, review the properties and sanity check results, adjust job settings if needed, and submit. Available nodes with the correct software will pick up the job automatically.
