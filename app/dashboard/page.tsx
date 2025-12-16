'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardHeader } from '../auth/DashboardHeader';
import { DashboardStats } from './components/DashboardStats';
import { LinksTable } from './components/LinksTable';
import { LoadingState } from './components/LoadingState';

interface ShortUrl {
  id: string;
  url: string;
  slug: string;
  clicks: number;
  createdAt: string;
  updatedAt: string;
}

interface DashboardData {
  user: {
    id: string;
    email: string;
  };
  statistics: {
    totalLinks: number;
    totalClicks: number;
    averageClicks: number;
  };
  links: ShortUrl[];
  recentLinks: ShortUrl[];
  mostClicked: {
    slug: string;
    clicks: number;
    url: string;
  } | null;
}

interface ApiResponse {
  success: boolean;
  error?: string;
  user: { id: string };
  statistics: {
    totalLinks: number;
    totalClicks: number;
    averageClicks: number;
  };
  links: ShortUrl[];
  recentLinks: ShortUrl[];
  mostClicked: {
    slug: string;
    clicks: number;
    url: string;
  } | null;
}

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState<any>(null);
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    checkAuthAndLoadData();
  }, []);

  const checkAuthAndLoadData = async () => {
    try {
      const userData = localStorage.getItem('user');

      if (!userData) {
        router.push('/login');
        return;
      }

      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      await fetchDashboardData(parsedUser.id);
    } catch (error) {
      console.error('Error loading dashboard:', error);
      setError('Error loading data');
      setLoading(false);
    }
  };

  const fetchDashboardData = async (userId: string) => {
    try {
      const response = await fetch(`/api/user/links?userId=${userId}`);

      if (!response.ok) {
        throw new Error(`Error ${response.status} while retrieving data`);
      }

      const result: ApiResponse = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Error in API response');
      }

      setData({
        user: { id: result.user.id, email: user?.email || '' },
        statistics: result.statistics,
        links: result.links,
        recentLinks: result.recentLinks,
        mostClicked: result.mostClicked,
      });
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    if (user) {
      setLoading(true);
      fetchDashboardData(user.id);
    }
  };

  if (loading) {
    return <LoadingState />;
  }

  if (error || !user || !data) {
    return (
      <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
        <DashboardHeader />
        <main className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
          <div className="text-center py-8 sm:py-12">
            <div className="text-red-500 text-4xl sm:text-5xl mb-3 sm:mb-4">
              ⚠️
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
              Error loading
            </h2>
            <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
              {error || 'Data not found'}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handleRefresh}
                className="px-5 sm:px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
              >
                Try again
              </button>
              <button
                onClick={() => router.push('/')}
                className="px-5 sm:px-6 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg font-medium transition-colors"
              >
                Create Link
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      <DashboardHeader />
      <main className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1">
            Hello, {user.name || user.email?.split('@')[0] || 'User'}! 👋
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Manage your links and track statistics
          </p>
        </div>
        <div className="mb-6 sm:mb-8">
          <DashboardStats
            stats={data.statistics}
            mostClicked={data.mostClicked}
          />
        </div>
        <div className="space-y-6 sm:space-y-8">
          <LinksTable links={data.recentLinks} />
        </div>
      </main>
    </div>
  );
}
