import EditableText from '../EditableText';
import AnimatedText from '../AnimatedText';
import { SectionShell, Divider } from './Shared';

export default function GallerySection({ data, update, anim, isMobile }) {
  const g = data.gallery || {};
  const theme = data.theme || {};
  const photos = g.photos || [];
  const gold = theme.primary || '#b8860b';
  const maroon = theme.accent || '#1e293b';

  const setPhoto = (id, patch) => {
    update('gallery', {
      photos: photos.map((p) => (p.id === id ? { ...p, ...patch } : p)),
    });
  };

  return (
    <SectionShell data={data} sectionKey="gallery" sectionAnim={anim?.gallery || 'fade-up'}>
      <div className="flex flex-col items-center text-center px-4 sm:px-6 py-12 sm:py-20 max-w-4xl mx-auto w-full">
        <p className="text-[10px] sm:text-xs font-semibold tracking-[0.35em] uppercase" style={{ color: gold }}>
          G A L L E R Y
        </p>
        <h2
          className="font-cinzel mt-2 text-2xl sm:text-4xl font-semibold tracking-wider uppercase"
          style={{ color: maroon }}
        >
          <EditableText
            value={g.heading || 'Cherished Moments'}
            onChange={(v) => update('gallery', { heading: v })}
          />
        </h2>
        <p className="mt-1 text-xs sm:text-sm max-w-lg opacity-85" style={{ color: maroon }}>
          <EditableText
            value={g.subtitle || 'Glimpses from our journey together'}
            onChange={(v) => update('gallery', { subtitle: v })}
          />
        </p>

        <Divider color={gold} />

        {/* Photo grid - 1 Column on Mobile, 3 on Desktop */}
        <div className={`grid ${isMobile ? 'grid-cols-1 max-w-sm' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-4xl'} gap-6 mt-4 w-full`}>
          {photos.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-2xl overflow-hidden bg-white border shadow-md transition-transform hover:-translate-y-1"
              style={{
                borderColor: `${gold}44`,
                boxShadow: '0 12px 30px -5px rgba(30, 41, 59, 0.1)',
              }}
            >
              <div
                className="aspect-[4/5] w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage: `url(${item.url})`,
                  backgroundColor: '#f3ece1',
                }}
              />
              <div className="p-3 bg-white text-center border-t" style={{ borderColor: `${gold}22` }}>
                <p className="text-xs sm:text-sm font-serif font-semibold" style={{ color: maroon }}>
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
