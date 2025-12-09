'use client';

import { useState, useEffect } from 'react';
import { Logo } from './Header/Logo';
import { DesktopNav } from './Header/DesktopNav';
import { AuthButtons } from './Header/AuthButtons';
import { MobileMenu } from './Header/MobileMenu';
import { MobileMenuButton } from './Header/MobileMenuButton';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Block scrolling when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur-sm">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between w-full relative">
            {/* Logo - left */}
            <div className="shrink-0">
              <Logo />
            </div>
            {/* Nav - center (only desktop) */}
            <DesktopNav />
            {/* Buttons - right */}
            <div className="flex items-center gap-3">
              <AuthButtons />
              <MobileMenuButton
                isOpen={isMobileMenuOpen}
                onClick={handleMobileMenuToggle}
              />
            </div>
          </div>
        </div>
      </header>
      <MobileMenu isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />
    </>
  );
}
