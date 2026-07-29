# AI 圓夢魔法學院 · 首頁整合開發任務書（Homepage Integration Brief）

> 版本：V1.0（開發任務書，交 Codex 執行）
> 日期：2026-07-28
> 狀態：⏸ 待 CEO 批准「開始 Sprint 3 首頁整合開發」
> 依據：Brand Identity V1.1（docs/36）、Brand Gate（docs/38）、Hero V2 採用決議、Design System 待填
> 目標：完成首頁整合，達到 8/3 展示版標準（首頁 95 分、使用者願意多看 30 秒/點一次/想了解課程）

---

## 一、CEO 決策（本任務邊界）

- Hero V2 定為 **V2（採用級，非最終）**，進入整合，**不再反覆修 Hero**
- V3 優化清單（現在不做，記錄）：①Logo 不浮貼 Hero 左上角，改放 Navbar；②魔法之門更有故事（門內星光/AI 光點/另一世界）；③小圓年齡感提升（Q 版但 15–18 歲學徒感）
- 重心：整合首頁 → CTA → 導航列 → 課程區 → 8/3 展示版

## 二、首頁整合範圍

### 1. Hero 區（首屏）
- 背景圖：`public/images/brand-batch2/hero-v2.png`（沉浸式，不要浮貼白底 Logo）
- HTML 文案層（疊加，不燒進圖）依 Brand Gate「Hero 轉換力四問」：
  - 我是誰：AI 圓夢魔法學院
  - 幫誰：AI 新手、熟齡族
  - 得到什麼：學會 AI、完成作品、創造第二人生
  - 下一步：立即加入 / 免費體驗
  - 主 Slogan：讓 AI 成為你的魔法棒。
  - 輔：陪你踏出 AI 的第一步。
  - 字級 ≥18px（Mobile First，Android 6.5" 優先）
- 左/上保留負空間放文案

### 2. Navbar（導航列）
- 左：魔法之門 Logo（用 `logo-portal-horizontal.png` 或 簡版），**不放白底圓形浮貼**
- 選單：首頁 / 課程（AI 圖片、AI 影片）/ 提示詞工具 / 魔法廣場 / 關於 / 會員
- 右：登入 / 立即加入（CTA 按鈕）
- 會員狀態：navbar-client 已建，接會員資訊

### 3. CTA 區
- 主按鈕：立即加入（紫金漸層）
- 次按鈕：看看課程
- 按鈕樣式暫依 Design System（待填，先用紫金漸層+圓角+字級≥18px）

### 4. 課程區
- 三張課程卡：AI 圖片課程 / AI 影片課程 / 提示詞工具
- 卡片用課程插圖（batch2 待生成或暫用 placeholder）
- 文案引文案 V1（docs/29）

### 5. 會員價值區 / Footer
- 會員價值簡述 + Footer（依文案 V1）

## 三、Brand Gate 約束（開發中也適用）
- 所有圖用 batch2（已過 Gate）；新圖須過 Gate
- 配色紫金、四角星、雙角色、魔法之門
- 不動 Brand Bible V1.0 凍結項

## 四、8/3 展示版標準
- 首頁 95 分（Brand Gate）
- 使用者 5 秒理解品牌（5 秒測試）
- 手機優先可操作（核心任務 ≤3 點擊）
- 真實可註冊/登入（Day 2 已驗證）

## 五、執行與驗收
- Codex 依本書寫首頁元件（Next.js 16 + Tailwind v4 + shadcn/ui）
- 每步 tsc/lint/build 通過
- Hermes 驗收（視覺+功能），不符退件
- 暫不 push（留本機）

## 六、待 CEO 批准
- 批准「開始 Sprint 3 首頁整合開發」（Codex 動程式）
- 批准後 Codex 執行，我派發+驗收
