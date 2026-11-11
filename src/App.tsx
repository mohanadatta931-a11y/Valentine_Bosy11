import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, Heart, Sparkles, Flower2, Music, Gift, ArrowRight } from 'lucide-react';
import {
  AUDIO_SRC,
  VISUAL_ASSETS,
  BOUQUET_OPTIONS,
  BouquetOption,
} from './utils/loveLogic';
import { BouquetBoutiqueSection } from './components/BouquetBoutiqueSection';
import { BloomingRoseGarden } from './components/BloomingRoseGarden';
import { FallingPetalsCanvas } from './components/FallingPetalsCanvas';
import { FianceeRosePortrait } from './components/FianceeRosePortrait';

export default function App() {
  const [selectedBouquet, setSelectedBouquet] = useState<BouquetOption>(BOUQUET_OPTIONS[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [petalBurstKey, setPetalBurstKey] = useState<number>(0);
  const [ribbonUntied, setRibbonUntied] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasAutoStartedRef = useRef<boolean>(false);

  const tryPlayAudio = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      audio.loop = true;
      await audio.play();
      setIsPlaying(true);
      hasAutoStartedRef.current = true;
    } catch {
      // Browser blocked unmuted autoplay before first gesture; handled by gesture listener
    }
  }, []);

  useEffect(() => {
    tryPlayAudio();

    const handleFirstInteraction = () => {
      if (!hasAutoStartedRef.current && audioRef.current && audioRef.current.paused) {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
            hasAutoStartedRef.current = true;
          })
          .catch(() => {});
      }
    };

    window.addEventListener('pointerdown', handleFirstInteraction, { once: true });
    window.addEventListener('keydown', handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener('pointerdown', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };
  }, [tryPlayAudio]);

  const handleTogglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    hasAutoStartedRef.current = true;
    if (audio.paused) {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const triggerPetalShower = useCallback(() => {
    setPetalBurstKey((prev) => prev + 1);
  }, []);

  return (
    <div className="min-h-screen bg-[#140204] text-[#EFE0DA] flex flex-col relative pb-14 md:pb-0">
      {/* Slow, Gentle Falling Velvet Rose Petals Canvas */}
      <FallingPetalsCanvas burstKey={petalBurstKey} />

      {/* Persistent Audio Element with AutoPlay & Loop */}
      <audio
        ref={audioRef}
        src={AUDIO_SRC}
        autoPlay
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={(e) => {
          e.currentTarget.currentTime = 0;
          e.currentTarget.play().catch(() => {});
        }}
      />

      <main className="flex-1">
        {/* SECTION 1: Obsidian-Crimson Editorial Hero Matching image.png & image_b9f591f3.png */}
        <section
          id="home"
          className="relative flex flex-col justify-between overflow-hidden bg-[#140204] pb-12 sm:pb-20"
        >
          {/* Ambient Dark Velvet Rose Backdrop & Radial Crimson Glow */}
          <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
            <img
              src={VISUAL_ASSETS.HERO_ROSES}
              alt=""
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center opacity-15 scale-105"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_38%,rgba(105,10,21,0.34),rgba(18,2,4,0.96)_72%)]" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#120204]/80 via-transparent to-[#140204]" />
          </div>

          {/* 3-Zone Editorial Top Bar */}
          <header className="relative z-20 max-w-[1140px] w-full mx-auto flex items-center justify-between gap-6 px-5 sm:px-8 pt-5 sm:pt-7">
            {/* Zone 1: Editorial Serif Wordmark */}
            <a
              href="#home"
              className="flex flex-col items-start whitespace-nowrap shrink-0 group"
            >
              <span className="font-editorial text-lg sm:text-xl tracking-[0.22em] uppercase text-[#EFE0DA]">
                MY VALENTINE
              </span>
              <span className="text-[8px] tracking-[0.32em] uppercase text-[#B99188] -mt-1">
                11 · 11 · FOR MY FIANCÉE
              </span>
            </a>

            {/* Zone 2: 4 Clean Uppercase Nav Links with Active Dot */}
            <nav
              aria-label="Primary Navigation"
              className="hidden md:flex items-center gap-9 text-[10px] tracking-[0.2em] uppercase text-[#B99188]"
            >
              <a
                href="#home"
                className="relative text-[#EFE0DA] hover:text-[#D59B8D] transition-colors whitespace-nowrap shrink-0 flex flex-col items-center"
              >
                <span>VALENTINE</span>
                <span className="w-1 h-1 rounded-full bg-[#D59B8D] mt-1" />
              </a>
              <a
                href="#bouquets"
                className="hover:text-[#EFE0DA] transition-colors whitespace-nowrap shrink-0"
              >
                HER ROSES
              </a>
              <a
                href="#petals"
                className="hover:text-[#EFE0DA] transition-colors whitespace-nowrap shrink-0"
              >
                LOVE SONG
              </a>
              <a
                href="#story"
                className="hover:text-[#EFE0DA] transition-colors whitespace-nowrap shrink-0"
              >
                FOREVER VOW
              </a>
            </nav>

            {/* Zone 3: Pill Action Button */}
            <div className="flex items-center shrink-0">
              <button
                type="button"
                onClick={() => {
                  handleTogglePlay();
                  triggerPetalShower();
                }}
                className="min-h-[36px] px-4 py-1.5 rounded-full text-[9px] sm:text-[10px] tracking-[0.18em] uppercase text-[#EFE0DA] border border-[#D59B8D]/40 hover:bg-[#D59B8D] hover:text-[#140204] transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-3 h-3" />
                    <span>PAUSE SONG</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3" />
                    <span>PLAY OUR SONG</span>
                  </>
                )}
              </button>
            </div>
          </header>

          {/* Main Hero Composition Matching User's Reference Screenshots */}
          <div className="relative z-10 max-w-[1140px] w-full mx-auto px-5 sm:px-8 pt-6 sm:pt-10 pb-8 grid grid-cols-1 lg:grid-cols-12 items-center gap-6 lg:gap-0">
            {/* Left Editorial Display Column */}
            <div className="lg:col-span-6 relative z-30 text-center lg:text-left flex flex-col items-center lg:items-start lg:-mr-20 order-2 lg:order-1">
              {/* Line 1: Thin Tall Uppercase Serif in #EFE0DA */}
              <p className="font-editorial text-3xl sm:text-5xl lg:text-[54px] font-light tracking-[0.06em] uppercase text-[#EFE0DA] leading-none scale-y-105 mb-2">
                HAPPY 11/11
              </p>

              {/* Line 2: Monumental Condensed High-Contrast Didone Display in #D59B8D */}
              <h1 className="font-didone text-6xl sm:text-8xl lg:text-[112px] font-semibold tracking-[-0.02em] uppercase text-[#D59B8D] leading-[0.88] scale-y-[1.16] my-2 sm:my-3 drop-shadow-[0_10px_28px_rgba(0,0,0,0.75)]">
                VALENTINE
              </h1>

              {/* Line 3: Thin Uppercase Serif + Italic Serif in #D59B8D */}
              <p className="font-editorial text-3xl sm:text-5xl lg:text-[50px] font-light tracking-[0.05em] uppercase text-[#EFE0DA] leading-none mt-2 mb-5">
                TO MY <span className="italic font-normal text-[#D59B8D]">FIANCÉE.</span>
              </p>

              {/* Micro-Caption Row with Bullets */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-[#B99188] mb-4">
                <span>PURE CONSCIENCE</span>
                <span aria-hidden="true">•</span>
                <span>MY SAFE HOME</span>
                <span aria-hidden="true">•</span>
                <span>FOREVER YOURS</span>
              </div>

              {/* Romantic Valentine Message */}
              <p className="text-xs sm:text-sm text-[#B8968E] max-w-md leading-relaxed font-light mb-6">
                How many times in a lifetime do we meet someone who loves so purely? Your heart is my warmest home, and I am staying yours until the very end of my life.
              </p>

              {/* Warm Terracotta-Rose Solid Pill CTA Button */}
              <a
                href="#bouquets"
                onClick={() => {
                  triggerPetalShower();
                  if (audioRef.current && audioRef.current.paused) {
                    handleTogglePlay();
                  }
                }}
                className="min-h-[42px] px-7 py-2.5 rounded-full bg-[#C89486] hover:bg-[#D59B8D] text-[#1D0306] text-[10px] sm:text-[11px] font-medium tracking-[0.16em] uppercase transition-transform active:scale-95 flex items-center gap-4 whitespace-nowrap shrink-0 shadow-xl"
              >
                <span>BLOOM YOUR ROSES</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Right Portrait Column: Untouched Photoroom Portrait Emerging from Real Dark Velvet Roses */}
            <div className="lg:col-span-6 relative z-20 flex items-center justify-center order-1 lg:order-2">
              <FianceeRosePortrait />
            </div>
          </div>
        </section>

        {/* SECTION 2: 3 Floating Rose Bouquets WITHOUT Any Card or Background */}
        <BouquetBoutiqueSection
          selectedBouquetId={selectedBouquet.id}
          onSelectBouquet={setSelectedBouquet}
          onTriggerPetalShower={triggerPetalShower}
        />

        {/* SECTION 3: Interactive Touch-to-Bloom Rose Animation Garden */}
        <BloomingRoseGarden
          isPlaying={isPlaying}
          onTriggerPetalShower={triggerPetalShower}
        />

        {/* SECTION 4: "To My Forever Valentine" Vow + Crimson Satin Ribbon Bow */}
        <section
          id="story"
          className="pt-16 sm:pt-24 pb-0 bg-[#140204] overflow-hidden text-center"
        >
          <div className="max-w-xl mx-auto px-6">
            <div className="text-[10px] sm:text-xs uppercase tracking-[0.26em] text-[#D59B8D]/80 mb-2">
              MY 11 : 11 PROMISE TO YOU
            </div>
            <h2 className="font-editorial text-4xl sm:text-6xl text-[#EFE0DA] font-normal mb-4">
              Forever my <span className="italic text-[#D59B8D]">fiancée.</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#B8968E] leading-[1.9] font-light tracking-wide">
              Happy Valentine’s Day on 11/11 to the woman who changed my whole world. Before I met you, days simply passed by—and with you, I found what it means to be loved with a pure conscience and a heart that feels like a warm, safe home. Today, tomorrow, and until my very last breath, who else could I ever have but you, the love of my life?
            </p>
          </div>

          {/* Revealed Animated Rose Vow when Satin Bow is tapped */}
          {ribbonUntied && (
            <div
              role="status"
              className="max-w-md mx-auto mt-6 px-5 animate-float-gentle"
            >
              <div className="bg-[#1B0306]/95 border border-[#D59B8D]/30 rounded-2xl p-5 text-center space-y-2 shadow-2xl">
                <div className="flex items-center justify-center gap-1.5 text-[10px] tracking-[0.2em] uppercase text-[#D59B8D]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>11 : 11 Valentine Promise</span>
                </div>
                <p className="font-editorial text-2xl sm:text-3xl text-[#EFE0DA]">
                  Happy Valentine’s Day, <span className="italic text-[#D59B8D]">My Love</span>
                </p>
                <p className="text-xs text-[#B8968E] leading-relaxed">
                  “I am staying yours until the end of my life — who else could I ever have but you, the love of my life?”
                </p>
              </div>
            </div>
          )}

          {/* Edge-to-Edge Crimson Satin Ribbon & Bow Image */}
          <div className="relative mt-6 sm:mt-8 w-full max-w-[1440px] mx-auto">
            <button
              type="button"
              onClick={() => {
                setRibbonUntied((prev) => !prev);
                triggerPetalShower();
                if (audioRef.current && audioRef.current.paused) {
                  handleTogglePlay();
                }
              }}
              aria-label="Untie the 11/11 crimson satin Valentine ribbon"
              className="group relative w-full aspect-16/9 sm:aspect-[21/9] flex items-center justify-center overflow-hidden cursor-pointer focus:outline-none"
            >
              <img
                src={VISUAL_ASSETS.SATIN_BOW}
                alt="Crimson satin Valentine ribbon and bow"
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover object-center transition-transform duration-700 ${
                  ribbonUntied ? 'scale-105' : 'group-hover:scale-[1.02]'
                }`}
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#0E0102] via-transparent to-[#140204]/90 pointer-events-none"
                aria-hidden="true"
              />
              <span className="absolute bottom-3 sm:bottom-5 px-5 py-1.5 rounded-full bg-[#160204]/85 border border-[#D59B8D]/35 text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-[#EFE0DA] backdrop-blur-xs">
                {ribbonUntied ? 'VALENTINE VOW UNTIED · TAP FOR PETALS' : 'TAP BOW TO UNTIE YOUR 11:11 VALENTINE VOW'}
              </span>
            </button>
          </div>
        </section>
      </main>

      {/* Mobile-First Ergonomic Bottom Tab Bar (<=15% sticky height cap) */}
      <nav
        aria-label="Mobile Navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 h-13 bg-[#0E0102]/95 backdrop-blur-md border-t border-[#D59B8D]/15 grid grid-cols-4 items-center px-2"
      >
        <a
          href="#home"
          onClick={triggerPetalShower}
          className="min-h-[44px] flex flex-col items-center justify-center text-[#D59B8D] hover:text-[#EFE0DA] transition-colors"
        >
          <Heart className="w-3.5 h-3.5 text-[#D59B8D]" />
          <span className="text-[9px] tracking-wider uppercase mt-0.5">Valentine</span>
        </a>
        <a
          href="#bouquets"
          onClick={triggerPetalShower}
          className="min-h-[44px] flex flex-col items-center justify-center text-[#D59B8D] hover:text-[#EFE0DA] transition-colors"
        >
          <Flower2 className="w-3.5 h-3.5 text-[#D59B8D]" />
          <span className="text-[9px] tracking-wider uppercase mt-0.5">Her Roses</span>
        </a>
        <a
          href="#petals"
          onClick={triggerPetalShower}
          className="min-h-[44px] flex flex-col items-center justify-center text-[#D59B8D] hover:text-[#EFE0DA] transition-colors"
        >
          <Music className="w-3.5 h-3.5 text-[#D59B8D]" />
          <span className="text-[9px] tracking-wider uppercase mt-0.5">Our Song</span>
        </a>
        <a
          href="#story"
          onClick={triggerPetalShower}
          className="min-h-[44px] flex flex-col items-center justify-center text-[#D59B8D] hover:text-[#EFE0DA] transition-colors"
        >
          <Gift className="w-3.5 h-3.5 text-[#D59B8D]" />
          <span className="text-[9px] tracking-wider uppercase mt-0.5">Forever</span>
        </a>
      </nav>
    </div>
  );
}
