'use client';

import { Link as LinkIcon } from 'lucide-react';

export function StatsCTA() {
  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="mt-16 text-center">
      <div className="inline-block bg-linear-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-200 max-w-2xl mx-auto">
        <h4 className="text-2xl font-bold text-gray-900 mb-3">
          Ready to use a real platform?
        </h4>
        <p className="text-gray-600 mb-6">
          Get started now and try out all the implemented features
        </p>
        <a
          href="#home"
          onClick={(e) => scrollToSection(e, 'home')}
          className="inline-flex items-center gap-2 px-8 py-3 bg-linear-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl text-lg"
        >
          <LinkIcon className="w-5 h-5" />
          Create My First Link
        </a>
      </div>
    </div>
  );
}
