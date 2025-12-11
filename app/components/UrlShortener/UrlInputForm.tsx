'use client';

import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { Globe, Link, AlertCircle } from 'lucide-react';
import { AdvancedOptions } from './AdvancedOptions';
import { CreateShortUrlInput } from '@/lib/validation';

interface UrlInputFormProps {
  register: UseFormRegister<CreateShortUrlInput>;
  errors: FieldErrors<CreateShortUrlInput>;
  customSlug: string;
  setCustomSlug: (value: string) => void;
  isLoading: boolean;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
}

export function UrlInputForm({
  register,
  errors,
  customSlug,
  setCustomSlug,
  isLoading,
  onSubmit,
}: UrlInputFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* URL Input */}
      <div className="space-y-2">
        <div className="relative">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <Globe className="w-5 h-5 text-gray-400" />
          </div>
          <input
            {...register('url')}
            type="url"
            placeholder="https://exemplo.com/url-muito-longa-para-compartilhar"
            className={`w-full pl-12 pr-4 py-4 text-lg rounded-xl border-2 ${
              errors.url
                ? 'border-red-300 bg-red-50'
                : 'border-gray-300 bg-gray-50'
            } text-gray-900 placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-200`}
          />
        </div>
        {errors.url && (
          <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 px-4 py-2 rounded-lg">
            <AlertCircle className="w-4 h-4" />
            <span>{errors.url.message}</span>
          </div>
        )}
      </div>
      {/* Advanced Options Toggle */}
      <div className="border-t border-gray-200 pt-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm font-medium text-gray-700">
              Personalizar slug (opcional)
            </span>
          </div>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
            Aleatório por padrão
          </span>
        </div>

        <AdvancedOptions
          customSlug={customSlug}
          setCustomSlug={setCustomSlug}
        />
        {errors.customSlug && (
          <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 px-4 py-2 rounded-lg mt-4">
            <AlertCircle className="w-4 h-4" />
            <span>{errors.customSlug.message}</span>
          </div>
        )}
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-5 px-6 bg-linear-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold text-lg rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
      >
        {isLoading ? (
          <>
            <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
            <span>Encurtando...</span>
          </>
        ) : (
          <>
            <Link className="w-6 h-6" />
            <span>ENCURTAR URL AGORA</span>
          </>
        )}
      </button>
      <p className="text-center text-gray-500 text-sm">
        Não requer registro • Sem limites • 100% gratuito
      </p>
    </form>
  );
}
