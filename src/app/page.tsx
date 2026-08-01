import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Image as ImageIcon, Video, Wand2, Sparkles } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const courses = [
  {
    icon: ImageIcon,
    title: "AI 圖片課程",
    desc: "跟著做，4 堂課畫出你的第一張 AI 圖。",
    category: "AI 圖片",
    slug: "/courses",
  },
  {
    icon: Video,
    title: "AI 影片課程",
    desc: "用手機也能做出一支屬於自己的影片。",
    category: "AI 影片",
    slug: "/courses",
  },
  {
    icon: Wand2,
    title: "AI 提示詞工具",
    desc: "不想學指令也沒關係，我們幫你準備好範本。",
    category: "提示詞工具",
    slug: "/prompt-tool",
  },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero V3 - 全屏大圖當頁首（圖是主角，文字極簡化、不遮圖） */}
        <section className="relative isolate min-h-screen overflow-hidden">
          {/* 全屏主視覺：fill + object-cover 填滿整個 Hero，無遮罩、不被覆蓋 */}
          <Image
            src="/images/hero_ceo_v1.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />

          {/* 極簡文字：僅品牌識別 + 單一 CTA，置於全屏圖的底部。
              文字自帶極淡玻璃底，圖面背景仍清晰可見，圖為頁首主角。 */}
          <div className="absolute inset-x-0 bottom-0">
            <div className="container mx-auto px-5 pb-8 sm:pb-10">
              <div className="inline-flex flex-col gap-3 sm:gap-4 rounded-2xl bg-[#1A1A2E]/25 px-5 py-4 sm:px-7 sm:py-5 backdrop-blur-sm">
                {/* 品牌識別 */}
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight drop-shadow">
                  AI 圓夢魔法學院
                </h1>
                {/* 主 Slogan */}
                <p className="text-base sm:text-lg font-semibold text-magic-gold drop-shadow">
                  讓 AI 成為你的魔法棒。
                </p>
                {/* CTA */}
                <div className="mt-1 flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/auth/register"
                    className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#4F7CFF] to-[#7C3AED] text-white text-base font-bold h-12 px-7 shadow-[0_8px_30px_rgba(124,58,237,0.45)] transition-all hover:opacity-90"
                  >
                    立即加入
                  </Link>
                  <Link
                    href="/courses"
                    className="inline-flex items-center justify-center rounded-full border-2 border-[#F4C542] text-[#F4C542] bg-white/5 text-sm font-semibold h-11 px-6 transition-all hover:bg-[#F4C542] hover:text-[#1A1A2E]"
                  >
                    看看課程 <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 課程亮點 - 三張卡片 */}
        <section className="py-16 md:py-24 bg-surface">
          <div className="container mx-auto px-5">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">課程亮點</h2>
              <p className="mt-3 text-lg text-gray-500 max-w-xl mx-auto">
                從圖片到影片，再到提示詞工具，陪你一步一步做出作品。
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {courses.map((course) => (
                <Link key={course.title} href={course.slug} className="group">
                  <div className="h-full overflow-hidden rounded-2xl border border-magic-blue/10 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-all hover:-translate-y-1 hover:shadow-lg">
                    {/* 純 CSS 漸層占位圖（本階段不生成新圖） */}
                    <div className="relative aspect-[16/10] flex items-center justify-center bg-gradient-to-br from-magic-blue/25 via-magic-purple/20 to-magic-gold/20">
                      <course.icon className="h-14 w-14 text-magic-purple drop-shadow" strokeWidth={1.5} />
                      <span className="absolute bottom-3 left-4 rounded-full bg-white/80 px-3 py-1 text-sm font-medium text-magic-purple">
                        {course.category}
                      </span>
                      {/* 角落品牌四角星 ✦ + 紫金光點（純 CSS，無新圖） */}
                      <span aria-hidden className="pointer-events-none absolute right-3 top-2 text-2xl leading-none text-magic-gold/50 select-none">✦</span>
                      <span aria-hidden className="pointer-events-none absolute right-10 top-1 h-10 w-10 rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.3),transparent_70%)] blur-md" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                      <p className="text-lg text-gray-500 leading-relaxed">{course.desc}</p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-base font-medium text-magic-blue group-hover:gap-2.5 transition-all">
                        了解更多 <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 會員價值 + Footer 前 CTA */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-magic-blue to-magic-purple">
          <div className="container mx-auto px-5 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              成為會員，課程、工具、活動一次擁有。
            </h2>
            <p className="mt-3 text-lg text-white/85 max-w-2xl mx-auto">
              學了就能用，隨時可以問。我們陪你走過每一步。
            </p>
            <p className="mt-6 text-xl md:text-2xl font-bold text-magic-gold">
              準備好了嗎？今天，就從第一步開始。
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/auth/register"
                className="inline-flex items-center justify-center rounded-full bg-white text-magic-blue text-lg font-semibold h-14 px-8 transition-all hover:bg-white/90 gap-2"
              >
                免費註冊 <Sparkles className="h-5 w-5" />
              </Link>
              <Link
                href="/courses"
                className="inline-flex items-center justify-center rounded-full border-2 border-white text-white text-lg font-semibold h-14 px-8 transition-all hover:bg-white/10"
              >
                看看課程 <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
