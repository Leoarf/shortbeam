'use client';

import { useState } from 'react';
import { LinksTableEmpty } from './LinksTableEmpty';
import { LinksTableHeader } from './LinksTableHeader';
import { LinksTableDesktop } from './LinksTableDesktop';
import { LinksTableMobile } from './LinksTableMobile';
import { LinksTableFooter } from './LinksTableFooter';

interface ShortUrl {
  id: string;
  url: string;
  slug: string;
  clicks: number;
  createdAt: string;
  updatedAt: string;
}

interface LinksTableProps {
  links: ShortUrl[];
}

export function LinksTable({ links }: LinksTableProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (slug: string, id: string) => {
    const shortUrl = `${window.location.origin}/${slug}`;
    await navigator.clipboard.writeText(shortUrl);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (links.length === 0) {
    return <LinksTableEmpty />;
  }

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg border border-gray-200 overflow-hidden">
      <LinksTableHeader linksCount={links.length} />
      {/* Desktop view */}
      <div className="hidden md:block">
        <LinksTableDesktop
          links={links}
          copiedId={copiedId}
          onCopy={handleCopy}
        />
      </div>
      {/* Mobile view */}
      <div className="md:hidden">
        <div className="divide-y divide-gray-200">
          {links.map((link) => (
            <LinksTableMobile
              key={link.id}
              link={link}
              copiedId={copiedId}
              onCopy={handleCopy}
            />
          ))}
        </div>
      </div>
      <LinksTableFooter linksCount={links.length} />
    </div>
  );
}
