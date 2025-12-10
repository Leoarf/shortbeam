'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function RedirectPage() {
  const params = useParams();
  const router = useRouter();
  const [error, setError] = useState('');

  useEffect(() => {
    const redirect = async () => {
      try {
        const slug = params.slug as string;
        // Check if there is a slug
        if (!slug) {
          setError('Link inválido');
          return;
        }
        // Make a request to the API to obtain the original URL
        const response = await fetch(`/api/${slug}`);
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || 'Link não encontrado');
        }
        // If the API returns a redirect, follow the redirect
        if (response.redirected) {
          window.location.href = response.url;
        } else {
          // If it didn't redirect automatically, get the URL from the Location header
          const location = response.headers.get('Location');
          if (location) {
            window.location.href = location;
          } else {
            throw new Error('URL de redirecionamento não encontrada');
          }
        }
      } catch (err) {
        console.error('Redirect error:', err);
        setError(err instanceof Error ? err.message : 'Erro ao redirecionar');
      }
    };

    redirect();
  }, [params.slug]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Link não encontrado
          </h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Criar novo link
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <Loader2 className="w-12 h-12 text-green-600 animate-spin mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Redirecionando...
        </h1>
        <p className="text-gray-600">Aguarde um momento</p>
      </div>
    </div>
  );
}
