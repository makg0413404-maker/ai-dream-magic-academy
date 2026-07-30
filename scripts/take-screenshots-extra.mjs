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
  console.log('🚀 Capturing additional pages...');
  const browser = await chromium.launch({ headless: true });

  try {
    // --- Course Detail Page ---
    console.log('\n📸 Course Detail (AI繪圖):');
    
    for (const [suffix, vp] of [['desktop', DESKTOP], ['mobile', MOBILE]]) {
      const ctx = await browser.newContext({ viewport: vp, deviceScaleFactor: 2, locale: 'zh-TW', timezoneId: 'Asia/Taipei' });
      const page = await ctx.newPage();
      await page.goto(`${BASE_URL}/courses/ai-drawing-prompt`, { waitUntil: 'networkidle', timeout: 30000 });
      await sleep(1000);
      
      const height = await page.evaluate(() => document.documentElement.scrollHeight);
      await page.setViewportSize({ width: vp.width, height: Math.min(height, 4000) });
      await sleep(500);
      await page.screenshot({ path: path.join(OUTPUT_DIR, `course-detail-${suffix}.png`), fullPage: true });
      console.log(`  ✓ course-detail-${suffix}.png`);
      await ctx.close();
    }

    // --- Events page ---
    console.log('\n📸 Events:');
    for (const [suffix, vp] of [['desktop', DESKTOP], ['mobile', MOBILE]]) {
      const ctx = await browser.newContext({ viewport: vp, deviceScaleFactor: 2, locale: 'zh-TW', timezoneId: 'Asia/Taipei' });
      const page = await ctx.newPage();
      await page.goto(`${BASE_URL}/events`, { waitUntil: 'networkidle', timeout: 30000 });
      await sleep(1000);
      
      const height = await page.evaluate(() => document.documentElement.scrollHeight);
      await page.setViewportSize({ width: vp.width, height: Math.min(height, 3000) });
      await sleep(500);
      await page.screenshot({ path: path.join(OUTPUT_DIR, `events-${suffix}.png`), fullPage: true });
      console.log(`  ✓ events-${suffix}.png`);
      await ctx.close();
    }

    // --- Contact page ---
    console.log('\n📸 Contact:');
    for (const [suffix, vp] of [['desktop', DESKTOP], ['mobile', MOBILE]]) {
      const ctx = await browser.newContext({ viewport: vp, deviceScaleFactor: 2, locale: 'zh-TW', timezoneId: 'Asia/Taipei' });
      const page = await ctx.newPage();
      await page.goto(`${BASE_URL}/contact`, { waitUntil: 'networkidle', timeout: 30000 });
      await sleep(1000);
      
      const height = await page.evaluate(() => document.documentElement.scrollHeight);
      await page.setViewportSize({ width: vp.width, height: Math.min(height, 3000) });
      await sleep(500);
      await page.screenshot({ path: path.join(OUTPUT_DIR, `contact-${suffix}.png`), fullPage: true });
      console.log(`  ✓ contact-${suffix}.png`);
      await ctx.close();
    }

    // --- FINAL LISTING ---
    console.log('\n═══════════════════════════════════════');
    console.log('✅ COMPLETE');
    console.log('═══════════════════════════════════════');
    console.log(`\n📁 ${OUTPUT_DIR}`);
    console.log('\n📋 ALL SCREENSHOTS:');
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
