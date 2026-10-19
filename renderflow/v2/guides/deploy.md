---
title: "Deploy RenderFlow Versions"
description: "Keep RenderFlow versions on the server in Settings → Deploy, deploy one to the whole farm when nothing renders, and hand them to new machines."
"og:title": "Deploy a RenderFlow Version to the Render Farm"
"og:description": "Add RenderFlow versions to the server once, deploy one to every node and workstation when the farm is idle, and roll back the same way."
"twitter:title": "Deploy RenderFlow Versions"
keywords: ['update render farm', 'deploy render farm version', 'update render nodes', 'RenderFlow update', 'render farm rollback', 'update all render nodes at once']
---

**Settings → Deploy** keeps the RenderFlow versions your farm can run, one row for each version. Deploy a version and the server installs it, after which every node and workstation follows it to the same version. New machines installed [with one command](/renderflow/v2/getting-started/install-with-one-command) get the version the server runs from the same list. RenderFlow never downloads a version from the internet: it uses only the installers you add.

## What you need

- A user with the **Deploy** permission, which you grant in **Settings → Groups**.
- A repository. The installers are kept in its `updates` folder, where every machine reads them.
- The installers from the [Pulze account page](https://account.pulze.io/products/renderflow/downloads), one for each platform the farm runs on: the `.exe` or `.zip` for Windows and the `.tar.gz` for Linux and macOS.

## Find out about a new version

The server checks every hour whether a newer version has been released. When one is available, the main menu shows **Update available**; otherwise it shows **Check for updates...**. Choose it to see the version, its release date and its changelog, and press **Download** to open the download page. A server with an offline licence does not check.

## Add a version

In **Settings → Deploy**, press **+** (**Add version**), press **Pick installers** and select the installers of one version, one for each platform. Press **Add more installers** to pick from another folder, then press **Add** with the version number. RenderFlow copies them into the repository and lists the version on one row, with an icon for each platform it has an installer for. To add a platform later, add the version again with that installer. The farm keeps every version you add, and the one it runs is marked **Running**.

<Frame caption="Settings → Deploy with three versions, 2.0.17 without a macOS installer">
  <img src="/images/renderflow/v2/rf_settings_deploy.webp" alt="The Deploy settings page listing versions 2.0.19, 2.0.18 and 2.0.17, one row each with icons for the platforms it has an installer for and the date added, and 2.0.18 marked Running" />
</Frame>

<Frame caption="Adding a version with an installer for each platform">
  <img src="/images/renderflow/v2/rf_settings_deploy_add.webp" alt="The Add version dialog listing the Windows x64, Linux x64 and macOS arm64 installers of 2.0.20, with Add more installers below and the Add 2.0.20 button" />
</Frame>

## Deploy a version

<Steps>
<Step title="Wait until nothing renders">
A version can only be deployed while no machine is rendering, so that no work is cut short. While machines render, the menu shows how many.
</Step>
<Step title="Check that every platform is covered">
Each machine installs the installer for its own operating system, so a version can only be deployed when it has one for every operating system your farm's machines run. A version without, for example, a macOS installer on a farm with Macs shows **No macOS installer** in the menu. Add the version again with the missing installer first.
</Step>
<Step title="Choose Deploy">
Open the version's **...** menu and choose **Deploy**, then press **Deploy** to confirm.
</Step>
<Step title="Let the server install it">
The server turns maintenance mode on, installs the version and restarts on it. Maintenance mode then goes back to how it was before.
</Step>
<Step title="Let the machines follow">
Every node and workstation that connects to the server on another version installs the server's version, after it finishes what it is rendering.
</Step>
</Steps>

<Frame caption="Deploying a version">
  <img src="/images/renderflow/v2/rf_settings_deploy_confirm.webp" alt="The Deploy RenderFlow 2.0.19 confirmation, saying the server installs it now and restarts, and every machine follows it" />
</Frame>

To go back to an earlier version, deploy it the same way.

## Machines that install by themselves

A machine installs the server's version by itself when RenderFlow runs on it as a service with administrator rights, which is how the installer's `--service` flag registers a node. On Windows the version is installed by a scheduled task, and it does not start while 3ds Max, Cinema 4D, After Effects, Unreal Editor, Blender, Maya, Houdini, Premiere Pro, Resolve or VRED is open on that machine. On Linux and macOS the service restarts on the new version after the files are replaced.

Every installer is checked against the checksum recorded when it was added, and one that does not match is not installed.

## Machines that need installing by hand

A machine that does not run as a service, or not with administrator rights, cannot install by itself. Its desktop app shows **The farm moved to RenderFlow** with the server's version, and pressing **Install** saves the installer to the user's Downloads folder. On Windows the installer then opens; on Linux and macOS, run `sudo rfsv update` in a terminal.

`rfsv update` works on any machine of the farm while its service runs. It fetches the installer from the server and installs it when run as Administrator or with `sudo`, and otherwise prints where it saved the installer.

<Warning>
A machine on a different version from the server cannot render for the farm. Install the server's version on these machines soon after a deploy.
</Warning>

## Delete a version

Open the version's **...** menu and choose **Delete**. Its installers are removed from the repository. Machines that run it stay on it. Keep the installers of the version marked **Running** while you add new machines, since those are what [Install with One Command](/renderflow/v2/getting-started/install-with-one-command) hands out.

## Next steps

- [Install with One Command](/renderflow/v2/getting-started/install-with-one-command): add new machines on the server's version
- [Backup, Restore and Moving the Server](/renderflow/v2/guides/backup-and-restore): keep a copy of the farm before you deploy
