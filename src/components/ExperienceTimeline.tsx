import React from 'react';
import { EXPERIENCES } from '../data/portfolioData';
import { Briefcase, Calendar, MapPin, CheckCircle2, Building2 } from 'lucide-react';
import { playHoverSound } from '../utils/audio';

export const ExperienceTimeline: React.FC = () => {
  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="space-y-3 border-b border-zinc-800/80 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-red-400 text-xs font-mono tracking-wider uppercase">
            <Briefcase className="w-3.5 h-3.5 text-red-500" />
            <span>CAREER TRACK &bull; PRODUCTION HISTORY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Professional Experience
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base max-w-2xl font-normal">
            Delivering high-impact production solutions across client and internal software platforms at PragmaApps and Technologies.
          </p>
        </div>

        {/* Experience Cards */}
        <div className="space-y-8">
          {EXPERIENCES.map((exp) => (
            <div
              key={exp.id}
              id={`experience-card-${exp.id}`}
              onMouseEnter={() => playHoverSound(500, 0.02)}
              className="p-6 sm:p-8 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-zinc-700 transition-all duration-200 space-y-6 relative overflow-hidden shadow-xl"
            >
              {/* Subtle back ambient glow */}
              <div className="absolute top-0 right-0 w-72 h-72 bg-red-950/10 rounded-full blur-3xl pointer-events-none" />

              {/* Company & Role Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
                <div className="flex items-start gap-4">
                  <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 text-red-400">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                      {exp.role}
                    </h3>
                    <div className="text-red-400 font-mono text-sm font-semibold flex items-center gap-2 mt-0.5">
                      <span>{exp.company}</span>
                      <span className="text-zinc-400 font-normal">&bull; {exp.type}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-400">
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-white">
                    <Calendar className="w-3.5 h-3.5 text-red-400" />
                    {exp.period}
                  </span>
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300">
                    <MapPin className="w-3.5 h-3.5 text-red-400" />
                    {exp.location}
                  </span>
                </div>
              </div>

              {/* Summary Description */}
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
                {exp.summary}
              </p>

              {/* Key Accomplishments Breakdown */}
              <div className="space-y-3 pt-2">
                <div className="text-xs font-mono text-red-400 font-semibold tracking-wider uppercase">
                  Production Impact &amp; Deliverables
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {exp.accomplishments.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-zinc-900/70 border border-zinc-800/80 flex items-start gap-3 hover:border-zinc-700 transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies Tag Group */}
              <div className="pt-4 border-t border-zinc-800/80 flex flex-wrap items-center gap-2 text-xs font-mono">
                <span className="text-zinc-400 mr-1">Stacks:</span>
                {exp.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
