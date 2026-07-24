import type { Metadata } from "next";
import { Inter, Noto_Sans_TC } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const notoSansTC = Noto_Sans_TC({
  subsets: ["latin"],
  variable: "--font-noto-sans",
  weight: ["400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "AI 圓夢魔法學院 | 讓 AI 成為你的魔法棒",
    template: "%s | AI 圓夢魔法學院",
  },
  description:
    "專為 AI 新手、熟齡族與壯世代打造的 AI 學習平台。從零開始，輕鬆上手 ChatGPT、Midjourney 等 AI 工具。",
  openGraph: {
    title: "AI 圓夢魔法學院",
    description: "讓 AI 成為你的魔法棒 — 專為熟齡族設計的 AI 學習平台",
    siteName: "AI 圓夢魔法學院",
    locale: "zh_TW",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body
        className={`${inter.variable} ${notoSansTC.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
