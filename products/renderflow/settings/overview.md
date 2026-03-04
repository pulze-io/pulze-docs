---
title: "Settings"
sidebarTitle: "System & Preferences"
description: "Configure RenderFlow's appearance, users, groups, policies, pools, licenses, and system behavior."
"og:title": "RenderFlow Settings"
"og:description": "Complete guide to RenderFlow settings: user management, group permissions, pool configuration, license management, integrations, backup, and system options."
"twitter:title": "RenderFlow Settings"
keywords: ['render farm configuration', 'render farm settings', 'render farm user permissions', 'render farm access control', 'render farm backup', 'RenderFlow settings']
---

Settings are accessible from the bottom-left menu. This page covers every settings section in RenderFlow.

## Appearance

**Theme** switches between light and dark mode. The default is dark.

**Auto-close on idle** minimizes the RenderFlow window after 15 minutes of computer idle time. This is enabled by default. Disable it if you want to use RenderFlow as a persistent dashboard or kiosk display for the team.

## Account

Shows the Pulze account currently logged into the server. If you need to change the account, you will need to reset the server and go through the configuration and authentication process again.

## Users

Each unique user is listed in a table. Users are not created manually. They are automatically added when a workstation connects and a user logs in. This keeps setup simple: Windows usernames carry over naturally, especially in domain environments.

For each user you can set an **alias** (display name used throughout RenderFlow), assign a **group** (determines permissions), add a **role** (a label like admin, supervisor, wrangler, or 3D artist), and enter an **email** address (pre-populated in job notification settings).

## Groups

Groups connect users to [policies](#policies). RenderFlow includes two default groups that cannot be deleted: **Admin** and **User**. You can create additional groups with the **Add Group** button and rename any group freely. If a custom group is deleted, its users and policies fall back to the User group.

## Policies

Policies control what each group is allowed to do inside RenderFlow. The policy table lists every controllable feature as a row, with groups as columns.

Each policy has one of two types. **Boolean** policies are simple on/off toggles. **Level** policies offer four options: Everyone (can perform the action on any item), Group (only on items belonging to their group), Own (only on their own items), or None (no access).

By default, the Admin group has full access to everything. The User group has slight restrictions. The recommended setup for larger teams is three tiers: Admin with full power, a mid-tier group (supervisor, lead, or TD) with rights to control all jobs and restart machines, and an Artist group that can only submit and manage their own jobs.

All policy changes take effect immediately in the UI.

| Policy | Description | Type |
|--------|-------------|------|
| Create Job | Create a new job | Boolean |
| Create Cloud Job | Submit jobs to cloud rendering | Boolean |
| Start Job | Start a suspended job | Level |
| Stop Job | Stop a running job | Level |
| Finish Job | Finish current task and stop the job | Level |
| Reset Job | Reset a job to its initial state | Level |
| Delete Job | Delete a job | Level |
| Edit / Update Job | Change job settings, priority, and other attributes | Level |
| Archive Job | Archive a job | Level |
| Restore Archived Job | Restore a job from archive | Boolean |
| Delete Archived Job | Permanently delete an archived job | Boolean |
| Edit Node | Change node name, group, tag, or settings | Level |
| Restart Node | Restart the selected node | Level |
| Shutdown Node | Shut down the selected node | Level |
| Suspend Node | Suspend the node | Level |
| Reserve Node | Reserve the node | Level |
| Resume Node | Resume the node | Level |
| Wakeup Node | Wake up the node | Level |
| Delete Node | Delete the node from the system | Level |
| Finish Task and Suspend Node | Finish current task, then suspend | Level |
| Change Pool | Move a computer to a different pool | Level |
| Change Mode | Change the mode of a computer | Boolean |
| Start Node Spawner | Start spawner mode on a node | Boolean |
| Stop Node Spawner | Stop spawner mode on a node | Boolean |
| CPU Affinity | Configure CPU affinity settings | Level |
| Remote Desktop Access | Access a node via Remote Desktop | Level |
| Software Analytics | Access software information for each computer | Boolean |
| View Statistics | Access system-wide statistics | Boolean |
| View Scheduler | Access the scheduler | Boolean |
| Edit Scheduler | Create and modify scheduler events | Boolean |
| Edit Sanity Checks | Create and modify sanity checks | Boolean |
| Error Reporter | Collect diagnostic data for support | Boolean |
| System Idle Mode | Enable automatic node idle mode | Boolean |
| Maintenance Mode | Enable system-wide maintenance mode | Boolean |
| System Settings | Manage system settings | Boolean |
| Manage API Keys | Create and revoke API keys | Boolean |

<Frame caption="Policy matrix showing permissions per group">
  <img src="https://placehold.co/900x500?text=Policy+matrix" alt="Policy table with groups as columns and features as rows" />
</Frame>

## Pools

Pools divide your farm into separate groups. Nodes only work on jobs submitted to their own pool, with no crossing. See [Nodes Overview](/products/renderflow/nodes/overview) for details on pool behavior and distribution modes.

Create new pools with **Add Pool**. The default pool cannot be deleted. Deleting a custom pool moves its nodes and jobs back to the default pool.

## Licenses

This section lists all licenses on your Pulze account. During server configuration, you chose between **Automatic** (RenderFlow assigns licenses) and **Manual** (you hand-pick which licenses to use, useful when splitting licenses across multiple servers).

The table shows each license's state, type, activation date, expiration date, and which node is using it. Use **Refresh** to update license states and **Sync** to pull newly purchased licenses from your account.

If your farm runs out of available licenses, additional nodes are switched to Suspended and will not pick up work.

## Repository

The repository is the shared network folder you configured during [server setup](/products/renderflow/getting-started/quick-start). It stores active and archived jobs, temporary artifacts (thumbnails, outputs), database backups, downloaded updates, and error reports.

You can view the current path, reset it, or browse for a new location. Every connected node must have access to this folder.

## Mapped Drives

Network drive mappings ensure that render nodes can access project files stored on network shares. Click **Add New**, select a drive letter, enter the UNC network path, and save. RenderFlow maps these drives automatically on each startup and before each job starts.

## API Keys

API keys are required for authenticating with the [REST API](/products/renderflow/developers/authentication), SDKs, and CLI. Job creation is the only operation that does not require an API key.

Click **Create Key**, name it, and copy the generated key. The key is shown only once. Deleting a key immediately revokes access for any tool using it.

## Integrations

Integrations connect third-party services to RenderFlow. Currently supported: Slack and Teams (for [job notifications](/products/renderflow/jobs/notifications)) and custom Webhooks (for triggering external services).

Click **New Integration**, select the type, fill in the required fields (typically a webhook URL and a name), and save. The integration becomes available for selection in the Submitter.

## Backup

RenderFlow automatically backs up your database to the repository folder. You can also create manual backups with the **Backup** button, open backup file locations, or delete old backups.

<Info>
Self-serve database restore is not yet available. If you need to restore from a backup, contact [support](/products/renderflow/support/contact-us).
</Info>

## System

**Maintenance Mode** blocks new job submissions across the entire farm. Active tasks finish, but no new tasks are assigned. Use this for system-wide updates, debugging, or planned maintenance windows.

**Automatic Node Mode** defines when a workstation should automatically become available for rendering. Configure the idle time threshold (how long without mouse or keyboard input), CPU usage threshold, minimum available RAM, and a list of blacklisted processes that prevent the machine from switching to idle.

## Reset

The reset button at the bottom of the settings page restarts RenderFlow and clears all configuration settings. Your jobs and other data are preserved. Use this if you need to reconfigure the server or workstation from scratch.
