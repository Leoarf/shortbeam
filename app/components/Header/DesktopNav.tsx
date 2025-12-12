'use client';

export function DesktopNav() {
  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <nav className="hidden md:flex items-center gap-6 absolute left-1/2 transform -translate-x-1/2">
        <a
          href="#home"
          onClick={(e) => scrollToSection(e, 'home')}
          className="text-gray-700 hover:text-green-600 transition-colors duration-200 text-sm font-medium hover:underline underline-offset-4 decoration-2 cursor-pointer"
        >
          Início
        </a>
        <a
          href="#resources"
          onClick={(e) => scrollToSection(e, 'resources')}
          className="text-gray-700 hover:text-green-600 transition-colors duration-200 text-sm font-medium hover:underline underline-offset-4 decoration-2 cursor-pointer"
        >
          Recursos
        </a>
        <a
          href="#about"
          onClick={(e) => scrollToSection(e, 'about')}
          className="text-gray-700 hover:text-green-600 transition-colors duration-200 text-sm font-medium hover:underline underline-offset-4 decoration-2 cursor-pointer"
        >
          Sobre
        </a>
      </nav>
    </>
  );
}
