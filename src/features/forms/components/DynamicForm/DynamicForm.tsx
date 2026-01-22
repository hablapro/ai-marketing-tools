import React, { useMemo, useState, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send, Loader2 } from 'lucide-react';
import { FormConfigType, FormData, FormResponse } from '../../types/form.types';
import { generateZodSchema } from '../../utils/validation';
import { useWebhookSubmit } from '../../hooks/useWebhookSubmit';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useCreateSubmission } from '@/features/submissions/hooks';
import { FormResponseDisplay } from './FormResponse';
import { FormField } from './FormField';

interface DynamicFormProps {
  config: FormConfigType;
  onSuccess?: (response: FormResponse) => void;
  onError?: (error: Error) => void;
}

/**
 * Dynamic form component with React Hook Form + Zod validation
 *
 * Features:
 * - React Hook Form for efficient form state management
 * - Zod schema validation for type safety
 * - Webhook submission with timeout and retry
 * - Response display with sanitization
 * - Field-level error messages
 */
export function DynamicForm({
  config,
  onSuccess,
  onError,
}: DynamicFormProps) {
  // Generate Zod schema from form fields
  const validationSchema = useMemo(
    () => generateZodSchema(config.fields),
    [config.fields]
  );

  // Initialize form with React Hook Form
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(validationSchema),
    mode: 'onBlur',
    defaultValues: config.fields.reduce((acc, field) => ({
      ...acc,
      [field.name]: field.type === 'checkbox' ? false : '',
    }), {} as FormData),
  });

  // State for response display and regeneration
  const [response, setResponse] = useState<FormResponse | null>(null);
  const [lastSubmittedData, setLastSubmittedData] = useState<FormData | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  // Authentication and submission hooks
  const { user } = useAuth();
  const { mutate: submitWebhook, isPending: isSubmittingWebhook, error: webhookError } = useWebhookSubmit();
  const { mutate: createSubmission } = useCreateSubmission();

  // Handle form submission
  const onSubmit = useCallback(
    async (data: FormData) => {
      try {
        if (!config.webhookUrl) {
          throw new Error('Webhook URL is not configured');
        }

        setResponse(null);
        setLastSubmittedData(data);

        submitWebhook(
          {
            url: config.webhookUrl,
            data,
          },
          {
            onSuccess: (result) => {
              setResponse(result);

              // Auto-save submission to database
              if (user && config.toolId && config.toolName) {
                createSubmission({
                  tool_id: config.toolId,
                  tool_name: config.toolName,
                  form_data: data,
                  result: result,
                });
              }

              if (onSuccess) {
                onSuccess(result);
              }
              // Reset form on success
              reset();
            },
            onError: (error) => {
              setResponse(null);
              if (onError && error instanceof Error) {
                onError(error);
              }
            },
          }
        );
      } catch (error) {
        if (onError && error instanceof Error) {
          onError(error);
        }
      }
    },
    [config.webhookUrl, config.toolId, config.toolName, submitWebhook, createSubmission, user, onSuccess, onError, reset]
  );

  // Handle copy to clipboard
  const handleCopy = useCallback(async () => {
    if (!response) return;

    const responseContent = response.result || response;
    const textToCopy = Array.isArray(responseContent)
      ? responseContent.join('\n')
      : String(responseContent);

    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  }, [response]);

  // Handle regeneration
  const handleRegenerate = useCallback(() => {
    if (!lastSubmittedData) return;

    setResponse(null);
    submitWebhook(
      {
        url: config.webhookUrl,
        data: lastSubmittedData,
      },
      {
        onSuccess: (result) => {
          setResponse(result);
          if (onSuccess) {
            onSuccess(result);
          }
        },
        onError: (error) => {
          setResponse(null);
          if (onError && error instanceof Error) {
            onError(error);
          }
        },
      }
    );
  }, [config.webhookUrl, lastSubmittedData, submitWebhook, onSuccess, onError]);

  const isLoading = isSubmittingWebhook;

  return (
    <div className="space-y-6">
      {/* Response Display Section */}
      {response && (
        <FormResponseDisplay
          response={response}
          resultTitle={config.resultTitle || 'Result'}
          isRegenerating={isLoading}
          onRegenerate={handleRegenerate}
          onCopy={handleCopy}
          isCopied={isCopied}
        />
      )}

      {/* Error Display */}
      {webhookError && !response && (
        <div className="rounded-lg p-4 bg-red-50 border border-red-200">
          <p className="text-sm font-medium text-red-900">
            {webhookError instanceof Error
              ? webhookError.message
              : 'Failed to submit form. Please try again.'}
          </p>
        </div>
      )}

      {/* Form Section */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`space-y-4 ${config.className?.form || ''}`}
        noValidate
      >
        {/* Form Fields */}
        {config.fields.map((field) => (
          <Controller
            key={field.name}
            name={field.name}
            control={control}
            render={({ field: fieldProps }) => (
              <FormField
                field={field}
                value={fieldProps.value}
                onChange={fieldProps.onChange}
                onBlur={fieldProps.onBlur}
                error={errors[field.name]?.message}
              />
            )}
          />
        ))}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 ${
            config.className?.submitButton || ''
          }`}
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
              Submitting...
            </>
          ) : (
            <>
              <Send className="h-4 w-4 mr-2" />
              Submit
            </>
          )}
        </button>

        {/* Status Messages */}
        {!response && !webhookError && (
          <p className="text-xs text-gray-500 text-center">
            {config.messages?.success || 'Submit the form to generate results'}
          </p>
        )}
      </form>
    </div>
  );
}
