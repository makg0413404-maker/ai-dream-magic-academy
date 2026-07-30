# Platform First Architecture — 實作規劃

> 本文件為 Sprint 2 之後的變更規劃，目前不動程式。
> 決策依據：DECISION LOG #022, #023, #024

---

## 一、Industry Config（行業設定檔）

### 建議位置

`src/config/industry.config.ts`

### 設計原則

- 所有品牌可變內容集中在此檔案
- 程式碼不得因新增產業而修改核心邏輯
- 單一檔案即可完成白牌化

### 檔案結構（草稿）

```typescript
export interface IndustryConfig {
  // 品牌
  brandName: string;              // "AI 圓夢魔法學院"
  siteName: string;               // "AI 圓夢魔法學院"
  slogan: string;                 // "讓 AI 成為你的魔法棒"
  description: string;            // SEO description
  logo: {
    icon: string;                 // "/images/brand-batch2/logo-portal-icon.png"
    full: string;                 // "/images/brand-batch2/logo-portal-fullcolor.png"
    favicon: string;              // "/images/brand-batch2/favicon-v2.png"
  };
  heroImage: string;              // "/images/brand-batch2/hero-v2.png"
  
  // 色彩
  colors: {
    primary: string;              // "#4F7CFF"
    secondary: string;            // "#7C3AED"
    accent: string;               // "#F4C542"
    text: string;                 // "#1E1E2E"
    muted: string;                // "#6B6B80"
    border: string;               // "#C0C0D0"
  };

  // 課程
  courses: Array<{
    slug: string;
    title: string;
    desc: string;
    outcome: string;
    outcomeTags: string[];
    // ... 其他課程欄位
  }>;

  // 導航
  navLinks: Array<{
    href: string;
    label: string;
  }>;

  // 聯絡資訊
  contact: {
    email?: string;
    phone?: string;
    line?: string;
  };

  // 社群連結
  socialLinks: Array<{
    platform: string;
    url: string;
  }>;

  // SEO
  metadata: {
    defaultTitle: string;
    titleTemplate: string;
    description: string;
  };
}
```

### 需取代的硬編碼位置（從本次掃描結果）

| # | 檔案 | 硬編碼內容 | Industry Config 欄位 |
|:-:|:-----|:-----------|:--------------------|
| 1 | `app/layout.tsx:24-32` | 5 處品牌名稱/標題 | `metadata`, `brandName` |
| 2 | `app/page.tsx:61` | Hero 標題 | `brandName` |
| 3 | `navbar-client.tsx:41` | Logo 路徑 | `logo.icon` |
| 4 | `page.tsx:40` | Hero 圖路徑 | `heroImage` |
| 5 | `footer.tsx:14` | Footer 品牌名 | `brandName` |
| 6 | `courses/page.tsx:11-50` | 課程資料 | `courses[]` |
| 7 | `register/page.tsx:19` | 註冊頁標題 | `brandName` |
| 8 | `login/page.tsx:23` | 登入頁標題 | `brandName` |
| 9 | `prompt-tool/page.tsx` | 輔助色(#1E1E2E, #6B6B80, #C0C0D0) | `colors.text/muted/border` |
| 10 | 各 metadata pages | SEO description | `metadata.description` |

---

## 二、Plugin（外掛）架構

### 建議位置

`src/plugins/`

### 設計原則

- 每個 AI 功能為獨立 plugin 目錄
- 由 Industry Config 的 `enabledPlugins` 陣列決定啟用狀態
- 新產業只需在 config 中開啟/關閉 plugin

### 檔案結構（草稿）

```
src/plugins/
├── types.ts                    # Plugin 介面定義
├── registry.ts                 # Plugin 註冊表
│
├── prompt-generator/           # AI 提示詞生成
│   ├── index.ts
│   └── components/            # UI 元件 (選擇器、結果顯示)
│
├── ai-workflow/               # AI 工作流
│   ├── index.ts
│   └── components/
│
├── ai-chat/                   # AI 對話
│   ├── index.ts
│   └── components/
│
├── ai-knowledge-base/         # AI 知識庫
│   ├── index.ts
│   └── pages/                 # 路由頁面
│
├── ai-agent/                  # AI Agent
│   ├── index.ts
│   └── components/
│
├── ai-report/                 # AI 報告
│   ├── index.ts
│   └── components/
│
└── course-management/         # 課程管理
    ├── index.ts
    └── components/
```

### Plugin 介面（草稿）

```typescript
export interface Plugin {
  id: string;                   // 唯一識別（如 "prompt-generator"）
  name: string;                 // 顯示名稱
  description: string;
  
  // 路由：此 plugin 需註冊的路徑（可選）
  routes?: Array<{
    path: string;
    component: React.ComponentType;
  }>;
  
  // Navbar：此 plugin 需新增的導航連結（可選）
  navLinks?: Array<{
    href: string;
    label: string;
    icon?: string;
  }>;
  
  // 設定：此 plugin 所需的 config 欄位（可選）
  configFields?: string[];
}
```

### Industry Config 的 Plugin 啟用

```typescript
export interface IndustryConfig {
  // ...
  plugins: {
    enabled: string[];           // ["prompt-generator", "ai-knowledge-base", "course-management"]
    // 每個 plugin 可有自己的設定
    settings?: Record<string, any>;
  };
}
```

---

## 三、實作優先級

| 優先 | 項目 | 預估工時 | 依賴 |
|:----:|:-----|:--------:|:-----|
| **P1** | **Industry Config：品牌/色彩/標題/Logo 集中化** | 2h | 無 |
| **P1** | **Plugin 架構基礎（registry + types + 載入機制）** | 3h | 無 |
| P2 | Industry Config：課程資料遷移 | 2h | P1 config |
| P2 | Industry Config：導航連結 config 化 | 1h | P1 config |
| P2 | Plugin：prompt-generator 模組化 | 1h | P1 plugin |
| P3 | Plugin：各 AI 功能逐步 plugin 化 | 依功能 | P1+P2 |
| P3 | Industry Config：聯絡資訊/社群連結 | 0.5h | P1 config |

---

## 四、風險

| 風險 | 影響 | 因應 |
|:-----|:-----|:------|
| Industry Config 檔案過大 | 維護困難 | 拆分為品牌/課程/導航 3 個 config 子檔案 |
| Plugin 載入機制增加首次載入時間 | 效能 | 動態 import（Next.js dynamic）|
| 現有功能在遷移期間同時存在兩套系統 | 混亂 | 一次切換，不共存 |
| 硬編碼位置可能遺漏（掃描未覆蓋） | 白牌化不完整 | 部署後執行 E2E 品牌檢查 |

---

*本規劃基於 CEO 決策 #022/#023/#024，待核准後排入 Sprint 2+。*
