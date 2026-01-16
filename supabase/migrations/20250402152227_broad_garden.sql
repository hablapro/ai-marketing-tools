/*
  # Update Pitch Genie and Hero Genie form fields

  1. Changes
    - Update Pitch Genie form fields with new structure
    - Update Hero Genie form fields with new structure
    
  2. Fields Added
    Pitch Genie:
      - businessName
      - websiteURL
      - businessType
      - targetAudience
      - cta
    
    Hero Genie:
      - businessDo
      - targetAudience
      - mainBenefit
      - cta
      - websiteUrl
*/

-- Update Pitch Genie fields
UPDATE tools
SET fields = jsonb_build_array(
  jsonb_build_object(
    'name', 'businessName',
    'label', 'Business Name',
    'type', 'text',
    'placeholder', 'Enter your business name',
    'required', true
  ),
  jsonb_build_object(
    'name', 'websiteURL',
    'label', 'Website URL',
    'type', 'text',
    'placeholder', 'https://example.com',
    'required', true
  ),
  jsonb_build_object(
    'name', 'businessType',
    'label', 'Type of Business',
    'type', 'text',
    'placeholder', 'e.g., E-commerce, SaaS, Local Service',
    'required', true
  ),
  jsonb_build_object(
    'name', 'targetAudience',
    'label', 'Target Audience',
    'type', 'textarea',
    'placeholder', 'Describe your ideal customer...',
    'required', true
  ),
  jsonb_build_object(
    'name', 'cta',
    'label', 'Call to Action',
    'type', 'text',
    'placeholder', 'e.g., Book Now, Get Started, Learn More',
    'required', true
  )
)
WHERE url = '/tools/pitch-genie';

-- Update Hero Genie fields
UPDATE tools
SET fields = jsonb_build_array(
  jsonb_build_object(
    'name', 'businessDo',
    'label', 'What does your business do?',
    'type', 'textarea',
    'placeholder', 'Describe your main product or service...',
    'required', true
  ),
  jsonb_build_object(
    'name', 'targetAudience',
    'label', 'Who is your target audience?',
    'type', 'textarea',
    'placeholder', 'Describe your ideal customer...',
    'required', true
  ),
  jsonb_build_object(
    'name', 'mainBenefit',
    'label', 'Main Benefit',
    'type', 'textarea',
    'placeholder', 'What''s the primary benefit your customers get?',
    'required', true
  ),
  jsonb_build_object(
    'name', 'cta',
    'label', 'Call to Action',
    'type', 'text',
    'placeholder', 'e.g., Get Started, Sign Up, Learn More',
    'required', true
  ),
  jsonb_build_object(
    'name', 'websiteUrl',
    'label', 'Website URL',
    'type', 'text',
    'placeholder', 'https://example.com',
    'required', true
  )
)
WHERE url = '/tools/hero-genie';