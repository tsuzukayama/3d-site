import { create } from "zustand";
import type { Experience } from "../data/experiences";
import { experiences } from "../data/experiences";

export type Bullet = {
  id: string;
  position: [number, number, number];
  velocity: [number, number, number];
};

export type Enemy = {
  id: string;
  experience: Experience;
  position: [number, number, number];
  isHit: boolean;
};

interface GameState {
  // Game state
  isPlaying: boolean;
  isPaused: boolean;
  score: number;
  gameTime: number;

  // Player
  playerPosition: [number, number, number];

  // Bullets
  bullets: Bullet[];

  // Enemies
  enemies: Enemy[];
  spawnedCount: number;

  // Modal
  selectedExperience: Experience | null;

  // Explosions
  explosions: Array<{ id: string; position: [number, number, number] }>;

  // Actions
  startGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  setPlayerPosition: (pos: [number, number, number]) => void;
  addBullet: (bullet: Bullet) => void;
  removeBullet: (id: string) => void;
  spawnEnemy: () => void;
  hitEnemy: (id: string) => void;
  setSelectedExperience: (exp: Experience | null) => void;
  addExplosion: (position: [number, number, number]) => void;
  removeExplosion: (id: string) => void;
  updateGameTime: (delta: number) => void;
  updateEnemyPositions: (delta: number) => void;
  updateBulletPositions: (delta: number) => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  // Initial state
  isPlaying: false,
  isPaused: false,
  score: 0,
  gameTime: 0,
  playerPosition: [0, -3, 0],
  bullets: [],
  enemies: [],
  spawnedCount: 0,
  selectedExperience: null,
  explosions: [],

  // Actions
  startGame: () =>
    set({
      isPlaying: true,
      isPaused: false,
      score: 0,
      gameTime: 0,
      bullets: [],
      enemies: [],
      spawnedCount: 0,
      selectedExperience: null,
      explosions: [],
      playerPosition: [0, -3, 0],
    }),

  pauseGame: () => set({ isPaused: true }),

  resumeGame: () => set({ isPaused: false, selectedExperience: null }),

  setPlayerPosition: (pos) => set({ playerPosition: pos }),

  addBullet: (bullet) =>
    set((state) => ({
      bullets: [...state.bullets, bullet],
    })),

  removeBullet: (id) =>
    set((state) => ({
      bullets: state.bullets.filter((b) => b.id !== id),
    })),

  spawnEnemy: () => {
    const state = get();
    // Loop through experiences infinitely using modulo
    const expIndex = state.spawnedCount % experiences.length;
    const exp = experiences[expIndex];
    const xPos = (Math.random() - 0.5) * 6;

    const newEnemy: Enemy = {
      id: `enemy-${Date.now()}-${state.spawnedCount}`,
      experience: exp,
      position: [xPos, 6, 0],
      isHit: false,
    };

    set((state) => ({
      enemies: [...state.enemies, newEnemy],
      spawnedCount: state.spawnedCount + 1,
    }));
  },

  hitEnemy: (id) =>
    set((state) => ({
      enemies: state.enemies.map((e) =>
        e.id === id ? { ...e, isHit: true } : e
      ),
      score: state.score + 100,
    })),

  setSelectedExperience: (exp) =>
    set({
      selectedExperience: exp,
      isPaused: exp !== null,
    }),

  addExplosion: (position) =>
    set((state) => ({
      explosions: [...state.explosions, { id: `exp-${Date.now()}`, position }],
    })),

  removeExplosion: (id) =>
    set((state) => ({
      explosions: state.explosions.filter((e) => e.id !== id),
    })),

  updateGameTime: (delta) =>
    set((state) => ({
      gameTime: state.gameTime + delta,
    })),

  updateEnemyPositions: (delta) =>
    set((state) => ({
      enemies: state.enemies
        .map((enemy) => ({
          ...enemy,
          position: [
            enemy.position[0],
            enemy.position[1] - delta * 2,
            enemy.position[2],
          ] as [number, number, number],
        }))
        .filter((enemy) => enemy.position[1] > -8),
    })),

  updateBulletPositions: (delta) =>
    set((state) => ({
      bullets: state.bullets
        .map((bullet) => ({
          ...bullet,
          position: [
            bullet.position[0],
            bullet.position[1] + delta * 15,
            bullet.position[2],
          ] as [number, number, number],
        }))
        .filter((bullet) => bullet.position[1] < 10),
    })),
}));
