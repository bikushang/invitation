import { useCallback, useMemo, useState, useEffect } from 'react';
import {
  Eye,
  Palette,
  Type,
  Sparkles,
  Save,
  Share2,
  X,
  Smartphone,
  Monitor,
  RotateCcw,
  Mail,
  MailOpen,
  Download,
  Upload,
  FolderOpen,
  Users,
  Check,
  Layers,
  Copy,
  Calendar,
  Image,
  Wand2,
  Crown,
} from 'lucide-react';
import InvitationPreview from './components/InvitationPreview';
import ThemePanel from './components/panels/ThemePanel';
import ContentPanel from './components/panels/ContentPanel';
import AnimationPanel from './components/panels/AnimationPanel';
import SectionsPanel from './components/panels/SectionsPanel';
import IntroPanel from './components/panels/IntroPanel';
import CaricatureStudioPanel from './components/panels/CaricatureStudioPanel';
import AiToolsPanel from './components/panels/AiToolsPanel';
import AdminDashboardModal from './components/panels/AdminDashboardModal';
import { DEFAULT_INVITATION } from './lib/defaultData';
import { CULTURAL_TRADITIONS } from './lib/culturalPresets';
import { useScrollReveal, resetAllReveals } from './hooks/useScrollReveal';
import {
  saveInvitation,
  loadCurrentDraft,
  saveCurrentDraft,
  getAllSavedInvitations,
  deleteSavedInvitation,
  getRsvpResponses,
  exportInvitationJson,
  sanitizeInvitationData,
} from './lib/storage';

const TABS = [
  { id: 'tradition', label: 'Traditions', icon: Crown },
  { id: 'content', label: 'Content', icon: Type },
  { id: 'caricature', label: 'Caricature', icon: Image },
  { id: 'ai-tools', label: 'AI Tools', icon: Wand2 },
  { id: 'intro', label: 'Cover & Seal', icon: Mail },
  { id: 'theme', label: 'Theme & Font', icon: Palette },
  { id: 'sections', label: 'Layout & Drag', icon: Layers },
];

export default function App() {
  const [data, setData] = useState(() => sanitizeInvitationData(loadCurrentDraft()));
  const [tab, setTab] = useState('tradition');
  const [revealKey, setRevealKey] = useState(0);
  const [saved, setSaved] = useState(null);
  const [toast, setToast] = useState('');

  // Cover Page State: whether the envelope/cover is open or closed
  const [coverOpen, setCoverOpen] = useState(false);

  // Viewport mode: 'mobile' vs 'desktop'
  const [canvasViewMode, setCanvasViewMode] = useState('mobile');
  const [fullPreviewViewMode, setFullPreviewViewMode] = useState('desktop');

  // Modals
  const [previewOpen, setPreviewOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [savedListOpen, setSavedListOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [savedList, setSavedList] = useState([]);
  const [rsvpList, setRsvpList] = useState([]);

  // Trigger scroll reveal
  useScrollReveal(revealKey);

  // Auto-save draft on data changes
  useEffect(() => {
    saveCurrentDraft(data);
  }, [data]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const update = useCallback((key, value) => {
    setData((prev) => ({
      ...prev,
      [key]: typeof value === 'function' ? value(prev[key]) : value,
    }));
  }, []);

  const themeUpdate = useCallback((key, value) => {
    setData((prev) => ({
      ...prev,
      [key]: typeof value === 'function' ? value(prev[key]) : value,
    }));
  }, []);

  // Apply Cultural Tradition Preset
  function applyTradition(tradition) {
    const newSeparateEvents = {};
    const newEventKeys = [];

    (tradition.events || []).forEach((ev, idx) => {
      const cleanName = (ev.name || 'ceremony').toLowerCase().replace(/[^a-z0-9]/g, '_').slice(0, 12);
      const key = `event_${cleanName}_${idx}`;
      newSeparateEvents[key] = {
        name: ev.name,
        badge: ev.name?.split(' ')[0] || 'Ceremony',
        subtitle: ev.subtitle,
        date: ev.date,
        time: ev.time,
        venueLabel: ev.venueLabel || 'Venue',
        venue: ev.venue,
        location: ev.location,
        dressCode: ev.dressCode || 'Attire: Traditional Festive Wear',
      };
      newEventKeys.push(key);
    });

    setData((prev) => {
      const baseSections = (prev.sectionsOrder || DEFAULT_INVITATION.sectionsOrder).filter(
        (s) => !s.startsWith('event_') && s !== 'schedule'
      );
      const famIdx = baseSections.indexOf('families');
      if (famIdx !== -1) {
        baseSections.splice(famIdx + 1, 0, ...newEventKeys);
      } else {
        baseSections.push(...newEventKeys);
      }

      return {
        ...prev,
        hero: {
          ...prev.hero,
          auspiciousSymbol: tradition.auspiciousSymbol,
          symbolText: tradition.symbolText,
          closingLine: tradition.closingLine,
        },
        story: {
          ...prev.story,
          quote: tradition.quote,
        },
        separateEvents: newSeparateEvents,
        sectionsOrder: Array.from(new Set(baseSections)),
        theme: {
          ...prev.theme,
          ...tradition.theme,
        },
      };
    });
    showToast(`Applied ${tradition.name} tradition!`);
  }

  // Replay: ALWAYS close the cover page and replay animations
  function handleReplay() {
    setCoverOpen(false);
    resetAllReveals();
    setRevealKey((k) => k + 1);
    showToast('Cover envelope closed · Click Open to view');
  }

  // Save to LocalStorage
  function handleSave() {
    try {
      const res = saveInvitation(data, saved?.id || saved?.slug);
      setSaved(res);
      showToast('Invitation saved to Local Storage!');
    } catch (e) {
      alert('Could not save: ' + e.message);
    }
  }

  // New clean invitation
  function handleNew() {
    if (window.confirm('Start a new invitation from default template? Current draft will be reset.')) {
      setData(DEFAULT_INVITATION);
      setSaved(null);
      setCoverOpen(false);
      showToast('New invitation started');
    }
  }

  // Open saved list
  function openSavedList() {
    setSavedList(getAllSavedInvitations());
    setSavedListOpen(true);
  }

  // Load a saved invitation
  function loadSavedItem(item) {
    setData(sanitizeInvitationData(item.data));
    setSaved({ id: item.id, slug: item.slug });
    setSavedListOpen(false);
    setCoverOpen(false);
    showToast(`Loaded "${item.name}"`);
  }

  // Delete saved invitation
  function handleDeleteSaved(id) {
    if (window.confirm('Delete this saved invitation?')) {
      deleteSavedInvitation(id);
      setSavedList(getAllSavedInvitations());
      if (saved?.id === id) setSaved(null);
      showToast('Invitation deleted');
    }
  }

  // Open Admin Dashboard & RSVPs
  function openAdmin() {
    const list = getRsvpResponses(saved?.slug || 'default');
    setRsvpList(list);
    setAdminModalOpen(true);
  }

  // Import JSON
  function handleImportJson(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        setData(sanitizeInvitationData(parsed));
        setCoverOpen(false);
        showToast('Invitation imported successfully!');
      } catch (err) {
        alert('Invalid JSON file format.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  }

  const shareUrl = useMemo(() => {
    const slug = saved?.slug || 'preview';
    return `${window.location.origin}${window.location.pathname}?invite=${slug}`;
  }, [saved]);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-stone-100 text-stone-900 font-sans">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2 rounded-lg bg-amber-800 px-4 py-2.5 text-xs font-semibold text-white shadow-xl animate-fade-in">
          <Check size={16} />
          <span>{toast}</span>
        </div>
      )}

      {/* Sidebar Controls */}
      <aside className="flex w-[390px] shrink-0 flex-col border-r border-stone-200 bg-white shadow-xs">
        {/* Top Header */}
        <header className="flex items-center justify-between px-5 py-3.5 border-b border-stone-200 bg-stone-50/70">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-800 text-white shadow-sm">
              <Sparkles size={17} />
            </span>
            <div>
              <h1 className="text-sm font-bold text-stone-900 tracking-wide">
                Indian Wedding Builder
              </h1>
              <p className="text-[11px] text-stone-500">
                North · Punjabi · Rajasthani · South · Muslim · Christian
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={openSavedList}
              className="p-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-200 rounded-md transition cursor-pointer"
              title="Saved Invitations"
            >
              <FolderOpen size={16} />
            </button>
            <button
              onClick={openAdmin}
              className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-md bg-amber-100 text-amber-900 hover:bg-amber-200 transition cursor-pointer"
              title="Admin & Guest RSVP Manager"
            >
              <Users size={14} />
              <span>Admin</span>
            </button>
          </div>
        </header>

        {/* Tab Navigation */}
        <nav className="flex border-b border-stone-200 bg-stone-50 overflow-x-auto builder-scroll">
          {TABS.map((t) => {
            const Icon = t.icon;
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex flex-1 min-w-[55px] flex-col items-center justify-center gap-1 py-2 text-[10px] font-medium transition cursor-pointer ${
                  active
                    ? 'border-b-2 border-amber-800 text-amber-900 bg-white font-bold'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                <Icon size={14} />
                <span>{t.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Tab Panels */}
        <div className="builder-scroll flex-1 overflow-y-auto px-5 py-5 text-stone-800 bg-white">
          {tab === 'tradition' && (
            <div className="space-y-4">
              <div className="rounded-xl p-3.5 bg-amber-50/70 border border-amber-200 text-xs text-amber-950 space-y-1">
                <p className="font-bold flex items-center gap-1.5">
                  <Crown size={15} className="text-amber-800" />
                  <span>Choose Wedding Cultural Tradition</span>
                </p>
                <p className="text-[11px] text-amber-900/80 leading-relaxed">
                  1-click transforms the card into your traditional cultural style with authentic sacred invocations, event sequences, and regional customs.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                {CULTURAL_TRADITIONS.map((trad) => (
                  <button
                    key={trad.id}
                    type="button"
                    onClick={() => applyTradition(trad)}
                    className="p-3 rounded-xl border border-stone-200 hover:border-amber-700 bg-white text-left transition hover:shadow-xs group cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-stone-900 group-hover:text-amber-900">
                        {trad.name}
                      </span>
                      <span className="text-sm font-serif text-amber-800 font-bold">
                        {trad.auspiciousSymbol}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-500 mt-0.5">{trad.subtitle}</p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {trad.events.slice(0, 3).map((e) => (
                        <span key={e.name} className="px-1.5 py-0.5 rounded bg-stone-100 text-[10px] text-stone-600">
                          {e.name.split(' ')[0]}
                        </span>
                      ))}
                      <span className="px-1.5 py-0.5 rounded bg-amber-50 text-[10px] text-amber-900 font-medium">
                        +{trad.events.length - 3} more
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
          {tab === 'content' && <ContentPanel data={data} update={update} />}
          {tab === 'caricature' && <CaricatureStudioPanel data={data} update={update} />}
          {tab === 'ai-tools' && <AiToolsPanel data={data} update={update} onToast={showToast} />}
          {tab === 'intro' && <IntroPanel data={data} update={update} onReplayIntro={handleReplay} />}
          {tab === 'theme' && <ThemePanel data={data} update={themeUpdate} />}
          {tab === 'sections' && <SectionsPanel data={data} update={update} />}
        </div>

        {/* Footer Actions */}
        <footer className="border-t border-stone-200 bg-stone-50 px-4 py-3 space-y-2">
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-amber-800 px-3 py-2 text-xs font-semibold text-white hover:bg-amber-900 transition shadow-sm cursor-pointer"
            >
              <Save size={14} />
              <span>{saved ? 'Update in Storage' : 'Save Locally'}</span>
            </button>
            <button
              onClick={() => {
                if (!saved) handleSave();
                setShareOpen(true);
              }}
              className="flex items-center justify-center gap-1.5 rounded-lg border border-stone-300 px-3 py-2 text-xs font-medium text-stone-700 hover:bg-stone-200 transition cursor-pointer"
            >
              <Share2 size={14} />
              <span>Share</span>
            </button>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setPreviewOpen(true)}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-stone-300 bg-white px-3 py-2 text-xs font-semibold text-stone-800 hover:bg-stone-100 transition shadow-sm cursor-pointer"
            >
              <Eye size={14} />
              <span>Full Screen View</span>
            </button>
            <button
              onClick={() => exportInvitationJson(data)}
              className="p-2 text-stone-600 hover:text-stone-900 rounded-lg border border-stone-300 hover:bg-stone-200 transition cursor-pointer"
              title="Export JSON"
            >
              <Download size={15} />
            </button>
            <label
              className="p-2 text-stone-600 hover:text-stone-900 rounded-lg border border-stone-300 hover:bg-stone-200 transition cursor-pointer"
              title="Import JSON"
            >
              <Upload size={15} />
              <input type="file" accept=".json" onChange={handleImportJson} className="hidden" />
            </label>
          </div>
        </footer>
      </aside>

      {/* Main Preview Canvas Area */}
      <main className="relative flex-1 flex flex-col h-full overflow-hidden bg-stone-200/70">
        {/* Canvas Toolbar with Mobile / Desktop Switch & Cover Controls */}
        <div className="flex items-center justify-between px-6 py-2.5 border-b border-stone-300 bg-white/95 backdrop-blur-md z-30 shadow-xs">
          {/* Viewport Switcher */}
          <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-lg border border-stone-300">
            <button
              onClick={() => setCanvasViewMode('mobile')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition cursor-pointer ${
                canvasViewMode === 'mobile'
                  ? 'bg-white text-amber-900 font-semibold shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
              title="Mobile Screen View"
            >
              <Smartphone size={14} />
              <span>Mobile View</span>
            </button>
            <button
              onClick={() => setCanvasViewMode('desktop')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition cursor-pointer ${
                canvasViewMode === 'desktop'
                  ? 'bg-white text-amber-900 font-semibold shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
              title="Desktop Wide Screen View"
            >
              <Monitor size={14} />
              <span>Desktop View</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {/* Direct Toggle between Cover Page and Open Card */}
            <button
              onClick={() => {
                setCoverOpen(!coverOpen);
                showToast(!coverOpen ? 'Opened Card' : 'Cover Envelope Closed');
              }}
              className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition cursor-pointer ${
                !coverOpen
                  ? 'bg-amber-100 border-amber-300 text-amber-900 font-semibold'
                  : 'border-stone-300 bg-white text-stone-700 hover:bg-stone-50'
              }`}
              title="Toggle Cover on/off"
            >
              {!coverOpen ? <Mail size={13} className="text-amber-800" /> : <MailOpen size={13} />}
              <span>{!coverOpen ? 'Cover: Active' : 'Open Card'}</span>
            </button>

            {/* Replay ALWAYS closes the cover page and restarts */}
            <button
              onClick={handleReplay}
              className="flex items-center gap-1.5 rounded-lg border border-stone-300 bg-white px-3 py-1.5 text-xs font-semibold text-stone-800 hover:bg-stone-50 transition cursor-pointer shadow-xs"
              title="Replay from Cover Page"
            >
              <RotateCcw size={13} className="text-amber-800" />
              <span>Replay</span>
            </button>

            <button
              onClick={() => setPreviewOpen(true)}
              className="flex items-center gap-1.5 rounded-lg bg-amber-800 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-amber-900 transition shadow-xs cursor-pointer"
            >
              <Eye size={13} />
              <span>Fullscreen</span>
            </button>
          </div>
        </div>

        {/* Canvas Container: Fixed Phone Size with Internal Scroll for Mobile View! */}
        <div className="builder-scroll flex-1 overflow-y-auto py-6 sm:py-8 px-2 sm:px-6 flex justify-center items-start">
          {canvasViewMode === 'mobile' ? (
            /* REALISTIC SMARTPHONE BEZEL WITH INTERNAL SCROLLING */
            <div className="w-[375px] max-w-[95vw] h-[720px] max-h-[calc(100vh-140px)] phone-bezel relative flex flex-col shadow-2xl shrink-0 bg-[#fdfbf7]">
              {/* Camera Notch / Speaker Bar */}
              <div className="h-6 bg-[#292524] flex items-center justify-center shrink-0">
                <div className="w-24 h-3.5 bg-black rounded-full flex items-center justify-end px-2">
                  <div className="w-2 h-2 bg-blue-900/60 rounded-full" />
                </div>
              </div>
              {/* Internal Smooth Mobile Scroll Viewport */}
              <div className="flex-1 overflow-y-auto builder-scroll overscroll-contain bg-[#fdfbf7] relative">
                <InvitationPreview
                  data={data}
                  update={update}
                  anim={data.anim}
                  revealKey={revealKey}
                  isEditor={true}
                  coverOpen={coverOpen}
                  onCoverOpenChange={setCoverOpen}
                />
              </div>
              {/* Bottom Home Bar */}
              <div className="h-5 bg-[#292524] flex items-center justify-center shrink-0">
                <div className="w-28 h-1 bg-white/30 rounded-full" />
              </div>
            </div>
          ) : (
            /* Desktop / Wide Screen Viewport */
            <div className="w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl border-2 border-stone-300 bg-[#fdfbf7] transition-all duration-300 relative">
              <InvitationPreview
                data={data}
                update={update}
                anim={data.anim}
                revealKey={revealKey}
                isEditor={true}
                coverOpen={coverOpen}
                onCoverOpenChange={setCoverOpen}
              />
            </div>
          )}
        </div>
      </main>

      {/* Full Preview Modal with Mobile / Desktop Switch */}
      {previewOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-stone-900/95 backdrop-blur-md">
          {/* Top Bar */}
          <div className="flex items-center justify-between px-6 py-3 border-b border-stone-800 text-white bg-stone-950">
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold tracking-wide">
                Live Fullscreen Preview
              </span>
              <div className="flex items-center gap-1 bg-stone-900 p-1 rounded-lg border border-stone-800">
                <button
                  onClick={() => setFullPreviewViewMode('mobile')}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium transition cursor-pointer ${
                    fullPreviewViewMode === 'mobile'
                      ? 'bg-amber-600 text-white font-semibold'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <Smartphone size={13} />
                  <span>Mobile</span>
                </button>
                <button
                  onClick={() => setFullPreviewViewMode('desktop')}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium transition cursor-pointer ${
                    fullPreviewViewMode === 'desktop'
                      ? 'bg-amber-600 text-white font-semibold'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <Monitor size={13} />
                  <span>Desktop</span>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleReplay}
                className="flex items-center gap-1.5 rounded-lg bg-stone-800 px-3 py-1.5 text-xs text-stone-200 hover:bg-stone-700 transition cursor-pointer"
              >
                <RotateCcw size={13} className="text-amber-400" />
                <span>Replay (Show Cover)</span>
              </button>
              <button
                onClick={() => setPreviewOpen(false)}
                className="rounded-lg bg-stone-800 p-1.5 text-stone-300 hover:text-white hover:bg-stone-700 transition cursor-pointer"
                title="Close Full Preview"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Full Preview Body */}
          <div className="builder-scroll flex-1 overflow-y-auto py-6 sm:py-8 px-2 sm:px-6 flex justify-center items-start">
            {fullPreviewViewMode === 'mobile' ? (
              <div className="w-[375px] max-w-[95vw] h-[720px] max-h-[calc(100vh-140px)] phone-bezel relative flex flex-col shadow-2xl shrink-0 bg-[#fdfbf7]">
                <div className="h-6 bg-[#292524] flex items-center justify-center shrink-0">
                  <div className="w-24 h-3.5 bg-black rounded-full flex items-center justify-end px-2">
                    <div className="w-2 h-2 bg-blue-900/60 rounded-full" />
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto builder-scroll overscroll-contain bg-[#fdfbf7] relative">
                  <InvitationPreview
                    data={data}
                    update={update}
                    anim={data.anim}
                    revealKey={revealKey}
                    isEditor={false}
                    coverOpen={coverOpen}
                    onCoverOpenChange={setCoverOpen}
                  />
                </div>
                <div className="h-5 bg-[#292524] flex items-center justify-center shrink-0">
                  <div className="w-28 h-1 bg-white/30 rounded-full" />
                </div>
              </div>
            ) : (
              <div className="w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl border-2 border-stone-700 bg-[#fdfbf7] relative">
                <InvitationPreview
                  data={data}
                  update={update}
                  anim={data.anim}
                  revealKey={revealKey}
                  isEditor={false}
                  coverOpen={coverOpen}
                  onCoverOpenChange={setCoverOpen}
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Share Modal */}
      {shareOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={() => setShareOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white border border-stone-200 p-6 shadow-2xl text-stone-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
                <Share2 size={18} className="text-amber-800" />
                <span>Share Your Invitation</span>
              </h3>
              <button onClick={() => setShareOpen(false)} className="text-stone-400 hover:text-stone-700 cursor-pointer">
                <X size={18} />
              </button>
            </div>
            <p className="mt-2 text-xs text-stone-600 leading-relaxed">
              Anyone with this link will experience your custom wedding invitation with the opening envelope animation, music & interactive RSVP!
            </p>
            <div className="mt-4 flex items-center gap-2 rounded-lg border border-stone-300 bg-stone-50 px-3 py-2">
              <input
                readOnly
                value={shareUrl}
                className="flex-1 text-xs text-stone-800 bg-transparent outline-none font-mono"
              />
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(shareUrl);
                  showToast('Share link copied to clipboard!');
                }}
                className="flex items-center gap-1 rounded bg-amber-800 px-3 py-1.5 text-xs font-semibold text-white hover:bg-amber-900 transition cursor-pointer"
              >
                <Copy size={13} />
                <span>Copy</span>
              </button>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => window.open(shareUrl, '_blank')}
                className="text-xs text-amber-800 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
              >
                Open in new tab ↗
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Saved Invitations List Modal */}
      {savedListOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={() => setSavedListOpen(false)}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-white border border-stone-200 p-6 shadow-2xl text-stone-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div className="flex items-center gap-2">
                <FolderOpen size={18} className="text-amber-800" />
                <h3 className="text-base font-bold text-stone-900">Saved Invitations</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleNew}
                  className="px-2.5 py-1 rounded bg-stone-200 hover:bg-stone-300 text-xs text-stone-800 font-medium transition cursor-pointer"
                >
                  + New
                </button>
                <button onClick={() => setSavedListOpen(false)} className="text-stone-400 hover:text-stone-700 cursor-pointer">
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="mt-4 max-h-[340px] overflow-y-auto space-y-2 builder-scroll">
              {savedList.length === 0 ? (
                <div className="py-8 text-center text-xs text-stone-500">
                  No saved invitations yet in local storage. Click "Save Locally" to save your current draft.
                </div>
              ) : (
                savedList.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-stone-200 bg-stone-50 hover:border-stone-300 transition"
                  >
                    <div>
                      <h4 className="text-sm font-semibold text-stone-900">{item.name}</h4>
                      <p className="text-[11px] text-stone-500">
                        Updated: {new Date(item.updatedAt).toLocaleDateString()} · Slug: {item.slug}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => loadSavedItem(item)}
                        className="px-3 py-1 rounded bg-amber-800 text-white text-xs font-semibold hover:bg-amber-900 transition cursor-pointer"
                      >
                        Load
                      </button>
                      <button
                        onClick={() => handleDeleteSaved(item.id)}
                        className="p-1 text-stone-400 hover:text-red-500 transition cursor-pointer"
                        title="Delete"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Admin Management Dashboard Modal */}
      <AdminDashboardModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
        rsvpList={rsvpList}
        slug={saved?.slug || 'wedding'}
        onToast={showToast}
      />
    </div>
  );
}
