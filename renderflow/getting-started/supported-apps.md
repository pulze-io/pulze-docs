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

When RenderFlow starts on a machine, it automatically scans for installed applications by checking the Windows registry, known installation paths, and environment variables. The detected software list is saved per node and used for [job requirements matching](/renderflow/jobs/requirements) and [software analytics](/renderflow/software-analytics/overview).

RenderFlow plugins for each detected application are installed automatically during the first run. You can also find them manually at:

```
C:\Program Files\Pulze\RenderFlow\plugins
```

To refresh the software list after installing new applications, right-click any node and select **Refresh Software**.

## Applications

### 3ds Max

| | |
|---|---|
| **Versions** | 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026 |
| **Job types** | Standard render, Scene Manager, Tiled render, Corona DR, V-Ray DR |
| **License** | Not required on render nodes (uses the `-server` flag for network rendering) |

**Render engines:** Arnold, Corona, FStorm, Octane, Redshift, V-Ray

**Supported plugins:** Anima, BerconMaps, CityTraffic, CloneModifier, ColorCorrect, ColorEdge, Complex Fresnel, FloorGenerator, ForestPack Pro, Glue, GrowFX, MadCar, MultiScatter, MultiTexture, Ornatrix, Phoenix, Psd Manager, RailClone, SigerNoise, SigerScratches, SiNi Software, SmartRefs, SplineOffset, Substance, ThinFilm, tyFlow, VRayPattern

<Info>
3ds Max does not require an Autodesk license on render nodes. RenderFlow launches 3ds Max with the `-server` flag, which is Autodesk's built-in network rendering mode. This means you can add unlimited render nodes without purchasing additional 3ds Max licenses.
</Info>

### Blender

| | |
|---|---|
| **Versions** | 3.0 through 5.0 (all point releases) |
| **Job types** | Standard render, Tiled render |
| **License** | Free and open source, no license needed |

**Render engines:** Cycles, EEVEE, V-Ray

### Cinema 4D

| | |
|---|---|
| **Versions** | 2023, 2024, 2025, 2026 |
| **Job types** | Standard render |
| **License** | Command Line Renderer requires a license configuration. See [Maxon's guide](https://support.maxon.net/hc/en-us/articles/10004994616732-How-do-I-license-the-Command-line-renderer) |

**Render engines:** Corona, Octane, Redshift, V-Ray

### Fusion

| | |
|---|---|
| **Versions** | 17, 18, 19, 20, 21 |
| **Job types** | Compositing render |
| **License** | Fusion Render Node is free |

Fusion is Blackmagic Design's node-based compositing application. RenderFlow renders `.comp` files using Fusion's command-line renderer. All Fuse scripts and custom tools must be identical across every machine. A missing effect will cause the render to fail.

## Compatibility notes

RenderFlow is compatible with all plugins and render engines, but can only verify version compatibility for the ones listed above. If your scene uses a plugin that isn't in the supported list, RenderFlow will still render the job. It just won't check whether the plugin is installed or at the correct version on each node.

If you need support for an application, render engine, or plugin not listed here, contact [support@pulze.io](mailto:support@pulze.io).
