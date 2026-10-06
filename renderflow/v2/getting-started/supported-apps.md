---
title: "Supported Applications"
description: "The applications, versions, render engines and job types RenderFlow renders, on Windows, Linux and macOS."
"og:title": "RenderFlow Supported Applications and Render Engines"
"og:description": "Every application, version, render engine and job type RenderFlow can render, and the platforms each one runs on."
"twitter:title": "RenderFlow Supported Applications"
keywords: ['render farm supported software', 'render farm render engines', '3ds Max render farm', 'Blender render farm', 'Maya render farm', 'Houdini render farm', 'Unreal render farm', 'Cinema 4D render farm', 'V-Ray render farm', 'Corona render farm', 'Arnold render farm', 'Redshift render farm', 'RenderFlow supported applications']
---

RenderFlow detects the applications and render engines installed on every machine and lists them on the **Inventory** screen. A step is only given to machines that have what it requires, so a farm can mix machines with different applications and versions.

## Applications

| Application | Versions | Platforms | Render engines |
|---|---|---|---|
| 3ds Max | 2019 to 2027 | Windows | V-Ray, Corona, Arnold, Redshift, Octane, FStorm |
| After Effects | 2022 to 2027 | Windows, macOS | |
| Autograph | Any | Windows, macOS | |
| Blender | 3.0 to 5.2 | Windows, Linux, macOS | Cycles, EEVEE, V-Ray |
| Cinema 4D | 2023 to 2026 | Windows, Linux, macOS | Redshift, Arnold, Corona, V-Ray |
| ComfyUI | Any | Windows, Linux, macOS | |
| DaVinci Resolve Studio | Any | Windows, Linux, macOS | |
| Fusion | 17 to 21 | Windows, Linux, macOS | |
| Harmony | 20 to 27 | Windows, Linux, macOS | |
| Houdini | Any | Windows, Linux, macOS | Karma, Mantra, Arnold, Redshift |
| KeyShot | 12, 13 and 2023 to 2026 | Windows, Linux, macOS | |
| Maya | 2022 to 2027 | Windows, Linux, macOS | Arnold, V-Ray, Redshift, RenderMan |
| Media Encoder | Any | Windows, macOS | |
| Nuke | 14.0 to 17.1 | Windows, Linux, macOS | |
| Premiere Pro | 25.3 and newer | Windows, macOS | |
| Rhino | 7 and 8 | Windows | V-Ray, rendered by V-Ray Standalone |
| SketchUp | Any | Windows, macOS | V-Ray, rendered by V-Ray Standalone |
| Unreal Engine | 5.0 and newer | Windows, Linux, macOS | |
| Vantage | 3.3 and newer | Windows | |
| VRED | 2024 to 2027 | Windows | CPU and GPU raytracing |

A plugin found inside an application is reported with it, so a step can require it: Phoenix, tyFlow, Forest Pack and RailClone in 3ds Max, for example.

## Job types

| Job type | What it does |
|---|---|
| 3ds Max | Renders a 3ds Max scene |
| 3ds Max Script | Runs a MAXScript or Python script in 3ds Max |
| 3ds Max Export | Exports a 3ds Max scene to V-Ray Scene, Arnold, Redshift Proxy or USD |
| Blender | Renders a Blender scene |
| Blender Script | Runs a Python script in Blender |
| Blender Export | Exports a Blender scene to USD or V-Ray Scene |
| Cinema 4D | Renders a Cinema 4D scene |
| Cinema 4D Script | Runs a Python script in Cinema 4D |
| Cinema 4D Export | Exports a Cinema 4D scene to Redshift Proxy, V-Ray Scene or USD |
| Maya | Renders a Maya scene, with its render layers |
| Maya Script | Runs a Python script in Maya |
| Maya Export | Exports a Maya scene to Arnold, V-Ray Scene, Redshift Proxy or USD |
| Houdini | Renders a ROP from a Houdini scene |
| Houdini Script | Runs a Python script in Houdini |
| Husk (USD) | Renders a USD file with Karma or another USD renderer |
| Mantra (IFD) | Renders Mantra IFD files |
| Nuke | Renders the Write nodes of a Nuke script |
| After Effects | Renders the render queue of an After Effects project |
| Premiere | Exports a Premiere Pro sequence through Media Encoder |
| Media Encoder | Exports a movie or a Premiere project with a Media Encoder preset |
| DaVinci Resolve | Renders the render queue of a DaVinci Resolve project |
| Fusion | Renders a Fusion composition |
| Harmony | Renders the Write nodes of a Harmony scene |
| KeyShot | Renders a KeyShot scene |
| VRED | Renders a VRED scene, its clips or a sequence |
| Vantage | Renders a Vantage project |
| Autograph | Renders an Autograph composition |
| ComfyUI | Runs a ComfyUI workflow |
| SketchUp | Renders a SketchUp scene with V-Ray Standalone |
| Rhino | Renders a Rhino named view with V-Ray Standalone |
| Unreal | Renders Movie Render Queue jobs from an Unreal project |
| Arnold | Renders Arnold scene files |
| V-Ray Standalone | Renders V-Ray scene files |
| Redshift | Renders Redshift proxy files |
| RenderMan | Renders RenderMan RIB files |
| Image Converter | Converts and resizes rendered frames |
| Video Encoder | Turns a frame sequence into a movie |
| Python | Runs a Python script on the farm |
| Shell | Runs a command or a batch, PowerShell or Bash script |
