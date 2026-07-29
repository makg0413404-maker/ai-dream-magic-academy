/**
 * Magic Spell Engine v2 — 知識庫載入
 *
 * 讀取 src/data/magic-spell-knowledge-base/ 下的行業 JSON 檔案
 * 使用靜態 import 以確保 bundler 能正確樹搖與解析
 * 缺欄備援：每個變數備援為 '(請補充)'，不 crash
 */

import type { IndustryKnowledge } from './types';

// ── 靜態匯入所有行業知識庫 ──────────────────────────────
import beautyData from '../../data/magic-spell-knowledge-base/beauty.json';
import educationData from '../../data/magic-spell-knowledge-base/education.json';
import foodDiningData from '../../data/magic-spell-knowledge-base/food-dining.json';
import personalBrandData from '../../data/magic-spell-knowledge-base/personal-brand.json';
import retailData from '../../data/magic-spell-knowledge-base/retail.json';

/** 行業名稱 → IndustryKnowledge 對照表（靜態載入） */
const KNOWLEDGE_MAP: Record<string, IndustryKnowledge> = {
  '美容': beautyData as IndustryKnowledge,
  '教育': educationData as IndustryKnowledge,
  '餐飲探店': foodDiningData as IndustryKnowledge,
  '個人品牌': personalBrandData as IndustryKnowledge,
  '零售': retailData as IndustryKnowledge,
};

/**
 * 取得單一行業的知識庫條目
 * 非同步介面以保留未來 DB 查詢的擴充性
 * 若找不到則回傳 null（不 crash）
 */
export async function getIndustryKnowledge(
  industryName: string
): Promise<IndustryKnowledge | null> {
  return KNOWLEDGE_MAP[industryName] ?? null;
}

/**
 * 取得行業的內容類型清單
 * 若找不到回傳空陣列
 */
export async function getIndustryContentTypes(
  industryName: string
): Promise<string[]> {
  const knowledge = await getIndustryKnowledge(industryName);
  return knowledge?.contentTypes?.map((t) => t) ?? [];
}

/**
 * 列出所有已知行業名稱
 */
export async function getAllIndustryNames(): Promise<string[]> {
  return Object.keys(KNOWLEDGE_MAP);
}

/**
 * 取得行業特定內容類型的模板變數
 * 若缺少欄位則回傳空物件（不 crash）
 */
export async function getTemplateVariables(
  industryName: string,
  contentType: string
): Promise<Record<string, string>> {
  const knowledge = await getIndustryKnowledge(industryName);
  return knowledge?.templateVariables?.[contentType] ?? {};
}
