---
title: "Blender"
description: "Render Blender scenes on your farm with RenderFlow. Supports Cycles, EEVEE, and V-Ray for Blender with still image, tiled, and animation rendering."
"og:title": "Blender Rendering with RenderFlow"
"og:description": "Render Blender scenes on your farm with RenderFlow. Supports Cycles, EEVEE, and V-Ray for Blender with still image, tiled, and animation modes."
"twitter:title": "Blender Rendering with RenderFlow"
keywords: ['Blender render farm', 'Blender network rendering', 'Blender Cycles render farm', 'Blender EEVEE farm', 'Blender distributed rendering']
---

RenderFlow supports Blender rendering with Cycles, EEVEE, and V-Ray for Blender.

## How to submit

The Blender [Submitter](/renderflow/jobs/submitter) opens from two places.

**From Blender**, use the RenderFlow addon panel.

<Frame caption="RenderFlow addon panel in Blender">
  <img src="/images/renderflow/rf_jobtypes_blender_menu.png" alt="RenderFlow addon panel button in Blender" />
</Frame>

**From the RenderFlow app**, select the **Blender** template and either browse for a .blend file or pick from a currently open Blender instance. Opening the file and selecting it from the dropdown is strongly recommended, as it gives RenderFlow access to all scene properties.

<Info>
Browsing a .blend file on disk will detect the Blender version but will not populate scene properties like frame range, resolution, or output path. If you browse without overriding any properties, the file will render with whatever settings are saved in the scene.
</Info>

However you open it, the Submitter shows your scene with its properties pre-filled.

<Frame caption="The Blender Submitter">
  <img src="/images/renderflow/rf_jobtypes_blender_submitter.png" alt="Blender job submitter showing scene properties" />
</Frame>

## Scene properties

When the file is open and selected, the following properties are available: Scene File, Camera, Resolution, Frame range, and Render Output.

## Supported engines

RenderFlow supports Cycles, EEVEE, and V-Ray for Blender. The render engine is detected from the open scene and added as a [requirement](/renderflow/jobs/requirements) automatically.
