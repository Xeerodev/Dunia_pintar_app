import React from 'react';
import { useApp } from '../context/AppContext';
import { TabType } from '../types';
import { BookOpen, Gamepad2, Award, Users } from 'lucide-react';

export const BottomNavBar: React.FC = () => {
  const { activeTab, setTab } = useApp();

  const navItems: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'belajar', label: 'Belajar', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'main', label: 'Main', icon: <Gamepad2 className="w-5 h-5" /> },
    { id: 'hadiah', label: 'Hadiah', icon: <Award className="w-5 h-5" /> },
    { id: 'ortu', label: 'Ortu', icon: <Users className="w-5 h-5" /> },
  ];

  return (
    <nav className="absolute bottom-2 left-3 right-3 z-50 bg-white/95 dark:bg-[#1a232b]/95 border border-slate-200/80 dark:border-slate-700/60 shadow-[0px_6px_20px_rgba(0,0,0,0.15)] rounded-2xl py-1.5 px-2 backdrop-blur-md transition-colors duration-300">
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-3.5 rounded-xl transition-all duration-200 btn-press ${
                isActive
                  ? 'bg-[#fdd404] dark:bg-[#e2b700] text-[#524400] font-black shadow-xs scale-105'
                  : 'text-[#485661] dark:text-[#a2b4c2] hover:bg-slate-100 dark:hover:bg-[#25323e] font-semibold'
              }`}
            >
              <div className={isActive ? 'scale-110' : ''}>{item.icon}</div>
              <span className="text-[11px] mt-0.5 tracking-tight font-bold">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
