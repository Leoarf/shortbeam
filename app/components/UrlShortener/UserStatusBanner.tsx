import { Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface UserStatusBannerProps {
  user: {
    id: string;
    email: string;
    name?: string;
  } | null;
}

export function UserStatusBanner({ user }: UserStatusBannerProps) {
  const router = useRouter();

  return (
    <div className="text-center mb-8 sm:mb-12">
      {/* Status Banner */}
      <div className="inline-flex items-center justify-center gap-2 mb-3 sm:mb-4 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-green-100 text-green-700 text-xs sm:text-sm font-medium max-w-full">
        <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
        <span className="truncate">
          {user ? (
            <>
              Olá {user.name || user.email?.split('@')[0] || 'Usuário'}! • Links
              salvos
            </>
          ) : (
            <>Rápido • Seguro • Gratuito</>
          )}
        </span>
      </div>
      {/* Title */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 px-2">
        {user ? (
          <>
            Encurte links e{' '}
            <span className="text-green-600 block sm:inline">
              salve na sua conta
            </span>
          </>
        ) : (
          <>
            Encurte seu link{' '}
            <span className="text-green-600 block sm:inline">em segundos</span>
          </>
        )}
      </h2>
      {/* Description */}
      <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
        {user
          ? 'Crie links que ficam salvos no seu dashboard pessoal'
          : 'Cole sua URL abaixo e obtenha um link curto e rastreável'}
      </p>
      {/* Dashboard Button */}
      {user && (
        <div className="mt-3 sm:mt-4">
          <button
            onClick={() => router.push('/dashboard')}
            className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap"
          >
            <span>📊</span>
            <span>Ver meus links</span>
          </button>
        </div>
      )}
    </div>
  );
}
