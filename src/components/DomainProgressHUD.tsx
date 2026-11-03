import React, { useState, useEffect } from 'react';
import { Sparkles, Swords, Volume2, VolumeX, Flame, Zap, ArrowRight, Check } from 'lucide-react';
import { playHoverSound, playClickSound, playCursedSlash, toggleAudioMute, getIsAudioMuted } from '../utils/audio';

export interface DomainChamber {
  id: string;
  name: string;
  kanji: string;
  handSign: string;
  description: string;
}

export const DOMAIN_CHAMBERS: DomainChamber[] = [
  { id: 'hero', name: 'Chamber I: Summoning', kanji: '領域召喚', handSign: 'Enmaten (閻魔天)', description: 'Special Grade Developer Awakening & Innate Identity' },
  { id: 'malevolent-shrine-section', name: 'Chamber II: 3D Shrine Altar', kanji: '伏魔御廚子', handSign: 'Malevolent Shrine', description: 'Interactive WebGL 3D Sukuna Temple & Cleave Slicer' },
  { id: 'jjk-sorcery-domain', name: 'Chamber III: Technique Arsenal', kanji: '術式開示', handSign: 'Infinite Void', description: 'Sorcerer & Curse Profiles with Domain Clash Engine' },
  { id: 'projects', name: 'Chamber IV: Shipped Domains', kanji: '術式構築', handSign: 'Ten Shadows', description: 'Enterprise AI Automation & Microservice Blueprints' },
  { id: 'visuals', name: 'Chamber V: Visual Chronicle', kanji: '三次元空間', handSign: 'Authentic Lens', description: 'Spatial 3D Photography & Cursed Color Grading' },
  { id: 'skills', name: 'Chamber VI: Attribute Matrix', kanji: '呪力出力', handSign: 'Black Flash', description: 'Special Grade Skills Radar & Heian Stack Tree' },
  { id: 'experience', name: 'Chamber VII: Sorcerer Milestones', kanji: '歴戦記録', handSign: 'Binding Vows', description: 'PragmaApps Battle Log & Production Campaigns' },
  { id: 'contact', name: 'Chamber VIII: Binding Vow', kanji: '束縛契約', handSign: 'Summoning Circle', description: 'Seal Cursed Transmission & Direct Inquiry Pact' },
];

interface DomainProgressHUDProps {
  activeSection: string;
  cursedOutput: number;
  unlockedChambers: string[];
  onNavigate: (sectionId: string) => void;
  onCursedOutputIncrease: (amount?: number) => void;
}

export const DomainProgressHUD: React.FC<DomainProgressHUDProps> = ({
  activeSection,
  cursedOutput,
  unlockedChambers,
  onNavigate,
  onCursedOutputIncrease,
}) => {
  const [isMuted, setIsMuted] = useState<boolean>(getIsAudioMuted());
  const [showChaptersMenu, setShowChaptersMenu] = useState<boolean>(false);

  useEffect(() => {
    setIsMuted(getIsAudioMuted());
  }, []);

  const handleToggleMute = () => {
    const nextMuted = toggleAudioMute();
    setIsMuted(nextMuted);
    if (!nextMuted) {
      onCursedOutputIncrease(5);
    }
  };

  const currentIndex = DOMAIN_CHAMBERS.findIndex((c) => c.id === activeSection);
  const currentChamber = DOMAIN_CHAMBERS[currentIndex >= 0 ? currentIndex : 0];
  const nextChamber = DOMAIN_CHAMBERS[Math.min(currentIndex + 1, DOMAIN_CHAMBERS.length - 1)];

  // Get Grade Title based on output %
  let gradeTitle = 'Semi-Grade 1 Sorcerer';
  let gradeColor = 'text-purple-400';
  if (cursedOutput >= 90) {
    gradeTitle = 'King of Curses (宿儺級)';
    gradeColor = 'text-red-400 font-extrabold';
  } else if (cursedOutput >= 65) {
    gradeTitle = 'Special Grade Sorcerer (特級)';
    gradeColor = 'text-amber-400 font-bold';
  } else if (cursedOutput >= 35) {
    gradeTitle = 'Grade 1 Sorcerer (一級)';
    gradeColor = 'text-purple-300';
  }

  const handleNextChamber = () => {
    playCursedSlash();
    onCursedOutputIncrease(15);
    if (currentIndex < DOMAIN_CHAMBERS.length - 1) {
      onNavigate(nextChamber.id);
    }
  };

  return (
    <aside aria-label="Cursed Domain HUD" className="fixed top-20 left-0 right-0 z-30 pointer-events-none px-3 sm:px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        
        {/* Left: Active Domain Chamber Badge & Dropdown Trigger */}
        <div className="pointer-events-auto relative">
          <button
            id="domain-chamber-selector-btn"
            onClick={() => {
              playClickSound();
              setShowChaptersMenu(!showChaptersMenu);
            }}
            onMouseEnter={() => playHoverSound(580, 0.02)}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-black/85 hover:bg-zinc-950 backdrop-blur-xl border border-red-500/40 hover:border-red-400 text-left shadow-2xl shadow-black transition-all group"
          >
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-80" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
            </span>

            <div>
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                <span className="text-red-400 font-bold">{currentChamber.kanji}</span>
                <span>&bull;</span>
                <span className="hidden sm:inline">Stage {currentIndex + 1}/8</span>
              </div>
              <div className="text-xs font-mono font-bold text-white group-hover:text-red-300 transition-colors flex items-center gap-1.5">
                <span>{currentChamber.name}</span>
                <span className="text-[10px] text-zinc-500">&#9662;</span>
              </div>
            </div>
          </button>

          {/* Quick Domain Chambers Menu */}
          {showChaptersMenu && (
            <div className="absolute top-full mt-2 left-0 w-80 max-h-96 overflow-y-auto bg-black/95 backdrop-blur-2xl border border-red-500/50 rounded-2xl p-2 shadow-2xl z-50 animate-scaleUp">
              <div className="px-3 py-2 text-[10px] font-mono text-zinc-400 uppercase border-b border-zinc-800/80 flex items-center justify-between">
                <span>Domain Chamber Invocations</span>
                <span className="text-red-400">{unlockedChambers.length}/8 Discovered</span>
              </div>

              <div className="space-y-1 mt-1">
                {DOMAIN_CHAMBERS.map((c, idx) => {
                  const isCurrent = c.id === activeSection;
                  const isUnlocked = unlockedChambers.includes(c.id);

                  return (
                    <button
                      key={c.id}
                      id={`hud-chamber-jump-${c.id}`}
                      onClick={() => {
                        playClickSound();
                        onNavigate(c.id);
                        setShowChaptersMenu(false);
                      }}
                      className={`w-full text-left p-2.5 rounded-xl text-xs font-mono transition-all flex items-center justify-between ${
                        isCurrent
                          ? 'bg-red-600/25 text-white border border-red-500/60'
                          : isUnlocked
                          ? 'text-zinc-300 hover:bg-zinc-900 hover:text-white'
                          : 'text-zinc-500 hover:bg-zinc-950'
                      }`}
                    >
                      <div>
                        <div className="font-bold flex items-center gap-1.5">
                          <span className="text-red-400 text-[10px]">{c.kanji}</span>
                          <span>{c.name}</span>
                        </div>
                        <div className="text-[10px] text-zinc-400 truncate max-w-[200px]">{c.description}</div>
                      </div>

                      {isCurrent ? (
                        <span className="px-1.5 py-0.5 rounded bg-red-600 text-[9px] font-bold text-white uppercase">Active</span>
                      ) : isUnlocked ? (
                        <Check className="w-3.5 h-3.5 text-green-400" />
                      ) : (
                        <span className="text-[10px] text-zinc-600 font-mono">0{idx + 1}</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Center: Domain Expansion Cursed Output Meter */}
        <div className="pointer-events-auto hidden md:flex items-center gap-3 px-4 py-1.5 rounded-xl bg-black/85 backdrop-blur-xl border border-zinc-800 shadow-xl">
          <div className="flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-red-500 animate-pulse" />
            <span className="text-[11px] font-mono text-zinc-300">Cursed Output:</span>
            <strong className="text-xs font-mono text-red-400 font-black">{cursedOutput}%</strong>
          </div>

          {/* Progress Bar with Cursed Gradient */}
          <div className="w-28 h-1.5 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800 relative">
            <div
              className="h-full bg-gradient-to-r from-purple-600 via-red-500 to-amber-400 transition-all duration-300 rounded-full"
              style={{ width: `${Math.min(cursedOutput, 100)}%` }}
            />
          </div>

          <div className={`text-[10px] font-mono tracking-tight ${gradeColor}`}>
            {gradeTitle}
          </div>
        </div>

        {/* Right: Audio Siphon & Next Domain Trigger Button */}
        <div className="pointer-events-auto flex items-center gap-2">
          
          {/* Sound Synthesizer Toggle */}
          <button
            id="hud-audio-toggle-btn"
            onClick={handleToggleMute}
            onMouseEnter={() => playHoverSound(500, 0.02)}
            className={`p-2 rounded-xl border backdrop-blur-xl transition-all ${
              isMuted
                ? 'bg-zinc-950/90 border-zinc-800 text-zinc-500 hover:text-zinc-300'
                : 'bg-black/90 border-purple-500/50 text-purple-400 shadow-lg shadow-purple-950/40 hover:scale-105'
            }`}
            title={isMuted ? 'Unmute Cursed Sound Synthesizer' : 'Mute Cursed Sound Synthesizer'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 animate-pulse" />}
          </button>

          {/* Next Domain Advance Button */}
          {currentIndex < DOMAIN_CHAMBERS.length - 1 && (
            <button
              id="hud-next-domain-btn"
              onClick={handleNextChamber}
              onMouseEnter={() => playHoverSound(650, 0.02)}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-500 hover:to-purple-500 text-white text-xs font-mono font-bold flex items-center gap-1.5 shadow-lg shadow-red-950/50 hover:scale-105 active:scale-95 transition-all border border-red-400/40"
              title={`Advance to ${nextChamber.name}`}
            >
              <Swords className="w-3 h-3 text-white" />
              <span className="hidden sm:inline text-[11px]">Next Domain</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          )}

        </div>

      </div>
    </aside>
  );
};
