import { Header } from './components/Header';
import { UrlShortener } from './components/UrlShortener';
import { Stats } from './components/Stats';
import { Technologies } from './components/Technologies';
import { Footer } from './components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      <Header />
      <main className="pb-16">
        <section className="pt-8 sm:pt-12 md:pt-16">
          <UrlShortener />
        </section>
        <section className="mt-8 sm:mt-12">
          <Stats />
        </section>
        <section className="mt-16 sm:mt-24">
          <Technologies />
        </section>
      </main>
      <Footer />
    </div>
  );
}
