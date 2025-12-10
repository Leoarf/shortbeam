'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Sparkles } from 'lucide-react';
import { UrlInputForm } from './UrlShortener/UrlInputForm';
import { ResultDisplay } from './UrlShortener/ResultDisplay';
import { AdditionalInfo } from './UrlShortener/AdditionalInfo';
import { createShortUrlSchema, CreateShortUrlInput } from '@/lib/validation';

export function UrlShortener() {
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CreateShortUrlInput>({
    resolver: zodResolver(createShortUrlSchema),
    defaultValues: {
      url: '',
      customSlug: '',
    },
  });

  const customSlug = watch('customSlug') || ''; // Ensure that it is not undefined

  const onSubmit = async (data: CreateShortUrlInput) => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
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

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium">
          <Sparkles className="w-4 h-4" />
          <span>Rápido • Seguro • Gratuito</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Encurte seu link em <span className="text-green-600">segundos</span>
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Cole sua URL abaixo e obtenha um link curto, rastreável e
          personalizável
        </p>
      </div>
      <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200">
        <UrlInputForm
          register={register}
          errors={errors}
          customSlug={customSlug}
          setCustomSlug={(value) => setValue('customSlug', value)}
          isLoading={isLoading}
          onSubmit={handleSubmit(onSubmit)}
        />
        {shortenedUrl && (
          <ResultDisplay
            shortenedUrl={shortenedUrl}
            onCopy={handleCopy}
            copied={copied}
          />
        )}
      </div>
      <AdditionalInfo />
    </div>
  );
}
