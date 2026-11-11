import React, { useEffect, useRef, useState } from 'react';
import { VISUAL_ASSETS } from '../utils/loveLogic';

/**
 * Renders the user's untouched Photoroom transparent portrait (`<img>` with zero pixel modification)
 * inside the glowing crimson circle with the photorealistic dark red velvet roses cluster
 * cradling the bottom of the frame (matching the approved layout and rose cluster).
 */
export const FianceeRosePortrait: React.FC = () => {
  const roseClusterCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [rosesReady, setRosesReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const rosesImg = new Image();
    rosesImg.crossOrigin = 'anonymous';

    rosesImg.onload = () => {
      if (cancelled) return;
      const rCanvas = roseClusterCanvasRef.current;
      if (rCanvas) {
        const rw = 620;
        const rh = 340;
        rCanvas.width = rw;
        rCanvas.height = rh;
        const rCtx = rCanvas.getContext('2d');
        if (rCtx) {
          rCtx.clearRect(0, 0, rw, rh);

          // Sample the lush center-right cluster of photorealistic dark crimson velvet roses
          const sx = 0.16 * rosesImg.width;
          const sy = 0.32 * rosesImg.height;
          const sw = 0.72 * rosesImg.width;
          const sh = 0.62 * rosesImg.height;

          rCtx.drawImage(rosesImg, sx, sy, sw, sh, 0, 0, rw, rh);
          const rImgData = rCtx.getImageData(0, 0, rw, rh);
          const rData = rImgData.data;

          for (let y = 0; y < rh; y++) {
            const ny = y / rh;
            for (let x = 0; x < rw; x++) {
              const nx = x / rw;
              const p = (y * rw + x) * 4;
              const r = rData[p];
              const g = rData[p + 1];
              const b = rData[p + 2];

              // U-shaped rose bed curve: dips gently in the center so her hands & cup are visible, rises on the right
              const centerDip = Math.exp(-Math.pow((nx - 0.48) / 0.28, 2)) * 0.24;
              const rightPeak = Math.exp(-Math.pow((nx - 0.78) / 0.18, 2)) * 0.13;
              const topCurveY = 0.22 + centerDip - rightPeak;

              // Rounded bottom contour following the circular frame
              const bottomCurveY = 0.94 - Math.pow((nx - 0.5) / 0.49, 2) * 0.36;

              if (ny < topCurveY || ny > bottomCurveY || nx < 0.03 || nx > 0.97) {
                rData[p + 3] = 0;
                continue;
              }

              // Feather top, bottom, and side edges + remove near-black shadow gaps between blooms
              let alphaFactor = 1;
              if (ny < topCurveY + 0.16) {
                alphaFactor *= (ny - topCurveY) / 0.16;
              }
              if (ny > bottomCurveY - 0.14) {
                alphaFactor *= (bottomCurveY - ny) / 0.14;
              }
              const edgeDist = Math.min(nx, 1 - nx);
              if (edgeDist < 0.12) {
                alphaFactor *= edgeDist / 0.12;
              }

              // Deepen dark gaps between rose petals so individual blooms pop realistically
              if (r < 22 && g < 10 && b < 12) {
                alphaFactor *= 0.2;
              }

              rData[p + 3] = Math.round(rData[p + 3] * Math.max(0, Math.min(1, alphaFactor)));
            }
          }

          rCtx.putImageData(rImgData, 0, 0);
        }
      }
      setRosesReady(true);
    };

    rosesImg.src = VISUAL_ASSETS.HERO_ROSES;

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="relative w-[310px] h-[350px] sm:w-[440px] sm:h-[480px] lg:w-[490px] lg:h-[520px] mx-auto flex items-center justify-center select-none animate-portrait-entrance">
      {/* 1. Ambient Crimson Aura Behind Circle */}
      <div
        className="absolute inset-4 rounded-full bg-[radial-gradient(circle_at_50%_42%,rgba(145,14,28,0.52)_0%,rgba(55,5,10,0.22)_58%,transparent_76%)] blur-xl pointer-events-none"
        aria-hidden="true"
      />

      {/* 2. Glowing Circular Crimson Frame Holding Her Untouched Transparent Portrait */}
      <div className="relative w-[280px] h-[280px] sm:w-[390px] sm:h-[390px] lg:w-[430px] lg:h-[430px] rounded-full bg-[radial-gradient(circle_at_50%_38%,#6B0A15_0%,#3E050B_58%,#180204_100%)] border border-[#DFB4A8]/15 shadow-[0_0_90px_rgba(122,12,24,0.45)] overflow-hidden">
        {/* Untouched Photoroom Transparent PNG of His Fiancée (Zero Pixel Manipulation) */}
        <img
          src={VISUAL_ASSETS.FIANCEE_PHOTO}
          alt="My Fiancée on Valentine's Day 11/11"
          className="absolute bottom-[-7%] left-1/2 -translate-x-[57.2%] w-[228%] max-w-none h-auto pointer-events-none drop-shadow-[0_14px_28px_rgba(0,0,0,0.68)]"
        />

        {/* Subtle Warm Inner Vignette at the Very Bottom where Roses Meet Her Waist */}
        <div
          className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#180204]/85 via-[#2B0307]/35 to-transparent pointer-events-none"
          aria-hidden="true"
        />
      </div>

      {/* 3. Top-Right Rotating Circular Floral Seal */}
      <div
        className="absolute top-3 right-1 sm:top-5 sm:right-2 z-30 w-22 h-22 sm:w-26 sm:h-26 flex items-center justify-center"
        aria-hidden="true"
      >
        <div className="absolute inset-1 rounded-full border border-[#DFB4A8]/30 bg-[#180204]/80 backdrop-blur-xs" />
        <svg
          viewBox="0 0 120 120"
          className="w-full h-full animate-vinyl"
          style={{ animationDuration: '28s' }}
        >
          <defs>
            <path
              id="valentine-seal-circle"
              d="M 60, 60 m -43, 0 a 43,43 0 1,1 86,0 a 43,43 0 1,1 -86,0"
            />
          </defs>
          <text
            fill="#DFB4A8"
            fontSize="7.3"
            letterSpacing="2.4"
            className="uppercase font-sans"
          >
            <textPath href="#valentine-seal-circle" startOffset="0%">
              • MY FOREVER VALENTINE • 11 : 11 •
            </textPath>
          </text>
        </svg>
        <svg viewBox="0 0 40 40" className="w-6 h-6 absolute text-[#DFB4A8]">
          <path
            d="M20 8 C24 12, 26 17, 20 22 C14 17, 16 12, 20 8 Z M12 16 C16 16, 19 19, 20 23 C15 23, 12 20, 12 16 Z M28 16 C24 16, 21 19, 20 23 C25 23, 28 20, 28 16 Z M14 25 C17 24, 23 24, 26 25 C24 29, 16 29, 14 25 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
          />
        </svg>
      </div>

      {/* 4. Lush Photorealistic Dark Velvet Roses Cradling the Bottom of Her Portrait */}
      <canvas
        ref={roseClusterCanvasRef}
        aria-hidden="true"
        className={`absolute -bottom-3 sm:-bottom-4 left-1/2 -translate-x-1/2 w-[106%] h-[54%] object-contain z-20 pointer-events-none drop-shadow-[0_18px_28px_rgba(0,0,0,0.88)] transition-opacity duration-500 ${
          rosesReady ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};
