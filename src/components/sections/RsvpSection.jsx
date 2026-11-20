import { useState } from 'react';
import EditableText from '../EditableText';
import AnimatedText from '../AnimatedText';
import { SectionShell, Divider } from './Shared';
import { saveRsvpResponse } from '../../lib/storage';
import { CheckCircle2, Heart } from 'lucide-react';

export default function RsvpSection({ data, update, anim }) {
  const r = data.rsvp || {};
  const theme = data.theme || {};
  const set = (patch) => update('rsvp', patch);
  const titleAnim = anim?.sectionTitle || 'none';
  const gold = theme.primary || '#b8860b';
  const maroon = theme.accent || '#4a1525';

  const [name, setName] = useState('');
  const [guests, setGuests] = useState('1');
  const [wishes, setWishes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return;

    saveRsvpResponse(data.slug || 'default', {
      name,
      guests,
      wishes,
    });
    setSubmitted(true);
  }

  return (
    <SectionShell data={data} sectionKey="rsvp" sectionAnim={anim?.rsvp || 'blur-in'} bgImage={r.bgImage}>
      <div className="flex flex-col items-center text-center px-4 sm:px-6 py-12 sm:py-20 max-w-xl mx-auto w-full">
        <p className="text-[10px] sm:text-xs font-semibold tracking-[0.35em] uppercase" style={{ color: gold }}>
          R E S P O N D
        </p>
        <h2
          className="font-cinzel mt-2 text-2xl sm:text-4xl font-semibold tracking-wider uppercase"
          style={{ color: maroon }}
        >
          <EditableText value={r.heading || 'RSVP'} onChange={(v) => set({ heading: v })} />
        </h2>
        <p className="mt-1 text-xs sm:text-sm max-w-md opacity-85" style={{ color: maroon }}>
          <EditableText value={r.subtitle || 'Celebrate this new chapter of love with us.'} onChange={(v) => set({ subtitle: v })} multiline />
        </p>
        <Divider color={gold} />

        <p
          className="font-cinzel text-xl sm:text-2xl font-bold tracking-widest mt-2 uppercase"
          style={{ color: gold }}
        >
          <EditableText
            value={r.coupleLine || `${data.hero?.groomName || 'Anmol'} & ${data.hero?.brideName || 'Radhika'}`}
            onChange={(v) => set({ coupleLine: v })}
          />
        </p>

        {/* RSVP Card Form in Pristine Fine Paper Card */}
        <div
          className="mt-6 w-full max-w-md p-6 sm:p-8 rounded-3xl border bg-white/94 backdrop-blur-md shadow-2xl"
          style={{
            borderColor: `${gold}55`,
            boxShadow: '0 20px 45px -10px rgba(30, 41, 59, 0.15), 0 0 0 1px rgba(184, 134, 11, 0.2)',
          }}
        >
          {submitted ? (
            <div className="py-6 flex flex-col items-center text-center space-y-3">
              <CheckCircle2 size={44} style={{ color: gold }} className="animate-bounce" />
              <h4 className="text-xl font-serif font-semibold" style={{ color: maroon, fontFamily: theme.displayFont }}>
                Thank You, {name}!
              </h4>
              <p className="text-xs sm:text-sm" style={{ color: maroon, opacity: 0.85 }}>
                Your response has been saved. We look forward to celebrating our special day together!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-semibold mb-1" style={{ color: maroon }}>
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition focus:border-amber-600 bg-stone-50/50"
                  style={{
                    borderColor: `${gold}44`,
                    color: maroon,
                  }}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1" style={{ color: maroon }}>
                    Guests
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    placeholder="1"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition focus:border-amber-600 bg-stone-50/50"
                    style={{
                      borderColor: `${gold}44`,
                      color: maroon,
                    }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1" style={{ color: maroon }}>
                    Attending?
                  </label>
                  <select
                    className="w-full px-3 py-2.5 rounded-lg border text-xs outline-none cursor-pointer bg-stone-50/50"
                    style={{
                      borderColor: `${gold}44`,
                      color: maroon,
                    }}
                  >
                    <option value="yes">Joyfully Accepts</option>
                    <option value="regret">Regretfully Declines</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1" style={{ color: maroon }}>
                  Blessings & Wishes (Optional)
                </label>
                <input
                  type="text"
                  placeholder="Share a sweet wish for the couple"
                  value={wishes}
                  onChange={(e) => setWishes(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition focus:border-amber-600 bg-stone-50/50"
                  style={{
                    borderColor: `${gold}44`,
                    color: maroon,
                  }}
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 mt-2 rounded-full uppercase tracking-widest text-xs font-bold transition shadow-md hover:scale-[1.02] active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                style={{
                  background: `linear-gradient(135deg, ${gold}, #8c6507)`,
                  color: '#ffffff',
                  boxShadow: '0 4px 15px rgba(184, 134, 11, 0.3)',
                }}
              >
                <Heart size={14} className="fill-current" />
                <span>Confirm RSVP ✦</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </SectionShell>
  );
}
