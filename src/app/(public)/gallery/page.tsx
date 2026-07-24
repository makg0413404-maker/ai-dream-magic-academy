import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "AI 圖片案例",
  description: "AI 圓夢魔法學院的 AI 生成圖片案例展示，看看 AI 可以創造出什麼樣的作品。",
};

const categories = ["全部", "AI 繪圖", "AI 藝術", "產品設計", "人物肖像", "奇幻風格"];

const galleryItems = [
  { title: "奇幻森林", category: "奇幻風格", tool: "Midjourney V6" },
  { title: "未來城市", category: "AI 藝術", tool: "DALL-E 3" },
  { title: "夕陽海岸", category: "AI 繪圖", tool: "Midjourney V6" },
  { title: "復古人物肖像", category: "人物肖像", tool: "Stable Diffusion" },
  { title: "現代產品設計", category: "產品設計", tool: "Midjourney V6" },
  { title: "星空下的城堡", category: "奇幻風格", tool: "DALL-E 3" },
  { title: "抽象藝術", category: "AI 藝術", tool: "Stable Diffusion" },
  { title: "北極光風景", category: "AI 繪圖", tool: "Midjourney V6" },
  { title: "貓咪畫家", category: "人物肖像", tool: "DALL-E 3" },
  { title: "玻璃工藝品", category: "產品設計", tool: "Midjourney V6" },
  { title: "太空探險", category: "奇幻風格", tool: "Stable Diffusion" },
  { title: "水下世界", category: "AI 繪圖", tool: "DALL-E 3" },
];

export default function GalleryPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">AI 圖片案例</h1>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            看看 AI 可以創造出什麼樣令人驚豔的作品
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {categories.map((cat, i) => (
            <Badge
              key={i}
              variant={i === 0 ? "default" : "outline"}
              className={`px-4 py-2 text-sm cursor-pointer ${
                i === 0
                  ? "bg-magic-blue hover:bg-magic-blue/90"
                  : "hover:bg-magic-blue/10 hover:border-magic-blue/30"
              }`}
            >
              {cat}
            </Badge>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryItems.map((item, i) => (
            <div
              key={i}
              className="group relative aspect-square rounded-xl bg-gradient-to-br from-magic-blue/5 to-magic-purple/5 overflow-hidden cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1"
            >
              {/* Placeholder with emoji */}
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-6xl opacity-50">
                  {item.category === "奇幻風格" ? "🏰" :
                   item.category === "AI 藝術" ? "🎭" :
                   item.category === "人物肖像" ? "👤" :
                   item.category === "產品設計" ? "💎" : "🌅"}
                </span>
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                <h3 className="text-white font-bold text-sm">{item.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className="bg-white/20 text-white text-xs border-0">
                    {item.category}
                  </Badge>
                  <span className="text-white/60 text-xs">{item.tool}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
