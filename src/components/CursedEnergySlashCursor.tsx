import React, { useEffect, useState, useRef } from 'react';
import { playCursedSlash } from '../utils/audio';

interface SlashSlice {
  id: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
  createdAt: number;
}

export const CursedEnergySlashCursor: React.FC = () => {
  const [slashes, setSlashes] = useState<SlashSlice[]>([]);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);
  const isMouseDownRef = useRef<boolean>(false);
  const idCounterRef = useRef<number>(0);

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      // Don't trigger on inputs or buttons to allow regular clicking
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT') {
        return;
      }

      isMouseDownRef.current = true;
      lastPosRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isMouseDownRef.current || !lastPosRef.current) return;

      const dx = e.clientX - lastPosRef.current.x;
      const dy = e.clientY - lastPosRef.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 35) {
        const colors = ['#ef4444', '#dc2626', '#a855f7', '#8b5cf6', '#ffffff', '#6366f1'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        idCounterRef.current += 1;
        const newSlash: SlashSlice = {
          id: idCounterRef.current,
          x1: lastPosRef.current.x,
          y1: lastPosRef.current.y,
          x2: e.clientX,
          y2: e.clientY,
          color: randomColor,
          createdAt: Date.now(),
        };

        setSlashes((prev) => [...prev.slice(-15), newSlash]);
        lastPosRef.current = { x: e.clientX, y: e.clientY };

        // Subtle audio feedback throttled
        if (Math.random() > 0.6) {
          playCursedSlash();
        }
      }
    };

    const handleMouseUp = () => {
      isMouseDownRef.current = false;
      lastPosRef.current = null;
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Clean up stale slashes
    const cleanupInterval = setInterval(() => {
      const now = Date.now();
      setSlashes((prev) => prev.filter((s) => now - s.createdAt < 700));
    }, 150);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      clearInterval(cleanupInterval);
    };
  }, []);

  if (slashes.length === 0) return null;

  return (
    <svg className="fixed inset-0 pointer-events-none z-50 w-full h-full">
      <defs>
        <filter id="cursed-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {slashes.map((s) => {
        const age = Date.now() - s.createdAt;
        const opacity = Math.max(0, 1 - age / 700);

        return (
          <g key={s.id} opacity={opacity}>
            {/* Outer Energy Aura */}
            <line
              x1={s.x1}
              y1={s.y1}
              x2={s.x2}
              y2={s.y2}
              stroke={s.color}
              strokeWidth="6"
              strokeLinecap="round"
              filter="url(#cursed-glow)"
              opacity="0.8"
            />
            {/* Inner White Core Cutting Blade */}
            <line
              x1={s.x1}
              y1={s.y1}
              x2={s.x2}
              y2={s.y2}
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* End Point Sparks */}
            <circle cx={s.x2} cy={s.y2} r="3" fill="#ffffff" />
            <circle cx={s.x2} cy={s.y2} r="6" fill={s.color} opacity="0.6" />
          </g>
        );
      })}
    </svg>
  );
};
