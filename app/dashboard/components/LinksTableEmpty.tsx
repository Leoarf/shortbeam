import { Link2, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function LinksTableEmpty() {
  const router = useRouter();

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg border border-gray-200 p-4 sm:p-6">
      <div className="text-center py-6 sm:py-8">
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
          <Link2 className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          No links created yet
        </h3>
        <p className="text-gray-600 mb-4 text-sm sm:text-base">
          Start by creating your first shortened link
        </p>
        <button
          onClick={() => router.push('/')}
          className="px-5 sm:px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2 mx-auto"
        >
          <Plus className="w-4 h-4" />
          Create First Link
        </button>
      </div>
    </div>
  );
}
