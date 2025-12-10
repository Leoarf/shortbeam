'use client';

import { useState } from 'react';
import { Mail, User, Lock, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Registration simulation
    setTimeout(() => {
      console.log('Registration attempt:', formData);
      setIsLoading(false);
      // Redirect after successful registration.
      router.push('/dashboard');
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Nome (opcional)
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <User className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Seu nome"
              className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200"
            />
          </div>
        </div>
        {/* Email Field */}
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <Mail className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="seu@email.com"
              className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200"
              required
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Senha
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <Lock className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full pl-10 pr-12 py-3 rounded-lg border-2 border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200"
              required
              minLength={6}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
          <p className="text-xs text-gray-500">Mínimo de 6 caracteres</p>
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 px-6 bg-linear-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Criando conta...</span>
            </>
          ) : (
            <>
              <CheckCircle className="w-5 h-5" />
              <span>Criar Conta Gratuita</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
