/*
  # Update tools table fields structure

  1. Changes
    - Add JSONB fields column to tools table for storing field configurations
    - Update RLS policies for proper access control
  
  2. Security
    - Enable RLS on tools table
    - Add policies for admin access and public read
*/

-- Add fields column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'tools' AND column_name = 'fields'
  ) THEN
    ALTER TABLE tools ADD COLUMN fields JSONB DEFAULT '[]'::jsonb;
  END IF;
END $$;

-- Enable RLS
ALTER TABLE tools ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Allow full access for admins" ON tools;
DROP POLICY IF EXISTS "Allow public read access" ON tools;

-- Create policy for admin users (full access)
CREATE POLICY "Allow full access for admins" ON tools
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.role = 'admin'::user_role
    )
  );

-- Create policy for public read access
CREATE POLICY "Allow public read access" ON tools
  FOR SELECT
  TO public
  USING (true);