'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { EmailField } from './login/EmailField';
import { PasswordField } from './login/PasswordField';
import { AuthMessage } from './login/AuthMessage';
import { useAuth } from '../context/AuthContext';

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (searchParams.get('registered') === 'true') {
      setSuccessMessage('Account created successfully! Log in to continue.');
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    setSuccessMessage('');

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.details) {
          const newErrors: Record<string, string> = {};
          result.details.forEach((err: any) => {
            newErrors[err.field] = err.message;
          });
          setErrors(newErrors);
        } else if (result.error) {
          setErrors({ general: result.error });
        } else {
          setErrors({ general: 'Error when logging in' });
        }
        return;
      }

      // Login successful
      login(result.user);
      router.push('/dashboard');
    } catch (error) {
      setErrors({ general: 'Connection error. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200">
      <form onSubmit={handleSubmit} className="space-y-6">
        {successMessage && (
          <AuthMessage type="success" message={successMessage} />
        )}
        {errors.general && (
          <AuthMessage type="error" message={errors.general} />
        )}
        <EmailField
          value={formData.email}
          onChange={(value) => handleChange('email', value)}
          error={errors.email}
        />
        <PasswordField
          value={formData.password}
          onChange={(value) => handleChange('password', value)}
          error={errors.password}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 px-6 bg-linear-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Entering...</span>
            </>
          ) : (
            <span>Login to Account</span>
          )}
        </button>
        <div className="text-center pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <a
              href="/register"
              className="text-green-600 hover:text-green-700 font-medium"
            >
              Register
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}

export function LoginForm() {
  return (
    <Suspense
      fallback={
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200">
          <div className="flex justify-center items-center h-40">
            <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      }
    >
      <LoginFormContent />
    </Suspense>
  );
}
