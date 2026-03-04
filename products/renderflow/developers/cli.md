---
title: "CLI"
description: "Automate render farm operations from the command line. Submit jobs, manage nodes, query status, and script workflows with the RenderFlow CLI."
"og:title": "RenderFlow CLI"
"og:description": "Automate job submission, node control, and farm management with the RenderFlow command-line tool."
"twitter:title": "RenderFlow CLI"
keywords: ['render farm CLI', 'render farm command line', 'render farm scripting', 'automate render jobs CLI', 'RenderFlow CLI']
---

RenderFlow includes an easy-to-use command line tool (`rfcli.exe`), located in the root installation folder. Use it to automate job submission, control nodes, and integrate with scripts.

## Getting started

Open a terminal, navigate to RenderFlow's installation directory, and run:

```bash
cd "C:\Program Files\Pulze\RenderFlow"
rfcli.exe --help
```

This displays all available commands.

<Frame caption="RenderFlow CLI tool commands">
  <img src="https://placehold.co/900x400?text=CLI+Help+Output" alt="CLI help output" />
</Frame>

<Info>
RenderFlow must be running and connected to the server for the CLI to work.
</Info>

## Authentication

For commands that require authentication, set the `RENDERFLOW_API_KEY` environment variable:

<CodeGroup>
```powershell PowerShell
# Set temporarily for current session
$env:RENDERFLOW_API_KEY = "your-api-key-here"
rfcli.exe jobs list
```

```batch Command Prompt
:: Set temporarily for current session
set RENDERFLOW_API_KEY=your-api-key-here
rfcli.exe jobs list
```
</CodeGroup>

For permanent access, add `RENDERFLOW_API_KEY` to your System Environment Variables.

## Commands reference

Run `rfcli.exe <command> --help` for detailed options on any command.

### General

| Command | Description |
|---------|-------------|
| `info` | Display service information |

### Jobs

| Command | Description |
|---------|-------------|
| `jobs list` | List all jobs |
| `jobs get <id>` | Get job details by ID |
| `jobs submit` | Submit a new job |
| `jobs start <id>` | Start a suspended job |
| `jobs stop <id>` | Stop a running job |
| `jobs reset <id>` | Reset a job |
| `jobs archive <id>` | Archive a job |
| `jobs delete <id>` | Delete a job |
| `jobs pool <id> <poolId>` | Move job to a different pool |
| `jobs update <id>` | Update job settings (priority, limit, etc.) |
| `jobs events` | Subscribe to real-time job events |

### Tasks

| Command | Description |
|---------|-------------|
| `tasks list <jobId>` | List all tasks for a job (supports `--page` for pagination) |
| `tasks events <jobId>` | Subscribe to real-time task events |

### Nodes

| Command | Description |
|---------|-------------|
| `nodes list` | List all nodes |
| `nodes get <id>` | Get node details by ID |
| `nodes status <id> <status>` | Update node status (`idle`, `suspended`, `finishing`, `reserved`) |
| `nodes pool <id> <poolId>` | Move node to a different pool |
| `nodes delete <id>` | Delete a node |
| `nodes events` | Subscribe to real-time node events |

### Users, Pools, Errors

| Command | Description |
|---------|-------------|
| `users list` | List all users |
| `users get <id>` | Get user by ID |
| `pools list` | List all pools |
| `pools get <id>` | Get pool by ID |
| `errors list` | List all errors |
| `errors job <id>` | Get errors for a job |
| `errors node <id>` | Get errors for a node |

## Submitting jobs

### Non-interactive submission

Submit a fully configured job without opening the UI:

```powershell
rfcli.exe jobs submit --type=3dsmax.render --host=3dsmax --file=S:\project\myscene.max --resolution=3840x2160 --output=S:\project\output.exr --frame=1-100 --priority=50
```

### Job submission options

| Option | Required | Description |
|--------|----------|-------------|
| `--type` | Yes | Job type (e.g., `3dsmax.render`, `blender.render`, `cinema4d.render`) |
| `--host` | Yes | Host application (`3dsmax`, `blender`, `cinema4d`, `vray_standalone`) |
| `--file` | Yes | Path to the scene file |
| `--name` | No | Custom job name |
| `--resolution` | No | Output resolution (e.g., `1920x1080`, `3840x2160`) |
| `--output` | No | Output file path |
| `--frame` | No | Frame range (e.g., `1`, `1-100`, `1,3-5,15`) |
| `--priority` | No | Job priority (0-100, default: 25) |
| `--status` | No | Initial job status |
| `--dependencies` | No | List of job IDs this job depends on |
| `--nodes` | No | List of node IDs to whitelist |
| `-i`, `--interactive` | No | Open submission wizard GUI |
| `--pid` | No | Process ID of running DCC application |

### Interactive submission

The `-i` (interactive) flag opens the submission wizard GUI, pre-filled with your parameters:

```bash
rfcli.exe jobs submit -i --file="C:\Projects\scene.max" --type=3dsmax.render --host=3dsmax
```

## Examples

### Batch job submission

Submit multiple scenes from a folder:

```batch
@echo off
cd "C:\Program Files\Pulze\RenderFlow"

for %%f in (C:\RenderQueue\*.max) do (
    rfcli.exe jobs submit --type=3dsmax.render --host=3dsmax --file="%%f" --priority=25
    echo Submitted: %%f
)

echo All jobs submitted.
```

### Common operations

```bash
# List all jobs
rfcli.exe jobs list

# Get job details
rfcli.exe jobs get 60f7b1a2c3d4e5f6a7b8c9d0

# Start a suspended job
rfcli.exe jobs start 60f7b1a2c3d4e5f6a7b8c9d0

# Update job priority
rfcli.exe jobs update 60f7b1a2c3d4e5f6a7b8c9d0 --priority=75

# Suspend a node
rfcli.exe nodes status 60f7b1a2c3d4e5f6a7b8c9d0 suspended

# Watch real-time job updates
rfcli.exe jobs events
```

## Integration examples

### Integration with 3D applications

The RenderFlow toolbar buttons in 3ds Max, Blender, and Cinema 4D use the CLI internally. For example, the 3ds Max toolbar button runs:

```bash
rfcli.exe jobs submit -i --type=3dsmax.render --host=3dsmax --file="scene.max" --pid=12345
```

The `--pid` parameter connects to a running 3ds Max instance to read current scene properties.

### Right-click context menu

RenderFlow adds "Submit to RenderFlow" to the Windows Explorer context menu for supported file types (`.max`, `.blend`, `.c4d`, `.vrscene`). This uses the CLI to open the submission wizard:

```bash
rfcli.exe jobs submit -i --type=3dsmax.render --host=3dsmax --file="C:\path\to\scene.max"
```

## Output format

CLI commands output JSON by default, making it easy to parse results programmatically:

```json
[
  {
    "_id": "60f7b1a2c3d4e5f6a7b8c9d0",
    "name": "Project_v01",
    "status": "working",
    "progress": 45
  }
]
```

---
