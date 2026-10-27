---
title: "Backup, Restore and Moving the Server"
description: "The server backs up the farm every hour. Restore a backup, export the farm with a password, or move it to a new server."
"og:title": "Back Up, Restore and Move a RenderFlow Server"
"og:description": "Hourly farm backups, restoring one, exporting the farm with a password, and moving it to a new server while every machine follows."
"twitter:title": "Backup, Restore and Moving the Server"
keywords: ['render farm backup', 'restore render farm', 'move render farm server', 'migrate render farm server', 'render farm export', 'RenderFlow backup', 'replace render farm server']
---

The server backs up the farm's database every hour into the repository's `backups` folder, keeping the last 24 hourly and 14 daily backups. Everything below is in **Settings → Backup** and needs the **System Settings** permission.

<Frame caption="Settings → Backup">
  <img src="/images/renderflow/v2/rf_settings_backup.webp" alt="The Backup settings page listing hourly backups named by date and time, and one farm export, each with its date and size" />
</Frame>

## Restore a backup

Open the backup's **...** menu, choose **Restore** and confirm. The farm's jobs, users and settings are replaced with the backup's; the machines stay, so none has to join again. Running jobs come back suspended and maintenance mode stays on until you turn it off in **Settings → Server**.

<Warning>
A restore replaces the whole farm and can't be undone. Create a backup first with **+**.
</Warning>

To restore a file from elsewhere, a backup (`.bak`) or a farm export (`.rfx`), use **More → Restore from file**.

## Export the farm

**More → Export farm** saves the database, settings and secrets into one `.rfx` file, protected by a password of at least 8 characters. A new server needs the file and the password.

<Frame caption="Exporting the farm">
  <img src="/images/renderflow/v2/rf_settings_backup_export.webp" alt="The Export farm dialog with two password fields and an Export button" />
</Frame>

## Move to a new server

1. Export the farm on the old server.
2. Install RenderFlow on the new machine as a **Server**, in the same version and with the same repository.
3. On the new server, restore the export with **More → Restore from file**.
4. On the old server, choose **More → Move machines** and enter the new server's address.
5. When the machines appear on the new server, turn maintenance mode off there.

<Frame caption="Sending the machines to the new server">
  <img src="/images/renderflow/v2/rf_settings_backup_move.webp" alt="The Move machines dialog with the new server's hostname, render-server-02, and a Move button" />
</Frame>

Leave the old server running until every machine has moved: a machine that is off moves the next time it connects.

## From the command line

```bash
rfsv db list
rfsv db export farm.rfx
rfsv db restore farm.rfx
rfsv db handover render-server-02
```
