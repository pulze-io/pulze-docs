---
title: "Fusion"
description: "Render Blackmagic Fusion compositions across your farm with RenderFlow. Browse .comp files, configure frame ranges, and distribute across render nodes."
"og:title": "Blackmagic Fusion Rendering with RenderFlow"
"og:description": "Render Blackmagic Fusion compositions on your farm with RenderFlow. Browse .comp files, adjust frame settings, and distribute across nodes."
"twitter:title": "Blackmagic Fusion Rendering with RenderFlow"
keywords: ['Blackmagic Fusion render farm', 'Fusion compositing render farm', 'Fusion Render Node farm', 'distributed compositing', 'Fusion comp network rendering']
---

RenderFlow supports Blackmagic Fusion, the node-based compositing application. You can distribute .comp file rendering across your farm just like 3D render jobs.

## How to submit

Select the **Fusion** template in the [Submitter](/renderflow/jobs/submitter) and browse for a .comp file. RenderFlow reads the composition and lets you adjust frame settings, set the nth frame value, and add additional command-line arguments.

When the job runs, RenderFlow opens the .comp file on the assigned node, applies your frame settings, and executes the composition.

<Frame caption="Fusion job submitter">
  <img src="/images/renderflow/rf_jobtypes_fusion_submitter.png" alt="Fusion job submitter with frame and command-line settings" />
</Frame>

## Requirements

Fusion Render Node must be installed on all computers that will process Fusion jobs. Fusion Render Node is free to download and use.

<Warning>
All Fuse scripts and custom tool installations must be identical across every render node. If a node is missing a Fuse script, custom effect, or tool that the composition depends on (for example, Cryptomatte), the job will fail on that node.
</Warning>
