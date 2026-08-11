import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { speakText, playStarChime, playPopSound } from '../utils/audio';
import { Sparkles, CheckCircle2, Star, Volume2, X } from 'lucide-react';

interface KidActivityModalProps {
  item: {
    id: string;
    title: string;
    desc: string;
    image: string;
    type?: string;
  };
  onClose: () => void;
}

export const KidActivityModal: React.FC<KidActivityModalProps> = ({ item, onClose }) => {
  const { addStars, soundEnabled } = useApp();
  const [completed, setCompleted] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const sampleQuestions = [
    { question: `Ayo jawab pertanyaan dari ${item.title}: Mana jawaban yang benar?`, options: ['Super Hebat! 🌟', 'Luar Biasa! 🚀', 'Sangat Pintar! 🎉'], correct: 0 },
  ];

  const handleSelect = (idx: number) => {
    setSelectedOption(idx);
    playPopSound();
    if (soundEnabled) {
      speakText('Wah, jawabanmu tepat sekali! Kamu mendapat 20 Bintang!', 'id-ID');
    }
    setTimeout(() => {
      setCompleted(true);
      addStars(20);
    }, 600);
  };

  const handleSpeakTitle = () => {
    if (soundEnabled) {
      speakText(`${item.title}. ${item.desc}`, 'id-ID');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#1a232b] rounded-3xl p-5 shadow-2xl max-w-sm w-full border-4 border-[#00b4d8] relative overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-100 dark:bg-[#25323e] flex items-center justify-center text-slate-600 dark:text-slate-300 font-bold hover:scale-105"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content Header */}
        <div className="flex items-center gap-2 mb-3">
          <span className="bg-[#fdd404]/30 text-[#705d00] dark:text-[#ffe171] font-black text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            Pilihan Orang Tua
          </span>
        </div>

        {/* Big Image Preview */}
        <div className="relative w-full h-40 rounded-2xl overflow-hidden mb-3 border-2 border-slate-200 dark:border-slate-700 bg-slate-100">
          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
          <button
            onClick={handleSpeakTitle}
            className="absolute bottom-2 right-2 bg-[#00677d] text-white p-2 rounded-full shadow-md hover:scale-110 btn-press"
            title="Dengarkan Suara"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>

        <h3 className="text-lg font-black text-slate-800 dark:text-white leading-snug mb-1">
          {item.title}
        </h3>
        <p className="text-xs text-slate-600 dark:text-slate-300 font-semibold mb-4">
          {item.desc}
        </p>

        {/* Interactive Game / Activity Area */}
        {!completed ? (
          <div className="space-y-2 bg-slate-50 dark:bg-[#222d37] p-3 rounded-2xl border border-slate-200/80 dark:border-slate-700">
            <p className="text-xs font-bold text-slate-700 dark:text-slate-200 text-center mb-2">
              Pilih satu tombol untuk menyelesaikan misi ini:
            </p>
            {sampleQuestions[0].options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                className={`w-full py-2.5 px-3 rounded-xl font-extrabold text-xs text-left transition-all flex items-center justify-between border-2 ${
                  selectedOption === idx
                    ? 'bg-[#46bd18] text-white border-[#46bd18] scale-105'
                    : 'bg-white dark:bg-[#1a232b] text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-700 hover:border-[#00b4d8]'
                }`}
              >
                <span>{opt}</span>
                <Star className="w-4 h-4 fill-current text-amber-400 shrink-0" />
              </button>
            ))}
          </div>
        ) : (
          <div className="bg-emerald-50 dark:bg-emerald-950/40 p-4 rounded-2xl border-2 border-emerald-500 text-center space-y-2 animate-in zoom-in-50">
            <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h4 className="text-base font-black text-emerald-800 dark:text-emerald-300">
              Hebat Sekali! Misi Selesai!
            </h4>
            <div className="inline-flex items-center gap-1.5 bg-amber-400 text-amber-950 font-black px-3 py-1 rounded-full text-xs shadow-xs">
              <Star className="w-4 h-4 fill-current" />
              +20 Bintang Diraih!
            </div>
            <button
              onClick={onClose}
              className="w-full mt-2 bg-[#00677d] text-white font-extrabold py-2 rounded-xl text-xs shadow-md btn-press"
            >
              Kembali
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
