import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Maximize2 } from 'lucide-react';
import { profileData } from '../data/portfolioData';

function ProjectCard({ project, index, onSelectProject }) {
  const cardRef = useRef(null);

  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(false);
  const [parallax, setParallax] = useState(0);
  const [imageScale, setImageScale] = useState(1.02);

  /* =========================================
     INITIAL SCROLL REVEAL
     ========================================= */

  useEffect(() => {
    const element = cardRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -8% 0px',
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  /* =========================================
     SCROLL / PARALLAX / ACTIVE PROJECT
     ========================================= */

  useEffect(() => {
    let ticking = false;

    const updateScroll = () => {
      const element = cardRef.current;

      if (!element) {
        ticking = false;
        return;
      }

      const rect = element.getBoundingClientRect();

      const viewportCenter =
        window.innerHeight / 2;

      const elementCenter =
        rect.top + rect.height / 2;

      const distance =
        elementCenter - viewportCenter;

      /* =========================================
         MOBILE
         ========================================= */

      if (window.innerWidth < 768) {
        const mobileMovement = Math.max(
          -5,
          Math.min(5, distance * -0.008)
        );

        /*
         * ACTIVE PROJECT
         *
         * Project becomes active when its center
         * gets close to the center of the screen.
         */

        const activeRange =
          window.innerHeight * 0.18;

        const isActive =
          Math.abs(distance) < activeRange;

        setActive(isActive);

        setParallax(mobileMovement);

        /*
         * Slight scale increase when active.
         *
         * Normal:
         * 1.015
         *
         * Active:
         * 1.025
         */

        setImageScale(
          isActive ? 1.025 : 1.015
        );

        ticking = false;
        return;
      }

      /* =========================================
         DESKTOP
         ========================================= */

      setActive(false);

      const movement = Math.max(
        -18,
        Math.min(18, distance * -0.032)
      );

      const normalizedDistance =
        Math.min(
          Math.abs(distance) /
            window.innerHeight,
          1
        );

      const scale =
        1.045 -
        normalizedDistance * 0.025;

      setParallax(movement);
      setImageScale(scale);

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(
          updateScroll
        );

        ticking = true;
      }
    };

    updateScroll();

    window.addEventListener(
      'scroll',
      handleScroll,
      { passive: true }
    );

    window.addEventListener(
      'resize',
      handleScroll
    );

    return () => {
      window.removeEventListener(
        'scroll',
        handleScroll
      );

      window.removeEventListener(
        'resize',
        handleScroll
      );
    };
  }, []);

  return (
    <div
      ref={cardRef}
      onClick={() =>
        onSelectProject &&
        onSelectProject(project)
      }
      className={`
        group
        cursor-pointer
        space-y-4

        transition-all
        duration-[900ms]
        ease-[cubic-bezier(0.22,1,0.36,1)]

        ${
          visible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-16'
        }

        ${active ? 'project-card-active' : ''}

        project-card
      `}
      style={{
        transitionDelay: `${index * 120}ms`,
      }}
    >
      {/* =========================================
          IMAGE
          ========================================= */}

      <div
        className={`
          relative

          aspect-[16/11]
          md:aspect-[4/3]

          rounded-xl
          overflow-hidden

          bg-[#161616]

          border
          border-[#262626]

          group-hover:border-[#5f1015]

          transition-all
          duration-700

          shadow-lg

          group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.35)]

          project-image-frame

          ${
            active
              ? 'project-image-frame-active'
              : ''
          }
        `}
        style={{
          transform:
            `translateY(${parallax}px)`,
        }}
      >
        {/* =========================================
            THUMBNAIL IMAGE
            ========================================= */}

        <img
          src={project.coverImage}
          alt={project.title}
          onError={(e) => {
            if (
              e.target.src.endsWith('.jpg')
            ) {
              e.target.src =
                project.coverImage.replace(
                  '.jpg',
                  '.png'
                );
            }
          }}
          className={`
            absolute
            inset-0

            w-full
            h-full

            object-cover
            object-center

            opacity-90

            group-hover:opacity-100

            transition-all

            duration-[1100ms]

            ease-[cubic-bezier(0.22,1,0.36,1)]

            ${
              active
                ? 'project-card-image-active'
                : ''
            }
          `}
          style={{
            transform:
              `scale(${imageScale})`,
          }}
        />

        {/* =========================================
            DARK GRADIENT
            ========================================= */}

        <div
          className="
            absolute
            inset-0

            bg-gradient-to-t
            from-black/70
            via-black/10
            to-transparent

            opacity-70

            group-hover:opacity-90

            transition-opacity
            duration-700

            pointer-events-none
          "
        />

        {/* =========================================
            ACTIVE PROJECT AMBIENT GLOW
            ========================================= */}

        <div
          className={`
            absolute
            inset-0

            bg-gradient-to-br
            from-[#8f0009]/[0.10]
            via-transparent
            to-[#8f0009]/[0.06]

            pointer-events-none

            transition-opacity
            duration-700

            ${
              active
                ? 'opacity-100'
                : 'opacity-0'
            }
          `}
        />

        {/* =========================================
            AMBIENT HIGHLIGHT
            ========================================= */}

        <div
          className="
            absolute

            -top-[40%]
            left-1/2
            -translate-x-1/2

            w-[70%]
            h-[70%]

            rounded-full

            bg-white/[0.025]

            blur-[80px]

            pointer-events-none

            opacity-0

            group-hover:opacity-100

            transition-opacity
            duration-1000
          "
        />

        {/* =========================================
            LIGHT SWEEP
            ========================================= */}

        <div
          className="
            absolute

            inset-y-0
            -left-[70%]

            w-[45%]

            skew-x-[-18deg]

            bg-gradient-to-r
            from-transparent
            via-white/10
            to-transparent

            opacity-0

            group-hover:left-[125%]
            group-hover:opacity-100

            transition-all
            duration-[1100ms]

            ease-out

            pointer-events-none
          "
        />

        {/* =========================================
            DESKTOP HOVER OVERLAY
            ========================================= */}

        <div
          className="
            absolute
            inset-0

            bg-black/30

            opacity-0

            group-hover:opacity-100

            transition-opacity
            duration-500

            flex
            items-center
            justify-center

            project-hover-overlay
          "
        >
          <div
            className="
              px-4
              py-2.5

              rounded-xl

              bg-crimson
              text-white

              text-xs
              font-bold

              flex
              items-center
              gap-2

              shadow-[0_10px_30px_rgba(0,0,0,0.4)]

              translate-y-4
              scale-95
              opacity-0

              group-hover:translate-y-0
              group-hover:scale-100
              group-hover:opacity-100

              transition-all
              duration-500
            "
          >
            <Maximize2 className="w-3.5 h-3.5" />

            <span>
              VIEW DESIGN
            </span>
          </div>
        </div>

        {/* =========================================
            PROJECT NUMBER OVER IMAGE
            ========================================= */}

        <div
          className="
            absolute

            top-4
            left-4

            text-white/70

            text-[10px]

            font-extrabold

            tracking-[0.25em]

            uppercase

            opacity-0

            -translate-y-2

            group-hover:opacity-100
            group-hover:translate-y-0

            transition-all
            duration-500

            project-number-overlay
          "
        >
          PROJECT {project.number}
        </div>
      </div>

      {/* =========================================
          PROJECT INFO
          ========================================= */}

      <div
        className={`
          flex
          items-start
          justify-between

          pt-1

          transition-all
          duration-700

          project-meta

          ${
            active
              ? 'project-meta-active'
              : ''
          }
        `}
        style={{
          transform:
            `translateY(${parallax * -0.28}px) scale(${active ? 1.01 : 1})`,
        }}
      >
        <div
          className="
            flex
            items-start

            gap-3

            min-w-0
          "
        >
          {/* PROJECT NUMBER */}

          <span
            className={`
              font-display

              text-2xl

              font-extrabold

              text-crimson

              leading-none

              transition-all
              duration-500

              group-hover:-translate-y-1

              shrink-0

              ${
                active
                  ? 'project-number-active'
                  : ''
              }
            `}
          >
            {project.number}
          </span>

          <div className="min-w-0">
            {/* TITLE */}

            <h3
              className={`
                font-display

                text-xl

                font-bold

                tracking-wider

                text-white

                uppercase

                transition-all
                duration-700

                group-hover:text-crimson
                group-hover:translate-x-1

                leading-none

                break-words

                ${
                  active
                    ? 'project-title-active'
                    : ''
                }
              `}
            >
              {project.title}
            </h3>

            {/* CATEGORY */}

            <p
              className={`
                text-[11px]

                font-extrabold

                tracking-widest

                text-slate-400

                uppercase

                mt-1

                transition-all
                duration-500

                group-hover:text-slate-300

                ${
                  active
                    ? 'project-category-active'
                    : ''
                }
              `}
            >
              {project.category}
            </p>
          </div>
        </div>

        {/* =========================================
            VIEW BUTTON
            ========================================= */}

        <button
          onClick={(e) => {
            e.stopPropagation();

            if (onSelectProject) {
              onSelectProject(project);
            }
          }}
          className="
            p-2

            rounded-lg

            bg-[#141414]

            border
            border-[#262626]

            text-slate-400

            group-hover:text-white
            group-hover:bg-crimson
            group-hover:border-crimson
            group-hover:-translate-x-1

            transition-all
            duration-500

            shrink-0

            ml-3
          "
          title="View Details"
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default function ProjectGallery({
  onSelectProject,
}) {
  const [headerVisible, setHeaderVisible] =
    useState(false);

  const headerRef = useRef(null);

  /* =========================================
     HEADER REVEAL
     ========================================= */

  useEffect(() => {
    const element =
      headerRef.current;

    if (!element) return;

    const observer =
      new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setHeaderVisible(true);
            observer.unobserve(element);
          }
        },
        {
          threshold: 0.2,
        }
      );

    observer.observe(element);

    return () =>
      observer.disconnect();
  }, []);

  return (
    <section
      id="work"
      className="
        relative

        bg-[#0A0A0A]

        py-20
        sm:py-20

        border-b
        border-[#1A1A1A]

        overflow-hidden

        project-gallery
      "
    >
      {/* =========================================
          AMBIENT GLOW
          ========================================= */}

      <div
        className="
          absolute

          top-[15%]
          left-[-15%]

          w-[420px]
          h-[420px]

          rounded-full

          bg-[#8f0009]/[0.07]

          blur-[140px]

          pointer-events-none
        "
      />

      <div
        className="
          absolute

          bottom-[5%]
          right-[-10%]

          w-[360px]
          h-[360px]

          rounded-full

          bg-[#8f0009]/[0.05]

          blur-[130px]

          pointer-events-none
        "
      />

      {/* =========================================
          MAIN CONTAINER
          ========================================= */}

      <div
        className="
          relative

          max-w-7xl

          mx-auto

          px-6
          sm:px-12
        "
      >
        {/* =========================================
            HEADER
            ========================================= */}

        <div
          ref={headerRef}
          className={`
            flex

            flex-col
            sm:flex-row

            items-start
            sm:items-center

            justify-between

            gap-6

            pb-6

            mb-12

            border-b
            border-[#222]

            transition-all

            duration-1000

            ease-[cubic-bezier(0.22,1,0.36,1)]

            ${
              headerVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }
          `}
        >
          <div>
            <div
              className="
                flex
                items-center

                gap-3

                mb-2
              "
            >
              <span
                className="
                  block

                  w-8
                  h-[2px]

                  bg-crimson
                "
              />

              <span
                className="
                  text-[10px]

                  font-bold

                  tracking-[0.3em]

                  text-crimson

                  uppercase
                "
              >
                Selected Work
              </span>
            </div>

            <h2
              className="
                font-display

                text-2xl
                sm:text-3xl

                font-extrabold

                tracking-widest

                text-white

                uppercase
              "
            >
              SELECTED PROJECTS
            </h2>

            <p
              className="
                text-xs

                text-slate-400

                mt-1

                max-w-[320px]

                leading-relaxed
              "
            >
              Click a project to see the concept,
              design, and creative process.
            </p>
          </div>

          <a
            href={profileData.behanceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex

              items-center

              gap-2

              text-xs

              font-extrabold

              tracking-widest

              text-slate-400

              hover:text-crimson

              transition-all
              duration-300

              uppercase

              py-2
              px-3

              rounded-lg

              hover:bg-[#141414]

              hover:-translate-x-1

              whitespace-nowrap
            "
          >
            <span>
              VIEW ALL ON BEHANCE
            </span>

            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* =========================================
            PROJECT GRID
            ========================================= */}

        <div
          className="
            grid

            grid-cols-1
            md:grid-cols-3

            gap-10
            md:gap-8

            project-grid
          "
        >
          {profileData.selectedProjects.map(
            (project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onSelectProject={
                  onSelectProject
                }
              />
            )
          )}
        </div>

        {/* =========================================
            BOTTOM
            ========================================= */}

        <div
          className={`
            flex

            items-center
            justify-center

            mt-16

            transition-all

            duration-1000

            ${
              headerVisible
                ? 'opacity-100'
                : 'opacity-0'
            }
          `}
        >
          <div
            className="
              flex

              items-center

              gap-3

              text-[9px]

              font-bold

              tracking-[0.35em]

              text-slate-600

              uppercase
            "
          >
            <span
              className="
                w-8
                h-px

                bg-[#292929]
              "
            />

            More Creative Work

            <span
              className="
                w-8
                h-px

                bg-[#292929]
              "
            />
          </div>
        </div>
      </div>

      {/* =========================================
          MOBILE / ACTIVE PROJECT STYLES
          ========================================= */}

      <style>{`

        @media (max-width: 767px) {

          .project-gallery {
            padding-top: 4.5rem;
            padding-bottom: 4.5rem;
          }


          .project-gallery > div.relative {
            padding-left: 1rem;
            padding-right: 1rem;
          }


          .project-gallery .project-grid {
            gap: 2.65rem;
          }


          .project-card {
            width: 100%;
          }


          /* =========================================
             MOBILE THUMBNAILS
             ========================================= */

          .project-image-frame {
            width: 92%;

            margin-left: auto;
            margin-right: auto;

            aspect-ratio: 16 / 12;

            border-radius: 0.85rem;

            box-shadow:
              0 14px 36px
              rgba(0,0,0,.27);

            transition:
              border-color .7s ease,
              box-shadow .7s ease,
              transform .7s
              cubic-bezier(0.22,1,0.36,1);
          }


          /* =========================================
             ACTIVE PROJECT FRAME
             ========================================= */

          .project-image-frame-active {
            border-color: rgba(143, 0, 9, .65);

            box-shadow:
              0 18px 55px
              rgba(143,0,9,.16),
              0 8px 30px
              rgba(0,0,0,.35);
          }


          /* =========================================
             MOBILE IMAGE
             ========================================= */

          .project-card img {
            width: 100%;
            height: 100%;

            object-fit: cover;
            object-position: center;

            opacity: .94;

            transition:
              opacity .7s ease,
              transform 1.1s
              cubic-bezier(0.22,1,0.36,1),
              filter .7s ease;
          }


          /* =========================================
             ACTIVE PROJECT IMAGE
             ========================================= */

          .project-card-image-active {
            opacity: 1;

            filter:
              brightness(1.055)
              saturate(1.04);
          }


          /* =========================================
             ACTIVE PROJECT META
             ========================================= */

          .project-meta-active {
            filter:
              drop-shadow(
                0 4px 14px
                rgba(143,0,9,.08)
              );
          }


          /* =========================================
             ACTIVE PROJECT NUMBER
             ========================================= */

          .project-number-active {
            transform:
              translateY(-1px)
              scale(1.06);

            text-shadow:
              0 0 18px
              rgba(143,0,9,.45);
          }


          /* =========================================
             ACTIVE PROJECT TITLE
             RED GRADIENT + LIGHT EFFECT
             ========================================= */

          .project-title-active {
            background:
              linear-gradient(
                100deg,
                #ffffff 0%,
                #ff6b72 24%,
                #e50914 48%,
                #ff3b44 68%,
                #ffffff 100%
              );

            background-size: 240% auto;

            -webkit-background-clip: text;
            background-clip: text;

            -webkit-text-fill-color: transparent;

            color: transparent;

            animation:
              activeTitleLight
              3.8s
              ease-in-out
              infinite;

            transform:
              translateX(2px)
              scale(1.015);

            filter:
              drop-shadow(
                0 0 7px
                rgba(229,9,20,.25)
              )
              drop-shadow(
                0 0 18px
                rgba(229,9,20,.10)
              );
          }


          /* =========================================
             ACTIVE TITLE LIGHT MOVEMENT
             ========================================= */

          @keyframes activeTitleLight {

            0% {
              background-position:
                100% center;
            }

            50% {
              background-position:
                0% center;
            }

            100% {
              background-position:
                100% center;
            }

          }


          /* =========================================
             ACTIVE PROJECT CATEGORY
             ========================================= */

          .project-category-active {
            color: #d1d5db;
          }


          /* =========================================
             ACTIVE PROJECT SUBTLE GLOW
             ========================================= */

          .project-card-active
          .project-meta {
            filter:
              drop-shadow(
                0 4px 14px
                rgba(143,0,9,.08)
              );
          }


          /* =========================================
             REMOVE DESKTOP HOVER ELEMENTS
             ========================================= */

          .project-hover-overlay {
            display: none;
          }


          .project-number-overlay {
            display: none;
          }


          .project-card .absolute.-top-\\[40\\%\\] {
            display: none;
          }


          .project-card .absolute.inset-y-0 {
            display: none;
          }


          /* =========================================
             PROJECT META
             ========================================= */

          .project-meta {
            width: 92%;

            margin-left: auto;
            margin-right: auto;

            padding-top: .05rem;

            transition:
              transform .7s
              cubic-bezier(0.22,1,0.36,1),
              filter .7s ease;
          }


          .project-meta > div {
            gap: .7rem;
          }


          .project-meta h3 {
            font-size: 1.08rem;

            line-height: 1.08;

            letter-spacing: .055em;
          }


          .project-meta p {
            font-size: 9px;

            line-height: 1.4;

            letter-spacing: .15em;

            margin-top: .28rem;
          }


          .project-meta > div > span {
            font-size: 1.65rem;
          }


          /* =========================================
             MOBILE ARROW
             ========================================= */

          .project-meta button {
            width: 39px;
            height: 39px;

            display: flex;

            align-items: center;
            justify-content: center;

            padding: 0;

            border-radius: .65rem;
          }


          .project-meta button svg {
            width: 15px;
            height: 15px;
          }


          .project-meta > div:first-child {
            min-width: 0;

            flex: 1;
          }


          .project-meta h3,
          .project-meta p {
            overflow-wrap: anywhere;
          }


          /* =========================================
             MOBILE SECTION TITLE
             ========================================= */

          .project-gallery h2 {
            font-size: 1.62rem;

            letter-spacing: .12em;

            line-height: 1.05;
          }


          /* =========================================
             MOBILE INTRO TEXT
             ========================================= */

          .project-gallery p {
            line-height: 1.55;
          }


          .project-gallery .text-xs {
            line-height: 1.6;

            letter-spacing: .01em;
          }


          .project-gallery .text-\\[10px\\] {
            line-height: 1.35;
          }


          .project-gallery .text-\\[11px\\] {
            line-height: 1.4;
          }


          .project-gallery .text-\\[9px\\] {
            line-height: 1.45;
          }


          /* =========================================
             HEADER SPACING
             ========================================= */

          .project-gallery .mb-12 {
            margin-bottom: 2.35rem;
          }


          .project-gallery a {
            align-self: flex-start;
          }


          /* =========================================
             MOBILE HOVER SHADOW
             ========================================= */

          .project-card:hover
          .project-image-frame {
            box-shadow:
              0 14px 36px
              rgba(0,0,0,.27);
          }


          /* =========================================
             KEEP ACTIVE STATE STRONGER THAN HOVER
             ========================================= */

          .project-card-active
          .project-image-frame {
            border-color:
              rgba(143,0,9,.65);

            box-shadow:
              0 18px 55px
              rgba(143,0,9,.16),
              0 8px 30px
              rgba(0,0,0,.35);
          }

        }


        /* =================================================
           EXTRA SMALL PHONES
           ================================================= */

        @media (max-width: 380px) {

          .project-gallery > div.relative {
            padding-left: .9rem;
            padding-right: .9rem;
          }


          .project-gallery .project-grid {
            gap: 2.35rem;
          }


          .project-image-frame {
            width: 90%;

            aspect-ratio: 16 / 12;
          }


          .project-meta {
            width: 90%;
          }


          .project-meta h3 {
            font-size: 1rem;

            line-height: 1.08;
          }


          .project-meta p {
            font-size: 8px;

            line-height: 1.4;
          }


          .project-meta > div > span {
            font-size: 1.5rem;
          }


          .project-meta button {
            width: 36px;
            height: 36px;
          }


          .project-gallery h2 {
            font-size: 1.48rem;

            line-height: 1.05;
          }


          .project-gallery .text-xs {
            line-height: 1.6;
          }


          .project-title-active {
            transform:
              translateX(2px)
              scale(1.01);
          }

        }


        /* =================================================
           REDUCED MOTION
           ================================================= */

        @media (prefers-reduced-motion: reduce) {

          .project-card,
          .project-image-frame,
          .project-card img,
          .project-meta,
          .project-title-active {
            transition: none !important;
            animation: none !important;
          }

        }

      `}</style>
    </section>
  );
}