import {
  LetterItem,
  NumberItem,
  AnimalItem,
  FlashcardItem,
  DoaItem,
  AsmaulHusnaItem,
  CostumeItem,
  TrophyItem,
  BadgeItem,
} from '../types';

export const MASCOT_IMAGES = {
  default: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBo4tKTNIGtSZ8Bv-ece-a2Q4AzX7_T04Qk5CxxsSBi3PQa8CPgD7Ea0v43_V0_MhR9sgK1oZgg-9Gj8_m2uIuCnHRNTuOFeWWNRigmY1idaeFeVbBw2Eyu52DHB8MVyWZmHbNhuK1feoFkjBYTjNBMP2upto6XEuX5wqTmZgBGWUUxHykMhJn2Pp1I3unUKZ8vrrDFH6ORDDsCbN09_UEniwYxMsXtZxM0po43JnVKKa-TjU-sy6Ru',
  religi: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkPGZDoFkmlplzETWDEtLXak9cnP23lOBXGOcD77ptiyY_9toifnPSdIFg-3szJL1ZILwOWyLheqHGK1l6XlOevoCBRsZTtwGL2qpuaiQ1xU6TAYm-_jpK-la1NIXARkLhAv9LIuYbabUhb9EEu_0wV_PNkFvUcGn4_UXTlw8qbhFufPKKOk0KsVVo2rEBv3sIN1LvDl1Jr0pX8Qjik91dufTD_usIf0VZLpzRQi-kPZVYcpSBaYWo',
  waving: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0tmOmNs7BucVRfcu7REMNgdbr91FXDL6xmQmEzLJ4fqW2rxSnfNR_XhJh9ZoPCp2KP0nL_Cy75kAlDcfOoOrFMaJBayyrqixcHblvfcZq368H361icrOooOLv1Gh7GmmbSAkB9SGiB4__fHTRfPxPvpCxJ7e6SjiPLKR7vEZBRCeEjiNsvZUAN7PP1HpsygTe3Sp2X66awhqrDWbi5Gu8EpdztszCY19J6IeOByr4loDKVYKUpGNW',
  astronaut: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBsvzBht70DEFJOzMfrb_FH1Igkd--gIOtBqm-atmie_X5Rj_ifJwW7oWL5CMnG6biZfSYf-IxRPV1J3FI_ywk5-9UJkMT9pmYtAhddbEP2HKYBWFhfPHwmxU3_lJi6-1hj6Af-aNA_sYcVxLLPQ0nvYedAYBEg-q4RZgkh1-E_E5xPoQniSsNVSjyYNHCxctIcOrQNoDoFtkyVU7z26C7h-cjmJit4r-KtvfZTiGxfswYsEJ1ZUrnF',
  pointing: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAgu-tnEe5ge17SZqo5JoT5JdHoi1uZdKzuJvGgYCV92PaCUo539bLLJVKureCYMSiT_xmu4TDATQsMEjCHHsPvrV4u7t0ID-6OzRnlOzOJVD9xVZ9Ub7b3Xf3izaMFq5MBRJeEGokxpluWbkK12JHOYjJrX-PrU6QgSUkJVe2y0WAVvQlPV3i3EoynL2DO6aEKbgTAHSP2Wt0O4oV7_XGRuUS0pSZyhyRjCzY6vrW07BIeKX6IDKP0',
  avatarCircle: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOANOao1BaWNMHm7HNCePS83i3ZKkXvfyWlTqVzUCQZjPtJaiwh5mJ900rTuzjAWiKcKNxxA8S0v_ZIYIv7lVDqChwrBAeDSXZgJ9uQr85bXPDd48Hrth3Jw0N33j72ZF0i4GV2jjToyC7HkAk8-7v9HLUTeOGj--_DrTszMAUp_7pvV9Vn-FbKudCPJrDuufjNAlPYVB-Y9kcM0rthaqRGxUor26UXc_uHLF7dm68oa7zMOvs7dQu',
};

export const ALPHABET_DATA: LetterItem[] = [
  { letter: 'A', word: 'Apel', imageAlt: 'Buah Apel Merah', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCY2MN9UvLLA8VBISAorrfdO8bonhpmur15ZFonc6HjD558uu8g_h4Qwzg4MpzvA8UKx7T_6z2bYHEFtFwaf1quzHLA7qbgPSMC1ZZpCo0Dn7Pbie1x1Syf_ZQErpGCA-XXkYJo8Qpw5Ot69W6iPQ-KkoSKLJRRs4qsjWZvRCSVR4GKtu9a_71w2YkJkwrIvhi3EZWtAy_GXfepX_f5JOFsBL8qeod9PGYEm_hTAn6NH6EDC-TrqMUx', colorBg: 'bg-primary text-on-primary', colorBorder: 'border-primary-container' },
  { letter: 'B', word: 'Buku', imageAlt: 'Buku Cerita Warna-warni', imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&auto=format&fit=crop&q=80', colorBg: 'bg-tertiary-container text-on-tertiary-container', colorBorder: 'border-tertiary-fixed' },
  { letter: 'C', word: 'Ceri', imageAlt: 'Buah Ceri Merah Manis', imageUrl: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?w=400&auto=format&fit=crop&q=80', colorBg: 'bg-error-container text-on-error-container', colorBorder: 'border-error' },
  { letter: 'D', word: 'Domba', imageAlt: 'Domba Putih Lucu', imageUrl: 'https://images.unsplash.com/photo-1484557052118-f32bd25b45b5?w=400&auto=format&fit=crop&q=80', colorBg: 'bg-secondary-container text-on-secondary-container', colorBorder: 'border-secondary-fixed' },
  { letter: 'E', word: 'Elang', imageAlt: 'Burung Elang Gagah', imageUrl: 'https://images.unsplash.com/photo-1611689342806-0863700ce1e4?w=400&auto=format&fit=crop&q=80', colorBg: 'bg-primary text-on-primary', colorBorder: 'border-primary-container' },
  { letter: 'F', word: 'Foto', imageAlt: 'Kamera Foto Warna', imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&auto=format&fit=crop&q=80', colorBg: 'bg-tertiary-container text-on-tertiary-container', colorBorder: 'border-tertiary-fixed' },
  { letter: 'G', word: 'Gajah', imageAlt: 'Gajah Besar Ramah', imageUrl: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=400&auto=format&fit=crop&q=80', colorBg: 'bg-error-container text-on-error-container', colorBorder: 'border-error' },
  { letter: 'H', word: 'Harimau', imageAlt: 'Harimau Cilik Ceria', imageUrl: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=400&auto=format&fit=crop&q=80', colorBg: 'bg-secondary-container text-on-secondary-container', colorBorder: 'border-secondary-fixed' },
  { letter: 'I', word: 'Ikan', imageAlt: 'Ikan Mas Hias', imageUrl: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=400&auto=format&fit=crop&q=80', colorBg: 'bg-primary text-on-primary', colorBorder: 'border-primary-container' },
  { letter: 'J', word: 'Jerapah', imageAlt: 'Jerapah Tinggi Senyum', imageUrl: 'https://images.unsplash.com/photo-1547721064-da6cfb341d50?w=400&auto=format&fit=crop&q=80', colorBg: 'bg-tertiary-container text-on-tertiary-container', colorBorder: 'border-tertiary-fixed' },
  { letter: 'K', word: 'Kucing', imageAlt: 'Kucing Imut Lucu', imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&auto=format&fit=crop&q=80', colorBg: 'bg-error-container text-on-error-container', colorBorder: 'border-error' },
  { letter: 'L', word: 'Laba-laba', imageAlt: 'Laba-laba Lucu', imageUrl: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=400&auto=format&fit=crop&q=80', colorBg: 'bg-secondary-container text-on-secondary-container', colorBorder: 'border-secondary-fixed' },
  { letter: 'M', word: 'Monyet', imageAlt: 'Monyet Ceria', imageUrl: 'https://images.unsplash.com/photo-1540573133985-778788177267?w=400&auto=format&fit=crop&q=80', colorBg: 'bg-primary-container text-on-primary-container', colorBorder: 'border-primary-fixed-dim' },
  { letter: 'N', word: 'Nanas', imageAlt: 'Buah Nanas Manis', imageUrl: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=400&auto=format&fit=crop&q=80', colorBg: 'bg-surface-container-highest text-on-surface', colorBorder: 'border-outline-variant' },
  { letter: 'O', word: 'Orangutan', imageAlt: 'Orangutan Hutan', imageUrl: 'https://images.unsplash.com/photo-1581888227599-779811939961?w=400&auto=format&fit=crop&q=80', colorBg: 'bg-primary text-on-primary', colorBorder: 'border-primary-container' },
  { letter: 'P', word: 'Pisang', imageAlt: 'Buah Pisang Kuning', imageUrl: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&auto=format&fit=crop&q=80', colorBg: 'bg-tertiary-container text-on-tertiary-container', colorBorder: 'border-tertiary-fixed' },
  { letter: 'Q', word: 'Quran', imageAlt: 'Kitab Suci Al-Quran', imageUrl: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=400&auto=format&fit=crop&q=80', colorBg: 'bg-error-container text-on-error-container', colorBorder: 'border-error' },
  { letter: 'R', word: 'Rusa', imageAlt: 'Rusa Cilik Cantik', imageUrl: 'https://images.unsplash.com/photo-1484406566174-9da000fda645?w=400&auto=format&fit=crop&q=80', colorBg: 'bg-secondary-container text-on-secondary-container', colorBorder: 'border-secondary-fixed' },
  { letter: 'S', word: 'Sapi', imageAlt: 'Sapi Perah Lucu', imageUrl: 'https://images.unsplash.com/photo-1546445317-29f4545f9d52?w=400&auto=format&fit=crop&q=80', colorBg: 'bg-primary text-on-primary', colorBorder: 'border-primary-container' },
  { letter: 'T', word: 'Tikus', imageAlt: 'Tikus Kecil Ramah', imageUrl: 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=400&auto=format&fit=crop&q=80', colorBg: 'bg-tertiary-container text-on-tertiary-container', colorBorder: 'border-tertiary-fixed' },
  { letter: 'U', word: 'Ular', imageAlt: 'Ular Hijau Cantik', imageUrl: 'https://images.unsplash.com/photo-1531386151447-fd76ad50012f?w=400&auto=format&fit=crop&q=80', colorBg: 'bg-error-container text-on-error-container', colorBorder: 'border-error' },
  { letter: 'V', word: 'Vas', imageAlt: 'Vas Bunga Indah', imageUrl: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=400&auto=format&fit=crop&q=80', colorBg: 'bg-secondary-container text-on-secondary-container', colorBorder: 'border-secondary-fixed' },
  { letter: 'W', word: 'Wortel', imageAlt: 'Sayur Wortel Oranye', imageUrl: 'https://images.unsplash.com/photo-1598170845058-12ef4a457939?w=400&auto=format&fit=crop&q=80', colorBg: 'bg-primary text-on-primary', colorBorder: 'border-primary-container' },
  { letter: 'X', word: 'Xilofon', imageAlt: 'Alat Musik Xilofon', imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&auto=format&fit=crop&q=80', colorBg: 'bg-tertiary-container text-on-tertiary-container', colorBorder: 'border-tertiary-fixed' },
  { letter: 'Y', word: 'Yoyo', imageAlt: 'Mainan Yoyo Warna', imageUrl: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=400&auto=format&fit=crop&q=80', colorBg: 'bg-error-container text-on-error-container', colorBorder: 'border-error' },
  { letter: 'Z', word: 'Zebra', imageAlt: 'Zebra Belang Hitam Putih', imageUrl: 'https://images.unsplash.com/photo-1501705388883-4ed8a543392c?w=400&auto=format&fit=crop&q=80', colorBg: 'bg-secondary-container text-on-secondary-container', colorBorder: 'border-secondary-fixed' },
];

export const NUMBER_DATA: NumberItem[] = [
  { number: 1, word: 'Satu', iconName: 'star', countIcon: 'star', borderColor: 'border-primary-container', textColor: 'text-primary', items: ['⭐'] },
  { number: 2, word: 'Dua', iconName: 'favorite', countIcon: 'favorite', borderColor: 'border-tertiary-container', textColor: 'text-tertiary', items: ['❤️', '❤️'] },
  { number: 3, word: 'Tiga', iconName: 'cruelty_free', countIcon: 'cruelty_free', borderColor: 'border-secondary-container', textColor: 'text-on-secondary-container', items: ['🐰', '🐰', '🐰'] },
  { number: 4, word: 'Empat', iconName: 'eco', countIcon: 'eco', borderColor: 'border-primary-container', textColor: 'text-primary', items: ['🍃', '🍃', '🍃', '🍃'] },
  { number: 5, word: 'Lima', iconName: 'lightbulb', countIcon: 'lightbulb', borderColor: 'border-tertiary-container', textColor: 'text-tertiary', items: ['💡', '💡', '💡', '💡', '💡'] },
  { number: 6, word: 'Enam', iconName: 'toys', countIcon: 'toys', borderColor: 'border-secondary-container', textColor: 'text-on-secondary-container', items: ['🚗', '🚗', '🚗', '🚗', '🚗', '🚗'] },
  { number: 7, word: 'Tujuh', iconName: 'cake', countIcon: 'cake', borderColor: 'border-primary-container', textColor: 'text-primary', items: ['🎂', '🎂', '🎂', '🎂', '🎂', '🎂', '🎂'] },
  { number: 8, word: 'Delapan', iconName: 'music_note', countIcon: 'music_note', borderColor: 'border-tertiary-container', textColor: 'text-tertiary', items: ['🎵', '🎵', '🎵', '🎵', '🎵', '🎵', '🎵', '🎵'] },
  { number: 9, word: 'Sembilan', iconName: 'palette', countIcon: 'palette', borderColor: 'border-secondary-container', textColor: 'text-on-secondary-container', items: ['🎨', '🎨', '🎨', '🎨', '🎨', '🎨', '🎨', '🎨', '🎨'] },
  { number: 10, word: 'Sepuluh', iconName: 'rocket_launch', countIcon: 'rocket_launch', borderColor: 'border-primary-container', textColor: 'text-primary', items: ['🚀', '🚀', '🚀', '🚀', '🚀', '🚀', '🚀', '🚀', '🚀', '🚀'] },
];

export const ANIMAL_DATA: AnimalItem[] = [
  { id: 'singa', name: 'Singa', emoji: '🦁', borderColor: 'border-secondary-container', shadowColor: '#fdd404', soundType: 'lion', description: 'Raja hutan yang perkasa!' },
  { id: 'gajah', name: 'Gajah', emoji: '🐘', borderColor: 'border-outline-variant', shadowColor: '#bcc9ce', soundType: 'elephant', description: 'Punya belalai panjang dan telinga lebar.' },
  { id: 'monyet', name: 'Monyet', emoji: '🐒', borderColor: 'border-[#8B4513]', shadowColor: '#8B4513', gridSpan: 'md:col-span-2', soundType: 'monkey', description: 'Suka melompat dan makan pisang manis!' },
  { id: 'burung', name: 'Burung', emoji: '🦜', borderColor: 'border-primary-container', shadowColor: '#00b4d8', gridSpan: 'md:col-span-2 md:col-start-1', soundType: 'bird', description: 'Bisa terbang tinggi di angkasa.' },
  { id: 'kucing', name: 'Kucing', emoji: '🐱', borderColor: 'border-[#FFA500]', shadowColor: '#FFA500', soundType: 'cat', description: 'Suka mengeong dan dielus lembut.' },
  { id: 'anjing', name: 'Anjing', emoji: '🐶', borderColor: 'border-[#A0522D]', shadowColor: '#A0522D', soundType: 'dog', description: 'Setia dan suka bermain lempar bola.' },
];

export const FLASHCARD_DATA: FlashcardItem[] = [
  {
    id: 1,
    word: 'Apple',
    category: 'Fruit',
    imageAlt: 'Red Apple',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCY2MN9UvLLA8VBISAorrfdO8bonhpmur15ZFonc6HjD558uu8g_h4Qwzg4MpzvA8UKx7T_6z2bYHEFtFwaf1quzHLA7qbgPSMC1ZZpCo0Dn7Pbie1x1Syf_ZQErpGCA-XXkYJo8Qpw5Ot69W6iPQ-KkoSKLJRRs4qsjWZvRCSVR4GKtu9a_71w2YkJkwrIvhi3EZWtAy_GXfepX_f5JOFsBL8qeod9PGYEm_hTAn6NH6EDC-TrqMUx',
    pronunciation: 'Ap-pul',
    translation: 'Apel',
  },
  {
    id: 2,
    word: 'Dog',
    category: 'Animal',
    imageAlt: 'Cute Dog',
    imageUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&auto=format&fit=crop&q=80',
    pronunciation: 'Dog',
    translation: 'Anjing',
  },
  {
    id: 3,
    word: 'Book',
    category: 'Object',
    imageAlt: 'Colorful Book',
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&auto=format&fit=crop&q=80',
    pronunciation: 'Buk',
    translation: 'Buku',
  },
  {
    id: 4,
    word: 'Car',
    category: 'Vehicle',
    imageAlt: 'Yellow Toy Car',
    imageUrl: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=400&auto=format&fit=crop&q=80',
    pronunciation: 'Kar',
    translation: 'Mobil',
  },
];

export const DOA_LIST: DoaItem[] = [
  {
    id: 'makan',
    title: 'Doa Sebelum Makan',
    arabic: 'اللَّهُمَّ بَارِكْ لَنَا فِيمَا رَزَقْتَنَا وَقِنَا عَذَابَ النَّارِ',
    latin: 'Allahumma baarik lanaa fiimaa razaqtanaa wa qinaa ‘adzaaban naar.',
    translation: 'Ya Allah, berkahilah rezeki yang Engkau berikan kepada kami dan peliharalah kami dari siksa api neraka.',
    category: 'Doa Harian',
  },
  {
    id: 'tidur',
    title: 'Doa Sebelum Tidur',
    arabic: 'بِاسْمِكَ اللَّهُمَّ أَحْيَا وَبِاسْمِكَ أَمُوتُ',
    latin: 'Bismikallahumma ahyaa wa bismika amuutu.',
    translation: 'Dengan nama-Mu ya Allah aku hidup dan dengan nama-Mu aku mati.',
    category: 'Doa Harian',
  },
  {
    id: 'ortu',
    title: 'Doa Untuk Kedua Orang Tua',
    arabic: 'رَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ وَارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا',
    latin: 'Rabbighfir lii wa liwaalidayya warhamhumaa kamaa rabbayaanii shaghiiraa.',
    translation: 'Ya Tuhanku, ampunilah aku dan kedua orang tuaku, dan kasihilah mereka berdua sebagaimana mereka merawatku sewaktu kecil.',
    category: 'Doa Harian',
  },
  {
    id: 'belajar',
    title: 'Doa Sebelum Belajar',
    arabic: 'رَبِّ زِدْنِي عِلْمًا وَارْزُقْنِي فَهْمًا',
    latin: 'Rabbi zidnii ‘ilman warzuqnii fahman.',
    translation: 'Ya Tuhanku, tambahkanlah kepadaku ilmu pengetahuan dan berilah aku pemahaman yang baik.',
    category: 'Doa Harian',
  },
];

export const ASMAUL_HUSNA_SAMPLE: AsmaulHusnaItem[] = [
  { number: 1, arabic: 'الرَّحْمَنُ', latin: 'Ar-Rahman', meaning: 'Maha Pengasih' },
  { number: 2, arabic: 'الرَّحِيمُ', latin: 'Ar-Rahim', meaning: 'Maha Penyayang' },
  { number: 3, arabic: 'الْمَلِكُ', latin: 'Al-Malik', meaning: 'Maha Merajai' },
  { number: 4, arabic: 'الْقُدُّوسُ', latin: 'Al-Quddus', meaning: 'Maha Suci' },
  { number: 5, arabic: 'السَّلاَمُ', latin: 'As-Salam', meaning: 'Maha Memberi Kesejahteraan' },
  { number: 6, arabic: 'الْمُؤْمِنُ', latin: 'Al-Mu’min', meaning: 'Maha Memberi Keamanan' },
  { number: 7, arabic: 'الْمُهَيْمِنُ', latin: 'Al-Muhaymin', meaning: 'Maha Memelihara' },
  { number: 8, arabic: 'الْعَزِيزُ', latin: 'Al-Aziz', meaning: 'Maha Perkasa' },
  { number: 9, arabic: 'الْجَبَّارُ', latin: 'Al-Jabbar', meaning: 'Maha Gagah' },
  { number: 10, arabic: 'الْمُتَكَبِّرُ', latin: 'Al-Mutakabbir', meaning: 'Maha Megah' },
];

export const COSTUME_LIST: CostumeItem[] = [
  {
    id: 'astronaut',
    name: 'Kostum Astronot',
    requiredStars: 200,
    imageUrl: MASCOT_IMAGES.astronaut,
    isUnlocked: false,
    description: 'Siap berpetualang menembus angkasa luar!',
  },
  {
    id: 'religi',
    name: 'Pakaian Sarong & Peci',
    requiredStars: 100,
    imageUrl: MASCOT_IMAGES.religi,
    isUnlocked: true,
    description: 'Busana rapi untuk beribadah dan belajar agama.',
  },
  {
    id: 'default',
    name: 'Robot Pintar Asli',
    requiredStars: 0,
    imageUrl: MASCOT_IMAGES.default,
    isUnlocked: true,
    description: 'Gaya klasik Pintar yang ramah dan ceria!',
  },
];

export const TROPHY_LIST: TrophyItem[] = [
  {
    id: 'kutu-buku',
    title: 'Kutu Buku Cilik',
    description: 'Membaca 50 cerita dan doa harian.',
    icon: 'menu_book',
    bgColor: 'bg-secondary-container text-on-secondary-container',
    isUnlocked: true,
  },
  {
    id: 'jagoan-angka',
    title: 'Jagoan Angka',
    description: 'Lulus ujian matematika & berhitung.',
    icon: 'calculate',
    bgColor: 'bg-tertiary-container text-on-tertiary-container',
    isUnlocked: true,
  },
  {
    id: 'sahabat-hewan',
    title: 'Sahabat Hewan',
    description: 'Mendengar semua suara hewan di Dunia Sekitar.',
    icon: 'pets',
    bgColor: 'bg-primary-container text-on-primary-container',
    isUnlocked: false,
  },
];

export const BADGE_LIST: BadgeItem[] = [
  { id: 'ilmuwan', title: 'Ilmuwan', icon: 'science', isUnlocked: true, colorGradient: 'from-primary-container to-primary' },
  { id: 'seniman', title: 'Seniman', icon: 'palette', isUnlocked: true, colorGradient: 'from-tertiary-container to-tertiary' },
  { id: 'pemusik', title: 'Pemusik', icon: 'music_note', isUnlocked: true, colorGradient: 'from-secondary-container to-secondary' },
  { id: 'religi-star', title: 'Bintang Religi', icon: 'mosque', isUnlocked: true, colorGradient: 'from-primary to-primary-container' },
  { id: 'master-puzzle', title: 'Master Puzzle', icon: 'extension', isUnlocked: true, colorGradient: 'from-tertiary to-tertiary-container' },
  { id: 'memory-pro', title: 'Daya Ingat Super', icon: 'grid_view', isUnlocked: true, colorGradient: 'from-secondary to-secondary-container' },
  { id: 'bilingual', title: 'Pintar Inggris', icon: 'auto_awesome', isUnlocked: true, colorGradient: 'from-error-container to-error' },
  { id: 'penjelajah', title: 'Penjelajah', icon: 'rocket_launch', isUnlocked: true, colorGradient: 'from-primary-fixed-dim to-primary' },
  { id: 'rahasi1', title: 'Rahasia', icon: 'lock', isUnlocked: false, colorGradient: '' },
  { id: 'rahasi2', title: 'Rahasia', icon: 'lock', isUnlocked: false, colorGradient: '' },
  { id: 'rahasi3', title: 'Rahasia', icon: 'lock', isUnlocked: false, colorGradient: '' },
  { id: 'rahasi4', title: 'Rahasia', icon: 'lock', isUnlocked: false, colorGradient: '' },
];
