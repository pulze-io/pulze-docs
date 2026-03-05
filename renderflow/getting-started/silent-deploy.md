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

Run the installer with the `--silent` flag to install without any UI prompts:

```bash
"./renderflow.X.X.X-win.exe" --silent
```

RenderFlow installs to `C:\Program Files\Pulze\RenderFlow`. The installer automatically closes any previously running RenderFlow instance before installing.

## Step 2: Start with configuration

After installation, launch the RenderFlow service (`rfsv.exe`) with command-line arguments to configure the machine's role.

### Configure the server

The server must be configured first. Provide the machine's own IP address:

```bash
"C:\Program Files\Pulze\RenderFlow\rfsv.exe" --type=server --ip=192.168.1.100
```

### Configure render nodes

Once the server is running, configure each render node with the server's IP:

```bash
"C:\Program Files\Pulze\RenderFlow\rfsv.exe" --type=node --ip=192.168.1.100
```

### Configure workstations

Same as nodes, but workstations start in Suspended state:

```bash
"C:\Program Files\Pulze\RenderFlow\rfsv.exe" --type=workstation --ip=192.168.1.100
```

<Info>
After a successful first start, RenderFlow saves the type and server IP. On subsequent starts, it uses the saved settings unless you explicitly overwrite them with new arguments.
</Info>

## Environment variables

Instead of command-line arguments, you can use environment variables. This is especially useful for service mode and GPO deployments:

| Variable | Values | Description |
|----------|--------|-------------|
| `RENDERFLOW_TYPE` | `server`, `node`, `workstation` | Machine role |
| `RENDERFLOW_IP` | IP address or hostname | Server address |

Set these as **System Environment Variables** so they persist across restarts.

<Tabs>
  <Tab title="PowerShell">
    ```powershell
    [System.Environment]::SetEnvironmentVariable("RENDERFLOW_TYPE", "node", "Machine")
    [System.Environment]::SetEnvironmentVariable("RENDERFLOW_IP", "192.168.1.100", "Machine")
    ```
  </Tab>
  <Tab title="Command Prompt">
    ```batch
    setx RENDERFLOW_TYPE "node" /M
    setx RENDERFLOW_IP "192.168.1.100" /M
    ```
  </Tab>
</Tabs>

## Launching the user interface

The background service (`rfsv.exe`) runs headless. The user interface is a separate process:

```
C:\Program Files\Pulze\RenderFlow\RenderFlow.exe
```

The UI launches automatically when a user signs in to Windows. You can also find it by searching "RenderFlow" in the Start menu.

## GPO / SCCM deployment

For enterprise deployments using Group Policy or System Center Configuration Manager:

1. **Stage the installer** on a network share accessible by all target machines.
2. **Create a startup script** that runs the silent install followed by configuration:

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

3. **Deploy via GPO** as a Computer Startup Script, or create an **SCCM Task Sequence** with the same steps.

## PowerShell deployment script

For studios that prefer PowerShell-based automation:

```powershell
param(
    [string]$InstallerPath = "\\server\share\renderflow.X.X.X-win.exe",
    [string]$ServerIP = "192.168.1.100",
    [ValidateSet("server","node","workstation")]
    [string]$Type = "node"
)

Write-Host "Installing RenderFlow..."
Start-Process -FilePath $InstallerPath -ArgumentList "--silent" -Wait

Write-Host "Setting environment variables..."
[System.Environment]::SetEnvironmentVariable("RENDERFLOW_TYPE", $Type, "Machine")
[System.Environment]::SetEnvironmentVariable("RENDERFLOW_IP", $ServerIP, "Machine")

Write-Host "Starting RenderFlow as $Type connecting to $ServerIP..."
$rfsv = Join-Path $env:ProgramFiles "Pulze\RenderFlow\rfsv.exe"
Start-Process -FilePath $rfsv -ArgumentList "--type=$Type", "--ip=$ServerIP"

Write-Host "Done."
```

Run across multiple machines using `Invoke-Command`:

```powershell
$nodes = @("RENDER-01", "RENDER-02", "RENDER-03")
$nodes | ForEach-Object {
    Invoke-Command -ComputerName $_ -FilePath .\deploy-renderflow.ps1 -ArgumentList "\\server\share\renderflow.X.X.X-win.exe", "192.168.1.100", "node"
}
```

## Next steps

- [Run as a Service](/renderflow/getting-started/run-as-a-service): run RenderFlow without requiring a user login
- [Licensing](/renderflow/getting-started/licensing): configure licenses after deployment
