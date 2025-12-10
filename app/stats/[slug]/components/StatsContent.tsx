import {
  MousePointer,
  MapPin,
  Users,
  Calendar,
  Globe,
  Share2,
} from 'lucide-react';
import { StatsCard } from './StatsCard';
import { TopList } from './TopList';
import { ActivityTable } from './ActivityTable';
import { UrlInfo } from './UrlInfo';

interface StatsContentProps {
  urlData: {
    id: string;
    url: string;
    slug: string;
    clicks: number;
    createdAt: string;
    updatedAt: string;
  };
  analytics: Array<{
    id: string;
    ip: string;
    userAgent: string;
    referrer: string | null;
    country: string | null;
    city: string | null;
    createdAt: string;
  }>;
  statistics: {
    totalClicks: number;
    uniqueCountries: number;
    uniqueCities: number;
    clicksByDate: Record<string, number>;
    topReferrers: Array<{ domain: string; count: number }>;
    topCountries: Array<{ country: string; count: number }>;
  } | null;
}

export function StatsContent({
  urlData,
  analytics,
  statistics,
}: StatsContentProps) {
  const shortUrl = `${
    process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  }/${urlData.slug}`;

  // Prepare data for the components
  const topCountries =
    statistics?.topCountries?.map((item) => ({
      label: item.country,
      count: item.count,
    })) || [];

  const topReferrers =
    statistics?.topReferrers?.map((item) => ({
      label: item.domain,
      count: item.count,
    })) || [];

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        <StatsCard
          title="Total de Cliques"
          value={statistics?.totalClicks || 0}
          icon={<MousePointer className="w-4 h-4 sm:w-5 sm:h-5" />}
          color="green"
        />
        <StatsCard
          title="Países Únicos"
          value={statistics?.uniqueCountries || 0}
          icon={<MapPin className="w-4 h-4 sm:w-5 sm:h-5" />}
          color="blue"
        />
        <StatsCard
          title="Cidades Únicas"
          value={statistics?.uniqueCities || 0}
          icon={<Users className="w-4 h-4 sm:w-5 sm:h-5" />}
          color="purple"
        />
        <StatsCard
          title="Criado em"
          value={new Date(urlData.createdAt).toLocaleDateString('pt-BR')}
          icon={<Calendar className="w-4 h-4 sm:w-5 sm:h-5" />}
          color="amber"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <TopList
          title="Top Países"
          items={topCountries}
          icon={<Globe className="w-4 h-4 sm:w-5 sm:h-5" />}
          emptyMessage="Nenhum dado de país disponível"
        />
        <TopList
          title="Principais Referências"
          items={topReferrers}
          icon={<Share2 className="w-4 h-4 sm:w-5 sm:h-5" />}
          emptyMessage="Nenhum referenciador disponível"
        />
      </div>
      <div className="mb-6 sm:mb-8">
        <ActivityTable analytics={analytics} />
      </div>
      <div>
        <UrlInfo
          originalUrl={urlData.url}
          shortUrl={shortUrl}
          createdAt={urlData.createdAt}
          updatedAt={urlData.updatedAt}
        />
      </div>
    </>
  );
}
