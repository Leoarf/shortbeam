'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    console.log('ThemeToggle mounted');
    console.log('Current theme:', theme);
  }, [theme]);

  if (!mounted) {
    return (
      <button
        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800"
        aria-label="Carregando tema"
      >
        <Sun className="w-5 h-5 text-gray-800 dark:text-gray-200" />
      </button>
    );
  }

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    console.log('Changing theme to:', newTheme);
    setTheme(newTheme);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={toggleTheme}
        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
        aria-label={`Mudar para tema ${theme === 'dark' ? 'claro' : 'escuro'}`}
        title={`Tema atual: ${theme === 'dark' ? 'Escuro' : 'Claro'}`}
      >
        {theme === 'dark' ? (
          <>
            <Sun className="w-5 h-5 text-yellow-500" />
            <span className="text-sm text-gray-600 dark:text-gray-400 hidden sm:inline">
              Claro
            </span>
          </>
        ) : (
          <>
            <Moon className="w-5 h-5 text-gray-800 dark:text-gray-200" />
            <span className="text-sm text-gray-600 dark:text-gray-400 hidden sm:inline">
              Escuro
            </span>
          </>
        )}
      </button>
    </div>
  );
}
