---
name: pulze
description: Pulze documentation for RenderFlow, Scene Manager and Project Dream. Use when answering questions about Pulze products, render farm management, setting up a render farm, job submission, render nodes, the RenderFlow API, SDKs and MCP server, scene organization in 3ds Max, or AI tools for visualization.
metadata:
  author: pulze
  version: "2.0.20"
---

# Pulze Documentation

Pulze builds software for 3D artists and studios. This skill covers three products. Every page is also available as Markdown by adding `.md` to its path, and the full text of the docs is at `/llms-full.txt`. Product pages and pricing are on https://www.pulze.io, with RenderFlow facts at https://www.pulze.io/renderflow/llms.txt.

## Products

### RenderFlow
A render farm manager for studios and in-house creative teams. It runs on the studio's own machines, on Windows, Linux (x64 and Arm) and macOS (Arm), and one farm can mix all three. It submits, monitors and manages render jobs from 26 applications and render engines, and can add cloud machines from the studio's own Azure or AWS account. Licensed per machine rendering at the same time; monitoring and managing the farm are free.

#### Set up a farm, in this order
1. System Requirements: /renderflow/getting-started/requirements
2. Installation (one installer for every machine): /renderflow/getting-started/installation
3. Server and Nodes (make one machine the server, connect the others): /renderflow/getting-started/server-and-nodes
4. Run as a Service (unattended render nodes): /renderflow/getting-started/run-as-a-service
5. Quick Start (the same path on one page, ending with the first job): /renderflow/getting-started/quick-start

For many machines at once, use Silent Deployment instead of steps 2 and 3: /renderflow/getting-started/silent-deploy

#### Getting Started
- Introduction: /renderflow/introduction
- Supported Applications (versions, render engines, job types and platforms for every application): /renderflow/getting-started/supported-apps
- Other ways to install (curl or PowerShell from the farm server): /renderflow/getting-started/installation#other-ways-to-install
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
Generated from the farm's own published OpenAPI document (/renderflow/api-reference/openapi.json), one page per operation, with a request playground.
- Introduction: /renderflow/api-reference/introduction
- 116 operation pages at /renderflow/api-reference/[tag]/[action], for example /renderflow/api-reference/jobs/create

#### Support
- Report an issue (support package from the Error report collector, ticket, email or Discord, log locations): /renderflow/support/report-an-issue

#### Resources
- Changelog: /renderflow/changelog
- Roadmap: /renderflow/roadmap

### Scene Manager
A 3ds Max plugin for organizing scenes into setups, each with its own cameras, lighting, render settings and more. Supports batch rendering, baking setups into native 3ds Max scene states, and submitting to RenderFlow.

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

### Project Dream
An AI toolset for visualization: image generation from the 3D viewport, upscaling, character enhancement, image editing with prompts, and image-to-video, from inside 3D applications and Photoshop. For more information and to try it out, go to https://dream.pulze.io.

- Overview: /project-dream/index
- Models (100+ AI models, for images, video, 3D, audio and music): /project-dream/models
- Changelog: /project-dream/changelog

## Common Tasks

### RenderFlow

- **Set up a render farm**: Install RenderFlow on every machine with the same installer, then decide in the setup wizard or with `rfsv config` which machine is the server and which are workstations or render nodes. See /renderflow/getting-started/installation and /renderflow/getting-started/server-and-nodes.
- **Submit a render job**: Use Submit to RenderFlow inside the application, or open the Submitter in RenderFlow, pick a scene, review the settings and submit. See /renderflow/getting-started/quick-start.
- **Use the REST API**: Generate an API key in Settings, then call endpoints for jobs, tasks, machines, pools and users. See /renderflow/developers/authentication and /renderflow/developers/rest-api.
- **Connect an AI assistant**: An admin turns on AI clients under Settings > Security, then connects Claude Desktop, Claude Code, Codex, Cursor, VS Code or LM Studio from Settings > AI Clients on a computer that runs RenderFlow. ChatGPT and Claude's Connectors cannot reach a farm on a private network. See /renderflow/developers/mcp-server.
- **Set up pools and groups**: Pools divide the machines; groups decide what people may do and which pools they may submit to. See /renderflow/getting-started/server-and-nodes.
- **Troubleshoot failures**: Check the task's render log, then collect an error report for support. See /renderflow/support/report-an-issue.
- **Run a script on the farm**: Add a Shell step for a command you already have, or a Python step when the work has to spread across machines. A Python declaration such as `rf.folder("plates")` becomes a field in the submitter, a command-line flag and the value, from one line. See /renderflow/scripting/overview.
- **Add a job type of your own**: Package a Python script as a plugin with a `plugin.toml` and install it once into the repository. It then appears in the submitter's template picker for the whole studio. See /renderflow/scripting/plugins.
- **Render Unreal projects from Perforce**: Add the server in Settings → Perforce, install `p4` on the nodes, and submit from Unreal with Tools → Submit to RenderFlow. Each node syncs the project instead of RenderFlow copying it, and checked-out files are shelved for the job. See /renderflow/guides/unreal-and-perforce.
- **Submit from code**: `POST /jobs` takes a flat per-application recipe or a step tree. On the machine running RenderFlow no credential is needed, which is how an application plugin submits; from anywhere else use an API key. See /renderflow/developers/rest-api and /renderflow/developers/cookbook.
- **Follow a job without polling**: One WebSocket at `/api/v1/socket` carries every change. The TypeScript SDK wraps it as `rf.jobs.on()`, and both SDKs have `settled()` for waiting on one job. See /renderflow/developers/websocket.
- **Get called when a render finishes**: Subscribe a URL with `POST /webhooks` for signed, retried callbacks on job, step, task and machine events. For a message to a person instead, attach a notification channel at submit time. See /renderflow/developers/webhooks.

### Scene Manager

- **Install Scene Manager**: Run the installer, then add the toolbar button in 3ds Max via Customize > Customize User Interface > Toolbars > Pulze. See /scene-manager/installation.
- **Organize 3ds Max scenes**: Create setups to manage cameras, lighting, scene visibility and render settings per shot. See /scene-manager/setups.
- **Batch render**: Press the Batch Render button in the top toolbar to render all setups with one click, or bake setups to native scene states. See /scene-manager/bake-setups.

### Project Dream

- **Try Project Dream**: Go to https://dream.pulze.io for more information and to get started.
- **Choose an AI model**: All 100+ models for images, video, 3D, audio and music are listed at /project-dream/models.

## Support

Email support@pulze.io with the product version, operating system and logs. Questions and how-to: Discord, https://discord.gg/BxtBs9aN4E. Sales and partnerships: /contact.
