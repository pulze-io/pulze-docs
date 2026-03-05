---
title: "Run as a Service"
description: "Run RenderFlow as a Windows service so render nodes stay active without requiring a user to be logged in."
"og:title": "Run RenderFlow as a Windows Service"
"og:description": "Configure RenderFlow to run as a Windows service for always-on render nodes without user login."
"twitter:title": "Run RenderFlow as a Windows Service"
keywords: ['render farm Windows service', 'render node without login', 'headless render node', 'render farm always on', 'render node auto start', 'RenderFlow service mode']
---

By default, RenderFlow runs as a desktop application under the current user session. Running it as a Windows service means RenderFlow starts automatically when the computer powers on. No login required, no desktop session needed.

## When to use service mode

Service mode is ideal for:

- **Dedicated render nodes** that should always be available, even after a restart or power outage
- **Headless machines** in a server room with no monitor or keyboard
- **Studios that use scheduled shutdowns and startups** (via the Scheduler or Wake-on-LAN) and need nodes to come back online automatically

## Prerequisites

Install RenderFlow using the [silent installer](/renderflow/getting-started/silent-deploy) first. Service mode builds on top of the silent installation.

## Creating the service

Use the bundled service controller helper to register RenderFlow as a Windows service:

```bash
"C:\Program Files\Pulze\RenderFlow\resources\srvctrl.exe" add --name "RenderFlow" -- "C:\Program Files\Pulze\RenderFlow\rfsv.exe"
```

Then configure the service:

```bash
sc description RenderFlow "RenderFlow Service"
sc config RenderFlow start= auto
sc config RenderFlow obj= "DOMAIN\Username" password= "Password"
```

Set the environment variables for the machine's role:

```bash
setx RENDERFLOW_TYPE "node" /M
setx RENDERFLOW_IP "192.168.1.100" /M
```

Start the service:

```bash
sc start RenderFlow
```

<Warning>
Replace `DOMAIN\Username` and `Password` with the actual credentials for the account the service should run under. Use a dedicated service account with the minimum permissions needed to access network shares and run 3D applications.
</Warning>

Without specifying a user account, the service runs as the **SYSTEM** user, which cannot access network drives.

## All machine types supported

Server, workstation, and node can all run as services. Set the `RENDERFLOW_TYPE` environment variable accordingly.

For the server:

```bash
setx RENDERFLOW_TYPE "server" /M
setx RENDERFLOW_IP "192.168.1.100" /M
```

## The user interface

The service (`rfsv.exe`) runs in the background. The user interface (`RenderFlow.exe`) runs separately under the current user's desktop session. It launches automatically on sign-in and connects to the local service.

You can use the UI for monitoring and management while the service handles the actual rendering.

## Network drives in service mode

This is the most important thing to understand about service mode.

Windows services run in **Session 0**, which is an isolated session with no access to mapped network drives (like `S:\` or `Z:\`). Mapped drives only exist in user sessions. This means:

- If your scene references `S:\Projects\scene.max`, the service can't find `S:\`
- If your render output is set to `Z:\Output\`, the service can't write there

### What to do about it

RenderFlow does not modify file paths or output paths in your jobs. If your scenes use mapped drive letters, you need to configure those same mappings for the service.

**Option 1 (recommended):** Use UNC paths everywhere in your scenes. Set up your 3D applications to reference assets via `\\server\share\` instead of `S:\`.

**Option 2:** Configure drive mappings in RenderFlow. Go to **Settings > Mapped Drives** and add entries that map drive letters to their UNC equivalents. RenderFlow will automatically map these drives during startup and before each render job, and will verify they're accessible before a node begins rendering.

<Frame caption="Settings: Mapped Drives configuration">
  <img src="https://placehold.co/900x500?text=Mapped+Drives+Settings" alt="Mapped Drives configuration" />
</Frame>

<Tip>
Even if you're not running as a service today, using UNC paths is a good practice. It makes your scenes portable across any machine in the studio, regardless of drive letter assignments.
</Tip>

## Stopping and removing the service

```bash
sc stop RenderFlow
sc delete RenderFlow
```

## Next steps

- [Silent Deploy](/renderflow/getting-started/silent-deploy): automated installation before setting up the service
- [Windows Network Setup](/renderflow/getting-started/windows-network-setup): UNC paths and shared storage configuration
