import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export default function ForgotPasswordPage() {
  return (
    <Card variant="glass" className="border-0">
      <CardContent className="p-8 text-center">
        <div className="text-4xl mb-4">🔮</div>
        <h1 className="text-2xl font-bold mb-2">忘記密碼</h1>
        <p className="text-base text-gray-500 mb-6">
          此功能即將開放，敬請期待。
        </p>
        <Link
          href="/auth/login"
          className="inline-flex items-center justify-center rounded-lg bg-[#4F7CFF] text-white hover:bg-[#3B6CFF] text-base h-11 px-5 font-medium transition-colors"
        >
          返回登入頁
        </Link>
      </CardContent>
    </Card>
  );
}
