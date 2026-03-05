---
title: "Templates"
description: "Save and reuse job submission settings with templates. Create private or public presets for pools, priority, notifications, and other settings your team uses."
"og:title": "RenderFlow Job Templates"
"og:description": "Create reusable job templates in RenderFlow to standardize submission settings across your team and projects."
"twitter:title": "RenderFlow Job Templates"
keywords: ['render farm job templates', 'render job presets', 'reusable render settings', 'render farm workflow templates']
---

Templates let you save and reuse job settings so you do not have to configure the same options every time you submit. RenderFlow has two types of templates: system templates and custom templates.

## System templates

System templates are built into RenderFlow. Each one corresponds to a job type: 3ds Max, Scene Manager, V-Ray Standalone, Blender, Cinema 4D, Fusion, and so on.

A system template defines which properties are available in the [Submitter](/renderflow/jobs/submitter) form. When you create a new job, you always start by picking a system template.

## Custom templates

Custom templates are ones you create yourself. They save a specific combination of job settings so you can apply them with one click.

To create a custom template:

1. Open the Submitter and select a system template as your base (for example, 3ds Max).
2. Optionally select a file to populate the scene properties.
3. Adjust any settings you want to save: priority, pool, whitelist nodes, notifications, or any scene-related properties.
4. Click **Save as Template** and give it a name.

Your custom template will appear at the top of the Submitter the next time you create a job. You can edit any parameter of an existing template or delete it entirely.

<Frame caption="Custom templates appear at the top of the Submitter for quick access">
  <img src="https://placehold.co/900x500?text=Template+selector+in+Submitter" alt="Template selector showing system and custom templates" />
</Frame>

## Private and public templates

A template can be **private** (visible only to you) or **public** (visible to everyone connected to the same server). Public templates are useful for standardizing settings across a team, for example ensuring that all jobs for a specific project use the same priority, pool, and notification settings.

## Templates without files

You do not need to have a file selected when saving a template. You can set up all the job settings, remove the file reference, and save. This creates a "settings-only" template that is great for team workflows and recurring projects where the file changes but the submission settings stay the same.

<Tip>
For project-based workflows, create a public template with the project's pool, priority, and notification settings. Artists on the team select the template, pick their file, and submit. No need to remember the correct settings each time.
</Tip>

## Limitations

Custom templates are stored on the RenderFlow server. They cannot be exported, imported, or shared with a different RenderFlow installation.
