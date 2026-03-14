# FILE: scene-manager/index.mdx
---
title: "Home"
description: "Organize, manage, and streamline your scenes with Scene Manager."
---

## Overview

Scene Manager is Pulze's tool for organizing and managing complex scenes in 3ds Max. It helps you keep your projects structured and your workflow efficient by grouping all possible settings into modular, customizable panels.

<CardGroup cols={2}>
  <Card title="Getting Started" icon="rocket" href="/scene-manager/getting-started" horizontal>
    Prerequisites, supported software, and installation.
  </Card>
  <Card title="Modules" icon="puzzle-piece" href="/scene-manager/modules" horizontal>
    All modules — cameras, lighting, rendering, output, and more.
  </Card>
  <Card title="Bake Setups" icon="box-archive" href="/scene-manager/bake-setups" horizontal>
    Convert setups to native scene states and batch render.
  </Card>
  <Card title="RenderFlow" icon="network-wired" href="/scene-manager/renderflow" horizontal>
    Submit render jobs directly to RenderFlow.
  </Card>
  <Card title="Settings" icon="gear" href="/scene-manager/settings" horizontal>
    Configure notifications, theme, viewport, and more.
  </Card>
</CardGroup>

# FILE: scene-manager/getting-started.mdx
---
title: "Getting Started"
description: "Prerequisites, supported software, and installation guide for Scene Manager."
---

## Prerequisites

- Scene Manager requires a constant internet connection.

## Supported software

- **3ds Max** 2019 – 2026
- **V-Ray 7**, **Corona**, **FStorm**, **Arnold**, **Redshift**

<Note>
All other 3rd party and built-in render engines for 3ds Max will also work with limited functionality.
</Note>

## Installation

Please close all running 3ds Max instances. Run the downloaded exe and follow the installer's instructions.

<Frame caption="Scene Manager installer">
  <img src="/images/scene-manager/sm_installer.png" alt="Scene Manager installer" />
</Frame>

After the installation is done, start 3ds Max and go to **Customize > Customize User Interface > Toolbars** and choose the Category **Pulze** to create a toolbar button.

<Frame caption="Creating a toolbar button in 3ds Max">
  <img src="/images/scene-manager/sm_max_toolbar.png" alt="3ds Max toolbar setup" />
</Frame>

The installer also supports silent installation by using the `--silent` parameter. This option will install Scene Manager for all versions of 3ds Max that are available on the computer.

# FILE: scene-manager/settings.mdx
---
title: "Settings"
description: "Configure Scene Manager preferences — notifications, theme, viewport behavior, and more."
---

<Frame caption="Scene Manager settings">
  <img src="/images/scene-manager/sm_settings.png" alt="Scene Manager settings" />
</Frame>

## Notifications

If enabled, a message box will appear during file load if the scene contains Scene Manager settings.

## Theme

Choose between the Light and the Dark theme.

## Viewport

You can choose between 3 different viewport switch options. These viewport settings will only affect the viewport background; the rest of the modules (Sun, Dome, Environment, etc.) will be applied regardless.

- **Active Viewport** – By default Scene Manager will switch the currently active viewport
- **Only Active Perspective, Camera, Orthographic** – Will just switch these types of viewports
- **View to Render** – Will switch to the locked viewport that is set in the Render Setup Dialog and then back to the previous viewport where you are working in

Redraw viewport after switching setup will refresh the viewport to ensure that everything is up to date.

## Interactive

In case of Corona Interactive, if this option is enabled the Interactive Rendering will stop and restart automatically to ensure stability.

## Columns

Show/Hide columns for the Setup List module.

# FILE: scene-manager/modules/index.mdx
---
title: "Overview"
description: "All Scene Manager modules — cameras, lighting, rendering, scripting, and more."
---

All possible settings are categorized and grouped into modules. You can show/hide and drag around these modules to create the most ideal UI that you need for your current project.

<Frame caption="Scene Manager modules overview">
  <img src="/images/scene-manager/sm_modules.png" alt="Scene Manager modules" />
</Frame>

# FILE: scene-manager/modules/setup-list.mdx
---
title: "Setup List"
description: "Create and manage scene setups."
---

To create an empty state just press the "+" button at the top right corner. Once you click on a state it becomes activated.

<Frame caption="Setup List module">
  <img src="/images/scene-manager/sm_setup_list.png" alt="Setup List" />
</Frame>

Scene Manager will store all its settings in the current max file. Whenever you modify or create a setup it will be stored in the scene. This way if you open the max file on another workstation all the setups will be accessible through the Scene Manager.

# FILE: scene-manager/modules/camera.mdx
---
title: "Camera"
description: "Select and manage cameras per setup."
---

To add cameras to your selected setup, just open up the dropdown where you will see all the cameras from your scene. The selected one will become the viewport's active camera. You can also select or lock/unlock your cameras.

<Frame caption="Camera module">
  <img src="/images/scene-manager/sm_camera.png" alt="Camera module" />
</Frame>

When you delete or rename a camera or any other object that is used in one of the setups, Scene Manager will track these changes and will make the modification on all setups where needed. If Scene Manager is not running but you have some states stored in your file, it will recognize the changes and update itself at the next startup.

# FILE: scene-manager/modules/resolution.mdx
---
title: "Resolution"
description: "Assign different resolutions and aspect ratios per setup."
---

It's possible to assign different resolutions and aspect ratios to your setups. With the handy aspect ratio slider you can frame your images in an easy and intuitive way. There are also some handy quick buttons which will double or half your width and height values.

<Frame caption="Resolution module">
  <img src="/images/scene-manager/sm_resolution.png" alt="Resolution module" />
</Frame>

# FILE: scene-manager/modules/time-output.mdx
---
title: "Time Output"
description: "Control timeline range and time output settings per setup."
---

The Time Output module is responsible for the current slider time and timeline range as well as the Render Settings > Time Output properties. You can define a Single, Range and a List of frames which are both helpful in case of stills and animations.

<Frame caption="Time Output module">
  <img src="/images/scene-manager/sm_time_output.png" alt="Time Output module" />
</Frame>

If your active camera is animated you can fetch the first and last key which will define the start and the end value of the range as well as the timeline.

# FILE: scene-manager/modules/scene-name.mdx
---
title: "Scene Name"
description: "Add descriptive names for your scene setups."
---

After a certain complexity PhysCamera001, PhysCamera002 doesn't mean a lot — with the Scene Name module you can add a more defined name for your scene setup.

<Frame caption="Scene Name module">
  <img src="/images/scene-manager/sm_scene_name.png" alt="Scene Name module" />
</Frame>

# FILE: scene-manager/modules/sun.mdx
---
title: "Sun"
description: "Control sun lights and linked sky materials per setup."
---

If you select a Sun from the dropdown it will be turned on automatically and the rest of the main light sources in the scene will be turned off. In most cases you will also want to have a sky in the environment linked to the sun. To do this you only need to press the cloud button and it will create a sky material according to the type of the sun (VRay or Corona), link them together if needed and add it to the environment slot.

<Frame caption="Sun module">
  <img src="/images/scene-manager/sm_sun.png" alt="Sun module" />
</Frame>

# FILE: scene-manager/modules/dome.mdx
---
title: "Dome"
description: "Manage dome lights and HDRIs per setup."
---

There are a couple of ways that you can think about using Domes and HDRIs with the Scene Manager. You can create a Dome for each setup, or you can reuse one Dome across multiple setups. It is up to you which workflow suits you more. By opening the dropdown you can select a Dome light from your scene. You can select it, show the chosen HDRI in your preferred Material Editor, or you have the option to fetch the HDRI if the dome already has one.

<Frame caption="Dome module">
  <img src="/images/scene-manager/sm_dome.png" alt="Dome module" />
</Frame>

# FILE: scene-manager/modules/hdri-browser.mdx
---
title: "HDRI Browser"
description: "Browse and test HDRI lighting conditions quickly."
---

The HDRI Browser will let you access your favorite folders and quickly test out various lighting conditions.

<Frame caption="HDRI Browser module">
  <img src="/images/scene-manager/sm_hdri_browser.png" alt="HDRI Browser module" />
</Frame>

# FILE: scene-manager/modules/environment.mdx
---
title: "Environment"
description: "Control 3ds Max environment settings per setup."
---

The Environment card will control 3ds Max Environment Settings. By default it is set to None. If you have a valid Sun object you can choose to have a Sky map, if you have an HDRI loaded you can load it into the environment from here, or if you need more specific control you can choose Custom.

<Frame caption="Environment module">
  <img src="/images/scene-manager/sm_environment.png" alt="Environment module" />
</Frame>

# FILE: scene-manager/modules/background.mdx
---
title: "Background"
description: "Set viewport backgrounds per setup."
---

This module controls your active viewport's background. You can choose between Gradient, Solid, Environment and Custom. The custom option will let you browse a background image, which can be handy in case you want to do photo matching for multiple cameras.

<Frame caption="Background module">
  <img src="/images/scene-manager/sm_background.png" alt="Background module" />
</Frame>

# FILE: scene-manager/modules/atmosphere.mdx
---
title: "Atmosphere"
description: "Enable and disable atmosphere effects per setup."
---

With the Atmosphere module you can take control over 3ds Max Atmosphere Effects, like `VRayAerialPerspective` or `VRayEnvironmentFog`. After choosing the required ones from the dropdown you can take control over them and enable/disable these effects per setup.

<Frame caption="Atmosphere module">
  <img src="/images/scene-manager/sm_atmosphere.png" alt="Atmosphere module" />
</Frame>

# FILE: scene-manager/modules/layers.mdx
---
title: "Layers"
description: "Control layer visibility per setup."
---

For each setup you can add multiple layers from your scene and control their visibility. There are multiple ways to add your layers: you can search or select them from the dropdown, or by selecting the layers in max you can load them in by pressing the fetch button.

<Frame caption="Layers module">
  <img src="/images/scene-manager/sm_layers.png" alt="Layers module" />
</Frame>

# FILE: scene-manager/modules/objects.mdx
---
title: "Objects"
description: "Control object visibility per setup."
---

With the Objects module you can add your selected geometry from max and control the visibility per setup. It's an alternative to the Layers module that does almost the same, but there are cases when the usage of this is much easier.

<Frame caption="Objects module">
  <img src="/images/scene-manager/sm_objects.png" alt="Objects module" />
</Frame>

<Warning>
It is not recommended to add more than 10–20 objects to this module. If you would like to control a bigger portion of the scene, use the Layers module.
</Warning>

# FILE: scene-manager/modules/xref-scene.mdx
---
title: "Xref Scene"
description: "Manage Xref scene files per setup."
---

The Xref Scene module will let you select files that are loaded into your scene. You can enable/disable and set the visibility of these files per setup.

<Frame caption="Xref Scene module">
  <img src="/images/scene-manager/sm_xref_scene.png" alt="Xref Scene module" />
</Frame>

# FILE: scene-manager/modules/variants.mdx
---
title: "Variants"
description: "Create product variations using layer-based variants."
---

You can define a list of layers where each item will represent a version of a product. This way you can easily create and render hundreds of variations within one state. Perfect solution if you are doing product renderings.

<Frame caption="Variants module">
  <img src="/images/scene-manager/sm_variants.png" alt="Variants module" />
</Frame>

# FILE: scene-manager/modules/render-output.mdx
---
title: "Render Output"
description: "Configure render output paths and formats per setup."
---

You can choose between multiple output modules depending on your render engine. By default you will always have the Render Output - Common which is mapped to the Render Setting > Common Tab > Render Output. In case of V-Ray you are able to use Render Output - Channels (V-Ray Separate Render Channels) and the Render Output - Raw module (V-Ray Raw Output).

<Frame caption="Render Output module">
  <img src="/images/scene-manager/sm_render_output.png" alt="Render Output module" />
</Frame>

For every camera or setup you can create outputs with different filenames and extensions by defining a project folder and adding in rules. If the generated path does not exist, Scene Manager will create it at render time. It's also possible to change the global format settings for jpg, png, tif, tga and exr extensions.

# FILE: scene-manager/modules/render-settings.mdx
---
title: "Render Settings"
description: "Fine-tune render settings and presets per setup."
---

Pick from an initial set of the most important render settings for V-Ray, Corona and F-Storm and modify them per setup.

<Frame caption="Render Settings module">
  <img src="/images/scene-manager/sm_render_settings_custom.png" alt="Render Settings module" />
</Frame>

The Render Settings - Override module can take control over your Render Settings and modify almost every property per setup. Once enabled you have to define a default render preset by pressing the Fetch button. After that you can start modifying your settings in the Render Setting Dialog and by pressing Fetch you can "lock" down these changes per setup. You can see how many and which properties are changed.

<Frame caption="Render Settings Override module">
  <img src="/images/scene-manager/sm_render_settings_override.png" alt="Render Settings Override" />
</Frame>

As an example, in case of V-Ray this module can be used to fine tune all kinds of performance/quality settings per setup. In Corona you could control all the post processing and bloom and glare properties per camera, and these settings will be also shown in the Corona VFB.

You can load 3ds Max Render Preset files (`*.rps`) for each setup. When switching between the setups, Scene Manager will first apply the render settings that you loaded, and after that it will overwrite it with all the other active settings that you have in each module (Resolution, Render Output, Environment, etc.).

<Frame caption="Render Settings Preset module">
  <img src="/images/scene-manager/sm_render_settings_preset.png" alt="Render Settings Preset" />
</Frame>

# FILE: scene-manager/modules/render-elements.mdx
---
title: "Render Elements"
description: "Enable and disable render elements per setup."
---

The Render Elements module will let you enable/disable the required elements per setup. As an example you can set multiple ZDepth passes with different max values for each camera, or you can control which Light Select pass to include in your final render to keep your final exr, cxr or vrimg file smaller.

<Frame caption="Render Elements module">
  <img src="/images/scene-manager/sm_render_elements.png" alt="Render Elements module" />
</Frame>

# FILE: scene-manager/modules/post-production.mdx
---
title: "Post-Production"
description: "Control VFB layers and tone mapping per setup."
---

The Post-Production module will allow you to control your V-Ray VFB Layers or the new Tone Mapping settings for Corona 8. Change the Tone Mapping or VFB Layers settings as you wish then press the fetch button. This will save the current state and whenever you activate the state again, Scene Manager will apply the VFB settings.

By pressing clear, Scene Manager will forget the settings and it will no longer apply the settings.

<Frame caption="Post-Production module">
  <img src="/images/scene-manager/sm_post_production.png" alt="Post-Production module" />
</Frame>

<Warning>
If you are using V-Ray you must manually enable "Save VFB color correction to RGB channel".
</Warning>

# FILE: scene-manager/modules/thumbnail.mdx
---
title: "Thumbnail"
description: "Save viewport or VFB previews as setup thumbnails."
---

You can save a preview of the viewport or VFB per setup, and use it as a thumbnail for your scene settings. This will help you visualize and review your setups without having to start a render.

<Frame caption="Thumbnail module">
  <img src="/images/scene-manager/sm_thumbs.png" alt="Thumbnail module" />
</Frame>

# FILE: scene-manager/modules/todo.mdx
---
title: "Todo"
description: "Manage tasks inside Scene Manager."
---

Todo list can come handy if you would like to manage your tasks inside Scene Manager.

<Frame caption="Todo module">
  <img src="/images/scene-manager/sm_todo.png" alt="Todo module" />
</Frame>

# FILE: scene-manager/modules/notes.mdx
---
title: "Notes"
description: "Leave notes for yourself or collaborators."
---

You can leave notes for yourself or others that you are working with.

<Frame caption="Notes module">
  <img src="/images/scene-manager/sm_notes.png" alt="Notes module" />
</Frame>

# FILE: scene-manager/modules/script-file.mdx
---
title: "Script File"
description: "Set pre-render and post-render scripts per setup."
---

With the Script - File module you can set a Pre-Render and a Post-Render script for each of the setups. This can come handy if you would like to do extra things before and after the render process.

<Frame caption="Script File module">
  <img src="/images/scene-manager/sm_script_file.png" alt="Script File module" />
</Frame>

# FILE: scene-manager/modules/script-editor.mdx
---
title: "Script Editor"
description: "Write and test MaxScript code directly in Scene Manager."
---

As an alternative to the Script - File module, the Editor provides an option for TDs and Developers to extend the core functionality of the Scene Manager. You can paste in your code or write it directly in the module. It has all the functionalities a Code Editor should have, including basic MaxScript syntax and autocompletion with V-Ray, Corona and FStorm render settings.

There are 4 tabs where you can place code:

- **Pre-Setup** – Runs before setting the properties (Camera, Resolution, Lights, Output, etc.)
- **Post-Setup** – Runs after all other properties have been set (Camera, Resolution, Lights, Output, etc.) but before Pre-Render
- **Pre-Render** – Executed before the render starts
- **Post-Render** – Executed after the render finishes

By pressing the Test button you can evaluate your code and get back errors if there are any.

<Frame caption="Script Editor module">
  <img src="/images/scene-manager/sm_script_editor.png" alt="Script Editor module" />
</Frame>

# FILE: scene-manager/bake-setups.mdx
---
title: "Bake Setups"
description: "Convert Scene Manager setups to native scene states and batch render."
---

This feature will let you bake and convert your Scene Manager settings to 3ds Max's native scene states and render presets. After that it will also add it to the Batch Render List.

<Frame caption="Bake Setups dialog">
  <img src="/images/scene-manager/sm_bake_setups.png" alt="Bake Setups" />
</Frame>

You also have the option to batch save each Scene Manager state to 3ds Max, V-Ray Scene or Corona Scene files.

# FILE: scene-manager/renderflow.mdx
---
title: "RenderFlow"
description: "Submit all your Scene Manager setups to RenderFlow with a single click."
---

Scene Manager integrates directly with RenderFlow, allowing you to submit all your setups to the render farm with a single click. Each setup is automatically converted into a render job with the correct camera, resolution, output path, and render settings — no manual configuration required.

<Frame caption="Submit to RenderFlow">
  <img src="/images/scene-manager/sm_render_manager.png" alt="Submit to RenderFlow" />
</Frame>

# FILE: scene-manager/changelog.mdx
---
title: "Product Updates"
description: "Release notes and version history for Scene Manager."
mode: "wide"
rss: true
---

<Update label="2.6.1" description="August 7, 2025">
**Fixes:**
- Fixed issue with Helio Cloud submission not working in 3ds Max 2026
</Update>

<Update label="2.6.0" description="May 29, 2025">
**New Features:**
- Support for 3ds Max 2026

**Fixes:**
- Fixed issue with Corona LightMix
- Fixed an issue where the Variants module wasn't correctly updating the output path
- Plugin now uses the Autodesk Application Package format
</Update>

<Update label="2.5.12" description="January 19, 2025">
**Fixes:**
- Activating a scene or creating a new one will now set the dirty flag
- Fixed issue with Scene Manager dialog popping up during network rendering
- Fixed an issue that prevented Render Setting - Override module to fetch the correct properties
- Fixed issue with Save as Default not working properly in the Settings
- Show map will now open the material editor as well
- Added confirmation dialog before clearing the object list
</Update>

<Update label="2.5.11" description="November 17, 2024">
**New Features:**
- Support for V-Ray 7
- Support for Corona 12
- Support for 3ds Max 2025

**Fixes:**
- Added back support for 3ds Max 2019-2021
- Fixed crash caused by circular xref dependency
- Resolved an issue where the camera didn't display in the dropdown if a modifier was applied
- Assets and Plugins will be only checked if the module is open
- Fixed an issue with the scene import option
- Fixed an issue where assets were not appearing in the assets module
- Added support for Ornatrix (plugins module)
- Fixed unauthorized error during login
- Fixed issue with missing resolution presets
- Fixed crash when 2 or more Scene Managers were open
- Resolved an issue where asset collection would hang on certain scenes during a Helio submission
- Fixed false positive missing plugin warning message when submitting to Helio
- Fixed issue with single frame rendering on Helio
- Added Package for Render Farms option
- Fixed unhandled exception that occurred when fire and effects were used in the scene
</Update>

<Update label="2.5.5" description="March 24, 2024">
Scene Manager 2.5.5 brings a completely rewritten core for significantly faster performance, a new free tier, and several quality-of-life improvements.

**New Features:**
- Added new Assets module that will allow you to easily track and collect your assets
- New Plugins module to overview which plugins/versions are used in the scene
- The new version allows you to create up to 5 states and use a selection of modules at no cost
- The core of the Scene Manager has been completely replaced. By eliminating some bottlenecks, command execution and the overall experience are now much faster.
- Added a new "Login with Browser" method for a more convenient sign in experience
- Refreshed user interface with commands like Render, Bake, Preview moved to the top bar
- Added a new notification option that opens a message box during file load if the scene contains Scene Manager settings
- New logo for the 3ds Max toolbar
- More accessible preview setup option. While active, you can make changes in the user interface without affecting your 3ds Max scene.
- Updated camera sync mode. When enabled, Scene Manager will listen for viewport changes and activate the setup based on the active camera.
- Updated the Cloud Render / Submit to Helio feature
- Added a confirmation dialog before deleting a setup
- The "create output directory tree" will now work if multiple setups are selected
- Pressing cancel during batch rendering now cancels the entire process

**Fixes:**
- Fixed several issues with groups. Scene Manager will now only pick the topmost object (if the group is closed). Also all children will inherit the properties.
- Fixed an issue with linked helpers appearing in the objects module
- Fixed missing .vrimg output and the Post-production import/export option when V-Ray GPU is used
- Fixed an issue with the Lights module where instanced V-Ray Lights were not behaving correctly during batch rendering
- Nth, range, and single frame values are now updated separately
- Removed Corona out of core and other non-relevant settings from the Render Settings - Override module
</Update>

<Update label="2.3.6" description="July 24, 2023">
Scene Manager 2.3.6 adds new modules, V-Ray GPU support, Live Mode, and a long list of fixes.

**New Features:**
- New Lights module
- New Thumbnail module
- Updated Post-production / VFB module
- Improved asset collection for Helio
- Added V-Ray and Corona Clouds properties
- Added support for 3ds Max 2024
- New Live Mode that will automatically add new cameras and apply Scene Manager settings when changing the active camera in 3ds Max
- Added more Corona Sky and Cloud properties to the environment module
- Added support for V-Ray GPU
- Added .hdr file type to the output extension list

**Fixes:**
- Fixed issue when resetting 3ds Max 2023 won't clear the settings in Scene Manager
- Added a warning before batch render if output path is duplicated
- Added bakeSetups function to the Scene Manager maxscript api
- Moved all Corona LightMix, Bloom and Glare, Sharpening / Blurring properties from Render Settings to the Post-production module
- Removed legacy Tone Mapping properties from the Camera and Render Settings modules for Corona 7 or older
- Fixed issue with post-production module not controlling the enable/disable property of tone mapping
- Fixed issue when 3ds Max was not giving a warning before file reset/close if changes were made only inside Scene Manager
- Fixed issue with batch rendering range or list of frames
- Fixed issue with Render Settings Override module not listing V-Ray 6 properties
- Fixed cancel issue during Batch Rendering
- Fixed an issue with the duplicated output error before rendering
- Fixed missing default property rows in Lights module
- Fixed an update issue in the Variants module
- Fixed packaging issue with Anima 5
- Fixed a bug in the Time Output module that caused 3ds Max to crash
- [Helio] Fixed issue with missing MCG files after asset collection
- [Helio] Added project path folder check before the asset collection process
</Update>
