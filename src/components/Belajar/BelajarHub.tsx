import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SubModuleType } from '../../types';
import { MASCOT_IMAGES } from '../../data/appData';
import { BelajarHuruf } from './BelajarHuruf';
import { BelajarAngka } from './BelajarAngka';
import { DuniaSekitar } from './DuniaSekitar';
import { BelajarReligi } from './BelajarReligi';
import { EnglishFlashcards } from './EnglishFlashcards';
import { Sparkles, Languages, Hash, Globe, BookOpen, Star, Play } from 'lucide-react';
import { KidActivityModal } from '../KidActivityModal';

export const BelajarHub: React.FC = () => {
  const { activeSubModule, setSubModule, parentSettings } = useApp();
  const [activeModalItem, setActiveModalItem] = useState<any>(null);

  if (activeSubModule === 'huruf') return <BelajarHuruf />;
  if (activeSubModule === 'angka') return <BelajarAngka />;
  if (activeSubModule === 'dunia-sekitar') return <DuniaSekitar />;
  if (activeSubModule === 'religi') return <BelajarReligi />;
  if (activeSubModule === 'english') return <EnglishFlashcards />;

  const modules: {
    id: SubModuleType;
    title: string;
    desc: string;
    icon: React.ReactNode;
    image: string;
    borderColor: string;
    shadowColor: string;
    iconBg: string;
    textColor: string;
  }[] = [
    {
      id: 'huruf',
      title: 'Belajar Huruf A - Z',
      desc: 'Mengenal alfabet & kata pertama',
      icon: <Languages className="w-5 h-5" />,
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&auto=format&fit=crop&q=80',
      borderColor: 'border-[#00b4d8]',
      shadowColor: 'shadow-[0px_3px_0px_0px_rgba(0,180,216,1)]',
      iconBg: 'bg-[#b3ebff] text-[#001f27]',
      textColor: 'text-[#00677d]',
    },
    {
      id: 'angka',
      title: 'Belajar Angka & Berhitung',
      desc: 'Menghitung 1, 2, 3 bersama hewan',
      icon: <Hash className="w-5 h-5" />,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9vLp3235u_SEkJHv3QrCnhr7ZfS1JKybJkpcfshMdXK4rcqWptJ4ngK2yCI3TCCGwPENNRy7YnugVfriuqU0aimc2cyYGWFgZMuNediSL6gTMmDNWO0Pp0vFR7YX-Xvn9CgEXdTZPDq04OuW286wr38yt0ujIC1tOjRgZaVBIvluWduryeKUPdTTHioRBsZtHOFapPjr08MaBh4omiR_7XmdrzFg2MwjuoZzv8BH7967l-yqHWOb',
      borderColor: 'border-[#fdd404]',
      shadowColor: 'shadow-[0px_3px_0px_0px_rgba(253,212,4,1)]',
      iconBg: 'bg-[#ffe171] text-[#221b00]',
      textColor: 'text-[#705d00]',
    },
    {
      id: 'dunia-sekitar',
      title: 'Dunia Sekitar & Hewan',
      desc: 'Mengenal suara & nama hewan',
      icon: <Globe className="w-5 h-5" />,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCnZPG2vztsBC5-2NoOb4iuTtYrj7dI0RYqWeah-wNF5A97_vkGs-aLvUJBXgKQ4iSRBYMer-o1wEhxA6mWnlBraGUTstMLf7G8PvPdQu9cwoybMCU9smOXdwpRwTqWDxywsoqjiO_XwDjzN3h9uhawKZEoFGSTvgLlbmFgrP0bvybCPAMjmUjSi041X58iSdSUcKIfcppdFT3fzCYpyhQMkIUQ2Xynu70X7QKtvetX5r8gFWStD7Bc',
      borderColor: 'border-[#46bd18]',
      shadowColor: 'shadow-[0px_3px_0px_0px_rgba(70,189,24,1)]',
      iconBg: 'bg-[#84fe58] text-[#052100]',
      textColor: 'text-[#206d00]',
    },
    {
      id: 'religi',
      title: 'Belajar Religi & Doa',
      desc: 'Doa harian & Asmaul Husna',
      icon: <BookOpen className="w-5 h-5" />,
      image: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=300&auto=format&fit=crop&q=80',
      borderColor: 'border-[#38bdf8]',
      shadowColor: 'shadow-[0px_3px_0px_0px_rgba(56,189,248,1)]',
      iconBg: 'bg-[#38bdf8]/20 text-[#0284c7]',
      textColor: 'text-[#0284c7]',
    },
    {
      id: 'english',
      title: 'Bahasa Inggris Ceria',
      desc: 'English Flashcards & Pengucapan',
      icon: <Sparkles className="w-5 h-5" />,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxLhWGtpVegyTB7fIEZ8T622YYYPUXzN4lxGU7hcDd-n86voa21rg14S0u58WCUYlzXB-YsITuTjHdXrNCm0C5z1pJTNbgDfYqAarcVHSDMNFCBheozJKemcrJT1XHYC2IsQ3sdYBS5Rw9qvN6-j0BJTGo26UV_fr5Rs5a-64efiu7DocUza1_9Jb3Ia_RStHOu6kGM6SqNWfNP8nrW9N80nYayBhlXzcSy4MAscDTgH3GqEvd1Vpf',
      borderColor: 'border-[#f43f5e]',
      shadowColor: 'shadow-[0px_3px_0px_0px_rgba(244,63,94,1)]',
      iconBg: 'bg-[#f43f5e]/20 text-[#e11d48]',
      textColor: 'text-[#e11d48]',
    },
  ];

  // Combine parent recommendations and custom items for Belajar tab
  const parentAddedRecs = (parentSettings.recommendations || []).filter((r) => r.added);
  const parentCustomItems = (parentSettings.customItems || []).filter(
    (c) => c.category === 'belajar' || c.category === 'both'
  );

  return (
    <div className="space-y-4">
      {/* Hero Section */}
      <section className="relative bg-[#00b4d8] dark:bg-[#005266] rounded-2xl p-4 flex items-center justify-between gap-3 shadow-[0px_4px_0px_0px_rgba(0,82,102,0.3)] overflow-hidden">
        <div className="z-10 flex-1 space-y-1.5">
          <div className="inline-block bg-white dark:bg-[#1f2931] px-3 py-1 rounded-2xl rounded-tl-none shadow-xs">
            <h2 className="text-lg font-black text-[#00677d] dark:text-[#4cd6fb] m-0">
              Ayo Belajar Pintar! 🌟
            </h2>
          </div>
          <p className="text-xs text-white font-bold leading-snug">
            Pilih gambar modul di bawah ini untuk belajar sambil bermain!
          </p>
        </div>
        <div className="z-10 w-22 h-22 relative shrink-0">
          <img
            src={MASCOT_IMAGES.default}
            alt="Mascot Pintar waving"
            className="w-full h-full object-contain filter drop-shadow-md floating-anim"
          />
        </div>
      </section>

      {/* Parent Added Items Section (if any) */}
      {(parentAddedRecs.length > 0 || parentCustomItems.length > 0) && (
        <section className="bg-amber-50 dark:bg-amber-950/30 p-3.5 rounded-2xl border-2 border-amber-400/80 shadow-xs space-y-2.5">
          <div className="flex items-center gap-1.5">
            <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
            <h3 className="text-xs font-black text-amber-900 dark:text-amber-200 uppercase tracking-wider">
              Tugas & Materi dari Orang Tua:
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-2">
            {parentAddedRecs.map((rec) => (
              <button
                key={rec.id}
                onClick={() =>
                  setActiveModalItem({
                    id: rec.id,
                    title: rec.title,
                    desc: rec.desc || 'Materi rekomendasi spesial dari Orang Tua.',
                    image: rec.image,
                  })
                }
                className="bg-white dark:bg-[#1a232b] p-2.5 rounded-xl border-2 border-amber-300 dark:border-amber-700 flex items-center gap-3 text-left hover:scale-[1.01] transition-transform btn-press shadow-xs"
              >
                <img src={rec.image} alt={rec.title} className="w-12 h-12 rounded-lg object-cover shrink-0 bg-slate-100" />
                <div className="flex-1 min-w-0">
                  <span className="text-[9px] font-black uppercase tracking-wider bg-amber-400 text-amber-950 px-2 py-0.5 rounded-md inline-block mb-0.5">
                    Spesial Ortunya {parentSettings.childName}
                  </span>
                  <h4 className="text-xs font-extrabold text-slate-800 dark:text-white truncate">
                    {rec.title}
                  </h4>
                  <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400 truncate">
                    Klik untuk mulai latihan interaktif!
                  </p>
                </div>
                <div className="bg-[#00677d] text-white p-1.5 rounded-lg shrink-0">
                  <Play className="w-3.5 h-3.5 fill-current" />
                </div>
              </button>
            ))}

            {parentCustomItems.map((item) => (
              <button
                key={item.id}
                onClick={() =>
                  setActiveModalItem({
                    id: item.id,
                    title: item.title,
                    desc: item.desc,
                    image: item.image,
                  })
                }
                className="bg-white dark:bg-[#1a232b] p-2.5 rounded-xl border-2 border-[#00b4d8] flex items-center gap-3 text-left hover:scale-[1.01] transition-transform btn-press shadow-xs"
              >
                <img src={item.image} alt={item.title} className="w-12 h-12 rounded-lg object-cover shrink-0 bg-slate-100" />
                <div className="flex-1 min-w-0">
                  <span className="text-[9px] font-black uppercase tracking-wider bg-[#00b4d8] text-white px-2 py-0.5 rounded-md inline-block mb-0.5">
                    Modul Tambahan Ortu
                  </span>
                  <h4 className="text-xs font-extrabold text-slate-800 dark:text-white truncate">
                    {item.title}
                  </h4>
                  <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400 truncate">
                    {item.desc}
                  </p>
                </div>
                <div className="bg-[#46bd18] text-white p-1.5 rounded-lg shrink-0">
                  <Play className="w-3.5 h-3.5 fill-current" />
                </div>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Main Learning Modules Grid with Attractive Image Previews */}
      <section>
        <h3 className="text-xs font-black text-[#00677d] dark:text-[#4cd6fb] mb-2.5 uppercase tracking-wider">
          Pilih Modul Belajar Utama:
        </h3>
        <div className="grid grid-cols-1 gap-2.5">
          {modules.map((m) => (
            <button
              key={m.id}
              onClick={() => setSubModule(m.id)}
              className={`group relative bg-white dark:bg-[#1a232b] rounded-2xl p-2.5 border-2 ${m.borderColor} ${m.shadowColor} flex items-center gap-3 overflow-hidden text-left hover:bg-slate-50 dark:hover:bg-[#222d37] transition-all btn-press`}
            >
              <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-slate-200 dark:border-slate-700 bg-slate-100 relative">
                <img src={m.image} alt={m.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                <div className={`absolute top-1 left-1 p-1 rounded-md ${m.iconBg}`}>
                  {m.icon}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs sm:text-sm font-black text-slate-800 dark:text-slate-100 mb-0.5 truncate">
                  {m.title}
                </h4>
                <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 truncate">
                  {m.desc}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Modal for Parent Created/Recommended Kid Activity */}
      {activeModalItem && (
        <KidActivityModal
          item={activeModalItem}
          onClose={() => setActiveModalItem(null)}
        />
      )}
    </div>
  );
};

