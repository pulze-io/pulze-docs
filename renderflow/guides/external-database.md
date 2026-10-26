---
title: "Your Own MongoDB"
description: "Run the farm on a MongoDB replica set your studio manages: set it up, connect the server, move an existing farm onto it and keep it backed up."
"og:title": "Run RenderFlow on Your Own MongoDB Replica Set"
"og:description": "Set up a MongoDB replica set for RenderFlow, connect the server to it, move an existing farm onto it, and fix the errors you are most likely to see."
"twitter:title": "Your Own MongoDB"
keywords: ['render farm mongodb', 'external mongodb render farm', 'mongodb replica set render farm', 'renderflow database', 'self-hosted mongodb', 'render farm database migration', 'mongodb connection string']
---

The RenderFlow server ships with its own MongoDB and runs it for you. A studio that already runs MongoDB, or wants the farm's data on a database server of its own, can point the server at a replica set it manages instead. Everything the farm stores moves to that database: jobs, users, settings and history. Hourly backups, farm exports and restores keep working.

## What you need

- A MongoDB **replica set**. A single server is fine, as long as it runs as a one-member replica set. RenderFlow relies on change streams, which a standalone MongoDB does not provide, so it refuses a connection string to one.
- MongoDB 8.2 is the version RenderFlow is tested with; it is the version the bundled database runs.
- The database reachable from the RenderFlow server on its port (27017 by default). Only the server connects to the database; render nodes and workstations never do.
- A database user for RenderFlow, if the database requires sign-in (see [Create the database user](#2-create-the-database-user)).

## 1. Set up the replica set

Skip this section if your MongoDB already runs as a replica set.

<Steps>
<Step title="Install MongoDB">
Install MongoDB Server 8.2 on the database machine. On Windows the installer registers it as the **MongoDB** service; on Linux it runs as the `mongod` service.
</Step>
<Step title="Name the replica set and open it to the network">
Edit the MongoDB configuration file: `C:\Program Files\MongoDB\Server\8.2\bin\mongod.cfg` on Windows, `/etc/mongod.conf` on Linux. Set the address it listens on and give the replica set a name:

```yaml
net:
  port: 27017
  bindIp: 0.0.0.0

replication:
  replSetName: rs0
```

`0.0.0.0` listens on every network interface. To listen on one only, list the machine's own address instead, for example `127.0.0.1,10.0.0.5`.

Restart the service: `Restart-Service MongoDB` on Windows, `sudo systemctl restart mongod` on Linux.
</Step>
<Step title="Start the replica set with the server's network address">
Open `mongosh` on the database machine and start the replica set. Use the hostname or IP address the RenderFlow server reaches this machine on:

```js
rs.initiate({ _id: "rs0", members: [{ _id: 0, host: "db01.studio.local:27017" }] })
```

<Warning>
Do not start it with a bare `rs.initiate()`, or with `localhost` as the member's host. A replica set tells every client which addresses its members have, and the RenderFlow server then connects to those. If the member is `localhost`, the server connects to its own machine, where no database runs. See [The replica set names its members localhost](#the-replica-set-names-its-members-localhost).
</Warning>

Check the result with `rs.status()`: the member should be listed with the address you gave and the state `PRIMARY`.
</Step>
</Steps>

## 2. Create the database user

A database that anyone on the network can open is not one to keep a studio's farm in. Create a user for RenderFlow and switch sign-in on.

<Steps>
<Step title="Create the users">
In `mongosh` on the database machine, create an administrator and the user RenderFlow signs in with:

```js
db.getSiblingDB("admin").createUser({ user: "admin", pwd: "choose-a-password", roles: ["root"] })
db.getSiblingDB("admin").createUser({
  user: "renderflow",
  pwd: "choose-another-password",
  roles: [
    { role: "readWrite", db: "renderflow" },
    { role: "readWrite", db: "renderflow_restore" }
  ]
})
```

`renderflow` is the farm's database. `renderflow_restore` is where a restore loads a backup before it replaces the farm, so the user needs it too. RenderFlow needs no other rights.
</Step>
<Step title="Switch sign-in on">
A replica set with sign-in needs a key file that its members use to recognise each other, even when it has only one member. Create it on the database machine:

<CodeGroup>
```powershell Windows
$bytes = New-Object byte[] 756; [Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($bytes)
[Convert]::ToBase64String($bytes) | Set-Content -NoNewline "C:\Program Files\MongoDB\keyfile"
```

```bash Linux
sudo openssl rand -base64 756 | sudo tee /etc/mongodb-keyfile > /dev/null
sudo chmod 400 /etc/mongodb-keyfile
sudo chown mongodb:mongodb /etc/mongodb-keyfile
```
</CodeGroup>

Add both settings to the configuration file and restart the service:

```yaml
security:
  authorization: enabled
  keyFile: /etc/mongodb-keyfile
```

On Windows, write the key file's Windows path, for example `C:\Program Files\MongoDB\keyfile`.
</Step>
</Steps>

## 3. Write the connection string

The connection string names the database machine, the replica set and, with sign-in on, the user:

```
mongodb://renderflow:choose-another-password@db01.studio.local:27017/?replicaSet=rs0&authSource=admin
```

- `replicaSet` is the name you gave the replica set.
- `authSource=admin` is where the user was created.
- A password with characters such as `@`, `:` or `/` in it must be written percent-encoded: `@` as `%40`, `:` as `%3A`, `/` as `%2F`.
- If the database requires TLS, add `&tls=true&tlsCAFile=<path to the CA certificate>`, with the path on the RenderFlow server. These are standard MongoDB connection-string options.

## 4. Connect the RenderFlow server

Choose one of the three ways below. In each, the server starts on the new database with an **empty farm**: no jobs, users or settings from the bundled database come with it. To keep them, export the farm first; see [Move an existing farm](#move-an-existing-farm).

### At install time

Add the connection string to the [silent install](/renderflow/getting-started/silent-deploy) of the server:

```bat
renderflow-2.0.19.0044-windows-x64.exe --silent --accept-eula --type=server --uri="mongodb://renderflow:choose-another-password@db01.studio.local:27017/?replicaSet=rs0&authSource=admin"
```

### In the app

<Steps>
<Step title="Open Settings → Server">
Switch **Database** on.
</Step>
<Step title="Enter the connection string">
Paste it into **Connection string** and press **Save**. Confirm the dialog.
</Step>
<Step title="Restart the service">
A **Restart required** message appears. Press **Restart now**. The server comes back on the new database, and every node and app reconnects on its own.
</Step>
</Steps>

### From the command line

On the server, stop the RenderFlow service, write the connection string with `rfsv config`, and start the service again. On Windows, in an administrator Command Prompt or PowerShell:

```bat
sc.exe stop RenderFlow
"C:\Program Files\Pulze\RenderFlow\rfsv.exe" config --uri="mongodb://renderflow:choose-another-password@db01.studio.local:27017/?replicaSet=rs0&authSource=admin"
sc.exe start RenderFlow
```

On Linux, the same with `sudo systemctl stop renderflow`, `/opt/Pulze/RenderFlow/rfsv config --uri="…"` and `sudo systemctl start renderflow`.

The connection string is stored on the server, so the service reads it again on every start.

## Move an existing farm

To keep the farm's jobs, users and settings, export the farm from the bundled database before you switch, and restore the export on the new database afterwards.

<Steps>
<Step title="Export the farm">
In **Settings → Backup**, open the **More** menu and choose **Export farm**. Enter a password twice and press **Export**, then choose where to save the file. The export holds the farm's secrets, encrypted with that password.
</Step>
<Step title="Connect the new database">
Follow one of the ways in [Connect the RenderFlow server](#4-connect-the-renderflow-server). The server restarts on the empty database.
</Step>
<Step title="Restore the export">
In **Settings → Backup**, open the **More** menu and choose **Restore from file**. Pick the export, enter its password and press **Restore**. The farm on the new database is replaced by the exported one, and the server's own machines keep their connection to it.
</Step>
<Step title="Turn maintenance mode off">
A restore leaves the farm in maintenance mode, with jobs that were running or queued suspended, so that nothing starts before you have looked. Check the farm, then turn maintenance mode off in **Settings → Server**.
</Step>
</Steps>

The same works from the command line on the server: `rfsv db export <file>` before the switch and `rfsv db restore <file>` after it. Both ask for the export's password, or read it from `RENDERFLOW_EXPORT_PASSWORD`.

## Backups

The server keeps backing up the farm on its own database: a backup every hour into the repository's `backups` folder, the last 24 hourly and 14 daily backups kept. They are listed in **Settings → Backup** and restore the same way as on the bundled database.

These backups hold the farm's database. Back up the MongoDB server itself the way your studio backs up its other database servers.

## Check that it worked

On the server, run:

```bat
"C:\Program Files\Pulze\RenderFlow\rfsv.exe" status
```

The **Database** line names the external database, with the password left out:

```
Database       external — mongodb://db01.studio.local:27017/?replicaSet=rs0&authSource=admin
```

In the app, **Settings → Server** shows **Database** switched on with the connection string.

## When it does not connect

The server says why on its error screen, in **Settings → Server** when you save, and in the service log (`C:\ProgramData\RenderFlow\logs` on Windows).

### The replica set names its members localhost

```
The external database db01.studio.local:27017 answers, but its replica set names its members localhost:27017: reconfigure it with that server's address (rs.reconfig).
```

The replica set was started without the database machine's network address, so it sends the RenderFlow server back to its own machine. In the service log this also appears as `connect ECONNREFUSED 127.0.0.1:27017, connect ECONNREFUSED ::1:27017`. Fix it on the database machine, in `mongosh`:

```js
cfg = rs.conf()
cfg.members[0].host = "db01.studio.local:27017"
rs.reconfig(cfg)
```

Then restart the RenderFlow service.

### The database is not a replica set

```
The database is not a replica set — change streams require one
```

RenderFlow says this when you save a connection string to a MongoDB that runs as a standalone server. Give it a replica set name and start the replica set, as in [Set up the replica set](#1-set-up-the-replica-set), then save the connection string again.

### The database did not answer

```
The external database did not answer — it is not running, or the connection is blocked by a firewall
```

The RenderFlow server cannot reach the database machine. Check that the MongoDB service runs, that `bindIp` includes an address the server can reach, and that the database machine's firewall allows the RenderFlow server in on port 27017.

### The database refused the sign-in

```
The external database refused the sign-in: check the user, the password and authSource in the connection string.
```

The user name, the password or `authSource` in the connection string does not match the user on the database. A password with special characters must be percent-encoded in the connection string.

## Go back to the bundled database

In **Settings → Server**, switch **Database** off, press **Save** and then **Restart now**. The server starts its bundled database again. To take the farm with it, export it from the external database first and restore the export afterwards, as in [Move an existing farm](#move-an-existing-farm).
