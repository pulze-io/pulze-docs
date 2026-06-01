---
title: "Supported Applications"
description: "Full list of 3D applications, render engines, and plugins supported by RenderFlow."
"og:title": "RenderFlow Supported Software List"
"og:description": "Complete list of supported applications, render engines, and plugins for RenderFlow render farm manager."
"twitter:title": "RenderFlow Supported Software"
keywords: ['render farm supported software', '3ds Max render farm', 'Blender render farm', 'Cinema 4D render farm', 'V-Ray network rendering', 'Corona render farm', 'render farm plugin compatibility', 'RenderFlow supported applications']
---

RenderFlow supports the most popular 3D rendering and post-production applications used in architectural visualization, motion graphics, and VFX.

## How detection works

When RenderFlow starts on a machine, it automatically scans for installed applications using the conventions of the host OS — the Windows registry and known install paths, the `/Applications` folder and standard Mac App locations on macOS, and `$PATH`, `$HFS`-style env vars, and the usual `/opt`, `/usr/local`, and `/Applications` (vendor) locations on Linux. The detected software list is saved per node and used for [job requirements matching](/renderflow/jobs/requirements) and [software analytics](/renderflow/software-analytics/overview).

RenderFlow plugins and scripts for each detected application are installed automatically during the first run. You can also find them manually in the platform's install folder:

| OS | Plugins folder |
|----|----------------|
| Windows | `C:\Program Files\Pulze\RenderFlow\plugins` |
| macOS | `/Applications/Pulze/RenderFlow/plugins` |
| Linux | `/opt/Pulze/RenderFlow/plugins` |

To refresh the software list after installing new applications, right-click the node and select **Software > Refresh**.

## Applications

| Application | Versions | Render engines |
|----------------|------------------------------|--------------------------------------------|
| 3ds Max | 2019 – 2027 | Arnold, Corona, FStorm, Octane, Redshift, V-Ray |
| After Effects | 22 – 26 | — |
| Arnold | Detected on the node | — |
| Blender | 3.0 – 5.1 | Cycles, EEVEE, V-Ray |
| Cinema 4D | 2023 – 2026 | Corona, Octane, Redshift, V-Ray |
| Fusion | 17 – 21 | — |
| Houdini | 19.0 – 21.0 | Mantra, Husk (USD), plus any ROP-driven engines |
| Maya | 2022 – 2027 | Arnold, V-Ray, Redshift |
| Nuke | 14.0 – 17.1 | — |
| Python | — | — |
| Redshift | Detected on the node | — |
| Shell | — | — |
| Unreal Engine | 5.4 and newer (Windows only) | — |

### Format and plugin notes

- **3ds Max** — supported plugins: Anima, BerconMaps, CityTraffic, CloneModifier, ColorCorrect, ColorEdge, Complex Fresnel, FloorGenerator, ForestPack Pro, Glue, GrowFX, MadCar, MultiScatter, MultiTexture, Ornatrix, Phoenix, Psd Manager, RailClone, SigerNoise, SigerScratches, SiNi Software, SmartRefs, SplineOffset, Substance, ThinFilm, tyFlow, VRayPattern.
- **After Effects** — renders `.aep` projects through `aerender`. Each job submits one item from the project's Render Queue, selected by name.
- **Arnold** — renders `.ass` scene files directly with the `kick` command-line renderer, without a host DCC installed on the node.
- **Fusion** — renders `.comp` files using Fusion's command-line renderer. All Fuse scripts and custom tools must be identical across every machine. A missing effect will cause the render to fail.
- **Houdini** — file types: `.hip`, `.hipnc`, `.hiplc` (Houdini), `.ifd` (Mantra), `.usd`, `.usda`, `.usdc`, `.usdz` (Husk).
- **Nuke** — renders `.nk` comps.
- **Python** — runs `.py` scripts; interpreters are enumerated from every Python on `PATH`.
- **Redshift** — renders `.rs` scene files directly without needing a host DCC installed on the node.
- **Shell** — hosts: Command Prompt (`.cmd` / `.bat`, Windows), PowerShell 5.1+ (`.ps1`, Windows), Bash (`.sh` / `.bash`, macOS / Linux / Windows via Git Bash or WSL).
- **Unreal Engine** — renders through the Movie Render Queue.

## Compatibility notes

RenderFlow is compatible with all plugins and render engines, but can only verify version compatibility for the ones listed above. If your scene uses a plugin that isn't in the supported list, RenderFlow will still render the job. It just won't check whether the plugin is installed or at the correct version on each node.

If you need support for an application, render engine, or plugin not listed here, contact [support@pulze.io](mailto:support@pulze.io).
