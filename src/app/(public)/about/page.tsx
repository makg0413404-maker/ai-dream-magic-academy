import type { Metadata } from "next";
import { Sparkles, Heart, Shield, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "關於我們",
  description: "了解 AI 圓夢魔法學院的使命、故事與理念",
};

const values = [
  {
    icon: <Heart className="h-8 w-8 text-magic-blue" />,
    title: "溫暖陪伴",
    desc: "我們相信學習 AI 不該有壓力，每一步都有我們陪你。",
  },
  {
    icon: <Sparkles className="h-8 w-8 text-magic-purple" />,
    title: "簡單上手",
    desc: "複雜的技術用簡單的方式教，讓每個人都能輕鬆學會。",
  },
  {
    icon: <Shield className="h-8 w-8 text-magic-blue" />,
    title: "熟齡友善",
    desc: "專為熟齡族設計的課程節奏與內容，大字體、慢步調。",
  },
  {
    icon: <Star className="h-8 w-8 text-magic-gold" />,
    title: "實用至上",
    desc: "不談空泛理論，只教日常生活中真正用得上的 AI 技能。",
  },
];

export default function AboutPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            關於
            <span className="bg-gradient-to-r from-magic-blue to-magic-purple bg-clip-text text-transparent">
              {" "}
              AI 圓夢魔法學院
            </span>
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed">
            我們相信 AI 不應該是年輕人的專利。
            <br />
            每一位熟齡朋友，都值得擁有學習 AI 的機會與勇氣。
          </p>
        </div>

        {/* Story */}
        <div className="glass rounded-2xl p-8 md:p-12 mb-16 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">我們的故事</h2>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              AI 圓夢魔法學院誕生於一個簡單的念頭：
              <strong>「為什麼 AI 課程都這麼難懂？」</strong>
            </p>
            <p>
              我們發現市場上的 AI 教學要麼太技術導向，要麼太年輕化，很少真正為
              45 歲以上的朋友設計。於是我們決定創辦一個不一樣的學習平台。
            </p>
            <p>
              在這裡，沒有艱澀的程式碼，沒有聽不懂的術語。我們用最簡單的方式，
              搭配魔法般有趣的教學風格，讓每一位學員都能自信地說：
              <strong>「我也會用 AI 了！」</strong>
            </p>
          </div>
        </div>

        {/* Values */}
        <h2 className="text-3xl font-bold text-center mb-10">我們的理念</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16">
          {values.map((v, i) => (
            <div
              key={i}
              className="glass rounded-xl p-6 text-center hover:shadow-lg transition-all"
            >
              <div className="flex justify-center mb-4">{v.icon}</div>
              <h3 className="font-bold text-lg mb-2">{v.title}</h3>
              <p className="text-sm text-gray-500">{v.desc}</p>
            </div>
          ))}
        </div>

        {/* Team placeholder */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">教學團隊</h2>
          <p className="text-gray-500 mb-8">來自各領域的 AI 專家與教育者</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-magic-blue/20 to-magic-purple/20 mx-auto mb-4 flex items-center justify-center text-3xl">
                  👨‍🏫
                </div>
                <h3 className="font-bold">講師 {i}</h3>
                <p className="text-sm text-gray-400">AI 教育專家</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
