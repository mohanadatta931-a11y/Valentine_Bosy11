import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import {
  AnimatedRoseItem,
  INITIAL_GARDEN_ROSES,
  createBloomingRoseAt,
} from '../utils/loveLogic';

interface BloomingRoseGardenProps {
  isPlaying: boolean;
  onTriggerPetalShower: () => void;
}

const PALETTE_CYCLE: Array<'crimson' | 'blush' | 'ivory'> = ['crimson', 'blush', 'ivory'];

export const BloomingRoseGarden: React.FC<BloomingRoseGardenProps> = ({
  isPlaying,
  onTriggerPetalShower,
}) => {
  const [roses, setRoses] = useState<AnimatedRoseItem[]>(INITIAL_GARDEN_ROSES);
  const [activePaletteIdx, setActivePaletteIdx] = useState<number>(0);

  const handleGardenTap = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
    const yPercent = ((e.clientY - rect.top) / rect.height) * 100;
    const nextPalette = PALETTE_CYCLE[activePaletteIdx % PALETTE_CYCLE.length];
    const newRose = createBloomingRoseAt(xPercent, yPercent, nextPalette, roses.length + 1);
    setActivePaletteIdx((prev) => prev + 1);
    setRoses((prev) => [...prev.slice(-11), newRose]);
    onTriggerPetalShower();
  };

  const handleBloomBurst = () => {
    const burst: AnimatedRoseItem[] = [
      createBloomingRoseAt(20 + Math.random() * 60, 22 + Math.random() * 55, 'crimson', roses.length + 1),
      createBloomingRoseAt(20 + Math.random() * 60, 22 + Math.random() * 55, 'blush', roses.length + 2),
      createBloomingRoseAt(20 + Math.random() * 60, 22 + Math.random() * 55, 'ivory', roses.length + 3),
    ];
    setRoses((prev) => [...prev.slice(-9), ...burst]);
    onTriggerPetalShower();
  };

  const getRoseColors = (tag: 'crimson' | 'blush' | 'ivory'): [string, string, string] => {
    if (tag === 'blush') return ['#D59B8D', '#A83246', '#EFE0DA'];
    if (tag === 'ivory') return ['#EFE0DA', '#D59B8D', '#B99188'];
    return ['#A81323', '#6E0A15', '#D6384C'];
  };

  return (
    <section
      id="petals"
      className="py-14 sm:py-20 bg-[#0E0102] border-t border-b border-[#D59B8D]/12 relative overflow-hidden"
    >
      <div className="max-w-[1060px] mx-auto px-4 sm:px-8">
        {/* Centered Editorial Heading */}
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="text-[10px] sm:text-xs uppercase tracking-[0.26em] text-[#D59B8D]/80 mb-2">
            11 : 11 ROSE ANIMATION GARDEN
          </div>
          <h2 className="font-script text-4xl sm:text-6xl text-[#EFE0DA] font-normal mb-2">
            Every Rose Blooms For You
          </h2>
          <p className="text-xs sm:text-sm text-[#B8968E]">
            Tap anywhere inside our velvet rose garden to bloom a new Valentine rose for my fiancée.
          </p>
        </div>

        {/* Interactive Touch-to-Bloom Rose Garden Canvas */}
        <div
          data-testid="interactive-rose-garden"
          onClick={handleGardenTap}
          role="button"
          tabIndex={0}
          aria-label="Interactive blooming rose garden — tap anywhere to bloom a new rose"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleBloomBurst();
            }
          }}
          className="relative w-full h-[300px] sm:h-[360px] rounded-2xl bg-gradient-to-b from-[#1B0205] via-[#120103] to-[#0A0001] border border-[#D59B8D]/15 overflow-hidden cursor-pointer select-none shadow-2xl transition-all duration-500 ease-out has-[.garden-rose-item:hover]:scale-[1.01] has-[.garden-rose-item:hover]:rotate-[0.35deg] has-[.garden-rose-item:hover]:border-[#D59B8D]/40 has-[.garden-rose-item:hover]:shadow-[0_0_45px_rgba(168,19,35,0.35)]"
        >
          {/* Subtle Ambient Glow */}
          <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(140,12,26,0.24),transparent_70%)] pointer-events-none"
            aria-hidden="true"
          />

          {/* Blooming Animated Roses */}
          {roses.map((rose, index) => {
            const [outerColor, midColor, innerColor] = getRoseColors(rose.paletteTag);
            return (
              <div
                key={rose.id}
                style={{
                  left: `${rose.xPercent}%`,
                  top: `${rose.yPercent}%`,
                  transform: `translate(-50%, -50%) scale(${rose.scale})`,
                }}
                className="garden-rose-item group/rose absolute flex flex-col items-center pointer-events-auto transition-all duration-500 hover:z-20"
              >
                <div className="animate-float-gentle flex flex-col items-center">
                  <div className="transition-transform duration-500 ease-out group-hover/rose:scale-125 group-hover/rose:rotate-12 group-hover/rose:drop-shadow-[0_0_18px_rgba(213,155,141,0.55)]">
                    <svg
                      viewBox="0 0 120 120"
                      className={`w-16 h-16 sm:w-20 sm:h-20 drop-shadow-lg ${
                        isPlaying ? 'animate-vinyl' : ''
                      }`}
                      style={{ animationDuration: `${18 + (index % 4) * 4}s` }}
                    >
                      {[0, 60, 120, 180, 240, 300].map((angle) => (
                        <g key={`o-${angle}`} transform={`rotate(${angle} 60 60)`}>
                          <path
                            d="M60 12 C78 24, 82 46, 60 60 C38 46, 42 24, 60 12 Z"
                            fill={outerColor}
                            fillOpacity="0.9"
                          />
                        </g>
                      ))}
                      {[30, 90, 150, 210, 270, 330].map((angle) => (
                        <g key={`m-${angle}`} transform={`rotate(${angle} 60 60)`}>
                          <path
                            d="M60 24 C73 33, 75 49, 60 60 C45 49, 47 33, 60 24 Z"
                            fill={midColor}
                            fillOpacity="0.95"
                          />
                        </g>
                      ))}
                      {[0, 90, 180, 270].map((angle) => (
                        <g key={`i-${angle}`} transform={`rotate(${angle} 60 60)`}>
                          <path
                            d="M60 36 C68 41, 69 52, 60 60 C51 52, 52 41, 60 36 Z"
                            fill={innerColor}
                          />
                        </g>
                      ))}
                      <circle cx="60" cy="60" r="5" fill="#EFE0DA" />
                    </svg>
                  </div>
                  <span className="mt-1 text-[10px] sm:text-xs text-[#EFE0DA]/90 font-editorial italic whitespace-nowrap drop-shadow transition-all duration-300 group-hover/rose:text-[#D59B8D] group-hover/rose:scale-105">
                    {rose.vowText}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Bottom Overlay Hint */}
          <div className="absolute bottom-3 inset-x-4 flex items-center justify-between text-[11px] text-[#D59B8D]/80 pointer-events-none">
            <span>{roses.length} Roses Blooming For My Fiancée</span>
            <span>Tap anywhere to bloom more</span>
          </div>
        </div>

        {/* Centered Bloom More Button */}
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={handleBloomBurst}
            className="min-h-[42px] px-7 py-2.5 rounded-full border border-[#D59B8D]/40 text-[#EFE0DA] hover:bg-[#D59B8D] hover:text-[#140204] text-[10px] tracking-[0.18em] uppercase transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D59B8D]" />
            <span>BLOOM MORE ROSES</span>
          </button>
        </div>
      </div>
    </section>
  );
};
