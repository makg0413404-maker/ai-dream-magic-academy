import Link from "next/link";
import { redirect } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { signOut, getSession, getProfile } from "@/app/actions/auth";

export default async function MemberDashboardPage() {
  const session = await getSession();
  if (!session) {
    redirect("/auth/login?redirect=/member");
  }

  const profile = await getProfile();
  const displayName =
    (profile && (profile.display_name as string)) || session.user.email || "會員";

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto w-full max-w-md">
        <Card variant="glass" className="border-0">
          <CardContent className="p-8 text-center">
            <div className="text-4xl mb-4">✨</div>
            <h1 className="text-2xl font-bold mb-2">會員中心</h1>
            <p className="text-base text-gray-500 mb-6">
              歡迎回來，{displayName}
            </p>
            <p className="text-sm text-gray-500 mb-6">
              這裡是您的專屬會員頁面，更多功能即將在後續版本開放。
            </p>
            <div className="flex flex-col gap-3">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-lg bg-magic-blue text-white hover:bg-magic-blue/90 h-12 px-5 text-base font-medium transition-colors"
              >
                返回首頁
              </Link>
              <form
                action={async () => {
                  "use server";
                  await signOut();
                  redirect("/");
                }}
              >
                <Button
                  type="submit"
                  variant="outline"
                  className="w-full h-12 text-base"
                >
                  登出
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
