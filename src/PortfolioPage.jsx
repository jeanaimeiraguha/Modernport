import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Lenis from 'lenis';
import SplashScreen  from './components/SplashScreen';
import CustomCursor  from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import Navbar        from './components/Navbar';
import Hero          from './components/Hero';
import About         from './components/About';
import Skills        from './components/Skills';
import Projects      from './components/Projects';
import Experience    from './components/Experience';
import Testimonials  from './components/Testimonials';
import Contact       from './components/Contact';
import Footer        from './components/Footer';
import ScrollToTop   from './components/ScrollToTop';
import ChatBot       from './components/ChatBot';

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
      <CustomCursor />

      <AnimatePresence mode="wait">
        {!loaded && (
          <SplashScreen key="splash" onDone={() => setLoaded(true)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {loaded && (
          <motion.div
            key="portfolio"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ background: 'var(--bg-base)', color: 'var(--text-primary)', minHeight: '100vh' }}
          >
            <ScrollProgress />
            <Navbar />
            <main>
              <Hero />
              <About />
              <Skills />
              <Projects />
              <Experience />
              <Testimonials />
              <Contact />
            </main>
            <Footer />
            <ScrollToTop />
            <ChatBot />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
