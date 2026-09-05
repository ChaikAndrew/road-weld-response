#!/usr/bin/env node
/**
 * Production smoke checks for Labida LLC.
 * Usage: BASE_URL=http://localhost:3010 node scripts/prod-smoke.mjs
 */
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const BASE = (process.env.BASE_URL || "http://localhost:3000").replace(/\/$/, "");

const SERVICE_IDS = [
  "emergency-mobile-welding",
  "heavy-equipment-repair",
  "fleet-maintenance",
  "metal-fabrication",
];

const PAGES = [
  "/",
  "/privacy",
  ...SERVICE_IDS.map((id) => `/services/${id}`),
];

const ASSETS = [
  "/favicon.ico",
  "/pictures/pic1.jpg",
  "/pictures/pic2.jpg",
  "/pictures/pic3.jpg",
  "/tiktok/excavator.jpg",
  "/tiktok/dock-repair.jpg",
  "/tiktok/mobile-welding.jpg",
  "/redketchup/favicon-16x16.png",
  "/redketchup/favicon-32x32.png",
  "/redketchup/apple-touch-icon.png",
  "/redketchup/android-chrome-192x192.png",
  "/redketchup/android-chrome-512x512.png",
  "/redketchup/site.webmanifest",
];

const ANCHORS = ["home", "services", "about", "why-us", "work", "faq", "contact"];

const failures = [];
const warnings = [];
const passes = [];

function ok(msg) {
  passes.push(msg);
  console.log(`  ✓ ${msg}`);
}

function fail(msg) {
  failures.push(msg);
  console.log(`  ✗ ${msg}`);
}

function warn(msg) {
  warnings.push(msg);
  console.log(`  ! ${msg}`);
}

async function extractServiceIdsFromSource() {
  const servicePage = await readFile(
    path.join(ROOT, "app/services/[id]/page.tsx"),
    "utf8"
  );
  const servicesSection = await readFile(
    path.join(ROOT, "components/ServicesSection.tsx"),
    "utf8"
  );
  const sitemap = await readFile(path.join(ROOT, "app/sitemap.ts"), "utf8");
  const tiktok = await readFile(
    path.join(ROOT, "components/TikTokSection.tsx"),
    "utf8"
  );

  const fromPage = [...servicePage.matchAll(/"([a-z0-9-]+)":\s*\{/g)].map(
    (m) => m[1]
  );
  const fromCards = [
    ...servicesSection.matchAll(/id:\s*"([a-z0-9-]+)"/g),
  ].map((m) => m[1]);
  const fromSitemap = [
    ...sitemap.matchAll(/"([a-z0-9-]+)"/g),
  ]
    .map((m) => m[1])
    .filter((id) => id.includes("-"));
  const thumbs = [...tiktok.matchAll(/thumbnail:\s*"([^"]+)"/g)].map(
    (m) => m[1]
  );

  return { fromPage, fromCards, fromSitemap, thumbs };
}

async function sourceConsistency() {
  console.log("\n== Source consistency ==");
  const { fromPage, fromCards, fromSitemap, thumbs } = await extractServiceIdsFromSource();

  const same = (a, b) =>
    a.length === b.length && a.every((id, i) => id === b[i]);

  if (same(fromPage, SERVICE_IDS)) ok("service page IDs match expected list");
  else fail(`service page IDs mismatch: ${fromPage.join(", ")}`);

  if (same(fromCards, SERVICE_IDS)) ok("home service card IDs match pages");
  else fail(`home service card IDs mismatch: ${fromCards.join(", ")}`);

  if (SERVICE_IDS.every((id) => fromSitemap.includes(id))) {
    ok("sitemap includes all service IDs");
  } else {
    fail(`sitemap missing IDs: ${SERVICE_IDS.filter((id) => !fromSitemap.includes(id)).join(", ")}`);
  }

  for (const thumb of thumbs) {
    const file = path.join(ROOT, "public", thumb.replace(/^\//, ""));
    if (existsSync(file)) ok(`tiktok thumbnail exists: ${thumb}`);
    else fail(`missing tiktok thumbnail: ${thumb}`);
  }

  const roadsideInCopy = [
    "app/page.tsx",
    "app/layout.tsx",
    "app/privacy/page.tsx",
    "app/services/[id]/page.tsx",
    "components/HeroSection.tsx",
    "components/ServicesSection.tsx",
    "components/AboutSeoSection.tsx",
    "components/FAQSection.tsx",
    "components/Footer.tsx",
    "lib/seoContent.ts",
  ];
  for (const rel of roadsideInCopy) {
    const text = await readFile(path.join(ROOT, rel), "utf8");
    if (/\broadside\b/i.test(text)) {
      fail(`${rel} still contains "roadside"`);
    }
  }
  ok("no leftover 'roadside' in public copy sources");
}

async function fetchStatus(pathname, options = {}) {
  const url = pathname.startsWith("http") ? pathname : `${BASE}${pathname}`;
  const res = await fetch(url, {
    redirect: options.redirect || "manual",
    method: options.method || "GET",
    headers: options.headers,
    body: options.body,
  });
  return { url, res, status: res.status, location: res.headers.get("location") };
}

async function httpChecks() {
  console.log("\n== HTTP routes ==");

  for (const page of PAGES) {
    const { status } = await fetchStatus(page, { redirect: "follow" });
    if (status === 200) ok(`${page} → 200`);
    else fail(`${page} → ${status}`);
  }

  const old = await fetchStatus("/services/emergency-roadside-welding");
  if ([301, 308].includes(old.status) && (old.location || "").includes("/services/emergency-mobile-welding")) {
    ok(`old roadside URL redirects ${old.status} → ${old.location}`);
  } else {
    fail(
      `old roadside URL expected 301/308 to emergency-mobile-welding, got ${old.status} ${old.location || ""}`
    );
  }

  const missing = await fetchStatus("/services/this-service-does-not-exist", {
    redirect: "follow",
  });
  if (missing.status === 404) ok("unknown service → 404");
  else fail(`unknown service → ${missing.status} (expected 404)`);

  const robots = await fetchStatus("/robots.txt", { redirect: "follow" });
  const robotsText = await robots.res.text();
  if (robots.status === 200 && robotsText.includes("sitemap.xml")) {
    ok("robots.txt includes sitemap");
  } else {
    fail(`robots.txt status=${robots.status} body=${robotsText.slice(0, 120)}`);
  }

  const sitemap = await fetchStatus("/sitemap.xml", { redirect: "follow" });
  const sitemapText = await sitemap.res.text();
  if (sitemap.status !== 200) {
    fail(`sitemap.xml → ${sitemap.status}`);
  } else {
    ok("sitemap.xml → 200");
    for (const id of SERVICE_IDS) {
      if (sitemapText.includes(`/services/${id}`)) ok(`sitemap has /services/${id}`);
      else fail(`sitemap missing /services/${id}`);
    }
    if (sitemapText.includes("/privacy")) ok("sitemap has /privacy");
    else fail("sitemap missing /privacy");
  }

  for (const asset of ASSETS) {
    const { status } = await fetchStatus(asset, { redirect: "follow" });
    if (status === 200) ok(`${asset} → 200`);
    else fail(`${asset} → ${status}`);
  }

  const manifest = await fetchStatus("/redketchup/site.webmanifest", {
    redirect: "follow",
  });
  const manifestJson = await manifest.res.clone().json().catch(() => null);
  const iconSrcs = manifestJson?.icons?.map((icon) => icon.src) || [];
  if (
    iconSrcs.includes("/redketchup/android-chrome-192x192.png") &&
    iconSrcs.includes("/redketchup/android-chrome-512x512.png")
  ) {
    ok("site.webmanifest icon paths point to /redketchup/");
  } else {
    fail(`site.webmanifest icon paths unexpected: ${iconSrcs.join(", ")}`);
  }

  const badContact = await fetchStatus("/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ name: "Test" }),
    redirect: "follow",
  });
  if (badContact.status === 400) ok("POST /api/contact with missing fields → 400");
  else fail(`POST /api/contact missing fields → ${badContact.status} (expected 400)`);
}

function isIgnorableConsole(text, url = "") {
  const hay = `${text} ${url}`.toLowerCase();
  return (
    hay.includes("googletagmanager") ||
    hay.includes("gtag") ||
    hay.includes("google-analytics") ||
    hay.includes("tiktok.com") ||
    hay.includes("openfreemap") ||
    hay.includes("cartocdn") ||
    hay.includes("download the react devtools") ||
    hay.includes("third-party cookie") ||
    hay.includes("net::err_blocked") ||
    hay.includes("net::err_aborted") ||
    hay.includes("failed to load resource") && hay.includes("chrome-extension")
  );
}

async function collectPageIssues(page, label) {
  const issues = [];
  const onConsole = (msg) => {
    if (msg.type() !== "error") return;
    const text = msg.text();
    const loc = msg.location()?.url || "";
    if (!isIgnorableConsole(text, loc)) {
      issues.push(`[console] ${text}`);
    }
  };
  const onPageError = (err) => {
    issues.push(`[pageerror] ${err.message}`);
  };
  const onResponse = (res) => {
    const url = res.url();
    if (!url.startsWith(BASE)) return;
    if (res.status() >= 400) {
      issues.push(`[http ${res.status()}] ${url.replace(BASE, "")}`);
    }
  };

  page.on("console", onConsole);
  page.on("pageerror", onPageError);
  page.on("response", onResponse);

  return {
    issues,
    detach() {
      page.off("console", onConsole);
      page.off("pageerror", onPageError);
      page.off("response", onResponse);
    },
    report() {
      const unique = [...new Set(issues)];
      if (unique.length === 0) ok(`${label}: no first-party console/HTTP errors`);
      else unique.forEach((item) => fail(`${label}: ${item}`));
    },
  };
}

async function desktopBrowserChecks(browser) {
  console.log("\n== Browser (desktop 1280x800) ==");
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  const collector = await collectPageIssues(page, "home");

  await page.goto(`${BASE}/`, { waitUntil: "networkidle2", timeout: 45000 });

  const title = await page.title();
  if (/labida/i.test(title) && !/roadside/i.test(title)) {
    ok(`home title: ${title}`);
  } else {
    fail(`unexpected title: ${title}`);
  }

  const h1 = await page.$eval("h1", (el) => el.textContent?.trim() || "");
  if (/mobile welding/i.test(h1) && !/roadside/i.test(h1)) ok(`home h1: ${h1}`);
  else fail(`home h1 unexpected: ${h1}`);

  const bodyText = await page.evaluate(() => document.body.innerText);
  if (/\broadside\b/i.test(bodyText)) fail("home visible text still contains 'roadside'");
  else ok("home visible text has no 'roadside'");

  for (const id of ANCHORS) {
    const exists = await page.$(`#${id}`);
    if (exists) ok(`anchor #${id} present`);
    else fail(`missing anchor #${id}`);
  }

  const serviceHrefs = await page.$$eval('a[href^="/services/"]', (els) =>
    [...new Set(els.map((el) => el.getAttribute("href") || ""))]
  );
  for (const id of SERVICE_IDS) {
    if (serviceHrefs.includes(`/services/${id}`)) ok(`home links to /services/${id}`);
    else fail(`home missing link to /services/${id}`);
  }

  const workButtons = await page.$$("#work button[aria-label^='Watch']");
  if (workButtons.length === 3) ok("Work section has 3 video cards");
  else fail(`Work section video cards: ${workButtons.length} (expected 3)`);

  const faqButtons = await page.$$("#faq button");
  if (faqButtons.length >= 8) ok(`FAQ has ${faqButtons.length} questions`);
  else fail(`FAQ question count ${faqButtons.length} looks too low`);

  if (faqButtons[0]) {
    await faqButtons[0].click();
    const expanded = await page.$eval("#faq button", (el) =>
      el.getAttribute("aria-expanded")
    );
    if (expanded === "true") ok("FAQ first question expands");
    else warn(`FAQ aria-expanded=${expanded} after click`);
  }

  await workButtons[0]?.click();
  await page.waitForSelector('[role="dialog"]', { timeout: 8000 });
  const dialog = await page.$('[role="dialog"]');
  if (dialog) ok("TikTok modal opens");
  else fail("TikTok modal did not open");

  await page.click('[aria-label="Close video"]');
  await page.waitForSelector('[role="dialog"]', { hidden: true, timeout: 5000 });
  ok("TikTok modal closes");

  await page.evaluate(() => document.querySelector("#contact")?.scrollIntoView());
  await page.waitForSelector("#contact form", { timeout: 5000 });
  await page.click('#contact button[type="submit"]');
  const nameError = await page.$eval("#name + p, #contact p", async () => {
    await new Promise((r) => setTimeout(r, 300));
    const labels = [...document.querySelectorAll("#contact p")].map((p) =>
      p.textContent || ""
    );
    return labels.some((t) => /name is required/i.test(t));
  });
  if (nameError) ok("contact form shows validation errors on empty submit");
  else fail("contact form did not show required-field errors");

  await page.waitForFunction(
    () =>
      !!document.querySelector('[aria-label="Labida LLC location map"] canvas') ||
      !!document.querySelector('[aria-label="Labida LLC location map"] .maplibregl-canvas') ||
      document.body.innerText.includes("Loading map"),
    { timeout: 15000 }
  ).catch(() => null);

  const mapReady = await page.evaluate(async () => {
    const start = Date.now();
    while (Date.now() - start < 12000) {
      const canvas = document.querySelector(
        '[aria-label="Labida LLC location map"] canvas, [aria-label="Labida LLC location map"] .maplibregl-canvas'
      );
      if (canvas) return true;
      await new Promise((r) => setTimeout(r, 250));
    }
    return false;
  });
  if (mapReady) ok("contact map canvas rendered");
  else warn("contact map canvas did not appear within 12s (tiles/network?)");

  const jsonLd = await page.$$eval(
    'script[type="application/ld+json"]',
    (els) => els.map((el) => el.textContent || "")
  );
  if (jsonLd.length < 2) fail(`expected ≥2 JSON-LD blocks, got ${jsonLd.length}`);
  for (const [i, raw] of jsonLd.entries()) {
    try {
      const data = JSON.parse(raw);
      ok(`JSON-LD[${i}] parses as ${data["@type"] || "unknown"}`);
      const blob = JSON.stringify(data);
      if (
        data["@type"] === "HomeAndConstructionBusiness" &&
        (blob.includes("143 NY 104") || /"addressLocality":"Ontario"/.test(blob))
      ) {
        ok(`JSON-LD[${i}] has Ontario address`);
      }
    } catch {
      fail(`JSON-LD[${i}] is invalid JSON`);
    }
  }

  collector.detach();
  collector.report();

  for (const pathname of ["/privacy", ...SERVICE_IDS.map((id) => `/services/${id}`)]) {
    const sub = await collectPageIssues(page, pathname);
    await page.goto(`${BASE}${pathname}`, {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });
    const heading = await page.$eval("h1", (el) => el.textContent?.trim() || "").catch(() => "");
    if (heading) ok(`${pathname} h1: ${heading}`);
    else fail(`${pathname} missing h1`);
    if (pathname.startsWith("/services/")) {
      const call = await page.$('a[href="tel:+15853157599"]');
      const form = await page.$('a[href="/#contact"]');
      if (call && form) ok(`${pathname} has Call Now + Contact Form`);
      else fail(`${pathname} missing contact CTAs`);
    }
    await page.waitForSelector("footer", { timeout: 8000 });
    sub.detach();
    sub.report();
  }

  await page.close();
}

async function mobileBrowserChecks(browser) {
  console.log("\n== Browser (mobile 390x844) ==");
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  const collector = await collectPageIssues(page, "mobile home");
  await page.goto(`${BASE}/`, { waitUntil: "domcontentloaded", timeout: 45000 });

  const menuBtn = await page.$('button[aria-label="Toggle mobile menu"]');
  if (!menuBtn) {
    fail("mobile menu button missing");
  } else {
    await menuBtn.click();
    const workLinkVisible = await page.evaluate(() => {
      const links = [...document.querySelectorAll('a[href="/#work"]')];
      return links.some((el) => {
        const style = window.getComputedStyle(el);
        return style.display !== "none" && style.visibility !== "hidden";
      });
    });
    if (workLinkVisible) ok("mobile menu includes Work");
    else fail("mobile menu missing Work link");
  }

  const tiktok = await page.$('a[aria-label="Labida LLC on TikTok"]');
  if (tiktok) ok("floating TikTok button present on mobile");
  else fail("floating TikTok button missing on mobile");

  const call = await page.$('a[aria-label="Call Now"]');
  if (call) ok("floating Call Now present on mobile");
  else fail("floating Call Now missing on mobile");

  collector.detach();
  collector.report();
  await page.close();
}

async function main() {
  console.log(`Smoke tests against ${BASE}`);

  await sourceConsistency();
  await httpChecks();

  const chromePath =
    process.env.PUPPETEER_EXECUTABLE_PATH ||
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

  const browser = await puppeteer.launch({
    headless: true,
    executablePath: existsSync(chromePath) ? chromePath : undefined,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  try {
    await desktopBrowserChecks(browser);
    await mobileBrowserChecks(browser);
  } finally {
    await browser.close();
  }

  console.log("\n== Summary ==");
  console.log(`  passed:   ${passes.length}`);
  console.log(`  warnings: ${warnings.length}`);
  console.log(`  failed:   ${failures.length}`);
  if (warnings.length) {
    console.log("\nWarnings:");
    for (const item of warnings) console.log(`  - ${item}`);
  }
  if (failures.length) {
    console.log("\nFailures:");
    for (const item of failures) console.log(`  - ${item}`);
    process.exitCode = 1;
  } else {
    console.log("\nNo blocking failures.");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
