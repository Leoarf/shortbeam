'use client';

import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { CreateShortUrlInput } from '@/lib/validation';
import { Link2, Wand2, RefreshCw } from 'lucide-react';
import { useState, useEffect } from 'react';

interface UrlInputFormProps {
  register: UseFormRegister<CreateShortUrlInput>;
  errors: FieldErrors<CreateShortUrlInput>;
  customSlug: string;
  setCustomSlug: (value: string) => void;
  isLoading: boolean;
  onSubmit: () => void;
  onReset?: () => void;
  hasResult?: boolean;
}

export function UrlInputForm({
  register,
  errors,
  customSlug,
  setCustomSlug,
  isLoading,
  onSubmit,
  onReset,
  hasResult = false,
}: UrlInputFormProps) {
  const [host, setHost] = useState<string>('');

  // Load the host only on the client to avoid hydration errors
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHost(window.location.host);
    }
  }, []);

  return (
    <form onSubmit={onSubmit} className="space-y-4 sm:space-y-6">
      {/* URL Input */}
      <div>
        <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
          <Link2 className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 shrink-0" />
          <label className="text-xs sm:text-sm font-medium text-gray-900">
            Paste your URL here
          </label>
        </div>
        <div className="relative">
          <input
            type="url"
            placeholder="https://exemple.com/long-url"
            className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
              errors.url ? 'border-red-300' : 'border-gray-300'
            }`}
            {...register('url')}
            disabled={isLoading}
          />
          {errors.url && (
            <p className="mt-1 text-xs sm:text-sm text-red-600">
              {errors.url.message}
            </p>
          )}
        </div>
      </div>
      {/* Custom Slug */}
      <div>
        <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
          <Wand2 className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600 shrink-0" />
          <label className="text-xs sm:text-sm font-medium text-gray-900">
            Customize your link (optional)
          </label>
        </div>
        <div className="space-y-2">
          <div className="flex items-center bg-gray-50 border border-gray-300 rounded-lg px-3 sm:px-4 py-2 text-sm sm:text-base">
            <span className="text-gray-600 font-mono text-xs sm:text-sm truncate max-w-[120px] sm:max-w-none">
              {host || 'loading...'}/
            </span>
            <input
              type="text"
              placeholder="my-link"
              className="flex-1 bg-transparent border-0 outline-none text-gray-900 placeholder-gray-500 ml-1 min-w-0"
              value={customSlug}
              onChange={(e) => {
                const value = e.target.value
                  .toLowerCase()
                  .replace(/[^a-z0-9-_]/g, '-');
                setCustomSlug(value);
              }}
              disabled={isLoading}
            />
          </div>
          {errors.customSlug && (
            <p className="text-xs sm:text-sm text-red-600">
              {errors.customSlug.message}
            </p>
          )}
          <p className="text-xs text-gray-500">
            Use only letters, numbers, hyphens, and underscores
          </p>
        </div>
      </div>
      {/* Submit Button */}
      <div className="flex flex-col xs:flex-row gap-2 sm:gap-3">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 bg-linear-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium sm:font-semibold rounded-lg transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 sm:gap-2 text-sm sm:text-base"
        >
          {isLoading ? (
            <>
              <RefreshCw className="w-3 h-3 sm:w-4 sm:h-4 animate-spin" />
              <span className="whitespace-nowrap">Shortening...</span>
            </>
          ) : hasResult ? (
            <>
              <Wand2 className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="whitespace-nowrap">Create New Link</span>
            </>
          ) : (
            <span className="whitespace-nowrap">Shorten URL</span>
          )}
        </button>
        {hasResult && onReset && (
          <button
            type="button"
            onClick={onReset}
            className="px-4 sm:px-6 py-2.5 sm:py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors font-medium text-sm sm:text-base whitespace-nowrap"
          >
            Clean
          </button>
        )}
      </div>
    </form>
  );
}
