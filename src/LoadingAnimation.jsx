import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaRocket, FaBrain, FaCube, FaDatabase, FaServer, FaMagic, FaBolt, FaInfinity, FaStar } from 'react-icons/fa';

const LoadingAnimation = () => {
  const techIcons = [
    { Icon: FaCode, color: '#2563EB', name: 'Code' },
    { Icon: FaRocket, color: '#0891B2', name: 'Innovation' },
    { Icon: FaBrain, color: '#0D9488', name: 'AI' },
    { Icon: FaCube, color: '#059669', name: '3D' },
    { Icon: FaDatabase, color: '#F59E0B', name: 'Data' },
    { Icon: FaServer, color: '#DB2777', name: 'Cloud' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center relative overflow-hidden">
      {/* Dynamic Particle Background */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`shape-${i}`}
            className="absolute border border-cyan-400/30"
            style={{
              width: `${20 + Math.random() * 40}px`,
              height: `${20 + Math.random() * 40}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              borderRadius: Math.random() > 0.5 ? '50%' : '0%',
            }}
            animate={{
              rotate: [0, 360],
              scale: [0.5, 1.5, 0.5],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Main Loading Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.3 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, type: "spring", stiffness: 100 }}
        className="text-center relative z-10"
      >
        {/* 3D Rotating Logo */}
        <motion.div
          className="relative mb-12"
          animate={{
            rotateY: [0, 360],
            rotateX: [0, 15, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {/* Outer Ring */}
          <motion.div
            className="absolute inset-0 border-4 border-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            style={{
              width: '160px',
              height: '160px',
              margin: '-20px',
            }}
          />

          {/* Inner Ring */}
          <motion.div
            className="absolute inset-0 border-2 border-gradient-to-r from-purple-400 to-pink-500 rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            style={{
              width: '120px',
              height: '120px',
              margin: '0px',
            }}
          />

          {/* Center Logo */}
          <motion.div
            className="relative z-20 flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full shadow-2xl"
            animate={{
              scale: [1, 1.2, 1],
              boxShadow: [
                "0 0 20px rgba(34, 211, 238, 0.5)",
                "0 0 40px rgba(34, 211, 238, 0.8)",
                "0 0 20px rgba(34, 211, 238, 0.5)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <motion.div
              animate={{ rotate: [0, 180, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <FaInfinity className="text-white text-2xl" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Animated Tech Icons Orbit */}
        <div className="relative mb-8">
          {techIcons.map(({ Icon, color, name }, index) => {
            const angle = (index / techIcons.length) * 2 * Math.PI;
            const radius = 80;

            return (
              <motion.div
                key={index}
                className="absolute"
                style={{
                  left: '50%',
                  top: '50%',
                  marginLeft: '-20px',
                  marginTop: '-20px',
                }}
                animate={{
                  x: Math.cos(angle) * radius,
                  y: Math.sin(angle) * radius,
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                  delay: index * 0.2,
                }}
              >
                <motion.div
                  className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
                  style={{ backgroundColor: color }}
                  animate={{
                    scale: [1, 1.3, 1],
                    boxShadow: [
                      `0 0 10px ${color}40`,
                      `0 0 20px ${color}80`,
                      `0 0 10px ${color}40`,
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.3,
                    ease: "easeInOut",
                  }}
                  whileHover={{ scale: 1.5 }}
                >
                  <Icon className="text-white text-sm" />
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Animated Name */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <motion.h1
              className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                backgroundSize: "200% 200%",
              }}
            >
              {"IRAGUHA Jean Aime".split("").map((letter, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.8 + index * 0.1,
                    duration: 0.5,
                    type: "spring",
                    stiffness: 200,
                  }}
                  className="inline-block hover:scale-110 transition-transform"
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </motion.h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <motion.p
              className="text-lg md:text-xl text-cyan-300 font-medium"
              animate={{
                textShadow: [
                  "0 0 10px rgba(34, 211, 238, 0.5)",
                  "0 0 20px rgba(34, 211, 238, 0.8)",
                  "0 0 10px rgba(34, 211, 238, 0.5)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Building the Future with Code
            </motion.p>
          </motion.div>
        </div>

        {/* Enhanced Progress Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="mt-12 mx-auto w-80 h-3 bg-slate-800 rounded-full overflow-hidden shadow-2xl"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 3, delay: 2, ease: "easeOut" }}
            className="h-full relative"
          >
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600"
              animate={{
                background: [
                  "linear-gradient(90deg, #22d3ee, #3b82f6, #8b5cf6)",
                  "linear-gradient(90deg, #3b82f6, #8b5cf6, #22d3ee)",
                  "linear-gradient(90deg, #8b5cf6, #22d3ee, #3b82f6)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Animated Shine Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2.5,
              }}
            />
          </motion.div>
        </motion.div>

        {/* Loading Status */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
          className="mt-8 flex items-center justify-center space-x-4"
        >
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <FaMagic className="text-cyan-400 text-xl" />
          </motion.div>

          <motion.span
            className="text-cyan-300 font-medium"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Initializing Experience...
          </motion.span>

          <motion.div
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          >
            <FaBolt className="text-purple-400 text-xl" />
          </motion.div>
        </motion.div>

        {/* Floating Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.8 }}
          className="mt-12 text-center"
        >
          <motion.div
            className="inline-flex items-center space-x-2 text-slate-400 text-sm"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <FaStar className="text-cyan-400" />
            <span>Preparing something amazing...</span>
            <FaStar className="text-purple-400" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scan Line Effect */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60"
        animate={{
          y: [-100, '100vh'],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
          delay: 1,
        }}
      />

      {/* Pulsing Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute w-32 h-32 rounded-full"
            style={{
              background: `radial-gradient(circle, ${['rgba(34, 211, 238, 0.1)', 'rgba(139, 92, 246, 0.1)', 'rgba(59, 130, 246, 0.1)'][i]}, transparent)`,
              left: `${20 + i * 30}%`,
              top: `${20 + i * 20}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingAnimation;