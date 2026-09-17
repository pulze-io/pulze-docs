---
title: "Server and Nodes"
description: "Set up a studio render farm through the RenderFlow 2 app: the server first, then artist workstations, then dedicated render nodes."
"og:title": "Set Up a Studio Render Farm with RenderFlow 2"
"og:description": "Set up a RenderFlow 2 server, connect artist workstations, and add render nodes through the desktop app."
"twitter:title": "Set Up a Studio Render Farm"
keywords: ['set up render farm', 'render farm server setup', 'connect render nodes', 'render farm workstation', 'render farm discovery', 'RenderFlow server', 'render farm pools']
---

This is the path most studios take: the server first, then the artists' machines, then the dedicated render nodes, each one set up in the app. If you would rather provision a fleet from a script without sitting at every machine, see [Silent Deployment](/renderflow/v2/getting-started/silent-deploy).

Start with the server, because a workstation or a node has nothing to join until it exists.

## 1. The server

Install RenderFlow on the machine that will coordinate the farm and launch it; the setup wizard opens by itself.

<Steps>
<Step title="Accept the licence agreement">
Your acceptance is stored on the machine, and you can read the agreement any time at [pulze.io/eula/renderflow](https://www.pulze.io/eula/renderflow).
</Step>
<Step title="Choose Server">
<Frame caption="The three roles offered by the setup wizard">
  <img src="/images/renderflow/v2/rf_wizard_mode.webp" alt="The setup wizard offering three roles: Node, Workstation and Server" />
</Frame>
</Step>
<Step title="Sign in">
Press **Sign in with browser** to sign in with your Pulze account, or **Create account** if you do not have one yet. If the machine is already signed in, the wizard offers that account and you can either **Continue** with it or **Switch account**.

Only the server signs in, and it holds the licences for the whole farm; the workstations and nodes that join it do not sign in at all.

<Frame caption="Signing in to the Pulze account that holds the farm's licences">
  <img src="/images/renderflow/v2/rf_wizard_signin.webp" alt="The setup wizard's sign-in screen, offering to sign in with a browser or create an account" />
</Frame>
</Step>
<Step title="Set the repository">
The repository is the one folder that every machine in the farm can reach, and RenderFlow keeps job files, task logs, frame previews and backups in it.

A UNC path (`\\NAS\renderflow`) is strongly preferred over a mapped drive letter, because a drive letter only exists inside a logged-in user session and a render node running as a service has no such session.

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

- **Discovery** — whether this server answers discovery broadcasts on the local network.
- **Allowed addresses** — the hosts, `.suffix` domains or CIDR blocks that may join or discover the farm. Leaving it empty allows any.
- **Role for new users** — the group a person lands in the first time they sign in on a farm machine.

<Frame caption="Settings → Security, where you decide who may join the farm">
  <img src="/images/renderflow/v2/rf_settings_security.webp" alt="The Security settings panel with discovery and allowed addresses" />
</Frame>

## 2. Artist workstations

Install RenderFlow on each artist's machine and launch it.

<Steps>
<Step title="Accept the licence agreement">
</Step>
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
**Settings → Automation** can activate a workstation after a period of user inactivity and suspend it again on the next keypress, which is how most studios get their artist machines rendering overnight without anyone having to remember.
</Tip>

## 3. Render nodes

Render nodes are set up exactly like a workstation, except that you choose **Node** in the wizard. The machine then starts **Idle** and takes work as soon as it joins the farm.

Because a render node normally has nobody logged into it, register RenderFlow as a service so that it starts on boot under an account that can reach your storage — see [Run as a Service](/renderflow/v2/getting-started/run-as-a-service).

<Warning>
A service running as `LocalSystem` presents the machine account on the network, and a file server that is not domain-joined will refuse it. The node then joins the farm quite happily and fails every job it is given, because it cannot open the scene. Give the service a real account with rights on the share.
</Warning>

Nodes also have to reach your storage through the same paths your scenes use. On a farm that mixes Windows, Linux and macOS, **Settings → Mapped Paths** translates those paths between operating systems.

A machine installed as a node runs a stripped-down interface rather than the full app: it shows what the machine is doing right now, with the controls an administrator needs.

<Frame caption="The render node interface on a dedicated machine">
  <img src="/images/renderflow/v2/rf_node_ui.webp" alt="The render node interface showing the machine's status, current job and quick controls" />
</Frame>

## Pools and groups

A new farm has one pool (Default) with every machine in it, which is the right place to start. As the farm grows, two things divide it up:

- **Pools** carve up the machines by project, by hardware or by department. A pool can lend its idle machines to another pool and borrow under a limit, and it can admit only the job types and priorities you allow.
- **Groups** decide what people may do: which screens they see, which features they can reach, which pools they may submit to, the highest priority they may use, and the most machines any one of their jobs may take.

## Checking the farm

The **Machines** screen lists every machine with its status, its hardware and whatever it is working on.

<Frame caption="The Machines screen">
  <img src="/images/renderflow/v2/rf_machines.webp" alt="The Machines screen listing every machine in the farm with its status and hardware" />
</Frame>

The **Farm** screen shows the same farm as a diagram, with the machines clustered under the job each one is rendering, so you can see at a glance where the work is going and which machines are sitting idle. Double-click a job to zoom in on it and watch the machines rendering it live.

<Frame caption="The Farm screen, zoomed onto a job and the machines rendering it">
  <img src="/images/renderflow/v2/rf_farm_view.webp" alt="The Farm screen zoomed onto one job with its eight render nodes, each showing live GPU, VRAM, CPU and RAM usage" />
</Frame>

## Next steps

- [Quick Start](/renderflow/v2/getting-started/quick-start) — submit the first job
- [Run as a Service](/renderflow/v2/getting-started/run-as-a-service) — unattended render nodes
- [Silent Deployment](/renderflow/v2/getting-started/silent-deploy) — the same farm, provisioned from a script
