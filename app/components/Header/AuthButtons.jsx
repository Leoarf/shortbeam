import { User, UserPlus } from 'lucide-react';

export function AuthButtons() {
  return (
    <div className="hidden md:flex items-center gap-3">
      <a
        href="/login"
        className="flex items-center gap-2 px-4 py-2 border border-green-600 text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200 font-medium"
      >
        <User className="w-4 h-4" />
        <span>Entrar</span>
      </a>
      <a
        href="/register"
        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all duration-200 font-medium shadow-sm hover:shadow-md flex items-center gap-2"
      >
        <UserPlus className="w-4 h-4" />
        <span>Cadastrar</span>
      </a>
    </div>
  );
}
