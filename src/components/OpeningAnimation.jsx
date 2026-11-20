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
      className={`w-full min-h-[85vh] sm:min-h-screen flex items-center justify-center p-4 sm:p-8 transition-all duration-700 ${
        opening ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
      }`}
      style={{
        background: 'linear-gradient(150deg, #fdfbf7 0%, #f7f0e3 50%, #eee3ce 100%)',
      }}
    >
      {/* Royal Ivory & Gold Envelope Card */}
      <div
        className="relative w-full max-w-[430px] rounded-3xl shadow-2xl border-2 bg-white flex flex-col justify-between p-6 sm:p-10 text-center transition-all"
        style={{
          borderColor: goldColor,
          backgroundImage: 'radial-gradient(circle at 50% 15%, rgba(184,134,11,0.06) 0%, transparent 60%)',
          boxShadow: '0 25px 60px -12px rgba(74, 21, 37, 0.2), 0 0 0 1px rgba(184, 134, 11, 0.3)',
        }}
      >
        {/* Double Ornate Gold Frame Border */}
        <div
          className="absolute inset-3 rounded-2xl border border-dashed pointer-events-none"
          style={{ borderColor: `${goldColor}55` }}
        />
        <div
          className="absolute inset-4 rounded-xl border pointer-events-none"
          style={{ borderColor: `${goldColor}33` }}
        />

        {/* Top Header Section */}
        <div className="relative z-10 pt-1">
          <div className="text-2xl sm:text-3xl font-serif mb-1" style={{ color: goldColor }}>
            ॐ
          </div>
          <span
            className="text-[11px] sm:text-xs tracking-[0.28em] uppercase font-bold"
            style={{ color: goldColor }}
          >
            {title}
          </span>
          <p
            className="mt-1.5 text-xs sm:text-sm italic px-2 font-serif"
            style={{ color: maroonColor, fontFamily: theme.displayFont }}
          >
            {subtitle}
          </p>
        </div>

        {/* Center Couple Names & Monogram */}
        <div className="relative z-10 my-6 py-2">
          <div
            className="text-4xl sm:text-5xl font-normal leading-tight"
            style={{ fontFamily: "'Great Vibes', cursive", color: maroonColor }}
          >
            {groom}
          </div>
          <div className="flex items-center justify-center gap-3 my-1.5">
            <span className="h-px w-10 sm:w-14 bg-amber-600/40" />
            <span
              className="text-xs sm:text-sm uppercase tracking-widest font-serif font-bold"
              style={{ color: goldColor }}
            >
              weds
            </span>
            <span className="h-px w-10 sm:w-14 bg-amber-600/40" />
          </div>
          <div
            className="text-4xl sm:text-5xl font-normal leading-tight"
            style={{ fontFamily: "'Great Vibes', cursive", color: maroonColor }}
          >
            {bride}
          </div>

          <div
            className="mt-3.5 text-xs tracking-[0.25em] uppercase font-bold"
            style={{ color: goldColor }}
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
        <div className="relative z-20 pb-1 flex flex-col items-center gap-4">
          {/* Royal Wax Seal (Clickable) */}
          <button
            type="button"
            onClick={handleOpen}
            className="group cursor-pointer focus:outline-none transition-transform hover:scale-105 active:scale-95"
            title="Click to Open Invitation"
          >
            <div
              className="w-20 h-20 sm:w-22 sm:h-22 rounded-full flex items-center justify-center seal-pulse shadow-xl"
              style={{
                background: 'radial-gradient(circle at 35% 35%, #7a1f33 0%, #4a1525 70%, #2e0915 100%)',
                border: `2px solid ${goldColor}`,
              }}
            >
              <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full border border-yellow-300/40 flex flex-col items-center justify-center text-center shadow-inner">
                <span
                  className="text-base sm:text-lg font-bold tracking-wider"
                  style={{ fontFamily: "'Playfair Display', serif", color: '#fbf5e8' }}
                >
                  {waxText}
                </span>
                <Sparkles size={11} className="text-amber-300 mt-0.5 animate-spin" />
              </div>
            </div>
          </button>

          {/* Prominent Golden Button */}
          <button
            type="button"
            onClick={handleOpen}
            className="w-full max-w-[260px] py-3 px-6 rounded-full text-xs font-bold tracking-widest uppercase shadow-md transition-all transform hover:scale-105 hover:shadow-lg active:scale-95 cursor-pointer flex items-center justify-center gap-2"
            style={{
              background: `linear-gradient(135deg, ${goldColor}, #8c6507)`,
              color: '#ffffff',
              boxShadow: '0 4px 15px rgba(184, 134, 11, 0.35)',
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
