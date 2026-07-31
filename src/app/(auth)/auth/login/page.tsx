import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { getSession } from "@/app/actions/auth";
import LoginForm from "./login-form";

export const metadata: Metadata = {
  title: "登入",
  description: "登入 AI 圓夢魔法學院帳號，繼續你的 AI 學習之旅。",
};

export default async function LoginPage() {
  // 已登入者進入此頁自動導向會員中心
  const session = await getSession();
  if (session) {
    redirect("/member");
  }

  return (
    <Card variant="glass" className="border-0">
      <CardContent className="p-8">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl">
            ✦
          </Link>
          <h1 className="text-2xl font-bold mt-4">歡迎回來</h1>
          <p className="text-base text-gray-500 mt-2">
            登入你的 AI 圓夢魔法學院帳號
          </p>
        </div>

        <LoginForm />
      </CardContent>
    </Card>
  );
}
