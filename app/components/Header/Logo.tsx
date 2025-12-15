import { Link2 } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="p-2 rounded-xl bg-green-100">
        <Link2 className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
      </div>
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
          ShortBeam
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 hidden xs:block">
          Smart URL shortener
        </p>
      </div>
    </div>
  );
}
