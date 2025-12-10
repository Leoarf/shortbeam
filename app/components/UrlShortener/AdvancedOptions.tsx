import { Edit } from 'lucide-react';

interface AdvancedOptionsProps {
  customSlug: string;
  setCustomSlug: (value: string) => void;
}

export function AdvancedOptions({
  customSlug,
  setCustomSlug,
}: AdvancedOptionsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Customize slug */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Edit className="w-4 h-4" />
          Personalizar slug
        </label>
        <input
          type="text"
          value={customSlug}
          onChange={(e) => setCustomSlug(e.target.value)}
          placeholder="meulink"
          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200"
        />
        <p className="text-xs text-gray-500">
          Exemplo: {process.env.NEXT_PUBLIC_APP_URL || 'shortb.m'}/
          <span className="font-medium">{customSlug || 'meulink'}</span>
        </p>
      </div>
    </div>
  );
}
