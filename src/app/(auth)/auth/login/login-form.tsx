"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { signIn } from "@/app/actions/auth";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("請先輸入 Email");
      return;
    }
    if (!password) {
      setError("請輸入密碼");
      return;
    }

    setLoading(true);
    try {
      const fd = new FormData();
      fd.set("email", email.trim());
      fd.set("password", password);
      const res = await signIn(fd);
      if (res?.error) {
        setError("Email 或密碼不正確");
        return;
      }
      router.push("/member");
      router.refresh();
    } catch {
      setError("系統目前忙碌，請稍後再試");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div>
        <Label htmlFor="email" className="text-lg">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="example@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-2 h-12 text-lg"
          disabled={loading}
        />
      </div>

      <div>
        <div className="flex justify-between items-center">
          <Label htmlFor="password" className="text-lg">
            密碼
          </Label>
          <Link
            href="/auth/forgot-password"
            className="text-base text-magic-blue hover:underline"
          >
            忘記密碼？
          </Link>
        </div>
        <div className="relative mt-2">
          <Input
            id="password"
            type={showPw ? "text" : "password"}
            autoComplete="current-password"
            placeholder="請輸入密碼"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-12 text-lg pr-12"
            disabled={loading}
          />
          <button
            type="button"
            onClick={() => setShowPw((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-magic-blue"
            aria-label={showPw ? "隱藏密碼" : "顯示密碼"}
            tabIndex={-1}
          >
            {showPw ? <EyeOff size={22} /> : <Eye size={22} />}
          </button>
        </div>
      </div>

      {error && (
        <p
          role="alert"
          className="rounded-lg bg-red-50 px-4 py-3 text-base text-red-600"
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="inline-flex w-full h-12 items-center justify-center gap-2 rounded-lg bg-magic-blue text-lg font-medium text-white transition-colors hover:bg-magic-blue/90 disabled:opacity-60"
      >
        {loading && <Loader2 size={20} className="animate-spin" />}
        {loading ? "登入中…" : "登入"}
      </button>

      <p className="text-center text-base text-gray-500">
        還沒有帳號？{" "}
        <Link
          href="/auth/register"
          className="text-magic-blue hover:underline font-medium"
        >
          免費註冊
        </Link>
      </p>
    </form>
  );
}
