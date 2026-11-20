import EditableText from '../EditableText';
import { SectionShell, Divider } from './Shared';

export default function HeroSection({ data, update, anim }) {
  const h = data.hero || {};
  const theme = data.theme || {};
  const heroAnim = anim?.hero || 'fade-up';
  const gold = theme.primary || '#b8860b';
  const maroon = theme.accent || '#4a1525';

  const set = (patch) => update('hero', patch);

  return (
    <SectionShell data={data} sectionAnim={heroAnim} bgImage={h.bgImage}>
      <div className="flex flex-col items-center justify-center text-center px-4 sm:px-6 py-10 sm:py-16">
        {/* Auspicious Invocation Header */}
        <div className="mb-3">
          <span className="text-3xl sm:text-4xl font-serif font-bold" style={{ color: gold }}>
            {h.auspiciousSymbol || 'ॐ'}
          </span>
          <div className="text-[11px] sm:text-xs uppercase tracking-[0.28em] font-bold mt-1" style={{ color: gold }}>
            <EditableText
              value={h.symbolText || '|| श्री गणेशाय नमः ||'}
              onChange={(v) => set({ symbolText: v })}
            />
          </div>
        </div>

        {/* Golden Royal Monogram Crest */}
        <div
          className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 flex flex-col items-center justify-center shadow-lg my-2 seal-pulse bg-white"
          style={{
            borderColor: gold,
            boxShadow: `0 8px 25px -5px rgba(184, 134, 11, 0.25)`,
          }}
        >
          <span
            style={{
              fontFamily: "'Great Vibes', cursive",
              color: maroon,
              fontSize: '2.5rem',
              lineHeight: 1,
            }}
          >
            <EditableText
              value={h.monogram || 'A & R'}
              onChange={(v) => set({ monogram: v })}
            />
          </span>
        </div>

        {/* Subtitle */}
        <div className="mt-4" style={{ color: gold, letterSpacing: '0.3em', fontSize: '0.75rem', fontWeight: 600 }}>
          <EditableText
            value={h.subtitle || 'WE ARE GETTING MARRIED'}
            onChange={(v) => set({ subtitle: v })}
          />
        </div>

        {/* Caricature Studio Portrait (if enabled) */}
        {data.caricature?.enabled && data.caricature?.placement !== 'envelope' && data.caricature?.url && (
          <div className="my-3 flex flex-col items-center">
            <div
              className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-2 shadow-md bg-white p-1"
              style={{ borderColor: gold }}
            >
              <img
                src={data.caricature.url}
                alt="Couple Caricature"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            {data.caricature.title && (
              <span className="text-[10px] uppercase tracking-widest font-semibold mt-1" style={{ color: gold }}>
                {data.caricature.title}
              </span>
            )}
          </div>
        )}

        <Divider color={gold} />

        {/* Couple Names - Both Directly Editable and Beautiful */}
        <div className="my-2">
          <h1
            className="flex flex-wrap items-baseline justify-center gap-x-3 sm:gap-x-5"
            style={{ fontFamily: theme.displayFont }}
          >
            <span
              style={{
                fontSize: 'clamp(2.5rem, 6.5vw, 4.8rem)',
                fontWeight: 600,
                color: maroon,
                lineHeight: 1.1,
              }}
            >
              <EditableText
                value={h.groomName || 'Anmol'}
                onChange={(v) => set({ groomName: v })}
              />
            </span>
            <span
              style={{
                fontFamily: "'Great Vibes', cursive",
                color: gold,
                fontSize: 'clamp(1.8rem, 4.5vw, 3rem)',
              }}
            >
              <EditableText
                value={h.wedLabel || 'weds'}
                onChange={(v) => set({ wedLabel: v })}
              />
            </span>
            <span
              style={{
                fontSize: 'clamp(2.5rem, 6.5vw, 4.8rem)',
                fontWeight: 600,
                color: maroon,
                lineHeight: 1.1,
              }}
            >
              <EditableText
                value={h.brideName || 'Radhika'}
                onChange={(v) => set({ brideName: v })}
              />
            </span>
          </h1>
        </div>

        {/* Tagline / Save the Date */}
        <div
          className="mt-6 inline-block px-5 py-1.5 rounded-full border text-xs uppercase tracking-[0.25em] font-semibold"
          style={{
            borderColor: `${gold}66`,
            backgroundColor: '#ffffff',
            color: gold,
            boxShadow: '0 2px 10px rgba(184, 134, 11, 0.08)',
          }}
        >
          <EditableText value={h.tagline || 'Save the Date'} onChange={(v) => set({ tagline: v })} />
        </div>

        {/* Date and Location Card */}
        <div
          className="mt-6 p-4 rounded-xl border max-w-sm w-full bg-white shadow-sm"
          style={{ borderColor: `${gold}40` }}
        >
          <div
            className="text-base sm:text-lg font-semibold tracking-wide"
            style={{ fontFamily: theme.displayFont, color: maroon }}
          >
            <EditableText value={h.date || '19th — 21st November, 2026'} onChange={(v) => set({ date: v })} />
          </div>
          <div
            className="mt-1 text-xs uppercase tracking-[0.2em] font-medium"
            style={{ color: gold }}
          >
            <EditableText value={h.location || 'Bagha Purana, Punjab'} onChange={(v) => set({ location: v })} />
          </div>
        </div>

        {/* Closing Sentiment */}
        <div className="mt-8">
          <p
            style={{
              fontFamily: "'Great Vibes', cursive",
              color: gold,
              fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
            }}
          >
            <EditableText
              value={h.closingLine || 'Two Souls, One Sacred Promise'}
              onChange={(v) => set({ closingLine: v })}
            />
          </p>
        </div>
      </div>
    </SectionShell>
  );
}
