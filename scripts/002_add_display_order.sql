-- Add display_order column to team_members if it doesn't exist
ALTER TABLE team_members ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;

-- Add display_order column to committee_directors if it doesn't exist
ALTER TABLE committee_directors ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;

-- Update display_order for existing team_members based on role
UPDATE team_members SET display_order = 1 WHERE role = 'Presidente';
UPDATE team_members SET display_order = 2 WHERE role = 'Vicepresidente';
UPDATE team_members SET display_order = 3 WHERE role = 'Secretario General';
UPDATE team_members SET display_order = 4 WHERE role = 'Director de Finanzas';
UPDATE team_members SET display_order = 5 WHERE role = 'Director de Comunicaciones';

-- Update display_order for existing committee_directors
UPDATE committee_directors SET display_order = id;
