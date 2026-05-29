---
title: "Python"
description: "Run Python scripts on your farm with RenderFlow. Submit any .py file as a job."
"og:title": "Python Scripts on RenderFlow"
"og:description": "Run Python scripts as render farm jobs with RenderFlow."
"twitter:title": "Python Scripts on RenderFlow"
keywords: ['Python render farm', 'Python distributed jobs', 'Python script farm']
---

RenderFlow runs Python scripts as jobs. Browse to a `.py` file and it runs on the farm, which is useful for automation, asset processing, validation, and other custom workflows.

## How to submit

In the RenderFlow app, go to Jobs > Create and select the **Python** template, then browse for a .py file. RenderFlow lists every Python interpreter detected on the node, so you can pick the version to run with. Set up the job and submit.

<Frame caption="Python job submitter">
  <img src="/images/renderflow/rf_jobtypes_python.png" alt="Python job submitter with a .py file selected and the Python version picker" />
</Frame>

## Run on each node

Enable **Run on each node** to run the script once on every node in the pool (or a filtered subset), creating one task per node. This is ideal for farm housekeeping, health checks, and node setup, where each machine needs to run the work itself.

## Output

Script output and errors are captured in the task log, and a non-zero exit code marks the task as failed.
