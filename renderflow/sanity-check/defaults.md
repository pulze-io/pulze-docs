---
title: "Default Checks"
description: "Complete list of 52 built-in sanity checks for 3ds Max in RenderFlow. Covers native settings, V-Ray, Corona, and FStorm render engine validation."
"og:title": "RenderFlow Default Sanity Checks"
"og:description": "Complete list of 52 built-in sanity checks for 3ds Max in RenderFlow, covering native settings, V-Ray, Corona, and FStorm validation."
"twitter:title": "RenderFlow Default Sanity Checks"
keywords: ['3ds Max render checks list', 'V-Ray sanity checks', 'Corona render validation', 'FStorm render checks', 'pre-render validation checklist', '3ds Max common render mistakes']
---

RenderFlow ships with 52 pre-built sanity checks for 3ds Max. These cover native 3ds Max settings, V-Ray, Corona, and FStorm render engine configurations.

Default checks can be disabled or edited, but they cannot be deleted.

## 3ds Max native checks (21)

| Name | Description | Level |
|------|-------------|-------|
| Untitled filename | Check if the filename is empty (untitled) | Critical |
| Autoback filename | Check if the filename contains the word 'autoback' | Warning |
| Recover filename | Check if the filename contains the word 'recover' | Warning |
| Empty scene | Check if the scene is empty | Critical |
| Render type | Check if the render type is set to view | Warning |
| Scene production | Check if the scene is set to production rendering | Critical |
| Pixel aspect | Check if the pixel aspect ratio is set to 1.0 | Warning |
| Active camera | Check if the scene has an active camera | Warning |
| Single frame | Check if the time output is set to single frame | Warning |
| Frame range | Check if the time output is set to range | Warning |
| Frame step | Check if the scene is set to render every frame | Warning |
| Frame rate | Check if the frame rate is set to the correct value | Warning |
| Output path | Check if the 3ds Max output path is set | Warning |
| Output movie format | Check if the output file format is set to a movie format | Critical |
| Network path | Check if the output path is set to a network path | Warning |
| Units display type | Check if the units display type is set to the correct unit | Critical |
| Units system type | Check if the units system type is set to the correct unit | Critical |
| Elements count | Check if the scene has render elements | Warning |
| Elements active | Check if the render elements are active | Warning |
| Objects without materials | Check if there are objects that have no materials | Warning |
| Color management mode | Check color management settings for 3ds Max 2024 and 2025 | Critical |

## V-Ray checks (21)

| Name | Description | Level |
|------|-------------|-------|
| V-Ray DR | Check if V-Ray DR is disabled | Warning |
| V-Ray framestamp | Check if V-Ray frame stamp is disabled | Warning |
| V-Ray rendermask | Check if V-Ray render mask is disabled | Warning |
| V-Ray min shading rate | Check V-Ray min shading rate | Warning |
| V-Ray min subdivs | Check V-Ray min subdivs | Warning |
| V-Ray max subdivs | Check V-Ray max subdivs | Warning |
| V-Ray noise threshold | Check V-Ray noise threshold | Warning |
| V-Ray material override | Check if V-Ray material override is enabled | Warning |
| V-Ray hidden lights | Check if V-Ray render hidden lights is disabled | Warning |
| V-Ray save raw file | Check if V-Ray save raw file is enabled | Warning |
| V-Ray raw filename | Check if V-Ray raw filename is not empty | Warning |
| V-Ray separate render channels | Check if V-Ray separate render channels is enabled | Warning |
| V-Ray render channels filename | Check if V-Ray render channels filename is not empty | Warning |
| V-Ray separate folders | Check if V-Ray separate folders is enabled | Warning |
| V-Ray render channels RGB | Check if V-Ray render channels RGB is enabled | Warning |
| V-Ray render channels Alpha | Check if V-Ray render channels Alpha is enabled | Warning |
| V-Ray save VFB corrections | Check if save VFB corrections are enabled | Warning |
| V-Ray clear previous render | Check if V-Ray clear previous render is enabled | Warning |
| V-Ray VFB region | Check if V-Ray VFB region is disabled | Warning |
| V-Ray VFB mousetrack | Check if V-Ray VFB mousetrack is disabled | Warning |
| V-Ray resumable rendering | Check if V-Ray resumable rendering is disabled | Warning |

## Corona checks (8)

| Name | Description | Level |
|------|-------------|-------|
| Corona distributed rendering | Check if Corona DR is disabled | Warning |
| Corona DR search LAN | Check if Corona search on LAN is disabled | Warning |
| Corona render selected | Check if Corona render selected is disabled | Critical |
| Corona material override | Check if material override is disabled | Warning |
| Corona material override materials | Check if material override has no materials assigned | Warning |
| Corona infinite render | Check if render settings are not set to infinite | Critical |
| Corona render stamp | Check if Corona render stamp is disabled | Warning |
| Corona VFB region | Check if Corona VFB region is disabled | Warning |

## FStorm checks (2)

| Name | Description | Level |
|------|-------------|-------|
| FStorm render mask | Check if FStorm render mask is disabled | Warning |
| FStorm override | Check if FStorm override is disabled | Warning |

## Editing default checks

To edit an existing check, click its row in the sanity check editor. A side panel opens with all editable fields: the name, description, error level, message, and the script itself. You can change the severity level of any default check or disable it entirely if it does not apply to your workflow.

<Frame caption="Editing a default sanity check in the side panel">
  <img src="/images/renderflow/rf_sanity_check_edit_panel.png" alt="Side panel showing editable fields for a sanity check" />
</Frame>
