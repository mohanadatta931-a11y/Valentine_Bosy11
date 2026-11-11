export interface LyricLine {
  id: string;
  startTime: number;
  endTime: number;
  englishVerse: string;
  arabicLine: string;
  dedicationNote: string;
}

export interface BouquetOption {
  id: string;
  title: string;
  subtitle: string;
  paletteTag: 'crimson' | 'blush' | 'ivory';
  imageUrl: string;
  petalColors: [string, string, string];
  vowTitle: string;
  vowNote: string;
  songLyric: string;
}

export interface AnimatedRoseItem {
  id: string;
  xPercent: number;
  yPercent: number;
  scale: number;
  paletteTag: 'crimson' | 'blush' | 'ivory';
  vowText: string;
}

export const AUDIO_SRC = 'assets/aistudio/WhatsApp_Audio_2026-11-11_at_12.25.10_AM_0fb249b7.mpeg';

export const VISUAL_ASSETS = {
  FIANCEE_PHOTO: 'assets/aistudio/WhatsApp_Image_2026-11-11_at_2.30.51_AM-Photoroom_b5aa24a6.png',
  REAL_ROSES_ARCH: 'assets/images/real_dark_velvet_roses_arch_1794358326947.jpg',
  HERO_ROSES: 'assets/images/hero_dark_red_roses_1794354113350.jpg',
  BOUQUET_RED: 'assets/images/bouquet_red_roses_1794354115003.jpg',
  BOUQUET_PINK: 'assets/images/bouquet_pink_blush_1794354115179.jpg',
  BOUQUET_WHITE: 'assets/images/bouquet_white_ivory_1794354117123.jpg',
  SATIN_BOW: 'assets/images/crimson_satin_bow_1794354116842.jpg',
};

export const BOUQUET_OPTIONS: BouquetOption[] = [
  {
    id: 'signature-rose',
    title: 'Pure Heart Valentine',
    subtitle: 'For the one who loves with pure conscience',
    paletteTag: 'crimson',
    imageUrl: VISUAL_ASSETS.BOUQUET_RED,
    petalColors: ['#A81323', '#7A0B18', '#D6384C'],
    vowTitle: 'A Love With Pure Conscience',
    vowNote:
      'Happy Valentine’s Day, my fiancée. How many times in a lifetime do you meet someone who loves with all her heart? From day one, your love felt honest, effortless, and real.',
    songLyric: 'How rare it is to find a heart that loves so purely.',
  },
  {
    id: 'blush-affair',
    title: 'My Warm & Safe Home',
    subtitle: 'With you, my life found its sweetest peace',
    paletteTag: 'blush',
    imageUrl: VISUAL_ASSETS.BOUQUET_PINK,
    petalColors: ['#E28B9B', '#B8334A', '#F4C2CC'],
    vowTitle: 'Who I Became With You',
    vowNote:
      'I will never forget where I was before I met you, and who I have become by your side. You turned ordinary days into a life I love waking up to.',
    songLyric: 'I never forget who I was before you, and who I am with you.',
  },
  {
    id: 'ivory-whisper',
    title: 'Forever Yours · 11:11',
    subtitle: 'Staying by your side until the end of my life',
    paletteTag: 'ivory',
    imageUrl: VISUAL_ASSETS.BOUQUET_WHITE,
    petalColors: ['#FBF5F2', '#E8D5CE', '#D9C2B8'],
    vowTitle: 'My Safe & Warm Home',
    vowNote:
      'Your heart has always been my biggest, safest home. On 11/11 and every Valentine’s Day to come, I am staying yours until the very end of my life.',
    songLyric: 'Her heart is my safe home — I am yours until the end of time.',
  },
];

export const SONG_LYRICS: LyricLine[] = [
  {
    id: 'line-1',
    startTime: 0,
    endTime: 7.5,
    englishVerse: 'How many times in life do we meet someone who loves so purely?',
    arabicLine: 'يا ترى هي كام مرة هقابل.. حد بيحب بضمير',
    dedicationNote: 'For my fiancée — the rarest soul I have ever known.',
  },
  {
    id: 'line-2',
    startTime: 7.5,
    endTime: 15.2,
    englishVerse: 'Someone who lives for me, whose heart is my warm, safe home.',
    arabicLine: 'حد عاش عمره عشاني.. وقلبه ليا بيت كبير',
    dedicationNote: 'Whenever the world feels loud, your voice is my peace.',
  },
  {
    id: 'line-3',
    startTime: 15.2,
    endTime: 23.0,
    englishVerse: 'I will never forget who I was before you, and who I became with you.',
    arabicLine: 'عمري ما أنسى أنا قبلك كنت في إيه.. ومعاك بقيت أنا إيه',
    dedicationNote: 'Everything in my life grew calmer and brighter the day you walked in.',
  },
  {
    id: 'line-4',
    startTime: 23.0,
    endTime: 29.8,
    englishVerse: 'I am staying yours until the very end of my life.',
    arabicLine: 'أنا باقي ليك ولحد ما عمري ينتهي',
    dedicationNote: 'My 11:11 promise — choosing you today, tomorrow, and forever.',
  },
  {
    id: 'line-5',
    startTime: 29.8,
    endTime: 37.5,
    englishVerse: 'I will stay right beside you, my love, living in your warmth.',
    arabicLine: 'هفضل يا حبيبي معاك.. وهعيش وأموت بهواك',
    dedicationNote: 'Hand in hand through every season ahead of us.',
  },
  {
    id: 'line-6',
    startTime: 37.5,
    endTime: 46.0,
    englishVerse: 'Who else could I ever have but you, the love of my life?',
    arabicLine: 'أنا ليا مين غيرك حبيب عمري',
    dedicationNote: 'Happy 11/11 Valentine’s Day, my fiancée.',
  },
];

export const INITIAL_GARDEN_ROSES: AnimatedRoseItem[] = [
  {
    id: 'rose-1',
    xPercent: 22,
    yPercent: 38,
    scale: 1,
    paletteTag: 'crimson',
    vowText: 'Your laugh is my favorite sound',
  },
  {
    id: 'rose-2',
    xPercent: 50,
    yPercent: 28,
    scale: 1.15,
    paletteTag: 'ivory',
    vowText: 'Your heart is my safe home',
  },
  {
    id: 'rose-3',
    xPercent: 78,
    yPercent: 42,
    scale: 0.95,
    paletteTag: 'blush',
    vowText: '11:11 — Forever my fiancée',
  },
  {
    id: 'rose-4',
    xPercent: 35,
    yPercent: 68,
    scale: 1.05,
    paletteTag: 'blush',
    vowText: 'Every day is softer with you',
  },
  {
    id: 'rose-5',
    xPercent: 66,
    yPercent: 66,
    scale: 1.1,
    paletteTag: 'crimson',
    vowText: 'Yours until the end of time',
  },
];

export const ROMANTIC_VOW_PHRASES: string[] = [
  'My 11:11 Wish Come True',
  'A Heart That Loves Purely',
  'My Safe & Warm Home',
  'Forever My Fiancée',
  'Yours Until The End Of Time',
  'Every Day Is Brighter With You',
];

export function getActiveLyricIndex(lyrics: LyricLine[], currentTime: number): number {
  if (!lyrics.length) return -1;
  const clamped = Math.max(0, currentTime);
  for (let i = 0; i < lyrics.length; i++) {
    if (clamped >= lyrics[i].startTime && clamped < lyrics[i].endTime) {
      return i;
    }
  }
  if (clamped >= lyrics[lyrics.length - 1].endTime) {
    return lyrics.length - 1;
  }
  return 0;
}

export function formatTimeMMSS(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '00:00';
  const totalSeconds = Math.floor(seconds);
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export function filterBouquetsByPalette(
  bouquets: BouquetOption[],
  palette: 'all' | 'crimson' | 'blush' | 'ivory'
): BouquetOption[] {
  if (palette === 'all') return bouquets;
  return bouquets.filter((b) => b.paletteTag === palette);
}

export function createBloomingRoseAt(
  xPercent: number,
  yPercent: number,
  paletteTag: 'crimson' | 'blush' | 'ivory',
  indexSeed: number
): AnimatedRoseItem {
  const clampedX = Math.min(90, Math.max(10, Math.round(xPercent)));
  const clampedY = Math.min(85, Math.max(15, Math.round(yPercent)));
  const phrase = ROMANTIC_VOW_PHRASES[Math.abs(indexSeed) % ROMANTIC_VOW_PHRASES.length];
  return {
    id: `rose-${Date.now()}-${indexSeed}`,
    xPercent: clampedX,
    yPercent: clampedY,
    scale: 0.9 + ((indexSeed % 3) * 0.12),
    paletteTag,
    vowText: phrase,
  };
}

/**
 * Identifies dark maroon studio background pixels around the exterior of bouquet studio shots
 * while preserving white/cream/charcoal wrapping paper, green foliage, and bright satin ribbons.
 */
export function isStudioBackdropPixel(r: number, g: number, b: number): boolean {
  // Studio backdrop is deep dark maroon: R in [15..118], G in [0..30], B in [0..34], with strong red dominance over green/blue
  if (r < 120 && g < 32 && b < 34 && r - g >= 12 && r - b >= 10) {
    return true;
  }
  // Very dark near-black vignette corners
  if (r < 28 && g < 15 && b < 16) {
    return true;
  }
  return false;
}

