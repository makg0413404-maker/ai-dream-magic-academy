import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Users, Clock, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "AI 課程介紹",
  description: "探索 AI 圓夢魔法學院的所有課程，從 ChatGPT 到 Midjourney，從入門到進階。",
};

const courses = [
  {
    title: "ChatGPT 從零開始",
    desc: "4 堂課帶你從 AI 新手變成活用高手",
    longDesc: "這門課專為完全沒有經驗的初學者設計。從 AI 基本概念、ChatGPT 註冊操作、實用提示詞技巧，到日常應用場景實戰，一步步帶你上手。",
    rating: 4.8,
    students: 128,
    duration: "2 小時",
    lessons: 4,
    category: "AI 入門",
    slug: "chatGPT-basics",
    target: "完全初心者",
  },
  {
    title: "Midjourney 魔法提示詞",
    desc: "學會寫提示詞，讓 AI 幫你畫出夢想中的圖",
    longDesc: "從 Midjourney 基本操作到進階提示詞技巧，教你如何精準描述畫面、控制風格、調整參數，創造出令人驚豔的 AI 藝術作品。",
    rating: 4.9,
    students: 96,
    duration: "3 小時",
    lessons: 6,
    category: "AI 繪圖",
    slug: "midjourney-prompt",
    target: "有基礎者",
  },
  {
    title: "AI 影片製作入門",
    desc: "用 AI 工具快速製作高品質影片",
    longDesc: "學習使用 Runway、Pika 等 AI 影片工具，從文字生成影片、圖片轉影片到影片編輯，一站式掌握 AI 影片製作流程。",
    rating: 4.7,
    students: 64,
    duration: "2.5 小時",
    lessons: 5,
    category: "AI 影片",
    slug: "ai-video-basics",
    target: "初心者 ~ 中級",
  },
  {
    title: "Claude AI 高效工作術",
    desc: "用 Claude 提升工作效率的完整指南",
    longDesc: "學習如何用 Claude AI 協助你處理文件分析、數據整理、內容創作等工作，讓工作效率翻倍。",
    rating: 4.6,
    students: 72,
    duration: "2 小時",
    lessons: 4,
    category: "AI 工具",
    slug: "claude-workflow",
    target: "有基礎者",
  },
  {
    title: "AI 提示詞進階技巧",
    desc: "從基礎到專業的提示詞工程全攻略",
    longDesc: "深入學習提示詞工程的各種技巧：角色設定、思維鏈、範例引導等，讓你成為提示詞高手。",
    rating: 4.8,
    students: 85,
    duration: "4 小時",
    lessons: 8,
    category: "提示詞",
    slug: "advanced-prompting",
    target: "中級",
  },
  {
    title: "Canva AI 設計入門",
    desc: "用 Canva AI 功能輕鬆做出專業設計",
    longDesc: "Canva 的 AI 功能讓設計變得前所未有的簡單。這門課教你用 Canva AI 做社群貼文、簡報、海報等。",
    rating: 4.5,
    students: 53,
    duration: "1.5 小時",
    lessons: 3,
    category: "AI 工具",
    slug: "canva-ai-design",
    target: "完全初心者",
  },
];

const categories = ["全部", "AI 入門", "AI 繪圖", "AI 影片", "AI 工具", "提示詞"];

export default function CoursesPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">AI 課程介紹</h1>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            從入門到進階，找到最適合你的 AI 課程
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {categories.map((cat, i) => (
            <Badge
              key={i}
              variant={i === 0 ? "default" : "outline"}
              className={`px-4 py-2 text-sm cursor-pointer ${
                i === 0
                  ? "bg-magic-blue hover:bg-magic-blue/90"
                  : "hover:bg-magic-blue/10 hover:border-magic-blue/30"
              }`}
            >
              {cat}
            </Badge>
          ))}
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, i) => (
            <Link key={i} href={`/courses/${course.slug}`}>
              <Card className="glass border-0 overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 h-full">
                <div className="aspect-video bg-gradient-to-br from-magic-blue/10 to-magic-purple/10 flex items-center justify-center">
                  <span className="text-5xl">
                    {course.category === "AI 入門" ? "🚀" : 
                     course.category === "AI 繪圖" ? "🎨" :
                     course.category === "AI 影片" ? "🎬" :
                     course.category === "提示詞" ? "✍️" : "🛠️"}
                  </span>
                </div>
                <CardContent className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <Badge className="bg-magic-blue/10 text-magic-blue border-magic-blue/20">
                      {course.category}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {course.target}
                    </Badge>
                  </div>
                  <h3 className="font-bold text-lg mb-2">{course.title}</h3>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2">{course.desc}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                    <span className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-magic-gold fill-magic-gold" /> {course.rating}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" /> {course.students}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" /> {course.duration}
                    </span>
                  </div>
                  <Button variant="ghost" className="w-full group">
                    了解更多
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
