import { chromium } from 'playwright';

const STORAGE_KEY = 'personanova_state_v2';
const state = {
  onboarded: true,
  isAuthenticated: true,
  results: {
    archetype: 'founder',
    scores: {
      social: 72,
      discipline: 65,
      creative: 58,
      leadership: 88,
      empathy: 60,
      introspection: 55,
      risk: 70,
    },
    growthAreas: ['Empathy', 'Introspection'],
    topTraits: ['Leadership', 'Social'],
  },
};

const browser = await chromium.launch();

// ── Mobile (400px) check ──────────────────────────────────────────────
const mobile = await browser.newContext({ viewport: { width: 400, height: 900 } });
const page = await mobile.newPage();
const errors = [];
page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()); });
page.on('pageerror', (err) => errors.push('pageerror: ' + err.message));

await page.goto('http://localhost:5183/');
await page.evaluate(({ key, value }) => localStorage.setItem(key, JSON.stringify(value)), { key: STORAGE_KEY, value: state });
await page.goto('http://localhost:5183/dashboard');
await page.waitForTimeout(1200);

await page.screenshot({ path: '/tmp/dashboard_400.png', fullPage: true });

const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
console.log('Horizontal overflow at 400px:', overflow, 'scrollWidth:', await page.evaluate(() => document.documentElement.scrollWidth), 'clientWidth:', await page.evaluate(() => document.documentElement.clientWidth));

// ── Desktop (1280px) check for /report and PDF export ──────────────────
const desktop = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page2 = await desktop.newPage();
page2.on('console', (msg) => { if (msg.type() === 'error') errors.push('report: ' + msg.text()); });
page2.on('pageerror', (err) => errors.push('report pageerror: ' + err.message));
await page2.goto('http://localhost:5183/');
await page2.evaluate(({ key, value }) => localStorage.setItem(key, JSON.stringify(value)), { key: STORAGE_KEY, value: state });
await page2.goto('http://localhost:5183/dashboard');
await page2.waitForTimeout(1000);
await page2.screenshot({ path: '/tmp/dashboard_1280.png', fullPage: true });

await page2.goto('http://localhost:5183/report');
await page2.waitForTimeout(1500);
await page2.screenshot({ path: '/tmp/report_1280.png', fullPage: true });

// Trigger 1-page summary export and capture the download
const downloadPromise = page2.waitForEvent('download', { timeout: 20000 });
const summaryBtn = page2.getByRole('button', { name: /1.?page summary|summary/i });
await summaryBtn.first().click();
const download = await downloadPromise;
await download.saveAs('/tmp/onepage_summary.pdf');
console.log('PDF saved:', await download.path());

console.log('Console/page errors:', JSON.stringify(errors, null, 2));

await browser.close();
