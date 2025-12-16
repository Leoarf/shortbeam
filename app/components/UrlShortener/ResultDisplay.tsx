import { Copy, Check, ExternalLink } from 'lucide-react';

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
  // Extract the domain for cleaner display on mobile
  const getDisplayUrl = (url: string) => {
    try {
      const urlObj = new URL(url);
      const path = urlObj.pathname.slice(1); // Remove the leading slash
      return `/${path}`;
    } catch {
      return url;
    }
  };

  return (
    <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-xl">
      <div className="flex flex-col gap-3 sm:gap-4">
        <div className="text-xs sm:text-sm font-medium text-green-800">
          ✅ Link shortened successfully!
        </div>
        <div className="space-y-2">
          {/* Full URL */}
          <a
            href={shortenedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 text-green-600 hover:text-green-700 font-mono text-sm sm:text-base font-bold truncate"
          >
            {shortenedUrl}
            <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
          </a>
          {/* Mobile version */}
          <div className="sm:hidden flex items-center justify-between bg-white rounded-lg p-2 border border-green-200">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-green-600 font-mono text-sm truncate">
                {getDisplayUrl(shortenedUrl)}
              </span>
              <a
                href={shortenedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:text-green-700"
              >
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
        <div className="flex justify-center sm:justify-end">
          <button
            onClick={onCopy}
            className="w-full sm:w-auto px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium flex items-center justify-center gap-1.5 sm:gap-2 transition-colors text-sm sm:text-base"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="whitespace-nowrap">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="whitespace-nowrap">Copy Link</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
