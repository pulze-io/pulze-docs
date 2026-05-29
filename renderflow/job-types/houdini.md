---
title: "Houdini"
description: "Render Houdini scenes on your farm with RenderFlow. Scene + ROP, Mantra (IFD), and Husk (USD) standalone jobs."
"og:title": "Houdini Rendering with RenderFlow"
"og:description": "Render Houdini scenes on your farm with RenderFlow."
"twitter:title": "Houdini Rendering with RenderFlow"
keywords: ['Houdini render farm', 'Houdini network rendering', 'Mantra render farm', 'Husk render farm', 'USD render farm']
---

<Warning>
The Houdini integration is in **Beta**.
</Warning>

RenderFlow renders Houdini through three job templates: **Houdini** for a full `.hip` scene driven by a ROP, **Mantra** for pre-cached IFD sequences, and **Husk** for USD (Solaris) renders. Husk can delegate to Karma, or any USD-compatible engine.

## How to submit

You can open the Houdini [Submitter](/renderflow/jobs/submitter) two ways.

**From Houdini**, place the **RenderFlow ROP** (shipped as an HDA) into your network and submit from it.

<Frame caption="RenderFlow ROP in a Houdini network">
  <img src="/images/renderflow/rf_jobtypes_houdini_hda.png" alt="RenderFlow ROP node placed in a Houdini network" />
</Frame>

**From the RenderFlow app**, go to Jobs > Create and pick the template for your workflow: **Houdini** for a .hip scene, **Mantra** for an IFD sequence, or **Husk** for a USD file.

Both entry points open the same Submitter, where you confirm the workflow, set the frame range, and submit:

<Frame caption="The Houdini Submitter">
  <img src="/images/renderflow/rf_jobtypes_houdini_submitter.png" alt="Houdini job submitter with template and file selection" />
</Frame>
