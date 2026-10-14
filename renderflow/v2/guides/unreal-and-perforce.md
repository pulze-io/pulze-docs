---
title: "Unreal and Perforce"
description: "Render Unreal Engine projects from Perforce: add the server and submit from Unreal."
"og:title": "Render Unreal Engine Projects from Perforce with RenderFlow"
"og:description": "Sync Unreal Engine projects from Perforce on every render node instead of copying them, with checked-out files shelved for the job."
"twitter:title": "Unreal and Perforce"
keywords: ['unreal perforce render farm', 'unreal engine perforce', 'perforce render farm', 'helix core render farm', 'movie render queue farm', 'unreal render farm sync', 'p4 render nodes', 'shelved files render']
---

When an Unreal project is in a Perforce workspace, each node that renders it syncs the project from Perforce instead of RenderFlow copying the whole project into the repository. A node keeps its workspace between jobs, so after the first job it only fetches the files that changed.

## What you need

- A Perforce server that every render node can reach, and a Perforce account for the nodes to log in with. The account only needs read access.
- The Perforce command-line client (`p4`) installed on every node that renders Unreal. RenderFlow does not install it.
- Unreal Engine with the RenderFlow plugin, on the artist's workstation and on the nodes. Installing RenderFlow adds the plugin to every Unreal Engine it finds.
- The project connected to Perforce in Unreal's **Revision Control**, and a Movie Render Queue with at least one job in it: a saved level, a saved sequence and a saved configuration.
- `p4` on the artist's workstation as well, if checked-out files should go with the job.

## 1. Add the Perforce server

<Steps>
<Step title="Open Settings → Perforce">
Press **New Perforce server**.
</Step>
<Step title="Fill in the server">
Enter a **Name** for the list, the **Address** the artists use in Unreal (the `P4PORT`, for example `perforce.studio.local:1666`), and the **User** and **Password** of the account the nodes log in with.

<Frame caption="A new Perforce server, with the account the nodes log in with">
  <img src="/images/renderflow/v2/rf_settings_perforce_new.webp" alt="The New Perforce Server dialog with Name, Address, User and Password fields and the Test and Add buttons" />
</Frame>
</Step>
<Step title="Test it">
Press **Test**. The dialog says whether the server answered and the login worked. Press **Add** to save the server.

<Frame caption="Settings → Perforce with one server added">
  <img src="/images/renderflow/v2/rf_settings_perforce.webp" alt="The Perforce settings page listing a server named Studio depot at perforce.studio.local:1666, with the user renderfarm" />
</Frame>
</Step>
</Steps>


The password is stored encrypted on the server and is not shown again. To change it, open the server's menu in the list, press **Edit** and enter the new one.

## 2. Submit from Unreal

<Steps>
<Step title="Open the Movie Render Queue">
In Unreal, open **Window → Cinematics → Movie Render Queue** and check that the jobs you want to render are in it. Save the queue asset.
</Step>
<Step title="Press Submit to RenderFlow">
Open the **Tools** menu and press **Submit to RenderFlow**. If the project has unsaved changes, Unreal asks to save them first, since the nodes load the level, the sequence and the queue from disk.
</Step>
<Step title="Check the project source">
The RenderFlow submitter opens with the job. Under the project, **Project source** reads **Sync from Perforce**, with the **Server** from Settings → Perforce and the artist's **Workspace**. **Copy to repository** and **Render in place** are there too, for a job that should not sync.

If the `.uproject` file was added to Perforce but never submitted, the nodes cannot sync it. The submitter then keeps **Copy to repository** and says *The project file isn't submitted to Perforce, so the project is copied.* Submit the project file to Perforce to render it with a sync.

<Frame caption="The submitter opened from Unreal, with the project synced from Perforce">
  <img src="/images/renderflow/v2/rf_submitter_unreal_perforce.webp" alt="The RenderFlow submitter with an Unreal step: Project source set to Sync from Perforce, the Studio depot server, the artist's workspace, a note that the checked-out files are shelved in changelist 48211, the render item and the frame range" />
</Frame>
</Step>
<Step title="Press Submit">
Press **Submit**. Every node that takes a task syncs the project first, then renders.
</Step>
</Steps>

The nodes render the files the artist's workspace has, at the revisions the artist synced. If the artist syncs again while the job is rendering, tasks that start afterwards render the newer files.

**Checked-out files.** Files that are checked out or added in the artist's workspace are not in the depot yet. When you submit, the plugin shelves them in a changelist of its own, so the nodes render them too, and the submitter says *Your checked-out files go with the job, shelved in changelist 1234.* The files stay checked out in your workspace and are not changed. The plugin deletes its own shelves once their job has completed or been deleted, at the next submit.

If `p4` is not installed on the workstation, or shelving fails, Unreal asks whether to submit anyway. A job submitted that way renders the workspace without the checked-out files, and the submitter shows how many files it leaves out.

**The output folder.** Each render item writes to the output directory of its config, `Saved/MovieRenders` inside the artist's project by default. A node renders into a folder of its own and copies the frames there as each task ends. A workspace on the artist's own disk is not reachable from the nodes, so set the config's output directory to a shared folder before you submit. If the copy fails, the job's log says so and names the folder on the node where the frames stayed.

<Note>
The submitter matches the address Unreal reports against the servers in **Settings → Perforce**. If it finds none, it says so above the project source. Add the server under that address, or pick the server it is reached by from **Server**.
</Note>

## 3. Follow the sync

Each task shows **Syncing from Perforce** with a percentage while its node syncs. In the job's log, the sync comes first, before Unreal's own lines:

```
Perforce: connecting to perforce.studio.local:1666 as renderfarm
Perforce: workspace rf-node-07-8d090b98db17 at C:\ProgramData\RenderFlow\cache\8d090b98db17\project
Perforce: syncing //project/main/Hero/...@anna-hero, 1204 file(s), 18.6 GB to transfer
Perforce: rf-node-07-8d090b98db17 now has //project/main/Hero/...@anna-hero
```

The log lists the first 1,000 files a sync transfers and counts the rest.

**Workspaces on the nodes.** A node keeps each project it renders in a folder of its own under `cache` in the RenderFlow data folder (`C:\ProgramData\RenderFlow\cache` on Windows). The project's files are in its `project` folder, whether they came from a Perforce sync or a copy, beside Unreal's own caches for that project. A node keeps the three projects it used most recently and removes older ones, but never a project a running job is using. Before transferring, it checks that the disk has room for the sync and 1 GB more.

## When a sync fails

The task fails with one of these errors, and the job's error list says what to do:

| Error | What to do |
|---|---|
| **Perforce client not installed** | Install `p4` on the node, or exclude the node from the job |
| **Perforce server not configured** | Add the server under **Settings → Perforce**, then restart the job |
| **Perforce login failed** | Check the **User** and **Password** under **Settings → Perforce** |
| **Perforce sync failed** | Check that the node can reach the server, and that the artist's workspace still exists |
| **Not enough disk space for the Perforce sync** | Free space on the node, or exclude it from the job |
| **Scene not in Perforce** | Submit the scene to Perforce, or set **Project source** to **Copy to repository** |
