'use client';

import { StatsHeader } from './components/StatsHeader';
import { LoadingState } from './components/LoadingState';
import { ErrorState } from './components/ErrorState';
import { StatsContent } from './components/StatsContent';
import { useStats } from './hooks/useStats';

export default function StatsPage() {
  const { loading, error, urlData, analytics, statistics } = useStats();

  if (loading) {
    return <LoadingState />;
  }

  if (error || !urlData) {
    return <ErrorState error={error} />;
  }

  const shortUrl = `${
    process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  }/${urlData.slug}`;

  return (
    <div className="min-h-screen bg-gray-50">
      <StatsHeader
        shortUrl={shortUrl}
        originalUrl={urlData.url}
        slug={urlData.slug}
      />
      <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
        <StatsContent
          urlData={urlData}
          analytics={analytics}
          statistics={statistics}
        />
      </main>
    </div>
  );
}
