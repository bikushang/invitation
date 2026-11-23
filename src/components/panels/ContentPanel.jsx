import { Plus, Trash2 } from "lucide-react";

function Field({ label, children }) {
  return (
    <div>
      <label className="text-xs font-medium text-stone-600">{label}</label>
      <div className="mt-1">{children}</div>
    </div>
  );
}

function TextInput({ value, onChange, placeholder }) {
  return (
    <input
      type="text"
      value={value || ""}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-md border border-stone-300 px-3 py-2 text-sm focus:border-stone-800 focus:outline-none"
    />
  );
}

export default function ContentPanel({ data, update }) {
  const set = (key, patch) => update(key, patch);

  return (
    <div className="space-y-8">
      {/* Hero */}
      <Section title="Hero Header">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Sacred Symbol (ॐ, ੴ, ﷽, ✝, 卐)">
            <TextInput
              value={data.hero?.auspiciousSymbol}
              onChange={(v) => set("hero", { auspiciousSymbol: v })}
              placeholder="ॐ / ੴ / ﷽ / ✝"
            />
          </Field>
          <Field label="Invocation / Sacred Verse">
            <TextInput
              value={data.hero?.symbolText}
              onChange={(v) => set("hero", { symbolText: v })}
              placeholder="|| श्री गणेशाय नमः ||"
            />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-3">
          <Field label="Monogram">
            <TextInput
              value={data.hero?.monogram}
              onChange={(v) => set("hero", { monogram: v })}
            />
          </Field>
          <Field label="Wed Label">
            <TextInput
              value={data.hero?.wedLabel}
              onChange={(v) => set("hero", { wedLabel: v })}
            />
          </Field>
          <Field label="Groom Name">
            <TextInput
              value={data.hero?.groomName}
              onChange={(v) => set("hero", { groomName: v })}
            />
          </Field>
          <Field label="Bride Name">
            <TextInput
              value={data.hero?.brideName}
              onChange={(v) => set("hero", { brideName: v })}
            />
          </Field>
        </div>
        <Field label="Subtitle">
          <TextInput
            value={data.hero?.subtitle}
            onChange={(v) => set("hero", { subtitle: v })}
          />
        </Field>
        <Field label="Tagline">
          <TextInput
            value={data.hero?.tagline}
            onChange={(v) => set("hero", { tagline: v })}
          />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Date">
            <TextInput
              value={data.hero?.date}
              onChange={(v) => set("hero", { date: v })}
            />
          </Field>
          <Field label="Location">
            <TextInput
              value={data.hero?.location}
              onChange={(v) => set("hero", { location: v })}
            />
          </Field>
        </div>
        <Field label="Closing Line">
          <TextInput
            value={data.hero?.closingLine}
            onChange={(v) => set("hero", { closingLine: v })}
          />
        </Field>
        <Field label="Hero Background URL (Optional)">
          <TextInput
            value={data.hero?.bgImage}
            onChange={(v) => set("hero", { bgImage: v })}
            placeholder="Optional image URL"
          />
        </Field>
      </Section>

      {/* Countdown Timer */}
      <Section title="Wedding Countdown">
        <Field label="Heading">
          <TextInput
            value={data.countdown?.heading}
            onChange={(v) => set("countdown", { heading: v })}
          />
        </Field>
        <Field label="Subtitle">
          <TextInput
            value={data.countdown?.subtitle}
            onChange={(v) => set("countdown", { subtitle: v })}
          />
        </Field>
        <Field label="Target Wedding Date & Time">
          <input
            type="datetime-local"
            value={
              data.countdown?.targetDate?.slice(0, 16) || "2026-11-21T20:00"
            }
            onChange={(e) => set("countdown", { targetDate: e.target.value })}
            className="w-full rounded-md border border-stone-300 px-3 py-2 text-sm focus:border-stone-800 focus:outline-none"
          />
        </Field>
      </Section>

      {/* Families */}
      <Section title="Families">
        <Field label="Intro">
          <TextInput
            value={data.families?.intro}
            onChange={(v) => set("families", { intro: v })}
          />
        </Field>
        <Field label="Heading">
          <TextInput
            value={data.families?.heading}
            onChange={(v) => set("families", { heading: v })}
          />
        </Field>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FamilyFields
            title="Groom Side"
            fam={data.families?.groom || {}}
            onChange={(patch) =>
              set("families", { groom: { ...data.families.groom, ...patch } })
            }
          />
          <FamilyFields
            title="Bride Side"
            fam={data.families?.bride || {}}
            onChange={(patch) =>
              set("families", { bride: { ...data.families.bride, ...patch } })
            }
          />
        </div>
        <Field label="Closing Line">
          <TextInput
            value={data.families?.closingLine}
            onChange={(v) => set("families", { closingLine: v })}
          />
        </Field>
      </Section>

      {/* Story */}
      <Section title="Our Love Story">
        <Field label="Heading">
          <TextInput
            value={data.story?.heading}
            onChange={(v) => set("story", { heading: v })}
          />
        </Field>
        <Field label="Subtitle">
          <TextInput
            value={data.story?.subtitle}
            onChange={(v) => set("story", { subtitle: v })}
          />
        </Field>
        <Field label="Quote">
          <TextInput
            value={data.story?.quote}
            onChange={(v) => set("story", { quote: v })}
          />
        </Field>
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">
            Story Cards
          </p>
          {(data.story?.items || []).map((item) => (
            <div
              key={item.id}
              className="rounded-md border border-stone-200 p-3 space-y-2 bg-stone-50/50"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-stone-600">Card</span>
                <button
                  onClick={() =>
                    set("story", {
                      items: data.story.items.filter((it) => it.id !== item.id),
                    })
                  }
                  className="text-stone-400 hover:text-red-500 transition"
                >
                  <Trash2 size={14} />
                </button>
              </div>
              <TextInput
                value={item.title}
                onChange={(v) =>
                  updateStoryItem(data, update, item.id, { title: v })
                }
                placeholder="Title"
              />
              <TextInput
                value={item.caption}
                onChange={(v) =>
                  updateStoryItem(data, update, item.id, { caption: v })
                }
                placeholder="Caption"
              />
              <TextInput
                value={item.image}
                onChange={(v) =>
                  updateStoryItem(data, update, item.id, { image: v })
                }
                placeholder="Image URL (optional)"
              />
            </div>
          ))}
          <button
            onClick={() =>
              set("story", {
                items: [
                  ...(data.story?.items || []),
                  {
                    id: Math.random().toString(36).slice(2, 9),
                    title: "New Memory",
                    caption: "A moment to remember",
                    image: "",
                  },
                ],
              })
            }
            className="flex items-center gap-1.5 text-xs font-medium text-stone-700 hover:text-stone-900 px-3 py-1.5 rounded border border-stone-300 hover:bg-stone-100"
          >
            <Plus size={14} /> Add story card
          </button>
        </div>
      </Section>

      {/* Separate Wedding Events & Ceremonies */}
      <Section title="Separate Ceremonies & Events">
        <div className="rounded-lg p-2.5 bg-amber-50/70 border border-amber-200 text-xs text-amber-950 mb-2">
          <p className="font-bold">✦ Separate Standalone Ceremonies</p>
          <p className="text-[11px] text-amber-900/80">
            Each ceremony has its own luxury royal section with Google Calendar
            sync, .ICS download, and Google Maps directions.
          </p>
        </div>

        <div className="space-y-4">
          {Object.entries(data.separateEvents || {}).map(([key, ev]) => (
            <div
              key={key}
              className="rounded-xl border border-stone-200 p-3 space-y-2 bg-stone-50/60 shadow-xs"
            >
              <div className="flex items-center justify-between pb-1 border-b border-stone-200">
                <span className="text-xs font-bold text-amber-900 uppercase tracking-wide">
                  {ev.badge || ev.name || key}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const newEvents = { ...data.separateEvents };
                    delete newEvents[key];
                    update("separateEvents", newEvents);
                    update(
                      "sectionsOrder",
                      (data.sectionsOrder || []).filter((s) => s !== key),
                    );
                  }}
                  className="text-stone-400 hover:text-red-600 transition cursor-pointer p-1"
                  title="Remove Ceremony"
                >
                  <Trash2 size={14} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Field label="Ceremony Name">
                  <TextInput
                    value={ev.name}
                    onChange={(v) =>
                      updateSeparateEvent(data, update, key, { name: v })
                    }
                    placeholder="e.g. Haldi Ceremony"
                  />
                </Field>
                <Field label="Auspicious Badge">
                  <TextInput
                    value={ev.badge}
                    onChange={(v) =>
                      updateSeparateEvent(data, update, key, { badge: v })
                    }
                    placeholder="e.g. Auspicious Haldi"
                  />
                </Field>
              </div>

              <Field label="Subtitle / Celebration Note">
                <TextInput
                  value={ev.subtitle}
                  onChange={(v) =>
                    updateSeparateEvent(data, update, key, { subtitle: v })
                  }
                  placeholder="Ceremony blessing or description"
                />
              </Field>

              <div className="grid grid-cols-2 gap-2">
                <Field label="Date">
                  <TextInput
                    value={ev.date}
                    onChange={(v) =>
                      updateSeparateEvent(data, update, key, { date: v })
                    }
                    placeholder="e.g. 19th November, 2026"
                  />
                </Field>
                <Field label="Auspicious Time / Muhurat">
                  <TextInput
                    value={ev.time}
                    onChange={(v) =>
                      updateSeparateEvent(data, update, key, { time: v })
                    }
                    placeholder="e.g. 11:00 AM Onwards"
                  />
                </Field>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Field label="Palace / Venue">
                  <TextInput
                    value={ev.venue}
                    onChange={(v) =>
                      updateSeparateEvent(data, update, key, { venue: v })
                    }
                    placeholder="e.g. Royal Courtyard"
                  />
                </Field>
                <Field label="City & State">
                  <TextInput
                    value={ev.location}
                    onChange={(v) =>
                      updateSeparateEvent(data, update, key, { location: v })
                    }
                    placeholder="e.g. Bagha Purana, Punjab"
                  />
                </Field>
              </div>

              <Field label="Recommended Attire / Dress Code">
                <TextInput
                  value={ev.dressCode}
                  onChange={(v) =>
                    updateSeparateEvent(data, update, key, { dressCode: v })
                  }
                  placeholder="e.g. Attire: Sunshine Yellow & Festive Florals"
                />
              </Field>
            </div>
          ))}

          <button
            type="button"
            onClick={() => {
              const newKey = `event_${Math.random().toString(36).slice(2, 7)}`;
              const newEvents = {
                ...(data.separateEvents || {}),
                [newKey]: {
                  name: "Grand Celebration",
                  badge: "Auspicious Ritual",
                  subtitle:
                    "Join us for this sacred celebration and shower blessings",
                  date: "20th November, 2026",
                  time: "6:00 PM Onwards",
                  venueLabel: "Venue",
                  venue: "Royal Palace Pavilion",
                  location: "Bagha Purana, Punjab",
                  dressCode: "Attire: Traditional Festive Wear",
                },
              };
              update("separateEvents", newEvents);
              update("sectionsOrder", [...(data.sectionsOrder || []), newKey]);
            }}
            className="w-full flex items-center justify-center gap-1.5 text-xs font-semibold text-amber-900 bg-amber-50 hover:bg-amber-100 p-2.5 rounded-xl border border-amber-300 transition cursor-pointer"
          >
            <Plus size={15} /> Add Another Separate Ceremony
          </button>
        </div>
      </Section>

      {/* Gallery / Photos */}
      <Section title="Moments & Gallery">
        <Field label="Heading">
          <TextInput
            value={data.gallery?.heading}
            onChange={(v) => set("gallery", { heading: v })}
          />
        </Field>
        <Field label="Subtitle">
          <TextInput
            value={data.gallery?.subtitle}
            onChange={(v) => set("gallery", { subtitle: v })}
          />
        </Field>
        <div className="space-y-3">
          {(data.gallery?.photos || []).map((photo) => (
            <div
              key={photo.id}
              className="rounded-md border border-stone-200 p-3 space-y-2 bg-stone-50/50"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-stone-600">
                  Photo
                </span>
                <button
                  onClick={() =>
                    set("gallery", {
                      photos: data.gallery.photos.filter(
                        (p) => p.id !== photo.id,
                      ),
                    })
                  }
                  className="text-stone-400 hover:text-red-500 transition"
                >
                  <Trash2 size={14} />
                </button>
              </div>
              <TextInput
                value={photo.url}
                onChange={(v) =>
                  updatePhoto(data, update, photo.id, { url: v })
                }
                placeholder="Photo Image URL"
              />
              <TextInput
                value={photo.caption}
                onChange={(v) =>
                  updatePhoto(data, update, photo.id, { caption: v })
                }
                placeholder="Caption"
              />
            </div>
          ))}
          <button
            onClick={() =>
              set("gallery", {
                photos: [
                  ...(data.gallery?.photos || []),
                  {
                    id: Math.random().toString(36).slice(2, 9),
                    url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
                    caption: "Golden Moment",
                  },
                ],
              })
            }
            className="flex items-center gap-1.5 text-xs font-medium text-stone-700 hover:text-stone-900 px-3 py-1.5 rounded border border-stone-300 hover:bg-stone-100"
          >
            <Plus size={14} /> Add photo
          </button>
        </div>
      </Section>

      {/* Venue & Directions */}
      <Section title="Venue & Directions">
        <Field label="Heading">
          <TextInput
            value={data.venue?.heading}
            onChange={(v) => set("venue", { heading: v })}
          />
        </Field>
        <Field label="Venue Name">
          <TextInput
            value={data.venue?.name}
            onChange={(v) => set("venue", { name: v })}
          />
        </Field>
        <Field label="Address">
          <TextInput
            value={data.venue?.address}
            onChange={(v) => set("venue", { address: v })}
          />
        </Field>
        <Field label="Google Map Link">
          <TextInput
            value={data.venue?.mapLink}
            onChange={(v) => set("venue", { mapLink: v })}
          />
        </Field>
        <Field label="Special Notes / Dress Code">
          <TextInput
            value={data.venue?.notes}
            onChange={(v) => set("venue", { notes: v })}
          />
        </Field>
      </Section>

      {/* RSVP */}
      <Section title="RSVP Form">
        <Field label="Heading">
          <TextInput
            value={data.rsvp?.heading}
            onChange={(v) => set("rsvp", { heading: v })}
          />
        </Field>
        <Field label="Subtitle">
          <TextInput
            value={data.rsvp?.subtitle}
            onChange={(v) => set("rsvp", { subtitle: v })}
          />
        </Field>
        <Field label="Closing Quote">
          <TextInput
            value={data.rsvp?.closingQuote}
            onChange={(v) => set("rsvp", { closingQuote: v })}
          />
        </Field>
        <Field label="Couple Line">
          <TextInput
            value={data.rsvp?.coupleLine}
            onChange={(v) => set("rsvp", { coupleLine: v })}
          />
        </Field>
        <Field label="Background URL">
          <TextInput
            value={data.rsvp?.bgImage}
            onChange={(v) => set("rsvp", { bgImage: v })}
            placeholder="Optional image URL"
          />
        </Field>
      </Section>
    </div>
  );
}

function updateStoryItem(data, update, id, patch) {
  update("story", {
    items: data.story.items.map((it) =>
      it.id === id ? { ...it, ...patch } : it,
    ),
  });
}

function updateSeparateEvent(data, update, key, patch) {
  update("separateEvents", {
    ...(data.separateEvents || {}),
    [key]: {
      ...((data.separateEvents && data.separateEvents[key]) || {}),
      ...patch,
    },
  });
}

function updateEvent(data, update, id, patch) {
  update(
    "events",
    data.events.map((e) => (e.id === id ? { ...e, ...patch } : e)),
  );
}

function updatePhoto(data, update, id, patch) {
  update("gallery", {
    photos: data.gallery.photos.map((p) =>
      p.id === id ? { ...p, ...patch } : p,
    ),
  });
}

function Section({ title, children }) {
  return (
    <div className="space-y-3">
      <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-700 border-b border-stone-200 pb-1">
        {title}
      </h4>
      {children}
    </div>
  );
}

function FamilyFields({ title, fam, onChange }) {
  return (
    <div className="space-y-2 border border-stone-200 rounded p-3 bg-stone-50/40">
      <p className="text-xs font-semibold text-stone-700">{title}</p>
      <TextInput
        value={fam.label}
        onChange={(v) => onChange({ label: v })}
        placeholder="Label"
      />
      <TextInput
        value={fam.grandparentLabel}
        onChange={(v) => onChange({ grandparentLabel: v })}
        placeholder="Grandparent label"
      />
      <TextInput
        value={fam.grandparents}
        onChange={(v) => onChange({ grandparents: v })}
        placeholder="Grandparents"
      />
      <TextInput
        value={fam.parentLabel}
        onChange={(v) => onChange({ parentLabel: v })}
        placeholder="Parent label"
      />
      <TextInput
        value={fam.parents}
        onChange={(v) => onChange({ parents: v })}
        placeholder="Parents"
      />
      <TextInput
        value={fam.siblingLabel}
        onChange={(v) => onChange({ siblingLabel: v })}
        placeholder="Sibling label"
      />
      <TextInput
        value={fam.siblings}
        onChange={(v) => onChange({ siblings: v })}
        placeholder="Siblings"
      />
    </div>
  );
}
