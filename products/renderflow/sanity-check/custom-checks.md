---
title: "Custom Checks"
description: "Create your own sanity checks using MaxScript to validate studio-specific requirements."
"og:title": "RenderFlow Custom Sanity Checks"
"og:description": "Write custom MaxScript sanity checks in RenderFlow to validate studio-specific scene requirements before render submission."
"twitter:title": "RenderFlow Custom Sanity Checks"
keywords: ['custom render validation', 'MaxScript sanity check', 'custom pre-render checks', 'studio render validation script', 'MaxScript render validation']
---

Beyond the 52 [default checks](/products/renderflow/sanity-check/defaults), you can create your own sanity checks to validate studio-specific requirements. Custom checks are written in MaxScript and run in the same pipeline as the built-in ones.

## Creating a custom check

Click the **New** button in the top-right corner of the sanity check editor. A side panel opens with the following fields.

**Name** is the display name for your check, shown in the editor and in the Submitter results.

**Script** is the MaxScript code that will be executed. Your script should be a function that returns `true` when the check passes and `false` when it does not.

**Function name** should match the name of the function in your script. If your script contains multiple functions, enter the one that should be executed as the check.

**Arguments** lets you pass parameters to your function. Only string values are supported. If your function needs a different type, convert it inside the script.

**Description** explains what the check does, for your own reference and for other users.

**Error level** sets the severity: Info, Warning, or Critical. Critical checks block submission.

**Message** is the text the user sees in the Submitter when the check fails. Write something helpful that explains what is wrong and how to fix it.

**Render engine** lets you restrict the check to run only when a specific engine is active (for example, V-Ray only). Leave this blank to run the check for all engines.

<Frame caption="Custom sanity check editor with all fields">
  <img src="https://placehold.co/900x500?text=Custom+sanity+check+editor" alt="Side panel showing script, function name, arguments, error level, and message fields" />
</Frame>

## Testing your check

If you have an open instance of 3ds Max, you can test your check directly from the editor using the **play button**. This runs the script in the 3ds Max context and returns the result immediately, so you can iterate without submitting a job.

The recommended workflow is to develop and test your MaxScript in the 3ds Max script editor first, then paste the final version into the RenderFlow sanity check editor.

## Using studio helper scripts

Many studios have in-house MaxScript libraries with helper functions for their specific pipeline. You can make these functions available to all sanity checks by adding them to:

```
<RenderFlow repository>\scripts\max_sanity_check.ms
```

This file is executed before any sanity checks run, so any functions defined in it are available for your custom checks to call. This is useful when multiple checks share common logic or when you want to reuse existing studio scripts.

## Sharing and portability

Custom checks are stored on the RenderFlow server and available to all users on the same installation. They cannot be exported or transferred to a different RenderFlow setup.

For sharing checks with the community, see the open-source repository at [github.com/pulze-io/renderflow-sanity-check](https://github.com/pulze-io/renderflow-sanity-check).
