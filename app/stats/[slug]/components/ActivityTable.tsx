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

export function ActivityTable({ analytics }: ActivityTableProps) {
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
                  analytics.slice(0, 5).map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap text-sm text-gray-900">
                        {new Date(item.createdAt).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap text-sm text-gray-900">
                        {item.country || 'Desconhecido'}
                      </td>
                      <td className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap text-sm text-gray-900">
                        {item.city || 'Desconhecido'}
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
                      colSpan={4}
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
      {analytics.length > 5 && (
        <div className="mt-4 text-center">
          <button className="text-green-600 hover:text-green-700 text-sm font-medium">
            Ver todos os {analytics.length} registros
          </button>
        </div>
      )}
    </div>
  );
}
