const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load env
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '..', '.env.local') });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
// Use service_role key to bypass RLS
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(url, key, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function main() {
  // Read the SQL file
  const sqlPath = path.resolve(__dirname, '..', 'docs', 'schema.sql');
  let sql;
  
  if (fs.existsSync(sqlPath)) {
    sql = fs.readFileSync(sqlPath, 'utf8');
    console.log(`Found schema.sql (${sql.length} chars)`);
  } else {
    // The SQL from the task - write it inline
    sql = `
-- =============================================
-- 1. Profiles (extends Supabase auth.users)
-- =============================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  bio TEXT,
  membership_tier TEXT DEFAULT 'free' CHECK (membership_tier IN ('free', 'basic', 'premium')),
  membership_expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- =============================================
-- 2. user_roles (for future RBAC)
-- =============================================
CREATE TABLE IF NOT EXISTS user_roles (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('member', 'instructor', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, role)
);

-- =============================================
-- 3. media_items (unified: images & YouTube videos)
-- =============================================
CREATE TABLE IF NOT EXISTS media_items (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  media_type TEXT NOT NULL CHECK (media_type IN ('image', 'youtube')),
  image_url TEXT,
  youtube_url TEXT,
  thumbnail_url TEXT,
  category TEXT DEFAULT 'uncategorized',
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT media_has_content CHECK (
    (media_type = 'image' AND image_url IS NOT NULL) OR
    (media_type = 'youtube' AND youtube_url IS NOT NULL)
  )
);

-- =============================================
-- RLS Policies
-- =============================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_items ENABLE ROW LEVEL SECURITY;

-- Profiles
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- User roles
DROP POLICY IF EXISTS "Users can view own roles" ON user_roles;
CREATE POLICY "Users can view own roles" ON user_roles FOR SELECT USING (auth.uid() = user_id);

-- Media items
DROP POLICY IF EXISTS "Anyone can view published media" ON media_items;
DROP POLICY IF EXISTS "Users can manage own media" ON media_items;
CREATE POLICY "Anyone can view published media" ON media_items FOR SELECT USING (is_published = true);
CREATE POLICY "Users can manage own media" ON media_items FOR ALL USING (auth.uid() = user_id);
`;
    console.log('Using inline SQL');
  }

  // Supabase doesn't support raw SQL execution via JS client directly.
  // We need to use the pgREST or management API for that.
  // Let me try via the direct REST API with service_role key.
  
  const sqlEndpoint = `${url}/rest/v1/`;
  
  // Try using the SQL query approach - Supabase has a pg_execute endpoint
  // Actually, let me try the supabase-js approach: use the service_role client
  // and execute via the `rpc` endpoint if the pg_execute function exists.
  
  try {
    // Try the database REST API directly using fetch
    const response = await fetch(`${url}/rest/v1/pg_dump`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': key,
        'Authorization': `Bearer ${key}`,
      },
      body: JSON.stringify({ query: sql }),
    });
    
    console.log('Response status:', response.status);
    const text = await response.text();
    console.log('Response:', text.substring(0, 500));
  } catch (err) {
    console.error('Error:', err.message);
  }
}

main().catch(console.error);
