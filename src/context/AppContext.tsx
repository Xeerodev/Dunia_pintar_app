import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { AppState, TabType, SubModuleType, GameType, ParentSettings, CustomContentItem } from '../types';
import { playStarChime, playPopSound } from '../utils/audio';

interface AppContextType extends AppState {
  setTab: (tab: TabType) => void;
  setSubModule: (module: SubModuleType) => void;
  setGame: (game: GameType) => void;
  toggleDarkMode: () => void;
  toggleSound: () => void;
  addStars: (amount: number) => void;
  addCoins: (amount: number) => void;
  addXp: (amount: number) => void;
  unlockCostume: (id: string, cost: number) => boolean;
  selectCostume: (id: string) => void;
  updateParentSettings: (settings: Partial<ParentSettings>) => void;
  addCustomItem: (item: CustomContentItem) => void;
  removeCustomItem: (id: string) => void;
  toggleRecommendation: (id: string) => void;
  triggerConfetti: () => void;
  kidMode: boolean;
  setKidMode: (enabled: boolean) => void;
  isParentAuthenticated: boolean;
  setParentAuthenticated: (auth: boolean) => void;
}

const initialParentSettings: ParentSettings = {
  childName: 'Budi',
  remainingMinutes: 45,
  lockAfter2Hours: true,
  bedtimeMode: true,
  bedtimeStart: '20:00',
  parentPin: '1234',
  isPinLocked: false,
  weeklyTime: [
    { day: 'Sen', hours: 2 },
    { day: 'Sel', hours: 3 },
    { day: 'Rab', hours: 4 },
    { day: 'Kam', hours: 2.5 },
    { day: 'Jum', hours: 0.5 },
  ],
  subjectProgress: [
    { name: 'Matematika Dasar', percent: 85, color: '#4caf50', icon: 'calculate' },
    { name: 'Membaca Cepat', percent: 40, color: '#ff9800', icon: 'menu_book' },
    { name: 'Logika & Puzzle', percent: 60, color: '#2196f3', icon: 'extension' },
  ],
  recommendations: [
    {
      id: 'rec1',
      title: 'Cerita & Kuis Hewan Liar',
      desc: 'Petualangan membaca & menebak suara hewan di hutan!',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCnZPG2vztsBC5-2NoOb4iuTtYrj7dI0RYqWeah-wNF5A97_vkGs-aLvUJBXgKQ4iSRBYMer-o1wEhxA6mWnlBraGUTstMLf7G8PvPdQu9cwoybMCU9smOXdwpRwTqWDxywsoqjiO_XwDjzN3h9uhawKZEoFGSTvgLlbmFgrP0bvybCPAMjmUjSi041X58iSdSUcKIfcppdFT3fzCYpyhQMkIUQ2Xynu70X7QKtvetX5r8gFWStD7Bc',
      added: true,
      category: 'both',
    },
    {
      id: 'rec2',
      title: 'Mengeja & Quiz Kosakata Baru',
      desc: 'Mengeja kata bergambar dengan permainan interaktif!',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxLhWGtpVegyTB7fIEZ8T622YYYPUXzN4lxGU7hcDd-n86voa21rg14S0u58WCUYlzXB-YsITuTjHdXrNCm0C5z1pJTNbgDfYqAarcVHSDMNFCBheozJKemcrJT1XHYC2IsQ3sdYBS5Rw9qvN6-j0BJTGo26UV_fr5Rs5a-64efiu7DocUza1_9Jb3Ia_RStHOu6kGM6SqNWfNP8nrW9N80nYayBhlXzcSy4MAscDTgH3GqEvd1Vpf',
      added: true,
      category: 'both',
    },
    {
      id: 'rec3',
      title: 'Petualangan Luar Angkasa',
      desc: 'Mengenal planet, bintang dan roket luar angkasa!',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMsAn3S2A8_y923XG_zY_0xZ_M28Yy5d9S9q0c6z9_e_1_2_3_4_5_6_7_8_9_0_a_b_c_d_e_f_g_h_i_j_k_l_m_n_o_p_q_r_s_t_u_v_w_x_y_z',
      added: false,
      category: 'both',
    }
  ],
  customItems: [
    {
      id: 'custom_1',
      title: 'Kuis Logika Matematika',
      desc: 'Tebak penjumlahan & berhitung cepat berhadiah bintang!',
      category: 'both',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9vLp3235u_SEkJHv3QrCnhr7ZfS1JKybJkpcfshMdXK4rcqWptJ4ngK2yCI3TCCGwPENNRy7YnugVfriuqU0aimc2cyYGWFgZMuNediSL6gTMmDNWO0Pp0vFR7YX-Xvn9CgEXdTZPDq04OuW286wr38yt0ujIC1tOjRgZaVBIvluWduryeKUPdTTHioRBsZtHOFapPjr08MaBh4omiR_7XmdrzFg2MwjuoZzv8BH7967l-yqHWOb',
      addedByParent: true,
      type: 'quiz',
    }
  ]
};

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'dunia_pintar_app_state_v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stars, setStars] = useState<number>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try { return JSON.parse(saved).stars ?? 125; } catch (e) { console.debug(e); }
    }
    return 125;
  });

  const [coins, setCoins] = useState<number>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try { return JSON.parse(saved).coins ?? 450; } catch (e) { console.debug(e); }
    }
    return 450;
  });

  const [xp, setXp] = useState<number>(850);
  const [level, setLevel] = useState<number>(5);
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try { return JSON.parse(saved).darkMode ?? false; } catch (e) { console.debug(e); }
    }
    return false;
  });

  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [activeTab, setActiveTabState] = useState<TabType>('belajar');
  const [activeSubModule, setActiveSubModuleState] = useState<SubModuleType>('hub');
  const [activeGame, setActiveGameState] = useState<GameType>('hub');
  const [selectedCostumeId, setSelectedCostumeId] = useState<string>('religi');
  const [unlockedCostumes, setUnlockedCostumes] = useState<string[]>(['default', 'religi']);
  const [unlockedBadges] = useState<string[]>([
    'ilmuwan', 'seniman', 'pemusik', 'religi-star', 'master-puzzle', 'memory-pro', 'bilingual', 'penjelajah'
  ]);

  const [parentSettings, setParentSettingsState] = useState<ParentSettings>(initialParentSettings);
  const [kidMode, setKidMode] = useState<boolean>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try { return JSON.parse(saved).kidMode ?? false; } catch (e) { return false; }
    }
    return false;
  });
  const [isParentAuthenticated, setParentAuthenticated] = useState<boolean>(false);

  // Sync dark mode class on <html> element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Persist state to localStorage
  useEffect(() => {
    const stateToSave = {
      stars,
      coins,
      xp,
      level,
      darkMode,
      selectedCostumeId,
      unlockedCostumes,
      parentSettings,
      kidMode,
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stateToSave));
  }, [stars, coins, xp, level, darkMode, selectedCostumeId, unlockedCostumes, parentSettings, kidMode]);

  const triggerConfetti = () => {
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00b4d8', '#fdd404', '#46bd18', '#ffdad6'],
    });
  };

  const setTab = (tab: TabType) => {
    playPopSound();
    setActiveTabState(tab);
    if (tab === 'belajar') {
      setActiveSubModuleState('hub');
    } else if (tab === 'main') {
      setActiveGameState('hub');
    }
  };

  const setSubModule = (module: SubModuleType) => {
    playPopSound();
    setActiveSubModuleState(module);
  };

  const setGame = (game: GameType) => {
    playPopSound();
    setActiveGameState(game);
  };

  const toggleDarkMode = () => {
    playPopSound();
    setDarkMode((prev) => !prev);
  };

  const toggleSound = () => {
    playPopSound();
    setSoundEnabled((prev) => !prev);
  };

  const addStars = (amount: number) => {
    playStarChime();
    setStars((prev) => prev + amount);
    triggerConfetti();
    addXp(amount * 10);
  };

  const addCoins = (amount: number) => {
    playPopSound();
    setCoins((prev) => prev + amount);
  };

  const addXp = (amount: number) => {
    setXp((prev) => {
      const nextXp = prev + amount;
      if (nextXp >= 1000) {
        setLevel((lvl) => lvl + 1);
        return nextXp - 1000;
      }
      return nextXp;
    });
  };

  const unlockCostume = (id: string, cost: number): boolean => {
    if (stars >= cost && !unlockedCostumes.includes(id)) {
      setStars((prev) => prev - cost);
      setUnlockedCostumes((prev) => [...prev, id]);
      setSelectedCostumeId(id);
      triggerConfetti();
      return true;
    }
    return false;
  };

  const selectCostume = (id: string) => {
    if (unlockedCostumes.includes(id)) {
      playPopSound();
      setSelectedCostumeId(id);
    }
  };

  const updateParentSettings = (newSettings: Partial<ParentSettings>) => {
    playPopSound();
    setParentSettingsState((prev) => ({ ...prev, ...newSettings }));
  };

  const addCustomItem = (item: CustomContentItem) => {
    playStarChime();
    triggerConfetti();
    setParentSettingsState((prev) => ({
      ...prev,
      customItems: [...(prev.customItems || []), item],
    }));
  };

  const removeCustomItem = (id: string) => {
    playPopSound();
    setParentSettingsState((prev) => ({
      ...prev,
      customItems: (prev.customItems || []).filter((item) => item.id !== id),
    }));
  };

  const toggleRecommendation = (id: string) => {
    playPopSound();
    setParentSettingsState((prev) => ({
      ...prev,
      recommendations: prev.recommendations.map((rec) =>
        rec.id === id ? { ...rec, added: !rec.added } : rec
      ),
    }));
  };

  return (
    <AppContext.Provider
      value={{
        stars,
        coins,
        xp,
        level,
        darkMode,
        soundEnabled,
        activeTab,
        activeSubModule,
        activeGame,
        selectedCostumeId,
        unlockedCostumes,
        unlockedBadges,
        parentSettings,
        setTab,
        setSubModule,
        setGame,
        toggleDarkMode,
        toggleSound,
        addStars,
        addCoins,
        addXp,
        unlockCostume,
        selectCostume,
        updateParentSettings,
        addCustomItem,
        removeCustomItem,
        toggleRecommendation,
        triggerConfetti,
        kidMode,
        setKidMode,
        isParentAuthenticated,
        setParentAuthenticated,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
