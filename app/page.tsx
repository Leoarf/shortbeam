import { Header } from './components/Header';

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <section className="text-center max-w-4xl mx-auto pt-12 sm:pt-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Bem-vindo ao{' '}
            <span className="text-green-600">ShortBeam</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Em breve: uma ferramenta poderosa para encurtar URLs
          </p>
          {/* Demo Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-200 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Em Breve Disponível
            </h2>
            <p className="text-gray-600 mb-6">
              Estamos trabalhando em uma solução incrível para encurtamento de links.
              Fique atento para o lançamento!
            </p>
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <p className="text-green-800 font-medium">
                ⚡ Recursos que estamos preparando:
              </p>
              <ul className="mt-2 space-y-1 text-green-700">
                <li>• Encurtamento rápido e seguro</li>
                <li>• Estatísticas detalhadas</li>
                <li>• Links personalizados</li>
                <li>• Interface moderna e intuitiva</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      {/* Footer */}
      <footer className="mt-16 border-t border-gray-200 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600">
            © {new Date().getFullYear()} ShortBeam. Projeto em desenvolvimento.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Em breve mais novidades!
          </p>
        </div>
      </footer>
    </div>
  );
}