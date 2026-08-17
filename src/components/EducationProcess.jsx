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

  // =====================================================
  // TOOLS & TECHNOLOGIES
  // Images are located in: public/tools/
  // =====================================================

  const tools = [
    {
      name: "Illustrator",
      icon: "/tools/illustrator.png"
    },
    {
      name: "Photoshop",
      icon: "/tools/photoshop.png"
    },
    {
      name: "Premiere Pro",
      icon: "/tools/premier.png"
    },
    {
      name: "Figma",
      icon: "/tools/figma.png"
    },
    {
      name: "Canva",
      icon: "/tools/canva.png"
    },
    {
      name: "CapCut",
      icon: "/tools/capcut.png"
    },
    {
      name: "Firefly",
      icon: "/tools/firefly.png"
    },
    {
      name: "Gemini",
      icon: "/tools/gemini.png"
    },
    {
      name: "ChatGPT",
      icon: "/tools/chatgpt.png"
    }
  ];

  return (
    <section
      id="about"
      className="bg-[#0A0A0A] py-20 border-b border-[#1A1A1A] overflow-hidden"
    >

      {/* =====================================================
          TOOL ANIMATION
          ===================================================== */}

      <style>{`
        .tool-icon {
          transition:
            transform 0.4s ease,
            filter 0.4s ease,
            opacity 0.4s ease;
        }

        .tool-icon:hover {
          transform: scale(1.08);
          filter: brightness(1.15);
        }

        .tool-item {
          transition: transform 0.4s ease;
        }

        .tool-item:hover {
          transform: translateY(-2px);
        }

        @keyframes glowMove {
          0%, 100% {
            transform: scale(1);
            opacity: 0.12;
          }

          50% {
            transform: scale(1.15);
            opacity: 0.25;
          }
        }

        .tool-glow {
          animation: glowMove 4s ease-in-out infinite;
        }
      `}</style>


      <div className="max-w-7xl mx-auto px-6 sm:px-12">

        {/* =====================================================
            MAIN 3-COLUMN LAYOUT
            ===================================================== */}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-12 items-start">


          {/* =================================================
              COLUMN 1
              EDUCATION & SKILLS
              ================================================= */}

          <div className="lg:col-span-4 space-y-10">

            {/* EDUCATION */}

            <div className="space-y-6">

              <h3 className="font-display text-2xl font-extrabold tracking-widest text-white uppercase border-b border-[#222] pb-3">
                EDUCATION & SKILLS
              </h3>


              <div className="space-y-4">

                <div className="text-xs font-extrabold tracking-widest text-crimson uppercase">
                  EDUCATION
                </div>


                {profileData.education.map((edu, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-start pt-2 gap-4"
                  >

                    <div className="min-w-0">

                      <h4 className="text-sm font-bold text-white">
                        {edu.degree}
                      </h4>

                      <p className="text-xs text-slate-400 mt-0.5">
                        {edu.school}
                      </p>

                    </div>


                    <span className="text-xs font-bold text-crimson tracking-wider shrink-0">
                      {edu.years}
                    </span>

                  </div>
                ))}

              </div>

            </div>


            {/* SKILLS */}

            <div className="space-y-4">

              <div className="text-xs font-extrabold tracking-widest text-crimson uppercase">
                SKILLS
              </div>


              <div className="flex flex-wrap gap-2">

                {profileData.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="
                      px-3
                      py-1.5
                      rounded-lg
                      bg-[#141414]
                      border
                      border-[#262626]
                      text-[11px]
                      font-extrabold
                      tracking-wider
                      text-slate-300
                      uppercase
                      hover:border-crimson
                      hover:text-white
                      transition-colors
                    "
                  >
                    {skill}
                  </span>
                ))}

              </div>

            </div>

          </div>


          {/* =================================================
              COLUMN 2
              WORK PROCESS
              ================================================= */}

          <div className="lg:col-span-4 space-y-6">

            <h3 className="font-display text-2xl font-extrabold tracking-widest text-white uppercase border-b border-[#222] pb-3">
              WORK PROCESS
            </h3>


            <div className="space-y-6 pt-2">

              {profileData.processSteps.map((step, idx) => {

                const IconComponent =
                  iconMap[step.icon] || Search;

                return (
                  <div
                    key={idx}
                    className="flex items-start gap-4"
                  >

                    {/* NUMBER + ICON */}

                    <div className="flex items-center gap-3 shrink-0">

                      <span className="font-display text-xl font-extrabold text-crimson">
                        {step.number}
                      </span>


                      <div
                        className="
                          w-10
                          h-10
                          rounded-full
                          bg-[#161616]
                          border
                          border-[#2B2B2B]
                          flex
                          items-center
                          justify-center
                          text-slate-300
                        "
                      >

                        <IconComponent className="w-4 h-4 text-slate-300" />

                      </div>

                    </div>


                    {/* PROCESS TEXT */}

                    <div className="pt-0.5">

                      <h4
                        className="
                          font-display
                          text-base
                          font-bold
                          tracking-wider
                          text-white
                          uppercase
                        "
                      >
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


          {/* =================================================
              COLUMN 3
              TOOLS & TECHNOLOGIES
              ================================================= */}

          <div className="lg:col-span-4">

            <div className="space-y-5">

              {/* TITLE */}

              <div className="text-xs font-extrabold tracking-widest text-crimson uppercase">
                TOOLS & TECHNOLOGIES
              </div>


              {/* =================================================
                  TOOLS CARD
                  ================================================= */}

              <div
                className="
                  relative
                  overflow-hidden
                  rounded-2xl
                  border
                  border-red-900/70
                  bg-gradient-to-br
                  from-[#7d0007]
                  via-[#4b0306]
                  to-[#1b0102]
                  p-6
                  sm:p-7
                  min-h-[430px]
                  shadow-2xl
                "
              >

                {/* Background Glow */}

                <div
                  className="
                    tool-glow
                    absolute
                    -top-24
                    -right-24
                    w-64
                    h-64
                    rounded-full
                    bg-red-400/30
                    blur-3xl
                    pointer-events-none
                  "
                />


                <div
                  className="
                    absolute
                    -bottom-32
                    -left-32
                    w-72
                    h-72
                    rounded-full
                    bg-black/30
                    blur-3xl
                    pointer-events-none
                  "
                />


                {/* =================================================
                    ICON GRID
                    ================================================= */}

                <div
                  className="
                    relative
                    z-10
                    grid
                    grid-cols-3
                    gap-x-5
                    gap-y-10
                    sm:gap-x-7
                    sm:gap-y-12
                  "
                >

                  {tools.map((tool) => (

                    <div
                      key={tool.name}
                      className="tool-item group text-center"
                    >

                      {/* ICON */}

                      <div
                        className="
                          relative
                          mx-auto
                          w-16
                          h-16
                          sm:w-20
                          sm:h-20
                        "
                      >

                        {/* Subtle hover glow */}

                        <div
                          className="
                            absolute
                            inset-0
                            rounded-2xl
                            bg-white/20
                            blur-xl
                            opacity-0
                            group-hover:opacity-60
                            transition-all
                            duration-400
                          "
                        />


                        {/* Tool Image */}

                        <img
                          src={tool.icon}
                          alt={tool.name}
                          className="
                            relative
                            z-10
                            w-full
                            h-full
                            object-contain
                            rounded-2xl
                            tool-icon
                          "
                          loading="lazy"
                        />

                      </div>


                      {/* TOOL NAME */}

                      <div
                        className="
                          mt-3
                          text-[8px]
                          sm:text-[9px]
                          font-extrabold
                          tracking-wider
                          text-white/60
                          uppercase
                          group-hover:text-white
                          transition-colors
                          duration-300
                        "
                      >
                        {tool.name}
                      </div>

                    </div>

                  ))}

                </div>


                {/* =================================================
                    BOTTOM DIVIDER
                    ================================================= */}

                <div className="relative z-10 mt-10 pt-5 border-t border-white/10">

                  <div className="flex items-center justify-between gap-3">

                    <span
                      className="
                        text-[9px]
                        sm:text-[10px]
                        font-extrabold
                        tracking-widest
                        text-white/80
                        uppercase
                      "
                    >
                      CREATIVE TOOLKIT
                    </span>


                    <span className="text-red-300 text-xl animate-pulse">
                      ✦
                    </span>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}