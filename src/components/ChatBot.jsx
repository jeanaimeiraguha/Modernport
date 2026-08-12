import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaPaperPlane, FaCommentDots } from 'react-icons/fa';

/* ── Knowledge base ── */
const KB = [
  {
    keys: ['hi', 'hello', 'hey', 'hola', 'sup', 'yo', 'good morning', 'good afternoon'],
    answer: "Hey! Good to hear from you 👋\n\nFeel free to ask me anything — about my work, tech stack, projects, or if you want to work together.",
  },
  {
    keys: ['who', 'about', 'yourself', 'tell me', 'introduce', 'jean aime', 'iraguha'],
    answer: "I'm Jean Aime IRAGUHA — a Full-Stack Engineer and Co-Founder based in Kigali, Rwanda.\n\nI've been building software for 4+ years, currently serving as CTO at Igifu Meals. I work across the full stack — web, mobile, AI, and blockchain.",
  },
  {
    keys: ['skill', 'tech', 'stack', 'language', 'framework', 'tool', 'know', 'use', 'build', 'speciali'],
    answer: "Here's what I work with day-to-day:\n\nFrontend — React, Next.js, TypeScript, Tailwind\nBackend — Node.js, Python, GraphQL, REST APIs\nAI/ML — TensorFlow, PyTorch, OpenCV, LangChain\nBlockchain — Solidity, Ethereum, Web3.js, Hardhat\nDevOps — Docker, AWS, GitHub Actions, Nginx\nMobile — React Native, Expo",
  },
  {
    keys: ['project', 'portfolio', 'built', 'made', 'shipped', 'show', 'work', 'app', 'platform', 'product'],
    answer: "Some things I've shipped:\n\n🍽 Igifu Meals — food-tech platform, 30+ restaurants live\n📚 E-Learning LMS — 5,000+ students across Rwanda\n🏙 Smart City Dashboard — 200+ IoT sensors, Kigali\n💳 Fintech Mobile App — $2M+ in transactions\n🔒 CV Security System — YOLOv8 on Raspberry Pi\n⛓ Blockchain Voting — tamper-proof on Ethereum\n\nScroll down to the Projects section to see them all.",
  },
  {
    keys: ['experience', 'career', 'history', 'company', 'worked', 'background', 'past', 'previous'],
    answer: "My career so far:\n\n→ CTO @ Igifu Meals (2023–now)\n→ Full-Stack Dev @ Tech Solutions Rwanda (2022–2023)\n→ Frontend Dev @ Innovation Hub Kigali (2021–2022)\n→ Software Intern @ Digital Transformation Center (2020–2021)\n\nCheck the Experience section for the full breakdown.",
  },
  {
    keys: ['education', 'degree', 'university', 'study', 'school', 'gpa', 'graduate', 'qualification', 'certified'],
    answer: "I studied Computer Science at the University of Rwanda (2018–2022), graduating with First Class Honors and a 3.8 GPA — top 5% of my cohort.\n\nAlso did 300+ hours of Full-Stack certification on freeCodeCamp.",
  },
  {
    keys: ['hire', 'available', 'recruit', 'freelance', 'contract', 'remote', 'opportunity', 'position', 'role', 'job', 'open to', 'looking for'],
    answer: "Yes, I'm currently open to new opportunities!\n\nI'm looking for:\n• Senior Full-Stack Engineer roles\n• Lead Engineer or CTO-track positions\n• Remote-first teams\n• Consulting or fractional CTO work\n\nBest way to reach me is jeanaimeiraguha@gmail.com or through the Contact section below.",
  },
  {
    keys: ['contact', 'email', 'reach', 'phone', 'whatsapp', 'connect', 'linkedin', 'social', 'message me', 'get in touch'],
    answer: "Here's how to reach me:\n\n📧 jeanaimeiraguha@gmail.com\n📱 +250 793 411 594\n💬 WhatsApp: wa.me/250793411594\n🔗 LinkedIn: linkedin.com/in/iraguha-jean-aime-53ba74405\n📍 Bugesera, Kigali, Rwanda\n\nOr just scroll to the Contact section and drop me a message directly.",
  },
  {
    keys: ['igifu', 'meals', 'startup', 'food', 'restaurant'],
    answer: "Igifu Meals is my startup — a smart food-ordering and meal-planning platform connecting Rwandan restaurants with customers.\n\nI built the entire tech stack from scratch: real-time order tracking, kitchen dashboard, loyalty engine, Stripe payments, and the mobile app. We're live with 30+ restaurant partners.",
  },
  {
    keys: ['ai', 'machine learning', 'ml', 'tensorflow', 'pytorch', 'model', 'computer vision'],
    answer: "AI is one of my strongest areas. I build things that actually work in production:\n\n• NLP pipelines and chatbots\n• Computer vision with YOLO and OpenCV\n• Predictive analytics and recommendation engines\n• Health monitoring systems with TensorFlow\n\nI use TensorFlow, PyTorch, Scikit-learn, LangChain, and Hugging Face.",
  },
  {
    keys: ['blockchain', 'web3', 'solidity', 'ethereum', 'smart contract', 'nft', 'defi', 'crypto'],
    answer: "I've been building on-chain since 2021:\n\n• Smart contracts in Solidity on Ethereum\n• Decentralised voting platform (results immutable on-chain)\n• DeFi protocol integrations\n• Web3.js and Hardhat for testing and deployment\n• IPFS for decentralised storage",
  },
  {
    keys: ['cv', 'resume', 'download'],
    answer: "You can view and download my full CV (PDF) via the CV button in the navbar at the top, or the Resume link in the hero section.\n\nIt covers my full work history, education, skills, and certifications.",
  },
  {
    keys: ['location', 'country', 'rwanda', 'kigali', 'africa', 'where', 'based', 'timezone'],
    answer: "I'm based in Bugesera, Kigali, Rwanda 🇷🇼 — that's UTC+2.\n\nI work remote-first and have collaborated with clients across East Africa, Europe, and beyond. Time zones have never been an issue.",
  },
  {
    keys: ['testimonial', 'review', 'feedback', 'client', 'say', 'recommend'],
    answer: "I keep the results doing the talking rather than quotes:\n\n• $2M+ in fintech transactions processed — zero critical bugs\n• 5,000+ daily students on the e-learning platform I built\n• 30+ restaurant partners onboarded at Igifu Meals\n• Mentored 4 engineers, cutting onboarding time by 50%\n\nCheck the About section for the full breakdown, or connect on LinkedIn to see recommendations directly.",
  },
  {
    keys: ['rate', 'price', 'cost', 'charge', 'salary', 'pay'],
    answer: "Rates depend on the scope and type of engagement — full-time, contract, or consulting.\n\nBest to discuss directly. Reach me at jeanaimeiraguha@gmail.com and I'll get back to you within 24 hours.",
  },
];

const QUICK_REPLIES = [
  'Tell me about yourself',
  'What can you build?',
  'Are you available to hire?',
  'How do I contact you?',
];

function getBotReply(input) {
  const lower = input.toLowerCase().trim();

  // Score each KB entry by how many of its keys match as whole words
  const wordBoundary = (text, keyword) => {
    const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`(^|\\s|[^a-z])${escaped}($|\\s|[^a-z])`).test(text);
  };

  let bestEntry = null;
  let bestScore = 0;

  for (const entry of KB) {
    const score = entry.keys.reduce((acc, k) => {
      if (k.includes(' ')) return lower.includes(k) ? acc + 2 : acc; // phrase match = higher weight
      return wordBoundary(lower, k) ? acc + 1 : acc;
    }, 0);
    // Greetings only win if nothing else scored
    const isGreeting = entry.keys.includes('hi');
    const adjustedScore = isGreeting ? score * 0.5 : score;
    if (adjustedScore > bestScore) { bestScore = adjustedScore; bestEntry = entry; }
  }

  if (bestEntry && bestScore > 0) return bestEntry.answer;
  return "Not sure I caught that one — could you rephrase?\n\nYou can ask about my skills, projects, experience, availability, or how to get in touch.";
}

function getTime() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function MsgText({ text }) {
  return (
    <span>
      {text.split('\n').map((line, i, arr) => (
        <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
      ))}
    </span>
  );
}

export default function ChatBot() {
  const [open, setOpen]     = useState(false);
  const [msgs, setMsgs]     = useState([
    { from: 'bot', text: "Hey! I'm Jean Aime. Ask me anything about my work, skills, or how we can work together.", time: getTime(), read: true },
  ]);
  const [input, setInput]   = useState('');
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(1);
  const [showQuick, setShowQuick] = useState(true);
  const bottomRef           = useRef(null);
  const inputRef            = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs, typing]);

  useEffect(() => {
    if (open) {
      setUnread(0);
      setTimeout(() => inputRef.current?.focus(), 350);
    }
  }, [open]);

  const send = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setShowQuick(false);
    setMsgs((m) => [...m, { from: 'user', text: trimmed, time: getTime() }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [...m, { from: 'bot', text: getBotReply(trimmed), time: getTime(), read: true }]);
    }, 800 + Math.random() * 600);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input); }
  };

  return (
    <>
      {/* ── FAB ── */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-[200] w-14 h-14 rounded-full overflow-hidden shadow-xl flex items-center justify-center"
        style={{ background: '#6366f1' }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        aria-label="Chat with Jean Aime"
      >
        <AnimatePresence mode="wait">
          {open
            ? <motion.span key="x" initial={{ opacity: 0, rotate: -45 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 45 }} transition={{ duration: 0.18 }}>
                <FaTimes size={18} color="#fff" />
              </motion.span>
            : <motion.span key="chat" initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.7 }} transition={{ duration: 0.18 }}>
                <FaCommentDots size={20} color="#fff" />
              </motion.span>
          }
        </AnimatePresence>

        <AnimatePresence>
          {!open && unread > 0 && (
            <motion.span
              key="badge"
              initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 18 }}
              className="absolute top-0.5 right-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
              style={{ background: '#ef4444' }}
            >
              {unread}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* ── Chat window ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            className="fixed bottom-24 right-6 z-[199] flex flex-col rounded-2xl overflow-hidden"
            style={{
              width: 'min(360px, calc(100vw - 24px))',
              maxHeight: '72vh',
              background: '#0f0f18',
              boxShadow: '0 20px 60px rgba(0,0,0,0.55), 0 1px 0 rgba(255,255,255,0.04) inset',
              border: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            {/* ── Header ── */}
            <div
              className="flex items-center gap-3 px-4 py-3 shrink-0"
              style={{ background: '#13131f', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
            >
              {/* Avatar */}
              <div className="relative shrink-0">
                <img
                  src="/images/profile/aime picture.jpeg"
                  alt="Jean Aime"
                  className="w-10 h-10 rounded-full object-cover"
                  style={{ border: '2px solid rgba(99,102,241,0.4)' }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextSibling.style.display = 'flex';
                  }}
                />
                {/* Fallback initials */}
                <div
                  className="w-10 h-10 rounded-full items-center justify-center text-sm font-bold text-white"
                  style={{ background: '#6366f1', display: 'none' }}
                >
                  JA
                </div>
                {/* Online dot */}
                <span
                  className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full"
                  style={{ background: '#22c55e', border: '2px solid #13131f' }}
                />
              </div>

              {/* Name + status */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold leading-tight" style={{ color: '#f1f5f9' }}>
                  Jean Aime Iraguha
                </p>
                <p className="text-[11px] mt-0.5" style={{ color: '#22c55e' }}>
                  Online · usually replies fast
                </p>
              </div>

              {/* Close */}
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-colors shrink-0"
                style={{ color: '#475569' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                <FaTimes size={13} />
              </button>
            </div>

            {/* ── Messages ── */}
            <div
              className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-1"
              style={{ minHeight: 0, scrollbarWidth: 'thin', scrollbarColor: '#1e1e2e transparent' }}
            >
              {/* Date separator */}
              <div className="flex items-center gap-3 mb-3">
                <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
                <span className="text-[10px] px-2" style={{ color: '#334155' }}>Today</span>
                <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
              </div>

              {msgs.map((m, i) => {
                const isBot = m.from === 'bot';
                const prevSame = i > 0 && msgs[i - 1].from === m.from;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.22 }}
                    className={`flex items-end gap-2 ${isBot ? 'justify-start' : 'justify-end'}`}
                    style={{ marginTop: prevSame ? 2 : 10 }}
                  >
                    {/* Bot avatar — only on last consecutive bot msg */}
                    {isBot && (
                      <div className="shrink-0 w-6" style={{ alignSelf: 'flex-end' }}>
                        {(!msgs[i + 1] || msgs[i + 1].from !== 'bot') && (
                          <img
                            src="/images/profile/aime picture.jpeg"
                            alt=""
                            className="w-6 h-6 rounded-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              e.currentTarget.nextSibling.style.display = 'flex';
                            }}
                          />
                        )}
                        <div
                          className="w-6 h-6 rounded-full items-center justify-center text-[9px] font-bold text-white"
                          style={{ background: '#6366f1', display: 'none' }}
                        >
                          JA
                        </div>
                      </div>
                    )}

                    <div className={`flex flex-col gap-0.5 max-w-[78%] ${isBot ? 'items-start' : 'items-end'}`}>
                      <div
                        className="px-3.5 py-2.5 text-[13.5px] leading-[1.55]"
                        style={
                          isBot
                            ? {
                                background: '#1c1c2e',
                                color: '#cbd5e1',
                                borderRadius: '18px 18px 18px 4px',
                                border: '1px solid rgba(255,255,255,0.05)',
                              }
                            : {
                                background: '#6366f1',
                                color: '#fff',
                                borderRadius: '18px 18px 4px 18px',
                              }
                        }
                      >
                        <MsgText text={m.text} />
                      </div>

                      {/* Timestamp + read receipt */}
                      {(!msgs[i + 1] || msgs[i + 1].from !== m.from) && (
                        <div className="flex items-center gap-1 px-1" style={{ color: '#334155' }}>
                          <span className="text-[10px]">{m.time}</span>
                          {!isBot && (
                            <span className="text-[10px]" style={{ color: '#6366f1' }}>✓✓</span>
                          )}
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}

              {/* Typing indicator */}
              <AnimatePresence>
                {typing && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }}
                    className="flex items-end gap-2 mt-2"
                  >
                    <img
                      src="/images/profile/aime picture.jpeg"
                      alt=""
                      className="w-6 h-6 rounded-full object-cover shrink-0"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                    <div
                      className="flex items-center gap-1 px-4 py-3"
                      style={{ background: '#1c1c2e', borderRadius: '18px 18px 18px 4px', border: '1px solid rgba(255,255,255,0.05)' }}
                    >
                      {[0, 0.18, 0.36].map((d, i) => (
                        <motion.span
                          key={i}
                          className="block w-1.5 h-1.5 rounded-full"
                          style={{ background: '#475569' }}
                          animate={{ y: [0, -4, 0], background: ['#475569', '#818cf8', '#475569'] }}
                          transition={{ duration: 0.65, delay: d, repeat: Infinity }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={bottomRef} />
            </div>

            {/* ── Quick replies ── */}
            <AnimatePresence>
              {showQuick && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-4 pb-3 flex gap-2 flex-wrap shrink-0 overflow-hidden"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
                >
                  <p className="w-full text-[10px] pt-2.5 pb-1" style={{ color: '#334155' }}>Suggested</p>
                  {QUICK_REPLIES.map((q) => (
                    <button
                      key={q}
                      onClick={() => send(q)}
                      className="text-[11.5px] font-medium px-3 py-1.5 rounded-full transition-all"
                      style={{
                        background: 'transparent',
                        color: '#818cf8',
                        border: '1px solid rgba(99,102,241,0.3)',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(99,102,241,0.1)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                    >
                      {q}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Input ── */}
            <div
              className="flex items-center gap-2.5 px-4 py-3 shrink-0"
              style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: '#0f0f18' }}
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Message Jean Aime…"
                className="flex-1 text-[13.5px] outline-none bg-transparent"
                style={{ color: '#e2e8f0' }}
              />
              <motion.button
                onClick={() => send(input)}
                disabled={!input.trim() || typing}
                className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 disabled:opacity-30"
                style={{ background: input.trim() ? '#6366f1' : 'rgba(99,102,241,0.2)' }}
                whileHover={input.trim() ? { scale: 1.1 } : {}}
                whileTap={input.trim() ? { scale: 0.9 } : {}}
              >
                <FaPaperPlane size={12} color="#fff" style={{ marginLeft: 1 }} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
