import { HeaderAuth } from '../components/Header/HeaderAuth';
import { RegisterForm } from '../auth/RegisterForm';

export default function RegisterPage() {
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
              Create your account
            </h1>
            <p className="text-gray-600">
              Start shortening links and track your statistics
            </p>
          </div>
          <RegisterForm />
        </div>
      </main>
    </div>
  );
}
