/*
  # Reorder tools

  1. Changes
    - Update tools order based on new sequence
    - Maintain all existing tool configurations
    
  2. Order
    1. Business Plan
    2. Business Idea Evaluator
    3. Pitch Genie
    4. Hero Genie
    5. Facebook Ad Copy
    6. Reel Genie
    7. SEO Audit
    8. Email Wizard
*/

-- First, add a sort_order column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'tools' AND column_name = 'sort_order'
  ) THEN
    ALTER TABLE tools ADD COLUMN sort_order integer DEFAULT 0;
  END IF;
END $$;

-- Update the sort order for each tool
UPDATE tools SET sort_order = 
  CASE 
    WHEN url = '/tools/business-plan' THEN 1
    WHEN url = '/tools/business-idea' THEN 2
    WHEN url = '/tools/pitch-genie' THEN 3
    WHEN url = '/tools/hero-genie' THEN 4
    WHEN url = '/tools/facebook-ad-copy' THEN 5
    WHEN url = '/tools/reel-optimizer' THEN 6
    WHEN url = '/tools/seo-audit' THEN 7
    ELSE 8  -- Email Wizard (coming soon)
  END;

-- Create an index on sort_order for better query performance
CREATE INDEX IF NOT EXISTS idx_tools_sort_order ON tools(sort_order);