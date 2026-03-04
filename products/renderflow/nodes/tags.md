---
title: "Tags"
description: "Use tags in RenderFlow to categorize render nodes by hardware, location, or project. Filter the node table and whitelist nodes in the job submitter by tag."
"og:title": "RenderFlow Node Tags"
"og:description": "Use tags in RenderFlow to categorize render nodes by hardware, location, or project. Filter the node table and whitelist nodes in the job submitter by tag."
"twitter:title": "RenderFlow Node Tags"
keywords: ['render node grouping', 'render farm node tags', 'render farm node categories', 'organize render nodes']
---

Tags are labels you attach to nodes to categorize them beyond their pool assignment. They are useful for filtering the node table and for quickly selecting groups of nodes when whitelisting in the [Submitter](/products/renderflow/jobs/submitter).

## How tags work

A node can have any number of tags. Tags are free-form text labels that you define. RenderFlow also provides tag presets based on detected hardware (CPU type, RAM amount, GPU type) to help you get started.

## Where tags are used

**Node table filtering.** In the Nodes view, you can filter the table by tag to quickly find machines with specific characteristics.

**Job whitelisting.** In the Submitter, when you enable Whitelist Nodes, you can select nodes by tag. For example, tagging all GPU-equipped machines as "GPU" lets you whitelist them with one click when submitting a GPU render job.

## Adding tags

There are two ways to add tags.

**Per node.** Open the node details, click the edit button, and add tags in the Tags field.

**In batch.** Select multiple nodes in the table, right-click, and choose **Edit Tags**. This applies the same tag changes to all selected nodes at once.

<Frame caption="Batch tag editing for multiple selected nodes">
  <img src="https://placehold.co/900x500?text=Batch+tag+editing" alt="Tag editor applied to multiple selected nodes" />
</Frame>
