import React, { useState } from 'react';
import { Heart, X } from 'lucide-react';
import {
  BouquetOption,
  BOUQUET_OPTIONS,
  filterBouquetsByPalette,
} from '../utils/loveLogic';
import { TransparentBouquetCanvas } from './TransparentBouquetCanvas';

interface BouquetBoutiqueSectionProps {
  selectedBouquetId: string;
  onSelectBouquet: (bouquet: BouquetOption) => void;
  onTriggerPetalShower: () => void;
}

export const BouquetBoutiqueSection: React.FC<BouquetBoutiqueSectionProps> = ({
  selectedBouquetId,
  onSelectBouquet,
  onTriggerPetalShower,
}) => {
  const [activePalette, setActivePalette] = useState<'all' | 'crimson' | 'blush' | 'ivory'>('all');
  const [bloomingModalBouquet, setBloomingModalBouquet] = useState<BouquetOption | null>(null);

  const visibleBouquets = filterBouquetsByPalette(BOUQUET_OPTIONS, activePalette);

  const handleBloomBouquet = (bouquet: BouquetOption) => {
    onSelectBouquet(bouquet);
    onTriggerPetalShower();
    setBloomingModalBouquet(bouquet);
  };

  return (
    <section
      id="bouquets"
      className="py-16 sm:py-24 bg-[#140204] relative overflow-hidden"
    >
      <div className="relative z-10 max-w-[1060px] mx-auto px-4 sm:px-8">
        {/* Romantic Valentine Heading for Fiancée */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="text-[10px] sm:text-xs uppercase tracking-[0.26em] text-[#DFB4A8]/80 mb-2">
            HAPPY VALENTINE’S DAY · 11 / 11
          </div>
          <h2 className="font-script text-5xl sm:text-6xl text-[#F7EAE6] tracking-normal font-normal mb-5">
            Roses For My Fiancée
          </h2>

          {/* 4 Romantic Vow Filter Tabs (Zero Shop Terminology) */}
          <div
            className="border-b border-[#DFB4A8]/15 flex items-center justify-center gap-4 sm:gap-10"
            role="tablist"
            aria-label="Valentine Rose Chapters"
          >
            {[
              { id: 'all', label: 'All Roses For You' },
              { id: 'crimson', label: 'Pure Heart' },
              { id: 'blush', label: 'My Safe Home' },
              { id: 'ivory', label: 'Forever Yours' },
            ].map((tab) => {
              const isActive = activePalette === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => {
                    setActivePalette(tab.id as typeof activePalette);
                    onTriggerPetalShower();
                  }}
                  className={`pb-2.5 min-h-[42px] text-[10px] sm:text-xs tracking-wider transition-colors whitespace-nowrap shrink-0 cursor-pointer border-b ${
                    isActive
                      ? 'border-[#DFB4A8] text-[#F7EAE6] font-medium'
                      : 'border-transparent text-[#DFB4A8]/65 hover:text-[#F7EAE6]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3 Floating Rose Bouquets WITHOUT Any Card or Background Box */}
        <div
          className={`grid gap-4 sm:gap-10 items-end ${
            visibleBouquets.length === 1
              ? 'grid-cols-1 max-w-xs mx-auto'
              : 'grid-cols-3'
          }`}
        >
          {visibleBouquets.map((bouquet, idx) => {
            const isSelected = selectedBouquetId === bouquet.id;
            return (
              <div
                key={bouquet.id}
                className="group flex flex-col items-center text-center justify-between bg-transparent border-0 p-0 shadow-none"
              >
                {/* Pure Floating Bouquet Cutout (Zero Card, Zero Background) */}
                <button
                  type="button"
                  onClick={() => handleBloomBouquet(bouquet)}
                  aria-label={`Bloom ${bouquet.title}`}
                  className="w-full max-w-[260px] aspect-3/4 mx-auto mb-2 sm:mb-4 relative flex items-center justify-center bg-transparent border-0 p-0 shadow-none cursor-pointer focus:outline-none"
                >
                  <TransparentBouquetCanvas
                    src={bouquet.imageUrl}
                    alt={bouquet.title}
                    style={{ animationDelay: `${idx * 0.9}s` }}
                    className="w-full h-full animate-float-gentle transition-transform duration-500 group-hover:scale-105"
                  />
                </button>

                {/* Romantic Dedication Caption */}
                <div className="w-full space-y-1 mb-3 sm:mb-4 px-1">
                  <h3 className="font-editorial text-sm sm:text-xl font-medium text-[#DFB4A8] tracking-wide">
                    {bouquet.title}
                  </h3>
                  <p className="text-[10px] sm:text-xs font-normal text-[#F7EAE6]/85 leading-snug">
                    {bouquet.subtitle}
                  </p>
                </div>

                {/* Minimalist Romantic Action Button */}
                <button
                  type="button"
                  onClick={() => handleBloomBouquet(bouquet)}
                  className={`min-h-[36px] sm:min-h-[40px] px-3 sm:px-6 py-1.5 text-[9px] sm:text-[10px] tracking-[0.16em] uppercase rounded-full border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    isSelected
                      ? 'bg-[#DFB4A8] text-[#140204] border-[#DFB4A8] font-semibold'
                      : 'border-[#DFB4A8]/40 text-[#F7EAE6]/90 hover:bg-[#DFB4A8] hover:text-[#140204]'
                  }`}
                >
                  FOR MY LOVE ♥
                </button>
              </div>
            );
          })}
        </div>

        {/* Interactive Blooming Rose Animation Modal when a Bouquet is Clicked */}
        {bloomingModalBouquet && (
          <div
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="bloom-modal-title"
          >
            <div className="bg-[#180305] border-t sm:border border-[#DFB4A8]/25 rounded-t-3xl sm:rounded-2xl max-w-md w-full p-6 sm:p-8 text-center relative overflow-hidden shadow-2xl">
              {/* Mobile Drag Handle */}
              <div className="w-12 h-1.5 bg-[#DFB4A8]/25 rounded-full mx-auto mb-3 sm:hidden" />

              <button
                type="button"
                onClick={() => setBloomingModalBouquet(null)}
                aria-label="Close blooming rose modal"
                className="absolute top-4 right-4 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full text-[#DFB4A8] hover:bg-[#DFB4A8]/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Animated SVG Blooming Rose Core */}
              <div className="relative w-40 h-40 mx-auto my-2 flex items-center justify-center">
                <div
                  className="absolute inset-2 rounded-full blur-xl animate-pulse-glow"
                  style={{ backgroundColor: bloomingModalBouquet.petalColors[0] }}
                />
                <svg
                  viewBox="0 0 200 200"
                  className="w-36 h-36 relative z-10 animate-vinyl"
                  aria-hidden="true"
                >
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                    <g key={`outer-${angle}`} transform={`rotate(${angle} 100 100)`}>
                      <path
                        d="M100 24 C128 42, 136 78, 100 100 C64 78, 72 42, 100 24 Z"
                        fill={bloomingModalBouquet.petalColors[0]}
                        fillOpacity="0.88"
                        stroke="#DFB4A8"
                        strokeOpacity="0.25"
                        strokeWidth="1"
                      />
                    </g>
                  ))}
                  {[22.5, 82.5, 142.5, 202.5, 262.5, 322.5].map((angle) => (
                    <g key={`mid-${angle}`} transform={`rotate(${angle} 100 100)`}>
                      <path
                        d="M100 42 C122 56, 125 82, 100 100 C75 82, 78 56, 100 42 Z"
                        fill={bloomingModalBouquet.petalColors[1]}
                        fillOpacity="0.92"
                        stroke="#DFB4A8"
                        strokeOpacity="0.3"
                        strokeWidth="1"
                      />
                    </g>
                  ))}
                  {[0, 72, 144, 216, 288].map((angle) => (
                    <g key={`inner-${angle}`} transform={`rotate(${angle} 100 100)`}>
                      <path
                        d="M100 60 C115 68, 116 86, 100 100 C84 86, 85 68, 100 60 Z"
                        fill={bloomingModalBouquet.petalColors[2]}
                        stroke="#DFB4A8"
                        strokeOpacity="0.4"
                        strokeWidth="1"
                      />
                    </g>
                  ))}
                  <circle cx="100" cy="100" r="10" fill="#DFB4A8" fillOpacity="0.9" />
                </svg>
              </div>

              <p className="font-script text-3xl sm:text-4xl text-[#DFB4A8] mb-1">
                {bloomingModalBouquet.title}
              </p>
              <h3
                id="bloom-modal-title"
                className="font-editorial text-xl sm:text-2xl text-[#F7EAE6] font-semibold mb-2"
              >
                {bloomingModalBouquet.vowTitle}
              </h3>
              <p className="text-xs sm:text-sm text-[#E8D5CE]/85 leading-relaxed mb-4">
                {bloomingModalBouquet.vowNote}
              </p>

              <div className="p-3.5 rounded-xl bg-[#120204] border border-[#DFB4A8]/20 text-xs text-[#DFB4A8] italic mb-5">
                “{bloomingModalBouquet.songLyric}”
              </div>

              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    onTriggerPetalShower();
                    setBloomingModalBouquet(null);
                  }}
                  className="min-h-[46px] w-full rounded-full bg-[#DFB4A8] hover:bg-[#E8C5BA] text-[#140204] text-xs font-semibold tracking-[0.15em] uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Heart className="w-3.5 h-3.5 fill-[#140204]" />
                  <span>HAPPY VALENTINE’S DAY · 11:11</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
