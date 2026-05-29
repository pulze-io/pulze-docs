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

### 3ds Max

| | |
|---|---|
| **Versions** | 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027 |
| **Job types** | Standard render, Scene Manager, Tiled render, Corona DR, V-Ray DR |

**Render engines:** Arnold, Corona, FStorm, Octane, Redshift, V-Ray

**Supported plugins:** Anima, BerconMaps, CityTraffic, CloneModifier, ColorCorrect, ColorEdge, Complex Fresnel, FloorGenerator, ForestPack Pro, Glue, GrowFX, MadCar, MultiScatter, MultiTexture, Ornatrix, Phoenix, Psd Manager, RailClone, SigerNoise, SigerScratches, SiNi Software, SmartRefs, SplineOffset, Substance, ThinFilm, tyFlow, VRayPattern

### After Effects

| | |
|---|---|
| **Versions** | 2022, 2023, 2024, 2025, 2026, 2027 |
| **Job types** | Render Queue Item render |

RenderFlow renders `.aep` projects through `aerender`. Each job submits one item from the project's Render Queue, picked by its 1-based position in the queue.

### Blender

| | |
|---|---|
| **Versions** | 3.0 through 5.1 |
| **Job types** | Standard render, Tiled render |

**Render engines:** Cycles, EEVEE, V-Ray

### Cinema 4D

| | |
|---|---|
| **Versions** | 2023, 2024, 2025, 2026 |
| **Job types** | Standard render |

**Render engines:** Corona, Octane, Redshift, V-Ray

### Fusion

| | |
|---|---|
| **Versions** | 17, 18, 19, 20, 21 |
| **Job types** | Compositing render |

RenderFlow renders `.comp` files using Fusion's command-line renderer. All Fuse scripts and custom tools must be identical across every machine. A missing effect will cause the render to fail.

### Houdini (Beta)

| | |
|---|---|
| **Versions** | Auto-detected from your Houdini installs on Windows, macOS, and Linux |
| **Job types** | Houdini (scene + ROP), Mantra (IFD), Husk (USD) |

**Render engines:** Mantra, Husk (USD / Solaris), plus any third-party engine driven through a ROP

**File types:** `.hip`, `.hipnc`, `.hiplc` (Houdini), `.ifd` (Mantra), `.usd`, `.usda`, `.usdc`, `.usdz` (Husk)

<Warning>
The Houdini integration is in **Beta** — see the [Houdini job type](/renderflow/job-types/houdini) page for what to expect.
</Warning>

### Maya

| | |
|---|---|
| **Versions** | 2022, 2023, 2024, 2025, 2026, 2027 |
| **Job types** | Render layer render |

**Render engines:** Arnold, V-Ray, Redshift

### Nuke

| | |
|---|---|
| **Versions** | 14.0, 14.1, 15.0, 15.1, 15.2, 16.0, 16.1, 16.2, 17.0, 17.1 |
| **Job types** | Comp render (`.nk`) |

### Python

| | |
|---|---|
| **Versions** | Any Python installed on the node — enumerated from every interpreter on `PATH` |
| **Job types** | Script execution (`.py`) |

### Redshift Standalone

| | |
|---|---|
| **Versions** | All Redshift versions detected on the node — RenderFlow uses the newest one to parse incoming `.rs` files (Windows only) |
| **Job types** | Standalone render (`.rs`) |

Render Redshift `.rs` scene files directly without needing a host DCC installed on the node.

### Shell

| | |
|---|---|
| **Hosts** | Command Prompt (`.cmd` / `.bat`, Windows), PowerShell 5.1+ (`.ps1`, Windows), Bash (`.sh` / `.bash`, macOS / Linux / Windows via Git Bash or WSL) |
| **Job types** | Script execution |

### Unreal Engine (Beta)

| | |
|---|---|
| **Versions** | 5.4 and newer (Windows only) |
| **Job types** | Movie Render Queue render |

<Warning>
The Unreal Engine integration is in **Beta** and currently Windows-only — see the [Unreal Engine job type](/renderflow/job-types/unreal) page for what to expect.
</Warning>

## Compatibility notes

RenderFlow is compatible with all plugins and render engines, but can only verify version compatibility for the ones listed above. If your scene uses a plugin that isn't in the supported list, RenderFlow will still render the job. It just won't check whether the plugin is installed or at the correct version on each node.

If you need support for an application, render engine, or plugin not listed here, contact [support@pulze.io](mailto:support@pulze.io).
