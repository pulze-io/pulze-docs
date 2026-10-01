/**
 * Captures the raw UI shots for the Project Dream docs from the pulze-dream screenshot harness.
 *
 *   DREAM_REPO=<pulze-dream checkout> node shoot.mjs [--only name,name]
 *
 * Run it from <pulze-dream>/packages/frontend (Vite and Tailwind resolve their config from cwd).
 * Writes shots/<name>.dark.png (dark only: Dream's docs use the dark theme). Frame them with
 * `node render.mjs frame ...` — see build.sh for the full list.
 */
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const repo = process.env.DREAM_REPO
if (!repo) throw new Error('Set DREAM_REPO to your pulze-dream checkout')
const fe = path.join(repo, 'packages/frontend')
const { capture, argList } = await import(pathToFileURL(path.join(fe, 'harness/capture.mjs')).href)

const outDir = path.resolve(import.meta.dirname, 'shots')
const only = argList('--only')
const define = { 'process.env.NODE_ENV': '"production"', 'import.meta.env.VITE_ENVIRONMENT': '""' }

const settle = (page) => page.evaluate(() => document.activeElement?.blur?.()).then(() => page.waitForTimeout(300))

const APP = [
    { name: 'app-edit', note: 'Classic view, Edit Image day-to-night', viewport: { width: 1424, height: 1044 }, query: { edit: 'night', seed: '4' } },
    { name: 'app-home', note: 'Home page', viewport: { width: 1424, height: 1044 }, query: { page: 'home' } },
    {
        name: 'app-model-picker',
        note: 'Edit Image with the model picker open',
        viewport: { width: 1424, height: 1044 },
        query: { type: 'instruct', feed: 'mixed', running: '0', seed: '5' },
        act: async (page) => {
            await page.locator('.modelTrigger').first().click()
            await page.waitForSelector('.modelOption >> visible=true', { timeout: 5000 })
            await page.waitForTimeout(500)
        }
    },
    {
        name: 'app-result-hover',
        note: 'A finished Edit Image job with its result hovered, showing the result actions',
        viewport: { width: 1424, height: 1044 },
        query: { edit: 'night', seed: '4' },
        act: async (page) => {
            const box = await page.locator('.jobResults img').first().boundingBox()
            await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 6 })
            await page.waitForTimeout(700)
        }
    },
    {
        name: 'app-grid-filters',
        note: 'Grid feed with the Filters panel open',
        viewport: { width: 1424, height: 1044 },
        query: { type: 'instruct', feed: 'mixed', view: 'grid', jobs: '14', seed: '3' },
        act: async (page) => {
            await page.getByRole('button', { name: 'Filters' }).first().click()
            await page.waitForTimeout(600)
        }
    },
    {
        name: 'app-viewer',
        note: 'Full-screen viewer on the day-to-night edit',
        viewport: { width: 1424, height: 1044 },
        query: { edit: 'night', seed: '4' },
        act: async (page) => {
            await page.locator('.jobResults img').first().click()
            await page.waitForTimeout(1200)
        }
    },
    {
        name: 'app-mask',
        note: 'Edit Image with the mask editor open',
        viewport: { width: 1424, height: 1044 },
        query: { type: 'instruct', fixture: 'interior-loft', feed: 'mixed', running: '0' },
        act: async (page) => {
            await page.getByText('Draw mask').first().click()
            await page.waitForTimeout(1500)
            // paint the sofa: a few overlapping strokes with the default 140 px brush
            for (const y of [565, 595, 625]) {
                await page.mouse.move(575, y)
                await page.mouse.down()
                await page.mouse.move(870, y, { steps: 20 })
                await page.mouse.up()
            }
            await page.mouse.move(1300, 1000)
            await page.waitForTimeout(600)
        }
    },
    {
        name: 'app-viewer-compare',
        note: 'Viewer in Comparison mode',
        viewport: { width: 1424, height: 1044 },
        query: { edit: 'night', seed: '4' },
        act: async (page) => {
            await page.locator('.jobResults img').first().click()
            await page.waitForTimeout(1200)
            await page.getByText('Comparison', { exact: true }).click()
            await page.waitForTimeout(1200)
        }
    },
    {
        name: 'app-viewer-send',
        note: 'Viewer with the Send result to menu open',
        viewport: { width: 1424, height: 1044 },
        query: { edit: 'night', seed: '4' },
        act: async (page) => {
            await page.locator('.jobResults img').first().click()
            await page.waitForTimeout(1200)
            await page.getByText('Send result to').first().click()
            await page.waitForTimeout(800)
        }
    },
    {
        name: 'app-segments',
        note: 'Character Enhancer selection editor',
        viewport: { width: 1424, height: 1044 },
        query: { type: 'detailer', fixture: 'hotel-lobby-guest', segments: '1', feed: 'mixed', running: '0' },
        act: async (page) => {
            await page.getByText('Selection editor').first().click()
            await page.waitForTimeout(2500)
        }
    },
    {
        name: 'app-detailer',
        note: 'Character Enhancer composer',
        viewport: { width: 1424, height: 1044 },
        query: { type: 'detailer', fixture: 'hotel-lobby-guest', segments: '1', feed: 'mixed', running: '0' }
    }
].map((s) => ({ ...s, act: s.act ?? settle, query: { ...s.query, locale: 'en' } }))

const COMPOSER = [
    { name: 'composer-t2i', note: 'Text to Image with a prompt', viewport: { width: 392, height: 1100 }, query: { type: 'text', locale: 'en' },
      act: async (page) => {
            await page.locator('textarea:visible').first().fill("A Nordic timber cabin on a lake shore at dusk, warm light in the windows, mist over the water, photorealistic architectural render")
            await page.locator('textarea:visible').first().blur()
            await page.waitForTimeout(400)
        } },
    { name: 'composer-i2i', note: 'Image to Image with an input image', viewport: { width: 392, height: 1800 }, query: { type: 'image', image: '1', fixture: 'forest-cabin', locale: 'en' } },
    { name: 'composer-i2i-mood', note: 'Image to Image with Reference mood open', viewport: { width: 392, height: 1800 }, query: { type: 'image', image: '1', fixture: 'forest-cabin', locale: 'en' },
      act: async (page) => { await page.getByText('Reference mood', { exact: true }).first().click(); await page.waitForTimeout(800) } },
    { name: 'composer-upscale-magnific', note: 'Creative Upscaler on Magnific Creative', viewport: { width: 392, height: 1600 }, query: { type: 'upscaler', engine: 'magnific', image: '1', fixture: 'facade-dusk', locale: 'en' } },
    { name: 'composer-video-fl', note: 'Animate Image, First & Last frames', viewport: { width: 392, height: 1500 }, query: { type: 'video', mode: 'first-and-last', image: '1', fixture: 'forest-cabin', end: 'forest-cabin-low', locale: 'en' },
      act: async (page) => {
            await page.locator('textarea:visible').first().fill("Slow dolly from the garden towards the front door, soft daylight, gentle wind in the pines")
            await page.locator('textarea:visible').first().blur()
            await page.waitForTimeout(400)
        } },
    { name: 'composer-music', note: 'Music Generation with a prompt', viewport: { width: 392, height: 1100 }, query: { type: 'music', locale: 'en' },
      act: async (page) => {
            await page.locator('textarea:visible').first().fill("Calm piano and strings, warm and hopeful, 90 bpm, for a real estate film")
            await page.locator('textarea:visible').first().blur()
            await page.waitForTimeout(400)
        } },
    { name: 'composer-instruct-prompt', note: 'Edit Image prompt block', viewport: { width: 392, height: 1100 }, query: { type: 'instruct', image: '1', fixture: 'forest-cabin', locale: 'en' },
      act: async (page) => {
            await page.locator('textarea:visible').first().fill("Make it a snowy winter evening, keep the house and camera exactly the same.")
            await page.locator('textarea:visible').first().blur()
            await page.waitForTimeout(400)
        } },
    { name: 'composer-connections', note: 'Image to Image with 3ds Max connected', viewport: { width: 392, height: 1000 }, query: { type: 'image', host: 'max', locale: 'en' } }
]

const openBadge = (badge) => async (page) => {
    await page.waitForFunction(() => document.fonts.check('16px "Font Awesome 6 Pro"'), null, { timeout: 15000 }).catch(() => {})
    await page.locator(`[data-badge="${badge}"]`).first().click()
    await page.waitForTimeout(450)
}
const HEADER = { width: 1440, height: 560 }
const BADGES = [
    { name: 'badge-teams', note: 'Team picker', viewport: HEADER, query: {}, act: openBadge('teams') },
    { name: 'badge-license', note: 'Pro license menu', viewport: HEADER, query: {}, act: openBadge('license') },
    { name: 'badge-credits', note: 'Credits hover card', viewport: HEADER, query: {},
      act: async (page) => { await page.locator('[data-badge="credits"]').first().hover(); await page.waitForTimeout(450) } }
]

const pick = (list) => (only.length ? list.filter((s) => only.includes(s.name)) : list)
const run = (page, shots, waitFor, scale, prod = page.includes('app')) =>
    shots.length && capture({ root: fe, page, shots, outDir, port: 9870, themes: ['dark'], waitFor, scale, define: prod ? define : undefined })

await run('/harness/app.html', pick(APP), '#app > *', 2)
await run('/harness/badges.html', pick(BADGES), 'header', 2, true)
await run('/harness/composer.html', pick(COMPOSER), '.composerIn', 4)
