import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, Star, Clock, Users } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const features = [
  {
    icon: "🤖",
    title: "AI 工具入門",
    desc: "ChatGPT、Claude 從零開始",
  },
  {
    icon: "🎨",
    title: "AI 圖片教學",
    desc: "Midjourney、DALL-E 輕鬆學",
  },
  {
    icon: "✍️",
    title: "提示詞魔法",
    desc: "寫出高效的 AI 提示詞",
  },
  {
    icon: "🎬",
    title: "AI 影片製作",
    desc: "AI 生成影片完整教學",
  },
];

const featuredCourses = [
  {
    title: "ChatGPT 從零開始",
    desc: "4 堂課帶你從 AI 新手變成活用高手",
    rating: 4.8,
    students: 128,
    duration: "2 小時",
    category: "AI 入門",
    slug: "chatGPT-basics",
  },
  {
    title: "Midjourney 魔法提示詞",
    desc: "學會寫提示詞，讓 AI 幫你畫出夢想中的圖",
    rating: 4.9,
    students: 96,
    duration: "3 小時",
    category: "AI 繪圖",
    slug: "midjourney-prompt",
  },
  {
    title: "AI 影片製作入門",
    desc: "用 AI 工具快速製作高品質影片",
    rating: 4.7,
    students: 64,
    duration: "2.5 小時",
    category: "AI 影片",
    slug: "ai-video-basics",
  },
];

const latestPosts = [
  {
    title: "2025 年最佳 AI 工具推薦：新手入門指南",
    excerpt: "為初學者精選 10 個最容易上手的 AI 工具，附完整使用教學。",
    date: "2025-07-20",
    slug: "best-ai-tools-2025",
    category: "工具推薦",
  },
  {
    title: "ChatGPT 提示詞大全：50 個實用範例",
    excerpt: "從日常生活到工作應用，50 個即抄即用的 ChatGPT 提示詞。",
    date: "2025-07-18",
    slug: "chatgpt-prompt-examples",
    category: "提示詞",
  },
  {
    title: "Midjourney V6 新功能完整教學",
    excerpt: "最新版本 Midjourney 的功能介紹與實戰技巧。",
    date: "2025-07-15",
    slug: "midjourney-v6-guide",
    category: "AI 繪圖",
  },
];

const galleryPreviews = [
  {
    src: "/api/placeholder/400/300",
    alt: "AI 生成奇幻風景",
    label: "奇幻風景",
  },
  {
    src: "/api/placeholder/400/300",
    alt: "AI 生成人物肖像",
    label: "人物肖像",
  },
  {
    src: "/api/placeholder/400/300",
    alt: "AI 生成產品設計",
    label: "產品設計",
  },
  {
    src: "/api/placeholder/400/300",
    alt: "AI 生成抽象藝術",
    label: "抽象藝術",
  },
];

const upcomingEvents = [
  {
    date: "2025-08-05",
    time: "19:00",
    title: "AI 繪圖入門：Midjourney 快速上手",
    type: "線上",
    price: "免費",
    slug: "midjourney-intro",
  },
  {
    date: "2025-08-12",
    time: "14:00",
    title: "ChatGPT 實戰工作坊",
    type: "實體",
    price: "免費",
    slug: "chatgpt-workshop",
  },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section - 軌跡引導版 (Hero B) */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#0F0F1A] to-[#1A1A3E] min-h-[600px] flex items-center">
          {/* 背景星星 */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
                style={{
                  left: `${((i * 7 + 3) % 100)}%`,
                  top: `${((i * 13 + 7) % 100)}%`,
                  animationDelay: `${i * 0.15}s`,
                  opacity: 0.3 + (i % 5) * 0.1,
                }}
              />
            ))}
          </div>

          {/* 軌跡 SVG - 從左下到右上發光弧線 */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 1440 800"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="arcGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4F7CFF" stopOpacity="0.15" />
                <stop offset="40%" stopColor="#4F7CFF" stopOpacity="0.4" />
                <stop offset="70%" stopColor="#4F7CFF" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.9" />
              </linearGradient>
              <filter id="arcGlow">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {/* 外發光軌跡 */}
            <path
              d="M 144 640 Q 540 480 720 360 Q 1000 220 1224 120"
              fill="none"
              stroke="url(#arcGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              filter="url(#arcGlow)"
              strokeDasharray="1000"
              strokeDashoffset="1000"
              className="animate-arc-draw"
              style={{ animationDelay: "200ms" }}
            />
            {/* 內層較細發光線 */}
            <path
              d="M 144 640 Q 540 480 720 360 Q 1000 220 1224 120"
              fill="none"
              stroke="#4F7CFF"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.6"
              strokeDasharray="1000"
              strokeDashoffset="1000"
              className="animate-arc-draw"
              style={{ animationDelay: "200ms" }}
            />
          </svg>

          {/* 星星 - 軌跡終點 (右上) */}
          <div
            className="absolute top-[12%] right-[12%] opacity-0"
            style={{ animation: "starReveal 0.4s ease-out 1s forwards" }}
          >
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24 4L27.5 16.5L40 20L27.5 23.5L24 36L20.5 23.5L8 20L20.5 16.5L24 4Z"
                fill="#F4C542"
                opacity="0.9"
              />
              <path
                d="M24 12L25.7 18.3L32 20L25.7 21.7L24 28L22.3 21.7L16 20L22.3 18.3L24 12Z"
                fill="#F4C542"
                opacity="0.6"
              />
            </svg>
          </div>

          <div className="container relative mx-auto px-4 py-20 lg:py-32">
            <div className="max-w-2xl">
              {/* 標題 */}
              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight opacity-0"
                style={{ animation: "heroFadeIn 0.5s ease-out 0.6s forwards" }}
              >
                讓 AI 成為
                <span className="bg-gradient-to-r from-[#4F7CFF] via-[#7C3AED] to-[#F4C542] bg-clip-text text-transparent">
                  {" "}
                  你的魔法棒
                </span>
              </h1>

              {/* 副標題 */}
              <p
                className="text-lg text-[#A1A1B5] max-w-[480px] mb-10 leading-relaxed opacity-0"
                style={{ animation: "heroFadeIn 0.4s ease-out 0.8s forwards" }}
              >
                專為熟齡族與 AI 新手設計的學習平台
                <br />
                從零開始，輕鬆掌握 AI 工具，開啟你的魔法之旅
              </p>

              {/* 按鈕 */}
              <div
                className="flex flex-col sm:flex-row gap-4 opacity-0"
                style={{ animation: "heroFadeIn 0.4s ease-out 1.2s forwards" }}
              >
                <Link
                  href="/courses"
                  className="inline-flex items-center justify-center rounded-lg bg-[#4F7CFF] text-white hover:bg-[#3B6CFF] text-base h-12 px-6 font-medium transition-colors gap-2"
                >
                  探索課程 <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  href="/auth/register"
                  className="inline-flex items-center justify-center rounded-lg border border-[#4F7CFF] text-[#4F7CFF] hover:bg-[#E8EEFF] text-base h-12 px-6 font-medium transition-colors"
                >
                  免費註冊
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 md:py-24 bg-surface">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                探索 AI 的無限可能
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto">
                從基礎到進階，我們陪你一步一步學習
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {features.map((f, i) => (
                <Card
                  key={i}
                  variant="glass"
                  className="border-0 text-center hover:shadow-lg transition-all hover:-translate-y-1"
                >
                  <CardContent className="p-6 md:p-8">
                    <div className="text-4xl mb-4">{f.icon}</div>
                    <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                    <p className="text-sm text-gray-500">{f.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Courses */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-end mb-10">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-2">熱門課程</h2>
                <p className="text-gray-500">精選最受歡迎的 AI 課程</p>
              </div>
              <Link href="/courses" className="hidden sm:inline-flex items-center justify-center rounded-lg hover:bg-muted h-8 px-2.5 text-sm font-medium transition-colors gap-1.5">
                  查看全部 <ArrowRight className="h-4 w-4" />
                </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredCourses.map((course, i) => (
                <Link key={i} href={`/courses/${course.slug}`}>
                  <Card variant="glass" className="border-0 overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 h-full">
                    <div className="aspect-video bg-gradient-to-br from-magic-blue/20 to-magic-purple/20 flex items-center justify-center">
                      <span className="text-4xl">🎯</span>
                    </div>
                    <CardContent className="p-5">
                      <Badge className="mb-3 bg-magic-blue/10 text-magic-blue border-magic-blue/20">
                        {course.category}
                      </Badge>
                      <h3 className="font-bold text-lg mb-2">{course.title}</h3>
                      <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                        {course.desc}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-magic-gold fill-magic-gold" />{" "}
                          {course.rating}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" /> {course.students}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" /> {course.duration}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            <div className="mt-8 text-center sm:hidden">
              <Link href="/courses" className="inline-flex items-center justify-center rounded-lg border border-border bg-background hover:bg-muted h-8 px-2.5 text-sm font-medium transition-colors gap-1.5">
                  查看全部課程 <ArrowRight className="h-4 w-4" />
                </Link>
            </div>
          </div>
        </section>

        {/* Gallery Preview */}
        <section className="py-16 md:py-24 bg-surface">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-end mb-10">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-2">
                  AI 魔法案例
                </h2>
                <p className="text-gray-500">看看 AI 可以創造出什麼樣的作品</p>
              </div>
              <Link href="/gallery" className="hidden sm:inline-flex items-center justify-center rounded-lg hover:bg-muted h-8 px-2.5 text-sm font-medium transition-colors gap-1.5">
                  瀏覽全部 <ArrowRight className="h-4 w-4" />
                </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {galleryPreviews.map((item, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-xl bg-gradient-to-br from-magic-blue/10 to-magic-purple/10 flex items-center justify-center hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer relative group overflow-hidden"
                >
                  <span className="text-5xl">✨</span>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="text-white text-sm font-medium">
                      {item.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Latest Posts */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-end mb-10">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-2">
                  最新教學文章
                </h2>
                <p className="text-gray-500">掌握最新的 AI 知識與技巧</p>
              </div>
              <Link href="/blog" className="hidden sm:inline-flex items-center justify-center rounded-lg hover:bg-muted h-8 px-2.5 text-sm font-medium transition-colors gap-1.5">
                  閱讀更多 <ArrowRight className="h-4 w-4" />
                </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {latestPosts.map((post, i) => (
                <Link key={i} href={`/blog/${post.slug}`}>
                  <Card variant="glass" className="border-0 overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 h-full">
                    <CardContent className="p-5">
                      <Badge className="mb-3 bg-magic-purple/10 text-magic-purple border-magic-purple/20">
                        {post.category}
                      </Badge>
                      <h3 className="font-bold text-lg mb-2">{post.title}</h3>
                      <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <span className="text-xs text-gray-400">{post.date}</span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="py-16 md:py-24 bg-surface">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-end mb-10">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-2">
                  近期講座
                </h2>
                <p className="text-gray-500">免費參加，線上線下都有</p>
              </div>
              <Link href="/events" className="hidden sm:inline-flex items-center justify-center rounded-lg hover:bg-muted h-8 px-2.5 text-sm font-medium transition-colors gap-1.5">
                  所有講座 <ArrowRight className="h-4 w-4" />
                </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingEvents.map((event, i) => (
                <Link key={i} href={`/events/${event.slug}`}>
                  <Card variant="glass" className="border-0 hover:shadow-lg transition-all hover:-translate-y-1">
                    <CardContent className="p-6 flex gap-4 items-center">
                      <div className="text-center min-w-[60px]">
                        <div className="text-2xl font-bold text-magic-blue">
                          {event.date.split("-")[2]}
                        </div>
                        <div className="text-sm text-gray-500">
                          {event.date.split("-")[1]}月
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold mb-1">{event.title}</h3>
                        <div className="flex items-center gap-3 text-sm text-gray-400">
                          <span>{event.time}</span>
                          <span>·</span>
                          <Badge variant="outline" className="text-xs">
                            {event.type}
                          </Badge>
                          <Badge className="bg-magic-gold/10 text-magic-gold border-magic-gold/20 text-xs">
                            {event.price}
                          </Badge>
                        </div>
                      </div>
                      <ArrowRight className="h-5 w-5 text-gray-300 hidden sm:block" />
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-magic-blue to-magic-purple">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              準備好開始你的 AI 魔法之旅了嗎？
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-lg mx-auto">
              免費加入，學習最新的 AI 技能，讓科技為你所用
            </p>
            <Link
              href="/auth/register"
              className="inline-flex items-center justify-center rounded-lg bg-white text-magic-blue hover:bg-white/90 text-base px-8 py-3 font-medium transition-colors gap-2"
            >
              免費註冊 <Sparkles className="h-5 w-5" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
