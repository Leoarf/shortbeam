'use client';

import { Copy, Check, BarChart3, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface ResultDisplayProps {
  shortenedUrl: string;
  onCopy: () => void;
  copied: boolean;
}

export function ResultDisplay({
  shortenedUrl,
  onCopy,
  copied,
}: ResultDisplayProps) {
  // Extract the URL slug for the statistics link
  const slug = shortenedUrl.split('/').pop() || '';

  return (
    <div className="mt-8 p-4 sm:p-6 bg-linear-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
      <div className="space-y-4">
        {/* Header */}
        <div>
          <p className="text-sm text-gray-700 mb-2">Seu link encurtado:</p>
          <div className="flex flex-col sm:flex-row sm:items-start gap-3">
            <div className="flex-1 min-w-0">
              <a
                href={shortenedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base sm:text-lg font-mono text-green-700 hover:text-green-800 hover:underline break-all flex items-start gap-2"
              >
                <span className="break-all">{shortenedUrl}</span>
                <ExternalLink className="w-4 h-4 shrink-0 mt-1" />
              </a>
            </div>
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={onCopy}
                className="px-4 py-2.5 sm:px-5 sm:py-3 bg-white border-2 border-green-600 text-green-700 hover:bg-green-50 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 font-medium text-sm sm:text-base"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="whitespace-nowrap">Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="whitespace-nowrap">Copiar</span>
                  </>
                )}
              </button>
              <Link
                href={`/stats/${slug}`}
                className="px-4 py-2.5 sm:px-5 sm:py-3 bg-green-600 text-white hover:bg-green-700 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 font-medium text-sm sm:text-base"
              >
                <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="whitespace-nowrap">Estatísticas</span>
              </Link>
            </div>
          </div>
        </div>
        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-4 border-t border-green-200">
          <div className="text-center p-2 sm:p-3 bg-white/50 rounded-lg">
            <div className="text-xs sm:text-sm font-medium text-green-600">
              0
            </div>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">Cliques</p>
          </div>
          <div className="text-center p-2 sm:p-3 bg-white/50 rounded-lg">
            <div className="text-xs sm:text-sm font-medium text-gray-700">
              Criado
            </div>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">Agora</p>
          </div>
          <div className="text-center p-2 sm:p-3 bg-white/50 rounded-lg">
            <div className="text-xs sm:text-sm font-medium text-gray-700">
              Expira
            </div>
            <p className="text-xs sm:text-sm text-gray-600 mt-1 whitespace-nowrap">
              Nunca
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
