---
title: "After Effects"
description: "Render After Effects compositions on your farm with RenderFlow. Submit any item from the Render Queue."
"og:title": "After Effects Rendering with RenderFlow"
"og:description": "Render After Effects compositions on your farm with RenderFlow."
"twitter:title": "After Effects Rendering with RenderFlow"
keywords: ['After Effects render farm', 'AE network rendering', 'aerender', 'After Effects distributed rendering']
---

RenderFlow renders After Effects projects through `aerender`. Each job renders one item from the project's Render Queue, so you set up the composition and its output module in After Effects, then hand the queued item to the farm.

## How to submit

You can open the After Effects [Submitter](/renderflow/jobs/submitter) from two places.

**From After Effects**, go to **File > Scripts > Submit to RenderFlow.jsx**.

<Info>
The submit script needs scripting access. In After Effects, open **Preferences > Scripting & Expressions** and enable **Allow Scripts to Write Files and Access Network**.
</Info>

<Frame caption="Submit to RenderFlow in the After Effects Scripts menu">
  <img src="/images/renderflow/rf_jobtypes_after_menu.png" alt="After Effects File menu showing Scripts submenu with Submit to RenderFlow" />
</Frame>

**From the RenderFlow app**, go to Jobs > Create, select the **After Effects** template, and browse for an .aep project.

Both paths open the Submitter with your project loaded; pick the Render Queue item to render:

<Frame caption="The After Effects Submitter">
  <img src="/images/renderflow/rf_jobtypes_after_submitter.png" alt="After Effects job submitter showing the Render Queue list" />
</Frame>

## Selecting a Render Queue item

A job renders a single Render Queue item, selected by its name. Output settings (format, codec, destination) come from that item's output module, so point the output at shared storage where every node can write.
