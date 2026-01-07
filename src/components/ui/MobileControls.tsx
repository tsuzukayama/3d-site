import { useRef, useEffect, useCallback } from 'react';
import { useGameStore } from '../../stores/gameStore';

export function MobileControls() {
  const joystickRef = useRef<HTMLDivElement>(null);
  const knobRef = useRef<HTMLDivElement>(null);
  const { isPlaying, isPaused, addBullet, playerPosition } = useGameStore();
  const isDragging = useRef(false);
  const shootInterval = useRef<number | null>(null);

  const handleJoystickMove = useCallback((clientX: number, clientY: number) => {
    if (!joystickRef.current || !knobRef.current || !isDragging.current) return;

    const rect = joystickRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    let deltaX = clientX - centerX;
    let deltaY = clientY - centerY;

    const maxDistance = rect.width / 2 - 20;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    if (distance > maxDistance) {
      deltaX = (deltaX / distance) * maxDistance;
      deltaY = (deltaY / distance) * maxDistance;
    }

    knobRef.current.style.transform = `translate(${deltaX}px, ${deltaY}px)`;

    // Update player position based on joystick
    const normalizedX = deltaX / maxDistance;
    const normalizedY = -deltaY / maxDistance;

    // Dispatch custom event for player movement
    window.dispatchEvent(
      new CustomEvent('joystick-move', {
        detail: { x: normalizedX, y: normalizedY },
      })
    );
  }, []);

  const handleJoystickEnd = useCallback(() => {
    isDragging.current = false;
    if (knobRef.current) {
      knobRef.current.style.transform = 'translate(0px, 0px)';
    }
    window.dispatchEvent(
      new CustomEvent('joystick-move', { detail: { x: 0, y: 0 } })
    );
  }, []);

  const shoot = useCallback(() => {
    if (!isPlaying || isPaused) return;
    
    addBullet({
      id: `bullet-${Date.now()}-${Math.random()}`,
      position: [playerPosition[0] - 0.3, playerPosition[1] + 0.5, playerPosition[2]],
      velocity: [0, 15, 0],
    });
    addBullet({
      id: `bullet-${Date.now()}-${Math.random()}-2`,
      position: [playerPosition[0] + 0.3, playerPosition[1] + 0.5, playerPosition[2]],
      velocity: [0, 15, 0],
    });
  }, [isPlaying, isPaused, addBullet, playerPosition]);

  const startShooting = useCallback(() => {
    shoot();
    shootInterval.current = window.setInterval(shoot, 150);
  }, [shoot]);

  const stopShooting = useCallback(() => {
    if (shootInterval.current) {
      clearInterval(shootInterval.current);
      shootInterval.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      if (shootInterval.current) {
        clearInterval(shootInterval.current);
      }
    };
  }, []);

  // Check if mobile
  const isMobile = typeof window !== 'undefined' && 'ontouchstart' in window;

  if (!isPlaying || !isMobile) return null;

  return (
    <div className="absolute bottom-0 left-0 right-0 p-6 pointer-events-auto z-20">
      <div className="flex justify-between items-end max-w-lg mx-auto">
        {/* Joystick */}
        <div
          ref={joystickRef}
          className="relative w-32 h-32 rounded-full border-4 border-white/30 bg-white/10 backdrop-blur-sm"
          onTouchStart={(e) => {
            isDragging.current = true;
            const touch = e.touches[0];
            handleJoystickMove(touch.clientX, touch.clientY);
          }}
          onTouchMove={(e) => {
            const touch = e.touches[0];
            handleJoystickMove(touch.clientX, touch.clientY);
          }}
          onTouchEnd={handleJoystickEnd}
        >
          <div
            ref={knobRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-cyan-500 border-4 border-cyan-300 shadow-lg shadow-cyan-500/50 transition-transform duration-75"
          />
        </div>

        {/* Fire button */}
        <button
          onTouchStart={(e) => {
            e.preventDefault();
            startShooting();
          }}
          onTouchEnd={stopShooting}
          className="w-24 h-24 rounded-full arcade-btn flex items-center justify-center text-white text-3xl font-bold active:scale-95 transition-transform"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          FIRE
        </button>
      </div>
    </div>
  );
}

