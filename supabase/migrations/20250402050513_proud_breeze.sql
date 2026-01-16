/*
  # Create admin user with password

  1. Creates admin user in auth.users with proper password hash
  2. Creates corresponding user profile with admin role
  3. Handles cases where user might already exist
*/

DO $$
DECLARE
  new_user_id uuid := gen_random_uuid();
BEGIN
  -- Insert into auth.users with all required fields
  INSERT INTO auth.users (
    id,
    instance_id,
    email,
    encrypted_password,
    email_confirmed_at,
    recovery_sent_at,
    last_sign_in_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    email_change_token_new,
    recovery_token
  )
  VALUES (
    new_user_id,
    '00000000-0000-0000-0000-000000000000',
    'hello@renzoproano.com',
    crypt('@Mustafa20!', gen_salt('bf')),
    now(),
    now(),
    now(),
    '{"provider":"email","providers":["email"]}',
    '{"name":"Renzo Proano"}',
    now(),
    now(),
    '',
    '',
    ''
  )
  ON CONFLICT (email) DO NOTHING;

  -- Get the user id (either new or existing)
  SELECT id INTO new_user_id
  FROM auth.users
  WHERE email = 'hello@renzoproano.com';

  -- Create user profile if it doesn't exist
  INSERT INTO public.user_profiles (
    id,
    role,
    created_at,
    updated_at
  )
  VALUES (
    new_user_id,
    'admin',
    now(),
    now()
  )
  ON CONFLICT (id) DO NOTHING;
END $$;