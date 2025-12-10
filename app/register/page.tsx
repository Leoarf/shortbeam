import { Header } from '../components/Header';
import { RegisterForm } from '../auth/RegisterForm';

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      <Header />
      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4 py-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Crie sua conta
            </h1>
            <p className="text-gray-600">
              Comece a encurtar links e acompanhe suas estatísticas
            </p>
          </div>
          <RegisterForm />
          <div className="mt-8 text-center">
            <p className="text-gray-600 text-sm">
              Já tem uma conta?{' '}
              <a
                href="/login"
                className="text-green-600 hover:text-green-700 font-medium"
              >
                Faça login
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
