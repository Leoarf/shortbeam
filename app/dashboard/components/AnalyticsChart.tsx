'use client';

import { TrendingUp, Calendar, Download } from 'lucide-react';

export function AnalyticsChart() {
  const dailyData = [
    { day: 'Seg', clicks: 65 },
    { day: 'Ter', clicks: 82 },
    { day: 'Qua', clicks: 94 },
    { day: 'Qui', clicks: 78 },
    { day: 'Sex', clicks: 120 },
    { day: 'Sáb', clicks: 85 },
    { day: 'Dom', clicks: 72 },
  ];

  const maxClicks = Math.max(...dailyData.map((d) => d.clicks));

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            Cliques na Semana
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Desempenho dos últimos 7 dias
          </p>
        </div>
        <button className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
          <Calendar className="w-4 h-4" />
          Esta Semana
        </button>
      </div>
      {/* Chart */}
      <div className="space-y-4">
        <div className="flex items-end justify-between h-40">
          {dailyData.map((day, index) => {
            const height = (day.clicks / maxClicks) * 100;
            return (
              <div key={index} className="flex flex-col items-center">
                <div className="text-xs text-gray-600 mb-2">{day.clicks}</div>
                <div
                  className="w-8 bg-linear-to-t from-green-500 to-green-600 rounded-t-lg"
                  style={{ height: `${height}%` }}
                ></div>
                <div className="text-xs text-gray-600 mt-2">{day.day}</div>
              </div>
            );
          })}
        </div>
        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">+25%</div>
            <div className="text-xs text-gray-600">vs semana passada</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">596</div>
            <div className="text-xs text-gray-600">cliques totais</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">85</div>
            <div className="text-xs text-gray-600">média diária</div>
          </div>
        </div>
      </div>
      {/* Export Button */}
      <button className="w-full mt-6 flex items-center justify-center gap-2 px-4 py-3 border-2 border-green-600 text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200 font-medium">
        <Download className="w-4 h-4" />
        Exportar Relatório
      </button>
    </div>
  );
}
