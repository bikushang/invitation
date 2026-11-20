import EditableText from '../EditableText';
import AnimatedText from '../AnimatedText';
import { SectionShell, Divider } from './Shared';

export default function GallerySection({ data, update, anim }) {
  const g = data.gallery || {};
  const theme = data.theme || {};
  const photos = g.photos || [];
  const titleAnim = anim?.sectionTitle || 'none';
  const gold = theme.primary || '#b8860b';
  const maroon = theme.accent || '#4a1525';

  const setPhoto = (id, patch) => {
    update('gallery', {
      photos: photos.map((p) => (p.id === id ? { ...p, ...patch } : p)),
    });
  };

  return (
    <SectionShell data={data} sectionAnim={anim?.gallery || 'fade-up'}>
      <div className="flex flex-col items-center text-center px-6 py-20 md:py-28">
        <AnimatedText
          as="h2"
          text={g.heading || 'Cherished Moments'}
          animId={titleAnim}
          style={{
            fontFamily: theme.displayFont,
            color: maroon,
            fontSize: 'clamp(1.8rem, 5vw, 3rem)',
            fontWeight: 600,
          }}
        />
        <p className="mt-2 text-sm max-w-lg" style={{ color: maroon, opacity: 0.85 }}>
          <EditableText
            value={g.subtitle || 'Glimpses from our journey together'}
            onChange={(v) => update('gallery', { subtitle: v })}
          />
        </p>

        <Divider color={gold} />

        {/* Photo grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6 max-w-5xl w-full">
          {photos.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-2xl overflow-hidden bg-white border shadow-md transition-transform hover:-translate-y-1"
              style={{
                borderColor: `${gold}44`,
                boxShadow: '0 10px 25px -5px rgba(74, 21, 37, 0.08)',
              }}
            >
              <div
                className="aspect-[4/5] w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage: `url(${item.url})`,
                  backgroundColor: '#f3ece1',
                }}
              />
              <div className="p-4 bg-white text-center border-t" style={{ borderColor: `${gold}22` }}>
                <p className="text-sm font-semibold" style={{ color: maroon, fontFamily: theme.displayFont }}>
                  <EditableText value={item.caption || ''} onChange={(v) => setPhoto(item.id, { caption: v })} />
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
