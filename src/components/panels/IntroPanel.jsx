import { INTRO_STYLES } from '../../lib/animations';
import { Play, Music } from 'lucide-react';

function Field({ label, children }) {
  return (
    <div>
      <label className="text-xs font-medium text-stone-600">{label}</label>
      <div className="mt-1">{children}</div>
    </div>
  );
}

function TextInput({ value, onChange, placeholder }) {
  return (
    <input
      type="text"
      value={value || ''}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-md border border-stone-300 px-3 py-2 text-sm focus:border-amber-800 focus:outline-none"
    />
  );
}

export default function IntroPanel({ data, update, onReplayIntro }) {
  const intro = data.intro || {};
  const music = data.music || {};
  const setIntro = (patch) => update('intro', { ...intro, ...patch });
  const setMusic = (patch) => update('music', { ...music, ...patch });

  return (
    <div className="space-y-6">
      {/* Show cover trigger */}
      <button
        onClick={onReplayIntro}
        className="w-full flex items-center justify-center gap-2 rounded-lg bg-amber-800 px-4 py-2.5 text-xs font-semibold text-white hover:bg-amber-900 transition shadow-sm cursor-pointer"
      >
        <Play size={14} /> Close & Preview Cover Envelope
      </button>

      {/* Cover / Envelope Config */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-stone-200 pb-2">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-800">
              Cover & Envelope Opening
            </h4>
            <p className="text-[11px] text-stone-500">Royal wedding card cover</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={intro.enabled !== false}
              onChange={(e) => setIntro({ enabled: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-stone-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-800"></div>
          </label>
        </div>

        {intro.enabled !== false && (
          <div className="space-y-4 pt-1">
            <div className="grid grid-cols-2 gap-3">
              <Field label="Wax Seal Monogram">
                <TextInput
                  value={intro.waxSealText || data.hero?.monogram || 'A & R'}
                  onChange={(v) => setIntro({ waxSealText: v })}
                  placeholder="A & R"
                />
              </Field>
              <Field label="Open Button Text">
                <TextInput
                  value={intro.buttonText || '✦ Open Invitation ✦'}
                  onChange={(v) => setIntro({ buttonText: v })}
                  placeholder="✦ Open Invitation ✦"
                />
              </Field>
            </div>

            <Field label="Cover Main Title">
              <TextInput
                value={intro.title || 'The Royal Wedding Invitation'}
                onChange={(v) => setIntro({ title: v })}
                placeholder="The Royal Wedding"
              />
            </Field>

            <Field label="Blessings & Subtitle">
              <TextInput
                value={intro.subtitle || 'With the blessings of our elders and family'}
                onChange={(v) => setIntro({ subtitle: v })}
                placeholder="With the blessings..."
              />
            </Field>

            <Field label="Date on Cover">
              <TextInput
                value={intro.dateText || data.hero?.date || '19th — 21st November, 2026'}
                onChange={(v) => setIntro({ dateText: v })}
                placeholder="Wedding Date"
              />
            </Field>
          </div>
        )}
      </div>

      {/* Background Wedding Music */}
      <div className="space-y-4 border-t border-stone-200 pt-5">
        <div className="flex items-center justify-between border-b border-stone-200 pb-2">
          <div className="flex items-center gap-2">
            <Music size={15} className="text-amber-800" />
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-800">
                Background Music
              </h4>
              <p className="text-[11px] text-stone-500">Floating audio player</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={music.enabled !== false}
              onChange={(e) => setMusic({ enabled: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-stone-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-800"></div>
          </label>
        </div>

        {music.enabled !== false && (
          <div className="space-y-3">
            <Field label="Melody Style">
              <select
                value={music.track || 'shehnai'}
                onChange={(e) => setMusic({ track: e.target.value })}
                className="w-full rounded-md border border-stone-300 px-3 py-2 text-xs focus:border-amber-800 focus:outline-none bg-white cursor-pointer"
              >
                <option value="shehnai">Royal Shehnai & Sitar Harmony (Traditional)</option>
                <option value="sitar">Acoustic Sitar & Flute Harmony</option>
                <option value="custom">Custom Audio URL (.mp3)</option>
              </select>
            </Field>

            {music.track === 'custom' && (
              <Field label="Custom MP3 Audio URL">
                <TextInput
                  value={music.customUrl}
                  onChange={(v) => setMusic({ customUrl: v })}
                  placeholder="https://example.com/wedding-audio.mp3"
                />
              </Field>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
