"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, MapPin, Phone, Send, CheckCircle, AlertCircle } from "lucide-react";
import Link from "next/link";
import { submitContact } from "@/app/actions";

export function ContactFormSection() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  if (sent) {
    return (
      <div className="max-w-lg mx-auto text-center py-8">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
        <h1 className="text-3xl font-bold mb-4">訊息已送出！</h1>
        <p className="text-gray-500 mb-8">感謝您的聯繫，我們會盡快回覆您。</p>
        <Link href="/" className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground hover:bg-primary/80 h-8 px-2.5 text-sm font-medium transition-colors">
          返回首頁
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
      <Card className="glass border-0">
        <CardContent className="p-6">
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
              const result = await submitContact(formData);

              if (result.error) {
                setError(result.error);
                setPending(false);
              } else {
                setSent(true);
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
              <Label htmlFor="phone">電話</Label>
              <Input id="phone" name="phone" type="tel" placeholder="0912-345-678" />
            </div>
            <div>
              <Label htmlFor="subject">主旨</Label>
              <Input id="subject" name="subject" placeholder="我想詢問..." />
            </div>
            <div>
              <Label htmlFor="message">訊息 *</Label>
              <Textarea id="message" name="message" required placeholder="請輸入您的訊息..." rows={5} />
            </div>
            <Button
              type="submit"
              disabled={pending}
              className="w-full bg-magic-blue hover:bg-magic-blue/90"
            >
              <Send className="mr-2 h-4 w-4" />
              {pending ? "送出中..." : "送出訊息"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card className="glass border-0">
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-magic-blue/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-5 w-5 text-magic-blue" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Email</h3>
                  <p className="text-sm text-gray-500">contact@ai-dream-magic.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-magic-purple/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="h-5 w-5 text-magic-purple" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">電話</h3>
                  <p className="text-sm text-gray-500">02-XXXX-XXXX</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-magic-gold/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-5 w-5 text-magic-gold" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">地址</h3>
                  <p className="text-sm text-gray-500">台北市大安區（服務預約制）</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-0 bg-gradient-to-br from-magic-blue/5 to-magic-purple/5">
          <CardContent className="p-6">
            <h3 className="font-bold mb-2">營業時間</h3>
            <div className="space-y-1 text-sm text-gray-500">
              <p>週一至週五：10:00 - 18:00</p>
              <p>週六：預約制</p>
              <p>週日：休息</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
