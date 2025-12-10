import { DashboardHeader } from '../auth/DashboardHeader';
import { DashboardStats } from './components/DashboardStats';
import { LinksTable } from './components/LinksTable';
import { AnalyticsChart } from './components/AnalyticsChart';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      <DashboardHeader />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Olá, Usuário! 👋
          </h1>
          <p className="text-gray-600 mt-2">
            Gerencie seus links e acompanhe as estatísticas
          </p>
        </div>
        {/* Stats Grid */}
        <DashboardStats />
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Left Column - Links Table */}
          <div className="lg:col-span-2">
            <LinksTable />
          </div>
          {/* Right Column - Analytics & Quick Actions */}
          <div className="space-y-8">
            <AnalyticsChart />
            <QuickActions />
          </div>
        </div>
      </main>
    </div>
  );
}

function QuickActions() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Ações Rápidas</h3>
      <div className="space-y-3">
        <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-linear-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-lg transition-all duration-200">
          <span>➕ Criar Novo Link</span>
        </button>
        <button className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-green-600 text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200 font-medium">
          <span>📊 Ver Relatório Completo</span>
        </button>
        <button className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200 font-medium">
          <span>⚙️ Configurações</span>
        </button>
      </div>
    </div>
  );
}
