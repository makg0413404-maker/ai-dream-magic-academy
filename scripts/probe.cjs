const { createClient } = require('@supabase/supabase-js');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '..', '.env.local') });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('URL:', url);
console.log('Key prefix:', key?.substring(0, 15) + '...');

const supabase = createClient(url, key, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function main() {
  // Step 1: Try direct SQL via the Supabase REST API's raw query capability
  // The service_role key should work with the /rest/v1/ endpoint for postgREST
  
  // Use the supabase.rpc to call any pg function
  // But first, let's just try a simple SELECT via the client library
  try {
    // Try using the sql() method if available
    const { data, error } = await supabase.rpc('version');
    console.log('RPC version:', { data, error: error?.message });
  } catch (e) {
    console.log('RPC failed:', e.message);
  }
  
  // Try a different approach: create a test RPC function
  // Actually, we can use the pg_graphql extension
  try {
    // Use raw REST call to postgREST with prepared statement execution
    const query = encodeURIComponent(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name
    `);
    
    const response = await fetch(`${url}/rest/v1/rpc/`, {
      method: 'GET',
      headers: {
        'apikey': key,
        'Authorization': `Bearer ${key}`,
      },
    });
    
    console.log('RPC list status:', response.status);
    const text = await response.text();
    console.log('RPC list:', text.substring(0, 300));
  } catch (e) {
    console.log('RPC list failed:', e.message);
  }
}

main().catch(console.error);
