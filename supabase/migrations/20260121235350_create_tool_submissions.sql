/*
  # Create tool_submissions table for user results history

  1. New Tables
    - `tool_submissions` - Store user tool submissions and results

  2. Security
    - Enable RLS on table
    - Add policies so users can only see/manage their own submissions

  3. Indexes
    - Index on user_id for fast filtering
    - Index on created_at for chronological sorting
*/

-- Create tool_submissions table
CREATE TABLE IF NOT EXISTS tool_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  tool_id uuid NOT NULL REFERENCES tools(id) ON DELETE CASCADE,
  tool_name text NOT NULL,
  form_data jsonb NOT NULL,
  result jsonb,
  status text DEFAULT 'success' CHECK (status IN ('success', 'pending', 'failed')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_tool_submissions_user_id ON tool_submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_tool_submissions_tool_id ON tool_submissions(tool_id);
CREATE INDEX IF NOT EXISTS idx_tool_submissions_created_at ON tool_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_tool_submissions_user_created ON tool_submissions(user_id, created_at DESC);

-- Enable Row Level Security
ALTER TABLE tool_submissions ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view only their own submissions
CREATE POLICY "Users can view own submissions"
  ON tool_submissions FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can insert only their own submissions
CREATE POLICY "Users can insert own submissions"
  ON tool_submissions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update only their own submissions
CREATE POLICY "Users can update own submissions"
  ON tool_submissions FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can delete only their own submissions
CREATE POLICY "Users can delete own submissions"
  ON tool_submissions FOR DELETE
  USING (auth.uid() = user_id);

-- Grant permissions to authenticated users
GRANT SELECT, INSERT, UPDATE, DELETE ON tool_submissions TO authenticated;
GRANT USAGE ON SCHEMA public TO authenticated;
