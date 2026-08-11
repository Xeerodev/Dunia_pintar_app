import React, { useState } from 'react';
import { FLASHCARD_DATA, MASCOT_IMAGES } from '../../data/appData';
import { speakText, playCardFlipSound, playPopSound } from '../../utils/audio';
import { useApp } from '../../context/AppContext';
import { ChevronLeft, ChevronRight, Volume2, Bot } from 'lucide-react';

export const EnglishFlashcards: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const { addStars, soundEnabled } = useApp();

  const currentCard = FLASHCARD_DATA[currentIndex];

  const handleCardClick = () => {
    playCardFlipSound();
    setIsFlipped((prev) => !prev);
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      playPopSound();
      setIsFlipped(false);
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < FLASHCARD_DATA.length - 1) {
      playPopSound();
      setIsFlipped(false);
      setCurrentIndex((prev) => prev + 1);
      addStars(1);
    }
  };

  const handleSpeakWord = (e: React.MouseEvent) => {
    e.stopPropagation();
    playPopSound();
    if (soundEnabled) {
      speakText(currentCard.word, 'en-US');
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-28 flex flex-col items-center">
      {/* Instruction Banner matching Screenshot 2 */}
      <div className="bg-[#dbe4ed] dark:bg-[#293138] rounded-2xl p-4 mb-6 flex items-center gap-4 shadow-sm w-full animate-bounce-slow">
        <div className="w-12 h-12 bg-[#00b4d8] rounded-full flex items-center justify-center text-white shrink-0 shadow-inner">
          <Bot className="w-7 h-7" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-[#00677d] dark:text-[#4cd6fb] mb-0.5">
            Let's Learn English!
          </h2>
          <p className="text-xs sm:text-sm text-[#3d494d] dark:text-[#bcc9ce]">
            Tap the card to see the word, then tap the speaker to hear it!
          </p>
        </div>
      </div>

      {/* Flashcard Container with 3D Flip */}
      <div className="relative w-full max-w-sm aspect-[3/4] perspective-1000 my-2">
        <div
          onClick={handleCardClick}
          className={`flashcard w-full h-full cursor-pointer group ${isFlipped ? 'flipped' : ''}`}
        >
          <div className="flashcard-inner relative w-full h-full rounded-[2rem] shadow-xl bg-white dark:bg-[#293138] border-4 border-[#ffdad6] dark:border-[#00b4d8]/40">
            {/* Front Side */}
            <div className="flashcard-front absolute inset-0 flex flex-col items-center justify-center p-8 bg-white dark:bg-[#293138] rounded-[1.75rem] overflow-hidden">
              <div className="absolute top-4 right-4 bg-[#ffdad6] text-[#93000a] px-3.5 py-1 rounded-full font-bold text-xs uppercase tracking-wider">
                {currentCard.category}
              </div>

              <img
                src={currentCard.imageUrl}
                alt={currentCard.imageAlt}
                className="w-48 h-48 sm:w-56 sm:h-56 object-contain mb-6 drop-shadow-md rounded-xl"
              />

              <div className="absolute bottom-6 w-full text-center text-[#bcc9ce] font-bold text-xs">
                Tap to flip card 🔄
              </div>
            </div>

            {/* Back Side */}
            <div className="flashcard-back absolute inset-0 flex flex-col items-center justify-center p-8 bg-[#ffdad6] dark:bg-[#00414f] rounded-[1.75rem] border-4 border-white dark:border-[#00b4d8] shadow-inner text-center">
              <h2 className="text-4xl sm:text-5xl font-bold text-[#93000a] dark:text-[#4cd6fb] mb-2 tracking-wide">
                {currentCard.word}
              </h2>
              <p className="text-sm font-semibold text-[#93000a]/80 dark:text-white/80 mb-8 italic">
                "{currentCard.translation}" ({currentCard.pronunciation})
              </p>

              <button
                onClick={handleSpeakWord}
                aria-label="Play Sound"
                className="w-20 h-20 bg-[#00677d] text-white rounded-full flex items-center justify-center shadow-[0px_6px_0px_0px_rgba(0,31,39,1)] hover:brightness-110 btn-press z-10"
              >
                <Volume2 className="w-10 h-10 fill-current" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center gap-6 mt-8 w-full max-w-sm justify-center">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`w-14 h-14 rounded-full flex items-center justify-center text-[#00677d] dark:text-[#4cd6fb] bg-[#e6eff8] dark:bg-[#293138] shadow-md btn-press ${
            currentIndex === 0 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-[#dbe4ed]'
          }`}
        >
          <ChevronLeft className="w-8 h-8 stroke-[3]" />
        </button>

        <div className="font-bold text-sm text-[#6d797e] dark:text-[#bcc9ce] bg-white dark:bg-[#1f2931] px-5 py-2 rounded-full shadow-sm border border-[#bcc9ce]/30">
          {currentIndex + 1} / {FLASHCARD_DATA.length}
        </div>

        <button
          onClick={handleNext}
          disabled={currentIndex === FLASHCARD_DATA.length - 1}
          className={`w-14 h-14 rounded-full flex items-center justify-center text-white bg-[#46bd18] shadow-[0px_4px_0px_0px_rgba(17,69,0,1)] btn-press ${
            currentIndex === FLASHCARD_DATA.length - 1
              ? 'opacity-40 cursor-not-allowed'
              : 'hover:brightness-110'
          }`}
        >
          <ChevronRight className="w-8 h-8 stroke-[3]" />
        </button>
      </div>
    </div>
  );
};
