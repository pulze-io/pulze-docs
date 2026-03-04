---
title: "Quick Start"
description: "Go from zero to your first render job in under 10 minutes. Install RenderFlow, configure your server, connect nodes, and submit your first render."
"og:title": "RenderFlow Quick Start Guide"
"og:description": "Set up your render farm and submit your first job in under 10 minutes with RenderFlow."
"twitter:title": "RenderFlow Quick Start Guide"
keywords: ['render farm quick start', 'how to set up a render farm', 'render farm setup guide', 'first render job', 'render farm beginner guide', 'RenderFlow quick start']
---

RenderFlow manages your render farm, from a single workstation to hundreds of nodes. This guide walks you through the fastest path to getting your first job running.

## What you'll need

- At least one Windows computer (you can start with just your workstation)
- A [Pulze account](https://www.pulze.io) (free to create)
- A shared network folder accessible by all computers (if using more than one machine)
- RenderFlow installer, available from your [Pulze account](https://www.pulze.io/account/downloads?sku=pulze_renderflow)

## Step 1: Install RenderFlow

Run the installer on the computer that will act as your server. The same installer is used for every machine type. You choose the role during setup.

<Info>
For a single workstation setup, the server and render node run on the same machine. You don't need a second computer to get started.
</Info>

## Step 2: Configure as Server

On the welcome screen, select **Server**. This machine will coordinate all jobs and nodes.

1. Click **Login with Browser** and sign in with your Pulze account.
2. Choose your license mode. **Automatic** is recommended for most setups. If you don't have a license yet, you can start a **30-day free trial** (up to 10 nodes) or skip this step entirely if you only want to monitor nodes.
3. Set your **Repository**: a shared network folder where RenderFlow stores scene files, logs, thumbnails, and backups. Every connected machine must be able to access this folder.

After a short loading screen, you'll see an empty job list and your server listed in the Nodes view.

<Frame caption="Server mode selection screen">
  <img src="https://placehold.co/900x500?text=Server+mode+selection+screen" alt="Server mode selection screen" />
</Frame>

<br/>

<Frame caption="Repository folder selection">
  <img src="https://placehold.co/900x500?text=Repository+folder+selection" alt="Repository folder selection" />
</Frame>

## Step 3: Add render nodes

Install RenderFlow on each additional computer. On the welcome screen, select **Node** or **Workstation**:

- **Node**: starts in Idle state, ready to pick up jobs immediately
- **Workstation**: starts in Suspended state, so it won't render until you activate it

Enter the server's **IP address or hostname**, or click **Discover** to find it automatically on your network.

<Frame caption="Node connection via Discover">
  <img src="https://placehold.co/900x500?text=Node+connection+via+Discover" alt="Node connection via Discover" />
</Frame>

<Tip>
Use fixed IP addresses for your server. If the server's IP changes, every node will lose its connection.
</Tip>

## Step 4: Submit your first job

1. Open the **Jobs** view and click **Create** (or press `Ctrl+N`).
2. Choose a job template. For example, **3ds Max**, **Blender**, or **V-Ray Standalone**.
3. Select a scene file. You can browse for a file or pick one from a currently open application.
4. Review the settings. RenderFlow auto-populates resolution, frame range, output path, and render engine from your scene.
5. Click **Submit**.

Your job appears in the job list. Available nodes will automatically start rendering.

<Frame caption="First job submitted and running">
  <img src="https://placehold.co/900x500?text=First+job+submitted+and+running" alt="First job submitted and running" />
</Frame>

## Step 5: Monitor progress

The job table updates in real-time. You'll see progress, active nodes, elapsed time, and estimated time remaining. Double-click a job to open the detail view with per-frame progress, render logs, and VFB previews.

That's it. You're rendering.

<Frame caption="Full quick start walkthrough">
  <img src="https://placehold.co/900x500?text=Full+quick+start+walkthrough" alt="Full quick start walkthrough" />
</Frame>

## Single workstation setup

You don't need a render farm to use RenderFlow. On a single machine configured as a server, enable **Node Mode** to let your computer process its own jobs. You can do this from the top menu bar or by changing your status to **Idle** in the Nodes view.

This turns RenderFlow into a powerful local batch renderer. Queue up multiple jobs and let them run overnight.

## Next steps

- [Requirements](/products/renderflow/getting-started/requirements): hardware, network, and system requirements
- [Installation](/products/renderflow/getting-started/installation): detailed installation and configuration guide
- [Supported Apps](/products/renderflow/getting-started/supported-apps): full list of supported applications and render engines
- [Render Farm Basics](/products/renderflow/getting-started/render-farm-basics): new to render farms? Start here
