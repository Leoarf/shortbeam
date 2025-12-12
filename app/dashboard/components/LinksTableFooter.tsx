interface LinksTableFooterProps {
  linksCount: number;
}

export function LinksTableFooter({ linksCount }: LinksTableFooterProps) {
  return (
    <div className="px-4 sm:px-6 py-4 border-t border-gray-200">
      <div className="text-sm text-gray-600 text-center sm:text-left">
        Mostrando {linksCount} link{linksCount !== 1 ? 's' : ''}
      </div>
    </div>
  );
}
