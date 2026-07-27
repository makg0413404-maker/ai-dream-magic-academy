"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, AlertCircle } from "lucide-react";
import { registerForEvent } from "@/app/actions";

interface EventRegistrationFormProps {
  eventSlug: string;
  eventTitle?: string;
  isFull: boolean;
  remaining: number;
}

export function EventRegistrationForm({
  eventSlug,
  isFull,
  remaining,
}: EventRegistrationFormProps) {
  const [registered, setRegistered] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  if (isFull) {
    return (
      <Card className="glass border-0 sticky top-24">
        <CardContent className="p-6 text-center">
          <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
          <h3 className="font-bold text-lg mb-2">目前已額滿</h3>
          <p className="text-sm text-gray-500 mb-4">
            感謝您的支持，此場活動報名人數已達上限。
          </p>
          <p className="text-sm text-gray-400">
            請關注我們的最新消息，未來還有更多精彩活動！
          </p>
        </CardContent>
      </Card>
    );
  }

  if (registered) {
    return (
      <div className="text-center py-8">
        <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
        <h3 className="font-bold text-lg mb-2">報名成功！</h3>
        <p className="text-sm text-gray-500">
          我們已收到您的報名資訊，講座連結將於活動前寄至您的 Email。
        </p>
      </div>
    );
  }

  return (
    <Card className="glass border-0 sticky top-24">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg">講座報名</h3>
          <span className="text-sm text-magic-blue font-medium">
            剩餘 {remaining} 名
          </span>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600 flex items-start gap-2">
            <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setError(null);
            setPending(true);

            const formData = new FormData(e.currentTarget);
            const result = await registerForEvent(eventSlug, formData);

            if (result.error) {
              setError(result.error);
              setPending(false);
            } else {
              setRegistered(true);
              setPending(false);
            }
          }}
          className="space-y-4"
        >
          <div>
            <Label htmlFor="name">姓名 *</Label>
            <Input id="name" name="name" required placeholder="請輸入您的姓名" />
          </div>
          <div>
            <Label htmlFor="email">Email *</Label>
            <Input id="email" name="email" type="email" required placeholder="example@email.com" />
          </div>
          <div>
            <Label htmlFor="phone">手機號碼</Label>
            <Input id="phone" name="phone" type="tel" placeholder="0912-345-678" />
          </div>
          <div>
            <Label htmlFor="note">備註</Label>
            <Textarea id="note" name="note" placeholder="有任何問題或需求嗎？" rows={3} />
          </div>

          <Button
            type="submit"
            disabled={pending}
            className="w-full bg-magic-blue hover:bg-magic-blue/90"
          >
            {pending ? "報名中..." : "立即報名"}
          </Button>
          <p className="text-xs text-gray-400 text-center">
            報名成功後，我們會將詳細資訊寄到您的 Email
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
