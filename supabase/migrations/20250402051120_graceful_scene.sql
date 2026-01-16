-- Create admin user with proper authentication setup
DO $$
DECLARE
  new_user_id uuid;
BEGIN
  -- Insert into auth.users with all required fields
  INSERT INTO auth.users (
    id,
    instance_id,
    email,
    encrypted_password,
    email_confirmed_at,
    aud,
    role,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    email_change_token_new,
    recovery_token
  )
  VALUES (
    gen_random_uuid(),
    '00000000-0000-0000-0000-000000000000',
    'hello@renzoproano.com',
    crypt('@Mustafa20!', gen_salt('bf')),
    now(),
    'authenticated',
    'authenticated',
    jsonb_build_object(
      'provider', 'email',
      'providers', ARRAY['email']
    ),
    jsonb_build_object(
      'name', 'Renzo Proano'
    ),
    now(),
    now(),
    '',
    '',
    ''
  )
  ON CONFLICT (email) DO 
  UPDATE SET
    encrypted_password = crypt('@Mustafa20!', gen_salt('bf')),
    email_confirmed_at = now(),
    updated_at = now()
  RETURNING id INTO new_user_id;

  -- Create or update user profile
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
  ON CONFLICT (id) DO 
  UPDATE SET
    role = 'admin',
    updated_at = now();
END $$;