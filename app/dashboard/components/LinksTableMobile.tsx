import {
  Copy,
  ExternalLink,
  BarChart3,
  Calendar,
  Eye,
  Link2,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface LinksTableMobileProps {
  link: {
    id: string;
    url: string;
    slug: string;
    clicks: number;
    createdAt: string;
  };
  copiedId: string | null;
  onCopy: (slug: string, id: string) => void;
}

export function LinksTableMobile({
  link,
  copiedId,
  onCopy,
}: LinksTableMobileProps) {
  const router = useRouter();

  return (
    <div className="p-4 hover:bg-gray-50 transition-colors">
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div
              className="text-sm font-medium text-gray-900 truncate mb-1"
              title={link.url}
            >
              {link.url}
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Link2 className="w-3 h-3 shrink-0" />
              <span className="truncate">{link.slug}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 ml-2">
            <button
              onClick={() => router.push(`/stats/${link.slug}`)}
              title="Ver estatísticas"
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
            >
              <BarChart3 className="w-4 h-4" />
            </button>
          </div>
        </div>
        {/* Short URL */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <a
              href={`/${link.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:text-green-700 font-mono text-sm flex items-center gap-1"
            >
              /{link.slug}
              <ExternalLink className="w-3 h-3" />
            </a>
            <button
              onClick={() => onCopy(link.slug, link.id)}
              className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
              title="Copiar link"
            >
              {copiedId === link.id ? (
                <span className="text-xs text-green-600">✓</span>
              ) : (
                <Copy className="w-3 h-3" />
              )}
            </button>
          </div>
        </div>
        {/* Stats */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-gray-400" />
            <span className="font-medium text-gray-900">
              {link.clicks} cliques
            </span>
            <span className="text-xs text-gray-500">
              {link.clicks > 100 ? '🔥' : link.clicks > 50 ? '📈' : '📊'}
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>{new Date(link.createdAt).toLocaleDateString('pt-BR')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
