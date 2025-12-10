'use client';

import {
  Link2,
  Eye,
  TrendingUp,
  Clock,
  Globe,
  Smartphone,
  Target,
} from 'lucide-react';

const stats = [
  {
    icon: Link2,
    label: 'Total de Links',
    value: '12',
    change: '+2 este mês',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Eye,
    label: 'Total de Cliques',
    value: '1.2K',
    change: '+25% vs mês passado',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: TrendingUp,
    label: 'Taxa de Clique',
    value: '4.2%',
    change: '+0.8%',
    color: 'from-purple-500 to-violet-500',
  },
  {
    icon: Clock,
    label: 'Link Mais Antigo',
    value: '3 dias',
    change: 'Criado recentemente',
    color: 'from-amber-500 to-orange-500',
  },
];

const topCountries = [
  { country: '🇧🇷 Brasil', clicks: 450, percentage: 38 },
  { country: '🇺🇸 EUA', clicks: 280, percentage: 23 },
  { country: '🇵🇹 Portugal', clicks: 190, percentage: 16 },
  { country: '🇪🇸 Espanha', clicks: 150, percentage: 12 },
];

export function DashboardStats() {
  return (
    <div className="space-y-8">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-linear-to-br ${stat.color}`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs font-medium text-gray-500">
                {stat.change}
              </span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {stat.value}
            </div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>
      {/* Analytics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Top Countries */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-bold text-gray-900">Top Países</h3>
          </div>
          <div className="space-y-3">
            {topCountries.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-lg">{item.country}</span>
                </div>
                <div className="text-right">
                  <div className="font-medium text-gray-900">
                    {item.clicks} cliques
                  </div>
                  <div className="text-xs text-gray-500">
                    {item.percentage}% do total
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Device Breakdown */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <Smartphone className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-bold text-gray-900">Dispositivos</h3>
          </div>
          <div className="space-y-4">
            {[
              { device: '📱 Mobile', percentage: 65, color: 'bg-blue-500' },
              { device: '💻 Desktop', percentage: 28, color: 'bg-green-500' },
              { device: '📟 Tablet', percentage: 7, color: 'bg-purple-500' },
            ].map((item, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">
                    {item.device}
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    {item.percentage}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`${item.color} h-2 rounded-full`}
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Referrers */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-bold text-gray-900">
              Principais Fontes
            </h3>
          </div>
          <div className="space-y-3">
            {[
              { source: 'Social Media', clicks: 320 },
              { source: 'Pesquisa Direta', clicks: 280 },
              { source: 'Email', clicks: 190 },
              { source: 'Outros Sites', clicks: 150 },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-sm text-gray-700">{item.source}</span>
                </div>
                <span className="font-medium text-gray-900">{item.clicks}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
