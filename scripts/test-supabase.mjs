// Supabase 連線測試與 Schema 驗證腳本
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rmttsdqrcxabhxaywaaz.supabase.co'
const anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJtdHRzZHFyY3hhYmh4YXl3YWF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUxNDI2MDcsImV4cCI6MjEwMDcxODYwN30.vZwdLv7lV8sut6OLSWmXQaUcZLPBoQebRk_4ETi2c8U'

const supabase = createClient(supabaseUrl, anonKey)

async function test() {
  // Test 1: Try to read events (should work with RLS)
  const { data: events, error: eventsError } = await supabase
    .from('events')
    .select('*')
  
  console.log('=== Events Table ===')
  if (eventsError) {
    console.log('Error:', eventsError.message)
    console.log('Hint: Schema may not exist yet or RLS blocking')
  } else {
    console.log('Success! Events:', JSON.stringify(events, null, 2))
  }

  // Test 2: Try to read event_registrations
  const { data: registrations, error: regError } = await supabase
    .from('event_registrations')
    .select('count', { count: 'exact', head: true })
  
  console.log('\n=== Event Registrations Table ===')
  if (regError) {
    console.log('Error:', regError.message)
  } else {
    console.log('Success! Table exists')
  }

  // Test 3: Try to read contact_messages
  const { data: contacts, error: contactError } = await supabase
    .from('contact_messages')
    .select('count', { count: 'exact', head: true })
  
  console.log('\n=== Contact Messages Table ===')
  if (contactError) {
    console.log('Error:', contactError.message)
  } else {
    console.log('Success! Table exists')
  }
}

test()
