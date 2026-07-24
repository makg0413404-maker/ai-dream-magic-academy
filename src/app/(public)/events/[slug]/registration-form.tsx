"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

interface EventRegistrationFormProps {
  eventTitle: string;
}

export function EventRegistrationForm({ eventTitle }: EventRegistrationFormProps) {
  const [registered, setRegistered] = useState(false);

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
        <h3 className="font-bold text-lg mb-4">講座報名</h3>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setRegistered(true);
          }}
          className="space-y-4"
        >
          <div>
            <Label htmlFor="name">姓名 *</Label>
            <Input id="name" required placeholder="請輸入您的姓名" />
          </div>
          <div>
            <Label htmlFor="email">Email *</Label>
            <Input id="email" type="email" required placeholder="example@email.com" />
          </div>
          <div>
            <Label htmlFor="phone">手機號碼</Label>
            <Input id="phone" type="tel" placeholder="0912-345-678" />
          </div>
          <div>
            <Label htmlFor="note">備註</Label>
            <Textarea id="note" placeholder="有任何問題或需求嗎？" rows={3} />
          </div>

          <Button type="submit" className="w-full bg-magic-blue hover:bg-magic-blue/90">
            立即報名
          </Button>
          <p className="text-xs text-gray-400 text-center">
            報名成功後，我們會將詳細資訊寄到您的 Email
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
