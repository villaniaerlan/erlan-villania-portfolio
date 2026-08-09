import React from 'react';
import { ArrowRight, Maximize2 } from 'lucide-react';
import { profileData } from '../data/portfolioData';

export default function ProjectGallery({ onSelectProject }) {
  return (
    <section id="work" className="bg-[#0A0A0A] py-20 border-b border-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        
        {/* Section Header Bar */}
        <div className="flex items-center justify-between pb-6 mb-12 border-b border-[#222]">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-widest text-white uppercase">
              SELECTED PROJECTS
            </h2>
            <p className="text-xs text-slate-400 mt-1">Click a project to see the concept, design, and creative process.</p>
          </div>

          <a
            href={profileData.behanceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs font-extrabold tracking-widest text-slate-400 hover:text-crimson transition-colors uppercase py-2 px-3 rounded-lg hover:bg-[#141414]"
          >
            <span>VIEW ALL ON BEHANCE</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* 3 Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {profileData.selectedProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => onSelectProject && onSelectProject(project)}
              className="group cursor-pointer space-y-4"
            >
              {/* Image Frame */}
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#161616] border border-[#262626] group-hover:border-crimson transition-all duration-500 shadow-lg">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  onError={(e) => {
                    // Try fallback extension if needed
                    if (e.target.src.endsWith('.jpg')) {
                      e.target.src = project.coverImage.replace('.jpg', '.png');
                    }
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-95 group-hover:opacity-100"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <div className="px-4 py-2 rounded-xl bg-crimson text-white text-xs font-bold flex items-center gap-2 shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>VIEW DESIGN</span>
                  </div>
                </div>
              </div>

              {/* Card Meta Footer */}
              <div className="flex items-start justify-between pt-1">
                <div className="flex items-start gap-3">
                  {/* Red Project Number */}
                  <span className="font-display text-2xl font-extrabold text-crimson leading-none">
                    {project.number}
                  </span>

                  <div>
                    <h3 className="font-display text-xl font-bold tracking-wider text-white uppercase group-hover:text-crimson transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-[11px] font-extrabold tracking-widest text-slate-400 uppercase mt-0.5">
                      {project.category}
                    </p>
                  </div>
                </div>

                {/* Arrow Icon Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onSelectProject) onSelectProject(project);
                  }}
                  className="p-2 rounded-lg bg-[#141414] border border-[#262626] text-slate-400 group-hover:text-white group-hover:bg-crimson group-hover:border-crimson transition-all"
                  title="View Details"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
