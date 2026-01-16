/*
  # Update tools access policies

  1. Changes
    - Add public read access to tools table
    - Keep admin-only write access
  
  2. Security
    - Enables public read access for tools
    - Maintains admin-only access for modifications
*/

-- Add public read access policy for tools
CREATE POLICY "Allow public read access" ON tools
  FOR SELECT
  TO public
  USING (true);

-- Add public read access policy for tool_fields
CREATE POLICY "Allow public read access" ON tool_fields
  FOR SELECT
  TO public
  USING (true);

-- Add public read access policy for hero_sections
CREATE POLICY "Allow public read access" ON hero_sections
  FOR SELECT
  TO public
  USING (true);