import EditableText from "../EditableText";
import AnimatedText from "../AnimatedText";
import { SectionShell, Divider } from "./Shared";

export default function FamiliesSection({ data, update, anim, isMobile }) {
  const f = data.families || {};
  const groom = f.groom || {};
  const bride = f.bride || {};
  const theme = data.theme || {};
  const set = (patch) => update("families", patch);
  const setGroom = (patch) =>
    update("families", { groom: { ...groom, ...patch } });
  const setBride = (patch) =>
    update("families", { bride: { ...bride, ...patch } });
  const titleAnim = anim?.sectionTitle || "none";
  const gold = theme.primary || "#b8860b";
  const maroon = theme.accent || "#1e293b";

  return (
    <SectionShell
      data={data}
      sectionKey="families"
      sectionAnim={anim?.families || "fade-up"}
    >
      <div className="flex flex-col items-center text-center px-4 sm:px-6 py-12 sm:py-20 max-w-3xl mx-auto w-full">
        {/* Section Header */}
        <p
          className="text-[10px] sm:text-xs font-semibold tracking-[0.35em] uppercase"
          style={{ color: gold }}
        >
          <EditableText
            value={f.intro || "I N T R O D U C I N G"}
            onChange={(v) => set({ intro: v })}
          />
        </p>
        <h2
          className="font-cinzel mt-2 text-2xl sm:text-4xl font-semibold tracking-wider uppercase"
          style={{ color: maroon }}
        >
          <EditableText
            value={f.heading || "The Families"}
            onChange={(v) => set({ heading: v })}
          />
        </h2>
        <Divider color={gold} />

        {/* Single Majestic Royal Card - Never Squished into Columns! */}
        <div
          className="relative w-full rounded-3xl p-6 sm:p-10 shadow-2xl transition-all border my-4"
          style={{
            background: "rgba(255, 255, 255, 0.94)",
            backdropFilter: "blur(8px)",
            borderColor: `${gold}55`,
            boxShadow:
              "0 20px 45px -10px rgba(30, 41, 59, 0.12), 0 0 0 1px rgba(184, 134, 11, 0.2)",
          }}
        >
          {/* Inner Dashed Border */}
          <div
            className="absolute inset-3 rounded-2xl border border-dashed pointer-events-none"
            style={{ borderColor: `${gold}40` }}
          />

          <div className="relative z-10 flex flex-col items-center">
            {/* Groom Side */}
            <div className="w-full text-center space-y-3">
              <h3
                className="font-cinzel text-xl sm:text-3xl font-bold tracking-wide"
                style={{ color: maroon }}
              >
                <EditableText
                  value={groom.label || "Groom: Anmol"}
                  onChange={(v) => setGroom({ label: v })}
                />
              </h3>

              <div className="space-y-3 pt-1">
                <div>
                  <p
                    className="text-[10px] tracking-[0.25em] uppercase font-bold"
                    style={{ color: gold }}
                  >
                    <EditableText
                      value={groom.grandparentLabel || "Grandson of"}
                      onChange={(v) => setGroom({ grandparentLabel: v })}
                    />
                  </p>
                  <p
                    className="text-sm sm:text-base font-serif font-semibold mt-0.5"
                    style={{ color: maroon }}
                  >
                    <EditableText
                      value={groom.grandparents || ""}
                      onChange={(v) => setGroom({ grandparents: v })}
                      multiline
                    />
                  </p>
                </div>

                <div>
                  <p
                    className="text-[10px] tracking-[0.25em] uppercase font-bold"
                    style={{ color: gold }}
                  >
                    <EditableText
                      value={groom.parentLabel || "Son of"}
                      onChange={(v) => setGroom({ parentLabel: v })}
                    />
                  </p>
                  <p
                    className="text-sm sm:text-base font-serif font-semibold mt-0.5"
                    style={{ color: maroon }}
                  >
                    <EditableText
                      value={groom.parents || ""}
                      onChange={(v) => setGroom({ parents: v })}
                      multiline
                    />
                  </p>
                </div>

                <div>
                  <p
                    className="text-[10px] tracking-[0.25em] uppercase font-bold"
                    style={{ color: gold }}
                  >
                    <EditableText
                      value={groom.siblingLabel || "Brother of"}
                      onChange={(v) => setGroom({ siblingLabel: v })}
                    />
                  </p>
                  <p
                    className="text-sm sm:text-base font-serif font-semibold mt-0.5"
                    style={{ color: maroon }}
                  >
                    <EditableText
                      value={groom.siblings || ""}
                      onChange={(v) => setGroom({ siblings: v })}
                      multiline
                    />
                  </p>
                </div>
              </div>
            </div>

            {/* Central Monogram Crest Divider */}
            <div className="my-6 flex items-center justify-center gap-3 w-full max-w-xs">
              <span
                className="h-px flex-1"
                style={{
                  background: `linear-gradient(90deg, transparent, ${gold})`,
                }}
              />
              <div
                className="w-11 h-11 rounded-full border flex items-center justify-center bg-white shadow-xs font-cinzel font-bold text-sm"
                style={{ borderColor: gold, color: maroon }}
              >
                {data.hero?.monogram || "A & R"}
              </div>
              <span
                className="h-px flex-1"
                style={{
                  background: `linear-gradient(90deg, ${gold}, transparent)`,
                }}
              />
            </div>

            {/* Bride Side */}
            <div className="w-full text-center space-y-3">
              <h3
                className="font-cinzel text-xl sm:text-3xl font-bold tracking-wide"
                style={{ color: maroon }}
              >
                <EditableText
                  value={bride.label || "Bride: Radhika"}
                  onChange={(v) => setBride({ label: v })}
                />
              </h3>

              <div className="space-y-3 pt-1">
                <div>
                  <p
                    className="text-[10px] tracking-[0.25em] uppercase font-bold"
                    style={{ color: gold }}
                  >
                    <EditableText
                      value={bride.grandparentLabel || "Granddaughter of"}
                      onChange={(v) => setBride({ grandparentLabel: v })}
                    />
                  </p>
                  <p
                    className="text-sm sm:text-base font-serif font-semibold mt-0.5"
                    style={{ color: maroon }}
                  >
                    <EditableText
                      value={bride.grandparents || ""}
                      onChange={(v) => setBride({ grandparents: v })}
                      multiline
                    />
                  </p>
                </div>

                <div>
                  <p
                    className="text-[10px] tracking-[0.25em] uppercase font-bold"
                    style={{ color: gold }}
                  >
                    <EditableText
                      value={bride.parentLabel || "Daughter of"}
                      onChange={(v) => setBride({ parentLabel: v })}
                    />
                  </p>
                  <p
                    className="text-sm sm:text-base font-serif font-semibold mt-0.5"
                    style={{ color: maroon }}
                  >
                    <EditableText
                      value={bride.parents || ""}
                      onChange={(v) => setBride({ parents: v })}
                      multiline
                    />
                  </p>
                </div>

                <div>
                  <p
                    className="text-[10px] tracking-[0.25em] uppercase font-bold"
                    style={{ color: gold }}
                  >
                    <EditableText
                      value={bride.siblingLabel || "Sister of"}
                      onChange={(v) => setBride({ siblingLabel: v })}
                    />
                  </p>
                  <p
                    className="text-sm sm:text-base font-serif font-semibold mt-0.5"
                    style={{ color: maroon }}
                  >
                    <EditableText
                      value={bride.siblings || ""}
                      onChange={(v) => setBride({ siblings: v })}
                      multiline
                    />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Poetic Closing Blessing Line */}
        <p
          className="font-serif italic font-medium mt-4 text-sm sm:text-base max-w-lg mx-auto"
          style={{ color: gold }}
        >
          <EditableText
            value={
              f.closingLine ||
              "Raised with love, united by destiny, together forever"
            }
            onChange={(v) => set({ closingLine: v })}
            multiline
          />
        </p>
      </div>
    </SectionShell>
  );
}
