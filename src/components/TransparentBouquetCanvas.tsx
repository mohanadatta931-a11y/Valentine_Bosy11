import React, { useEffect, useRef, useState } from 'react';
import { isStudioBackdropPixel } from '../utils/loveLogic';

interface TransparentBouquetCanvasProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Removes 100% of the dark maroon studio backdrop and tabletop (including between
 * ribbon tails and around stems) so each bouquet floats with zero background and zero card.
 */
export const TransparentBouquetCanvas: React.FC<TransparentBouquetCanvasProps> = ({
  src,
  alt,
  className = '',
  style,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      if (cancelled) return;
      const canvas = canvasRef.current;
      if (!canvas) return;

      const w = 360;
      const h = 460;
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(img, 0, 0, w, h);

      const imgData = ctx.getImageData(0, 0, w, h);
      const data = imgData.data;
      const total = w * h;
      const isBg = new Uint8Array(total);
      const isRedBouquet = src.includes('bouquet_red');

      if (!isRedBouquet) {
        // For Pink & White bouquets, neither wrapping nor ribbon is dark maroon:
        // remove all studio maroon & tabletop pixels directly, including between ribbon tails!
        for (let y = 0; y < h; y++) {
          const ny = y / h;
          for (let x = 0; x < w; x++) {
            const idx = y * w + x;
            const p = idx * 4;
            const r = data[p];
            const g = data[p + 1];
            const b = data[p + 2];
            const isVelvetTable =
              ny > 0.72 && r < 118 && g < 28 && b < 30 && r - g >= 10;
            if (isStudioBackdropPixel(r, g, b) || isVelvetTable) {
              isBg[idx] = 1;
            }
          }
        }
      } else {
        // For the Red bouquet, flood-fill from borders while protecting only the red roses
        // inside the upper white paper (ny < 0.54) and the red ribbon inside the white cone
        const visited = new Uint8Array(total);
        const queue = new Int32Array(total);
        let head = 0;
        let tail = 0;

        const tryPush = (idx: number) => {
          if (visited[idx]) return;
          visited[idx] = 1;
          const cx = idx % w;
          const cy = (idx / w) | 0;
          const nx = cx / w;
          const ny = cy / h;

          // Everything below the bottom tip of the white paper cone (ny > 0.882) is studio floor
          if (ny > 0.882) {
            isBg[idx] = 1;
            queue[tail++] = idx;
            return;
          }

          // Protect the interior red satin ribbon inside the white paper cone
          if (nx > 0.39 && nx < 0.60 && ny > 0.60 && ny <= 0.88) {
            return;
          }

          const p = idx * 4;
          if (isStudioBackdropPixel(data[p], data[p + 1], data[p + 2])) {
            isBg[idx] = 1;
            queue[tail++] = idx;
          }
        };

        for (let x = 0; x < w; x++) {
          tryPush(x);
          tryPush((h - 1) * w + x);
        }
        for (let y = 0; y < h; y++) {
          tryPush(y * w);
          tryPush(y * w + (w - 1));
        }

        while (head < tail) {
          const curr = queue[head++];
          const cx = curr % w;
          const cy = (curr / w) | 0;
          if (cx > 0) tryPush(curr - 1);
          if (cx < w - 1) tryPush(curr + 1);
          if (cy > 0) tryPush(curr - w);
          if (cy < h - 1) tryPush(curr + w);
        }
      }

      // Apply transparency & smooth 2px edge feathering
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const idx = y * w + x;
          const p = idx * 4;
          if (isBg[idx]) {
            data[p + 3] = 0;
          } else {
            let bgNeighbors = 0;
            for (let dy = -2; dy <= 2; dy++) {
              const ny = y + dy;
              if (ny < 0 || ny >= h) continue;
              for (let dx = -2; dx <= 2; dx++) {
                const nx = x + dx;
                if (nx < 0 || nx >= w) continue;
                if (isBg[ny * w + nx]) bgNeighbors++;
              }
            }
            if (bgNeighbors > 0) {
              const factor = Math.max(0, 1 - bgNeighbors / 16);
              data[p + 3] = Math.round(data[p + 3] * factor);
            }
          }
        }
      }

      ctx.putImageData(imgData, 0, 0);
      setReady(true);
    };
    img.src = src;

    return () => {
      cancelled = true;
    };
  }, [src]);

  return (
    <div className={`relative flex items-center justify-center bg-transparent ${className}`} style={style}>
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={alt}
        className={`w-full h-full object-contain bg-transparent bouquet-canvas-shimmer ${
          ready ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};
