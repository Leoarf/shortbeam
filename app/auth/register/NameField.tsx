'use client';

import { User } from 'lucide-react';

interface NameFieldProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function NameField({ value, onChange, error }: NameFieldProps) {
  return (
    <div className="space-y-2">
      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
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
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Seu nome"
          className={`w-full pl-10 pr-4 py-3 rounded-lg border-2 ${
            error ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'
          } text-gray-900 placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200`}
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
