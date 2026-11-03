import React, { useState, useEffect } from 'react';
import { ThreeCanvas } from './components/ThreeCanvas';
import { Navbar } from './components/Navbar';
import { DomainProgressHUD } from './components/DomainProgressHUD';
import { DomainChamberBarrier } from './components/DomainChamberBarrier';
import { HeroSection } from './components/HeroSection';
import { MalevolentShrineSection } from './components/MalevolentShrineSection';
import { JJKCharacterShowcase } from './components/JJKCharacterShowcase';
import { ProjectGallery } from './components/ProjectGallery';
import { PhotoShowcase3D } from './components/PhotoShowcase3D';
import { SkillsRadar } from './components/SkillsRadar';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { MalevolentShrine3D } from './components/MalevolentShrine3D';
import { CursedEnergySlashCursor } from './components/CursedEnergySlashCursor';
import { Swords, X, Sparkles } from 'lucide-react';
import { playClickSound, playDomainExpansionSound, playCursedSlash } from './utils/audio';

export default function App() {
  const [showDomainModal, setShowDomainModal] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [cursedOutput, setCursedOutput] = useState<number>(30);
  const [unlockedChambers, setUnlockedChambers] = useState<string[]>([
    'hero',
    'malevolent-shrine-section',
  ]);

  const handleCursedOutputIncrease = (amount = 8) => {
    setCursedOutput((prev) => Math.min(100, prev + amount));
  };

  // Scroll spy to update active nav link and unlock chambers as user scrolls
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'hero',
        'malevolent-shrine-section',
        'jjk-sorcery-domain',
        'projects',
        'visuals',
        'skills',
        'experience',
        'contact',
      ];
      const scrollPos = window.scrollY + 260;

      for (const sectionId of sections) {
        const el = document.getElementById(
          sectionId === 'hero' ? 'hero-section' : sectionId
        );
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            setUnlockedChambers((prev) =>
              prev.includes(sectionId) ? prev : [...prev, sectionId]
            );
            break;
          }
        }
      }

      // Calculate total scroll progress towards 100% Cursed Output
      const totalScrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalScrollable > 0) {
        const scrollPercent = (window.scrollY / totalScrollable) * 70; // up to 70% from scroll
        setCursedOutput((prev) => Math.max(prev, Math.round(30 + scrollPercent)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    setUnlockedChambers((prev) =>
      prev.includes(sectionId) ? prev : [...prev, sectionId]
    );
    handleCursedOutputIncrease(10);
    const targetId = sectionId === 'hero' ? 'hero-section' : sectionId;
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      id="portfolio-root"
      className="relative min-h-screen bg-[#050508] text-zinc-100 selection:bg-red-600 selection:text-white"
    >
      {/* 1. Interactive Cleave/Dismantle Slash Cursor (Sparks and cuts on click/drag) */}
      <CursedEnergySlashCursor />

      {/* 2. Persistent 3D WebGL Background Scene with Cursed Energy Particles */}
      <ThreeCanvas interactive={true} />

      {/* 3. Main Navigation Header */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenDomainPortal={() => {
          playDomainExpansionSound();
          setShowDomainModal(true);
        }}
      />

      {/* 4. Interactive Domain Expansion HUD (Tracks Cursed Output %, Active Chamber, and Audio) */}
      <DomainProgressHUD
        activeSection={activeSection}
        cursedOutput={cursedOutput}
        unlockedChambers={unlockedChambers}
        onNavigate={handleNavigate}
        onCursedOutputIncrease={handleCursedOutputIncrease}
      />

      {/* 5. Main Content Flow with Progressive Domain Chamber Reveals */}
      <main id="main-content" className="relative z-10 pt-8">
        
        {/* Chamber I: Summoning & Special Grade Developer Awakening */}
        <HeroSection
          onExploreProjects={() => handleNavigate('projects')}
          onExploreVisuals={() => handleNavigate('visuals')}
          onContactClick={() => handleNavigate('contact')}
          onOpenDomainPortal={() => {
            handleNavigate('malevolent-shrine-section');
          }}
        />

        {/* Barrier I -> II */}
        <DomainChamberBarrier
          currentChamberNumber={1}
          nextChamberNumber={2}
          nextChamberName="Malevolent Shrine 3D Altar"
          nextChamberKanji="伏魔御廚子"
          handSignName="Enmaten (閻魔天)"
          nextChamberId="malevolent-shrine-section"
          onUnlockNext={handleNavigate}
        />

        {/* Chamber II: Dedicated 3D Malevolent Shrine Interactive Altar Stage */}
        <MalevolentShrineSection
          onScrollToCharacters={() => handleNavigate('jjk-sorcery-domain')}
        />

        {/* Barrier II -> III */}
        <DomainChamberBarrier
          currentChamberNumber={2}
          nextChamberNumber={3}
          nextChamberName="Cursed Technique Arsenal & Domain Clash"
          nextChamberKanji="術式開示"
          handSignName="Infinite Void (無量空処)"
          nextChamberId="jjk-sorcery-domain"
          onUnlockNext={handleNavigate}
        />

        {/* Chamber III: JJK Character SVG Showcase & Domain Clash Engine */}
        <JJKCharacterShowcase />

        {/* Barrier III -> IV */}
        <DomainChamberBarrier
          currentChamberNumber={3}
          nextChamberNumber={4}
          nextChamberName="Shipped Domains (Projects & AI Pipelines)"
          nextChamberKanji="術式構築"
          handSignName="Ten Shadows (十種影法術)"
          nextChamberId="projects"
          onUnlockNext={handleNavigate}
        />

        {/* Chamber IV: Projects Catalog & System Architecture */}
        <ProjectGallery />

        {/* Barrier IV -> V */}
        <DomainChamberBarrier
          currentChamberNumber={4}
          nextChamberNumber={5}
          nextChamberName="High Frequency 3D Visual Chronicle"
          nextChamberKanji="三次元空間"
          handSignName="Authentic Lens (領域視覚)"
          nextChamberId="visuals"
          onUnlockNext={handleNavigate}
        />

        {/* Chamber V: 3D Visual Chronicle & Color-Grading */}
        <PhotoShowcase3D />

        {/* Barrier V -> VI */}
        <DomainChamberBarrier
          currentChamberNumber={5}
          nextChamberNumber={6}
          nextChamberName="Cursed Attribute Matrix & Technical Radar"
          nextChamberKanji="呪力出力"
          handSignName="Black Flash (黒閃)"
          nextChamberId="skills"
          onUnlockNext={handleNavigate}
        />

        {/* Chamber VI: Skills Radar & Technique Proficiencies */}
        <SkillsRadar />

        {/* Barrier VI -> VII */}
        <DomainChamberBarrier
          currentChamberNumber={6}
          nextChamberNumber={7}
          nextChamberName="Sorcerer Milestones & Battle Log"
          nextChamberKanji="歴戦記録"
          handSignName="Binding Vow (縛り)"
          nextChamberId="experience"
          onUnlockNext={handleNavigate}
        />

        {/* Chamber VII: Experience Timeline */}
        <ExperienceTimeline />

        {/* Barrier VII -> VIII */}
        <DomainChamberBarrier
          currentChamberNumber={7}
          nextChamberNumber={8}
          nextChamberName="Binding Vow Transmission & Summoning"
          nextChamberKanji="束縛契約"
          handSignName="Summoning Circle (契約印)"
          nextChamberId="contact"
          onUnlockNext={handleNavigate}
        />

        {/* Chamber VIII: Contact Section */}
        <ContactSection />
      </main>

      {/* 6. Footer */}
      <Footer onScrollToTop={handleScrollToTop} />

      {/* 7. Floating Domain Expansion 3D Altar Quick-Launcher */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          id="floating-domain-shrine-btn"
          onClick={() => {
            playDomainExpansionSound();
            setShowDomainModal(true);
          }}
          className="p-3.5 rounded-2xl bg-zinc-950/90 hover:bg-zinc-900 border border-red-500/60 hover:border-red-500 text-red-400 hover:text-white shadow-2xl shadow-red-950/60 backdrop-blur-xl flex items-center gap-2 text-xs font-mono font-bold transition-all hover:scale-105 active:scale-95 group"
          title="Open 3D Malevolent Shrine Fullscreen Inspector"
        >
          <Swords className="w-4 h-4 text-red-400 group-hover:rotate-45 transition-transform" />
          <span className="hidden sm:inline">3D Shrine Inspector</span>
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
        </button>
      </div>

      {/* 8. Full-screen 3D Malevolent Shrine Inspector Modal */}
      {showDomainModal && (
        <div
          id="malevolent-shrine-modal"
          className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between overflow-hidden animate-scaleUp"
        >
          {/* Header */}
          <div className="relative z-20 p-6 flex items-center justify-between pointer-events-auto bg-black/60 backdrop-blur-md border-b border-red-900/40">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-zinc-900 border border-red-500/50 text-red-400">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold font-mono text-white">
                  3D Malevolent Shrine (伏魔御廚子) &bull; Sukuna Domain Inspector
                </h3>
                <p className="text-xs text-zinc-400 font-mono">
                  Full 3D WebGL orbit, zoom, cursed energy particle storm &amp; cleave slicing engine
                </p>
              </div>
            </div>

            <button
              id="close-shrine-modal-btn"
              onClick={() => {
                playClickSound();
                setShowDomainModal(false);
              }}
              className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 3D Shrine Interactive Viewport */}
          <div className="flex-1 relative w-full h-full">
            <MalevolentShrine3D className="w-full h-full min-h-[500px]" enableWheelZoom={true} />
          </div>
        </div>
      )}
    </div>
  );
}
