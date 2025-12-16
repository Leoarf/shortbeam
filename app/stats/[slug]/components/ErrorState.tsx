import { useRouter } from 'next/navigation';

interface ErrorStateProps {
  error: string;
}

export function ErrorState({ error }: ErrorStateProps) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center max-w-md w-full">
        <div className="text-red-500 text-5xl sm:text-6xl mb-3 sm:mb-4">📊</div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
          Statistics not available
        </h1>
        <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
          {error || 'Link not found'}
        </p>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
          <button
            onClick={() => router.push('/')}
            className="px-4 py-2.5 sm:px-6 sm:py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm sm:text-base"
          >
            Create new link
          </button>
          <button
            onClick={() => router.push('/dashboard')}
            className="px-4 py-2.5 sm:px-6 sm:py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base"
          >
            Return to dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
