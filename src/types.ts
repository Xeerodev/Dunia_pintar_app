export type TabType = 'belajar' | 'main' | 'hadiah' | 'ortu';

export type SubModuleType = 
  | 'hub'
  | 'huruf'
  | 'angka'
  | 'dunia-sekitar'
  | 'religi'
  | 'english';

export type GameType =
  | 'hub'
  | 'tebak-gambar'
  | 'puzzle'
  | 'memory'
  | 'mewarnai';

export interface LetterItem {
  letter: string;
  word: string;
  imageAlt: string;
  imageUrl: string;
  colorBg: string;
  colorBorder: string;
  category?: string;
}

export interface NumberItem {
  number: number;
  word: string;
  iconName: string;
  countIcon: string;
  borderColor: string;
  textColor: string;
  items: string[];
}

export interface AnimalItem {
  id: string;
  name: string;
  emoji: string;
  borderColor: string;
  shadowColor: string;
  gridSpan?: string;
  description?: string;
  soundType: 'lion' | 'elephant' | 'monkey' | 'bird' | 'cat' | 'dog';
}

export interface FlashcardItem {
  id: number;
  word: string;
  category: string;
  imageAlt: string;
  imageUrl: string;
  pronunciation: string;
  translation: string;
}

export interface DoaItem {
  id: string;
  title: string;
  arabic: string;
  latin: string;
  translation: string;
  category: string;
}

export interface AsmaulHusnaItem {
  number: number;
  arabic: string;
  latin: string;
  meaning: string;
}

export interface CostumeItem {
  id: string;
  name: string;
  requiredStars: number;
  imageUrl: string;
  isUnlocked: boolean;
  description: string;
}

export interface TrophyItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  bgColor: string;
  isUnlocked: boolean;
}

export interface BadgeItem {
  id: string;
  title: string;
  icon: string;
  isUnlocked: boolean;
  colorGradient: string;
}

export interface CustomContentItem {
  id: string;
  title: string;
  desc: string;
  category: 'belajar' | 'main' | 'both';
  image: string;
  addedByParent: boolean;
  type?: 'flashcard' | 'quiz' | 'story';
}

export interface ParentSettings {
  childName: string;
  remainingMinutes: number;
  lockAfter2Hours: boolean;
  bedtimeMode: boolean;
  bedtimeStart: string;
  parentPin: string;
  isPinLocked: boolean;
  weeklyTime: { day: string; hours: number }[];
  subjectProgress: { name: string; percent: number; color: string; icon: string }[];
  recommendations: { id: string; title: string; image: string; added: boolean; category?: 'belajar' | 'main' | 'both'; desc?: string }[];
  customItems?: CustomContentItem[];
}

export interface AppState {
  stars: number;
  coins: number;
  xp: number;
  level: number;
  darkMode: boolean;
  soundEnabled: boolean;
  activeTab: TabType;
  activeSubModule: SubModuleType;
  activeGame: GameType;
  selectedCostumeId: string;
  unlockedCostumes: string[];
  unlockedBadges: string[];
  parentSettings: ParentSettings;
}
