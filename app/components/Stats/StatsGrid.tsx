import {
  Link as LinkIcon,
  User,
  BarChart3,
  Shield,
  Clock,
  Globe,
  Hash,
  Eye,
  Target,
  Zap,
  Database,
  CheckCircle,
} from 'lucide-react';

const features = [
  {
    icon: LinkIcon,
    title: 'Encurtamento Rápido',
    description: 'Transforme URLs longas em links curtos e memoráveis',
    color: 'from-green-500 to-emerald-600',
    prismaFeature: 'ShortUrl model',
  },
  {
    icon: Hash,
    title: 'Slugs Personalizados',
    description: 'Crie slugs únicos como shortb.m/seulink',
    color: 'from-blue-500 to-cyan-600',
    prismaFeature: 'slug @unique field',
  },
  {
    icon: BarChart3,
    title: 'Estatísticas Detalhadas',
    description: 'Acompanhe cliques em tempo real com analytics',
    color: 'from-purple-500 to-violet-600',
    prismaFeature: 'Analytics model',
  },
  {
    icon: User,
    title: 'Contas de Usuário',
    description: 'Salve e gerencie seus links com uma conta',
    color: 'from-pink-500 to-rose-600',
    prismaFeature: 'User model with relations',
  },
  {
    icon: Shield,
    title: 'Links Seguros',
    description: 'Todos os links são protegidos e verificados',
    color: 'from-amber-500 to-orange-600',
    prismaFeature: 'Database encryption',
  },
  {
    icon: Clock,
    title: 'Histórico Completo',
    description: 'Acesso ao histórico completo de seus links',
    color: 'from-indigo-500 to-blue-600',
    prismaFeature: 'createdAt & updatedAt timestamps',
  },
  {
    icon: Globe,
    title: 'Geolocalização',
    description: 'Veja de onde vêm os cliques nos seus links',
    color: 'from-teal-500 to-emerald-600',
    prismaFeature: 'Analytics.country & city fields',
  },
  {
    icon: Eye,
    title: 'Referenciadores',
    description: 'Saiba quais sites estão enviando tráfego',
    color: 'from-violet-500 to-purple-600',
    prismaFeature: 'Analytics.referrer field',
  },
  {
    icon: Target,
    title: 'Dispositivos',
    description: 'Identifique o dispositivo dos visitantes',
    color: 'from-cyan-500 to-blue-600',
    prismaFeature: 'Analytics.userAgent field',
  },
  {
    icon: Zap,
    title: 'Performance Máxima',
    description: 'Processamento de links em menos de 1 segundo',
    color: 'from-green-400 to-green-600',
    prismaFeature: 'Database indexes for fast queries',
  },
  {
    icon: Database,
    title: 'PostgreSQL',
    description: 'Banco de dados robusto e confiável',
    color: 'from-blue-600 to-indigo-700',
    prismaFeature: 'PostgreSQL with Prisma ORM',
  },
  {
    icon: CheckCircle,
    title: 'Relacionamentos',
    description: 'Usuários vinculados aos seus links',
    color: 'from-emerald-500 to-green-600',
    prismaFeature: 'User ↔ ShortUrl relations',
  },
];

export function StatsGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {features.map((feature, index) => (
        <div
          key={index}
          className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-200"
        >
          <div className="flex items-start gap-4 mb-4">
            <div
              className={`p-3 rounded-xl bg-linear-to-br ${feature.color} shadow-md`}
            >
              <feature.icon className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                {feature.title}
              </h4>
              <p className="text-sm text-gray-600 mt-1">
                {feature.description}
              </p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full">
              <span className="text-xs font-mono text-gray-700">
                {feature.prismaFeature}
              </span>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
            <span className="inline-flex items-center gap-1">
              <Database className="w-3 h-3" />
              {index < 3 ? 'Modelo Principal' : 'Campo Específico'}
            </span>
            <span className="font-medium">#{index + 1}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
