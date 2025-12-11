import { Edit, Sparkles } from 'lucide-react';

interface AdvancedOptionsProps {
  customSlug: string;
  setCustomSlug: (value: string) => void;
}

export function AdvancedOptions({
  customSlug,
  setCustomSlug,
}: AdvancedOptionsProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Custom Slug Option */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Edit className="w-4 h-4 text-gray-600" />
            <label className="text-sm font-medium text-gray-700">
              Slug personalizado
            </label>
          </div>
          <input
            type="text"
            value={customSlug}
            onChange={(e) => setCustomSlug(e.target.value)}
            placeholder="exemplo: meu-link"
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200"
          />
          <p className="text-xs text-gray-500">
            Exemplo:{' '}
            <span className="font-mono text-green-600">
              shortb.m/{customSlug || 'meu-link'}
            </span>
          </p>
        </div>
        {/* Auto-generated Slug Preview */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-gray-600" />
            <label className="text-sm font-medium text-gray-700">
              Slug aleatório
            </label>
          </div>
          <div className="px-4 py-3 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
            <p className="text-gray-600 text-sm">
              Deixe em branco para gerar automaticamente:
            </p>
            <p className="font-mono text-gray-900 mt-1 text-sm">
              shortb.m/<span className="text-green-600">a1b2c3</span>
            </p>
          </div>
          <p className="text-xs text-gray-500">
            Seguro, único e gerado instantaneamente
          </p>
        </div>
      </div>
      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <span className="font-medium">Dica:</span> Use slugs personalizados
          para links que você vai compartilhar frequentemente. Para links
          únicos, o slug aleatório é perfeito!
        </p>
      </div>
    </div>
  );
}
