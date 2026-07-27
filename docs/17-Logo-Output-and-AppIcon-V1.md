# AI 圓夢魔法學院 · Logo 輸出清單與檔案命名規範

> 本文件定義所有 Logo 檔案版本、格式、命名規則與產出規格。
> 作為 Milestone 1 正式結案前的最後交付。

---

## 一、品牌代碼（Prefix）

統一前綴：**ADM**（AI Dream Magic Academy）

```
格式：ADM_{版本}_{配色}.{副檔名}

範例：ADM_master_full-color.svg
```

---

## 二、完整輸出清單

### 2.1 SVG（向量主檔案）

| # | 檔名 | 內容 | 使用 |
|:-:|:-----|:-----|:-----|
| 1 | `ADM_master_full-color.svg` | Full Logo，藍紫漸層弧＋金星＋中英文 | 官網深色模式主檔案 |
| 2 | `ADM_master_solid.svg` | Full Logo，深藍弧＋金星＋中英文 | 官網淺色模式主檔案 |
| 3 | `ADM_horizontal.svg` | Horizontal Logo，中文僅 | 手機 Navbar |
| 4 | `ADM_vertical.svg` | Vertical Logo，中英文直排 | 直立版面 |
| 5 | `ADM_icon.svg` | Icon Only，弧線＋星星，1:1 方形 | App Icon 基礎、社群頭像 |
| 6 | `ADM_icon_arc-only.svg` | 僅弧線（無星星），1:1 | 品牌紋理、Loading 元素 |
| 7 | `ADM_icon_star-only.svg` | 僅星星（無弧線），1:1 | Small Icon 基礎 |
| 8 | `ADM_monochrome_black.svg` | 全黑版，Full Logo | 黑白印刷 |
| 9 | `ADM_monochrome_white.svg` | 全白版（反白），Full Logo | 深色背景印刷 |
| 10 | `ADM_monochrome_blue.svg` | 深藍純色版，Full Logo | 單色印刷 |

### 2.2 PDF（印刷向量）

| # | 檔名 | 內容 | 使用 |
|:-:|:-----|:-----|:-----|
| 11 | `ADM_print_full-color.pdf` | Full Logo 彩色版 CMYK | 正式印刷輸出 |
| 12 | `ADM_print_solid.pdf` | Full Logo 純色版 CMYK | 一般印刷輸出 |
| 13 | `ADM_print_monochrome.pdf` | 全黑版，含安全留白標示 | 黑白印刷、製稿 |

### 2.3 PNG（一般用途）

| # | 檔名 | 內容 | 尺寸 | 使用 |
|:-:|:-----|:-----|:----|:-----|
| 14 | `ADM_png_transparent_512.png` | Icon Only，透明背景 | 512×512px | App Icon 施工基礎 |
| 15 | `ADM_png_transparent_256.png` | Icon Only，透明背景 | 256×256px | 網站使用 |
| 16 | `ADM_png_transparent_128.png` | Icon Only，透明背景 | 128×128px | 社群頭像 |
| 17 | `ADM_png_transparent_64.png` | Icon Only，透明背景 | 64×64px | 小型圖示 |
| 18 | `ADM_png_dark_512.png` | Icon Only，深色背景（#0F0F1A） | 512×512px | 深色場景 |
| 19 | `ADM_png_dark_192.png` | Icon Only，深色背景 | 192×192px | PWA Icon |
| 20 | `ADM_png_light_512.png` | Icon Only，淺色背景（#F8F9FC） | 512×512px | 淺色場景 |
| 21 | `ADM_png_light_192.png` | Icon Only，淺色背景 | 192×192px | 文件用 |

### 2.4 Favicon 專用

| # | 檔名 | 內容 | 尺寸 | 使用 |
|:-:|:-----|:-----|:----|:-----|
| 22 | `favicon-32.png` | 加粗柔和四角星 | 32×32px | 標準 favicon |
| 23 | `favicon-16.png` | Pixel Hinting 四角星 | 16×16px | 最小 favicon |
| 24 | `favicon.ico` | 合併 16+32 | 16+32px | 瀏覽器相容 |

---

## 三、檔案命名規則總結

```
規則：ADM_{版本}_{配色}.{副檔名}

版本：
  master       = Full Logo（弧線＋星星＋選擇性軌跡＋中英文）
  horizontal   = Horizontal Logo（圖示＋中文）
  vertical     = Vertical Logo（直式排列）
  icon         = Icon Only（弧線＋星星，1:1）
  icon_arc-only   = 僅弧線
  icon_star-only  = 僅星星

配色：
  full-color   = 藍紫漸層弧＋金星（主彩色版）
  solid        = 深藍弧＋金星（主要純色版）
  monochrome_black = 全黑版
  monochrome_white = 全白版
  monochrome_blue  = 深藍純色版

背景：
  transparent  = 透明背景
  dark         = 深色背景（#0F0F1A）
  light        = 淺色背景（#F8F9FC）

副檔名：
  .svg  = 向量主檔
  .pdf  = 印刷向量
  .png  = 點陣圖
  .ico  = Favicon
```

---

## 四、檔案架構

```
/assets/
└── logo/
    ├── svg/           ← 10 個 SVG 主檔案
    ├── pdf/           ← 3 個 PDF 印刷檔案
    ├── png/
    │   ├── transparent/  ← 5 個 PNG 透明背景
    │   ├── dark/         ← 2 個 PNG 深色背景
    │   └── light/        ← 2 個 PNG 淺色背景
    └── favicon/        ← 3 個 favicon 檔案
```

---

## 五、注意事項

- SVG 應使用 `<svg>` 純程式碼格式，非 base64 嵌入
- SVG 文字建議轉為 outline path，避免字型遺失
- PNG 解析度至少 @2x（Retina 為 @3x）
- PDF 顏色模式：正式印刷 CMYK，數位傳檔 RGB
- favicon.ico 應包含 16×16 和 32×32 兩個尺寸

---

# AI 圓夢魔法學院 · App Icon System V1（Milestone 2）

## 一、核心原則

Logo 系統確認的 Icon Only（弧線＋柔和四角星）為所有 App Icon 的基礎。

所有 App Icon 必須回答：

> **「這個設計，是否讓第一次接觸 AI 的人感到更安心、更願意開始？」**

---

## 二、平台規範總覽

| # | 平台 | 主要尺寸 | 形狀 | 弧線 | 星星 | 漸層 | 安全留白 |
|:-:|:----|:--------:|:----:|:----:|:----:|:----:|:--------:|
| 1 | Android Adaptive | 1024×1024 | 可變形 | ✅ 保留 | ✅ | ✅ A 版 | 25% foreground |
| 2 | iOS App Icon | 1024×1024 | 圓角方形 | ✅ 保留 | ✅ | ✅ A 版 | 10% |
| 3 | PWA Icon | 512×512 | 方形 | ✅ 保留 | ✅ | ✅ A 版 | 15% |
| 4 | LINE 頭像 | 512×512 | 圓形 | ⚠️ 視簡潔度 | ✅ 保留 | ❌ 純色（ B 版） | 20% |
| 5 | Facebook 頭像 | 400×400 | 圓形 | ✅ 保留 | ✅ | ✅ A 版 | 15% |
| 6 | YouTube 頭像 | 800×800 | 圓形 | ✅ 保留 | ✅ | ✅ A 版 | 15% |
| 7 | Favicon | 32×32 | 方形 | ❌ 移除 | ✅（加粗版） | ❌ 純色 | 10% |
| 8 | Loading Icon | 自訂 | 動畫 | ✅（描邊） | ✅（點亮） | ✅ A 版 | 不限 |

---

## 三、各平台詳細規格

### 1. Android Adaptive Icon

| 項目 | 規範 |
|:----|:------|
| **格式** | SVG（foreground）+ 背景色定義 |
| **尺寸** | 1024×1024px（輸出），系統自動縮放 |
| **安全留白** | foreground 置於中央 66% 區域（系統 safe zone） |
| **弧線** | ✅ 保留，粗度 8px（1024px 基準） |
| **星星** | ✅ 保留，柔和四角星，佔 Icon 高度 35% |
| **軌跡** | ❌ 移除（小空間不適用） |
| **漸層** | ✅ A 版：藍紫漸層（#4F7CFF → #7C3AED） |
| **背景色** | #0F0F1A（深空色） |
| **深色模式** | 不影響（adaptive 自動處理） |
| **淺色模式** | 不影響（adaptive 自動處理） |
| **Monochrome** | Android 13+ 支援，使用全白版弧線＋星星 |

### 2. iOS App Icon

| 項目 | 規範 |
|:----|:------|
| **格式** | PNG（無透明背景，系統自動加圓角） |
| **尺寸** | 1024×1024px（Xcode 要求） |
| **安全留白** | Icon 邊緣預留 10%（避免被系統圓角裁切） |
| **弧線** | ✅ 保留，粗度 8px |
| **星星** | ✅ 保留，柔和四角星，佔 Icon 35% |
| **軌跡** | ❌ 移除 |
| **漸層** | ✅ A 版：藍紫漸層弧＋金星 |
| **背景** | 深藍到深紫徑向漸層（模擬「光從星星發出」） |
| **深色模式** | iOS 會自動加陰影，不影響 Icon 本身 |
| **淺色模式** | Icon 背景本身夠深，對比度不受影響 |

### 3. PWA Icon

| 項目 | 規範 |
|:----|:------|
| **主要尺寸** | 512×512px（manifest 要求） |
| **次要尺寸** | 192×192px（manifest 要求） |
| **格式** | PNG |
| **安全留白** | 15% |
| **弧線** | ✅ 保留（192px 驗證弧線仍清晰） |
| **星星** | ✅ 保留 |
| **軌跡** | ❌ 移除 |
| **漸層** | ✅ A 版 |
| **192px 注意** | 弧線粗度需從 8px 縮至 3px，小尺寸可能需改用純色版 B |

### 4. LINE 社群頭像

| 項目 | 規範 |
|:----|:------|
| **格式** | PNG（LINE 會自動壓縮） |
| **尺寸** | 512×512px（上傳建議） |
| **形狀** | 圓形（LINE 會自動裁切） |
| **安全留白** | 20%（圓形裁切後內容不應被切到） |
| **弧線** | ⚠️ **建議測試**：若弧線在圓形裁切後不完整，應移除 |
| **星星** | ✅ 保留，置中放大（佔 Icon 50%） |
| **漸層** | ❌ 不建議（LINE 壓縮後漸層可能斷階） |
| **建議配色** | **B 版：深藍背景＋金色星星**（純色，壓縮不影響） |
| **注意** | LINE 頭像在對話列表中只有 64×64，需確保星星清晰可辨 |

**LINE 頭像建議方案：**

```
方案 L1（推薦）：B 版純色，僅星星置中，背景深藍
  → 簡單、高辨識、壓縮不失真
  
方案 L2：B 版，弧線＋星星（若圓形裁切後弧線完整）
  → 與品牌一致性更高，但需實測

建議先以 L1 為主，L2 為備用。
```

### 5. Facebook 頭像

| 項目 | 規範 |
|:----|:------|
| **尺寸** | 400×400px（建議上傳 800×800） |
| **形狀** | 圓形（FB 會自動裁切） |
| **安全留白** | 15% |
| **弧線** | ✅ 保留（FB 頭像較大，弧線完整） |
| **星星** | ✅ 保留 |
| **漸層** | ✅ A 版可 |
| **建議** | 與主 App Icon 共用 Icon Only 版本 |

### 6. YouTube 頭像

| 項目 | 規範 |
|:----|:------|
| **尺寸** | 800×800px（建議） |
| **形狀** | 圓形（YT 會自動裁切） |
| **安全留白** | 15% |
| **弧線** | ✅ 保留 |
| **星星** | ✅ 保留 |
| **漸層** | ✅ A 版 |
| **建議** | 與主 App Icon 共用 Icon Only 版本 |

### 7. Favicon

| 項目 | 規範 |
|:----|:------|
| **尺寸** | 32×32px（標準），16×16px（最小） |
| **格式** | .ico（合併 16+32），.png（備用） |
| **弧線** | ❌ 移除（32px 以下弧線不可辨） |
| **星星** | ✅ 保留（使用小尺寸專用加粗四角星） |
| **漸層** | ❌ 純色 |
| **配色** | 深藍 #4F7CFF（淺色背景）或 白色（深色背景） |
| **16×16** | 使用 Pixel Hinting 版本（以像素為單位手繪四角星） |

### 8. Loading Icon（品牌動態識別概念）

| 項目 | 規範 |
|:----|:------|
| **類型** | SVG 動畫（CSS 或 Lottie） |
| **時間** | 1.5 ∼ 2.5 秒 |
| **內容** | 弧線描邊動畫＋星星點亮 |

**動畫腳本：**

```
時間軸：

0.0s  - 畫面全黑/全品牌色
0.2s  - C 形弧線從開口處開始「畫出」
       （使用 stroke-dasharray + stroke-dashoffset 動畫）
       （單端漸細的方向：從細端開始畫，往粗端延伸）
0.8s  - 弧線完成，完整呈現
1.0s  - 星星位置出現微弱光暈（opacity: 0 → 1）
1.2s  - 柔和四角星 fade-in + 微放大（從 0.8x 到 1.0x）
1.5s  - 星星完全點亮（金色 glow 啟動）
1.5s~ - Logo 完成，停留（可 fade-out 轉入主內容）

總時長：約 1.5 秒
```

**應用場景：**

| 場景 | 使用方式 |
|:----|---------|
| PWA 啟動畫面 | 深色背景 + 完整動畫，1.5 秒後轉入首頁 |
| 網站 Loading | 深色全屏 + 動畫，內容載入完畢後淡出 |
| 影片片頭 | 深色背景 + 動畫 + 品牌名淡入，2 秒 |
| App 啟動 | 靜態 Icon → 動畫 → 主畫面（iOS/Android） |
| 社群影片片尾 | 動畫結束後停留 2 秒，作為品牌結尾 |

**設計理由：**

- 弧線先出現、星星後點亮，代表「學習是一條路，夢想是最後的成果」
- 1.5 秒的長度足夠讓人留下印象，又不至於讓人等待不耐煩
- SVG/CSS 實現不需額外 plugin，網站可直接使用
- 與 Logo 系統共用同一組視覺元素，確保品牌一致性

---

## 四、最推薦版本

### 推薦綜合方案

| 平台 | 版本 | 理由 |
|:----|:----:|------|
| Android | Icon Only（A 版漸層） | Adaptive Icon 形狀可變，弧線＋星星在任意 mask 下都完整 |
| iOS | Icon Only（A 版漸層） | 深色背景＋金色星在 iOS 桌面上辨識度最高 |
| PWA 512px | Icon Only（A 版漸層） | 與 iOS/Android Icon 一致 |
| PWA 192px | Icon Only（B 版純色） | 漸層在小尺寸可能失真，純色更安全 |
| LINE | 僅星星（B 版純色） | 圓形裁切＋壓縮，弧線可能消失 |
| FB/YT | Icon Only（A 版漸層） | 與主品牌一致 |
| Favicon | 僅星星（加粗四角星） | 弧線無法在小空間使用 |
| Loading 動畫 | 弧線描邊＋星星點亮 | 1.5 秒，可跨平台使用 |

### 統一判斷

- **有 ≥ 256px 空間 → 使用 Icon Only（弧線＋星星，A 版漸層）**
- **有 64∼255px 空間 → 使用 Icon Only（弧線＋星星，B 版純色）**
- **< 64px 空間 → 使用 Small Icon（僅星星，加粗版）**
- **LINE 頭像 → 使用僅星星（純色），因圓形裁切後弧線不完整**

---

## 📋 Milestone 2 完成摘要

| 項目 | 狀態 |
|:----|:----:|
| Logo 輸出清單（24 個檔案）＋ 命名規範 | ✅ 完成 |
| ① Android Adaptive Icon 規格 | ✅ |
| ② iOS App Icon 規格 | ✅ |
| ③ PWA Icon 規格（512+192） | ✅ |
| ④ LINE 頭像規格（含 L1/L2 方案） | ✅ |
| ⑤ Facebook 頭像規格 | ✅ |
| ⑥ YouTube 頭像規格 | ✅ |
| ⑦ Favicon 規格（32+16） | ✅ |
| ⑧ Animated Loading Icon 概念 | ✅ 含時間軸腳本與 5 場景應用 |
| 最推薦版本總表 | ✅ |

**請確認 Milestone 2 是否可結案，確認後進入 Milestone 3（吉祥物）。**
