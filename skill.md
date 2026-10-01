---
name: pulze
description: Pulze documentation for Scene Manager, RenderFlow, and Project Dream. Use when answering questions about Pulze products, render farm management, scene organization in 3ds Max, distributed rendering, job submission, node management, or the RenderFlow API.
metadata:
  author: pulze
  version: "1.4"
---

# Pulze Documentation

Pulze builds tools for 3D artists and studios. This skill covers three products:

## Products

### Scene Manager
A 3ds Max plugin for organizing and managing scenes with per-setup control over cameras, lighting, rendering, and more. Supports batch rendering, bake setups, and RenderFlow integration.

#### Getting Started
- Overview: /scene-manager/overview
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
- Quick start: /renderflow/getting-started/quick-start
- Render farm basics: /renderflow/getting-started/render-farm-basics
- System requirements: /renderflow/getting-started/requirements
- Supported apps: /renderflow/getting-started/supported-apps
- Installation: /renderflow/getting-started/installation
- Licensing: /renderflow/getting-started/licensing
- Silent deploy: /renderflow/getting-started/silent-deploy
- Run as a service: /renderflow/getting-started/run-as-a-service
- Network setup: /renderflow/getting-started/network-setup
- VPN remote access: /renderflow/getting-started/vpn-remote-access
- Migrating from Render Manager: /renderflow/getting-started/migrating-from-render-manager

#### Jobs
- How jobs work: /renderflow/jobs/overview
- Submitter: /renderflow/jobs/submitter
- Templates: /renderflow/jobs/templates
- Requirements: /renderflow/jobs/requirements
- Sanity checks: /renderflow/jobs/sanity-checks
- Assets: /renderflow/jobs/assets
- Monitoring: /renderflow/jobs/monitoring
- Tasks and details: /renderflow/jobs/tasks-and-details
- Notifications: /renderflow/jobs/notifications
- Errors: /renderflow/jobs/errors

#### Job Types
- 3ds Max: /renderflow/job-types/3ds-max
- After Effects: /renderflow/job-types/after-effects
- Arnold: /renderflow/job-types/arnold
- Blender: /renderflow/job-types/blender
- Cinema 4D: /renderflow/job-types/cinema-4d
- Corona DR: /renderflow/job-types/corona-dr
- Fusion: /renderflow/job-types/fusion
- Houdini (Beta): /renderflow/job-types/houdini
- Maya: /renderflow/job-types/maya
- Nuke: /renderflow/job-types/nuke
- Python: /renderflow/job-types/python
- Redshift: /renderflow/job-types/redshift
- Scene Manager: /renderflow/job-types/scene-manager
- Shell: /renderflow/job-types/shell
- Unreal Engine (Beta): /renderflow/job-types/unreal
- V-Ray DR: /renderflow/job-types/vray-dr
- V-Ray Standalone: /renderflow/job-types/vray-standalone

#### Cloud Rendering
- Overview: /renderflow/cloud-rendering/overview
- Credits and pricing: /renderflow/cloud-rendering/credits-and-pricing
- Request access: /renderflow/cloud-rendering/request-access

#### Nodes
- How nodes work: /renderflow/nodes/overview
- Commands: /renderflow/nodes/commands
- Tags: /renderflow/nodes/tags
- CPU affinity: /renderflow/nodes/cpu-affinity
- Spawner mode: /renderflow/nodes/spawner-mode
- Hardware and network: /renderflow/nodes/hardware-and-network
- Software: /renderflow/nodes/software
- Benchmark: /renderflow/nodes/benchmark

#### Analytics
- Software analytics: /renderflow/software-analytics/overview
- Statistics: /renderflow/statistics/overview

#### Scheduler
- Overview: /renderflow/scheduler/overview

#### Sanity Check
- Overview: /renderflow/sanity-check/overview
- Defaults: /renderflow/sanity-check/defaults
- Custom checks: /renderflow/sanity-check/custom-checks

#### Settings
- Overview: /renderflow/settings/overview

#### Developers
- Authentication: /renderflow/developers/authentication
- REST API: /renderflow/developers/rest-api
- JavaScript SDK: /renderflow/developers/javascript-sdk
- Python SDK: /renderflow/developers/python-sdk
- CLI: /renderflow/developers/cli
- MCP Server: /renderflow/developers/mcp-server

#### Reference
- FAQ: /renderflow/faq
- Glossary: /renderflow/glossary
- Changelog: /renderflow/changelog

#### RenderFlow 2 (Beta)
RenderFlow 2 is in beta. Paths without a version prefix (`/renderflow/...`) document RenderFlow 1; paths under `/renderflow/v2/...` document RenderFlow 2. Pages are added as they are written.
- Introduction: /renderflow/v2/introduction
- Quick Start: /renderflow/v2/getting-started/quick-start
- System Requirements: /renderflow/v2/getting-started/requirements
- Installation: /renderflow/v2/getting-started/installation
- Server and Nodes: /renderflow/v2/getting-started/server-and-nodes
- Silent Deployment: /renderflow/v2/getting-started/silent-deploy
- Run as a Service: /renderflow/v2/getting-started/run-as-a-service
- Offline Licensing (Enterprise, a server with no internet access): /renderflow/v2/getting-started/offline-licensing
- Migrating (from RenderFlow 1 or Render Manager): /renderflow/v2/getting-started/migrating
- Changelog: /renderflow/v2/changelog

##### RenderFlow 2 — Scripting
Running your own code on the farm. Three ways: a shell step, a Python step, or a plugin that adds a job type to the submitter.
- Overview: /renderflow/v2/scripting/overview
- Shell steps: /renderflow/v2/scripting/shell-steps
- Python steps: /renderflow/v2/scripting/python-steps
- rf module reference: /renderflow/v2/scripting/rf-reference
- Plugins: /renderflow/v2/scripting/plugins

##### RenderFlow 2 — Developers
Driving the farm from outside. Every client is generated from one OpenAPI document, so an operation is named the same in the REST route, both SDKs, `rfcli` and the MCP tools.
- Overview: /renderflow/v2/developers/overview
- Authentication: /renderflow/v2/developers/authentication
- REST API: /renderflow/v2/developers/rest-api
- TypeScript SDK (`@pulze-io/renderflow`): /renderflow/v2/developers/typescript-sdk
- Python SDK (`pulze-renderflow`, no dependencies, imports inside Maya and Houdini): /renderflow/v2/developers/python-sdk
- CLI (`rfcli`): /renderflow/v2/developers/cli
- Live updates over WebSocket: /renderflow/v2/developers/websocket
- Webhooks (signed event callbacks) and notification channels: /renderflow/v2/developers/webhooks
- MCP server: /renderflow/v2/developers/mcp-server
- Cookbook (whole tasks in curl, Python, TypeScript and rfcli): /renderflow/v2/developers/cookbook

##### RenderFlow 2 — API Reference
Generated from the farm's own published document, one page per operation, with a request playground.
- Introduction: /renderflow/v2/api-reference/introduction
- 98 operation pages at /renderflow/v2/api-reference/[tag]/[action], for example /renderflow/v2/api-reference/jobs/create

### Project Dream
AI-powered creative project generation tool.

- Overview: /project-dream/index

## Common Tasks

- **Submit a render job**: Open the Submitter, select a scene file, review settings, and click Submit. See /renderflow/jobs/submitter and /renderflow/getting-started/quick-start.
- **Install RenderFlow**: Run the installer on each machine and choose Server, Node, or Workstation. Silent deploy available via PowerShell. See /renderflow/getting-started/installation and /renderflow/getting-started/silent-deploy.
- **Install Scene Manager**: Run the installer, then add the toolbar button in 3ds Max via Customize > Customize User Interface > Toolbars > Pulze. See /scene-manager/installation.
- **Manage render nodes**: View node status, hardware, and current jobs from the Nodes table. Suspend, restart, shutdown, or wake nodes remotely. See /renderflow/nodes/overview and /renderflow/nodes/commands.
- **Use the REST API**: Generate an API key in Settings, then call endpoints for jobs, tasks, nodes, pools, and users. See /renderflow/developers/authentication and /renderflow/developers/rest-api.
- **Connect via MCP**: Configure Claude Desktop, ChatGPT Desktop, or Claude Code with the RenderFlow MCP server. See /renderflow/developers/mcp-server.
- **Set up pools**: Create pools in Settings, assign nodes to pools, and submit jobs to specific pools. See /renderflow/nodes/overview and /renderflow/settings/overview.
- **Configure permissions**: Create user groups with policies controlling job, node, and system access. See /renderflow/settings/overview.
- **Troubleshoot failures**: Check task render logs, review sanity check results, and collect diagnostic logs. See /renderflow/jobs/errors, /renderflow/sanity-check/overview, and /renderflow/support/collecting-logs.
- **Archive and restore jobs**: Archive completed jobs from the context menu to keep the list clean. Restore them anytime from the archive panel. See /renderflow/jobs/overview.
- **Schedule overnight rendering**: Use the Scheduler to automatically activate workstations after hours and suspend them before the workday. See /renderflow/scheduler/overview.
- **Submit cloud jobs**: Switch to the Cloud tab in the Submitter to render on cloud nodes with included V-Ray and Corona licenses. See /renderflow/cloud-rendering/overview.
- **Run a script on the farm (RenderFlow 2)**: Add a Shell step for a command you already have, or a Python step when the work has to spread across machines. A Python declaration such as `rf.files("plates")` becomes a field in the submitter, a command-line flag and the value, from one line. See /renderflow/v2/scripting/overview.
- **Add a job type of your own (RenderFlow 2)**: Package a Python script as a plugin with a `plugin.toml` and install it once into the repository. It then appears in the submitter's template picker for the whole studio. See /renderflow/v2/scripting/plugins.
- **Submit from code (RenderFlow 2)**: `POST /jobs` takes a flat per-application recipe or a step tree. On the machine running the service no credential is needed, which is how a DCC plugin submits; from anywhere else use an API key. See /renderflow/v2/developers/rest-api and /renderflow/v2/developers/cookbook.
- **Follow a job without polling (RenderFlow 2)**: One WebSocket at `/api/v1/socket` carries every change. The TypeScript SDK wraps it as `rf.jobs.on()`, and both SDKs have `settled()` for waiting on one job. See /renderflow/v2/developers/websocket.
- **Get called when a render finishes (RenderFlow 2)**: Subscribe a URL with `POST /webhooks` for signed, retried callbacks on job, step, task and machine events. For a message to a person instead, attach a notification channel at submit time. See /renderflow/v2/developers/webhooks.
- **Batch render in Scene Manager**: Press the Batch Render button in the top toolbar to render all setups with one click. Or bake setups to native scene states. See /scene-manager/bake-setups.
- **Organize 3ds Max scenes**: Create setups in Scene Manager to manage cameras, lighting, scene visibility, and render settings per shot. See /scene-manager/setups.

## Support

Contact Pulze at support@pulze.io for questions or issues.
Discord: https://discord.com/invite/BxtBs9aN4E
