import React from 'react';
import { useApp } from '../../context/AppContext';
import { COSTUME_LIST, TROPHY_LIST, BADGE_LIST } from '../../data/appData';
import { Star, Coins, Lock, Award, BookOpen, Calculator, Sparkles } from 'lucide-react';

export const HadiahView: React.FC = () => {
  const { stars, coins, xp, level, selectedCostumeId, unlockedCostumes, unlockCostume, selectCostume } = useApp();

  const astronautCostume = COSTUME_LIST.find((c) => c.id === 'astronaut') || COSTUME_LIST[0];

  const handleCostumeAction = () => {
    if (unlockedCostumes.includes(astronautCostume.id)) {
      selectCostume(astronautCostume.id);
    } else {
      unlockCostume(astronautCostume.id, astronautCostume.requiredStars);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header & Level Progress */}
      <div className="space-y-3">
        <div>
          <h2 className="text-xl font-black text-[#00677d] dark:text-[#4cd6fb] mb-0.5">
            Peti Harta Karun!
          </h2>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Kumpulkan bintang & dapatkan piala spesial!
          </p>
        </div>

        {/* Level XP Progress Bar */}
        <div className="bg-white dark:bg-[#1a232b] p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-xs">
          <div className="flex justify-between items-center mb-1.5">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-[11px] uppercase tracking-wider bg-[#fdd404]/20 dark:bg-[#ffe171]/20 text-[#705d00] dark:text-[#ffe171] px-2 py-0.5 rounded-md">
                LEVEL {level}
              </span>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Penjelajah Pemula
              </span>
            </div>
            <span className="font-extrabold text-xs text-[#00677d] dark:text-[#4cd6fb]">
              {xp} / 1000 XP
            </span>
          </div>

          <div className="w-full bg-slate-100 dark:bg-[#25323e] rounded-full h-3 overflow-hidden shadow-inner">
            <div
              className="bg-[#fdd404] dark:bg-[#e2b700] h-full rounded-full transition-all duration-500"
              style={{ width: `${(xp / 1000) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Currencies Row */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white dark:bg-[#1a232b] p-3.5 rounded-2xl shadow-xs border-2 border-[#fdd404] flex items-center gap-3 btn-press">
          <div className="w-10 h-10 bg-[#fdd404] rounded-full flex items-center justify-center shrink-0 text-[#6f5c00] shadow-xs">
            <Star className="w-6 h-6 fill-current text-[#705d00]" />
          </div>
          <div>
            <span className="text-2xl font-black text-slate-800 dark:text-white leading-none block">{stars}</span>
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Bintang
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-[#1a232b] p-3.5 rounded-2xl shadow-xs border-2 border-[#00b4d8] flex items-center gap-3 btn-press">
          <div className="w-10 h-10 bg-[#00b4d8] rounded-full flex items-center justify-center shrink-0 text-white shadow-xs">
            <Coins className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <span className="text-2xl font-black text-slate-800 dark:text-white leading-none block">{coins}</span>
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Koin
            </span>
          </div>
        </div>
      </div>

      {/* Costume Customization Card */}
      <div className="bg-white dark:bg-[#1a232b] p-4 rounded-2xl shadow-xs border border-slate-200 dark:border-slate-700/80 flex flex-col items-center text-center relative overflow-hidden">
        <div className="flex justify-between items-center w-full mb-3">
          <h3 className="text-sm font-extrabold text-[#00677d] dark:text-[#4cd6fb]">
            Ganti Kostum Mascot
          </h3>
          <span className="bg-[#46bd18]/20 text-[#206d00] dark:text-[#46bd18] font-bold text-[10px] px-2 py-0.5 rounded-full">
            Buka Kunci!
          </span>
        </div>

        <div className="relative w-24 h-24 mb-3">
          <div className="absolute inset-0 bg-[#00b4d8]/20 rounded-full animate-pulse" />
          <div className="relative w-full h-full bg-[#ecf5fe] dark:bg-[#222e38] rounded-full border-2 border-[#00677d] shadow-inner flex items-center justify-center overflow-hidden z-10">
            <img
              src={astronautCostume.imageUrl}
              alt={astronautCostume.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-300 font-medium mb-3">
          Kumpulkan {astronautCostume.requiredStars} bintang lagi untuk membuka kostum Astronot!
        </p>

        <button
          onClick={handleCostumeAction}
          disabled={!unlockedCostumes.includes(astronautCostume.id) && stars < astronautCostume.requiredStars}
          className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs shadow-xs flex items-center justify-center gap-1.5 ${
            unlockedCostumes.includes(astronautCostume.id)
              ? 'bg-[#46bd18] text-white cursor-pointer btn-press'
              : stars >= astronautCostume.requiredStars
              ? 'bg-[#fdd404] text-[#6f5c00] cursor-pointer btn-press'
              : 'bg-slate-100 dark:bg-[#25323e] text-slate-400 dark:text-slate-500 cursor-not-allowed'
          }`}
        >
          <Lock className="w-3.5 h-3.5" />
          {unlockedCostumes.includes(astronautCostume.id)
            ? 'Gunakan Kostum'
            : `Butuh ${astronautCostume.requiredStars} Bintang`}
        </button>
      </div>

      {/* Special Trophies */}
      <div className="bg-white dark:bg-[#1a232b] p-4 rounded-2xl shadow-xs border border-slate-200 dark:border-slate-700/80">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-extrabold text-[#00677d] dark:text-[#4cd6fb] flex items-center gap-1.5">
            <Award className="w-4 h-4 text-[#705d00] dark:text-[#ffe171]" />
            Piala Spesial
          </h3>
          <span className="text-[11px] font-bold text-[#00677d] dark:text-[#4cd6fb]">
            Semua
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {TROPHY_LIST.map((trophy) => (
            <div
              key={trophy.id}
              className="flex items-center gap-2.5 bg-slate-50 dark:bg-[#222d37] p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-700/60"
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 font-bold ${trophy.bgColor}`}
              >
                {trophy.icon === 'menu_book' ? (
                  <BookOpen className="w-4 h-4" />
                ) : (
                  <Calculator className="w-4 h-4" />
                )}
              </div>
              <div className="min-w-0">
                <h4 className="font-extrabold text-xs text-slate-800 dark:text-white truncate">
                  {trophy.title}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                  {trophy.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Badge Collection */}
      <div className="bg-white dark:bg-[#1a232b] p-4 rounded-2xl shadow-xs border border-slate-200 dark:border-slate-700/80">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-extrabold text-[#00677d] dark:text-[#4cd6fb] flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            Koleksi Lencana
          </h3>
          <span className="bg-slate-100 dark:bg-[#25323e] text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-full font-bold text-[10px]">
            8 / 24
          </span>
        </div>

        <div className="grid grid-cols-4 gap-3 justify-items-center">
          {BADGE_LIST.map((badge, idx) => (
            <div key={idx} className="flex flex-col items-center gap-1 group cursor-pointer">
              {badge.isUnlocked ? (
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00b4d8] to-[#00677d] flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform text-white">
                  <Sparkles className="w-5 h-5" />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-[#25323e] flex items-center justify-center border border-dashed border-slate-300 dark:border-slate-600 opacity-60">
                  <Lock className="w-4 h-4 text-slate-400" />
                </div>
              )}
              <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 text-center truncate max-w-[64px]">
                {badge.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
