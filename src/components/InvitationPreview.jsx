import { useState, useEffect } from 'react';
import HeroSection from './sections/HeroSection';
import CountdownSection from './sections/CountdownSection';
import FamiliesSection from './sections/FamiliesSection';
import StorySection from './sections/StorySection';
import ScheduleSection from './sections/ScheduleSection';
import EventSection from './sections/EventSection';
import GallerySection from './sections/GallerySection';
import VenueMapSection from './sections/VenueMapSection';
import RsvpSection from './sections/RsvpSection';
import OpeningAnimation from './OpeningAnimation';
import ParticlesEffect from './ParticlesEffect';
import MusicPlayer from './MusicPlayer';
import { ChevronUp, ChevronDown, Eye, EyeOff } from 'lucide-react';
import { DEFAULT_INVITATION } from '../lib/defaultData';

export default function InvitationPreview({
  data,
  update,
  anim,
  revealKey,
  isEditor = false,
  coverOpen = false,
  onCoverOpenChange,
}) {
  const [internalCoverOpen, setInternalCoverOpen] = useState(coverOpen);

  useEffect(() => {
    setInternalCoverOpen(coverOpen);
  }, [coverOpen]);

  const handleOpenCover = () => {
    setInternalCoverOpen(true);
    if (onCoverOpenChange) onCoverOpenChange(true);
  };

  const theme = data.theme || {};
  const isDark =
    !theme.ink ||
    theme.ink.startsWith('#0') ||
    theme.ink.startsWith('#1') ||
    theme.ink.startsWith('#2') ||
    theme.ink.startsWith('#3a');

  const containerBg = isDark ? '#fdfbf7' : theme.ink;
  const textColor = isDark ? '#4a1525' : theme.accent || '#4a1525';

  const sectionsOrder = data.sectionsOrder || DEFAULT_INVITATION.sectionsOrder;
  const visibility = data.sectionVisibility || {};

  function moveSection(index, direction) {
    if (!update) return;
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= sectionsOrder.length) return;
    const newOrder = [...sectionsOrder];
    const [removed] = newOrder.splice(index, 1);
    newOrder.splice(targetIdx, 0, removed);
    update('sectionsOrder', newOrder);
  }

  function toggleVisibility(secKey) {
    if (!update) return;
    update('sectionVisibility', {
      ...visibility,
      [secKey]: visibility[secKey] === false ? true : false,
    });
  }

  function renderSection(key, index) {
    if (visibility[key] === false) return null;

    let component = null;

    if (key.startsWith('event_')) {
      const eventData =
        (data.separateEvents && data.separateEvents[key]) ||
        (DEFAULT_INVITATION.separateEvents && DEFAULT_INVITATION.separateEvents[key]) ||
        {};
      component = (
        <EventSection
          eventKey={key}
          eventData={eventData}
          data={data}
          update={update}
          anim={anim}
        />
      );
    } else {
      switch (key) {
        case 'hero':
          component = <HeroSection data={data} update={update} anim={anim} />;
          break;
        case 'countdown':
          component = <CountdownSection data={data} update={update} anim={anim} />;
          break;
        case 'families':
          component = <FamiliesSection data={data} update={update} anim={anim} />;
          break;
        case 'story':
          component = <StorySection data={data} update={update} anim={anim} />;
          break;
        case 'schedule':
          // Purged in favor of separate standalone EventSection instances
          return null;
        case 'gallery':
          component = <GallerySection data={data} update={update} anim={anim} />;
          break;
        case 'venue':
          component = <VenueMapSection data={data} update={update} anim={anim} />;
          break;
        case 'rsvp':
          component = <RsvpSection data={data} update={update} anim={anim} />;
          break;
        default:
          return null;
      }
    }

    const friendlyLabel = key.startsWith('event_') ? key.replace('event_', '').toUpperCase() : key;

    return (
      <div key={key} className="relative group/section w-full">
        {/* Editor Controls (Hover toolbar) */}
        {isEditor && (
          <div className="absolute top-2 right-2 z-30 opacity-0 group-hover/section:opacity-100 transition-opacity flex items-center gap-1 bg-stone-900/90 text-stone-100 p-1 rounded-md border border-stone-700 shadow-md text-[11px]">
            <span className="px-1.5 font-bold uppercase tracking-wider text-amber-400">
              {friendlyLabel}
            </span>
            <button
              onClick={() => moveSection(index, -1)}
              disabled={index === 0}
              className="p-1 hover:bg-stone-800 rounded disabled:opacity-30 cursor-pointer"
              title="Move section up"
            >
              <ChevronUp size={14} />
            </button>
            <button
              onClick={() => moveSection(index, 1)}
              disabled={index === sectionsOrder.length - 1}
              className="p-1 hover:bg-stone-800 rounded disabled:opacity-30 cursor-pointer"
              title="Move section down"
            >
              <ChevronDown size={14} />
            </button>
            <button
              onClick={() => toggleVisibility(key)}
              className="p-1 hover:bg-stone-800 rounded text-stone-300 hover:text-white cursor-pointer"
              title="Toggle visibility"
            >
              {visibility[key] === false ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>
        )}
        {component}
      </div>
    );
  }

  return (
    <div
      className="relative w-full min-h-screen"
      style={{
        backgroundColor: containerBg,
        color: textColor,
        fontFamily: theme.bodyFont || "'Montserrat', sans-serif",
      }}
    >
      {/* Floating Festive Particles */}
      <ParticlesEffect
        type={data.particles?.type || 'petals'}
        color={theme.primary || '#b8860b'}
        density={data.particles?.density || 'medium'}
      />

      {/* Floating Wedding Music Player */}
      <MusicPlayer music={data.music} theme={theme} />

      {/* When Cover is NOT open, show the Cover Presentation */}
      {!internalCoverOpen && data.intro?.enabled ? (
        <OpeningAnimation
          data={data}
          isOpen={false}
          onOpen={handleOpenCover}
        />
      ) : (
        /* When Cover IS open, show full invitation sections */
        <div className="relative z-10 w-full section-enter">
          {sectionsOrder.map((key, idx) => renderSection(key, idx))}
        </div>
      )}
    </div>
  );
}
