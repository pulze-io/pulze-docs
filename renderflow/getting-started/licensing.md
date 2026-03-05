---
title: "Licensing"
description: "How RenderFlow licensing works. Per-node model, 30-day trial with up to 10 nodes, and automatic license management."
"og:title": "RenderFlow Licensing"
"og:description": "How RenderFlow licensing works. Per-node licensing, free features without a license, 30-day trial, and automatic license management."
"twitter:title": "RenderFlow Licensing"
keywords: ['render farm licensing', 'render farm free trial', 'per node licensing', 'render farm license management', 'RenderFlow license']
---

## Licensing model

RenderFlow uses a **per-node** licensing model. A license is only required for machines that process render jobs. Everything else is free.

## What's free

You can install RenderFlow on any number of computers at no cost. The following features are available without a license:

- Running the server
- Submitting jobs
- Monitoring nodes (hardware, status, software)
- Software analytics (version comparison across nodes)
- Statistics and dashboards
- Scheduler
- Cloud rendering (uses credits, no node license needed)
- REST API, CLI, SDKs, MCP Server

## What requires a license

Only machines that **render or process jobs** need a license. If a machine only submits jobs, monitors nodes, or hosts the server, no license is consumed.

### Examples

**Small studio, 1 workstation + 3 render nodes:**
The workstation submits jobs and also renders overnight. All 4 machines process jobs, so you need **4 licenses**.

**Medium studio, 10 computers, 1 dedicated server:**
The server only hosts the database and doesn't render. One machine is used purely for job submission. The remaining 8 machines render. You need **8 licenses**.

**Freelancer, single workstation:**
Your machine runs as both server and render node. You need **1 license**.

## Free trial

RenderFlow offers a **30-day free trial** with up to **10 nodes**. Activate it during installation when configuring the server, or later from **Settings > Licenses**.

No credit card is required. When the trial expires, your nodes won't be able to process new jobs, but you can still use all free features (monitoring, analytics, scheduling, etc.).

## License management

### Automatic mode

In Automatic mode, all RenderFlow licenses on your Pulze account are automatically reserved and used by the server. The distribution of licenses to individual nodes is handled automatically by RenderFlow. When a node becomes active, a license is assigned. When it stops, the license is released.

This is the recommended mode for most studios.

### Manual mode

In Manual mode, you choose how many of your available licenses this server should use. This is useful when running multiple RenderFlow servers and you need to split your license pool across them.

In both modes, the actual distribution of licenses to nodes is automatic. You cannot manually assign a license to a specific node.

### Moving licenses between servers

To move licenses from one server to another (e.g., when migrating to new hardware), go to your [Pulze account](https://www.pulze.io/account/licenses?sku=pulze_renderflow) and unlock the licenses, then activate them on the new server.

## License checking

RenderFlow checks licenses on **weekdays at 8 AM** (server's local time). This is intentional so that overnight and weekend renders are never interrupted by a license check.

Only the server needs internet access for license verification. Nodes and workstations do not communicate with Pulze servers.

## What happens when licenses expire

- Nodes cannot be activated (switching from Suspended or Reserved to Idle will fail).
- Nodes currently rendering will eventually stop working.
- All free features (monitoring, analytics, scheduling, submission) continue to work normally.
