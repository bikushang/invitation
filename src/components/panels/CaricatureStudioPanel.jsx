import { Image, Sparkles, Check } from "lucide-react";

const CARICATURE_PRESETS = [
  {
    id: "rajputana-royal",
    title: "Royal Rajputana Couple",
    category: "Rajasthani / Royal",
    url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80",
    description: "Regal sherwani and lehenga with royal jewels and pagdi",
  },
  {
    id: "punjabi-swag",
    title: "Punjabi Dhol & Bhangra",
    category: "Punjabi / Sikh",
    url: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=600&q=80",
    description:
      "Vibrant turban, festive chooda, and energetic celebration pose",
  },
  {
    id: "south-silk",
    title: "Temple Silk & Jasmine",
    category: "South Indian",
    url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80",
    description: "Pure Kanjeevaram silk saree with veshti and temple garlands",
  },
  {
    id: "classic-romantic",
    title: "Marigold Festive Bliss",
    category: "Modern Minimalist",
    url: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=600&q=80",
    description: "Indian wedding floral mandap & sacred vows ceremony",
  },
];

export default function CaricatureStudioPanel({ data, update }) {
  const caricature = data.caricature || {
    enabled: false,
    url: CARICATURE_PRESETS[0].url,
    title: CARICATURE_PRESETS[0].title,
    placement: "hero", // 'hero' | 'envelope'
  };

  const setCaricature = (patch) =>
    update("caricature", { ...caricature, ...patch });

  return (
    <div className="space-y-6">
      {/* Header and Toggle */}
      <div className="flex items-center justify-between border-b border-stone-200 pb-3">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 flex items-center gap-1.5">
            <Sparkles size={14} className="text-amber-800" />
            <span>Couple Caricature Studio</span>
          </h4>
          <p className="text-[11px] text-stone-500">
            Illustrated caricature banner for your wedding card
          </p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={caricature.enabled}
            onChange={(e) => setCaricature({ enabled: e.target.checked })}
            className="sr-only peer"
          />
          <div className="w-9 h-5 bg-stone-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-800"></div>
        </label>
      </div>

      {caricature.enabled && (
        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-stone-700">
              Display Placement
            </label>
            <div className="grid grid-cols-2 gap-2 mt-1">
              <button
                type="button"
                onClick={() => setCaricature({ placement: "hero" })}
                className={`py-2 px-3 text-xs rounded-lg border font-medium transition cursor-pointer ${
                  caricature.placement === "hero"
                    ? "border-amber-800 bg-amber-50 text-amber-900 font-semibold"
                    : "border-stone-200 bg-white text-stone-600"
                }`}
              >
                In Hero Invitation Card
              </button>
              <button
                type="button"
                onClick={() => setCaricature({ placement: "envelope" })}
                className={`py-2 px-3 text-xs rounded-lg border font-medium transition cursor-pointer ${
                  caricature.placement === "envelope"
                    ? "border-amber-800 bg-amber-50 text-amber-900 font-semibold"
                    : "border-stone-200 bg-white text-stone-600"
                }`}
              >
                On Cover Envelope
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-stone-700 mb-2 block">
              Choose Caricature / Illustrated Portrait Style
            </label>
            <div className="grid grid-cols-1 gap-2.5">
              {CARICATURE_PRESETS.map((p) => {
                const active = caricature.url === p.url;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() =>
                      setCaricature({ url: p.url, title: p.title })
                    }
                    className={`flex items-center gap-3 p-2.5 rounded-xl border text-left transition cursor-pointer ${
                      active
                        ? "border-amber-800 bg-amber-50/50 shadow-xs"
                        : "border-stone-200 hover:border-stone-400 bg-white"
                    }`}
                  >
                    <img
                      src={p.url}
                      alt={p.title}
                      className="w-14 h-14 rounded-lg object-cover border border-amber-800/20"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-stone-900">
                          {p.title}
                        </span>
                        {active && (
                          <Check size={14} className="text-amber-800" />
                        )}
                      </div>
                      <p className="text-[10px] text-amber-800 font-medium">
                        {p.category}
                      </p>
                      <p className="text-[11px] text-stone-500 truncate">
                        {p.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-stone-700 mb-1 block">
              Or Paste Custom Caricature Image URL
            </label>
            <input
              type="text"
              placeholder="https://example.com/caricature.png"
              value={caricature.url || ""}
              onChange={(e) => setCaricature({ url: e.target.value })}
              className="w-full rounded-md border border-stone-300 px-3 py-2 text-xs focus:border-amber-800 focus:outline-none bg-white"
            />
          </div>
        </div>
      )}
    </div>
  );
}
