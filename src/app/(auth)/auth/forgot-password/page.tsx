import { Card, CardContent } from "@/components/ui/card";
import ForgotPasswordForm from "./forgot-password-form";

export default function ForgotPasswordPage() {
  return (
    <Card variant="glass" className="border-0">
      <CardContent className="p-8">
        <div className="text-center mb-8">
          <div className="text-4xl mb-4">🔮</div>
          <h1 className="text-2xl font-bold">忘記密碼</h1>
          <p className="text-base text-gray-500 mt-2">
            請輸入您的 Email，我們會寄送重設密碼連結給您。
          </p>
        </div>

        <ForgotPasswordForm />
      </CardContent>
    </Card>
  );
}
