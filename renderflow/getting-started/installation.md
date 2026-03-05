---
title: "Installation"
description: "Step-by-step guide to installing and configuring RenderFlow on your server, render nodes, and workstations."
"og:title": "How to Install RenderFlow"
"og:description": "Complete installation guide for RenderFlow render farm manager. Set up your server, connect nodes, and start rendering."
"twitter:title": "How to Install RenderFlow"
keywords: ['how to install render farm manager', 'render farm manager setup', 'render node installation', 'render farm server setup', 'install render farm software', 'RenderFlow installation']
---

## Before you begin

1. Review the [Requirements](/renderflow/getting-started/requirements) page to confirm your hardware, OS, and network are ready.
2. Create a [Pulze account](https://www.pulze.io) if you don't have one. You'll need it to download the installer and log in during server setup.
3. Close all 3D applications (3ds Max, Blender, Cinema 4D, etc.) on the machine you're installing on. The installer detects running apps and will ask you to close them.
4. Download the installer from your [Pulze account](https://www.pulze.io/account/downloads?sku=pulze_renderflow).

## Running the installer

RenderFlow uses a single installer for all machine types: server, node, and workstation. You choose the role after installation.

The installer:

- Auto-detects and closes any previous RenderFlow version before installing
- Installs to `C:\Program Files\Pulze\RenderFlow` (not configurable)
- Stores data in `C:\PrograData\RenderFlow` (logs, config, database)
- Bundles MongoDB and Visual C++ Redistributable. No separate installation needed.
- Installs application plugins (3ds Max, Blender, etc.) on first launch

<Info>
Upgrading from a previous version? Just run the new installer. Your jobs, settings, and database are preserved. They live in `C:\PrograData\RenderFlow`, which the installer never touches.
</Info>

## Configuring the server

The server is the central hub of your render farm. Start here, then connect other machines to it.

### 1. Select Server mode

On the welcome screen, choose **Server**. This machine will run the database and coordinate all connected nodes.

<Frame caption="Mode selection screen: Server / Node / Workstation">
  <img src="/images/renderflow/rf_install_mode_selection.png" alt="Mode selection screen: Server / Node / Workstation" />
</Frame>

### 2. Log in with your Pulze account

Click **Login with Browser**. Your default browser will open for authentication. After logging in, you'll be redirected back to RenderFlow.

<Frame caption="Login with Browser button">
  <img src="/images/renderflow/rf_install_login_browser.png" alt="Login with Browser button" />
</Frame>

### 3. Configure licensing

RenderFlow checks your Pulze account for available licenses. If you haven't purchased licenses yet or need to manage your subscription, do that at [pulze.io](https://www.pulze.io/account/licenses?sku=pulze_renderflow) before continuing. You have several options:

- **Automatic** (recommended). All RenderFlow licenses on your account are automatically reserved and used by this server.
- **Manual**: you choose how many of your available licenses this server should use. Useful when splitting licenses across multiple servers.

<Frame caption="License selection: Automatic / Manual / Trial / Skip">
  <img src="/images/renderflow/rf_install_license_selection.png" alt="License selection: Automatic / Manual / Trial / Skip" />
</Frame>

### 4. Set the Repository

The Repository is a shared network folder that all connected machines must be able to access. RenderFlow uses it to store:

- Submitted scene files
- Render logs
- Frame thumbnails
- Database backups
- Software updates

Browse to a folder on your NAS or file server. You can use a UNC path (e.g., `\\server\renderflow`) or a mapped drive letter (e.g., `S:\RenderFlow`), as long as every connected machine can access the same location.

<Frame caption="Repository folder selection">
  <img src="/images/renderflow/rf_install_repository_folder.png" alt="Repository folder selection" />
</Frame>

<Warning>
The Repository folder must be accessible from every connected machine. If a node can't reach it, jobs will fail to start.
</Warning>

### 5. Done

After a short loading time, RenderFlow opens to an empty job list. Your server appears in the Nodes view, ready to accept connections.

## Configuring render nodes and workstations

Install RenderFlow on each additional machine using the same installer.

### 1. Select Node or Workstation

On the welcome screen, choose your role:

- **Node**: a minimal, always-on monitoring UI. Shows the machine's name, current status, and active job at a glance. Includes quick commands (suspend, open logs, restart) so administrators can act without opening the full interface. Node mode does not include job submission — it is designed for dedicated render machines that only need to be managed, not operated.
- **Workstation**: opens the full RenderFlow interface with job submission, the Jobs view, Nodes view, and all settings. Starts in **Suspended** state so it won't render until you activate it, keeping the machine responsive for the artist working on it.

As a general practice, configure dedicated render machines as Nodes and artist machines as Workstations.

### 2. Connect to the server

Enter the server's **IP address or hostname** and click Connect. Alternatively, click **Discover** to automatically find the server on your local network via UDP broadcast.

<Frame caption="Server connection: IP entry and Discover button">
  <img src="/images/renderflow/rf_install_server_connection.png" alt="Server connection: IP entry and Discover button" />
</Frame>

After a successful connection, you'll see the Jobs view. Your machine will also appear in the server's Nodes list.

<Tip>
If discovery doesn't find the server, check that UDP port 44443 is open and both machines are on the same subnet.
</Tip>

## Single workstation setup

You can use RenderFlow on a single machine as a local batch renderer. No render farm needed.

1. Install RenderFlow and configure it as a **Server**.
2. Enable **Node Mode** from the top menu bar, or go to the Nodes view and set your status to **Idle**.
3. Submit jobs as normal. Your machine will process them.

This is useful for queuing up multiple render jobs (overnight renders, animation sequences) and letting them run unattended.

<Frame caption="Enabling node mode on a single workstation">
  <img src="/images/renderflow/rf_install_workstation_node_mode.png" alt="Enabling node mode on a single workstation" />
</Frame>

## Uninstallation

Use **Windows Settings > Apps > RenderFlow** or the Control Panel to uninstall. The installer removes the application files from `C:\ProgramData` but preserves the data folder at `C:\PrograData\RenderFlow`.

To perform a complete removal (including all jobs, logs, config, and database), manually delete the `C:\PrograData\RenderFlow` folder after uninstalling.

## Troubleshooting

If you encounter issues during installation or first-time setup:

- Use the **help menu** in the bottom-right corner of RenderFlow to access documentation, submit a support request, or view logs.
- Check that all [required ports](/renderflow/getting-started/requirements#ports) are open.
- Verify your server has internet access to `*.pulze.io` for licensing.
- Make sure the Repository folder is accessible from the machine you're configuring.

For persistent issues, see [Collecting Logs](/renderflow/support/collecting-logs) and [Contact Us](/renderflow/support/contact-us).
