---
title: "System Requirements"
description: "Hardware, operating systems, licensing, network and port requirements for RenderFlow."
"og:title": "RenderFlow System Requirements"
"og:description": "Hardware, operating systems, licensing, network ports and storage needed to run RenderFlow."
"twitter:title": "RenderFlow System Requirements"
keywords: ['render farm hardware requirements', 'render farm system requirements', 'render node specs', 'render farm ports', 'render farm network requirements', 'MongoDB render farm', 'RenderFlow requirements']
---

## Licensing

RenderFlow requires a Pulze account with either a RenderFlow subscription or an active trial. Only the server signs in to that account, and it holds the licences for the whole farm, so the machines that join it need no account of their own.

Render engines and applications licensed per seat are counted by the farm. Press **Add licenses** in **Settings → Licenses**, pick the **Product** and enter the **Seats** you own. A step that needs a seat waits until one is free.

## Hardware

### Server

The server holds the database and coordinates every machine in the farm, which is book-keeping rather than heavy computation, so a modest desktop or a mini PC is usually enough.

| Spec | Minimum | Recommended |
|------|---------|-------------|
| CPU | 2 cores | 4+ cores |
| RAM | 8 GB | 16 GB |
| Disk | 50 GB free | 100 GB+ free, SSD |

Scale the server with the farm: the more machines that connect and the more jobs that sit in the queue, the more RAM and CPU cores the server wants.

<Note>
Rendering on the server is not recommended. A heavy render competing with the database for CPU and memory can cause problems across the farm, so it is better to leave the server to coordinate.
</Note>

### Render nodes and workstations

Any Windows, Linux or macOS machine that runs your application can be a render node, and more cores, more RAM and faster storage all translate directly into faster renders.

- **RAM matters most.** Match or exceed your workstations, because a scene that needs 90 GB on a workstation will either page to disk or fail outright on a node with 64 GB.
- **Disk.** Keep around 100 GB free on the system drive, since applications write temporary files there while rendering.
- **Network.** Every node reads scenes and writes frames over the same shared storage as the rest of the farm, so a slow connection becomes the bottleneck before CPU or RAM do. See [Network speed](#network-speed) below.

## Operating systems

RenderFlow runs on all three platforms, and a single farm can mix them freely. **Settings → Mapped Paths** translates file paths between operating systems so the same job renders everywhere.

| OS | Status |
|----|--------|
| Windows 10, 11, Server 2019 and later | Supported |
| macOS 13 (Ventura) and later | Supported |
| Linux: Rocky 8, 9, 10, Ubuntu, and other RHEL- and Debian-based distributions | Supported |

## Network

### Ports

| Port | Protocol | Purpose |
|------|----------|---------|
| 44442 | TCP | REST API and live updates |
| 44443 | UDP | Server discovery |
| 44444 | TCP | Database (MongoDB) |
| 44445 | TCP | The farm interface over HTTPS, when TLS is enabled |

Other machines only ever connect to the server: on 44442, on 44443 to discover it, and on 44445 when TLS is on. The database listens on the server's own loopback address, and workstations and nodes listen on theirs only.

Port 44445 only listens when TLS is switched on, and even then the machine's own loopback API stays plaintext, so submitters, `rfcli` and the desktop app running on the server itself are unaffected.

### Firewall

The installer configures the system firewall for you:

- **Windows**: program rules for `RenderFlow.exe` and `rfsv.exe`, plus port rules for `44443/udp`, `44444/tcp`, `44445/tcp`.
- **Linux**: `44442/tcp`, `44443/udp`, `44444/tcp` and `44445/tcp` through `firewalld` (Rocky, RHEL, Fedora) or `ufw` (Ubuntu, Debian). On any other firewall the installer prints the ports so you can open them by hand.
- **macOS**: Application Firewall exceptions for `rfsv` and the RenderFlow app. The macOS firewall works per process rather than per port, so no port rules are needed.

A third-party firewall or a corporate security policy will need these exceptions added manually, along with outbound access on the server to `*.pulze.io` (skip it entirely if you are on offline licensing) and, optionally, `*.renderflow.com`. See [Internet access](#internet-access) below for what each domain is for.

### Fixed IP addresses

Give the server a fixed address. If it changes, every machine in the farm loses its connection and has to be pointed at the new one.

### Network speed

How much bandwidth you need depends on the size of the farm and on the work it does, since every machine that opens a scene reads it from the same storage at the same time. 1 GbE is workable for a small farm, but 10 GbE is highly recommended and becomes difficult to avoid as the farm grows.

## Shared storage

The farm needs one folder that every machine can reach, called the **repository**, where RenderFlow keeps job files, task logs, frame previews and backups. The server asks for it during setup.

<Tip>
Address it with a UNC path (`\\server\share\...`) if any machine touching it runs RenderFlow as a service, which is the usual setup for a render node: a drive letter belongs to a logged-in user session, so a service has no session in which that letter exists. A mapped drive letter works fine on a machine you stay signed in to. To use drive letters on machines that run as a service, add them in **Settings → Mapped Drives**, and each Windows machine maps them when RenderFlow starts.

Running Windows, Linux and macOS side by side? Point your scenes and the repository at one UNC-style path and let **Settings → Mapped Paths** translate it to what each platform expects.
</Tip>

## Database

The server ships with **MongoDB 8.2.6** and runs it for you as a replica set, so there is nothing to install and nothing to configure.

If you would rather use your own cluster, point the server at it with `--uri` at install time or in **Settings → Server**. It has to be a replica set, because RenderFlow relies on change streams, which a standalone MongoDB does not provide.

## Internet access

Only the server needs internet access; render nodes and workstations do not.

| Domain | Purpose | Required |
|--------|---------|----------|
| `*.pulze.io` | Sign-in, licensing and the update check | On the server, unless you are on offline licensing |
| `*.renderflow.com` | Relayed email notifications and the AI agent features | Optional |

Blocking `*.renderflow.com` costs you two optional conveniences and nothing more: email notifications sent through Pulze's relay, and the AI agent features. Slack, Teams, Discord and webhook notifications go straight to those services, and an email channel pointed at your own SMTP server is unaffected.

### Behind a proxy

Point the server at your proxy with `--proxy-host` and `--proxy-port` when you install it, adding `--proxy-user` and `--proxy-pass` if the proxy asks for credentials, and `--proxy-bypass` for internal hosts that must not go through it. [Silent Deployment](/renderflow/v2/getting-started/silent-deploy#installer-flags) lists every flag. On a server that is already installed, set the proxy and the **Certificate authority** in **Settings → Server**.

**A proxy that inspects HTTPS.** Many corporate proxies decrypt HTTPS traffic and re-sign it with the company's own certificate authority. RenderFlow does not trust that authority on its own, so the server cannot reach Pulze and its log shows:

```
Failed to resolve https://backend.pulze.io, attempt 2/2: [GET] 'https://backend.pulze.io': unable to get local issuer certificate
```

Give RenderFlow your company's CA certificate as a PEM file with `--tls-ca`. RenderFlow trusts it in addition to the public certificate authorities, for every HTTPS connection it makes:

```powershell
renderflow-2.0.17.0044-windows-x64.exe --proxy-host=proxy.studio --proxy-port=3128 --tls-ca=C:\certs\studio-ca.pem
```

**Saving the settings.** The installer saves its flags, so the service uses them every time it starts. Flags given to `rfsv` itself apply to that run only. To change the settings of a machine that is already installed, stop the service and run `rfsv config` with the new values, for example `rfsv config --tls-ca=C:\certs\studio-ca.pem`, then start the service again.

### No internet access

RenderFlow can also run in a sealed environment with no route to the internet at all, on **offline licensing**, which is part of RenderFlow Enterprise. See [Offline Licensing](/renderflow/v2/getting-started/offline-licensing).

## Next steps

- [Installation](/renderflow/v2/getting-started/installation)
- [Server and Nodes](/renderflow/v2/getting-started/server-and-nodes)
