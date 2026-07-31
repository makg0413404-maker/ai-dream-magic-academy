import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI 提示詞工具",
  description:
    "免費使用 AI 圓夢魔法學院的提示詞生成工具，選行業、選目標，立刻產生專屬魔法咒語。",
};

export default function PromptToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
