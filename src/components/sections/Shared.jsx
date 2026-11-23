function SectionShell({
  data,
  sectionKey,
  sectionAnim,
  children,
  bgImage,
  className = "",
  style = {},
}) {
  const theme = data?.theme || {};
  const secBg = (sectionKey && data?.sectionBackgrounds?.[sectionKey]) || {};

  const isDark =
    !theme.ink ||
    theme.ink.startsWith("#0") ||
    theme.ink.startsWith("#1") ||
    theme.ink.startsWith("#2") ||
    theme.ink.startsWith("#3a");

  const defaultBgColor = isDark ? "#fdfbf7" : theme.ink;
  const textColor = isDark ? "#4a1525" : theme.accent || "#4a1525";
  const goldColor = theme.primary || "#b8860b";

  // Compute final background styling based on section background setting
  let customBgStyle = {};
  const bgType = secBg.type || "default";

  if (bgType === "color" && secBg.color) {
    customBgStyle = { backgroundColor: secBg.color };
  } else if (bgType === "gradient" && secBg.gradient) {
    customBgStyle = { background: secBg.gradient };
  } else if (bgType === "image" && secBg.imageUrl) {
    customBgStyle = {
      backgroundImage: `url(${secBg.imageUrl})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    };
  } else {
    customBgStyle = { backgroundColor: defaultBgColor };
  }

  const effectiveBg = bgType !== "image" && (bgImage || theme.bgImage);

  return (
    <section
      data-anim={sectionAnim}
      className={`relative w-full overflow-hidden section-enter ${className}`}
      style={{
        ...customBgStyle,
        color: textColor,
        fontFamily: theme.bodyFont || "'Montserrat', sans-serif",
        ...style,
      }}
    >
      {/* Background Image Overlay / Tint for high contrast readability */}
      {bgType === "image" && secBg.imageUrl && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            backgroundColor: secBg.overlayColor || "#ffffff",
            opacity:
              typeof secBg.overlayOpacity === "number"
                ? secBg.overlayOpacity
                : 0.85,
          }}
        />
      )}

      {/* Background Pattern */}
      {effectiveBg ? (
        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-700 pointer-events-none opacity-20"
          style={{ backgroundImage: `url(${effectiveBg})` }}
        />
      ) : bgType === "default" ? (
        <div className="absolute inset-0 royal-ivory-pattern pointer-events-none" />
      ) : null}

      {/* Ornate Gold Frame Border */}
      {theme.borderStyle === "ornate" && (
        <div
          className="absolute inset-3 sm:inset-5 pointer-events-none rounded-2xl border border-dashed opacity-35"
          style={{ borderColor: goldColor }}
        />
      )}

      <div className="relative z-10 w-full">{children}</div>
    </section>
  );
}

function Divider({ color = "#b8860b" }) {
  return (
    <div
      className="flex items-center justify-center gap-3 my-5"
      style={{ color }}
    >
      <span
        className="h-px w-12 sm:w-20"
        style={{ background: "currentColor", opacity: 0.35 }}
      />
      <span className="text-sm font-serif opacity-75">✦ ❦ ✦</span>
      <span
        className="h-px w-12 sm:w-20"
        style={{ background: "currentColor", opacity: 0.35 }}
      />
    </div>
  );
}

function shade(hex, percent) {
  if (!hex || !hex.startsWith("#")) return hex;
  const num = parseInt(hex.slice(1), 16);
  let r = (num >> 16) + Math.round(2.55 * percent);
  let g = ((num >> 8) & 0x00ff) + Math.round(2.55 * percent);
  let b = (num & 0x0000ff) + Math.round(2.55 * percent);
  r = Math.max(0, Math.min(255, r));
  g = Math.max(0, Math.min(255, g));
  b = Math.max(0, Math.min(255, b));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}

export { SectionShell, Divider, shade };
