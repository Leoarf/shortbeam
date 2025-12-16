import { LinksTableRow } from './LinksTableRow';

interface LinksTableDesktopProps {
  links: Array<{
    id: string;
    url: string;
    slug: string;
    clicks: number;
    createdAt: string;
  }>;
  copiedId: string | null;
  onCopy: (slug: string, id: string) => void;
}

export function LinksTableDesktop({
  links,
  copiedId,
  onCopy,
}: LinksTableDesktopProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Original Link
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Shortened Link
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Clicks
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Created at
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {links.map((link) => (
            <LinksTableRow
              key={link.id}
              link={link}
              copiedId={copiedId}
              onCopy={onCopy}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
