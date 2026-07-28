"use client";

import { useState } from "react";
import Link from "next/link";
import { Loader2, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { resetPassword } from "@/app/actions/auth";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("請輸入 Email");
      return;
    }

    setLoading(true);
    try {
      const fd = new FormData();
      fd.set("email", email.trim());
      const res = await resetPassword(fd);
      if (res?.error) {
        // 不揭露帳號是否存在：統一顯示成功訊息
        setSent(true);
        return;
      }
      setSent(true);
    } catch {
      setError("系統目前忙碌，請稍後再試");
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-50">
          <CheckCircle2 size={32} className="text-green-600" />
        </div>
        <p className="text-base text-gray-600">
          如果這個 Email 已註冊，我們會寄出密碼重設信件，請查看信箱。
        </p>
        <Link
          href="/auth/login"
          className="mt-6 inline-flex items-center justify-center rounded-lg bg-magic-blue text-white hover:bg-magic-blue/90 h-12 px-5 text-base font-medium transition-colors"
        >
          返回登入頁
        </Link>
      </div>
    );
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
        {loading ? "寄送中…" : "寄送重設連結"}
      </button>

      <p className="text-center text-base text-gray-500">
        <Link
          href="/auth/login"
          className="text-magic-blue hover:underline font-medium"
        >
          返回登入頁
        </Link>
      </p>
    </form>
  );
}
