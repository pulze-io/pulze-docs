---
title: "Nuke"
description: "Render Nuke comps on your farm with RenderFlow. Submit .nk scripts and render frame ranges across nodes."
"og:title": "Nuke Rendering with RenderFlow"
"og:description": "Render Nuke comps on your farm with RenderFlow."
"twitter:title": "Nuke Rendering with RenderFlow"
keywords: ['Nuke render farm', 'Nuke network rendering', 'Nuke comp render farm']
---

RenderFlow renders Nuke compositing scripts by running the `.nk` file on the node through Nuke's command line. The script renders exactly as saved, and every Write node in it renders, with frames distributed across the farm.

## How to submit

There are two ways to reach the Nuke [Submitter](/renderflow/jobs/submitter).

**From Nuke**, open the **Render** menu and choose the RenderFlow entry.

<Frame caption="RenderFlow entry in the Nuke Render menu">
  <img src="/images/renderflow/rf_jobtypes_nuke_menu.png" alt="Nuke Render menu showing the RenderFlow entry" />
</Frame>

**From the RenderFlow app**, go to Jobs > Create, select the **Nuke** template, and browse for a .nk script.

The Submitter that opens is the same from either entry point; set the frame range and submit:

<Frame caption="The Nuke Submitter">
  <img src="/images/renderflow/rf_jobtypes_nuke_submitter.png" alt="Nuke job submitter with a .nk script selected and frame range" />
</Frame>

## How scripts render

There is no Write node selection. The script runs as saved, and all Write nodes render to the output paths defined inside them. If a script has several Write nodes, they all render, and the frame range is distributed across available nodes. Keep footage and output on shared storage so every node can reach them.
