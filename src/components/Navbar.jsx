import React from 'react';
import { ExternalLink, Sparkles } from 'lucide-react';
import { profileData } from '../data/portfolioData';

export default function Navbar() {
  return (
    <header className="w-full bg-[#0A0A0A] border-b border-[#1A1A1A] py-4 px-6 sm:px-12 sticky top-0 z-50 backdrop-blur-md bg-opacity-90">
      <div className="max-w-7xl mx-auto flex items-center justify-between text-xs tracking-widest uppercase font-bold">
        
        {/* Left Subhead */}
        <a href="#" className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors group">
          <span className="text-white font-extrabold tracking-wider text-sm group-hover:text-crimson transition-colors">
            ERLAN VILLANIA
          </span>
          <span className="text-slate-600">|</span>
          <span className="hidden sm:inline text-slate-400">WEB DESIGNER / DIGITAL CREATOR</span>
        </a>

        {/* Right Availability Badge & Behance Quick Link */}
        <div className="flex items-center gap-6">
          <a
            href={profileData.behanceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-1.5 text-slate-300 hover:text-crimson transition-colors py-1 px-3 rounded-lg hover:bg-[#161616]"
          >
            <span>BEHANCE PROFILE</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <a
            href="#contact"
            className="flex items-center gap-2 text-crimson font-extrabold py-1.5 px-3.5 rounded-full border border-crimson/30 hover:border-crimson hover:bg-crimson/10 transition-all cursor-pointer shadow-sm hover:shadow-crimson/20"
          >
            <span className="w-2 h-2 rounded-full bg-crimson animate-pulse" />
            <span>AVAILABLE FOR FREELANCE</span>
            <span className="text-xs">✦</span>
          </a>
        </div>

      </div>
    </header>
  );
}
