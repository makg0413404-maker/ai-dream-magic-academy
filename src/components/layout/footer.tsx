import Link from "next/link";
import { Sparkles, BookOpen, Video, Wand2, User, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-surface-dark text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">✦</span>
              <span className="text-lg font-bold bg-gradient-to-r from-magic-blue to-magic-purple bg-clip-text text-transparent">
                AI 圓夢魔法學院
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              讓 AI 成為你的魔法棒。
              <br />
              專為 AI 新手、熟齡族與壯世代打造的 AI 學習平台。
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4 text-magic-gold">導覽</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/" className="hover:text-magic-blue transition-colors flex items-center gap-2">
                  <BookOpen size={14} /> 首頁
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-magic-blue transition-colors flex items-center gap-2">
                  <Sparkles size={14} /> 關於我們
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-magic-blue transition-colors flex items-center gap-2">
                  <BookOpen size={14} /> AI 圖片課程
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-magic-blue transition-colors flex items-center gap-2">
                  <Video size={14} /> AI 影片課程
                </Link>
              </li>
              <li>
                <Link href="/prompt-tool" className="hover:text-magic-blue transition-colors flex items-center gap-2">
                  <Wand2 size={14} /> 提示詞工具
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-magic-blue transition-colors flex items-center gap-2">
                  <Sparkles size={14} /> 魔法廣場
                </Link>
              </li>
              <li>
                <Link href="/member" className="hover:text-magic-blue transition-colors flex items-center gap-2">
                  <User size={14} /> 會員方案
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-magic-blue transition-colors flex items-center gap-2">
                  <Mail size={14} /> 聯絡我們
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold mb-4 text-magic-gold">聯絡我們</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <Mail size={14} /> contact@ai-dream-magic.com
              </li>
              <li>
                <Link href="/contact" className="hover:text-magic-blue transition-colors">
                  填寫聯絡表單 →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-8 text-center text-base font-medium text-magic-gold/90">
          讓 AI 成為你的魔法棒，陪你踏出 AI 的第一步。
        </p>

        <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-gray-500">
          <p>© 2026 AI 圓夢魔法學院．保留所有權利。</p>
        </div>
      </div>
    </footer>
  );
}
