import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import RegisterForm from "./register-form";

export default function RegisterPage() {
  return (
    <Card variant="glass" className="border-0">
      <CardContent className="p-8">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl">
            ✦
          </Link>
          <h1 className="text-2xl font-bold mt-4">加入 AI 圓夢魔法學院</h1>
          <p className="text-base text-gray-500 mt-2">
            免費註冊，開始你的 AI 學習之旅
          </p>
        </div>

        <RegisterForm />
      </CardContent>
    </Card>
  );
}
