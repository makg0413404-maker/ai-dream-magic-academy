"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Menu, X, LogOut, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { signOut } from "@/app/actions/auth";

const navLinks = [
  { href: "/", label: "首頁" },
  { href: "/courses", label: "課程" },
  { href: "/prompt-tool", label: "提示詞工具" },
  { href: "/gallery", label: "魔法廣場" },
  { href: "/about", label: "關於" },
  { href: "/member", label: "會員" },
];

export default function NavbarClient({
  isLoggedIn,
  userName,
}: {
  isLoggedIn: boolean;
  userName?: string;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  async function handleLogout() {
    await signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-magic-blue/10 bg-white/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2" aria-label="AI 圓夢魔法學院 首頁">
          <Image
            src="/images/brand-batch2/logo-portal-icon.png"
            alt="AI 圓夢魔法學院"
            width={40}
            height={40}
            className="h-10 w-10"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/70 hover:text-magic-blue transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-3">
          {isLoggedIn ? (
            <>
              <Link
                href="/member"
                className="inline-flex items-center gap-1.5 rounded-lg bg-magic-blue text-white hover:bg-magic-blue/90 h-9 px-3 text-sm font-medium transition-colors"
              >
                <User size={16} />
                {userName ? `會員中心（${userName}）` : "會員中心"}
              </Link>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 rounded-lg border border-magic-blue text-magic-blue bg-transparent hover:bg-magic-blue-50 h-9 px-3 text-sm font-medium transition-colors"
              >
                <LogOut size={16} />
                登出
              </button>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="inline-flex items-center justify-center rounded-lg border border-magic-blue text-magic-blue bg-transparent hover:bg-magic-blue-50 h-9 px-3 text-sm font-medium transition-colors"
              >
                登入
              </Link>
              <Link
                href="/auth/register"
                className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-[#4F7CFF] to-[#7C3AED] text-white hover:opacity-90 h-9 px-4 text-sm font-semibold transition-all"
              >
                立即加入
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="選單"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "lg:hidden border-t border-magic-blue/10 bg-white overflow-hidden transition-all duration-300",
          mobileOpen ? "max-h-[32rem]" : "max-h-0"
        )}
      >
        <nav className="flex flex-col p-4 gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-base font-medium py-2 px-3 rounded-lg hover:bg-magic-blue-50 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="h-px bg-magic-blue/10 my-1" />
          {isLoggedIn ? (
            <>
              <Link
                href="/member"
                className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-magic-blue text-white hover:bg-magic-blue/90 h-11 px-3 text-base font-medium transition-colors w-full text-center"
                onClick={() => setMobileOpen(false)}
              >
                <User size={18} />
                會員中心
              </Link>
              <button
                onClick={() => {
                  setMobileOpen(false);
                  handleLogout();
                }}
                className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-magic-blue text-magic-blue bg-transparent hover:bg-magic-blue-50 h-11 px-3 text-base font-medium transition-colors w-full text-center"
              >
                <LogOut size={18} />
                登出
              </button>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="inline-flex items-center justify-center rounded-lg border border-magic-blue text-magic-blue bg-transparent hover:bg-magic-blue-50 h-11 px-3 text-base font-medium transition-colors w-full text-center"
                onClick={() => setMobileOpen(false)}
              >
                登入
              </Link>
              <Link
                href="/auth/register"
                className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-[#4F7CFF] to-[#7C3AED] text-white hover:opacity-90 h-11 px-3 text-base font-semibold transition-all w-full text-center"
                onClick={() => setMobileOpen(false)}
              >
                立即加入
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
