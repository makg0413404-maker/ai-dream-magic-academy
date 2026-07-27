const { createClient } = require('@supabase/supabase-js');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '..', '.env.local') });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const svcKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('anonKey:', anonKey);
console.log('svcKey:', svcKey);

async function main() {
  // Try using the anon key first for a simple query  
  const anonClient = createClient(url, anonKey);
  
  // Try selecting from a known existing table to check connectivity
  const { data: events, error: eventsError } = await anonClient
    .from('events')
    .select('slug')
    .limit(1);
  
  console.log('\nevents query:', eventsError ? `ERROR: ${eventsError.message}` : `OK - ${events?.length} rows`);
  
  // Check if profiles table exists (it might from a previous run)
  const { data: profiles, error: profilesError } = await anonClient
    .from('profiles')
    .select('id')
    .limit(1);
  
  console.log('profiles query:', profilesError ? `ERROR: ${profilesError.message}` : `OK - ${profiles?.length} rows`);
}

main().catch(console.error);
