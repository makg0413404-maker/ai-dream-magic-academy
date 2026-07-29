/**
 * Magic Spell Engine v2
 *
 * 統一咒語生成引擎
 * - 知識比對層 → 行業 JSON + 模板選擇
 * - 變數填充層 → 行業變數 + 使用者選項填充模板
 * - 組合輸出層 → 角色／任務／風格／細節／輸出格式 五段輸出
 *
 * docs/41 — Magic Spell Engine Architecture
 */

export { generateSpell } from './composer';
export type { SpellRequest, SpellResult, SpellSection, ContentType, Industry, SpellTemplate, IndustryKnowledge } from './types';
