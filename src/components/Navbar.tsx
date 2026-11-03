import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, Swords, Sparkles, Send } from 'lucide-react';
import { toggleAudioMute, getIsAudioMuted, playClickSound, playHoverSound } from '../utils/audio';
import { SukunaSVG } from './JJKCharacters';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenDomainPortal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate, onOpenDomainPortal }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setIsMuted(getIsAudioMuted());
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAudioToggle = () => {
    const muted = toggleAudioMute();
    setIsMuted(muted);
    if (!muted) {
      playClickSound();
    }
  };

  const navItems = [
    { id: 'hero', label: 'Domain Core' },
    { id: 'malevolent-shrine-section', label: '3D Shrine' },
    { id: 'jjk-sorcery-domain', label: 'JJK Arsenal' },
    { id: 'projects', label: 'Projects' },
    { id: 'visuals', label: '3D Visuals' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Campaigns' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleItemClick = (id: string) => {
    playClickSound();
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="main-navbar-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-[#050508]/95 backdrop-blur-xl border-b border-red-900/30 shadow-2xl shadow-black'
          : 'py-4.5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Left: Minimal Clean Indicator with Sukuna Mark */}
        <button
          id="nav-brand-logo-btn"
          onClick={() => handleItemClick('hero')}
          onMouseEnter={() => playHoverSound(520, 0.03)}
          className="group flex items-center gap-2.5 focus:outline-none rounded-lg p-1"
          aria-label="Navigate to top"
        >
          <div className="w-8 h-8 rounded-lg bg-zinc-950 border border-red-500/50 group-hover:border-red-500 p-1 flex items-center justify-center transition-all duration-200 shadow-[0_0_12px_rgba(239,68,68,0.3)]">
            <SukunaSVG color="#ef4444" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs font-mono font-bold text-white tracking-wider uppercase flex items-center gap-1.5">
              <span>KUNAL</span>
              <span className="text-red-500">&bull;</span>
              <span className="text-purple-400">JJK DOMAIN</span>
            </span>
          </div>
        </button>

        {/* Center: Desktop Navigation Links */}
        <nav id="desktop-nav-menu" className="hidden lg:flex items-center gap-1 bg-zinc-950/90 p-1 rounded-full border border-zinc-800/80 backdrop-blur-md shadow-inner">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleItemClick(item.id)}
                onMouseEnter={() => playHoverSound(600, 0.02)}
                className={`relative px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-200 ${
                  isActive
                    ? 'text-white bg-zinc-800 border border-red-500/40 shadow-sm font-semibold'
                    : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/60'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-[2px] bg-red-500 rounded-full shadow-[0_0_6px_rgba(239,68,68,0.8)]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Tools: Domain Gate 3D Viewer, Audio Synthesizer & Red Contact CTA */}
        <div className="flex items-center gap-2">
          
          {/* Domain Expansion 3D Portal Trigger */}
          <button
            id="nav-domain-portal-btn"
            onClick={onOpenDomainPortal}
            onMouseEnter={() => playHoverSound(750, 0.03)}
            title="Open 3D Malevolent Shrine Domain"
            className="px-3 py-1.5 rounded-lg bg-zinc-900/90 hover:bg-red-950/80 border border-red-500/40 hover:border-red-500 text-red-400 hover:text-white text-xs font-mono font-bold transition-all flex items-center gap-1.5 shadow-sm"
          >
            <Swords className="w-3.5 h-3.5 text-red-400" />
            <span className="hidden sm:inline">3D Shrine</span>
          </button>

          {/* Audio Synthesizer Toggle */}
          <button
            id="nav-audio-toggle-btn"
            onClick={handleAudioToggle}
            onMouseEnter={() => playHoverSound(700, 0.02)}
            title={isMuted ? 'Enable Cursed Sound FX' : 'Mute Sound FX'}
            className={`p-2 rounded-lg border transition-all duration-200 ${
              !isMuted
                ? 'bg-red-950/40 border-red-500/50 text-red-400 shadow-sm'
                : 'bg-zinc-900/90 border-zinc-800 text-zinc-500 hover:text-zinc-300 hover:border-zinc-700'
            }`}
          >
            {!isMuted ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Clean Red Contact CTA */}
          <button
            id="nav-lets-talk-btn"
            onClick={() => handleItemClick('contact')}
            onMouseEnter={() => playHoverSound(800, 0.04)}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-500 hover:to-purple-500 text-white shadow-lg shadow-red-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            <span>Inquire</span>
            <Send className="w-3 h-3" />
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            id="nav-mobile-menu-toggle-btn"
            onClick={() => {
              playClickSound();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="lg:hidden p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-200 hover:text-white focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-drawer-menu"
          className="lg:hidden bg-zinc-950/98 border-b border-red-900/40 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-2 mt-2"
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              id={`mobile-nav-link-${item.id}`}
              onClick={() => handleItemClick(item.id)}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-xs font-mono transition-all ${
                activeSection === item.id
                  ? 'bg-zinc-900 text-red-400 border border-red-500/40 font-bold'
                  : 'text-zinc-300 hover:bg-zinc-900/50'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-3 border-t border-zinc-800 flex items-center justify-between">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDomainPortal();
              }}
              className="text-xs font-mono text-red-400 flex items-center gap-1.5"
            >
              <Swords className="w-3.5 h-3.5" />
              <span>Open 3D Malevolent Shrine</span>
            </button>
            <button
              id="mobile-audio-toggle"
              onClick={handleAudioToggle}
              className="text-xs font-mono px-3 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-200"
            >
              {!isMuted ? 'Sound: ON' : 'Sound: MUTED'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
