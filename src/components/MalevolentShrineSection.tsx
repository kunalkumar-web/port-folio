import React from 'react';
import { MalevolentShrine3D } from './MalevolentShrine3D';
import { Swords, Sparkles, Flame, Shield, ArrowDown, Eye } from 'lucide-react';
import { playClickSound, playHoverSound } from '../utils/audio';

interface MalevolentShrineSectionProps {
  onScrollToCharacters?: () => void;
}

export const MalevolentShrineSection: React.FC<MalevolentShrineSectionProps> = ({
  onScrollToCharacters,
}) => {
  return (
    <section
      id="malevolent-shrine-section"
      className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden z-10"
    >
      {/* Background Cursed Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-red-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/80 border border-red-500/50 text-xs font-mono text-zinc-300 uppercase tracking-widest shadow-lg shadow-black">
            <Flame className="w-3.5 h-3.5 text-red-500 animate-pulse" />
            <span className="text-red-400 font-bold">Innate Domain</span>
            <span className="text-zinc-600">&bull;</span>
            <span className="text-purple-300">Ryomen Sukuna 3D Model</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-mono">
            Malevolent Shrine{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-purple-400 to-white">
              (伏魔御廚子)
            </span>
          </h2>

          <p className="text-zinc-400 text-sm sm:text-base font-mono leading-relaxed">
            Real-time WebGL 3D reconstruction of Sukuna&apos;s divine altar. Features multi-tiered vermilion eaves, towering horn crests, mountain of bone skulls, and interactive Cleave &amp; Dismantle slicing engines.
          </p>
        </div>

        {/* 3D Shrine Stage Canvas Container */}
        <div className="relative w-full h-[540px] sm:h-[620px] rounded-3xl overflow-hidden border border-red-500/40 shadow-2xl shadow-red-950/60 bg-[#050508]">
          <MalevolentShrine3D className="w-full h-full" enableWheelZoom={false} />
        </div>

        {/* Feature Badges & Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-zinc-950/90 border border-zinc-800/80 hover:border-red-500/40 transition-all text-left">
            <div className="flex items-center gap-2 text-red-400 font-mono font-bold text-sm mb-1">
              <Swords className="w-4 h-4" />
              <span>Cleave &amp; Dismantle (解・捌)</span>
            </div>
            <p className="text-xs text-zinc-400 font-mono leading-relaxed">
              Adapted slicing algorithms adjusted to targets based on cursed toughness and density.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-950/90 border border-zinc-800/80 hover:border-purple-500/40 transition-all text-left">
            <div className="flex items-center gap-2 text-purple-400 font-mono font-bold text-sm mb-1">
              <Shield className="w-4 h-4" />
              <span>Open-Barrier Radius (200m)</span>
            </div>
            <p className="text-xs text-zinc-400 font-mono leading-relaxed">
              Expands without a closed physical barrier, maximizing area destruction with heavenly binding vows.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-950/90 border border-zinc-800/80 hover:border-red-500/40 transition-all text-left">
            <div className="flex items-center gap-2 text-white font-mono font-bold text-sm mb-1">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Full-Stack Architecture</span>
            </div>
            <p className="text-xs text-zinc-400 font-mono leading-relaxed">
              Resilient enterprise microservices, AI prompt pipelines, and 99.98% production uptime.
            </p>
          </div>
        </div>

        {/* Scroll down prompt */}
        {onScrollToCharacters && (
          <div className="flex justify-center pt-4">
            <button
              id="scroll-to-sorcery-domain-btn"
              onClick={() => {
                playClickSound();
                onScrollToCharacters();
              }}
              onMouseEnter={() => playHoverSound(500, 0.02)}
              className="px-5 py-2.5 rounded-full bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 hover:border-red-500/50 text-zinc-300 hover:text-white text-xs font-mono transition-all flex items-center gap-2 shadow-lg"
            >
              <span>Scroll to JJK Sorcery Domain &amp; Projects</span>
              <ArrowDown className="w-4 h-4 text-red-400 animate-bounce" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
