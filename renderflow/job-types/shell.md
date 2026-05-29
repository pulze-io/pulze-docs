---
title: "Shell"
description: "Run shell scripts on your farm with RenderFlow. One job type for .cmd, .bat, .ps1, and .sh."
"og:title": "Shell Scripts on RenderFlow"
"og:description": "Run shell scripts as farm jobs with RenderFlow."
"twitter:title": "Shell Scripts on RenderFlow"
keywords: ['shell render farm', 'PowerShell render farm', 'Bash render farm', 'batch script render farm']
---

RenderFlow runs shell scripts as jobs. Submit a `.cmd`, `.bat`, `.ps1`, `.sh`, or `.bash` file and it runs on the farm, with the host shell chosen automatically from the file extension. Shell jobs are handy for file processing, delivery steps, and farm maintenance.

## How to submit

In the RenderFlow app, go to Jobs > Create and select the **Shell** template, then browse for a script. Set up the job, or enable **Run on each node**, and submit.

<Frame caption="Shell job submitter">
  <img src="/images/renderflow/rf_jobtypes_shell.png" alt="Shell job submitter with a script selected" />
</Frame>

## Run on each node

Enable **Run on each node** to run the script once on every node in the pool (or a filtered subset), creating one task per node. Use it for node housekeeping, driver and connectivity checks, and rolling out configuration across the farm.

## Platforms

The host shell is chosen from the file extension, so jobs run where they can:

- `.cmd` and `.bat` (Command Prompt) and `.ps1` (PowerShell) run on Windows nodes
- `.sh` and `.bash` (Bash) run on macOS and Linux nodes, and on Windows with Git Bash or WSL

Script output is captured in the task log, and a non-zero exit code marks the task as failed.
