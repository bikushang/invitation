import { useState, useEffect } from 'react';
import EditableText from '../EditableText';
import AnimatedText from '../AnimatedText';
import { SectionShell, Divider } from './Shared';

export default function CountdownSection({ data, update, anim }) {
  const cd = data.countdown || {};
  const theme = data.theme || {};
  const titleAnim = anim?.sectionTitle || 'none';
  const targetDateStr = cd.targetDate || '2026-11-21T20:00:00';
  const gold = theme.primary || '#b8860b';
  const maroon = theme.accent || '#4a1525';

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    function calculate() {
      const target = new Date(targetDateStr).getTime();
      const now = new Date().getTime();
      const diff = Math.max(0, target - now);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    }

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [targetDateStr]);

  const set = (patch) => update('countdown', patch);

  const units = [
    { label: 'Days', val: timeLeft.days },
    { label: 'Hours', val: timeLeft.hours },
    { label: 'Minutes', val: timeLeft.minutes },
    { label: 'Seconds', val: timeLeft.seconds },
  ];

  return (
    <SectionShell data={data} sectionKey="countdown" sectionAnim={anim?.countdown || 'fade-up'}>
      <div className="flex flex-col items-center text-center px-4 sm:px-6 py-12 sm:py-20">
        <p className="text-[10px] sm:text-xs font-semibold tracking-[0.35em] uppercase" style={{ color: gold }}>
          S A V E  T H E  D A T E
        </p>
        <h2
          className="font-cinzel mt-2 text-2xl sm:text-4xl font-semibold tracking-wider uppercase"
          style={{ color: maroon }}
        >
          <EditableText
            value={cd.heading || 'Counting Down To Forever'}
            onChange={(v) => set({ heading: v })}
          />
        </h2>
        <p className="mt-1 text-xs md:text-sm max-w-md uppercase tracking-[0.2em] font-medium" style={{ color: gold }}>
          <EditableText
            value={cd.subtitle || 'Every passing second brings us closer to our forever'}
            onChange={(v) => set({ subtitle: v })}
          />
        </p>

        <Divider color={gold} />

        {/* Counter cards in Pristine Glass Cards */}
        <div className="grid grid-cols-4 countdown-grid gap-2 sm:gap-4 mt-4 max-w-md w-full">
          {units.map((u) => (
            <div
              key={u.label}
              className="flex flex-col items-center justify-center p-2.5 sm:p-4 rounded-2xl border bg-white/94 backdrop-blur-xs shadow-md transition-transform hover:-translate-y-1"
              style={{
                borderColor: `${gold}55`,
                boxShadow: '0 8px 20px -4px rgba(30, 41, 59, 0.1)',
              }}
            >
              <span
                className="text-xl sm:text-3xl md:text-4xl font-bold tabular-nums font-serif"
                style={{
                  color: maroon,
                }}
              >
                {String(u.val).padStart(2, '0')}
              </span>
              <span
                className="mt-1 text-[9px] sm:text-[10px] uppercase tracking-widest font-semibold"
                style={{ color: gold }}
              >
                {u.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
