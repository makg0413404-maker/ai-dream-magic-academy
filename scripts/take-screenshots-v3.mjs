import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';

const BASE_URL = 'http://localhost:3000';
const OUTPUT_DIR = path.resolve('public/images/screenshots');

fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const DESKTOP = { width: 1280, height: 900 };
const MOBILE = { width: 390, height: 844 };

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function main() {
  console.log('🚀 Re-taking select screenshots for better quality...');
  const browser = await chromium.launch({ headless: true });

  try {
    // --- Courses page: full-page to show all 3 cards ---
    console.log('\n📸 Courses (full-page):');
    
    let ctx = await browser.newContext({ viewport: DESKTOP, deviceScaleFactor: 2, locale: 'zh-TW', timezoneId: 'Asia/Taipei' });
    let page = await ctx.newPage();
    
    await page.goto(`${BASE_URL}/courses`, { waitUntil: 'networkidle', timeout: 30000 });
    await sleep(1000);
    
    const fullHeight = await page.evaluate(() => document.documentElement.scrollHeight);
    await page.setViewportSize({ width: 1280, height: Math.min(fullHeight, 4000) });
    await sleep(500);
    await page.screenshot({ path: path.join(OUTPUT_DIR, 'courses-desktop.png'), fullPage: true });
    console.log('  ✓ courses-desktop.png (full-page)');
    await ctx.close();

    // --- Mobile courses full-page ---
    ctx = await browser.newContext({ viewport: MOBILE, deviceScaleFactor: 2, locale: 'zh-TW', timezoneId: 'Asia/Taipei' });
    page = await ctx.newPage();
    
    await page.goto(`${BASE_URL}/courses`, { waitUntil: 'networkidle', timeout: 30000 });
    await sleep(1000);
    
    const mHeight = await page.evaluate(() => document.documentElement.scrollHeight);
    await page.setViewportSize({ width: 390, height: Math.min(mHeight, 6000) });
    await sleep(500);
    await page.screenshot({ path: path.join(OUTPUT_DIR, 'courses-mobile.png'), fullPage: true });
    console.log('  ✓ courses-mobile.png (full-page)');
    await ctx.close();

    // --- Hero full-page screenshot ---
    console.log('\n📸 Hero page (full-page):');
    ctx = await browser.newContext({ viewport: DESKTOP, deviceScaleFactor: 2, locale: 'zh-TW', timezoneId: 'Asia/Taipei' });
    page = await ctx.newPage();
    
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle', timeout: 30000 });
    await sleep(1000);
    
    const hHeight = await page.evaluate(() => document.documentElement.scrollHeight);
    await page.setViewportSize({ width: 1280, height: Math.min(hHeight, 4000) });
    await sleep(500);
    await page.screenshot({ path: path.join(OUTPUT_DIR, 'hero-fullpage-desktop.png'), fullPage: true });
    console.log('  ✓ hero-fullpage-desktop.png');
    await ctx.close();

    // Mobile hero full-page
    ctx = await browser.newContext({ viewport: MOBILE, deviceScaleFactor: 2, locale: 'zh-TW', timezoneId: 'Asia/Taipei' });
    page = await ctx.newPage();
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle', timeout: 30000 });
    await sleep(1000);
    const mhHeight = await page.evaluate(() => document.documentElement.scrollHeight);
    await page.setViewportSize({ width: 390, height: Math.min(mhHeight, 6000) });
    await sleep(500);
    await page.screenshot({ path: path.join(OUTPUT_DIR, 'hero-fullpage-mobile.png'), fullPage: true });
    console.log('  ✓ hero-fullpage-mobile.png');
    await ctx.close();

    // --- Gallery full-page ---
    console.log('\n📸 Gallery (full-page):');
    ctx = await browser.newContext({ viewport: DESKTOP, deviceScaleFactor: 2, locale: 'zh-TW', timezoneId: 'Asia/Taipei' });
    page = await ctx.newPage();
    await page.goto(`${BASE_URL}/gallery`, { waitUntil: 'networkidle', timeout: 30000 });
    await sleep(1000);
    const gHeight = await page.evaluate(() => document.documentElement.scrollHeight);
    await page.setViewportSize({ width: 1280, height: Math.min(gHeight, 3000) });
    await sleep(500);
    await page.screenshot({ path: path.join(OUTPUT_DIR, 'gallery-desktop.png'), fullPage: true });
    console.log('  ✓ gallery-desktop.png (full-page)');
    await ctx.close();

    ctx = await browser.newContext({ viewport: MOBILE, deviceScaleFactor: 2, locale: 'zh-TW', timezoneId: 'Asia/Taipei' });
    page = await ctx.newPage();
    await page.goto(`${BASE_URL}/gallery`, { waitUntil: 'networkidle', timeout: 30000 });
    await sleep(1000);
    const mgHeight = await page.evaluate(() => document.documentElement.scrollHeight);
    await page.setViewportSize({ width: 390, height: Math.min(mgHeight, 5000) });
    await sleep(500);
    await page.screenshot({ path: path.join(OUTPUT_DIR, 'gallery-mobile.png'), fullPage: true });
    console.log('  ✓ gallery-mobile.png (full-page)');
    await ctx.close();

    // --- Final listing ---
    console.log('\n═══════════════════════════════════════');
    console.log('✅ ALL DONE');
    console.log('═══════════════════════════════════════');
    console.log(`\n📁 ${OUTPUT_DIR}`);
    console.log('\n📋 FINAL FILE LISTING:');
    const files = fs.readdirSync(OUTPUT_DIR).sort();
    for (const file of files) {
      if (file.endsWith('.png')) {
        const stats = fs.statSync(path.join(OUTPUT_DIR, file));
        console.log(`  ${file.padEnd(45)} ${(stats.size / 1024).toFixed(0).padStart(5)} KB`);
      }
    }

  } finally {
    await browser.close();
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
