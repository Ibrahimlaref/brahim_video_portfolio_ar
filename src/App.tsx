import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import Navigation from './components/Navigation';
import CustomCursor from './components/CustomCursor';
import StarfieldBackground from './components/StarfieldBackground';
import Hero from './sections/Hero';
import WorkShowcase from './sections/WorkShowcase';
import About from './sections/About';
import Skills from './sections/Skills';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Add GSAP ticker callback for Lenis
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    };
  }, []);

  const handleNavClick = useCallback((target: string) => {
    const lenis = lenisRef.current;
    if (lenis) {
      const element = document.querySelector(target);
      if (element) {
        lenis.scrollTo(element as HTMLElement, { offset: 0 });
      }
    }
  }, []);

  return (
    <div className="relative min-h-screen" style={{ background: '#0C0C0C' }}>
      <StarfieldBackground />
      <CustomCursor />
      <Navigation onNavClick={handleNavClick} />
      <main>
        <Hero onNavClick={handleNavClick} />
        <WorkShowcase />
        <About />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
