---
title: "Run as a Service"
description: "Run RenderFlow as a background service on Windows, macOS, and Linux so render nodes stay active without a user logged in."
"og:title": "Run RenderFlow as a Service (Windows, macOS, Linux)"
"og:description": "Configure RenderFlow to start automatically on boot or login on every supported platform — Windows services, launchd LaunchAgents, systemd user units."
"twitter:title": "Run RenderFlow as a Service"
keywords: ['render farm Windows service', 'render node without login', 'headless render node', 'render farm always on', 'render node auto start', 'RenderFlow service mode', 'launchd render node', 'systemd render node']
---

By default, RenderFlow runs as a desktop application under the current user session. Running it as a service means RenderFlow starts automatically when the computer powers on (or, on macOS, when the user logs in). No interactive use needed.

## When to use service mode

Service mode is ideal for:

- **Dedicated render nodes** that should always be available, even after a restart or power outage
- **Headless machines** in a server room with no monitor or keyboard
- **Studios that use scheduled shutdowns and startups** (via the Scheduler or Wake-on-LAN) and need nodes to come back online automatically

## Prerequisites

Install RenderFlow first. Follow [Installation](/renderflow/getting-started/installation) for an interactive install, or [Silent Deploy](/renderflow/getting-started/silent-deploy) for unattended deployment across many machines. Service mode builds on top of a working install.

Server, workstation, and node can all run as services — set the `RENDERFLOW_TYPE` environment variable accordingly.

## Windows

On Windows, RenderFlow runs as a true Windows service via the bundled `srvctrl.exe` helper. The service starts on boot, before any user logs in.

### Creating the service

Register `rfsv.exe` as a Windows service:

```bash
"C:\Program Files\Pulze\RenderFlow\resources\srvctrl.exe" add --name "RenderFlow" -- "C:\Program Files\Pulze\RenderFlow\rfsv.exe"
```

Configure the service:

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

For a server, set `RENDERFLOW_TYPE` to `server`; for workstations, `workstation`.

Start the service:

```bash
sc start RenderFlow
```

<Warning>
Replace `DOMAIN\Username` and `Password` with the actual credentials for the account the service should run under. Use a dedicated service account with the minimum permissions needed to access network shares and run 3D applications.
</Warning>

Without specifying a user account, the service runs as the **SYSTEM** user, which cannot access network drives.

### The user interface

The service (`rfsv.exe`) runs in the background. The user interface (`RenderFlow.exe`) runs separately under the current user's desktop session — it launches automatically on sign-in and connects to the local service.

You can use the UI for monitoring and management while the service handles the actual rendering.

### Network drives in service mode

This is the most important thing to understand about service mode on Windows.

Windows services run in **Session 0**, which is an isolated session with no access to mapped network drives (like `S:\` or `Z:\`). Mapped drives only exist in user sessions. This means:

- If your scene references `S:\Projects\scene.max`, the service can't find `S:\`
- If your render output is set to `Z:\Output\`, the service can't write there

RenderFlow does not modify file paths or output paths in your jobs. If your scenes use mapped drive letters, you need to configure those same mappings for the service.

**Option 1 (recommended):** Use UNC paths everywhere in your scenes. Set up your 3D applications to reference assets via `\\server\share\` instead of `S:\`.

**Option 2:** Configure drive mappings in RenderFlow. Go to **Settings > Mapped Drives** and add entries that map drive letters to their UNC equivalents. RenderFlow will automatically map these drives during startup and before each render job, and will verify they're accessible before a node begins rendering.

<Tip>
Even if you're not running as a service today, using UNC paths is a good practice. It makes your scenes portable across any machine in the studio, regardless of drive letter assignments.
</Tip>

### Stopping and removing the service

```bash
sc stop RenderFlow
sc delete RenderFlow
```

## macOS

macOS doesn't have Windows-style system services for GUI-aware apps. The right equivalent is a **launchd LaunchAgent** — a per-user job that runs when the user logs in.

### Headless mode

RenderFlow ships with a `--headless` flag that starts the service without the desktop app:

```bash
/Applications/Pulze/RenderFlow/start.sh --headless
```

`start.sh` does **not** require `sudo`. It runs entirely under your normal user, which is exactly what a LaunchAgent expects.

### Auto-start with launchd

Create `~/Library/LaunchAgents/io.pulze.renderflow.plist`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key><string>io.pulze.renderflow</string>
  <key>ProgramArguments</key>
  <array>
    <string>/Applications/Pulze/RenderFlow/start.sh</string>
    <string>--headless</string>
  </array>
  <key>RunAtLoad</key><true/>
  <key>KeepAlive</key><true/>
</dict>
</plist>
```

Load it:

```bash
launchctl load -w ~/Library/LaunchAgents/io.pulze.renderflow.plist
```

Drop `--headless` (and its `<string>` entry) if you want the Electron UI to come up at login too.

To persist the machine's role across restarts, set `RENDERFLOW_TYPE` and `RENDERFLOW_IP` as user environment variables (`launchctl setenv`, or add them to the plist as an `EnvironmentVariables` dict).

<Note>
A `LaunchDaemon` (boots before login, runs as root) is possible but reintroduces the `$HOME=/root` problem for the per-user log directory and plugin paths. Use a `LaunchAgent` instead.
</Note>

### Stopping and removing the agent

```bash
launchctl unload -w ~/Library/LaunchAgents/io.pulze.renderflow.plist
rm ~/Library/LaunchAgents/io.pulze.renderflow.plist
```

## Linux

On Linux, the recommended pattern for a headless render node is a **systemd user unit**. It runs under your normal user (not `root`), which is what the installer's per-user `chown` on `/var/lib/RenderFlow` and `/var/log/RenderFlow` expects.

### Headless mode

```bash
/opt/Pulze/RenderFlow/start.sh --headless
```

`start.sh` does **not** require `sudo`.

### Auto-start with systemd

Create `~/.config/systemd/user/renderflow.service`:

```ini
[Unit]
Description=Pulze RenderFlow

[Service]
ExecStart=/opt/Pulze/RenderFlow/start.sh --headless
Restart=on-failure

[Install]
WantedBy=default.target
```

Enable and start it:

```bash
systemctl --user daemon-reload
systemctl --user enable --now renderflow
loginctl enable-linger $USER     # run at boot, not just login
```

`loginctl enable-linger` is the key step. Without it, the user service only runs while you're logged in.

To persist the machine's role across restarts, set `RENDERFLOW_TYPE` and `RENDERFLOW_IP` system-wide (e.g. in `/etc/environment`) or add them to the unit as `Environment=` lines.

### If you want the UI too

systemd doesn't play well with GUI sessions. Drop `--headless` only if you're sure — otherwise leave the unit headless and use a desktop autostart entry (`~/.config/autostart/renderflow.desktop`) to launch the UI when the user signs in.

### Stopping and removing the unit

```bash
systemctl --user disable --now renderflow
rm ~/.config/systemd/user/renderflow.service
systemctl --user daemon-reload
```

## Next steps

- [Silent Deploy](/renderflow/getting-started/silent-deploy): automated installation before setting up the service
- [Network Setup](/renderflow/getting-started/network-setup): UNC paths and shared storage configuration
