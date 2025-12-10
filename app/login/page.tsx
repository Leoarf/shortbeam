import { Header } from '../components/Header';
import { LoginForm } from '../auth/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      <Header />
      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4 py-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Bem-vindo de volta
            </h1>
            <p className="text-gray-600">
              Acesse sua conta para gerenciar seus links
            </p>
          </div>
          <LoginForm />
          <div className="mt-8 text-center">
            <p className="text-gray-600 text-sm">
              Não tem uma conta?{' '}
              <a
                href="/register"
                className="text-green-600 hover:text-green-700 font-medium"
              >
                Cadastre-se
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
