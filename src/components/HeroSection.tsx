import React, { useState } from 'react';
import { ArrowRight, Swords, Sparkles, Mail, Layers, Terminal, CheckCircle2, Zap, Shield, Flame } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { playHoverSound, playClickSound, playCursedSlash } from '../utils/audio';
import { SukunaSVG } from './JJKCharacters';

interface HeroSectionProps {
  onExploreProjects: () => void;
  onExploreVisuals: () => void;
  onContactClick: () => void;
  onOpenDomainPortal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreProjects,
  onExploreVisuals,
  onContactClick,
  onOpenDomainPortal,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'cursed_stats'>('profile');

  return (
    <section
      id="hero-section"
      className="relative min-h-[90vh] pt-32 pb-16 px-4 sm:px-6 lg:px-8 flex flex-col justify-center overflow-hidden"
    >
      {/* Cursed Energy Aura Backing Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-red-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-purple-600/15 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-violet-950/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* Left Column: Headline, Bio, Cursed Metrics, CTAs */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/85 border border-red-500/40 text-zinc-300 text-xs font-mono tracking-wider uppercase shadow-lg shadow-black">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
            </span>
            <span className="text-red-400 font-bold">Special Grade Dev</span>
            <span className="text-zinc-600">&bull;</span>
            <span className="text-purple-300">Cursed Tech Architecture</span>
          </div>

          {/* Main Headline */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black text-white tracking-tight leading-[1.08] font-mono">
              Expanding Domains <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-purple-400 to-white">
                Across Scaled Systems
              </span> <br className="hidden sm:inline" />
              &amp; LLM Automation.
            </h1>
          </div>

          {/* Descriptive Body */}
          <p className="text-zinc-300 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 font-mono font-normal leading-relaxed">
            I am <strong className="text-white font-bold">{PERSONAL_INFO.name}</strong>, a Full-Stack Software Developer at <span className="text-red-400 font-semibold">PragmaApps</span> wielding high-output cursed techniques across <span className="text-purple-300 font-bold">Java REST</span>, <span className="text-white font-bold">React &amp; TypeScript</span>, and <span className="text-red-300 font-bold">LLM prompt pipelines</span> with 9+ shipped enterprise platforms.
          </p>

          {/* Key Metrics Grid with JJK Energy Accents */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 pb-2">
            {PERSONAL_INFO.stats.map((stat, idx) => (
              <div
                key={idx}
                id={`hero-stat-card-${idx}`}
                onMouseEnter={() => playHoverSound(500 + idx * 60, 0.02)}
                className="p-3.5 rounded-xl bg-zinc-950/90 border border-zinc-800/90 hover:border-red-500/50 hover:bg-zinc-900 transition-all duration-200 text-left group shadow-lg shadow-black"
              >
                <div className="text-2xl font-black text-white group-hover:text-red-400 transition-colors font-mono">
                  {stat.value}
                </div>
                <div className="text-xs text-zinc-400 font-mono tracking-tight mt-0.5">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
            
            {/* Domain Expansion 3D Portal Button */}
            <button
              id="hero-open-domain-3d-btn"
              onClick={() => {
                playCursedSlash();
                onOpenDomainPortal();
              }}
              onMouseEnter={() => playHoverSound(650, 0.03)}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-red-600 via-purple-600 to-red-600 hover:from-red-500 hover:to-purple-500 text-white font-mono font-bold text-xs uppercase tracking-wider shadow-xl shadow-red-600/30 hover:scale-[1.03] active:scale-[0.98] transition-all flex items-center gap-2 border border-white/20"
            >
              <Swords className="w-4 h-4 text-white animate-pulse" />
              <span>3D Malevolent Shrine</span>
            </button>

            <button
              id="hero-explore-projects-btn"
              onClick={() => {
                playClickSound();
                onExploreProjects();
              }}
              onMouseEnter={() => playHoverSound(550, 0.03)}
              className="px-5 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white font-mono font-bold text-xs uppercase tracking-wider border border-zinc-800 hover:border-red-500/50 transition-all flex items-center gap-2"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-4 h-4 text-red-400" />
            </button>

            <button
              id="hero-contact-btn"
              onClick={() => {
                playClickSound();
                onContactClick();
              }}
              onMouseEnter={() => playHoverSound(450, 0.03)}
              className="px-4 py-3.5 rounded-xl bg-black/80 hover:bg-zinc-900 text-zinc-300 hover:text-white text-xs font-mono border border-zinc-800/80 transition-all flex items-center gap-2"
            >
              <Mail className="w-4 h-4 text-purple-400" />
              <span>Contact</span>
            </button>
          </div>

          {/* Core Tech Stack Badges with Energy Colors */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-2 text-xs text-zinc-400 font-mono">
            <span className="text-red-400 font-bold">Innate Stacks:</span>
            {['React', 'TypeScript', 'Java REST', 'Supabase RLS', 'LLM Pipelines', 'HelloSign', 'Tailwind', 'Three.js'].map((tech, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-md bg-zinc-950 border border-zinc-800 text-zinc-300 hover:border-purple-500/60 hover:text-white transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>

        </div>

        {/* Right Column: Sukuna Cursed Seal & Character Showcase Panel */}
        <div className="lg:col-span-5 flex justify-center">
          
          <div
            id="hero-jjk-profile-card"
            className="w-full max-w-md rounded-3xl bg-zinc-950/95 border border-red-500/40 hover:border-red-500 transition-all duration-300 p-5 shadow-2xl shadow-red-950/50 space-y-4 relative overflow-hidden"
          >
            {/* Corner Sukuna Cursed Markings */}
            <div className="absolute top-0 right-0 w-24 h-24 opacity-15 pointer-events-none">
              <SukunaSVG color="#ef4444" />
            </div>

            {/* Header with View Tabs */}
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                <span className="text-xs font-mono text-white font-bold ml-1">KUNAL_KUMAR // HEIAN_DEV</span>
              </div>
              
              <div className="flex items-center gap-1 bg-zinc-900 p-1 rounded-lg border border-zinc-800 text-xs font-mono">
                <button
                  id="hero-tab-profile-btn"
                  onClick={() => setActiveTab('profile')}
                  className={`px-2.5 py-1 rounded transition-colors ${activeTab === 'profile' ? 'bg-zinc-800 text-white font-bold border border-zinc-700 shadow-sm' : 'text-zinc-400 hover:text-zinc-200'}`}
                >
                  Avatar
                </button>
                <button
                  id="hero-tab-stats-btn"
                  onClick={() => setActiveTab('cursed_stats')}
                  className={`px-2.5 py-1 rounded transition-colors ${activeTab === 'cursed_stats' ? 'bg-zinc-800 text-white font-bold border border-zinc-700 shadow-sm' : 'text-zinc-400 hover:text-zinc-200'}`}
                >
                  Cursed Output
                </button>
              </div>
            </div>

            {activeTab === 'profile' ? (
              /* Profile Image & Detail View */
              <div className="space-y-4">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 group">
                  <img
                    src="/src/assets/images/hero_3d_avatar_1787747181164.jpg"
                    alt="Kunal Kumar Full Stack Developer"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  
                  {/* Floating Cursed Badges */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-lg bg-black/85 backdrop-blur-md border border-red-500/50 text-white text-xs font-mono flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-red-400" />
                      <span>Special Grade Engineer</span>
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-black/85 backdrop-blur-md border border-purple-500/50 text-purple-300 text-xs font-mono">
                      PragmaApps
                    </span>
                  </div>
                </div>

                {/* Info Bar */}
                <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex items-center justify-between text-xs font-mono">
                  <div>
                    <div className="text-white font-bold">Kunal Kumar</div>
                    <div className="text-zinc-400 text-[11px]">Domain: Enterprise AI &amp; Web Systems</div>
                  </div>
                  <span className="px-2.5 py-1 rounded-md bg-red-950/80 border border-red-500/40 text-red-300 text-[11px] font-bold">
                    Output: MAX
                  </span>
                </div>
              </div>
            ) : (
              /* Cursed Stats View */
              <div className="font-mono text-xs text-zinc-300 space-y-3 p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 min-h-[260px]">
                <div className="text-zinc-400 flex items-center justify-between pb-2 border-b border-zinc-800">
                  <div className="flex items-center gap-1.5 text-red-400 font-bold">
                    <Zap className="w-3.5 h-3.5 text-red-400" />
                    <span>CURSED_TECHNIQUE_METRICS</span>
                  </div>
                  <span className="text-[10px] text-zinc-500">HEIAN_SYS</span>
                </div>
                <div className="space-y-2 text-zinc-300 text-xs">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Barrier Expansion (Production):</span>
                    <span className="text-white font-bold">9+ Web Apps</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Black Flash Accuracy (Uptime):</span>
                    <span className="text-red-400 font-bold">99.98%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">LLM Prompt Automation Speed:</span>
                    <span className="text-purple-300 font-bold">15-Step Pipelines</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Reverse Cursed Recovery (Bug MTTR):</span>
                    <span className="text-white font-bold">&lt; 15 mins</span>
                  </div>
                </div>
                <div className="pt-3 text-zinc-400 border-t border-zinc-800/80 text-[11px] leading-relaxed">
                  <span className="text-white font-bold">Domains Covered:</span> Fintech Offline-Sync, SaaS E-Signatures, Hotel GEO Ranking AI, Multi-tenant Dashboards.
                </div>
              </div>
            )}

            {/* Bottom Status */}
            <div className="text-center text-[11px] font-mono text-zinc-400 flex items-center justify-center gap-1.5 pt-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-red-400" />
              <span>Full-Stack Engineering &bull; Production Ready</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
