import { ReactNode } from 'react';

interface TopListItem {
  label: string;
  count: number;
}

interface TopListProps {
  title: string;
  items: TopListItem[];
  icon: ReactNode;
  emptyMessage: string;
}

export function TopList({ title, items, icon, emptyMessage }: TopListProps) {
  return (
    <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200">
      <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
        {icon}
        <span>{title}</span>
      </h2>
      <div className="space-y-2 sm:space-y-3">
        {items.length > 0 ? (
          items.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-1.5"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-xs text-gray-500 w-6">#{index + 1}</span>
                <span
                  className="text-sm font-medium truncate"
                  title={item.label}
                >
                  {item.label}
                </span>
              </div>
              <span className="bg-gray-100 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs font-medium whitespace-nowrap ml-2">
                {item.count} cliques
              </span>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center py-4 text-sm">
            {emptyMessage}
          </p>
        )}
      </div>
    </div>
  );
}