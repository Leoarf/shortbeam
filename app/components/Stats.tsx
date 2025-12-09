import { StatsGrid } from './Stats/StatsGrid';
import { DatabaseArchitecture } from './Stats/DatabaseArchitecture';
import { StatsCTA } from './Stats/StatsCTA';

export function Stats() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 mt-16 sm:mt-24">
      <div className="text-center mb-12">
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Recursos Baseados na{' '}
          <span className="text-green-600">Infraestrutura Real</span>
        </h3>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Cada funcionalidade é suportada por modelos de dados robustos do
          Prisma
        </p>
      </div>
      <StatsGrid />
      <DatabaseArchitecture />
      <StatsCTA />
    </div>
  );
}
