export function Technologies() {
  const techs = [
    { name: 'Next.js 14', color: 'bg-black text-white' },
    { name: 'TypeScript', color: 'bg-blue-600 text-white' },
    { name: 'PostgreSQL', color: 'bg-blue-800 text-white' },
    { name: 'Prisma ORM', color: 'bg-emerald-700 text-white' },
    { name: 'Tailwind CSS', color: 'bg-cyan-500 text-white' },
    { name: 'React', color: 'bg-cyan-600 text-white' },
    { name: 'Vercel', color: 'bg-gray-900 text-white' },
    { name: 'Lucide Icons', color: 'bg-purple-600 text-white' },
  ];

  return (
    <div className="mt-16 sm:mt-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Tecnologias <span className="text-green-600">Utilizadas</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stack moderna e robusta para garantir a melhor experiência
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {techs.map((tech, index) => (
            <div
              key={index}
              className={`${tech.color} rounded-xl p-4 text-center font-semibold shadow-lg transition-transform hover:scale-105`}
            >
              {tech.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
