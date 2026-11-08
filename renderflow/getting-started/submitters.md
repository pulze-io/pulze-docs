---
title: "Submitters"
description: "Where to find Submit to RenderFlow inside each application, and how to install the submitter with rfsv or by hand when it is missing."
"og:title": "RenderFlow Submitters for 3ds Max, Blender, Maya, Premiere Pro, DaVinci Resolve and more"
"og:description": "The menu that holds Submit to RenderFlow in every supported application, and how to install each submitter with rfsv or by hand on Windows, Linux and macOS."
"twitter:title": "RenderFlow Application Submitters"
keywords: ['RenderFlow submitter', 'Submit to RenderFlow', 'render farm plugin install', 'Premiere Pro render farm', 'DaVinci Resolve render farm', '3ds Max render farm plugin', 'Blender render farm add-on', 'RenderFlow plugin missing', 'rfsv plugin-install', 'enable RenderFlow Blender add-on']
---

Every supported application gets a **Submit to RenderFlow** command, which sends the open scene or project to RenderFlow with its own settings. RenderFlow installs these submitters by itself on every machine where it finds the application, except for Premiere Pro, which each artist installs once.

RenderFlow installs or updates the submitters when RenderFlow is installed or updated, every time the RenderFlow service starts, and when you press **Refresh** for a machine on the **Machines** screen. Restart the application afterwards, because it reads its plugins only at startup.

If **Submit to RenderFlow** is still missing, something stopped RenderFlow from installing it: usually missing permissions on the application's plugin folder, or a studio setup that keeps plugins in a custom location. Go to your application below. Each section shows where the submitter is, how to install it with `rfsv`, and how to install it by hand.

Harmony, Vantage and Media Encoder have no submitter. Submit them from the RenderFlow app.

## Before you install

**Close the application first.** It reads its plugins only at startup, and some lock their plugin files while open.

**Installing with rfsv.** `rfsv` is RenderFlow's command-line tool, in the RenderFlow installation folder. `rfsv plugin-install` followed by an application's name installs or updates that application's submitter, exactly as RenderFlow does at startup. Run it as administrator on Windows, or with `sudo` on Linux and macOS:

<CodeGroup>
```bat Command Prompt
cd "C:\Program Files\Pulze\RenderFlow"
rfsv plugin-install blender
```

```powershell PowerShell
cd "C:\Program Files\Pulze\RenderFlow"
.\rfsv plugin-install blender
```

```bash Linux
sudo /opt/Pulze/RenderFlow/rfsv plugin-install blender
```

```bash macOS
sudo /Applications/Pulze/RenderFlow/rfsv plugin-install blender
```
</CodeGroup>

Name several applications to install several, or none to install every submitter the machine has an application for. `rfsv plugin-clean` takes the same names and removes the submitters, all of them when you name none.

**Installing by hand.** The submitters ship inside the RenderFlow installation, in its `plugins` folder. Most destinations are system folders, so copy with administrator or root rights.

| Platform | Folder |
|---|---|
| Windows | `C:\Program Files\Pulze\RenderFlow\plugins` |
| Linux | `/opt/Pulze/RenderFlow/plugins` |
| macOS | `/Applications/Pulze/RenderFlow/plugins` |

## 3ds Max

<Frame caption="3ds Max: X in a viewport, then RenderFlow">
  <img src="/images/renderflow/v2/rf_submitter_menu_3dsmax.webp" alt="3ds Max with the action search open over the viewport, Render typed and the RenderFlow action from the Pulze category highlighted at the top of the results" />
</Frame>

**Where to find it.** The submitter adds an action, not a menu item. Press **X** in a viewport, type **RenderFlow**, and pick **RenderFlow** from the **Pulze** category. To keep it on screen, add the action to a toolbar, menu or quad menu in **Customize → Customize User Interface**.

**Install with rfsv.** `rfsv plugin-install 3dsmax`

**Install by hand.** Unpack `plugins/max/RenderFlowMax<year>.zip` for each 3ds Max version into `C:\ProgramData\Autodesk\ApplicationPlugins\RenderFlowMax<year>`. 3ds Max 2019 to 2027 on Windows are supported.

## After Effects

<Frame caption="After Effects: File → Scripts → Submit to RenderFlow.jsx">
  <img src="/images/renderflow/v2/rf_submitter_menu_after_effects.webp" alt="After Effects with the File menu and its Scripts submenu open, Submit to RenderFlow.jsx highlighted" />
</Frame>

**Where to find it.** **File → Scripts → Submit to RenderFlow.jsx**

**Install with rfsv.** `rfsv plugin-install after`

**Install by hand.** Copy `plugins/after/Submit to RenderFlow.jsx` into the `Scripts` folder of each After Effects version:

<Tabs>
<Tab title="Windows">

```text
C:\Program Files\Adobe\Adobe After Effects <year>\Support Files\Scripts
```

</Tab>
<Tab title="macOS">

```text
/Applications/Adobe After Effects <year>/Scripts
```

</Tab>
</Tabs>

## Autograph

<Frame caption="Autograph: RenderFlow → Submit to RenderFlow">
  <img src="/images/renderflow/v2/rf_submitter_menu_autograph.webp" alt="Autograph with the RenderFlow menu open and Submit to RenderFlow under the cursor" />
</Frame>

**Where to find it.** **RenderFlow → Submit to RenderFlow**

**Install with rfsv.** `rfsv plugin-install autograph`. It reaches only accounts that have started Autograph at least once.

**Install by hand.** Copy the `plugins/autograph/RenderFlow` folder into the Autograph Python folder of each artist's account:

<Tabs>
<Tab title="Windows">

```text
C:\Users\<user>\Documents\Maxon\Autograph\Python\RenderFlow
```

</Tab>
<Tab title="macOS">

```text
~/Maxon/Autograph/Python/RenderFlow
```

</Tab>
</Tabs>

## Blender

<Frame caption="Blender: Render → Submit to RenderFlow">
  <img src="/images/renderflow/v2/rf_submitter_menu_blender.webp" alt="Blender with the Render menu open and Submit to RenderFlow highlighted" />
</Frame>

**Where to find it.** **Render → Submit to RenderFlow**

**Turn it on.** RenderFlow installs the add-on but Blender does not enable it. Open **Edit → Preferences → Add-ons**, search for **RenderFlow for Blender** and tick it. Do this once per Blender version.

**Install with rfsv.** `rfsv plugin-install blender`. It installs for the user who runs it.

**Install by hand.** Install `plugins/blender/renderflow_blender.zip` from **Edit → Preferences → Add-ons → Install from Disk**, or unpack it into the add-ons folder of the Blender version:

<Tabs>
<Tab title="Windows">

```text
%APPDATA%\Blender Foundation\Blender\<version>\scripts\addons
```

</Tab>
<Tab title="Linux">

```text
~/.config/blender/<version>/scripts/addons
```

</Tab>
<Tab title="macOS">

```text
~/Library/Application Support/Blender/<version>/scripts/addons
```

</Tab>
</Tabs>

## Cinema 4D

<Frame caption="Cinema 4D: Extensions → Submit to RenderFlow">
  <img src="/images/renderflow/v2/rf_submitter_menu_cinema4d.webp" alt="Cinema 4D with the Extensions menu open and Submit to RenderFlow highlighted at the bottom" />
</Frame>

**Where to find it.** **Extensions → Submit to RenderFlow**

**Install with rfsv.** `rfsv plugin-install cinema4d`

**Install by hand.** Unpack `plugins/cinema/RenderFlowCinema.zip` into the `plugins` folder inside the Cinema 4D installation, for example `C:\Program Files\Maxon Cinema 4D 2026\plugins`.

## ComfyUI

<Frame caption="ComfyUI: the C menu, Workflow → Submit to RenderFlow">
  <img src="/images/renderflow/v2/rf_submitter_menu_comfyui.webp" alt="ComfyUI with the C menu open, Workflow expanded and Submit to RenderFlow under the cursor" />
</Frame>

**Where to find it.** The **C** menu at the top left, then **Workflow → Submit to RenderFlow**.

**Install with rfsv.** `rfsv plugin-install comfyui`

**Install by hand.** Unpack `plugins/comfy/renderflow_comfy.zip` into the `custom_nodes` folder of the ComfyUI installation, as `custom_nodes/renderflow_comfy`, and restart ComfyUI.

## DaVinci Resolve

<Frame caption="DaVinci Resolve: Workspace → Scripts → Submit to RenderFlow">
  <img src="/images/renderflow/v2/rf_submitter_menu_davinci.webp" alt="DaVinci Resolve with the Workspace menu and its Scripts submenu open, Submit to RenderFlow under the cursor" />
</Frame>

**Where to find it.** **Workspace → Scripts → Submit to RenderFlow**. Submitting needs DaVinci Resolve Studio, because the free edition does not run scripts that talk to other programs.

**Install with rfsv.** `rfsv plugin-install davinci`

**Install by hand.** Copy `plugins/davinci/submit.py` into the folder below and rename it to `Submit to RenderFlow.py`. The file name is the name shown in the menu.

<Tabs>
<Tab title="Windows">

```text
C:\ProgramData\Blackmagic Design\DaVinci Resolve\Fusion\Scripts\Utility
```

</Tab>
<Tab title="Linux">

```text
/opt/resolve/Fusion/Scripts/Utility
```

</Tab>
<Tab title="macOS">

```text
/Library/Application Support/Blackmagic Design/DaVinci Resolve/Fusion/Scripts/Utility
```

</Tab>
</Tabs>

## Fusion

<Frame caption="Fusion: Script → Submit to RenderFlow">
  <img src="/images/renderflow/v2/rf_submitter_menu_fusion.webp" alt="Fusion Studio with the Script menu open and Submit to RenderFlow under the cursor" />
</Frame>

**Where to find it.** **Script → Submit to RenderFlow**. Fusion Studio is required.

**Install with rfsv.** `rfsv plugin-install fusion`

**Install by hand.** Copy `plugins/fusion/Submit to RenderFlow.py` into the folder below.

<Tabs>
<Tab title="Windows">

```text
C:\ProgramData\Blackmagic Design\Fusion\Scripts\Comp
```

</Tab>
<Tab title="Linux">

```text
/var/BlackmagicDesign/Fusion/Scripts/Comp
```

</Tab>
<Tab title="macOS">

```text
/Library/Application Support/Blackmagic Design/Fusion/Scripts/Comp
```

</Tab>
</Tabs>

## Houdini

<Frame caption="Houdini: Render → Submit to RenderFlow">
  <img src="/images/renderflow/v2/rf_submitter_menu_houdini.webp" alt="Houdini with the Render menu open and Submit to RenderFlow highlighted" />
</Frame>

**Where to find it.** **Render → Submit to RenderFlow**

**Install with rfsv.** `rfsv plugin-install houdini`

**Install by hand.** Unpack `plugins/houdini/renderflow_houdini.zip` into the `packages` folder of each Houdini installation, for example `C:\Program Files\Side Effects Software\Houdini 21.0.440\packages`.

## KeyShot

**Where to find it.** **Window → Scripting Console → Scripts → Submit to RenderFlow**

**Install with rfsv.** `rfsv plugin-install keyshot`

**Install by hand.** Copy `plugins/keyshot/Submit to RenderFlow.py` into the `Scripts` folder of the KeyShot resource folder, which is `Documents\KeyShot <version>\Scripts` on Windows and `~/Library/Application Support/KeyShot<version>/Scripts` on macOS unless you moved it in KeyShot's preferences.

## Maya

<Frame caption="Maya: Pulze → Submit to RenderFlow">
  <img src="/images/renderflow/v2/rf_submitter_menu_maya.webp" alt="Maya with the Pulze menu open and Submit to RenderFlow highlighted" />
</Frame>

**Where to find it.** **Pulze → Submit to RenderFlow**

**Turn it on.** The plugin loads by itself. If the **Pulze** menu is missing, open **Windows → Settings/Preferences → Plug-in Manager**, find **RenderFlowMaya.py** and tick **Loaded** and **Auto load**.

**Install with rfsv.** `rfsv plugin-install maya`

**Install by hand.** Unpack `plugins/maya/RenderFlowMaya<year>.zip` for each Maya version into:

<Tabs>
<Tab title="Windows">

```text
C:\ProgramData\Autodesk\ApplicationPlugins\RenderFlowMaya<year>
```

</Tab>
<Tab title="Linux">

```text
/usr/autodesk/ApplicationPlugins/RenderFlowMaya<year>
```

</Tab>
<Tab title="macOS">

```text
/Users/Shared/Autodesk/ApplicationAddins/RenderFlowMaya<year>
```

</Tab>
</Tabs>

## Nuke

<Frame caption="Nuke: Render → Submit to RenderFlow">
  <img src="/images/renderflow/v2/rf_submitter_menu_nuke.webp" alt="Nuke with the Render menu open and Submit to RenderFlow highlighted" />
</Frame>

**Where to find it.** **Render → Submit to RenderFlow**

**Install with rfsv.** `rfsv plugin-install nuke`

**Install by hand.** Unpack `plugins/nuke/renderflow_nuke.zip` somewhere temporary. It holds a `renderflow_nuke` folder with a second `renderflow_nuke` folder and a `menu.py` inside. Copy both into the `plugins` folder of the Nuke version:

<Tabs>
<Tab title="Windows">

```text
C:\Program Files\Common Files\Nuke\<version>\plugins
```

</Tab>
<Tab title="Linux">

```text
/usr/local/Nuke/<version>/plugins
```

</Tab>
<Tab title="macOS">

```text
/Library/Application Support/Nuke/<version>/plugins
```

</Tab>
</Tabs>

If that folder already has a `menu.py`, add the lines from the zip's `menu.py` to the end of it instead of replacing it.

## Premiere Pro

<Frame caption="Premiere Pro: Window → UXP Plugins → RenderFlow">
  <img src="/images/renderflow/v2/rf_submitter_menu_premiere.webp" alt="Premiere Pro with the Window menu and its UXP Plugins submenu open, RenderFlow under the cursor" />
</Frame>

**Where to find it.** **Window → UXP Plugins → RenderFlow**

**Install with rfsv.** Not available. Neither RenderFlow nor `rfsv` installs the Premiere Pro submitter.

**Install by hand.** Every artist who submits from Premiere Pro installs it once, on their own account:

<Steps>
<Step title="Close Premiere Pro">
</Step>
<Step title="Open the installer">
Double-click `renderflow-premiere.ccx` in `C:\Program Files\Pulze\RenderFlow\plugins\premiere` on Windows, or `/Applications/Pulze/RenderFlow/plugins/premiere` on macOS. Creative Cloud installs the plugin.
</Step>
<Step title="Submit">
Open your project in Premiere Pro and choose **Window → UXP Plugins → RenderFlow**.
</Step>
</Steps>

Premiere Pro 25.3 or newer is required. Install the new `.ccx` again after updating RenderFlow.

## Rhino

<Frame caption="Rhino: Render → Submit to RenderFlow">
  <img src="/images/renderflow/v2/rf_submitter_menu_rhino.webp" alt="Rhino with the Render menu open and Submit to RenderFlow highlighted" />
</Frame>

**Where to find it.** **Render → Submit to RenderFlow**. Requires V-Ray for Rhino.

**Install with rfsv.** `rfsv plugin-install rhino`. It registers the plugin for Rhino 7 and 8.

**Install by hand.** Open Rhino, choose **Tools → Options → Plug-ins → Install**, and pick `RenderFlowRhino.rhp` in `C:\Program Files\Pulze\RenderFlow\plugins\rhino`.

## SketchUp

<Frame caption="SketchUp: Extensions → Submit to RenderFlow">
  <img src="/images/renderflow/v2/rf_submitter_menu_sketchup.webp" alt="SketchUp with the Extensions menu open and Submit to RenderFlow highlighted" />
</Frame>

**Where to find it.** **Extensions → Submit to RenderFlow**. Requires V-Ray for SketchUp.

**Install with rfsv.** `rfsv plugin-install sketchup`

**Install by hand.** Copy `plugins/sketchup/renderflow_sketchup.rb` and the `renderflow_sketchup` folder next to it into the SketchUp `Plugins` folder: `C:\ProgramData\SketchUp\SketchUp <year>\SketchUp\Plugins` on Windows, `/Library/Application Support/SketchUp <year>/SketchUp/Plugins` on macOS. On macOS, quit SketchUp completely before it picks up the plugin.

## Unreal Engine

<Frame caption="Unreal Engine: Tools → Submit to RenderFlow">
  <img src="/images/renderflow/v2/rf_submitter_menu_unreal.webp" alt="Unreal Editor with the Tools menu open and Submit to RenderFlow highlighted" />
</Frame>

**Where to find it.** **Tools → Submit to RenderFlow**

**Install with rfsv.** `rfsv plugin-install unreal`

**Install by hand.** Unpack `plugins/unreal/RenderFlow.zip` into the engine as `Engine/Plugins/Marketplace/RenderFlow`, for example `C:\Program Files\Epic Games\UE_5.6\Engine\Plugins\Marketplace\RenderFlow`. The plugin turns on Python Editor Script Plugin, Movie Render Queue and Sequencer Scripting, which it needs.

## VRED Pro

<Frame caption="VRED Pro: Scripts → Submit to RenderFlow…">
  <img src="/images/renderflow/v2/rf_submitter_menu_vred.webp" alt="VRED Pro with the Scripts menu open and Submit to RenderFlow… highlighted at the bottom" />
</Frame>

**Where to find it.** **Scripts → Submit to RenderFlow…**. VRED Core has no submitter.

**Install with rfsv.** `rfsv plugin-install vred`

**Install by hand.** Copy the `plugins/vred/RenderFlow` folder into `C:\ProgramData\Autodesk\VRED\ScriptPlugins`.
