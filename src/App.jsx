/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { GameCard } from './components/GameCard';
import { GameViewer } from './components/GameViewer';
import gamesData from './data/games.json';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGame, setSelectedGame] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);

  const categories = useMemo(() => {
    const cats = new Set(gamesData.map(g => g.category.toUpperCase()));
    return Array.from(cats).sort();
  }, []);

  const filteredGames = useMemo(() => {
    return gamesData.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          game.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !activeCategory || game.category.toUpperCase() === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 p-8 max-w-[1400px] mx-auto overflow-x-hidden">
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <main className="flex-1 grid grid-cols-12 gap-12 min-h-0">
        {/* Sidebar / Nav */}
        <aside className="col-span-12 lg:col-span-3 flex flex-col gap-8">
          <div className="border-2 border-white p-6 bg-white text-black">
            <h2 className="text-sm font-black uppercase mb-4 tracking-wider">Module Categories</h2>
            <nav className="flex flex-col gap-2">
              <button 
                onClick={() => setActiveCategory(null)}
                className={`text-left text-2xl font-black uppercase transition-all hover:translate-x-2 ${!activeCategory ? 'underline decoration-4 underline-offset-4' : 'opacity-40'}`}
              >
                All_Modules
              </button>
              {categories.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                  className={`text-left text-2xl font-black uppercase transition-all hover:translate-x-2 ${activeCategory === cat ? 'underline decoration-4 underline-offset-4' : 'opacity-40'}`}
                >
                  {cat.replace(' ', '_')}
                </button>
              ))}
              <button className="text-left text-xl font-bold italic opacity-20 cursor-not-allowed mt-4 uppercase">STAFF_ONLY</button>
            </nav>
          </div>
          
          <div className="border-2 border-zinc-800 p-6 flex-1 hidden lg:block">
            <h2 className="text-xs font-black uppercase text-zinc-500 mb-6 tracking-wide">System Log</h2>
            <div className="text-[11px] font-mono text-zinc-600 leading-relaxed uppercase space-y-3">
              <p className="flex justify-between"><span>{">"} FETCH_GAMES.JSON</span> <span className="text-zinc-800">DONE</span></p>
              <p className="flex justify-between"><span>{">"} MODULES_FOUND</span> <span className="text-white">{gamesData.length}</span></p>
              <p className="flex justify-between"><span>{">"} BYPASS_STATUS</span> <span className="text-white font-bold">ACTIVE</span></p>
              <p className="flex justify-between"><span>{">"} AI_DETECTED</span> <span className="text-zinc-800">NO</span></p>
              <p className="flex justify-between"><span>{">"} USER_AUTH</span> <span className="text-zinc-800">BYPASSED</span></p>
              <p className="animate-pulse">{">"} WAITING_FOR_INPUT...</p>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <section className="col-span-12 lg:col-span-9 flex flex-col gap-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredGames.length > 0 ? (
                filteredGames.map((game) => (
                  <GameCard 
                    key={game.id} 
                    game={game} 
                    onSelect={setSelectedGame} 
                  />
                ))
              ) : (
                <div className="col-span-full py-32 text-center border-4 border-dashed border-zinc-900">
                  <h3 className="text-4xl font-black uppercase mb-2 opacity-10">Empty Repository</h3>
                  <p className="text-zinc-700 font-bold uppercase tracking-widest text-xs">No matching educational modules found</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-20 flex flex-col md:flex-row justify-between items-center text-[10px] font-bold text-zinc-600 border-t-2 border-zinc-900 pt-8 gap-4 uppercase tracking-[0.2em]">
        <div>&copy; 2024 STUDYGUIDE.ORG - ALL MODULES VERIFIED FOR EDUCATIONAL USE</div>
        <div className="flex gap-8 italic">
          <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-zinc-800 rounded-full" /> COOKIES: DISABLED</span>
          <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-zinc-800 rounded-full" /> TRACKING: BLOCKED</span>
          <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-zinc-800 rounded-full" /> SECURE_HOST: TRUE</span>
        </div>
      </footer>

      {/* Game Viewer Modal */}
      <AnimatePresence>
        {selectedGame && (
          <GameViewer 
            game={selectedGame} 
            onClose={() => setSelectedGame(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
