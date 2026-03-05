---
title: "Scene Manager"
description: "Submit multiple render jobs from a single 3ds Max file using Pulze Scene Manager."
"og:title": "Scene Manager Batch Rendering with RenderFlow"
"og:description": "Submit multiple 3ds Max render jobs from a single file with Pulze Scene Manager and RenderFlow. One-click batch submission with full property control."
"twitter:title": "Scene Manager Batch Rendering with RenderFlow"
keywords: ['3ds Max batch rendering', 'batch render multiple cameras', 'Scene Manager render farm', 'multiple render setups 3ds Max', 'batch submit render jobs', 'Pulze Scene Manager']
---

Scene Manager by Pulze is deeply integrated with RenderFlow. It allows you to submit multiple jobs from a single 3ds Max file, where each Scene Manager setup becomes its own job on the farm.

## How to submit

Select the **Scene Manager** template in the [Submitter](/renderflow/jobs/submitter), then select or browse a .max file that contains Scene Manager setups. Once the scene information is read, the Submitter switches to the multi-job view.

The left side shows the list of jobs (similar to the Scene Manager scene list). The right side shows all the details for the selected job. You can multi-select jobs on the left to apply settings to several at once.

<Frame caption="Multi-job submitter view with scene list on the left and properties on the right">
  <img src="/images/renderflow/rf_jobtypes_scene_manager_submitter.png" alt="Scene Manager submitter showing multiple jobs and batch settings" />
</Frame>

## Scene properties

All scene properties are available to review and override: resolution, frame range, output path, and render settings. Scene Manager-specific modules (lighting setups, layer states, object overrides, and other module configurations) are applied during rendering, but these can only be edited inside Scene Manager itself. The best practice is to prepare everything in Scene Manager and use RenderFlow purely for submission.

## One-click submission

Once you are happy with the settings, submit all jobs with a single click. The file is saved once, and all selected jobs are created in the queue. This is significantly faster than alternatives that require saving the file separately for each setup.

<Tip>
For large projects with many Scene Manager setups, multi-select the jobs and apply shared settings (pool, priority, notifications) in one pass before submitting.
</Tip>
