import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Star, Users, Clock, ArrowLeft, BookOpen } from "lucide-react";

const courses = {
  "chatGPT-basics": {
    title: "ChatGPT 從零開始",
    desc: "4 堂課帶你從 AI 新手變成活用高手",
    rating: 4.8,
    students: 128,
    duration: "2 小時",
    lessons: 4,
    category: "AI 入門",
    target: "完全初心者",
    longDesc: `這門課專為完全沒有經驗的初學者設計。

你將學到：
• AI 的基本概念與應用場景
• ChatGPT 帳號註冊與基本操作
• 實用提示詞技巧，讓 ChatGPT 聽懂你的需求
• 日常生活中的 AI 應用實戰

課程特色：
• 每一步都有圖文解說
• 大字體、慢步調教學
• 課後練習與解答`,
    outline: [
      "單元 1：什麼是 AI？— 認識人工智慧",
      "單元 2：ChatGPT 註冊與基本操作",
      "單元 3：10 個必學提示詞技巧",
      "單元 4：日常應用場景實戰",
    ],
  },
  "midjourney-prompt": {
    title: "Midjourney 魔法提示詞",
    desc: "學會寫提示詞，讓 AI 幫你畫出夢想中的圖",
    rating: 4.9,
    students: 96,
    duration: "3 小時",
    lessons: 6,
    category: "AI 繪圖",
    target: "有基礎者",
    longDesc: `從 Midjourney 基本操作到進階提示詞技巧。

你將學到：
• Midjourney Discord 操作基礎
• 提示詞的結構與撰寫技巧
• 風格控制與參數調整
• 商業應用實戰`,
    outline: [
      "單元 1：Midjourney 平台認識與設定",
      "單元 2：提示詞基本結構",
      "單元 3：風格控制與參數進階",
      "單元 4：人物、場景、產品設計",
      "單元 5：商業應用案例",
      "單元 6：作品後製與優化",
    ],
  },
  "ai-video-basics": {
    title: "AI 影片製作入門",
    desc: "用 AI 工具快速製作高品質影片",
    rating: 4.7,
    students: 64,
    duration: "2.5 小時",
    lessons: 5,
    category: "AI 影片",
    target: "初心者 ~ 中級",
    longDesc: `學習使用 Runway、Pika 等 AI 影片工具。

你將學到：
• 文字生成影片技術
• 圖片轉動態影片
• AI 影片編輯與後製
• 社群影片製作實戰`,
    outline: [
      "單元 1：AI 影片工具介紹",
      "單元 2：文字生成影片",
      "單元 3：圖片轉動態影片",
      "單元 4：影片編輯與後製",
      "單元 5：社群媒體影片實戰",
    ],
  },
  "claude-workflow": {
    title: "Claude AI 高效工作術",
    desc: "用 Claude 提升工作效率的完整指南",
    rating: 4.6,
    students: 72,
    duration: "2 小時",
    lessons: 4,
    category: "AI 工具",
    target: "有基礎者",
    longDesc: `學習如何用 Claude AI 提升工作效率。

你將學到：
• Claude 的核心功能介紹
• 文件分析與摘要技巧
• 數據整理與報告生成
• 內容創作與編輯`,
    outline: [
      "單元 1：Claude AI 基本認識",
      "單元 2：文件分析與摘要",
      "單元 3：數據整理與報告",
      "單元 4：內容創作實戰",
    ],
  },
  "advanced-prompting": {
    title: "AI 提示詞進階技巧",
    desc: "從基礎到專業的提示詞工程全攻略",
    rating: 4.8,
    students: 85,
    duration: "4 小時",
    lessons: 8,
    category: "提示詞",
    target: "中級",
    longDesc: `深入學習提示詞工程的各種進階技巧。

你將學到：
• 角色設定提示技巧
• 思維鏈提示方法
• 範例引導與 few-shot 技巧
• 多步驟複雜任務拆解`,
    outline: [
      "單元 1：提示詞工程基礎回顧",
      "單元 2：角色設定進階技巧",
      "單元 3：思維鏈提示法",
      "單元 4：Few-shot 與範例引導",
      "單元 5：多步驟任務拆解",
      "單元 6：條件控制與輸出格式",
      "單元 7：常見問題與除錯",
      "單元 8：綜合實戰專案",
    ],
  },
  "canva-ai-design": {
    title: "Canva AI 設計入門",
    desc: "用 Canva AI 功能輕鬆做出專業設計",
    rating: 4.5,
    students: 53,
    duration: "1.5 小時",
    lessons: 3,
    category: "AI 工具",
    target: "完全初心者",
    longDesc: `Canva 的 AI 功能讓設計變得前所未有的簡單。

你將學到：
• Canva AI 功能總覽
• AI 生成社群貼文設計
• AI 輔助簡報製作`,
    outline: [
      "單元 1：Canva AI 功能介紹",
      "單元 2：社群貼文設計實戰",
      "單元 3：簡報與海報製作",
    ],
  },
};

export async function generateStaticParams() {
  return Object.keys(courses).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const slug = (await params).slug;
  const course = courses[slug as keyof typeof courses];
  if (!course) return { title: "課程未找到" };
  return {
    title: course.title,
    description: course.desc,
  };
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const course = courses[slug as keyof typeof courses];

  if (!course) {
    return (
      <div className="py-24 text-center">
        <h1 className="text-2xl font-bold mb-4">課程未找到</h1>
        <Link href="/courses" className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground hover:bg-primary/80 h-8 px-2.5 text-sm font-medium transition-colors">
          返回課程列表
        </Link>
      </div>
    );
  }

  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <Link
          href="/courses"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-magic-blue mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> 返回課程列表
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Badge className="mb-4 bg-magic-blue/10 text-magic-blue border-magic-blue/20">
              {course.category}
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {course.title}
            </h1>
            <p className="text-lg text-gray-500 mb-6">{course.desc}</p>
            <div className="flex items-center gap-4 text-sm text-gray-400 mb-8">
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 text-magic-gold fill-magic-gold" />{" "}
                {course.rating}
              </span>
              <span className="flex items-center gap-1">
                <Users className="h-4 w-4" /> {course.students} 位學員
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" /> {course.duration}
              </span>
            </div>

            <Separator className="mb-8" />

            <div className="prose prose-gray max-w-none mb-10">
              <h2 className="text-2xl font-bold mb-4">課程介紹</h2>
              {course.longDesc.split("\n").map((line, i) => (
                <p key={i} className="text-gray-600 mb-2">
                  {line}
                </p>
              ))}
            </div>

            <Separator className="mb-8" />

            <h2 className="text-2xl font-bold mb-6">課程大綱</h2>
            <div className="space-y-3">
              {course.outline.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 rounded-lg bg-surface hover:bg-magic-blue-50/50 transition-colors"
                >
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-magic-blue text-white flex items-center justify-center text-sm font-bold">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-medium">{item}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="glass rounded-xl p-6 sticky top-24">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">
                  {course.category === "AI 入門" ? "🚀" : 
                   course.category === "AI 繪圖" ? "🎨" :
                   course.category === "AI 影片" ? "🎬" :
                   course.category === "提示詞" ? "✍️" : "🛠️"}
                </div>
                <h3 className="font-bold text-lg mb-2">{course.title}</h3>
              </div>

              <div className="space-y-3 mb-6 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">課程時長</span>
                  <span className="font-medium">{course.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">單元數量</span>
                  <span className="font-medium">{course.lessons} 個單元</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">適合對象</span>
                  <span className="font-medium">{course.target}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">課程費用</span>
                  <span className="font-medium text-magic-blue">會員免費</span>
                </div>
              </div>

              <Button className="w-full bg-magic-blue hover:bg-magic-blue/90 mb-3">
                <BookOpen className="mr-2 h-4 w-4" /> 立即報名
              </Button>
              <Button variant="outline" className="w-full">
                加入願望清單
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
