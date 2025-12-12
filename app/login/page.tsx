import { HeaderAuth } from '../components/Header/HeaderAuth';
import { LoginForm } from '../auth/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      <HeaderAuth />
      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4 py-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-2xl mb-4">
              <div className="w-6 h-6 bg-green-600 rounded-full"></div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Bem-vindo de volta
            </h1>
            <p className="text-gray-600">
              Acesse sua conta para gerenciar seus links
            </p>
          </div>
          <LoginForm />
        </div>
      </main>
    </div>
  );
}
