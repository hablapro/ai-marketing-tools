/*
  # Add FAQs table and policies

  1. New Tables
    - `faqs` table for storing tool FAQs
      - `id` (uuid, primary key)
      - `tool_id` (uuid, foreign key to tools)
      - `question` (text)
      - `answer` (text)
      - `sort_order` (integer) - renamed from 'order' to avoid reserved keyword
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS
    - Add admin access policy
    - Add public read access policy
*/

-- Create FAQs table
CREATE TABLE IF NOT EXISTS faqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_id uuid REFERENCES tools(id) ON DELETE CASCADE,
  question text NOT NULL,
  answer text NOT NULL,
  sort_order integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow full access for admins" ON faqs
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.role = 'admin'
    )
  );

CREATE POLICY "Allow public read access" ON faqs
  FOR SELECT
  TO public
  USING (true);

-- Add updated_at trigger
CREATE TRIGGER update_faqs_updated_at
  BEFORE UPDATE ON faqs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();