'use client';

import { useEffect, useState } from 'react';
import { UserStatusBanner } from './UrlShortener/UserStatusBanner';
import { UrlInputSection } from './UrlShortener/UrlInputSection';

export function UrlShortener() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error loading user:', error);
      }
    }
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto px-3 sm:px-4 md:px-6">
      <UserStatusBanner user={user} />
      <UrlInputSection user={user} />
    </div>
  );
}
