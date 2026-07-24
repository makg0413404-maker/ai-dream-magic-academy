import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "講座活動",
  description: "AI 圓夢魔法學院的免費講座與實體活動，歡迎報名參加。",
};

const events = [
  {
    date: "2025-08-05",
    time: "19:00 - 21:00",
    title: "AI 繪圖入門：Midjourney 快速上手",
    desc: "從零開始，2 小時帶你學會用 Midjourney 創造第一張 AI 圖片。",
    type: "線上",
    location: "Google Meet",
    price: "免費",
    slots: 50,
    registered: 23,
    slug: "midjourney-intro",
  },
  {
    date: "2025-08-12",
    time: "14:00 - 17:00",
    title: "ChatGPT 實戰工作坊",
    desc: "帶上你的電腦，一起實戰演練 ChatGPT 的各種應用場景。",
    type: "實體",
    location: "台北市大安區（報名後通知）",
    price: "免費",
    slots: 30,
    registered: 18,
    slug: "chatgpt-workshop",
  },
  {
    date: "2025-08-19",
    time: "19:00 - 20:30",
    title: "AI 時代的必備技能",
    desc: "認識 AI 時代最重要的 5 個技能，讓你不再焦慮被時代淘汰。",
    type: "線上",
    location: "Google Meet",
    price: "免費",
    slots: 100,
    registered: 45,
    slug: "ai-essential-skills",
  },
  {
    date: "2025-08-26",
    time: "10:00 - 12:00",
    title: "熟齡族 AI 輕鬆學講座",
    desc: "專為 45 歲以上朋友設計的 AI 入門講座，用最簡單的方式認識 AI。",
    type: "實體",
    location: "台北市松山區（報名後通知）",
    price: "免費",
    slots: 40,
    registered: 31,
    slug: "senior-ai-intro",
  },
];

export default function EventsPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">講座活動</h1>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            免費參加我們的 AI 講座與工作坊，線上線下都有
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
          {events.map((event, i) => (
            <Link key={i} href={`/events/${event.slug}`}>
              <Card className="glass border-0 hover:shadow-lg transition-all hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Date */}
                    <div className="text-center min-w-[80px]">
                      <div className="text-3xl font-bold text-magic-blue">
                        {event.date.split("-")[2]}
                      </div>
                      <div className="text-sm text-gray-500">
                        {event.date.split("-")[1]}月
                      </div>
                      <Badge variant="outline" className="mt-2 text-xs">
                        {event.type}
                      </Badge>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                      <p className="text-sm text-gray-500 mb-4">{event.desc}</p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" /> {event.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" /> {event.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" /> {event.registered}/{event.slots}
                        </span>
                        <Badge className="bg-magic-gold/10 text-magic-gold border-magic-gold/20">
                          {event.price}
                        </Badge>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="flex items-center">
                      <Button className="bg-magic-blue hover:bg-magic-blue/90 whitespace-nowrap">
                        報名參加
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
