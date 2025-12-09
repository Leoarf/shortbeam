import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ShortBeam - Encurtador de URL',
  description: 'Encurte seus links de forma rápida e simples',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body className="min-h-screen bg-white text-gray-900">{children}</body>
    </html>
  );
}
