export function DesktopNav() {
  return (
    <>
      {/* Navigation Links */}
      <nav className="hidden md:flex items-center gap-6 absolute left-1/2 transform -translate-x-1/2">
        <a
          href="#home"
          className="text-gray-700 hover:text-green-600 transition-colors duration-200 text-sm font-medium hover:underline underline-offset-4 decoration-2"
        >
          Início
        </a>
        <a
          href="#resources"
          className="text-gray-700 hover:text-green-600 transition-colors duration-200 text-sm font-medium hover:underline underline-offset-4 decoration-2"
        >
          Recursos
        </a>
        <a
          href="#about"
          className="text-gray-700 hover:text-green-600 transition-colors duration-200 text-sm font-medium hover:underline underline-offset-4 decoration-2"
        >
          Sobre
        </a>
      </nav>
    </>
  );
}
