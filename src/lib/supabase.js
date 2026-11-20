// Local storage is used for offline persistence.
// Supabase mock export to prevent any build or runtime errors.

export const supabase = {
  from: () => ({
    select: () => ({
      eq: () => ({
        maybeSingle: async () => ({ data: null, error: null }),
      }),
    }),
    insert: () => ({
      select: () => ({
        maybeSingle: async () => ({ data: null, error: null }),
      }),
    }),
    update: () => ({
      eq: async () => ({ error: null }),
    }),
  }),
};

export function makeSlug(groom = 'groom', bride = 'bride') {
  const part = () => Math.random().toString(36).slice(2, 6);
  return `${part()}${part()}`;
}
