'use client';

import { useState } from 'react';
import { Link, Globe, Sparkles } from 'lucide-react';
import { AdvancedOptions } from './UrlShortener/AdvancedOptions';
import { ResultDisplay } from './UrlShortener/ResultDisplay';

export function UrlShortener() {
  const [url, setUrl] = useState('');
  const [customSlug, setCustomSlug] = useState('');
  const [expiration, setExpiration] = useState('');
  const [password, setPassword] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setIsLoading(true);

    // Request simulation
    setTimeout(() => {
      const slug =
        customSlug.trim() || Math.random().toString(36).substring(2, 8);
      const shortUrl = `https://shortb.m/${slug}`;
      setShortenedUrl(shortUrl);
      setIsLoading(false);
    }, 1000);
  };

  const handleCopy = () => {
    if (shortenedUrl) {
      navigator.clipboard.writeText(shortenedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium">
          <Sparkles className="w-4 h-4" />
          <span>Rápido • Seguro • Gratuito</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Encurte seu link em <span className="text-green-600">segundos</span>
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Cole sua URL abaixo e obtenha um link curto, rastreável e
          personalizável
        </p>
      </div>
      <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* URL Input */}
          <div className="relative">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <Globe className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://exemplo.com/url-muito-longa-para-compartilhar"
              className="w-full pl-12 pr-4 py-4 text-base rounded-xl border-2 border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200"
              required
            />
          </div>
          <AdvancedOptions
            customSlug={customSlug}
            setCustomSlug={setCustomSlug}
            expiration={expiration}
            setExpiration={setExpiration}
            password={password}
            setPassword={setPassword}
          />
          <button
            type="submit"
            disabled={isLoading || !url.trim()}
            className="w-full py-4 px-6 bg-linear-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold text-lg rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Encurtando...</span>
              </>
            ) : (
              <>
                <Link className="w-5 h-5" />
                <span>Encurtar URL</span>
              </>
            )}
          </button>
        </form>
        {shortenedUrl && (
          <ResultDisplay
            shortenedUrl={shortenedUrl}
            expiration={expiration}
            onCopy={handleCopy}
            copied={copied}
          />
        )}
      </div>
      <AdditionalInfo />
    </div>
  );
}

function AdditionalInfo() {
  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
      <div className="bg-gray-50 p-4 rounded-xl">
        <div className="text-2xl font-bold text-green-600 mb-1">100%</div>
        <p className="text-sm text-gray-600">Seguro e criptografado</p>
      </div>
      <div className="bg-gray-50 p-4 rounded-xl">
        <div className="text-2xl font-bold text-green-600 mb-1">&lt; 1s</div>
        <p className="text-sm text-gray-600">Processamento rápido</p>
      </div>
      <div className="bg-gray-50 p-4 rounded-xl">
        <div className="text-2xl font-bold text-green-600 mb-1">Grátis</div>
        <p className="text-sm text-gray-600">Para sempre</p>
      </div>
    </div>
  );
}
