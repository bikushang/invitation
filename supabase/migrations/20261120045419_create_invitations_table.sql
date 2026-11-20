/*
# Create invitations table (single-tenant, no auth)

1. New Tables
- `invitations`
- `id` (uuid, primary key)
- `slug` (text, unique, used in shareable preview URL)
- `name` (text, optional human label for the builder sidebar)
- `data` (jsonb, the full invitation content + theme + animation settings)
- `created_at` (timestamp)
- `updated_at` (timestamp)

2. Security
- Enable RLS on `invitations`.
- Grant CRUD to `anon` + `authenticated` so the anon-key frontend can reach the table.
- Allow anon + authenticated CRUD because the data is intentionally shared/public (no sign-in screen).
*/

CREATE TABLE IF NOT EXISTS invitations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text,
  data jsonb NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE invitations ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT, UPDATE, DELETE ON invitations TO anon, authenticated;

DROP POLICY IF EXISTS "anon_select_invitations" ON invitations;
CREATE POLICY "anon_select_invitations" ON invitations FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_invitations" ON invitations;
CREATE POLICY "anon_insert_invitations" ON invitations FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_invitations" ON invitations;
CREATE POLICY "anon_update_invitations" ON invitations FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_invitations" ON invitations;
CREATE POLICY "anon_delete_invitations" ON invitations FOR DELETE
  TO anon, authenticated USING (true);
