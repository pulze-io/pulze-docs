---
title: "Sanity Checks"
description: "RenderFlow runs automatic sanity checks on your 3ds Max scene before submission, catching issues like infinite render settings, missing outputs, and region render."
"og:title": "RenderFlow Sanity Checks at Submission"
"og:description": "RenderFlow runs automatic sanity checks on your scene before submission, catching issues like infinite render settings, missing outputs, and region render."
"twitter:title": "RenderFlow Sanity Checks at Submission"
keywords: ['render scene validation', 'pre-render checks', '3ds Max render validation', 'catch render errors before submission', 'render farm sanity check']
---

Sanity checks are automatic validations that run on your scene when you select a file in the [Submitter](/renderflow/jobs/submitter). They catch common mistakes that would cause a render to fail or produce unexpected results on the farm.

## When they run

Sanity checks execute automatically after you select or browse a file in the Submitter. Results appear in the Sanity Checks tab alongside your scene properties and job settings.

## How they work

Because sanity checks need access to the scene's internal state, they are written in the host application's scripting language (MaxScript for 3ds Max). The file must be open in the application and selected in the Submitter for deep checks to run. Without the scene context, only basic checks are possible.

<Info>
Sanity checks are currently available for 3ds Max only. Support for Blender, Cinema 4D, and other applications is planned.
</Info>

## What they catch

RenderFlow ships with 52 pre-built checks covering 3ds Max native features and render engine specifics for V-Ray, Corona, and FStorm. These checks look for issues like infinite render time or iteration settings, region render accidentally left enabled, no camera assigned, missing render output paths, and other settings that commonly cause problems on a render farm.

## Severity levels

Each check has one of three severity levels.

**Info** flags something worth noting but does not affect submission. These are informational only.

**Warning** indicates a potential problem. You can still submit, but it is worth reviewing.

**Critical** blocks submission entirely. The Submit button is disabled until all critical issues are resolved. This prevents jobs from entering the queue when they are guaranteed to fail.

<Frame caption="Sanity check results in the Submitter showing Info, Warning, and Critical items">
  <img src="https://placehold.co/900x500?text=Sanity+check+results+in+Submitter" alt="Sanity check results with mixed severity levels" />
</Frame>

## Customization

Each check's severity level can be changed, and individual checks can be enabled or disabled. You can also create your own custom checks using MaxScript.

For full details on managing, editing, and creating sanity checks, see the dedicated [Sanity Check](/renderflow/sanity-check/overview) section.
