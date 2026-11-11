import React, { useEffect, useRef } from 'react';

interface FallingPetalsCanvasProps {
  burstKey: number;
}

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  opacity: number;
}

const PETAL_COLORS = ['#7D0A16', '#A81323', '#DFB4A8', '#C97B89'];

export const FallingPetalsCanvas: React.FC<FallingPetalsCanvasProps> = ({ burstKey }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const petalsRef = useRef<Petal[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const createPetal = (fromTop: boolean): Petal => ({
      x: Math.random() * canvas.width,
      y: fromTop ? -25 - Math.random() * 140 : Math.random() * canvas.height,
      size: 6 + Math.random() * 7.5,
      // Ultra-slow, feather-light descent from top
      speedY: 0.14 + Math.random() * 0.22,
      speedX: -0.1 + Math.random() * 0.2,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: -0.004 + Math.random() * 0.008,
      color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
      opacity: 0.35 + Math.random() * 0.38,
    });

    if (petalsRef.current.length === 0) {
      petalsRef.current = Array.from({ length: 18 }, () => createPetal(false));
    }

    let animId = 0;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < petalsRef.current.length; i++) {
        const p = petalsRef.current[i];
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.y * 0.007) * 0.14;
        p.rotation += p.rotationSpeed;

        if (p.y > canvas.height + 24) {
          if (petalsRef.current.length > 18) {
            petalsRef.current.splice(i, 1);
            i--;
            continue;
          }
          p.y = -24;
          p.x = Math.random() * canvas.width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;

        // Draw organic rose petal shape with soft cleft
        ctx.beginPath();
        ctx.moveTo(0, -p.size * 0.75);
        ctx.bezierCurveTo(
          p.size * 0.95,
          -p.size * 0.85,
          p.size * 0.95,
          p.size * 0.7,
          0,
          p.size
        );
        ctx.bezierCurveTo(
          -p.size * 0.95,
          p.size * 0.7,
          -p.size * 0.95,
          -p.size * 0.85,
          0,
          -p.size * 0.75
        );
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // Spawn extra gentle shower of petals when burstKey increments
  useEffect(() => {
    if (burstKey <= 0) return;
    const canvas = canvasRef.current;
    const width = canvas ? canvas.width : window.innerWidth;
    const extraPetals: Petal[] = Array.from({ length: 14 }, () => ({
      x: Math.random() * width,
      y: -15 - Math.random() * 140,
      size: 6.5 + Math.random() * 8,
      speedY: 0.25 + Math.random() * 0.32,
      speedX: -0.18 + Math.random() * 0.36,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: -0.006 + Math.random() * 0.012,
      color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
      opacity: 0.5 + Math.random() * 0.32,
    }));
    petalsRef.current.push(...extraPetals);
  }, [burstKey]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-30"
    />
  );
};

