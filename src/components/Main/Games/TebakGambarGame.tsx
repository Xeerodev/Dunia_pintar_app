import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { playPopSound, playVictoryFanfare, speakText } from '../../../utils/audio';
import { Sparkles, RefreshCw, Trophy } from 'lucide-react';

interface Question {
  id: number;
  imageUrl: string;
  correctName: string;
  options: string[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    imageUrl: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500&auto=format&fit=crop&q=80',
    correctName: 'Apel',
    options: ['Jeruk', 'Apel', 'Pisang', 'Anggur'],
  },
  {
    id: 2,
    imageUrl: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=500&auto=format&fit=crop&q=80',
    correctName: 'Gajah',
    options: ['Singa', 'Gajah', 'Monyet', 'Kucing'],
  },
  {
    id: 3,
    imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500&auto=format&fit=crop&q=80',
    correctName: 'Kucing',
    options: ['Kucing', 'Anjing', 'Burung', 'Rusa'],
  },
];

export const TebakGambarGame: React.FC = () => {
  const [qIndex, setQIndex] = useState<number>(0);
  const [revealed, setRevealed] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const { addStars, soundEnabled, triggerConfetti } = useApp();

  const currentQ = QUESTIONS[qIndex];

  const handleGuess = (option: string) => {
    playPopSound();
    setSelectedOption(option);
    if (option === currentQ.correctName) {
      setIsCorrect(true);
      setRevealed(true);
      playVictoryFanfare();
      triggerConfetti();
      addStars(2);
      if (soundEnabled) {
        speakText(`Benar! Ini adalah ${currentQ.correctName}!`, 'id-ID');
      }
    } else {
      setIsCorrect(false);
      if (soundEnabled) {
        speakText('Coba lagi ya!', 'id-ID');
      }
    }
  };

  const handleNextQuestion = () => {
    playPopSound();
    setRevealed(false);
    setSelectedOption(null);
    setIsCorrect(null);
    setQIndex((prev) => (prev + 1) % QUESTIONS.length);
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-28 text-center">
      <div className="bg-[#46bd18]/10 text-[#206d00] dark:text-[#84fe58] font-bold text-xs uppercase tracking-wider px-4 py-1.5 rounded-full inline-block mb-3">
        Permainan Tebak Gambar
      </div>
      <h2 className="text-3xl font-bold text-[#141d23] dark:text-white mb-6">
        Tebak Gambar yang Tersembunyi!
      </h2>

      {/* Covered Canvas Image */}
      <div className="relative w-64 h-64 mx-auto rounded-3xl overflow-hidden border-4 border-[#46bd18] shadow-xl bg-white dark:bg-[#293138] mb-6 flex items-center justify-center p-2">
        <img
          src={currentQ.imageUrl}
          alt="Tebak gambar"
          className={`w-full h-full object-contain rounded-2xl transition-all duration-500 ${
            revealed ? 'blur-0 scale-100' : 'blur-xl scale-125 opacity-70'
          }`}
        />
        {!revealed && (
          <div className="absolute inset-0 bg-[#46bd18]/20 backdrop-blur-md flex items-center justify-center text-4xl">
            ❓
          </div>
        )}
      </div>

      {/* Feedback Banner */}
      {isCorrect === true && (
        <div className="bg-[#46bd18]/20 text-[#114500] dark:text-[#84fe58] p-3 rounded-2xl font-bold text-sm mb-6 flex items-center justify-center gap-2 animate-bounce">
          <Sparkles className="w-5 h-5 text-[#46bd18]" />
          Hore! Jawabanmu Benar! +2 ⭐
        </div>
      )}

      {isCorrect === false && (
        <div className="bg-[#ffdad6] text-[#93000a] p-3 rounded-2xl font-bold text-sm mb-6">
          Ups! Masih kurang tepat, ayo coba lagi!
        </div>
      )}

      {/* Answer Choices */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {currentQ.options.map((opt) => {
          const isThisSelected = selectedOption === opt;
          return (
            <button
              key={opt}
              disabled={revealed}
              onClick={() => handleGuess(opt)}
              className={`p-4 rounded-2xl font-bold text-lg border-2 shadow-md transition-all btn-press ${
                isThisSelected && isCorrect
                  ? 'bg-[#46bd18] text-white border-[#206d00]'
                  : isThisSelected && !isCorrect
                  ? 'bg-[#ba1a1a] text-white border-[#93000a]'
                  : 'bg-white dark:bg-[#293138] text-[#141d23] dark:text-white border-[#46bd18] hover:bg-[#ecf5fe]'
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {revealed && (
        <button
          onClick={handleNextQuestion}
          className="w-full bg-[#00677d] text-white font-bold py-3.5 rounded-full shadow-lg btn-press flex items-center justify-center gap-2 hover:bg-[#00b4d8] transition-all"
        >
          <RefreshCw className="w-5 h-5" />
          Soal Berikutnya
        </button>
      )}
    </div>
  );
};
