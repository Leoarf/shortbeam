'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle } from 'lucide-react';
import { NameField } from './register/NameField';
import { EmailField } from './register/EmailField';
import { PasswordField } from './register/PasswordField';
import { ConfirmPasswordField } from './register/ConfirmPasswordField';
import { AuthMessage } from './login/AuthMessage';

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
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    // Basic validation on the frontend
    const newErrors: Record<string, string> = {};

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "The passwords don't match.";
    }

    if (formData.password.length < 6) {
      newErrors.password = 'The password must be at least 6 characters long.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          name: formData.name || undefined,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        // Handling validation errors
        if (result.details) {
          const apiErrors: Record<string, string> = {};
          result.details.forEach((err: any) => {
            apiErrors[err.field] = err.message;
          });
          setErrors(apiErrors);
        } else if (result.error) {
          setErrors({ general: result.error });
        } else {
          setErrors({ general: 'Error creating account' });
        }
        return;
      }

      // Success - redirect to login
      router.push('/login?registered=true');
    } catch (error) {
      setErrors({ general: 'Connection error. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear field error when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200">
      <form onSubmit={handleSubmit} className="space-y-6">
        {errors.general && (
          <AuthMessage type="error" message={errors.general} />
        )}
        <NameField
          value={formData.name}
          onChange={(value) => handleChange('name', value)}
          error={errors.name}
        />
        <EmailField
          value={formData.email}
          onChange={(value) => handleChange('email', value)}
          error={errors.email}
        />
        <PasswordField
          value={formData.password}
          onChange={(value) => handleChange('password', value)}
          error={errors.password}
          showPassword={showPassword}
          onTogglePassword={togglePasswordVisibility}
        />
        <ConfirmPasswordField
          value={formData.confirmPassword}
          onChange={(value) => handleChange('confirmPassword', value)}
          error={errors.confirmPassword}
          showPassword={showPassword}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 px-6 bg-linear-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Creating account...</span>
            </>
          ) : (
            <>
              <CheckCircle className="w-5 h-5" />
              <span>Create a Free Account</span>
            </>
          )}
        </button>
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Do you already have an account?{' '}
            <a
              href="/login"
              className="text-green-600 hover:text-green-700 font-medium"
            >
              Log in
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}
