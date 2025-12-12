'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogOut, Link as LinkIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function DashboardHeader() {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 w-full">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 bg-green-600 text-white rounded-lg flex items-center justify-center">
              <LinkIcon className="w-4 h-4" />
            </div>
            <span className="font-bold text-lg text-gray-900">ShortBeam</span>
          </div>
          <div className="flex items-center gap-2">
            {/* Back to home */}
            <Link
              href="/"
              className="px-3 py-1.5 sm:px-4 sm:py-2 border border-green-600 text-green-600 
              text-sm rounded-lg hover:bg-green-50 transition"
            >
              Voltar
            </Link>
            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 px-3 py-1.5 sm:px-4 sm:py-2 
              border border-red-600 text-red-600 text-sm rounded-lg 
              hover:bg-red-50 transition"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sair</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
