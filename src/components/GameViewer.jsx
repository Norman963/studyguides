import { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Maximize2, X, RotateCcw, ChevronLeft } from 'lucide-react';

export function GameViewer({ game, onClose }) {
  const containerRef = useRef(null);
  const [iframeKey, setIframeKey] = useState(0);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      containerRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    }
  };

  const reloadGame = () => {
    setIframeKey(prev => prev + 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-zinc-950 p-4 md:p-12 flex flex-col"
    >
      <div className="w-full h-full flex flex-col gap-6 max-w-7xl mx-auto">
        <header className="flex items-center justify-between border-b-2 border-zinc-800 pb-4">
          <div className="flex items-center gap-6">
            <button
              onClick={onClose}
              className="group flex items-center gap-2 font-black uppercase text-xs hover:text-zinc-400 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              BACK_TO_REPO
            </button>
            <div className="hidden sm:block">
              <h2 className="text-xl font-black uppercase tracking-tight">{game.title}</h2>
              <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">{game.category}_SIMULATION</p>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={reloadGame}
              className="p-3 border-2 border-zinc-800 hover:border-white transition-all"
              title="RELOAD_MODULE"
            >
              <RotateCcw className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={toggleFullscreen}
              className="brutalist-button flex items-center gap-2"
            >
              <Maximize2 className="w-5 h-5" />
              <span className="hidden md:inline">FULL SCREEN</span>
            </button>
            <button
              onClick={onClose}
              className="p-3 bg-red-600 text-white font-black md:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        <div 
          ref={containerRef}
          className="flex-1 bg-zinc-900 border-4 border-white relative overflow-hidden flex items-center justify-center"
        >
          <div className="absolute top-4 left-4 bg-white text-black px-2 py-1 text-[10px] font-black uppercase z-10">
            MODULE: {game.id.toUpperCase()}_v1.0.4
          </div>
          
          <iframe
            key={iframeKey}
            src={game.iframeUrl}
            className="w-full h-full border-none"
            allow="fullscreen; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            title={game.title}
          />
        </div>
        
        <footer className="flex justify-between items-center text-[10px] font-bold text-zinc-500 uppercase tracking-widest pt-2">
          <span>LATENCY: 12MS</span>
          <span>&copy; STUDYGUIDE.ORG - ACADEMIC INTEGRITY VERIFIED</span>
          <span className="hidden md:inline">ENCRYPTION: AES-256</span>
        </footer>
      </div>
    </motion.div>
  );
}
