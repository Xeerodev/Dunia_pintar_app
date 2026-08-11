import React, { useState, useEffect } from 'react';
import { useApp } from '../../../context/AppContext';
import { playPopSound, playVictoryFanfare, speakText } from '../../../utils/audio';
import { MASCOT_IMAGES } from '../../../data/appData';
import { Sparkles, RefreshCw, CheckCircle2 } from 'lucide-react';

// Tile positions for 3x3 puzzle
const INITIAL_PUZZLE = [1, 2, 0, 3, 4, 5, 6, 7, 8]; // 0 is empty slot
const SOLVED_PUZZLE = [0, 1, 2, 3, 4, 5, 6, 7, 8];

export const PuzzleGame: React.FC = () => {
  const [tiles, setTiles] = useState<number[]>([...INITIAL_PUZZLE]);
  const [isSolved, setIsSolved] = useState<boolean>(false);
  const { addStars, soundEnabled, triggerConfetti } = useApp();

  const handleTileClick = (index: number) => {
    if (isSolved) return;
    const emptyIndex = tiles.indexOf(0);

    // Check if clicked tile is adjacent to empty tile
    const row = Math.floor(index / 3);
    const col = index % 3;
    const emptyRow = Math.floor(emptyIndex / 3);
    const emptyCol = emptyIndex % 3;

    const isAdjacent =
      (Math.abs(row - emptyRow) === 1 && col === emptyCol) ||
      (Math.abs(col - emptyCol) === 1 && row === emptyRow);

    if (isAdjacent) {
      playPopSound();
      const newTiles = [...tiles];
      newTiles[emptyIndex] = tiles[index];
      newTiles[index] = 0;
      setTiles(newTiles);

      // Check win
      if (newTiles.every((val, i) => val === SOLVED_PUZZLE[i])) {
        setIsSolved(true);
        playVictoryFanfare();
        triggerConfetti();
        addStars(3);
        if (soundEnabled) {
          speakText('Luar biasa! Kamu berhasil menyusun puzzle!', 'id-ID');
        }
      }
    }
  };

  const shufflePuzzle = () => {
    playPopSound();
    setIsSolved(false);
    setTiles([2, 0, 1, 3, 5, 4, 6, 7, 8]);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-6 pb-28 text-center">
      <div className="bg-[#00b4d8]/20 text-[#00677d] dark:text-[#4cd6fb] font-bold text-xs uppercase tracking-wider px-4 py-1.5 rounded-full inline-block mb-3">
        Permainan Puzzle Kepingan
      </div>
      <h2 className="text-3xl font-bold text-[#141d23] dark:text-white mb-6">
        Susun Gambar Pintar!
      </h2>

      {/* 3x3 Puzzle Board */}
      <div className="grid grid-cols-3 gap-2 w-72 h-72 mx-auto bg-[#00b4d8] p-3 rounded-3xl shadow-xl border-4 border-[#b3ebff] mb-6 relative">
        {tiles.map((tileVal, idx) => {
          if (tileVal === 0) {
            return (
              <div
                key={idx}
                className="bg-[#ecf5fe]/40 dark:bg-[#1f2931]/40 rounded-2xl border-2 border-dashed border-white/50 flex items-center justify-center text-xs text-white/70"
              >
                Kosong
              </div>
            );
          }
          return (
            <button
              key={idx}
              onClick={() => handleTileClick(idx)}
              className="relative overflow-hidden rounded-2xl border-2 border-white shadow-md btn-press hover:brightness-110 active:scale-95 transition-all bg-[#ecf5fe]"
            >
              <img
                src={MASCOT_IMAGES.default}
                alt={`Tile ${tileVal}`}
                className="w-full h-full object-cover scale-150"
                style={{
                  objectPosition: `${((tileVal % 3) / 2) * 100}% ${
                    (Math.floor(tileVal / 3) / 2) * 100
                  }%`,
                }}
              />
              <span className="absolute bottom-1 right-1 bg-black/60 text-white font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                {tileVal}
              </span>
            </button>
          );
        })}
      </div>

      {isSolved && (
        <div className="bg-[#46bd18]/20 text-[#114500] dark:text-[#84fe58] p-3 rounded-2xl font-bold text-sm mb-6 flex items-center justify-center gap-2 animate-bounce">
          <Sparkles className="w-5 h-5 text-[#46bd18]" />
          Hore! Puzzle Selesai! +3 ⭐
        </div>
      )}

      <button
        onClick={shufflePuzzle}
        className="w-full bg-[#00677d] text-white font-bold py-3.5 rounded-full shadow-lg btn-press flex items-center justify-center gap-2 hover:bg-[#00b4d8] transition-all"
      >
        <RefreshCw className="w-5 h-5" />
        Acak Ulang Puzzle
      </button>
    </div>
  );
};
