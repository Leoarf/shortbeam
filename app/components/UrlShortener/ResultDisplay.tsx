import { Copy, Check } from 'lucide-react';

interface ResultDisplayProps {
  shortenedUrl: string;
  expiration: string;
  onCopy: () => void;
  copied: boolean;
}

export function ResultDisplay({
  shortenedUrl,
  expiration,
  onCopy,
  copied,
}: ResultDisplayProps) {
  return (
    <div className="mt-8 p-6 bg-linear-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm text-gray-700 mb-2">Seu link encurtado:</p>
          <div className="flex items-center gap-3">
            <a
              href={shortenedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-mono text-green-700 hover:text-green-800 hover:underline break-all"
            >
              {shortenedUrl}
            </a>
          </div>
          <div className="mt-3 flex items-center gap-4 text-sm text-gray-600">
            <span>
              <span className="font-medium">Cliques:</span> 0
            </span>
            <span>
              <span className="font-medium">Criado:</span> Agora
            </span>
            {expiration && (
              <span>
                <span className="font-medium">Expira:</span> {expiration}
              </span>
            )}
          </div>
        </div>
        <button
          onClick={onCopy}
          className="shrink-0 px-5 py-3 bg-white border-2 border-green-600 text-green-700 hover:bg-green-50 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 font-medium"
        >
          {copied ? (
            <>
              <Check className="w-5 h-5" />
              <span>Copiado!</span>
            </>
          ) : (
            <>
              <Copy className="w-5 h-5" />
              <span>Copiar Link</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
