import React, { useRef, useState, useEffect } from 'react';
import { useApp } from '../../../context/AppContext';
import { playPopSound, playVictoryFanfare } from '../../../utils/audio';
import { Paintbrush, Eraser, RotateCcw, Download, Sparkles } from 'lucide-react';

const COLORS = [
  '#00677d', // Primary Teal
  '#00b4d8', // Sky Blue
  '#46bd18', // Green
  '#fdd404', // Yellow
  '#ba1a1a', // Red
  '#ff9800', // Orange
  '#9c27b0', // Purple
  '#000000', // Black
  '#ffffff', // White (Eraser)
];

export const MewarnaiGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('#00b4d8');
  const [brushSize, setBrushSize] = useState<number>(10);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const { addStars, triggerConfetti } = useApp();

  // Draw outline on initial mount
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set background to white
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawOutline(ctx);
  }, []);

  const drawOutline = (ctx: CanvasRenderingContext2D) => {
    ctx.strokeStyle = '#293138';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';

    // Friendly Dinosaur Line Art
    ctx.beginPath();
    // Body & Head
    ctx.arc(150, 160, 60, 0, Math.PI * 2); // Head/Body circle
    ctx.moveTo(180, 140);
    ctx.arc(200, 130, 15, 0, Math.PI * 2); // Eye
    // Smile
    ctx.arc(170, 170, 20, 0, Math.PI);
    // Legs
    ctx.rect(120, 220, 20, 40);
    ctx.rect(160, 220, 20, 40);
    // Tail
    ctx.moveTo(90, 170);
    ctx.quadraticCurveTo(50, 200, 30, 160);
    ctx.stroke();
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.beginPath();
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let clientX = 0;
    let clientY = 0;

    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = (clientX - rect.left) * (canvas.width / rect.width);
    const y = (clientY - rect.top) * (canvas.height / rect.height);

    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.strokeStyle = selectedColor;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
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
    addStars(3);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-6 pb-28 text-center">
      <div className="bg-[#ffdad6] text-[#93000a] font-bold text-xs uppercase tracking-wider px-4 py-1.5 rounded-full inline-block mb-3">
        Permainan Mewarnai Kreatif
      </div>
      <h2 className="text-3xl font-bold text-[#141d23] dark:text-white mb-4">
        Warnai Dinosaurus Pintar!
      </h2>

      {/* Canvas */}
      <div className="bg-white rounded-3xl p-3 border-4 border-[#ffdad6] shadow-xl inline-block mb-4 relative">
        <canvas
          ref={canvasRef}
          width={300}
          height={300}
          onMouseDown={startDrawing}
          onMouseUp={stopDrawing}
          onMouseMove={draw}
          onTouchStart={startDrawing}
          onTouchEnd={stopDrawing}
          onTouchMove={draw}
          className="rounded-2xl cursor-crosshair touch-none bg-white"
        />
      </div>

      {/* Palette Colors */}
      <div className="flex flex-wrap justify-center gap-2 mb-4 bg-white dark:bg-[#293138] p-3 rounded-2xl border-2 border-[#ffdad6]">
        {COLORS.map((c) => (
          <button
            key={c}
            onClick={() => {
              playPopSound();
              setSelectedColor(c);
            }}
            className={`w-9 h-9 rounded-full border-2 transition-all btn-press ${
              selectedColor === c ? 'scale-125 border-black dark:border-white shadow-md' : 'border-transparent'
            }`}
            style={{ backgroundColor: c }}
          />
        ))}
      </div>

      {/* Brush Size & Controls */}
      <div className="flex justify-between items-center gap-2 mb-6">
        <div className="flex items-center gap-2 bg-white dark:bg-[#293138] px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700">
          <Paintbrush className="w-4 h-4 text-[#00677d] dark:text-[#4cd6fb]" />
          <input
            type="range"
            min={4}
            max={24}
            value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
            className="w-24 accent-[#00b4d8]"
          />
        </div>

        <button
          onClick={handleClear}
          className="p-3 bg-[#ffdad6] text-[#93000a] rounded-full font-bold text-xs flex items-center gap-1 btn-press"
        >
          <RotateCcw className="w-4 h-4" />
          Bersih
        </button>

        <button
          onClick={handleFinish}
          className="px-5 py-2.5 bg-[#46bd18] text-white rounded-full font-bold text-xs flex items-center gap-1 btn-press shadow-md"
        >
          <Sparkles className="w-4 h-4" />
          Selesai (+3 ⭐)
        </button>
      </div>
    </div>
  );
};
