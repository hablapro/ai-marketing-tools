/*
  # Create user profiles schema

  1. New Types
    - user_role enum: admin, editor, viewer
    
  2. New Tables
    - user_profiles
      - id (uuid, primary key)
      - role (user_role)
      - two_factor_enabled (boolean)
      - two_factor_secret (text)
      - last_login (timestamptz)
      - created_at (timestamptz)
      - updated_at (timestamptz)
      
  3. Security
    - Enable RLS
    - Add policies for user access
*/

-- Drop type if exists and recreate
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
        CREATE TYPE user_role AS ENUM ('admin', 'editor', 'viewer');
    END IF;
END $$;

-- Create user_profiles table if it doesn't exist
CREATE TABLE IF NOT EXISTS user_profiles (
    id uuid PRIMARY KEY,
    role user_role NOT NULL DEFAULT 'viewer',
    two_factor_enabled boolean NOT NULL DEFAULT false,
    two_factor_secret text,
    last_login timestamptz,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT fk_user FOREIGN KEY (id) REFERENCES auth.users (id) ON DELETE CASCADE
);

-- Enable RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
DO $$ BEGIN
    CREATE POLICY "Users can read own profile"
        ON user_profiles
        FOR SELECT
        TO authenticated
        USING (auth.uid() = id);
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE POLICY "Admins can manage all profiles"
        ON user_profiles
        FOR ALL
        TO authenticated
        USING (
            EXISTS (
                SELECT 1 FROM user_profiles
                WHERE user_profiles.id = auth.uid()
                AND user_profiles.role = 'admin'
            )
        );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create updated_at trigger function if it doesn't exist
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger if it doesn't exist
DO $$ BEGIN
    CREATE TRIGGER update_user_profiles_updated_at
        BEFORE UPDATE ON user_profiles
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at();
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;