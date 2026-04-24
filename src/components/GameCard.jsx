import { motion } from 'motion/react';
import { Maximize2, Play } from 'lucide-react';

export function GameCard({ game, onSelect }) {
  return (
    <motion.div
      layout
      className="group brutalist-card p-3 cursor-pointer relative"
      onClick={() => onSelect(game)}
    >
      <div className="aspect-video relative overflow-hidden bg-zinc-800 mb-4 rounded-sm">
        <img
          src={game.thumbnail}
          alt={game.title}
          className="w-full h-full object-cover grayscale opacity-50 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700"
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-white p-2 rounded-full">
            <Play className="w-6 h-6 fill-black text-black" />
          </div>
        </div>
        <div className="absolute top-2 right-2 bg-black/80 px-2 py-0.5 text-[8px] font-black uppercase tracking-widest border border-zinc-700">
          {game.category}
        </div>
      </div>
      
      <div className="flex items-start justify-between gap-2 overflow-hidden">
        <h3 className="text-xs font-black uppercase leading-tight truncate">
          {game.title}
        </h3>
        <Maximize2 className="w-3 h-3 text-zinc-600 shrink-0 group-hover:text-white transition-colors" />
      </div>
    </motion.div>
  );
}
