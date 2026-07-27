-- =============================================
-- AI 圓夢魔法學院 · Supabase Schema
-- Sprint 2：後端串接＋表單儲存
-- 執行方式：在 Supabase SQL Editor 中執行
-- =============================================

-- 1. Events table（活動主檔）
CREATE TABLE IF NOT EXISTS events (
  id BIGSERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  max_participants INTEGER NOT NULL DEFAULT 50,
  registration_deadline TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Event registrations（講座報名記錄）
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

-- 3. Contact messages（聯絡表單記錄）
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

-- =============================================
-- Seed data: 活動種子資料
-- =============================================
INSERT INTO events (slug, title, max_participants) VALUES
('midjourney-intro', 'AI 繪圖入門：Midjourney 快速上手', 50),
('chatgpt-workshop', 'ChatGPT 實戰工作坊', 30),
('ai-essential-skills', 'AI 時代的必備技能', 100),
('senior-ai-intro', '熟齡族 AI 輕鬆學講座', 40)
ON CONFLICT (slug) DO NOTHING;
