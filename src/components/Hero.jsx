import React, { useEffect, useRef, useState } from 'react';
import {
  Globe,
  ArrowRight,
  ExternalLink,
  Mail,
  Image as ImageIcon,
  Play,
} from 'lucide-react';
import { profileData } from '../data/portfolioData';

export default function Hero() {
  const [useSolidBanner, setUseSolidBanner] = useState(
    profileData.useSolidBanner ?? false
  );

  const [bannerImgError, setBannerImgError] = useState(false);

  const heroRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (reduceMotion) return;

    let raf = 0;

    let targetX = 0;
    let targetY = 0;

    let currentX = 0;
    let currentY = 0;

    let scrollTarget = 0;
    let currentScroll = 0;

    let fadeTarget = 0;
    let currentFade = 0;

    /*
      ==========================================================
      POINTER PARALLAX
      ==========================================================
    */

    const updatePointer = (event) => {
      const rect = hero.getBoundingClientRect();

      const x =
        (event.clientX - (rect.left + rect.width / 2)) /
        rect.width;

      const y =
        (event.clientY - (rect.top + rect.height / 2)) /
        rect.height;

      targetX = Math.max(-1, Math.min(1, x));
      targetY = Math.max(-1, Math.min(1, y));
    };

    const resetPointer = () => {
      targetX = 0;
      targetY = 0;
    };

    /*
      ==========================================================
      SCROLL PROGRESS
      ==========================================================
    */

    const updateScrollTarget = () => {
      const rect = hero.getBoundingClientRect();

      const viewport = window.innerHeight || 1;

      const rawProgress =
        -rect.top / Math.max(viewport, rect.height);

      scrollTarget = Math.max(
        0,
        Math.min(1, rawProgress)
      );

      const fadeStart = 0.42;
      const fadeEnd = 0.95;

      const fadeProgress =
        (scrollTarget - fadeStart) /
        (fadeEnd - fadeStart);

      fadeTarget = Math.max(
        0,
        Math.min(1, fadeProgress)
      );
    };

    /*
      ==========================================================
      ANIMATION LOOP
      ==========================================================
    */

    const animate = () => {
      currentX +=
        (targetX - currentX) * 0.055;

      currentY +=
        (targetY - currentY) * 0.055;

      currentScroll +=
        (scrollTarget - currentScroll) * 0.075;

      currentFade +=
        (fadeTarget - currentFade) * 0.065;

      hero.style.setProperty(
        '--mx',
        currentX.toFixed(4)
      );

      hero.style.setProperty(
        '--my',
        currentY.toFixed(4)
      );

      hero.style.setProperty(
        '--scroll-progress',
        currentScroll.toFixed(4)
      );

      hero.style.setProperty(
        '--hero-fade',
        currentFade.toFixed(4)
      );

      raf = window.requestAnimationFrame(animate);
    };

    hero.addEventListener(
      'pointermove',
      updatePointer,
      { passive: true }
    );

    hero.addEventListener(
      'pointerleave',
      resetPointer
    );

    window.addEventListener(
      'scroll',
      updateScrollTarget,
      { passive: true }
    );

    window.addEventListener(
      'resize',
      updateScrollTarget,
      { passive: true }
    );

    updateScrollTarget();

    raf = window.requestAnimationFrame(animate);

    return () => {
      hero.removeEventListener(
        'pointermove',
        updatePointer
      );

      hero.removeEventListener(
        'pointerleave',
        resetPointer
      );

      window.removeEventListener(
        'scroll',
        updateScrollTarget
      );

      window.removeEventListener(
        'resize',
        updateScrollTarget
      );

      window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="
        erl-hero
        relative
        bg-[#0A0A0A]
        pt-6
        pb-16
        md:pt-8
        md:pb-20
        overflow-hidden
        border-b
        border-[#1A1A1A]
      "
    >

      {/* =====================================================
          HERO FX
          ===================================================== */}

      <div
        className="erl-light-sweep"
        aria-hidden="true"
      />

      <div
        className="erl-noise"
        aria-hidden="true"
      />


      {/* =====================================================
          BANNER MODE TOGGLE
          ===================================================== */}

      <div
        className="
          max-w-7xl
          mx-auto
          px-6
          sm:px-12
          mb-6
          flex
          justify-end
          relative
          z-30
        "
      >
        <button
          onClick={() =>
            setUseSolidBanner(!useSolidBanner)
          }
          className="
            inline-flex
            items-center
            gap-2.5

            px-4
            py-2

            rounded-full

            bg-[#121212]

            border
            border-[#333333]

            text-[11px]
            font-extrabold
            tracking-wider

            text-slate-200

            hover:text-white
            hover:border-crimson

            transition-all

            shadow-2xl

            backdrop-blur-md

            hover:scale-105
            active:scale-95
          "
          title="Switch between Solid Banner Image mode and Interactive Text Layout mode"
        >
          {useSolidBanner ? (
            <>
              <Play className="w-3.5 h-3.5 text-crimson" />

              <span>
                A SHORT VIDEO INTRODUCTION ABOUT ME
              </span>
            </>
          ) : (
            <>
              <ImageIcon className="w-3.5 h-3.5 text-crimson" />

              <span>
                GET TO KNOW ME
              </span>
            </>
          )}
        </button>
      </div>


      {/* =====================================================
          SOLID BANNER MODE
          ===================================================== */}

      {useSolidBanner ? (

        <div
          className="
            max-w-7xl
            mx-auto
            px-6
            sm:px-12
            relative
            z-20
            space-y-6
          "
        >

          <div
            className="
              relative
              rounded-2xl
              overflow-hidden
              border-2
              border-[#262626]
              bg-[#121212]
              shadow-2xl
              group
            "
          >

            <img
              src={profileData.heroBannerImage}
              alt="Erlan Villania Custom Banner"
              onError={() =>
                setBannerImgError(true)
              }
              className="
                w-full
                h-auto
                max-h-[650px]
                object-cover
              "
            />

            {bannerImgError && (
              <div
                className="
                  p-12
                  text-center
                  space-y-4
                  bg-[#141414]
                  border
                  border-dashed
                  border-[#333]
                "
              >

                <div
                  className="
                    w-12
                    h-12
                    rounded-full
                    bg-crimson/20
                    text-crimson
                    flex
                    items-center
                    justify-center
                    mx-auto
                  "
                >
                  <ImageIcon className="w-6 h-6" />
                </div>

                <h3
                  className="
                    font-display
                    text-xl
                    font-bold
                    text-white
                    uppercase
                  "
                >
                  CUSTOM BANNER IMAGE
                </h3>

                <p
                  className="
                    text-xs
                    text-slate-400
                    max-w-md
                    mx-auto
                  "
                >
                  Save your graphic banner as{' '}
                  <code className="text-crimson font-bold">
                    hero_banner.png
                  </code>{' '}
                  in the{' '}
                  <code className="text-slate-200">
                    public/
                  </code>{' '}
                  folder!
                </p>

              </div>
            )}

          </div>


          {/* =================================================
              SOLID BANNER ACTION BAR
              ================================================= */}

          <div
            className="
              flex
              flex-wrap
              items-center
              justify-between
              gap-4

              p-4

              rounded-xl

              bg-[#121212]

              border
              border-[#222]
            "
          >

            <div
              className="
                flex
                items-center
                gap-3
              "
            >

              <span
                className="
                  font-display
                  text-lg
                  font-bold
                  tracking-wider
                  text-white
                  uppercase
                "
              >
                ERLAN VILLANIA
              </span>

              <span className="text-slate-600">
                |
              </span>

              <span
                className="
                  text-xs
                  font-bold
                  text-crimson
                  tracking-widest
                  uppercase
                "
              >
                WEB DESIGNER / DIGITAL CREATOR
              </span>

            </div>


            <div
              className="
                flex
                flex-wrap
                items-center
                gap-3
              "
            >

              <a
                href="#work"
                className="
                  px-5
                  py-2.5

                  rounded-xl

                  bg-crimson
                  hover:bg-crimson-dark

                  text-white

                  font-extrabold
                  text-xs
                  tracking-widest
                  uppercase

                  transition-all

                  flex
                  items-center
                  gap-2
                "
              >
                <span>
                  EXPLORE WORK
                </span>

                <ArrowRight className="w-4 h-4" />
              </a>


              <a
                href="#contact"
                className="
                  px-5
                  py-2.5

                  rounded-xl

                  bg-[#1A1A1A]
                  hover:bg-[#252525]

                  border
                  border-[#333]

                  text-slate-200

                  font-extrabold
                  text-xs
                  tracking-widest
                  uppercase

                  transition-all

                  flex
                  items-center
                  gap-2
                "
              >

                <Mail
                  className="
                    w-3.5
                    h-3.5
                    text-crimson
                  "
                />

                <span>
                  GET IN TOUCH
                </span>

              </a>


              <a
                href={profileData.behanceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  p-2.5

                  rounded-xl

                  bg-[#1A1A1A]
                  hover:bg-[#252525]

                  border
                  border-[#333]

                  text-slate-300

                  hover:text-crimson

                  transition-all
                "
                title="View Behance Profile"
              >
                <ExternalLink className="w-4 h-4" />
              </a>

            </div>

          </div>

        </div>

      ) : (

        /* =====================================================
           INTERACTIVE TEXT LAYOUT
           ===================================================== */

        <>

          {/* =================================================
              GIANT PORTFOLIO
              ================================================= */}

          <div
            className="
              erl-portfolio
              absolute

              top-[70px]
              sm:top-[10px]

              left-0
              right-0

              w-full

              flex
              justify-center

              pointer-events-none
              select-none

              overflow-hidden

              z-0
            "
          >

            <h1
              style={{
                fontFamily: 'Sigana',
              }}
              className="
                erl-portfolio-text

                font-display
                font-normal

                text-[63vw]
                sm:text-[25vw]

                leading-normal
                tracking-normal

                bg-gradient-to-b
                from-[#c5050f]
                via-[#250002]
                to-[#050505]

                bg-clip-text
                text-transparent

                uppercase

                opacity-90

                whitespace-nowrap
              "
            >
              PORTFOLIO
            </h1>

          </div>


          {/* =================================================
              MAIN HERO GRID
              ================================================= */}

          <div
            className="
              max-w-7xl
              mx-auto
              px-6
              sm:px-12

              relative
              z-10
            "
          >

            <div
              className="
                grid
                grid-cols-1
                lg:grid-cols-12

                gap-8

                items-center

                pt-2
                md:pt-6
              "
            >

              {/* =============================================
                  LEFT COLUMN
                  ============================================= */}

              <div
                className="
                  erl-hero-copy

                  lg:col-span-4

                  space-y-5

                  text-left

                  order-2
                  lg:order-1
                "
              >

                <div
                  className="
                    erl-hero-item
                    erl-delay-1

                    font-script
                    text-3xl
                    sm:text-4xl

                    text-slate-300

                    transform
                    -rotate-3
                  "
                >
                  {profileData.scriptGreeting}
                </div>


                <div
                  className="
                    erl-hero-item
                    erl-delay-2
                  "
                >

                  <h2
                    className="
                      font-display

                      text-6xl
                      sm:text-7xl
                      lg:text-8xl

                      font-extrabold

                      tracking-[0.02em]

                      text-white

                      leading-normal
                      lg:leading-[0.8]

                      uppercase
                    "
                  >
                    {profileData.name}
                  </h2>


                  <p
                    className="
                      font-bold

                      text-sm
                      sm:text-base

                      tracking-widest

                      text-crimson

                      uppercase

                      mt-3
                    "
                  >
                    {profileData.subtitle}
                  </p>

                </div>


                <p
                  className="
                    erl-hero-item
                    erl-delay-3

                    text-xs
                    sm:text-sm

                    text-slate-400

                    leading-relaxed

                    max-w-sm

                    font-normal
                  "
                >
                  {profileData.tagline}
                </p>


                {/* ACTION BUTTONS */}

                <div
                  className="
                    erl-hero-item
                    erl-delay-4

                    pt-2

                    flex
                    flex-wrap

                    items-center

                    gap-3
                  "
                >

                  <a
                    href="#work"
                    className="
                      px-5
                      py-3

                      rounded-xl

                      bg-crimson
                      hover:bg-crimson-dark

                      text-white

                      font-extrabold

                      text-xs

                      tracking-widest

                      uppercase

                      transition-all
                      duration-300

                      shadow-lg
                      shadow-crimson/25

                      hover:shadow-crimson/40

                      hover:-translate-y-0.5

                      flex
                      items-center
                      gap-2
                    "
                  >
                    <span>
                      EXPLORE WORK
                    </span>

                    <ArrowRight className="w-4 h-4" />
                  </a>


                  <a
                    href="#contact"
                    className="
                      px-5
                      py-3

                      rounded-xl

                      bg-[#181818]
                      hover:bg-[#222222]

                      border
                      border-[#333333]

                      text-slate-200

                      font-extrabold

                      text-xs

                      tracking-widest

                      uppercase

                      transition-all
                      duration-300

                      hover:-translate-y-0.5

                      flex
                      items-center
                      gap-2
                    "
                  >

                    <Mail
                      className="
                        w-3.5
                        h-3.5
                        text-crimson
                      "
                    />

                    <span>
                      GET IN TOUCH
                    </span>

                  </a>


                  <a
                    href={profileData.behanceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      p-3

                      rounded-xl

                      bg-[#181818]
                      hover:bg-[#222222]

                      border
                      border-[#333333]

                      text-slate-300

                      hover:text-crimson

                      transition-all
                    "
                    title="View Behance Profile"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>

                </div>


                {/* LOCATION */}

                <div
                  className="
                    erl-hero-item
                    erl-delay-5

                    pt-1
                  "
                >

                  <a
                    href="#contact"
                    className="
                      inline-flex

                      items-center
                      gap-2

                      px-3.5
                      py-1.5

                      rounded-full

                      bg-[#141414]

                      border
                      border-[#262626]

                      text-xs

                      font-bold

                      text-slate-300

                      hover:border-crimson
                      hover:text-white

                      transition-colors
                    "
                  >

                    <Globe
                      className="
                        w-3.5
                        h-3.5
                        text-crimson
                      "
                    />

                    <span
                      className="
                        tracking-wider
                      "
                    >
                      {profileData.location}
                    </span>

                  </a>

                </div>

              </div>


              {/* =============================================
                  CENTER PORTRAIT
                  ============================================= */}

              <div
                className="
                  erl-portrait-wrap

                  lg:col-span-5

                  flex
                  justify-center

                  order-1
                  lg:order-2

                  relative
                "
              >

                <div
                  className="
                    relative

                    w-full

                    max-w-md
                  "
                >

                  {/* AMBIENT GLOW */}

                  <div
                    className="
                      erl-ambient

                      absolute
                      inset-0

                      bg-[#170405]/30

                      rounded-full

                      blur-[100px]

                      pointer-events-none
                    "
                  />


                  {/* PORTRAIT */}

                  <div
                    className="
                      erl-portrait

                      relative

                      flex
                      justify-center
                      items-center

                      bg-transparent

                      p-0

                      border-0

                      shadow-none
                    "
                  >

                    <img
                      src={profileData.avatar}
                      alt={profileData.name}
                      className="
                        w-full

                        h-[440px]
                        sm:h-[490px]

                        object-contain
                        object-center

                        filter
                        drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)]

                        hover:scale-105

                        transition-transform
                        duration-700

                        bg-transparent
                      "
                    />

                  </div>


                  {/* FLOATING BADGE */}

                  <a
                    href="#work"
                    className="
                      erl-badge
                      erl-glass-card

                      absolute

                      bottom-6
                      -right-4
                      sm:-right-8

                      max-w-[210px]

                      p-3.5

                      rounded-xl

                      flex
                      items-start
                      gap-2.5

                      transition-all

                      group
                      hover:-translate-y-1

                      z-20
                    "
                  >

                    <div
                      className="
                        erl-badge-icon

                        w-6
                        h-6

                        rounded-full

                        flex
                        items-center
                        justify-center

                        shrink-0

                        mt-0.5

                        transition-colors
                      "
                    >
                      <span className="text-xs font-bold">
                        ✦
                      </span>
                    </div>


                    <p
                      className="
                        text-[11px]

                        text-slate-300

                        group-hover:text-white

                        leading-tight

                        font-medium

                        transition-colors
                      "
                    >
                      {profileData.floatingBadge}
                    </p>

                  </a>

                </div>

              </div>


              {/* =============================================
                  RIGHT STATS
                  ============================================= */}

              <div
                className="
                  lg:col-span-3

                  space-y-6

                  order-3

                  flex
                  flex-col
                  justify-center

                  lg:items-end

                  text-left
                  lg:text-right
                "
              >

                <div
                  className="
                    erl-stats
                    erl-glass-panel

                    space-y-6

                    p-6

                    rounded-2xl

                    w-full

                    max-w-xs
                  "
                >

                  {profileData.stats.map(
                    (stat, idx) => (
                      <div
                        key={idx}
                        className="
                          erl-stat-row

                          border-b
                          border-white/[0.07]

                          last:border-0

                          pb-4
                          last:pb-0
                        "
                      >

                        <div
                          className="
                            font-display

                            text-4xl
                            sm:text-5xl

                            font-extrabold

                            text-white

                            tracking-tight

                            erl-stat-value
                          "
                        >
                          {stat.value}
                        </div>

                        <div
                          className="
                            text-[10px]

                            font-extrabold

                            tracking-widest

                            text-slate-400

                            uppercase

                            mt-0.5
                          "
                        >
                          {stat.label}
                        </div>

                      </div>
                    )
                  )}

                </div>

              </div>

            </div>

          </div>

        </>

      )}


      {/* =====================================================
          HERO STYLES
          ===================================================== */}

      <style>{`

        .erl-hero {
          --mx: 0;
          --my: 0;
          --scroll-progress: 0;
          --hero-fade: 0;

          isolation: isolate;
        }


        /* ======================================================
           MAIN ATMOSPHERE
           ====================================================== */

        .erl-hero::before {
          content: "";

          position: absolute;

          inset: 0;

          pointer-events: none;

          background:
            radial-gradient(
              circle at
              calc(50% + (var(--mx) * 12%))
              calc(38% + (var(--my) * 10%)),

              rgba(197, 5, 15, 0.10),

              transparent 32%
            ),

            radial-gradient(
              circle at 80% 20%,

              rgba(197, 5, 15, 0.045),

              transparent 28%
            );

          opacity:
            calc(0.9 - (var(--hero-fade) * 0.65));

          z-index: -1;

          transition:
            opacity 700ms ease;
        }


        /* ======================================================
           HERO EXIT FADE
           ====================================================== */

        .erl-hero > .max-w-7xl {
          transition:
            opacity 900ms cubic-bezier(.22,1,.36,1);

          opacity:
            calc(1 - (var(--hero-fade) * 0.35));
        }


        /* ======================================================
           LIGHT SWEEP
           ====================================================== */

        .erl-light-sweep {
          position: absolute;

          top: -20%;
          left: -35%;

          width: 26%;
          height: 145%;

          pointer-events: none;

          z-index: 1;

          opacity: 0;

          transform: rotate(18deg);

          background:
            linear-gradient(
              90deg,
              transparent 0%,
              rgba(255,255,255,.025) 38%,
              rgba(197,5,15,.12) 50%,
              rgba(255,255,255,.025) 62%,
              transparent 100%
            );

          filter: blur(16px);

          animation:
            erl-light-sweep
            4.8s
            cubic-bezier(.22,.61,.36,1)
            1.1s
            1;
        }


        /* ======================================================
           NOISE
           ====================================================== */

        .erl-noise {
          position: absolute;

          inset: 0;

          pointer-events: none;

          z-index: 2;

          opacity: 0.035;

          background-image:
            radial-gradient(
              rgba(255,255,255,.8) .5px,
              transparent .5px
            );

          background-size: 5px 5px;

          mix-blend-mode: soft-light;

          transition:
            opacity 700ms ease;
        }


        /* ======================================================
           PORTFOLIO BACKGROUND
           ====================================================== */

        .erl-portfolio {
          transform:
            translate3d(
              calc(var(--mx) * -10px),
              calc(
                var(--my) * -6px +
                var(--scroll-progress) * -42px
              ),
              0
            )

            scale(
              calc(
                1 +
                var(--scroll-progress) * 0.045
              )
            );

          transition:
            transform 180ms ease-out;

          animation:
            erl-portfolio-in
            1.25s
            cubic-bezier(.16,1,.3,1)
            both;

          opacity:
            calc(
              1 -
              (var(--hero-fade) * 0.22)
            );
        }


        .erl-portfolio-text {
          animation:
            erl-portfolio-glow
            7s
            ease-in-out
            1.5s
            infinite;

          background-size:
            120% 160%;

          background-position:
            50% 0%;
        }


        /* ======================================================
           LEFT COPY
           ====================================================== */

        .erl-hero-copy {
          transform:
            translate3d(
              calc(var(--mx) * -2px),
              calc(
                var(--my) * -2px +
                var(--scroll-progress) * -30px
              ),
              0
            );

          transition:
            transform 180ms ease-out;

          opacity:
            calc(
              1 -
              (var(--hero-fade) * 0.72)
            );
        }


        /* ======================================================
           ENTRANCE ITEMS
           ====================================================== */

        .erl-hero-item {
          opacity: 0;

          transform:
            translate3d(
              0,
              24px,
              0
            );

          animation:
            erl-enter
            .8s
            cubic-bezier(.16,1,.3,1)
            forwards;
        }


        .erl-delay-1 {
          animation-delay: .16s;
        }

        .erl-delay-2 {
          animation-delay: .28s;
        }

        .erl-delay-3 {
          animation-delay: .40s;
        }

        .erl-delay-4 {
          animation-delay: .52s;
        }

        .erl-delay-5 {
          animation-delay: .64s;
        }


        /* ======================================================
           PORTRAIT
           ====================================================== */

        .erl-portrait-wrap {
          transform:
            translate3d(
              calc(var(--mx) * 10px),
              calc(
                var(--my) * 8px +
                var(--scroll-progress) * -50px
              ),
              0
            );

          transition:
            transform 180ms ease-out;

          animation:
            erl-portrait-in
            1.05s
            cubic-bezier(.16,1,.3,1)
            .24s
            both;

          opacity:
            calc(
              1 -
              (var(--hero-fade) * 0.62)
            );
        }


        .erl-portrait-wrap::after {
          content: "";

          position: absolute;

          width: 42%;
          height: 75%;

          right: 12%;
          top: 12%;

          pointer-events: none;

          border-radius: 50%;

          background:
            linear-gradient(
              105deg,
              transparent 25%,
              rgba(197,5,15,.20) 48%,
              transparent 70%
            );

          filter: blur(20px);

          opacity: .35;

          transform:
            translateX(-18%)
            rotate(8deg);

          animation:
            erl-rim-light
            5.5s
            ease-in-out
            2s
            infinite;
        }


        .erl-portrait {
          animation:
            erl-float
            5.5s
            ease-in-out
            1.5s
            infinite;
        }


        .erl-portrait img {
          transition:
            filter 700ms ease,
            transform 700ms cubic-bezier(.16,1,.3,1);
        }


        .erl-portrait:hover img {
          transform:
            scale(1.035);

          filter:
            drop-shadow(
              0 24px 42px rgba(0,0,0,.82)
            )
            saturate(1.04);
        }


        /* ======================================================
           AMBIENT GLOW
           ====================================================== */

        .erl-ambient {
          transform:
            translate3d(
              calc(var(--mx) * -7px),
              calc(
                var(--my) * -5px +
                var(--scroll-progress) * -18px
              ),
              0
            )
            scale(1.08);

          animation:
            erl-ambient
            6s
            ease-in-out
            infinite;

          opacity:
            calc(
              .75 -
              (var(--hero-fade) * .35)
            );
        }


        /* ======================================================
           GLASS
           ====================================================== */

        .erl-glass-panel,
        .erl-glass-card {
          position: relative;

          overflow: hidden;

          isolation: isolate;

          background:
            linear-gradient(
              135deg,
              rgba(255,255,255,.055),
              rgba(255,255,255,.018) 42%,
              rgba(197,5,15,.035) 100%
            ),

            rgba(12,12,12,.58);

          border:
            1px solid
            rgba(255,255,255,.095);

          box-shadow:
            inset
            0 1px 0
            rgba(255,255,255,.075),

            inset
            0 -1px 0
            rgba(255,255,255,.025),

            0 24px 70px
            rgba(0,0,0,.32),

            0 0 45px
            rgba(197,5,15,.035);

          backdrop-filter:
            blur(22px)
            saturate(125%);

          -webkit-backdrop-filter:
            blur(22px)
            saturate(125%);
        }


        .erl-glass-panel::before,
        .erl-glass-card::before {
          content: "";

          position: absolute;

          inset: 0;

          pointer-events: none;

          z-index: -1;

          background:
            radial-gradient(
              circle at 85% 0%,
              rgba(197,5,15,.13),
              transparent 34%
            ),

            linear-gradient(
              115deg,
              rgba(255,255,255,.045),
              transparent 24%,
              transparent 72%,
              rgba(197,5,15,.035)
            );
        }


        .erl-glass-panel::after,
        .erl-glass-card::after {
          content: "";

          position: absolute;

          top: 0;
          left: -65%;

          width: 42%;
          height: 100%;

          pointer-events: none;

          transform:
            skewX(-18deg);

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(255,255,255,.07),
              transparent
            );

          opacity: .45;

          transition:
            left 900ms cubic-bezier(.16,1,.3,1),
            opacity 400ms ease;
        }


        .erl-glass-panel:hover::after,
        .erl-glass-card:hover::after {
          left: 125%;

          opacity: .8;
        }


        /* ======================================================
           BADGE
           ====================================================== */

        .erl-badge-icon {
          background:
            rgba(197,5,15,.13);

          color:
            #e50914;

          box-shadow:
            inset
            0 1px 0
            rgba(255,255,255,.08),

            0 0 18px
            rgba(197,5,15,.08);
        }


        .erl-badge:hover .erl-badge-icon {
          background:
            #c5050f;

          color:
            white;

          box-shadow:
            0 0 22px
            rgba(197,5,15,.28);
        }


        /* ======================================================
           BADGE PARALLAX
           ====================================================== */

        .erl-badge {
          transform:
            translate3d(
              calc(var(--mx) * 7px),
              calc(
                var(--my) * 5px +
                var(--scroll-progress) * -40px
              ),
              0
            );

          transition:
            transform 180ms ease-out,
            border-color 300ms ease,
            background-color 300ms ease;

          animation:
            erl-badge-in
            .8s
            cubic-bezier(.16,1,.3,1)
            .72s
            both;

          opacity:
            calc(
              1 -
              (var(--hero-fade) * .55)
            );
        }


        /* ======================================================
           STATS
           ====================================================== */

        .erl-stats {
          transform:
            translate3d(
              calc(var(--mx) * 5px),
              calc(
                var(--my) * 3px +
                var(--scroll-progress) * -34px
              ),
              0
            );

          transition:
            transform 180ms ease-out;

          animation:
            erl-stats-in
            .9s
            cubic-bezier(.16,1,.3,1)
            .38s
            both;

          opacity:
            calc(
              1 -
              (var(--hero-fade) * .65)
            );
        }


        .erl-stats > div > div:first-child {
          animation:
            erl-stat-shimmer
            4.5s
            ease-in-out
            2.2s
            infinite;
        }


        /* ======================================================
           STAT ROW
           ====================================================== */

        .erl-stat-row {
          position: relative;
        }


        .erl-stat-row::after {
          content: "";

          position: absolute;

          left: 0;
          bottom: -1px;

          width: 22%;
          height: 1px;

          background:
            linear-gradient(
              90deg,
              rgba(197,5,15,.65),
              transparent
            );

          opacity: .5;
        }


        .erl-stat-value {
          text-shadow:
            0 0 28px
            rgba(255,255,255,.055);
        }


        /* ======================================================
           ANIMATIONS
           ====================================================== */

        @keyframes erl-enter {

          from {
            opacity: 0;

            transform:
              translate3d(
                0,
                24px,
                0
              );

            filter:
              blur(8px);
          }

          to {
            opacity: 1;

            transform:
              translate3d(
                0,
                0,
                0
              );

            filter:
              blur(0);
          }

        }


        @keyframes erl-portfolio-in {

          from {
            opacity: 0;

            transform:
              translate3d(
                0,
                28px,
                0
              )
              scale(1.035);

            filter:
              blur(10px);
          }

          to {
            opacity: .9;

            transform:
              translate3d(
                0,
                0,
                0
              )
              scale(1);

            filter:
              blur(0);
          }

        }


        @keyframes erl-portrait-in {

          from {
            opacity: 0;

            transform:
              translate3d(
                0,
                32px,
                0
              )
              scale(.94);

            filter:
              blur(10px);
          }

          to {
            opacity: 1;

            transform:
              translate3d(
                0,
                0,
                0
              )
              scale(1);

            filter:
              blur(0);
          }

        }


        @keyframes erl-stats-in {

          from {
            opacity: 0;

            transform:
              translate3d(
                38px,
                0,
                0
              );

            filter:
              blur(8px);
          }

          to {
            opacity: 1;

            transform:
              translate3d(
                0,
                0,
                0
              );

            filter:
              blur(0);
          }

        }


        @keyframes erl-badge-in {

          from {
            opacity: 0;

            transform:
              translate3d(
                24px,
                18px,
                0
              )
              scale(.96);

            filter:
              blur(7px);
          }

          to {
            opacity: 1;

            transform:
              translate3d(
                0,
                0,
                0
              )
              scale(1);

            filter:
              blur(0);
          }

        }


        @keyframes erl-float {

          0%,
          100% {
            transform:
              translateY(0);
          }

          50% {
            transform:
              translateY(-8px);
          }

        }


        @keyframes erl-ambient {

          0%,
          100% {
            opacity: .75;

            transform:
              translate3d(
                calc(var(--mx) * -7px),
                calc(var(--my) * -5px + var(--scroll-progress) * -18px),
                0
              )
              scale(1.08);
          }

          50% {
            opacity: 1;

            transform:
              translate3d(
                calc(var(--mx) * -7px),
                calc(var(--my) * -5px + var(--scroll-progress) * -18px),
                0
              )
              scale(1.16);
          }

        }


        @keyframes erl-rim-light {

          0%,
          100% {
            opacity: .12;

            transform:
              translateX(-40%)
              rotate(8deg);
          }

          48% {
            opacity: .42;

            transform:
              translateX(48%)
              rotate(8deg);
          }

          60% {
            opacity: .08;

            transform:
              translateX(75%)
              rotate(8deg);
          }

        }


        @keyframes erl-portfolio-glow {

          0%,
          100% {
            background-position:
              50% 0%;
          }

          50% {
            background-position:
              50% 100%;
          }

        }


        @keyframes erl-stat-shimmer {

          0%,
          82%,
          100% {
            text-shadow: none;
          }

          90% {
            text-shadow:
              0 0 24px
              rgba(255,255,255,.16);
          }

        }


        @keyframes erl-light-sweep {

          0% {
            opacity: 0;

            transform:
              translateX(-30vw)
              rotate(18deg);
          }

          15% {
            opacity: .7;
          }

          55% {
            opacity: .55;
          }

          100% {
            opacity: 0;

            transform:
              translateX(125vw)
              rotate(18deg);
          }

        }


        /* ======================================================
           TABLET
           ====================================================== */

        @media (max-width: 1023px) {

          .erl-portfolio {
            transform:
              translate3d(
                calc(var(--mx) * -5px),
                calc(
                  var(--my) * -4px +
                  var(--scroll-progress) * -24px
                ),
                0
              )

              scale(
                calc(
                  1 +
                  var(--scroll-progress) * 0.025
                )
              );
          }


          .erl-portrait-wrap {
            transform:
              translate3d(
                calc(var(--mx) * 5px),
                calc(
                  var(--my) * 4px +
                  var(--scroll-progress) * -28px
                ),
                0
              );
          }


          .erl-stats {
            transform:
              translate3d(
                calc(var(--mx) * 3px),
                calc(
                  var(--my) * 2px +
                  var(--scroll-progress) * -20px
                ),
                0
              );
          }


          .erl-badge {
            transform:
              translate3d(
                calc(var(--mx) * 3px),
                calc(
                  var(--my) * 3px +
                  var(--scroll-progress) * -22px
                ),
                0
              );
          }

        }


        /* ======================================================
           MOBILE
           ====================================================== */

        @media (max-width: 640px) {

          /*
            ====================================================
            IMPORTANT MOBILE TYPOGRAPHY FIX

            The original .space-y-5 on .erl-hero-copy creates
            too much vertical space between:

            HELLO, I'M
            ERLAN VILLANIA

            We override that spacing ONLY on mobile.
            ====================================================
          */

          .erl-hero-copy {
            gap: 0 !important;
          }


          /*
            Greeting
          */

          .erl-hero-copy > .erl-delay-1 {
            margin-bottom: 0 !important;
          }


          /*
            Name block:
            bring ERLAN VILLANIA closer to HELLO, I'M
          */

          .erl-hero-copy > .erl-delay-2 {
            margin-top: 7px !important;
          }


          /*
            Name itself:
            tighter line box on mobile only
          */

          .erl-hero-copy h2 {
            line-height: 0.9 !important;

            letter-spacing: 0.015em;

            margin: 0;
          }


          /*
            Subtitle:
            slightly closer to name
          */

          .erl-hero-copy h2 + p {
            margin-top: 9px !important;

            line-height: 1.2;
          }


          /*
            Tagline:
            keep some breathing room,
            but don't create another huge gap
          */

          .erl-hero-copy > .erl-delay-3 {
            margin-top: 14px !important;

            line-height: 1.6;
          }


          /*
            Buttons
          */

          .erl-hero-copy > .erl-delay-4 {
            margin-top: 15px !important;
          }


          /*
            Location
          */

          .erl-hero-copy > .erl-delay-5 {
            margin-top: 12px !important;
          }


          /*
            Glass panels
          */

          .erl-glass-panel,
          .erl-glass-card {

            backdrop-filter:
              blur(16px)
              saturate(118%);

            -webkit-backdrop-filter:
              blur(16px)
              saturate(118%);

            box-shadow:
              inset
              0 1px 0
              rgba(255,255,255,.065),

              0 18px 45px
              rgba(0,0,0,.28);
          }


          /*
            Light sweep
          */

          .erl-light-sweep {

            width: 38%;

            filter:
              blur(20px);

            opacity: .55;
          }


          /*
            Noise
          */

          .erl-noise {
            opacity: .022;
          }


          /*
            Portfolio background
          */

          .erl-portfolio {
            top: 105px;

            transform:
              translate3d(
                calc(var(--mx) * -2px),
                calc(
                  var(--my) * -2px +
                  var(--scroll-progress) * -14px
                ),
                0
              )

              scale(
                calc(
                  1 +
                  var(--scroll-progress) * 0.012
                )
              );

            transition:
              transform 220ms ease-out;
          }


          .erl-portfolio-text {

            font-size: 65vw;

            letter-spacing: -0.010em;

            opacity: .72;

            animation-duration:
              8s;
          }


          /*
            Hero copy parallax
          */

          .erl-hero-copy {
            transform:
              translate3d(
                calc(var(--mx) * -1px),
                calc(
                  var(--my) * -1px +
                  var(--scroll-progress) * -12px
                ),
                0
              );

            transition:
              transform 220ms ease-out;
          }


          /*
            Main name size
          */

          .erl-hero-copy h2 {
            font-size:
              clamp(
                3.4rem,
                15vw,
                5rem
              );
          }


          /*
            Portrait
          */

          .erl-portrait-wrap {
            transform:
              translate3d(
                calc(var(--mx) * 2px),
                calc(
                  var(--my) * 2px +
                  var(--scroll-progress) * -18px
                ),
                0
              );

            transition:
              transform 220ms ease-out;
          }


          .erl-portrait {
            animation-duration:
              7s;
          }


          .erl-portrait img {
            height: 360px;

            max-height: 58vh;

            object-fit: contain;

            transform:
              translateZ(0);
          }


          /*
            Ambient glow
          */

          .erl-ambient {
            transform:
              translate3d(
                calc(var(--mx) * -2px),
                calc(
                  var(--my) * -2px +
                  var(--scroll-progress) * -8px
                ),
                0
              )
              scale(1.02);

            animation:
              erl-ambient-mobile
              7s
              ease-in-out
              infinite;

            opacity:
              calc(
                .55 -
                (var(--hero-fade) * .25)
              );
          }


          .erl-portrait-wrap::after {

            width: 38%;

            height: 62%;

            right: 10%;

            top: 16%;

            opacity: .14;

            filter:
              blur(18px);
          }


          /*
            Floating badge
          */

          .erl-badge {

            right: 2px;

            bottom: 12px;

            max-width: 185px;

            padding: 11px;

            transform:
              translate3d(
                calc(var(--mx) * 2px),
                calc(
                  var(--my) * 2px +
                  var(--scroll-progress) * -12px
                ),
                0
              );

            transition:
              transform 220ms ease-out,
              border-color 300ms ease,
              background-color 300ms ease;
          }


          .erl-badge p {
            font-size: 10px;
          }


          /*
            Stats
          */

          .erl-stats {

            width: 100%;

            max-width: none;

            padding: 18px;

            transform:
              translate3d(
                calc(var(--mx) * 1px),
                calc(
                  var(--my) * 1px +
                  var(--scroll-progress) * -10px
                ),
                0
              );

            transition:
              transform 220ms ease-out;
          }


          .erl-stat-row {
            padding-bottom: 12px;
          }


          .erl-stat-value {
            font-size: 2.5rem;
          }


          /*
            Mobile glass
          */

          .erl-glass-panel,
          .erl-glass-card {

            backdrop-filter:
              blur(16px)
              saturate(118%);

            -webkit-backdrop-filter:
              blur(16px)
              saturate(118%);

            box-shadow:
              inset
              0 1px 0
              rgba(255,255,255,.065),

              0 18px 45px
              rgba(0,0,0,.28);
          }


          /*
            Mobile sweep
          */

          .erl-light-sweep {
            width: 38%;

            filter:
              blur(20px);

            opacity: .55;
          }


          .erl-noise {
            opacity: .018;
          }


          /*
            Remove hover behavior that isn't useful
            on touch devices
          */

          .erl-portrait img:hover {

            transform: none;

            filter:
              drop-shadow(
                0 20px 35px rgba(0,0,0,.8)
              );
          }


          .erl-glass-panel:hover::after,
          .erl-glass-card:hover::after {

            left: -65%;
          }


          /*
            Mobile ambient animation
          */

          @keyframes erl-ambient-mobile {

            0%,
            100% {

              opacity: .55;

              transform:
                translate3d(
                  calc(var(--mx) * -2px),
                  calc(
                    var(--my) * -2px +
                    var(--scroll-progress) * -8px
                  ),
                  0
                )
                scale(1.02);
            }


            50% {

              opacity: .72;

              transform:
                translate3d(
                  calc(var(--mx) * -2px),
                  calc(
                    var(--my) * -2px +
                    var(--scroll-progress) * -8px
                  ),
                  0
                )
                scale(1.07);
            }

          }

        }


        /* ======================================================
           REDUCED MOTION
           ====================================================== */

        @media (prefers-reduced-motion: reduce) {

          .erl-light-sweep,
          .erl-portfolio-text,
          .erl-hero-item,
          .erl-portrait-wrap,
          .erl-portrait,
          .erl-ambient,
          .erl-badge,
          .erl-stats {

            animation:
              none !important;
          }


          .erl-hero-item {

            opacity: 1;

            transform:
              none;

            filter:
              none;
          }


          .erl-portfolio,
          .erl-hero-copy,
          .erl-portrait-wrap,
          .erl-badge,
          .erl-stats,
          .erl-ambient {

            transform:
              none !important;
          }

        }

      `}</style>

    </section>
  );
}