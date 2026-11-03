import React, { useState } from 'react';
import { JJK_CHARACTERS, JJKCharacter } from './JJKCharacters';
import { playCursedSlash, playBlackFlashSound, playHollowPurpleSound, playHoverSound, playDomainExpansionSound } from '../utils/audio';
import { Sparkles, Swords, Zap, Shield, Flame, Activity, CheckCircle2 } from 'lucide-react';

export const JJKCharacterShowcase: React.FC = () => {
  const [selectedCharacter, setSelectedCharacter] = useState<JJKCharacter>(JJK_CHARACTERS[0]);
  const [activeTechnique, setActiveTechnique] = useState<string | null>(null);
  const [domainClashPower, setDomainClashPower] = useState<{ sukuna: number; gojo: number }>({ sukuna: 50, gojo: 50 });
  const [clashStatus, setClashStatus] = useState<string>('Balanced Domain Barrier');

  const handleSelectCharacter = (char: JJKCharacter) => {
    setSelectedCharacter(char);
    playHoverSound(520, 0.04);
  };

  const handleCastTechnique = (char: JJKCharacter) => {
    setActiveTechnique(char.id);

    if (char.id === 'sukuna') {
      playCursedSlash();
    } else if (char.id === 'gojo') {
      playHollowPurpleSound();
    } else if (char.id === 'yuji') {
      playBlackFlashSound();
    } else {
      playDomainExpansionSound();
    }

    setTimeout(() => {
      setActiveTechnique(null);
    }, 1200);
  };

  const handleDomainClashBoost = (side: 'sukuna' | 'gojo') => {
    setDomainClashPower((prev) => {
      let nextSukuna = prev.sukuna;
      let nextGojo = prev.gojo;

      if (side === 'sukuna') {
        playCursedSlash();
        nextSukuna = Math.min(100, nextSukuna + 10);
        nextGojo = Math.max(0, nextGojo - 10);
      } else {
        playHollowPurpleSound();
        nextGojo = Math.min(100, nextGojo + 10);
        nextSukuna = Math.max(0, nextSukuna - 10);
      }

      if (nextSukuna > 70) {
        setClashStatus('Malevolent Shrine Slicing Void Barrier from the Outside!');
      } else if (nextGojo > 70) {
        setClashStatus('Unlimited Void Stalling Sukuna’s Shrine!');
      } else {
        setClashStatus('Equal Domain Barrier Collision: High Cursed Density');
      }

      return { sukuna: nextSukuna, gojo: nextGojo };
    });
  };

  return (
    <section id="jjk-sorcery-domain" className="relative py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center space-y-3 mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/40 border border-red-500/40 text-red-400 font-mono text-xs tracking-widest uppercase">
          <Sparkles className="w-3.5 h-3.5 text-red-400" />
          <span>Special Grade Jujutsu Classification</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white font-mono">
          Cursed Energy &bull;{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-purple-400 to-white">
            Technique Arsenal
          </span>
        </h2>

        <p className="text-zinc-400 text-sm font-mono max-w-xl mx-auto">
          High-resolution vector Jujutsu Kaisen sorcery profiles. Click to cast innate techniques, unleash Domain Expansions, and simulate real-time Domain Clashes.
        </p>
      </div>

      {/* Grid of Characters & Technique Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Character Selection Cards */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider px-1">
            Select Sorcerer / Curse Profile
          </div>

          {JJK_CHARACTERS.map((char) => {
            const isSelected = selectedCharacter.id === char.id;
            return (
              <div
                key={char.id}
                id={`char-card-${char.id}`}
                onClick={() => handleSelectCharacter(char)}
                className={`p-4 rounded-2xl cursor-pointer transition-all border flex items-center justify-between gap-4 ${
                  isSelected
                    ? 'bg-zinc-900/90 border-red-500 shadow-xl shadow-red-950/40 translate-x-2'
                    : 'bg-zinc-950/60 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/40'
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Crisp SVG Icon */}
                  <div className={`w-14 h-14 rounded-xl p-1 bg-black/80 border ${isSelected ? 'border-red-500' : 'border-zinc-800'}`}>
                    {char.svgIcon}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-white text-base">{char.name}</h4>
                      <span className="text-xs font-mono text-zinc-500">{char.japaneseName}</span>
                    </div>
                    <div className="text-xs font-mono text-zinc-400">{char.grade}</div>
                    <div className="text-[11px] font-mono text-red-400 truncate max-w-[200px]">
                      {char.technique}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full border ${
                      char.energyColor === 'crimson'
                        ? 'bg-red-950/60 border-red-500 text-red-300'
                        : char.energyColor === 'violet'
                        ? 'bg-purple-950/60 border-purple-500 text-purple-300'
                        : 'bg-zinc-900 border-zinc-700 text-zinc-300'
                    }`}
                  >
                    {char.energyColor}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Selected Character Deep-Dive & Interactive Technique Engine */}
        <div className="lg:col-span-7 bg-zinc-950/90 rounded-3xl border border-red-500/30 p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl">
          
          {/* Active Technique Slicing / Energy Blast Aura */}
          {activeTechnique === selectedCharacter.id && (
            <div className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center bg-red-600/10 backdrop-blur-[1px]">
              <div className="w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-white rotate-12 shadow-[0_0_20px_#ef4444]" />
              <div className="w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-white -rotate-12 shadow-[0_0_20px_#a855f7]" />
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-6 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-2xl bg-black border-2 border-red-500 p-2 shadow-lg shadow-black">
                {selectedCharacter.svgIcon}
              </div>
              <div>
                <div className="inline-block text-[11px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-red-950/80 border border-red-500/40 text-red-400 mb-1">
                  {selectedCharacter.grade}
                </div>
                <h3 className="text-2xl font-black text-white font-mono">{selectedCharacter.name}</h3>
                <p className="text-xs text-zinc-400 font-mono">{selectedCharacter.title}</p>
              </div>
            </div>

            <button
              id={`cast-technique-btn-${selectedCharacter.id}`}
              onClick={() => handleCastTechnique(selectedCharacter)}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-red-600 via-purple-600 to-red-600 hover:from-red-500 hover:to-purple-500 text-white font-mono font-bold text-xs uppercase tracking-wider shadow-lg shadow-red-950 flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all"
            >
              <Swords className="w-4 h-4 text-white" />
              <span>Cast Technique</span>
            </button>
          </div>

          {/* Details & Lore */}
          <div className="space-y-6">
            
            {/* Domain & Innate Technique Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-black/60 border border-zinc-800">
                <div className="text-xs font-mono text-red-400 font-bold uppercase mb-1 flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-red-400" />
                  <span>Domain Expansion</span>
                </div>
                <div className="text-sm font-bold text-white font-mono">{selectedCharacter.domain}</div>
              </div>

              <div className="p-4 rounded-xl bg-black/60 border border-zinc-800">
                <div className="text-xs font-mono text-purple-400 font-bold uppercase mb-1 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-purple-400" />
                  <span>Innate Technique</span>
                </div>
                <div className="text-sm font-bold text-white font-mono">{selectedCharacter.technique}</div>
              </div>
            </div>

            {/* Description */}
            <p className="text-zinc-300 text-sm font-mono leading-relaxed bg-zinc-900/50 p-4 rounded-xl border border-zinc-800/80">
              {selectedCharacter.description}
            </p>

            {/* Signature Quote */}
            <blockquote className="border-l-2 border-red-500 pl-4 py-1 text-sm italic font-mono text-zinc-300">
              {selectedCharacter.quote}
            </blockquote>

            {/* Domain Clash Simulator Interactive Widget */}
            <div className="p-5 rounded-2xl bg-black/80 border border-zinc-800 space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Activity className="w-4 h-4 text-red-400" />
                  <span>Interactive Domain Clash Engine</span>
                </div>
                <span className="text-[11px] font-mono text-zinc-400">{clashStatus}</span>
              </div>

              {/* Clash Power Bar */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-red-400 font-bold">Sukuna (Malevolent Shrine): {domainClashPower.sukuna}%</span>
                  <span className="text-purple-400 font-bold">Gojo (Unlimited Void): {domainClashPower.gojo}%</span>
                </div>

                <div className="h-3 w-full bg-zinc-900 rounded-full overflow-hidden flex border border-zinc-800">
                  <div
                    className="h-full bg-gradient-to-r from-red-700 to-red-500 transition-all duration-300 shadow-[0_0_10px_#ef4444]"
                    style={{ width: `${domainClashPower.sukuna}%` }}
                  />
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-violet-700 transition-all duration-300 shadow-[0_0_10px_#8b5cf6]"
                    style={{ width: `${domainClashPower.gojo}%` }}
                  />
                </div>
              </div>

              {/* Clash Interactive Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <button
                  id="clash-boost-sukuna-btn"
                  onClick={() => handleDomainClashBoost('sukuna')}
                  className="py-2.5 px-3 rounded-xl bg-zinc-900 hover:bg-red-950/80 border border-red-500/40 hover:border-red-500 text-white text-xs font-mono font-bold transition-all flex items-center justify-center gap-2"
                >
                  <span>🔴 Boost Sukuna Cleave</span>
                </button>
                <button
                  id="clash-boost-gojo-btn"
                  onClick={() => handleDomainClashBoost('gojo')}
                  className="py-2.5 px-3 rounded-xl bg-zinc-900 hover:bg-purple-950/80 border border-purple-500/40 hover:border-purple-500 text-white text-xs font-mono font-bold transition-all flex items-center justify-center gap-2"
                >
                  <span>🟣 Boost Gojo Void</span>
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>

    </section>
  );
};
