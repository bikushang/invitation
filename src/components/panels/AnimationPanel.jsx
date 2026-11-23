import {
  SECTION_ANIMATIONS,
  TEXT_ANIMATIONS,
  SECTION_KEYS,
  PARTICLE_TYPES,
} from "../../lib/animations";
import { Play, Sparkles } from "lucide-react";

function AnimSelect({ label, value, onChange }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <label className="text-xs text-stone-600">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-md border border-stone-300 px-2 py-1.5 text-xs focus:border-stone-800 focus:outline-none bg-white"
      >
        {SECTION_ANIMATIONS.map((a) => (
          <option key={a.id} value={a.id}>
            {a.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function TextAnimSelect({ label, value, onChange }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <label className="text-xs text-stone-600">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-md border border-stone-300 px-2 py-1.5 text-xs focus:border-stone-800 focus:outline-none bg-white"
      >
        {TEXT_ANIMATIONS.map((a) => (
          <option key={a.id} value={a.id}>
            {a.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function AnimationPanel({ data, update, onReplay }) {
  const anim = data.anim || {};
  const particles = data.particles || {};
  const setAnim = (patch) => update("anim", patch);
  const setParticles = (patch) =>
    update("particles", { ...particles, ...patch });

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <button
          onClick={onReplay}
          className="flex-1 flex items-center justify-center gap-2 rounded-md bg-stone-800 px-3 py-2.5 text-xs font-semibold text-white hover:bg-stone-900 transition shadow"
        >
          <Play size={14} /> Replay All Animations
        </button>
      </div>

      {/* Floating Particles / Ambient FX */}
      <div className="border border-stone-200 rounded-lg p-3 bg-stone-50/60 space-y-3">
        <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-stone-700">
          <Sparkles size={14} className="text-amber-500" />
          <span>Floating Festive Particles</span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <label className="text-xs text-stone-600">Particle Type</label>
            <select
              value={particles.type || "petals"}
              onChange={(e) => setParticles({ type: e.target.value })}
              className="rounded-md border border-stone-300 px-2 py-1.5 text-xs focus:border-stone-800 focus:outline-none bg-white"
            >
              {PARTICLE_TYPES.map((pt) => (
                <option key={pt.id} value={pt.id}>
                  {pt.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-between gap-3">
            <label className="text-xs text-stone-600">Density</label>
            <select
              value={particles.density || "medium"}
              onChange={(e) => setParticles({ density: e.target.value })}
              className="rounded-md border border-stone-300 px-2 py-1.5 text-xs focus:border-stone-800 focus:outline-none bg-white"
            >
              <option value="low">Subtle (Low)</option>
              <option value="medium">Standard (Medium)</option>
              <option value="high">Festive (High)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Text Animation Effects */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-600 mb-3 border-b pb-1">
          Typography Animations
        </h4>
        <div className="space-y-3">
          <TextAnimSelect
            label="Hero Monogram & Titles"
            value={anim.heroTitle || "letter-reveal"}
            onChange={(v) => setAnim({ heroTitle: v })}
          />
          <TextAnimSelect
            label="Section Headings"
            value={anim.sectionTitle || "word-reveal"}
            onChange={(v) => setAnim({ sectionTitle: v })}
          />
        </div>
        <p className="mt-2 text-[11px] text-stone-400 leading-relaxed">
          Golden Stagger reveals letters one by one, Shimmer creates flowing
          gold light, and Typing writes each letter live.
        </p>
      </div>

      {/* Section Scroll Reveals */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-600 mb-3 border-b pb-1">
          Section Scroll Reveals
        </h4>
        <div className="space-y-3">
          {SECTION_KEYS.map((s) => (
            <AnimSelect
              key={s.id}
              label={s.label}
              value={anim[s.id] || "fade-up"}
              onChange={(v) => setAnim({ [s.id]: v })}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
