import React, { useState } from 'react';
import { SKILL_CATEGORIES, SKILLS } from '../data/portfolioData';
import { SkillItem } from '../types';
import { Search, Cpu, CheckCircle2, ArrowRight } from 'lucide-react';
import { playHoverSound, playClickSound } from '../utils/audio';

export const SkillsRadar: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<SkillItem['category']>('ai');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredSkills = SKILLS.filter((skill) => {
    const matchesCategory = skill.category === activeCategory;
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          skill.description.toLowerCase().includes(searchQuery.toLowerCase());
    return searchQuery ? matchesSearch : matchesCategory;
  });

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-800/80 pb-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-red-400 text-xs font-mono tracking-wider uppercase">
              <Cpu className="w-3.5 h-3.5 text-red-500" />
              <span>DISCIPLINES &bull; TECHNICAL PROFICIENCY</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Engineering Skills Matrix
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-2xl font-normal">
              Cross-disciplinary mastery spanning Java enterprise backends, modern reactive TypeScript frontends, Supabase/PostgreSQL databases, and production LLM automation.
            </p>
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              id="skills-search-input"
              type="text"
              placeholder="Search tech stack..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-red-500 text-white text-xs font-mono placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-red-500 transition-all"
            />
          </div>
        </div>

        {/* Category Selection Tabs */}
        {!searchQuery && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {SKILL_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  id={`skill-category-tab-${cat.key}`}
                  onClick={() => {
                    playClickSound();
                    setActiveCategory(cat.key);
                  }}
                  onMouseEnter={() => playHoverSound(550, 0.02)}
                  className={`p-4 rounded-xl border text-left transition-all duration-200 ${
                    isActive
                      ? 'bg-zinc-900 border-red-500/80 text-white shadow-lg shadow-black/40'
                      : 'bg-zinc-950 border-zinc-800/90 text-zinc-400 hover:text-white hover:border-zinc-700 hover:bg-zinc-900/50'
                  }`}
                >
                  <div className={`text-xs font-bold font-mono tracking-wide ${isActive ? 'text-red-400' : 'text-zinc-200'}`}>
                    {cat.name}
                  </div>
                  <div className="text-[11px] text-zinc-400 mt-1 line-clamp-2">
                    {cat.description}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, idx) => (
            <div
              key={idx}
              id={`skill-item-${idx}`}
              onMouseEnter={() => playHoverSound(500 + idx * 40, 0.02)}
              className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-red-500/40 transition-all duration-200 space-y-4 group shadow-lg flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-red-400 transition-colors">
                      {skill.name}
                    </h3>
                    <span className="text-[11px] font-mono text-zinc-400">
                      {skill.experienceYears} &bull; Level {skill.level}%
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-white bg-zinc-900 px-2 py-1 rounded border border-zinc-800">
                    {skill.level}%
                  </span>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed">
                  {skill.description}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5 pt-2">
                <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-red-600 to-red-500 rounded-full transition-all duration-500"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
