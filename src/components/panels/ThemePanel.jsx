import { THEME_PRESETS, FONT_PAIRS } from "../../lib/animations";

export default function ThemePanel({ data, update }) {
  const theme = data.theme || {};
  const setTheme = (patch) => update("theme", patch);

  return (
    <div className="space-y-6">
      {/* Light Royal Color Presets */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
          Royal Color Presets (Light & Gold)
        </h4>
        <div className="grid grid-cols-1 gap-2">
          {THEME_PRESETS.map((p) => {
            const active = theme.preset === p.id;
            return (
              <button
                key={p.id}
                onClick={() =>
                  setTheme({
                    preset: p.id,
                    primary: p.primary,
                    accent: p.accent,
                    ink: p.ink,
                    cardBg: p.cardBg,
                    overlay: p.overlay,
                    bgImage: p.bgImage || theme.bgImage,
                  })
                }
                className={`flex items-center justify-between rounded-lg border px-3 py-2 text-left transition cursor-pointer ${
                  active
                    ? "border-amber-800 bg-amber-50/50 shadow-xs font-medium"
                    : "border-stone-200 hover:border-stone-400 bg-white"
                }`}
              >
                <span className="text-xs font-medium text-stone-800">
                  {p.name}
                </span>
                <div className="flex gap-1.5 items-center">
                  <span
                    className="h-4 w-4 rounded-full border border-black/10 shadow-xs"
                    style={{ background: p.primary }}
                  />
                  <span
                    className="h-4 w-4 rounded-full border border-black/10 shadow-xs"
                    style={{ background: p.accent }}
                  />
                  <span
                    className="h-4 w-4 rounded-full border border-black/10 shadow-xs"
                    style={{ background: p.ink }}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Custom Colors */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
          Custom Color Palette
        </h4>
        <div className="grid grid-cols-1 gap-3">
          <ColorField
            label="Primary / Gold Foil"
            value={theme.primary || "#b8860b"}
            onChange={(v) => setTheme({ primary: v })}
          />
          <ColorField
            label="Accent / Royal Text"
            value={theme.accent || "#4a1525"}
            onChange={(v) => setTheme({ accent: v })}
          />
          <ColorField
            label="Background / Ivory Cream"
            value={theme.ink || "#fdfbf7"}
            onChange={(v) => setTheme({ ink: v })}
          />
        </div>
      </div>

      {/* Border Style */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
          Card Borders
        </h4>
        <div className="grid grid-cols-2 gap-2">
          {["ornate", "minimal"].map((b) => (
            <button
              key={b}
              onClick={() => setTheme({ borderStyle: b })}
              className={`p-2 rounded border text-xs capitalize transition cursor-pointer ${
                theme.borderStyle === b
                  ? "border-amber-800 bg-amber-50 text-amber-900 font-semibold"
                  : "border-stone-200 bg-white"
              }`}
            >
              {b === "ornate" ? "✦ Royal Ornate Frame" : "— Clean Minimal"}
            </button>
          ))}
        </div>
      </div>

      {/* Typography Pairs */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
          Typography Pairing
        </h4>
        <div className="grid grid-cols-1 gap-2">
          {FONT_PAIRS.map((fp) => {
            const active = theme.fontPair === fp.id;
            return (
              <button
                key={fp.id}
                onClick={() =>
                  setTheme({
                    fontPair: fp.id,
                    displayFont: fp.display,
                    bodyFont: fp.body,
                  })
                }
                className={`rounded-lg border px-3 py-2.5 text-left transition cursor-pointer ${
                  active
                    ? "border-amber-800 bg-amber-50/50 shadow-xs"
                    : "border-stone-200 hover:border-stone-400 bg-white"
                }`}
              >
                <div
                  className="text-base text-stone-900"
                  style={{ fontFamily: fp.display }}
                >
                  Anmol & Radhika
                </div>
                <div
                  className="text-[11px] text-stone-500 mt-0.5"
                  style={{ fontFamily: fp.body }}
                >
                  {fp.name}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ColorField({ label, value, onChange }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <label className="text-xs text-stone-600">{label}</label>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={value?.startsWith("#") ? value : "#b8860b"}
          onChange={(e) => onChange(e.target.value)}
          className="h-7 w-9 cursor-pointer rounded border border-stone-300 p-0.5"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-24 rounded-md border border-stone-300 px-2 py-1 text-xs focus:border-amber-800 focus:outline-none font-mono"
        />
      </div>
    </div>
  );
}
