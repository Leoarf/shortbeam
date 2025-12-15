'use client';

import { ArrowLeft } from 'lucide-react';
import { Logo } from './Logo';

export function HeaderAuth() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur-sm">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <div className="shrink-0">
            <Logo />
          </div>
          {/* Back to Home */}
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="group inline-flex items-center gap-2 text-gray-700 hover:text-green-600 transition-colors duration-200 font-medium"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
              {/* Text visible on small and larger screens */}
              <span className="hidden sm:inline">Back to Home</span>
              {/* On very small mobile devices (less than 640px), only this text will be visible */}
              <span className="sm:hidden">Home</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
