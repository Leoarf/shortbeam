'use client';

import { useState } from 'react';
import {
  ArrowLeft,
  ExternalLink,
  Share2,
  Globe as GlobeIcon,
  Check,
} from 'lucide-react';
import Link from 'next/link';

interface StatsHeaderProps {
  shortUrl: string;
  originalUrl: string;
  slug: string;
}

export function StatsHeader({ shortUrl, originalUrl, slug }: StatsHeaderProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 sm:gap-3 mb-2">
              <Link
                href="/dashboard"
                className="text-gray-500 hover:text-gray-700 p-1"
                aria-label="Voltar"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 truncate">
                Estatísticas: {slug}
              </h1>
            </div>
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <GlobeIcon className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-600 hover:underline truncate"
                title={shortUrl}
              >
                {shortUrl}
              </a>
            </div>
          </div>

          <div className="flex flex-col xs:flex-row gap-2">
            <button
              onClick={handleCopy}
              className={`px-3 py-2 rounded-lg flex items-center justify-center gap-1.5 text-sm transition-colors ${
                copied
                  ? 'bg-green-600 text-white'
                  : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
              aria-label={copied ? 'Copiado!' : 'Compartilhar link'}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span className="hidden xs:inline">Copiado!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span className="hidden xs:inline">Compartilhar</span>
                </>
              )}
            </button>
            <a
              href={originalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center gap-1.5 text-sm"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Visitar URL</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
