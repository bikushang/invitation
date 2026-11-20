import { useState } from 'react';
import { Sparkles, Copy, Check, MessageSquare, Hash, BookOpen } from 'lucide-react';

export default function AiToolsPanel({ data, update, onToast }) {
  const groom = data.hero?.groomName || 'Anmol';
  const bride = data.hero?.brideName || 'Radhika';
  const date = data.hero?.date || 'November 2026';
  const location = data.hero?.location || 'Bagha Purana, Punjab';

  const [copiedIndex, setCopiedIndex] = useState(null);

  // Dynamic hashtag generator
  const cleanGroom = groom.replace(/[^a-zA-Z]/g, '');
  const cleanBride = bride.replace(/[^a-zA-Z]/g, '');

  const hashtags = [
    `#${cleanGroom}Ki${cleanBride}`,
    `#${cleanBride}Weds${cleanGroom}`,
    `#${cleanGroom}Got${cleanBride}`,
    `#The${cleanGroom}And${cleanBride}Affair`,
    `#Forever${cleanGroom}${cleanBride}`,
    `#TwoHeartsOne${cleanGroom}`,
  ];

  const verses = [
    {
      title: 'Vedic Sacred Promise (English)',
      text: 'Two souls, one sacred path, walking together toward an eternity of love and devotion.',
    },
    {
      title: 'Romantic Urdu / Hindi Shayeri',
      text: 'हाथों में तेरा हाथ हो, हर पल तुम्हारा साथ हो, रब से बस यही दुआ है हमारी, खुशियों की सदा बरसात हो।',
    },
    {
      title: 'Punjabi Gurbani Blessing',
      text: 'ਧਨ ਪਿਰੁ ਏਹਿ ਨ ਆਖੀਅਨਿ ਬਹਨਿ ਇਕਠੇ ਹੋਇ ॥ ਏਕ ਜੋਤਿ ਦੁਇ ਮੂਰਤੀ ਧਨ ਪਿਰੁ ਕਹੀਐ ਸੋਇ ॥',
    },
    {
      title: 'Modern Classic Elegance',
      text: 'From a simple hello to our forever beginning, we invite you to bless our sacred new chapter.',
    },
  ];

  const whatsappMessage = `🌸 *Wedding Invitation: ${groom} & ${bride}* 🌸\n\n_|| Shree Ganeshay Namah ||_\n\nWith great joy and the blessings of our parents, we cordially invite you and your family to celebrate the auspicious wedding of:\n\n✨ *${groom} & ${bride}* ✨\n\n📅 *Dates:* ${date}\n📍 *Venue:* ${location}\n\n👇 *View Our Interactive Digital Invitation:* \n${window.location.origin}${window.location.pathname}?invite=${data.slug || 'wedding'}\n\nPlease join us to shower your gracious blessings upon the couple! 🙏❤️`;

  const copyToClipboard = (text, idx) => {
    navigator.clipboard?.writeText(text);
    setCopiedIndex(idx);
    if (onToast) onToast('Copied to clipboard!');
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  const applyClosingLine = (text) => {
    update('hero', { closingLine: text });
    if (onToast) onToast('Applied verse to Hero closing line!');
  };

  return (
    <div className="space-y-6">
      {/* WhatsApp Message Generator */}
      <div className="border border-stone-200 rounded-xl p-4 bg-stone-50/60 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-stone-900">
            <MessageSquare size={14} className="text-emerald-700" />
            <span>AI WhatsApp Invitation Message</span>
          </div>
          <button
            onClick={() => copyToClipboard(whatsappMessage, 'whatsapp')}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-700 text-white text-[11px] font-semibold hover:bg-emerald-800 transition cursor-pointer"
          >
            {copiedIndex === 'whatsapp' ? <Check size={12} /> : <Copy size={12} />}
            <span>{copiedIndex === 'whatsapp' ? 'Copied' : 'Copy Text'}</span>
          </button>
        </div>
        <textarea
          readOnly
          rows={6}
          value={whatsappMessage}
          className="w-full text-xs p-2.5 rounded-lg border border-stone-200 bg-white text-stone-700 font-sans leading-relaxed outline-none"
        />
        <p className="text-[11px] text-stone-500">
          Ready to paste directly into WhatsApp family & friends groups!
        </p>
      </div>

      {/* AI Wedding Hashtags */}
      <div className="border border-stone-200 rounded-xl p-4 bg-stone-50/60 space-y-3">
        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-stone-900">
          <Hash size={14} className="text-amber-800" />
          <span>AI Wedding Hashtag Studio</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {hashtags.map((tag, idx) => (
            <button
              key={tag}
              onClick={() => copyToClipboard(tag, `tag-${idx}`)}
              className="flex items-center justify-between px-3 py-2 rounded-lg border border-stone-200 bg-white hover:border-amber-700 text-xs text-stone-800 font-medium transition cursor-pointer text-left"
            >
              <span className="truncate">{tag}</span>
              {copiedIndex === `tag-${idx}` ? (
                <Check size={12} className="text-emerald-600 shrink-0 ml-1" />
              ) : (
                <Copy size={12} className="text-stone-400 shrink-0 ml-1" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* AI Wedding Invitation Verses & Shayeri */}
      <div className="border border-stone-200 rounded-xl p-4 bg-stone-50/60 space-y-3">
        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-stone-900">
          <BookOpen size={14} className="text-amber-800" />
          <span>Traditional Blessings & Shayeri</span>
        </div>
        <div className="space-y-2.5">
          {verses.map((v, idx) => (
            <div
              key={v.title}
              className="p-3 rounded-lg border border-stone-200 bg-white space-y-1.5 text-left"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-amber-800">{v.title}</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => applyClosingLine(v.text)}
                    className="px-2 py-0.5 rounded bg-amber-50 hover:bg-amber-100 text-[10px] font-semibold text-amber-900 border border-amber-200 transition cursor-pointer"
                  >
                    Apply to Card
                  </button>
                  <button
                    onClick={() => copyToClipboard(v.text, `verse-${idx}`)}
                    className="p-1 text-stone-400 hover:text-stone-700 cursor-pointer"
                  >
                    {copiedIndex === `verse-${idx}` ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                  </button>
                </div>
              </div>
              <p className="text-xs text-stone-700 italic font-serif leading-relaxed">
                "{v.text}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
