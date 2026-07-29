# AI 圓夢魔法學院 · Codex Sprint 1 Backlog（準備中）

> 注意：Codex 暫不開發。先完成 Sprint 0（GitHub + Vercel + env），再等 WorkBuddy 文件驗收通過後正式啟動 Sprint 1。
> 版本：V1.1（依 CEO 2026-07-29 更新：5 行業、Vercel 提前、Sprint 0 前置）
> 目標：8/3 展示版 MVP（Vercel 部署）

---

## 0. Sprint 0 — 前置基礎建設

Sprint 0 不涉及專案程式修改，僅完成部署基礎建設。由 Hermes 引導，不需 Codex。

### 0.1 GitHub Repository

| 項目 | 說明 |
|:-----|:-----|
| 目標 | 將本機專案推上 GitHub 私有 repo |
| 步驟 | 1. 確認 GitHub 帳號已登入 |
|      | 2. 在 GitHub 建立私有 repo（名稱建議：`ai-dream-magic-academy`） |
|      | 3. 本機 `git remote add origin git@github.com:<user>/ai-dream-magic-academy.git` |
|      | 4. `git push -u origin main`（或 `master`） |
| 注意 | 上次 push 有 token-in-URL hang 問題，優先測試 SSH key 或先 `git push` 確認 |
| 風險 | 本機 git 使用 MSYS 環境，SSH key 可能未設定；備援為 token-in-URL（`https://<token>@github.com/...`） |

### 0.2 Vercel 專案建立

| 項目 | 說明 |
|:-----|:-----|
| 目標 | Vercel 匯入 GitHub repo + 自動部署 |
| 步驟 | 1. 使用者登入 Vercel Dashboard |
|      | 2. Import 剛建立的 GitHub repo |
|      | 3. Framework Preset 選 Next.js（預設讀 package.json 自動偵測） |
|      | 4. 下一步到 Environment Variables 視窗 |

### 0.3 Environment Variables 確認

需要設定的環境變數（來自 `.env.local` / Supabase Dashboard）：

| 變數 | 值來源 | 用途 |
|:-----|:-------|:-----|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Dashboard → Settings → API | 前端 Supabase client |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Dashboard → Settings → API → anon public | 前端 Supabase client |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Dashboard → Settings → API → service_role | 後端 Auth API Route |

**⚠️ 不可在聊天傳送完整 key**：由使用者從 Supabase Dashboard → Settings → API 複製，親自貼到 Vercel Dashboard 的 Environment Variables 欄位。

### Sprint 0 驗收標準
- ✅ GitHub repo 可 push/pull
- ✅ Vercel 自動部署完成，https:// 可訪問（至少看到首頁）
- ✅ 環境變數設定完成，register/login 功能無 401/500

---

## 一、開發模組列表

| # | 模組 | 優先 | 依賴 | 預估工時 | 技術風險 |
|:-:|:-----|:----:|:-----|:--------:|:---------|
| C1 | 報名/加入流程完善 | P0 | 無 | 2–3h | 低 |
| C2 | 魔法咒語知識庫 JSON | P0 | W1（咒語案例）+ W6（品質標準） | 1–2h | 低 |
| C3 | Magic Spell Engine v2 | P0 | C2（知識庫 JSON） | 4–6h | 中 |
| **C4** | **Vercel 部署（提前）** | **P0** | **C3（Spell Engine v2）+ Sprint 0** | **1h** | **中→低（Sprint 0 已驗證 env）** |
| C5 | 提示詞工具 v2（含行業選擇器） | P0 | C3（引擎 v2）+ C4（Vercel） | 3–4h | 低–中 |
| C6 | 展示流程串聯 | P0 | C1 + C5 | 1–2h | 低 |

**總預估工時**：12–18 小時

---

## 二、各模組詳細規格

### C1 — 報名/加入流程完善

**任務**：同 V1.0。

**驗收標準**：
- ✅ 本機 email 註冊 → 登入成功 → 導向 `/courses` 或 `/prompt-tool`
- ✅ `/auth/login` → 導向 `/member`
- ✅ 手機版無破版

---

### C2 — 魔法咒語知識庫 JSON

**行業範圍（CEO 確認，5 行業）**：

| 優先 | 行業 | 說明 |
|:----:|:-----|:-----|
| 1 | 美容 | 美髮/美甲/護膚/SPA |
| 2 | 餐飲探店 | 餐廳/小吃/咖啡廳/烘焙/美食探店 |
| 3 | 個人品牌 | 創業者/講師/顧問/自媒體 |
| 4 | 教育 | 補習班/線上課程/才藝/教育機構 |
| 5 | 零售 | 服飾/家居/3C/食品/生活用品 |

**檔案結構**：`src/data/magic-spell-knowledge-base/` 下 5 個 JSON 檔案：
- `beauty.json`（美容）
- `food-dining.json`（餐飲探店）
- `personal-brand.json`（個人品牌）
- `education.json`（教育）
- `retail.json`（零售）

每個檔案結構（延續 docs/41 §6.2）：

```json
{
  "industry": "美容",
  "name": "美容",
  "keywords": ["美髮", "美甲", "護膚", "SPA", "美容院"],
  "audienceProfiles": [
    { "type": "女性客戶", "painPoints": ["皮膚問題", "保養煩惱"], "triggers": ["變美", "自信", "放鬆"] }
  ],
  "defaultStyle": "溫暖專業",
  "commonGoals": ["引流", "品牌曝光", "預約轉換"],
  "templateVariables": {
    "img": { "subject": "護膚過程", "setting": "溫暖美容室" },
    "vid": { "scene": "顧客美容前後對比", "narrator": "美容師" },
    "copy": { "hook": "你也是敏感肌嗎？", "cta": "立即預約免費諮詢" }
  }
}
```

**模板檔案**：`src/data/magic-spell-templates/`：

| 檔案 | 內容類型 | 輸出工具 |
|:-----|:---------|:---------|
| `img-general.json` | 圖片 | 通用（ChatGPT/即夢） |
| `img-jimeng.json` | 圖片 | 即夢專用 |
| `vid-general.json` | 影片 | 通用腳本 |
| `vid-doubao.json` | 影片 | 豆包分身 |
| `copy-social.json` | 文案 | 社群貼文 |
| `copy-ad.json` | 文案 | 廣告文案 |
| `ad-script.json` | 廣告 | 影片腳本 |

**驗收標準**：
- ✅ 5 行業 JSON 格式正確
- ✅ 可被 `import` 或 `require()` 正常讀取
- ✅ 與 WorkBuddy 咒語案例一致

---

### C3 — Magic Spell Engine v2

**任務**：同 V1.0。

重點：輸入 SpellRequest（行業 + 內容類型 + 目標 + 風格 + 平台）→ 輸出完整咒語。

```
SpellRequest → 知識比對層 → 模板選擇 → 變數填充 → SpellResult
```

**驗收標準**：
- ✅ 5 行業 × 4 內容類型（圖片/影片/文案/廣告）= 20 組合全部正常輸出
- ✅ 缺欄備援值（非 crash）
- ✅ 輸出咒語長度合理（200–800 字）
- ✅ unit test 可過

---

### C4 — Vercel 部署（提前）

**注意**：Sprint 0 已建立 GitHub repo + Vercel 專案 + env variables。此為每次 Codex 修改後的重新部署。

**任務**：
1. Codex 完成 C3 後，`git add` → `git commit` → `git push` → Vercel 自動部署
2. 確認部署後 https:// 可以正常使用 C3 功能（Spell Engine 無後端，純前端，無部署風險）
3. 測試手機版無破版

**驗收標準**：
- ✅ Vercel 部署成功
- ✅ https://xxx.vercel.app/prompt-tool 可正常生成咒語

---

### C5 — 提示詞工具 v2

**任務**：
1. 加入「行業選擇器」Step 0：5 行業卡片（美容 / 餐飲探店 / 個人品牌 / 教育 / 零售）
2. 行業選擇後，該行業的知識庫（目標/風格/平台）動態載入
3. 現有 3 內容類型（繪圖/分身/廣告）繼續支援
4. 保留複製功能（含 execCommand 備援）
5. 手機版響應式維持

**不做**：
- ❌ 不接後端 API
- ❌ 不加會員額度
- ❌ 不加歷史紀錄
- ❌ 不加其他行業

**驗收標準**：
- ✅ 選擇 5 行業任一 → 生成咒語 → 複製，手機版完整操作
- ✅ build/lint/tsc 0 error

---

### C6 — 展示流程串聯

**任務**：
1. 首頁「免費體驗提示詞工具」→ 導 `/prompt-tool`
2. 課程頁「免費註冊」→ 導 `/auth/register`
3. `/prompt-tool` 底部「加入學院」→ 導 `/auth/register`
4. 註冊成功 → 導 `/courses` 或 `/prompt-tool`
5. 登入後 `/member` 顯示基本資訊

**驗收標準**：
- ✅ 完整流程（首頁→課程→工具→生成咒語→複製→註冊→登入）手動測通

---

## 三、開發順序（依賴圖）

```
Sprint 0（前置基礎建設）
  │
  ├── GitHub repo 建立（Hermes 引導，使用者操作）
  ├── Vercel 專案建立（使用者操作）
  └── env variables 設定（使用者操作）
  │
  ▼  Sprint 0 驗收通過
  │
  ▼  WorkBuddy 文件驗收通過
  │
  ▼  Sprint 1 正式啟動
  │
C1（報名流程）      C2（知識庫 JSON）
  │                    │
  │                    ▼
  │                 C3（Spell Engine v2）
  │                    │
  │                 C4（Vercel 部署）← 提前到 C3 完成後
  │                    │
  ├────── C5（工具 v2）← C3 + C4
  │
C6（流程串聯）← C1 + C5
```

---

## 四、技術風險彙整

| 風險 | 模組 | 機率 | 影響 | 因應 |
|:----|:----:|:----:|:----:|:-----|
| GitHub push 憑證問題 | Sprint 0 | 高 | 高 | 優先測 SSH key，備援 token-in-URL；由 Hermes 引導操作 |
| Vercel env 配置漏設 | Sprint 0 | 中 | 高 | 部署後立刻測 register（無 401 才算通） |
| Supabase Auth 與 Next.js 16 相容 | C1 | 中 | 高 | 先在 localhost 測完整註冊流程 |
| 行業選擇增加操作步驟 | C5 | 中 | 中 | 保持行業選擇 ≤ 3 點擊 + 預設值 |
| 5 行業模板填充品質不一致 | C3 | 中 | 中 | 行業 JSON 提供充足 templateVariables；WorkBuddy 品質標準確保 |

---

## 五、驗收標準總表

| # | 模組 | 必須通過 | 驗收方式 |
|:-:|:-----|:---------|:---------|
| S0 | GitHub + Vercel + env | push/pull 通、Vercel 部署成功、無 401 | 部署後實測 |
| C1 | 報名流程 | Email 註冊成功、登入導向正確 | 實際註冊 |
| C2 | 知識庫 JSON | 5 行業 JSON 格式正確 | `import` test |
| C3 | Spell Engine v2 | 5 行業×4 內容生成、缺欄不 crash | unit test |
| C4 | Vercel 部署 | https 可訪、工具可生成咒語 | 瀏覽器訪問 |
| C5 | 工具 v2 | 行業→生成→複製、手機無破版 | 實際操作視覺驗收 |
| C6 | 流程串聯 | 首頁→課程→工具→註冊 完整流程 | 實際點通 |

---

## 六、狀態

- ⏸ **Sprint 0**：尚未啟動。需你確認可用 GitHub 帳號與 Vercel 帳號後開始引導。
- ⏸ **WorkBuddy**：W1–W6 執行中，等待回報。
- ⏸ **Codex Sprint 1**：等 Sprint 0 + WorkBuddy 文件驗收通過後才啟動。
- 🔒 不修改程式、不 Commit、不開發。
