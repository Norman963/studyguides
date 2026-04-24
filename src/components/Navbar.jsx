import { Search, GraduationCap, Network } from 'lucide-react';
import { useState, useEffect } from 'react';

export function Navbar({ searchQuery, setSearchQuery }) {
  const [time, setTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <nav className="bg-zinc-950 px-8 py-10 flex flex-col gap-4 border-b-4 border-white mb-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 mb-2 font-black flex items-center gap-2">
            <GraduationCap className="w-3 h-3" />
            ACADEMIC REPOSITORY
          </span>
          <h1 className="text-6xl md:text-8xl font-black tracking-[-0.05em] leading-none mb-2">
            STUDYGUIDE<span className="text-zinc-500">.ORG</span>
          </h1>
        </div>

        <div className="flex flex-col items-start md:items-end text-right">
          <div className="text-4xl font-black tabular-nums tracking-tighter">{time}</div>
          <div className="text-[10px] uppercase font-bold text-zinc-500 flex items-center gap-2 bg-zinc-900 px-3 py-1 mt-2">
            <Network className="w-3 h-3" />
            Network Status: Secured
          </div>
        </div>
      </div>

      <div className="relative mt-8 group w-full md:w-1/2">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-white transition-colors" />
        <input
          type="text"
          placeholder="SEARCH MODULE_ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-zinc-900 border-2 border-zinc-800 focus:border-white text-white font-black uppercase text-sm focus:ring-0 focus:outline-none transition-all placeholder:text-zinc-600"
        />
      </div>
    </nav>
  );
}
