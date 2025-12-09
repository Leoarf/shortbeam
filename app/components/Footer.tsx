'use client';

import { Link2 } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-gray-200 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-3 mb-4 md:mb-0">
            <div className="p-2 rounded-xl bg-green-100">
              <Link2 className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">ShortBeam</h3>
          </div>
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} Leoarf. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <span className="text-gray-600 hover:text-green-600 transition-colors text-sm cursor-default">
              Termos
            </span>
            <span className="text-gray-600 hover:text-green-600 transition-colors text-sm cursor-default">
              Privacidade
            </span>
            <span className="text-gray-600 hover:text-green-600 transition-colors text-sm cursor-default">
              Contato
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
