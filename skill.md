---
name: pulze
description: Pulze documentation for Scene Manager, RenderFlow, and Project Dream. Use when answering questions about Pulze products, render farm management, scene organization in 3ds Max, distributed rendering, job submission, node management, or the RenderFlow API.
metadata:
  author: pulze
  version: "2.0.20"
---

# Pulze Documentation

Pulze builds tools for 3D artists and studios. This skill covers three products:

## Products

### Scene Manager
A 3ds Max plugin for organizing and managing scenes with per-setup control over cameras, lighting, rendering, and more. Supports batch rendering, bake setups, and RenderFlow integration.

#### Getting Started
- Overview: /scene-manager
- Installation: /scene-manager/installation

#### Modules
- Managing Setups: /scene-manager/setups
- Camera & Framing: /scene-manager/camera-and-framing
- Lighting & Environment: /scene-manager/lighting
- Scene Control: /scene-manager/scene-control
- Render Settings: /scene-manager/rendering
- Scripting: /scene-manager/scripting
- Misc (Thumbnail, Notes, Todo): /scene-manager/misc

#### Workflows
- Bake Setups: /scene-manager/bake-setups

#### Settings
- Preferences: /scene-manager/settings

#### Reference
- Changelog: /scene-manager/changelog

### RenderFlow
Render farm management software. Submit jobs, manage nodes, monitor progress, and automate rendering workflows across machines.

#### Getting Started
- Introduction: /renderflow/introduction
- Quick Start: /renderflow/getting-started/quick-start
- System Requirements: /renderflow/getting-started/requirements
- Supported Applications (versions, render engines, steps and platforms for every application): /renderflow/getting-started/supported-apps
- Installation: /renderflow/getting-started/installation
- Other ways to install (curl or PowerShell from the farm server): /renderflow/getting-started/installation#other-ways-to-install
- Server and Nodes: /renderflow/getting-started/server-and-nodes
- Silent Deployment: /renderflow/getting-started/silent-deploy
- Run as a Service: /renderflow/getting-started/run-as-a-service
- Offline Licensing (Enterprise, a server with no internet access): /renderflow/getting-started/offline-licensing
- Migrating (from RenderFlow 1 or Render Manager): /renderflow/getting-started/migrating

#### Guides
Walkthroughs for one workflow from start to finish.
- Unreal and Perforce (sync Unreal projects from Perforce on every node, checked-out files shelved for the job): /renderflow/guides/unreal-and-perforce
- Deploy RenderFlow Versions (update every machine from Settings → Deploy): /renderflow/guides/deploy
- Backup, Restore and Moving the Server: /renderflow/guides/backup-and-restore
- Your Own MongoDB: /renderflow/guides/external-database

#### Scripting
- Overview: /renderflow/scripting/overview
- Shell steps: /renderflow/scripting/shell-steps
- Python steps: /renderflow/scripting/python-steps
- rf module reference: /renderflow/scripting/rf-reference
- Plugins: /renderflow/scripting/plugins

#### Developers
- Overview: /renderflow/developers/overview
- Authentication: /renderflow/developers/authentication
- REST API: /renderflow/developers/rest-api
- TypeScript SDK (`@pulze-io/renderflow`): /renderflow/developers/typescript-sdk
- Python SDK (`pulze-renderflow`, no dependencies, imports inside Maya and Houdini): /renderflow/developers/python-sdk
- CLI (`rfcli`): /renderflow/developers/cli
- Live updates over WebSocket: /renderflow/developers/websocket
- Webhooks (signed event callbacks) and notification channels: /renderflow/developers/webhooks
- MCP server: /renderflow/developers/mcp-server
- Cookbook (whole tasks in curl, Python, TypeScript and rfcli): /renderflow/developers/cookbook

#### API Reference
Generated from the farm's own published document, one page per operation, with a request playground.
- Introduction: /renderflow/api-reference/introduction
- 98 operation pages at /renderflow/api-reference/[tag]/[action], for example /renderflow/api-reference/jobs/create

#### Support
- Report an issue (support package from the Error report collector, ticket, email or Discord, log locations): /renderflow/support/report-an-issue

#### Resources
- Changelog: /renderflow/changelog
- Roadmap: /renderflow/roadmap

### Project Dream
AI-powered creative project generation tool.

- Overview: /project-dream/index

## Common Tasks

- **Submit a render job**: Open the Submitter, select a scene file, review settings, and click Submit. See /renderflow/getting-started/quick-start.
- **Install RenderFlow**: Run the installer on each machine and choose Server, Node, or Workstation. See /renderflow/getting-started/installation, /renderflow/getting-started/server-and-nodes and /renderflow/getting-started/silent-deploy.
- **Install Scene Manager**: Run the installer, then add the toolbar button in 3ds Max via Customize > Customize User Interface > Toolbars > Pulze. See /scene-manager/installation.
- **Use the REST API**: Generate an API key in Settings, then call endpoints for jobs, tasks, nodes, pools, and users. See /renderflow/developers/authentication and /renderflow/developers/rest-api.
- **Connect via MCP**: Configure Claude Desktop, ChatGPT Desktop, or Claude Code with the RenderFlow MCP server. See /renderflow/developers/mcp-server.
- **Set up pools and groups**: Pools divide the machines, groups decide what people may do and which pools they may submit to. See /renderflow/getting-started/server-and-nodes.
- **Troubleshoot failures**: Check the task's render log, then collect an error report for support. See /renderflow/support/report-an-issue.
- **Run a script on the farm**: Add a Shell step for a command you already have, or a Python step when the work has to spread across machines. A Python declaration such as `rf.folder("plates")` becomes a field in the submitter, a command-line flag and the value, from one line. See /renderflow/scripting/overview.
- **Add a job type of your own**: Package a Python script as a plugin with a `plugin.toml` and install it once into the repository. It then appears in the submitter's template picker for the whole studio. See /renderflow/scripting/plugins.
- **Render Unreal projects from Perforce**: Add the server in Settings → Perforce, install `p4` on the nodes, and submit from Unreal with Tools → Submit to RenderFlow. Each node syncs the project instead of RenderFlow copying it, and checked-out files are shelved for the job. See /renderflow/guides/unreal-and-perforce.
- **Submit from code**: `POST /jobs` takes a flat per-application recipe or a step tree. On the machine running the service no credential is needed, which is how a DCC plugin submits; from anywhere else use an API key. See /renderflow/developers/rest-api and /renderflow/developers/cookbook.
- **Follow a job without polling**: One WebSocket at `/api/v1/socket` carries every change. The TypeScript SDK wraps it as `rf.jobs.on()`, and both SDKs have `settled()` for waiting on one job. See /renderflow/developers/websocket.
- **Get called when a render finishes**: Subscribe a URL with `POST /webhooks` for signed, retried callbacks on job, step, task and machine events. For a message to a person instead, attach a notification channel at submit time. See /renderflow/developers/webhooks.
- **Batch render in Scene Manager**: Press the Batch Render button in the top toolbar to render all setups with one click. Or bake setups to native scene states. See /scene-manager/bake-setups.
- **Organize 3ds Max scenes**: Create setups in Scene Manager to manage cameras, lighting, scene visibility, and render settings per shot. See /scene-manager/setups.

## Support

Contact Pulze at support@pulze.io for questions or issues.
Discord: https://discord.com/invite/BxtBs9aN4E
