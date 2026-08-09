import React, { useState } from 'react';
import { X, ThumbsUp, Eye, ExternalLink, Calendar, User, Wrench, Share2 } from 'lucide-react';
import { profileData } from '../data/portfolioData';

export default function ProjectModal({ project, onClose, darkMode }) {
  if (!project) return null;

  const [appreciated, setAppreciated] = useState(false);
  const appreciationsCount = project.appreciations + (appreciated ? 1 : 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Backdrop overlay listener */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Content Box */}
      <div className={`relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl z-10 border ${
        darkMode ? 'bg-slate-900 text-white border-slate-700 shadow-2xl' : 'bg-white text-slate-900 border-slate-200 shadow-2xl'
      }`}>
        
        {/* Sticky Close Button Header */}
        <div className={`sticky top-0 z-20 flex items-center justify-between px-6 py-4 border-b ${
          darkMode ? 'bg-slate-900/90 backdrop-blur-md border-slate-800' : 'bg-white/90 backdrop-blur-md border-slate-100'
        }`}>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-behance-blue/10 text-behance-blue font-bold text-xs">
              {project.categoryLabel}
            </span>
            <span className="text-xs text-slate-400">By {profileData.name}</span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-800/20 text-slate-400 hover:text-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Modal Body */}
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Project Title & Top Meta */}
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              {project.title}
            </h2>

            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-behance-blue" />
                <span>Client: <strong className={darkMode ? 'text-white' : 'text-slate-800'}>{project.client}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-brand-cyan" />
                <span>Published: {project.publishedDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-brand-accent" />
                <span>{project.views} Views</span>
              </div>
            </div>
          </div>

          {/* Featured High-Res Cover Image */}
          <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-800">
            <img
              src={project.coverImage}
              alt={project.title}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Description & Detail Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
            <div className="lg:col-span-8 space-y-4">
              <h3 className="text-lg font-bold">Project Overview</h3>
              <p className={`text-base leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                {project.description}
              </p>

              {/* Tools Used Section */}
              <div className="pt-4 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <Wrench className="w-3.5 h-3.5" />
                  <span>Tools & Technologies Applied</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool, idx) => (
                    <span
                      key={idx}
                      className={`text-xs font-bold px-3 py-1.5 rounded-lg ${
                        darkMode ? 'bg-slate-800 text-slate-200 border border-slate-700' : 'bg-slate-100 text-slate-800 border border-slate-200'
                      }`}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Actions Card */}
            <div className="lg:col-span-4 space-y-4">
              <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <h4 className="font-bold text-sm mb-4">Appreciate this Project?</h4>
                
                <button
                  onClick={() => setAppreciated(!appreciated)}
                  className={`w-full py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-md ${
                    appreciated
                      ? 'bg-rose-500 text-white shadow-rose-500/30'
                      : 'bg-behance-blue hover:bg-behance-dark text-white shadow-behance-blue/30'
                  }`}
                >
                  <ThumbsUp className={`w-4 h-4 ${appreciated ? 'fill-current' : ''}`} />
                  <span>{appreciated ? 'Appreciated!' : 'Appreciate Project'} ({appreciationsCount})</span>
                </button>

                <hr className={`my-4 ${darkMode ? 'border-slate-700' : 'border-slate-200'}`} />

                <a
                  href={project.behanceLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all border ${
                    darkMode ? 'bg-slate-700 hover:bg-slate-600 text-white border-slate-600' : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300'
                  }`}
                >
                  <span>View on Behance</span>
                  <ExternalLink className="w-4 h-4 text-behance-blue" />
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
