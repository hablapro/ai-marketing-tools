/*
  # Fix RLS policies for tools table

  1. Changes
    - Enable RLS on tools table
    - Add policy for admin users to have full access
    - Add policy for public read access
    
  2. Security
    - Admins can perform all operations
    - Public users can only read tools
*/

-- Enable RLS on tools table
ALTER TABLE tools ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
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