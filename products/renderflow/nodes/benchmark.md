---
title: "Benchmark"
description: "RenderFlow estimates render performance for each node by checking hardware against public benchmark databases. Compare V-Ray, Corona, and Cinebench scores."
"og:title": "RenderFlow Node Benchmarks"
"og:description": "RenderFlow estimates render performance for each node by checking hardware against public benchmark databases. Compare V-Ray, Corona, Blender, and Cinebench scores across your farm."
"twitter:title": "RenderFlow Node Benchmarks"
keywords: ['render node benchmark', 'render farm performance ranking', 'V-Ray benchmark score', 'Corona benchmark render farm', 'compare render node speed']
---

RenderFlow checks each node's CPU and GPU against publicly available benchmark databases and provides estimated performance scores. These scores help you understand the relative speed of each machine in your farm.

## Available scores

Estimated scores are provided for V-Ray CPU, Blender, Corona, and Cinebench. These are best-guess estimates based on the detected hardware, not actual benchmark runs on the machine.

## How scores are used

Benchmark scores feed into the statistics section where you can review the performance ranking of all nodes in your farm. This helps you identify your fastest and slowest machines, which is useful when planning hardware upgrades or deciding which nodes to assign to time-critical jobs.

<Info>
On-demand benchmarking (running actual render tests on each node) is planned for a future release.
</Info>

<Frame caption="Benchmark scores for a node showing estimated V-Ray, Corona, and Cinebench performance">
  <img src="https://placehold.co/900x500?text=Node+benchmark+scores" alt="Benchmark panel with estimated scores for V-Ray, Blender, Corona, and Cinebench" />
</Frame>
