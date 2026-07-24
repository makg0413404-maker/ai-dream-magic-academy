"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "首頁" },
  { href: "/courses", label: "課程介紹" },
  { href: "/events", label: "講座活動" },
  { href: "/blog", label: "教學文章" },
  { href: "/about", label: "關於我們" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-magic-blue/10 bg-white/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">✦</span>
          <span className="text-xl font-bold bg-gradient-to-r from-magic-blue to-magic-purple bg-clip-text text-transparent">
            AI 圓夢魔法學院
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/70 hover:text-magic-blue transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/auth/login"
            className="inline-flex items-center justify-center rounded-lg bg-magic-blue text-white hover:bg-magic-blue/90 h-8 px-2.5 text-sm font-medium transition-colors"
          >
            登入 / 註冊
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="選單"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "md:hidden border-t border-magic-blue/10 bg-white overflow-hidden transition-all duration-300",
          mobileOpen ? "max-h-96" : "max-h-0"
        )}
      >
        <nav className="flex flex-col p-4 gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium py-2 px-3 rounded-lg hover:bg-magic-blue-50 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/auth/login"
            className="inline-flex items-center justify-center rounded-lg bg-magic-blue text-white hover:bg-magic-blue/90 h-8 px-2.5 text-sm font-medium transition-colors w-full text-center"
          >
            登入 / 註冊
          </Link>
        </nav>
      </div>
    </header>
  );
}
