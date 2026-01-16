/*
  # Add tool features and pricing

  1. New Columns
    - Add features array to tools table
    - Add pricing JSON object to tools table
    
  2. Changes
    - Modify existing tools table structure
    - Maintain existing RLS policies
*/

-- Add new columns to tools table
ALTER TABLE tools 
ADD COLUMN IF NOT EXISTS features text[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS pricing jsonb DEFAULT NULL;

-- Update RLS policies to include new columns
DO $$ 
BEGIN
  -- Refresh admin policy to ensure it covers new columns
  DROP POLICY IF EXISTS "Allow full access for admins" ON tools;
  
  CREATE POLICY "Allow full access for admins" ON tools
    FOR ALL
    TO authenticated
    USING (
      EXISTS (
        SELECT 1 FROM user_profiles
        WHERE user_profiles.id = auth.uid()
        AND user_profiles.role = 'admin'
      )
    );
END $$;