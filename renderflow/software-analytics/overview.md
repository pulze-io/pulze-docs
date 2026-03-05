---
title: "Software Analytics"
sidebarTitle: "Comparing Nodes"
description: "Compare installed applications and plugin versions across all render nodes in your farm. Spot version mismatches, missing plugins, and outdated software instantly."
"og:title": "RenderFlow Software Analytics"
"og:description": "Compare applications and plugin versions across all render nodes with RenderFlow's Software Analytics. Find version mismatches, missing plugins, and extra installations at a glance."
"twitter:title": "RenderFlow Software Analytics"
keywords: ['render farm software comparison', 'plugin version comparison', 'render node version mismatch', 'render farm software audit', 'compare render node software']
---

Software Analytics gives your IT department or studio lead a single view to compare all installed applications and plugins across every connected node. It answers the question: is every machine on the farm running the same software?

## How it works

Open Software Analytics from the main toolbar. The interface presents a comparison table where each row is a software application or plugin and each column is a node.

Start by selecting a **base node**. This is the machine you consider the reference. Every other node is compared against it. Each cell in the table shows one of the following states.

**Match** means the software exists on the node. If the version also matches the base node, it is shown in green.

**Extra** means the node has a plugin or application that does not exist on the base node.

**Higher** means the version is newer than the base node.

**Lower** means the version is older than the base node.

**Missing** means the software is not installed on that node.

<Frame caption="Software Analytics comparison table with base node selected">
  <img src="/images/renderflow/rf_software_analytics_table.png" alt="Comparison table showing Match, Missing, Higher, and Lower states across nodes" />
</Frame>

## Why it matters

Version mismatches are one of the most common causes of render errors on a farm. An older V-Ray version on one node can produce different results or crash entirely on a scene saved with a newer version. A missing plugin means objects or effects disappear from the render.

Software Analytics makes these gaps visible before they cause problems. Instead of troubleshooting a failed render and discovering the issue was a missing plugin, you can proactively check and fix mismatches.

<Tip>
After a major software update cycle, select the first updated machine as the base node and quickly scan which other nodes still need updates.
</Tip>
