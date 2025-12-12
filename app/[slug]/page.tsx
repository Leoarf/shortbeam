'use client';

import { useEffect, useState } from 'react';
import { Loader2, AlertCircle, ExternalLink } from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function RedirectPage({ params }: PageProps) {
  const [slug, setSlug] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [originalUrl, setOriginalUrl] = useState<string>('');

  useEffect(() => {
    const fetchSlug = async () => {
      try {
        const resolvedParams = await params;
        setSlug(resolvedParams.slug);
      } catch (err) {
        console.error('Erro ao obter slug:', err);
        setError('Erro ao processar o link');
        setLoading(false);
      }
    };

    fetchSlug();
  }, [params]);

  useEffect(() => {
    if (!slug) return;

    const redirect = async () => {
      setLoading(true);
      setError('');

      try {
        console.log(`Buscando URL para slug: ${slug}`);

        // Use a fetch function to obtain the original URL
        const response = await fetch(`/api/${slug}`);

        if (!response.ok) {
          const data = await response.json();
          throw new Error(
            data.error || `Erro ${response.status}: Link não encontrado`
          );
        }

        const data = await response.json();
        const url = data.url;

        if (!url) {
          throw new Error('URL não encontrada na resposta');
        }

        console.log(`Redirecionando para: ${url}`);
        setOriginalUrl(url);

        // Redirect after a brief delay to show loading
        setTimeout(() => {
          window.location.href = url;
        }, 500);
      } catch (err) {
        console.error('Erro ao redirecionar:', err);
        setLoading(false);

        const errorMessage =
          err instanceof Error ? err.message : 'Erro desconhecido';

        setError(`Não foi possível redirecionar: ${errorMessage}`);
      }
    };

    redirect();
  }, [slug]);
  // Loading screen
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-white p-4">
        <div className="text-center max-w-md">
          <Loader2 className="w-12 h-12 text-green-600 animate-spin mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Redirecionando...
          </h1>
          <div className="mb-4">
            <div className="inline-block px-3 py-1 bg-gray-100 rounded-full">
              <code className="font-mono text-sm text-gray-800">/{slug}</code>
            </div>
          </div>
          <p className="text-gray-600">Aguarde enquanto buscamos o destino.</p>
        </div>
      </div>
    );
  }
  // Error screen
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-white p-4">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Não foi possível redirecionar
          </h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="space-y-3 mb-6">
            {originalUrl && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-gray-700 mb-2">URL encontrada:</p>
                <a
                  href={originalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium break-all"
                >
                  <span className="truncate">{originalUrl}</span>
                  <ExternalLink className="w-4 h-4 shrink-0" />
                </a>
              </div>
            )}
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-700 mb-1">Link tentado:</p>
              <code className="font-mono text-sm bg-gray-200 px-2 py-1 rounded">
                /{slug}
              </code>
            </div>
          </div>
          <div className="space-y-3">
            <button
              onClick={() => window.location.reload()}
              className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
            >
              Tentar novamente
            </button>
            <a
              href="/"
              className="block w-full px-6 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-colors text-center"
            >
              Voltar para Home
            </a>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
