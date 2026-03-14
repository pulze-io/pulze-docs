---
name: pulze
description: Pulze documentation for Scene Manager, RenderFlow, and Project Dream. Use when answering questions about Pulze products, render farm management, scene organization in 3ds Max, distributed rendering, job submission, node management, or the RenderFlow API.
metadata:
  author: pulze
  version: "1.1"
---

# Pulze Documentation

Pulze builds tools for 3D artists and studios. This skill covers three products:

## Products

### Scene Manager
A 3ds Max plugin for organizing and managing scenes. Modules include Scene Setup, Lighting, Scene Control, Rendering, Utilities, and Scripting. Supports bake setups and RenderFlow integration.

- Getting started: /scene-manager/getting-started
- Settings: /scene-manager/settings
- Modules overview: /scene-manager/modules/index
- Camera: /scene-manager/modules/camera
- Resolution: /scene-manager/modules/resolution
- Time & Output: /scene-manager/modules/time-output
- Scene Name: /scene-manager/modules/scene-name
- Sun: /scene-manager/modules/sun
- Dome: /scene-manager/modules/dome
- HDRI Browser: /scene-manager/modules/hdri-browser
- Environment: /scene-manager/modules/environment
- Background: /scene-manager/modules/background
- Atmosphere: /scene-manager/modules/atmosphere
- Layers: /scene-manager/modules/layers
- Objects: /scene-manager/modules/objects
- XRef Scene: /scene-manager/modules/xref-scene
- Variants: /scene-manager/modules/variants
- Render Output: /scene-manager/modules/render-output
- Render Settings: /scene-manager/modules/render-settings
- Render Elements: /scene-manager/modules/render-elements
- Post Production: /scene-manager/modules/post-production
- Thumbnail: /scene-manager/modules/thumbnail
- Todo: /scene-manager/modules/todo
- Notes: /scene-manager/modules/notes
- Script File: /scene-manager/modules/script-file
- Script Editor: /scene-manager/modules/script-editor
- Bake setups: /scene-manager/bake-setups
- RenderFlow integration: /scene-manager/renderflow

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
- Network setup: /renderflow/getting-started/windows-network-setup
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
- Scene Manager: /renderflow/job-types/scene-manager
- Blender: /renderflow/job-types/blender
- Cinema 4D: /renderflow/job-types/cinema-4d
- Fusion: /renderflow/job-types/fusion
- Corona DR: /renderflow/job-types/corona-dr
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

### Project Dream
AI-powered creative project generation tool.

- Overview: /project-dream/index

## Common Tasks

- **Submit a render job**: See the quick start guide and job submission docs.
- **Install RenderFlow**: Follow the installation guide; silent deploy available for automated deployments.
- **Manage render nodes**: Add, configure, suspend, or reserve nodes from the Nodes page.
- **Use the REST API**: Authenticate with an API key, then call endpoints for jobs, tasks, nodes, pools, and users.
- **Connect via MCP**: Configure Claude Desktop, ChatGPT Desktop, or Claude Code with the RenderFlow MCP server.
- **Set up pools**: Group nodes into pools and assign jobs to specific pools.
- **Configure permissions**: Create user groups with policies controlling job, node, and system access.
- **Troubleshoot failures**: Check task logs, sanity checks, and the collecting logs guide.
- **Archive and restore jobs**: Archive completed jobs to keep the list clean; restore them anytime from the archive panel.
- **Schedule overnight rendering**: Use the Scheduler to activate workstations after hours and suspend them before the workday.
- **Submit cloud jobs**: Switch to the Cloud tab in the Submitter to render on cloud nodes with included licenses.

## Support

Contact Pulze at support@pulze.io for questions or issues.
Discord: https://discord.com/invite/BxtBs9aN4E
