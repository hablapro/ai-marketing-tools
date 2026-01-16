/*
  # Create admin user and profile

  1. Changes
    - Create initial admin user
    - Set up user profile with admin role
    
  2. Security
    - Password will be set through Supabase Auth UI
    - User profile linked to auth user
*/

-- Create the admin user profile
INSERT INTO auth.users (
  id,
  email,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_user_meta_data
)
SELECT 
  gen_random_uuid(),
  'hello@renzoproano.com',
  now(),
  now(),
  now(),
  '{"name": "Renzo Proano"}'::jsonb
WHERE NOT EXISTS (
  SELECT 1 FROM auth.users WHERE email = 'hello@renzoproano.com'
);

-- Create user profile for admin
INSERT INTO public.user_profiles (
  id,
  role,
  created_at,
  updated_at
)
SELECT 
  id,
  'admin',
  now(),
  now()
FROM auth.users 
WHERE email = 'hello@renzoproano.com'
AND NOT EXISTS (
  SELECT 1 FROM public.user_profiles WHERE id = auth.users.id
);