import { Clock } from 'lucide-react';

interface AnalyticsItem {
  id: string;
  ip: string;
  country: string | null;
  city: string | null;
  referrer: string | null;
  createdAt: string;
}

interface ActivityTableProps {
  analytics: AnalyticsItem[];
}

// Country mapping for flag emojis
const countryFlags: Record<string, string> = {
  Brasil: '🇧🇷',
  'Estados Unidos': '🇺🇸',
  Portugal: '🇵🇹',
  Espanha: '🇪🇸',
  França: '🇫🇷',
  Alemanha: '🇩🇪',
  Itália: '🇮🇹',
  'Reino Unido': '🇬🇧',
  Japão: '🇯🇵',
  China: '🇨🇳',
  Rússia: '🇷🇺',
  Índia: '🇮🇳',
  Canadá: '🇨🇦',
  Austrália: '🇦🇺',
  México: '🇲🇽',
  Argentina: '🇦🇷',
  Chile: '🇨🇱',
  Colômbia: '🇨🇴',
  Peru: '🇵🇪',
  Venezuela: '🇻🇪',
  Uruguai: '🇺🇾',
  Paraguai: '🇵🇾',
  Bolívia: '🇧🇴',
  Equador: '🇪🇨',
  Local: '🏠',
};

export function ActivityTable({ analytics }: ActivityTableProps) {
  const getCountryWithFlag = (country: string | null) => {
    if (!country) return '🌐 Desconhecido';
    const flag = countryFlags[country] || '🌐';
    return `${flag} ${country}`;
  };

  return (
    <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200">
      <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
        <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
        <span>Atividade Recente</span>
      </h2>
      <div className="overflow-x-auto -mx-4 sm:mx-0">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data/Hora
                  </th>
                  <th className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    IP
                  </th>
                  <th className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    País
                  </th>
                  <th className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cidade
                  </th>
                  <th className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Referência
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {analytics.length > 0 ? (
                  analytics.slice(0, 10).map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap text-sm text-gray-900">
                        {new Date(item.createdAt).toLocaleString('pt-BR')}
                      </td>
                      <td className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap text-sm text-gray-900 font-mono">
                        {item.ip}
                      </td>
                      <td className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap text-sm text-gray-900">
                        {getCountryWithFlag(item.country)}
                      </td>
                      <td className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap text-sm text-gray-900">
                        {item.city || '—'}
                      </td>
                      <td className="px-3 py-2 sm:px-4 sm:py-3 text-sm text-gray-900 max-w-[120px] sm:max-w-[200px] truncate">
                        {item.referrer ? (
                          <a
                            href={item.referrer}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline truncate block"
                            title={item.referrer}
                          >
                            {new URL(item.referrer).hostname}
                          </a>
                        ) : (
                          'Direto'
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-3 py-8 text-center text-gray-500 text-sm"
                    >
                      Nenhuma atividade registrada ainda
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {analytics.length > 10 && (
        <div className="mt-4 text-center">
          <span className="text-gray-500 text-sm">
            Mostrando 10 de {analytics.length} registros
          </span>
        </div>
      )}
    </div>
  );
}
