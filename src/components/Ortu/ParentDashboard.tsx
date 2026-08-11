import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { playPopSound, speakText } from '../../utils/audio';
import { Settings, Clock, Timer, School, Lightbulb, PlusCircle, CheckCircle, Trash2, Sparkles, ShieldCheck } from 'lucide-react';
import { CustomContentItem } from '../../types';

const PRESET_IMAGES = [
  { label: 'Hewan Liar', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCnZPG2vztsBC5-2NoOb4iuTtYrj7dI0RYqWeah-wNF5A97_vkGs-aLvUJBXgKQ4iSRBYMer-o1wEhxA6mWnlBraGUTstMLf7G8PvPdQu9cwoybMCU9smOXdwpRwTqWDxywsoqjiO_XwDjzN3h9uhawKZEoFGSTvgLlbmFgrP0bvybCPAMjmUjSi041X58iSdSUcKIfcppdFT3fzCYpyhQMkIUQ2Xynu70X7QKtvetX5r8gFWStD7Bc' },
  { label: 'Eja Kata', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxLhWGtpVegyTB7fIEZ8T622YYYPUXzN4lxGU7hcDd-n86voa21rg14S0u58WCUYlzXB-YsITuTjHdXrNCm0C5z1pJTNbgDfYqAarcVHSDMNFCBheozJKemcrJT1XHYC2IsQ3sdYBS5Rw9qvN6-j0BJTGo26UV_fr5Rs5a-64efiu7DocUza1_9Jb3Ia_RStHOu6kGM6SqNWfNP8nrW9N80nYayBhlXzcSy4MAscDTgH3GqEvd1Vpf' },
  { label: 'Matematika', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9vLp3235u_SEkJHv3QrCnhr7ZfS1JKybJkpcfshMdXK4rcqWptJ4ngK2yCI3TCCGwPENNRy7YnugVfriuqU0aimc2cyYGWFgZMuNediSL6gTMmDNWO0Pp0vFR7YX-Xvn9CgEXdTZPDq04OuW286wr38yt0ujIC1tOjRgZaVBIvluWduryeKUPdTTHioRBsZtHOFapPjr08MaBh4omiR_7XmdrzFg2MwjuoZzv8BH7967l-yqHWOb' },
  { label: 'Mewarnai', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWp3mu4KqaYm1Z_RK5_UG1xODK5d4rma5JDY7E_xEPvghvJlr-66JX8vTkCTZrPnCowXPOz7jsILVJtmh9tIF2qcrmX7vcCT59QZlS8_KTsqD_UOy55SsPUAc3Eaae4xpC-zfsx2mzGlBNnaYxKqNpRkUJhE6SBeTIxoBgZHoFyX8DTXBNgiDFly7tbz5Ezb16z_9c9CkcEVTr6bCTEzs7zRWsCk1hyHnjGPGCzPtPlCo56QU0TabM' },
];

export const ParentDashboard: React.FC = () => {
  const {
    parentSettings,
    updateParentSettings,
    addCustomItem,
    removeCustomItem,
    toggleRecommendation,
    soundEnabled,
    kidMode,
    setKidMode,
    isParentAuthenticated,
    setParentAuthenticated
  } = useApp();

  const [pinInput, setPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<boolean>(false);

  // New Custom Content Form State
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newDesc, setNewDesc] = useState<string>('');
  const [newCategory, setNewCategory] = useState<'belajar' | 'main' | 'both'>('both');
  const [newType, setNewType] = useState<'quiz' | 'flashcard' | 'story'>('quiz');
  const [selectedImg, setSelectedImg] = useState<string>(PRESET_IMAGES[0].url);

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === parentSettings.parentPin) {
      playPopSound();
      setParentAuthenticated(true);
      setPinInput('');
      setPinError(false);
    } else {
      setPinError(true);
      setPinInput('');
    }
  };

  const handleToggleKidMode = () => {
    playPopSound();
    setKidMode(!kidMode);
  };

  if (!isParentAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center p-6 space-y-6 animate-in fade-in duration-500">
        <div className="w-20 h-20 bg-[#00677d] text-white rounded-3xl flex items-center justify-center shadow-xl">
          <ShieldCheck className="w-10 h-10" />
        </div>
        <div className="text-center">
          <h2 className="text-xl font-black text-slate-800 dark:text-white">Area Orang Tua</h2>
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-1">Masukkan PIN untuk masuk (Default: 1234)</p>
        </div>

        <form onSubmit={handlePinSubmit} className="w-full max-w-xs space-y-4">
          <input
            type="password"
            maxLength={4}
            value={pinInput}
            onChange={(e) => setPinInput(e.target.value)}
            className="w-full text-center text-2xl font-black tracking-widest p-4 rounded-2xl border-4 border-[#00b4d8] bg-white dark:bg-[#1a232b] dark:text-white focus:outline-none"
            placeholder="****"
            autoFocus
          />
          {pinError && (
            <p className="text-xs text-red-500 font-bold text-center animate-bounce">PIN Salah! Silakan coba lagi.</p>
          )}
          <button
            type="submit"
            className="w-full py-4 bg-[#00677d] text-white font-black rounded-2xl shadow-lg btn-press"
          >
            Masuk Sekarang
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-28">
      {/* Header Section */}
      <div className="bg-white dark:bg-[#1a232b] p-4 rounded-3xl border border-slate-200 dark:border-slate-700/80 shadow-xs space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-black text-slate-800 dark:text-white leading-tight">
              Dashboard Orang Tua
            </h2>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Atur & Tambahkan Materi untuk {parentSettings.childName}
            </p>
          </div>
          <button
            onClick={() => setParentAuthenticated(false)}
            className="text-[10px] font-black text-red-500 uppercase tracking-wider hover:underline"
          >
            Keluar Dashboard
          </button>
        </div>

        <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-[#222d37] rounded-2xl border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2">
            <ShieldCheck className={`w-5 h-5 ${kidMode ? 'text-green-500' : 'text-slate-400'}`} />
            <div className="text-left">
              <span className="block text-[11px] font-black text-slate-800 dark:text-white uppercase tracking-tight">Mode Anak (Kid Mode)</span>
              <span className="text-[10px] text-slate-500 font-bold">{kidMode ? 'Aktif: Tab Ortu Disembunyikan' : 'Nonaktif: Semua Tab Terlihat'}</span>
            </div>
          </div>
          <button
            onClick={handleToggleKidMode}
            className={`w-12 h-6 rounded-full transition-colors relative ${kidMode ? 'bg-green-500' : 'bg-slate-300'}`}
          >
            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${kidMode ? 'left-7' : 'left-1'}`} />
          </button>
        </div>
      </div>

      {/* Direct Add Content for Kids Section */}
      <div className="bg-gradient-to-r from-[#00b4d8]/15 via-[#46bd18]/15 to-[#fdd404]/15 dark:from-[#005266]/40 dark:to-[#705d00]/40 p-4 rounded-2xl border-2 border-[#00b4d8] shadow-xs">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#00677d] dark:text-[#4cd6fb]" />
            <h3 className="text-sm font-black text-slate-800 dark:text-white">
              Tambah Materi & Game Anak
            </h3>
          </div>
          <button
            onClick={() => {
              playPopSound();
              setShowAddForm(!showAddForm);
            }}
            className="bg-[#46bd18] hover:bg-[#3ca513] text-white font-extrabold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1 shadow-xs transition-all btn-press"
          >
            <PlusCircle className="w-4 h-4" />
            {showAddForm ? 'Tutup Form' : '+ Tambah Baru'}
          </button>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
          Setiap modul atau game yang ditambahkan oleh Orang Tua akan <strong>langsung muncul di halaman Belajar dan Main</strong> anak dengan ikon gambar menarik!
        </p>

        {/* Add Custom Form */}
        {showAddForm && (
          <form onSubmit={handleCreateCustomItem} className="mt-3 bg-white dark:bg-[#1a232b] p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                Judul Materi / Game:
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: Kuis Berhitung Hewan"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full text-xs p-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-[#222d37] dark:text-white focus:outline-none focus:border-[#00b4d8]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                Deskripsi Singkat:
              </label>
              <input
                type="text"
                placeholder="Contoh: Bermain angka dan belajar sambil gembira"
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                className="w-full text-xs p-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-[#222d37] dark:text-white focus:outline-none focus:border-[#00b4d8]"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Muncul di Mana:
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-[#222d37] dark:text-white font-bold"
                >
                  <option value="both">Belajar & Main (Keduanya)</option>
                  <option value="belajar">Menu Belajar Saja</option>
                  <option value="main">Menu Main Saja</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Tipe Permainan:
                </label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value as any)}
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-[#222d37] dark:text-white font-bold"
                >
                  <option value="quiz">Kuis Pilihan Ganda</option>
                  <option value="flashcard">Kartu Bergambar</option>
                  <option value="story">Cerita Interaktif</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                Pilih Gambar Thumbnail:
              </label>
              <div className="grid grid-cols-4 gap-2">
                {PRESET_IMAGES.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImg(img.url)}
                    className={`relative rounded-lg overflow-hidden border-2 h-14 ${
                      selectedImg === img.url ? 'border-[#00b4d8] ring-2 ring-[#00b4d8]/40 scale-105' : 'border-slate-200 opacity-70'
                    }`}
                  >
                    <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                    <span className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[9px] font-bold truncate px-0.5 text-center">
                      {img.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#00677d] hover:bg-[#005266] text-white font-extrabold py-2.5 rounded-xl text-xs shadow-xs btn-press"
            >
              Simpan & Tampilkan di Aplikasi Anak
            </button>
          </form>
        )}

        {/* List of Custom Added Items */}
        {parentSettings.customItems && parentSettings.customItems.length > 0 && (
          <div className="mt-3 space-y-2">
            <h4 className="text-xs font-black text-[#00677d] dark:text-[#4cd6fb] uppercase tracking-wider">
              Modul Tambahan Aktif ({parentSettings.customItems.length}):
            </h4>
            {parentSettings.customItems.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-[#1a232b] p-2.5 rounded-xl border border-slate-200 dark:border-slate-700/80 flex items-center gap-2.5 shadow-xs"
              >
                <img src={item.image} alt={item.title} className="w-10 h-10 rounded-lg object-cover bg-slate-100 shrink-0" />
                <div className="flex-1 min-w-0">
                  <h5 className="font-extrabold text-xs text-slate-800 dark:text-white truncate">
                    {item.title}
                  </h5>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                    Tampil di: <span className="font-bold text-[#00b4d8]">{item.category.toUpperCase()}</span>
                  </p>
                </div>
                <button
                  onClick={() => removeCustomItem(item.id)}
                  className="p-1.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition-colors"
                  title="Hapus Modul"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Grid Layout */}
      <div className="space-y-3">
        {/* Learning Time Bar Chart */}
        <div className="bg-white dark:bg-[#1a232b] rounded-2xl p-4 shadow-xs border border-slate-200 dark:border-slate-700/80">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-extrabold text-[#00677d] dark:text-[#4cd6fb] flex items-center gap-1.5">
              <Clock className="w-4 h-4 stroke-[2.5]" />
              Waktu Belajar (Jam)
            </h3>
            <span className="bg-[#00b4d8]/20 text-[#00677d] dark:text-[#4cd6fb] font-bold px-2.5 py-0.5 rounded-full text-[10px]">
              Minggu Ini
            </span>
          </div>

          {/* Bar Chart Area */}
          <div className="h-32 w-full flex items-end justify-around gap-2 px-2 pb-1 border-b border-slate-200 dark:border-slate-700 relative z-10">
            {parentSettings.weeklyTime.map((item, idx) => {
              const maxHours = 4;
              const heightPercent = Math.min(100, (item.hours / maxHours) * 100);
              const isHighlight = item.day === 'Rab';
              return (
                <div
                  key={idx}
                  className="w-1/6 flex flex-col items-center group relative h-full justify-end"
                >
                  <div className="absolute -top-7 bg-slate-800 text-white text-[10px] py-0.5 px-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity font-bold pointer-events-none">
                    {item.hours}j
                  </div>
                  <div
                    className={`w-full rounded-t-md transition-all duration-300 ${
                      isHighlight
                        ? 'bg-[#00b4d8]'
                        : 'bg-[#46bd18]'
                    }`}
                    style={{ height: `${heightPercent}%` }}
                  />
                </div>
              );
            })}
          </div>

          <div className="flex justify-around mt-2 text-xs font-bold text-slate-600 dark:text-slate-300">
            {parentSettings.weeklyTime.map((item, idx) => (
              <span
                key={idx}
                className={item.day === 'Rab' ? 'text-[#00677d] dark:text-[#4cd6fb] font-black' : ''}
              >
                {item.day}
              </span>
            ))}
          </div>
        </div>

        {/* Screen Time Limits */}
        <div className="bg-white dark:bg-[#1a232b] rounded-2xl p-4 shadow-xs border border-slate-200 dark:border-slate-700/80">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-[#ffdad6] text-[#93000a] rounded-full flex items-center justify-center font-bold shrink-0">
              <Timer className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-extrabold text-slate-800 dark:text-white">
              Batas Waktu Layar
            </h3>
          </div>

          <div className="flex justify-between items-end mb-1">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Sisa hari ini
            </span>
            <span className="text-lg font-black text-[#be123c] dark:text-[#f43f5e]">
              {parentSettings.remainingMinutes} Menit
            </span>
          </div>

          <div className="w-full bg-slate-100 dark:bg-[#25323e] rounded-full h-2.5 mb-4 overflow-hidden">
            <div className="bg-[#be123c] h-full rounded-full" style={{ width: '75%' }} />
          </div>

          <div className="space-y-2">
            <label className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-[#222d37] rounded-xl border border-slate-200/60 dark:border-slate-700/60 cursor-pointer">
              <span className="text-xs font-bold text-slate-800 dark:text-white">
                Kunci setelah 2 jam
              </span>
              <input
                type="checkbox"
                checked={parentSettings.lockAfter2Hours}
                onChange={handleToggleLock}
                className="w-4 h-4 accent-[#00677d] rounded cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-[#222d37] rounded-xl border border-slate-200/60 dark:border-slate-700/60 cursor-pointer">
              <span className="text-xs font-bold text-slate-800 dark:text-white">
                Mode Tidur ({parentSettings.bedtimeStart})
              </span>
              <input
                type="checkbox"
                checked={parentSettings.bedtimeMode}
                onChange={handleToggleBedtime}
                className="w-4 h-4 accent-[#00677d] rounded cursor-pointer"
              />
            </label>
          </div>
        </div>

        {/* Subject Progress */}
        <div className="bg-white dark:bg-[#1a232b] rounded-2xl p-4 shadow-xs border border-slate-200 dark:border-slate-700/80">
          <h3 className="text-sm font-extrabold text-slate-800 dark:text-white flex items-center gap-1.5 mb-3">
            <School className="w-4 h-4 text-[#46bd18]" />
            Progres Belajar
          </h3>

          <div className="space-y-2.5">
            {parentSettings.subjectProgress.map((sub, idx) => (
              <div
                key={idx}
                className="p-2.5 bg-slate-50 dark:bg-[#222d37] rounded-xl border border-slate-200/60 dark:border-slate-700/60 flex items-center gap-3"
              >
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 font-bold text-white text-sm"
                  style={{ backgroundColor: sub.color }}
                >
                  📐
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-extrabold text-xs text-slate-800 dark:text-white truncate mb-1">
                    {sub.name}
                  </h4>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${sub.percent}%`, backgroundColor: sub.color }}
                    />
                  </div>
                </div>
                <span className="font-bold text-xs text-[#00677d] dark:text-[#4cd6fb]">
                  {sub.percent}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-white dark:bg-[#1a232b] rounded-2xl p-4 shadow-xs border border-slate-200 dark:border-slate-700/80">
          <h3 className="text-sm font-extrabold text-slate-800 dark:text-white flex items-center gap-1.5 mb-1">
            <Lightbulb className="w-4 h-4 text-[#fdd404] fill-current" />
            Rekomendasi Tambahan
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
            Gunakan opsi di bawah untuk langsung memunculkan materi di Belajar & Main anak.
          </p>

          <div className="space-y-2.5">
            {parentSettings.recommendations.map((rec) => (
              <div
                key={rec.id}
                className="bg-slate-50 dark:bg-[#222d37] rounded-xl p-2.5 flex items-center gap-3 border border-slate-200/60 dark:border-slate-700/60"
              >
                <img
                  src={rec.image}
                  alt={rec.title}
                  className="w-10 h-10 rounded-lg object-cover bg-slate-200 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-extrabold text-xs text-slate-800 dark:text-white truncate">
                    {rec.title}
                  </h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                    {rec.desc || 'Materi rekomendasi spesial'}
                  </p>
                  <button
                    onClick={() => toggleRecommendation(rec.id)}
                    className="text-[#00677d] dark:text-[#4cd6fb] text-[11px] font-bold mt-1 flex items-center gap-1 hover:underline"
                  >
                    {rec.added ? (
                      <>
                        <CheckCircle className="w-3.5 h-3.5 text-[#46bd18]" />
                        Aktif di Belajar & Main
                      </>
                    ) : (
                      <>
                        <PlusCircle className="w-3.5 h-3.5" />
                        Tampilkan di Anak
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Parent PIN Lock Settings Modal */}
      {showPinModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1a232b] rounded-2xl p-5 shadow-xl max-w-xs w-full border-2 border-[#00677d]">
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="w-6 h-6 text-[#00677d] dark:text-[#4cd6fb]" />
              <h3 className="text-base font-extrabold text-slate-800 dark:text-white">
                PIN Orang Tua
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
              Masukkan PIN Orang Tua untuk verifikasi. (Default: 1234)
            </p>

            <form onSubmit={handlePinSubmit} className="space-y-3">
              <input
                type="password"
                maxLength={4}
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="****"
                className="w-full text-center text-xl font-bold tracking-widest p-2.5 rounded-xl border-2 border-[#00b4d8] bg-slate-50 dark:bg-[#222d37] dark:text-white"
              />

              {pinError && (
                <p className="text-xs text-[#be123c] font-bold text-center">
                  PIN salah! Coba lagi.
                </p>
              )}

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowPinModal(false)}
                  className="flex-1 py-2 rounded-xl font-bold text-xs bg-slate-100 dark:bg-[#25323e] text-slate-600 dark:text-slate-300"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl font-bold text-xs bg-[#00677d] text-white shadow-xs btn-press"
                >
                  Verifikasi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
