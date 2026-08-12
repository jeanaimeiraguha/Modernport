import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Lenis from 'lenis';
import LoadingAnimation from './LoadingAnimation';
import CustomCursor  from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import Navbar        from './components/Navbar';
import Hero          from './components/Hero';
import About         from './components/About';
import Skills        from './components/Skills';
import Projects      from './components/Projects';
import Experience    from './components/Experience';
import Contact       from './components/Contact';
import Footer        from './components/Footer';
import ScrollToTop   from './components/ScrollToTop';
import ChatBot       from './components/ChatBot';

export default function PortfolioPage() {
  const [loaded, setLoaded] = useState(false);
  const [blurred, setBlurred] = useState(true);
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

  useEffect(() => {
    if (!loaded) return;
    // Two rAFs so the initial blurred frame paints before the CSS transition kicks in.
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setBlurred(false)));
    return () => cancelAnimationFrame(id);
  }, [loaded]);

  return (
    <>
      <CustomCursor />

      <AnimatePresence mode="wait">
        {!loaded && (
          <LoadingAnimation key="loader" onDone={() => setLoaded(true)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {loaded && (
          <motion.div
            key="portfolio"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{ background: 'var(--bg-base)', color: 'var(--text-primary)', minHeight: '100vh' }}
          >
            {/*
              Blur is applied via plain CSS (not framer-motion's `animate`) so it can
              settle on the literal keyword 'none' once the intro finishes. Any other
              filter value creates a new CSS containing block, which silently breaks
              `position: fixed` for every descendant (navbar, chat bubble, modals...).
            */}
            <div style={{ filter: blurred ? 'blur(8px)' : 'none', transition: 'filter 0.9s cubic-bezier(0.16, 1, 0.3, 1)' }}>
              <ScrollProgress />
              <Navbar />
              <main>
                <Hero />
                <About />
                <Skills />
                <Projects />
                <Experience />
                <Contact />
              </main>
              <Footer />
              <ScrollToTop />
              <ChatBot />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
