import React from 'react';
import { ExternalLink, Award, Sparkles, CheckCircle2, Heart, Eye, Users } from 'lucide-react';
import { profileData, testimonials } from '../data/portfolioData';

export default function BehanceStatsCard({ darkMode }) {
  return (
    <section id="behance-live" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Card Wrapper */}
        <div className={`relative rounded-3xl overflow-hidden p-8 sm:p-12 border ${
          darkMode ? 'glass-card border-behance-blue/30' : 'glass-card-light border-behance-blue/30 shadow-2xl'
        }`}>
          
          {/* Background Glow Overlay */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-behance-blue/20 rounded-full blur-[100px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Behance Card Header & Link */}
            <div className="lg:col-span-6 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-behance-blue/15 text-behance-blue text-xs font-bold border border-behance-blue/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Live Behance Platform Sync</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Connect on <span className="text-behance-blue">Behance</span>
              </h2>

              <p className={`text-base leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                Explore full case studies, vector artwork, client feedback, and community discussions directly on Erlan Villania's official Behance profile.
              </p>

              {/* Direct Behance Button */}
              <div className="pt-2">
                <a
                  href={profileData.behanceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-behance-blue hover:bg-behance-dark text-white font-extrabold text-base transition-all duration-300 shadow-xl shadow-behance-blue/30 hover:shadow-behance-blue/50 hover:-translate-y-1"
                >
                  <span>Visit behance.net/erlanvillania</span>
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>

            </div>

            {/* Right: Behance Metrics Grid */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              <div className={`p-6 rounded-2xl border text-center ${darkMode ? 'bg-slate-800/60 border-slate-700' : 'bg-white border-slate-200 shadow-sm'}`}>
                <div className="w-12 h-12 rounded-2xl bg-behance-blue/10 text-behance-blue flex items-center justify-center mx-auto mb-3">
                  <Eye className="w-6 h-6" />
                </div>
                <div className="text-3xl font-extrabold text-behance-blue">{profileData.stats.projectViews}</div>
                <div className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-wider">Project Views</div>
              </div>

              <div className={`p-6 rounded-2xl border text-center ${darkMode ? 'bg-slate-800/60 border-slate-700' : 'bg-white border-slate-200 shadow-sm'}`}>
                <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto mb-3">
                  <Heart className="w-6 h-6 fill-current" />
                </div>
                <div className="text-3xl font-extrabold text-rose-500">{profileData.stats.appreciations}</div>
                <div className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-wider">Appreciations</div>
              </div>

              <div className={`p-6 rounded-2xl border text-center ${darkMode ? 'bg-slate-800/60 border-slate-700' : 'bg-white border-slate-200 shadow-sm'}`}>
                <div className="w-12 h-12 rounded-2xl bg-brand-cyan/10 text-brand-cyan flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6" />
                </div>
                <div className="text-3xl font-extrabold text-brand-cyan">{profileData.stats.followers}</div>
                <div className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-wider">Followers</div>
              </div>

            </div>

          </div>

          {/* Testimonial Quote Carousel Cards */}
          <div className="mt-12 pt-8 border-t border-slate-700/40">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-6">Client Endorsements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials.map((t) => (
                <div 
                  key={t.id}
                  className={`p-6 rounded-2xl border ${
                    darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white/80 border-slate-200 shadow-sm'
                  }`}
                >
                  <p className={`text-sm italic mb-4 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    "{t.quote}"
                  </p>
                  <div className="flex items-center gap-3">
                    <img src={t.avatar} alt={t.author} className="w-10 h-10 rounded-full object-cover border border-behance-blue/40" />
                    <div>
                      <div className="font-bold text-xs">{t.author}</div>
                      <div className="text-[11px] text-slate-400">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
