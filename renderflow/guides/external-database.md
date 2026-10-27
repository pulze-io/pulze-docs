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
  pwd: "password",
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
</Step>
</Steps>

## 3. Write the connection string

The connection string names the database machine, the replica set and the user:

```
mongodb://renderflow:<password>@db01.studio.local:27017/?replicaSet=rs0&authSource=admin
```

- Replace `<password>` with the password of the `renderflow` user, and `db01.studio.local` with your database machine.
- `replicaSet` is the name you gave the replica set.
- `authSource=admin` is where the user was created.
- A password with characters such as `@`, `:` or `/` in it must be written percent-encoded: `@` as `%40`, `:` as `%3A`, `/` as `%2F`.
- If the database requires TLS, add `&tls=true&tlsCAFile=<path to the CA certificate>`, with the path on the RenderFlow server.

## 4. Connect the RenderFlow server

Choose one of the three ways below. In each, the server starts on the new database with an **empty farm**: no jobs, users or settings from the bundled database come with it. To keep them, export the farm first; see [Move an existing farm](#move-an-existing-farm).

### At install time

Add the connection string to the [silent install](/renderflow/getting-started/silent-deploy) of the server:

```bat
renderflow-2.0.19.0044-windows-x64.exe --silent --accept-eula --type=server --uri="mongodb://renderflow:<password>@db01.studio.local:27017/?replicaSet=rs0&authSource=admin"
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

On the server, stop the RenderFlow service, write the connection string with `rfsv config`, and start the service again.

<Tabs>
<Tab title="Windows">

In an administrator Command Prompt or PowerShell:

```bat
sc stop RenderFlow
rfsv config --uri="mongodb://renderflow:<password>@db01.studio.local:27017/?replicaSet=rs0&authSource=admin"
sc start RenderFlow
```

</Tab>
<Tab title="Linux">

In a terminal, as a user who can run `sudo`:

```bash
sudo systemctl stop renderflow
sudo /opt/Pulze/RenderFlow/rfsv config --uri="mongodb://renderflow:<password>@db01.studio.local:27017/?replicaSet=rs0&authSource=admin"
sudo systemctl start renderflow
```

</Tab>
</Tabs>

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

## Check that it worked

On the server, run:

```bat
"C:\Program Files\Pulze\RenderFlow\rfsv.exe" status
```

The **Database** line names the external database, with the password left out:

```
Database external — mongodb://db01.studio.local:27017/?replicaSet=rs0&authSource=admin
```

In the app, **Settings → Server** shows **Database** switched on with the connection string.from

## Go back to the bundled database

In **Settings → Server**, switch **Database** off, press **Save** and then **Restart now**. The server starts its bundled database again. To take the farm with it, export it from the external database first and restore the export afterwards, as in [Move an existing farm](#move-an-existing-farm).
