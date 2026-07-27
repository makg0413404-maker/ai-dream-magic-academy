-- AI Dream Magic Academy Schema
CREATE TABLE IF NOT EXISTS events (
  id BIGSERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  max_participants INTEGER NOT NULL DEFAULT 50,
  registration_deadline TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS event_registrations (
  id BIGSERIAL PRIMARY KEY,
  event_slug TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  note TEXT,
  status TEXT DEFAULT 'confirmed' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(event_slug, email)
);

CREATE TABLE IF NOT EXISTS contact_messages (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO events (slug, title, max_participants) VALUES
('midjourney-intro', 'AI 繪圖入門：Midjourney 快速上手', 50),
('chatgpt-workshop', 'ChatGPT 實戰工作坊', 30),
('ai-essential-skills', 'AI 時代的必備技能', 100),
('senior-ai-intro', '熟齡族 AI 輕鬆學講座', 40)
ON CONFLICT (slug) DO NOTHING;
