import { ExternalLink, Share2 } from 'lucide-react';

interface UrlInfoProps {
  originalUrl: string;
  shortUrl: string;
  createdAt: string;
  updatedAt: string;
}

export function UrlInfo({
  originalUrl,
  shortUrl,
  createdAt,
  updatedAt,
}: UrlInfoProps) {
  return (
    <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200">
      <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
        Informações do Link
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <h3 className="text-xs sm:text-sm font-medium text-gray-500">
            URL Original
          </h3>
          <a
            href={originalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 hover:text-green-700 hover:underline break-all flex items-start gap-1.5 text-sm"
            title={originalUrl}
          >
            <span className="truncate">{originalUrl}</span>
            <ExternalLink className="w-3.5 h-3.5 shrink-0 mt-0.5" />
          </a>
        </div>
        <div className="space-y-1">
          <h3 className="text-xs sm:text-sm font-medium text-gray-500">
            URL Encurtada
          </h3>
          <div className="flex items-center gap-1.5">
            <span
              className="text-gray-900 break-all text-sm truncate"
              title={shortUrl}
            >
              {shortUrl}
            </span>
            <button
              onClick={() => navigator.clipboard.writeText(shortUrl)}
              className="text-green-600 hover:text-green-700 shrink-0 p-1"
              aria-label="Copiar URL encurtada"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
        <div className="space-y-1">
          <h3 className="text-xs sm:text-sm font-medium text-gray-500">
            Criado em
          </h3>
          <p className="text-gray-900 text-sm">
            {new Date(createdAt).toLocaleString('pt-BR')}
          </p>
        </div>
        <div className="space-y-1">
          <h3 className="text-xs sm:text-sm font-medium text-gray-500">
            Última Atualização
          </h3>
          <p className="text-gray-900 text-sm">
            {new Date(updatedAt).toLocaleString('pt-BR')}
          </p>
        </div>
      </div>
    </div>
  );
}
