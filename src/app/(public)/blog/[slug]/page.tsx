import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Calendar, Clock } from "lucide-react";

const posts = {
  "best-ai-tools-2025": {
    title: "2025 年最佳 AI 工具推薦：新手入門指南",
    date: "2025-07-20",
    category: "工具推薦",
    readTime: "8 分鐘",
    content: `## 前言

AI 工具已經成為我們日常生活和工作中不可或缺的幫手。但是面對市面上琳瑯滿目的 AI 工具，初學者往往不知道該從哪個開始。

這篇文章為你精選 10 個最容易上手的 AI 工具，每一個都有完整的教學資源。

## 1. ChatGPT

**最適合：** 日常問答、寫作、翻譯、程式輔助

ChatGPT 是目前最受歡迎的 AI 對話工具。你可以用它來：
- 詢問各種問題
- 撰寫文章、郵件
- 翻譯語言
- 學習新知識

**入門建議：** 直接註冊免費帳號，從日常生活中的小事開始問起。

## 2. Claude

**最適合：** 文件分析、長文處理、專業寫作

Claude 在處理長篇文件和深入分析方面表現出色。

## 3. Midjourney

**最適合：** AI 圖片生成、藝術創作

想要讓 AI 幫你畫圖？Midjourney 是最受歡迎的選擇。

## 4. Canva

**最適合：** 設計入門、社群貼文、簡報

Canva 內建多種 AI 功能，讓設計變得前所未有的簡單。

## 5. Perplexity

**最適合：** AI 搜尋引擎、研究調查

Perplexity 結合了搜尋引擎和 AI 對話的優點。

## 結語

以上 10 個 AI 工具都是目前市面上最容易上手的選擇。建議初學者先從 ChatGPT 或 Canva 開始，慢慢再探索其他工具。`,
  },
  "chatgpt-prompt-examples": {
    title: "ChatGPT 提示詞大全：50 個實用範例",
    date: "2025-07-18",
    category: "提示詞",
    readTime: "12 分鐘",
    content: `## 什麼是提示詞（Prompt）？

提示詞就是你對 AI 下的指令。好的提示詞能讓 AI 給出更精準、更有用的回答。

## 日常應用提示詞

### 1. 寫信
\`\`\`
請幫我寫一封正式的信件，內容是...
語氣要客氣且專業。
\`\`\`

### 2. 食譜建議
\`\`\`
我冰箱裡有雞蛋、番茄、洋蔥和豆腐。
請推薦 3 道簡單的料理，附上步驟。
\`\`\`

### 3. 旅遊規劃
\`\`\`
我要去日本東京玩 5 天 4 夜，
請幫我規劃行程，包含交通建議。
\`\`\`

## 工作應用提示詞

### 4. 會議記錄整理
\`\`\`
以下是會議內容：[貼上會議記錄]
請幫我整理成重點摘要，包含：
- 決議事項
- 待辦事項（含負責人）
- 下次會議時間
\`\`\`

### 5. 文章改寫
\`\`\`
請幫我改寫以下文字，讓它更簡單易懂：
[貼上文字]
\`\`\`

... 更多提示詞範例請參考課程進度。`,
  },
  "midjourney-v6-guide": {
    title: "Midjourney V6 新功能完整教學",
    date: "2025-07-15",
    category: "AI 繪圖",
    readTime: "10 分鐘",
    content: `## Midjourney V6 的重大更新

Midjourney V6 帶來了許多令人興奮的新功能，讓 AI 圖片的品質和可控性都大幅提升。

## 主要新功能

### 1. 更真實的圖片品質
V6 在光影、材質和細節方面都有顯著提升，生成的圖片更加逼真。

### 2. 更好的文字理解能力
現在 Midjourney 可以更準確地理解複雜的提示詞。

### 3. 新的參數選項
新增了多個參數讓你能更精細地控制輸出結果。

## 入門提示詞範例

**基礎提示詞：**
\`\`\`
a beautiful mountain landscape at sunset, photorealistic, 8k --ar 16:9
\`\`\`

**進階提示詞：**
\`\`\`
cinematic shot of a elderly person using a tablet, warm lighting, cozy living room, photorealistic, depth of field --ar 16:9 --v 6
\`\`\`

## 參數調整技巧

- \`--ar\`: 調整圖片比例
- \`--v\`: 指定版本
- \`--s\`: 風格化程度
- \`--iw\`: 圖片權重（參考圖片時使用）

更多詳細教學請參考我們的 Midjourney 課程。`,
  },
  "what-is-ai-beginners": {
    title: "什麼是 AI？給完全新手的入門指南",
    date: "2025-07-12",
    category: "AI 入門",
    readTime: "6 分鐘",
    content: `## AI 是什麼？

AI（人工智慧）簡單來說，就是讓電腦能夠像人類一樣思考、學習和解決問題的技術。

## 用生活化的方式理解 AI

想像你有一個非常聰明的助手，它可以：
- 聽懂你說的話
- 回答你的問題
- 幫你完成工作
- 學習你的喜好

這就是 AI 的基本概念。

## 常見的 AI 應用

### 語音助理
Siri、Google Assistant 都是 AI。

### 圖片辨識
手機相簿會自動辨識人臉和場景，這也是 AI。

### 翻譯
Google 翻譯使用 AI 技術。

### 推薦系統
Netflix、YouTube 的推薦功能都用到 AI。

## AI 不等於機器人

很多人以為 AI 就是像電影裡的機器人。實際上，AI 更多是存在於軟體和服務中，是無形的智慧。

## 結語

AI 沒有你想像中那麼複雜。把它當成一個聰明的助手，從簡單的工具開始嘗試，你會發現 AI 真的很實用。`,
  },
  "canva-ai-guide": {
    title: "Canva AI 功能完全攻略",
    date: "2025-07-10",
    category: "AI 工具",
    readTime: "7 分鐘",
    content: `## Canva 的 AI 功能

Canva 是目前最受歡迎的線上設計工具，內建多種強大的 AI 功能。

## Magic Studio 功能介紹

### Magic Design
輸入文字描述，Canva AI 自動幫你生成設計。

### Magic Write
AI 輔助文案撰寫，輕鬆寫出社群貼文。

### Magic Eraser
一鍵移除圖片中不想要的物件。

### Background Remover
自動去背功能。

## 實戰教學

### 製作社群貼文
1. 打開 Canva，選擇「社群媒體」
2. 選擇喜歡的模板
3. 使用 Magic Write 輸入文案
4. 用 AI 調整配色
5. 下載完成

## 小技巧

- 使用中文提示詞同樣有效
- AI 功能在免費版也有基本額度
- 多嘗試不同風格找到最適合的`,
  },
  "ai-speech-to-text": {
    title: "AI 語音轉文字工具推薦與比較",
    date: "2025-07-08",
    category: "工具推薦",
    readTime: "9 分鐘",
    content: `## 語音轉文字工具為什麼重要？

對於不習慣打字的熟齡朋友來說，語音輸入是最自然的溝通方式。

## 推薦工具

### 1. OpenAI Whisper
- 準確率極高
- 支援多國語言（包含中文）
- 免費使用
- 可離線使用

### 2. Google 語音輸入
- Android 手機內建
- 免費使用
- 即時辨識
- 支援中文

### 3. Otter.ai
- 適合會議記錄
- 自動標記說話者
- 英文表現最佳

## 使用場景建議

**日常筆記：** Google 語音輸入（最方便）
**會議記錄：** Otter.ai（英文）或 Whisper（中文）
**影片字幕：** Whisper（最準確）

## 總結

語音轉文字工具已經非常成熟，建議從手機內建的 Google 語音輸入開始體驗。`,
  },
};

export async function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const slug = (await params).slug;
  const post = posts[slug as keyof typeof posts];
  if (!post) return { title: "文章未找到" };
  return {
    title: post.title,
    description: post.content.slice(0, 100),
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const post = posts[slug as keyof typeof posts];

  if (!post) {
    return (
      <div className="py-24 text-center">
        <h1 className="text-2xl font-bold mb-4">文章未找到</h1>
        <Link href="/blog" className="inline-flex items-center justify-center rounded-lg border border-border bg-background hover:bg-muted h-8 px-2.5 text-sm font-medium transition-colors">
            返回文章列表
          </Link>
      </div>
    );
  }

  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-3xl">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-magic-blue mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> 返回文章列表
        </Link>

        <Badge className="mb-4 bg-magic-purple/10 text-magic-purple border-magic-purple/20">
          {post.category}
        </Badge>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>

        <div className="flex items-center gap-4 text-sm text-gray-400 mb-10">
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" /> {post.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" /> {post.readTime}
          </span>
        </div>

        <Separator className="mb-10" />

        <article className="prose prose-gray max-w-none">
          {post.content.split("\n").map((line, i) => {
            if (line.startsWith("## ")) {
              return (
                <h2 key={i} className="text-2xl font-bold mt-8 mb-4">
                  {line.replace("## ", "")}
                </h2>
              );
            }
            if (line.startsWith("### ")) {
              return (
                <h3 key={i} className="text-xl font-bold mt-6 mb-3">
                  {line.replace("### ", "")}
                </h3>
              );
            }
            if (line.startsWith("```")) {
              return null; // Skip code block markers
            }
            if (line.trim() === "") {
              return <div key={i} className="h-4" />;
            }
            if (line.startsWith("- ")) {
              return (
                <li key={i} className="text-gray-600 ml-4">
                  {line.replace("- ", "")}
                </li>
              );
            }
            return (
              <p key={i} className="text-gray-600 mb-4 leading-relaxed">
                {line}
              </p>
            );
          })}
        </article>

        <Separator className="my-10" />

        <div className="text-center">
          <Link href="/blog" className="inline-flex items-center justify-center rounded-lg border border-border bg-background hover:bg-muted h-8 px-2.5 text-sm font-medium transition-colors">
            閱讀更多文章
          </Link>
        </div>
      </div>
    </div>
  );
}
