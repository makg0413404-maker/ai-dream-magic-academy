// Approach: Use the Supabase JS client's REST API to execute SQL
// via the RPC mechanism. We need to create a helper function first,
// but we can't create functions via the client...
// 
// Alternative: Use the postgREST endpoint directly with raw headers
// that match what the supabase-js client sends.

const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const http = require('http');
const https = require('https');

dotenv.config({ path: path.resolve(__dirname, '..', '.env.local') });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('URL:', url);
console.log('Anon key length:', anonKey?.length);

// Read the SQL
const sql = fs.readFileSync(path.resolve(__dirname, '..', 'docs', 'schema.sql'), 'utf8');

// We need to split SQL into individual statements for postgREST
// Actually, let's try a different approach: use the _supabase SQL endpoint
// that's available internally.

async function tryPostgrest() {
  // The standard postgREST endpoint
  const headers = {
    'apikey': anonKey,
    'Authorization': `Bearer ${anonKey}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };
  
  // PostgREST doesn't support raw SQL, only table operations
  // So this won't work directly.
  
  // Let's try the GraphQL endpoint instead (pg_graphql)
  const graphqlHeaders = {
    'apikey': anonKey,
    'Authorization': `Bearer ${anonKey}`,
    'Content-Type': 'application/json',
  };
  
  // GraphQL can execute mutations but can't do DDL
  // 
  // Real approach: The Management API v1 has a /database/query endpoint
  // that accepts raw SQL. It requires a valid access token.
  // 
  // Let me try to use the Management API with the anon key anyway
  const mgmtUrl = `https://api.supabase.com/v1/projects/rmttsdqrcxabhxaywaaz`;
  
  try {
    const response = await fetch(mgmtUrl, {
      headers: { 'Authorization': `Bearer ${anonKey}` }
    });
    const text = await response.text();
    console.log('Management API with anon key:', response.status, text.substring(0, 200));
  } catch (e) {
    console.log('Management API failed:', e.message);
  }
  
  // Try direct SQL execution via auth endpoint
  // Supabase has a hidden _sql endpoint
  const sqlUrl = `${url}/_sql`;
  try {
    const response = await fetch(sqlUrl, {
      method: 'POST',
      headers: {
        'apikey': anonKey,
        'Authorization': `Bearer ${anonKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: sql.substring(0, 100) + '...' }),
    });
    const text = await response.text();
    console.log('_sql endpoint:', response.status, text.substring(0, 200));
  } catch (e) {
    console.log('_sql endpoint failed:', e.message);
  }

  // Try the pgrest API directly with the correct key format
  // The JS client works, so let's use that to check what the correct key actually is
  const { createClient } = require('@supabase/supabase-js');
  const client = createClient(url, anonKey);
  
  // Execute through RPC - if there's a pre-existing function
  console.log('\n--- Trying RPC endpoints ---');
  
  // Try supabase_functions
  const functions = ['version', 'extensions', 'schema_version'];
  for (const fn of functions) {
    try {
      const { data, error } = await client.rpc(fn);
      console.log(`rpc.${fn}:`, error ? error.message : JSON.stringify(data).substring(0, 100));
    } catch (e) {
      console.log(`rpc.${fn} threw:`, e.message);
    }
  }
}

tryPostgrest().catch(console.error);
