import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProjectGallery from './components/ProjectGallery';
import EducationProcess from './components/EducationProcess';
import ContactFooter from './components/ContactFooter';
import ProjectModal from './components/ProjectModal';

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const updateScroll = () => {
      if (ticking) return;

      window.requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const documentHeight =
          document.documentElement.scrollHeight - window.innerHeight;

        const progress =
          documentHeight > 0
            ? Math.min(1, Math.max(0, scrollTop / documentHeight))
            : 0;

        setScrollProgress(progress);
        ticking = false;
      });

      ticking = true;
    };

    window.addEventListener('scroll', updateScroll, { passive: true });
    updateScroll();

    return () => {
      window.removeEventListener('scroll', updateScroll);
    };
  }, []);

  return (
    <div
      className="
        min-h-screen
        bg-[#0A0A0A]
        text-slate-100
        font-sans
        selection:bg-crimson
        selection:text-white
      "
      style={{
        '--page-progress': scrollProgress,
      }}
    >
      {/* NAVBAR */}
      <Navbar />

      {/* MAIN CONTENT */}
      <main className="relative">

        {/* HERO */}
        <section className="relative z-10">
          <Hero />
        </section>

        {/* HERO → WORK TRANSITION */}
        <div
          className="
            relative
            h-24
            -mt-1
            pointer-events-none
            overflow-hidden
            bg-[#0A0A0A]
          "
        >
          <div
            className="
              absolute
              left-1/2
              top-0
              -translate-x-1/2
              w-[55vw]
              max-w-[700px]
              h-24
              rounded-full
              bg-[#8f0009]/[0.06]
              blur-[80px]
            "
          />

          <div
            className="
              absolute
              left-1/2
              top-0
              -translate-x-1/2
              w-[18%]
              min-w-[120px]
              max-w-[220px]
              h-px
              bg-gradient-to-r
              from-transparent
              via-[#8f0009]/50
              to-transparent
            "
          />
        </div>

        {/* PROJECTS */}
        <section className="relative z-10">
          <ProjectGallery
            onSelectProject={setSelectedProject}
          />
        </section>

        {/* WORK → ABOUT TRANSITION */}
        <div
          className="
            relative
            h-28
            -mt-1
            pointer-events-none
            overflow-hidden
            bg-[#0A0A0A]
          "
        >
          <div
            className="
              absolute
              left-1/2
              top-1/2
              -translate-x-1/2
              -translate-y-1/2
              w-[65vw]
              max-w-[800px]
              h-28
              rounded-full
              bg-[#8f0009]/[0.045]
              blur-[100px]
            "
          />

          <div
            className="
              absolute
              left-1/2
              top-1/2
              -translate-x-1/2
              w-[24%]
              min-w-[150px]
              max-w-[280px]
              h-px
              bg-gradient-to-r
              from-transparent
              via-[#333]
              to-transparent
            "
          />
        </div>

        {/* ABOUT / PROCESS */}
        <section className="relative z-10">
          <EducationProcess />
        </section>

        {/* ABOUT → CONTACT TRANSITION */}
        <div
          className="
            relative
            h-28
            -mt-1
            pointer-events-none
            overflow-hidden
            bg-[#0A0A0A]
          "
        >
          <div
            className="
              absolute
              left-1/2
              bottom-0
              -translate-x-1/2
              w-[60vw]
              max-w-[760px]
              h-28
              rounded-full
              bg-[#8f0009]/[0.055]
              blur-[100px]
            "
          />

          <div
            className="
              absolute
              left-1/2
              bottom-0
              -translate-x-1/2
              w-[20%]
              min-w-[130px]
              max-w-[240px]
              h-px
              bg-gradient-to-r
              from-transparent
              via-[#8f0009]/40
              to-transparent
            "
          />
        </div>

      </main>

      {/* CONTACT */}
      <section className="relative z-10">
        <ContactFooter />
      </section>

      {/* PROJECT MODAL */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          darkMode={true}
        />
      )}

      {/* GLOBAL SCROLL PROGRESS LINE */}
      <div
        className="
          fixed
          left-0
          bottom-0
          z-[999]
          h-[2px]
          bg-crimson
          shadow-[0_0_12px_rgba(197,5,15,0.45)]
          pointer-events-none
        "
        style={{
          width: `${scrollProgress * 100}%`,
        }}
      />

      {/* GLOBAL SMOOTHNESS */}
      <style>{`
        html {
          scroll-behavior: smooth;
        }

        body {
          background: #0A0A0A;
        }

        ::selection {
          background: #c5050f;
          color: white;
        }

        @media (prefers-reduced-motion: reduce) {
          html {
            scroll-behavior: auto;
          }
        }
      `}</style>
    </div>
  );
}