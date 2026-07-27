# AI 圓夢魔法學院 · 專案變更記錄

> 本文件記錄每次 Sprint 與 Day 的變更內容，作為版本追溯依據。
> 格式參考 [Keep a Changelog](https://keepachangelog.com/) 規範。

---

## [v1.3.0] — Sprint 3 Day 1 (進行中)

### 新增功能
- Supabase Auth 設定（Email/Password 登入啟用）
- Auth Server Actions（signUp / signIn / signOut / getSession / getProfile / updateProfile / resetPassword）
- Middleware 路由守衛（保護 /member/* 路由）
- 會員系統資料庫 Schema（profiles / user_roles / media_items）

### 資料庫變更
- 新增 `profiles` 資料表（extends auth.users，含 Trigger 自動建立）
- 新增 `user_roles` 資料表（RBAC 基礎）
- 新增 `media_items` 資料表（統一圖片 + YouTube 媒體管理）
- 設定 RLS Policies（個人資料本人可讀寫、公開作品可瀏覽）

### 安全性更新
- Middleware 攔截未登入對 /member/* 的存取
- RLS 確保使用者只能操作自己的資料

---

## [v1.2.1] — Sprint 2 Security Closure

### 安全性更新
- 移除 event_registrations 的公開 SELECT Policy
- 新增 `createAdminSupabase()` 使用 service_role key
- Server Action 改用 admin client 查詢報名資料，徹底阻擋匿名讀取
- 前端 bundle 不會暴露 service_role key

### 修正問題
- contact_messages INSERT 因 Policy 名稱不匹配而失敗（code: 42501）
- .env.local 變數名稱缺少底線（空格代替 `_`）導致環境變數無法正確載入

### 資料庫變更
- 移除 event_registrations 的 `enable_select_for_all` Policy
- contact_messages 建立 `enable_anon_insert` Policy

---

## [v1.2.0] — Sprint 2

### 新增功能
- Supabase 後端建立（3 張資料表：events / event_registrations / contact_messages）
- Server Actions（registerForEvent / getEventInfo / submitContact）
- 講座報名頁面串接後端（剩餘名額顯示、額滿判斷、截止日期檢查）
- 重複報名防護（UNIQUE 約束 + 應用層檢查）
- 聯絡表單串接後端
- E2E 測試全數通過

### 資料庫變更
- 新增 `events` 資料表（活動主檔，含種子資料 4 筆）
- 新增 `event_registrations` 資料表（報名記錄，UNIQUE(event_slug, email)）
- 新增 `contact_messages` 資料表（聯絡記錄）

### 修正問題
- ESLint: 移除未使用的 import（Button, Separator）
- ESLint: Hero 區 `Math.random()` 改為純函數版
- events/[slug] 從 SSG 改為 Dynamic（即時讀取報名人數）

---

## [v1.1.0] — Sprint 1

### 新增功能
- 品牌色彩系統套用（完整 CSS Token：品牌色 7 個、中性色 8 個、功能色 8 個）
- 按鈕系統統一（6 變體 × 3 尺寸，44/48/36px，8px 圓角）
- 卡片系統統一（5 層級：elevated / flat / outline / glass / dark）
- 字體系統（Noto Sans TC + Inter + JetBrains Mono，熟齡友善 18px 內文）
- Hero 軌跡引導版（SVG 弧線動畫 + 星星點亮 + 深色漸層背景）
- RWD 優化（Navbar hamburger、Grid 3→2→1、Footer 3→1）

### 修正問題
- 修復忘記密碼連結（從 404 改為獨立頁面）
- 移除首頁測試提示條（「Hermes 已成功指揮 Codex 工作」）
- 修復 eslint.config.mjs 設定（扁平設定格式相容）

---

## [v1.0.0] — MVP 1.0 初始版本

### 新增功能
- Next.js 16.2.11 專案建立
- 12 個路由頁面（首頁 / 課程 / 講座 / 文章 / 關於 / 聯絡 / Gallery / 登入 / 註冊）
- 品牌設計系統（魔法藍 #4F7CFF / 魔法紫 #7B61FF / 金色 #F4C542）
- 玻璃擬態風格（Glassmorphism Card）
- Navbar + Footer 導覽系統
- 6 門課程、4 場講座、6 篇文章的靜態內容

### 備註
- 所有資料為前端硬編碼
- 表單功能僅有畫面（尚未串接後端）
- 會員系統尚未開發
- 無 PWA 支援

---

## 版本對照

| 版本 | Sprint | 日期 | 狀態 |
|:----:|:------:|:----:|:----:|
| v1.0.0 | MVP 1.0 | — | ✅ 完成 |
| v1.1.0 | Sprint 1 | 2026-07-27 | ✅ 完成 |
| v1.2.0 | Sprint 2 | 2026-07-27 | ✅ 完成 |
| v1.2.1 | Sprint 2 Security | 2026-07-27 | ✅ 完成 |
| v1.3.0 | Sprint 3 Day 1 | 2026-07-28 | 🔄 進行中 |

---

*格式：本文件遵循 [Keep a Changelog](https://keepachangelog.com/) 規範，語意化版本 [SemVer](https://semver.org/)。*
