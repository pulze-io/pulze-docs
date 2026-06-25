---
title: "Bring Your Own MongoDB"
sidebarTitle: "Custom MongoDB"
description: "Run RenderFlow on your own MongoDB version by replacing the bundled binaries — for IT teams that need the latest releases and tight security tracking."
"og:title": "Run RenderFlow with Your Own MongoDB Version"
"og:description": "Replace RenderFlow's bundled MongoDB binaries with an official build of your chosen version. Requirements, step-by-step per OS, and safe upgrade paths."
"twitter:title": "RenderFlow Custom MongoDB"
keywords: ['RenderFlow custom MongoDB', 'bring your own MongoDB', 'upgrade MongoDB render farm', 'replace MongoDB binaries', 'MongoDB version RenderFlow', 'self-hosted MongoDB render farm']
---

RenderFlow ships with its own copy of MongoDB and manages it for you — the server starts and runs the database automatically. You never have to install or administer MongoDB yourself.

Some teams need more control. If your IT or security policy requires running the **latest MongoDB release** and tracking it closely for patches and CVEs, you can replace RenderFlow's bundled MongoDB binaries with an official build of your chosen version. RenderFlow keeps managing the database lifecycle exactly as before — it just runs on the binaries you provide.

<Info>
MongoDB runs **only on the server node**. Render nodes and workstations connect to the server and never run a database, so this procedure applies to the server machine only.
</Info>

## When to use this

- Your security team requires the newest MongoDB release rather than the version bundled with RenderFlow.
- You need to apply MongoDB security patches on your own schedule, independently of RenderFlow updates.
- You have a compliance requirement to inventory and track the exact MongoDB build in use.

If none of these apply, stay on the bundled MongoDB — it's tested with each RenderFlow release and requires no maintenance.

## Render nodes and workstations don't need MongoDB

The installer ships the MongoDB binaries to every machine, but only the **server** ever runs them. Render nodes and workstations connect to the server's database over the network and never start `mongod`.

If your security policy doesn't allow the MongoDB binaries to remain on non-server machines, you can safely **delete the entire `resources/mongo` folder** on render nodes and workstations:

| OS | Folder to delete (on nodes/workstations only) |
|----|-----------------------------------------------|
| Windows | `C:\Program Files\Pulze\RenderFlow\resources\mongo` |
| macOS | `/Applications/Pulze/RenderFlow/resources/mongo` |
| Linux | `/opt/Pulze/RenderFlow/resources/mongo` |

## Requirements

The build you bring must be an official **MongoDB Community Server** download that matches your server.

| Requirement | Detail |
|-------------|--------|
| Edition | Official MongoDB **Community Server** |
| Version | **MongoDB 8.x** — the latest 8.x patch release is fine |
| Platform & architecture | Must match the server's OS and CPU architecture (e.g. Windows x64, Linux x64, macOS ARM64) |
| Companion tools | Bring matching **MongoDB Shell (`mongosh`)** and **MongoDB Database Tools** (`mongodump`, `mongorestore`) alongside the server |

## Locate the MongoDB files

The bundled binaries live under `resources/mongo` inside the RenderFlow installation folder:

| OS | Path |
|----|------|
| Windows | `C:\Program Files\Pulze\RenderFlow\resources\mongo` |
| macOS | `/Applications/Pulze/RenderFlow/resources/mongo` |
| Linux | `/opt/Pulze/RenderFlow/resources/mongo` |

Inside that folder, the layout is:

```
resources/mongo/
├── 8/                  # mongod for major version 8 (the version RenderFlow runs)
│   └── mongod(.exe)
├── 6/                  # mongod for major version 6 (legacy, used only for migration)
│   └── mongod(.exe)
├── mongosh(.exe)       # MongoDB Shell
├── mongodump(.exe)     # Database Tools
└── mongorestore(.exe)  # Database Tools
```

The **server binary (`mongod`)** lives in a folder named after its major version (`8/`). The **shell and database tools** live directly in the `resources/mongo` root. On Windows, `mongosh.exe` is accompanied by `mongosh_crypt_v1.dll` — keep them together. On Linux, an `lib/` folder ships OpenSSL 1.1 libraries for the bundled build.

## Replace the binaries

<Warning>
Before you start, **back up your database directory** at `C:\ProgramData\RenderFlow\data`. Stay within the same major version — MongoDB does not support skipping major versions or downgrading data files in place.
</Warning>

Stop RenderFlow on the server before you begin — the database binaries are locked while it's running. Start it again once you've finished.

### Step 1: Download the official binaries

From the [MongoDB Community download page](https://www.mongodb.com/try/download/community), download the version you want for your server's OS and architecture:

- **MongoDB Community Server** — provides `mongod`
- **MongoDB Shell (`mongosh`)**
- **MongoDB Database Tools** — provides `mongodump` and `mongorestore`

### Step 2: Replace the files

Swap the bundled binaries for the ones you downloaded, keeping the same folder layout:

- Replace **`resources/mongo/8/mongod`** (`mongod.exe` on Windows) with your new server binary. Staying within major 8 keeps the folder name and your existing data directory valid.
- Replace **`mongosh`**, **`mongodump`**, and **`mongorestore`** in the `resources/mongo` root.

<Tabs>
  <Tab title="Windows">
    Copy the new `mongod.exe` into `resources\mongo\8\`, and the new `mongosh.exe`, `mongodump.exe`, and `mongorestore.exe` into `resources\mongo\`. Include the matching `mongosh_crypt_v1.dll` next to `mongosh.exe`.

    Replacing these files does **not** affect RenderFlow's code signature — the MongoDB binaries are not part of the signed set.
  </Tab>
  <Tab title="macOS">
    ```bash
    cd "/Applications/Pulze/RenderFlow/resources/mongo"
    # Copy in the new mongod (into 8/) and mongosh / mongodump / mongorestore (into the root),
    # then restore the executable bit:
    chmod +x 8/mongod mongosh mongodump mongorestore
    ```
  </Tab>
  <Tab title="Linux">
    ```bash
    cd /opt/Pulze/RenderFlow/resources/mongo
    # Copy in the new mongod (into 8/) and mongosh / mongodump / mongorestore (into the root),
    # then restore the executable bit:
    sudo chmod +x 8/mongod mongosh mongodump mongorestore
    ```
    A MongoDB build for a modern distribution links the system OpenSSL 3, so it does not need the bundled `resources/mongo/lib` OpenSSL 1.1 libraries. You can leave that folder in place — it is harmless and ignored.
  </Tab>
</Tabs>

### Step 3: Verify

On the next start, the server launches your `mongod`. Confirm success in the service log — you should see lines such as:

```
Starting database...
... Waiting for connections
Database started successfully
```

RenderFlow records the active major version in `C:\ProgramData\RenderFlow\data\mongo.json`. Your jobs, settings, and history are preserved.

## Rolling back

If the new version doesn't start or behaves unexpectedly:

1. Stop RenderFlow.
2. Restore the previous `mongod`, `mongosh`, and database tools binaries.
3. Restore your `C:\ProgramData\RenderFlow\data` backup if the data directory was modified.
4. Start RenderFlow again.

## Next steps

- [Installation](/renderflow/getting-started/installation): full server, node, and workstation setup
- [Run as a Service](/renderflow/getting-started/run-as-a-service): run the server headless and on boot
- [Network Setup](/renderflow/getting-started/network-setup): shared storage and UNC paths
- [Requirements](/renderflow/getting-started/requirements): supported platforms and hardware
