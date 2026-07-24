import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "教學文章",
  description: "AI 圓夢魔法學院的教學文章，學習最新的 AI 知識與技巧。",
};

const posts = [
  {
    title: "2025 年最佳 AI 工具推薦：新手入門指南",
    excerpt: "為初學者精選 10 個最容易上手的 AI 工具，附完整使用教學與比較分析。",
    date: "2025-07-20",
    slug: "best-ai-tools-2025",
    category: "工具推薦",
    readTime: "8 分鐘",
  },
  {
    title: "ChatGPT 提示詞大全：50 個實用範例",
    excerpt: "從日常生活到工作應用，50 個即抄即用的 ChatGPT 提示詞，讓你馬上變高手。",
    date: "2025-07-18",
    slug: "chatgpt-prompt-examples",
    category: "提示詞",
    readTime: "12 分鐘",
  },
  {
    title: "Midjourney V6 新功能完整教學",
    excerpt: "最新版本 Midjourney 的功能介紹、參數調整與實戰技巧總整理。",
    date: "2025-07-15",
    slug: "midjourney-v6-guide",
    category: "AI 繪圖",
    readTime: "10 分鐘",
  },
  {
    title: "什麼是 AI？給完全新手的入門指南",
    excerpt: "用最簡單的方式解釋 AI、機器學習、深度學習，讓你 10 分鐘搞懂。",
    date: "2025-07-12",
    slug: "what-is-ai-beginners",
    category: "AI 入門",
    readTime: "6 分鐘",
  },
  {
    title: "Canva AI 功能完全攻略",
    excerpt: "Canva 的 AI 功能完整教學，從文字生成圖片到 AI 修圖一次學會。",
    date: "2025-07-10",
    slug: "canva-ai-guide",
    category: "AI 工具",
    readTime: "7 分鐘",
  },
  {
    title: "AI 語音轉文字工具推薦與比較",
    excerpt: "Whisper、Google 語音輸入、Otter.ai 等工具完整評測與使用教學。",
    date: "2025-07-08",
    slug: "ai-speech-to-text",
    category: "工具推薦",
    readTime: "9 分鐘",
  },
];

export default function BlogPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">教學文章</h1>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            掌握最新的 AI 知識、技巧與工具推薦
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <Link key={i} href={`/blog/${post.slug}`}>
              <Card className="glass border-0 overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 h-full">
                <div className="aspect-[16/9] bg-gradient-to-br from-magic-blue-50 to-magic-purple-50 flex items-center justify-center">
                  <span className="text-5xl">
                    {post.category === "AI 入門" ? "📚" :
                     post.category === "AI 繪圖" ? "🎨" :
                     post.category === "提示詞" ? "✍️" :
                     post.category === "工具推薦" ? "🛠️" : "📝"}
                  </span>
                </div>
                <CardContent className="p-5">
                  <div className="flex justify-between items-center mb-3">
                    <Badge className="bg-magic-purple/10 text-magic-purple border-magic-purple/20">
                      {post.category}
                    </Badge>
                    <span className="text-xs text-gray-400">{post.readTime}</span>
                  </div>
                  <h3 className="font-bold text-lg mb-2 line-clamp-2">{post.title}</h3>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1 text-gray-400">
                      <Calendar className="h-3 w-3" /> {post.date}
                    </span>
                    <span className="text-magic-blue flex items-center gap-1 font-medium">
                      閱讀更多 <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
