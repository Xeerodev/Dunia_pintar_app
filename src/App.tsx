import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { BottomNavBar } from './components/BottomNavBar';
import { BelajarHub } from './components/Belajar/BelajarHub';
import { MainGamesHub } from './components/Main/MainGamesHub';
import { HadiahView } from './components/Hadiah/HadiahView';
import { ParentDashboard } from './components/Ortu/ParentDashboard';
import { Wifi, Battery } from 'lucide-react';

const MainContent: React.FC = () => {
  const { activeTab } = useApp();

  return (
    <div className="min-h-screen bg-[#dce7f2] dark:bg-[#070b0e] flex justify-center items-start selection:bg-[#00b4d8] selection:text-white antialiased transition-colors duration-300">
      {/* Android Game Phone Frame Container */}
      <div className="w-full max-w-md min-h-screen sm:min-h-[92vh] sm:my-3 sm:rounded-[32px] bg-[#f4f8fc] dark:bg-[#0f171d] text-[#141d23] dark:text-[#f4f8fc] shadow-2xl overflow-hidden relative flex flex-col border-0 sm:border-4 border-slate-300/60 dark:border-slate-800 transition-colors duration-300">
        
        {/* Android Status Bar (Shown on desktop/tablet frame) */}
        <div className="hidden sm:flex items-center justify-between px-5 py-1.5 bg-white/90 dark:bg-[#141d23]/90 backdrop-blur-sm text-[11px] font-bold text-slate-500 dark:text-slate-400 select-none border-b border-slate-100 dark:border-slate-800/80 shrink-0 z-50">
          <span>09:41</span>
          <div className="w-20 h-3.5 bg-slate-900 dark:bg-slate-700 rounded-full mx-auto -mt-0.5 opacity-80" />
          <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
            <Wifi className="w-3.5 h-3.5" />
            <Battery className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Playful Background Pattern */}
        <div className="absolute inset-0 bg-pattern-dots opacity-20 dark:opacity-10 pointer-events-none z-0" />

        {/* Top Header Bar */}
        <Header />

        {/* Main View Container */}
        <main className="relative z-10 flex-1 overflow-y-auto pb-24 px-3 sm:px-4 py-3">
          {activeTab === 'belajar' && <BelajarHub />}
          {activeTab === 'main' && <MainGamesHub />}
          {activeTab === 'hadiah' && <HadiahView />}
          {activeTab === 'ortu' && <ParentDashboard />}
        </main>

        {/* Bottom Floating Navigation Dock */}
        <BottomNavBar />
      </div>
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

export default App;

