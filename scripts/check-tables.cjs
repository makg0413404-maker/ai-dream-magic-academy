const { createClient } = require('@supabase/supabase-js');

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(url, key);

async function main() {
  const checks = [
    ['profiles', await supabase.from('profiles').select('id').limit(1)],
    ['user_roles', await supabase.from('user_roles').select('id').limit(1)],
    ['media_items', await supabase.from('media_items').select('id').limit(1)],
  ];

  for (const [name, { data, error }] of checks) {
    if (error && error.message.includes('Could not find the table')) {
      console.log(`${name}: MISSING`);
    } else if (error) {
      console.log(`${name}: ERROR - ${error.message}`);
    } else {
      console.log(`${name}: EXISTS (${data?.length || 0} rows)`);
    }
  }
}

main().catch(console.error);
