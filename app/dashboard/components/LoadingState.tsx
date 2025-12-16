export function LoadingState() {
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      <main className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
        <div className="text-center py-8 sm:py-12">
          <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-3 sm:mb-4"></div>
          <p className="text-gray-600 text-sm sm:text-base">
            Loading dashboard...
          </p>
        </div>
      </main>
    </div>
  );
}
