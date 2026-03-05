# CLAUDE.md - RenderFlow Documentation Project

## What is this project?

Complete documentation for **RenderFlow**, a render farm manager by **Pulze** (Budapest). These docs are built for **Mintlify** and cover the full product: installation, jobs, nodes, cloud rendering, scheduling, developer APIs, and more.

The docs serve a dual purpose: user-useful reference AND SEO-optimized marketing content that attracts non-users searching for render farm topics.

---

## Company context

- **Pulze** builds tools for creative studios (arch-viz, VFX)
- **Products**: RenderFlow (render farm manager), Scene Manager (3ds Max plugin), RenderFlow Cloud (cloud rendering, closed beta)
- **Target audience**: Architectural visualization studios, VFX studios, primarily using 3ds Max with V-Ray/Corona
- **Upcoming conferences**: FMX 2026 (Stuttgart, May), SIGGRAPH 2026 (Los Angeles, July)
- **Messaging rule**: Position ALL features as available, never say "in development" or "coming soon" (except Linux/macOS OS support)

---

## File inventory

58 markdown files, ~4,900 lines total. All files live at the repo root in this structure:

```
getting-started/          (11 files, ~1,080 lines)
  quick-start.md
  requirements.md
  supported-apps.md
  installation.md
  licensing.md
  silent-deploy.md
  run-as-a-service.md
  render-farm-basics.md        ← High SEO value, targets non-users
  windows-network-setup.md     ← High SEO value, targets non-users
  vpn-remote-access.md         ← High SEO value, targets non-users
  migrating-from-render-manager.md

jobs/                     (10 files, ~640 lines)
  overview.md
  submitter.md
  templates.md
  requirements.md
  sanity-checks.md
  assets.md
  notifications.md
  monitoring.md
  tasks-and-details.md
  errors.md

job-types/                (8 files, ~260 lines)
  3ds-max.md
  scene-manager.md
  blender.md
  cinema-4d.md
  fusion.md
  corona-dr.md
  vray-dr.md
  vray-standalone.md

cloud-rendering/          (3 files, ~130 lines)
  overview.md
  credits-and-pricing.md
  request-access.md

sanity-check/             (3 files, ~180 lines)
  overview.md
  defaults.md
  custom-checks.md

nodes/                    (8 files, ~280 lines)
  overview.md
  commands.md
  hardware-and-network.md
  software.md
  benchmark.md
  tags.md
  spawner-mode.md
  cpu-affinity.md

software-analytics/       (1 file)
  overview.md

statistics/               (1 file)
  overview.md

scheduler/                (1 file)
  overview.md

settings/                 (1 file)
  overview.md

developers/               (6 files, ~1,800 lines)
  authentication.md
  rest-api.md              ← Largest file (927 lines), full endpoint reference
  javascript-sdk.md
  python-sdk.md
  cli.md
  mcp-server.md

support/                  (3 files, ~85 lines)
  report-an-issue.md
  collecting-logs.md
  contact-us.md

faq.md                    (root, ~92 lines)
glossary.md               (root, ~70 lines)
```

---

## Frontmatter format (Mintlify)

Every file uses this exact frontmatter structure:

```yaml
---
title: "Page Title"
description: "150-160 char description for search engines and below-title display."
"og:title": "Social sharing title (can differ from page title for SEO)"
"og:description": "Social sharing description."
"twitter:title": "Twitter card title"
keywords: ['keyword one', 'keyword two', 'keyword three']
---
```

**Rules:**
- `title`: 50-60 characters, clear and descriptive
- `description`: 150-160 characters, compelling, unique per page
- `og:title` / `twitter:title`: Can be more marketing-oriented than `title`
- `keywords`: YAML array format with single quotes. Mix of branded ("RenderFlow X") and non-branded ("render farm X") terms
- All meta tag keys with colons must be wrapped in quotes (Mintlify requirement)

---

## Writing style & conventions

### Tone
- Professional but warm, not corporate
- Direct and practical - users are busy artists/TDs, not reading for fun
- Second person ("you") when addressing the reader
- Present tense for describing features

### Formatting rules
- **No em dashes** (—). Use hyphens (-) or rewrite the sentence
- **Callouts** use only these three Mintlify components:
  - `<Info>` (24 instances) - Supplementary context, good-to-know
  - `<Warning>` (9 instances) - Potential pitfalls, things that can go wrong
  - `<Tip>` (6 instances) - Best practices, pro tips
  - All callouts must have matching opening and closing tags
- **Image placeholders** use Mintlify `<Frame>` component:
  ```
  <Frame>
    <img src="/images/path/to/screenshot.png" alt="Descriptive alt text" />
  </Frame>
  ```
  There are 66 Frame placeholders across all files. These need actual screenshots/Arcade demos.
- **Internal links** use relative paths: `/getting-started/installation`, `/jobs/overview`, etc.
- **Code blocks** use triple backticks with language identifier
- **Bold** for UI elements: **Settings**, **Jobs > Create**, **Submit**
- **Inline code** for paths, commands, ports, filenames: `C:\ProgramData\RenderFlow`, `44442`

### Terminology (consistent across all files)
- "Server" (not "manager" or "master") for the RenderFlow server machine
- "Node" as universal term for connected computers
- "Workstation" for artist machines that also render
- "Repository" for the shared network folder
- "Task" for a single unit of work (one frame/tile)
- "Job" for the collection of tasks
- "Pool" for node grouping
- "Spawner mode" for DR-ready state

---

## SEO strategy

### Keyword philosophy
Three tiers of keywords per page:

1. **Branded** - "RenderFlow [feature]" (captures existing users searching for help)
2. **Generic render farm** - "render farm [topic]" (captures people evaluating tools)
3. **Problem/workflow** - Long-tail searches people make before they know they need a render farm manager (e.g., "3ds Max slow rendering fix", "NAS for 3D studio", "Deadline alternative")

### High-SEO-value pages (attract non-users)
These pages are deliberately written to rank for broad industry searches:

| Page | Target searches |
|------|----------------|
| `render-farm-basics.md` | "what is a render farm", "how to build a render farm" |
| `windows-network-setup.md` | "NAS for render farm", "UNC paths explained", "10GbE vs 1GbE rendering" |
| `vpn-remote-access.md` | "render farm VPN", "access render farm from home" |
| `3ds-max.md` | "3ds Max render without license", "3ds Max network rendering free" |
| `blender.md` | "Blender render farm setup", "Blender Cycles farm" |
| `migrating-from-render-manager.md` | "Render Manager discontinued", competitor migrations |
| `faq.md` | Various long-tail questions |
| `glossary.md` | Render farm terminology definitions |

### AEO (Answer Engine Optimization)
Docs are structured for AI retrieval too:
- Clear H1/H2/H3 hierarchy
- Self-contained sections (each section understandable without full page context)
- Explicit definitions of terms on first use
- Complete code examples
- Error messages documented with causes and solutions

---

## Pending work

### SEO keyword enrichment (IN PROGRESS)
All 58 files need broader non-branded keywords added. Current keywords are too heavily "render farm X" and "RenderFlow Y". Need to add:
- Problem-solving long-tails ("3ds Max render crashes on farm", "missing textures network render")
- Competitor-adjacent terms ("Deadline alternative", "Backburner replacement", "Thinkbox alternative")
- Workflow terms ("batch render 3ds Max", "overnight rendering setup")
- Technology terms people search ("V-Ray DR setup", "Corona distributed rendering guide")

### Visual assets (66 Frame placeholders)
All `<Frame>` elements contain placeholder images. These need:
- **Screenshots** from the actual RenderFlow UI
- **Arcade demos** (interactive walkthroughs) for key flows:
  1. Quick Start: install to first job
  2. Submitter: 3ds Max job submission
  3. Job Details: navigating tasks, previews, logs
  4. Scheduler: setting up overnight rendering
  5. Sanity Check: creating a custom check
  6. Software Analytics: comparing nodes

### mint.json navigation
Navigation structure needs to be configured. Suggested structure:

```json
{
  "navigation": [
    {
      "group": "Getting Started",
      "pages": [
        "getting-started/quick-start",
        "getting-started/render-farm-basics",
        "getting-started/requirements",
        "getting-started/supported-apps",
        "getting-started/installation",
        "getting-started/licensing",
        "getting-started/silent-deploy",
        "getting-started/run-as-a-service",
        "getting-started/windows-network-setup",
        "getting-started/vpn-remote-access",
        "getting-started/migrating-from-render-manager"
      ]
    },
    {
      "group": "Jobs",
      "pages": [
        "jobs/overview",
        "jobs/submitter",
        "jobs/templates",
        "jobs/requirements",
        "jobs/sanity-checks",
        "jobs/assets",
        "jobs/notifications",
        "jobs/monitoring",
        "jobs/tasks-and-details",
        "jobs/errors"
      ]
    },
    {
      "group": "Job Types",
      "pages": [
        "job-types/3ds-max",
        "job-types/scene-manager",
        "job-types/blender",
        "job-types/cinema-4d",
        "job-types/fusion",
        "job-types/corona-dr",
        "job-types/vray-dr",
        "job-types/vray-standalone"
      ]
    },
    {
      "group": "Cloud Rendering",
      "pages": [
        "cloud-rendering/overview",
        "cloud-rendering/credits-and-pricing",
        "cloud-rendering/request-access"
      ]
    },
    {
      "group": "Sanity Check",
      "pages": [
        "sanity-check/overview",
        "sanity-check/defaults",
        "sanity-check/custom-checks"
      ]
    },
    {
      "group": "Nodes",
      "pages": [
        "nodes/overview",
        "nodes/commands",
        "nodes/hardware-and-network",
        "nodes/software",
        "nodes/benchmark",
        "nodes/tags",
        "nodes/spawner-mode",
        "nodes/cpu-affinity"
      ]
    },
    {
      "group": "Analytics",
      "pages": [
        "software-analytics/overview",
        "statistics/overview"
      ]
    },
    {
      "group": "Scheduler",
      "pages": ["scheduler/overview"]
    },
    {
      "group": "Settings",
      "pages": ["settings/overview"]
    },
    {
      "group": "Developers",
      "pages": [
        "developers/authentication",
        "developers/rest-api",
        "developers/javascript-sdk",
        "developers/python-sdk",
        "developers/cli",
        "developers/mcp-server"
      ]
    },
    {
      "group": "Support",
      "pages": [
        "support/report-an-issue",
        "support/collecting-logs",
        "support/contact-us"
      ]
    }
  ]
}
```

Root pages `faq.md` and `glossary.md` should be added as top-level tabs or footer links.

---

## Product facts (for accurate documentation)

### RenderFlow
- **What**: Render farm management software ("the operating system for your render farm")
- **Platform**: Windows 10/11 (Linux, macOS coming soon)
- **Architecture**: Server + Nodes + Workstations, all connected via LAN
- **Database**: MongoDB (bundled, auto-installed)
- **Ports**: TCP 44442 (API), UDP 44443 (discovery), TCP 44444 (database), TCP 44445 (supervisor)
- **Install paths**: `C:\Program Files\Pulze\RenderFlow` and `C:\ProgramData\RenderFlow` (fixed)
- **Repository**: Shared network folder for job files, logs, updates, backups
- **Licensing**: Per-node, only machines that render need licenses. Server, submission, monitoring are free.
- **Trial**: 30 days, up to 10 nodes

### Supported applications
- **3ds Max**: 2019-2026, engines: Arnold, Corona, FStorm, Octane, Redshift, V-Ray. 27 verified plugins. License-free rendering via `-server` flag.
- **Blender**: 3.0-5.0, engines: Cycles, EEVEE, V-Ray
- **Cinema 4D**: 2023-2026, engines: Corona, Redshift, Octane, V-Ray
- **Fusion**: 17-21

### Key differentiators
- 3ds Max renders without Autodesk license on nodes (massive cost saver)
- Scene Manager deep integration (batch multi-job submission)
- Software Analytics (compare software versions across farm)
- Built-in sanity checks (52 default checks for 3ds Max, open source, customizable via MaxScript)
- Live VFB preview during rendering
- Scheduler for automating node availability
- Cloud rendering hybrid (on-prem + cloud burst)
- MCP Server for AI-assisted farm management
- Credit-based cloud pricing with no priority queues

### RenderFlow Cloud (closed beta)
- Credit-based pricing, no priority queues
- Scene Manager integration for batch cloud jobs
- Included V-Ray/Corona licensing (no BYO)
- VFB previews during cloud rendering
- Currently 3ds Max + V-Ray/Corona only

### Support channels
- Email: support@pulze.io
- Discord: https://discord.com/invite/BxtBs9aN4E
- Ticket form: https://forms.pulze.io/submit-ticket
- Website: pulze.io / renderflow.com

---

## Quality checklist (run before publishing)

- [ ] All internal links valid (no broken cross-references)
- [ ] All 58 files have complete frontmatter (title, description, og:title, og:description, twitter:title, keywords)
- [ ] No duplicate titles or descriptions across files
- [ ] All callout tags balanced (`<Info>`/`</Info>`, `<Warning>`/`</Warning>`, `<Tip>`/`</Tip>`)
- [ ] All `<Frame>` tags balanced
- [ ] No em dashes (—) anywhere
- [ ] No TODOs remaining
- [ ] Consistent terminology throughout
- [ ] Keywords include both branded and non-branded terms
- [ ] Developer docs link to `/developers/` paths (not `/renderflow/developers/`)
