'use client';

import { AlertCircle, CheckCircle } from 'lucide-react';

interface AuthMessageProps {
  type: 'success' | 'error';
  message: string;
}

export function AuthMessage({ type, message }: AuthMessageProps) {
  const styles = {
    success: {
      bg: 'bg-green-50',
      text: 'text-green-600',
      icon: <CheckCircle className="w-5 h-5" />,
    },
    error: {
      bg: 'bg-red-50',
      text: 'text-red-600',
      icon: <AlertCircle className="w-5 h-5" />,
    },
  };

  const style = styles[type];

  return (
    <div
      className={`flex items-center gap-2 text-sm ${style.bg} ${style.text} px-4 py-3 rounded-lg`}
    >
      {style.icon}
      <span>{message}</span>
    </div>
  );
}
