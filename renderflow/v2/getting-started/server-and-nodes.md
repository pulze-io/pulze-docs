---
title: "Server and Nodes"
description: "Set up a render farm through the RenderFlow desktop app."
"og:title": "Set Up a Render Farm with RenderFlow"
"og:description": "Set up a RenderFlow server, connect workstations, and add render nodes through the desktop app."
"twitter:title": "Set Up a Render Farm"
keywords: ['set up render farm', 'render farm server setup', 'connect render nodes', 'render farm workstation', 'render farm discovery', 'RenderFlow server', 'render farm pools']
---

This is the path most studios take: the server first, then workstation, then the dedicated render nodes. If you would rather provision a fleet from a script without sitting at every machine, see [Silent Deployment](/renderflow/v2/getting-started/silent-deploy).

Installing puts RenderFlow on a machine; configuring it is what turns that machine into a server, a workstation or a node, which is what this page walks through. See [Installation](/renderflow/v2/getting-started/installation) first if RenderFlow is not on the machine yet.

## 1. The server

Install RenderFlow on the machine that will coordinate the farm and launch it; the setup wizard opens by itself.

<Steps>
<Step title="Choose Server">
<Frame caption="The three roles offered by the setup wizard">
  <img src="/images/renderflow/v2/rf_wizard_mode.webp" alt="The setup wizard offering three roles: Node, Workstation and Server" />
</Frame>
</Step>
<Step title="Accept the licence agreement">
Your acceptance is stored on the machine, and you can read the agreement any time at [pulze.io/eula/renderflow](https://www.pulze.io/eula/renderflow).
</Step>
<Step title="Sign in">
Press **Sign in with browser** to sign in with your Pulze account, or **Create account** if you do not have one yet. If the machine is already signed in, the wizard offers that account and you can either **Continue** with it or **Switch account**.

Only the server signs in, and it holds the licences for the whole farm; the workstations and nodes that join it do not sign in at all. If the account has no free RenderFlow licences, the wizard offers **Get licenses**. Press **Continue** to finish the setup first and manage them later in **Settings → Subscription**.

<Frame caption="Signing in to the Pulze account that holds the farm's licences">
  <img src="/images/renderflow/v2/rf_wizard_signin.webp" alt="The setup wizard's sign-in screen, offering to sign in with a browser or create an account" />
</Frame>
</Step>
<Step title="Set the repository">
The repository is the one folder that every machine in the farm can reach, and RenderFlow keeps job files, task logs, frame previews and backups in it.

A UNC path (`\\NAS\renderflow`) works no matter who is signed in, which matters once a render node runs as a service: a drive letter belongs to a logged-in user session, and a service has none. See [System Requirements](/renderflow/v2/getting-started/requirements#shared-storage) if your farm mixes Windows, Linux and macOS.

<Frame caption="Setting the repository the whole farm shares">
  <img src="/images/renderflow/v2/rf_wizard_repository.webp" alt="The setup wizard asking for the shared network folder, with a UNC path entered" />
</Frame>
</Step>
</Steps>

After a short loading screen the Jobs screen opens with an empty list, and the server itself appears on the Machines screen.

<Note>
The server coordinates the farm rather than rendering on it. You can activate it like any other machine from the Machines screen, but it is not recommended: a heavy render competing with the database and the queue for the same CPU and memory can cause problems across the farm.
</Note>

### Before you add machines

Open **Settings → Security** and decide who is allowed to join:

- **Discovery**: whether this server answers discovery broadcasts on the local network.
- **Allowed addresses**: the hosts, `.suffix` domains or CIDR blocks that may join or discover the farm. Leaving it empty allows any.
- **Role for new users**: the group a person lands in the first time they sign in on a farm machine.

<Frame caption="Settings → Security, where you decide who may join the farm">
  <img src="/images/renderflow/v2/rf_settings_security.webp" alt="The Security settings panel with discovery and allowed addresses" />
</Frame>

## 2. Artist workstations

Install RenderFlow on each artist's machine and launch it.

<Steps>
<Step title="Choose Workstation">
The machine starts **Suspended**, so it will not render while the artist is working on it.
</Step>
<Step title="Connect to the server">
Type the server's address, or press **Discover** to list the servers answering on this network. If your server serves the farm over TLS, write `https://` in front of the address.

<Frame caption="Pointing a workstation at the server">
  <img src="/images/renderflow/v2/rf_wizard_connect.webp" alt="The setup wizard asking for the server address, with a Discover button" />
</Frame>
</Step>
</Steps>

The machine appears on the server's Machines screen, and from that point the artist can submit jobs either from the app or straight out of a supported application through its RenderFlow menu.

<Tip>
In **Settings → Automation**, turn on **Use idle machines** and a suspended workstation is activated after a set time without user input, which is how most studios get their artist machines rendering overnight. Turn on **Return to user** as well to suspend it again as soon as the artist is back.
</Tip>

## 3. Render nodes

Render nodes are set up exactly like a workstation, except that you choose **Node** in the wizard. The machine then starts **Idle** and takes work as soon as it joins the farm.

Because a render node normally has nobody logged into it, register RenderFlow as a service so that it starts on boot under an account that can reach your storage. See [Run as a Service](/renderflow/v2/getting-started/run-as-a-service).

A machine installed as a node runs a stripped-down interface rather than the full app: it shows what the machine is doing right now, with the controls an administrator needs.

<Frame caption="The render node interface on a dedicated machine">
  <img src="/images/renderflow/v2/rf_node_ui.webp" alt="The render node interface showing the machine's status, current job and quick controls" />
</Frame>

## Pools and groups

A new farm has one pool (Default) with every machine in it, which is the right place to start. As the farm grows, two things divide it up:

- **Pools** carve up the machines by project, by hardware or by department. A pool can lend its idle machines to another pool and borrow under a limit, and it can admit only the job types and priorities you allow.
- **Groups** decide what people may do: which screens they see, which features they can reach, which pools they see and which they may submit to, the highest priority they may use, and the most machines any one of their jobs may take.

## Monitoring the farm

The **Machines** screen lists every machine with its status, hardware and whatever it is working on.

<Frame caption="The Machines screen">
  <img src="/images/renderflow/v2/rf_machines.webp" alt="The Machines screen listing every machine in the farm with its status and hardware" />
</Frame>

The **Jobs** and **Machines** screens both keep saved views as tabs above the table. Press the **+** that appears beside the tabs (**New view**), then press **Filter** or **Sort** to shape it: the view keeps its filters, sort and columns. Views are kept in the browser of the machine you set them up on.

<Frame caption="The Jobs screen with saved views as tabs above the table">
  <img src="/images/renderflow/v2/rf_jobs_list.webp" alt="The Jobs screen with the tabs All, My jobs, Failed and Lighting above the jobs table" />
</Frame>

The **Farm** shows the same farm as a diagram, with the machines clustered under the job each one is rendering, so you can see at a glance where the work is going and which machines are sitting idle. Double-click a job to zoom in on it and watch the machines rendering it live.

<Frame caption="The Farm screen, zoomed onto a job and the machines rendering it">
  <img src="/images/renderflow/v2/rf_farm_view.webp" alt="The Farm screen zoomed onto one job with its eight render nodes, each showing live GPU, VRAM, CPU and RAM usage" />
</Frame>

## Next steps

- [Quick Start](/renderflow/v2/getting-started/quick-start): submit the first job
- [Run as a Service](/renderflow/v2/getting-started/run-as-a-service): unattended render nodes
- [Silent Deployment](/renderflow/v2/getting-started/silent-deploy): the same farm, provisioned from a script
