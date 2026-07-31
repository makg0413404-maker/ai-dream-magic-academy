# 05_WEBSITE_REQUIREMENTS — 網站需求與架構

> **最後更新**：2026-07-31 ｜ **狀態**：✅ 已確認
> 來源：Sprint 1 成果、docs/42、Decision #022/#023/#024、Context

---

## 一、技術架構

- **框架**：Next.js（16.2，App Router，Turbopack）
- **樣式**：Tailwind CSS（v4）
- **元件**：shadcn/ui
- **部署**：Vercel（ai-dream-magic-academy.vercel.app）
- **GitHub**：makg0413404-maker/ai-dream-magic-academy（main）
- **Auth/資料庫**：Supabase（專案 rmttsdqrcxabhxaywaaz，email only）

## 二、頁面清單（已上線）

| 頁面 | 路由 | 狀態 |
|:-----|:-----|:-----|
| 首頁（凍結 94 分）| `/` | ✅ |
| 課程列表 / 詳情（凍結 96 分）| `/courses`、`/courses/[slug]` | ✅ |
| 提示詞工具 v2（5 行業選擇器）| `/prompt-tool` | ✅ |
| 魔法廣場 | `/gallery` | ✅ |
| 關於我們 | `/about` | ✅ |
| 會員 | `/member` | ✅ |
| 活動 | `/events` | ✅ |
| 註冊 / 登入 | `/auth/register`、`/auth/login` | ✅ |
| 聯絡 | `/contact` | ✅ |

## 三、核心功能模組

| 模組 | 位置 | 說明 |
|:-----|:-----|:-----|
| 提示詞生成引擎 | `src/lib/magic-spell-engine/` | 統一引擎+知識庫，5+7 JSON |
| 知識庫資料 | `src/data/magic-spell-knowledge-base/` | beauty/food-dining/personal-brand/education/retail |
| 模板 | `src/data/magic-spell-templates/` | 7 模板 |
| 流程串聯 | `footer.tsx`、CTA | /prompt-tool、註冊導流 |

## 四、平台化需求（Decision #022/#023/#024）

- **目標**：第一個產業 PWA 範本，可白牌複製到美容/房仲/餐飲/旅遊等。
- **Industry Config**：統一 `industry.config.ts`，改品牌名/Logo/色系/Slogan/課程/AI功能/知識庫/聯絡，不改核心邏輯。
- **Plugin 架構**：AI 功能模組化（提示詞/工作流/對話/知識庫/Agent/報告），可開關。
- ⚠️ 目前為`平台化設計階段`，尚未實作（排 Sprint 2+），需 CEO 核准後由 Codex 實作。

## 五、Sprint 1 已完成（8/3 展示可跑通）

5 行業提示詞工具、註冊流程、連結串聯、手機無破版、全站整合測試通過。

## 六、已知限制

- 首頁「課程卡 slug」已修正為 /prompt-tool（C-2，已驗收）。
- 網站維持平台化方向，不為單一功能大改。

<!-- 網站開發任務，Codex 執行前必讀本文件 + 08_DECISION_LOG.md 相關決策 -->
