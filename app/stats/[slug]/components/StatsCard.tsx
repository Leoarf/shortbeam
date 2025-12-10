import { ReactNode } from 'react';

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: ReactNode;
  color: 'green' | 'blue' | 'purple' | 'amber';
}

export function StatsCard({ title, value, icon, color }: StatsCardProps) {
  const colorClasses = {
    green: 'bg-green-100 text-green-600',
    blue: 'bg-blue-100 text-blue-600',
    purple: 'bg-purple-100 text-purple-600',
    amber: 'bg-amber-100 text-amber-600',
  };

  return (
    <div className="bg-white rounded-lg sm:rounded-xl p-4 shadow-sm border border-gray-200">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${colorClasses[color]}`}>{icon}</div>
        <div className="min-w-0">
          <p className="text-xs sm:text-sm text-gray-600 truncate">{title}</p>
          <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 truncate">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}
