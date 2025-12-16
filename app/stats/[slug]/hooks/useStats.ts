import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

interface ShortUrlData {
  id: string;
  url: string;
  slug: string;
  clicks: number;
  createdAt: string;
  updatedAt: string;
}

interface AnalyticsItem {
  id: string;
  ip: string;
  userAgent: string;
  referrer: string | null;
  country: string | null;
  city: string | null;
  createdAt: string;
}

interface Statistics {
  totalClicks: number;
  uniqueCountries: number;
  uniqueCities: number;
  clicksByDate: Record<string, number>;
  topReferrers: Array<{ domain: string; count: number }>;
  topCountries: Array<{ country: string; count: number }>;
}

export function useStats() {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [urlData, setUrlData] = useState<ShortUrlData | null>(null);
  const [analytics, setAnalytics] = useState<AnalyticsItem[]>([]);
  const [statistics, setStatistics] = useState<Statistics | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const slug = params.slug as string;

        if (!slug) {
          setError('Invalid link');
          setLoading(false);
          return;
        }

        const response = await fetch(`/api/stats/${slug}`);

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || 'Statistics not found');
        }

        const data = await response.json();
        setUrlData(data.url);
        setAnalytics(data.analytics.data);
        setStatistics(data.statistics);
      } catch (err) {
        console.error('Stats error:', err);
        setError(
          err instanceof Error ? err.message : 'Error loading statistics'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [params.slug]);

  return {
    loading,
    error,
    urlData,
    analytics,
    statistics,
  };
}
