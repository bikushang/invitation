import { Calendar, MapPin, Download } from "lucide-react";
import EditableText from "../EditableText";
import AnimatedText from "../AnimatedText";
import { SectionShell, Divider } from "./Shared";
import { getGoogleCalendarUrl, downloadIcsFile } from "../../lib/calendar";

function EventCard({ event, data, update, index }) {
  const theme = data.theme || {};
  const gold = theme.primary || "#b8860b";
  const maroon = theme.accent || "#4a1525";
  const couple = `${data.hero?.groomName || "Anmol"} & ${data.hero?.brideName || "Radhika"}`;

  const set = (patch) =>
    update(
      "events",
      data.events.map((e) => (e.id === event.id ? { ...e, ...patch } : e)),
    );

  const googleCalUrl = getGoogleCalendarUrl(event, couple);

  return (
    <div
      data-anim="fade-up"
      className="relative rounded-2xl overflow-hidden bg-white border shadow-md transition-all hover:shadow-xl w-full"
      style={{
        borderColor: `${gold}55`,
        boxShadow:
          "0 10px 30px -8px rgba(74, 21, 37, 0.1), 0 0 0 1px rgba(184, 134, 11, 0.15)",
      }}
    >
      {/* Decorative Jharokha Top Arch Motif */}
      <div
        className="w-full h-3"
        style={{
          background: `linear-gradient(90deg, #8a5a00 0%, ${gold} 50%, #8a5a00 100%)`,
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center p-6 sm:p-8">
        <p
          style={{
            color: gold,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            fontSize: "0.72rem",
            fontWeight: 600,
          }}
        >
          <EditableText
            value={event.subtitle || "Celebration"}
            onChange={(v) => set({ subtitle: v })}
            multiline
          />
        </p>

        <h3
          className="mt-2 font-bold"
          style={{
            fontFamily: theme.displayFont,
            color: maroon,
            fontSize: "clamp(1.5rem, 3vw, 2.1rem)",
          }}
        >
          <EditableText
            value={event.name || ""}
            onChange={(v) => set({ name: v })}
          />
        </h3>

        <Divider color={gold} />

        {/* Date and Time Badges */}
        <div className="space-y-1.5 my-1">
          <p
            style={{
              color: gold,
              fontSize: "0.95rem",
              letterSpacing: "0.1em",
              fontWeight: 600,
            }}
          >
            <EditableText
              value={event.date || ""}
              onChange={(v) => set({ date: v })}
            />
          </p>
          <p
            style={{
              color: maroon,
              fontSize: "1.35rem",
              fontFamily: theme.displayFont,
              fontWeight: 700,
            }}
          >
            <EditableText
              value={event.time || ""}
              onChange={(v) => set({ time: v })}
            />
          </p>
        </div>

        {/* Venue Information */}
        <div
          className="mt-4 pt-4 border-t w-full space-y-1"
          style={{
            borderColor: `${gold}30`,
            color: maroon,
            fontSize: "0.85rem",
          }}
        >
          <p
            style={{
              color: gold,
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              fontSize: "0.68rem",
              fontWeight: 600,
            }}
          >
            <EditableText
              value={event.venueLabel || "Venue"}
              onChange={(v) => set({ venueLabel: v })}
            />
          </p>
          <p
            style={{
              fontFamily: theme.displayFont,
              fontSize: "1.1rem",
              fontWeight: 600,
            }}
          >
            <EditableText
              value={event.venue || ""}
              onChange={(v) => set({ venue: v })}
            />
          </p>
          <p style={{ opacity: 0.85, fontSize: "0.85rem" }}>
            <EditableText
              value={event.location || ""}
              onChange={(v) => set({ location: v })}
            />
          </p>
        </div>

        {/* Interactive Event Action Buttons (Calendar & Map) */}
        <div
          className="mt-6 pt-4 border-t w-full flex flex-wrap items-center justify-center gap-2"
          style={{ borderColor: `${gold}20` }}
        >
          <a
            href={googleCalUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold border transition hover:scale-105 active:scale-95"
            style={{
              borderColor: `${gold}66`,
              backgroundColor: "#fffdfa",
              color: maroon,
            }}
            title="Add to Google Calendar"
          >
            <Calendar size={13} style={{ color: gold }} />
            <span>Google Cal</span>
          </a>

          <button
            type="button"
            onClick={() => downloadIcsFile(event, couple)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold border transition hover:scale-105 active:scale-95 cursor-pointer"
            style={{
              borderColor: `${gold}66`,
              backgroundColor: "#fffdfa",
              color: maroon,
            }}
            title="Download .ICS Apple / Outlook Calendar File"
          >
            <Download size={13} style={{ color: gold }} />
            <span>.ICS File</span>
          </button>

          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(`${event.venue || ""} ${event.location || ""}`)}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold transition hover:scale-105 active:scale-95 shadow-xs"
            style={{
              background: `linear-gradient(135deg, ${gold}, #8c6507)`,
              color: "#ffffff",
            }}
            title="View Location on Google Maps"
          >
            <MapPin size={13} />
            <span>Maps</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function ScheduleSection({ data, update, anim }) {
  const theme = data.theme || {};
  const titleAnim = anim?.sectionTitle || "none";
  const gold = theme.primary || "#b8860b";
  const maroon = theme.accent || "#4a1525";

  return (
    <SectionShell data={data} sectionAnim={anim?.schedule || "fade-up"}>
      <div className="flex flex-col items-center text-center px-4 sm:px-6 py-16 sm:py-24 max-w-5xl mx-auto w-full">
        <AnimatedText
          as="h2"
          text="Schedule of Celebrations"
          animId={titleAnim}
          style={{
            fontFamily: theme.displayFont,
            color: maroon,
            fontSize: "clamp(1.8rem, 5vw, 3rem)",
            fontWeight: 700,
          }}
        />
        <p
          style={{
            color: gold,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            fontSize: "0.75rem",
            fontWeight: 600,
            marginTop: 6,
          }}
        >
          Auspicious Ceremonies & Gatherings
        </p>
        <Divider color={gold} />

        {/* Responsive Events Grid: 1 column on mobile/frames, 2-3 on wider displays */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 w-full">
          {(data.events || []).map((event, i) => (
            <EventCard
              key={event.id}
              event={event}
              data={data}
              update={update}
              index={i}
            />
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
