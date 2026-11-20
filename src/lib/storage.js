import { DEFAULT_INVITATION } from './defaultData';

const STORAGE_KEY = 'wedding_invitations_v1';
const DRAFT_KEY = 'wedding_invitation_current_draft';
const RSVP_KEY = 'wedding_invitation_rsvps_v1';

export function makeSlug(groom = 'groom', bride = 'bride') {
  const clean = (s) => (s || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const prefix = `${clean(groom)}-${clean(bride)}`.replace(/^-+|-+$/g, '') || 'wedding';
  const randomPart = Math.random().toString(36).slice(2, 7);
  return `${prefix}-${randomPart}`;
}

export function sanitizeInvitationData(data) {
  if (!data) return DEFAULT_INVITATION;
  const copy = { ...DEFAULT_INVITATION, ...data };
  if (!copy.theme) copy.theme = { ...DEFAULT_INVITATION.theme };

  // If theme has old dark ink, upgrade it to light royal ivory & gold
  const ink = (copy.theme.ink || '').toLowerCase().trim();
  if (
    !ink ||
    ink.startsWith('#0') ||
    ink.startsWith('#1') ||
    ink.startsWith('#2') ||
    ink.startsWith('#3a') ||
    ink.startsWith('#3b') ||
    ink === '#2b2118' ||
    ink === '#1c1510' ||
    ink === '#0c0a09'
  ) {
    copy.theme.ink = '#fdfbf7';
    copy.theme.accent = '#4a1525';
    copy.theme.primary = '#b8860b';
    copy.theme.cardBg = '#ffffff';
    copy.theme.overlay = 'rgba(255, 252, 246, 0.92)';
    copy.theme.preset = 'royal-ivory-gold';
    copy.theme.displayFont = "'Cinzel', serif";
    copy.theme.bgImage = '';
  }
  if (copy.theme.bgImage && copy.theme.bgImage.includes('lake_como')) {
    copy.theme.bgImage = '';
  }
  if (!copy.theme.displayFont || copy.theme.displayFont.includes('Playfair')) {
    copy.theme.displayFont = "'Cinzel', serif";
  }
  if (!copy.separateEvents) {
    copy.separateEvents = { ...DEFAULT_INVITATION.separateEvents };
  } else {
    // Ensure all default ceremonies exist
    copy.separateEvents = {
      ...DEFAULT_INVITATION.separateEvents,
      ...copy.separateEvents,
    };
  }

  // Purge old single 'schedule' from sectionsOrder and enforce separate event sections
  let sections = (copy.sectionsOrder || DEFAULT_INVITATION.sectionsOrder).filter(
    (s) => s !== 'schedule'
  );
  if (!sections.some((s) => s.startsWith('event_'))) {
    const famIdx = sections.indexOf('families');
    const eventKeys = [
      'event_haldi',
      'event_mehendi',
      'event_sangeet',
      'event_baraat',
      'event_wedding',
      'event_reception',
    ];
    if (famIdx !== -1) {
      sections.splice(famIdx + 1, 0, ...eventKeys);
    } else {
      sections.push(...eventKeys);
    }
  }
  // Deduplicate
  copy.sectionsOrder = Array.from(new Set(sections));

  if (!copy.sectionVisibility) {
    copy.sectionVisibility = { ...DEFAULT_INVITATION.sectionVisibility };
  } else {
    copy.sectionVisibility = {
      ...DEFAULT_INVITATION.sectionVisibility,
      ...copy.sectionVisibility,
    };
    // Ensure separate events are visible by default
    copy.sectionsOrder.forEach((k) => {
      if (copy.sectionVisibility[k] === undefined) {
        copy.sectionVisibility[k] = true;
      }
    });
  }

  if (!copy.sectionBackgrounds) {
    copy.sectionBackgrounds = {};
  }

  // Auto-upgrade any legacy foreign wedding photos to authentic Indian wedding photos
  if (copy.story?.items) {
    copy.story.items = copy.story.items.map((it) => {
      if (it.image && (it.image.includes('1519741497674') || it.image.includes('1511285560929'))) {
        return {
          ...it,
          image: it.image.includes('1519741497674')
            ? 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80'
            : 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
        };
      }
      return it;
    });
  }

  if (copy.gallery?.photos) {
    copy.gallery.photos = copy.gallery.photos.map((p) => {
      if (p.url && (p.url.includes('1519741497674') || p.url.includes('1511285560929'))) {
        return {
          ...p,
          url: p.url.includes('1519741497674')
            ? 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80'
            : 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
        };
      }
      return p;
    });
  }

  return copy;
}

export function loadCurrentDraft() {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return DEFAULT_INVITATION;
    const parsed = JSON.parse(raw);
    return sanitizeInvitationData(parsed);
  } catch (e) {
    console.error('Failed to load draft from localStorage', e);
    return DEFAULT_INVITATION;
  }
}

export function saveCurrentDraft(data) {
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save draft to localStorage', e);
  }
}

export function getAllSavedInvitations() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const list = JSON.parse(raw);
    return list.map((item) => ({
      ...item,
      data: sanitizeInvitationData(item.data),
    }));
  } catch (e) {
    console.error('Failed to get saved invitations', e);
    return [];
  }
}

export function getInvitationBySlug(slug) {
  try {
    if (!slug) return DEFAULT_INVITATION;
    const all = getAllSavedInvitations();
    const found = all.find((item) => item.slug === slug || item.id === slug);
    if (found) return sanitizeInvitationData(found.data);

    const draft = loadCurrentDraft();
    if (draft) return sanitizeInvitationData(draft);

    return DEFAULT_INVITATION;
  } catch (e) {
    console.error('Failed to get invitation by slug', e);
    return DEFAULT_INVITATION;
  }
}

export function saveInvitation(data, existingIdOrSlug = null) {
  try {
    const all = getAllSavedInvitations();
    const name = `${data.hero?.groomName || 'Groom'} & ${data.hero?.brideName || 'Bride'}`;
    const now = new Date().toISOString();

    let targetItem = null;
    if (existingIdOrSlug) {
      targetItem = all.find((i) => i.id === existingIdOrSlug || i.slug === existingIdOrSlug);
    }

    if (targetItem) {
      targetItem.data = data;
      targetItem.name = name;
      targetItem.updatedAt = now;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
      saveCurrentDraft(data);
      return { id: targetItem.id, slug: targetItem.slug };
    }

    const id = 'inv_' + Math.random().toString(36).slice(2, 9);
    const slug = makeSlug(data.hero?.groomName, data.hero?.brideName);
    const newItem = {
      id,
      slug,
      name,
      createdAt: now,
      updatedAt: now,
      data,
    };
    all.unshift(newItem);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    saveCurrentDraft(data);
    return { id, slug };
  } catch (e) {
    console.error('Failed to save invitation', e);
    throw new Error('Local storage save failed: ' + (e.message || 'Storage full'));
  }
}

export function deleteSavedInvitation(id) {
  try {
    const all = getAllSavedInvitations();
    const filtered = all.filter((i) => i.id !== id && i.slug !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (e) {
    console.error('Failed to delete invitation', e);
  }
}

export function saveRsvpResponse(slug, rsvp) {
  try {
    const raw = localStorage.getItem(RSVP_KEY);
    const all = raw ? JSON.parse(raw) : {};
    const list = all[slug] || [];
    list.push({
      ...rsvp,
      id: Math.random().toString(36).slice(2, 9),
      submittedAt: new Date().toISOString(),
    });
    all[slug] = list;
    localStorage.setItem(RSVP_KEY, JSON.stringify(all));
    return true;
  } catch (e) {
    console.error('Failed to save RSVP', e);
    return false;
  }
}

export function getRsvpResponses(slug) {
  try {
    const raw = localStorage.getItem(RSVP_KEY);
    if (!raw) return [];
    const all = JSON.parse(raw);
    return all[slug] || [];
  } catch (e) {
    return [];
  }
}

export function exportInvitationJson(data) {
  const name = `${data.hero?.groomName || 'Groom'}_and_${data.hero?.brideName || 'Bride'}_wedding_invite.json`
    .toLowerCase()
    .replace(/\s+/g, '_');
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
