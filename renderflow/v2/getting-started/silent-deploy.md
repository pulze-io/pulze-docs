---
title: "Silent Deployment"
description: "Install and configure RenderFlow 2 without touching each machine: installer flags, rfsv config, environment variables, and signing in a headless server over SSH."
"og:title": "Silent RenderFlow 2 Deployment"
"og:description": "Deploy RenderFlow 2 across a fleet from a script: silent installer flags, rfsv config, environment variables, and headless server setup over SSH."
"twitter:title": "Silent RenderFlow 2 Deployment"
keywords: ['silent install render farm', 'unattended render node deployment', 'deploy render farm script', 'rfsv config flags', 'headless render farm setup', 'render farm SSH setup', 'RenderFlow silent install']
---

Everything the setup wizard asks can be answered on the command line instead. The installer lands the files and hands its flags to `rfsv config`, which layers them over whatever the machine already holds, so any flag you leave out keeps its current value rather than being reset.

<Note>
Installing and configuring a machine does not start it. A workstation is started by the desktop app at user login, while an unattended machine needs the service registered — a deliberate second step, because that is where you choose the account the service runs as. Finish a headless deployment with [Run as a Service](/renderflow/v2/getting-started/run-as-a-service).
</Note>

## Installer flags

The same flags work on every platform.

| Flag | What it does |
|------|--------------|
| `--silent` | Silent installation. Windows only |
| `--accept-eula` | Accept the licence agreement |
| `--type=<role>` | `server`, `node` or `workstation` |
| `--server=<host>` | Address of the server to join. Node and workstation only |
| `--repository=<path>` | The shared network folder. Server only |
| `--pool=<name>` | Pool this machine is placed in when it first registers |
| `--uri=<conn>` | External MongoDB connection string, which must be a replica set. Server only |
| `--proxy-host=<host>` | Outbound proxy host |
| `--proxy-port=<port>` | Proxy port |
| `--proxy-user=<user>` | Proxy username |
| `--proxy-pass=<pass>` | Proxy password |
| `--proxy-bypass=<list>` | Hosts that are never proxied (exact, or `.suffix`) |
| `--tls` | Serve all farm communication over HTTPS. Needs `--tls-cert` and `--tls-key` |
| `--tls-cert=<path>` | Server certificate (PEM) |
| `--tls-key=<path>` | Its private key (PEM) |
| `--tls-ca=<path>` | CA to validate the server against, when it is not publicly trusted |
| `--tls-port=<port>` | Port of the HTTPS listener, default 44445. Server only |
| `--server-tls` | The server answers over TLS, which `--server=https://host` also says. Node and workstation only |

`--help` prints this list and exits.

## Examples

<Tabs>
<Tab title="Windows">

A server with a shared folder:

```powershell
renderflow-2.0.0-windows-x64.exe --silent --accept-eula --type=server --repository=\\NAS\renderflow
```

A render node, placed straight into a named pool:

```powershell
renderflow-2.0.0-windows-x64.exe --silent --accept-eula --type=node --server=10.11.30.40 --pool=gpu
```

A node behind a proxy:

```powershell
renderflow-2.0.0-windows-x64.exe --silent --accept-eula --type=node --server=render01 --proxy-host=proxy.studio --proxy-port=3128
```

<Warning>
`--silent` without `--accept-eula` fails with error level 3. A silent install shows no licence page, and the installer will not accept on your behalf.
</Warning>

</Tab>
<Tab title="Linux and macOS">

```bash
sudo ./install.sh --accept-eula --type=server --repository=//NAS/renderflow
sudo ./install.sh --accept-eula --type=node --server=10.11.30.40 --pool=gpu
```

`install.sh` requires root but never calls `sudo` itself, so run it as `sudo ./install.sh`. A container or a deployment tool already running as root installs it the same way.

</Tab>
</Tabs>

## Configure a machine after installing

`rfsv config` applies the same answers to a machine that is already installed:

```bash
rfsv config --type=node --ip=10.11.30.40 --pool=gpu
```

Every flag has an environment variable behind it, which is usually what a service definition or a container image sets instead:

| Flag | Environment variable |
|------|----------------------|
| `--type` | `RENDERFLOW_TYPE` |
| `--ip` | `RENDERFLOW_IP` |
| `--server-tls` | `RENDERFLOW_SERVER_TLS` |
| `--repository` | `RENDERFLOW_REPOSITORY_PATH` |
| `--pool` | `RENDERFLOW_POOL` |
| `--uri` | `RENDERFLOW_DB_URI` |
| `--proxy-host` | `RENDERFLOW_PROXY_HOST` |
| `--proxy-port` | `RENDERFLOW_PROXY_PORT` |
| `--proxy-user` | `RENDERFLOW_PROXY_USER` |
| `--proxy-pass` | `RENDERFLOW_PROXY_PASS` |
| `--proxy-bypass` | `RENDERFLOW_PROXY_BYPASS` |
| `--tls` | `RENDERFLOW_TLS` |
| `--tls-cert` | `RENDERFLOW_TLS_CERT` |
| `--tls-key` | `RENDERFLOW_TLS_KEY` |
| `--tls-ca` | `RENDERFLOW_TLS_CA` |
| `--tls-port` | `RENDERFLOW_TLS_PORT` |

The installer's `--server` reaches `rfsv config` as `--ip`; both set the same value. Add `--json` for machine-readable output. Note that `rfsv config` refuses to run while the service is running, so stop the service first.

## Signing in a headless server

A server has to sign in to Pulze once, and `rfsv config` handles that over SSH:

```bash
ssh admin@render-server
rfsv config
```

At the sign-in step it prints a link, a short code and the same link as a QR code, and any one of the three completes it: open the link on your own machine, type the code into a browser that is already open, or scan the QR code with a phone. The wizard waits for the sign-in to land and then carries on with the remaining questions — the agreement, the role, the server address on a machine that joins one, and the repository on a server.

<Frame caption="The sign-in step of rfsv config">
  <img src="/images/renderflow/v2/rf_cli_signin.webp" alt="A terminal at the rfsv config sign-in step, showing the activation link, the matching short code and the same link as a QR code" />
</Frame>

<Note>
Pool, external database, proxy and TLS are flags only; the `rfsv config` wizard never asks about them, on the grounds that a provisioning script sets them and an operator at a terminal almost never changes them.
</Note>

## Accepting the licence agreement

A headless machine cannot be asked, so the agreement has to be accepted before it will start:

```bash
rfsv eula --accept
```

`--accept-eula` on the installer does the same thing at install time, and without one of the two `start.sh --headless` refuses to start. Running `rfsv eula` on its own prints what this machine accepted; it exits non-zero only when nothing has ever been accepted, since an agreement that is merely out of date never stops a node.

## Verifying a deployment

```bash
rfsv status --json
```

This reports the role, the server, the repository, the account, whether the machine has joined the farm and whether the service is running. On a machine you know you configured correctly, `running: false` with no node key is the signature of a service that was never registered.

## Resetting a machine

```bash
rfsv reset --yes
```

This clears the configuration, the secure store and the desktop app's cache while leaving the database and the logs alone; adding `--database` deletes the database too, which on a server is the farm's entire history. Your acceptance of the licence agreement survives a reset either way.

<Warning>
A machine that is reset while the server still holds its old record rejoins as a stranger. After wiping a farm's database, restart the service on every machine so that each one enrolls again.
</Warning>

## Next steps

- [Run as a Service](/renderflow/v2/getting-started/run-as-a-service) — the step that makes a headless machine render
- [Server and Nodes](/renderflow/v2/getting-started/server-and-nodes) — the same farm, set up through the app
