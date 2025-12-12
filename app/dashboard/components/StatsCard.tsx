import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  change: string;
  color: string;
}

export function StatsCard({
  icon: Icon,
  label,
  value,
  change,
  color,
}: StatsCardProps) {
  return (
    <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-md sm:shadow-lg border border-gray-200 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div
          className={`p-2 sm:p-3 rounded-lg sm:rounded-xl bg-linear-to-br ${color} shadow-sm`}
        >
          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </div>
        <span className="text-xs font-medium text-gray-500 text-right max-w-[120px] sm:max-w-none truncate">
          {change}
        </span>
      </div>
      <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
        {typeof value === 'number' ? value.toLocaleString('pt-BR') : value}
      </div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  );
}
