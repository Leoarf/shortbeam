import { ThemeToggle } from './components/ThemeToggle';

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            ShortBeam
          </h1>
          <ThemeToggle />
        </header>

        <div className="text-center py-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Encurtador de URL
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Encurte seus links de forma rápida, simples e gratuita
          </p>

          <div className="max-w-md mx-auto bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
            <p className="text-gray-700 dark:text-gray-300">
              Interface funcionando com tema claro/escuro!
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Clique no botão no canto superior direito para alternar temas
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
