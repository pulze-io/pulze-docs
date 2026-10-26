---
title: "Run as a Service"
description: "Run RenderFlow on unattended render nodes: Windows services, systemd services and launchd daemons you can register with the installer or write yourself, and the account and path rules a node needs to render."
"og:title": "Run RenderFlow as a Service (Windows, Linux, macOS)"
"og:description": "Register RenderFlow to start on boot on every platform, with an account that can reach your storage."
"twitter:title": "Run RenderFlow as a Service"
keywords: ['render farm Windows service', 'render node without login', 'headless render node', 'render farm always on', 'render node auto start', 'RenderFlow service', 'launchd render node', 'systemd render node']
---

A dedicated render node runs unattended. Registered as a service, RenderFlow starts after a reboot, joins the farm and renders without a user session.

The installer puts RenderFlow in place and registers no service unless you ask for one. Add `--service` to register it on a server or a render node, or set it up yourself afterwards. On Windows you also choose the account RenderFlow runs under, an account that needs rights on your storage, so it is worth settling before you start.

A workstation does not need a service. The desktop app starts the background service at user login.

## When you need it

- Dedicated render nodes that must come back after a restart or a power cut.
- Headless machines in a rack, with no monitor and no keyboard.
- Farms that shut machines down and wake them through the Scheduler or Automation.
- The server. A server that only runs during a user session is down after every reboot.

## Windows

RenderFlow registers its own Windows service when you ask it to. The service starts on boot as the account you give it, and that account is granted the **Log on as a service** right it needs. `srvctrl.exe`, next to `rfsv.exe` in the install folder, runs the service and relaunches `rfsv.exe` whenever it exits, which covers a restart after a configuration change.

### At install time

Add the account to the [silent install](/renderflow/getting-started/silent-deploy):

<CodeGroup>
```bat Command Prompt
renderflow-2.0.17.0044-windows-x64.exe --silent --type=node --server=10.11.30.40 --service-account=DOMAIN\renderfarm --service-password="the password"
```

```powershell PowerShell
.\renderflow-2.0.17.0044-windows-x64.exe --% --silent --type=node --server=10.11.30.40 --service-account=DOMAIN\renderfarm --service-password="the password"
```
</CodeGroup>

The installer configures the machine, registers the service, grants the account the right and starts the service. If the service cannot be registered, the installer still installs, prints why and exits with error level 3.

To run the service as LocalSystem instead, add `--service` and no account:

```bat
renderflow-2.0.17.0044-windows-x64.exe --silent --type=node --server=10.11.30.40 --service
```

LocalSystem reaches a share only as the computer itself, so on a share outside your domain it needs [Mapped Drives](#mapped-drives) with credentials. Without `--service` or `--service-account`, the installer registers no service, and a machine that has one keeps it, with its account, through every upgrade.

### On an installed machine

Open a Command Prompt or PowerShell as administrator, in the install folder:

<CodeGroup>
```bat Command Prompt
cd "C:\Program Files\Pulze\RenderFlow"
rfsv service install --account DOMAIN\renderfarm
```

```powershell PowerShell
cd "C:\Program Files\Pulze\RenderFlow"
.\rfsv service install --account DOMAIN\renderfarm
```
</CodeGroup>

It asks for the password, then registers the service, sets it to start on boot, grants the account the right and starts it.

- A local account can be given by its name alone, as `--account renderfarm`.
- A group managed service account (`DOMAIN\name$`) has no password, and is not asked for one.
- In a script, set `RENDERFLOW_SERVICE_PASSWORD` instead of being asked.
- `--no-start` leaves the service stopped.

Run it again to change the account or its password. An existing service is updated in place and restarted. On a machine whose service already fails with Error 1069, run it without `--account`: it grants the right to the account the service already has.

### The service account

Use a dedicated account with rights on the share and permission to run your applications. Sign in with that account on the node and open a scene by hand before trusting it with a job.

### Mapped drives

A Windows service runs in Session 0, which has no mapped drive letters. A scene that references `S:\Projects\shot.max` cannot be opened by the service.

- **Use UNC paths** in your scenes, in output paths and for the repository.
- **Map the drives in RenderFlow** where UNC paths are not an option. **Settings → Mapped Drives** stores a drive letter and the UNC path behind it. RenderFlow connects them when the service starts and before it launches a job, as the service's account. A mapping that fails is logged, and the job then fails on the path. Check the service log when a letter does not resolve.
- **Map the drive with Group Policy.** A domain can map the same letter for the service's account through Group Policy Preferences, so it is already there whenever the account logs on. This works alongside RenderFlow's own mapping, or instead of it.

### Remove

As administrator, in the install folder (`.\rfsv` in PowerShell):

```bat
rfsv service remove
```

This stops the service and removes it. RenderFlow stays installed. `rfsv service status` shows whether a service is registered, its state, start setting and account.

## Linux

The installer puts RenderFlow in place and leaves running it to you. Add `--service` to register it as a systemd service, or write the unit yourself.

### With the installer

```bash
sudo ./install.sh --type=node --server=10.11.30.40 --service
```

On a server or a render node, this writes `/etc/systemd/system/renderflow.service`, enables it and starts it. A workstation gets no service, since its desktop app runs it. A machine with no role yet gets none either: set it up, then run the installer again with `--service`.

```bash
systemctl status renderflow
```

A machine that runs RenderFlow under a systemd user unit is told to remove that unit first, so the two never run at once:

```bash
systemctl --user disable --now renderflow
rm ~/.config/systemd/user/renderflow.service
```

### By hand

This is the unit `--service` writes. Change `HOME` to the home folder of the user who ran `sudo ./install.sh`, which is where the plugins for your applications were installed, and add what your studio needs:

```ini /etc/systemd/system/renderflow.service
[Unit]
Description=RenderFlow
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
User=root
Environment=HOME=/home/artist
Environment=RENDERFLOW_DATA_DIR=/var/lib/RenderFlow
ExecStart=/opt/Pulze/RenderFlow/rfsv
Restart=on-failure
RestartForceExitStatus=98 99
RestartSec=5
LimitNOFILE=65535

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now renderflow
```

- **Keep `User=root`** if the machine should install the farm's updates by itself. Under another account it renders the same, but stops at an update and waits for you to run the installer.
- **Keep the restart rule.** RenderFlow exits to restart itself after a configuration change or an update, and relies on systemd to start it again.
- **Keep `LimitNOFILE=65535` on a server.** The default of 1024 open files runs out before a large farm has connected.
- **Settings go in as `Environment=` lines**, with the variables listed in [Silent Deployment](/renderflow/getting-started/silent-deploy#configure-a-machine-after-installing). A proxy or a mounted repository path are the usual ones.
- **Mounts first.** If the repository is a network mount, add it to `After=` and `Requires=` (for example `After=mnt-renderflow.mount`), so RenderFlow never starts without it.

Keep the name `renderflow.service`. Upgrading with `sudo ./install.sh` restarts a service of that name into the new files and leaves the unit as you wrote it.

### Remove

`sudo ./uninstall.sh` stops and removes the service with the rest of RenderFlow. To keep RenderFlow installed and stop running it as a service:

```bash
sudo systemctl disable --now renderflow
sudo rm /etc/systemd/system/renderflow.service
```

## macOS

The installer puts RenderFlow in place and leaves running it to you. Add `--service` to register it as a launchd daemon, or write the daemon yourself.

### With the installer

```bash
sudo ./install.sh --type=node --server=10.11.30.40 --service
```

On a server or a render node, this writes `/Library/LaunchDaemons/io.pulze.renderflow.plist` and loads it. A workstation gets no daemon, since its desktop app runs it. A machine with no role yet gets none either: set it up, then run the installer again with `--service`.

```bash
sudo launchctl print system/io.pulze.renderflow
```

A machine that runs RenderFlow under a launch agent is told to remove the agent first, then to run the installer again:

```bash
launchctl bootout gui/$(id -u)/io.pulze.renderflow
rm ~/Library/LaunchAgents/io.pulze.renderflow.plist
```

### By hand

This is the daemon `--service` writes. Change `HOME` and `RENDERFLOW_DATA_DIR` to the home folder of the user who ran `sudo ./install.sh`, which holds the configuration and the plugins for your applications, and add what your studio needs:

```xml /Library/LaunchDaemons/io.pulze.renderflow.plist
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key><string>io.pulze.renderflow</string>
    <key>Program</key><string>/Applications/Pulze/RenderFlow/rfsv</string>
    <key>EnvironmentVariables</key>
    <dict>
        <key>HOME</key><string>/Users/artist</string>
        <key>RENDERFLOW_DATA_DIR</key><string>/Users/artist/Library/Application Support/RenderFlow</string>
    </dict>
    <key>RunAtLoad</key><true/>
    <key>KeepAlive</key><dict><key>SuccessfulExit</key><false/></dict>
    <key>StandardOutPath</key><string>/var/log/renderflow.log</string>
    <key>StandardErrorPath</key><string>/var/log/renderflow.log</string>
</dict>
</plist>
```

```bash
sudo chown root:wheel /Library/LaunchDaemons/io.pulze.renderflow.plist
sudo chmod 644 /Library/LaunchDaemons/io.pulze.renderflow.plist
sudo launchctl bootstrap system /Library/LaunchDaemons/io.pulze.renderflow.plist
```

- **Keep it a daemon in `/Library/LaunchDaemons`**, which runs as root, if the machine should install the farm's updates by itself. Under a `UserName` key or as a launch agent it renders the same, but stops at an update and waits for you to run the installer.
- **Keep `KeepAlive`.** RenderFlow exits to restart itself after a configuration change or an update, and relies on launchd to start it again.
- **Settings go in `EnvironmentVariables`**, with the variables listed in [Silent Deployment](/renderflow/getting-started/silent-deploy#configure-a-machine-after-installing).

Keep the label `io.pulze.renderflow`. Upgrading with `sudo ./install.sh` reloads a daemon with that label into the new files and leaves the plist as you wrote it.

### Remove

`sudo ./uninstall.sh` stops and removes the daemon with the rest of RenderFlow. To keep RenderFlow installed and stop running it as a daemon:

```bash
sudo launchctl bootout system/io.pulze.renderflow
sudo rm /Library/LaunchDaemons/io.pulze.renderflow.plist
```

## Check that it worked

On the machine:

```bash
rfsv status
```

The first line reads **running** when the service is up. A machine that has not joined the farm yet says so in the lines below. On the server, the machine appears on the **Machines** screen: Idle for a node, Suspended for a workstation.

If the status is right but the machine does not appear, the service runs under an account that cannot reach the server or the share. Check the account first.

## Next steps

- [Silent Deployment](/renderflow/getting-started/silent-deploy): installing and configuring the machine
- [Server and Nodes](/renderflow/getting-started/server-and-nodes): the rest of the farm
