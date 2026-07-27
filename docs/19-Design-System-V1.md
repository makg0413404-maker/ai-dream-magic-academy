# AI 圓夢魔法學院 · Design System V1.0

> 文件版本：V1.0（Milestone 4）
> 製訂日期：2026 年 7 月 28 日
> 本文件為完整設計系統，定義色彩、字體、元件、動畫與頁面佈局的一致規範。
> 所有設計決策均以品牌決策原則為依據，尤其是「AI 是工具，人才是主角」。

---

## 一、設計系統核心原則

```
1. 所有設計都是為了讓學員感到「我可以做到」，而不是「AI 好厲害」
2. 學員的學習體驗 > 品牌酷炫度
3. 熟齡友善不是選項，是基本要求
4. 留白是功能，不是浪費空間
5. 一致的體驗比個別的驚豔更重要
```

---

## 二、色彩系統

### 2.1 品牌色（Primary）

| Token | HEX | 用途 | 使用比例 |
|:-----|:---:|:-----|:--------:|
| `--color-primary` | **#4F7CFF** | 主色調：按鈕、連結、重點強調 | 30% |
| `--color-primary-hover` | #3B6CFF | 主色 hover 狀態 | — |
| `--color-primary-light` | #E8EEFF | 主色淺色背景（表格、標籤） | — |
| `--color-secondary` | **#7C3AED** | 輔色：漸層搭配、次要強調 | 15% |
| `--color-accent` | **#F4C542** | 點綴色：星星、成就徽章、CTA 強調 | 10% |
| `--color-accent-hover` | #E0B430 | 點綴色 hover 狀態 | — |

### 2.2 中性色（Neutral）

| Token | HEX | 用途 |
|:-----|:---:|:------|
| `--color-bg` | #FFFFFF | 頁面主要背景 |
| `--color-bg-secondary` | #F8F9FC | 次要背景（卡片區塊） |
| `--color-bg-tertiary` | #F0F1F5 | 第三層背景（hover 狀態） |
| `--color-border` | #E4E4ED | 邊框、分割線 |
| `--color-border-light` | #F0F0F5 | 淺邊框（卡片內分割） |
| `--color-text-primary` | #1E1E2E | 主要文字 |
| `--color-text-secondary` | #6B6B80 | 次要文字 |
| `--color-text-tertiary` | #9CA3AF | 輔助文字（disabled 等） |
| `--color-text-inverse` | #FFFFFF | 深色背景上的文字 |

### 2.3 深色模式（Dark Mode）

| Token | HEX | 用途 |
|:-----|:---:|:------|
| `--color-bg-dark` | #0F0F1A | 深色模式主背景 |
| `--color-bg-dark-secondary` | #1A1A2E | 深色模式卡片背景 |
| `--color-bg-dark-tertiary` | #252540 | 深色模式 hover 狀態 |
| `--color-text-dark-primary` | #F1F1F6 | 深色模式主要文字 |
| `--color-text-dark-secondary` | #A1A1B5 | 深色模式次要文字 |
| `--color-border-dark` | #2D2D45 | 深色模式邊框 |

### 2.4 功能色（Functional）

| Token | HEX | 用途 |
|:-----|:---:|:------|
| `--color-success` | #10B981 | 成功狀態、完成標示 |
| `--color-success-bg` | #ECFDF5 | 成功背景 |
| `--color-warning` | #F59E0B | 警告、即將截止 |
| `--color-warning-bg` | #FFFBEB | 警告背景 |
| `--color-error` | #EF4444 | 錯誤、必填提示 |
| `--color-error-bg` | #FEF2F2 | 錯誤背景 |
| `--color-info` | #4F7CFF | 資訊提示 |
| `--color-info-bg` | #EFF3FF | 資訊背景 |

### 2.5 玻璃擬態（Glass）

| Token | 值 | 用途 |
|:-----|:---:|:------|
| `--glass-bg` | rgba(255,255,255,0.7) | 淺色模式毛玻璃背景 |
| `--glass-border` | rgba(79,124,255,0.15) | 毛玻璃邊框 |
| `--glass-dark-bg` | rgba(26,26,46,0.7) | 深色模式毛玻璃背景 |
| `--glass-dark-border` | rgba(79,124,255,0.2) | 深色模式毛玻璃邊框 |

---

### 使用範例

```css
/* 按鈕主要色 */
.btn-primary {
  background: var(--color-primary); /* #4F7CFF */
  color: #FFFFFF;
}
.btn-primary:hover {
  background: var(--color-primary-hover); /* #3B6CFF */
}

/* 卡片背景 */
.card {
  background: var(--color-bg-secondary); /* #F8F9FC */
  border: 1px solid var(--color-border); /* #E4E4ED */
}

/* 成功提示 */
.success-badge {
  background: var(--color-success-bg); /* #ECFDF5 */
  color: var(--color-success); /* #10B981 */
}
```

---

## 三、字體系統

### 3.1 字體家族

| 用途 | 字體 | 來源 |
|:----|:-----|:------|
| 中文（標題＋內文） | **Noto Sans TC** | Google Fonts |
| 英文（標題＋內文） | **Inter** | Google Fonts |
| 等寬（提示詞、程式碼） | **JetBrains Mono** | Google Fonts |

### 3.2 字體分級（Type Scale）

| 層級 | Token | 大小 | 行高 | 字重 | 使用 |
|:----|:------|:---:|:----:|:----:|:-----|
| Display | `--text-display` | 48/40/36px† | 1.2 | Bold (700) | Hero 大標題 |
| H1 | `--text-h1` | 36/32/28px† | 1.3 | Bold (700) | 頁面標題 |
| H2 | `--text-h2` | 28/24/22px† | 1.3 | Bold (700) | 區塊標題 |
| H3 | `--text-h3` | 22/20/18px† | 1.4 | SemiBold (600) | 卡片標題 |
| Body Large | `--text-body-lg` | 20px | 1.7 | Regular (400) | 重點內文 |
| **Body** | **`--text-body`** | **18px** | **1.7** | **Regular (400)** | **標準內文** |
| Body Small | `--text-body-sm` | 16px | 1.6 | Regular (400) | 輔助說明 |
| Caption | `--text-caption` | 14px | 1.5 | Regular (400) | 標籤、註腳 |
| Button | `--text-button` | 16-18px | — | Medium (500) | 按鈕文字 |
| 提示詞 | `--text-mono` | 16px | 1.6 | Regular (400) | AI 提示詞展示 |

> † 格式：桌機／平板／手機

### 3.3 熟齡友善調整

| 調整項目 | 規範 | 理由 |
|:--------|:----|:------|
| 最小內文 | **16px**（建議 18px） | 40 歲後視力調節能力下降 |
| 最小輔助文字 | **14px**（僅限標籤、註腳） | 小於 14px 不可用於任何閱讀性內容 |
| 按鈕文字 | **16-18px** | 確保可點擊區域 ≥ 44px |
| 行高 | 內文 ≥ 1.6 | 增加行間距提升可讀性 |
| 對比度 | 文字 ≥ 4.5:1（WCAG AA） | 所有文字顏色必須符合 |
| 最大行長 | 每行 ≤ 80 字元（約 660px） | 過長的行會讓閱讀疲勞 |

### 3.4 使用範例

```css
/* Hero 標題 */
.hero-title {
  font-family: 'Noto Sans TC', sans-serif;
  font-size: var(--text-display);
  font-weight: 700;
  line-height: 1.2;
}

/* 內文 - 符合熟齡友善 */
.content-body {
  font-family: 'Noto Sans TC', sans-serif;
  font-size: 18px; /* 不小於這個值 */
  line-height: 1.7;
  color: var(--color-text-primary);
  max-width: 660px;
}

/* 按鈕 */
.button {
  font-size: 16px;
  font-weight: 500;
  min-height: 44px; /* 觸控友善 */
  padding: 10px 20px;
}
```

---

## 四、Icon 系統

### 4.1 Icon 風格

| 屬性 | 規範 |
|:----|:------|
| **圖示庫** | Lucide React（已安裝） |
| **線條粗細** | 2px（stroke-width） |
| **圓角** | 2px（stroke-linecap: round, stroke-linejoin: round） |
| **尺寸** | 16px / 20px / 24px / 32px |
| **顏色** | 繼承文字顏色，或使用品牌色 |
| **動畫** | hover 時輕微旋轉／縮放（transition: 0.2s） |
| **不該有的** | ❌ 填滿（filled）風格、❌ 彩色漸層圖示、❌ 自訂圖示（除非品牌專屬） |

### 4.2 品牌專屬圖示

| 圖示 | 用途 | 備註 |
|:----|:-----|:------|
| ✦ 星星 | 品牌核心符號，用於重點強調 | 使用 `--color-accent` |
| 開放弧線 | Loading / 品牌紋理 | SVG 自訂 |
| 小靈（能量弧） | Loading / 成功動畫 | SVG 自訂 |

### 4.3 與 Logo 系統的關係

- Icon 使用 Lucide 的標準圖示為主，不重新設計
- 品牌專屬圖示（星星、弧線）直接取自 Logo System，不另做變體

---

## 五、按鈕系統

### 5.1 按鈕層級

| 層級 | 背景 | 文字色 | Hover | 使用場景 |
|:----|:----:|:------:|:-----:|:---------|
| **Primary** | #4F7CFF | #FFFFFF | #3B6CFF | 主要行動（報名、註冊、送出） |
| **Secondary** | transparent | #4F7CFF | bg: #E8EEFF | 次要行動（了解更多、返回） |
| **Ghost** | transparent | #6B6B80 | bg: #F0F1F5 | 第三層行動（取消、略過） |
| **Accent** | #F4C542 | #1E1E2E | #E0B430 | 重點 CTA（限時活動、精選課程） |
| **Danger** | #EF4444 | #FFFFFF | #DC2626 | 刪除、取消訂閱 |
| **Disabled** | #E4E4ED | #9CA3AF | — | 不可用狀態 |

### 5.2 按鈕尺寸

| 尺寸 | 高度 | 水平內距 | 文字大小 | 使用 |
|:----|:----:|:--------:|:--------:|:-----|
| lg | 48px | 24px | 18px | Hero CTA、主要頁面行動 |
| **md** | **44px** | **20px** | **16px** | **標準按鈕** |
| sm | 36px | 16px | 14px | 表格內操作、卡片行動 |

### 5.3 按鈕規範

| 項目 | 規範 |
|:----|:------|
| 圓角 | 8px（所有尺寸一致） |
| 最小可點擊區域 | 44×44px（觸控裝置） |
| 圖示＋文字 | 圖示在左，文字在右，間距 8px |
| Loading 狀態 | 按鈕內顯示旋轉中的小靈動畫 |
| Disabled 狀態 | 背景變灰，不可點擊，cursor: not-allowed |

### 5.4 使用範例

```html
<!-- 主要按鈕 -->
<button class="btn btn-primary">
  立即報名
</button>

<!-- 次要按鈕（外框） -->
<button class="btn btn-secondary">
  了解更多
</button>

<!-- 金色強調按鈕 -->
<button class="btn btn-accent">
  探索精選課程
</button>
```

---

## 六、卡片系統

### 6.1 卡片層級

| 層級 | 背景 | 邊框 | 陰影 | 圓角 | 使用 |
|:----|:----:|:----:|:----:|:----:|:-----|
| **Elevated** | #FFFFFF | 無 | 0 2px 8px rgba(0,0,0,0.08) | 16px | 課程卡片、文章卡片 |
| **Flat** | #F8F9FC | 無 | 無 | 12px | 次要資訊卡片 |
| **Outline** | #FFFFFF | 1px solid #E4E4ED | 無 | 12px | 表單區塊、設定區塊 |
| **Glass** | rgba(255,255,255,0.7) + blur(12px) | 1px solid rgba(79,124,255,0.15) | — | 16px | Hero 區覆蓋卡片 |
| **Dark** | #1A1A2E | 1px solid #2D2D45 | — | 16px | 深色模式卡片 |

### 6.2 卡片結構

```
┌─────────────────────────────┐
│                             │
│  [Image/Icon]               │
│                             │
│  Title (H3, 22px)           │
│  Description (Body, 18px)   │
│                             │
│  [Metadata row]  [Button]   │
│                             │
└─────────────────────────────┘

內部間距（padding）：24px（所有邊）
內部元素間距：12px
內容最大寬度：不限制，由卡片寬度決定
```

---

## 七、動畫規範

### 7.1 動畫原則

```
熟齡友善原則：
  - 動畫持續時間 ≥ 300ms（不要太快，讓人來不及反應）
  - 避免閃爍（頻率 < 3Hz）
  - 避免大面積位移（可能誘發暈眩）
  - 所有動畫均應有 prefers-reduced-motion 支援
```

### 7.2 動畫類型

| 動畫 | 持續時間 | Easing | 觸發 | 使用場景 |
|:----|:--------:|:------:|:----:|:---------|
| **fadeIn** | 500ms | ease-out | 進入視口 | 區塊載入、卡片出現 |
| **slideUp** | 500ms | ease-out | 進入視口 | 列表項目依次出現 |
| **hoverGlow** | 300ms | ease-in-out | hover | 按鈕、卡片 hover 發光 |
| **pulse** | 2s（loop） | ease-in-out | 自動 | Loading、小靈漂浮 |
| **arcDraw** | 800ms | ease-in-out | 頁面載入 | Logo 弧線描邊動畫 |
| **starReveal** | 400ms | ease-out | 弧線完成後 | Logo 星星點亮 |

### 7.3 小靈專用動畫

```css
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

@keyframes glow {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 0.8; }
}

@keyframes celebrate {
  0% { transform: rotate(0deg) scale(1); }
  50% { transform: rotate(180deg) scale(1.2); }
  100% { transform: rotate(360deg) scale(1); }
}

.ling-float {
  animation: float 3s ease-in-out infinite,
             glow 2s ease-in-out infinite;
}

.ling-celebrate {
  animation: celebrate 0.5s ease-in-out;
}
```

---

## 八、網站 Hero 佈局規範

### 8.1 版本選擇

根據已確認的方向：**軌跡引導（Hero B）**

### 8.2 佈局結構（深色模式）

```
┌──────────────────────────────────────────────────────┐
│  ┌─ Navbar ───────────────────────────── [登入] ───┐  │
│  │                                                    │  │
│  │    ★ (右上，發亮)                                  │  │
│  │     ╲                                              │  │
│  │      ╲  (發光軌跡從左下延伸到右上)                 │  │
│  │       ╲                                            │  │
│  │        ╲                                           │  │
│  │                                                    │  │
│  │        讓 AI 成為你的魔法棒                        │  │
│  │        專為熟齡與新手設計的 AI 學習平台            │  │
│  │                                                    │  │
│  │      [探索課程]          [免費註冊]                │  │
│  │                                                    │  │
│  └────────────────────────────────────────────────────┘  │
│                                                        │
│  背景：深藍（#0F0F1A）到深紫（#1A1A3E）垂直漸層        │
│  軌跡：從左下（x:10%, y:80%）到右上（x:85%, y:15%）    │
│  軌跡粗度：2px → 4px → 逐漸淡出                        │
│  星星：右上角，柔和四角星，金色                         │
│  標題：白色，置中略偏左                                │
│  副標題：#A1A1B5，18px，最大寬度 480px                  │
│  按鈕：置中，間距 16px                                  │
│  安全區：Hero 高度 = 100vh（全屏）                      │
└──────────────────────────────────────────────────────┘
```

### 8.3 淺色模式替代

```
背景：#F8F9FC
軌跡：#4F7CFF（純色，40% 透明）
星星：#4F7CFF
標題：#1E1E2E
副標題：#6B6B80
按鈕：Primary 藍色
```

### 8.4 Hero 動畫

```
頁面載入時：
  0ms：背景漸層淡入（500ms）
  200ms：軌跡描邊動畫開始（從左到右，800ms）
  600ms：標題 fadeIn + slideUp（500ms）
  800ms：副標題 fadeIn（400ms）
  1000ms：星星點亮（starReveal，400ms）
  1200ms：按鈕 fadeIn（400ms）
  
總時長：約 1.5 秒
```

---

## 九、表單系統

### 9.1 輸入欄位

| 項目 | 規範 |
|:----|:------|
| 高度 | 48px |
| 邊框 | 1px solid #E4E4ED，focus: 2px solid #4F7CFF |
| 圓角 | 8px |
| 標籤位置 | 上方（非 placeholder 取代） |
| 錯誤提示 | 紅色文字在輸入框下方，圖示可選 |
| 熟齡注意 | placeholder 文字 ≥ 16px，灰色 #9CA3AF |

### 9.2 表單佈局

```
┌─────────────────────────┐
│ 姓名 *                   │
│ ┌─────────────────────┐ │
│ │ 請輸入您的姓名        │ │
│ └─────────────────────┘ │
│                          │
│ Email *                  │
│ ┌─────────────────────┐ │
│ │ example@email.com    │ │
│ └─────────────────────┘ │
│                          │
│ 手機號碼                 │
│ ┌─────────────────────┐ │
│ │ 0912-345-678         │ │
│ └─────────────────────┘ │
│                          │
│ [           送出          ] │
└─────────────────────────┘

欄位間距：24px
標籤到輸入框間距：6px
同一行最多 2 欄（手機 1 欄）
```

---

## 十、Loading / 空狀態 / 錯誤狀態

### 10.1 Loading

```
骨架屏（Skeleton）：
  - 使用 Skeleton 元件（已安裝 shadcn/ui）
  - 動畫：pulse（1.5s loop）
  - 顏色：--color-bg-tertiary

全頁 Loading：
  - 深色背景 + 小靈漂浮動畫
  - 文字（可選）：「載入中⋯」
```

### 10.2 空狀態

```
設計：
  - 小圓微笑插畫（中型，約 120px）
  - 說明文字：「還沒有內容喔」
  - 行動按鈕：「去逛逛」

樣式參考：原始 contact page 的 success 狀態已有雛形
```

### 10.3 錯誤狀態

```
表單錯誤：
  - 紅框輸入欄位
  - 下方紅色提示文字
  - 不會清除已填內容

頁面錯誤（500）：
  - 小圓微笑：「哎呀，出了點問題」
  - 按鈕：「重新整理」

頁面遺失（404）：
  - 小圓微笑：「這裡什麼都沒有喔」
  - 按鈕：「回首頁」
```

---

## 十一、間距與佈局系統

### 11.1 間距比例

| Token | 值 | 使用 |
|:-----|:---|:-----|
| `--space-xs` | 4px | 圖示與文字之間 |
| `--space-sm` | 8px | 按鈕圖示與文字、標籤與內容 |
| `--space-md` | 12px | 卡片內元件間隔 |
| `--space-lg` | 16px | 按鈕內距、表單欄位間 |
| `--space-xl` | 24px | 區塊內卡片間距、卡片 padding |
| `--space-2xl` | 32px | 章節內區塊間距 |
| `--space-3xl` | 48px | 頁面部份間距 |
| `--space-4xl` | 64px | 大區段間距 |

### 11.2 內容最大寬度

| 容器 | 最大寬度 | 使用 |
|:----|:--------:|:-----|
| 內容區（閱讀） | 720px | 文章、課程介紹 |
| 內容區（一般） | 960px | 一般頁面內容 |
| 內容區（寬版） | 1200px | 課程列表、圖片藝廊 |
| 全幅 | 100% | Hero、CTA |

---

## 十二、設計系統與品牌一致性檢查

| 品牌原則 | 設計系統如何體現 |
|:--------|----------------|
| 化繁為簡 | 卡片系統只用 5 種層級，按鈕只用 6 種樣式，沒有多餘變體 |
| 溫暖陪伴 | 圓角 8-16px、色彩柔和、動畫緩慢 |
| 熟齡友善 | 最小內文 18px、行高 1.7、對比度 WCAG AA、最大行長 660px |
| 實用至上 | 表單範例直接可複用、CSS token 可直接引用 |
| **AI 是工具，人才是主角** | Hero 的焦點是「讓 AI 成為你的魔法棒」（學員的行動），不是展示 AI 介面截圖；卡片的重點是課程內容，不是技術規格；按鈕文案用「探索課程」而不是「了解 AI」 |

---

## 📋 Milestone 4 完成摘要

| 項目 | 狀態 |
|:----|:----:|
| ① 色彩系統（品牌色/中性色/深色/功能色/玻璃） | ✅ |
| ② 字體系統（分級/熟齡友善/使用範例） | ✅ |
| ③ Icon 系統（風格/品牌專屬） | ✅ |
| ④ 按鈕系統（6 層級/3 尺寸/完整規範） | ✅ |
| ⑤ 卡片系統（5 層級/結構範例） | ✅ |
| ⑥ 動畫規範（原則/類型/小靈動畫/程式碼） | ✅ |
| ⑦ Hero 佈局（深色/淺色/動畫時間軸） | ✅ |
| ⑧ 表單系統（輸入欄位/佈局） | ✅ |
| ⑨ Loading/空狀態/錯誤狀態 | ✅ |
| ⑩ 間距與佈局系統 | ✅ |
| 品牌一致性檢查 | ✅ |
| 新品牌原則「AI 是工具，人才是主角」 | ✅ 已更新至 Decision Principles |

**請確認 Milestone 4 是否結案。確認後我進入 Milestone 5：Brand Guideline V1.0。**
