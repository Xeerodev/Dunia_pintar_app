import React, { useState, useEffect } from 'react';
import { useApp } from '../../../context/AppContext';
import { playCardFlipSound, playVictoryFanfare, speakText } from '../../../utils/audio';
import { Sparkles, RefreshCw } from 'lucide-react';

interface CardTile {
  id: number;
  pairId: number;
  emoji: string;
  name: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const MEMORY_ITEMS = [
  { pairId: 1, emoji: '🍎', name: 'Apel' },
  { pairId: 2, emoji: '🦁', name: 'Singa' },
  { pairId: 3, emoji: '🍌', name: 'Pisang' },
  { pairId: 4, emoji: '🐱', name: 'Kucing' },
];

export const MemoryGame: React.FC = () => {
  const [cards, setCards] = useState<CardTile[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number>(0);
  const { addStars, soundEnabled, triggerConfetti } = useApp();

  const initializeCards = () => {
    const deck = [...MEMORY_ITEMS, ...MEMORY_ITEMS].map((item, idx) => ({
      id: idx,
      pairId: item.pairId,
      emoji: item.emoji,
      name: item.name,
      isFlipped: false,
      isMatched: false,
    }));

    // Shuffle deck
    const shuffled = deck.sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlippedIndices([]);
    setMatchedPairs(0);
  };

  useEffect(() => {
    initializeCards();
  }, []);

  const handleCardClick = (index: number) => {
    if (
      cards[index].isFlipped ||
      cards[index].isMatched ||
      flippedIndices.length === 2
    ) {
      return;
    }

    playCardFlipSound();

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      const [firstIdx, secondIdx] = newFlipped;
      if (newCards[firstIdx].pairId === newCards[secondIdx].pairId) {
        // Match!
        setTimeout(() => {
          const matchedCards = [...newCards];
          matchedCards[firstIdx].isMatched = true;
          matchedCards[secondIdx].isMatched = true;
          setCards(matchedCards);
          setFlippedIndices([]);
          const nextPairs = matchedPairs + 1;
          setMatchedPairs(nextPairs);

          if (nextPairs === MEMORY_ITEMS.length) {
            playVictoryFanfare();
            triggerConfetti();
            addStars(3);
            if (soundEnabled) {
              speakText('Hebat! Kamu berhasil mencocokkan semua kartu!', 'id-ID');
            }
          }
        }, 500);
      } else {
        // No match - flip back
        setTimeout(() => {
          const resetCards = [...newCards];
          resetCards[firstIdx].isFlipped = false;
          resetCards[secondIdx].isFlipped = false;
          setCards(resetCards);
          setFlippedIndices([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-6 pb-28 text-center">
      <div className="bg-[#fdd404]/20 text-[#705d00] dark:text-[#ffe171] font-bold text-xs uppercase tracking-wider px-4 py-1.5 rounded-full inline-block mb-3">
        Permainan Ingatan Memory
      </div>
      <h2 className="text-3xl font-bold text-[#141d23] dark:text-white mb-2">
        Cocokkan Pasangan Kartu!
      </h2>
      <p className="text-sm font-semibold text-[#3d494d] dark:text-[#bcc9ce] mb-6">
        Pasangan Ditemukan: {matchedPairs} / {MEMORY_ITEMS.length}
      </p>

      {/* Card Grid */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {cards.map((card, idx) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(idx)}
            className={`aspect-square rounded-2xl border-4 font-bold text-3xl flex items-center justify-center shadow-md transition-all btn-press ${
              card.isFlipped || card.isMatched
                ? 'bg-white dark:bg-[#293138] border-[#fdd404] rotate-0'
                : 'bg-[#fdd404] text-[#705d00] border-[#ffe171]'
            }`}
          >
            {card.isFlipped || card.isMatched ? card.emoji : '❓'}
          </button>
        ))}
      </div>

      {matchedPairs === MEMORY_ITEMS.length && (
        <div className="bg-[#46bd18]/20 text-[#114500] dark:text-[#84fe58] p-3 rounded-2xl font-bold text-sm mb-6 flex items-center justify-center gap-2 animate-bounce">
          <Sparkles className="w-5 h-5 text-[#46bd18]" />
          Hebat! Semua Pasangan Cocok! +3 ⭐
        </div>
      )}

      <button
        onClick={initializeCards}
        className="w-full bg-[#00677d] text-white font-bold py-3.5 rounded-full shadow-lg btn-press flex items-center justify-center gap-2 hover:bg-[#00b4d8] transition-all"
      >
        <RefreshCw className="w-5 h-5" />
        Main Ulang Memory
      </button>
    </div>
  );
};
