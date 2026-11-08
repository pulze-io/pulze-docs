---
title: "Report an Issue"
description: "Send us a RenderFlow problem with a support package, so we can fix it fast."
"og:title": "Report a RenderFlow Issue"
"og:description": "Send us a RenderFlow problem with a support package, so we can fix it fast."
"twitter:title": "Report a RenderFlow Issue"
keywords: ['render farm support', 'report render farm bug', 'RenderFlow support', 'RenderFlow support package', 'render farm logs']
---

Something broke? Send us a report with a support package and we can usually see the cause straight away.

## 1. Make a support package

Open **Menu → Support → Error report collector**.

1. Pick the machines that have the problem, then press **Next**.
2. Pick the jobs it concerns, if any, then press **Collect**.

<Frame>
  <img src="/images/renderflow/v2/rf_support_error_report_collector.webp" alt="The Error report collector, picking the machines to collect from" />
</Frame>

RenderFlow puts one package in the repository's `support` folder and shows you its path. It holds the logs, system information and the farm's settings, with passwords and keys removed. Nothing is sent until you send it.

## 2. Send it

| Use | When |
|-----|------|
| **Submit a ticket** (Menu → Support, or [forms.pulze.io/submit-ticket](https://forms.pulze.io/submit-ticket)) | Anything you need fixed. You get a tracked ticket. |
| [support@pulze.io](mailto:support@pulze.io) | When a ticket doesn't suit, or to add files to one. |
| [Discord](https://discord.gg/BxtBs9aN4E) | Quick questions and how-to. Don't post support packages there. |

## 3. Tell us

- What you did, what happened, and what you expected
- The job and its application, or the machines, it happened on
- Whether it happens every time

<Info>
Support packages are used only to solve your issue and are deleted within 90 days, as the RenderFlow licence agreement (section 15) describes.
</Info>

### Can't run the collector?

Copy the logs folder from each affected machine and attach it instead:

| OS | Logs folder |
|----|-------------|
| Windows | `C:\ProgramData\RenderFlow\logs\` |
| macOS | `~/Library/Logs/RenderFlow/` |
| Linux | `/var/log/RenderFlow/` |
