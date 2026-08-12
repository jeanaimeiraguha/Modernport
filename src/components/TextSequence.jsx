import { motion, AnimatePresence } from 'framer-motion';

const SEQUENCES_DARK = [
  { id: 0, text: 'Technology never stops evolving.',                          size: 'clamp(1.1rem, 3.5vw, 2rem)',   color: '#8892aa' },
  { id: 1, text: 'The world changes every second.',                           size: 'clamp(1.1rem, 3.5vw, 2rem)',   color: '#8892aa' },
  { id: 2, text: 'Artificial Intelligence is reshaping\nthe future.',         size: 'clamp(1.2rem, 4vw, 2.4rem)',   color: '#a78bfa' },
  { id: 3, text: 'Developers must evolve\nwith innovation.',                  size: 'clamp(1.2rem, 4vw, 2.4rem)',   color: '#eef0f8' },
  { id: 4, text: 'Building intelligent\ndigital experiences.',                size: 'clamp(1.3rem, 4.5vw, 2.8rem)', color: '#eef0f8' },
  { id: 5, text: 'IRAGUHA Jean Aime',                                         size: 'clamp(2rem, 7vw, 4.5rem)',     color: '#eef0f8', bold: true },
  { id: 6, text: 'Software Engineer  ·  Creative Developer  ·  Problem Solver', size: 'clamp(0.75rem, 2vw, 1rem)', color: '#6366f1', spacing: true },
];

const SEQUENCES_LIGHT = [
  { id: 0, text: 'Technology never stops evolving.',                          size: 'clamp(1.1rem, 3.5vw, 2rem)',   color: '#6b7280' },
  { id: 1, text: 'The world changes every second.',                           size: 'clamp(1.1rem, 3.5vw, 2rem)',   color: '#6b7280' },
  { id: 2, text: 'Artificial Intelligence is reshaping\nthe future.',         size: 'clamp(1.2rem, 4vw, 2.4rem)',   color: '#4f46e5' },
  { id: 3, text: 'Developers must evolve\nwith innovation.',                  size: 'clamp(1.2rem, 4vw, 2.4rem)',   color: '#0d0d1a' },
  { id: 4, text: 'Building intelligent\ndigital experiences.',                size: 'clamp(1.3rem, 4.5vw, 2.8rem)', color: '#0d0d1a' },
  { id: 5, text: 'IRAGUHA Jean Aime',                                         size: 'clamp(2rem, 7vw, 4.5rem)',     color: '#0d0d1a', bold: true },
  { id: 6, text: 'Software Engineer  ·  Creative Developer  ·  Problem Solver', size: 'clamp(0.75rem, 2vw, 1rem)', color: '#4f46e5', spacing: true },
];

const wordVariants = {
  hidden: { opacity: 0, y: 18, filter: 'blur(6px)' },
  show: (i) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.055 },
  }),
  exit: { opacity: 0, y: -10, filter: 'blur(5px)', transition: { duration: 0.3, ease: 'easeIn' } },
};

export default function TextSequence({ phase, light = false }) {
  const SEQUENCES = light ? SEQUENCES_LIGHT : SEQUENCES_DARK;
  const seqIndex  = phase - 1;
  const seq       = SEQUENCES[seqIndex];

  const accentLine = light ? '#4f46e5' : '#6366f1';

  return (
    <div className="absolute inset-0 flex items-center justify-center px-8 sm:px-16 pointer-events-none">
      <AnimatePresence mode="wait">
        {seq && (
          <motion.div
            key={seq.id}
            className="text-center max-w-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.28 } }}
          >
            {seq.text.split('\n').map((line, li) => (
              <div key={li} className="overflow-hidden">
                <motion.div
                  className="flex flex-wrap justify-center gap-x-[0.3em]"
                  style={{ marginBottom: li < seq.text.split('\n').length - 1 ? '0.1em' : 0 }}
                >
                  {line.split(' ').map((word, wi) => (
                    <motion.span
                      key={`${li}-${wi}`}
                      custom={li * 6 + wi}
                      variants={wordVariants}
                      initial="hidden"
                      animate="show"
                      exit="exit"
                      style={{
                        fontFamily:    seq.bold ? 'Space Grotesk, sans-serif' : 'Inter, sans-serif',
                        fontWeight:    seq.bold ? 700 : 400,
                        fontSize:      seq.size,
                        color:         seq.color,
                        letterSpacing: seq.bold ? '-0.04em' : seq.spacing ? '0.22em' : '-0.01em',
                        lineHeight:    1.15,
                        display:       'inline-block',
                        textTransform: seq.spacing ? 'uppercase' : 'none',
                      }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            ))}

            {/* Accent line under name */}
            {seq.id === 5 && (
              <motion.div
                className="mx-auto mt-4"
                style={{ height: '1px', background: `linear-gradient(90deg, transparent, ${accentLine}, transparent)` }}
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: '60%', opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
