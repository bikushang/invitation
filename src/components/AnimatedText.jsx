import { useEffect, useRef, useState } from "react";

export default function AnimatedText({
  text = "",
  animId = "none",
  as: Tag = "span",
  className = "",
  style,
  staggerMs = 25,
}) {
  const [typed, setTyped] = useState(String(text || ""));
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  // Typing effect
  useEffect(() => {
    if (animId !== "typing") return;
    const str = String(text || "");
    let i = 0;
    setTyped("");
    const speed = Math.max(25, Math.min(60, 1500 / Math.max(str.length, 1)));
    const timer = setInterval(() => {
      i += 1;
      setTyped(str.slice(0, i));
      if (i >= str.length) {
        clearInterval(timer);
        setHasAnimated(true);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, animId]);

  if (animId === "typing") {
    const str = String(text || "");
    return (
      <Tag
        ref={ref}
        className={`${className} ${!hasAnimated && typed.length < str.length ? "typing-cursor" : ""}`}
        style={style}
      >
        {typed || str}
      </Tag>
    );
  }

  if (animId === "shimmer") {
    return (
      <Tag ref={ref} className={`${className} anim-shimmer`} style={style}>
        {text}
      </Tag>
    );
  }

  if (animId === "none") {
    return (
      <Tag ref={ref} className={className} style={style}>
        {text}
      </Tag>
    );
  }

  // letter-reveal or word-reveal
  const str = String(text || "");
  const units =
    animId === "letter-reveal" ? Array.from(str) : str.split(/(\s+)/);

  return (
    <Tag
      ref={ref}
      className={`anim-text is-visible ${className}`}
      style={style}
    >
      {units.map((unit, i) => {
        if (unit.trim() === "") {
          return <span key={i}>{unit}</span>;
        }
        return (
          <span
            key={i}
            className="anim-unit inline-block"
            style={{ animationDelay: `${i * staggerMs}ms` }}
          >
            {unit}
          </span>
        );
      })}
    </Tag>
  );
}
