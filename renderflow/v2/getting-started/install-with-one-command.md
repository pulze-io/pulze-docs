---
title: "Install with One Command"
description: "Install RenderFlow on a new render node or workstation with one command that downloads the server's own version and joins it to the farm, or install a new farm's first server."
"og:title": "Install a RenderFlow Node with One Command"
"og:description": "One command installs RenderFlow on a Windows, Linux or macOS machine, in the version the server runs, and joins it to the farm."
"twitter:title": "Install with One Command"
keywords: ['install render node one command', 'render farm node install script', 'curl install render node', 'powershell install render node', 'add render node to farm', 'RenderFlow install.sh', 'RenderFlow install.ps1']
---

The RenderFlow server hands out an install script. Run it on a new machine and it downloads RenderFlow from the server, in exactly the version the server runs, installs it as a render node and joins it to the farm. Nothing has to be copied to the machine first, and a node installed this way never runs a different version from its server.

## What you need

- A running RenderFlow server that the new machine can reach on its address and port: `10.0.0.5:44442` on the studio network, or the address of the proxy or tunnel the farm is published through.
- The installers of the server's version added in **Settings → Deploy**, one for each platform you install on. The script downloads the installer from there.
- Administrator rights on the new machine: `sudo` on Linux and macOS, an administrator PowerShell on Windows.

## Add the installers to the server

Download the installers of the version your server runs from the [Pulze account page](https://account.pulze.io/products/renderflow/downloads): the `.exe` or `.zip` for Windows and the `.tar.gz` for Linux and macOS.

<Steps>
<Step title="Open Settings → Deploy">
Press **+** (**Add version**).
</Step>
<Step title="Pick the installers">
Press **Pick installers** and select one installer for each platform you install on, for example `renderflow-2.0.18.0175-windows-x64.exe` and `renderflow-2.0.18.0175-linux-x64.tar.gz`. Press **Add more installers** to pick from another folder, then press **Add** with the version number. RenderFlow copies them into the repository's `updates` folder and lists the version on one row, with an icon for each platform it has an installer for. The version the server runs is marked **Running**.
</Step>
</Steps>

<Frame caption="Settings → Deploy with the version the server runs">
  <img src="/images/renderflow/v2/rf_settings_deploy.webp" alt="The Deploy settings page listing versions 2.0.19, 2.0.18 and 2.0.17, one row each with Windows, Linux and macOS icons for the platforms it has, and 2.0.18 marked Running" />
</Frame>

The script hands out the installers of the version marked **Running**. The other versions are for [deploying](/renderflow/v2/guides/deploy) to the farm.

## Run the command

Use the address the machine reaches the server on, followed by `/install.sh` or `/install.ps1`.

<Tabs>
<Tab title="Windows">

In an administrator PowerShell:

```powershell
irm http://10.0.0.5:44442/install.ps1 | iex
```

</Tab>
<Tab title="Linux and macOS">

```bash
curl -fsSL http://10.0.0.5:44442/install.sh | sudo bash
```

</Tab>
</Tabs>

The machine is installed as a node, registered as a service that starts on boot, and joins the server you downloaded the script from. It appears on the **Machines** screen within a minute.

A farm published through a proxy or tunnel that answers on HTTPS works the same way with its public address, for example `https://renderflow.studio.com/install.sh`. The script then joins the machine to `https://renderflow.studio.com:443`.

## Install a workstation or choose a pool

Arguments are passed on to the installer, with the same flags as a [silent installation](/renderflow/v2/getting-started/silent-deploy).

<Tabs>
<Tab title="Windows">

```powershell
& ([scriptblock]::Create((irm http://10.0.0.5:44442/install.ps1))) -Type workstation
& ([scriptblock]::Create((irm http://10.0.0.5:44442/install.ps1))) -Pool Overnight
```

`-Type` takes `node` or `workstation`, `-Pool` places the machine in a pool when it first registers, and `-Extra` passes any other installer flags, for example `-Extra '--proxy-host=proxy.studio','--proxy-port=3128'`.

</Tab>
<Tab title="Linux and macOS">

```bash
curl -fsSL http://10.0.0.5:44442/install.sh | sudo bash -s -- --type workstation
curl -fsSL http://10.0.0.5:44442/install.sh | sudo bash -s -- --pool Overnight
```

</Tab>
</Tabs>

A workstation is not registered as a service: the desktop app starts it at user login.

## Install the first server on Linux or macOS

A new farm has no server to download from yet. The script on `renderflow.com` installs the machine as the farm's server, from Pulze's downloads, in the newest release:

```bash
curl -fsSL https://renderflow.com/install.sh | sudo bash
```

It checks the download against its checksum and stops if they differ, then installs RenderFlow as a server registered as a service.

- `--channel rc` or `--channel beta` installs the newest release candidate or beta instead of the newest release.
- `--version 2.0.20.0261-rc` installs that exact build.
- `--dry-run` prints what the script would download and run, and changes nothing.
- `--server <address>` joins an existing farm instead: the script hands over to that server's own `install.sh`, so the machine installs the version the server runs.

```bash
curl -fsSL https://renderflow.com/install.sh | sudo bash -s -- --channel rc --accept-eula
curl -fsSL https://renderflow.com/install.sh | sudo bash -s -- --server 10.0.0.5 --type workstation
```

Every other argument is passed on to the installer, with the same flags as a [silent installation](/renderflow/v2/getting-started/silent-deploy).

## When it does not install

**The server has no installer for this platform.** The script stops with a message such as `No linux-x64 installer for 2.0.19: add it in Settings > Deploy`. Add the installer for that platform, of the version the server runs, and run the command again.

**The command cannot reach the server.** Check the address and the port from the new machine, for example with `curl http://10.0.0.5:44442/api/v1/service/alive`. It answers with the server's version when the server can be reached.

**The server uses its own certificate.** A server published over HTTPS with a certificate from the studio's own certificate authority is only trusted by machines that trust that authority. Install the CA certificate on the machine first, or use the server's plain address on the studio network.

## Next steps

- [Deploy RenderFlow Versions](/renderflow/v2/guides/deploy): move the whole farm to another version
- [Silent Deployment](/renderflow/v2/getting-started/silent-deploy): every installer flag
