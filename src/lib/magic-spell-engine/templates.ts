/**
 * Magic Spell Engine v2 — 模板選擇邏輯
 *
 * 依 content_type + platform 選取對應 JSON 模板
 * 所有行業共用同一套模板，行業差異由 knowledge.ts 變數填充
 *
 * docs/41 §4.2 — 模板組織方式（通用化）
 */

import type { ContentType, SpellTemplate } from './types';

// ── 靜態匯入所有模板 ────────────────────────────────────
import imgGeneralData from '../../data/magic-spell-templates/img-general.json';
import imgJimengData from '../../data/magic-spell-templates/img-jimeng.json';
import vidGeneralData from '../../data/magic-spell-templates/vid-general.json';
import vidDoubaoData from '../../data/magic-spell-templates/vid-doubao.json';
import copyAdData from '../../data/magic-spell-templates/copy-ad.json';
import copySocialData from '../../data/magic-spell-templates/copy-social.json';
import adScriptData from '../../data/magic-spell-templates/ad-script.json';

/** 所有模板索引 */
const ALL_TEMPLATES: SpellTemplate[] = [
  imgGeneralData as SpellTemplate,
  imgJimengData as SpellTemplate,
  vidGeneralData as SpellTemplate,
  vidDoubaoData as SpellTemplate,
  copyAdData as SpellTemplate,
  copySocialData as SpellTemplate,
  adScriptData as SpellTemplate,
];

/**
 * 根據 content_type + platform 選取對應模板
 *
 * 選擇邏輯（由簡而繁）：
 * 1. 若 platform 有對應專用模板 → 優先選取
 * 2. 否則選取該內容類型的通用模板
 * 3. 若找不到任何匹配 → 回傳 null（不 crash）
 *
 * @param contentType 內容類型
 * @param platform   AI 工具平台（可省略）
 * @returns          匹配的模板，或 null
 */
export function selectTemplate(
  contentType: ContentType,
  platform?: string
): SpellTemplate | null {
  const candidates = ALL_TEMPLATES.filter(
    (t) => t.type === contentType
  );

  if (candidates.length === 0) return null;

  // 若僅有一個候選，直接回傳
  if (candidates.length === 1) return candidates[0];

  // 優先比對平台專用模板
  if (platform) {
    const exactMatch = candidates.find((t) =>
      t.compatibleTools.includes(platform)
    );
    if (exactMatch) return exactMatch;
  }

  // 找「通用」模板（templateId 含 general 者）
  const general = candidates.find((t) =>
    t.templateId.includes('general')
  );
  if (general) return general;

  // 最後備援：第一個候選
  return candidates[0];
}

/**
 * 根據 content_type 列出所有可用的模板
 */
export function listTemplates(
  contentType?: ContentType
): SpellTemplate[] {
  if (contentType) {
    return ALL_TEMPLATES.filter((t) => t.type === contentType);
  }
  return [...ALL_TEMPLATES];
}

/**
 * 根據 templateId 取得模板
 */
export function getTemplateById(
  templateId: string
): SpellTemplate | null {
  return ALL_TEMPLATES.find((t) => t.templateId === templateId) ?? null;
}
