import React, { useRef, useState, useEffect } from 'react';
import { useApp } from '../../../context/AppContext';
import { playPopSound, playVictoryFanfare, speakText } from '../../../utils/audio';
import { PaintBucket, Eraser, RotateCcw, Download, Sparkles } from 'lucide-react';

const COLORS = [
  '#FF0000', // Red
  '#FF7F00', // Orange
  '#FFFF00', // Yellow
  '#00FF00', // Green
  '#0000FF', // Blue
  '#4B0082', // Indigo
  '#8B00FF', // Violet
  '#FFC0CB', // Pink
  '#000000', // Black
  '#FFFFFF', // White
];

export const MewarnaiGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('#00b4d8');
  const { addStars, triggerConfetti, soundEnabled } = useApp();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    // Set background to white
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawOutline(ctx);
  }, []);

  const drawOutline = (ctx: CanvasRenderingContext2D) => {
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Friendly Elephant Outline
    ctx.beginPath();
    // Head & Ear
    ctx.arc(150, 130, 50, 0, Math.PI * 2);
    ctx.moveTo(100, 130);
    ctx.quadraticCurveTo(50, 80, 70, 160); // Left Ear
    ctx.quadraticCurveTo(90, 180, 105, 150);

    // Trunk
    ctx.moveTo(150, 160);
    ctx.quadraticCurveTo(150, 220, 120, 220);
    ctx.quadraticCurveTo(100, 220, 100, 200);

    // Eyes
    ctx.moveTo(140, 120);
    ctx.arc(135, 120, 4, 0, Math.PI * 2);
    ctx.moveTo(170, 120);
    ctx.arc(165, 120, 4, 0, Math.PI * 2);

    // Body
    ctx.moveTo(150, 180);
    ctx.arc(180, 200, 60, Math.PI * 0.8, Math.PI * 0.2);

    // Legs
    ctx.moveTo(130, 250);
    ctx.lineTo(130, 280);
    ctx.lineTo(150, 280);
    ctx.lineTo(150, 255);

    ctx.moveTo(190, 260);
    ctx.lineTo(190, 280);
    ctx.lineTo(210, 280);
    ctx.lineTo(210, 250);

    ctx.stroke();
  };

  const floodFill = (startX: number, startY: number, fillColor: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    const startPos = (startY * canvas.width + startX) * 4;
    const startR = data[startPos];
    const startG = data[startPos + 1];
    const startB = data[startPos + 2];
    const startA = data[startPos + 3];

    // Convert hex to RGB
    const fillR = parseInt(fillColor.slice(1, 3), 16);
    const fillG = parseInt(fillColor.slice(3, 5), 16);
    const fillB = parseInt(fillColor.slice(5, 7), 16);

    // Don't fill if color is the same or if it's the black outline (roughly)
    if (startR === fillR && startG === fillG && startB === fillB) return;
    if (startR < 50 && startG < 50 && startB < 50) return; // Prevent filling black outlines

    const stack = [[startX, startY]];

    while (stack.length > 0) {
      const [x, y] = stack.pop()!;
      const pos = (y * canvas.width + x) * 4;

      if (x < 0 || x >= canvas.width || y < 0 || y >= canvas.height) continue;
      if (data[pos] !== startR || data[pos + 1] !== startG || data[pos + 2] !== startB || data[pos + 3] !== startA) continue;

      data[pos] = fillR;
      data[pos + 1] = fillG;
      data[pos + 2] = fillB;
      data[pos + 3] = 255;

      stack.push([x + 1, y]);
      stack.push([x - 1, y]);
      stack.push([x, y + 1]);
      stack.push([x, y - 1]);
    }

    ctx.putImageData(imageData, 0, 0);
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();

    let clientX, clientY;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = Math.floor((clientX - rect.left) * (canvas.width / rect.width));
    const y = Math.floor((clientY - rect.top) * (canvas.height / rect.height));

    playPopSound();
    floodFill(x, y, selectedColor);
  };

  const handleClear = () => {
    playPopSound();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawOutline(ctx);
  };

  const handleFinish = () => {
    playVictoryFanfare();
    triggerConfetti();
    addStars(5);
    if (soundEnabled) {
      speakText('Wah, warnanya bagus sekali! Gajahnya jadi cantik!', 'id-ID');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-6 pb-28 text-center">
      <div className="bg-[#ffdad6] text-[#93000a] font-bold text-xs uppercase tracking-wider px-4 py-1.5 rounded-full inline-block mb-3">
        Mewarnai Ajaib: Sekali Klik!
      </div>
      <h2 className="text-3xl font-bold text-[#141d23] dark:text-white mb-4">
        Warnai Gajah Pintar! 🐘
      </h2>

      {/* Canvas */}
      <div className="bg-white rounded-3xl p-3 border-4 border-[#ffdad6] shadow-xl inline-block mb-4 relative">
        <canvas
          ref={canvasRef}
          width={300}
          height={300}
          onClick={handleCanvasClick}
          onTouchStart={handleCanvasClick}
          className="rounded-2xl cursor-pointer touch-none bg-white"
        />
      </div>

      {/* Palette Colors */}
      <div className="flex flex-wrap justify-center gap-2.5 mb-6 bg-white dark:bg-[#293138] p-4 rounded-3xl border-2 border-[#ffdad6] shadow-sm">
        {COLORS.map((c) => (
          <button
            key={c}
            onClick={() => {
              playPopSound();
              setSelectedColor(c);
            }}
            className={`w-10 h-10 rounded-full border-4 transition-all btn-press ${
              selectedColor === c ? 'scale-125 border-slate-800 dark:border-white shadow-lg' : 'border-transparent'
            }`}
            style={{ backgroundColor: c }}
          />
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <button
          onClick={handleClear}
          className="py-3.5 bg-slate-100 dark:bg-[#25323e] text-slate-700 dark:text-slate-300 rounded-2xl font-black text-sm flex items-center justify-center gap-2 btn-press border-b-4 border-slate-300 dark:border-slate-900"
        >
          <RotateCcw className="w-5 h-5" />
          Mulai Lagi
        </button>

        <button
          onClick={handleFinish}
          className="py-3.5 bg-[#46bd18] text-white rounded-2xl font-black text-sm flex items-center justify-center gap-2 btn-press shadow-md border-b-4 border-[#3ca513]"
        >
          <Sparkles className="w-5 h-5" />
          Simpan Karya
        </button>
      </div>

      <p className="text-xs font-bold text-slate-500 dark:text-slate-400 italic">
        *Klik pada bagian gambar yang kosong untuk mewarnai secara otomatis!
      </p>
    </div>
  );
};
