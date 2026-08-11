import React, { useState } from 'react';
import { ANIMAL_DATA, MASCOT_IMAGES } from '../../data/appData';
import { AnimalItem } from '../../types';
import { playAnimalSound, playPopSound } from '../../utils/audio';
import { useApp } from '../../context/AppContext';
import { Volume2, Info } from 'lucide-react';

export const DuniaSekitar: React.FC = () => {
  const [selectedAnimal, setSelectedAnimal] = useState<AnimalItem | null>(null);
  const { addStars, soundEnabled } = useApp();

  const handleAnimalClick = (animal: AnimalItem) => {
    playPopSound();
    setSelectedAnimal(animal);
    if (soundEnabled) {
      playAnimalSound(animal.soundType);
    }
    addStars(1);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 pb-28">
      {/* Header Banner */}
      <div className="mb-8 flex items-end justify-between relative">
        <div>
          <span className="inline-block bg-[#46bd18] text-white px-3.5 py-1 rounded-full font-bold text-xs sm:text-sm mb-2 shadow-sm">
            Dunia Sekitar
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#141d23] dark:text-white">
            Ayo Kenal Hewan!
          </h2>
          <p className="text-base sm:text-lg text-[#3d494d] dark:text-[#bcc9ce] mt-1">
            Pilih hewan untuk mendengar suaranya.
          </p>
        </div>

        {/* Mascot Guide */}
        <div className="relative w-28 h-28 sm:w-40 sm:h-40 shrink-0 floating-anim">
          <img
            src={MASCOT_IMAGES.waving}
            alt="Pintar Robot"
            className="w-full h-full object-contain drop-shadow-xl"
          />
          <div className="absolute -top-2 -left-12 bg-white dark:bg-[#293138] px-3 py-1.5 rounded-2xl rounded-tr-none shadow-md border-2 border-[#00b4d8] text-xs font-bold text-[#00677d] dark:text-[#4cd6fb]">
            Halo! 👋
          </div>
        </div>
      </div>

      {/* Bento Grid Animals */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
        {ANIMAL_DATA.map((animal) => (
          <div
            key={animal.id}
            onClick={() => handleAnimalClick(animal)}
            className={`bg-white dark:bg-[#293138] rounded-3xl p-4 sm:p-5 flex flex-col items-center justify-center border-4 ${animal.borderColor} shadow-[0px_6px_0px_0px_rgba(0,0,0,0.1)] hover:-translate-y-1 active:scale-95 cursor-pointer group relative overflow-hidden h-48 sm:h-60 transition-all btn-press ${animal.gridSpan || ''}`}
          >
            <div className="w-20 h-20 sm:w-28 sm:h-28 bg-[#ecf5fe] dark:bg-[#1f2931] rounded-full flex items-center justify-center mb-3 shadow-inner text-5xl sm:text-7xl group-hover:scale-110 transition-transform">
              {animal.emoji}
            </div>

            <h3 className="font-bold text-xl sm:text-2xl text-[#141d23] dark:text-white mb-2">
              {animal.name}
            </h3>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAnimalClick(animal);
              }}
              className="w-10 h-10 sm:w-12 sm:h-12 bg-[#00677d] text-white rounded-full flex items-center justify-center shadow-md hover:bg-[#00b4d8] transition-colors"
            >
              <Volume2 className="w-6 h-6 fill-current" />
            </button>
          </div>
        ))}
      </div>

      {/* Animal Fact Modal */}
      {selectedAnimal && (
        <div className="mt-8 bg-white dark:bg-[#293138] rounded-3xl p-6 shadow-xl border-4 border-[#46bd18] flex flex-col sm:flex-row items-center gap-6 animate-in slide-in-from-bottom-4 duration-200">
          <div className="text-7xl sm:text-8xl p-4 bg-[#ecf5fe] dark:bg-[#1f2931] rounded-3xl border-2 border-[#46bd18]/40">
            {selectedAnimal.emoji}
          </div>
          <div className="flex-1 text-center sm:text-left">
            <div className="flex items-center gap-2 justify-center sm:justify-start mb-2">
              <h3 className="text-2xl font-bold text-[#141d23] dark:text-white">
                {selectedAnimal.name}
              </h3>
              <span className="bg-[#46bd18]/20 text-[#206d00] dark:text-[#84fe58] text-xs px-3 py-1 rounded-full font-bold flex items-center gap-1">
                <Info className="w-3.5 h-3.5" />
                Fakta Unik
              </span>
            </div>
            <p className="text-base text-[#3d494d] dark:text-[#bcc9ce] mb-4">
              {selectedAnimal.description}
            </p>
            <button
              onClick={() => playAnimalSound(selectedAnimal.soundType)}
              className="bg-[#00677d] text-white font-bold px-6 py-2.5 rounded-full shadow-md flex items-center gap-2 hover:bg-[#00b4d8] transition-all btn-press mx-auto sm:mx-0"
            >
              <Volume2 className="w-5 h-5 fill-current" />
              Dengar Suara {selectedAnimal.name}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
