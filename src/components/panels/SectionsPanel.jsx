import { useState } from "react";
import {
  GripVertical,
  Eye,
  EyeOff,
  ArrowUp,
  ArrowDown,
  Paintbrush,
  Image as ImageIcon,
  Palette,
  Sparkles,
  RotateCcw,
} from "lucide-react";
import { SECTION_KEYS } from "../../lib/animations";

const SOLID_PRESETS = [
  { name: "Royal Ivory", color: "#fdfbf7" },
  { name: "Golden Cream", color: "#fcf6e8" },
  { name: "Champagne", color: "#fff8e7" },
  { name: "Pale Sand", color: "#f7f0e3" },
  { name: "Sandstone", color: "#f5ebd9" },
  { name: "Blush Rose", color: "#fcf1f3" },
  { name: "Royal Crimson", color: "#4a1525" },
  { name: "Regal Navy", color: "#132238" },
  { name: "Emerald Green", color: "#143828" },
  { name: "Kesari Saffron", color: "#7a3e08" },
  { name: "Pure White", color: "#ffffff" },
];

const GRADIENT_PRESETS = [
  {
    name: "Champagne Shimmer",
    gradient: "linear-gradient(135deg, #fffefb 0%, #faf3e0 50%, #f4e4bc 100%)",
  },
  {
    name: "Sunset Haldi Gold",
    gradient: "linear-gradient(135deg, #fffdf2 0%, #fff6d6 50%, #ffe8a3 100%)",
  },
  {
    name: "Blush & Rose Gold",
    gradient: "linear-gradient(135deg, #fff7f8 0%, #fae6e9 50%, #f3d1d7 100%)",
  },
  {
    name: "Royal Marwar Crimson",
    gradient: "linear-gradient(135deg, #2b0b14 0%, #4a1525 50%, #6e1a32 100%)",
  },
  {
    name: "Regal Emerald",
    gradient: "linear-gradient(135deg, #0d281e 0%, #174433 50%, #205c45 100%)",
  },
  {
    name: "Midnight Sapphire",
    gradient: "linear-gradient(135deg, #0e1a2b 0%, #182e4b 50%, #23436d 100%)",
  },
  {
    name: "Delicate Silk Parchment",
    gradient: "linear-gradient(180deg, #fdfbf7 0%, #f5eee0 100%)",
  },
];

const INDIAN_BG_IMAGES = [
  {
    name: "Royal Palace Architecture",
    url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Auspicious Floral Marigold",
    url: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Intricate Bridal Henna",
    url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function SectionsPanel({
  data,
  update,
  initialActiveSec = null,
}) {
  const sectionsOrder = (data.sectionsOrder || []).filter(
    (s) => s !== "schedule",
  );
  const visibility = data.sectionVisibility || {};
  const backgrounds = data.sectionBackgrounds || {};

  const [draggedIdx, setDraggedIdx] = useState(null);
  const [activeBgSec, setActiveBgSec] = useState(initialActiveSec);

  // Custom Gradient builder state
  const [customGradDir, setCustomGradDir] = useState("135deg");
  const [customGradC1, setCustomGradC1] = useState("#fffefb");
  const [customGradC2, setCustomGradC2] = useState("#f4e4bc");

  const getLabel = (id) => {
    const found = SECTION_KEYS.find((s) => s.id === id);
    if (found) return found.label;
    if (id.startsWith("event_")) {
      const ev = (data.separateEvents && data.separateEvents[id]) || {};
      return `✦ ${ev.badge || ev.name || id.replace("event_", "").toUpperCase()}`;
    }
    return id.charAt(0).toUpperCase() + id.slice(1);
  };

  function move(index, dir) {
    const targetIdx = index + dir;
    if (targetIdx < 0 || targetIdx >= sectionsOrder.length) return;
    const newOrder = [...sectionsOrder];
    const [item] = newOrder.splice(index, 1);
    newOrder.splice(targetIdx, 0, item);
    update("sectionsOrder", newOrder);
  }

  function toggleVisibility(id) {
    update("sectionVisibility", {
      ...visibility,
      [id]: visibility[id] === false ? true : false,
    });
  }

  function updateSecBg(secId, patch) {
    update("sectionBackgrounds", {
      ...backgrounds,
      [secId]: {
        ...(backgrounds[secId] || { type: "default" }),
        ...patch,
      },
    });
  }

  function resetSecBg(secId) {
    const copy = { ...backgrounds };
    delete copy[secId];
    update("sectionBackgrounds", copy);
  }

  // HTML5 Drag and Drop handlers
  function handleDragStart(idx) {
    setDraggedIdx(idx);
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrop(e, targetIdx) {
    e.preventDefault();
    if (draggedIdx === null || draggedIdx === targetIdx) return;
    const newOrder = [...sectionsOrder];
    const [moved] = newOrder.splice(draggedIdx, 1);
    newOrder.splice(targetIdx, 0, moved);
    update("sectionsOrder", newOrder);
    setDraggedIdx(null);
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl bg-amber-50/70 p-3.5 text-xs text-amber-950 leading-relaxed border border-amber-200 space-y-1">
        <p className="font-bold flex items-center gap-1.5 text-amber-900">
          <Palette size={15} className="text-amber-800" />
          <span>Section Layout & Custom Backgrounds</span>
        </p>
        <p className="text-[11px] text-amber-900/80 leading-relaxed">
          Reorder sections via drag & drop. Click the paintbrush icon on any
          section to customize its individual background with solid royal
          colors, gradients, or authentic Indian wedding images.
        </p>
      </div>

      <div className="space-y-2">
        {sectionsOrder.map((secId, index) => {
          const isVisible = visibility[secId] !== false;
          const isDragging = draggedIdx === index;
          const secBg = backgrounds[secId] || { type: "default" };
          const hasCustomBg = secBg.type && secBg.type !== "default";
          const isPanelOpen = activeBgSec === secId;

          return (
            <div key={secId} className="space-y-1.5">
              {/* Row Bar */}
              <div
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
                className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-grab active:cursor-grabbing ${
                  isDragging
                    ? "border-dashed border-stone-400 bg-stone-100 opacity-50"
                    : isPanelOpen
                      ? "border-amber-700 bg-amber-50/40 shadow-xs"
                      : "border-stone-200 bg-white hover:border-stone-400 shadow-xs"
                }`}
              >
                <div className="flex items-center gap-3">
                  <GripVertical
                    size={16}
                    className="text-stone-400 hover:text-stone-600 cursor-grab"
                  />
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-sm font-medium ${
                        isVisible
                          ? "text-stone-800"
                          : "text-stone-400 line-through"
                      }`}
                    >
                      {getLabel(secId)}
                    </span>
                    {hasCustomBg && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-amber-100 text-amber-900">
                        {secBg.type.toUpperCase()}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  {/* Background Palette Toggle */}
                  <button
                    type="button"
                    onClick={() => setActiveBgSec(isPanelOpen ? null : secId)}
                    className={`p-1.5 rounded-md transition cursor-pointer ${
                      isPanelOpen
                        ? "bg-amber-800 text-white shadow-xs"
                        : hasCustomBg
                          ? "bg-amber-100 text-amber-900 hover:bg-amber-200"
                          : "text-stone-400 hover:text-stone-800 hover:bg-stone-100"
                    }`}
                    title="Customize Section Background"
                  >
                    <Paintbrush size={14} />
                  </button>

                  <button
                    type="button"
                    onClick={() => move(index, -1)}
                    disabled={index === 0}
                    className="p-1 text-stone-400 hover:text-stone-700 disabled:opacity-20 hover:bg-stone-100 rounded cursor-pointer"
                    title="Move Up"
                  >
                    <ArrowUp size={15} />
                  </button>
                  <button
                    type="button"
                    onClick={() => move(index, 1)}
                    disabled={index === sectionsOrder.length - 1}
                    className="p-1 text-stone-400 hover:text-stone-700 disabled:opacity-20 hover:bg-stone-100 rounded cursor-pointer"
                    title="Move Down"
                  >
                    <ArrowDown size={15} />
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleVisibility(secId)}
                    className={`p-1 rounded transition cursor-pointer ${
                      isVisible
                        ? "text-stone-600 hover:text-stone-900 hover:bg-stone-100"
                        : "text-stone-300 hover:text-stone-500"
                    }`}
                    title={isVisible ? "Hide Section" : "Show Section"}
                  >
                    {isVisible ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>
                </div>
              </div>

              {/* Expandable Per-Section Background Customizer Drawer */}
              {isPanelOpen && (
                <div className="p-4 rounded-xl border border-amber-300 bg-amber-50/20 shadow-inner space-y-4 text-xs transition-all animate-fadeIn">
                  <div className="flex items-center justify-between pb-1 border-b border-stone-200">
                    <span className="font-bold text-stone-900 flex items-center gap-1.5">
                      <Paintbrush size={13} className="text-amber-800" />
                      <span>Background for {getLabel(secId)}</span>
                    </span>
                    {hasCustomBg && (
                      <button
                        type="button"
                        onClick={() => resetSecBg(secId)}
                        className="text-[11px] text-amber-800 hover:text-amber-950 font-medium flex items-center gap-1 cursor-pointer"
                      >
                        <RotateCcw size={11} />
                        <span>Reset to Default</span>
                      </button>
                    )}
                  </div>

                  {/* Mode Tabs */}
                  <div className="grid grid-cols-4 gap-1 p-1 bg-stone-100 rounded-lg border border-stone-200 text-center">
                    {[
                      { id: "default", label: "Default" },
                      { id: "color", label: "Solid Color" },
                      { id: "gradient", label: "Gradient" },
                      { id: "image", label: "Image URL" },
                    ].map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => updateSecBg(secId, { type: m.id })}
                        className={`py-1 rounded text-[11px] font-semibold transition cursor-pointer ${
                          secBg.type === m.id ||
                          (!secBg.type && m.id === "default")
                            ? "bg-white text-amber-900 shadow-xs"
                            : "text-stone-600 hover:text-stone-900"
                        }`}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>

                  {/* Mode 1: Solid Color */}
                  {secBg.type === "color" && (
                    <div className="space-y-3">
                      <div>
                        <label className="text-[11px] font-semibold text-stone-700 block mb-1">
                          Pick Color
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={secBg.color || "#fdfbf7"}
                            onChange={(e) =>
                              updateSecBg(secId, { color: e.target.value })
                            }
                            className="w-10 h-8 rounded border border-stone-300 cursor-pointer"
                          />
                          <input
                            type="text"
                            value={secBg.color || "#fdfbf7"}
                            onChange={(e) =>
                              updateSecBg(secId, { color: e.target.value })
                            }
                            className="flex-1 rounded-md border border-stone-300 px-2.5 py-1 text-xs font-mono"
                          />
                        </div>
                      </div>

                      <div>
                        <span className="text-[11px] font-semibold text-stone-600 block mb-1.5">
                          Royal Indian Palette Presets
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {SOLID_PRESETS.map((p) => (
                            <button
                              key={p.name}
                              type="button"
                              onClick={() =>
                                updateSecBg(secId, { color: p.color })
                              }
                              className={`flex items-center gap-1.5 px-2 py-1 rounded-md border text-[10px] font-medium transition cursor-pointer ${
                                secBg.color === p.color
                                  ? "border-amber-800 ring-2 ring-amber-700/30 font-bold"
                                  : "border-stone-200 bg-white hover:border-stone-400"
                              }`}
                            >
                              <span
                                className="w-3 h-3 rounded-full border border-black/15 shrink-0"
                                style={{ backgroundColor: p.color }}
                              />
                              <span className="text-stone-800">{p.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Mode 2: Gradient */}
                  {secBg.type === "gradient" && (
                    <div className="space-y-3">
                      <div>
                        <span className="text-[11px] font-semibold text-stone-700 block mb-1.5">
                          Royal Preset Gradients
                        </span>
                        <div className="grid grid-cols-1 gap-1.5">
                          {GRADIENT_PRESETS.map((g) => (
                            <button
                              key={g.name}
                              type="button"
                              onClick={() =>
                                updateSecBg(secId, { gradient: g.gradient })
                              }
                              className={`w-full p-2 rounded-lg border text-left transition flex items-center justify-between cursor-pointer ${
                                secBg.gradient === g.gradient
                                  ? "border-amber-800 ring-2 ring-amber-700/30 shadow-xs"
                                  : "border-stone-200 hover:border-stone-400 bg-white"
                              }`}
                            >
                              <span className="font-medium text-stone-800">
                                {g.name}
                              </span>
                              <div
                                className="w-20 h-5 rounded border border-stone-300 shadow-inner"
                                style={{ background: g.gradient }}
                              />
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Custom Gradient Builder */}
                      <div className="pt-2 border-t border-stone-200 space-y-2">
                        <span className="text-[11px] font-semibold text-stone-700 flex items-center gap-1">
                          <Sparkles size={12} className="text-amber-800" />
                          <span>Custom Gradient Builder</span>
                        </span>
                        <div className="grid grid-cols-3 gap-2">
                          <div>
                            <label className="text-[10px] text-stone-500 block mb-0.5">
                              Start
                            </label>
                            <input
                              type="color"
                              value={customGradC1}
                              onChange={(e) => {
                                setCustomGradC1(e.target.value);
                                updateSecBg(secId, {
                                  gradient: `linear-gradient(${customGradDir}, ${e.target.value} 0%, ${customGradC2} 100%)`,
                                });
                              }}
                              className="w-full h-8 rounded border border-stone-300 cursor-pointer"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] text-stone-500 block mb-0.5">
                              End
                            </label>
                            <input
                              type="color"
                              value={customGradC2}
                              onChange={(e) => {
                                setCustomGradC2(e.target.value);
                                updateSecBg(secId, {
                                  gradient: `linear-gradient(${customGradDir}, ${customGradC1} 0%, ${e.target.value} 100%)`,
                                });
                              }}
                              className="w-full h-8 rounded border border-stone-300 cursor-pointer"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] text-stone-500 block mb-0.5">
                              Angle
                            </label>
                            <select
                              value={customGradDir}
                              onChange={(e) => {
                                setCustomGradDir(e.target.value);
                                updateSecBg(secId, {
                                  gradient: `linear-gradient(${e.target.value}, ${customGradC1} 0%, ${customGradC2} 100%)`,
                                });
                              }}
                              className="w-full h-8 rounded border border-stone-300 text-xs px-1 bg-white"
                            >
                              <option value="180deg">
                                Vertical (Top-Down)
                              </option>
                              <option value="135deg">Diagonal (135°)</option>
                              <option value="90deg">
                                Horizontal (Left-Right)
                              </option>
                              <option value="circle">
                                Radial (Center Out)
                              </option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Mode 3: Image URL */}
                  {secBg.type === "image" && (
                    <div className="space-y-3">
                      <div>
                        <label className="text-[11px] font-semibold text-stone-700 block mb-1">
                          Background Image URL
                        </label>
                        <input
                          type="text"
                          value={secBg.imageUrl || ""}
                          placeholder="https://... (Indian wedding image)"
                          onChange={(e) =>
                            updateSecBg(secId, { imageUrl: e.target.value })
                          }
                          className="w-full rounded-md border border-stone-300 px-3 py-1.5 text-xs text-stone-900 bg-white"
                        />
                      </div>

                      <div>
                        <span className="text-[11px] font-semibold text-stone-600 block mb-1.5">
                          Authentic Indian Wedding Textures
                        </span>
                        <div className="grid grid-cols-1 gap-1.5">
                          {INDIAN_BG_IMAGES.map((img) => (
                            <button
                              key={img.name}
                              type="button"
                              onClick={() =>
                                updateSecBg(secId, { imageUrl: img.url })
                              }
                              className="p-1.5 rounded-lg border border-stone-200 hover:border-amber-700 bg-white flex items-center gap-2 text-left transition cursor-pointer"
                            >
                              <div
                                className="w-10 h-10 rounded-md bg-cover bg-center shrink-0 border border-stone-200"
                                style={{ backgroundImage: `url(${img.url})` }}
                              />
                              <span className="font-medium text-stone-800 text-[11px]">
                                {img.name}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Readability Overlay Slider */}
                      <div className="pt-2 border-t border-stone-200 space-y-1.5">
                        <div className="flex justify-between items-center text-[11px]">
                          <span className="font-semibold text-stone-700">
                            Light Overlay Tint
                          </span>
                          <span className="text-stone-500 font-mono">
                            {Math.round(
                              (secBg.overlayOpacity !== undefined
                                ? secBg.overlayOpacity
                                : 0.85) * 100,
                            )}
                            %
                          </span>
                        </div>
                        <input
                          type="range"
                          min="0.1"
                          max="0.95"
                          step="0.05"
                          value={
                            secBg.overlayOpacity !== undefined
                              ? secBg.overlayOpacity
                              : 0.85
                          }
                          onChange={(e) =>
                            updateSecBg(secId, {
                              overlayOpacity: parseFloat(e.target.value),
                            })
                          }
                          className="w-full accent-amber-800 cursor-pointer"
                        />
                        <p className="text-[10px] text-stone-500 leading-tight">
                          Higher overlay ensures names, invitations, and dates
                          stay clear & readable over the photo.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Mode 4: Default */}
                  {(!secBg.type || secBg.type === "default") && (
                    <p className="text-stone-500 text-[11px] italic">
                      Using the royal ivory and gold foil theme background.
                      Select Solid Color, Gradient, or Image URL above to
                      customize.
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
