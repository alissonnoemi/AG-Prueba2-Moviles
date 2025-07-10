import { createClient } from '@supabase/supabase-js'
// Create a single supabase client for interacting with your database
export const supabase = createClient
('https://grhpuvrzeusshsiyviyv.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdyaHB1dnJ6ZXVzc2hzaXl2aXl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIxNTA0MjcsImV4cCI6MjA2NzcyNjQyN30.qizyNoYSNgJP6_jXxlIgWR9eFHLD6c6mxrIAnWQjaGU'
)