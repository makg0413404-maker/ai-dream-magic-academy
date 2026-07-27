// Get the actual full keys from env and print them for debugging
const path = require('path');
const dotenv = require('dotenv');
const fs = require('fs');

dotenv.config({ path: path.resolve(__dirname, '..', '.env.local') });

const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const svcKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('ANON_KEY=' + anonKey);
console.log('---');
console.log('SVC_KEY=' + svcKey);
