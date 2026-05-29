---
title: "Requirements"
description: "Hardware, operating system, network, and port requirements for running RenderFlow."
"og:title": "RenderFlow System Requirements"
"og:description": "Hardware, OS, network ports, and infrastructure needed to run RenderFlow render farm manager."
"twitter:title": "RenderFlow System Requirements"
keywords: ['render farm hardware requirements', 'render farm system requirements', 'render node specs', 'render farm ports', 'render farm network requirements', 'MongoDB render farm', 'RenderFlow requirements']
---

## Hardware

### Server

The server runs the RenderFlow database and coordinates all connected nodes. It does not need to be a powerful machine. Even a modest desktop or a dedicated mini PC will work.

| Spec | Minimum | Recommended |
|------|---------|-------------|
| CPU | 2 cores | 4+ cores |
| RAM | 8 GB | 16 GB |
| Disk | 50 GB free | 100 GB+ free (SSD recommended) |

A recommended server comfortably handles 50+ nodes. RenderFlow has been tested with up to 250 nodes on a single server.

<Warning>
Avoid running the server on a machine that also renders heavy jobs. When a render consumes all available CPU and RAM, the database and connections might not be able to keep up and nodes will lose connection.
</Warning>

### Render nodes and workstations

There are no strict hardware requirements for render nodes. Any Windows, macOS, or Linux machine that can run your 3D application can be a render node. More CPU cores, more RAM, and faster storage all translate to faster renders.

A few things to keep in mind:

- **RAM matters most.** If your workstation uses 90 GB of RAM on a scene, a render node with only 64 GB will either render slowly (paging to disk) or crash with an out-of-memory error. Match or exceed your workstation's RAM on render nodes.
- **Keep 100 GB free on the system drive (C:).** Windows and 3D applications use temporary disk space during rendering. Running low causes slowdowns and failures.
- **1 GB disk space** is needed for the RenderFlow installation itself.

## Operating system

| OS | Status |
|----|--------|
| Windows 10, 11, and Server 2019+ | Supported |
| macOS | Supported |
| Linux (Rocky 8/9, Ubuntu, and other RHEL/Debian-based distributions) | Supported |

## Network

### Ports

RenderFlow uses four TCP/UDP ports. All must be open between the server and every connected machine.

| Port | Protocol | Purpose |
|------|----------|---------|
| 44442 | TCP | REST API, log streaming, web interface, integrations |
| 44443 | UDP | Server discovery broadcast |
| 44444 | TCP | Database access (MongoDB) |

### Firewall

RenderFlow's installer configures the system firewall for you:

- **Windows** — adds program rules for `RenderFlow.exe` (user interface), `rfsv.exe` (background service), `rfpm.exe` (process manager), and the bundled `mongod.exe`, `mongosh.exe`, `mongodump.exe`, and `mongorestore.exe` binaries.
- **macOS** — adds Application Firewall exceptions for `rfsv` and the RenderFlow app. macOS's firewall is per-process and is off by default, so no per-port rules are needed.
- **Linux** — opens ports `44442/tcp`, `44443/udp`, and `44444/tcp` through `firewalld` (on RHEL-based distributions like Rocky and Fedora) or `ufw` (on Debian-based distributions like Ubuntu). On other firewalls the ports must be opened manually.

If you use a third-party firewall or corporate security policy, you'll need to add these exceptions manually along with the ports listed above.

### Fixed IP addresses

Fixed (static) IP addresses are highly recommended for all machines, especially the server. If the server's IP changes, every node loses its connection and must be reconfigured.

For render nodes, fixed IPs prevent issues with DHCP lease changes causing nodes to appear as new machines in RenderFlow.

### Network speed

10 Gigabit Ethernet is a nice-to-have for multi-node setups. When multiple nodes open a scene simultaneously, they all read from the same network storage. With 1 GbE, scene loading times increase as the number of active nodes grows. If your budget allows, 10 GbE will make a noticeable difference, but it is not a requirement to use RenderFlow.

## Internet access

Only the server requires internet access. It connects to Pulze servers once daily (weekdays at 8 AM) for license verification and authentication.

| Domain | Purpose |
|--------|---------|
| `*.pulze.io` | Licensing, authentication, account management |
| `*.renderflow.com` | Notifications, Cloud rendering service (optional) |

Render nodes and workstations do not need internet access. However, fully offline operation (no internet on the server) is not supported.
