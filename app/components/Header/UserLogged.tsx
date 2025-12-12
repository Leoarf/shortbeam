'use client';

import { LayoutDashboard } from 'lucide-react';

export function UserLogged() {
  return (
    <div className="hidden md:flex items-center gap-3">
      <a
        href="/dashboard"
        className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all duration-200 shadow-sm hover:shadow-md font-medium"
      >
        <LayoutDashboard className="w-4 h-4" />
        <span>Dashboard</span>
      </a>
    </div>
  );
}
