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

**From the RenderFlow app**, the scene has to be open in Blender. Select the **Blender** template and pick your scene from the open Blender instances. Browsing a .blend file on disk is not supported, as RenderFlow needs the open scene to read its properties.

Wherever you launch it from, the Submitter shows your scene with its properties pre-filled.

<Frame caption="The Blender Submitter">
  <img src="/images/renderflow/rf_jobtypes_blender_submitter.png" alt="Blender job submitter showing scene properties" />
</Frame>

## Scene properties

The following properties are read from the open scene: Scene File, Camera, Resolution, Frame range, and Render Output.

## Supported engines

RenderFlow supports Cycles, EEVEE, and V-Ray for Blender. The render engine is detected from the open scene and added as a [requirement](/renderflow/jobs/requirements) automatically.
