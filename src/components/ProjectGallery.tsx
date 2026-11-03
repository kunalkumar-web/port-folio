import React, { useState } from 'react';
import { Project, ProjectCategory } from '../types';
import { PROJECTS } from '../data/portfolioData';
import { 
  ExternalLink, Layers, CheckCircle2, ArrowRight, ShieldCheck, 
  RefreshCw, X, Play, Server, Bot, FileText, Lock, Sparkles, Terminal
} from 'lucide-react';
import { playHoverSound, playClickSound, playSuccessSound } from '../utils/audio';

export const ProjectGallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [simulationRunning, setSimulationRunning] = useState<boolean>(false);
  const [simStep, setSimStep] = useState<number>(0);

  const categories: { id: ProjectCategory; label: string; count: number }[] = [
    { id: 'all', label: 'All Projects', count: PROJECTS.length },
    { id: 'ai', label: 'AI & LLM Pipelines', count: PROJECTS.filter((p) => p.category === 'ai').length },
    { id: 'fullstack', label: 'Full-Stack SaaS', count: PROJECTS.filter((p) => p.category === 'fullstack').length },
    { id: 'fintech', label: 'Fintech & Offline-First', count: PROJECTS.filter((p) => p.category === 'fintech').length },
    { id: 'web', label: 'Web Platforms', count: PROJECTS.filter((p) => p.category === 'web').length },
  ];

  const filteredProjects = activeCategory === 'all'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeCategory);

  const handleRunSimulation = () => {
    playClickSound();
    setSimulationRunning(true);
    setSimStep(1);

    const timer1 = setTimeout(() => setSimStep(2), 700);
    const timer2 = setTimeout(() => setSimStep(3), 1500);
    const timer3 = setTimeout(() => {
      setSimStep(4);
      setSimulationRunning(false);
      playSuccessSound();
    }, 2400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  };

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-800/80 pb-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-red-400 text-xs font-mono tracking-wider uppercase">
              <Layers className="w-3.5 h-3.5 text-red-500" />
              <span>PRODUCTION CATALOG &bull; 2024–2025</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Featured Engineering Works
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-2xl">
              Architectural breakthroughs in generative AI automation pipelines, digital signature SaaS, offline-first fintech, and enterprise systems.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 bg-zinc-950 p-1.5 rounded-xl border border-zinc-800">
            {categories.map((cat) => (
              <button
                key={cat.id}
                id={`project-filter-${cat.id}`}
                onClick={() => {
                  playClickSound();
                  setActiveCategory(cat.id);
                }}
                onMouseEnter={() => playHoverSound(550, 0.02)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all duration-200 flex items-center gap-1.5 ${
                  activeCategory === cat.id
                    ? 'bg-zinc-800 text-white border border-zinc-700 shadow-sm'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                  activeCategory === cat.id ? 'bg-red-500/20 text-red-300' : 'bg-zinc-900 text-zinc-400'
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid (Clean, high-contrast, no gimmicky tilt) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              id={`project-card-${project.id}`}
              onMouseEnter={() => playHoverSound(480, 0.02)}
              className="rounded-2xl bg-zinc-950 border border-zinc-800/90 hover:border-red-500/50 transition-all duration-300 overflow-hidden flex flex-col group shadow-xl hover:shadow-red-950/20"
            >
              {/* Card Image Banner */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-zinc-900">
                <img
                  src={project.image}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                
                {/* Category & Featured Badges */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-zinc-700 text-xs font-mono font-medium text-white uppercase tracking-wider">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="px-2.5 py-1 rounded-md bg-red-950/80 backdrop-blur-md border border-red-500/50 text-xs font-mono font-medium text-red-300 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-red-400" />
                      Featured
                    </span>
                  )}
                </div>

                {/* Timeline Tag */}
                <div className="absolute top-4 right-4 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-zinc-700 text-xs font-mono text-zinc-300">
                  {project.timeline}
                </div>

                {/* Title and Subtitle Over Image */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-red-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-zinc-400 font-mono mt-0.5 line-clamp-1">
                    {project.subtitle}
                  </p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                <p className="text-sm text-zinc-300 line-clamp-2 leading-relaxed">
                  {project.description}
                </p>

                {/* Highlights List */}
                <div className="space-y-2">
                  {project.highlights.slice(0, 2).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-zinc-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Card Actions */}
                <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between gap-3">
                  <button
                    id={`view-system-btn-${project.id}`}
                    onClick={() => {
                      playClickSound();
                      setSelectedProject(project);
                    }}
                    onMouseEnter={() => playHoverSound(600, 0.02)}
                    className="px-4 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold border border-zinc-700 hover:border-zinc-600 transition-all flex items-center gap-1.5"
                  >
                    <span>View Architecture</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    id={`quick-inspect-btn-${project.id}`}
                    onClick={() => {
                      playClickSound();
                      setSelectedProject(project);
                    }}
                    className="text-xs font-mono text-zinc-400 hover:text-red-400 transition-colors flex items-center gap-1"
                  >
                    <span>Inspect Metrics</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* System Architecture Modal */}
      {selectedProject && (
        <div
          id="project-architecture-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative w-full max-w-4xl rounded-2xl bg-zinc-950 border border-zinc-800 p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl shadow-black my-8 text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-zinc-800 pb-5">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded bg-red-950/60 border border-red-500/40 text-red-300 text-xs font-mono uppercase">
                    {selectedProject.category}
                  </span>
                  <span className="text-xs font-mono text-zinc-400">{selectedProject.timeline}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white">
                  {selectedProject.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 font-mono">
                  {selectedProject.subtitle}
                </p>
              </div>

              <button
                id="modal-close-btn"
                onClick={() => {
                  playClickSound();
                  setSelectedProject(null);
                }}
                className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* In-depth description */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Engineering Overview</h4>
              <p className="text-sm text-zinc-300 leading-relaxed font-normal">
                {selectedProject.longDescription}
              </p>
            </div>

            {/* Architecture Node Visualizer */}
            {selectedProject.architecture && (
              <div className="space-y-3 p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono text-red-400">
                    <Terminal className="w-4 h-4 text-red-400" />
                    <span>System Pipeline Architecture</span>
                  </div>
                  <span className="text-[11px] font-mono text-zinc-400">Production Verified</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
                  {selectedProject.architecture.nodes.map((node, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-zinc-950 border border-zinc-800 space-y-1">
                      <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                        <span>{node.title}</span>
                      </div>
                      <p className="text-[11px] text-zinc-400 leading-tight">
                        {node.desc}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="pt-2 text-[11px] font-mono text-zinc-400 flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-red-400 shrink-0" />
                  <span>{selectedProject.architecture.flowSummary}</span>
                </div>
              </div>
            )}

            {/* Verified Metrics Grid */}
            {selectedProject.metrics && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {selectedProject.metrics.map((m, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800">
                    <div className="text-xl font-mono font-bold text-white">{m.value}</div>
                    <div className="text-xs text-zinc-400 font-mono mt-0.5">{m.label}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Interactive Pipeline Simulation Demo */}
            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-xs font-mono text-zinc-300">
                  Interactive Pipeline Runner Simulation
                </div>
                <button
                  id="run-simulation-btn"
                  onClick={handleRunSimulation}
                  disabled={simulationRunning}
                  className="px-3 py-1.5 rounded bg-red-600 hover:bg-red-500 text-white text-xs font-mono font-semibold flex items-center gap-1.5 disabled:opacity-50 transition-colors shadow-sm"
                >
                  <Play className="w-3 h-3" />
                  <span>{simulationRunning ? 'Executing...' : 'Trigger Simulation'}</span>
                </button>
              </div>

              {simStep > 0 && (
                <div className="space-y-2 font-mono text-xs text-zinc-300 bg-black/60 p-3 rounded-lg border border-zinc-800">
                  <div className="flex items-center justify-between text-zinc-400 text-[11px]">
                    <span>Step {simStep} / 4</span>
                    <span>{simulationRunning ? 'PROCESSING' : 'COMPLETED'}</span>
                  </div>
                  <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-red-500 transition-all duration-500"
                      style={{ width: `${simStep * 25}%` }}
                    />
                  </div>
                  <p className="text-red-400 pt-1">
                    {simStep === 1 && '> Ingesting endpoint webhooks & parameters...'}
                    {simStep === 2 && '> Transforming raw schemas through LLM extraction chain...'}
                    {simStep === 3 && '> Executing LLM-as-judge accuracy and verification matrix...'}
                    {simStep === 4 && '✓ Pipeline executed successfully with 0 schema violations.'}
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer Actions */}
            <div className="flex justify-end gap-3 pt-2 border-t border-zinc-800">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-mono transition-colors"
              >
                Close Inspector
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
