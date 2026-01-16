/*
  # Update Business Plan form fields

  1. Changes
    - Update the fields for the Business Plan tool with new form fields
    - Set specific field names and labels as requested
*/

-- Update Business Plan fields
UPDATE tools
SET fields = jsonb_build_array(
  jsonb_build_object(
    'name', 'businessIdea',
    'label', 'What''s your business idea?',
    'type', 'textarea',
    'placeholder', 'Describe your business idea...',
    'required', true
  ),
  jsonb_build_object(
    'name', 'problemOpportunity',
    'label', 'What''s the problem oportunity?',
    'type', 'textarea',
    'placeholder', 'Describe the problem or opportunity...',
    'required', true
  ),
  jsonb_build_object(
    'name', 'solution',
    'label', 'What''s your solution?',
    'type', 'textarea',
    'placeholder', 'Describe your solution...',
    'required', true
  )
)
WHERE url = '/tools/business-plan';