---
title: "CLI"
description: "Automate render farm operations from the command line. Submit jobs, manage nodes, query status, and script workflows with the RenderFlow CLI."
"og:title": "RenderFlow CLI"
"og:description": "Automate job submission, node control, and farm management with the RenderFlow command-line tool."
"twitter:title": "RenderFlow CLI"
keywords: ['render farm CLI', 'render farm command line', 'render farm scripting', 'automate render jobs CLI', 'RenderFlow CLI']
---

RenderFlow includes an easy-to-use command line tool, located in the root installation folder. Use it to automate job submission, control nodes, and integrate with scripts.

The binary is `rfcli.exe` on Windows and `rfcli` on macOS and Linux.

## Getting started

Open a terminal, navigate to RenderFlow's installation directory, and run the CLI with `--help`:

<CodeGroup>
```powershell Windows
cd "C:\Program Files\Pulze\RenderFlow"
.\rfcli --help
```

```bash macOS
cd /Applications/Pulze/RenderFlow
./rfcli --help
```

```bash Linux
cd /opt/Pulze/RenderFlow
./rfcli --help
```
</CodeGroup>

The rest of this page uses `rfcli` for brevity. On Windows that's `.\rfcli` (or `rfcli.exe`); on macOS and Linux it's `./rfcli`.

This displays all available commands.

<Frame caption="RenderFlow CLI tool commands">
  <img src="/images/renderflow/rf_dev_cli_help_output.png" alt="CLI help output" />
</Frame>

<Info>
RenderFlow must be running and connected to the server for the CLI to work.
</Info>

## Authentication

For commands that require authentication, set the `RENDERFLOW_API_KEY` environment variable:

<CodeGroup>
```powershell PowerShell
$env:RENDERFLOW_API_KEY = "your-api-key-here"
rfcli jobs list
```

```bash macOS / Linux
export RENDERFLOW_API_KEY="your-api-key-here"
rfcli jobs list
```
</CodeGroup>

For permanent access, set `RENDERFLOW_API_KEY` as a system-wide environment variable (System Properties on Windows, `~/.zshrc` or `~/.bashrc` on macOS and Linux).

## Commands reference

Run `rfcli <command> --help` for detailed options on any command.

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

```bash
rfcli jobs submit --type=3dsmax.render --host=3dsmax --file=scene.max --resolution=3840x2160 --output=output.exr --frame=1-100 --priority=50
```

### Job submission options

| Option | Required | Description |
|--------|----------|-------------|
| `--type` | Yes | Job type. One of: `3dsmax.render`, `vray.dr`, `corona.dr`, `arnold.render`, `after.render`, `blender.render`, `cinema4d.render`, `keyshot.render`, `maya.render`, `nuke.render`, `houdini.batch`, `houdini.mantra`, `houdini.husk`, `vray_standalone`, `redshift.render`, `unreal`, `fusion.render`, `shell`, `python` |
| `--host` | Yes | Host application ID (matches the DCC: `3dsmax`, `after`, `blender`, `cinema4d`, `fusion`, `houdini`, `keyshot`, `maya`, `nuke`, `unreal`, `vray_standalone`, `redshift_standalone`; for scripts: `cmd`, `bash`, `powershell`, `python`) |
| `--file` | Yes | Path to the scene file (unless `--json-file` is used) |
| `--name` | No | Custom job name (defaults to the file basename) |
| `--version` | No | Host application version (e.g. `2026` for 3ds Max, `15.1` for Nuke) |
| `--resolution` | No | Output resolution (e.g. `1920x1080`, `3840x2160`) |
| `--output` | No | Output file path |
| `--frame` | No | Single frame (`1`), range (`1-100`), or list (`1,3-5,15`) |
| `--camera` | No | Active camera name |
| `--args` | No | Additional command-line arguments (Arnold, Nuke, Houdini, V-Ray Standalone, Redshift, Fusion, Shell, Python) |
| `--render-layer` | No | Maya render layer name |
| `--rop-node` | No | Houdini ROP node path (e.g. `/out/mantra1`) |
| `--render-queue-item` | No | After Effects Render Queue item — composition name or 1-based index |
| `--level-sequence` | No | Unreal Level Sequence asset path |
| `--mrq-preset` | No | Unreal Movie Render Queue preset path |
| `--tiled` | No | Enable tiled rendering (3ds Max, Windows only) |
| `--distributed` | No | Enable distributed rendering (V-Ray/Corona DR) |
| `--priority` | No | Job priority (0-100, default: 25) |
| `--status` | No | Initial job status: `pending` (default) or `suspended` |
| `--dependencies` | No | List of job IDs this job depends on |
| `--nodes` | No | List of node IDs to whitelist |
| `-i`, `--interactive` | No | Open submission wizard GUI |
| `--pid` | No | Process ID of a running DCC application — used to read live scene properties |
| `--json-file` | No | Path to a JSON file containing a full job payload (alternative to flat flags) |
| `--json` | No | Inline JSON job payload |

<Info>
The `--json-file` and `--json` flags accept a full `IPublicJobCreate` payload. Plugins for Houdini, After Effects, and Unreal use this to pass rich, plugin-specific metadata that does not map to flat flags.
</Info>

### Interactive submission

The `-i` (interactive) flag opens the submission wizard GUI, pre-filled with your parameters:

```bash
rfcli jobs submit -i --file=scene.max --type=3dsmax.render --host=3dsmax
```

## Examples

### Batch job submission

Submit every scene in the current folder:

<CodeGroup>
```bash macOS / Linux
for f in *.max; do
    rfcli jobs submit --type=3dsmax.render --host=3dsmax --file="$f" --priority=25
    echo "Submitted: $f"
done
```

```powershell Windows
Get-ChildItem *.max | ForEach-Object {
    rfcli jobs submit --type=3dsmax.render --host=3dsmax --file=$_.FullName --priority=25
    Write-Host "Submitted: $($_.Name)"
}
```
</CodeGroup>

### Common operations

```bash
# List all jobs
rfcli jobs list

# Get job details
rfcli jobs get 60f7b1a2c3d4e5f6a7b8c9d0

# Start a suspended job
rfcli jobs start 60f7b1a2c3d4e5f6a7b8c9d0

# Update job priority
rfcli jobs update 60f7b1a2c3d4e5f6a7b8c9d0 --priority=75

# Suspend a node
rfcli nodes status 60f7b1a2c3d4e5f6a7b8c9d0 suspended

# Watch real-time job updates
rfcli jobs events
```

## Integration examples

### Integration with 3D applications

Every supported DCC plugin ships with a **Submit to RenderFlow** toolbar button (or menu entry) that shells out to the CLI. The plugins fall into two groups:

**Flat-flag plugins** pass scene info via individual flags. Used by 3ds Max, Blender, Cinema 4D, Maya, and Nuke:

```bash
# 3ds Max toolbar
rfcli jobs submit -i --type=3dsmax.render --host=3dsmax --file=scene.max --version=2026 --pid=12345

# Maya toolbar (with optional render layer)
rfcli jobs submit -i --type=maya.render --host=maya --file=scene.ma --pid=12345 --render-layer=beauty

# Nuke toolbar
rfcli jobs submit -i --type=nuke.render --host=nuke --file=comp.nk --version=15.1 --pid=12345
```

**JSON-payload plugins** write a temporary JSON file with richer metadata (selected ROPs, render queue items, MRQ jobs) and pass it with `--json-file`. Used by Houdini, After Effects, and Unreal Engine:

```bash
# Houdini ROP, After Effects render queue, or Unreal MRQ
rfcli jobs submit -i --json-file=/tmp/rf-payload.json --pid=12345
```

The `--pid` parameter lets RenderFlow attach to the running DCC instance to read live scene properties such as cameras, output paths, and renderer settings.

### Right-click context menu

The Windows installer registers **Submit to RenderFlow** in Explorer's right-click menu for the following extensions:

- 3ds Max: `.max`
- Nuke: `.nk`
- After Effects: `.aep`
- Houdini: `.hip`, `.hipnc`, `.hiplc`, `.ifd`
- USD: `.usd`, `.usda`, `.usdc`, `.usdz`
- V-Ray Standalone: `.vrscene`
- Redshift Standalone: `.rs`
- Fusion: `.comp`

The menu entry launches the submission wizard pre-filled for that file type:

```bash
rfcli jobs submit -i --type=3dsmax.render --host=3dsmax --file=scene.max
```

<Info>
Blender (`.blend`), Cinema 4D (`.c4d`), and Maya (`.ma`) do not have an Explorer entry — submit from inside the application using the toolbar button instead.
</Info>
