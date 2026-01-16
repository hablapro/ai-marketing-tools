/*
  # Update Business Idea Evaluator fields

  1. Changes
    - Simplify Business Idea Evaluator to have a single field
    - Update field configuration with new label and value
*/

-- Update Business Idea Evaluator fields
UPDATE tools
SET fields = jsonb_build_array(
  jsonb_build_object(
    'name', 'idea',
    'label', 'What''s your business idea?',
    'type', 'textarea',
    'placeholder', 'Describe your business idea...',
    'required', true
  )
)
WHERE url = '/tools/business-idea';