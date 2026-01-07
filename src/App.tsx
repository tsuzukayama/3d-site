import { GameScene } from './components/game/GameScene';
import { StartScreen } from './components/ui/StartScreen';
import { UIOverlay } from './components/ui/UIOverlay';
import { ExperienceModal } from './components/ui/ExperienceModal';
import { MobileControls } from './components/ui/MobileControls';

function App() {
  return (
    <div className="w-full h-full relative overflow-hidden scanlines">
      {/* 3D Game Scene */}
      <GameScene />

      {/* UI Layers */}
      <StartScreen />
      <UIOverlay />
      <ExperienceModal />
      <MobileControls />
    </div>
  );
}

export default App;
