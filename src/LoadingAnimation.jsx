import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaRocket, FaBrain, FaCube, FaDatabase, FaServer } from 'react-icons/fa';

const LoadingAnimation = () => {
  const icons = [
    { Icon: FaCode, color: '#2563EB' },
    { Icon: FaRocket, color: '#0891B2' },
    { Icon: FaBrain, color: '#0D9488' },
    { Icon: FaCube, color: '#059669' },
    { Icon: FaDatabase, color: '#F59E0B' },
    { Icon: FaServer, color: '#DB2777' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main Loading Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="text-center relative z-10"
      >
        {/* Floating Icons */}
        <div className="relative mb-8">
          {icons.map(({ Icon, color }, index) => (
            <motion.div
              key={index}
              className="absolute inset-0 flex items-center justify-center"
              animate={{
                rotate: 360,
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 4 + index * 0.5,
                repeat: Infinity,
                ease: "linear",
                delay: index * 0.2,
              }}
              style={{
                transform: `translate(${Math.cos(index) * 60}px, ${Math.sin(index) * 60}px)`,
              }}
            >
              <Icon
                size={40}
                style={{ color }}
                className="drop-shadow-lg"
              />
            </motion.div>
          ))}
          
          {/* Center Icon */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative z-20"
          >
            <FaCode size={80} className="text-white mx-auto drop-shadow-2xl" />
          </motion.div>
        </div>

        {/* Loading Text */}
        <div className="space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-white"
          >
            IRAGUHA Jean Aime
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-lg md:text-xl text-gray-300"
          >
            Building the Future with Code
          </motion.p>
        </div>

        {/* Progress Bar */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, delay: 1, ease: "easeOut" }}
          className="mt-12 mx-auto w-64 h-2 bg-gray-700 rounded-full overflow-hidden"
        >
          <motion.div
            animate={{
              background: [
                "linear-gradient(90deg, #2563EB, #0891B2)",
                "linear-gradient(90deg, #0891B2, #0D9488)",
                "linear-gradient(90deg, #0D9488, #059669)",
                "linear-gradient(90deg, #059669, #2563EB)",
              ],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
            }}
            className="h-full"
            style={{
              background: "linear-gradient(90deg, #2563EB, #0891B2)",
            }}
          />
        </motion.div>

        {/* Loading Dots */}
        <div className="flex justify-center space-x-2 mt-8">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              animate={{
                y: [0, -10, 0],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: index * 0.2,
              }}
              className="w-3 h-3 bg-white rounded-full"
            />
          ))}
        </div>

        {/* Subtle Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-8 text-sm text-gray-400"
        >
          Loading portfolio experience...
        </motion.p>
      </motion.div>

      {/* Scan Line Effect */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
        animate={{
          y: [-100, '100vh'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};

export default LoadingAnimation;