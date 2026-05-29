---
title: "Silent Deploy"
description: "Automate RenderFlow installation and configuration across your studio using command-line tools, environment variables, and GPO/SCCM."
"og:title": "RenderFlow Silent Installation and Automated Deployment"
"og:description": "Deploy RenderFlow across your studio with silent install, PowerShell scripts, GPO, and SCCM. No user interaction needed."
"twitter:title": "RenderFlow Silent Deploy Guide"
keywords: ['render farm silent install', 'render farm automated deployment', 'render farm GPO deployment', 'render farm SCCM', 'render farm PowerShell deploy', 'unattended render node setup', 'RenderFlow silent deploy']
---

Silent deployment lets IT administrators install and configure RenderFlow across many machines without user interaction. This is the recommended approach for studios with 10+ render nodes.

## Step 1: Silent installation

### Windows

Run the installer with the `--silent` flag to install without any UI prompts:

```bash
"./renderflow.X.X.X-win.exe" --silent
```

RenderFlow installs to `C:\Program Files\Pulze\RenderFlow`. The installer automatically closes any previously running RenderFlow instance before installing.

### macOS

Unzip the macOS archive and run the bundled install script — it runs end-to-end and prompts for `sudo` when it needs root:

```bash
unzip renderflow-X.X.X-mac.zip
./RenderFlow/install.sh
```

The script copies the app to `/Applications/Pulze/RenderFlow`, adds Application Firewall exceptions, and registers the DCC plugins and scripts. **Do not prefix with `sudo`** — run as the normal admin user. `install.sh` and `uninstall.sh` elevate themselves when required; `start.sh` doesn't need root at all.

### Linux

```bash
unzip renderflow-X.X.X-linux.zip
./RenderFlow/install.sh
```

The script copies the app to `/opt/Pulze/RenderFlow`, fixes the `chrome-sandbox` SUID bit, opens the firewall ports (firewalld or ufw), creates `/var/lib/RenderFlow` and `/var/log/RenderFlow`, and registers the DCC plugins and scripts. **Do not prefix with `sudo`** — run as the normal admin user so the per-user `chown` on the data directories points at the right account. `install.sh` and `uninstall.sh` elevate themselves when required; `start.sh` doesn't need root at all.

## Step 2: Start with configuration

After installation, launch the RenderFlow service (`rfsv`) with command-line arguments to configure the machine's role. The binary lives in the installation folder for your platform:

| OS | Path to `rfsv` |
|----|----------------|
| Windows | `C:\Program Files\Pulze\RenderFlow\rfsv.exe` |
| macOS | `/Applications/Pulze/RenderFlow/rfsv` |
| Linux | `/opt/Pulze/RenderFlow/rfsv` |

The examples below use `rfsv` for brevity — substitute the path for your OS.

### Configure the server

The server must be configured first. Provide the machine's own IP address:

```bash
rfsv --type=server --ip=192.168.1.100
```

### Configure render nodes

Once the server is running, configure each render node with the server's IP:

```bash
rfsv --type=node --ip=192.168.1.100
```

### Configure workstations

Same as nodes, but workstations start in Suspended state:

```bash
rfsv --type=workstation --ip=192.168.1.100
```

<Info>
After a successful first start, RenderFlow saves the type and server IP. On subsequent starts, it uses the saved settings unless you explicitly overwrite them with new arguments.
</Info>

## Environment variables

Instead of command-line arguments, you can use environment variables. This is especially useful for service mode and managed deployments:

| Variable | Values | Description |
|----------|--------|-------------|
| `RENDERFLOW_TYPE` | `server`, `node`, `workstation` | Machine role |
| `RENDERFLOW_IP` | IP address or hostname | Server address |

Set these system-wide so they persist across restarts.

<Tabs>
  <Tab title="PowerShell (Windows)">
    ```powershell
    [System.Environment]::SetEnvironmentVariable("RENDERFLOW_TYPE", "node", "Machine")
    [System.Environment]::SetEnvironmentVariable("RENDERFLOW_IP", "192.168.1.100", "Machine")
    ```
  </Tab>
  <Tab title="Command Prompt (Windows)">
    ```batch
    setx RENDERFLOW_TYPE "node" /M
    setx RENDERFLOW_IP "192.168.1.100" /M
    ```
  </Tab>
  <Tab title="macOS / Linux">
    ```bash
    # Persist for all users by adding to /etc/environment (Linux) or /etc/launchd.conf (macOS)
    echo 'RENDERFLOW_TYPE=node' | sudo tee -a /etc/environment
    echo 'RENDERFLOW_IP=192.168.1.100' | sudo tee -a /etc/environment
    ```
  </Tab>
</Tabs>

## Launching the user interface

The background service (`rfsv`) runs headless. The user interface is a separate process:

| OS | Path to the UI |
|----|----------------|
| Windows | `C:\Program Files\Pulze\RenderFlow\RenderFlow.exe` |
| macOS | `/Applications/Pulze/RenderFlow/app/RenderFlow.app` |
| Linux | `/opt/Pulze/RenderFlow/app/RenderFlow` |

On Windows the UI launches automatically when a user signs in and is searchable from the Start menu. On macOS and Linux, run `start.sh` from the installation folder (or `start.sh --headless` for service-only nodes — see [Run as a service](/renderflow/getting-started/run-as-a-service)). `start.sh` does not require `sudo`.

## Fleet deployment

The deployment pattern is the same on every platform: stage the installer on a shared location, run the silent install, set the environment variables, then launch `rfsv`. Pick the tooling that fits your environment.

### Windows (GPO / SCCM)

For Active Directory environments, deploy with a Computer Startup Script via Group Policy or an SCCM Task Sequence:

```batch
@echo off
REM Install RenderFlow silently
"\\server\share\renderflow.X.X.X-win.exe" --silent

REM Wait for installation to complete
timeout /t 30

REM Set environment variables
setx RENDERFLOW_TYPE "node" /M
setx RENDERFLOW_IP "192.168.1.100" /M

REM Start the service
"C:\Program Files\Pulze\RenderFlow\rfsv.exe" --type=node --ip=192.168.1.100
```

A PowerShell equivalent that can be fanned out with `Invoke-Command`:

```powershell
param(
    [string]$InstallerPath = "\\server\share\renderflow.X.X.X-win.exe",
    [string]$ServerIP = "192.168.1.100",
    [ValidateSet("server","node","workstation")]
    [string]$Type = "node"
)

Start-Process -FilePath $InstallerPath -ArgumentList "--silent" -Wait
[System.Environment]::SetEnvironmentVariable("RENDERFLOW_TYPE", $Type, "Machine")
[System.Environment]::SetEnvironmentVariable("RENDERFLOW_IP", $ServerIP, "Machine")
$rfsv = Join-Path $env:ProgramFiles "Pulze\RenderFlow\rfsv.exe"
Start-Process -FilePath $rfsv -ArgumentList "--type=$Type", "--ip=$ServerIP"
```

```powershell
$nodes = @("RENDER-01", "RENDER-02", "RENDER-03")
$nodes | ForEach-Object {
    Invoke-Command -ComputerName $_ -FilePath .\deploy-renderflow.ps1 -ArgumentList "\\server\share\renderflow.X.X.X-win.exe", "192.168.1.100", "node"
}
```

### macOS / Linux (SSH, MDM, Ansible)

The same flow works on macOS and Linux through SSH, an MDM (Jamf, Munki, Intune for Mac), or a configuration management tool such as Ansible, Salt, or Puppet. Example shell script suitable for any of them:

```bash
#!/bin/bash
set -e

ARCHIVE="$1"            # e.g. /mnt/share/renderflow-X.X.X-linux.zip
SERVER_IP="${2:-192.168.1.100}"
TYPE="${3:-node}"       # server | node | workstation

# Install — run as the deployment user, NOT under sudo.
# install.sh prompts for sudo when it needs root; running it under sudo
# makes $USER resolve to root and breaks the per-user data-dir chown on Linux.
WORK=$(mktemp -d)
unzip -q "$ARCHIVE" -d "$WORK"
"$WORK"/RenderFlow/install.sh

# Persist environment variables (Linux example; on macOS use launchctl setenv or a launchd plist)
echo "RENDERFLOW_TYPE=$TYPE"      | sudo tee -a /etc/environment
echo "RENDERFLOW_IP=$SERVER_IP"   | sudo tee -a /etc/environment

# Start the service
RFSV=$([ "$(uname)" = "Darwin" ] && echo /Applications/Pulze/RenderFlow/rfsv || echo /opt/Pulze/RenderFlow/rfsv)
"$RFSV" --type="$TYPE" --ip="$SERVER_IP" &
```

Fan it out with Ansible:

```yaml
- hosts: render_nodes
  become: true
  tasks:
    - copy: { src: deploy-renderflow.sh, dest: /tmp/deploy-renderflow.sh, mode: '0755' }
    - command: /tmp/deploy-renderflow.sh /mnt/share/renderflow-X.X.X-linux.zip 192.168.1.100 node
```

## Next steps

- [Run as a Service](/renderflow/getting-started/run-as-a-service): run RenderFlow without requiring a user login
- [Licensing](/renderflow/getting-started/licensing): configure licenses after deployment
