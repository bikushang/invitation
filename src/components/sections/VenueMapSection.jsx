import { MapPin, Navigation } from 'lucide-react';
import EditableText from '../EditableText';
import AnimatedText from '../AnimatedText';
import { SectionShell, Divider } from './Shared';

export default function VenueMapSection({ data, update, anim }) {
  const v = data.venue || {};
  const theme = data.theme || {};
  const titleAnim = anim?.sectionTitle || 'none';
  const gold = theme.primary || '#b8860b';
  const maroon = theme.accent || '#4a1525';

  const set = (patch) => update('venue', patch);

  return (
    <SectionShell data={data} sectionAnim={anim?.venue || 'fade-up'}>
      <div className="flex flex-col items-center text-center px-6 py-20 md:py-28">
        <AnimatedText
          as="h2"
          text={v.heading || 'Venue & Celebrations'}
          animId={titleAnim}
          style={{
            fontFamily: theme.displayFont,
            color: maroon,
            fontSize: 'clamp(1.8rem, 5vw, 3rem)',
            fontWeight: 600,
          }}
        />
        <p className="mt-2 text-xs md:text-sm uppercase tracking-widest font-semibold" style={{ color: gold }}>
          <EditableText
            value={v.subtitle || 'We look forward to welcoming you'}
            onChange={(val) => set({ subtitle: val })}
          />
        </p>

        <Divider color={gold} />

        {/* Venue Info Card */}
        <div
          className="mt-4 max-w-xl w-full rounded-2xl p-6 sm:p-10 border bg-white shadow-xl text-center"
          style={{
            borderColor: `${gold}55`,
            boxShadow: '0 15px 35px -10px rgba(74, 21, 37, 0.1), 0 0 0 1px rgba(184, 134, 11, 0.15)',
          }}
        >
          <div
            className="inline-flex p-3 rounded-full mb-4 border bg-amber-50"
            style={{ borderColor: `${gold}66`, color: gold }}
          >
            <MapPin size={30} />
          </div>

          <h3
            className="text-2xl sm:text-3xl font-semibold"
            style={{ fontFamily: theme.displayFont, color: maroon }}
          >
            <EditableText value={v.name || 'Sky Lark Royal Resort'} onChange={(val) => set({ name: val })} />
          </h3>

          <p className="mt-3 text-sm sm:text-base leading-relaxed" style={{ color: maroon, opacity: 0.9 }}>
            <EditableText value={v.address || 'Near GT Road, Bagha Purana, Punjab 142038'} onChange={(val) => set({ address: val })} />
          </p>

          {v.notes && (
            <p className="mt-4 text-xs italic opacity-75 max-w-md mx-auto" style={{ color: maroon }}>
              <EditableText value={v.notes} onChange={(val) => set({ notes: val })} multiline />
            </p>
          )}

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={v.mapLink || 'https://maps.google.com'}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition shadow-md hover:scale-105 active:scale-95"
              style={{
                background: `linear-gradient(135deg, ${gold}, #8c6507)`,
                color: '#ffffff',
                boxShadow: '0 4px 15px rgba(184, 134, 11, 0.3)',
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
