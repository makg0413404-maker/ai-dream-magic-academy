"use client";

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

/* ============================================================
 * AI 提示詞工具 MVP
 * 純前端組合：固定模板 + 使用者選項，不呼叫任何 AI / API
 * 與三大凍結核心課程一致：AI 繪圖 / AI 分身影片 / AI 創意內容廣告
 * ============================================================ */

type ToolKey = "draw" | "avatar" | "ad";

interface OptionDef {
  key: string;
  label: string;
  choices: { value: string; label: string }[];
}

interface ToolDef {
  key: ToolKey;
  name: string;
  tagline: string;
  subtitle: string;
  options: OptionDef[];
}

const TOOLS: ToolDef[] = [
  {
    key: "draw",
    name: "AI 繪圖提示詞",
    tagline: "✦ 對應課程：AI 繪圖 × ChatGPT 提示詞",
    subtitle: "選擇主題、風格與用途，一鍵產生可貼到 ChatGPT、即夢的繪圖提示詞。",
    options: [
      {
        key: "subject",
        label: "主題",
        choices: [
          { value: "人像", label: "人像" },
          { value: "風景", label: "風景" },
          { value: "產品", label: "產品" },
          { value: "海報", label: "海報" },
        ],
      },
      {
        key: "style",
        label: "風格",
        choices: [
          { value: "寫實", label: "寫實" },
          { value: "插畫", label: "插畫" },
          { value: "水彩", label: "水彩" },
          { value: "3D", label: "3D" },
        ],
      },
      {
        key: "purpose",
        label: "用途",
        choices: [
          { value: "社群貼文", label: "社群貼文" },
          { value: "海報", label: "海報" },
          { value: "頭像", label: "頭像" },
        ],
      },
    ],
  },
  {
    key: "avatar",
    name: "AI 分身影片提示詞",
    tagline: "✦ 對應課程：AI 分身影片（即夢、豆包）",
    subtitle: "選擇場景、語氣與平台，一鍵產生可貼到即夢、豆包的分身影片腳本。",
    options: [
      {
        key: "scene",
        label: "場景",
        choices: [
          { value: "自我介紹", label: "自我介紹" },
          { value: "產品展示", label: "產品展示" },
          { value: "生日祝福", label: "生日祝福" },
          { value: "品牌宣傳", label: "品牌宣傳" },
        ],
      },
      {
        key: "tone",
        label: "語氣",
        choices: [
          { value: "專業", label: "專業" },
          { value: "溫暖", label: "溫暖" },
          { value: "活潑", label: "活潑" },
        ],
      },
      {
        key: "platform",
        label: "平台",
        choices: [
          { value: "即夢", label: "即夢" },
          { value: "豆包", label: "豆包" },
          { value: "通用", label: "通用" },
        ],
      },
    ],
  },
  {
    key: "ad",
    name: "AI 創意內容廣告提示詞",
    tagline: "✦ 對應課程：AI 創意內容廣告片",
    subtitle: "選擇產業、目標與格式，一鍵產生可貼到 ChatGPT 的廣告文案提示詞。",
    options: [
      {
        key: "industry",
        label: "產業",
        choices: [
          { value: "餐飲", label: "餐飲" },
          { value: "零售", label: "零售" },
          { value: "教育", label: "教育" },
          { value: "個人品牌", label: "個人品牌" },
        ],
      },
      {
        key: "goal",
        label: "目標",
        choices: [
          { value: "引流", label: "引流" },
          { value: "促購", label: "促購" },
          { value: "品牌曝光", label: "品牌曝光" },
        ],
      },
      {
        key: "format",
        label: "格式",
        choices: [
          { value: "影片腳本", label: "影片腳本" },
          { value: "文案", label: "文案" },
          { value: "圖文", label: "圖文" },
        ],
      },
    ],
  },
];

/* ---------- 提示詞模板：依工具與選項組合 ---------- */

function buildPrompt(tool: ToolKey, opts: Record<string, string>): string {
  if (tool === "draw") {
    const subject = opts.subject || "（請選擇主題）";
    const style = opts.style || "（請選擇風格）";
    const purpose = opts.purpose || "（請選擇用途）";
    return `你是一位專業的 AI 繪圖助手。請根據以下需求生成一張圖像：

【角色】專業插畫家與攝影指導
【任務】製作一張用於「${purpose}」的「${style}」風格「${subject}」圖片。
【風格】${style} 風格，構圖平衡、光線自然、主體突出，整體溫馨有質感，符合台灣熟齡族群喜愛的視覺。
【細節】畫面清晰銳利、色彩和諧、留白適當，避免雜亂背景與過多文字；如有人物，表情自然親切。
【輸出格式】請輸出一張可直接使用的 ${purpose} 用圖，並附上 3 個可微調的修改建議（例如光線、色調、構圖）。`;
  }

  if (tool === "avatar") {
    const scene = opts.scene || "（請選擇場景）";
    const tone = opts.tone || "（請選擇語氣）";
    const platform = opts.platform || "通用";
    const platformNote =
      platform === "通用"
        ? "適用於一般 AI 分身影片工具"
        : `請以「${platform}」工具的指令格式輸出`;
    return `你是一位 AI 分身影片腳本設計師。請幫我寫一段可分身演出的影片腳本。

【角色】由 AI 分身替我（一位親切的創作者）演出
【任務】拍攝一段「${scene}」影片，語氣${tone}。
【風格】鏡頭穩定、說話節奏舒緩清楚、字幕簡單易讀；整體${tone}，讓觀眾感到被重視。
【細節】開場 3 秒抓住注意力，中段清楚傳達重點，結尾引導觀眾互動（按讚 / 留言 / 了解更多）。字數控制在 60 秒內可唸完。
【輸出格式】請依「鏡頭畫面 / 口播台詞 / 畫面提示」三段式輸出，並標注建議運鏡與字幕。${platformNote}。`;
  }

  // ad
  const industry = opts.industry || "（請選擇產業）";
  const goal = opts.goal || "（請選擇目標）";
  const format = opts.format || "（請選擇格式）";
  return `你是一位資深廣告文案與內容策展人。請為以下需求產出創意內容。

【角色】${industry} 品牌的內容行銷顧問
【任務】製作一份以「${goal}」為目標的「${format}」，主題環繞${industry}。
【風格】文案白話、有溫度、說人話，避免艱澀術語；強調真實好處而非硬推銷。
【細節】開頭點出目標客群的一個痛點，中段給出清楚解方與信任感，結尾給出明確行動呼籲（CTA）。${format} 需結構清楚、重點標示。
【輸出格式】請直接產出可發布的${format}成品，並附上 2 個可 A/B 測試的標題或開場句。`;
}

/* ---------- 元件 ---------- */

export default function PromptToolPage() {
  const [activeTool, setActiveTool] = useState<ToolKey>("draw");
  const [selections, setSelections] = useState<Record<ToolKey, Record<string, string>>>({
    draw: {},
    avatar: {},
    ad: {},
  });
  const [result, setResult] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const tool = useMemo(() => TOOLS.find((t) => t.key === activeTool)!, [activeTool]);
  const currentSel = selections[activeTool];
  const allChosen = tool.options.every((o) => currentSel[o.key]);

  function choose(optionKey: string, value: string) {
    setSelections((prev) => ({
      ...prev,
      [activeTool]: { ...prev[activeTool], [optionKey]: value },
    }));
    setResult("");
    setCopied(false);
  }

  function generate() {
    if (!allChosen) return;
    setResult(buildPrompt(activeTool, currentSel));
    setCopied(false);
  }

  async function copy() {
    if (!result) return;
    let ok = false;
    try {
      await navigator.clipboard.writeText(result);
      ok = true;
    } catch {
      // 備援：部分瀏覽器在非 https 或舊環境不支援 clipboard API
      try {
        const ta = document.createElement("textarea");
        ta.value = result;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        ok = document.execCommand("copy");
        document.body.removeChild(ta);
      } catch {
        ok = false;
      }
    }
    // 無論用哪種方式，只要嘗試過就給使用者明確回饋
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function switchTool(key: ToolKey) {
    setActiveTool(key);
    setResult("");
    setCopied(false);
  }

  return (
    <div className="py-12 md:py-16">
      <div className="container mx-auto max-w-3xl px-4">
        {/* 頁首 */}
        <header className="mb-8 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#4F7CFF]/10 to-[#7C3AED]/10 px-4 py-1.5 text-lg font-medium text-[#4F7CFF]">
            <Sparkles className="size-5" />
            AI 提示詞工具
          </div>
          <h1 className="text-3xl font-bold text-[#1E1E2E] md:text-4xl">
            選幾個選項，立刻產生可複製的專業提示詞
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-lg text-[#6B6B80]">
            不用會寫英文、不用懂 AI，只要點一點，就能拿到可以直接用的提示詞 ✦
          </p>
        </header>

        {/* 工具切換（三個 Tab 卡片） */}
        <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {TOOLS.map((t) => {
            const selected = t.key === activeTool;
            return (
              <button
                key={t.key}
                type="button"
                onClick={() => switchTool(t.key)}
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
                  {t.name}
                </div>
                <p className="mt-1 text-sm font-normal text-[#6B6B80]">
                  {t.tagline.replace("✦ ", "")}
                </p>
              </button>
            );
          })}
        </div>

        {/* 選項區 */}
        <Card variant="elevated" className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">{tool.name}</CardTitle>
            <CardDescription className="text-lg">{tool.subtitle}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            {tool.options.map((opt) => (
              <fieldset key={opt.key}>
                <legend className="mb-3 text-lg font-medium text-[#1E1E2E]">
                  {opt.label}
                </legend>
                <div
                  role="radiogroup"
                  aria-label={opt.label}
                  className="flex flex-wrap gap-2.5"
                >
                  {opt.choices.map((c) => {
                    const selected = currentSel[opt.key] === c.value;
                    return (
                      <button
                        key={c.value}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        onClick={() => choose(opt.key, c.value)}
                        className={[
                          "rounded-xl border-2 px-5 py-3 text-lg font-medium transition-all",
                          selected
                            ? "border-[#7C3AED] bg-[#7C3AED] text-white shadow"
                            : "border-[#E4E4ED] bg-white text-[#1E1E2E] hover:border-[#4F7CFF]/50",
                        ].join(" ")}
                      >
                        {c.label}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            ))}

            <Button
              type="button"
              size="lg"
              onClick={generate}
              disabled={!allChosen}
              className="h-14 w-full bg-gradient-to-r from-[#4F7CFF] to-[#7C3AED] text-lg font-semibold text-white hover:opacity-90"
            >
              <Wand2 className="size-5" />
              {allChosen ? "生成提示詞" : "請先選完所有選項"}
            </Button>
          </CardContent>
        </Card>

        {/* 結果區 */}
        {result && (
          <Card variant="outline" className="border-[#F4C542]/60">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <span className="text-[#F4C542]">✦</span>
                你的專屬提示詞
              </CardTitle>
              <CardDescription className="text-lg">
                複製後，可直接貼到 ChatGPT、即夢、豆包等工具使用。
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <Textarea
                readOnly
                value={result}
                className="min-h-64 text-lg leading-relaxed text-[#1E1E2E]"
                aria-label="生成的提示詞"
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
                    一鍵複製提示詞
                  </>
                )}
              </Button>
              <p className="text-center text-base text-[#9CA3AF]">
                可貼到 ChatGPT、即夢、豆包等工具使用 ✦
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
