import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../stores/gameStore';

export function ExperienceModal() {
  const { selectedExperience, resumeGame } = useGameStore();

  // Handle Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedExperience) {
        resumeGame();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedExperience, resumeGame]);

  return (
    <AnimatePresence>
      {selectedExperience && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 flex items-center justify-center z-50 p-4"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
          onClick={resumeGame}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: -50 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-lg w-full rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #1a2a4a 0%, #0a1628 100%)',
              border: `2px solid ${selectedExperience.color}`,
              boxShadow: `
                0 0 20px ${selectedExperience.color}40,
                0 0 40px ${selectedExperience.color}20,
                inset 0 1px 0 rgba(255,255,255,0.1)
              `,
            }}
          >
            {/* Header */}
            <div
              className="p-6 border-b"
              style={{ borderColor: `${selectedExperience.color}40` }}
            >
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <h2
                  className="text-3xl font-bold mb-1"
                  style={{
                    fontFamily: "'Orbitron', sans-serif",
                    color: selectedExperience.color,
                    textShadow: `0 0 10px ${selectedExperience.color}`,
                  }}
                >
                  {selectedExperience.company}
                </h2>
                <div className="flex items-center gap-3">
                  <span
                    className="text-lg text-white"
                    style={{ fontFamily: "'Rajdhani', sans-serif" }}
                  >
                    {selectedExperience.role}
                  </span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-400 text-sm">
                    {selectedExperience.period}
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Content */}
            <div className="p-6">
              <motion.p
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-gray-300 leading-relaxed mb-6"
                style={{ fontFamily: "'Rajdhani', sans-serif" }}
              >
                {selectedExperience.description}
              </motion.p>

              {/* Technologies */}
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <h3
                  className="text-sm uppercase tracking-wider text-gray-500 mb-3"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedExperience.technologies.map((tech, i) => (
                    <motion.span
                      key={tech}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.4 + i * 0.05 }}
                      className="px-3 py-1 rounded-full text-sm font-medium"
                      style={{
                        backgroundColor: `${selectedExperience.color}20`,
                        color: selectedExperience.color,
                        border: `1px solid ${selectedExperience.color}40`,
                        fontFamily: "'Rajdhani', sans-serif",
                      }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Footer */}
            <div className="p-6 pt-0">
              <motion.button
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={resumeGame}
                className="w-full arcade-btn py-3 rounded-lg text-white font-bold uppercase tracking-wider"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                Continue Mission
              </motion.button>
            </div>

            {/* Decorative corner accents */}
            <div
              className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2"
              style={{ borderColor: selectedExperience.color }}
            />
            <div
              className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2"
              style={{ borderColor: selectedExperience.color }}
            />
            <div
              className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2"
              style={{ borderColor: selectedExperience.color }}
            />
            <div
              className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2"
              style={{ borderColor: selectedExperience.color }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

