import React, { useState } from 'react';
import { DOA_LIST, ASMAUL_HUSNA_SAMPLE, MASCOT_IMAGES } from '../../data/appData';
import { DoaItem } from '../../types';
import { speakText, playPopSound } from '../../utils/audio';
import { useApp } from '../../context/AppContext';
import { PlayCircle, Volume2, Star, Lock, Sparkles, CheckCircle2 } from 'lucide-react';

export const BelajarReligi: React.FC = () => {
  const [activeTabSection, setActiveTabSection] = useState<'main' | 'doa' | 'asmaul' | 'wudhu'>('main');
  const [selectedDoa, setSelectedDoa] = useState<DoaItem | null>(null);
  const { addStars, soundEnabled } = useApp();

  const handleReadDoa = (doa: DoaItem) => {
    playPopSound();
    setSelectedDoa(doa);
    if (soundEnabled) {
      speakText(`${doa.title}. ${doa.latin}`, 'id-ID');
    }
    addStars(1);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 pb-28">
      {/* Section navigation if inside sub-page */}
      {activeTabSection !== 'main' && (
        <button
          onClick={() => setActiveTabSection('main')}
          className="mb-6 text-[#00677d] dark:text-[#4cd6fb] font-bold flex items-center gap-2 bg-[#ecf5fe] dark:bg-[#293138] px-4 py-2 rounded-full border border-[#00b4d8]/30 btn-press"
        >
          ← Kembali ke Modul Agama
        </button>
      )}

      {activeTabSection === 'main' && (
        <>
          {/* Hero Section matching Screenshot 1 */}
          <section className="mb-10 relative">
            <div className="bg-[#00b4d8] dark:bg-[#00677d] rounded-[2rem] p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border-4 border-[#b3ebff] relative overflow-hidden">
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full -translate-y-1/2 translate-x-1/4 blur-2xl pointer-events-none" />

              <div className="z-10 flex-1 text-center md:text-left">
                <span className="bg-[#fdd404] text-[#6f5c00] px-4 py-1.5 rounded-full font-bold text-sm inline-block mb-4 shadow-sm border-2 border-[#ffe171]">
                  Level 2
                </span>
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
                  Mari Belajar Agama!
                </h1>
                <p className="text-base sm:text-lg text-white/90 mb-6 max-w-md mx-auto md:mx-0">
                  Ikuti perjalanan seru mengenal doa sehari-hari, tata cara ibadah, dan nama-nama Allah yang indah.
                </p>
                <button
                  onClick={() => {
                    playPopSound();
                    setActiveTabSection('doa');
                  }}
                  className="bg-[#00677d] dark:bg-[#001f27] text-white font-bold text-lg px-8 py-3.5 rounded-full shadow-lg btn-press flex items-center gap-2 mx-auto md:mx-0 justify-center border-b-4 border-[#004e5f] hover:brightness-110"
                >
                  <span>Mulai Belajar</span>
                  <PlayCircle className="w-6 h-6 fill-current" />
                </button>
              </div>

              {/* Mascot Representation */}
              <div className="z-10 relative w-56 h-56 sm:w-72 sm:h-72 shrink-0">
                <img
                  src={MASCOT_IMAGES.religi}
                  alt="Pintar Robot Religi"
                  className="w-full h-full object-contain filter drop-shadow-[0_10px_20px_rgba(0,103,125,0.3)]"
                />
                {/* Speech Bubble */}
                <div className="absolute -top-2 -left-6 sm:-left-10 bg-white text-[#141d23] p-3.5 rounded-2xl rounded-br-none shadow-lg border-2 border-[#dbe4ed] text-sm font-bold whitespace-nowrap">
                  Assalamualaikum! 👋
                </div>
              </div>
            </div>
          </section>

          {/* Module Heading */}
          <h2 className="text-2xl font-bold text-[#141d23] dark:text-white mb-6 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-[#00677d] dark:text-[#4cd6fb]" />
            Pilih Modulmu
          </h2>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Card 1: Doa Harian */}
            <div
              onClick={() => {
                playPopSound();
                setActiveTabSection('doa');
              }}
              className="bg-white dark:bg-[#293138] rounded-3xl p-6 shadow-md border-2 border-[#46bd18] relative overflow-hidden flex flex-col cursor-pointer group btn-press hover:-translate-y-1 transition-all"
            >
              <div className="w-14 h-14 bg-[#46bd18] text-white rounded-2xl flex items-center justify-center mb-4 shadow-sm text-2xl font-bold">
                🕌
              </div>
              <h3 className="text-xl font-bold text-[#141d23] dark:text-white mb-2">
                Doa Harian
              </h3>
              <p className="text-sm text-[#3d494d] dark:text-[#bcc9ce] flex-1 mb-6">
                Hafalkan doa sebelum makan, tidur, dan kegiatan lainnya dengan mudah.
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-[#fdd404]">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 text-gray-300 fill-current" />
                </div>
                <div className="bg-[#46bd18]/20 text-[#206d00] dark:text-[#84fe58] font-bold text-xs px-4 py-1.5 rounded-full group-hover:bg-[#46bd18] group-hover:text-white transition-colors">
                  Mulai
                </div>
              </div>
            </div>

            {/* Card 2: Asmaul Husna (Span 2) */}
            <div
              onClick={() => {
                playPopSound();
                setActiveTabSection('asmaul');
              }}
              className="bg-white dark:bg-[#293138] rounded-3xl p-6 shadow-md border-2 border-[#00b4d8] relative overflow-hidden flex flex-col cursor-pointer group btn-press hover:-translate-y-1 transition-all lg:col-span-2"
            >
              <div className="flex flex-col sm:flex-row gap-6 h-full">
                <div className="flex-1 flex flex-col justify-center">
                  <div className="w-14 h-14 bg-[#00b4d8] text-white rounded-2xl flex items-center justify-center mb-4 shadow-sm text-2xl font-bold">
                    ✨
                  </div>
                  <h3 className="text-xl font-bold text-[#141d23] dark:text-white mb-2">
                    Asmaul Husna
                  </h3>
                  <p className="text-sm text-[#3d494d] dark:text-[#bcc9ce] mb-4">
                    Mengenal 99 nama Allah yang indah melalui lagu dan cerita interaktif.
                  </p>

                  <div className="w-full bg-[#dbe4ed] dark:bg-[#1f2931] rounded-full h-3.5 mb-2 overflow-hidden border border-[#bcc9ce]/40">
                    <div className="bg-[#fdd404] h-full rounded-full" style={{ width: '45%' }} />
                  </div>
                  <div className="flex justify-between font-bold text-xs text-[#3d494d] dark:text-[#bcc9ce]">
                    <span>Progres: 45%</span>
                    <span>45/99 Nama</span>
                  </div>
                </div>
                <div className="hidden sm:flex shrink-0 w-36 h-36 bg-[#ecf5fe] dark:bg-[#1f2931] rounded-2xl items-center justify-center border-2 border-[#00b4d8]/30">
                  <span className="text-5xl">🌟</span>
                </div>
              </div>
            </div>

            {/* Card 3: Wudhu & Salat */}
            <div
              onClick={() => {
                playPopSound();
                setActiveTabSection('wudhu');
              }}
              className="bg-white dark:bg-[#293138] rounded-3xl p-6 shadow-md border-2 border-[#fdd404] relative overflow-hidden flex flex-col cursor-pointer group btn-press hover:-translate-y-1 transition-all"
            >
              <div className="w-14 h-14 bg-[#fdd404] text-[#6f5c00] rounded-2xl flex items-center justify-center mb-4 shadow-sm text-2xl font-bold">
                🧼
              </div>
              <div className="flex gap-2 mb-2">
                <span className="bg-[#ffdad6] text-[#93000a] px-2.5 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                  BARU!
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#141d23] dark:text-white mb-2">
                Wudhu & Salat
              </h3>
              <p className="text-sm text-[#3d494d] dark:text-[#bcc9ce] flex-1 mb-6">
                Panduan gerakan dan bacaan interaktif bersama Pintar.
              </p>
              <div className="bg-[#fdd404]/30 text-[#6f5c00] dark:text-[#ffe171] font-bold text-xs px-4 py-2 rounded-full w-full text-center group-hover:bg-[#fdd404] transition-colors">
                Panduan Interaktif
              </div>
            </div>

            {/* Card 4: Kisah Nabi (Locked) */}
            <div className="bg-white/70 dark:bg-[#293138]/70 rounded-3xl p-6 shadow-sm border-2 border-[#dbe4ed] dark:border-white/10 relative overflow-hidden flex flex-col opacity-75">
              <div className="w-14 h-14 bg-[#dbe4ed] dark:bg-[#1f2931] text-[#6d797e] rounded-2xl flex items-center justify-center mb-4 text-2xl">
                📖
              </div>
              <h3 className="text-xl font-bold text-[#141d23] dark:text-white mb-2">
                Kisah Nabi
              </h3>
              <p className="text-sm text-[#3d494d] dark:text-[#bcc9ce] flex-1 mb-6">
                Segera hadir! Cerita teladan para Nabi.
              </p>
              <div className="flex items-center justify-center text-[#6d797e]">
                <Lock className="w-6 h-6" />
              </div>
            </div>
          </div>
        </>
      )}

      {/* Doa Harian Detail View */}
      {activeTabSection === 'doa' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-[#00677d] dark:text-[#4cd6fb] mb-4">
            Doa-Doa Harian Anak
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DOA_LIST.map((doa) => (
              <div
                key={doa.id}
                onClick={() => handleReadDoa(doa)}
                className="bg-white dark:bg-[#293138] rounded-3xl p-5 border-2 border-[#00b4d8] shadow-md hover:scale-[1.01] transition-transform cursor-pointer"
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-bold text-lg text-[#00677d] dark:text-[#4cd6fb]">
                    {doa.title}
                  </h3>
                  <button className="p-2 rounded-full bg-[#00b4d8]/20 text-[#00677d] dark:text-[#4cd6fb] hover:scale-110 transition-all">
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>
                <div
                  className="text-right text-2xl font-semibold mb-3 leading-loose text-[#141d23] dark:text-white"
                  dir="rtl"
                >
                  {doa.arabic}
                </div>
                <div className="text-xs font-semibold text-[#00677d] dark:text-[#4cd6fb] italic mb-2">
                  "{doa.latin}"
                </div>
                <div className="text-xs text-[#3d494d] dark:text-[#bcc9ce]">
                  {doa.translation}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Asmaul Husna Detail View */}
      {activeTabSection === 'asmaul' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-[#00677d] dark:text-[#4cd6fb] mb-4">
            99 Asmaul Husna (Nama-Nama Allah)
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {ASMAUL_HUSNA_SAMPLE.map((item) => (
              <div
                key={item.number}
                onClick={() => {
                  playPopSound();
                  if (soundEnabled) speakText(`${item.latin}. ${item.meaning}`, 'id-ID');
                  addStars(1);
                }}
                className="bg-white dark:bg-[#293138] rounded-2xl p-4 border-2 border-[#fdd404] shadow-sm text-center cursor-pointer btn-press hover:bg-[#fdd404]/10 transition-colors"
              >
                <span className="text-xs font-bold text-[#705d00] dark:text-[#ffe171] bg-[#fdd404]/30 px-2 py-0.5 rounded-full inline-block mb-2">
                  #{item.number}
                </span>
                <div className="text-2xl font-bold mb-1 text-[#141d23] dark:text-white">
                  {item.arabic}
                </div>
                <div className="text-sm font-bold text-[#00677d] dark:text-[#4cd6fb]">
                  {item.latin}
                </div>
                <div className="text-xs text-[#3d494d] dark:text-[#bcc9ce]">
                  {item.meaning}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Wudhu & Salat Guide */}
      {activeTabSection === 'wudhu' && (
        <div className="bg-white dark:bg-[#293138] rounded-3xl p-6 border-4 border-[#fdd404] shadow-xl text-center max-w-xl mx-auto space-y-4">
          <div className="text-5xl mb-2">🧼</div>
          <h2 className="text-2xl font-bold text-[#141d23] dark:text-white">
            Panduan Wudhu & Salat Anak
          </h2>
          <p className="text-sm text-[#3d494d] dark:text-[#bcc9ce]">
            Ikuti 6 langkah mudah wudhu dengan tertib:
          </p>
          <div className="space-y-2 text-left text-sm font-medium">
            <div className="p-3 bg-[#ecf5fe] dark:bg-[#1f2931] rounded-xl flex items-center gap-3">
              <span className="w-7 h-7 rounded-full bg-[#00b4d8] text-white flex items-center justify-center font-bold text-xs shrink-0">1</span>
              <span>Mencuci kedua telapak tangan & membaca Bismillah</span>
            </div>
            <div className="p-3 bg-[#ecf5fe] dark:bg-[#1f2931] rounded-xl flex items-center gap-3">
              <span className="w-7 h-7 rounded-full bg-[#00b4d8] text-white flex items-center justify-center font-bold text-xs shrink-0">2</span>
              <span>Berkumur dan membersihkan hidung</span>
            </div>
            <div className="p-3 bg-[#ecf5fe] dark:bg-[#1f2931] rounded-xl flex items-center gap-3">
              <span className="w-7 h-7 rounded-full bg-[#00b4d8] text-white flex items-center justify-center font-bold text-xs shrink-0">3</span>
              <span>Membasuh muka dengan air bersih</span>
            </div>
            <div className="p-3 bg-[#ecf5fe] dark:bg-[#1f2931] rounded-xl flex items-center gap-3">
              <span className="w-7 h-7 rounded-full bg-[#00b4d8] text-white flex items-center justify-center font-bold text-xs shrink-0">4</span>
              <span>Membasuh kedua tangan sampai siku</span>
            </div>
          </div>
          <button
            onClick={() => {
              playPopSound();
              addStars(2);
              if (soundEnabled) speakText('Wudhu selesai! Kamu anak yang soleh!', 'id-ID');
            }}
            className="w-full bg-[#46bd18] text-white font-bold py-3 rounded-full shadow-md btn-press flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-5 h-5" />
            Selesai Belajar Wudhu (+2 ⭐)
          </button>
        </div>
      )}
    </div>
  );
};
