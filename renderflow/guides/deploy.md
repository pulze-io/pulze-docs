---
title: "Deploy RenderFlow Versions"
description: "Keep RenderFlow versions on the server in Settings → Deploy and update the whole farm to one of them."
"og:title": "Deploy a RenderFlow Version to the Render Farm"
"og:description": "Add RenderFlow versions to the server once, deploy one to every node and workstation when the farm is idle, and roll back the same way."
"twitter:title": "Deploy RenderFlow Versions"
keywords: ['update render farm', 'deploy render farm version', 'update render nodes', 'RenderFlow update', 'render farm rollback', 'update all render nodes at once']
---

**Settings → Deploy** keeps the RenderFlow versions your farm can run. Deploy one and the server installs it, then every node and workstation follows. RenderFlow only uses the installers you add; it never downloads a version by itself.

You need the **Deploy** permission and a repository: the installers are kept in its `updates` folder.

## Add a version

Download the installers from the [Pulze account page](https://account.pulze.io/products/renderflow/downloads), one for each platform your farm runs. In **Settings → Deploy**, press **+**, pick the installers and press **Add**. The version appears on one row with an icon for each platform, and the one the farm runs is marked **Running**.

<Frame caption="Settings → Deploy with three versions">
  <img src="/images/renderflow/v2/rf_settings_deploy.webp" alt="The Deploy settings page listing versions 2.0.19, 2.0.18 and 2.0.17, one row each with icons for the platforms it has an installer for and the date added, and 2.0.18 marked Running" />
</Frame>

## Deploy it

Open the version's **...** menu, choose **Deploy** and confirm. The server installs the version and restarts on it, and each machine installs it after finishing what it is rendering.

<Frame caption="Deploying a version">
  <img src="/images/renderflow/v2/rf_settings_deploy_confirm.webp" alt="The Deploy RenderFlow 2.0.19 confirmation, saying the server installs it now and restarts, and every machine follows it" />
</Frame>

- A version can only be deployed while no machine is rendering.
- It needs an installer for every operating system your machines run.
- To go back, deploy the earlier version the same way.

## Machines that don't update by themselves

A machine updates by itself when RenderFlow runs on it as a service with administrator rights. On Windows the update waits while a 3D application is open. Any other machine shows **The farm moved to RenderFlow** with an **Install** button; on Linux and macOS, `sudo rfsv update` installs it from the server.

<Warning>
A machine on a different version from the server can't render for the farm.
</Warning>

## Next steps

- [Backup, Restore and Moving the Server](/renderflow/guides/backup-and-restore): keep a copy of the farm before you deploy
- [Other ways to install](/renderflow/getting-started/installation#other-ways-to-install): add new machines in the server's version
