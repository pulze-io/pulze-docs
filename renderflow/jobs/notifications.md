---
title: "Notifications"
description: "Get notified when render jobs complete via email, desktop alerts, Slack, Microsoft Teams, or custom webhooks. Configure multiple channels per job."
"og:title": "RenderFlow Job Notifications"
"og:description": "Configure RenderFlow to notify you when render jobs complete, with support for email, Slack, Microsoft Teams, desktop alerts, and custom webhooks."
"twitter:title": "RenderFlow Job Notifications"
keywords: ['render farm notifications', 'render complete alert', 'render farm Slack notification', 'render farm Teams webhook', 'render job email alert', 'render farm webhook integration']
---

RenderFlow can send notifications when a job completes. You configure notifications per job in the [Submitter](/renderflow/jobs/submitter), and each job can have multiple notifications across different channels.

<Info>
Currently, only job completion triggers notifications. Support for additional events (job failed, node offline, etc.) is planned.
</Info>

## Available channels

RenderFlow supports the following notification channels.

<Frame caption="Notification section in the Submitter with multiple channels configured">
  <img src="/images/renderflow/rf_jobs_notification_submitter.png" alt="Submitter notification options showing email, Slack, and webhook selections" />
</Frame>

## Email

When a job completes, RenderFlow sends an email with the job name, filename, output path, and frame range. The email includes a link that opens RenderFlow directly to the completed job (requires RenderFlow to be installed on the machine where you click the link).

No SMTP setup is required. Emails are sent automatically from `notifications@renderflow.com`.

To avoid entering your email address every time you submit, go to **Settings > Users** and fill in your email. It will be pre-populated in the Submitter automatically.

## Desktop

Desktop notifications use the native Windows notification system. When selected in the Submitter, the notification is always sent to your own computer. You cannot send desktop notifications to other users' machines. Clicking the notification opens RenderFlow and highlights the completed job.

## Slack

Slack integration uses incoming webhooks. To set it up:

1. Create an Incoming Webhook in your Slack workspace by following [Slack's webhook guide](https://docs.slack.dev/messaging/sending-messages-using-incoming-webhooks).
2. In RenderFlow, go to **Settings > Integrations**, create a new integration, select **Slack** from the dropdown, paste the webhook URL, name your integration, and save.

You can create multiple Slack integrations for different channels or teams.

## Teams

Microsoft Teams integration also uses incoming webhooks. To set it up:

1. Create an Incoming Webhook in your Teams channel by following [Microsoft's webhook guide](https://learn.microsoft.com/en-us/microsoftteams/platform/webhooks-and-connectors/how-to/add-incoming-webhook).
2. In RenderFlow, go to **Settings > Integrations**, create a new integration, select **Teams**, paste the webhook URL, name it, and save.

## Webhook

For custom integrations, you can set up a raw webhook that sends a JSON payload with all job details when a job completes. This works with any service that accepts HTTP webhooks: Zapier, n8n, Make, or your own internal tools.

Configure the webhook URL in **Settings > Integrations**, and it will be available for selection in the Submitter.

<Frame caption="Integration settings page for Slack, Teams, and Webhook">
  <img src="/images/renderflow/rf_settings_integrations.png" alt="Settings > Integrations showing configured Slack and webhook integrations" />
</Frame>
