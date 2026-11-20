import EditableText from '../EditableText';
import AnimatedText from '../AnimatedText';
import { SectionShell, Divider } from './Shared';

export default function StorySection({ data, update, anim }) {
  const s = data.story || {};
  const theme = data.theme || {};
  const set = (patch) => update('story', patch);
  const titleAnim = anim?.sectionTitle || 'none';
  const gold = theme.primary || '#b8860b';
  const maroon = theme.accent || '#4a1525';

  const setItem = (id, patch) => {
    update('story', {
      items: s.items.map((it) => (it.id === id ? { ...it, ...patch } : it)),
    });
  };

  return (
    <SectionShell data={data} sectionAnim={anim?.story || 'zoom-in'}>
      <div className="flex flex-col items-center text-center px-4 sm:px-6 py-16 sm:py-24 max-w-5xl mx-auto w-full">
        <AnimatedText
          as="h2"
          text={s.heading || 'Our Love Story'}
          animId={titleAnim}
          style={{
            fontFamily: theme.displayFont,
            color: maroon,
            fontSize: 'clamp(1.8rem, 5vw, 3rem)',
            fontWeight: 700,
          }}
        />
        <p className="mt-2 max-w-xl text-xs sm:text-sm" style={{ color: maroon, opacity: 0.85 }}>
          <EditableText value={s.subtitle || 'Two hearts, one soul, and a lifetime of adventures together.'} onChange={(v) => set({ subtitle: v })} multiline />
        </p>
        <Divider color={gold} />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6 w-full">
          {(s.items || []).map((item) => (
            <div
              key={item.id}
              className="group rounded-2xl overflow-hidden bg-white border shadow-md transition-all hover:shadow-xl w-full"
              style={{
                borderColor: `${gold}40`,
                boxShadow: '0 10px 25px -5px rgba(74, 21, 37, 0.08)',
              }}
            >
              <div
                className="aspect-[4/3] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage: item.image ? `url(${item.image})` : undefined,
                  backgroundColor: '#f3ece1',
                }}
              />
              <div className="p-5 text-left">
                <h4
                  style={{
                    fontFamily: theme.displayFont,
                    color: maroon,
                    fontSize: '1.2rem',
                    fontWeight: 600,
                  }}
                >
                  <EditableText value={item.title || ''} onChange={(v) => setItem(item.id, { title: v })} />
                </h4>
                <p className="mt-2 text-xs leading-relaxed" style={{ color: maroon, opacity: 0.8 }}>
                  <EditableText value={item.caption || ''} onChange={(v) => setItem(item.id, { caption: v })} multiline />
                </p>
              </div>
            </div>
          ))}
        </div>

        <AnimatedText
          as="blockquote"
          text={s.quote || 'From that first conversation to a lifetime of adventures'}
          animId={titleAnim}
          className="mt-10 italic"
          style={{
            fontFamily: theme.displayFont,
            color: gold,
            fontSize: 'clamp(1.1rem, 3vw, 1.5rem)',
            maxWidth: 600,
          }}
        />
      </div>
    </SectionShell>
  );
}
