# AI 圓夢魔法學院 · Sprint 3 Content Preparation Report（Sprint 3 內容準備報告）

> 文件版本：V1.0
> 製訂日期：2026-07-28
> 關聯文件：`docs/26-Website-Assets-Inventory.md`、`docs/27-Website-Copy-Checklist.md`
> 原則：不修改程式碼、不修改資料庫、不 Commit、不開始 Sprint 3

---

## 1. 任務目標達成情況

建立完整、可重複使用的網站素材管理系統，讓後續 Codex 開發不需等待素材。

| 子任務 | 狀態 |
|--------|------|
| 一、建立素材分類架構（12 類） | ✅ 完成（docs/26 §1） |
| 二、盤點已有/缺少/需重設素材 | ✅ 完成（docs/26 §3） |
| 三、建立素材需求文件（名稱/用途/尺寸/格式/透明/AI生成/優先級） | ✅ 完成（docs/26 §2） |
| 四、建立網站文案清單（標註已有/待撰） | ✅ 完成（docs/27） |
| 五、產出 4 份輸出文件 | ✅ 完成（本報告 + Inventory + Copy + Missing） |
| 納入既有品牌成果（不重建） | ✅ 完成（docs/26 §0、docs/27 §0） |

---

## 2. 關鍵發現

1. **品牌規格 100% 完成且凍結**（`docs/08`~`docs/20`），涵蓋 Logo 系統（13 款 SVG 定義）、配色、字體、吉祥物、Mood Board、Design System。
2. **實際可用圖檔幾乎全缺**：`public/` 目前僅 Next.js 預設檔，無任何品牌/頁面圖檔。
3. **無需重新設計**：品牌已凍結，只需「匯出/生成」對應檔，不在本任務產出（本任務僅盤點規劃）。
4. **文案**：品牌層文案已有；頁面行銷文案幾乎全待撰；聯絡/社群真實資訊需 CEO 提供。

---

## 3. Missing Assets List（摘要，詳見 docs/26 §4）

### 高優先（建議 Sprint 3 開發前先備）
- Logo 正式 SVG（full-color / solid / horizontal / icon / favicon）
- Hero Banner 首屏主視覺
- AI 圖片課程封面 ×3
- AI 影片課程縮圖 ×3
- 活動主視覺 ×1

### 中優先
- 吉祥物 小圓 / 小靈
- 首頁背景紋理 / 歡迎插圖
- 會員預設頭像
- 關於我們創辦故事圖
- Footer Logo

### 低優先
- 提示詞工具圖示、魔法廣場 Banner、FAQ/聯絡/社群圖示、團隊照、地圖等

---

## 4. 文案缺口（摘要，詳見 docs/27）

| 狀態 | 項目 |
|------|------|
| ✅ 已有（引用品牌文件） | Slogan、品牌故事、決策原則 |
| ❌ 待撰（頁面行銷） | 首頁標題/副標/CTA、課程介紹、會員介紹、FAQ、Footer 導覽 |
| ⏸ 可程式產生 | Dashboard 歡迎語（用 display_name） |
| 🔒 需 CEO 提供 | 聯絡資訊、社群帳號 |

---

## 5. 建議優先順序（素材產出路徑，非本任務執行）

| 順序 | 行動 | 負責 | 說明 |
|------|------|------|------|
| 1 | 匯出 Logo SVG 13款 + favicon | 設計/CEO | 從 docs/16–17 路徑匯出，放 `public/brand/` |
| 2 | AI 生成首圖（Hero/課程/影片/活動） | Hermes（Image Gen） | 依品牌藍紫金，Sprint 3 開發前備齊 |
| 3 | 吉祥物圖 | 評估 AI 生成 | 需 CEO 決策是否用 AI |
| 4 | 撰寫頁面文案初稿 | Hermes 草擬 / CEO 修訂 | 聯絡/社群資訊待 CEO 提供 |
| 5 | 圖示/footer 等低優先 | 沿用品牌 SVG | 後續補 |

---

## 6. 對 Sprint 3 的影響

- Sprint 3 Day 3 開發（Dashboard/個人資料/圖片教學/影片教學/提示詞工具/活動報名）**程式層可先開發**，素材以「placeholder / 品牌色塊」暫代，待素材產出後替換。
- 建議：Sprint 3 開發與素材產出**並行**（素材不阻塞程式），但正式上線前須補齊高優先素材。
- 所有素材路徑統一規範（`public/brand/`、`public/images/...`），Codex 直接引用。

---

## 7. 待 CEO 決策 / 提供

1. 是否授權 Hermes 用 Image Generation 產出高優先實圖（Hero/課程/影片/活動）？
2. 吉祥物圖是否用 AI 生成？
3. 是否授權 Hermes 草擬頁面文案初稿（供 CEO 修訂）？
4. 請提供聯絡資訊與社群帳號（用於聯絡頁/Footer）。
5. Logo SVG 由誰匯出（設計稿在 docs/16–17，需設計工具產出實檔）？

---

## 8. 產出文件清單
- `docs/26-Website-Assets-Inventory.md` — 素材盤點 + 需求 + 缺漏
- `docs/27-Website-Copy-Checklist.md` — 文案清單
- `docs/28-Sprint3-Content-Preparation-Report.md` — 本報告
