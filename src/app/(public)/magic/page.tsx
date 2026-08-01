"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Check, Copy, Lock, Heart, Wand2, Sparkles, Video, Image as ImageIcon } from "lucide-react";
import library, { type Spell } from "@/data/magic-spell-library";

/* ============================================================
 * /magic 魔法咒語庫 — 電子書 × 官網整合（第一階段）
 * 15 個免費體驗咒語，一鍵複製，熟齡友善（≥18px）
 * ============================================================ */

type SectionKey = "free" | "imageMember" | "videoMember" | "favorites" | "new";

const SECTIONS: { key: SectionKey; label: string; icon: string }[] = [
  { key: "free", label: "免費體驗", icon: "✨" },
  { key: "imageMember", label: "圖片會員", icon: "🖼️" },
  { key: "videoMember", label: "影片會員", icon: "🎬" },
  { key: "favorites", label: "我的收藏", icon: "❤️" },
  { key: "new", label: "最新新增", icon: "🆕" },
];

export default function MagicSpellLibraryPage() {
  const [activeSection, setActiveSection] = useState<SectionKey>("free");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const spells = useMemo<Spell[]>(() => library.spells, []);

  /** 一鍵複製：Clipboard API + execCommand 備援 */
  async function handleCopy(text: string, id: string) {
    let ok = false;
    try {
      await navigator.clipboard.writeText(text);
      ok = true;
    } catch {
      try {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
        ok = true;
      } catch {
        ok = false;
      }
    }
    if (ok) {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  }

  const newest = spells.filter((s) => s.isNew);
  const uploadSpells = spells.filter((s) => s.needs_upload);

  return (
    <div className="py-10 md:py-14">
      <div className="container mx-auto max-w-6xl px-4">
        {/* ===== 頁首 ===== */}
        <header className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#4F7CFF]/10 to-[#7C3AED]/10 px-4 py-1.5 text-lg font-medium text-[#4F7CFF]">
            <Sparkles className="size-5" />
            魔法治咒語庫 ✦ 免費 15 則
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-[#1E1E2E] md:text-5xl">
            魔法咒語庫
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-lg leading-relaxed text-[#6B6B80] md:text-xl">
            {library.brand.slogan}。不用會寫英文，挑一個咒語，複製、貼上、按送出，
            一張美圖就出來了 ✦
          </p>
          <p className="mx-auto mt-2 max-w-2xl text-base text-[#9CA3AF]">
            以下 15 個魔法咒語全部免費體驗，歡迎先玩玩看！
          </p>
        </header>

        {/* ===== 區塊入口 ===== */}
        <nav
          aria-label="咒語庫區塊"
          className="sticky top-16 z-40 mb-8 grid grid-cols-2 gap-2 sm:grid-cols-5"
        >
          {SECTIONS.map((sec) => {
            const active = sec.key === activeSection;
            return (
              <button
                key={sec.key}
                type="button"
                onClick={() => setActiveSection(sec.key)}
                aria-pressed={active}
                className={[
                  "flex items-center justify-center gap-2 rounded-xl border-2 px-3 py-3 text-lg font-semibold transition-all",
                  active
                    ? "border-[#7C3AED] bg-gradient-to-br from-[#4F7CFF]/10 to-[#7C3AED]/10 text-[#4F7CFF] shadow-md"
                    : "border-[#E4E4ED] bg-white text-[#1E1E2E] hover:border-[#4F7CFF]/40",
                ].join(" ")}
              >
                <span className="text-xl">{sec.icon}</span>
                <span>{sec.label}</span>
              </button>
            );
          })}
        </nav>

        {/* ===== 免費體驗 ===== */}
        {activeSection === "free" && (
          <section id="free">
            <div className="mb-6 flex items-center gap-2">
              <Wand2 className="size-6 text-[#7C3AED]" />
              <h2 className="text-2xl font-bold text-[#1E1E2E] md:text-3xl">
                免費體驗 · 15 個魔法咒語
              </h2>
            </div>
            <p className="mb-8 max-w-3xl text-lg leading-relaxed text-[#6B6B80]">
              點「複製咒語」，貼到 ChatGPT、Gemini 或即夢就能用。想改哪裡，參考下方「使用說明」與「延伸玩法」。
            </p>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {spells.map((s) => (
                <SpellCard
                  key={s.id}
                  spell={s}
                  copied={copiedId === s.id}
                  onCopy={() => handleCopy(s.spell, s.id)}
                />
              ))}
            </div>
          </section>
        )}

        {/* ===== 圖片會員導流 ===== */}
        {activeSection === "imageMember" && (
          <MemberGate
            icon={<ImageIcon className="size-8" />}
            title="圖片會員"
            desc="解鎖更多進階圖片咒語。"
            points={[
              "超過 100 則專業圖庫咒語",
              "每週更新最新 AI 繪圖技法",
              "可上傳照片的進階咒語完整版",
              "專業講師線上教學影片",
            ]}
            freeNote={`免費區已可體驗 ${spells.length} 則，包含動物、風景、美食、通訊圖等，先從免費的開始！`}
          />
        )}

        {/* ===== 影片會員導流 ===== */}
        {activeSection === "videoMember" && (
          <MemberGate
            icon={<Video className="size-8" />}
            title="影片會員"
            desc="解鎖 AI 影片咒語與分身影片腳本。"
            points={[
              "AI 分身影片腳本模板",
              "即夢、豆包影片咒語全集",
              "影片分鏡與口播教學",
              "社群平台適用格式全攻略",
            ]}
            freeNote="若想先試試文字生成式的咒語，免費區的圖片咒語也能帶你體驗 AI 的威力！"
          />
        )}

        {/* ===== 我的收藏（預留） ===== */}
        {activeSection === "favorites" && (
          <div className="mx-auto max-w-2xl rounded-3xl border-2 border-dashed border-[#E4E4ED] bg-white p-8 text-center md:p-12">
            <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#4F7CFF]/10 to-[#7C3AED]/10">
              <Heart className="size-8 text-[#7C3AED]" />
            </div>
            <h2 className="text-2xl font-bold text-[#1E1E2E] md:text-3xl">我的收藏</h2>
            <p className="mx-auto mt-3 max-w-md text-lg leading-relaxed text-[#6B6B80]">
              登入會員後，可以把喜歡的咒語收藏起來，方便隨時取用 ✦
            </p>
            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link href="/auth/login">
                <button className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-[#4F7CFF] to-[#7C3AED] px-8 text-lg font-bold text-white shadow-lg transition hover:opacity-90">
                  會員登入
                </button>
              </Link>
              <Link href="/auth/register">
                <button className="inline-flex h-12 items-center justify-center rounded-full border-2 border-[#4F7CFF] px-8 text-lg font-bold text-[#4F7CFF] transition hover:bg-[#E8EEFF]">
                  立即註冊
                </button>
              </Link>
            </div>
            <p className="mt-4 text-base text-[#9CA3AF]">收藏功能上線中，敬請期待。</p>
          </div>
        )}

        {/* ===== 最新新增 ===== */}
        {activeSection === "new" && (
          <section id="new">
            <div className="mb-6 flex items-center gap-2">
              <Sparkles className="size-6 text-[#4F7CFF]" />
              <h2 className="text-2xl font-bold text-[#1E1E2E] md:text-3xl">
                最新新增 ✦
              </h2>
            </div>
            <p className="mb-8 max-w-3xl text-lg leading-relaxed text-[#6B6B80]">
              最受歡迎、剛加入的咒語，一次看個夠！
            </p>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
              {newest.map((s) => (
                <SpellCard
                  key={s.id}
                  spell={s}
                  copied={copiedId === s.id}
                  onCopy={() => handleCopy(s.spell, s.id)}
                  tag="最新"
                />
              ))}
            </div>
            {uploadSpells.length > 0 && (
              <div className="mt-8 rounded-2xl bg-[#E8EEFF] p-5">
                <p className="flex items-center gap-2 text-lg font-semibold text-[#1E1E2E]">
                  <span className="text-xl">📷</span> 需要上傳照片的咒語
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {uploadSpells.map((s) => (
                    <span
                      key={s.id}
                      className="rounded-full bg-white px-4 py-2 text-base font-medium text-[#4F7CFF]"
                    >
                      {s.title}
                    </span>
                  ))}
                </div>
                <p className="mt-3 text-base text-[#6B6B80]">
                  這些咒語需要先上傳自己的照片（例如全家福、寵物照），AI 才能幫你轉換成風格插畫。
                </p>
              </div>
            )}
          </section>
        )}

        {/* ===== 底部 CTA ===== */}
        <div className="mt-12 text-center">
          <div className="mx-auto max-w-lg rounded-2xl bg-gradient-to-br from-[#4F7CFF] to-[#7C3AED] p-8 shadow-lg">
            <p className="text-xl font-bold text-white">想學更多 AI 魔法？</p>
            <p className="mt-2 text-base text-white/85">
              加入學院，解鎖圖片會員、影片會員，還有更多咒語與完整課程陪你把 AI 用得滾瓜爛熟。
            </p>
            <Link href="/auth/register">
              <button className="mt-5 inline-flex h-14 items-center justify-center gap-2 rounded-full bg-white px-8 text-lg font-bold text-[#4F7CFF] shadow-lg transition hover:bg-white/90">
                <Sparkles className="size-5" /> 加入學院，免費註冊
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==================== 咒語卡片 ==================== */
function SpellCard({
  spell,
  copied,
  onCopy,
  tag,
}: {
  spell: Spell;
  copied: boolean;
  onCopy: () => void;
  tag?: string;
}) {
  return (
    <article className="flex flex-col overflow-hidden rounded-3xl border border-[#E4E4ED] bg-white shadow-sm transition-shadow hover:shadow-md">
      {/* 範例圖 + 標籤 */}
      <div className="relative h-52 w-full overflow-hidden bg-[#F0F1F5]">
        <Image
          src={spell.image}
          alt={`${spell.title} 範例圖`}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
        <div className="absolute left-3 top-3 flex items-center gap-2">
          <span className="rounded-full bg-white/90 px-3 py-1 text-base font-semibold text-[#4F7CFF] backdrop-blur">
            {spell.category}
          </span>
          {tag && (
            <span className="rounded-full bg-[#F4C542] px-3 py-1 text-base font-bold text-[#1E1E2E]">
              {tag}
            </span>
          )}
          {spell.needs_upload && (
            <span className="rounded-full bg-[#7C3AED] px-3 py-1 text-base font-semibold text-white">
              📷 需上傳照片
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        {/* 標題 */}
        <h3 className="text-2xl font-bold text-[#1E1E2E]">{spell.title}</h3>
        <p className="mt-1 text-base leading-relaxed text-[#6B6B80]">{spell.tagline}</p>

        {/* 咒語全文 */}
        <div className="mt-4 rounded-2xl bg-[#F6F7FB] p-4">
          <p className="mb-2 flex items-center gap-2 text-base font-semibold text-[#7C3AED]">
            📋 魔法咒語（完整版）
          </p>
          <p className="whitespace-pre-wrap text-lg leading-relaxed text-[#1E1E2E]">
            {spell.spell}
          </p>
        </div>

        {/* 一鍵複製 */}
        <button
          type="button"
          onClick={onCopy}
          className={[
            "mt-4 inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-lg font-bold transition",
            copied
              ? "bg-[#10B981] text-white"
              : "bg-gradient-to-r from-[#4F7CFF] to-[#7C3AED] text-white shadow-md hover:opacity-90",
          ].join(" ")}
        >
          {copied ? (
            <>
              <Check className="size-5" /> 已複製！
            </>
          ) : (
            <>
              <Copy className="size-5" /> 複製咒語
            </>
          )}
        </button>

        {/* 使用說明（中文） */}
        {spell.zh && (
          <div className="mt-4">
            <p className="mb-1 flex items-center gap-2 text-base font-semibold text-[#1E1E2E]">
              <ImageIcon className="size-4 text-[#4F7CFF]" /> 中文說明
            </p>
            <p className="rounded-xl bg-[#E8EEFF] p-3 text-base leading-relaxed text-[#1E1E2E]">
              {spell.zh}
            </p>
          </div>
        )}

        {/* 使用技巧 / 延伸玩法 */}
        {spell.tips.length > 0 && (
          <div className="mt-4">
            <p className="mb-2 flex items-center gap-2 text-base font-semibold text-[#1E1E2E]">
              <Sparkles className="size-4 text-[#F4C542]" /> 延伸玩法 · 這樣改更好玩
            </p>
            <ul className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              {spell.tips.map((tip, i) => (
                <li
                  key={i}
                  className="rounded-xl border border-[#E4E4ED] bg-white px-3 py-2"
                >
                  <span className="block text-base font-semibold text-[#7C3AED]">
                    {tip.title}
                  </span>
                  <span className="mt-0.5 block text-base text-[#6B6B80]">{tip.desc}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </article>
  );
}

/* ==================== 會員導流區塊 ==================== */
function MemberGate({
  icon,
  title,
  desc,
  points,
  freeNote,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  points: string[];
  freeNote: string;
}) {
  return (
    <div className="mx-auto max-w-3xl overflow-hidden rounded-3xl border-2 border-[#7C3AED]/30 bg-gradient-to-br from-[#4F7CFF]/5 to-[#7C3AED]/10 p-8 md:p-12">
      <div className="flex flex-col items-start gap-4">
        <div className="flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#4F7CFF] to-[#7C3AED] text-white shadow-md">
          {icon}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-[#1E1E2E] md:text-3xl">{title}</h2>
          <p className="mt-2 text-lg leading-relaxed text-[#6B6B80]">{desc}</p>
        </div>
      </div>

      <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {points.map((p) => (
          <li
            key={p}
            className="flex items-start gap-2 rounded-xl bg-white/80 p-3 text-lg text-[#1E1E2E]"
          >
            <span className="mt-0.5 text-[#4F7CFF]">✦</span>
            <span>{p}</span>
          </li>
        ))}
      </ul>

      <p className="mt-6 rounded-xl bg-white p-4 text-base leading-relaxed text-[#6B6B80]">
        💡 {freeNote}
      </p>

      <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row">
        <Link href="/courses">
          <button className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#4F7CFF] to-[#7C3AED] px-8 text-lg font-bold text-white shadow-lg transition hover:opacity-90">
            <Lock className="size-5" /> 查看會員方案
          </button>
        </Link>
        <button
          type="button"
          onClick={() => window.location.hash = "#free"}
          className="inline-flex h-12 items-center justify-center rounded-full border-2 border-[#4F7CFF] px-8 text-lg font-bold text-[#4F7CFF] transition hover:bg-[#E8EEFF]"
        >
          先回免費體驗區
        </button>
      </div>
    </div>
  );
}
