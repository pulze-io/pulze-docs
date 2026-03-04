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

## Shared storage

### NAS vs. file server

For studios with up to 10–15 machines, a NAS (Network Attached Storage) device works well. Choose one with 10 GbE ports and SSD storage if possible.

For larger studios (20+ machines), a dedicated file server with SSD RAID storage and 10 GbE offers better throughput, reliability, and management options.

The key metric is **sustained read throughput under concurrent access**. Your storage needs to handle many machines reading large files simultaneously without slowing down.

### Storage bandwidth matters most

The connection between render nodes and storage is the most performance-critical link in your farm. When a job starts and 20 nodes open a scene file at the same time, they all read from the same storage. Slow storage means slow scene loading, which means wasted render time.

Invest in fast storage and fast networking before adding more render nodes. A farm with fewer nodes and fast storage will often outperform a farm with more nodes on slow storage.

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

<Frame caption="Settings > Mapped Drives">
  <img src="https://placehold.co/900x500?text=Settings+>+Mapped+Drives" alt="Settings > Mapped Drives" />
</Frame>

## Folder structure

Start simple and expand as your studio grows. A typical structure includes separate areas for scene files, project-specific assets, render output (organized by date), and incoming/outgoing client materials. Keep your project files and your shared asset library (downloaded textures, models, HDRIs, plugin libraries) on separate shares.

<Frame caption="Example folder structure for a render farm">
  <img src="https://placehold.co/900x500?text=Folder+Structure+Diagram" alt="Example folder structure for a render farm" />
</Frame>

The key rule: **every file path referenced in a scene must be accessible at the same path on every machine.** If an artist saves a scene that references `\\fileserver\library\textures\wood.jpg`, every render node must be able to reach that file at that exact path.

## Windows Firewall

RenderFlow automatically adds Windows Defender Firewall exceptions for all its executables during installation. For most studios, no additional firewall configuration is needed.

If you use a third-party firewall or corporate security appliance, add exceptions for the [RenderFlow ports](/products/renderflow/getting-started/requirements#ports) (TCP 44442, 44444 and UDP 44443) and the RenderFlow executables.

## Workgroup vs. Domain

**Small studios (under 20 people):** a Windows Workgroup is perfectly fine. Simple to set up, no dedicated infrastructure needed. Manage file share permissions by creating matching user accounts on your NAS or file server.

**Larger studios (20+ people with a sizable render farm):** an Active Directory Domain gives you centralized user management, group policies, and proper permission control. This makes managing access across dozens of machines much more practical. If you can afford a dedicated IT person or service, Domain is the way to go.

RenderFlow works with both configurations. It doesn't depend on Active Directory. Node discovery, communication, and job distribution all use RenderFlow's own protocols.
