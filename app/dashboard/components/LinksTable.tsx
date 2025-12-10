'use client';

import { useState } from 'react';
import {
  Link2,
  Copy,
  ExternalLink,
  BarChart3,
  Trash2,
  Edit,
  Calendar,
  Eye,
} from 'lucide-react';

// mock
const mockLinks = [
  {
    id: '1',
    url: 'https://exemplo.com/blog/artigo-muito-longo-sobre-tecnologia',
    slug: 'tech-article',
    shortUrl: 'shortb.m/tech-article',
    clicks: 245,
    createdAt: '2024-01-15',
    expiration: '2024-04-15',
  },
  {
    id: '2',
    url: 'https://outro-site.com/produto/super-oferta-limite',
    slug: 'super-oferta',
    shortUrl: 'shortb.m/super-oferta',
    clicks: 189,
    createdAt: '2024-01-18',
    expiration: null,
  },
  {
    id: '3',
    url: 'https://documentos.com/relatorio-anual-2023',
    slug: 'relatorio2023',
    shortUrl: 'shortb.m/relatorio2023',
    clicks: 76,
    createdAt: '2024-01-20',
    expiration: '2024-02-20',
  },
  {
    id: '4',
    url: 'https://portfolio.com/trabalhos/design-ux',
    slug: 'meu-portfolio',
    shortUrl: 'shortb.m/meu-portfolio',
    clicks: 42,
    createdAt: '2024-01-22',
    expiration: null,
  },
  {
    id: '5',
    url: 'https://promocao.com/black-friday/ofertas',
    slug: 'blackfriday',
    shortUrl: 'shortb.m/blackfriday',
    clicks: 320,
    createdAt: '2024-01-10',
    expiration: '2024-01-31',
  },
];

export function LinksTable() {
  const [links, setLinks] = useState(mockLinks);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (shortUrl: string, id: string) => {
    await navigator.clipboard.writeText(shortUrl);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este link?')) {
      setLinks(links.filter((link) => link.id !== id));
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Table Header */}
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Seus Links</h2>
          <p className="text-sm text-gray-600">
            Gerencie todos os seus links encurtados
          </p>
        </div>
        <button className="px-4 py-2 bg-linear-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-lg transition-all duration-200 flex items-center gap-2">
          <Link2 className="w-4 h-4" />
          Novo Link
        </button>
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Link Original
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Link Encurtado
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Cliques
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Criado em
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {links.map((link) => (
              <tr key={link.id} className="hover:bg-gray-50 transition-colors">
                {/* Original URL */}
                <td className="px-6 py-4">
                  <div className="max-w-xs">
                    <div className="text-sm font-medium text-gray-900 truncate">
                      {link.url}
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <Link2 className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-500">
                        Slug: {link.slug}
                      </span>
                    </div>
                  </div>
                </td>
                {/* Short URL */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <a
                      href={link.shortUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-700 font-mono text-sm flex items-center gap-1"
                    >
                      {link.shortUrl}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <button
                      onClick={() => handleCopy(link.shortUrl, link.id)}
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
                    <span className="font-medium text-gray-900">
                      {link.clicks}
                    </span>
                    <div className="text-xs text-gray-500">
                      {link.clicks > 100
                        ? '🔥'
                        : link.clicks > 50
                        ? '📈'
                        : '📊'}
                    </div>
                  </div>
                </td>
                {/* Created At */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <div>
                      <div className="text-sm text-gray-900">
                        {link.createdAt}
                      </div>
                      {link.expiration && (
                        <div className="text-xs text-amber-600">
                          Expira: {link.expiration}
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                {/* Actions */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      title="Estatísticas"
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <BarChart3 className="w-4 h-4" />
                    </button>
                    <button
                      title="Editar"
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(link.id)}
                      title="Excluir"
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Table Footer */}
      <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Mostrando {links.length} de {links.length} links
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
            Anterior
          </button>
          <button className="px-3 py-1 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700">
            1
          </button>
          <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
            Próximo
          </button>
        </div>
      </div>
    </div>
  );
}
