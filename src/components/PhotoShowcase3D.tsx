import React, { useState } from 'react';
import { Eye, Maximize2, Sliders, Palette, X, Layers } from 'lucide-react';
import { GALLERY_PHOTOS, COLOR_PRESETS } from '../data/portfolioData';
import { GalleryPhoto } from '../types';
import { playHoverSound, playClickSound } from '../utils/audio';

export const PhotoShowcase3D: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const currentFilterObj = COLOR_PRESETS.find((p) => p.id === activeFilter) || COLOR_PRESETS[0];

  return (
    <section id="visuals" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-800/80 pb-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-red-400 text-xs font-mono tracking-wider uppercase">
              <Layers className="w-3.5 h-3.5 text-red-500" />
              <span>VISUAL CHRONICLE &bull; ARCHITECTURE &amp; PORTRAITS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Visual Showcase &amp; Architecture
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-2xl font-normal">
              High-resolution platform architecture maps, production models, and developer portrait visual assets with real-time cinematic color-grading.
            </p>
          </div>

          {/* Color Grade Preset Switcher */}
          <div className="space-y-2">
            <div className="text-xs font-mono text-zinc-400 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-red-400" />
              <span>Color Grade Filter:</span>
            </div>
            <div className="flex flex-wrap gap-1.5 bg-zinc-950 p-1.5 rounded-xl border border-zinc-800">
              {COLOR_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  id={`color-preset-btn-${preset.id}`}
                  onClick={() => {
                    playClickSound();
                    setActiveFilter(preset.id);
                  }}
                  onMouseEnter={() => playHoverSound(500, 0.02)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium font-mono transition-all ${
                    activeFilter === preset.id
                      ? 'bg-zinc-800 text-white border border-zinc-700 shadow-sm'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                  }`}
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Clean Photo Grid (High-contrast, clean elevation, no gimmicky tilt) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_PHOTOS.map((photo) => (
            <div
              key={photo.id}
              id={`photo-card-${photo.id}`}
              onClick={() => {
                playClickSound();
                setSelectedPhoto(photo);
              }}
              onMouseEnter={() => playHoverSound(520, 0.02)}
              className="group cursor-pointer rounded-2xl bg-zinc-950 border border-zinc-800/90 hover:border-red-500/50 transition-all duration-300 overflow-hidden shadow-lg flex flex-col"
            >
              {/* Image Aspect Box */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-900">
                <img
                  src={photo.src}
                  alt={photo.title}
                  referrerPolicy="no-referrer"
                  style={{
                    filter: currentFilterObj.filter !== 'none' ? currentFilterObj.filter : undefined,
                  }}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                {/* Aspect Badge */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/80 backdrop-blur-md border border-zinc-700 text-[11px] font-mono text-zinc-300">
                  {photo.aspect}
                </div>

                {/* Hover Inspect Indicator */}
                <div className="absolute top-3 right-3 p-2 rounded-lg bg-black/80 backdrop-blur-md border border-zinc-700 text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-3.5 h-3.5 text-red-400" />
                </div>

                {/* Bottom Overlay Title */}
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-base font-bold text-white group-hover:text-red-400 transition-colors">
                    {photo.title}
                  </h3>
                  <p className="text-xs text-zinc-400 font-mono line-clamp-1">
                    {photo.mood}
                  </p>
                </div>
              </div>

              {/* Card Footer Info */}
              <div className="p-4 space-y-2.5 bg-zinc-950 flex-1 flex flex-col justify-between">
                <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                  {photo.description}
                </p>
                <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                  <span className="flex items-center gap-1.5 text-zinc-300">
                    <Palette className="w-3.5 h-3.5 text-red-400" />
                    <span>{photo.palette.split('/')[0]}</span>
                  </span>
                  <span className="text-red-400 hover:underline flex items-center gap-1">
                    <span>Inspect</span>
                    <Eye className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox / Zoom Modal */}
      {selectedPhoto && (
        <div
          id="photo-lightbox-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative w-full max-w-4xl rounded-2xl bg-zinc-950 border border-zinc-800 p-6 space-y-5 max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <div>
                <h3 className="text-xl font-bold text-white">{selectedPhoto.title}</h3>
                <p className="text-xs text-zinc-400 font-mono">{selectedPhoto.mood}</p>
              </div>
              <button
                onClick={() => setSelectedPhoto(null)}
                className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* High-Res Image Display */}
            <div className="relative rounded-xl overflow-hidden bg-black max-h-[55vh] flex items-center justify-center border border-zinc-800">
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.title}
                referrerPolicy="no-referrer"
                style={{
                  filter: currentFilterObj.filter !== 'none' ? currentFilterObj.filter : undefined,
                }}
                className="max-h-[55vh] w-auto object-contain rounded-lg"
              />
            </div>

            {/* Photo Info & Palette Details */}
            <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                <span className="text-zinc-400">Palette: <strong className="text-white">{selectedPhoto.palette}</strong></span>
                <span className="text-zinc-400">Aspect Ratio: <strong className="text-white">{selectedPhoto.aspect}</strong></span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-normal">
                {selectedPhoto.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
