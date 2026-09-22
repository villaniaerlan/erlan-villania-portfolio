import React, { useEffect, useState } from 'react';
import {
  X,
  ThumbsUp,
  Eye,
  ExternalLink,
  Calendar,
  User,
  Wrench,
  ArrowLeft,
} from 'lucide-react';
import { profileData } from '../data/portfolioData';

export default function ProjectModal({
  project,
  onClose,
  darkMode,
}) {
  const [appreciated, setAppreciated] = useState(false);
  const [visible, setVisible] = useState(false);

  /* =========================================================
     OPEN / CLOSE
     ========================================================= */

  useEffect(() => {
    if (!project) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';

    requestAnimationFrame(() => {
      setVisible(true);
    });

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project]);

  const handleClose = () => {
    setVisible(false);

    setTimeout(() => {
      onClose();
    }, 350);
  };

  if (!project) return null;

  const appreciationsCount =
    (project.appreciations || 0) +
    (appreciated ? 1 : 0);

  const projectImages =
    project.images && project.images.length > 0
      ? project.images
      : project.coverImage
        ? [project.coverImage]
        : [];

  return (
    <div
      className={`
        fixed
        inset-0
        z-[100]

        flex
        items-center
        justify-center

        p-0
        sm:p-4
        md:p-6

        transition-all
        duration-500
        ease-[cubic-bezier(.22,1,.36,1)]

        ${
          visible
            ? 'bg-black/90 backdrop-blur-md'
            : 'bg-black/0 backdrop-blur-0'
        }
      `}
    >

      {/* =====================================================
          BACKDROP
          ===================================================== */}

      <button
        type="button"
        aria-label="Close project modal"
        onClick={handleClose}
        className="
          absolute
          inset-0

          w-full
          h-full

          cursor-default
        "
      />


      {/* =====================================================
          MODAL CONTAINER
          ===================================================== */}

      <div
        className={`
          relative

          z-10

          w-full
          max-w-6xl

          h-[100dvh]
          max-h-[100dvh]

          sm:h-[94vh]
          sm:max-h-[94vh]

          overflow-hidden

          bg-[#080808]
          text-white

          border-0
          sm:border
          sm:border-[#292929]

          sm:rounded-2xl

          shadow-[0_30px_100px_rgba(0,0,0,.65)]

          transition-all
          duration-500

          ease-[cubic-bezier(.22,1,.36,1)]

          ${
            visible
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 translate-y-8 scale-[0.97]'
          }
        `}
      >

        {/* ===================================================
            TOP BAR
            =================================================== */}

        <div
          className="
            relative
            z-50

            flex
            items-center
            justify-between

            shrink-0

            h-[58px]

            px-4
            sm:px-6
            md:px-7

            bg-[#080808]/95

            backdrop-blur-xl

            border-b
            border-[#252525]
          "
        >

          {/* BACK */}

          <button
            type="button"
            onClick={handleClose}
            className="
              group

              flex
              items-center
              gap-2

              text-[9px]
              sm:text-xs

              font-bold
              tracking-widest

              text-slate-400

              hover:text-white

              transition-colors
              duration-300
            "
          >

            <ArrowLeft
              className="
                w-3.5
                h-3.5

                transition-transform
                duration-300

                group-hover:-translate-x-1
              "
            />

            <span>
              BACK
            </span>

          </button>


          {/* CENTER TITLE */}

          <span
            className="
              absolute
              left-1/2

              -translate-x-1/2

              max-w-[42%]

              truncate

              text-[8px]
              sm:text-[10px]

              font-bold

              tracking-[0.22em]

              text-crimson

              uppercase

              text-center
            "
          >
            {project.title}
          </span>


          {/* CLOSE */}

          <button
            type="button"
            onClick={handleClose}
            className="
              group

              p-2

              rounded-lg

              border
              border-[#333]

              text-slate-400

              hover:text-white
              hover:border-crimson
              hover:bg-crimson/10

              transition-all
              duration-300
            "
            title="Close"
          >

            <X
              className="
                w-4
                h-4

                transition-transform
                duration-300

                group-hover:rotate-90
              "
            />

          </button>

        </div>


        {/* ===================================================
            SCROLLABLE CONTENT
            =================================================== */}

        <div
          className="
            relative

            h-[calc(100dvh-58px)]
            sm:h-[calc(94vh-58px)]

            overflow-y-auto
            overflow-x-hidden

            overscroll-contain

            touch-pan-y

            scrollbar-thin
            scrollbar-track-[#0a0a0a]
            scrollbar-thumb-[#292929]

            [-webkit-overflow-scrolling:touch]
          "
        >

          <div
            className="
              w-full

              px-5
              py-6

              sm:px-7
              sm:py-8

              md:px-8
              md:py-9
            "
          >

            {/* =================================================
                PROJECT HEADER
                ================================================= */}

            <div
              className="
                mb-7
                sm:mb-9

                animate-modal-header
              "
            >

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
                    font-display

                    text-2xl

                    font-extrabold

                    text-crimson

                    leading-none
                  "
                >
                  {project.number}
                </span>

                <span
                  className="
                    text-[9px]
                    sm:text-[10px]

                    font-bold

                    tracking-[0.2em]

                    text-slate-500

                    uppercase
                  "
                >
                  {project.category}
                </span>

              </div>


              <h2
                className="
                  font-display

                  text-3xl
                  sm:text-4xl
                  md:text-5xl

                  font-extrabold

                  tracking-tight

                  text-white

                  uppercase

                  leading-[0.95]
                "
              >
                {project.title}
              </h2>


              {/* RED ACCENT */}

              <div
                className="
                  mt-4

                  flex
                  items-center
                  gap-2
                "
              >

                <div
                  className="
                    w-12
                    h-1

                    bg-crimson

                    rounded-full
                  "
                />

                <div
                  className="
                    w-2
                    h-1

                    bg-crimson/30

                    rounded-full
                  "
                />

              </div>

            </div>


            {/* =================================================
                PROJECT IMAGE GALLERY

                IMPORTANT:
                NO BORDER-T BETWEEN IMAGES
                ================================================= */}

            {projectImages.length > 0 ? (

              <div
                className="
                  overflow-hidden

                  rounded-xl

                  border
                  border-[#292929]

                  bg-[#0b0b0b]

                  shadow-[0_20px_70px_rgba(0,0,0,.25)]
                "
              >

                {projectImages.map((image, index) => (

                  <div
                    key={`${image}-${index}`}
                    className="
                      relative

                      overflow-hidden

                      bg-[#101010]

                      group

                      animate-modal-image
                    "
                    style={{
                      animationDelay:
                        `${120 + index * 70}ms`,
                    }}
                  >

                    {/* IMAGE */}

                    <img
                      src={image}
                      alt={`${project.title} - ${index + 1}`}
                      loading={
                        index === 0
                          ? 'eager'
                          : 'lazy'
                      }
                      className="
                        block

                        w-full
                        h-auto

                        object-contain

                        transition-transform
                        duration-[1200ms]

                        ease-[cubic-bezier(.22,1,.36,1)]

                        group-hover:scale-[1.012]
                      "
                      onError={(e) => {

                        if (
                          e.currentTarget.src.endsWith(
                            '.jpg'
                          )
                        ) {

                          e.currentTarget.src =
                            project.coverImage.replace(
                              '.jpg',
                              '.png'
                            );

                        } else {

                          e.currentTarget.style.display =
                            'none';

                        }

                      }}
                    />


                    {/* SUBTLE IMAGE GRADIENT */}

                    <div
                      className="
                        absolute
                        inset-0

                        pointer-events-none

                        bg-gradient-to-b
                        from-white/[0.025]
                        via-transparent
                        to-black/[0.12]

                        opacity-70
                      "
                    />


                    {/* IMAGE HIGHLIGHT */}

                    <div
                      className="
                        absolute
                        inset-0

                        pointer-events-none

                        ring-1
                        ring-inset
                        ring-white/[0.03]

                        group-hover:ring-crimson/10

                        transition-all
                        duration-700
                      "
                    />

                  </div>

                ))}

              </div>

            ) : (

              <div
                className="
                  py-20

                  text-center

                  border
                  border-[#292929]

                  rounded-xl

                  bg-[#0d0d0d]
                "
              >

                <p
                  className="
                    text-sm
                    text-slate-500
                  "
                >
                  No project images available.
                </p>

              </div>

            )}


            {/* =================================================
                DIVIDER
                ================================================= */}

            <div
              className="
                border-t
                border-[#292929]

                my-7
                sm:my-8
              "
            />


            {/* =================================================
                PROJECT INFORMATION
                ================================================= */}

            <div
              className="
                grid

                grid-cols-1
                lg:grid-cols-12

                gap-7

                animate-modal-content
              "
            >

              {/* LEFT */}

              <div
                className="
                  lg:col-span-8

                  space-y-6
                "
              >

                {/* OVERVIEW */}

                <div>

                  <h3
                    className="
                      text-xs

                      font-extrabold

                      tracking-widest

                      text-white

                      uppercase

                      mb-3
                    "
                  >
                    PROJECT OVERVIEW
                  </h3>

                  <p
                    className="
                      text-sm

                      leading-relaxed

                      text-slate-400

                      max-w-3xl
                    "
                  >
                    {project.description ||
                      project.summary ||
                      'Creative design project developed as part of the selected portfolio work.'}
                  </p>

                </div>


                {/* TOOLS */}

                {project.tools &&
                  project.tools.length > 0 && (

                    <div>

                      <h4
                        className="
                          text-[10px]

                          font-extrabold

                          tracking-widest

                          text-slate-500

                          uppercase

                          mb-3

                          flex
                          items-center
                          gap-2
                        "
                      >

                        <Wrench
                          className="
                            w-3.5
                            h-3.5

                            text-crimson
                          "
                        />

                        TOOLS & TECHNOLOGIES

                      </h4>


                      <div
                        className="
                          flex
                          flex-wrap
                          gap-2
                        "
                      >

                        {project.tools.map(
                          (tool, index) => (

                            <span
                              key={index}
                              className="
                                px-2.5
                                py-1.5

                                rounded-md

                                bg-[#111]

                                border
                                border-[#333]

                                text-[9px]

                                font-bold

                                text-slate-300

                                uppercase

                                transition-all
                                duration-300

                                hover:border-crimson/50
                                hover:text-white
                              "
                            >
                              {tool}
                            </span>

                          )
                        )}

                      </div>

                    </div>

                  )}

              </div>


              {/* RIGHT INFO */}

              <div
                className="
                  lg:col-span-4
                "
              >

                <div
                  className="
                    rounded-xl

                    border
                    border-[#292929]

                    bg-[#0d0d0d]

                    p-5

                    shadow-[0_20px_60px_rgba(0,0,0,.18)]
                  "
                >

                  <InfoRow
                    icon={
                      <User className="w-3.5 h-3.5" />
                    }
                    label="CLIENT"
                    value={
                      project.client ||
                      'Digital Marketing'
                    }
                  />


                  <InfoRow
                    icon={
                      <Calendar className="w-3.5 h-3.5" />
                    }
                    label="PUBLISHED"
                    value={
                      project.publishedDate ||
                      '2026'
                    }
                    middle
                  />


                  <InfoRow
                    icon={
                      <Eye className="w-3.5 h-3.5" />
                    }
                    label="VIEWS"
                    value={
                      project.views ||
                      '1.2K'
                    }
                    last
                  />

                </div>

              </div>

            </div>


            {/* =================================================
                ACTION BUTTONS
                ================================================= */}

            <div
              className="
                grid

                grid-cols-1
                sm:grid-cols-2

                gap-2

                mt-7

                animate-modal-content
              "
              style={{
                animationDelay: '150ms',
              }}
            >

              {/* APPRECIATE */}

              <button
                type="button"
                onClick={() =>
                  setAppreciated(!appreciated)
                }
                className={`
                  py-3
                  px-4

                  rounded-lg

                  border

                  text-[10px]

                  font-extrabold

                  tracking-widest

                  uppercase

                  flex
                  items-center
                  justify-center
                  gap-2

                  transition-all
                  duration-300

                  ${
                    appreciated
                      ? `
                        bg-crimson
                        border-crimson
                        text-white
                        shadow-[0_10px_30px_rgba(197,5,15,.18)]
                      `
                      : `
                        bg-[#111]
                        border-[#333]
                        text-slate-300

                        hover:border-crimson
                        hover:text-white
                        hover:bg-[#151515]
                      `
                  }
                `}
              >

                <ThumbsUp
                  className={`
                    w-3.5
                    h-3.5

                    transition-transform
                    duration-300

                    ${
                      appreciated
                        ? 'fill-current scale-110'
                        : ''
                    }
                  `}
                />

                {appreciated
                  ? `APPRECIATED (${appreciationsCount})`
                  : `APPRECIATE PROJECT (${appreciationsCount})`}

              </button>


              {/* BEHANCE */}

              <a
                href={
                  project.behanceLink ||
                  profileData.behanceUrl
                }
                target="_blank"
                rel="noopener noreferrer"
                className="
                  py-3
                  px-4

                  rounded-lg

                  bg-crimson

                  border
                  border-crimson

                  text-white

                  text-[10px]

                  font-extrabold

                  tracking-widest

                  uppercase

                  flex
                  items-center
                  justify-center
                  gap-2

                  hover:bg-[#ff252d]

                  hover:-translate-y-0.5

                  hover:shadow-[0_12px_30px_rgba(197,5,15,.2)]

                  transition-all
                  duration-300
                "
              >

                <span>
                  VIEW PROJECT ON BEHANCE
                </span>

                <ExternalLink
                  className="
                    w-3.5
                    h-3.5
                  "
                />

              </a>

            </div>


            {/* =================================================
                BOTTOM BACK
                ================================================= */}

            <button
              type="button"
              onClick={handleClose}
              className="
                block

                mx-auto

                mt-7
                pb-6

                text-[8px]

                font-bold

                tracking-[0.2em]

                text-slate-600

                hover:text-crimson

                uppercase

                transition-colors
              "
            >
              ← BACK TO SELECTED PROJECTS
            </button>

          </div>

        </div>

      </div>


      {/* =====================================================
          ANIMATIONS
          ===================================================== */}

      <style>{`

        @keyframes modal-header-in {
          from {
            opacity: 0;
            transform: translateY(18px);
            filter: blur(6px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }


        @keyframes modal-image-in {
          from {
            opacity: 0;
            transform: translateY(18px) scale(.985);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }


        @keyframes modal-content-in {
          from {
            opacity: 0;
            transform: translateY(14px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }


        .animate-modal-header {
          animation:
            modal-header-in
            .75s
            cubic-bezier(.22,1,.36,1)
            both;
        }


        .animate-modal-image {
          animation:
            modal-image-in
            .8s
            cubic-bezier(.22,1,.36,1)
            both;
        }


        .animate-modal-content {
          animation:
            modal-content-in
            .7s
            cubic-bezier(.22,1,.36,1)
            both;
        }


        @media (max-width: 640px) {

          .animate-modal-image {
            animation-duration: .65s;
          }

        }


        @media (prefers-reduced-motion: reduce) {

          .animate-modal-header,
          .animate-modal-image,
          .animate-modal-content {
            animation: none !important;
          }

        }


        /* =================================================
           CUSTOM SCROLLBAR
           ================================================= */

        .project-modal-scroll::-webkit-scrollbar {
          width: 5px;
        }

        .project-modal-scroll::-webkit-scrollbar-track {
          background: #0a0a0a;
        }

        .project-modal-scroll::-webkit-scrollbar-thumb {
          background: #292929;
          border-radius: 999px;
        }

        .project-modal-scroll::-webkit-scrollbar-thumb:hover {
          background: #444;
        }

      `}</style>

    </div>
  );
}


/* ============================================================
   INFO ROW
   ============================================================ */

function InfoRow({
  icon,
  label,
  value,
  middle = false,
  last = false,
}) {
  return (
    <div
      className={`
        flex
        items-start
        gap-3

        ${
          middle
            ? 'py-4 border-y border-[#292929]'
            : last
              ? 'pt-4'
              : 'pb-4 border-b border-[#292929]'
        }
      `}
    >

      <div
        className="
          text-crimson

          mt-0.5

          shrink-0
        "
      >
        {icon}
      </div>


      <div>

        <p
          className="
            text-[8px]

            font-bold

            tracking-widest

            text-slate-600

            uppercase
          "
        >
          {label}
        </p>


        <p
          className="
            text-xs

            font-bold

            text-white

            mt-1
          "
        >
          {value}
        </p>

      </div>

    </div>
  );
}