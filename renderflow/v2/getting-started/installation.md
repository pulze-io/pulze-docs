---
title: "Installation"
description: "Install RenderFlow 2 on Windows, Linux and macOS: what the installer does, where files land, and how a machine is configured once it has run."
"og:title": "Install RenderFlow 2 on Windows, Linux and macOS"
"og:description": "Install RenderFlow 2, choose a machine's role, and complete setup from the app or the terminal."
"twitter:title": "Install RenderFlow 2"
keywords: ['install render farm software', 'RenderFlow installation', 'render farm setup Windows', 'render farm Linux install', 'render farm macOS install', 'rfsv config', 'render node installation']
---

One installer covers every machine in the farm. What a machine becomes — server, workstation or render node — is decided after the files have landed, either in the app's setup wizard or with `rfsv config` in a terminal.

## Before you start

- A Pulze account with a RenderFlow subscription or an active trial. Only the server signs in to it; the machines that join it do not.
- A shared network folder that every machine can reach, addressed as a UNC path.
- The installer for each platform, from your [Pulze account](https://account.pulze.io/products/renderflow/downloads).
- Close 3ds Max, Maya, Blender and any other supported application on the machine first, as the installer refuses to run while one of them is open.

## The three roles

| Role | What it is | Starts as |
|------|------------|-----------|
| **Server** | Holds the database, coordinates the farm and signs in to Pulze. One per farm. | Does not render |
| **Workstation** | An artist's machine, which submits jobs and can render while idle. | Suspended |
| **Node** | A dedicated render machine. | Idle |

A workstation starts suspended so that it never renders while an artist is working on it, whereas a node starts idle and takes work immediately. You can change either later on the Machines screen, and **Settings → Automation** can hand a workstation to the farm after a period of inactivity and give it back on the next keypress.

## Install

<Tabs>
<Tab title="Windows">

Run the downloaded installer:

```powershell
renderflow-2.0.0-windows-x64.exe
```

RenderFlow is installed to:

```text
C:\Program Files\Pulze\RenderFlow
```

</Tab>
<Tab title="Linux">

Unpack the downloaded archive and run the installer inside it as root:

```bash
tar -xzf renderflow-2.0.0-linux-x64.tar.gz
cd renderflow-2.0.0-linux-x64
sudo ./install.sh
```

Everything lands in three places:

| Path | Holds |
|------|-------|
| `/opt/Pulze/RenderFlow` | The program |
| `/var/lib/RenderFlow` | Database and configuration |
| `/var/log/RenderFlow` | Logs |

`install.sh` requires root but never calls `sudo` itself, which means a container or a deployment tool that already runs as root can install it too. The data and log directories are handed to the user who invoked the installer rather than to root, so that `start.sh` can run as that user afterwards.

Firewall ports are opened through `firewalld` or `ufw`; on any other firewall the installer prints the ports so you can open them yourself.

</Tab>
<Tab title="macOS">

Unpack the downloaded archive and run the installer inside it as root:

```bash
tar -xzf renderflow-2.0.0-macos-arm64.tar.gz
cd renderflow-2.0.0-macos-arm64
sudo ./install.sh
```

RenderFlow is installed to:

```text
/Applications/Pulze/RenderFlow
```

The installer also adds Application Firewall exceptions for `rfsv` and the app. As on Linux, `install.sh` requires root but never calls `sudo` itself.

</Tab>
</Tabs>

## Start RenderFlow

<Tabs>
<Tab title="Windows">

Launch **RenderFlow** from the Start menu, and it starts the background service (`rfsv.exe`) if it is not already running.

</Tab>
<Tab title="Linux">

```bash
/opt/Pulze/RenderFlow/start.sh
```

Run it as the user who installed RenderFlow; it refuses to run as root. Add `--headless` to start the service without the desktop app:

```bash
/opt/Pulze/RenderFlow/start.sh --headless
```

</Tab>
<Tab title="macOS">

```bash
/Applications/Pulze/RenderFlow/start.sh
```

Run it as the user who installed RenderFlow; it refuses to run as root. Add `--headless` to start the service without the desktop app.

</Tab>
</Tabs>

<Note>
The desktop app starts the service at user login, so a workstation needs nothing further. An unattended machine needs the service registered instead — see [Run as a Service](/renderflow/v2/getting-started/run-as-a-service).
</Note>

## The licence agreement

RenderFlow asks you to accept the licence agreement the first time it runs, either in the app's setup wizard or in the `rfsv config` wizard, and stores your acceptance on the machine. You can read the agreement any time at [pulze.io/eula/renderflow](https://www.pulze.io/eula/renderflow).

For an unattended deployment, pass `--accept-eula` to the installer and nothing asks again:

<Tabs>
<Tab title="Windows">

```powershell
renderflow-2.0.0-windows-x64.exe --silent --accept-eula --type=node --server=render01
```

<Warning>
`--silent` without `--accept-eula` fails with error level 3. A silent install shows no licence page, and the installer will not accept on your behalf.
</Warning>

</Tab>
<Tab title="Linux">

```bash
sudo ./install.sh --accept-eula --type=node --server=render01
```

</Tab>
<Tab title="macOS">

```bash
sudo ./install.sh --accept-eula --type=node --server=render01
```

</Tab>
</Tabs>

On a machine that is already installed, `rfsv` accepts it just as well:

```bash
rfsv eula --accept
```

## Finish setup

An installed machine still has to be told what it is, and there are two places to do that. Both ask the same questions, because both read the same list of setup steps from the service.

**In the app.** The setup wizard opens by itself on first run and asks for the agreement, the role, sign-in on a server, the server's address on a workstation or node, and the repository on a server.

<Frame caption="The setup wizard, asking what this machine is">
  <img src="/images/renderflow/v2/rf_wizard_mode.webp" alt="The setup wizard offering three roles: Node, Workstation and Server" />
</Frame>

**In a terminal.** `rfsv config` asks the same questions where there is no screen to show them on:

<Tabs>
<Tab title="Windows">

```powershell
& "C:\Program Files\Pulze\RenderFlow\rfsv.exe" config
```

</Tab>
<Tab title="Linux">

```bash
/opt/Pulze/RenderFlow/rfsv config
```

</Tab>
<Tab title="macOS">

```bash
/Applications/Pulze/RenderFlow/rfsv config
```

</Tab>
</Tabs>

Without flags it asks the questions one at a time; with flags it applies them and exits, which is what a provisioning script wants. See [Silent Deployment](/renderflow/v2/getting-started/silent-deploy) for the full list and for signing in over SSH. Note that `rfsv config` refuses to run while the service is running, so stop the service first.

## Check a machine

```bash
rfsv status
```

This prints the machine's role, its server, the repository, the signed-in account, whether the machine has joined the farm and whether the service is running — which between them answer most of the questions a support call opens with.

## Uninstall

<Tabs>
<Tab title="Windows">

Uninstall from **Apps & features**, or run the uninstaller directly:

```powershell
"C:\Program Files\Pulze\RenderFlow\uninst.exe"
"C:\Program Files\Pulze\RenderFlow\uninst.exe" --purge
```

</Tab>
<Tab title="Linux">

```bash
sudo /opt/Pulze/RenderFlow/uninstall.sh
sudo /opt/Pulze/RenderFlow/uninstall.sh --purge
```

</Tab>
<Tab title="macOS">

```bash
sudo /Applications/Pulze/RenderFlow/uninstall.sh
sudo /Applications/Pulze/RenderFlow/uninstall.sh --purge
```

</Tab>
</Tabs>

An ordinary uninstall keeps the database, the configuration, the logs and the licence record, so that reinstalling finds the farm exactly as it was. Adding `--purge` removes them as well.

<Warning>
On a server those files are the farm's entire history — every job, machine, user, statistic and audit entry — and there is no undo.
</Warning>

## Next steps

- [Server and Nodes](/renderflow/v2/getting-started/server-and-nodes) — a studio farm, set up through the app
- [Silent Deployment](/renderflow/v2/getting-started/silent-deploy) — provisioning many machines from a script
