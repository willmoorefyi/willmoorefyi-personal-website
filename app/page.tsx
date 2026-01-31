import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import WorkSamples from '@/components/WorkSamples';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <main className="min-h-screen">
        <Hero />
        <About />
        <Experience />
        <WorkSamples />
      </main>
      <Footer />
    </>
  );
}
