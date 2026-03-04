---
title: "V-Ray Standalone"
description: "Render exported .vrscene files on your farm without the host application. Lighter and faster than full DCC rendering, with scenes from any V-Ray-supported app."
"og:title": "V-Ray Standalone Rendering with RenderFlow"
"og:description": "Render exported .vrscene files on your farm with RenderFlow. Lighter than rendering through the host app, with support for scenes from 3ds Max, Blender, Cinema 4D, Maya, and more."
"twitter:title": "V-Ray Standalone Rendering with RenderFlow"
keywords: ['V-Ray Standalone render farm', 'vrscene render farm', 'V-Ray Standalone network rendering', 'render vrscene files', 'V-Ray without host application']
---

V-Ray Standalone lets you render .vrscene files directly, without launching the host application on the render node. This can be faster and lighter than running the full DCC app, especially for scenes exported from applications that are not otherwise supported by RenderFlow.

<Info>
V-Ray Standalone requires a V-Ray Standalone license on each render node. This is separate from a regular V-Ray license tied to a host application.
</Info>

## How to submit

Select the **V-Ray Standalone** template in the [Submitter](/products/renderflow/jobs/submitter) and browse for a .vrscene file. RenderFlow reads the file and populates the available properties: resolution, frame range, and render output.

<Frame caption="V-Ray Standalone submitter">
  <img src="https://placehold.co/900x500?text=V-Ray+Standalone+Submitter" alt="V-Ray Standalone submitter with resolution, frame, and output settings" />
</Frame>

## Where .vrscene files come from

You export .vrscene files from any V-Ray-supported application. This includes 3ds Max, Blender, Cinema 4D, Maya, Revit, Rhino, and SketchUp. The export is done from within the host application before submitting to RenderFlow.

## When to use it

V-Ray Standalone is useful when you want a lighter rendering process (no host app overhead on the node), when the scene was created in an application that RenderFlow does not support for direct submission (such as Maya or SketchUp), or when you want to share .vrscene files across a pipeline that spans multiple DCC applications.
