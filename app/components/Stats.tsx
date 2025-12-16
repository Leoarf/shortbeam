import { StatsGrid } from './Stats/StatsGrid';
import { DatabaseArchitecture } from './Stats/DatabaseArchitecture';
import { StatsCTA } from './Stats/StatsCTA';

export function Stats() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 mt-16 sm:mt-24">
      <div className="text-center mb-12">
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Features Based on{' '}
          <span className="text-green-600">Real Infrastructure</span>
        </h3>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Each feature is supported by robust data models from Prisma
        </p>
      </div>
      <StatsGrid />
      <DatabaseArchitecture />
      <StatsCTA />
    </div>
  );
}
