import React, { useState } from 'react';
import { MalevolentShrine3D } from './MalevolentShrine3D';
import { SukunaSVG } from './JJKCharacters';
import { playDomainExpansionSound, playCursedSlash, playHoverSound } from '../utils/audio';
import { Swords, Sparkles, Volume2, VolumeX, Eye, ArrowRight } from 'lucide-react';
import { toggleAudioMute, getIsAudioMuted } from '../utils/audio';

interface DomainExpansionEntryProps {
  onEnter: () => void;
}

export const DomainExpansionEntry: React.FC<DomainExpansionEntryProps> = ({ onEnter }) => {
  const [isExpanding, setIsExpanding] = useState<boolean>(false);
  const [audioMuted, setAudioMutedState] = useState<boolean>(getIsAudioMuted());

  const handleDomainExpansion = () => {
    playDomainExpansionSound();
    setIsExpanding(true);

    setTimeout(() => {
      onEnter();
    }, 1200);
  };

  const handleToggleSound = () => {
    const next = toggleAudioMute();
    setAudioMutedState(next);
  };

  return (
    <div
      id="domain-expansion-entry-gate"
      className="fixed inset-0 z-50 bg-[#050508] text-white flex flex-col justify-between overflow-hidden"
    >
      {/* 3D Malevolent Shrine WebGL View */}
      <MalevolentShrine3D
        isInitialPortal={true}
        onEnterWebsite={handleDomainExpansion}
        className="absolute inset-0 w-full h-full"
      />

      {/* Domain Expansion Slicing Transition Effect */}
      {isExpanding && (
        <div className="absolute inset-0 pointer-events-none z-40 bg-black/90 transition-opacity duration-1000 flex items-center justify-center">
          <div className="text-center space-y-4 animate-scaleUp">
            <div className="text-5xl sm:text-7xl font-black font-mono tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-purple-400 to-white animate-pulse">
              領域展開
            </div>
            <div className="text-2xl sm:text-3xl font-mono text-zinc-300 tracking-wider">
              伏魔御廚子 &bull; MALEVOLENT SHRINE
            </div>
          </div>
          {/* Slicing laser lines */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent rotate-45 shadow-[0_0_30px_#ef4444]" />
            <div className="w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent -rotate-45 shadow-[0_0_30px_#a855f7]" />
          </div>
        </div>
      )}

      {/* Top Overlay Branding */}
      <div className="relative z-20 p-6 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-3 pointer-events-auto">
          <div className="w-10 h-10 rounded-xl bg-black/80 border border-red-500/60 p-1.5 shadow-lg shadow-black">
            <SukunaSVG color="#ef4444" />
          </div>
          <div>
            <div className="text-xs font-mono text-red-400 tracking-wider uppercase font-semibold">
              JUJUTSU KAISEN DOMAIN EXPANSION
            </div>
            <div className="text-sm font-bold text-white font-mono">
              KUNAL KUMAR &bull; SOFTWARE ARSENAL
            </div>
          </div>
        </div>

        {/* Audio Toggle & Skip */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            id="entry-sound-toggle-btn"
            onClick={handleToggleSound}
            onMouseEnter={() => playHoverSound(500, 0.02)}
            className="p-2.5 rounded-xl bg-black/80 backdrop-blur-md border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-all flex items-center gap-1.5 text-xs font-mono"
            title="Toggle Cursed Sound FX"
          >
            {audioMuted ? <VolumeX className="w-4 h-4 text-zinc-500" /> : <Volume2 className="w-4 h-4 text-red-400" />}
            <span className="hidden sm:inline">{audioMuted ? 'Muted' : 'Sound ON'}</span>
          </button>

          <button
            id="entry-skip-btn"
            onClick={onEnter}
            onMouseEnter={() => playHoverSound(600, 0.02)}
            className="px-4 py-2.5 rounded-xl bg-black/80 backdrop-blur-md border border-zinc-800 text-zinc-400 hover:text-white text-xs font-mono transition-all flex items-center gap-1.5"
          >
            <span>Direct Access</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Central Domain Gate Summoning Card */}
      <div className="relative z-20 max-w-2xl mx-auto text-center px-4 space-y-6 pointer-events-none">
        
        {/* Floating Japanese Kanji Seal */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/85 backdrop-blur-md border border-red-500/50 text-xs font-mono tracking-widest text-red-400 shadow-xl pointer-events-auto">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
          <span>HEIAN ERA &bull; SPECIAL GRADE DOMAIN</span>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
            Ryōiki Tenkai: <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-purple-400 to-white">
              Fukuma Mizushi
            </span>
          </h1>
          <p className="text-xs sm:text-sm font-mono text-zinc-400 max-w-lg mx-auto leading-relaxed">
            Sukuna’s Benevolent Shrine barrier is manifested. Interact with the 3D shrine, harness Cursed Energy, and enter the technical engineering domain of Kunal Kumar.
          </p>
        </div>

        {/* Main Domain Expansion Button with Hand Seal */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5 pointer-events-auto">
          <button
            id="expand-domain-main-btn"
            onClick={handleDomainExpansion}
            onMouseEnter={() => playHoverSound(700, 0.04)}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-red-600 via-purple-600 to-red-600 hover:from-red-500 hover:to-purple-500 text-white font-mono font-extrabold text-sm uppercase tracking-widest shadow-2xl shadow-red-600/40 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 border border-white/20 group"
          >
            <Swords className="w-5 h-5 text-white group-hover:rotate-45 transition-transform" />
            <span>Cast Hand Sign &bull; Expand Domain</span>
          </button>
        </div>

      </div>

      {/* Bottom Footer Details */}
      <div className="relative z-20 p-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-zinc-500 pointer-events-none">
        <div className="flex items-center gap-2">
          <span className="text-red-400 font-bold">術式:</span>
          <span>Cleave (捌) &bull; Dismantle (解) &bull; Unlimited Void &bull; Black Flash</span>
        </div>
        <div className="text-zinc-400">
          Click anywhere or drag in 3D to explore the shrine
        </div>
      </div>
    </div>
  );
};
