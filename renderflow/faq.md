---
title: "FAQ"
description: "Answers to the most common questions about setting up a render farm, licensing, job submission, node management, cloud rendering, and troubleshooting."
"og:title": "RenderFlow FAQ"
"og:description": "Answers to common questions about RenderFlow setup, licensing, rendering, nodes, and troubleshooting."
"twitter:title": "RenderFlow FAQ"
keywords: ['render farm FAQ', 'render farm common questions', 'render farm troubleshooting FAQ', 'RenderFlow FAQ', 'render farm setup questions']
---

## Setup and Installation

<AccordionGroup>
  <Accordion title="Do I need a powerful server to run RenderFlow?">
    No. The server coordinates jobs and nodes but does not render. A modest desktop or mini PC with 4 cores and 16 GB of RAM works well. See [Requirements](/renderflow/getting-started/requirements) for full details.
  </Accordion>
  <Accordion title="Can I run everything on a single computer?">
    Yes. The server and render node can run on the same machine. This is a good way to evaluate RenderFlow before expanding to more machines.
  </Accordion>
  <Accordion title="Does RenderFlow support Mac or Linux?">
    Not yet, but we are actively working on it. RenderFlow currently runs on Windows only (Windows 10 or later, 64-bit). If you are interested in Mac or Linux support, reach out to [support@pulze.io](mailto:support@pulze.io) and let us know about your setup.
  </Accordion>
  <Accordion title="How do render nodes find the server?">
    During setup, you can enter the server address manually, pass it as a command-line argument, set it as an environment variable, or let the node discover the server via network broadcast. See [Installation](/renderflow/getting-started/installation) for details.
  </Accordion>
</AccordionGroup>

## Licensing

<AccordionGroup>
  <Accordion title="Do I need a 3ds Max license on render nodes?">
    No. RenderFlow uses 3ds Max in network rendering mode (the `-server` flag), which does not require an Autodesk license. Just install 3ds Max on the node.
  </Accordion>
  <Accordion title="Do I need a Cinema 4D license on render nodes?">
    Yes. Cinema 4D does not have a free network rendering mode. Each render node needs a valid Cinema 4D license.
  </Accordion>
  <Accordion title="What about render engine licenses (V-Ray, Corona)?">
    For local rendering, you need your own render engine licenses as usual. For [RenderFlow Cloud](/renderflow/cloud-rendering/overview), all render engine and plugin licenses are included.
  </Accordion>
  <Accordion title="How does RenderFlow licensing work?">
    RenderFlow uses per-node licenses managed through your Pulze account. There is a free tier for monitoring and basic features, and paid tiers for rendering. See [Licensing](/renderflow/getting-started/licensing) for details.
  </Accordion>
</AccordionGroup>

## Jobs and Rendering

<AccordionGroup>
  <Accordion title="Can I edit a job after submission?">
    Yes. You can change priority, node limit, whitelist, and other settings on a running job through the Edit or Quick Edit options.
  </Accordion>
  <Accordion title="What happens when I stop a job?">
    Stop immediately suspends the job. Currently running frames are lost. If you want running frames to finish first, use **Finish and Stop** instead.
  </Accordion>
  <Accordion title="Can I render just one frame again without resetting the whole job?">
    Yes. Open the job details, select the specific tasks you want to re-render, and reset them individually. The rest of the job is not affected.
  </Accordion>
  <Accordion title="What is Max Batch Size?">
    It controls how many consecutive frames a node renders without unloading the scene from memory. A batch size of 5 means the node renders frames 1 through 5 in one go. This saves load time between frames and is especially useful for GPU rendering or scenes with heavy textures.
  </Accordion>
  <Accordion title="What does Interruptible mean?">
    When enabled, higher-priority jobs can pull nodes away from this job. The interrupted frame is lost and returns to the queue. Use this for lower-priority background jobs where you want maximum flexibility.
  </Accordion>
  <Accordion title="How does priority work?">
    Jobs have a priority from 0 to 100. Higher numbers get nodes first. If two jobs have the same priority, the older one takes precedence (first in, first out).
  </Accordion>
</AccordionGroup>

## Nodes and Farm Management

<AccordionGroup>
  <Accordion title="Can workstations render while artists are working?">
    Yes. Use [CPU Affinity](/renderflow/nodes/cpu-affinity) to limit how many cores the node uses for rendering, keeping the workstation responsive. You can also use the [Scheduler](/renderflow/scheduler/overview) to activate workstations for rendering only during off-hours.
  </Accordion>
  <Accordion title="What is Spawner Mode?">
    A special mode for nodes participating in [Corona DR](/renderflow/job-types/corona-dr) distributed rendering. Nodes in spawner mode do not pick up regular jobs. V-Ray DR does not require spawner mode as RenderFlow manages it automatically.
  </Accordion>
  <Accordion title="Can I shut down and wake up nodes remotely?">
    Yes. The [Commands](/renderflow/nodes/commands) menu includes Shutdown and Wakeup (Wake-on-LAN). The target machine must have Wake-on-LAN enabled in its BIOS.
  </Accordion>
</AccordionGroup>

## Cloud Rendering

<AccordionGroup>
  <Accordion title="Do I need a local farm to use RenderFlow Cloud?">
    You need RenderFlow installed and running, but you do not need a local render farm. You can submit cloud jobs from a single workstation.
  </Accordion>
  <Accordion title="What software is supported in the cloud?">
    During the beta: 3ds Max (2026) with V-Ray and Corona, including Scene Manager integration. ForestPack, RailClone, Anima, Phoenix, tyFlow, and common plugins are available. Additional plugins can be added on request.
  </Accordion>
  <Accordion title="Are render engine licenses included?">
    Yes. All render engine and plugin licenses are included. There are no additional charges.
  </Accordion>
  <Accordion title="Where do rendered frames end up?">
    They are automatically delivered to the local output path you specified in the Submitter. No manual downloads required.
  </Accordion>
</AccordionGroup>

## Troubleshooting

<AccordionGroup>
  <Accordion title="A node is not picking up jobs. What should I check?">
    Verify that the node is in the same pool as the job, its status is Idle (not Suspended or Reserved), and it meets the job's [requirements](/renderflow/jobs/requirements) (correct software, engine, and plugin versions).
  </Accordion>
  <Accordion title="Frames are rendering black or with missing objects.">
    This usually means assets are missing on the render node. Check the [Assets](/renderflow/jobs/assets) tab in the Submitter before submitting, and make sure all files are on shared storage using UNC paths.
  </Accordion>
  <Accordion title="How do I collect logs for support?">
    Use the built-in Error Report Collector at Menu > Support > Error Report Collector. See [Collecting Logs](/renderflow/support/collecting-logs) for details.
  </Accordion>
</AccordionGroup>
