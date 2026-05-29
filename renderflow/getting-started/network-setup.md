---
title: "Network Setup and Storage"
description: "How to configure your network, shared storage, UNC paths, and folder structure for a render farm running RenderFlow."
"og:title": "Render Farm Network and Storage Setup Guide"
"og:description": "Configure shared storage, UNC paths, network switches, and folder structure for your render farm."
"twitter:title": "Render Farm Network and Storage Setup"
keywords: ['render farm network setup', 'UNC paths render farm', 'NAS for render farm', 'shared storage for rendering', '10GbE render farm', 'render farm folder structure', 'mapped drives render farm', 'Windows network rendering setup']
---

A properly configured network and shared storage are the foundation of a reliable render farm. Most rendering issues (failed jobs, missing textures, slow scene loading) trace back to network or storage problems, not to the render manager itself.

## Network basics

The standard setup for a studio render farm is straightforward:

- All machines on the **same local network** (LAN)
- A **managed network switch** connecting everything (avoid consumer-grade routers for the farm backbone)
- **10 Gigabit Ethernet** connections between render nodes and storage

If your budget allows, **10 Gigabit Ethernet** connections between render nodes and storage will make a noticeable difference in scene loading times, especially with larger farms.

10 GbE is not a requirement for RenderFlow, but it does help. When 10 or more nodes simultaneously open a scene and load textures, a 1 GbE connection can become a bottleneck. Scene opening times increase, and rendering takes longer because nodes are waiting for data.

### Firewall

RenderFlow automatically adds Windows Defender Firewall exceptions for all its executables during installation. The macOS and Linux installers do the same on their platforms (Application Firewall on macOS, `firewalld` or `ufw` on Linux). For most studios, no additional firewall configuration is needed.

If you use a third-party firewall or corporate security appliance, add exceptions for the [RenderFlow ports](/renderflow/getting-started/requirements#ports) (TCP 44442, 44444 and UDP 44443) and the RenderFlow executables.

## Shared storage

### NAS vs. file server

For studios with up to 10–15 machines, a NAS (Network Attached Storage) device works well. Choose one with 10 GbE ports and SSD storage if possible.

For larger studios (20+ machines), a dedicated file server with SSD RAID storage and 10 GbE offers better throughput, reliability, and management options.

The key metric is **sustained read throughput under concurrent access**. Your storage needs to handle many machines reading large files simultaneously without slowing down.

### Storage bandwidth matters most

The connection between render nodes and storage is the most performance-critical link in your farm. When a job starts and 20 nodes open a scene file at the same time, they all read from the same storage. Slow storage means slow scene loading, which means wasted render time.

Invest in fast storage and fast networking before adding more render nodes. A farm with fewer nodes and fast storage will often outperform a farm with more nodes on slow storage.

### Mounting the share on macOS and Linux

Windows reaches a share over SMB using its UNC path with no extra setup. On macOS and Linux render nodes, NFS is the usual choice, and you mount the share to a local path first.

Linux (NFS):

```bash
sudo mkdir -p /mnt/projects
sudo mount -t nfs fileserver:/projects /mnt/projects
```

macOS (NFS):

```bash
sudo mkdir -p /Volumes/projects
sudo mount_nfs -o resvport fileserver:/projects /Volumes/projects
```

The `resvport` option is required on macOS, which connects from a reserved source port. If your storage only serves SMB, Linux can mount it with CIFS instead:

```bash
sudo mount -t cifs //fileserver/projects /mnt/projects -o username=renderuser,password=secret
```

Add the mount to `/etc/fstab` on Linux (or a macOS automount entry) so it survives reboots, then confirm every node can reach the share before submitting:

```bash
ls /mnt/projects            # Linux
ls /Volumes/projects        # macOS
dir \\fileserver\projects   # Windows
```

## UNC paths

UNC (Universal Naming Convention) paths are the most reliable way to reference files on shared storage:

```
\\servername\sharename\folder\file.ext
```

For example: `\\fileserver\projects\Kitchen\scene.max`

Unlike mapped drive letters (like `S:\Projects\Kitchen\scene.max`), UNC paths work from any machine on the network without any drive mapping configuration. They work in user sessions, in service mode, and across VPN connections.

### Setting up a network share

1. On your NAS or file server, create a shared folder (e.g., `Projects`)
2. Set permissions so all studio users and the RenderFlow service account have read/write access
3. Access it from any machine using `\\servername\Projects`

### Mapped drives vs. UNC paths

Many studios use mapped drives for convenience. It's easier to type `S:\` than `\\fileserver\projects\`. This works fine on individual workstations, but causes problems in a render farm:

- Mapped drives are **per-user, per-session**: they don't exist in Windows services (Session 0)
- Different machines may map different letters to different locations
- VPN-connected machines may not have the same drive mappings

**Best practice:** use UNC paths directly in your 3D scenes and project settings. This makes your files portable across any machine.

**If you can't switch to UNC paths** (legacy projects, established workflows), RenderFlow's Mapped Drives feature can help. Go to **Settings > Mapped Drives** and define the mapping between drive letters and UNC paths. RenderFlow will automatically map these drives during startup and before each render job, and will verify they're accessible before a node begins rendering.

<Frame caption="Mapped Drives settings in RenderFlow">
  <img src="/images/renderflow/rf_network_mapped_drives.png" alt="Settings > Mapped Drives showing drive letter to UNC path mappings" />
</Frame>

## Mixed-OS farms: path mapping

If your farm only uses one operating system, you can skip this section. But the moment a Windows artist submits a job that has to render on a Linux or macOS node — or vice versa — the same share is reached through different paths on each OS:

| Same share, three views | |
|---|---|
| Windows | `Z:\projects\shot01` or `\\fileserver\projects\shot01` |
| macOS | `/Volumes/projects/shot01` |
| Linux | `/mnt/projects/shot01` |

Scene files baked on Windows contain `Z:\...` paths that a Linux node has no way to resolve on its own. **Mapped Paths** in RenderFlow Settings is how you bridge that gap.

### How it works

Go to **Settings > Mapped Paths** and click **Add new**. For each shared location, give the mapping a name (e.g. *Projects share*) and fill in the path each OS uses to reach it. You only need to fill in the platforms your farm actually uses — a mapping with a single OS path is still useful as a one-way rewrite.

When a job is dispatched to a node, RenderFlow rewrites scene file paths, output paths, and other path properties using the entry whose prefix matches. A Windows artist submitting `Z:\projects\shot01\scene.ma` becomes `/mnt/projects/shot01/scene.ma` on a Linux node automatically.

<Frame caption="Mapped Paths in Settings — name plus Windows, macOS, and Linux columns">
  <img src="/images/renderflow/rf_settings_mapped_paths.png" alt="Mapped Paths list showing name, Windows, macOS, and Linux path entries" />
</Frame>

### Matching rules

A few details that matter when designing your mappings:

- **Longest matching prefix wins.** You can have a broad mapping for `\\fileserver\projects` and a more specific one for `\\fileserver\projects\hero-shot` — the specific one takes priority when paths fall under it.
- **Windows prefixes match case-insensitively** and treat `\` and `/` as equivalent. `Z:\Projects` and `z:/projects` are the same.
- **macOS and Linux prefixes are case-sensitive**, matching the underlying filesystems.

### Tips for clean cross-OS rendering

- Decide on a canonical mount layout (e.g. `/mnt/projects` on Linux, `/Volumes/projects` on macOS, `Z:\projects` on Windows) and apply it consistently across every node. Mapping translates paths — it can't paper over inconsistent mounts.
- Prefer UNC paths over drive letters in Windows submissions even when you have Mapped Paths configured. UNC paths are stable across user sessions and survive in service mode without extra setup.
- Test the pipeline end-to-end with one job before rolling out farm-wide. Submit from a Windows workstation, force the job onto a Linux node, and check that the output lands where you expect.

## Folder structure

Start simple and expand as your studio grows. A typical structure includes separate areas for scene files, project-specific assets, render output (organized by date), and incoming/outgoing client materials. Keep your project files and your shared asset library (downloaded textures, models, HDRIs, plugin libraries) on separate shares.


The key rule: **every file path referenced in a scene must be accessible at the same path on every machine.** If an artist saves a scene that references `\\fileserver\library\textures\wood.jpg`, every render node must be able to reach that file at that exact path.

## Workgroup vs. Domain

**Small studios (under 20 people):** a Windows Workgroup is perfectly fine. Simple to set up, no dedicated infrastructure needed. Manage file share permissions by creating matching user accounts on your NAS or file server.

**Larger studios (20+ people with a sizable render farm):** an Active Directory Domain gives you centralized user management, group policies, and proper permission control. This makes managing access across dozens of machines much more practical. If you can afford a dedicated IT person or service, Domain is the way to go.

RenderFlow works with both configurations. It doesn't depend on Active Directory. Node discovery, communication, and job distribution all use RenderFlow's own protocols.
