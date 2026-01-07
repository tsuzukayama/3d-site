import { motion } from 'framer-motion';
import { useGameStore } from '../../stores/gameStore';

export function StartScreen() {
  const { isPlaying, startGame } = useGameStore();

  if (isPlaying) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex flex-col items-center justify-center z-50"
      style={{
        background: 'radial-gradient(ellipse at center, rgba(10, 22, 40, 0.9) 0%, rgba(5, 10, 20, 0.98) 100%)',
      }}
    >
      {/* Animated title */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
        className="text-center mb-12"
      >
        <h1
          className="text-6xl md:text-8xl font-bold tracking-wider mb-4"
          style={{
            fontFamily: "'Orbitron', sans-serif",
            color: '#00ffff',
            textShadow: `
              0 0 10px #00ffff,
              0 0 20px #00ffff,
              0 0 40px #0088ff,
              0 0 80px #0044ff
            `,
          }}
        >
          PORTFOLIO
        </h1>
        <h2
          className="text-3xl md:text-5xl font-bold tracking-widest"
          style={{
            fontFamily: "'Orbitron', sans-serif",
            color: '#ff6b35',
            textShadow: `
              0 0 10px #ff6b35,
              0 0 20px #ff6b35,
              0 0 40px #ff4411
            `,
          }}
        >
          STRIKER
        </h2>
      </motion.div>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="text-lg md:text-xl text-gray-300 mb-8 text-center px-4"
        style={{ fontFamily: "'Rajdhani', sans-serif" }}
      >
        Shoot the enemy planes to discover my work experience
      </motion.p>

      {/* Controls info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="flex flex-wrap justify-center gap-4 mb-12 text-sm md:text-base"
      >
        <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
          <kbd className="px-2 py-1 bg-gray-700 rounded text-white font-mono">W A S D</kbd>
          <span className="text-gray-300">Move</span>
        </div>
        <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
          <kbd className="px-2 py-1 bg-gray-700 rounded text-white font-mono">SPACE</kbd>
          <span className="text-gray-300">Shoot</span>
        </div>
      </motion.div>

      {/* Start button */}
      <motion.button
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.3 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={startGame}
        className="arcade-btn px-12 py-4 text-2xl font-bold text-white rounded-lg uppercase tracking-widest"
        style={{ fontFamily: "'Orbitron', sans-serif" }}
      >
        Start Mission
      </motion.button>

      {/* Decorative elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 text-gray-500 text-sm"
      >
        © 2024 | Built with React & Three.js
      </motion.div>

      {/* Animated planes in background */}
      <motion.div
        className="absolute top-20 left-10 text-4xl"
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        ✈️
      </motion.div>
      <motion.div
        className="absolute top-40 right-20 text-3xl"
        animate={{
          y: [0, 15, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        }}
      >
        🛩️
      </motion.div>
    </motion.div>
  );
}

