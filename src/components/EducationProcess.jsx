import React from 'react';
import { Search, Lightbulb, PenTool, Code, Send } from 'lucide-react';
import { profileData } from '../data/portfolioData';

export default function EducationProcess() {
  const iconMap = {
    Search: Search,
    Lightbulb: Lightbulb,
    PenTool: PenTool,
    Code: Code,
    Send: Send
  };

  return (
    <section id="about" className="bg-[#0A0A0A] py-20 border-b border-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Column 1: EDUCATION & SKILLS */}
          <div className="lg:col-span-4 space-y-10">
            
            {/* Education Sub-block */}
            <div className="space-y-6">
              <h3 className="font-display text-2xl font-extrabold tracking-widest text-white uppercase border-b border-[#222] pb-3">
                EDUCATION & SKILLS
              </h3>

              <div className="space-y-4">
                <div className="text-xs font-extrabold tracking-widest text-crimson uppercase">EDUCATION</div>
                
                {profileData.education.map((edu, idx) => (
                  <div key={idx} className="flex justify-between items-start pt-2">
                    <div>
                      <h4 className="text-sm font-bold text-white">{edu.degree}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">{edu.school}</p>
                    </div>
                    <span className="text-xs font-bold text-crimson tracking-wider">{edu.years}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills Pills Grid */}
            <div className="space-y-4">
              <div className="text-xs font-extrabold tracking-widest text-crimson uppercase">SKILLS</div>
              
              <div className="flex flex-wrap gap-2">
                {profileData.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-lg bg-[#141414] border border-[#262626] text-[11px] font-extrabold tracking-wider text-slate-300 uppercase hover:border-crimson hover:text-white transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Column 2: WORK PROCESS */}
          <div className="lg:col-span-4 space-y-6">
            <h3 className="font-display text-2xl font-extrabold tracking-widest text-white uppercase border-b border-[#222] pb-3">
              WORK PROCESS
            </h3>

            <div className="space-y-6 pt-2">
              {profileData.processSteps.map((step, idx) => {
                const IconComponent = iconMap[step.icon] || Search;

                return (
                  <div key={idx} className="flex items-start gap-4">
                    {/* Number + Icon Circle */}
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="font-display text-xl font-extrabold text-crimson">
                        {step.number}
                      </span>
                      <div className="w-10 h-10 rounded-full bg-[#161616] border border-[#2B2B2B] flex items-center justify-center text-slate-300">
                        <IconComponent className="w-4 h-4 text-slate-300" />
                      </div>
                    </div>

                    <div>
                      <h4 className="font-display text-base font-bold tracking-wider text-white uppercase">
                        {step.title}
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed mt-0.5">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Column 3: CRIMSON QUOTE CARD */}
          <div className="lg:col-span-4 flex">
            <div className="w-full rounded-2xl bg-gradient-to-b from-[#6A0409] via-[#4A0306] to-[#250103] border border-crimson/30 p-8 flex flex-col justify-between relative overflow-hidden shadow-2xl">
              
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-crimson/30 rounded-full blur-3xl pointer-events-none" />

              {/* Giant Quote Icon */}
              <div className="text-6xl font-serif text-crimson-light font-extrabold leading-none opacity-80 mb-4">
                “
              </div>

              {/* Quote Text */}
              <div className="space-y-6 relative z-10">
                <blockquote className="text-lg sm:text-xl font-medium text-white leading-relaxed">
                  "{profileData.quote}"
                </blockquote>

                {/* Handwritten Signature */}
                <div className="font-script text-4xl text-slate-200 pt-2 transform -rotate-6">
                  {profileData.signature}
                </div>
              </div>

              {/* Callout Footer */}
              <div className="pt-12 relative z-10 border-t border-white/10 mt-8">
                <div className="text-xs font-extrabold tracking-widest text-slate-200 uppercase flex items-center gap-1.5">
                  <span>LET'S CREATE SOMETHING GREAT TOGETHER.</span>
                  <span className="text-crimson-light">✦</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
