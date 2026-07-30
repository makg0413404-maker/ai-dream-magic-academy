import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';

const BASE_URL = 'http://localhost:3000';
const OUTPUT_DIR = path.resolve('public/images/screenshots');

// Ensure output directory exists
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// Page configurations: { name, path, sections? }
const PAGES = [
  { name: 'hero', path: '/', sections: ['hero', 'features', 'footer'] },
  { name: 'courses', path: '/courses', sections: ['full'] },
  { name: 'prompt-tool', path: '/prompt-tool', sections: ['industry', 'result'] },
  { name: 'register', path: '/auth/register', sections: ['full'] },
  { name: 'login', path: '/auth/login', sections: ['full'] },
  { name: 'member', path: '/member', sections: ['full'] },
  { name: 'gallery', path: '/gallery', sections: ['full'] },
  { name: 'about', path: '/about', sections: ['full'] },
];

const DESKTOP_VIEWPORT = { width: 1280, height: 900 };
const MOBILE_VIEWPORT = { width: 390, height: 844 };

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function scrollAndCapture(page, pageConfig, viewport, suffix) {
  const { name, sections } = pageConfig;
  const isMobile = suffix === 'mobile';
  const vw = viewport.width;

  // For full page screenshots, just capture the entire scrollable area
  if (sections.includes('full')) {
    // Take a full-page screenshot
    const filename = `${name}-${suffix}.png`;
    const filepath = path.join(OUTPUT_DIR, filename);
    
    // Get full page height
    const fullHeight = await page.evaluate(() => document.documentElement.scrollHeight);
    
    // Set viewport to full height temporarily for full-page capture
    await page.setViewportSize({ width: vw, height: Math.min(fullHeight, 4000) });
    await sleep(500);
    
    // Full page screenshot
    await page.screenshot({ path: filepath, fullPage: true });
    console.log(`  ✓ ${filename} (full page: ${Math.min(fullHeight, 4000)}px tall)`);
    
    // Reset viewport
    await page.setViewportSize(viewport);
    await sleep(300);
    return;
  }

  // For sections (hero, etc.), take section-specific screenshots
  for (const section of sections) {
    const filename = `${name}-${section}-${suffix}.png`;
    const filepath = path.join(OUTPUT_DIR, filename);

    // Try to find section by ID or data attribute first, or scroll to position
    switch (section) {
      case 'hero':
        // Hero is usually the top section
        await page.evaluate(() => window.scrollTo(0, 0));
        await sleep(500);
        // Take viewport screenshot
        await page.screenshot({ path: filepath });
        break;
      
      case 'features':
        // Scroll to find features/courses section (usually second section)
        await page.evaluate(() => {
          const sections = document.querySelectorAll('section');
          if (sections.length > 1) sections[1].scrollIntoView({ behavior: 'instant' });
          else window.scrollTo(0, window.innerHeight);
        });
        await sleep(500);
        await page.screenshot({ path: filepath });
        break;
      
      case 'footer':
        // Scroll to bottom
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await sleep(500);
        await page.screenshot({ path: filepath });
        break;
        
      case 'industry':
        // Prompt tool initial state (industry selection)
        await page.evaluate(() => window.scrollTo(0, 0));
        await sleep(500);
        await page.screenshot({ path: filepath });
        break;
        
      case 'result':
        // Interact with prompt tool to generate a result
        await attemptPromptToolInteraction(page);
        await sleep(1000);
        await page.screenshot({ path: filepath });
        break;
        
      default:
        await page.screenshot({ path: filepath });
    }
    
    console.log(`  ✓ ${filename}`);
  }
}

async function attemptPromptToolInteraction(page) {
  try {
    // Try to click on an industry selection button
    const buttons = await page.$$('button');
    for (const btn of buttons) {
      const text = await btn.textContent();
      if (text && (text.includes('餐飲') || text.includes('零售') || text.includes('教育') || text.includes('科技'))) {
        await btn.click();
        console.log('    → Clicked industry button:', text.trim());
        await sleep(800);
        break;
      }
    }
    
    // Try to find a textarea and type something
    const textareas = await page.$$('textarea');
    if (textareas.length > 0) {
      await textareas[0].fill('請幫我寫一篇吸引顧客的 Facebook 貼文');
      console.log('    → Filled prompt textarea');
      await sleep(500);
    }
    
    // Look for a generate/submit button
    const allButtons = await page.$$('button');
    for (const btn of allButtons) {
      const text = await btn.textContent();
      if (text && (text.includes('生成') || text.includes('產生') || text.includes('送出') || text.includes('開始'))) {
        await btn.click();
        console.log('    → Clicked generate button:', text.trim());
        await sleep(2000);
        break;
      }
    }
  } catch (err) {
    console.log('    → Prompt tool interaction skipped:', err.message);
  }
}

async function takeScreenshots(browser, viewport, suffix) {
  const context = await browser.newContext({
    viewport,
    deviceScaleFactor: 2, // Retina for clarity
    locale: 'zh-TW',
    timezoneId: 'Asia/Taipei',
  });
  const page = await context.newPage();

  console.log(`\n📸 Taking ${suffix.toUpperCase()} screenshots (${viewport.width}x${viewport.height})...`);

  for (const pageConfig of PAGES) {
    const url = `${BASE_URL}${pageConfig.path}`;
    console.log(`\n  📍 ${url}`);
    
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
      await sleep(1000);
      
      await scrollAndCapture(page, pageConfig, viewport, suffix);
    } catch (err) {
      console.log(`  ✗ Error on ${url}: ${err.message}`);
    }
  }

  await context.close();
}

async function main() {
  console.log('🚀 Launching browser...');
  const browser = await chromium.launch({ headless: true });
  
  try {
    // Desktop screenshots
    await takeScreenshots(browser, DESKTOP_VIEWPORT, 'desktop');
    
    // Mobile screenshots
    await takeScreenshots(browser, MOBILE_VIEWPORT, 'mobile');
    
    console.log('\n✅ All screenshots complete!');
    
    // List all files
    console.log('\n📁 Screenshots generated:');
    const files = fs.readdirSync(OUTPUT_DIR).sort();
    for (const file of files) {
      const stats = fs.statSync(path.join(OUTPUT_DIR, file));
      console.log(`  ${file} (${(stats.size / 1024).toFixed(1)} KB)`);
    }
  } finally {
    await browser.close();
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
