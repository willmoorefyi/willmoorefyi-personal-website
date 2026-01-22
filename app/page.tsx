import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <main className="min-h-screen">
        <Hero />
        <About />
        <Experience />
      </main>
      <Footer />
    </>
  );
}
