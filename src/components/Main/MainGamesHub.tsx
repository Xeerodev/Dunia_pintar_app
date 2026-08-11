import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GameType } from '../../types';
import { MASCOT_IMAGES } from '../../data/appData';
import { TebakGambarGame } from './Games/TebakGambarGame';
import { PuzzleGame } from './Games/PuzzleGame';
import { MemoryGame } from './Games/MemoryGame';
import { MewarnaiGame } from './Games/MewarnaiGame';
import { Play, Sparkles, Image, Puzzle, Grid, Palette, Star } from 'lucide-react';
import { KidActivityModal } from '../KidActivityModal';

export const MainGamesHub: React.FC = () => {
  const { activeGame, setGame, parentSettings } = useApp();
  const [activeModalItem, setActiveModalItem] = useState<any>(null);

  if (activeGame === 'tebak-gambar') return <TebakGambarGame />;
  if (activeGame === 'puzzle') return <PuzzleGame />;
  if (activeGame === 'memory') return <MemoryGame />;
  if (activeGame === 'mewarnai') return <MewarnaiGame />;

  // Filter custom items and parent recommendations for Main Games
  const parentAddedRecs = (parentSettings.recommendations || []).filter((r) => r.added);
  const parentCustomGames = (parentSettings.customItems || []).filter(
    (c) => c.category === 'main' || c.category === 'both'
  );

  return (
    <div className="space-y-4">
      {/* Mascot Greeting Section */}
      <section className="flex items-center gap-3 bg-white dark:bg-[#1a232b] p-3.5 rounded-2xl border-2 border-[#00b4d8] shadow-xs">
        <div className="w-16 h-16 shrink-0 floating-anim">
          <img
            src={MASCOT_IMAGES.pointing}
            alt="Mascot Pintar pointing"
            className="w-full h-full object-contain filter drop-shadow-md"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-extrabold text-base text-[#141d23] dark:text-white mb-0.5 leading-tight">
            Ayo bermain sambil belajar! 🎮
          </p>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Ada 4 game seru + game tambahan dari Orang Tua!
          </p>
        </div>
      </section>

      {/* Parent Added Games Section (if any) */}
      {(parentAddedRecs.length > 0 || parentCustomGames.length > 0) && (
        <section className="bg-amber-50 dark:bg-amber-950/30 p-3.5 rounded-2xl border-2 border-amber-400/80 shadow-xs space-y-2.5">
          <div className="flex items-center gap-1.5">
            <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
            <h3 className="text-xs font-black text-amber-900 dark:text-amber-200 uppercase tracking-wider">
              Game Spesial dari Orang Tua:
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {parentAddedRecs.map((rec) => (
              <button
                key={rec.id}
                onClick={() =>
                  setActiveModalItem({
                    id: rec.id,
                    title: rec.title,
                    desc: rec.desc || 'Game rekomendasi dari Orang Tua',
                    image: rec.image,
                  })
                }
                className="bg-white dark:bg-[#1a232b] rounded-2xl p-2.5 border-2 border-amber-300 dark:border-amber-700 text-left hover:scale-[1.02] transition-transform btn-press shadow-xs flex flex-col justify-between"
              >
                <div className="h-24 w-full rounded-xl overflow-hidden mb-2 bg-slate-100 relative">
                  <img src={rec.image} alt={rec.title} className="w-full h-full object-cover" />
                  <span className="absolute top-1 left-1 bg-amber-400 text-amber-950 font-black text-[9px] px-1.5 py-0.5 rounded-md">
                    Ortu
                  </span>
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-slate-800 dark:text-white truncate">
                    {rec.title}
                  </h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                    Main sekarang!
                  </p>
                </div>
                <div className="mt-2 bg-[#00677d] text-white py-1 px-2 rounded-full font-bold text-[11px] flex items-center justify-center gap-1">
                  <span>Main</span>
                  <Play className="w-3 h-3 fill-current" />
                </div>
              </button>
            ))}

            {parentCustomGames.map((item) => (
              <button
                key={item.id}
                onClick={() =>
                  setActiveModalItem({
                    id: item.id,
                    title: item.title,
                    desc: item.desc,
                    image: item.image,
                  })
                }
                className="bg-white dark:bg-[#1a232b] rounded-2xl p-2.5 border-2 border-[#00b4d8] text-left hover:scale-[1.02] transition-transform btn-press shadow-xs flex flex-col justify-between"
              >
                <div className="h-24 w-full rounded-xl overflow-hidden mb-2 bg-slate-100 relative">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  <span className="absolute top-1 left-1 bg-[#00b4d8] text-white font-black text-[9px] px-1.5 py-0.5 rounded-md">
                    Baru
                  </span>
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-slate-800 dark:text-white truncate">
                    {item.title}
                  </h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-2 bg-[#46bd18] text-white py-1 px-2 rounded-full font-bold text-[11px] flex items-center justify-center gap-1">
                  <span>Main</span>
                  <Play className="w-3 h-3 fill-current" />
                </div>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* 4 Core Games Grid */}
      <section>
        <h3 className="text-xs font-black text-[#00677d] dark:text-[#4cd6fb] mb-2.5 uppercase tracking-wider">
          Game Utama (4 Game):
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {/* Game Card 1: Tebak Gambar */}
          <button
            onClick={() => setGame('tebak-gambar')}
            className="group relative bg-white dark:bg-[#1a232b] rounded-2xl overflow-hidden border-2 border-[#46bd18] text-left transition-all hover:-translate-y-0.5 btn-press shadow-xs flex flex-col"
          >
            <div className="h-28 w-full relative bg-[#84fe58]/30 flex items-center justify-center overflow-hidden">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwa7fbda4LShs4UWIgwhtdMuTO1WXfJAc0AhXH7Bm7rVcKx7NImHnbrkfBPoTNZmbHAVlS7mzQwtqu8m0IFAlBEp6u7ZBBylCLuEEp_RLxCVFhqvFab3JW87FokIn3hWIuFbyxy2Y54uVVdmSqqwOBzVc6W1YxNTF26JVIAoeYhb-a-ZBvO3n55pNt45oKZbq9v9MPMyuOtQ6ZPIGqPKM4lMQym5aBfoui_k4C4DEtrw0_mGm3cjtY"
                alt="Tebak Gambar"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <Image className="w-10 h-10 text-white z-10 drop-shadow-md" />
            </div>
            <div className="p-3 bg-white dark:bg-[#1a232b] flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-extrabold text-slate-800 dark:text-white mb-0.5">
                  Tebak Gambar
                </h3>
                <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  Tebak gambar rahasia!
                </p>
              </div>
              <div className="mt-2 bg-[#206d00] text-white py-1 px-3 rounded-full font-bold text-xs flex items-center justify-center gap-1 shadow-xs">
                <span>Main</span>
                <Play className="w-3 h-3 fill-current" />
              </div>
            </div>
          </button>

          {/* Game Card 2: Puzzle */}
          <button
            onClick={() => setGame('puzzle')}
            className="group relative bg-white dark:bg-[#1a232b] rounded-2xl overflow-hidden border-2 border-[#00b4d8] text-left transition-all hover:-translate-y-0.5 btn-press shadow-xs flex flex-col"
          >
            <div className="h-28 w-full relative bg-[#b3ebff]/30 flex items-center justify-center overflow-hidden">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNn42IH235u_SEkJHv3QrCnhr7ZfS1JKybJkpcfshMdXK4rcqWptJ4ngK2yCI3TCCGwPENNRy7YnugVfriuqU0aimc2cyYGWFgZMuNediSL6gTMmDNWO0Pp0vFR7YX-Xvn9CgEXdTZPDq04OuW286wr38yt0ujIC1tOjRgZaVBIvluWduryeKUPdTTHioRBsZtHOFapPjr08MaBh4omiR_7XmdrzFg2MwjuoZzv8BH7967l-yqHWOb"
                alt="Puzzle"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <Puzzle className="w-10 h-10 text-white z-10 drop-shadow-md" />
            </div>
            <div className="p-3 bg-white dark:bg-[#1a232b] flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-extrabold text-slate-800 dark:text-white mb-0.5">
                  Puzzle
                </h3>
                <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  Susun kepingan.
                </p>
              </div>
              <div className="mt-2 bg-[#00677d] text-white py-1 px-3 rounded-full font-bold text-xs flex items-center justify-center gap-1 shadow-xs">
                <span>Main</span>
                <Play className="w-3 h-3 fill-current" />
              </div>
            </div>
          </button>

          {/* Game Card 3: Memory */}
          <button
            onClick={() => setGame('memory')}
            className="group relative bg-white dark:bg-[#1a232b] rounded-2xl overflow-hidden border-2 border-[#fdd404] text-left transition-all hover:-translate-y-0.5 btn-press shadow-xs flex flex-col"
          >
            <div className="h-28 w-full relative bg-[#ffe171]/30 flex items-center justify-center overflow-hidden">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKZWjp9nJXHDF8wOWHSym8zG1yzmgobPOi6lhqtnEV0iDl1ksX47DIFdM1hk5QjBA360nvwIrfqAwtgv1wOCWLjEFX-cRyTehQj6zRrhJHp8dmYbTQtpCTjjJaPhhtKEYNROzy_uk74L8AvDYEyutJofTMvlUx60sax7lcu1GvY6eDRN3xkwzYm4zmntbt7ZKkYlgxTS7QEbYIxu3IB8magDGCYQZOeOrH17W-kxXjOrAu2sQlGHqX"
                alt="Memory"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <Grid className="w-10 h-10 text-white z-10 drop-shadow-md" />
            </div>
            <div className="p-3 bg-white dark:bg-[#1a232b] flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-extrabold text-slate-800 dark:text-white mb-0.5">
                  Memory
                </h3>
                <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  Cocokkan kartu.
                </p>
              </div>
              <div className="mt-2 bg-[#705d00] text-white py-1 px-3 rounded-full font-bold text-xs flex items-center justify-center gap-1 shadow-xs">
                <span>Main</span>
                <Play className="w-3 h-3 fill-current" />
              </div>
            </div>
          </button>

          {/* Game Card 4: Mewarnai */}
          <button
            onClick={() => setGame('mewarnai')}
            className="group relative bg-white dark:bg-[#1a232b] rounded-2xl overflow-hidden border-2 border-[#f43f5e] text-left transition-all hover:-translate-y-0.5 btn-press shadow-xs flex flex-col"
          >
            <div className="h-28 w-full relative bg-[#f43f5e]/30 flex items-center justify-center overflow-hidden">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWp3mu4KqaYm1Z_RK5_UG1xODK5d4rma5JDY7E_xEPvghvJlr-66JX8vTkCTZrPnCowXPOz7jsILVJtmh9tIF2qcrmX7vcCT59QZlS8_KTsqD_UOy55SsPUAc3Eaae4xpC-zfsx2mzGlBNnaYxKqNpRkUJhE6SBeTIxoBgZHoFyX8DTXBNgiDFly7tbz5Ezb16z_9c9CkcEVTr6bCTEzs7zRWsCk1hyHnjGPGCzPtPlCo56QU0TabM"
                alt="Mewarnai"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <Palette className="w-10 h-10 text-white z-10 drop-shadow-md" />
            </div>
            <div className="p-3 bg-white dark:bg-[#1a232b] flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-extrabold text-slate-800 dark:text-white mb-0.5">
                  Mewarnai
                </h3>
                <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  Warnai gambar!
                </p>
              </div>
              <div className="mt-2 bg-[#be123c] text-white py-1 px-3 rounded-full font-bold text-xs flex items-center justify-center gap-1 shadow-xs">
                <span>Main</span>
                <Play className="w-3 h-3 fill-current" />
              </div>
            </div>
          </button>
        </div>
      </section>

      {/* Modal for Parent Recommended / Custom Games */}
      {activeModalItem && (
        <KidActivityModal
          item={activeModalItem}
          onClose={() => setActiveModalItem(null)}
        />
      )}
    </div>
  );
};

