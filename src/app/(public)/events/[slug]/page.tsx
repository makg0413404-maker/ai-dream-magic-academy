import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, ArrowLeft } from "lucide-react";
import { EventRegistrationForm } from "./registration-form";
import { getEventInfo } from "@/app/actions";

const events = {
  "midjourney-intro": {
    title: "AI 繪圖入門：Midjourney 快速上手",
    desc: "從零開始，2 小時帶你學會用 Midjourney 創造第一張 AI 圖片。",
    date: "2025-08-05",
    time: "19:00 - 21:00",
    type: "線上",
    location: "Google Meet（連結將於報名後提供）",
    price: "免費",
    detail: `本次講座適合完全沒有經驗的 AI 新手。

講座內容：
• 什麼是 AI 繪圖？
• Midjourney 基本操作教學
• 如何寫出好用的提示詞
• 現場實戰：創造你的第一張 AI 圖片
• Q&A 時間

參加者需準備：
• 一個 Discord 帳號（免費註冊）
• 一顆好奇的心 ❤️`,
  },
  "chatgpt-workshop": {
    title: "ChatGPT 實戰工作坊",
    desc: "帶上你的電腦，一起實戰演練 ChatGPT 的各種應用場景。",
    date: "2025-08-12",
    time: "14:00 - 17:00",
    type: "實體",
    location: "台北市大安區（報名後通知詳細地址）",
    price: "免費",
    detail: `這是一場實體工作坊，限額 30 人。

工作坊內容：
• ChatGPT 基本操作複習
• 實用提示詞演練
• 分組實戰：解決日常問題
• 成果分享與講師回饋

參加者需準備：
• 筆記型電腦或平板
• 一個 ChatGPT 帳號（免費版即可）`,
  },
  "ai-essential-skills": {
    title: "AI 時代的必備技能",
    desc: "認識 AI 時代最重要的 5 個技能，讓你不再焦慮被時代淘汰。",
    date: "2025-08-19",
    time: "19:00 - 20:30",
    type: "線上",
    location: "Google Meet（連結將於報名後提供）",
    price: "免費",
    detail: `在這個 AI 快速發展的時代，掌握關鍵技能變得前所未有的重要。

講座內容：
• AI 時代的 5 大必備技能
• 如何選擇適合你的 AI 工具
• 學習 AI 的正確心態與方法
• 現場示範與 Q&A`,
  },
  "senior-ai-intro": {
    title: "熟齡族 AI 輕鬆學講座",
    desc: "專為 45 歲以上朋友設計的 AI 入門講座。",
    date: "2025-08-26",
    time: "10:00 - 12:00",
    type: "實體",
    location: "台北市松山區（報名後通知詳細地址）",
    price: "免費",
    detail: `專為熟齡族設計的 AI 入門講座。

講座內容：
• AI 是什麼？用生活化的方式告訴你
• 手機就能用的 AI 工具介紹
• AI 如何幫助日常生活
• 現場一對一教學
• 課後茶敘交流

✨ 本講座特別適合：
• 對 AI 有興趣但不知如何開始的朋友
• 擔心 AI 太複雜不敢嘗試的您
• 想知道 AI 能為生活帶來什麼改變的您`,
  },
};

export async function generateStaticParams() {
  return Object.keys(events).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const slug = (await params).slug;
  const event = events[slug as keyof typeof events];
  if (!event) return { title: "講座未找到" };
  return {
    title: event.title,
    description: event.desc,
  };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const event = events[slug as keyof typeof events];

  if (!event) {
    return (
      <div className="py-24 text-center">
        <h1 className="text-2xl font-bold mb-4">講座未找到</h1>
        <Link href="/events" className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground hover:bg-primary/80 h-8 px-2.5 text-sm font-medium transition-colors">
          返回講座列表
        </Link>
      </div>
    );
  }

  // Fetch live event info from Supabase
  const eventInfo = await getEventInfo(slug);
  const maxSlots = eventInfo?.max ?? 50;
  const registeredCount = eventInfo?.registered ?? 0;
  const remaining = eventInfo?.remaining ?? 0;
  const isFull = remaining <= 0;
  const deadline = eventInfo?.deadline;
  const isPastDeadline = deadline ? new Date(deadline) < new Date() : false;

  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-3xl">
        <Link
          href="/events"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-magic-blue mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> 返回講座列表
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Event Info */}
          <div className="md:col-span-3">
            <Badge className="mb-4 bg-magic-blue/10 text-magic-blue border-magic-blue/20">
              {event.type}
            </Badge>
            <h1 className="text-3xl font-bold mb-4">{event.title}</h1>

            <div className="space-y-3 mb-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{event.date} · {event.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>
                  {registeredCount}/{maxSlots} 人已報名
                  {isFull ? (
                    <Badge className="ml-2 bg-red-100 text-red-600 border-red-200 text-xs">
                      額滿
                    </Badge>
                  ) : (
                    <span className="ml-2 text-magic-blue font-medium">
                      · 剩餘 {remaining} 名
                    </span>
                  )}
                </span>
              </div>
            </div>

            <div className="max-w-none">
              {event.detail.split("\n").map((line, i) => (
                <p key={i} className="text-gray-600 mb-2">{line}</p>
              ))}
            </div>
          </div>

          {/* Registration Form - Client Component */}
          <div className="md:col-span-2">
            <EventRegistrationForm
              eventSlug={slug}
              eventTitle={event.title}
              isFull={isFull || isPastDeadline}
              remaining={remaining}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
