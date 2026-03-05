---
title: "Requirements"
description: "How RenderFlow automatically checks software compatibility before assigning nodes to jobs."
"og:title": "RenderFlow Job Requirements"
"og:description": "Automatic software compatibility checking in RenderFlow ensures nodes have the right applications, engines, and plugins before rendering your job."
"twitter:title": "RenderFlow Job Requirements"
keywords: ['render farm software compatibility', 'render node version matching', 'render farm plugin validation', 'automatic software check render farm', 'render node requirements matching']
---

Job requirements are RenderFlow's automatic compatibility system. Before a node is assigned to a job, RenderFlow checks whether that node has the correct software, render engine, plugins, and network drives. If any requirement is not met, the node is blocked from working on that job.

## How requirements are created

When you select a file in the [Submitter](/renderflow/jobs/submitter), RenderFlow detects the applications, render engines, and plugins used by the scene and automatically builds a requirements list. This happens without any manual input.

For example, if your 3ds Max scene uses V-Ray 7.20 and Forest Pack, RenderFlow will add requirements for 3ds Max (host application), V-Ray (render engine), and Forest Pack (plugin). It also detects which network drives the scene references.

<Frame caption="Requirements list generated automatically from a 3ds Max scene">
  <img src="https://placehold.co/900x500?text=Requirements+list+in+Submitter" alt="Auto-generated requirements list showing host app, engine, and plugins" />
</Frame>

## How matching works

Every render node and workstation maintains a list of installed applications and plugins, scanned during startup. When a node tries to pick up a job, RenderFlow compares the node's software list against the job's requirements.

If everything matches, the node is assigned. If there is a mismatch, RenderFlow creates an error on the node for that specific job and blacklists the node from working on it. The node remains available for other jobs that it qualifies for. Once the issue is resolved (for example, by installing the missing plugin), the node can be retried.

## Validation levels

Not every version mismatch is a problem. Sometimes one node has V-Ray 7.20.04 and another has 7.20.02, and both will render the scene correctly. RenderFlow lets you control how strictly versions are compared by setting a validation level on each requirement.

| Level | What it checks | Example |
|-------|---------------|---------|
| Low | Software exists, no version check | V-Ray is installed (any version) |
| Normal | Exists and major version matches | V-Ray 7.x |
| Medium | Exists and major + minor version match | V-Ray 7.20.x |
| High | Exact version match required | V-Ray 7.20.04 only |

The default level depends on the requirement type, but you can adjust it per requirement in the Submitter. Lowering the validation level expands the pool of available nodes, which is useful when your farm has slight version differences across machines.

<Frame caption="Validation level dropdown on a requirement">
  <img src="https://placehold.co/900x500?text=Validation+level+dropdown" alt="Dropdown showing Low, Normal, Medium, and High validation levels" />
</Frame>

<Warning>
Running different software versions across your farm can lead to subtle rendering differences. Only lower the validation level if you are confident the version mismatch will not affect your output.
</Warning>

## Network drive requirements

If a scene references files on a mapped network drive, RenderFlow adds that drive as a requirement. Before assigning a node, it checks whether the node has access to the same drive. This prevents jobs from failing because a node cannot reach the project files.

You can configure network drive mappings for all nodes in [Settings > Mapped Drives](/renderflow/settings/overview).

## Editing requirements

You can deactivate any requirement in the Submitter by toggling it off. The only exception is the host application: at minimum, the correct DCC application must be detected and available on the node.

Deactivating a requirement is useful in situations where you know a plugin is listed as a dependency but is not actually needed for the specific render you are submitting.

