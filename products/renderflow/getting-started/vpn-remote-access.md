---
title: "VPN, Remote Access, and Multi-Location"
description: "How to use RenderFlow over VPN, connect remote artists to your render farm, and manage nodes across multiple offices."
"og:title": "RenderFlow over VPN: Remote Access and Multi-Office Setup"
"og:description": "Connect remote artists, share render capacity across offices, and manage distributed render farms with RenderFlow over VPN."
"twitter:title": "RenderFlow VPN and Remote Access Guide"
keywords: ['render farm VPN', 'remote rendering VPN setup', 'access render farm from home', 'Tailscale render farm', 'WireGuard render farm', 'remote render farm access', 'render farm remote workers']
---

RenderFlow works over VPN with no special configuration. Remote artists can submit jobs from home, multiple offices can share render capacity overnight, and distributed teams can use a single centralized farm.

## VPN basics

Any VPN that creates a standard network tunnel between the remote machine and your studio LAN will work. RenderFlow uses standard TCP/UDP ports and doesn't require special protocols.

### Recommended VPN solutions

**Tailscale** is the easiest option. It's based on WireGuard, takes minutes to set up, and has a generous free tier. Each machine installs a lightweight client and joins your private network. No server infrastructure needed.

Any WireGuard-based VPN will work similarly. OpenVPN, ZeroTier, and corporate VPN solutions are all fine, as long as the remote machine can reach the RenderFlow server's IP and the shared storage paths.

### Requirements

- A stable internet connection with decent upload speed (both at the studio and at the remote location)
- The remote machine must be able to reach the RenderFlow server on ports 44442-44444
- Network drives and project files must be accessible through the VPN (RenderFlow doesn't transfer files)

## Common scenarios

### Remote artist submitting to the office farm

This is the most common setup. An artist working from home connects to the studio VPN, opens their 3D application, and submits a job to RenderFlow. The scene file is saved to the studio's file server over the VPN, and the render nodes on the local network pick it up and render it.

The artist monitors progress from the RenderFlow interface on their machine, just like they would in the office.

<Frame caption="Remote artist → VPN → Office network → Render farm">
  <img src="https://placehold.co/900x500?text=Remote+artist+→+VPN+→+Office+network+→+Render+farm" alt="Remote artist → VPN → Office network → Render farm" />
</Frame>

**Important:** the scene file and all its assets must be on the studio's shared storage, not on the artist's local drive. Save to the network path (e.g., `\\fileserver\projects\`) before submitting. The render nodes at the office need to access these files on their local network. They won't reach the artist's home machine.

### Multi-office shared farm

Studios with multiple offices can connect them via VPN and share a single RenderFlow server. Common patterns:

- **Office A has the render farm, Office B has artists.** Office B's artists submit jobs that render on Office A's nodes.
- **Both offices have workstations.** During the day, each office uses their own machines. Overnight, a Scheduler event activates all workstations across both locations as render nodes, pooling capacity.
- **Shared overflow.** When one office is under deadline pressure, they use the other office's idle capacity.

In all cases, there's one RenderFlow server, and all nodes connect to it over VPN. The server can be at either location.

### Remote render nodes

This means placing render nodes at a remote location (a co-location facility, a team member's home, etc.) that connect back to your server over VPN. While technically possible, it's **not recommended** unless you have a very fast internet connection. The render nodes need to read every texture, proxy, and cache file over the internet, which is dramatically slower than local network access.

If you need remote rendering power without the network overhead, [RenderFlow Cloud](/products/renderflow/cloud-rendering/overview) is a better option. Assets are uploaded once, and rendering happens on high-speed cloud infrastructure.

## Practical tips

### VPN startup timing

RenderFlow may start before the VPN connection is established (especially on machines set to auto-start both). If this happens, RenderFlow won't find the server initially. It will keep retrying automatically, but if the connection doesn't recover within a few minutes, restart RenderFlow after confirming the VPN is connected.

### Network drive access

Everything on the studio's file server must be accessible through the VPN at the same path. If the office uses `\\fileserver\projects\`, the remote machine must be able to reach `\\fileserver\projects\` through the VPN tunnel.

Test this before submitting jobs: open File Explorer on the remote machine and navigate to the shared path. If you can browse the project files, RenderFlow will work.

### Asset preparation

RenderFlow does not sync or transfer project files. It's the artist's responsibility to ensure all scene assets are on shared storage before submitting. If an artist has textures only on their local drive at home, the office render nodes won't be able to find them.

## RenderFlow Cloud as an alternative

For remote artists who don't have VPN access or who work with poor internet connections, [RenderFlow Cloud](/products/renderflow/cloud-rendering/overview) removes the dependency on shared storage entirely.

With Cloud rendering, RenderFlow automatically uploads the scene file and all required assets to cloud infrastructure. The artist doesn't need to be on the studio network. Remote teams can submit cloud jobs from anywhere. The only requirement is an internet connection and RenderFlow with a credit balance.

This makes Cloud rendering especially attractive for distributed teams where setting up and maintaining VPN infrastructure isn't practical.
