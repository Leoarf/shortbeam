import { Edit, Calendar, Lock } from 'lucide-react';

interface AdvancedOptionsProps {
  customSlug: string;
  setCustomSlug: (value: string) => void;
  expiration: string;
  setExpiration: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
}

export function AdvancedOptions({
  customSlug,
  setCustomSlug,
  expiration,
  setExpiration,
  password,
  setPassword,
}: AdvancedOptionsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
          Exemplo: shortb.m/<span className="font-medium">meulink</span>
        </p>
      </div>
      {/* Expiration */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Calendar className="w-4 h-4" />
          Expira em
        </label>
        <select
          value={expiration}
          onChange={(e) => setExpiration(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 bg-gray-50 text-gray-900 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200"
        >
          <option value="">Nunca expira</option>
          <option value="1h">1 hora</option>
          <option value="24h">24 horas</option>
          <option value="7d">7 dias</option>
          <option value="30d">30 dias</option>
        </select>
      </div>
      {/* Password */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Lock className="w-4 h-4" />
          Senha (opcional)
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200"
        />
      </div>
    </div>
  );
}
