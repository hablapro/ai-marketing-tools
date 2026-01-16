/*
  # Update form fields for multiple tools

  1. Changes
    - Update Facebook Ad Copy form fields
    - Update Reel Genie form fields
    - Update SEO Audit form fields
    
  2. Fields Updated
    Facebook Ad Copy:
      - brandName
      - websiteUrl
      - productService
      - benefits
      - usp
      - audience
    
    Reel Genie:
      - brandName
      - product_ServiceName
      - productFeatures
      - productBenefits
      - usp
      - brandVoice
      - audience
      - cta
      - contentObjective
    
    SEO Audit:
      - websiteUrl
      - targetKeyword
      - pageType
*/

-- Update Facebook Ad Copy fields
UPDATE tools
SET fields = jsonb_build_array(
  jsonb_build_object(
    'name', 'brandName',
    'label', 'Brand Name',
    'type', 'text',
    'placeholder', 'Enter your brand name',
    'required', true
  ),
  jsonb_build_object(
    'name', 'websiteUrl',
    'label', 'Website URL',
    'type', 'text',
    'placeholder', 'https://example.com',
    'required', true
  ),
  jsonb_build_object(
    'name', 'productService',
    'label', 'Product or Service Description',
    'type', 'textarea',
    'placeholder', 'Describe your product or service in detail...',
    'required', true
  ),
  jsonb_build_object(
    'name', 'benefits',
    'label', 'Key Benefits',
    'type', 'textarea',
    'placeholder', 'List the main benefits of your product/service...',
    'required', true
  ),
  jsonb_build_object(
    'name', 'usp',
    'label', 'Unique Selling Proposition',
    'type', 'textarea',
    'placeholder', 'What makes your offering unique?',
    'required', true
  ),
  jsonb_build_object(
    'name', 'audience',
    'label', 'Target Audience',
    'type', 'textarea',
    'placeholder', 'Describe your ideal customer...',
    'required', true
  )
)
WHERE url = '/tools/facebook-ad-copy';

-- Update Reel Genie fields
UPDATE tools
SET fields = jsonb_build_array(
  jsonb_build_object(
    'name', 'brandName',
    'label', 'Brand Name',
    'type', 'text',
    'placeholder', 'Enter your brand name',
    'required', true
  ),
  jsonb_build_object(
    'name', 'product_ServiceName',
    'label', 'Product/Service Name',
    'type', 'text',
    'placeholder', 'Enter the name of your product or service',
    'required', true
  ),
  jsonb_build_object(
    'name', 'productFeatures',
    'label', 'Product Features',
    'type', 'textarea',
    'placeholder', 'List the main features of your product/service...',
    'required', true
  ),
  jsonb_build_object(
    'name', 'productBenefits',
    'label', 'Product Benefits',
    'type', 'textarea',
    'placeholder', 'What benefits do customers get?',
    'required', true
  ),
  jsonb_build_object(
    'name', 'usp',
    'label', 'Unique Selling Proposition',
    'type', 'textarea',
    'placeholder', 'What makes your offering unique?',
    'required', true
  ),
  jsonb_build_object(
    'name', 'brandVoice',
    'label', 'Brand Voice',
    'type', 'select',
    'placeholder', 'Select your brand voice',
    'required', true,
    'options', jsonb_build_array(
      jsonb_build_object('label', 'Professional', 'value', 'professional'),
      jsonb_build_object('label', 'Casual', 'value', 'casual'),
      jsonb_build_object('label', 'Friendly', 'value', 'friendly'),
      jsonb_build_object('label', 'Humorous', 'value', 'humorous'),
      jsonb_build_object('label', 'Educational', 'value', 'educational')
    )
  ),
  jsonb_build_object(
    'name', 'audience',
    'label', 'Target Audience',
    'type', 'textarea',
    'placeholder', 'Describe your ideal viewer...',
    'required', true
  ),
  jsonb_build_object(
    'name', 'cta',
    'label', 'Call to Action',
    'type', 'text',
    'placeholder', 'e.g., Shop Now, Learn More, Sign Up',
    'required', true
  ),
  jsonb_build_object(
    'name', 'contentObjective',
    'label', 'Content Objective',
    'type', 'select',
    'placeholder', 'Select your content objective',
    'required', true,
    'options', jsonb_build_array(
      jsonb_build_object('label', 'Brand Awareness', 'value', 'awareness'),
      jsonb_build_object('label', 'Lead Generation', 'value', 'leads'),
      jsonb_build_object('label', 'Sales', 'value', 'sales'),
      jsonb_build_object('label', 'Education', 'value', 'education'),
      jsonb_build_object('label', 'Entertainment', 'value', 'entertainment')
    )
  )
)
WHERE url = '/tools/reel-optimizer';

-- Update SEO Audit fields
UPDATE tools
SET fields = jsonb_build_array(
  jsonb_build_object(
    'name', 'websiteUrl',
    'label', 'Website URL',
    'type', 'text',
    'placeholder', 'https://example.com',
    'required', true
  ),
  jsonb_build_object(
    'name', 'targetKeyword',
    'label', 'Target Keyword',
    'type', 'text',
    'placeholder', 'Enter your main target keyword',
    'required', true
  ),
  jsonb_build_object(
    'name', 'pageType',
    'label', 'Page Type',
    'type', 'select',
    'placeholder', 'Select the page type',
    'required', true,
    'options', jsonb_build_array(
      jsonb_build_object('label', 'Homepage', 'value', 'homepage'),
      jsonb_build_object('label', 'Product Page', 'value', 'product'),
      jsonb_build_object('label', 'Category Page', 'value', 'category'),
      jsonb_build_object('label', 'Blog Post', 'value', 'blog'),
      jsonb_build_object('label', 'Landing Page', 'value', 'landing'),
      jsonb_build_object('label', 'About Page', 'value', 'about'),
      jsonb_build_object('label', 'Contact Page', 'value', 'contact')
    )
  )
)
WHERE url = '/tools/seo-audit';