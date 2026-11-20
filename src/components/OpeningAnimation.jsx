import { useState } from 'react';
import { Sparkles } from 'lucide-react';

export default function OpeningAnimation({ data, onOpen, isOpen }) {
  const intro = data.intro || {};
  const theme = data.theme || {};
  const hero = data.hero || {};

  const [opening, setOpening] = useState(false);

  if (!intro.enabled || isOpen) return null;

  function handleOpen(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (opening) return;
    setOpening(true);

    // Play wedding chime
    try {
      playRoyalChime();
    } catch (err) {}

    setTimeout(() => {
      setOpening(false);
      if (onOpen) onOpen();
    }, 700);
  }

  function playRoyalChime() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const freqs = [523.25, 659.25, 783.99, 1046.5];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.12);
        gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.12);
        gain.gain.linearRampToValueAtTime(0.16, ctx.currentTime + idx * 0.12 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.12 + 1.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.12);
        osc.stop(ctx.currentTime + idx * 0.12 + 1.3);
      });
    } catch (e) {}
  }

  const waxText = intro.waxSealText || hero.monogram || 'A & R';
  const groom = intro.groomName || hero.groomName || 'Anmol';
  const bride = intro.brideName || hero.brideName || 'Radhika';
  const title = intro.title || 'The Royal Wedding Invitation';
  const subtitle = intro.subtitle || 'With the blessings of our elders and family';
  const dateText = intro.dateText || hero.date || '19th — 21st November, 2026';
  const btnText = intro.buttonText || '✦ Open Invitation ✦';
  const goldColor = theme.primary || '#b8860b';
  const maroonColor = theme.accent || '#4a1525';

  return (
    <div
      className={`w-full min-h-[85vh] sm:min-h-screen flex items-center justify-center p-4 sm:p-8 transition-all duration-700 relative overflow-hidden ${
        opening ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
      }`}
      style={{
        background: 'radial-gradient(ellipse at 50% 35%, #fffefb 0%, #faf5ec 55%, #f2e5ce 100%)',
      }}
    >
      {/* Delicate Royal Ivory Gold Shimmer Texture */}
      <div className="absolute inset-0 royal-ivory-pattern pointer-events-none opacity-60" />

      {/* Royal Destination Farman Envelope Card */}
      <div
        className="relative w-full max-w-[400px] rounded-3xl shadow-2xl border-2 bg-white flex flex-col justify-between p-6 sm:p-9 text-center transition-all z-10"
        style={{
          borderColor: goldColor,
          backgroundImage: 'radial-gradient(circle at 50% 12%, rgba(184, 134, 11, 0.05) 0%, transparent 70%)',
          boxShadow: '0 25px 60px -12px rgba(74, 21, 37, 0.18), 0 0 0 1px rgba(184, 134, 11, 0.35)',
        }}
      >
        {/* Ornate Gold Border & Corner Accents */}
        <div
          className="absolute inset-2.5 rounded-2xl border border-dashed pointer-events-none"
          style={{ borderColor: `${goldColor}55` }}
        />
        <span className="absolute top-3 left-4 text-xs font-serif select-none opacity-50" style={{ color: goldColor }}>❧</span>
        <span className="absolute top-3 right-4 text-xs font-serif select-none opacity-50" style={{ color: goldColor }}>☙</span>

        {/* Top Header Section */}
        <div className="relative z-10 pt-1">
          <div className="text-2xl sm:text-3xl font-serif mb-0.5" style={{ color: goldColor }}>
            {hero.auspiciousSymbol || 'ॐ'}
          </div>
          <p className="text-[10px] sm:text-[11px] font-bold tracking-[0.28em] uppercase" style={{ color: goldColor }}>
            {hero.symbolText || '|| श्री गणेशाय नमः ||'}
          </p>
          <span
            className="block text-[11px] sm:text-xs tracking-[0.25em] uppercase font-bold mt-2"
            style={{ color: maroonColor }}
          >
            {title}
          </span>
          <p
            className="mt-1 text-xs italic px-2 font-serif opacity-80"
            style={{ color: maroonColor }}
          >
            {subtitle}
          </p>
        </div>

        {/* Center Couple Names in Sweeping Imperial Serif */}
        <div className="relative z-10 my-5 py-1">
          <div
            className="font-cinzel text-3xl sm:text-4xl font-bold tracking-wider uppercase leading-tight"
            style={{ color: maroonColor }}
          >
            {groom}
          </div>
          <div className="flex items-center justify-center gap-2 my-1">
            <span className="h-px w-10 sm:w-14" style={{ background: `linear-gradient(90deg, transparent, ${goldColor})` }} />
            <span
              className="font-serif italic text-sm sm:text-base font-medium"
              style={{ color: goldColor }}
            >
              weds
            </span>
            <span className="h-px w-10 sm:w-14" style={{ background: `linear-gradient(90deg, ${goldColor}, transparent)` }} />
          </div>
          <div
            className="font-cinzel text-3xl sm:text-4xl font-bold tracking-wider uppercase leading-tight"
            style={{ color: maroonColor }}
          >
            {bride}
          </div>

          <div
            className="mt-3 inline-block px-4 py-1 rounded-full text-[11px] tracking-[0.2em] uppercase font-semibold border bg-white/80"
            style={{ borderColor: `${goldColor}55`, color: maroonColor }}
          >
            {dateText}
          </div>

          {/* Caricature on Envelope (if enabled) */}
          {data.caricature?.enabled && data.caricature?.placement === 'envelope' && data.caricature?.url && (
            <div className="mt-3 flex justify-center">
              <div
                className="w-16 h-16 rounded-full overflow-hidden border-2 shadow-xs bg-white p-0.5"
                style={{ borderColor: goldColor }}
              >
                <img
                  src={data.caricature.url}
                  alt="Caricature"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
          )}
        </div>

        {/* Interactive Wax Seal Stamp & Big Open Button */}
        <div className="relative z-20 pb-1 flex flex-col items-center gap-3.5">
          {/* Royal Wax Seal (Clickable) */}
          <button
            type="button"
            onClick={handleOpen}
            className="group cursor-pointer focus:outline-none transition-transform hover:scale-105 active:scale-95"
            title="Click to Open Invitation"
          >
            <div
              className="w-18 h-18 sm:w-20 sm:h-20 rounded-full flex items-center justify-center seal-pulse shadow-xl"
              style={{
                background: 'radial-gradient(circle at 35% 35%, #946914 0%, #b8860b 60%, #6e4c12 100%)',
                border: '2px solid #ffffff',
                boxShadow: '0 8px 25px rgba(184, 134, 11, 0.45)',
              }}
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-yellow-200/50 flex flex-col items-center justify-center text-center shadow-inner">
                <span
                  className="text-base sm:text-lg font-bold font-cinzel"
                  style={{ color: '#ffffff' }}
                >
                  {waxText}
                </span>
                <Sparkles size={11} className="text-yellow-200 mt-0.5 animate-spin" />
              </div>
            </div>
          </button>

          {/* Prominent Golden Button */}
          <button
            type="button"
            onClick={handleOpen}
            className="w-full max-w-[260px] py-3 px-6 rounded-full text-xs font-bold tracking-[0.2em] uppercase shadow-lg transition-all transform hover:scale-105 hover:shadow-xl active:scale-95 cursor-pointer flex items-center justify-center gap-2"
            style={{
              background: `linear-gradient(135deg, ${goldColor}, #8c6507)`,
              color: '#ffffff',
              boxShadow: '0 6px 20px rgba(184, 134, 11, 0.4)',
            }}
          >
            <Sparkles size={14} className="text-yellow-200" />
            <span>{btnText}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
