import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Lenis from 'lenis';
import LoadingAnimation from './LoadingAnimation';
import ScrollProgress from './components/ScrollProgress';
import Navbar        from './components/Navbar';
import Hero          from './components/Hero';
import Services      from './components/Services';
import Skills        from './components/Skills';
import About         from './components/About';
import Counters      from './components/Counters';
import Projects      from './components/Projects';
import Experience    from './components/Experience';
import Testimonials  from './components/Testimonials';
import Contact       from './components/Contact';
import Footer        from './components/Footer';
import ScrollToTop   from './components/ScrollToTop';

export default function PortfolioPage() {
  const [loaded, setLoaded] = useState(false);
  const lenisRef = useRef(null);

  useEffect(() => {
    if (!loaded) return;
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;
    const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, [loaded]);

  return (
    <>
      <AnimatePresence mode="wait">
        {!loaded && (
          <LoadingAnimation key="loader" onDone={() => setLoaded(true)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {loaded && (
          <motion.div
            key="portfolio"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ background: 'var(--main-bg)', color: 'var(--paragraph)', minHeight: '100vh' }}
          >
            <ScrollProgress />
            <Navbar />
            <main>
              {/* Section order mirrors the reference homepage: banner, services,
                  capability strip, about, counters, case studies, then contact. */}
              <Hero />
              <Services />
              <Skills />
              <About />
              <Counters />
              <Projects />
              <Experience />
              <Testimonials />
              <Contact />
            </main>
            <Footer />
            <ScrollToTop />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
