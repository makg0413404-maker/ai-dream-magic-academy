# AI 圓夢魔法學院 · Image Prompt Spec V1（圖片生成提示詞規格）

> 版本：V1.0
> 製訂日期：2026-07-28
> 協作模式：CEO 決策 → Hermes（CTO/PM）統籌 → Codex 執行生成
> Hermes 職責：建立需求清單、寫高品質 Prompt、派發 Codex、驗收品質、退件重生成
> Codex 職責：依本規格呼叫 Image Generation 實際生圖
> CEO 職責：最終審核，不進製作流程

---

## 一、通用品牌約束（所有圖適用，寫入正向或負向）

**必須（正向）**
- 配色限定：品牌藍 `#4F7CFF`、品牌紫 `#7C3AED`、品牌金 `#F4C542`
- 可含元素：開放弧線（朝右上 45°）、柔和四角星（金色）
- 氛圍：溫暖、明亮、有魔法感但不幼稚；主角是「人（熟齡學員）」
- 畫質：high quality, sharp focus, soft cinematic light

**禁止（負向 negative_prompt）**
- 紅色/綠色弧線（僅藍紫金）
- 幼稚/兒童節目感（魔法感有界線）
- 宗教或神秘學符號（五芒星、全知之眼等）
- 哈利波特或任何 IP 致敬
- 主角不是學員的畫面（人是主角，AI 是工具）
- 文字/浮水印/logo 疊加（圖內不含真實文字）
- 變形 Logo、封閉圓環取代開放弧線

---

## 二、高品質 Prompt 清單（派發 Codex 用）

> 每項含：id / 檔名 / 尺寸 / aspect / 正向提示（英文，可直接送生圖）/ 負向提示 / 風格鎖定
> 說明：Codex 生圖後交回，Hermes 依「三、驗收清單」判斷，不合格退件重生成

### A. 首頁
- **A1 hero-banner** | 1920×1080 | landscape
  - 正向：`A warm magical hero illustration, deep blue to purple gradient background (#0F0F1A to #1A1A3E), a glowing curved trajectory line arcing from bottom-left to top-right, a soft golden four-point star at the endpoint, a smiling senior East-Asian person around 60 looking at a smartphone with calm confident expression, gentle light particles, hopeful atmosphere, cinematic, no text, no watermark`
  - 負向：`childish, cartoon, red or green arcs, religious symbols, text, watermark, person looking afraid, dark mood`
  - 風格：深色模式預設、軌跡引導版

- **A2 hero-bg-pattern** | 512×512 平鋪 | square (tileable)
  - 正向：`seamless transparent line-art pattern, thin open arcs and small four-point stars, blue-purple gradient strokes on transparent background, minimal, elegant`
  - 負向：`filled shapes, text, clutter`
  - 風格：透明 PNG/SVG

- **A3 welcome-illustration** | 800×600 | landscape
  - 正向：`flat vector illustration, a friendly mentor figure in dark blue collar coat with AR glasses, palm facing up in a 'let's try' gesture, warm simple shapes, brand blue purple gold palette, clean background`
  - 負向：`childish, photorealistic, text`
  - 風格：扁平插畫（小圓導師形象）

### B. AI 圖片課程
- **B1 course-image-cover-1** | 1200×675 | landscape
  - 正向：`a senior East-Asian person smiling at a tablet showing a beautiful AI-generated landscape painting, warm home lighting, soft magical glow, brand blue purple gold accents, cozy`
  - 負向：`dark, text, childish`
- **B2 course-image-cover-2** | 1200×675 | landscape
  - 正向：`close-up of an elderly hand typing a simple sentence on a smartphone, a glowing AI image appearing on screen, warm clean desk, hopeful`
  - 負向：`cluttered, text on screen, dark`
- **B3 course-image-cover-3** | 1200×675 | landscape
  - 正向：`a printed AI artwork framed on a home wall, a proud senior person beside it, cozy room, golden hour light`
  - 負向：`text, sterile`
- **B4 course-image-sample (x3)** | 800×800 | square
  - 正向：`cheerful AI art style sample: a cat / a travel photo / a family portrait, soft brand-colored background, one subject each`
  - 負向：`text, multiple subjects, dark`

### C. AI 影片課程
- **C1 video-thumbnail-1** | 1280×720 | landscape
  - 正向：`a senior person writing on paper with a smartphone beside, a lightbulb made of small golden stars above, warm study light, calm`
  - 負向：`text, dark`
- **C2 video-thumbnail-2** | 1280×720 | landscape
  - 正向：`a senior person wearing headphones, gentle smile, a sound wave formed by golden stars, peaceful`
  - 負向：`text, loud colors`
- **C3 video-thumbnail-3** | 1280×720 | landscape
  - 正向：`a happy senior holding a phone showing a finished video, celebratory soft glow, brand colors`
  - 負向：`text, chaotic`

### D. AI 提示詞工具
- **D1 prompt-tool-icon** | 256×256 | square (transparent)
  - 正向：`minimal app icon, an open arc with a four-point star, blue-purple gradient, transparent background, clean`
  - 負向：`text, filled background, multiple stars`
- **D2 prompt-template-thumb** | 600×400 | landscape
  - 正向：`a clean card mockup showing sample prompt lines as abstract bars (no real text), friendly brand colors, soft shadow`
  - 負向：`real readable text, dark`

### E. AI 魔法廣場
- **E1 plaza-banner** | 1920×600 | landscape
  - 正向：`warm community scene, several seniors sharing photos and laughing together, golden magical ambiance, inclusive and joyful, brand blue purple gold`
  - 負向：`text, dark, exclusion`
- **E2 plaza-card-bg** | 600×400 | landscape
  - 正向：`soft blurred gradient background blue-purple-gold, calm, minimal`
  - 負向：`text, sharp objects`

### F. 活動與講座
- **F1 event-hero-1** | 1920×1080 | landscape
  - 正向：`a cozy seminar room, senior audience listening attentively, a mentor on stage with a subtle arc-and-star logo behind, warm stage lighting, hopeful`
  - 負向：`text, dark, empty room`
- **F2 speaker-photo (x2)** | 600×600 | square
  - 正向：`portrait of a friendly middle-aged East-Asian mentor, dark blue collar coat, AR glasses, soft studio light, confident warm smile`
  - 負向：`text, harsh light, childish`

### G. 會員中心
- **G1 member-default-avatar** | 200×200 | square (transparent)
  - 正向：`simple friendly neutral avatar, arc and star motif, brand blue, transparent`
  - 負向：`text, photo, multiple colors`
- **G2 member-banner** | 1920×400 | landscape
  - 正向：`exclusive warm membership banner, golden stars, a subtle member badge, calm brand gradient`
  - 負向：`text, dark`

### H. 關於我們
- **H1 founder-story** | 800×600 | landscape
  - 正向：`gentle narrative illustration: a 50-year-old person experiencing ChatGPT for the first time, curious and warm, simple shapes, brand palette`
  - 負向：`text, childish, dark`

### I/J. 圖示與 Footer（多用 SVG 手刻或標準圖示，非生圖優先）
- **I1 contact-icon** | 64×64 | transparent SVG
- **J1 social-icon (FB/IG/LINE)** | 32×32 | transparent SVG
- **J2 footer-divider** | 重複 SVG | 弧線
- 說明：此類建議 Codex 以 SVG 產出（非 AI 生圖），或沿用 Brand Bible 匯出檔

---

## 三、驗收清單（Hermes 判斷，不合格退件）

每張圖交付後，Hermes 檢查：
- [ ] 配色僅含藍紫金（無紅/綠弧線）
- [ ] 無幼稚/兒童節目感
- [ ] 無宗教/神秘學符號、無 IP 致敬
- [ ] 主角是學員（人），AI 為背景工具
- [ ] 圖內無真實文字/浮水印
- [ ] 尺寸與 aspect 符合要求
- [ ] 整體溫暖、明亮、有魔法感但不誇張

**退件條件**：任一項不符 → Hermes 退回 Codex，註明違反項 + 修正方向，重生成直到符合。

---

## 四、派發與流程（Hermes 執行）

1. Hermes 將本規格按優先級分批（先高：A1/B1–B3/C1–C3/F1）
2. 每批以 delegate_task 派給 Codex，附：檔名 + 尺寸 + 正向提示 + 負向提示 + 風格鎖定 + 驗收清單
3. Codex 生圖後回傳圖片路徑/URL
4. Hermes 驗收 → 通過則入庫 `public/images/...`；退件則重派
5. 全部完成後彙整給 CEO 最終審核

---

## 五、狀態
- ⏸ 本規格已備，待 CEO 批准「開始派發 Codex 生圖」
- ⏸ 未生圖、未修改程式、未 Commit
