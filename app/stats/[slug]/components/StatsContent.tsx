import {
  MousePointer,
  MapPin,
  Users,
  Calendar,
  Globe,
  Share2,
  Smartphone,
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
    deviceStats?: Array<{ device: string; count: number }>;
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

  // Data for device chart
  const deviceData =
    statistics?.deviceStats?.map((item) => ({
      device: item.device,
      count: item.count,
      percentage: Math.round(
        (item.count / (statistics?.totalClicks || 1)) * 100
      ),
    })) || [];

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        <StatsCard
          title="Total Clicks"
          value={statistics?.totalClicks || 0}
          icon={<MousePointer className="w-4 h-4 sm:w-5 sm:h-5" />}
          color="green"
        />
        <StatsCard
          title="Unique Countries"
          value={statistics?.uniqueCountries || 0}
          icon={<MapPin className="w-4 h-4 sm:w-5 sm:h-5" />}
          color="blue"
        />
        <StatsCard
          title="Unique Cities"
          value={statistics?.uniqueCities || 0}
          icon={<Users className="w-4 h-4 sm:w-5 sm:h-5" />}
          color="purple"
        />
        <StatsCard
          title="Created at"
          value={new Date(urlData.createdAt).toLocaleDateString('en-US')}
          icon={<Calendar className="w-4 h-4 sm:w-5 sm:h-5" />}
          color="amber"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <TopList
          title="Top Countries"
          items={topCountries}
          icon={<Globe className="w-4 h-4 sm:w-5 sm:h-5" />}
          emptyMessage="No country data available"
        />
        <TopList
          title="Top Referrers"
          items={topReferrers}
          icon={<Share2 className="w-4 h-4 sm:w-5 sm:h-5" />}
          emptyMessage="No referrers available"
        />
      </div>
      {/* Device Chart */}
      {deviceData.length > 0 && (
        <div className="mb-6 sm:mb-8">
          <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Smartphone className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Devices</span>
            </h2>
            <div className="space-y-3">
              {deviceData.map((item) => (
                <div
                  key={item.device}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{item.device}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-32 sm:w-48 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium w-12 text-right">
                      {item.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
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
