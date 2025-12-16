import { Database } from 'lucide-react';

export function DatabaseArchitecture() {
  return (
    <div className="mt-16 bg-linear-to-r from-gray-50 to-white rounded-2xl p-8 border-2 border-gray-200">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        <div className="md:w-1/3">
          <div className="bg-green-100 p-4 rounded-xl inline-block">
            <Database className="w-8 h-8 text-green-600" />
          </div>
          <h4 className="text-xl font-bold text-gray-900 mt-4">
            Database Architecture
          </h4>
        </div>
        <div className="md:w-2/3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="text-sm font-semibold text-green-600 mb-1">
                3 Models
              </div>
              <p className="text-xs text-gray-600">ShortUrl, User, Analytics</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="text-sm font-semibold text-green-600 mb-1">
                14 Fields
              </div>
              <p className="text-xs text-gray-600">Structured and typed data</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="text-sm font-semibold text-green-600 mb-1">
                8 Indexes
              </div>
              <p className="text-xs text-gray-600">
                Optimized and fast consultations
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-4">
            Our infrastructure is built with{' '}
            <span className="font-semibold text-green-600">
              Prisma + PostgreSQL
            </span>
            , guaranteeing performance, scalability, and security for all your
            links.
          </p>
        </div>
      </div>
    </div>
  );
}
