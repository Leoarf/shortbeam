import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface LinksTableHeaderProps {
  linksCount: number;
}

export function LinksTableHeader({ linksCount }: LinksTableHeaderProps) {
  const router = useRouter();

  return (
    <div className="px-4 sm:px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div>
        <h2 className="text-lg sm:text-xl font-bold text-gray-900">
          Seus Links
        </h2>
        <p className="text-sm text-gray-600">
          {linksCount} link{linksCount !== 1 ? 's' : ''} encurtado
          {linksCount !== 1 ? 's' : ''}
        </p>
      </div>
      <button
        onClick={() => router.push('/')}
        className="px-4 py-2 bg-linear-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium rounded-lg transition-all duration-200 flex items-center gap-2 justify-center text-sm sm:text-base"
      >
        <Plus className="w-4 h-4" />
        Novo Link
      </button>
    </div>
  );
}
