---
title: "Backup, Restore and Moving the Server"
description: "The server backs up the farm every hour. Restore a backup, export the farm with a password, and move it to a new server machine with its nodes and workstations following."
"og:title": "Back Up, Restore and Move a RenderFlow Server"
"og:description": "Hourly farm backups, restoring one, exporting the farm with a password, and moving it to a new server while every machine follows."
"twitter:title": "Backup, Restore and Moving the Server"
keywords: ['render farm backup', 'restore render farm', 'move render farm server', 'migrate render farm server', 'render farm export', 'RenderFlow backup', 'replace render farm server']
---

The server backs up the farm's database every hour into the repository. From **Settings → Backup** you can restore one of those backups, export the whole farm into a password-protected file, and move the farm to a new server machine, after which every node and workstation follows it there.

## What you need

- A user with the **System Settings** permission, which you grant in **Settings → Groups**.
- A repository. Backups and exports are kept in its `backups` folder, and **Settings → Backup** is empty until the farm has one.

## Backups

A backup runs every hour, on the hour, and is saved as `backup-<date>_<time>.bak` in the repository's `backups` folder. The last 24 hourly backups are kept, together with the last 14 taken at midnight. A backup holds the farm's database: its jobs, users, pools and history.

To take one now, press **+** (**Create a backup**). Each row's **...** menu restores, shows or deletes that backup.

<Frame caption="Settings → Backup with the hourly backups and a farm export">
  <img src="/images/renderflow/v2/rf_settings_backup.webp" alt="The Backup settings page listing hourly backups named by date and time, and one farm export, each with its date and size" />
</Frame>

## Restore a backup

<Steps>
<Step title="Choose the backup">
Open the row's **...** menu and choose **Restore**. For a farm export, enter its password.
</Step>
<Step title="Press Restore">
The server stops running work, loads the backup and replaces the farm's jobs, users and settings with it. The machines the server knows stay, so no node or workstation has to join again.
</Step>
<Step title="Turn maintenance mode off">
Jobs that were running or queued come back suspended, and maintenance mode stays on so that nothing starts before you have looked. Check the farm, then turn maintenance mode off in **Settings → Server**.
</Step>
</Steps>

<Frame caption="Restoring a farm export">
  <img src="/images/renderflow/v2/rf_settings_backup_restore.webp" alt="The Restore dialog for farm-2026-10-19.rfx, explaining that the farm's jobs, users and settings are replaced, with a password field and a Restore button" />
</Frame>

<Warning>
A restore replaces the whole farm and cannot be undone. Create a backup first if the farm holds anything you may want back.
</Warning>

To restore a file from somewhere else, such as a backup copied off the repository, open the **More** menu and choose **Restore from file**. It takes a backup (`.bak`) or a farm export (`.rfx`).

<Frame caption="The More menu in Settings → Backup">
  <img src="/images/renderflow/v2/rf_settings_backup_more.webp" alt="The More menu open in the Backup settings page, with Restore from file, Export farm and Move machines" />
</Frame>

## Export the farm

An export holds everything a new server needs to take over the farm: the database, the farm's settings and its secrets, protected by a password you choose.

<Steps>
<Step title="Open the More menu and choose Export farm">
Enter a password of at least 8 characters twice and press **Export**.
</Step>
<Step title="Save the file">
Choose where to save the export, `farm-<date>.rfx`. You need the file and its password on the new server.
</Step>
</Steps>

<Frame caption="Exporting the farm">
  <img src="/images/renderflow/v2/rf_settings_backup_export.webp" alt="The Export farm dialog with two password fields and an Export button" />
</Frame>

## Move the farm to a new server

Moving the server takes the farm to another machine: its jobs, users and settings, and every node and workstation, which reconnect to the new server by themselves.

<Steps>
<Step title="Export the farm on the old server">
Follow [Export the farm](#export-the-farm).
</Step>
<Step title="Set up the new server">
[Install RenderFlow](/renderflow/v2/getting-started/installation) on the new machine as a **Server**, in the same version as the old one, with the same repository.
</Step>
<Step title="Restore the export on the new server">
In **Settings → Backup** on the new server, open the **More** menu, choose **Restore from file**, pick the export, enter its password and press **Restore**. The new server takes over the farm together with the old server's machines, so none of them has to join again.
</Step>
<Step title="Move the machines">
On the old server, open the **More** menu, choose **Move machines**, enter the new server's IP address or hostname and press **Move**. The old server turns maintenance mode on and sends every connected machine to the new server.
</Step>
<Step title="Turn maintenance mode off on the new server">
When the machines appear on the new server's **Machines** screen, turn maintenance mode off in **Settings → Server** there.
</Step>
</Steps>

<Frame caption="Sending the farm's machines to the new server">
  <img src="/images/renderflow/v2/rf_settings_backup_move.webp" alt="The Move machines dialog with the new server's hostname, render-server-02, and a Move button" />
</Frame>

A machine that is off during the move is sent on the next time it connects to the old server, so leave the old server running until every machine has arrived. **Settings → Backup** on the old server shows how many are still connected there. A machine that cannot reach the new server, or finds it on another version, stays on the old one. **Stop moving** stops sending machines on; the ones that already moved stay on the new server.

## From the command line

The same works on the server with `rfsv db`, while the RenderFlow service runs:

```bash
rfsv db list                                # backups and exports in the repository
rfsv db export farm-2026-10-19.rfx          # export the farm
rfsv db restore farm-2026-10-19.rfx         # restore a backup or an export
rfsv db handover render-server-02           # send every machine to the new server
```

`export` and `restore` ask for the password, or read it from `--password` or the `RENDERFLOW_EXPORT_PASSWORD` environment variable.

## Next steps

- [Your Own MongoDB](/renderflow/v2/guides/external-database): run the farm's database on a replica set your studio manages
- [Deploy RenderFlow Versions](/renderflow/v2/guides/deploy): move the whole farm to another version
