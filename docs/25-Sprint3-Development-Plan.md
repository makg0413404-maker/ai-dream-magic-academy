# AI 圓夢魔法學院 · Sprint 3 Development Plan

> 文件版本：V1.0
> 製訂日期：2026 年 7 月 28 日
> Sprint：3/4（Membership System MVP）
> 狀態：規劃中（等待 CEO 最終批准後開始開發）

---

## 0.1 CEO 核定變更（2026-07-28 核准）

1. **`/tools/prompt` 改為會員限定功能** → 納入 Middleware 保護（`/tools/*` 需登入）。
2. **作品藝廊（Gallery / F4）降為 Sprint 4** → Sprint 3 **不實作** gallery 頁面與 media_items 個人 CRUD。
3. **Day 2 未正式 Release 前，不得開始撰寫 Sprint 3 程式碼** → 目前僅完成規劃與準備工作（seed SQL 腳本可先準備，但不執行、不 commit）。

---

## 0. 進度基準（已完成的項目，不重做）

| Day | 內容 | 狀態 |
|-----|------|------|
| Day 1 | Supabase Auth 設定、profiles/user_roles/media_items Schema + RLS + Trigger、Middleware 路由守衛 | ✅ 已完成並簽核 |
| Day 2 | 登入/註冊/忘記密碼頁面重構（獨立 form 元件）、/auth/callback 路由、Navbar 會員狀態、/member 基礎頁 | ✅ 程式完成，RC 待 Release（真實 E2E + Admin Client 待 CEO 確認 Dashboard） |

**本文件聚焦 Day 3（會員中心）與 Day 4（優化/驗收）。**

---

## 1. Sprint 3 功能目標（Day 3–4）

依品牌決策與永久開發原則，會員中心 MVP 只保留 **5 項功能**：
1. AI 圖片教學（會員可瀏覽的圖片教學內容）
2. AI 影片教學（會員可瀏覽的 YouTube 影片教學）
3. 提示詞工具（Prompt 工具頁）
4. 個人資料（編輯 display_name / phone / bio / avatar）
5. 活動報名入口（從會員中心進入既有的活動報名）

**明確禁止**：新增「工作流教學」功能（CEO 決策）。

**熟齡友善第一**：所有頁面 Mobile First（Android 6.5 吋基準），按鈕 ≥48px、內文 ≥18px、核心操作 ≤3 點擊、表單欄位 ≤5 個。

---

## 2. 功能拆解（Day 3）

| ID | 功能 | 對應既有的規劃 Task |
|----|------|---------------------|
| F1 | 會員 Dashboard（首頁：歡迎詞 + 5 項功能快速入口） | T8 |
| F2 | 個人資料編輯頁 | T9 |
| F3 | 我的報名記錄頁（含取消報名） | T10 |
| F5 | 提示詞工具頁（Prompt 工具，**會員限定**） | 新增（原規劃未含，依 CEO 需求補） |
| F6 | AI 圖片教學頁（會員內容，來源 media_items image 類型） | 新增（會員中心內容區） |
| F7 | AI 影片教學頁（會員內容，來源 media_items youtube 類型） | 新增（會員中心內容區） |

**說明**：
- F1–F3 為原 docs/23 的 T8–T10，直接沿用。
- F5–F7 是 CEO 要求會員中心的「圖片教學 / 影片教學 / 提示詞工具」三項，對應 media_items 表的 image/youtube 類型（已建表，含 sort_order）。
- F5 `/tools/prompt` 經 CEO 核定為**會員限定**，納入 Middleware 保護。
- **F4 作品藝廊（Gallery）已降為 Sprint 4，本 Sprint 不實作**（不含頁面、不含 media_items 個人 CRUD）。
- 活動報名入口 = 連結到既有 /events（Sprint 2 已完成），不重做報名邏輯。

---

## 3. Database 是否需要變更

**結論：不需要新增表格，但需補Seed 資料。**

- `profiles` / `user_roles` / `media_items` 已於 Day 1 建立，schema 滿足 F2/F6/F7（個人資料 / 圖片教學 / 影片教學）。
- `media_items` 已支援 `image` + `youtube` 兩類型，含 `sort_order`（未來首頁排序用）。
- **需要**：用 SQL 在 `media_items` 寫入示範資料（image 教學圖、youtube 教學影片），供 F6/F7 展示（is_published=true）。
- **不需要**：`media_items` 個人 CRUD（作品藝廊已降 Sprint 4）；付款相關表（Payment 僅留 Architecture/API 介面，Sprint 3 不實作）。
- 若 F2 需要頭像上傳，MVP 階段用 URL 輸入（不實作 Storage 上傳），避免新增 Storage bucket。

---

## 4. API 是否需要新增

**結論：沿用既有 Server Actions，補少量會員專用 Action。**

既有（Day 1/2）：
- `src/app/actions/auth.ts`：signUp / signIn / signOut / getSession / getProfile / updateProfile
- `src/app/actions.ts`：submitContact / registerForEvent / getEventInfo（Sprint 2）

需新增（Day 3）：
- `src/app/actions/member.ts`（原規劃 T 已列，不含 gallery CRUD）：
  - `getMyRegistrations()` — 我的報名記錄（DB SELECT event_registrations WHERE user_id）
  - `cancelMyRegistration(id)` — 取消報名（DB DELETE，僅自己的）
  - `getPublishedMediaItems(type)` — 取得已發表的教學內容（image/youtube），供 F6/F7 讀取（不含個人 CRUD，gallery 降 Sprint 4）
- 提示詞工具（F5）：純前端工具頁（會員限定），不需 DB；若需儲存常用提示詞，未來再議（本 Sprint 不做儲存）。

**Payment API**：僅留架構文件（docs/26 建議），不實作 endpoint。

**Gate**：以上 Action 程式碼待 Day 2 正式 Release 後才撰寫。

---

## 5. Route 規劃

```
/member/dashboard        → F1 會員首頁（快速入口：個人資料/圖片教學/影片教學/提示詞工具/活動報名）
/member/profile          → F2 個人資料編輯
/member/registrations    → F3 我的報名
/member/image-courses    → F6 AI 圖片教學（media_items image, is_published）
/member/video-courses    → F7 AI 影片教學（media_items youtube, is_published）
/tools/prompt            → F5 提示詞工具（**會員限定**）
```

- 所有 `/member/*` 與 `/tools/*` 受 Middleware 保護（Day 1 已完成；需確認 Middleware matcher 已含 `/tools/:path*`）。
- **作品藝廊 `/member/gallery` 不實作（降 Sprint 4）**。
- 既有的 `/events`、`/courses`、`/gallery`（公開藝廊）保留不動。

**Gate**：以上路由頁面待 Day 2 正式 Release 後才建立。

---

## 6. Component 規劃

| 頁面 | 主要 Component | 說明 |
|------|---------------|------|
| /member/dashboard | MemberNav / QuickLinks | 5 項功能大按鈕（熟齡友善，圖示+文字） |
| /member/profile | ProfileForm | display_name / phone / bio / avatar_url，≤5 欄位 |
| /member/registrations | RegistrationList / RegistrationCard | 顯示已報名 + 取消按鈕 |
| /member/image-courses | CourseGrid / CourseCard | 讀 media_items image |
| /member/video-courses | VideoGrid / VideoCard | 讀 media_items youtube（iframe 嵌入） |
| /tools/prompt | PromptTool / PromptTemplate | 提示詞範本複製/編輯（前端，會員限定） |

**共用**：Mobile First 元件樣式沿用 Sprint 1 品牌系統（Tailwind v4 + shadcn/ui）。

---

## 7. Testing Plan

| 測試項 | 方式 | PASS 條件 |
|--------|------|-----------|
| 會員首頁 | 手動 + smoke | 登入後可見 5 入口（個人資料/圖片教學/影片教學/提示詞工具/活動報名） |
| 個人資料編輯 | 手動 E2E | 修改後 DB 更新、頁面顯示新值 |
| 報名記錄 | 手動 E2E | 顯示正確記錄、取消後消失 |
| 圖片/影片教學 | 手動 | media_items 示範資料正確渲染（is_published） |
| 提示詞工具（會員限定） | 手動 | 未登入訪問 /tools/prompt 跳轉登入；登入後範本可複製/編輯 |
| Middleware | smoke | /member/* 與 /tools/* 未登入跳轉（Day 1 已驗 /member，需補驗 /tools） |
| TypeScript | `npx tsc --noEmit` | 0 error |
| ESLint | `npm run lint` | 0 error |
| Build | `npm run build` | 0 error |
| MVP 1.0 全站體驗測試 | 八步走查（註冊→登入→會員中心→圖片教學→影片教學→提示詞工具→活動報名→登出） | 全通過才進 Sprint 4 |

**注意**：真實 E2E 註冊依賴 Confirm Email 狀態（CEO 確認中）。若 Confirm Email ON，用邀請/單次測試帳號，不重複寄信。

---

## 8. Git Commit Plan（小步提交，每 Task 一 commit）

依 CEO 要求「每 Task 一個 git commit」。建議順序：

1. `feat(member): add member dashboard with 5 quick links`
2. `feat(member): add profile edit page + updateProfile action`
3. `feat(member): add my registrations page + cancel action`
4. `feat(member): add AI image courses page (media_items image)`
5. `feat(member): add AI video courses page (media_items youtube)`
6. `feat(tools): add prompt tool page (member-only)`
7. `docs: seed media_items demo data + CHANGELOG Day 3`
8. `chore: Day 3 build/lint verification`

（Day 2 的 5 個 commit 待 CEO 批准後先行提交，再接 Day 3。Sprint 3 程式碼待 Day 2 正式 Release 後才撰寫。）

---

## 9. 風險分析

| 風險 | 等級 | 影響 | 緩解 |
|------|------|------|------|
| Confirm Email 未關 | 🟡 中 | 註冊後無法自動登入，E2E 卡住 | CEO 確認 Dashboard；若 ON 用單次測試帳號 |
| Admin Client 401（Secret Key） | 🔴 高 | 報名防重複/算名額邏輯失效 | CEO 確認 Dashboard key；方案 A 填入完整 sb_secret_ |
| media_items 示範資料缺失 | 🟢 低 | 教學頁空白 | Day 3 寫 seed SQL |
| 提示詞工具範圍模糊 | 🟡 中 | 做不到「實用」 | 先定 MVP：3–5 個熟齡友善提示詞範本，可複製 |
| 頁面過多導致熟齡操作複雜 | 🟡 中 | 違反 3 分鐘原則 | Dashboard 大按鈕入口，每頁 ≤3 點擊 |
| Storage 上傳未實作 | 🟢 低 | 頭像/圖片需用 URL | MVP 用 URL 輸入，未來再接 Storage |

---

## 10. 預估工時（Day 3–4）

| Task | 工時 | 相依 |
|------|------|------|
| F1 Dashboard | 2h | auth |
| F2 Profile | 1.5h | auth, profiles |
| F3 Registrations | 1h | event_registrations |
| F5 Prompt Tool（會員限定） | 1.5h | 無 |
| F6 Image Courses | 1h | media_items seed |
| F7 Video Courses | 1h | media_items seed |
| Seed + CHANGELOG | 30min | — |
| Day 4 優化 + Build/Lint + E2E | 3h | 全部 |
| **Day 3–4 總計** | **~11.5h** | — |
| 加上 Day 1–2 已花 | ~4h | — |
| **Sprint 3 總計** | **~15.5h** | — |

---

## 11. 不包含在本 Sprint（明確禁止/留待未來）

- ❌ 第三方 OAuth（Google/LINE）— Sprint 4
- ❌ 會員分級付費（basic/premium）— 未來
- ❌ 金流串接 — 僅留架構文件
- ❌ 工作流教學 — CEO 明確禁止
- ❌ 作品藝廊（Gallery / media_items 個人 CRUD）— **降為 Sprint 4，本 Sprint 不實作**
- ❌ 管理後台 — Sprint 4+

---

## 12. CTO 建議執行順序

```
Day 3:  F1(2h) → F2(1.5h) → F3(1h) → F6(1h) → F7(1h) → F5(1.5h) → Seed(30min)
Day 4:  優化 + Build/Lint + 真實 E2E + MVP 1.0 全站體驗測試 → 修正 bug
```

**Gate**：Day 2 正式 Release 後才開始撰寫 Day 3 程式碼；Day 3 完成且 MVP 1.0 全站體驗測試通過，才進 Sprint 4。

---

## 13. 待 CEO 批准的事項（阻塞開發）

1. **Day 2 正式 Release**：等 CEO 確認 Confirm Email 與 Secret Key 後，修復 Admin Client、補真實 E2E、commit Day 2（5 個 commit）。
2. **Sprint 3 Day 3 開發啟動批准**：Day 2 Release 前不得撰寫任何 Sprint 3 程式碼（已於本文件 0.1 節記載）。
3. Middleware matcher 確認含 `/tools/:path*`（因 /tools/prompt 改為會員限定）。
