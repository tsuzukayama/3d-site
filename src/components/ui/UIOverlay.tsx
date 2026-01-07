import { useGameStore } from '../../stores/gameStore';
import { experiences } from '../../data/experiences';

export function UIOverlay() {
  const { isPlaying, score, spawnedCount } = useGameStore();

  if (!isPlaying) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start">
        {/* Score */}
        <div
          className="bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 border border-cyan-500/30"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          <div className="text-cyan-400 text-xs uppercase tracking-wider">Score</div>
          <div className="text-2xl font-bold text-white glow-text" style={{ color: '#00ffff' }}>
            {score.toString().padStart(6, '0')}
          </div>
        </div>

        {/* Progress */}
        <div
          className="bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 border border-orange-500/30"
          style={{ fontFamily: "'Rajdhani', sans-serif" }}
        >
          <div className="text-orange-400 text-xs uppercase tracking-wider">Experiences</div>
          <div className="text-xl font-bold text-white">
            {Math.min(spawnedCount, experiences.length)} / {experiences.length}
          </div>
        </div>
      </div>

      {/* Instructions (fades after a few seconds) */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <div
          className="bg-black/40 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/20"
          style={{ fontFamily: "'Rajdhani', sans-serif" }}
        >
          <div className="flex items-center gap-4 text-sm text-gray-300">
            <span>
              <kbd className="px-2 py-0.5 bg-gray-700/80 rounded text-xs">WASD</kbd> Move
            </span>
            <span>
              <kbd className="px-2 py-0.5 bg-gray-700/80 rounded text-xs">SPACE</kbd> Shoot
            </span>
            <span className="text-cyan-400">Shoot planes to view experience!</span>
          </div>
        </div>
      </div>

      {/* Radar/minimap style decoration */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
        <div className="flex gap-1">
          {experiences.map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                i < spawnedCount
                  ? 'bg-cyan-500 border-cyan-400 shadow-lg shadow-cyan-500/50'
                  : 'bg-transparent border-gray-600'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

