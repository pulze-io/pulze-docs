---
title: "Collecting Logs"
description: "How to gather diagnostic logs from RenderFlow for troubleshooting. Use the built-in Error Report Collector or find log files manually on server and nodes."
"og:title": "Collecting RenderFlow Logs"
"og:description": "Gather diagnostic logs from RenderFlow using the built-in Error Report Collector or by collecting log files manually from render nodes."
"twitter:title": "Collecting RenderFlow Logs"
keywords: ['render farm logs', 'collect render farm logs', 'render farm debugging', 'render node log location']
---

When reporting an issue, the most important thing you can provide alongside a description is a log file from RenderFlow. There are several ways to collect logs.

## Error Report Collector

RenderFlow includes a built-in tool that gathers logs from multiple computers at once. Go to **Menu > Support > Error Report Collector**.

In the popup, select the nodes you are having issues with. Optionally, if the issue is related to specific jobs, select those as well. This helps our support team narrow down the problem.

Press **Collect** and RenderFlow will gather all relevant information and create an archive file. Send this file to support through any of the channels listed on the [Report an Issue](/renderflow/support/report-an-issue) page.

<Frame caption="Error Report Collector with node and job selection">
  <img src="/images/renderflow/rf_support_error_report_collector.png" alt="Error Report Collector popup showing node and job selection" />
</Frame>

## Collecting logs manually

If the Error Report Collector is not available or does not work in your situation, you can collect log files manually from each render node and workstation. RenderFlow writes its logs to the data folder, which differs by operating system:

| OS | Logs folder |
|----|-------------|
| Windows | `C:\ProgramData\RenderFlow\logs\` |
| macOS | `~/Library/Logs/RenderFlow/` |
| Linux | `/var/log/RenderFlow/` |

The same log files are written on every platform:

| Description | Filename |
|-------------|----------|
| General service log | `service-YYYY-MM-DD.log` |
| Database log | `database-YYYY-MM-DD.log` |
| Job logs | `<jobid>.log` |

Copy the relevant files, review them, or send them directly to support.

## Reading logs in the UI

You can view your computer's logs directly inside RenderFlow. Go to **Menu > Support > Open Logs** to open the service log viewer.

For job-specific logs, open the job details and click **Open Logs** in the Nodes section. The log viewer supports filtering, text selection, copying, and saving to a separate file.

<Frame caption="Job log viewer with filtering and save options">
  <img src="/images/renderflow/rf_support_job_log_viewer.png" alt="Log viewer showing job render logs with filter and save options" />
</Frame>

<Info>
Per the RenderFlow EULA (section 14.2), all files received by the support team are stored securely, used only for debugging purposes, and deleted after 90 days.
</Info>
