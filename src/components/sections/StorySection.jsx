import { useState } from "react";
import EditableText from "../EditableText";
import { SectionShell, Divider } from "./Shared";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";

export default function StorySection({ data, update, anim, isMobile }) {
  const s = data.story || {};
  const theme = data.theme || {};
  const items = s.items || [];
  const [currentIdx, setCurrentIdx] = useState(0);

  const set = (patch) => update("story", patch);
  const gold = theme.primary || "#b8860b";
  const maroon = theme.accent || "#1e293b";

  const setItem = (id, patch) => {
    update("story", {
      items: items.map((it) => (it.id === id ? { ...it, ...patch } : it)),
    });
  };

  const nextItem = () =>
    setCurrentIdx((i) => (i + 1) % Math.max(1, items.length));
  const prevItem = () =>
    setCurrentIdx((i) => (i - 1 + items.length) % Math.max(1, items.length));

  const currentItem = items[currentIdx] || items[0] || {};

  return (
    <SectionShell
      data={data}
      sectionKey="story"
      sectionAnim={anim?.story || "fade-up"}
    >
      <div className="flex flex-col items-center text-center px-4 sm:px-6 py-12 sm:py-20 max-w-2xl mx-auto w-full">
        {/* Header */}
        <p
          className="text-[10px] sm:text-xs font-semibold tracking-[0.35em] uppercase"
          style={{ color: gold }}
        >
          M E M O R I E S
        </p>
        <h2
          className="font-cinzel mt-2 text-2xl sm:text-4xl font-semibold tracking-wider uppercase"
          style={{ color: maroon }}
        >
          <EditableText
            value={s.heading || "Our Love Story"}
            onChange={(v) => set({ heading: v })}
          />
        </h2>
        <p
          className="mt-1.5 max-w-md text-xs sm:text-sm italic opacity-85 px-4"
          style={{ color: maroon }}
        >
          <EditableText
            value={
              s.subtitle ||
              "Two hearts, one soul, and a lifetime of adventures together."
            }
            onChange={(v) => set({ subtitle: v })}
            multiline
          />
        </p>
        <Divider color={gold} />

        {/* Featured Polaroid / Deckle-Edge Story Card - Centered and Never Squished */}
        <div className="relative w-full max-w-sm mx-auto my-4 group">
          <div
            className="rounded-3xl p-4 sm:p-5 shadow-2xl transition-all border text-center flex flex-col items-center"
            style={{
              background: "#ffffff",
              borderColor: `${gold}55`,
              boxShadow:
                "0 20px 45px -10px rgba(30, 41, 59, 0.15), 0 0 0 1px rgba(184, 134, 11, 0.25)",
            }}
          >
            {/* Photo with Polaroid Matting */}
            <div
              className="w-full aspect-[4/3] rounded-2xl bg-cover bg-center overflow-hidden shadow-inner relative"
              style={{
                backgroundImage: currentItem.image
                  ? `url(${currentItem.image})`
                  : "url(https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80)",
                backgroundColor: "#f3ece1",
              }}
            >
              <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-rose-600 shadow-xs">
                <Heart size={14} fill="currentColor" />
              </div>
            </div>

            {/* Caption & Title */}
            <div className="pt-4 pb-2 px-2 w-full text-center">
              <h4
                className="font-serif text-lg sm:text-xl font-bold tracking-wide"
                style={{ color: maroon }}
              >
                <EditableText
                  value={currentItem.title || "Our Special Moment"}
                  onChange={(v) => setItem(currentItem.id, { title: v })}
                />
              </h4>
              <p
                className="mt-1.5 text-xs sm:text-sm font-serif italic opacity-85 leading-relaxed"
                style={{ color: maroon }}
              >
                <EditableText
                  value={
                    currentItem.caption ||
                    "A beautiful chapter of love, laughter, and togetherness."
                  }
                  onChange={(v) => setItem(currentItem.id, { caption: v })}
                  multiline
                />
              </p>
            </div>

            {/* Navigation Dots & Buttons if multiple items */}
            {items.length > 1 && (
              <div
                className="mt-2 pt-2 border-t w-full flex items-center justify-between px-2"
                style={{ borderColor: `${gold}25` }}
              >
                <button
                  type="button"
                  onClick={prevItem}
                  className="p-1 rounded-full text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition cursor-pointer"
                  title="Previous Memory"
                >
                  <ChevronLeft size={18} />
                </button>

                <div className="flex items-center gap-1.5">
                  {items.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCurrentIdx(idx)}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        currentIdx === idx
                          ? "w-5 bg-amber-700"
                          : "w-2 bg-stone-300"
                      }`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={nextItem}
                  className="p-1 rounded-full text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition cursor-pointer"
                  title="Next Memory"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Poetic Quote */}
        <blockquote
          className="font-serif italic font-medium mt-4 text-sm sm:text-base max-w-lg mx-auto"
          style={{ color: gold }}
        >
          <EditableText
            value={
              s.quote ||
              "From that first conversation to a lifetime of adventures"
            }
            onChange={(v) => set({ quote: v })}
            multiline
          />
        </blockquote>
      </div>
    </SectionShell>
  );
}
