import { MapPin, Navigation } from "lucide-react";
import EditableText from "../EditableText";
import AnimatedText from "../AnimatedText";
import { SectionShell, Divider } from "./Shared";

export default function VenueMapSection({ data, update, anim }) {
  const v = data.venue || {};
  const theme = data.theme || {};
  const gold = theme.primary || "#b8860b";
  const maroon = theme.accent || "#1e293b";

  const set = (patch) => update("venue", patch);

  return (
    <SectionShell
      data={data}
      sectionKey="venue"
      sectionAnim={anim?.venue || "fade-up"}
    >
      <div className="flex flex-col items-center text-center px-4 sm:px-6 py-12 sm:py-20 max-w-2xl mx-auto w-full">
        <p
          className="text-[10px] sm:text-xs font-semibold tracking-[0.35em] uppercase"
          style={{ color: gold }}
        >
          L O C A T I O N
        </p>
        <h2
          className="font-cinzel mt-2 text-2xl sm:text-4xl font-semibold tracking-wider uppercase"
          style={{ color: maroon }}
        >
          <EditableText
            value={v.heading || "Venue & Celebrations"}
            onChange={(val) => set({ heading: val })}
          />
        </h2>
        <p
          className="mt-1 text-xs md:text-sm tracking-widest uppercase font-semibold"
          style={{ color: gold }}
        >
          <EditableText
            value={v.subtitle || "We look forward to welcoming you"}
            onChange={(val) => set({ subtitle: val })}
          />
        </p>

        <Divider color={gold} />

        {/* Venue Info Card */}
        <div
          className="mt-4 max-w-lg w-full rounded-3xl p-6 sm:p-10 border bg-white/94 backdrop-blur-md shadow-2xl text-center"
          style={{
            borderColor: `${gold}55`,
            boxShadow:
              "0 20px 45px -10px rgba(30, 41, 59, 0.15), 0 0 0 1px rgba(184, 134, 11, 0.2)",
          }}
        >
          <div
            className="inline-flex p-3 rounded-full mb-3 border bg-amber-50"
            style={{ borderColor: `${gold}66`, color: gold }}
          >
            <MapPin size={26} />
          </div>

          <h3
            className="text-xl sm:text-2xl font-serif font-bold tracking-wide"
            style={{ color: maroon }}
          >
            <EditableText
              value={v.name || "Sky Lark Royal Resort"}
              onChange={(val) => set({ name: val })}
            />
          </h3>

          <p
            className="mt-2 text-xs sm:text-sm leading-relaxed font-serif"
            style={{ color: maroon, opacity: 0.9 }}
          >
            <EditableText
              value={v.address || "Near GT Road, Bagha Purana, Punjab 142038"}
              onChange={(val) => set({ address: val })}
            />
          </p>

          {v.notes && (
            <p
              className="mt-3 text-xs italic opacity-80 max-w-md mx-auto"
              style={{ color: maroon }}
            >
              <EditableText
                value={v.notes}
                onChange={(val) => set({ notes: val })}
                multiline
              />
            </p>
          )}

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href={v.mapLink || "https://maps.google.com"}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition shadow-md hover:scale-105 active:scale-95"
              style={{
                background: `linear-gradient(135deg, ${gold}, #8c6507)`,
                color: "#ffffff",
                boxShadow: "0 4px 15px rgba(184, 134, 11, 0.35)",
              }}
            >
              <Navigation size={14} /> Get Directions
            </a>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
