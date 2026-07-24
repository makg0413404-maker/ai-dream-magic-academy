import Link from "next/link";
import { Sparkles, BookOpen, Calendar, Mail } from "lucide-react";

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
            <h3 className="font-bold mb-4 text-magic-gold">快速連結</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/courses" className="hover:text-magic-blue transition-colors flex items-center gap-2">
                  <BookOpen size={14} /> 課程介紹
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-magic-blue transition-colors flex items-center gap-2">
                  <Calendar size={14} /> 講座活動
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-magic-blue transition-colors flex items-center gap-2">
                  <Sparkles size={14} /> 教學文章
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-magic-blue transition-colors flex items-center gap-2">
                  <Sparkles size={14} /> 關於我們
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

        <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-gray-500">
          <p>© 2025 AI 圓夢魔法學院. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
