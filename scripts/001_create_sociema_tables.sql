-- Create publications table
CREATE TABLE IF NOT EXISTS publications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  type TEXT NOT NULL,
  authors TEXT NOT NULL,
  year TEXT NOT NULL,
  link TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create team_members table (Consejo Ejecutivo)
CREATE TABLE IF NOT EXISTS team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  image_url TEXT,
  instagram TEXT,
  linkedin TEXT,
  email TEXT,
  order_position INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create committee_directors table
CREATE TABLE IF NOT EXISTS committee_directors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  committee_name TEXT NOT NULL,
  committee_slug TEXT NOT NULL,
  committee_type TEXT NOT NULL CHECK (committee_type IN ('ifmsa', 'socimep')),
  role TEXT NOT NULL DEFAULT 'Director(a)',
  image_url TEXT,
  instagram TEXT,
  linkedin TEXT,
  email TEXT,
  order_position INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE publications ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE committee_directors ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (anyone can view)
CREATE POLICY "Allow public read access on publications" ON publications FOR SELECT USING (true);
CREATE POLICY "Allow public read access on team_members" ON team_members FOR SELECT USING (true);
CREATE POLICY "Allow public read access on committee_directors" ON committee_directors FOR SELECT USING (true);

-- Insert sample publications
INSERT INTO publications (title, type, authors, year, link, image_url) VALUES
('Factores asociados a la adherencia al tratamiento en pacientes diabéticos', 'Artículo Original', 'García M, Rodríguez C, López A', '2026', '#', NULL),
('Revisión sistemática sobre el uso de telemedicina en zonas rurales', 'Revisión Sistemática', 'Mendoza L, Sánchez P', '2025', '#', NULL),
('Impacto del estrés académico en estudiantes de medicina', 'Artículo Original', 'Torres R, García M', '2025', '#', NULL),
('Caso clínico: Síndrome de Guillain-Barré post-infección', 'Caso Clínico', 'López A, Mendoza L, Sánchez P', '2024', '#', NULL),
('Prevalencia de anemia en escolares de comunidades altoandinas', 'Artículo Original', 'Rodríguez C, Torres R', '2024', '#', NULL);

-- Insert sample team members (Consejo Ejecutivo)
INSERT INTO team_members (name, role, image_url, instagram, linkedin, email, order_position) VALUES
('Juan Pérez García', 'Presidente', NULL, 'juanperez', 'juanperez', 'presidente@sociema.org', 1),
('María López Mendoza', 'Vicepresidenta', NULL, 'marialopez', 'marialopez', 'vicepresidenta@sociema.org', 2),
('Carlos Rodríguez Silva', 'Secretario General', NULL, 'carlosrodriguez', 'carlosrodriguez', 'secretario@sociema.org', 3),
('Ana Torres Vargas', 'Tesorera', NULL, 'anatorres', 'anatorres', 'tesorera@sociema.org', 4),
('Pedro Sánchez Luna', 'Director Científico', NULL, 'pedrosanchez', 'pedrosanchez', 'cientifico@sociema.org', 5);

-- Insert sample committee directors (IFMSA)
INSERT INTO committee_directors (name, committee_name, committee_slug, committee_type, role, image_url, instagram, linkedin, email, order_position) VALUES
('Laura Martínez', 'SCORA', 'scora', 'ifmsa', 'Director(a)', NULL, 'lauramartinez', 'lauramartinez', 'scora@sociema.org', 1),
('Diego Fernández', 'SCORP', 'scorp', 'ifmsa', 'Director(a)', NULL, 'diegofernandez', 'diegofernandez', 'scorp@sociema.org', 2),
('Sofía Castillo', 'SCOPH', 'scoph', 'ifmsa', 'Director(a)', NULL, 'sofiacastillo', 'sofiacastillo', 'scoph@sociema.org', 3),
('Andrés Morales', 'SCOPE', 'scope', 'ifmsa', 'Director(a)', NULL, 'andresmorales', 'andresmorales', 'scope@sociema.org', 4),
('Valentina Reyes', 'SCORE', 'score', 'ifmsa', 'Director(a)', NULL, 'valentinareyes', 'valentinareyes', 'score@sociema.org', 5),
('Gabriel Herrera', 'SCOME', 'scome', 'ifmsa', 'Director(a)', NULL, 'gabrielherrera', 'gabrielherrera', 'scome@sociema.org', 6);

-- Insert sample committee directors (SOCIMEP)
INSERT INTO committee_directors (name, committee_name, committee_slug, committee_type, role, image_url, instagram, linkedin, email, order_position) VALUES
('Camila Vega', 'CPA', 'cpa', 'socimep', 'Director(a)', NULL, 'camilavega', 'camilavega', 'cpa@sociema.org', 1),
('Mateo Ríos', 'CPC', 'cpc', 'socimep', 'Director(a)', NULL, 'mateorios', 'mateorios', 'cpc@sociema.org', 2),
('Isabella Paz', 'CPPC', 'cppc', 'socimep', 'Director(a)', NULL, 'isabellapaz', 'isabellapaz', 'cppc@sociema.org', 3),
('Sebastián Cruz', 'CPDII', 'cpdii', 'socimep', 'Director(a)', NULL, 'sebastiancruz', 'sebastiancruz', 'cpdii@sociema.org', 4),
('Luciana Flores', 'CPRII', 'cprii', 'socimep', 'Director(a)', NULL, 'lucianaflores', 'lucianaflores', 'cprii@sociema.org', 5),
('Nicolás Paredes', 'CPAIS', 'cpais', 'socimep', 'Director(a)', NULL, 'nicolasparedes', 'nicolasparedes', 'cpais@sociema.org', 6);
