import React, { useEffect, useRef, useState } from 'react';
import {
  Search,
  Lightbulb,
  PenTool,
  Code,
  Send
} from 'lucide-react';
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
  // SECTION REVEAL + PARALLAX
  // =====================================================

  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // =====================================================
  // INTERSECTION OBSERVER
  // =====================================================

  useEffect(() => {
    const element = sectionRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.12,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  // =====================================================
  // SCROLL PARALLAX
  // =====================================================

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (sectionRef.current) {
            const rect =
              sectionRef.current.getBoundingClientRect();

            const viewportCenter =
              window.innerHeight / 2;

            const distanceFromCenter =
              rect.top +
              rect.height / 2 -
              viewportCenter;

            setScrollY(distanceFromCenter);
          }

          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener(
      'scroll',
      handleScroll,
      {
        passive: true
      }
    );

    handleScroll();

    return () => {
      window.removeEventListener(
        'scroll',
        handleScroll
      );
    };
  }, []);

  // =====================================================
  // TOOLS & TECHNOLOGIES
  // =====================================================

  const tools = [
    {
      name: 'Illustrator',
      icon: '/tools/illustrator.png'
    },
    {
      name: 'Photoshop',
      icon: '/tools/photoshop.png'
    },
    {
      name: 'Premiere Pro',
      icon: '/tools/premier.png'
    },
    {
      name: 'Figma',
      icon: '/tools/figma.png'
    },
    {
      name: 'Canva',
      icon: '/tools/canva.png'
    },
    {
      name: 'CapCut',
      icon: '/tools/capcut.png'
    },
    {
      name: 'Firefly',
      icon: '/tools/firefly.png'
    },
    {
      name: 'Gemini',
      icon: '/tools/gemini.png'
    },
    {
      name: 'ChatGPT',
      icon: '/tools/chatgpt.png'
    }
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="
        bg-[#0A0A0A]
        py-20
        border-b
        border-[#1A1A1A]
        overflow-hidden
        education-section
      "
    >

      {/* =====================================================
          CUSTOM ANIMATION STYLES
          ===================================================== */}

      <style>{`

        /* ===================================================
           TOOL HOVER
           =================================================== */

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
          transition:
            transform 0.4s ease;
        }

        .tool-item:hover {
          transform:
            translateY(-2px);
        }


        /* ===================================================
           TOOL GLOW
           =================================================== */

        @keyframes glowMove {

          0%,
          100% {
            transform:
              scale(1);

            opacity:
              0.12;
          }

          50% {
            transform:
              scale(1.15);

            opacity:
              0.25;
          }

        }

        .tool-glow {
          animation:
            glowMove
            4s
            ease-in-out
            infinite;
        }


        /* ===================================================
           MOBILE POLISH
           =================================================== */

        @media (max-width: 640px) {

          .education-section {
            padding-top: 4rem;
            padding-bottom: 4rem;
          }


          /* -----------------------------------------------
             MAIN CONTAINER
          ------------------------------------------------ */

          .education-section > div {
            padding-left: 1rem;
            padding-right: 1rem;
          }


          /* -----------------------------------------------
             MAIN COLUMNS
          ------------------------------------------------ */

          .education-section
          .grid {
            gap: 2rem;
          }


          /* -----------------------------------------------
             TOOLS POSITION
          ------------------------------------------------ */

          .education-section
          .mobile-tools-column {
            margin-top: 3rem;

            /*
             Prevent the desktop parallax transform
             from pulling Tools upward on mobile.
            */
            transform: none !important;
          }


          /* -----------------------------------------------
             SECTION HEADINGS
          ------------------------------------------------ */

          .education-section h3 {
            font-size: 1.45rem;
            line-height: 1;
            letter-spacing: .12em;
            padding-bottom: .75rem;
          }


          /* -----------------------------------------------
             EDUCATION
          ------------------------------------------------ */

          .education-section
          .space-y-6 {
            row-gap: 1.5rem;
          }


          .education-section
          .space-y-4 {
            row-gap: 1rem;
          }


          .education-section
          h4 {
            line-height: 1.25;
          }


          /* -----------------------------------------------
             SKILLS
          ------------------------------------------------ */

          .education-section
          .flex.flex-wrap {
            gap: .45rem;
          }


          .education-section
          .flex.flex-wrap span {
            padding:
              .38rem
              .65rem;

            font-size: 9px;
            line-height: 1.1;
          }


          /* -----------------------------------------------
             WORK PROCESS
          ------------------------------------------------ */

          .education-section
          .work-process-item {
            gap: .7rem;
          }


          /* -----------------------------------------------
             PROCESS NUMBER + ICON
          ------------------------------------------------ */

          .education-section
          .process-marker {
            gap: .55rem;
          }


          .education-section
          .process-number {
            font-size: 1.05rem;
          }


          .education-section
          .process-icon {
            width: 2.35rem;
            height: 2.35rem;

            flex-shrink: 0;
          }


          .education-section
          .process-icon svg {
            width: .85rem;
            height: .85rem;
          }


          /* -----------------------------------------------
             PROCESS TEXT
          ------------------------------------------------ */

          .education-section
          .process-content {
            min-width: 0;
            padding-top: .05rem;
          }


          .education-section
          .process-content h4 {
            font-size: .88rem;
            line-height: 1.1;
            letter-spacing: .055em;
          }


          .education-section
          .process-content p {
            margin-top: .4rem;

            font-size: .69rem;

            line-height: 1.55;

            color:
              rgb(148 163 184);
          }


          /* -----------------------------------------------
             TOOLS TITLE
          ------------------------------------------------ */

          .education-section
          .tools-title {
            font-size: 9px;
            letter-spacing: .2em;
          }


          /* -----------------------------------------------
             TOOLS CARD
          ------------------------------------------------ */

          .education-section
          .tools-card {
            min-height: 0;

            padding:
              1.35rem
              1.1rem;

            border-radius:
              1rem;
          }


          /* -----------------------------------------------
             TOOL GRID
          ------------------------------------------------ */

          .education-section
          .tools-grid {
            column-gap: .75rem;
            row-gap: 1.65rem;
          }


          /* -----------------------------------------------
             TOOL ICON SIZE
          ------------------------------------------------ */

          .education-section
          .tool-icon-wrap {
            width: 3.35rem;
            height: 3.35rem;
          }


          .education-section
          .tool-name {
            margin-top: .55rem;

            font-size: 7px;

            line-height: 1.2;

            letter-spacing: .09em;
          }


          /* -----------------------------------------------
             TOOL BOTTOM DIVIDER
          ------------------------------------------------ */

          .education-section
          .tool-footer {
            margin-top: 1.75rem;
            padding-top: .9rem;
          }


          .education-section
          .tool-footer span:first-child {
            font-size: 8px;
            letter-spacing: .15em;
          }


          .education-section
          .tool-footer span:last-child {
            font-size: 1rem;
          }


          /* -----------------------------------------------
             DISABLE BIG HOVER EFFECTS ON TOUCH
          ------------------------------------------------ */

          .education-section
          .tool-item:hover {
            transform:
              none;
          }


          .education-section
          .tool-icon:hover {
            transform:
              none;
          }

        }


        /* ===================================================
           SMALL PHONES
           =================================================== */

        @media (max-width: 380px) {

          .education-section {
            padding-top: 4rem;
            padding-bottom: 4rem;
          }


          .education-section > div {
            padding-left: .9rem;
            padding-right: .9rem;
          }


          .education-section
          .grid {
            gap: 2rem;
          }


          .education-section h3 {
            font-size: 1.3rem;
          }


          .education-section
          .process-icon {
            width: 2.15rem;
            height: 2.15rem;
          }


          .education-section
          .process-number {
            font-size: 1rem;
          }


          .education-section
          .process-content h4 {
            font-size: .82rem;
          }


          .education-section
          .process-content p {
            font-size: .65rem;
            line-height: 1.5;
          }


          .education-section
          .tools-card {
            padding:
              1.15rem
              .85rem;
          }


          .education-section
          .tools-grid {
            column-gap: .4rem;
            row-gap: 1.45rem;
          }


          .education-section
          .tool-icon-wrap {
            width: 3rem;
            height: 3rem;
          }


          .education-section
          .tool-name {
            font-size: 6.5px;
          }

        }


        /* ===================================================
           REDUCED MOTION
           =================================================== */

        @media (prefers-reduced-motion: reduce) {

          .tool-glow {
            animation:
              none;
          }

          .tool-icon,
          .tool-item {
            transition:
              none;
          }

        }

      `}</style>


      <div
        className="
          max-w-7xl
          mx-auto
          px-6
          sm:px-12
        "
      >

        {/* =====================================================
            MAIN 3-COLUMN LAYOUT
            ===================================================== */}

        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-12
            gap-10
            xl:gap-12
            items-start
          "
        >


          {/* =================================================
              COLUMN 1 — EDUCATION & SKILLS
              ================================================= */}

          <div
            className={`
              lg:col-span-4
              space-y-10

              transition-all
              duration-1000
              ease-[cubic-bezier(0.22,1,0.36,1)]

              ${
                isVisible
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-8'
              }
            `}
            style={{
              transform:
                `translateY(${scrollY * -0.025}px)`
            }}
          >

            {/* EDUCATION */}

            <div className="space-y-6">

              <h3
                className="
                  font-display
                  text-2xl
                  font-extrabold
                  tracking-widest
                  text-white
                  uppercase
                  border-b
                  border-[#222]
                  pb-3
                "
              >
                EDUCATION & SKILLS
              </h3>


              <div className="space-y-4">

                <div
                  className="
                    text-xs
                    font-extrabold
                    tracking-widest
                    text-crimson
                    uppercase
                  "
                >
                  EDUCATION
                </div>


                {profileData.education.map(
                  (edu, idx) => (
                    <div
                      key={idx}
                      className="
                        flex
                        justify-between
                        items-start
                        pt-2
                        gap-4
                      "
                    >

                      <div className="min-w-0">

                        <h4
                          className="
                            text-sm
                            font-bold
                            text-white
                          "
                        >
                          {edu.degree}
                        </h4>

                        <p
                          className="
                            text-xs
                            text-slate-400
                            mt-0.5
                          "
                        >
                          {edu.school}
                        </p>

                      </div>


                      <span
                        className="
                          text-xs
                          font-bold
                          text-crimson
                          tracking-wider
                          shrink-0
                        "
                      >
                        {edu.years}
                      </span>

                    </div>
                  )
                )}

              </div>

            </div>


            {/* SKILLS */}

            <div className="space-y-4">

              <div
                className="
                  text-xs
                  font-extrabold
                  tracking-widest
                  text-crimson
                  uppercase
                "
              >
                SKILLS
              </div>


              <div
                className="
                  flex
                  flex-wrap
                  gap-2
                "
              >

                {profileData.skills.map(
                  (skill, idx) => (
                    <span
                      key={idx}
                      className={`
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

                        transition-all
                        duration-500

                        ${
                          isVisible
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 translate-y-3'
                        }
                      `}
                      style={{
                        transitionDelay:
                          `${400 + idx * 60}ms`
                      }}
                    >
                      {skill}
                    </span>
                  )
                )}

              </div>

            </div>

          </div>


          {/* =================================================
              COLUMN 2 — WORK PROCESS
              ================================================= */}

          <div
            className={`
              lg:col-span-4
              space-y-6

              transition-all
              duration-1000
              delay-150

              ease-[cubic-bezier(0.22,1,0.36,1)]

              ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }
            `}
            style={{
              transform:
                `translateY(${scrollY * 0.018}px)`
            }}
          >

            <h3
              className="
                font-display
                text-2xl
                font-extrabold
                tracking-widest
                text-white
                uppercase
                border-b
                border-[#222]
                pb-3
              "
            >
              WORK PROCESS
            </h3>


            <div
              className="
                space-y-6
                pt-2
                work-process-list
              "
            >

              {profileData.processSteps.map(
                (step, idx) => {

                  const IconComponent =
                    iconMap[step.icon] || Search;

                  return (
                    <div
                      key={idx}
                      className={`
                        flex
                        items-start
                        gap-4

                        transition-all
                        duration-700
                        ease-out

                        work-process-item

                        ${
                          isVisible
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 translate-y-5'
                        }
                      `}
                      style={{
                        transitionDelay:
                          `${450 + idx * 120}ms`
                      }}
                    >

                      {/* NUMBER + ICON */}

                      <div
                        className="
                          flex
                          items-center
                          gap-3
                          shrink-0

                          process-marker
                        "
                      >

                        <span
                          className="
                            font-display
                            text-xl
                            font-extrabold
                            text-crimson

                            process-number
                          "
                        >
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

                            transition-all
                            duration-300

                            hover:border-crimson
                            hover:text-white
                            hover:scale-105

                            process-icon
                          "
                        >

                          <IconComponent
                            className="
                              w-4
                              h-4
                              text-slate-300
                            "
                          />

                        </div>

                      </div>


                      {/* PROCESS TEXT */}

                      <div
                        className="
                          pt-0.5
                          process-content
                        "
                      >

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


                        <p
                          className="
                            text-xs
                            text-slate-400
                            leading-relaxed
                            mt-0.5
                          "
                        >
                          {step.desc}
                        </p>

                      </div>

                    </div>
                  );
                }
              )}

            </div>

          </div>


          {/* =================================================
              COLUMN 3 — TOOLS & TECHNOLOGIES
              ================================================= */}

          <div
            className={`
              lg:col-span-4
              mobile-tools-column

              transition-all
              duration-1000
              delay-300

              ease-[cubic-bezier(0.22,1,0.36,1)]

              ${
                isVisible
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-8'
              }
            `}
            style={{
              transform:
                `translateY(${scrollY * -0.035}px)`
            }}
          >

            <div className="space-y-5">

              {/* TITLE */}

              <div
                className="
                  text-xs
                  font-extrabold
                  tracking-widest
                  text-crimson
                  uppercase

                  tools-title
                "
              >
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

                  tools-card

                  mx-4
                  sm:mx-6
                  lg:mx-4
                  xl:mx-6
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

                    tools-grid
                  "
                >

                  {tools.map(
                    (tool, idx) => (

                      <div
                        key={tool.name}
                        className={`
                          tool-item
                          group
                          text-center

                          transition-all
                          duration-700
                          ease-out

                          ${
                            isVisible
                              ? 'opacity-100 translate-y-0 scale-100'
                              : 'opacity-0 translate-y-5 scale-95'
                          }
                        `}
                        style={{
                          transitionDelay:
                            `${500 + idx * 80}ms`
                        }}
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

                            tool-icon-wrap
                          "
                        >

                          {/* Hover Glow */}

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

                            tool-name
                          "
                        >
                          {tool.name}
                        </div>

                      </div>

                    )
                  )}

                </div>


                {/* =================================================
                    BOTTOM DIVIDER
                    ================================================= */}

                <div
                  className="
                    relative
                    z-10

                    mt-10
                    pt-5

                    border-t
                    border-white/10

                    tool-footer
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      gap-3
                    "
                  >

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


                    <span
                      className="
                        text-red-300
                        text-xl
                        animate-pulse
                      "
                    >
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