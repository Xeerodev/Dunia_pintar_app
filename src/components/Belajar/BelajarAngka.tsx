import React, { useState } from 'react';
import { NUMBER_DATA, MASCOT_IMAGES } from '../../data/appData';
import { NumberItem } from '../../types';
import { speakText, playPopSound } from '../../utils/audio';
import { useApp } from '../../context/AppContext';
import { Volume2, Sparkles, Check } from 'lucide-react';

export const BelajarAngka: React.FC = () => {
  const [selectedNumber, setSelectedNumber] = useState<NumberItem | null>(null);
  const [countedCount, setCountedCount] = useState<number>(0);
  const { addStars, soundEnabled } = useApp();

  const handleSelectNumber = (item: NumberItem) => {
    playPopSound();
    setSelectedNumber(item);
    setCountedCount(0);
    if (soundEnabled) {
      speakText(`Angka ${item.number}. ${item.word}.`, 'id-ID');
    }
  };

  const handleTapCountItem = (index: number) => {
    playPopSound();
    const newCount = index + 1;
    setCountedCount(newCount);
    if (soundEnabled) {
      speakText(`${newCount}`, 'id-ID');
    }
    if (selectedNumber && newCount === selectedNumber.number) {
      addStars(1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 pb-28">
      {/* Title Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#00414f] dark:text-[#4cd6fb] mb-2">
          Mari Berhitung!
        </h2>
        <p className="text-base sm:text-lg text-[#3d494d] dark:text-[#bcc9ce]">
          Pilih angka untuk belajar dan ketuk objeknya!
        </p>
      </div>

      {/* Number Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-8">
        {NUMBER_DATA.map((item) => (
          <button
            key={item.number}
            onClick={() => handleSelectNumber(item)}
            className={`bg-white dark:bg-[#293138] rounded-3xl p-5 flex flex-col items-center justify-center border-4 ${item.borderColor} shadow-[0px_6px_0px_0px_rgba(0,103,125,0.12)] btn-press group relative overflow-hidden`}
          >
            <span className={`text-5xl font-bold mb-1 ${item.textColor} dark:text-white`}>
              {item.number}
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#3d494d] dark:text-[#bcc9ce] mb-3">
              {item.word}
            </span>
            <div className="flex gap-1 flex-wrap justify-center text-xl">
              {item.items.slice(0, 3).map((emoji, i) => (
                <span key={i}>{emoji}</span>
              ))}
              {item.items.length > 3 && (
                <span className="text-xs text-[#00677d] dark:text-[#4cd6fb] font-bold self-center">
                  +{item.items.length - 3}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Interactive Detail View */}
      {selectedNumber && (
        <div className="bg-white dark:bg-[#293138] rounded-3xl p-6 shadow-xl border-4 border-[#00b4d8] text-center max-w-lg mx-auto relative animate-in zoom-in-95 duration-200">
          <div className="flex justify-between items-center mb-4">
            <span className="text-[#00677d] dark:text-[#4cd6fb] font-bold text-sm bg-[#ecf5fe] dark:bg-[#1f2931] px-4 py-1.5 rounded-full">
              Latihan Berhitung
            </span>
            <button
              onClick={() => {
                if (soundEnabled) speakText(`Angka ${selectedNumber.number}. ${selectedNumber.word}`, 'id-ID');
              }}
              className="p-2 rounded-full bg-[#fdd404] text-[#6f5c00] hover:scale-105 active:scale-95 transition-all"
            >
              <Volume2 className="w-6 h-6" />
            </button>
          </div>

          <div className="text-7xl font-bold text-[#00677d] dark:text-[#4cd6fb] mb-1">
            {selectedNumber.number}
          </div>
          <div className="text-xl font-bold text-[#141d23] dark:text-white uppercase mb-6">
            {selectedNumber.word}
          </div>

          <p className="text-sm font-semibold text-[#3d494d] dark:text-[#bcc9ce] mb-4">
            Ketuk setiap benda untuk berhitung ({countedCount}/{selectedNumber.number}):
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-6 p-4 bg-[#ecf5fe] dark:bg-[#1f2931] rounded-2xl border border-[#00b4d8]/30 min-h-[100px] items-center">
            {selectedNumber.items.map((emoji, idx) => {
              const isTapped = idx < countedCount;
              return (
                <button
                  key={idx}
                  onClick={() => handleTapCountItem(idx)}
                  className={`w-14 h-14 text-3xl rounded-2xl flex items-center justify-center transition-all btn-press border-2 ${
                    isTapped
                      ? 'bg-[#46bd18] text-white border-[#206d00] scale-110 shadow-md'
                      : 'bg-white dark:bg-[#293138] border-[#00b4d8] hover:bg-[#e0e9f2]'
                  }`}
                >
                  {isTapped ? <Check className="w-8 h-8 stroke-[3]" /> : emoji}
                </button>
              );
            })}
          </div>

          {countedCount === selectedNumber.number && (
            <div className="bg-[#46bd18]/20 text-[#114500] dark:text-[#84fe58] p-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 animate-bounce">
              <Sparkles className="w-5 h-5 text-[#46bd18]" />
              Hebat! Kamu berhasil berhitung sampai {selectedNumber.number}! +1 ⭐
            </div>
          )}
        </div>
      )}

      {/* Floating Mascot */}
      <div className="fixed bottom-24 right-4 sm:right-8 w-24 sm:w-32 z-20 floating-anim pointer-events-none">
        <img src={MASCOT_IMAGES.default} alt="Mascot Pintar" className="w-full h-auto drop-shadow-xl" />
      </div>
    </div>
  );
};
