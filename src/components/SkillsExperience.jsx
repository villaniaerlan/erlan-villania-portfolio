import React from 'react';
import { profileData } from '../data/portfolioData';
import { CheckCircle2, Layers, Cpu, Compass, PenTool, Layout, Palette } from 'lucide-react';

export default function SkillsExperience({ darkMode }) {
  const steps = [
    {
      number: "01",
      title: "Discovery & Strategy",
      desc: "Deep-dive into client vision, target audience demographics, competitive brand landscapes, and user journey mapping."
    },
    {
      number: "02",
      title: "Concept & Wireframing",
      desc: "Exploratory moodboards, vector logotype sketching, typographic pairing, and interactive low-fidelity wireframes."
    },
    {
      number: "03",
      title: "High-Fidelity Execution",
      desc: "Crafting pixel-perfect design systems, glassmorphism UI components, packaging 3D renders, and brand guidelines."
    },
    {
      number: "04",
      title: "Launch & Behance Showcase",
      desc: "Delivering exportable production assets, design specs, and presenting case studies to global Behance audiences."
    }
  ];

  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-cyan/10 text-brand-cyan text-xs font-bold border border-brand-cyan/20">
            <Palette className="w-3.5 h-3.5" />
            <span>Expertise & Process</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Design Capabilities & <span className="text-gradient">Creative Process</span>
          </h2>
          <p className={`text-base ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Combining strategic thinking with visual artistry to craft memorable digital experiences and timeless brand identities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Skills Breakdown */}
          <div className="lg:col-span-6 space-y-8">
            <div className={`p-8 rounded-3xl border ${darkMode ? 'glass-card border-slate-800' : 'glass-card-light border-slate-200 shadow-xl'}`}>
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Layers className="w-5 h-5 text-behance-blue" />
                <span>Core Competencies</span>
              </h3>

              <div className="space-y-6">
                {profileData.skills.map((skill, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-between items-center text-sm font-semibold">
                      <span>{skill.name}</span>
                      <span className="text-behance-blue">{skill.level}%</span>
                    </div>
                    <div className={`h-2.5 rounded-full overflow-hidden ${darkMode ? 'bg-slate-800' : 'bg-slate-200'}`}>
                      <div 
                        className="h-full rounded-full bg-gradient-to-r from-behance-blue via-brand-cyan to-brand-accent transition-all duration-1000"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Software Toolset Grid */}
            <div className={`p-8 rounded-3xl border ${darkMode ? 'glass-card border-slate-800' : 'glass-card-light border-slate-200 shadow-xl'}`}>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Cpu className="w-5 h-5 text-brand-cyan" />
                <span>Software Mastery</span>
              </h3>
              
              <div className="flex flex-wrap gap-2.5">
                {profileData.tools.map((tool, idx) => (
                  <div 
                    key={idx}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border flex items-center gap-2 ${
                      darkMode ? 'bg-slate-800/80 border-slate-700 text-slate-200' : 'bg-white border-slate-200 text-slate-800 shadow-sm'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-behance-blue" />
                    <span>{tool.name}</span>
                    <span className="text-[10px] text-slate-400 font-normal">({tool.category})</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Creative Process Timeline */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Compass className="w-6 h-6 text-brand-accent" />
              <span>Design Methodology</span>
            </h3>

            <div className="space-y-4">
              {steps.map((step, idx) => (
                <div 
                  key={idx}
                  className={`p-6 rounded-2xl border transition-all hover:translate-x-1 ${
                    darkMode ? 'glass-card border-slate-800 hover:border-behance-blue/40' : 'glass-card-light border-slate-200 hover:border-behance-blue/40 shadow-md'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <span className="text-2xl font-extrabold text-gradient">{step.number}</span>
                    <div>
                      <h4 className="text-lg font-bold mb-1">{step.title}</h4>
                      <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        {step.desc}
                      </p>
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
