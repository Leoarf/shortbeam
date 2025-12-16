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
    title: 'Fast Shortening',
    description: 'Turn long URLs into short and memorable links',
    color: 'from-green-500 to-emerald-600',
    prismaFeature: 'ShortUrl model',
  },
  {
    icon: Hash,
    title: 'Custom Slugs',
    description: 'Create unique slugs like shortbeam.vercel.app/yourlink',
    color: 'from-blue-500 to-cyan-600',
    prismaFeature: 'slug @unique field',
  },
  {
    icon: BarChart3,
    title: 'Detailed Analytics',
    description: 'Track clicks in real time with analytics',
    color: 'from-purple-500 to-violet-600',
    prismaFeature: 'Analytics model',
  },
  {
    icon: User,
    title: 'User Accounts',
    description: 'Save and manage your links with an account',
    color: 'from-pink-500 to-rose-600',
    prismaFeature: 'User model with relations',
  },
  {
    icon: Shield,
    title: 'Secure Links',
    description: 'All links are protected and verified',
    color: 'from-amber-500 to-orange-600',
    prismaFeature: 'Database encryption',
  },
  {
    icon: Clock,
    title: 'Complete History',
    description: 'Access the full history of your links',
    color: 'from-indigo-500 to-blue-600',
    prismaFeature: 'createdAt & updatedAt timestamps',
  },
  {
    icon: Globe,
    title: 'Geolocation',
    description: 'See where your link clicks come from',
    color: 'from-teal-500 to-emerald-600',
    prismaFeature: 'Analytics.country & city fields',
  },
  {
    icon: Eye,
    title: 'Referrers',
    description: 'Know which websites are sending traffic',
    color: 'from-violet-500 to-purple-600',
    prismaFeature: 'Analytics.referrer field',
  },
  {
    icon: Target,
    title: 'Devices',
    description: 'Identify visitor devices',
    color: 'from-cyan-500 to-blue-600',
    prismaFeature: 'Analytics.userAgent field',
  },
  {
    icon: Zap,
    title: 'Maximum Performance',
    description: 'Link processing in under 1 second',
    color: 'from-green-400 to-green-600',
    prismaFeature: 'Database indexes for fast queries',
  },
  {
    icon: Database,
    title: 'PostgreSQL',
    description: 'Robust and reliable database',
    color: 'from-blue-600 to-indigo-700',
    prismaFeature: 'PostgreSQL with Prisma ORM',
  },
  {
    icon: CheckCircle,
    title: 'Relationships',
    description: 'Users linked to their URLs',
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
              {index < 3 ? 'Main Model' : 'Specific Field'}
            </span>
            <span className="font-medium">#{index + 1}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
