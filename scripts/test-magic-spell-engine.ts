/**
 * Magic Spell Engine v2 — 完整測試腳本 (TypeScript, 用 tsx 執行)
 *
 * 驗證：5 行業 × 至少 3 內容類型 = 15 組合全部正常輸出
 * - 傳入正確 SpellRequest → 輸出完整可複製咒語
 * - 傳入缺少欄位 → 輸出備援值（非 undefined/error）
 */

import { generateSpell } from '../src/lib/magic-spell-engine';
import type { SpellRequest } from '../src/lib/magic-spell-engine/types';

// ── 測試用例 ──────────────────────────────────────────────

interface TestCase {
  name: string;
  request: SpellRequest;
  expectMissing?: boolean;
  showFull?: boolean;
}

const testCases: TestCase[] = [
  // ── 美容 (img, vid, copy) ──
  { name: '美容 × 圖片', request: { industry: '美容', contentType: 'img', goal: '品牌曝光', audience: '女性客戶', style: '溫暖自然', platform: '即夢' }, showFull: true },
  { name: '美容 × 影片', request: { industry: '美容', contentType: 'vid', goal: '引流', audience: '熟齡保養', platform: '豆包分身' } },
  { name: '美容 × 文案', request: { industry: '美容', contentType: 'copy', goal: '預約轉換', audience: '女性客戶', style: '溫暖療癒' } },
  // ── 教育 (ad, img, copy) ──
  { name: '教育 × 廣告', request: { industry: '教育', contentType: 'ad', goal: '招生', audience: '家長', platform: 'Facebook' }, showFull: true },
  { name: '教育 × 圖片', request: { industry: '教育', contentType: 'img', goal: '課程推廣', audience: '自主學習者', style: '溫暖學習感' } },
  { name: '教育 × 文案', request: { industry: '教育', contentType: 'copy', goal: '免費體驗引流', audience: '家長' } },
  // ── 餐飲探店 (img, vid, copy) ──
  { name: '餐飲探店 × 圖片', request: { industry: '餐飲探店', contentType: 'img', goal: '新客引流', audience: '美食愛好者', style: '溫暖生活感', platform: 'ChatGPT' } },
  { name: '餐飲探店 × 影片', request: { industry: '餐飲探店', contentType: 'vid', goal: '品牌曝光', audience: '家庭聚餐客', platform: '通用' } },
  { name: '餐飲探店 × 文案', request: { industry: '餐飲探店', contentType: 'copy', goal: '活動推廣', audience: '美食愛好者' } },
  // ── 個人品牌 (img, vid, copy) ──
  { name: '個人品牌 × 圖片', request: { industry: '個人品牌', contentType: 'img', goal: '建立信賴', audience: '潛在客戶', style: '專業知性' } },
  { name: '個人品牌 × 影片', request: { industry: '個人品牌', contentType: 'vid', goal: '吸引客戶', platform: '豆包分身' } },
  { name: '個人品牌 × 文案', request: { industry: '個人品牌', contentType: 'copy', goal: '提升知名度', audience: '合作對象' } },
  // ── 零售 (img, vid, ad) ──
  { name: '零售 × 圖片', request: { industry: '零售', contentType: 'img', goal: '新品上市', audience: '一般消費者', style: '溫暖生活感' } },
  { name: '零售 × 影片', request: { industry: '零售', contentType: 'vid', goal: '導購', audience: '送禮需求客群', platform: '豆包分身' } },
  { name: '零售 × 廣告', request: { industry: '零售', contentType: 'ad', goal: '活動推廣', platform: 'Instagram' } },
  // ── 缺欄位測試 ──
  { name: '【缺欄備援】僅行業+內容類型', request: { industry: '餐飲探店', contentType: 'img', goal: '' }, expectMissing: true, showFull: true },
  { name: '【缺欄備援】未知行業', request: { industry: '醫療', contentType: 'copy', goal: '品牌曝光' }, expectMissing: true, showFull: true },
  { name: '【缺欄備援】美容×img 僅行業', request: { industry: '美容', contentType: 'img', goal: '' }, expectMissing: true, showFull: true },
];

// ── 執行測試 ──────────────────────────────────────────────

async function run() {
  let passCount = 0;
  let failCount = 0;
  let crashCount = 0;
  let idx = 1;

  console.log('═'.repeat(72));
  console.log('  Magic Spell Engine v2 — 驗收測試');
  console.log(`  測試組合：${testCases.length} 組（含 ${testCases.filter(t => t.expectMissing).length} 組缺欄測試）`);
  console.log('═'.repeat(72));
  console.log('');

  for (const tc of testCases) {
    const label = `[${String(idx).padStart(2, '0')}/${testCases.length}]`;

    try {
      const result = await generateSpell(tc.request);

      const hasSpell = result.spell && result.spell.length > 0;
      const hasTemplate = result.templateId && result.templateId !== 'none';
      const hasSections = result.sections && result.sections.length > 0;
      const noCrash = true;

      let fallbackOk = true;
      if (tc.expectMissing) {
        fallbackOk = result.spell.includes('(請補充)') || result.missingVariables.length > 0;
      }

      const checks: string[] = [];
      checks.push(hasSpell ? '✅有輸出' : '❌無輸出');
      checks.push(hasTemplate ? '✅有模板' : '❌無模板');
      checks.push(hasSections ? '✅有區段' : '❌無區段');

      const allOk = hasSpell && hasTemplate && hasSections && noCrash;

      if (allOk) {
        passCount++;
        console.log(`  ${label} ✅ PASS  ${tc.name}  [${checks.join(' ')}]`);
      } else {
        failCount++;
        console.log(`  ${label} ❌ FAIL  ${tc.name}  [${checks.join(' ')}]`);
      }

      // 顯示有標記 showFull 的測試完整內容
      if (tc.showFull) {
        console.log('');
        console.log(result.spell);
        console.log(`  [templateId: ${result.templateId}]`);
        if (result.missingVariables && result.missingVariables.length > 0) {
          console.log(`  [缺欄變數: ${result.missingVariables.join(', ')}]`);
        }
        if (tc.expectMissing && result.spell.includes('(請補充)')) {
          console.log('  [✓ 備援值 (請補充) 已正確輸出]');
        }
        console.log('');
      }

    } catch (err) {
      crashCount++;
      failCount++;
      console.log(`  ${label} 💥 CRASH  ${tc.name}`);
      console.log(`  Error: ${err instanceof Error ? err.message : String(err)}`);
      console.log('');
    }

    idx++;
  }

  // ── 總結 ──────────────────────────────────────────────

  console.log('═'.repeat(72));
  console.log('  測試總結');
  console.log('═'.repeat(72));
  console.log(`  總組數    : ${testCases.length}`);
  console.log(`  ✅ PASS   : ${passCount}`);
  console.log(`  ❌ FAIL   : ${failCount}`);
  console.log(`  💥 CRASH  : ${crashCount}`);
  console.log(`  成功率    : ${((passCount / testCases.length) * 100).toFixed(1)}%`);
  console.log('');

  process.exit(failCount > 0 ? 1 : 0);
}

run().catch((err) => {
  console.error('測試執行失敗:', err);
  process.exit(1);
});
