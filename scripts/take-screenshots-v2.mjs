import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';

const BASE_URL = 'http://localhost:3000';
const OUTPUT_DIR = path.resolve('public/images/screenshots');

fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// Naming convention: {page}-{version}.png  (e.g., hero-desktop.png, hero-mobile.png)
// For pages with multiple sections, use: {page}-{section}-{version}.png

const DESKTOP = { width: 1280, height: 900 };
const MOBILE = { width: 390, height: 844 };

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function capturePage(page, url, tasks, suffix) {
  console.log(`\n📍 ${url}`);
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
  await sleep(1500);

  for (const task of tasks) {
    const { filename, action } = task;
    const filepath = path.join(OUTPUT_DIR, filename.replace('{suffix}', suffix));

    if (action) await action(page);

    // Take screenshot — use viewport capture for section shots, fullPage for entire page
    const isFullPage = filename.includes('fullpage');
    await page.screenshot({ path: filepath, fullPage: isFullPage });
    
    const stats = fs.statSync(filepath);
    console.log(`  ✓ ${filename.replace('{suffix}', suffix)} (${(stats.size / 1024).toFixed(0)} KB)`);
  }
}

async function main() {
  console.log('🚀 Launching Playwright Chromium...');
  const browser = await chromium.launch({ headless: true });

  try {
    // ===== DESKTOP =====
    console.log('\n═══════════════════════════════════════');
    console.log('📸 DESKTOP (1280×900)');
    console.log('═══════════════════════════════════════');
    
    let ctx = await browser.newContext({ viewport: DESKTOP, deviceScaleFactor: 2, locale: 'zh-TW', timezoneId: 'Asia/Taipei' });
    let page = await ctx.newPage();

    // 1. HOMEPAGE
    await capturePage(page, `${BASE_URL}/`, [
      { filename: 'hero-{suffix}.png', action: async p => { await p.evaluate(() => window.scrollTo(0, 0)); await sleep(500); } },
      { filename: 'features-{suffix}.png', action: async p => { 
        await p.evaluate(() => {
          const sections = document.querySelectorAll('section');
          if (sections.length > 1) sections[1].scrollIntoView({ behavior: 'instant' });
          else window.scrollTo(0, window.innerHeight);
        }); await sleep(500); 
      }},
      { filename: 'footer-{suffix}.png', action: async p => { await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight)); await sleep(500); }},
    ], 'desktop');

    // 2. COURSES
    await capturePage(page, `${BASE_URL}/courses`, [
      { filename: 'courses-{suffix}.png', action: async p => { await p.evaluate(() => window.scrollTo(0, 0)); await sleep(500); } },
    ], 'desktop');

    // 3. PROMPT TOOL — industry selection
    await capturePage(page, `${BASE_URL}/prompt-tool`, [
      { filename: 'prompt-tool-industry-{suffix}.png' },
    ], 'desktop');

    // Interact: click an industry then capture result
    const industryBtns = await page.$$('button');
    for (const btn of industryBtns) {
      const text = await btn.textContent();
      if (text && (text.includes('餐飲') || text.includes('餐飲'))) {
        await btn.click();
        console.log('    → Clicked industry button:', text.trim());
        await sleep(1500);
        break;
      }
    }
    const textareas = await page.$$('textarea');
    if (textareas.length > 0) {
      await textareas[0].fill('請幫我寫一篇吸引顧客的 Facebook 貼文，推廣新的下午茶菜單');
      console.log('    → Filled prompt text');
      await sleep(500);
    }
    const genBtns = await page.$$('button');
    for (const btn of genBtns) {
      const text = await btn.textContent();
      if (text && (text.includes('生成') || text.includes('產生'))) {
        await btn.click();
        console.log('    → Clicked generate button');
        await sleep(3000);
        break;
      }
    }
    await page.screenshot({ path: path.join(OUTPUT_DIR, 'prompt-tool-result-desktop.png') });
    console.log('  ✓ prompt-tool-result-desktop.png');

    // 4. REGISTER
    await capturePage(page, `${BASE_URL}/auth/register`, [
      { filename: 'register-{suffix}.png' },
    ], 'desktop');

    // 5. LOGIN
    await capturePage(page, `${BASE_URL}/auth/login`, [
      { filename: 'login-{suffix}.png' },
    ], 'desktop');

    // 6. MEMBER
    await capturePage(page, `${BASE_URL}/member`, [
      { filename: 'member-{suffix}.png' },
    ], 'desktop');

    // 7. GALLERY (includes portrait/character images — closest to 專業形象照)
    await capturePage(page, `${BASE_URL}/gallery`, [
      { filename: 'gallery-{suffix}.png' },
    ], 'desktop');

    // 8. ABOUT
    await capturePage(page, `${BASE_URL}/about`, [
      { filename: 'about-{suffix}.png' },
    ], 'desktop');

    await ctx.close();

    // ===== MOBILE =====
    console.log('\n═══════════════════════════════════════');
    console.log('📸 MOBILE (390×844)');
    console.log('═══════════════════════════════════════');

    ctx = await browser.newContext({ viewport: MOBILE, deviceScaleFactor: 2, locale: 'zh-TW', timezoneId: 'Asia/Taipei' });
    page = await ctx.newPage();

    // 1. HOMEPAGE
    await capturePage(page, `${BASE_URL}/`, [
      { filename: 'hero-{suffix}.png', action: async p => { await p.evaluate(() => window.scrollTo(0, 0)); await sleep(500); } },
      { filename: 'features-{suffix}.png', action: async p => { 
        await p.evaluate(() => {
          const sections = document.querySelectorAll('section');
          if (sections.length > 1) sections[1].scrollIntoView({ behavior: 'instant' });
          else window.scrollTo(0, window.innerHeight);
        }); await sleep(500); 
      }},
      { filename: 'footer-{suffix}.png', action: async p => { await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight)); await sleep(500); }},
    ], 'mobile');

    // 2. COURSES
    await capturePage(page, `${BASE_URL}/courses`, [
      { filename: 'courses-{suffix}.png' },
    ], 'mobile');

    // 3. PROMPT TOOL
    await capturePage(page, `${BASE_URL}/prompt-tool`, [
      { filename: 'prompt-tool-industry-{suffix}.png' },
    ], 'mobile');

    // Interact for result
    const mBtns = await page.$$('button');
    for (const btn of mBtns) {
      const text = await btn.textContent();
      if (text && (text.includes('餐飲') || text.includes('餐飲'))) {
        await btn.click();
        console.log('    → Clicked industry button:', text.trim());
        await sleep(1500);
        break;
      }
    }
    const mTextareas = await page.$$('textarea');
    if (mTextareas.length > 0) {
      await mTextareas[0].fill('請幫我寫一篇吸引顧客的 Facebook 貼文');
      await sleep(500);
    }
    const mGenBtns = await page.$$('button');
    for (const btn of mGenBtns) {
      const text = await btn.textContent();
      if (text && (text.includes('生成') || text.includes('產生'))) {
        await btn.click();
        console.log('    → Clicked generate button');
        await sleep(3000);
        break;
      }
    }
    await page.screenshot({ path: path.join(OUTPUT_DIR, 'prompt-tool-result-mobile.png') });
    console.log('  ✓ prompt-tool-result-mobile.png');

    // 4. REGISTER
    await capturePage(page, `${BASE_URL}/auth/register`, [
      { filename: 'register-{suffix}.png' },
    ], 'mobile');

    // 5. LOGIN
    await capturePage(page, `${BASE_URL}/auth/login`, [
      { filename: 'login-{suffix}.png' },
    ], 'mobile');

    // 6. MEMBER
    await capturePage(page, `${BASE_URL}/member`, [
      { filename: 'member-{suffix}.png' },
    ], 'mobile');

    // 7. GALLERY
    await capturePage(page, `${BASE_URL}/gallery`, [
      { filename: 'gallery-{suffix}.png' },
    ], 'mobile');

    // 8. ABOUT
    await capturePage(page, `${BASE_URL}/about`, [
      { filename: 'about-{suffix}.png' },
    ], 'mobile');

    await ctx.close();

    // ===== SUMMARY =====
    console.log('\n═══════════════════════════════════════');
    console.log('✅ ALL SCREENSHOTS COMPLETE');
    console.log('═══════════════════════════════════════');
    console.log(`\n📁 Output: ${OUTPUT_DIR}`);
    console.log('\n📋 File listing:');
    const files = fs.readdirSync(OUTPUT_DIR).sort();
    for (const file of files) {
      if (file.endsWith('.png')) {
        const stats = fs.statSync(path.join(OUTPUT_DIR, file));
        console.log(`  ${file.padEnd(40)} ${(stats.size / 1024).toFixed(0).padStart(5)} KB`);
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
