import { Calendar, MapPin, Download, Sparkles, Clock, Compass } from 'lucide-react';
import EditableText from '../EditableText';
import { SectionShell, Divider } from './Shared';
import { getGoogleCalendarUrl, downloadIcsFile } from '../../lib/calendar';

const EVENT_THEME_CONFIGS = {
  haldi: {
    badge: 'Auspicious Haldi',
    accent: '#9e6200',
    cardBorder: '#d4af37',
    bgTint: 'linear-gradient(180deg, #fffcf5 0%, #fff9e8 50%, #fff3d6 100%)',
    motif: '☀️ ✦ MANGAL SNANAM ✦ ☀️',
    dressCodeDefault: 'Attire: Sunshine Yellow & Festive Florals',
  },
  mehendi: {
    badge: 'Henna & Music',
    accent: '#185c45',
    cardBorder: '#2c8567',
    bgTint: 'linear-gradient(180deg, #f9fdfb 0%, #eff8f3 50%, #e3f3ea 100%)',
    motif: '🌿 ✦ HENNA SYMPHONY ✦ 🌿',
    dressCodeDefault: 'Attire: Henna Green, Teal & Festive Pastel',
  },
  sangeet: {
    badge: 'Dhol, Beats & Dance',
    accent: '#2d2559',
    cardBorder: '#c49a45',
    bgTint: 'linear-gradient(180deg, #faf8fd 0%, #f3edf9 50%, #eae0f5 100%)',
    motif: '✨ ✦ SANGEET & COCKTAIL ✦ ✨',
    dressCodeDefault: 'Attire: Glamorous Indo-Western & Evening Sparkle',
  },
  baraat: {
    badge: 'Royal Procession',
    accent: '#9e3805',
    cardBorder: '#d4af37',
    bgTint: 'linear-gradient(180deg, #fffbf7 0%, #fef3ea 50%, #fde6d8 100%)',
    motif: '🎺 ✦ BARAAT SWAGAT ✦ 🎺',
    dressCodeDefault: 'Attire: Royal Safa, Turbans & Festive Ethnic',
  },
  wedding: {
    badge: 'Sacred Vivah Sanskar',
    accent: '#661424',
    cardBorder: '#b8860b',
    bgTint: 'linear-gradient(180deg, #fffdfa 0%, #fdf2f4 50%, #fce5e9 100%)',
    motif: '🌸 ✦ SACRED VIVAH SANSKAR ✦ 🌸',
    dressCodeDefault: 'Attire: Traditional Royal Sherwani & Silk Lehenga',
  },
  reception: {
    badge: 'The Grand Celebration',
    accent: '#6e4c12',
    cardBorder: '#c49a45',
    bgTint: 'linear-gradient(180deg, #fffef9 0%, #fbf5e6 50%, #f5e9ce 100%)',
    motif: '🥂 ✦ IMPERIAL GALA RECEPTION ✦ 🥂',
    dressCodeDefault: 'Attire: Black Tie, Tuxedo & Royal Formal',
  },
};

export default function EventSection({ eventKey, eventData, data, update, anim }) {
  const theme = data.theme || {};
  const ev = eventData || {};
  const couple = `${data.hero?.groomName || 'Anmol'} & ${data.hero?.brideName || 'Radhika'}`;

  // Find theme configuration based on eventKey or fallback
  const configKey = Object.keys(EVENT_THEME_CONFIGS).find((k) => eventKey?.toLowerCase().includes(k)) || 'wedding';
  const cfg = EVENT_THEME_CONFIGS[configKey];

  const gold = theme.primary || '#b8860b';
  const accentColor = ev.accent || cfg.accent || theme.accent || '#4a1525';
  const cardBorder = ev.cardBorder || cfg.cardBorder || gold;
  const bgTint = ev.bgTint || cfg.bgTint || '#ffffff';
  const motifText = ev.motif || cfg.motif || '✦ SACRED CELEBRATION ✦';

  const setEv = (patch) => {
    update('separateEvents', {
      ...(data.separateEvents || {}),
      [eventKey]: { ...ev, ...patch },
    });
  };

  const googleCalUrl = getGoogleCalendarUrl(ev, couple);

  return (
    <SectionShell data={data} sectionKey={eventKey} sectionAnim={anim?.schedule || 'fade-up'}>
      <div className="flex flex-col items-center justify-center text-center px-3 sm:px-6 py-10 sm:py-16 max-w-xl mx-auto w-full">
        {/* Standalone Royal Card Container */}
        <div
          className="relative w-full rounded-[30px] border-2 shadow-xl p-5 sm:p-9 text-center transition-all overflow-hidden"
          style={{
            borderColor: cardBorder,
            background: bgTint,
            boxShadow: `0 16px 36px -8px rgba(74, 21, 37, 0.12), 0 0 0 1px rgba(184, 134, 11, 0.2)`,
          }}
        >
          {/* Inner Dashed Border */}
          <div
            className="absolute inset-2.5 rounded-[22px] border border-dashed pointer-events-none"
            style={{ borderColor: `${cardBorder}55` }}
          />

          {/* Corner Flourishes */}
          <span className="absolute top-3 left-4 text-xs font-serif pointer-events-none select-none opacity-40" style={{ color: gold }}>
            ❧
          </span>
          <span className="absolute top-3 right-4 text-xs font-serif pointer-events-none select-none opacity-40" style={{ color: gold }}>
            ☙
          </span>
          <span className="absolute bottom-3 left-4 text-xs font-serif pointer-events-none select-none opacity-40" style={{ color: gold }}>
            ❧
          </span>
          <span className="absolute bottom-3 right-4 text-xs font-serif pointer-events-none select-none opacity-40" style={{ color: gold }}>
            ☙
          </span>

          {/* Top Scalloped Arch Accent */}
          <div
            className="w-full h-3 absolute top-0 left-0 right-0"
            style={{
              background: `linear-gradient(90deg, #946914 0%, ${gold} 50%, #946914 100%)`,
            }}
          />

          {/* Ceremony Auspicious Motif */}
          <div className="pt-2 text-[10px] sm:text-[11px] font-semibold tracking-[0.25em] uppercase" style={{ color: gold }}>
            {motifText}
          </div>

          {/* Event Badge / Auspicious Tag */}
          <div className="pt-2">
            <span
              className="inline-block px-3.5 py-1 rounded-full text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-bold border shadow-xs"
              style={{
                borderColor: `${accentColor}40`,
                backgroundColor: '#ffffff',
                color: accentColor,
              }}
            >
              <EditableText
                value={ev.badge || cfg.badge}
                onChange={(v) => setEv({ badge: v })}
              />
            </span>
          </div>

          {/* Event Ceremony Title */}
          <h2
            className="mt-3 text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide"
            style={{ fontFamily: theme.displayFont, color: accentColor }}
          >
            <EditableText
              value={ev.name || 'Ceremony'}
              onChange={(v) => setEv({ name: v })}
            />
          </h2>

          <p
            className="mt-1.5 text-xs sm:text-sm italic font-serif opacity-85 px-3 max-w-md mx-auto"
            style={{ color: accentColor }}
          >
            <EditableText
              value={ev.subtitle || 'An auspicious celebration with family & friends'}
              onChange={(v) => setEv({ subtitle: v })}
              multiline
            />
          </p>

          <Divider color={gold} />

          {/* Date & Time Container */}
          <div
            className="my-3 py-3 px-5 rounded-2xl border bg-white/95 shadow-xs max-w-sm mx-auto w-full space-y-1"
            style={{ borderColor: `${gold}40` }}
          >
            <div className="flex items-center justify-center gap-1.5 text-[11px] sm:text-xs uppercase tracking-[0.16em] font-bold" style={{ color: gold }}>
              <Clock size={12} />
              <EditableText value={ev.date || '20th November, 2026'} onChange={(v) => setEv({ date: v })} />
            </div>
            <div
              className="text-lg sm:text-xl font-bold tracking-wide pt-0.5"
              style={{ fontFamily: theme.displayFont, color: accentColor }}
            >
              <EditableText value={ev.time || '7:00 PM Onwards'} onChange={(v) => setEv({ time: v })} />
            </div>
          </div>

          {/* Venue & Location Details */}
          <div className="mt-3 pt-2.5 border-t w-full space-y-1" style={{ borderColor: `${gold}25` }}>
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold" style={{ color: gold }}>
              <EditableText value={ev.venueLabel || 'Celebration Venue'} onChange={(v) => setEv({ venueLabel: v })} />
            </p>
            <p
              className="text-base sm:text-lg font-bold"
              style={{ fontFamily: theme.displayFont, color: accentColor }}
            >
              <EditableText value={ev.venue || 'The Royal Palace Pavilion'} onChange={(v) => setEv({ venue: v })} />
            </p>
            <p className="text-xs opacity-85" style={{ color: accentColor }}>
              <EditableText value={ev.location || 'Bagha Purana, Punjab'} onChange={(v) => setEv({ location: v })} />
            </p>

            {/* Dress Code Badge */}
            <div className="pt-2">
              <span
                className="inline-block px-3 py-1 rounded-full text-[10px] font-medium tracking-wide bg-white border"
                style={{ borderColor: `${gold}40`, color: accentColor }}
              >
                <EditableText
                  value={ev.dressCode || cfg.dressCodeDefault}
                  onChange={(v) => setEv({ dressCode: v })}
                />
              </span>
            </div>
          </div>

          {/* Interactive Action Buttons */}
          <div className="mt-5 pt-3.5 border-t w-full flex flex-wrap items-center justify-center gap-2" style={{ borderColor: `${gold}25` }}>
            <a
              href={googleCalUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-bold border transition hover:scale-105 active:scale-95 shadow-xs"
              style={{
                borderColor: `${gold}66`,
                backgroundColor: '#ffffff',
                color: accentColor,
              }}
              title="Add to Google Calendar"
            >
              <Calendar size={12} style={{ color: gold }} />
              <span>Google Cal</span>
            </a>

            <button
              type="button"
              onClick={() => downloadIcsFile(ev, couple)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-bold border transition hover:scale-105 active:scale-95 cursor-pointer shadow-xs"
              style={{
                borderColor: `${gold}66`,
                backgroundColor: '#ffffff',
                color: accentColor,
              }}
              title="Download Apple / Outlook .ICS Calendar File"
            >
              <Download size={12} style={{ color: gold }} />
              <span>.ICS File</span>
            </button>

            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(`${ev.venue || ''} ${ev.location || ''}`)}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-bold transition hover:scale-105 active:scale-95 shadow-md"
              style={{
                background: `linear-gradient(135deg, ${gold}, #8c6507)`,
                color: '#ffffff',
              }}
              title="View on Google Maps"
            >
              <MapPin size={12} />
              <span>Directions</span>
            </a>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
