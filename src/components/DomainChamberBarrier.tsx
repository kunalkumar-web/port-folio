import React, { useState } from 'react';
import { Swords, Sparkles, ArrowDown, ShieldAlert, Zap, Flame } from 'lucide-react';
import { playCursedSlash, playHoverSound } from '../utils/audio';

interface DomainChamberBarrierProps {
  currentChamberNumber: number;
  nextChamberNumber: number;
  nextChamberName: string;
  nextChamberKanji: string;
  handSignName: string;
  nextChamberId: string;
  onUnlockNext: (targetId: string) => void;
}

export const DomainChamberBarrier: React.FC<DomainChamberBarrierProps> = ({
  currentChamberNumber,
  nextChamberNumber,
  nextChamberName,
  nextChamberKanji,
  handSignName,
  nextChamberId,
  onUnlockNext,
}) => {
  const [isSlicing, setIsSlicing] = useState<boolean>(false);
  const [barrierIntegrity, setBarrierIntegrity] = useState<number>(100);

  const handleSliceBarrier = () => {
    setIsSlicing(true);
    playCursedSlash();
    setBarrierIntegrity(0);

    setTimeout(() => {
      onUnlockNext(nextChamberId);
      setIsSlicing(false);
      setBarrierIntegrity(100);
    }, 450);
  };

  return (
    <div className="relative py-16 px-4 max-w-5xl mx-auto my-8 overflow-hidden">
      
      {/* Background Cursed Barrier Mesh Lines */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-red-500/80 to-transparent" />
        <div className="absolute w-3/4 h-px bg-gradient-to-r from-transparent via-purple-500/80 to-transparent rotate-1" />
      </div>

      {/* Screen Slice Slash FX */}
      {isSlicing && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <div className="absolute w-[200vw] h-[4px] bg-gradient-to-r from-transparent via-red-500 to-white -rotate-12 shadow-[0_0_30px_#ef4444] animate-pulse" />
          <div className="absolute w-[200vw] h-[3px] bg-gradient-to-r from-transparent via-purple-500 to-white rotate-25 shadow-[0_0_25px_#8b5cf6]" />
          <div className="absolute inset-0 bg-red-600/20 mix-blend-screen" />
        </div>
      )}

      {/* Barrier Gate Card */}
      <div className="relative rounded-3xl bg-black/85 border border-red-500/40 p-6 sm:p-8 backdrop-blur-xl shadow-2xl shadow-red-950/40 text-center space-y-5 max-w-2xl mx-auto group hover:border-red-500/70 transition-all">
        
        {/* Top Badges */}
        <div className="flex items-center justify-center gap-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/60 border border-red-500/40 text-[11px] font-mono text-red-400 uppercase tracking-widest">
            <ShieldAlert className="w-3 h-3 text-red-500" />
            <span>Cursed Domain Barrier &bull; Chamber 0{currentChamberNumber} &rarr; 0{nextChamberNumber}</span>
          </div>
        </div>

        {/* Big Kanji Seal and Next Chamber Title */}
        <div className="space-y-2">
          <div className="text-4xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-red-400 via-purple-300 to-white font-mono tracking-widest select-none">
            {nextChamberKanji}
          </div>
          
          <h3 className="text-xl sm:text-2xl font-bold font-mono text-white tracking-tight">
            Next Domain: <span className="text-red-400">{nextChamberName}</span>
          </h3>

          <p className="text-xs sm:text-sm text-zinc-400 font-mono max-w-md mx-auto">
            Requires hand sign seal <strong className="text-purple-300">[{handSignName}]</strong> or Cleave energy to dissolve the boundary barrier.
          </p>
        </div>

        {/* Action Trigger Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          
          {/* Main Slice Trigger Button */}
          <button
            id={`unlock-barrier-btn-${nextChamberId}`}
            onClick={handleSliceBarrier}
            onMouseEnter={() => playHoverSound(620, 0.03)}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-red-600 via-purple-600 to-red-600 hover:from-red-500 hover:to-purple-500 text-white font-mono font-bold text-xs uppercase tracking-wider shadow-xl shadow-red-600/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 border border-white/20"
          >
            <Swords className="w-4 h-4 text-white animate-pulse" />
            <span>Slice Barrier &amp; Reveal Chamber 0{nextChamberNumber}</span>
            <Zap className="w-3.5 h-3.5 text-amber-300" />
          </button>

          {/* Natural Scroll Alternative */}
          <button
            id={`scroll-down-btn-${nextChamberId}`}
            onClick={() => {
              playHoverSound(500, 0.02);
              onUnlockNext(nextChamberId);
            }}
            className="w-full sm:w-auto px-4 py-3 rounded-2xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white text-xs font-mono transition-all flex items-center justify-center gap-1.5"
          >
            <span>Or Scroll Directly</span>
            <ArrowDown className="w-3.5 h-3.5 text-red-400 animate-bounce" />
          </button>

        </div>

        {/* Integrity Indicator */}
        <div className="pt-2 flex items-center justify-center gap-2 text-[10px] font-mono text-zinc-500">
          <Flame className="w-3 h-3 text-red-500" />
          <span>Barrier Resonance: {barrierIntegrity}% &bull; Ready to Expand</span>
        </div>

      </div>

    </div>
  );
};
