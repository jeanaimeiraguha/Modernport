import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LoadingAnimation from './LoadingAnimation';
import Navbar      from './components/Navbar';
import Hero        from './components/Hero';
import About       from './components/About';
import Skills      from './components/Skills';
import Projects    from './components/Projects';
import Experience  from './components/Experience';
import Testimonials from './components/Testimonials';
import Contact     from './components/Contact';
import Footer      from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

export default function PortfolioPage() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <AnimatePresence>
        {!loaded && <LoadingAnimation key="loader" onDone={() => setLoaded(true)} />}
      </AnimatePresence>

      <AnimatePresence>
        {loaded && (
          <motion.div
            key="portfolio"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{ background: 'var(--bg-base)', color: 'var(--text-primary)', minHeight: '100vh' }}
          >
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
