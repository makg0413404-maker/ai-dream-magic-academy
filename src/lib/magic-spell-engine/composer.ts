/**
 * Magic Spell Engine v2 — 變數填充 + 組合輸出
 *
 * docs/41 §4.1 — 三層架構：
 *   1. 知識比對層 → 讀取行業 JSON + 選擇對應模板
 *   2. 變數填充層 → 行業變數 + 使用者選項填充模板
 *   3. 組合輸出層 → 角色／任務／風格／細節／輸出格式 五段（或依模板區段數量）輸出
 *
 * 缺欄備援：每變數備援值（|| '(請補充)'），不 crash
 */

import type {
  SpellRequest,
  SpellResult,
  SpellSection,
  SpellTemplate,
  IndustryKnowledge,
} from './types';
import { getIndustryKnowledge } from './knowledge';
import { selectTemplate } from './templates';

/**
 * Fallback 值：當變數無法填充時使用
 */
const FALLBACK = '(請補充)';

/**
 * 從行業知識庫提取內容類型相關的變數
 *
 * @param industry    行業知識庫
 * @param contentType 內容類型
 * @param request     使用者請求（覆寫用）
 * @returns           變數鍵值對
 */
function extractIndustryVariables(
  industry: IndustryKnowledge,
  contentType: string,
  request: SpellRequest
): Record<string, string> {
  const tv = industry.templateVariables?.[contentType] ?? {};
  const vars: Record<string, string> = {};

  // 基礎行業變數
  vars['行業'] = industry.name || FALLBACK;
  vars['行業類型'] = industry.name || FALLBACK;
  vars['行業描述'] = industry.keywords?.slice(0, 3).join('、') || FALLBACK;

  // 從 templateVariables 取出所有值（直接映射）
  for (const [key, val] of Object.entries(tv)) {
    vars[key] = val || FALLBACK;
  }

  // 使用者選項覆寫
  vars['用途'] = request.goal || FALLBACK;
  vars['目標對象'] = request.audience || FALLBACK;
  vars['目標客群'] = request.audience || FALLBACK;
  vars['目標客群描述'] = request.audience || FALLBACK;
  vars['風格'] = request.style || industry.defaultStyle || FALLBACK;
  vars['平台'] = request.platform || FALLBACK;

  // 廣告專用變數
  if (contentType === 'copy' || contentType === 'ad') {
    vars['廣告目標'] = request.goal || FALLBACK;
    vars['廣告平台'] = request.platform || 'Facebook / Instagram';
  }

  return vars;
}

/**
 * 填充模板區段中的 {{變數}} 佔位符
 *
 * @param template 模板
 * @param variables 變數鍵值對
 * @returns 填充後的區段列表 + 缺少變數清單
 */
function fillTemplate(
  template: SpellTemplate,
  variables: Record<string, string>
): { sections: SpellSection[]; missingVariables: string[] } {
  const missingVariables: string[] = [];

  const filledSections = template.sections
    .map((section) => {
      let content = section.content;

      // 找出所有 {{變數名稱}}
      const placeholders = content.match(/\{\{([^}]+)\}\}/g);

      if (placeholders) {
        for (const ph of placeholders) {
          // 去除 {{ 和 }}
          const varName = ph.slice(2, -2).trim();

          // 以變數名查值，若無則用 Fallback
          const value = variables[varName] ?? FALLBACK;
          if (value === FALLBACK && !missingVariables.includes(varName)) {
            missingVariables.push(varName);
          }

          // 替換所有出現
          content = content.replace(
            new RegExp(`\\{\\{\\s*${escapeRegex(varName)}\\s*\\}\\}`, 'g'),
            value
          );
        }
      }

      return {
        name: section.name,
        content,
        order: section.order,
      };
    })
    .sort((a, b) => a.order - b.order);

  return { sections: filledSections, missingVariables };
}

/**
 * 將區段列表組合成完整的咒語字串
 */
function composeSpell(sections: SpellSection[]): string {
  return sections
    .map((s) => {
      // 以「## 區段名稱」作為標題
      return `## ${s.name}\n\n${s.content}`;
    })
    .join('\n\n');
}

/**
 * 跳脫正規表達式特殊字元
 */
function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * 主要入口：生成魔法咒語
 *
 * @param request SpellRequest（使用者結構化需求）
 * @returns       SpellResult（完整咒語 + 元資料）
 */
export async function generateSpell(
  request: SpellRequest
): Promise<SpellResult> {
  const contentType: string = request.contentType || 'copy';
  const platform: string | undefined = request.platform;

  // ── 1. 知識比對層 ──────────────────────────────
  const industry = await getIndustryKnowledge(request.industry);

  // 若行業不在知識庫中，建立最小行業物件
  const industryData: IndustryKnowledge = industry ?? {
    industry: request.industry,
    name: request.industry,
    keywords: [],
    audienceProfiles: [],
    defaultStyle: FALLBACK,
    commonGoals: [],
    contentTypes: ['img', 'vid', 'copy', 'ad'],
    templateVariables: {},
  };

  // ── 2. 模板選擇 ────────────────────────────────
  const template = selectTemplate(
    request.contentType,
    platform
  );

  if (!template) {
    // 若無對應模板，回傳最小咒語
    return {
      spell: `無法為「${request.industry} × ${contentType}」找到對應模板。\n\n請補充：行業=${request.industry}、內容類型=${contentType}、目標=${request.goal || FALLBACK}`,
      templateId: 'none',
      sections: [],
      filledVariables: {},
      missingVariables: ['template'],
    };
  }

  // ── 3. 變數填充層 ──────────────────────────────
  const variables = extractIndustryVariables(
    industryData,
    contentType,
    request
  );

  const { sections, missingVariables } = fillTemplate(
    template,
    variables
  );

  // ── 4. 組合輸出層 ──────────────────────────────
  const spell = composeSpell(sections);

  return {
    spell,
    templateId: template.templateId,
    sections,
    filledVariables: variables,
    missingVariables,
  };
}
