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
  expiration: string;
  setExpiration: (value: string) => void;
  isLoading: boolean;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
}

export function UrlInputForm({
  register,
  errors,
  customSlug,
  setCustomSlug,
  expiration,
  setExpiration,
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
            className={`w-full pl-12 pr-4 py-4 text-base rounded-xl border-2 ${
              errors.url ? 'border-red-300' : 'border-gray-200'
            } bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200`}
          />
        </div>
        {errors.url && (
          <div className="flex items-center gap-2 text-sm text-red-600">
            <AlertCircle className="w-4 h-4" />
            <span>{errors.url.message}</span>
          </div>
        )}
      </div>
      <AdvancedOptions
        customSlug={customSlug}
        setCustomSlug={setCustomSlug}
        expiration={expiration}
        setExpiration={setExpiration}
      />
      {errors.customSlug && (
        <div className="flex items-center gap-2 text-sm text-red-600">
          <AlertCircle className="w-4 h-4" />
          <span>{errors.customSlug.message}</span>
        </div>
      )}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-4 px-6 bg-linear-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold text-lg rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Encurtando...</span>
          </>
        ) : (
          <>
            <Link className="w-5 h-5" />
            <span>Encurtar URL</span>
          </>
        )}
      </button>
    </form>
  );
}
