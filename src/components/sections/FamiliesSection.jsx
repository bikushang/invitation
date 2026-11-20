import EditableText from '../EditableText';
import AnimatedText from '../AnimatedText';
import { SectionShell, Divider } from './Shared';

function FamilyCard({ side, data, update, theme, titleAnim }) {
  const f = data.families[side] || {};
  const gold = theme.primary || '#b8860b';
  const maroon = theme.accent || '#4a1525';
  const set = (patch) => update('families', { [side]: { ...f, ...patch } });

  return (
    <div
      className="flex flex-col items-center text-center px-6 py-8 rounded-2xl bg-white border shadow-md transition-transform hover:-translate-y-1 w-full"
      style={{
        borderColor: `${gold}55`,
        boxShadow: '0 10px 25px -5px rgba(74, 21, 37, 0.08), 0 0 0 1px rgba(184, 134, 11, 0.15)',
      }}
    >
      <AnimatedText
        as="h3"
        text={f.label || ''}
        animId={titleAnim}
        style={{
          fontFamily: "'Great Vibes', cursive",
          color: maroon,
          fontSize: '2.5rem',
        }}
      />
      <Divider color={gold} />

      <div className="space-y-4 text-sm w-full" style={{ color: maroon }}>
        <div>
          <p style={{ color: gold, letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.7rem', fontWeight: 600 }}>
            <EditableText value={f.grandparentLabel || 'Grandson of'} onChange={(v) => set({ grandparentLabel: v })} />
          </p>
          <p style={{ fontFamily: theme.displayFont, fontSize: '1.05rem', marginTop: 3, fontWeight: 600 }}>
            <EditableText value={f.grandparents || ''} onChange={(v) => set({ grandparents: v })} multiline />
          </p>
        </div>
        <div>
          <p style={{ color: gold, letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.7rem', fontWeight: 600 }}>
            <EditableText value={f.parentLabel || 'Son of'} onChange={(v) => set({ parentLabel: v })} />
          </p>
          <p style={{ fontFamily: theme.displayFont, fontSize: '1.05rem', marginTop: 3, fontWeight: 600 }}>
            <EditableText value={f.parents || ''} onChange={(v) => set({ parents: v })} multiline />
          </p>
        </div>
        <div>
          <p style={{ color: gold, letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.7rem', fontWeight: 600 }}>
            <EditableText value={f.siblingLabel || 'Brother of'} onChange={(v) => set({ siblingLabel: v })} />
          </p>
          <p style={{ fontFamily: theme.displayFont, fontSize: '1.05rem', marginTop: 3, fontWeight: 600 }}>
            <EditableText value={f.siblings || ''} onChange={(v) => set({ siblings: v })} multiline />
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FamiliesSection({ data, update, anim }) {
  const f = data.families || {};
  const theme = data.theme || {};
  const set = (patch) => update('families', patch);
  const titleAnim = anim?.sectionTitle || 'none';
  const gold = theme.primary || '#b8860b';
  const maroon = theme.accent || '#4a1525';

  return (
    <SectionShell data={data} sectionAnim={anim?.families || 'slide-left'}>
      <div className="flex flex-col items-center text-center px-4 sm:px-6 py-16 sm:py-24 max-w-4xl mx-auto w-full">
        <p style={{ color: gold, letterSpacing: '0.25em', textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 600 }}>
          <EditableText value={f.intro || 'Two Loving Families · One Sacred Bond'} onChange={(v) => set({ intro: v })} />
        </p>
        <AnimatedText
          as="h2"
          text={f.heading || 'Introducing The Families'}
          animId={titleAnim}
          style={{
            fontFamily: theme.displayFont,
            color: maroon,
            fontSize: 'clamp(1.8rem, 5vw, 3rem)',
            fontWeight: 700,
            marginTop: 6,
          }}
        />
        <Divider color={gold} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 w-full">
          <FamilyCard side="groom" data={data} update={update} theme={theme} titleAnim={titleAnim} />
          <FamilyCard side="bride" data={data} update={update} theme={theme} titleAnim={titleAnim} />
        </div>

        <AnimatedText
          as="p"
          text={f.closingLine || 'Raised with love, united by destiny, together forever'}
          animId={titleAnim}
          className="mt-10"
          style={{
            fontFamily: "'Great Vibes', cursive",
            color: gold,
            fontSize: 'clamp(1.4rem, 4vw, 2.2rem)',
            maxWidth: 600,
          }}
        />
      </div>
    </SectionShell>
  );
}
