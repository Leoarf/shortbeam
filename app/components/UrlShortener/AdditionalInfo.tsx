export function AdditionalInfo() {
  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
      <div className="bg-gray-50 p-4 rounded-xl">
        <div className="text-2xl font-bold text-green-600 mb-1">100%</div>
        <p className="text-sm text-gray-600">Seguro e criptografado</p>
      </div>
      <div className="bg-gray-50 p-4 rounded-xl">
        <div className="text-2xl font-bold text-green-600 mb-1">&lt; 1s</div>
        <p className="text-sm text-gray-600">Processamento rápido</p>
      </div>
      <div className="bg-gray-50 p-4 rounded-xl">
        <div className="text-2xl font-bold text-green-600 mb-1">Grátis</div>
        <p className="text-sm text-gray-600">Para sempre</p>
      </div>
    </div>
  );
}
