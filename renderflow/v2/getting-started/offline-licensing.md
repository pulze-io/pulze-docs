---
title: "Offline Licensing"
description: "License a RenderFlow server that has no internet access with a license file from Pulze."
"og:title": "RenderFlow Offline Licensing"
"og:description": "Run a RenderFlow farm in an air-gapped network with a signed license file instead of a Pulze account sign-in."
"twitter:title": "RenderFlow Offline Licensing"
keywords: ['render farm offline license', 'air-gapped render farm', 'render farm without internet', 'RenderFlow license file', 'offline activation render farm', 'RenderFlow Enterprise license']
---

Offline licensing runs a RenderFlow server with no route to the internet. Instead of signing in to a Pulze account, the server holds a license file from Pulze that lists its seats and the machine it was issued for. Offline licensing is part of RenderFlow Enterprise. [Contact support](mailto:support@pulze.io) to set it up for your studio.

Only the server holds the license. Render nodes and workstations join the server as usual and take their seats from it.

## What you need

- RenderFlow installed on the server, with the service stopped.
- A terminal on the server: an administrator PowerShell on Windows, or the account the RenderFlow service runs as on Linux and macOS.

## Request a license

<Steps>
<Step title="Create the request file">

Run `rfsv license request` on the server.

<Tabs>
<Tab title="Windows">

```powershell
& "C:\Program Files\Pulze\RenderFlow\rfsv.exe" license request
```

</Tab>
<Tab title="Linux">

```bash
/opt/Pulze/RenderFlow/rfsv license request
```

</Tab>
<Tab title="macOS">

```bash
/Applications/Pulze/RenderFlow/rfsv license request
```

</Tab>
</Tabs>

RenderFlow writes `renderflow-<machine name>.req` to the current folder and prints the machine name, hardware ID and network adapter that the license will be issued for.

<Frame caption="A license request created on the server">
  <img src="/images/renderflow/v2/rf_cli_license_request.webp" alt="A terminal after rfsv license request, showing the path of the request file and the machine name, hardware ID and network adapter it was created for" />
</Frame>

</Step>
<Step title="Send the request to Pulze">

Email the `.req` file to [support@pulze.io](mailto:support@pulze.io). Pulze sends back a license file, `renderflow-<machine name>.lic`.

</Step>
</Steps>

## Apply the license

<Steps>
<Step title="Import the license file">

With the service stopped, run `rfsv license import` with the file Pulze sent you, for example on Linux:

```bash
/opt/Pulze/RenderFlow/rfsv license import renderflow-render-server.lic
```

RenderFlow prints `Licence applied` with your studio's name and the number of seats. While the service is running, the command refuses and points you to **Settings → Subscription** instead.

</Step>
<Step title="Check the license">

Run `rfsv license status`. It prints the customer, the seats, the license ID and the expiry date.

<Frame caption="The license applied and its status">
  <img src="/images/renderflow/v2/rf_cli_license_import.webp" alt="A terminal showing rfsv license import reporting the license applied for Northlight VFX with 30 seats, followed by rfsv license status reporting a valid license and its expiry date" />
</Frame>

</Step>
<Step title="Start the server">

Start the RenderFlow service, or open the desktop app on the server. The setup wizard no longer asks you to sign in to Pulze, and the nodes that join take their seats from the license.

</Step>
</Steps>

## Renew the license

When Pulze sends you a new license file, open **Settings → Subscription** on the server, press **Apply license** and choose the `.lic` file. The service applies it straight away, with no restart.

The **Offline** panel shows the seats the license holds, how many are in use, how many are free and when the license expires.

<Frame caption="An offline license in Settings → Subscription">
  <img src="/images/renderflow/v2/rf_settings_subscription_offline.webp" alt="The Subscription settings page showing the Offline panel with 30 seats, 0 in use, 30 free and an expiry date, with the Apply license and Remove license buttons" />
</Frame>

**Grace period.** A license keeps working for its grace period after its expiry date, 30 days unless your license states another, and during the grace period the **Offline** panel shows a warning with the expiry date. The server checks the license when it starts and once a day after that, and the first check after the grace period has ended stops it handing out seats: every machine stops rendering until a new license is applied.

**Upgrades.** A license can carry a maintenance period. A RenderFlow release built after that period ends does not accept the license, so ask Pulze for a renewed license before you upgrade the server past it.

## Replacing the server's hardware

The license is issued for the server's hardware ID together with its machine name or its network adapter. Renaming the server, or replacing its network card, keeps the license working as long as the other one stays the same. A new motherboard or a new server machine needs a new license: run `rfsv license request` on that machine and send the new request to Pulze.

## Switch back to a Pulze account

To license the farm through a Pulze account again, open **Settings → Subscription**, press **Remove license** and confirm with **Remove**.

<Frame caption="Removing the offline license">
  <img src="/images/renderflow/v2/rf_settings_subscription_remove.webp" alt="The confirmation dialog for removing the offline license, explaining that every machine stops rendering until the server signs in to a Pulze account and its licenses are synced" />
</Frame>

<Warning>
Every machine stops rendering until the server signs in under **Settings → Account** and its licenses are synced. From then on the server needs access to `*.pulze.io`, see [Internet access](/renderflow/v2/getting-started/requirements#internet-access).
</Warning>

With the service stopped, `rfsv license remove` does the same from a terminal.

## Next steps

- [System Requirements](/renderflow/v2/getting-started/requirements): ports, firewall and internet access
- [Run as a Service](/renderflow/v2/getting-started/run-as-a-service): start the server on boot
