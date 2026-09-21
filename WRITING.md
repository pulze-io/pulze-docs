# Writing the RenderFlow docs

The rules every page on docs.pulze.io follows. Read it before writing or revising a page. A review checks the page against it.

## Who reads it

| Pages | Primary reader | Must also be able to follow |
|---|---|---|
| Installation, deployment, services, network, requirements | IT | 3D artists |
| Submitting, monitoring, job types | 3D artists | TDs |
| Settings, API, scripting, sanity checks | TDs, IT | 3D artists |

Write for the primary reader. Do not assume knowledge the secondary reader lacks. When a term needs explaining, explain it once, in one sentence, where it first appears.

## Names

- The product is **RenderFlow 2**. Not "2.x", not "2.0", not "the beta". The previous version is **RenderFlow 1**.
- Use the label the app shows, in bold, spelled exactly: **Server**, **Workstation**, **Node**, **Create a job**, **Submit**, **Machines**, **Settings → Security**. Never paraphrase a label.
- The screens are Jobs, Machines, Farm, Statistics, Scheduler, Settings. The list of machines is the Machines screen. A dedicated render machine is a node.
- A job holds steps. A step is split into tasks. Tasks run on machines. The submitter offers templates. The panel that opens beside the jobs table is the details panel.
- Pulze terms: repository (the shared folder), pool, group, join token.

## Sentences

**Write the way a knowledgeable colleague explains something out loud.** Complete sentences, in a natural rhythm. This is the rule that matters most, and the one that is easiest to lose: cutting filler is not the same as cutting words, and a paragraph made only of four-word sentences reads like a telegram, not like documentation.

- **Vary the length.** A short sentence lands a point; a longer one carries the reason or the consequence along with it. If three sentences in a row are under six words, join two of them.
- **Join related facts into one sentence** rather than splitting them into three. "The installer puts RenderFlow in `C:\Program Files\Pulze\RenderFlow` and asks nothing else of you" beats "Run the .exe. It installs to: ... . It shows a progress bar only."
- Explain a thing once, properly, instead of three times in fragments.
- Cut sentences that carry nothing the reader needs. That is about content, never about making the surviving sentences shorter.
- Actions are imperatives. "Press **Submit**." Not "Submit sends it."
- No em dashes and no en dashes in prose. Use a full stop, a comma, a colon or parentheses.
- No metaphors and no product philosophy. Not "the canvas", not "the submitter as a room", not "a machine fact, not configuration". Describe what is on screen and what it does.
- No filler: "worth doing properly", "the step people miss", "which is exactly what", "in other words", "that is what".
- No marketing words: powerful, seamless, flagship, deliberately, modern.
- No reassurance and no editorializing: simply, just, easily, obviously.
- No conversational people-words: nobody, somebody, someone, anybody. A machine "runs unattended", a service starts "at user login", a workstation is activated "after a period of user inactivity".
- No closing summaries. No opening sentences that announce what the section will say.
- Explain the reason behind a behavior only when the reader must act on it. "The installer does not register a service. Register it yourself, with an account that can reach your storage." is enough.

## Scope

- The documentation is for studios: a server, workstations, render nodes and shared storage. Do not describe single-machine setups unless the page is about them.
- Document what ships. No plans, no previews, no "coming later".
- One page per topic. Two pages saying the same thing are merged.
- A how-to page has: what you need, the numbered steps, what you see when it worked, next steps. Nothing else.
- A reference page (requirements, flags) is tables first. Prose only where a table cannot carry it.

## Structure

- Lead every section with the sentence that answers the question. Detail after.
- When a section lists several things, bold the thing being described at the start of its paragraph: **From inside an application.**
- Callouts: `<Warning>` for data loss or a job that will fail, `<Tip>` for a recommended practice, `<Note>` for a fact the reader needs later. At most one callout per section.
- Steps use `<Steps>`. Per-OS instructions use `<Tabs>`, in the order Windows, Linux, macOS.
- Images: `<Frame caption>` around `<img src="/images/renderflow/rf_*.png" alt>`. The caption names what is on screen. Never reference an image that does not exist in `images/renderflow/`.

## Developer pages

The Scripting and Developers groups, and the generated API reference. Everything above still applies.

- REST examples use `<CodeGroup>` with curl, Python and TypeScript, in that order. Cookbook entries add `rfcli` last.
- Values in examples are plausible studio values, never `foo`. A scene is `//NAS/projects/hero/shots/010/lighting_v014.blend`, a pool is `Overnight`, an id is a 24-character hex string.
- No field appears in an example unless it exists in `packages/service/openapi.public.json`. No `rf.*` call unless it is in `renderflow/runtime.py`'s `__all__`. No `rfcli` command unless it is in `packages/cli/src/generated/commands.ts`.
- Each surface page opens with the one-machine case, which needs no credential, before the studio case.
- The API reference is generated from a committed copy of `openapi.public.json` by `scripts/sync-openapi.mjs`. Never edit that copy: fix the service's own annotations and re-run the script. It shortens each operation's title for the sidebar and moves the sentence to the description, and it strips the document's em dashes, because the spec writes for its own readers and this site does not.

## Before and after

| Do not write | Write |
|---|---|
| The insert control between cards adds the next step | Press the **+** button at the end of the chain and pick another template |
| **Submit** sends it | Press **Submit** |
| RenderFlow reads the scene and fills in what it finds | RenderFlow reads the scene properties: frame range, resolution, camera, output path and renderer |
| Open the row's chevron for the details panel beside the table | Double-click the job to open the details panel |
| A machine fact, not configuration. No reset removes it | The agreement is stored on the machine. A reset does not remove it |
| The rail on the left is the job | The left panel holds the job settings |
| Render nodes with nobody logged in | Unattended render nodes |
| Run the downloaded `.exe`. It installs to: ... The installer shows a progress bar only. | Run the downloaded installer, for example `renderflow-2.0.7-windows-x64.exe`, and RenderFlow is installed to `C:\Program Files\Pulze\RenderFlow`. |
| A Pulze account. Only the server signs in. | A Pulze account with a RenderFlow subscription or an active trial. Only the server signs in to it; the machines that join do not. |
| Same installer, same wizard, one different answer: choose **Node**. | Render nodes are set up exactly like a workstation, except that you choose **Node** in the wizard. |
| RenderFlow 2.x is currently in beta. These pages cover installation and getting a farm running; the rest is being written alongside the beta | RenderFlow 2 is in beta and this documentation is a work in progress |

## Frontmatter

Every page has `title`, `description`, `"og:title"`, `"og:description"`, `"twitter:title"` and `keywords`. Titles and descriptions follow the naming rules above.
