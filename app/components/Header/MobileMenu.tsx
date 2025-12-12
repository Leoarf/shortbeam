'use client';

import { Link2, User, UserPlus, X, LayoutDashboard } from 'lucide-react';
import { useAuth } from '@/app/context/AuthContext';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { user, isLoading } = useAuth();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="md:hidden fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />
      {/* Menu Panel */}
      <div className="md:hidden fixed inset-x-0 top-0 h-full bg-white z-50 overflow-y-auto flex flex-col">
        {/* Header */}
        <div className="sticky top-0 border-b border-gray-200 bg-white px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-green-100">
              <Link2 className="w-5 h-5 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Menu</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-700 hover:text-green-600"
            aria-label="Fechar menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        {/* Content with flex-grow */}
        <div className="p-4 flex flex-col grow">
          {/* Links */}
          <div className="flex flex-col space-y-2">
            <button
              onClick={() => scrollToSection('home')}
              className="px-4 py-3 text-gray-900 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200 text-base font-medium text-left"
            >
              Início
            </button>
            <button
              onClick={() => scrollToSection('resources')}
              className="px-4 py-3 text-gray-900 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200 text-base font-medium text-left"
            >
              Recursos
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="px-4 py-3 text-gray-900 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200 text-base font-medium text-left"
            >
              Sobre
            </button>
          </div>
          {/* Button fixed at the bottom */}
          <div className="mt-auto pt-6 border-t border-gray-200 space-y-3">
            {!isLoading &&
              (user ? (
                <>
                  <a
                    href="/dashboard"
                    onClick={onClose}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Dashboard</span>
                  </a>
                </>
              ) : (
                <>
                  <a
                    href="/login"
                    onClick={onClose}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-green-600 text-green-600 hover:bg-green-50 rounded-lg font-medium"
                  >
                    <User className="w-4 h-4" />
                    <span>Entrar</span>
                  </a>

                  <a
                    href="/register"
                    onClick={onClose}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Cadastrar</span>
                  </a>
                </>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
