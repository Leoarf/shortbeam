'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UrlInputForm } from './UrlInputForm';
import { ResultDisplay } from './ResultDisplay';
import { AdditionalInfo } from './AdditionalInfo';
import { createShortUrlSchema, CreateShortUrlInput } from '@/lib/validation';
import { useState } from 'react';

interface UrlInputSectionProps {
  user: {
    id: string;
    email: string;
    name?: string;
  } | null;
  onSubmitSuccess?: (shortUrl: string) => void;
}

export function UrlInputSection({
  user,
  onSubmitSuccess,
}: UrlInputSectionProps) {
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<CreateShortUrlInput>({
    resolver: zodResolver(createShortUrlSchema),
    defaultValues: {
      url: '',
      customSlug: '',
    },
  });

  const customSlug = watch('customSlug') || '';

  const onSubmit = async (data: CreateShortUrlInput) => {
    setIsLoading(true);

    try {
      const requestData: any = { ...data };

      if (user?.id) {
        requestData.userId = user.id;
      }

      const response = await fetch('/api/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.details) {
          const slugError = result.details.find(
            (err: any) => err.field === 'customSlug'
          );
          if (slugError) {
            throw new Error(slugError.message);
          }
          throw new Error(result.error || 'Validação falhou');
        }
        throw new Error(result.error || 'Erro ao encurtar URL');
      }

      setShortenedUrl(result.shortUrl);
      reset();

      if (onSubmitSuccess) {
        onSubmitSuccess(result.shortUrl);
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Erro desconhecido');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (shortenedUrl) {
      navigator.clipboard.writeText(shortenedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleReset = () => {
    setShortenedUrl('');
    reset();
  };

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-4 sm:p-6 md:p-8 border border-gray-200">
      <UrlInputForm
        register={register}
        errors={errors}
        customSlug={customSlug}
        setCustomSlug={(value) => setValue('customSlug', value)}
        isLoading={isLoading}
        onSubmit={handleSubmit(onSubmit)}
        onReset={handleReset}
        hasResult={!!shortenedUrl}
      />
      {shortenedUrl && (
        <ResultDisplay
          shortenedUrl={shortenedUrl}
          onCopy={handleCopy}
          copied={copied}
        />
      )}
      <AdditionalInfo />
    </div>
  );
}
