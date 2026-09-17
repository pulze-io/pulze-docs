---
title: "Migrating"
description: "Move to RenderFlow 2 from RenderFlow 1 or from Pulze Render Manager: what to expect and how to plan it."
"og:title": "Migrating to RenderFlow 2"
"og:description": "RenderFlow 2 is a breaking change with no data carried over. Plan the move from RenderFlow 1 or Render Manager."
"twitter:title": "Migrating to RenderFlow 2"
keywords: ['RenderFlow 1 to 2 migration', 'render farm upgrade', 'RenderFlow 2 breaking changes', 'Pulze Render Manager upgrade', 'migrate to RenderFlow']
---

RenderFlow 2 is a breaking change. It keeps no data from any earlier version and there is no import, so once it is installed the farm is set up again from scratch: the server, the pools, the users and groups, the settings, and each machine joining as it did the first time.

Plan the move for a point where the queue is empty, and expect to spend the time you spent configuring the farm originally.

<Warning>
Install RenderFlow 2 on a different machine from your working farm if you possibly can. The two then run side by side, you can go back, and nothing is riding on the new farm until you are happy with it.
</Warning>

## From RenderFlow 1

A RenderFlow 1 database cannot be read by RenderFlow 2, which ships a newer MongoDB that refuses that storage. On first start, RenderFlow 2 moves the existing data directory aside as `…-backup-<timestamp>` and begins with an empty farm — nothing is deleted, but the farm you get is a new one, without the jobs, machines, users, statistics or history of the old.

Machines are the straightforward part: install RenderFlow 2, choose the role, point it at the new server. Nothing needs uninstalling in any particular order.

Anything you have built on the RenderFlow 1 API or its SDKs has to be updated. The API was rebuilt and every client regenerated with it, so a 1.x integration will not run unmodified: regenerate your own client against the RenderFlow 2 document, or move to the Python SDK, the TypeScript SDK or `rfcli`, all of which are generated from it and will not drift. See the Developers section.

## From Render Manager

Render Manager is deprecated and receives no further updates. RenderFlow is its successor, and the upgrade is free: your subscription price stays the same until you cancel, and starter licences are converted automatically. A Creators Bundle (Scene Manager and Render Manager) becomes a Workflow Bundle (Scene Manager and RenderFlow) at the same price.

<Warning>
Upgrading converts your Render Manager licences to RenderFlow licences, and that cannot be reversed. Test RenderFlow with your own production scenes on a spare machine first.
</Warning>

<Steps>
<Step title="Open your account">
Go to your [Pulze account](https://account.pulze.io).
</Step>
<Step title="Choose the upgrade">
Press **Upgrade to RenderFlow**, or **Upgrade to Workflow Bundle** if you have a Creators Bundle.
</Step>
<Step title="Confirm">
</Step>
</Steps>

Render Manager can stay installed while you move across; the two share no ports, services or data directories.

## Next steps

- [Installation](/renderflow/v2/getting-started/installation)
- [Server and Nodes](/renderflow/v2/getting-started/server-and-nodes)
- [Changelog](/renderflow/v2/changelog)
