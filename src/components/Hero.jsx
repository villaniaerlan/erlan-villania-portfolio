import React, { useState } from 'react';
import { Globe, ArrowRight, ExternalLink, Mail, Image as ImageIcon, Layout } from 'lucide-react';
import { profileData } from '../data/portfolioData';

export default function Hero() {
  const [useSolidBanner, setUseSolidBanner] = useState(profileData.useSolidBanner ?? false);
  const [bannerImgError, setBannerImgError] = useState(false);

  return (
    <section className="relative bg-[#0A0A0A] pt-6 pb-16 md:pt-8 md:pb-20 overflow-hidden border-b border-[#1A1A1A]">
      
      {/* Banner Mode Toggle Switch */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 mb-6 flex justify-end relative z-30">
        <button
          onClick={() => setUseSolidBanner(!useSolidBanner)}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#121212] border border-[#333333] text-[11px] font-extrabold tracking-wider text-slate-200 hover:text-white hover:border-crimson transition-all shadow-2xl backdrop-blur-md hover:scale-105 active:scale-95"
          title="Switch between Solid Banner Image mode and Interactive Text Layout mode"
        >
          {useSolidBanner ? (
            <>
              <Layout className="w-3.5 h-3.5 text-crimson" />
              <span>A SHORT VIDEO INTRODUCTION ABOUT ME</span>
            </>
          ) : (
            <>
              <ImageIcon className="w-3.5 h-3.5 text-crimson" />
              <span>GET TO KNOW ME</span>
            </>
          )}
        </button>
      </div>

      {/* SOLID BANNER IMAGE MODE */}
      {useSolidBanner ? (
        <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-20 space-y-6">
          <div className="relative rounded-2xl overflow-hidden border-2 border-[#262626] bg-[#121212] shadow-2xl group">
            
            {/* Display user's custom hero banner image */}
            <img
              src={profileData.heroBannerImage}
              alt="Erlan Villania Custom Banner"
              onError={() => setBannerImgError(true)}
              className="w-full h-auto max-h-[650px] object-cover"
            />

            {/* Fallback helper if image fails to load */}
            {bannerImgError && (
              <div className="p-12 text-center space-y-4 bg-[#141414] border border-dashed border-[#333]">
                <div className="w-12 h-12 rounded-full bg-crimson/20 text-crimson flex items-center justify-center mx-auto">
                  <ImageIcon className="w-6 h-6" />
                </div>
                <h3 className="font-display text-xl font-bold text-white uppercase">CUSTOM BANNER IMAGE</h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Save your graphic banner as <code className="text-crimson font-bold">hero_banner.png</code> in the <code className="text-slate-200">public/</code> folder!
                </p>
              </div>
            )}
          </div>

          {/* Action Bar for Solid Banner Mode */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-[#121212] border border-[#222]">
            <div className="flex items-center gap-3">
              <span className="font-display text-lg font-bold text-white uppercase">ERLAN VILLANIA</span>
              <span className="text-slate-600">|</span>
              <span className="text-xs font-bold text-crimson tracking-widest uppercase">AVAILABLE FOR FREELANCE</span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#work"
                className="px-5 py-2.5 rounded-xl bg-crimson hover:bg-crimson-dark text-white font-extrabold text-xs tracking-widest uppercase transition-all flex items-center gap-2"
              >
                <span>EXPLORE WORK</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="px-5 py-2.5 rounded-xl bg-[#1A1A1A] hover:bg-[#252525] border border-[#333] text-slate-200 font-extrabold text-xs tracking-widest uppercase transition-all flex items-center gap-2"
              >
                <Mail className="w-3.5 h-3.5 text-crimson" />
                <span>GET IN TOUCH</span>
              </a>

              <a
                href={profileData.behanceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-[#1A1A1A] hover:bg-[#252525] border border-[#333] text-slate-300 hover:text-crimson transition-all"
                title="View Behance Profile"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      ) : (
        /* INTERACTIVE CODE TEXT LAYOUT MODE */
        <>
          {/* Giant Background PORTFOLIO Typography */}
          <div className="absolute top-16 left-0 right-0 w-full flex justify-center pointer-events-none select-none overflow-hidden z-0">
            <h1 className="font-display font-extrabold text-[30vw] sm:text-[18vw] leading-none tracking-tighter text-[#1C0406] uppercase opacity-75 whitespace-nowrap">
              PORTFOLIO
            </h1>
          </div>

          <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2 md:pt-6">
              
              {/* Left Column: Name & Intro */}
              <div className="lg:col-span-4 space-y-5 text-left order-2 lg:order-1">
                
                {/* Handwritten Script Greeting */}
                <div className="font-script text-3xl sm:text-4xl text-slate-300 transform -rotate-3">
                  {profileData.scriptGreeting}
                </div>

                {/* Giant Condensed Headline */}
                <div>
                  <h2 className="font-display text-6xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight text-white leading-none uppercase">
                    {profileData.name}
                  </h2>
                  <p className="font-bold text-sm sm:text-base tracking-widest text-crimson uppercase mt-3">
                    {profileData.subtitle}
                  </p>
                </div>

                {/* Short Bio */}
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm font-normal">
                  {profileData.tagline}
                </p>

                {/* Interactive Action Buttons Bar */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  
                  {/* Primary CTA: Explore Work */}
                  <a
                    href="#work"
                    className="px-5 py-3 rounded-xl bg-crimson hover:bg-crimson-dark text-white font-extrabold text-xs tracking-widest uppercase transition-all duration-300 shadow-lg shadow-crimson/25 hover:shadow-crimson/40 hover:-translate-y-0.5 flex items-center gap-2"
                  >
                    <span>EXPLORE WORK</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  {/* Secondary CTA: Get in Touch */}
                  <a
                    href="#contact"
                    className="px-5 py-3 rounded-xl bg-[#181818] hover:bg-[#222222] border border-[#333333] text-slate-200 font-extrabold text-xs tracking-widest uppercase transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2"
                  >
                    <Mail className="w-3.5 h-3.5 text-crimson" />
                    <span>GET IN TOUCH</span>
                  </a>

                  {/* Behance Link Button */}
                  <a
                    href={profileData.behanceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-[#181818] hover:bg-[#222222] border border-[#333333] text-slate-300 hover:text-crimson transition-all"
                    title="View Behance Profile"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>

                </div>

                {/* Location Pill Button */}
                <div className="pt-1">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141414] border border-[#262626] text-xs font-bold text-slate-300 hover:border-crimson hover:text-white transition-colors"
                  >
                    <Globe className="w-3.5 h-3.5 text-crimson" />
                    <span className="tracking-wider">{profileData.location}</span>
                  </a>
                </div>

              </div>

              {/* Center Column: Transparent Floating Character / Portrait */}
              <div className="lg:col-span-5 flex justify-center order-1 lg:order-2 relative">
                
                <div className="relative w-full max-w-md">
                  
                  {/* Crimson Ambient Glow Behind Character */}
                  <div className="absolute inset-0 bg-crimson/25 rounded-full blur-[100px] pointer-events-none" />

                  {/* Transparent Floating Character Container (No box border or solid background!) */}
                  <div className="relative flex justify-center items-center bg-transparent p-0 border-0 shadow-none">
                    <img
                      src={profileData.avatar}
                      alt={profileData.name}
                      className="w-full h-[460px] sm:h-[530px] object-contain object-center filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)] hover:scale-105 transition-transform duration-700 bg-transparent"
                    />
                  </div>

                  {/* Floating Badge (Clickable link to #work) */}
                  <a
                    href="#work"
                    className="absolute bottom-6 -right-4 sm:-right-8 max-w-[210px] bg-[#141414]/95 backdrop-blur-md border border-[#2B2B2B] p-3.5 rounded-xl shadow-2xl flex items-start gap-2.5 hover:border-crimson transition-all group hover:-translate-y-1 z-20"
                  >
                    <div className="w-6 h-6 rounded-full bg-crimson/20 text-crimson flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-crimson group-hover:text-white transition-colors">
                      <span className="text-xs font-bold">✦</span>
                    </div>
                    <p className="text-[11px] text-slate-300 group-hover:text-white leading-tight font-medium transition-colors">
                      {profileData.floatingBadge}
                    </p>
                  </a>

                </div>

              </div>

              {/* Right Column: Stacked Stats */}
              <div className="lg:col-span-3 space-y-6 order-3 flex flex-col justify-center lg:items-end text-left lg:text-right">
                
                <div className="space-y-6 bg-[#121212]/90 border border-[#222] p-6 rounded-2xl w-full max-w-xs shadow-xl">
                  {profileData.stats.map((stat, idx) => (
                    <div key={idx} className="border-b border-[#222] last:border-0 pb-4 last:pb-0">
                      <div className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                        {stat.value}
                      </div>
                      <div className="text-[10px] font-extrabold tracking-widest text-slate-400 uppercase mt-0.5">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

              </div>

            </div>

          </div>
        </>
      )}

    </section>
  );
}
