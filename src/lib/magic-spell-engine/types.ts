/**
 * Magic Spell Engine v2 — 型別定義
 *
 * docs/41 §3.1 — SpellRequest 結構
 * docs/41 §4.1 — 組合輸出層（角色／任務／風格／細節／輸出格式）
 */

/** 支援的內容類型 */
export type ContentType = 'img' | 'vid' | 'copy' | 'ad';

/** 支援的行業（以知識庫檔案為準，此處為已知行業） */
export type Industry =
  | '美容'
  | '教育'
  | '餐飲探店'
  | '個人品牌'
  | '零售';

/** 輸出格式區段 */
export interface SpellSection {
  name: string;
  content: string;
  order: number;
}

/** 模板定義（來自 JSON 檔案） */
export interface SpellTemplate {
  templateId: string;
  type: ContentType;
  name: string;
  description: string;
  compatibleTools: string[];
  sections: SpellSection[];
  variables: Record<string, string>;
}

/** 行業知識庫條目（來自 JSON 檔案） */
export interface IndustryKnowledge {
  industry: string;
  name: string;
  keywords: string[];
  audienceProfiles: {
    type: string;
    painPoints: string[];
    triggers: string[];
  }[];
  defaultStyle: string;
  commonGoals: string[];
  contentTypes: ContentType[];
  templateVariables: Record<
    string,
    Record<string, string>
  >;
}

/** Magic Spell Engine 輸入（docs/41 §3.1） */
export interface SpellRequest {
  /** 行業 */
  industry: string;
  /** 內容類型：img / vid / copy / ad */
  contentType: ContentType;
  /** 行銷目標 */
  goal: string;
  /** 目標客群（選擇性） */
  audience?: string;
  /** 風格偏好（選擇性） */
  style?: string;
  /** AI 工具平台（選擇性） */
  platform?: string;
  /** 額外備註（選擇性） */
  extra?: string;
}

/** Magic Spell Engine 輸出 */
export interface SpellResult {
  /** 完整咒語文字 */
  spell: string;
  /** 使用的模板 ID */
  templateId: string;
  /** 區段列表 */
  sections: SpellSection[];
  /** 變數填充結果（供除錯） */
  filledVariables: Record<string, string>;
  /** 填充失敗的變數（若有不完整之處） */
  missingVariables: string[];
}
