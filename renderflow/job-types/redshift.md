---
title: "Redshift"
description: "Render Redshift .rs scene files directly on your farm with RenderFlow, no host DCC required."
"og:title": "Redshift Rendering with RenderFlow"
"og:description": "Render Redshift .rs scene files on your farm with RenderFlow."
"twitter:title": "Redshift Rendering with RenderFlow"
keywords: ['Redshift Standalone render farm', 'Redshift .rs render farm', 'Redshift command line render']
---

RenderFlow renders Redshift proxy files (`.rs`) directly, with no host application needed on the node. Export an `.rs` from 3ds Max, Maya, Houdini, Cinema 4D, or any Redshift-capable app, and the farm renders it on the GPU. Materials, textures, and scene data are baked into the proxy.

## How to submit

In the RenderFlow app, go to Jobs > Create and select the **Redshift** template, then browse for a .rs file. Set the resolution and frame range, and submit.

<Frame caption="Redshift job submitter">
  <img src="/images/renderflow/rf_jobtypes_redshift.png" alt="Redshift job submitter with a .rs file selected and render settings" />
</Frame>
