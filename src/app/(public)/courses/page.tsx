import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Users, Clock, ArrowRight, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "AI 課程介紹",
  description:
    "探索 AI 圓夢魔法學院的三大核心課程：AI 繪圖、AI 分身影片、AI 創意內容廣告片。",
};

const courses = [
  {
    title: "AI 繪圖 × ChatGPT 提示詞",
    desc: "從一句話開始，學會寫提示詞，生成高品質圖片。",
    outcome: "學完做出：吸睛圖片與海報",
    outcomeTags: ["ChatGPT 提示詞", "AI 圖片創作", "海報設計", "社群素材"],
    rating: 4.8,
    students: 128,
    duration: "4 小時",
    lessons: 4,
    category: "AI 繪圖",
    slug: "ai-drawing-prompt",
    target: "完全初心者",
  },
  {
    title: "AI 分身影片（即夢、豆包）",
    desc: "不用拍攝、不會剪輯，也能製作自己的 AI 分身影片。",
    outcome: "學完做出：自己的 AI 短影音",
    outcomeTags: ["AI 分身", "短影音", "自我介紹影片", "行銷影片"],
    rating: 4.9,
    students: 96,
    duration: "3 小時",
    lessons: 4,
    category: "AI 影片",
    slug: "ai-avatar-video",
    target: "有基礎者",
  },
  {
    title: "AI 創意內容廣告片",
    desc: "用 AI 快速完成廣告文案、圖片與影片，提升內容創作效率。",
    outcome: "學完做出：能行銷品牌的內容",
    outcomeTags: ["廣告影片", "社群貼文", "行銷素材", "品牌內容"],
    rating: 4.7,
    students: 64,
    duration: "4 小時",
    lessons: 4,
    category: "AI 內容",
    slug: "ai-creative-ad",
    target: "想經營品牌者",
  },
];

const categories = ["全部", "AI 繪圖", "AI 影片", "AI 內容"];

const categoryEmoji = (category: string) =>
  category === "AI 繪圖" ? "🎨" : category === "AI 影片" ? "🎬" : "✨";

export default function CoursesPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-12">
          <p className="text-magic-gold text-xl mb-3" aria-hidden="true">
            ✦ &nbsp;✦&nbsp; ✦
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-magic-blue via-magic-purple to-magic-gold bg-clip-text text-transparent leading-tight pb-1">
            跟著魔法學院，學會 AI
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-xl mx-auto leading-relaxed">
            不用任何基礎，大字體、慢步調，一步一步陪你打開 AI 的魔法之門
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {categories.map((cat, i) => (
            <Badge
              key={i}
              variant={i === 0 ? "default" : "outline"}
              className={`px-4 py-2 text-lg cursor-pointer ${
                i === 0
                  ? "bg-magic-purple hover:bg-magic-purple/90"
                  : "hover:bg-magic-purple/10 hover:border-magic-purple/30"
              }`}
            >
              {cat}
            </Badge>
          ))}
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, i) => (
            <Link key={i} href={`/courses/${course.slug}`} className="group">
              <Card className="glass relative border-0 overflow-hidden hover:shadow-xl hover:shadow-magic-purple/10 transition-all hover:-translate-y-1 h-full">
                <span
                  className="absolute top-3 right-4 text-magic-gold text-xl select-none"
                  aria-hidden="true"
                >
                  ✦
                </span>
                <div className="aspect-video bg-gradient-to-br from-magic-purple/10 via-magic-blue/10 to-magic-gold/15 flex items-center justify-center">
                  <span className="text-5xl">{categoryEmoji(course.category)}</span>
                </div>
                <CardContent className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <Badge className="bg-magic-purple/10 text-magic-purple border-magic-purple/20 text-lg">
                      {course.category}
                    </Badge>
                    <Badge variant="outline" className="text-lg">
                      {course.target}
                    </Badge>
                  </div>
                  <h3 className="font-bold text-xl mb-2">{course.title}</h3>
                  <p className="text-lg text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                    {course.desc}
                  </p>
                  <p className="text-lg font-bold text-magic-purple mb-3">
                    <span className="text-magic-gold mr-1" aria-hidden="true">✦</span>
                    {course.outcome}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {course.outcomeTags.map((tag, j) => (
                      <span
                        key={j}
                        className="px-3 py-1 rounded-full text-lg leading-relaxed bg-magic-purple/10 text-magic-purple border border-magic-gold/40"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-lg text-gray-500 mb-4">
    <span className="flex items-center gap-1">
                      <Star className="h-5 w-5 text-magic-gold fill-magic-gold" />{" "}
                      {course.rating}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-5 w-5" /> {course.students}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-5 w-5" /> {course.duration}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    className="w-full text-lg text-magic-purple hover:text-magic-purple hover:bg-magic-purple/10"
                  >
                    了解更多
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 mb-4">
            ✦ 準備好開始你的 AI 魔法之旅了嗎？
          </p>
          <Link href="/auth/register">
            <Button
              size="lg"
              className="text-lg px-8 py-6 bg-gradient-to-r from-magic-purple to-magic-blue hover:opacity-90 text-white shadow-lg shadow-magic-purple/20"
            >
              <Sparkles className="mr-2 h-5 w-5" /> 免費註冊，立即加入
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
