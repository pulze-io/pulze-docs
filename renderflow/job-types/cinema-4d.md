---
title: "Cinema 4D"
description: "Submit Cinema 4D render jobs to your farm with RenderFlow. Supports Corona, Redshift, Octane, and V-Ray for versions 2023 through 2026."
"og:title": "Cinema 4D Rendering with RenderFlow"
"og:description": "Render Cinema 4D scenes on your farm with RenderFlow. Supports Corona, Redshift, Octane, V-Ray, and other render engines."
"twitter:title": "Cinema 4D Rendering with RenderFlow"
keywords: ['Cinema 4D render farm', 'Cinema 4D network rendering', 'C4D Redshift render farm', 'Cinema 4D Corona farm']
---

RenderFlow supports Cinema 4D rendering with the latest versions and all major render engines.

## How to submit

There are two ways to open the Cinema 4D [Submitter](/renderflow/jobs/submitter).

**From Cinema 4D**, open the **Pulze** menu and choose **Submit to RenderFlow**.

<Frame caption="Pulze menu in Cinema 4D">
  <img src="/images/renderflow/rf_jobtypes_cinema4d_menu.png" alt="Pulze menu in Cinema 4D showing Submit to RenderFlow" />
</Frame>

**From the RenderFlow app**, select the **Cinema 4D** template, then either browse for a file or pick from a currently open Cinema 4D instance.

Opening the scene in Cinema 4D and selecting it from the dropdown is strongly recommended. Browsing a file on disk provides very limited data, as RenderFlow cannot read scene properties directly from Cinema 4D files.

<Info>
If you browse a Cinema 4D file without overriding any properties, the file will render with whatever settings are saved in the scene.
</Info>

The Submitter opens the same from either route, pre-filled with the scene's properties:

<Frame caption="The Cinema 4D Submitter">
  <img src="/images/renderflow/rf_jobtypes_cinema4d_submitter.png" alt="Cinema 4D job submitter showing scene properties" />
</Frame>

## Supported versions and engines

RenderFlow supports Cinema 4D versions 2023 through 2026. Supported render engines include Corona, Redshift, Octane, and V-Ray. Other engines will work as well, though they may not have dedicated requirement checks in the [Requirements](/renderflow/jobs/requirements) system.

For the complete list, see [Supported Apps](/renderflow/getting-started/supported-apps).
