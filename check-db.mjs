import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(url, anonKey);

async function tryQuery(table) {
  const { data, error } = await supabase.from(table).select('*').limit(1);
  if (error) {
    return { exists: false, error: error.message, code: error.code };
  }
  return { exists: true, data };
}

async function main() {
  console.log('=== Checking Supabase Tables ===');
  
  const tables = ['events', 'event_registrations', 'contact_messages'];
  for (const t of tables) {
    const result = await tryQuery(t);
    console.log(`${t}: ${result.exists ? 'EXISTS' : 'NOT FOUND'} ${result.error || ''}`);
    if (result.exists) {
      console.log(`  Sample: ${JSON.stringify(result.data)}`);
    }
  }
  
  // Try querying information schema directly via SQL API
  console.log('\n=== Trying SQL API (RPC) ===');
  try {
    // List tables via postgREST schema cache
    const resp = await fetch(`${url}/rest/v1/`, {
      headers: {
        'apikey': anonKey,
        'Authorization': `Bearer ${anonKey}`,
        'Accept': 'application/json'
      }
    });
    const text = await resp.text();
    console.log('Root response:', text.substring(0, 200));
  } catch(e) {
    console.log('Error:', e.message);
  }

  // Try OpenAPI schema
  console.log('\n=== Trying OpenAPI ===');
  try {
    const resp = await fetch(`${url}/rest/v1/`, {
      headers: {
        'apikey': anonKey,
        'Authorization': `Bearer ${anonKey}`,
        'Accept': 'application/openapi+json'
      }
    });
    const text = await resp.text();
    console.log('OpenAPI response length:', text.length);
    if (text.length < 500) console.log(text);
  } catch(e) {
    console.log('Error:', e.message);
  }
}

main().catch(console.error);
