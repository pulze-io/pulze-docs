---
title: "Migrating"
description: "Move to RenderFlow from RenderFlow 1 or from Pulze Render Manager: what to expect and how to plan it."
"og:title": "Migrating to RenderFlow"
"og:description": "RenderFlow is a breaking change with no data carried over. Plan the move from RenderFlow 1 or Render Manager."
"twitter:title": "Migrating to RenderFlow"
keywords: ['RenderFlow 1 to 2 migration', 'render farm upgrade', 'RenderFlow breaking changes', 'Pulze Render Manager upgrade', 'migrate to RenderFlow']
---

RenderFlow is a breaking change. It keeps no data from any earlier version and there is no import, so once it is installed the farm is set up again from scratch: the server, the pools, the users and groups, the settings, and each machine joining as it did the first time.

## From RenderFlow 1

A RenderFlow 1 database cannot be read by RenderFlow. On first start, RenderFlow moves the existing data directory aside as `…-backup-<timestamp>` and begins with an empty farm; nothing is deleted, but the farm you get is a new one, without the jobs, machines, users, statistics or history of the old.

Machines are the straightforward part: install RenderFlow, choose the role, point it at the new server. Nothing needs uninstalling in any particular order.

Anything you have built on the RenderFlow 1 API or its SDKs has to be updated. The API was rebuilt and every client regenerated with it, so a 1.x integration will not work. See the Developers section for more info.

## Next steps

- [Installation](/renderflow/v2/getting-started/installation)
- [Server and Nodes](/renderflow/v2/getting-started/server-and-nodes)
- [Changelog](/renderflow/v2/changelog)
