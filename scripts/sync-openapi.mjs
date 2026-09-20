// Copies the service's published API document in, so the reference pages are generated from it.
//
// `openapi.public.json` is the half of the document a caller outside the installation can reach —
// the service writes it with `npm run api-spec`, and it is the same bytes a server hands out at
// `/openapi.json`. Mintlify generates a page per operation from the copy this puts here.
//
// Authentication and the server list are not patched here: they live in the service's own
// `specConfig`, so every consumer of `/openapi.json` gets them and this script only checks they
// arrived. What it does rewrite is presentation for a sidebar and for prose — a short title per
// operation, and the house style's ban on em dashes. Both are about this site, not the document.
//
// Run: node scripts/sync-openapi.mjs [path-to-renderflow-repo]

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const repo = process.argv[2] ?? process.env.RENDERFLOW_REPO ?? path.join(path.dirname(root), "pulze-renderflow");

const source = path.join(repo, "packages", "service", "openapi.public.json");
const target = path.join(root, "renderflow", "v2", "api-reference", "openapi.json");

if (!fs.existsSync(source)) {
    console.error(`No document at ${source}.\nPass the renderflow repo as an argument, or set RENDERFLOW_REPO.`);
    process.exit(1);
}

const raw = fs.readFileSync(source, "utf8");
const document = JSON.parse(raw);

// Checked rather than assumed: a document without these renders a reference nobody can send a
// request from, and the failure is silent — the pages build, the playground just has no key field.
const problems = [];

if (!document.components?.securitySchemes?.bearerAuth) {
    problems.push("no components.securitySchemes.bearerAuth — the playground will offer no credential field");
}

if (!Array.isArray(document.security) || document.security.length === 0) {
    problems.push("no top-level security — operations will not be marked as needing a credential");
}

for (const server of document.servers ?? []) {
    if (!/^https?:\/\//.test(server.url)) {
        problems.push(`server "${server.url}" is relative — a playground cannot send to it`);
    }
}

if (problems.length > 0) {
    console.error(`${source} is not ready to publish:\n${problems.map(line => `  - ${line}`).join("\n")}`);
    console.error("\nRun `npm run api-spec` in packages/service and check specConfig in src/api/server.ts.");
    process.exit(1);
}

/**
 * A short title per operation, because the generated pages take theirs from `summary`.
 *
 * The service writes summaries as whole sentences on purpose: its own convention is that an
 * operation carries no `description`, so anything a caller must not miss lives in the summary. That
 * is right for the document and wrong for a sidebar, where ninety-eight of them read as a wall and
 * "Take a job id and its repository folder before submitting" is one line of it.
 *
 * So the title comes from the **operation id**, which is already `verbResource`, and the sentence
 * moves to the description where the page still shows it. The method badge beside each entry says
 * GET or DELETE, so the title does not have to: under **Jobs**, `getJobs` is "List" and `deleteJob`
 * is "Delete". A tag plus a verb is what somebody scanning is actually looking for.
 */

/** What each verb is called in a sidebar. Absent verbs keep their own word. */
const VERBS = {
    get: "Retrieve",
    list: "List",
    create: "Create",
    update: "Update",
    delete: "Delete",
    reset: "Reset",
    start: "Start",
    stop: "Stop",
    finish: "Finish",
    restore: "Restore",
    archive: "Archive",
    reserve: "Reserve",
    run: "Run",
    preview: "Preview",
    test: "Test",
    open: "Open",
    stage: "Stage",
    set: "Set",
    rank: "Rank"
};

/** Ids whose verb and noun do not say what the operation does. `GET /schedule` returns the events. */
const TITLES = {
    getSchedule: "List events"
};

/** Where a tag names its resource differently from how operation ids spell it. Longest form first. */
const RESOURCES = {
    Archive: ["archived job", "archive"]
};

/** Plural of the tag's own noun, so `deleteJobs` under **Jobs** reads "Delete many". */
function singular(word) {
    return word.replace(/ies$/, "y").replace(/([^s])s$/, "$1");
}

function capitalise(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

/** The words each tag's own resource is spelled with: `Render licenses` and `UserGroups` are two. */
function resourceForms(tag) {
    const own = tag.replace(/([A-Z])/g, " $1").replace(/[^a-zA-Z ]/g, " ").trim().toLowerCase();
    return (RESOURCES[tag] ?? [own]).map(form => form.split(/\s+/));
}

/** How many leading words of `rest` are the tag's own resource, and whether it was written plural. */
function ownedPrefix(rest, tag) {
    for (const form of resourceForms(tag)) {
        if (form.length > rest.length) continue;
        if (form.some((word, i) => singular(word) !== singular(rest[i].toLowerCase()))) continue;
        const last = rest[form.length - 1].toLowerCase();
        return { length: form.length, plural: last !== singular(last) };
    }
    return { length: 0, plural: false };
}

function shortTitle(operationId, tag) {
    if (TITLES[operationId]) return TITLES[operationId];

    const words = operationId.replace(/([A-Z])/g, " $1").trim().split(/\s+/);
    const verb = words[0].toLowerCase();
    const rest = words.slice(1);

    // Whatever the tag already says, the entry does not have to: that repetition is the noise this
    // exists to remove.
    const owned = ownedPrefix(rest, tag);
    const remainder = rest.slice(owned.length).map(word => word.toLowerCase()).join(" ");

    const title = VERBS[verb] ?? capitalise(verb);

    // A read of something *inside* the resource is clearest as that thing's own name — the method
    // badge beside the entry already says GET, so "Retrieve" would be the third word saying nothing.
    if (title === "Retrieve" && remainder) return capitalise(remainder);
    if (title === "Retrieve" && owned.plural) return "List";

    if (remainder) return `${title} ${remainder}`;
    if (owned.plural) return `${title} many`;

    return title;
}

/**
 * House style here is no em dashes, and the service's own document is full of them: it uses one to
 * hang a caveat off a sentence, which is right for a spec and wrong for a published page beside
 * prose that never does it. A caveat after an em dash is always a sentence of its own, so it
 * becomes one.
 */
function withoutEmDashes(text) {
    if (!text.includes("—")) return text;

    return text.split(/\s*—\s*/).reduce((joined, part) => {
        const left = joined.replace(/[,:;]$/, "");
        const glue = /[.!?]$/.test(left) ? " " : ". ";
        return left + glue + part.charAt(0).toUpperCase() + part.slice(1);
    });
}

function sweep(node) {
    if (Array.isArray(node)) {
        node.forEach(sweep);
        return;
    }

    if (!node || typeof node !== "object") return;

    for (const [key, value] of Object.entries(node)) {
        if (typeof value !== "string") sweep(value);
        else if (key === "description" || key === "summary") node[key] = withoutEmDashes(value);
    }
}

let titled = 0;

for (const [route, verbs] of Object.entries(document.paths)) {
    for (const operation of Object.values(verbs)) {
        if (!operation.operationId || !operation.tags?.length) continue;

        const title = shortTitle(operation.operationId, operation.tags[0]);

        // The sentence becomes the description, which the page renders under the title, so nothing
        // the service wrote is lost — it stops being a link and starts being a subtitle.
        if (operation.summary && operation.summary !== title) operation.description = operation.summary;
        operation.summary = title;
        titled++;
    }
}

sweep(document);

fs.mkdirSync(path.dirname(target), { recursive: true });
fs.writeFileSync(target, `${JSON.stringify(document, null, 2)}\n`);

const operations = Object.values(document.paths).reduce((total, verbs) => total + Object.keys(verbs).length, 0);
const tags = new Set(Object.values(document.paths).flatMap(verbs => Object.values(verbs).flatMap(op => op.tags ?? [])));

console.log(`wrote ${path.relative(root, target)} — ${operations} operations across ${tags.size} tags, ${Object.keys(document.components.schemas).length} schemas`);
console.log(`shortened ${titled} summaries whose caveat now reads as the description instead`);
console.log(`servers: ${(document.servers ?? []).map(s => s.url).join(", ")}`);
