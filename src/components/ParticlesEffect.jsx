import { useMemo } from "react";

export default function ParticlesEffect({
  type = "petals",
  color = "#d4af37",
  density = "medium",
}) {
  if (type === "none") return null;

  const count = density === "low" ? 12 : density === "high" ? 32 : 20;

  const particles = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: (i * 5.17 + 3) % 96,
      delay: (i * 1.3) % 12,
      duration: 8 + (i % 6) * 2.5,
      size: type === "sparkles" ? 4 + (i % 4) * 3 : 12 + (i % 5) * 4,
      rotation: (i * 37) % 360,
    }));
  }, [count, type]);

  return (
    <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden">
      {particles.map((p) => {
        let content = null;

        if (type === "petals") {
          // Rose petal SVG shape
          content = (
            <svg
              viewBox="0 0 30 30"
              width={p.size}
              height={p.size}
              style={{ transform: `rotate(${p.rotation}deg)` }}
            >
              <path
                d="M15,0 C22,6 28,14 24,23 C20,30 9,30 5,22 C1,14 8,6 15,0 Z"
                fill={p.id % 2 === 0 ? "#b83b4f" : color}
                opacity={0.65}
              />
            </svg>
          );
        } else if (type === "marigold") {
          // Marigold / Genda petal
          content = (
            <svg
              viewBox="0 0 24 24"
              width={p.size}
              height={p.size}
              style={{ transform: `rotate(${p.rotation}deg)` }}
            >
              <ellipse
                cx="12"
                cy="12"
                rx="6"
                ry="11"
                fill={p.id % 2 === 0 ? "#ea7a1e" : "#f5b027"}
                opacity={0.7}
              />
            </svg>
          );
        } else if (type === "hearts") {
          // Heart shape
          content = (
            <svg
              viewBox="0 0 24 24"
              width={p.size * 0.9}
              height={p.size * 0.9}
              fill={color}
              opacity={0.6}
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          );
        } else {
          // Golden Sparkles
          content = (
            <div
              className="rounded-full shadow-lg"
              style={{
                width: p.size,
                height: p.size,
                background: `radial-gradient(circle, #fff, ${color})`,
                boxShadow: `0 0 8px ${color}`,
                opacity: 0.75,
              }}
            />
          );
        }

        return (
          <div
            key={p.id}
            className="particle-falling absolute pointer-events-none"
            style={{
              left: `${p.left}%`,
              top: "-8%",
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          >
            {content}
          </div>
        );
      })}
    </div>
  );
}
