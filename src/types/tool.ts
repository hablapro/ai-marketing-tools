export interface Tool {
  id: string;
  name: string;
  description: string;
  category: 'content' | 'social' | 'analytics' | 'automation' | 'business';
  icon: string;
  status: 'active' | 'coming_soon' | 'beta';
  url?: string;
  webhook_url: string;
  features?: string[];
  fields?: {
    name: string;
    label: string;
    type: 'text' | 'textarea' | 'number' | 'select' | 'checkbox';
    placeholder?: string;
    required?: boolean;
    options?: { label: string; value: string }[];
  }[];
  sort_order?: number;
  created_at?: string;
  updated_at?: string;
}