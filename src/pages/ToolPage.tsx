import React, { useRef, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useToolBySlug } from '@/features/tools/hooks';
import { DynamicForm } from '../components/DynamicForm/DynamicForm';
import { HeroSection } from '../components/hero/HeroSection';
import { FAQSection } from '../components/faq/FAQSection';
import { Spinner } from '@/shared/components';
import { FormConfigType } from '../types/form';
import { updateDocumentMeta } from '../utils/meta';
import { sanitizeHtml } from '@/shared/lib/sanitize';

export function ToolPage() {
  const { toolId } = useParams();
  const navigate = useNavigate();
  const formRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);

  // Fetch tool with React Query - this fixes the N+1 query issue
  const { data: tool, isLoading, error } = useToolBySlug(toolId);

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [toolId]);

  // Update page metadata when tool data is loaded
  useEffect(() => {
    if (tool) {
      updateDocumentMeta(
        `${tool.name} - AI Marketing Tools`,
        tool.description
      );
    }
  }, [tool]);

  // Memoize hero section to prevent unnecessary recalculations
  const heroSection = useMemo(() => {
    if (!tool) return null;
    const hero = tool.hero_sections?.[0] || {
      id: '',
      tool_id: tool.id,
      title: tool.name,
      description: tool.description,
      primary_cta: 'Try Now'
    };
    // Map snake_case to camelCase for component
    return {
      title: hero.title,
      description: hero.description,
      primaryCTA: hero.primary_cta
    };
  }, [tool]);

  // Memoize form config to prevent unnecessary recalculations
  const formConfig: FormConfigType = useMemo(() => {
    if (!tool) return { fields: [], webhookUrl: '', resultTitle: '' };

    return {
      fields: tool.fields?.map(field => ({
        name: field.name,
        label: field.label,
        type: field.type,
        placeholder: field.placeholder,
        validation: { required: field.required },
        options: field.options
      })) || [],
      webhookUrl: tool.webhook_url,
      resultTitle: `Your AI-Generated ${tool.name} is Ready 🎯`
    };
  }, [tool]);

  // Memoize FAQ list with sanitized HTML
  const faqs = useMemo(() => {
    if (!tool?.faqs) return [];

    return tool.faqs
      .sort((a, b) => a.sort_order - b.sort_order)
      .map(faq => ({
        question: faq.question,
        answer: <p dangerouslySetInnerHTML={{ __html: sanitizeHtml(faq.answer) }} />
      }));
  }, [tool?.faqs]);

  const handleScrollToFAQ = () => {
    faqRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" label="Loading tool..." />
      </div>
    );
  }

  // Error state
  if (error || !tool) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Tool not found</h1>
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Tools
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <button
        onClick={() => navigate('/')}
        className="fixed top-28 left-4 z-50 inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-black/80 rounded-md hover:bg-black backdrop-blur-sm transition-colors duration-200"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Tools
      </button>

      <HeroSection 
        tool={heroSection}
        onScrollClick={handleScrollToFAQ}
        onPrimaryActionClick={handleScrollToForm}
      />

      <div ref={formRef} className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <DynamicForm
            config={formConfig}
            onSuccess={() => {
              // Handle success if needed
            }}
            onError={() => {
              // Handle error if needed
            }}
          />
        </div>
      </div>

      {faqs.length > 0 && (
        <div ref={faqRef}>
          <FAQSection faqs={faqs} />
        </div>
      )}
    </div>
  );
}

export default ToolPage;