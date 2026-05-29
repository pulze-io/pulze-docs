---
title: "Maya"
description: "Render Maya scenes on your farm with RenderFlow. Supports Arnold, V-Ray, and Redshift across render layers."
"og:title": "Maya Rendering with RenderFlow"
"og:description": "Render Maya scenes on your farm with RenderFlow."
"twitter:title": "Maya Rendering with RenderFlow"
keywords: ['Maya render farm', 'Maya network rendering', 'Arnold render farm', 'Maya V-Ray render farm', 'Redshift render farm']
---

RenderFlow renders Maya scenes with Arnold, V-Ray, and Redshift, plus any other engine set up in the scene. Render layers and AOVs are read from the scene and rendered as saved.

## How to submit

There are two ways to open the Maya [Submitter](/renderflow/jobs/submitter), and both open the same window.

**From Maya**, open the **Pulze** menu and choose **Submit to RenderFlow**.

<Frame caption="Pulze > Submit to RenderFlow in the Maya menu">
  <img src="/images/renderflow/rf_jobtypes_maya_menu.png" alt="Pulze menu in Maya showing Submit to RenderFlow" />
</Frame>

**From the RenderFlow app**, the scene has to be open in Maya. Go to Jobs > Create, select the **Maya** template, and pick your scene from the open Maya instances. Browsing a .mb or .ma file on disk is not supported for Maya.

Wherever you launch it from, the Submitter lets you set the output folder; everything else, including the render engine, layers, and AOVs, comes from the scene's render settings.

<Frame caption="The Maya Submitter">
  <img src="/images/renderflow/rf_jobtypes_maya_submitter.png" alt="Maya job submitter with render engine and render layer selection" />
</Frame>