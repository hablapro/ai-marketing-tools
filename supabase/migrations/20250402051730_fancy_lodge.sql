/*
  # Insert initial tools data

  1. Data Population
    - Inserts initial tools into the `tools` table
    - Each tool includes name, description, icon, category, status, and webhook URL
  
  2. Tools Added
    - Business Idea Evaluator
    - Business Plan Generator
    - Pitch Genie
    - Hero Genie
    - SEO Audit
    - Facebook Ad Copy
    - Reel Optimizer
*/

-- Insert initial tools
INSERT INTO tools (name, description, icon, category, status, url, webhook_url) 
VALUES 
  (
    'Business Idea Evaluator',
    'Analyze your startup ideas with key metrics and feasibility assessments.',
    '💡',
    'business',
    'active',
    '/tools/business-idea',
    'https://berelvant.app.n8n.cloud/webhook/51890cc4-21f4-4151-8a04-4ae270c48087'
  ),
  (
    'Business Plan',
    'Create structured business plans with financial projections and strategic insights.',
    '📑',
    'business',
    'active',
    '/tools/business-plan',
    'https://berelvant.app.n8n.cloud/webhook/93edcda6-b62b-4c39-b1c2-8896bbef26dd'
  ),
  (
    'Pitch Genie',
    'Create a Powerful Elevator Pitch in Seconds. Struggling to introduce your business? Get a compelling, AI-crafted pitch that grabs attention instantly.',
    '🎭',
    'content',
    'active',
    '/tools/pitch-genie',
    'https://berelvant.app.n8n.cloud/webhook/5b7f43ed-c6d9-4999-b183-a2e3c1f03942'
  ),
  (
    'Hero Genie',
    'Your Website''s First Impression, Perfected. Generate a high-converting hero section with the perfect headline, subheadline, and CTA.',
    '🎯',
    'content',
    'active',
    '/tools/hero-genie',
    'https://berelvant.app.n8n.cloud/webhook/713c6a3f-dae6-4a09-a0c3-951a5dcf68b0'
  ),
  (
    'SEO Audit',
    'Boost Your Website''s SEO Score Instantly. On-Page SEO, get actionable insights to improve your website''s visibility and rankings.',
    '📈',
    'analytics',
    'active',
    '/tools/seo-audit',
    'https://berelvant.app.n8n.cloud/webhook/983415d6-c884-426c-8aed-ce24e2814c5d'
  ),
  (
    'Facebook Ad Copy',
    'Scroll-Stopping Facebook Ads in a Click. AI-powered ad copy that converts! Get three engaging variations instantly.',
    '🎬',
    'social',
    'active',
    '/tools/facebook-ad-copy',
    'https://berelvant.app.n8n.cloud/webhook/e0454ee7-adc4-49b5-8178-0a7427ffbaa8'
  ),
  (
    'Reel Genie',
    'Turn Ideas Into Viral Instagram Reels. AI-generated scripts and visuals to create thumb-stopping instagram reels.',
    '🎥',
    'social',
    'active',
    '/tools/reel-optimizer',
    'https://berelvant.app.n8n.cloud/webhook/26c19175-0da6-47a0-9a10-255f86610130'
  ),
  (
    'Email Wizard',
    'Craft Converting Email Sequences. Generate entire email marketing campaigns with perfectly timed follow-ups.',
    '✉️',
    'automation',
    'coming_soon',
    null,
    ''
  )
ON CONFLICT (id) DO UPDATE 
SET 
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  icon = EXCLUDED.icon,
  category = EXCLUDED.category,
  status = EXCLUDED.status,
  url = EXCLUDED.url,
  webhook_url = EXCLUDED.webhook_url,
  updated_at = now();