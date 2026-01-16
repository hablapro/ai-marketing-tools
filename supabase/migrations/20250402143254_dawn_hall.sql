/*
  # Update Business Idea Evaluator field name

  1. Changes
    - Update the field name from 'idea' to 'Idea'
*/

-- Update Business Idea Evaluator field name
UPDATE tools
SET fields = jsonb_build_array(
  jsonb_build_object(
    'name', 'Idea',
    'label', 'What''s your business idea?',
    'type', 'textarea',
    'placeholder', 'Describe your business idea...',
    'required', true
  )
)
WHERE url = '/tools/business-idea';