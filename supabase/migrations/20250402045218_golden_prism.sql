/*
  # CMS System Tables

  1. New Tables
    - `tools`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `icon` (text)
      - `category` (text)
      - `status` (text)
      - `url` (text)
      - `webhook_url` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `tool_fields`
      - `id` (uuid, primary key)
      - `tool_id` (uuid, foreign key)
      - `name` (text)
      - `label` (text)
      - `type` (text)
      - `placeholder` (text)
      - `validation` (jsonb)
      - `sort_order` (integer)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `hero_sections`
      - `id` (uuid, primary key)
      - `tool_id` (uuid, foreign key)
      - `title` (text)
      - `description` (text)
      - `primary_cta` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for admin access
*/

-- Create tools table
CREATE TABLE IF NOT EXISTS tools (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  icon text NOT NULL,
  category text NOT NULL,
  status text NOT NULL,
  url text,
  webhook_url text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create tool_fields table
CREATE TABLE IF NOT EXISTS tool_fields (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_id uuid REFERENCES tools(id) ON DELETE CASCADE,
  name text NOT NULL,
  label text NOT NULL,
  type text NOT NULL,
  placeholder text,
  validation jsonb DEFAULT '{}',
  sort_order integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create hero_sections table
CREATE TABLE IF NOT EXISTS hero_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_id uuid REFERENCES tools(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text NOT NULL,
  primary_cta text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE tool_fields ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_sections ENABLE ROW LEVEL SECURITY;

-- Create policies for admin access
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

CREATE POLICY "Allow full access for admins" ON tool_fields
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.role = 'admin'
    )
  );

CREATE POLICY "Allow full access for admins" ON hero_sections
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.role = 'admin'
    )
  );

-- Add updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_tools_updated_at
  BEFORE UPDATE ON tools
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_tool_fields_updated_at
  BEFORE UPDATE ON tool_fields
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_hero_sections_updated_at
  BEFORE UPDATE ON hero_sections
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();