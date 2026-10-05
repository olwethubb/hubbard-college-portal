// Visual QA helper: full-page screenshots of every route at every breakpoint.
//
//   node scripts/screenshots.mjs [baseUrl] [outDir] [widths]
//   node scripts/screenshots.mjs http://localhost:5173 qa-screens/local
//   node scripts/screenshots.mjs https://hubbard-modern-lead.base44.app qa-screens/original 1440,375
//
// Scrolls each page top-to-bottom first so `whileInView` animations have run,
// and reports console errors, failed requests and horizontal overflow.
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const base = (process.argv[2] || "http://localhost:5173").replace(/\/$/, "");
const outDir = process.argv[3] || "qa-screens/local";
const widths = (process.argv[4] || "1920,1600,1440,1280,1024,768,600,480,375,320").split(",").map(Number);
const routes = ["/", "/courses", "/cart", "/missing-page"];

fs.mkdirSync(outDir, { recursive: true });
const browser = await chromium.launch();
let problems = 0;

for (const width of widths) {
  const context = await browser.newContext({ viewport: { width, height: 900 } });
  const page = await context.newPage();
  const errors = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("requestfailed", (r) => errors.push(`request failed: ${r.url()}`));

  for (const route of routes) {
    errors.length = 0;
    await page.goto(base + route, { waitUntil: "networkidle" });
    await page.waitForTimeout(800);
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 400) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 80));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(1200);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    const name = `${route === "/" ? "home" : route.slice(1)}-${width}.png`;
    await page.screenshot({ path: path.join(outDir, name), fullPage: true });
    const issues = [...errors, ...(overflow > 0 ? [`horizontal overflow ${overflow}px`] : [])];
    problems += issues.length;
    console.log(`${name}${issues.length ? "\n  - " + issues.join("\n  - ") : "  ok"}`);
  }
  await context.close();
}

await browser.close();
console.log(problems ? `\n${problems} issue(s) found` : "\nNo issues found");
