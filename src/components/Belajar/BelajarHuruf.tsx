import React, { useState } from 'react';
import { ALPHABET_DATA, MASCOT_IMAGES } from '../../data/appData';
import { LetterItem } from '../../types';
import { speakText, playPopSound } from '../../utils/audio';
import { useApp } from '../../context/AppContext';
import { Volume2, X, Star, CheckCircle } from 'lucide-react';

export const BelajarHuruf: React.FC = () => {
  const [selectedLetter, setSelectedLetter] = useState<LetterItem | null>(null);
  const [learnedLetters, setLearnedLetters] = useState<string[]>(['A', 'B', 'C']);
  const { addStars, soundEnabled } = useApp();

  const handleOpenLetter = (item: LetterItem) => {
    playPopSound();
    setSelectedLetter(item);
    if (soundEnabled) {
      speakText(`Huruf ${item.letter}. ${item.word}.`, 'id-ID');
    }
    if (!learnedLetters.includes(item.letter)) {
      setLearnedLetters((prev) => [...prev, item.letter]);
      addStars(1);
    }
  };

  const handleSpeak = (text: string) => {
    playPopSound();
    if (soundEnabled) {
      speakText(text, 'id-ID');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 pb-28">
      {/* Mascot Header Banner */}
      <div className="flex flex-col items-center justify-center mb-8 text-center relative">
        <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[#e0e9f2] dark:bg-[#293138] border-4 border-[#00b4d8] shadow-lg flex items-center justify-center overflow-hidden mb-4 relative floating-anim">
          <img
            src={MASCOT_IMAGES.pointing}
            alt="Mascot Pintar"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="bg-white dark:bg-[#293138] border-2 border-[#00b4d8] rounded-2xl px-6 py-3 shadow-[0px_4px_0px_0px_rgba(0,180,216,0.3)] relative">
          <p className="font-bold text-xl sm:text-2xl text-[#00677d] dark:text-[#4cd6fb]">
            Ayo Belajar Huruf!
          </p>
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white dark:bg-[#293138] border-l-2 border-t-2 border-[#00b4d8] rotate-45" />
        </div>
      </div>

      {/* Alphabet Grid */}
      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-3 sm:gap-4 justify-items-center">
        {ALPHABET_DATA.map((item) => {
          const isLearned = learnedLetters.includes(item.letter);
          return (
            <button
              key={item.letter}
              onClick={() => handleOpenLetter(item)}
              aria-label={`Belajar huruf ${item.letter}`}
              className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full font-bold text-2xl sm:text-3xl flex items-center justify-center border-4 shadow-md btn-press relative transition-all ${item.colorBg} ${item.colorBorder}`}
            >
              {item.letter}
              {isLearned && (
                <div className="absolute -top-1 -right-1 bg-[#46bd18] text-white rounded-full p-0.5 shadow">
                  <CheckCircle className="w-4 h-4 fill-current text-white" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Interactive Letter Modal */}
      {selectedLetter && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#293138] w-full max-w-sm rounded-3xl p-6 shadow-2xl border-4 border-[#00b4d8] relative text-center">
            <button
              onClick={() => setSelectedLetter(null)}
              aria-label="Tutup"
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-[#ecf5fe] dark:bg-[#1f2931] text-[#3d494d] dark:text-[#bcc9ce] hover:bg-[#e0e9f2] transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex flex-col items-center pt-4">
              <span className="text-8xl font-bold text-[#00677d] dark:text-[#4cd6fb] mb-2 drop-shadow-sm">
                {selectedLetter.letter}
              </span>

              <div className="w-44 h-44 rounded-2xl bg-[#ecf5fe] dark:bg-[#1f2931] border-2 border-[#00b4d8]/40 overflow-hidden mb-4 p-2 shadow-inner flex items-center justify-center">
                <img
                  src={selectedLetter.imageUrl}
                  alt={selectedLetter.imageAlt}
                  className="w-full h-full object-contain rounded-xl"
                />
              </div>

              <h2 className="text-2xl font-bold text-[#141d23] dark:text-white mb-6 capitalize">
                {selectedLetter.letter} = {selectedLetter.word}
              </h2>

              <button
                onClick={() => handleSpeak(`Huruf ${selectedLetter.letter}. ${selectedLetter.word}.`)}
                className="w-20 h-20 rounded-full bg-[#fdd404] text-[#6f5c00] flex items-center justify-center shadow-[0px_6px_0px_0px_rgba(111,92,0,0.3)] btn-press hover:brightness-105"
              >
                <Volume2 className="w-10 h-10 fill-current" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
