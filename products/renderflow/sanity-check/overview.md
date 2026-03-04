---
title: "Sanity Check Overview"
sidebarTitle: "Scene Validation"
description: "RenderFlow validates your 3ds Max scene before submission with 52 built-in checks, catching common mistakes that waste render time or produce bad output."
"og:title": "RenderFlow Sanity Check System"
"og:description": "RenderFlow's sanity check system validates your 3ds Max scene before submission, catching mistakes like infinite render settings, missing outputs, and region renders."
"twitter:title": "RenderFlow Sanity Check System"
keywords: ['render scene validation', '3ds Max pre-render checks', 'render farm quality control', 'catch render errors before farm', 'scene validation tool', 'RenderFlow sanity check']
---

RenderFlow's sanity check system validates your scene before submission to catch common mistakes that would waste render time or produce unexpected results. It runs automatically when you select a file in the [Submitter](/products/renderflow/jobs/submitter) and displays results in the Sanity Checks tab.

The concept was introduced in the [Jobs section](/products/renderflow/jobs/sanity-checks). This section covers the sanity check editor, the full list of built-in checks, and how to create your own.

<Info>
Sanity checks are currently available for 3ds Max only. Support for Blender, Cinema 4D, and other applications is planned.
</Info>

## Where to find it

The sanity check editor is accessible from the main toolbar via the checklist icon in the sidebar. From here you can browse all available checks, edit their settings, change severity levels, and create new custom checks.

Results appear in the Submitter after a file is selected. Each check is color-coded by its severity level: Info, Warning, or Critical. Critical checks block submission until the issue is resolved.

<Frame caption="Sanity check editor accessible from the sidebar toolbar">
  <img src="https://placehold.co/900x500?text=Sanity+check+editor" alt="Sanity check editor showing the list of checks with severity levels" />
</Frame>

## Open source

All 52 built-in sanity checks are open source and available on GitHub at [github.com/pulze-io/renderflow-sanity-check](https://github.com/pulze-io/renderflow-sanity-check). You can browse the source code, contribute improvements, or use it as a reference for writing your own checks.
