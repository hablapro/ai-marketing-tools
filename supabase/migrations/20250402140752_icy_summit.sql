/*
  # Add initial tool fields

  1. Changes
    - Update tools table with form field configurations
    - Add fields for each existing tool
*/

-- Update Business Idea Evaluator fields
UPDATE tools
SET fields = jsonb_build_array(
  jsonb_build_object(
    'name', 'business_idea',
    'label', 'What''s your business idea?',
    'type', 'textarea',
    'placeholder', 'Describe your business idea in detail...',
    'required', true
  ),
  jsonb_build_object(
    'name', 'target_market',
    'label', 'Who is your target market?',
    'type', 'textarea',
    'placeholder', 'Describe your ideal customer...',
    'required', true
  ),
  jsonb_build_object(
    'name', 'revenue_model',
    'label', 'How will you make money?',
    'type', 'textarea',
    'placeholder', 'Explain your revenue model...',
    'required', true
  )
)
WHERE url = '/tools/business-idea';

-- Update Business Plan fields
UPDATE tools
SET fields = jsonb_build_array(
  jsonb_build_object(
    'name', 'business_name',
    'label', 'Business Name',
    'type', 'text',
    'placeholder', 'Enter your business name',
    'required', true
  ),
  jsonb_build_object(
    'name', 'industry',
    'label', 'Industry',
    'type', 'text',
    'placeholder', 'e.g., Technology, Retail, Healthcare',
    'required', true
  ),
  jsonb_build_object(
    'name', 'business_model',
    'label', 'Business Model',
    'type', 'textarea',
    'placeholder', 'Describe how your business will operate and make money...',
    'required', true
  )
)
WHERE url = '/tools/business-plan';

-- Update Pitch Genie fields
UPDATE tools
SET fields = jsonb_build_array(
  jsonb_build_object(
    'name', 'company_name',
    'label', 'Company Name',
    'type', 'text',
    'placeholder', 'Enter your company name',
    'required', true
  ),
  jsonb_build_object(
    'name', 'value_proposition',
    'label', 'What problem does your company solve?',
    'type', 'textarea',
    'placeholder', 'Describe the main problem your company solves...',
    'required', true
  ),
  jsonb_build_object(
    'name', 'target_audience',
    'label', 'Who is your target audience?',
    'type', 'text',
    'placeholder', 'e.g., Small business owners, Working professionals',
    'required', true
  )
)
WHERE url = '/tools/pitch-genie';

-- Update Hero Genie fields
UPDATE tools
SET fields = jsonb_build_array(
  jsonb_build_object(
    'name', 'product_name',
    'label', 'Product/Service Name',
    'type', 'text',
    'placeholder', 'Enter your product or service name',
    'required', true
  ),
  jsonb_build_object(
    'name', 'unique_value',
    'label', 'What makes your product unique?',
    'type', 'textarea',
    'placeholder', 'Describe your unique value proposition...',
    'required', true
  ),
  jsonb_build_object(
    'name', 'target_audience',
    'label', 'Who is your target audience?',
    'type', 'text',
    'placeholder', 'e.g., Small business owners, Working professionals',
    'required', true
  )
)
WHERE url = '/tools/hero-genie';

-- Update SEO Audit fields
UPDATE tools
SET fields = jsonb_build_array(
  jsonb_build_object(
    'name', 'website_url',
    'label', 'Website URL',
    'type', 'text',
    'placeholder', 'https://example.com',
    'required', true
  ),
  jsonb_build_object(
    'name', 'main_keyword',
    'label', 'Main Keyword',
    'type', 'text',
    'placeholder', 'Enter your main target keyword',
    'required', true
  ),
  jsonb_build_object(
    'name', 'competitors',
    'label', 'Top Competitors (One per line)',
    'type', 'textarea',
    'placeholder', 'List your main competitors'' URLs...',
    'required', true
  )
)
WHERE url = '/tools/seo-audit';

-- Update Facebook Ad Copy fields
UPDATE tools
SET fields = jsonb_build_array(
  jsonb_build_object(
    'name', 'product_name',
    'label', 'Product/Service Name',
    'type', 'text',
    'placeholder', 'Enter your product or service name',
    'required', true
  ),
  jsonb_build_object(
    'name', 'key_benefits',
    'label', 'Key Benefits (One per line)',
    'type', 'textarea',
    'placeholder', 'List the main benefits of your product...',
    'required', true
  ),
  jsonb_build_object(
    'name', 'target_audience',
    'label', 'Target Audience',
    'type', 'text',
    'placeholder', 'Describe your ideal customer',
    'required', true
  ),
  jsonb_build_object(
    'name', 'call_to_action',
    'label', 'Call to Action',
    'type', 'text',
    'placeholder', 'e.g., Shop Now, Learn More, Sign Up',
    'required', true
  )
)
WHERE url = '/tools/facebook-ad-copy';

-- Update Reel Optimizer fields
UPDATE tools
SET fields = jsonb_build_array(
  jsonb_build_object(
    'name', 'content_topic',
    'label', 'What''s your reel about?',
    'type', 'text',
    'placeholder', 'Enter the main topic of your reel',
    'required', true
  ),
  jsonb_build_object(
    'name', 'key_points',
    'label', 'Key Points to Cover (One per line)',
    'type', 'textarea',
    'placeholder', 'List the main points you want to cover...',
    'required', true
  ),
  jsonb_build_object(
    'name', 'target_audience',
    'label', 'Target Audience',
    'type', 'text',
    'placeholder', 'Who is this reel for?',
    'required', true
  ),
  jsonb_build_object(
    'name', 'content_style',
    'label', 'Content Style',
    'type', 'select',
    'placeholder', 'Select a style',
    'required', true,
    'options', jsonb_build_array(
      jsonb_build_object('label', 'Educational', 'value', 'educational'),
      jsonb_build_object('label', 'Entertainment', 'value', 'entertainment'),
      jsonb_build_object('label', 'Behind the Scenes', 'value', 'behind_the_scenes'),
      jsonb_build_object('label', 'Tutorial', 'value', 'tutorial')
    )
  )
)
WHERE url = '/tools/reel-optimizer';