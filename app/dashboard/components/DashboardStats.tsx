import { Link2, Eye, TrendingUp, Target } from 'lucide-react';
import { StatsCard } from './StatsCard';

interface DashboardStatsProps {
  stats: {
    totalLinks: number;
    totalClicks: number;
    averageClicks: number;
  };
  mostClicked: {
    slug: string;
    clicks: number;
    url: string;
  } | null;
}

export function DashboardStats({ stats, mostClicked }: DashboardStatsProps) {
  const dynamicStats = [
    {
      icon: Link2,
      label: 'Total de Links',
      value: stats.totalLinks,
      change: `${stats.totalLinks} criado${stats.totalLinks !== 1 ? 's' : ''}`,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Eye,
      label: 'Total de Cliques',
      value: stats.totalClicks,
      change: `${stats.averageClicks} média por link`,
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: TrendingUp,
      label: 'Média de Cliques',
      value: stats.averageClicks,
      change: 'Baseado em todos os links',
      color: 'from-purple-500 to-violet-500',
    },
    {
      icon: Target,
      label: 'Mais Clicado',
      value: mostClicked ? `${mostClicked.clicks} cliques` : '—',
      change: mostClicked ? `/${mostClicked.slug}` : 'Nenhum link ainda',
      color: 'from-amber-500 to-orange-500',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {dynamicStats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>
    </div>
  );
}
