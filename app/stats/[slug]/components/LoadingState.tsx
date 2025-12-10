export function LoadingState() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-3 sm:mb-4"></div>
        <p className="text-gray-600 text-sm sm:text-base">
          Carregando estatísticas...
        </p>
      </div>
    </div>
  );
}
