import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowLeft, Moon, Sun, Volume2, VolumeX, Star } from 'lucide-react';
import { MASCOT_IMAGES } from '../data/appData';

interface HeaderProps {
  showBack?: boolean;
  onBack?: () => void;
  title?: string;
  progressBarPercent?: number;
}

export const Header: React.FC<HeaderProps> = ({
  showBack,
  onBack,
  title = 'Dunia Pintar',
  progressBarPercent,
}) => {
  const {
    stars,
    darkMode,
    soundEnabled,
    toggleDarkMode,
    toggleSound,
    activeSubModule,
    activeGame,
    setSubModule,
    setGame,
    kidMode,
    setKidMode,
    setParentAuthenticated
  } = useApp();

  const [showExitKidModal, setShowExitKidModal] = useState(false);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (activeSubModule !== 'hub') {
      setSubModule('hub');
    } else if (activeGame !== 'hub') {
      setGame('hub');
    }
  };

  const handleExitKidMode = () => {
    setShowExitKidModal(true);
  };

  const isChildView = showBack || activeSubModule !== 'hub' || activeGame !== 'hub';

  return (
    <>
      <header className="w-full sticky top-0 z-40 bg-white/95 dark:bg-[#162029]/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 shadow-xs transition-colors duration-300">
        <div className="px-3 sm:px-4 py-2 flex justify-between items-center gap-2">
          {/* Left Section: Back Button / Logo & Title */}
          <div className="flex items-center gap-2 min-w-0">
            {isChildView ? (
              <button
                onClick={handleBack}
                aria-label="Kembali"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-[#ecf5fe] dark:bg-[#222e38] text-[#00677d] dark:text-[#4cd6fb] hover:scale-105 active:scale-90 transition-all shadow-xs border border-[#00b4d8]/30 shrink-0"
              >
                <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
              </button>
            ) : (
              <button
                onDoubleClick={handleExitKidMode}
                className="w-9 h-9 rounded-full overflow-hidden border-2 border-[#00b4d8] bg-[#ecf5fe] dark:bg-[#222e38] flex items-center justify-center shrink-0 shadow-xs transition-transform active:scale-95"
              >
                <img
                  src={MASCOT_IMAGES.avatarCircle}
                  alt="Pintar Avatar"
                  className="w-full h-full object-cover"
                />
              </button>
            )}

            <h1 className="font-extrabold text-base sm:text-lg text-[#00677d] dark:text-[#4cd6fb] tracking-tight truncate">
              {title}
            </h1>
          </div>

          {/* Right Section: Controls & Star Counter */}
          <div className="flex items-center gap-1.5 shrink-0">
            {kidMode && (
              <button
                onClick={handleExitKidMode}
                className="p-1.5 rounded-full bg-red-100 dark:bg-red-950/30 text-red-600 dark:text-red-400 font-black text-[10px] uppercase tracking-tighter border border-red-200 dark:border-red-900"
              >
                🔒 <span className="hidden sm:inline">Keluar</span>
              </button>
            )}

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              aria-label={soundEnabled ? 'Mati Suara' : 'Hidup Suara'}
              className="p-1.5 sm:px-2.5 sm:py-1 rounded-full bg-[#ecf5fe] dark:bg-[#222e38] text-[#00677d] dark:text-[#4cd6fb] hover:scale-105 active:scale-95 transition-all text-xs font-bold flex items-center gap-1 border border-[#00b4d8]/20"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-[#00b4d8]" /> : <VolumeX className="w-4 h-4 text-[#6d797e]" />}
              <span className="hidden sm:inline">{soundEnabled ? 'Suara' : 'Mute'}</span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              aria-label={darkMode ? 'Mode Terang' : 'Mode Gelap'}
              className="p-1.5 sm:px-2.5 sm:py-1 rounded-full bg-[#fdd404]/20 dark:bg-[#ffe171]/20 text-[#705d00] dark:text-[#ffe171] hover:scale-105 active:scale-95 transition-all text-xs font-bold flex items-center gap-1 border border-[#fdd404]/40"
            >
              {darkMode ? <Sun className="w-4 h-4 text-[#ffe171]" /> : <Moon className="w-4 h-4 text-[#705d00]" />}
              <span className="hidden sm:inline">{darkMode ? 'Terang' : 'Gelap'}</span>
            </button>

            {/* Star Counter Badge */}
            <div className="bg-[#fdd404] dark:bg-[#283542] text-[#6f5c00] dark:text-[#ffe171] px-2.5 py-1 rounded-full font-black text-xs sm:text-sm flex items-center gap-1 shadow-xs border border-[#fdd404]/50 dark:border-[#ffe171]/30 hover:scale-105 transition-all">
              <span>{stars}</span>
              <Star className="w-4 h-4 fill-current text-[#705d00] dark:text-[#ffe171]" />
            </div>
          </div>
        </div>

        {/* Optional Progress Bar */}
        {typeof progressBarPercent === 'number' && (
          <div className="w-full bg-[#e0e9f2] dark:bg-[#222e38] h-2 overflow-hidden">
            <div
              className="bg-[#46bd18] h-full transition-all duration-500 ease-out"
              style={{ width: `${Math.min(100, Math.max(0, progressBarPercent))}%` }}
            />
          </div>
        )}
      </header>

      {/* Exit Kid Mode PIN Modal */}
      {showExitKidModal && (
        <ExitKidModeModal onClose={() => setShowExitKidModal(false)} />
      )}
    </>
  );
};

const ExitKidModeModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { setKidMode, setParentAuthenticated, parentSettings } = useApp();
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === parentSettings.parentPin) {
      setKidMode(false);
      setParentAuthenticated(true);
      onClose();
    } else {
      setError(true);
      setPin('');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#1a232b] p-6 rounded-[2rem] border-4 border-[#00677d] w-full max-w-xs space-y-4 animate-in zoom-in duration-300">
        <h3 className="text-xl font-black text-center text-slate-800 dark:text-white">Keluar Mode Anak</h3>
        <p className="text-xs font-bold text-center text-slate-500">Masukkan PIN Orang Tua</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            maxLength={4}
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="w-full text-center text-3xl font-black tracking-widest p-3 rounded-2xl border-4 border-[#00b4d8] bg-slate-50 dark:bg-[#222d37] dark:text-white"
            autoFocus
          />
          {error && <p className="text-[10px] text-red-500 font-bold text-center">PIN Salah!</p>}

          <div className="grid grid-cols-2 gap-2">
            <button type="button" onClick={onClose} className="py-3 bg-slate-100 dark:bg-slate-800 text-slate-600 rounded-xl font-bold text-xs">Batal</button>
            <button type="submit" className="py-3 bg-[#00677d] text-white rounded-xl font-bold text-xs">OK</button>
          </div>
        </form>
      </div>
    </div>
  );
};
