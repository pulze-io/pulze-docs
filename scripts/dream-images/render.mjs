/**
 * Makes the Project Dream docs images (images/project-dream/*.webp).
 *
 *   node render.mjs frame <shot.png> <out.webp> <W>x<H> [--inset 0.72]
 *       A UI screenshot centred on the docs background (bg.js), as a window.
 *   node render.mjs html <page.html> <out.webp> <W>x<H>
 *       A mockup/diagram page. It gets window.paintDocsBg and a #bg canvas behind its content.
 *
 * W x H are the CSS size (the placeholder's size); output is 2x. Screenshots come from the
 * pulze-dream harnesses (packages/frontend/harness, see its ui-screenshots skill).
 * Needs Playwright: run with DREAM_REPO=<pulze-dream checkout> or with playwright installed here.
 */
import { readFile, writeFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const req = createRequire(path.join(process.env.DREAM_REPO ?? process.cwd(), 'package.json'))
const { chromium } = req('playwright')
const BG = await readFile(new URL('./bg.js', import.meta.url), 'utf8')

const [mode, src, out, size] = process.argv.slice(2)
const [W, H] = size.split('x').map(Number)
const inset = Number(process.argv[process.argv.indexOf('--inset') + 1]) || 0.72

const shell = (body, css = '', base = '') => `<!DOCTYPE html><html><head><meta charset="utf-8">${base}
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>html,body{margin:0;width:${W}px;height:${H}px;overflow:hidden;font-family:Poppins,sans-serif}
#bg{position:absolute;inset:0;width:${W}px;height:${H}px}${css}</style></head>
<body><canvas id="bg" width="${W}" height="${H}"></canvas>${body}
<script>${BG};paintDocsBg(document.getElementById('bg'))</script></body></html>`

let html
if (mode === 'frame') {
    const data = `data:image/png;base64,${(await readFile(src)).toString('base64')}`
    html = shell(`<img src="${data}">`, `body{display:flex;align-items:center;justify-content:center}
img{position:relative;display:block;max-width:${Math.round(W * inset)}px;max-height:${Math.round(H * (inset + 0.08))}px;
border-radius:6px;box-shadow:0 0 0 1px rgba(255,255,255,.1),0 24px 60px -20px rgba(40,12,4,.45)}`)
} else {
    // The page's own markup goes on top of the background; its <style> and <body> content are kept.
    const page = await readFile(src, 'utf8')
    const style = page.match(/<style>([\s\S]*?)<\/style>/)?.[1] ?? ''
    const body = page.replace(/<style>[\s\S]*?<\/style>/, '')
    // Relative src="assets/…" resolve from the page's own folder.
    html = shell(`<div id="root" style="position:absolute;inset:0">${body}</div>`, style,
        `<base href="${pathToFileURL(path.resolve(src)).href}">`)
}

const browser = await chromium.launch()
const pg = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 2 })
const tmp = path.resolve(path.dirname(out), `.${path.basename(out)}.html`)
await writeFile(tmp, html)
await pg.goto('file:///' + tmp.replace(/\\/g, '/'))
await pg.waitForLoadState('networkidle')
await pg.evaluate(() => document.fonts.ready)
const png = await pg.screenshot({ type: 'png' })
// webp via the browser's own encoder (no image library needed)
const webp = await pg.evaluate(async (b64) => {
    const img = new Image(); img.src = 'data:image/png;base64,' + b64; await img.decode()
    const c = document.createElement('canvas'); c.width = img.width; c.height = img.height
    c.getContext('2d').drawImage(img, 0, 0)
    return c.toDataURL("image/webp", 0.85).split(',')[1]
}, png.toString('base64'))
await writeFile(out, Buffer.from(webp, 'base64'))
await (await import('node:fs/promises')).rm(tmp)
await browser.close()
console.log('→', out)
