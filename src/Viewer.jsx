import { useEffect, useState } from "react";
import InvitationPreview from "./components/InvitationPreview";
import { useScrollReveal } from "./hooks/useScrollReveal";
import { getInvitationBySlug, sanitizeInvitationData } from "./lib/storage";
import { DEFAULT_INVITATION } from "./lib/defaultData";
import { Loader2, Smartphone, Monitor, RotateCcw } from "lucide-react";

export default function Viewer({ slug }) {
  const [data, setData] = useState(null);
  const [revealKey, setRevealKey] = useState(0);
  const [viewMode, setViewMode] = useState("mobile");
  const [coverOpen, setCoverOpen] = useState(false);

  useScrollReveal(revealKey);

  useEffect(() => {
    // Load from local storage or fallback to default
    const loaded = getInvitationBySlug(slug);
    setData(sanitizeInvitationData(loaded || DEFAULT_INVITATION));
  }, [slug]);

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fdfbf7] text-stone-700">
        <Loader2 className="animate-spin text-amber-800" size={32} />
      </div>
    );
  }

  // Replay ALWAYS closes the cover so it shows fresh
  function handleReplay() {
    setCoverOpen(false);
    setRevealKey((k) => k + 1);
  }

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col items-center">
      {/* Top Floating View Controls on larger screens */}
      <div className="w-full flex items-center justify-between px-4 sm:px-8 py-2.5 bg-white/95 border-b border-stone-200 text-stone-700 text-xs z-30 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-amber-900 font-serif tracking-wide text-sm">
            {data.hero?.groomName || "Groom"} &{" "}
            {data.hero?.brideName || "Bride"}
          </span>
          <span className="hidden sm:inline text-stone-400">
            · Wedding Celebration
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Device switch on desktop screens */}
          <div className="hidden sm:flex items-center gap-1 bg-stone-100 p-1 rounded-lg border border-stone-200">
            <button
              onClick={() => setViewMode("mobile")}
              className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs transition cursor-pointer ${
                viewMode === "mobile"
                  ? "bg-white text-amber-900 font-semibold shadow-xs"
                  : "text-stone-500 hover:text-stone-800"
              }`}
            >
              <Smartphone size={13} />
              <span>Mobile</span>
            </button>
            <button
              onClick={() => setViewMode("desktop")}
              className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs transition cursor-pointer ${
                viewMode === "desktop"
                  ? "bg-white text-amber-900 font-semibold shadow-xs"
                  : "text-stone-500 hover:text-stone-800"
              }`}
            >
              <Monitor size={13} />
              <span>Desktop</span>
            </button>
          </div>

          <button
            onClick={handleReplay}
            className="flex items-center gap-1.5 rounded-lg bg-white border border-stone-300 hover:bg-stone-50 px-3 py-1.5 text-xs font-semibold text-stone-800 transition cursor-pointer shadow-xs"
            title="Replay from Cover Page"
          >
            <RotateCcw size={13} className="text-amber-800" />
            <span>Replay</span>
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="w-full flex-1 flex justify-center items-start py-0 sm:py-8 px-0 sm:px-6">
        {viewMode === "mobile" ? (
          /* Mobile phone simulator on desktop, edge-to-edge native on actual mobile */
          <div className="w-full sm:w-[375px] max-w-full sm:max-w-[95vw] min-h-screen sm:min-h-0 sm:h-[740px] sm:max-h-[calc(100vh-140px)] sm:phone-bezel relative flex flex-col shadow-none sm:shadow-2xl bg-[#fdfbf7]">
            <div className="hidden sm:flex h-6 bg-[#292524] items-center justify-center shrink-0">
              <div className="w-24 h-3.5 bg-black rounded-full flex items-center justify-end px-2">
                <div className="w-2 h-2 bg-blue-900/60 rounded-full" />
              </div>
            </div>
            <div className="flex-1 sm:min-h-0 sm:overflow-y-auto builder-scroll overscroll-contain bg-[#fdfbf7] relative">
              <InvitationPreview
                data={data}
                update={() => {}}
                anim={data.anim || DEFAULT_INVITATION.anim}
                revealKey={revealKey}
                isEditor={false}
                coverOpen={coverOpen}
                onCoverOpenChange={setCoverOpen}
                isMobile={true}
              />
            </div>
            <div className="hidden sm:flex h-5 bg-[#292524] items-center justify-center shrink-0">
              <div className="w-28 h-1 bg-white/30 rounded-full" />
            </div>
          </div>
        ) : (
          <div className="w-full max-w-4xl shadow-2xl rounded-3xl overflow-hidden border-2 border-amber-900/20 my-2 bg-[#fdfbf7] relative">
            <InvitationPreview
              data={data}
              update={() => {}}
              anim={data.anim || DEFAULT_INVITATION.anim}
              revealKey={revealKey}
              isEditor={false}
              coverOpen={coverOpen}
              onCoverOpenChange={setCoverOpen}
              isMobile={false}
            />
          </div>
        )}
      </div>
    </div>
  );
}
