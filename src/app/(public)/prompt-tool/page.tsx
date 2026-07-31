"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Check, Copy, Sparkles, Wand2 } from "lucide-react";
import { generateSpell } from "@/lib/magic-spell-engine";
import type { ContentType, IndustryKnowledge, SpellResult } from "@/lib/magic-spell-engine/types";
import beautyData from "@/data/magic-spell-knowledge-base/beauty.json";
import foodDiningData from "@/data/magic-spell-knowledge-base/food-dining.json";
import personalBrandData from "@/data/magic-spell-knowledge-base/personal-brand.json";
import educationData from "@/data/magic-spell-knowledge-base/education.json";
import retailData from "@/data/magic-spell-knowledge-base/retail.json";

/* ============================================================
 * AI 提示詞工具 v2 — 行業選擇器 + Magic Spell Engine v2
 * 步驟流程：選行業 → 選內容類型 → 選選項 → 生成咒語 → 複製
 * 熟齡友善：字級 ≥18px、欄位 ≤5、點擊次數 ≤3
 * ============================================================ */

/** 行業卡片定義 */
interface IndustryDef {
  key: string;
  label: string;
  icon: string;
  description: string;
}

const INDUSTRIES: IndustryDef[] = [
  {
    key: "美容",
    label: "美容",
    icon: "✦",
    description: "美髮、美甲、護膚、SPA 美容沙龍",
  },
  {
    key: "餐飲探店",
    label: "餐飲探店",
    icon: "✦",
    description: "餐廳、咖啡廳、烘焙、美食推薦",
  },
  {
    key: "個人品牌",
    label: "個人品牌",
    icon: "✦",
    description: "創業者、講師、顧問、個人IP",
  },
  {
    key: "教育",
    label: "教育",
    icon: "✦",
    description: "補習班、線上課程、才藝教室",
  },
  {
    key: "零售",
    label: "零售",
    icon: "✦",
    description: "服飾、家居、食品、電商",
  },
];

/** 內容類型映射（3 工具 → 4 引擎類型） */
const CONTENT_TYPE_MAP: Record<string, ContentType> = {
  draw: "img",
  avatar: "vid",
  ad: "ad",
};

const CONTENT_TYPE_LABELS: Record<string, string> = {
  draw: "AI 繪圖提示詞",
  avatar: "AI 分身影片提示詞",
  ad: "AI 創意廣告提示詞",
};

const CONTENT_TYPE_TAGLINES: Record<string, string> = {
  draw: "✦ 對應課程：AI 繪圖 × ChatGPT 提示詞",
  avatar: "✦ 對應課程：AI 分身影片（即夢、豆包）",
  ad: "✦ 對應課程：AI 創意內容廣告片",
};

const CONTENT_TYPE_SUBTITLES: Record<string, string> = {
  draw: "選擇目標與風格，產生可貼到 ChatGPT、即夢的繪圖咒語。",
  avatar: "選擇場景與語氣，產生分身影片腳本。",
  ad: "選擇目標與平台，產生品牌廣告文案或影片腳本。",
};

type ToolKey = keyof typeof CONTENT_TYPE_MAP;

/* ---------- 從知識庫提取可用選項 ---------- */
function getKnowledgeForIndustry(
  industryKey: string
): IndustryKnowledge | null {
  const map: Record<string, IndustryKnowledge> = {
    美容: beautyData as unknown as IndustryKnowledge,
    "餐飲探店": foodDiningData as unknown as IndustryKnowledge,
    "個人品牌": personalBrandData as unknown as IndustryKnowledge,
    教育: educationData as unknown as IndustryKnowledge,
    零售: retailData as unknown as IndustryKnowledge,
  };
  return map[industryKey] ?? null;
}

interface ContentTypeOptions {
  goals: string[];
  styleHint: string;
  platforms: { value: string; label: string }[];
}

function getOptionsForIndustryAndType(
  industryKey: string,
  contentType: ContentType
): ContentTypeOptions {
  const knowledge = getKnowledgeForIndustry(industryKey);
  const goals = knowledge?.commonGoals ?? ["引流", "品牌曝光", "促購"];

  let styleHint = knowledge?.defaultStyle ?? "溫暖自然";
  if (contentType === "img") {
    styleHint = knowledge?.templateVariables?.img?.style ?? styleHint;
  } else if (contentType === "vid") {
    styleHint = knowledge?.templateVariables?.vid?.narrator ?? styleHint;
  }

  // 依 content type 決定平台選項
  const platformOptions: Record<ContentType, { value: string; label: string }[]> = {
    img: [
      { value: "ChatGPT", label: "ChatGPT" },
      { value: "即夢", label: "即夢" },
    ],
    vid: [
      { value: "豆包分身", label: "豆包分身" },
      { value: "ChatGPT", label: "ChatGPT" },
    ],
    copy: [
      { value: "ChatGPT", label: "ChatGPT" },
      { value: "Gemini", label: "Gemini" },
    ],
    ad: [
      { value: "ChatGPT", label: "ChatGPT" },
      { value: "豆包分身", label: "豆包分身" },
    ],
  };

  return {
    goals,
    styleHint,
    platforms: platformOptions[contentType] ?? platformOptions.img,
  };
}

/* ---------- 元件 ---------- */

export default function PromptToolPage() {
  const [step, setStep] = useState<"industry" | "options" | "result">(
    "industry"
  );
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [activeTool, setActiveTool] = useState<ToolKey>("draw");
  const [selectedGoal, setSelectedGoal] = useState<string>("");
  const [selectedPlatform, setSelectedPlatform] = useState<string>("");
  const [selectedStyle, setSelectedStyle] = useState<string>("");
  const [result, setResult] = useState<SpellResult | null>(null);
  const [resultText, setResultText] = useState("");
  const [copied, setCopied] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [extra, setExtra] = useState("");

  const contentType = useMemo(
    () => CONTENT_TYPE_MAP[activeTool],
    [activeTool]
  );

  const options = useMemo(
    () =>
      selectedIndustry
        ? getOptionsForIndustryAndType(selectedIndustry, contentType)
        : { goals: [], styleHint: "", platforms: [] },
    [selectedIndustry, contentType]
  );

  const canGenerate = useMemo(
    () =>
      selectedIndustry !== null &&
      selectedGoal !== "" &&
      selectedPlatform !== "",
    [selectedIndustry, selectedGoal, selectedPlatform]
  );

  /** 選擇行業 → 進入選項頁 */
  function selectIndustry(key: string) {
    setSelectedIndustry(key);
    setActiveTool("draw");
    setSelectedGoal("");
    setSelectedPlatform("");
    setSelectedStyle("");
    setExtra("");
    setResult(null);
    setResultText("");
    setCopied(false);
    setStep("options");
  }

  /** 回到行業選擇 */
  function backToIndustry() {
    setStep("industry");
    setResult(null);
    setResultText("");
    setCopied(false);
  }

  /** 生成咒語 */
  async function generate() {
    if (!canGenerate || !selectedIndustry) return;
    setGenerating(true);
    setResult(null);
    setResultText("");
    setCopied(false);

    try {
      const spellResult = await generateSpell({
        industry: selectedIndustry,
        contentType,
        goal: selectedGoal,
        style: selectedStyle || undefined,
        platform: selectedPlatform || undefined,
        extra: extra || undefined,
      });
      setResult(spellResult);
      setResultText(spellResult.spell);
      setStep("result");
    } catch (err) {
      console.error("generateSpell error:", err);
      // 備援：出錯時顯示友善訊息
      const fallback = `【無法生成咒語】
        
很抱歉，咒語引擎暫時無法完成請求。

請檢查：
• 行業：${selectedIndustry}
• 類型：${contentType}
• 目標：${selectedGoal}
• 平台：${selectedPlatform}

請稍後再試，或聯絡我們取得協助 ✦`;
      setResultText(fallback);
      setStep("result");
    } finally {
      setGenerating(false);
    }
  }

  /** 複製功能（含 execCommand 備援） */
  async function copy() {
    if (!resultText) return;
    try {
      await navigator.clipboard.writeText(resultText);
    } catch {
      // 備援：部分瀏覽器在非 https 或舊環境不支援 clipboard API
      try {
        const ta = document.createElement("textarea");
        ta.value = resultText;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      } catch {
        // 複製失敗仍顯示回饋
      }
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  /** 重新生成 */
  function regenerate() {
    setStep("options");
    setResult(null);
    setResultText("");
    setCopied(false);
  }

  /* ==================== 渲染 ==================== */

  return (
    <div className="py-12 md:py-16">
      <div className="container mx-auto max-w-3xl px-4">
        {/* 頁首 */}
        <header className="mb-8 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#4F7CFF]/10 to-[#7C3AED]/10 px-4 py-1.5 text-lg font-medium text-[#4F7CFF]">
            <Sparkles className="size-5" />
            AI 魔法咒語工具
          </div>
          <h1 className="text-3xl font-bold text-[#1E1E2E] md:text-4xl">
            選行業、選目標，立刻產生專屬魔法咒語
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-lg text-[#6B6B80]">
            不用會寫提示詞，點一點就能拿到可以直接用的魔法咒語 ✦
          </p>
        </header>

        {/* 進度指示 */}
        <div className="mb-6 flex items-center justify-center gap-2 text-base">
          <span
            className={
              step === "industry"
                ? "font-semibold text-[#7C3AED]"
                : "text-[#4F7CFF]"
            }
          >
            ❶ 選行業
          </span>
          <span className="text-[#C0C0D0]">→</span>
          <span
            className={
              step === "options"
                ? "font-semibold text-[#7C3AED]"
                : result
                  ? "text-[#4F7CFF]"
                  : "text-[#C0C0D0]"
            }
          >
            ❷ 選目標
          </span>
          <span className="text-[#C0C0D0]">→</span>
          <span
            className={
              step === "result" || result
                ? "font-semibold text-[#7C3AED]"
                : "text-[#C0C0D0]"
            }
          >
            ❸ 拿咒語
          </span>
        </div>

        {/* Step 1: 行業選擇 */}
        {step === "industry" && (
          <section>
            <h2 className="mb-6 text-center text-2xl font-bold text-[#1E1E2E]">
              你的行業是？
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {INDUSTRIES.map((ind) => (
                <button
                  key={ind.key}
                  type="button"
                  onClick={() => selectIndustry(ind.key)}
                  className={[
                    "group rounded-2xl border-2 px-5 py-6 text-left transition-all duration-200",
                    "border-[#E4E4ED] bg-white hover:border-[#7C3AED]/40 hover:shadow-md",
                    "focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/50",
                  ].join(" ")}
                >
                  <div className="mb-2 flex items-center gap-3">
                    <span className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#4F7CFF]/10 to-[#7C3AED]/10 text-2xl text-[#7C3AED] transition-transform group-hover:scale-110">
                      {ind.icon}
                    </span>
                    <span className="text-xl font-bold text-[#1E1E2E]">
                      {ind.label}
                    </span>
                  </div>
                  <p className="pl-[60px] text-base leading-relaxed text-[#6B6B80]">
                    {ind.description}
                  </p>
                  <div className="mt-3 pl-[60px]">
                    <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-[#4F7CFF]/10 to-[#7C3AED]/10 px-3 py-1 text-sm text-[#4F7CFF]">
                      選擇此行業 ✦
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Step 2: 選項 & 生成 */}
        {(step === "options" || step === "result") && selectedIndustry && (
          <>
            {/* 已選行業標籤 */}
            <div className="mb-4 flex items-center justify-between">
              <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#4F7CFF]/10 to-[#7C3AED]/10 px-4 py-2">
                <span className="text-lg text-[#7C3AED]">✦</span>
                <span className="text-lg font-medium text-[#1E1E2E]">
                  {selectedIndustry}
                </span>
                <button
                  type="button"
                  onClick={backToIndustry}
                  className="ml-1 text-sm text-[#4F7CFF] underline hover:text-[#7C3AED]"
                >
                  更換行業
                </button>
              </div>
              {result && (
                <button
                  type="button"
                  onClick={regenerate}
                  className="text-sm text-[#4F7CFF] underline hover:text-[#7C3AED]"
                >
                  重新選擇
                </button>
              )}
            </div>

            {/* 內容類型切換 */}
            <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {(["draw", "avatar", "ad"] as ToolKey[]).map((key) => {
                const selected = key === activeTool;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => {
                      setActiveTool(key);
                      setResult(null);
                      setResultText("");
                      setCopied(false);
                      setStep("options");
                    }}
                    aria-pressed={selected}
                    className={[
                      "rounded-2xl border-2 px-4 py-4 text-left transition-all",
                      "text-lg font-semibold",
                      selected
                        ? "border-[#7C3AED] bg-gradient-to-br from-[#4F7CFF]/10 to-[#7C3AED]/10 text-[#4F7CFF] shadow-md"
                        : "border-[#E4E4ED] bg-white text-[#1E1E2E] hover:border-[#4F7CFF]/40",
                    ].join(" ")}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xl">✦</span>
                      {CONTENT_TYPE_LABELS[key]}
                    </div>
                    <p className="mt-1 text-sm font-normal text-[#6B6B80]">
                      {CONTENT_TYPE_TAGLINES[key].replace("✦ ", "")}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* 選項區 */}
            {step === "options" && (
              <Card variant="elevated" className="mb-6">
                <CardHeader>
                  <CardTitle className="text-2xl">
                    {CONTENT_TYPE_LABELS[activeTool]}
                  </CardTitle>
                  <CardDescription className="text-lg">
                    {CONTENT_TYPE_SUBTITLES[activeTool]}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-6">
                  {/* 目標選擇 */}
                  <fieldset>
                    <legend className="mb-3 text-lg font-medium text-[#1E1E2E]">
                      目標
                    </legend>
                    <div
                      role="radiogroup"
                      aria-label="目標"
                      className="flex flex-wrap gap-2.5"
                    >
                      {options.goals.map((goal) => {
                        const selected = selectedGoal === goal;
                        return (
                          <button
                            key={goal}
                            type="button"
                            role="radio"
                            aria-checked={selected}
                            onClick={() => setSelectedGoal(goal)}
                            className={[
                              "rounded-xl border-2 px-5 py-3 text-lg font-medium transition-all",
                              selected
                                ? "border-[#7C3AED] bg-[#7C3AED] text-white shadow"
                                : "border-[#E4E4ED] bg-white text-[#1E1E2E] hover:border-[#4F7CFF]/50",
                            ].join(" ")}
                          >
                            {goal}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>

                  {/* 平台選擇 */}
                  <fieldset>
                    <legend className="mb-3 text-lg font-medium text-[#1E1E2E]">
                      工具平台
                    </legend>
                    <div
                      role="radiogroup"
                      aria-label="工具平台"
                      className="flex flex-wrap gap-2.5"
                    >
                      {options.platforms.map((p) => {
                        const selected = selectedPlatform === p.value;
                        return (
                          <button
                            key={p.value}
                            type="button"
                            role="radio"
                            aria-checked={selected}
                            onClick={() => setSelectedPlatform(p.value)}
                            className={[
                              "rounded-xl border-2 px-5 py-3 text-lg font-medium transition-all",
                              selected
                                ? "border-[#7C3AED] bg-[#7C3AED] text-white shadow"
                                : "border-[#E4E4ED] bg-white text-[#1E1E2E] hover:border-[#4F7CFF]/50",
                            ].join(" ")}
                          >
                            {p.label}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>

                  {/* 風格（進階選項 — 可折疊） */}
                  <details className="group rounded-xl border border-[#E4E4ED] bg-white/50 p-4 transition-all">
                    <summary className="flex cursor-pointer items-center justify-between text-base font-medium text-[#6B6B80] hover:text-[#4F7CFF]">
                      <span>✦ 進階選項：風格偏好（選填）</span>
                      <span className="text-sm text-[#9CA3AF] transition-transform group-open:rotate-180">
                        ▼
                      </span>
                    </summary>
                    <fieldset className="mt-4">
                      <legend className="mb-3 text-lg font-medium text-[#1E1E2E] sr-only">
                        風格偏好
                      </legend>
                      <div
                        role="radiogroup"
                        aria-label="風格偏好"
                        className="flex flex-wrap gap-2.5"
                      >
                        {[
                          options.styleHint || "溫暖自然",
                          "專業知性",
                          "活潑親切",
                          "高級質感",
                        ].map((style) => {
                          const selected = selectedStyle === style;
                          return (
                            <button
                              key={style}
                              type="button"
                              role="radio"
                              aria-checked={selected}
                              onClick={() =>
                                setSelectedStyle(
                                  selected ? "" : style
                                )
                              }
                              className={[
                                "rounded-xl border-2 px-5 py-3 text-lg font-medium transition-all",
                                selected
                                  ? "border-[#7C3AED] bg-[#7C3AED] text-white shadow"
                                  : "border-[#E4E4ED] bg-white text-[#1E1E2E] hover:border-[#4F7CFF]/50",
                              ].join(" ")}
                            >
                              {style}
                            </button>
                          );
                        })}
                      </div>
                    </fieldset>
                  </details>

                  {/* 生成按鈕 */}
                  <Button
                    type="button"
                    size="lg"
                    onClick={generate}
                    disabled={!canGenerate || generating}
                    className="h-14 w-full bg-gradient-to-r from-[#4F7CFF] to-[#7C3AED] text-lg font-semibold text-white hover:opacity-90 disabled:opacity-50"
                  >
                    <Wand2 className="size-5" />
                    {generating
                      ? "咒語生成中…"
                      : canGenerate
                        ? "生成魔法咒語 ✦"
                        : "請先選擇目標與平台"}
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* 結果區 */}
            {(step === "result" && resultText) && (
              <Card variant="outline" className="border-[#F4C542]/60">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <span className="text-[#F4C542]">✦</span>
                    你的專屬魔法咒語
                  </CardTitle>
                  <CardDescription className="text-lg">
                    複製後，可直接貼到 {selectedPlatform}、ChatGPT 等工具使用。
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <Textarea
                    readOnly
                    value={resultText}
                    className="min-h-64 text-lg leading-relaxed text-[#1E1E2E]"
                    aria-label="生成的魔法咒語"
                  />
                  <Button
                    type="button"
                    size="lg"
                    onClick={copy}
                    className={[
                      "h-14 w-full text-lg font-semibold text-white transition-all",
                      copied
                        ? "bg-[#10B981]"
                        : "bg-gradient-to-r from-[#4F7CFF] to-[#7C3AED] hover:opacity-90",
                    ].join(" ")}
                  >
                    {copied ? (
                      <>
                        <Check className="size-5" />
                        已複製 ✓
                      </>
                    ) : (
                      <>
                        <Copy className="size-5" />
                        一鍵複製咒語
                      </>
                    )}
                  </Button>
                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      onClick={regenerate}
                      className="h-12 flex-1 border-[#4F7CFF]/40 text-lg text-[#4F7CFF] hover:bg-[#4F7CFF]/5"
                    >
                      ← 重新選擇
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      onClick={() => {
                        setSelectedGoal("");
                        setSelectedPlatform("");
                        setSelectedStyle("");
                        setResult(null);
                        setResultText("");
                        setCopied(false);
                        setStep("options");
                      }}
                      className="h-12 flex-1 border-[#7C3AED]/40 text-lg text-[#7C3AED] hover:bg-[#7C3AED]/5"
                    >
                      ✦ 再生成一個
                    </Button>
                  </div>
                  <p className="text-center text-base text-[#9CA3AF]">
                    可貼到 ChatGPT、即夢、豆包等工具使用 ✦
                  </p>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>

      {/* Bottom CTA — 加入學院 */}
      <div className="mt-12 text-center">
        <div className="mx-auto max-w-lg rounded-2xl bg-gradient-to-br from-[#4F7CFF] to-[#7C3AED] p-8 shadow-lg">
          <p className="text-xl font-bold text-white">想學更多 AI 魔法？</p>
          <p className="mt-2 text-base text-white/85">
            加入學院，解鎖完整課程、更多咒語範本，還有專家陪你學。
          </p>
          <Link href="/auth/register">
            <Button
              size="lg"
              className="mt-5 h-14 w-full rounded-full bg-white text-lg font-bold text-[#4F7CFF] hover:bg-white/90 shadow-lg"
            >
              <Sparkles className="mr-2 h-5 w-5" /> 加入學院，免費註冊
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
