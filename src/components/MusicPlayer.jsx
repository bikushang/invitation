import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

export default function MusicPlayer({ music = {}, theme = {} }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const synthRef = useRef(null);
  const gold = theme.primary || '#b8860b';
  const maroon = theme.accent || '#4a1525';

  if (!music.enabled) return null;

  function togglePlay() {
    if (isPlaying) {
      stopAudio();
      setIsPlaying(false);
    } else {
      startAudio();
      setIsPlaying(true);
    }
  }

  function startAudio() {
    if (music.customUrl) {
      if (!audioRef.current) {
        audioRef.current = new Audio(music.customUrl);
        audioRef.current.loop = true;
      }
      audioRef.current.play().catch(() => {});
      return;
    }

    // Peaceful Indian Wedding Shehnai & Sitar Harmony (Yaman/Bhairavi pentatonic scale)
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      synthRef.current = ctx;

      const scale = [261.63, 293.66, 329.63, 369.99, 392.0, 440.0, 493.88, 523.25];

      const timer = setInterval(() => {
        if (!synthRef.current) {
          clearInterval(timer);
          return;
        }
        const freq = scale[Math.floor(Math.random() * scale.length)];
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.07, ctx.currentTime + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.8);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 1.9);
      }, 700);

      synthRef.current._timer = timer;
    } catch (e) {}
  }

  function stopAudio() {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    if (synthRef.current) {
      if (synthRef.current._timer) clearInterval(synthRef.current._timer);
      synthRef.current.close().catch(() => {});
      synthRef.current = null;
    }
  }

  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-40">
      <button
        onClick={togglePlay}
        className="group relative flex items-center gap-2 px-3.5 py-2.5 rounded-full border shadow-xl bg-white transition-all duration-300 hover:scale-105 cursor-pointer"
        style={{
          borderColor: `${gold}88`,
          color: maroon,
          boxShadow: '0 8px 25px -4px rgba(74, 21, 37, 0.18)',
        }}
        title={isPlaying ? 'Pause Wedding Music' : 'Play Wedding Music'}
      >
        <span className={`p-1.5 rounded-full text-white ${isPlaying ? 'animate-spin' : ''}`} style={{ background: gold }}>
          <Music size={13} />
        </span>
        <span className="text-xs font-semibold pr-1" style={{ color: maroon }}>
          {isPlaying ? <Volume2 size={15} /> : <VolumeX size={15} />}
        </span>
      </button>
    </div>
  );
}
