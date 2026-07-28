"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { signUp } from "@/app/actions/auth";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("請輸入姓名");
      return;
    }
    if (!email.trim()) {
      setError("請輸入 Email");
      return;
    }
    if (password.length < 6) {
      setError("密碼至少需要 6 個字元");
      return;
    }
    if (password !== confirm) {
      setError("兩次輸入的密碼不一致");
      return;
    }

    setLoading(true);
    try {
      const fd = new FormData();
      fd.set("name", name.trim());
      fd.set("email", email.trim());
      fd.set("password", password);
      const res = await signUp(fd);
      if (res?.error) {
        // 重複 Email 的常見錯誤訊息（英文 → 中文友善提示）
        const msg = res.error.toLowerCase();
        if (
          msg.includes("already") ||
          msg.includes("registered") ||
          msg.includes("exists") ||
          msg.includes("user")
        ) {
          setError("這個 Email 已經註冊過了");
        } else {
          setError("系統目前忙碌，請稍後再試");
        }
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
        <Label htmlFor="name" className="text-lg">
          姓名
        </Label>
        <Input
          id="name"
          type="text"
          autoComplete="name"
          placeholder="請輸入您的姓名"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-2 h-12 text-lg"
          disabled={loading}
        />
      </div>

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
        <Label htmlFor="password" className="text-lg">
          密碼
        </Label>
        <div className="relative mt-2">
          <Input
            id="password"
            type={showPw ? "text" : "password"}
            autoComplete="new-password"
            placeholder="至少 6 個字元"
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

      <div>
        <Label htmlFor="confirm-password" className="text-lg">
          確認密碼
        </Label>
        <Input
          id="confirm-password"
          type={showPw ? "text" : "password"}
          autoComplete="new-password"
          placeholder="再次輸入密碼"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="mt-2 h-12 text-lg"
          disabled={loading}
        />
      </div>

      <label className="flex items-start gap-2 text-base text-gray-600">
        <input
          type="checkbox"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
          disabled={loading}
          className="mt-1 h-5 w-5 accent-magic-blue"
        />
        <span>
          我已閱讀並同意
          <Link href="/terms" className="text-magic-blue hover:underline">
            服務條款
          </Link>
          與
          <Link href="/privacy" className="text-magic-blue hover:underline">
            隱私政策
          </Link>
        </span>
      </label>

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
        {loading ? "建立帳號中…" : "建立帳號"}
      </button>

      <p className="text-center text-base text-gray-500">
        已經有帳號了？{" "}
        <Link
          href="/auth/login"
          className="text-magic-blue hover:underline font-medium"
        >
          登入
        </Link>
      </p>
    </form>
  );
}
