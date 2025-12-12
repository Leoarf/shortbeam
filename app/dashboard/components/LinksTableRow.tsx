import {
  Copy,
  ExternalLink,
  BarChart3,
  Calendar,
  Eye,
  Link2,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface LinksTableRowProps {
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

export function LinksTableRow({ link, copiedId, onCopy }: LinksTableRowProps) {
  const router = useRouter();

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      {/* Original URL */}
      <td className="px-6 py-4">
        <div className="max-w-xs">
          <div
            className="text-sm font-medium text-gray-900 truncate"
            title={link.url}
          >
            {link.url}
          </div>
          <div className="flex items-center gap-1 mt-1">
            <Link2 className="w-3 h-3 text-gray-400 shrink-0" />
            <span className="text-xs text-gray-500 truncate">{link.slug}</span>
          </div>
        </div>
      </td>
      {/* Short URL */}
      <td className="px-6 py-4">
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
            className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
            title="Copiar link"
          >
            {copiedId === link.id ? (
              <span className="text-xs text-green-600">✓</span>
            ) : (
              <Copy className="w-3 h-3" />
            )}
          </button>
        </div>
      </td>
      {/* Clicks */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 text-gray-400" />
          <span className="font-medium text-gray-900">{link.clicks}</span>
          <div className="text-xs text-gray-500">
            {link.clicks > 100 ? '🔥' : link.clicks > 50 ? '📈' : '📊'}
          </div>
        </div>
      </td>
      {/* Created At */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-400" />
          <div>
            <div className="text-sm text-gray-900">
              {new Date(link.createdAt).toLocaleDateString('pt-BR')}
            </div>
          </div>
        </div>
      </td>
      {/* Actions */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => router.push(`/stats/${link.slug}`)}
            title="Ver estatísticas"
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <BarChart3 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}
