---
title: "Run as a Service"
description: "Run RenderFlow 2 on unattended render nodes: Windows services, systemd units and launchd agents, and the service account and path rules a node needs to render."
"og:title": "Run RenderFlow 2 as a Service (Windows, Linux, macOS)"
"og:description": "Register RenderFlow 2 to start on boot on every platform, with an account that can reach your storage."
"twitter:title": "Run RenderFlow 2 as a Service"
keywords: ['render farm Windows service', 'render node without login', 'headless render node', 'render farm always on', 'render node auto start', 'RenderFlow service', 'launchd render node', 'systemd render node']
---

A dedicated render node runs unattended. Registered as a service, RenderFlow starts after a reboot, joins the farm and renders without a user session.

Registering the service is a step you do yourself, and it is where you choose the account RenderFlow runs under — an account that needs rights on your storage, so it is worth settling before you start.

A workstation does not need a service. The desktop app starts the background service at user login.

## When you need it

- Dedicated render nodes that must come back after a restart or a power cut.
- Headless machines in a rack, with no monitor and no keyboard.
- Farms that shut machines down and wake them through the Scheduler or Automation.
- The server. A server that only runs during a user session is down after every reboot.

## Windows

RenderFlow ships `srvctrl.exe` next to `rfsv.exe` in the install folder. It registers the service and restarts the program when it exits.

### Register

```powershell
& "C:\Program Files\Pulze\RenderFlow\srvctrl.exe" add --name RenderFlow -- "C:\Program Files\Pulze\RenderFlow\rfsv.exe"
```

Set it to start on boot and give it an account:

```powershell
sc.exe config RenderFlow start= auto
sc.exe config RenderFlow obj= "DOMAIN\renderfarm" password= "..."
sc.exe description RenderFlow "RenderFlow Service"
```

Start it:

```powershell
Start-Service RenderFlow
```

`srvctrl.exe` relaunches `rfsv.exe` when it exits, which covers a restart after a configuration change or an update.

### The service account

Use a dedicated account with rights on the share and permission to run your applications. Sign in with that account on the node and open a scene by hand before trusting it with a job.

### Mapped drives

A Windows service runs in Session 0, which has no mapped drive letters. A scene that references `S:\Projects\shot.max` cannot be opened by the service.

- **Use UNC paths** in your scenes, in output paths and for the repository.
- **Map the drives in RenderFlow** where UNC paths are not an option. **Settings → Mapped Drives** stores a drive letter and the UNC path behind it. RenderFlow connects them when the service starts and before it launches a job, as the service's account. A mapping that fails is logged, and the job then fails on the path. Check the service log when a letter does not resolve.

### Remove

```powershell
Stop-Service RenderFlow
sc.exe delete RenderFlow
```

## Linux

Use a systemd user unit, running as the user that ran `sudo ./install.sh`. That user owns `/var/lib/RenderFlow` and `/var/log/RenderFlow`.

Create `~/.config/systemd/user/renderflow.service`:

```ini
[Unit]
Description=Pulze RenderFlow
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
WorkingDirectory=/opt/Pulze/RenderFlow
ExecStart=/opt/Pulze/RenderFlow/rfsv
Restart=on-failure
RestartForceExitStatus=98 99
RestartSec=5
LimitNOFILE=65535

[Install]
WantedBy=default.target
```

Enable and start it:

```bash
systemctl --user daemon-reload
systemctl --user enable --now renderflow
loginctl enable-linger $USER
```

Without `loginctl enable-linger` the unit runs only while that user is logged in.

Two lines to keep:

- `RestartForceExitStatus=98 99`: the service exits with these codes to ask for a relaunch after a configuration change. Without the line, a configuration change stops the machine.
- `LimitNOFILE=65535`: on a server, the default of 1024 file descriptors runs out before a large farm has connected.

Set the role in the unit with `Environment=RENDERFLOW_TYPE=node` and `Environment=RENDERFLOW_IP=10.11.30.40`, or leave it to the configuration `rfsv config` wrote.

### A system unit

A unit under `/etc/systemd/system/` runs before login, for a machine with no interactive user. It needs one extra line:

```ini
Environment=HOME=/root
```

systemd starts a system service without `HOME`. Per-user plugin directories are derived from it, and without it the service creates a literal `~` directory under its working directory and plugin registration fails.

### Remove

```bash
systemctl --user disable --now renderflow
rm ~/.config/systemd/user/renderflow.service
systemctl --user daemon-reload
```

## macOS

Use a launchd LaunchAgent. It runs when the user logs in.

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

`start.sh` runs without `sudo`, as a LaunchAgent expects. Remove the `--headless` entry to open the app at login as well.

<Note>
A LaunchDaemon starts before login and runs as root, which causes the `HOME` problem described under Linux. Use a LaunchAgent.
</Note>

### Remove

```bash
launchctl unload -w ~/Library/LaunchAgents/io.pulze.renderflow.plist
rm ~/Library/LaunchAgents/io.pulze.renderflow.plist
```

## Check that it worked

On the machine:

```bash
rfsv status
```

`running: true` and a node key mean the service is up and the machine has enrolled. On the server, the machine appears on the **Machines** screen: Idle for a node, Suspended for a workstation.

If the status is right but the machine does not appear, the service runs under an account that cannot reach the server or the share. Check the account first.

## Next steps

- [Silent Deployment](/renderflow/v2/getting-started/silent-deploy): installing and configuring the machine
- [Server and Nodes](/renderflow/v2/getting-started/server-and-nodes): the rest of the farm
