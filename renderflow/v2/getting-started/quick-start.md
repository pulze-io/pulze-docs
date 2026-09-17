---
title: "Quick Start"
description: "Install RenderFlow 2, set up the server, connect a machine, and submit your first render job."
"og:title": "RenderFlow 2 Quick Start"
"og:description": "Install RenderFlow 2, set up the server, connect a machine, and submit your first render job."
"twitter:title": "RenderFlow 2 Quick Start"
keywords: ['render farm quick start', 'how to set up a render farm', 'render farm setup guide', 'first render job', 'RenderFlow 2 quick start']
---

## What you need

- A machine for the server, and the machines that will render.
- A Pulze account with a RenderFlow subscription or an active trial. Only the server signs in to it.
- A shared network folder that every machine can reach, addressed as a UNC path (`\\NAS\renderflow`).
- The installer for each platform, from your [Pulze account](https://account.pulze.io/products/renderflow/downloads).

## 1. Set up the server

Run the installer on the machine that will coordinate the farm and launch RenderFlow; the setup wizard opens by itself.

<Steps>
<Step title="Accept the licence agreement">
</Step>
<Step title="Choose Server">
</Step>
<Step title="Sign in">
Press **Sign in with browser** and sign in with your Pulze account. Only the server signs in, and it holds the licences for the whole farm.
</Step>
<Step title="Set the repository">
This is the shared folder where RenderFlow keeps job files, task logs and frame previews. Enter it as a UNC path rather than a mapped drive letter, because a drive letter only exists inside a logged-in session and a render node running as a service has no such session.
</Step>
</Steps>

<Frame caption="Choosing the machine's role in the setup wizard">
  <img src="/images/renderflow/v2/rf_wizard_mode.webp" alt="The setup wizard offering three roles: Node, Workstation and Server" />
</Frame>

After a short loading screen the Jobs screen opens with an empty list, and the server appears on the Machines screen.

## 2. Add a machine

Run the installer on the next machine, launch RenderFlow and choose its role:

- **Workstation** — an artist's machine. It starts **Suspended** and does not render until it is activated, so it never takes the machine away from whoever is using it.
- **Node** — a dedicated render machine. It starts **Idle** and takes work immediately.

Then type the server's address, or press **Discover** to find it on the network.

<Frame caption="Pointing a machine at the server">
  <img src="/images/renderflow/v2/rf_wizard_connect.webp" alt="The setup wizard asking for the server address, with a Discover button" />
</Frame>

The machine appears on the server's Machines screen.

## 3. Submit a job

There are two ways to open the submitter:

- **From the app.** Press **Create a job** on the Jobs screen, and the submitter opens on its template picker.
- **From inside an application.** Use the RenderFlow menu or toolbar button in a supported application such as 3ds Max, Blender, Cinema 4D or Maya. The open scene is selected for you and the picker is skipped.

<Steps>
<Step title="Pick a template">
Choose the template for your application — 3ds Max, Blender, Cinema 4D and so on — and then select the scene file, either by browsing for it or by picking a scene that is already open in a running application. Any templates your studio has saved appear below the built-in ones.

<Frame caption="The template picker, with two open scenes listed under Select a file">
  <img src="/images/renderflow/v2/rf_submitter_template_picker.webp" alt="The submitter template picker showing application templates, two open scenes in Maya and Blender, and the studio's saved templates" />
</Frame>

Whichever route you take, you land in the submitter: the step you are building fills the canvas, and the settings that apply to the job as a whole sit in the panel on the left.

<Frame caption="A render step, with the job settings on the left">
  <img src="/images/renderflow/v2/rf_submitter_step.webp" alt="The submitter showing a render step on the canvas with the job settings panel beside it" />
</Frame>
</Step>
<Step title="Review the step">
RenderFlow reads the scene properties — frame range, resolution, camera, output path and renderer — and fills the step in with them, so in most cases there is nothing to change. Values that came from the scene are marked as such, and typing your own replaces them for this job without touching the scene.

<Frame caption="A render step with its scene file, resolution, frames and output filled in">
  <img src="/images/renderflow/v2/rf_submitter_step_filled.webp" alt="A render step showing the scene file, resolution, frame range, output path and software requirement, with the job settings beside it" />
</Frame>
</Step>
<Step title="Add more steps, if you want them">
Press the **+** button at the end of the chain and pick another template to carry on where the render leaves off: convert the frames, encode a movie, or run a script of your own. Each step waits for the one before it, so a single submission can take a shot all the way from render to delivery.

<Frame caption="Adding a second step to the chain">
  <img src="/images/renderflow/v2/rf_submitter_step_picker.webp" alt="The add-step list open, scrolled to show the Post-production, Utility and Scripting groups" />
</Frame>
</Step>
<Step title="Submit">
Press **Submit**. If the **Assets** or **Sanity Check** tab is showing a red count, open it first — between them they list the files the farm cannot reach and any check of your studio's that failed.
</Step>
</Steps>

## 4. Watch it render

The job appears on the Jobs screen and the available machines pick it up.

Double-click the job to open its details panel, which shows the steps, the tasks of the selected step, the machines working on it and the numbers you actually want: progress, render time, average frame time and estimated finish. Every finished frame comes back as a picture, and switching the panel to the frame view shows them as they arrive.

<Frame caption="The details panel beside the jobs list">
  <img src="/images/renderflow/v2/rf_job_details.webp" alt="A running job's details panel showing per-task progress and the machines rendering it" />
</Frame>

<Tip>
Right-click a task to open its log, the rendered frame or the folder it landed in. To stop a job, use the controls at the top of its details panel or right-click it in the list.
</Tip>

## Next steps

- [System Requirements](/renderflow/v2/getting-started/requirements)
- [Server and Nodes](/renderflow/v2/getting-started/server-and-nodes) — a studio farm, machine by machine
- [Silent Deployment](/renderflow/v2/getting-started/silent-deploy) — provisioning from a script
- [Migrating](/renderflow/v2/getting-started/migrating) — coming from RenderFlow 1 or Render Manager
