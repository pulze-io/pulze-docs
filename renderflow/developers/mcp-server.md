---
title: "MCP Server"
description: "Integrate RenderFlow with AI assistants like Claude using the Model Context Protocol. Control your render farm with natural language commands."
"og:title": "RenderFlow MCP Server"
"og:description": "Integrate RenderFlow with AI assistants like Claude and ChatGPT using the built-in MCP server for natural language farm control."
"twitter:title": "RenderFlow MCP Server"
keywords: ['render farm AI integration', 'render farm MCP server', 'AI render farm management', 'Claude render farm', 'render farm natural language', 'RenderFlow MCP']
---

RenderFlow includes a built-in [Model Context Protocol (MCP)](https://modelcontextprotocol.io) server, allowing AI assistants to directly interact with your render farm. Ask questions in natural language, control jobs and nodes, and get real-time farm insights.

## What is MCP?

MCP is an open standard for connecting AI assistants to external tools and data sources. Originally created by Anthropic, MCP has been adopted across the industry and is now maintained by the [Agentic AI Foundation](https://www.linuxfoundation.org/) under the Linux Foundation.

With RenderFlow's MCP server, you can:

- Ask "What's the farm status?" and get a real-time overview
- Say "Stop the laptop scene job" instead of finding the job ID
- Request "Show me the fastest render nodes" for benchmark rankings
- Control nodes with "Suspend all idle nodes"

## Compatible clients

RenderFlow's MCP server works with [ChatGPT Desktop](https://openai.com/chatgpt/desktop/), [Claude Code](https://claude.ai/code), and many other MCP-compatible clients.

For a full list of compatible clients, see [modelcontextprotocol.io/clients](https://modelcontextprotocol.io/clients).

## Setup

### Prerequisites

- RenderFlow running on any computer (server, node, or workstation)
- An API key (generate in **Settings → API Keys**)
- An MCP-compatible client

<Tabs>
  <Tab title="ChatGPT Desktop">
    Edit the configuration file:
    - **Windows:** `%APPDATA%\ChatGPT\config.json`
    - **macOS:** `~/Library/Application Support/ChatGPT/config.json`

    ```json
    {
      "mcpServers": {
        "renderflow": {
          "url": "http://<ip>:44442/api/v1/mcp/",
          "headers": {
            "x-renderflow-api-key": "your-api-key-here"
          }
        }
      }
    }
    ```
  </Tab>
  <Tab title="Claude Code">
    Run this command to add the RenderFlow MCP server:

    ```bash
    claude mcp add --transport http renderflow http://<ip>:44442/api/v1/mcp/ --header "x-renderflow-api-key: your-api-key-here"
    ```
  </Tab>
</Tabs>

Replace `<ip>` with the IP address of any computer running RenderFlow (use `localhost` for your local machine).

<Frame caption="Controlling RenderFlow through Claude Code using MCP">
  <img src="/images/renderflow/rf_dev_mcp_claude_code.png" alt="Claude Code conversation controlling a RenderFlow render farm via MCP" />
</Frame>

## Available tools

Once connected, the AI assistant can use these tools to interact with RenderFlow:

### Farm

| Tool | Description |
|------|-------------|
| `get_farm_overview` | Job and node counts by status, active renders with progress |

### Jobs

| Tool | Description | Parameters |
|------|-------------|------------|
| `list_jobs` | List all jobs, optionally filter by status | `status` (optional) |
| `get_job` | Get job details by name or ID (fuzzy matching) | `query` |
| `create_job` | Submit a new render job | `name`, `file`, `type`, `host` (required); `frame`, `status`, `priority` (optional) |
| `control_job` | Start, stop, reset, archive, or delete a job | `query`, `action` (`start`, `stop`, `reset`, `archive`, `delete`) |
| `update_job` | Update priority, node limit, or pool assignment | `query` (required); `priority`, `limit`, `pool` (optional) |

### Tasks

| Tool | Description | Parameters |
|------|-------------|------------|
| `list_tasks` | List tasks for a job (paginated) | `query` (required); `page`, `limit` (optional) |
| `get_task_logs` | Get render logs for a specific task | `job_query`, `task_id` (required); `offset`, `limit` (optional) |

### Nodes

| Tool | Description | Parameters |
|------|-------------|------------|
| `list_nodes` | List all nodes, optionally filter by status | `status` (optional) |
| `get_node` | Get node details including hardware, software, and utilization | `query` |
| `control_node` | Set node to idle, suspended, or reserved | `query`, `action` (`idle`, `suspended`, `reserved`) |

### Other

| Tool | Description |
|------|-------------|
| `list_errors` | List errors, optionally filter by job or node name |
| `get_support` | Get Pulze support contact information |

## Usage examples

These examples work with any MCP-compatible client.

<AccordionGroup>
  <Accordion title="Farm monitoring">
    ```
    User: What's the farm status?

    AI: Here's your current farm overview:

    Jobs: 3 working, 12 pending, 45 completed, 2 failed
    Nodes: 8 busy, 4 idle, 2 offline

    Active Renders:
    - "Hero Shot v3" on Render-01 (67% complete)
    - "Exterior Final" on Render-02 (23% complete)
    - "Product Animation" on Render-03 (89% complete)
    ```
  </Accordion>
  <Accordion title="Job control">
    ```
    User: Stop the hero shot job and boost the product animation priority to 100

    AI: Done! I've:
    1. Stopped "Hero Shot v3"
    2. Set "Product Animation" priority to 100
    ```
  </Accordion>
  <Accordion title="Node management">
    ```
    User: Which nodes are idle and what are their V-Ray benchmark scores?

    AI: Here are your idle nodes ranked by V-Ray CPU score:

    1. Render-05 - 32,450 samples (AMD Ryzen 9 7950X)
    2. Render-03 - 28,100 samples (Intel i9-13900K)
    3. Render-08 - 24,200 samples (AMD Ryzen 9 5950X)
    ```
  </Accordion>
  <Accordion title="Troubleshooting">
    ```
    User: Show me errors for the kitchen render job

    AI: Found 2 errors for "Kitchen Render":

    1. VRAY_LICENSE_ERROR - No V-Ray license available (Node: Render-02, 3 occurrences)
    2. MEMORY_ERROR - Out of memory during rendering (Node: Render-05, 1 occurrence)
    ```
  </Accordion>
</AccordionGroup>
