---
title: "Assets"
description: "RenderFlow scans your 3ds Max scene for textures, proxies, caches, and other assets, flagging missing files and calculating project size before submission."
"og:title": "RenderFlow Asset Detection"
"og:description": "RenderFlow scans your 3ds Max scene for textures, caches, proxies, and other assets, flagging missing files before you submit to the farm."
"twitter:title": "RenderFlow Asset Detection"
keywords: ['render farm asset management', 'missing textures render farm', '3ds Max asset detection', 'render farm missing files', 'scene asset validation', 'render farm file dependencies']
---

When you select a file in the [Submitter](/products/renderflow/jobs/submitter), RenderFlow scans the scene for all referenced assets and presents them in the Assets tab. This gives you a clear picture of what your scene depends on and whether anything is missing before the job reaches the farm.

<Info>
Asset detection is currently available for 3ds Max only. Other applications render with whatever assets the scene file references, without a pre-submission scan.
</Info>

## What gets detected

The asset checker for 3ds Max can identify textures, point cache files, proxies, IES light profiles, LUT files, Anima scenes, OCIO configurations, IFL image sequences, Phoenix simulation caches, nested XRef objects, and XRef files. This makes it one of the most comprehensive pre-submission asset scanners available for 3ds Max.

## Missing assets

The Assets tab flags any file that cannot be found at its referenced path. It also calculates the total project size based on all detected assets. This is useful for verifying that everything is in place before submitting.

If an asset is missing or only exists on your local workstation, the render node will not be able to access it. Depending on the asset type, the result might be a black texture, a missing object, or a failed frame.

<Frame caption="Asset list in the Submitter showing detected files, missing indicators, and total project size">
  <img src="https://placehold.co/900x500?text=Asset+list+in+Submitter" alt="Asset tab with file list, missing file markers, and total size" />
</Frame>

## What RenderFlow does not do

RenderFlow reports on assets but does not manage them. It will not remap paths, collect assets into a single folder, or relink missing references. These tasks are the responsibility of the artist or pipeline, using tools like the 3ds Max Asset Tracker, Resource Collector, or third-party scripts.

<Warning>
Always ensure your scene assets are stored on shared network storage using UNC paths (for example, `\\server\projects\...`) so that every node on the farm can access them. Files stored only on your local C: drive will not be available to render nodes.
</Warning>
