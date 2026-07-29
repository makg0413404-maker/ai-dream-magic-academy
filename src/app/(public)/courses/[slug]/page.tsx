import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Star, Users, Clock, ArrowLeft, BookOpen, Sparkles } from "lucide-react";

const courses = {
  "ai-drawing-prompt": {
    title: "AI 繪圖 × ChatGPT 提示詞",
    desc: "從一句話開始，學會寫提示詞，生成高品質圖片。",
    outcome: "學完做出：吸睛圖片與海報",
    outcomeTags: ["ChatGPT 提示詞", "AI 圖片創作", "海報設計", "社群素材"],
    rating: 4.8,
    students: 128,
    duration: "4 小時",
    lessons: 4,
    category: "AI 繪圖",
    target: "完全初心者",
    longDesc: `這門課帶你從零開始，學會用 ChatGPT 寫提示詞，把腦中的想法變成高品質的 AI 圖片。

你將學到：
• 提示詞的基本概念與思考方式
• 用 ChatGPT 撰寫清楚有效的提示詞
• 控制風格與構圖，做出想要的畫面
• 實作吸睛海報與社群素材

課程特色：
• 適合完全沒基礎的熟齡學員
• 大字體、慢步調教學
• 每一步都有圖文解說與練習`,
    outline: [
      "單元 1：什麼是提示詞",
      "單元 2：ChatGPT 寫提示詞基礎",
      "單元 3：風格與構圖控制",
      "單元 4：海報與社群素材實作",
    ],
  },
  "ai-avatar-video": {
    title: "AI 分身影片（即夢、豆包）",
    desc: "不用拍攝、不會剪輯，也能製作自己的 AI 分身影片。",
    outcome: "學完做出：自己的 AI 短影音",
    outcomeTags: ["AI 分身", "短影音", "自我介紹影片", "行銷影片"],
    rating: 4.9,
    students: 96,
    duration: "3 小時",
    lessons: 4,
    category: "AI 影片",
    target: "有基礎者",
    longDesc: `用即夢、豆包等 AI 工具，不用拍攝、不用剪輯，做出專屬於你的 AI 分身影片。

你將學到：
• 認識即夢、豆包等 AI 分身工具
• 設計腳本與個人形象
• 一鍵生成自己的分身影片
• 自我介紹與行銷影片應用

適合想做自我介紹、行銷宣傳的熟齡學員。`,
    outline: [
      "單元 1：認識 AI 分身工具",
      "單元 2：腳本與形象設定",
      "單元 3：生成分身影片",
      "單元 4：自我介紹與行銷應用",
    ],
  },
  "ai-creative-ad": {
    title: "AI 創意內容廣告片",
    desc: "用 AI 快速完成廣告文案、圖片與影片，提升內容創作效率。",
    outcome: "學完做出：能行銷品牌的內容",
    outcomeTags: ["廣告影片", "社群貼文", "行銷素材", "品牌內容"],
    rating: 4.7,
    students: 64,
    duration: "4 小時",
    lessons: 4,
    category: "AI 內容",
    target: "想經營品牌者",
    longDesc: `整合多種 AI 工具，快速完成廣告文案、圖片與影片，大幅提升內容創作效率。

你將學到：
• 用 AI 寫出打動人的廣告文案
• AI 圖片與版型設計
• 廣告影片快速生成
• 社群與行銷內容佈局

適合想經營個人品牌、小生意的學員。`,
    outline: [
      "單元 1：廣告文案與品牌聲音",
      "單元 2：AI 圖片與版型",
      "單元 3：廣告影片生成",
      "單元 4：社群與行銷佈局",
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
        <Link href="/courses" className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground hover:bg-primary/80 h-11 px-4 text-lg font-medium transition-colors">
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
          className="inline-flex items-center gap-2 text-lg text-gray-500 hover:text-magic-purple mb-8 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" /> 返回課程列表
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Badge className="mb-4 bg-magic-purple/10 text-magic-purple border-magic-purple/20 text-base">
              {course.category}
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-magic-gold mr-2" aria-hidden="true">✦</span>
              {course.title}
            </h1>
            <p className="text-xl text-gray-600 mb-6 leading-relaxed">{course.desc}</p>
            <p className="text-xl font-bold text-magic-purple mb-4">
              <span className="text-magic-gold mr-2" aria-hidden="true">✦</span>
              {course.outcome}
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {course.outcomeTags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full text-lg leading-relaxed bg-magic-purple/10 text-magic-purple border border-magic-gold/40"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap sm:items-center gap-x-4 gap-y-3 text-lg text-gray-500 mb-8">
              <span className="flex items-center gap-1 min-w-0">
                <Star className="h-5 w-5 text-magic-gold fill-magic-gold" />{" "}
                {course.rating}
              </span>
              <span className="flex items-center gap-1 min-w-0">
                <Users className="h-5 w-5 flex-shrink-0" /> {course.students} 位學員
              </span>
              <span className="flex items-center gap-1 min-w-0">
                <Clock className="h-5 w-5 flex-shrink-0" /> {course.duration}
              </span>
              <span className="flex items-center gap-1 min-w-0 col-span-2">
                <BookOpen className="h-5 w-5 flex-shrink-0" /> 適合：{course.target}
              </span>
            </div>

            <Separator className="mb-8" />

            <div className="prose prose-gray max-w-none mb-10">
              <h2 className="text-2xl font-bold mb-4">
                <span className="text-magic-gold mr-2" aria-hidden="true">✦</span>課程介紹
              </h2>
              {course.longDesc.split("\n").map((line, i) => (
                <p key={i} className="text-lg text-gray-600 mb-2 leading-relaxed">
                  {line}
                </p>
              ))}
            </div>

            <Separator className="mb-8" />

            <h2 className="text-2xl font-bold mb-6">
              <span className="text-magic-gold mr-2" aria-hidden="true">✦</span>課程大綱
            </h2>
            <div className="space-y-3">
              {course.outline.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 rounded-lg bg-surface hover:bg-magic-purple/5 transition-colors"
                >
                  <span className="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-magic-purple to-magic-blue text-white flex items-center justify-center text-base font-bold">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-lg font-medium leading-relaxed">{item}</p>
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
                  {course.category === "AI 繪圖" ? "🎨" :
                   course.category === "AI 影片" ? "🎬" : "✨"}
                </div>
                <h3 className="font-bold text-xl mb-2">{course.title}</h3>
              </div>

              <div className="space-y-3 mb-6 text-lg">
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
                  <span className="font-medium text-magic-purple">會員免費</span>
                </div>
              </div>

              <Link href="/auth/register" className="block mb-3">
                <Button className="w-full text-lg py-6 bg-gradient-to-r from-magic-purple to-magic-blue hover:opacity-90 text-white shadow-lg shadow-magic-purple/20">
                  <Sparkles className="mr-2 h-5 w-5" /> 立即加入
                </Button>
              </Link>
              <Link href="/courses" className="block">
                <Button variant="outline" className="w-full text-lg py-6">
                  返回課程列表
                </Button>
              </Link>
              <p className="text-center text-lg text-gray-500 mt-4">
                <span className="text-magic-gold" aria-hidden="true">✦</span>{" "}
                免費註冊，馬上開始學習
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sticky bottom CTA */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-white/90 backdrop-blur border-t border-magic-purple/20 p-3">
        <Link href="/auth/register" className="block">
          <Button className="w-full text-lg py-6 bg-gradient-to-r from-magic-purple to-magic-blue hover:opacity-90 text-white shadow-lg shadow-magic-purple/20">
            <Sparkles className="mr-2 h-5 w-5" /> 立即加入
          </Button>
        </Link>
      </div>
      {/* Spacer so sticky bar doesn't cover content on mobile */}
      <div className="lg:hidden h-24" aria-hidden="true" />
    </div>
  );
}
