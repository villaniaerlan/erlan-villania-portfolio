import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

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


/* ============================================================
   MOBILE GROUP ZOOM GALLERY
   ============================================================ */

function MobileZoomGallery({
  images,
  project,
}) {
  const galleryRef = useRef(null);

  const pointers =
    useRef(new Map());

  const lastDistance =
    useRef(null);

  const lastCenter =
    useRef(null);

  const lastPointer =
    useRef(null);

  const [scale, setScale] =
    useState(1);

  const [position, setPosition] =
    useState({
      x: 0,
      y: 0,
    });


  /* ==========================================================
     CLAMP GROUP POSITION
     ========================================================== */

  const clampPosition = (
    x,
    y,
    nextScale
  ) => {
    if (nextScale <= 1) {
      return {
        x: 0,
        y: 0,
      };
    }

    const gallery =
      galleryRef.current;

    if (!gallery) {
      return {
        x,
        y,
      };
    }

    const rect =
      gallery.getBoundingClientRect();

    const maxX =
      Math.max(
        0,
        (rect.width *
          nextScale -
          rect.width) /
          2
      );

    const maxY =
      Math.max(
        0,
        (rect.height *
          nextScale -
          rect.height) /
          2
      );

    return {
      x: Math.max(
        -maxX,
        Math.min(maxX, x)
      ),

      y: Math.max(
        -maxY,
        Math.min(maxY, y)
      ),
    };
  };


  /* ==========================================================
     TOUCH DISTANCE
     ========================================================== */

  const getDistance = (
    first,
    second
  ) => {
    const dx =
      second.clientX -
      first.clientX;

    const dy =
      second.clientY -
      first.clientY;

    return Math.sqrt(
      dx * dx +
      dy * dy
    );
  };


  /* ==========================================================
     TOUCH CENTER
     ========================================================== */

  const getCenter = (
    first,
    second
  ) => ({
    x:
      (first.clientX +
        second.clientX) /
      2,

    y:
      (first.clientY +
        second.clientY) /
      2,
  });


  /* ==========================================================
     POINTER DOWN
     ========================================================== */

  const handlePointerDown = (
    event
  ) => {
    if (
      event.pointerType !==
      'touch'
    ) {
      return;
    }

    pointers.current.set(
      event.pointerId,
      {
        clientX:
          event.clientX,

        clientY:
          event.clientY,
      }
    );

    try {
      event.currentTarget.setPointerCapture(
        event.pointerId
      );
    } catch {
      // Ignore pointer capture errors
    }


    /* ========================================================
       TWO FINGERS
       ======================================================== */

    if (
      pointers.current.size ===
      2
    ) {
      const values = [
        ...pointers.current.values(),
      ];

      lastDistance.current =
        getDistance(
          values[0],
          values[1]
        );

      lastCenter.current =
        getCenter(
          values[0],
          values[1]
        );

      lastPointer.current =
        null;

      return;
    }


    /* ========================================================
       ONE FINGER
       ======================================================== */

    if (
      pointers.current.size ===
      1
    ) {
      lastPointer.current = {
        x: event.clientX,
        y: event.clientY,
      };
    }
  };


  /* ==========================================================
     POINTER MOVE
     ========================================================== */

  const handlePointerMove = (
    event
  ) => {
    if (
      event.pointerType !==
      'touch'
    ) {
      return;
    }

    if (
      !pointers.current.has(
        event.pointerId
      )
    ) {
      return;
    }

    pointers.current.set(
      event.pointerId,
      {
        clientX:
          event.clientX,

        clientY:
          event.clientY,
      }
    );


    /* ========================================================
       TWO FINGER GROUP ZOOM
       ======================================================== */

    if (
      pointers.current.size ===
      2
    ) {
      event.preventDefault();

      const values = [
        ...pointers.current.values(),
      ];

      const distance =
        getDistance(
          values[0],
          values[1]
        );

      const center =
        getCenter(
          values[0],
          values[1]
        );


      if (
        lastDistance.current !==
        null
      ) {
        const distanceDifference =
          distance -
          lastDistance.current;


        setScale(
          (currentScale) => {
            const zoomAmount =
              distanceDifference *
              0.008;

            const nextScale =
              Math.max(
                1,
                Math.min(
                  4,
                  currentScale +
                    zoomAmount
                )
              );


            setPosition(
              (currentPosition) => {
                const centerMovementX =
                  lastCenter.current
                    ? center.x -
                      lastCenter.current.x
                    : 0;

                const centerMovementY =
                  lastCenter.current
                    ? center.y -
                      lastCenter.current.y
                    : 0;

                return clampPosition(
                  currentPosition.x +
                    centerMovementX,

                  currentPosition.y +
                    centerMovementY,

                  nextScale
                );
              }
            );


            return nextScale;
          }
        );
      }


      lastDistance.current =
        distance;

      lastCenter.current =
        center;

      lastPointer.current =
        null;

      return;
    }


    /* ========================================================
       ONE FINGER GROUP PAN
       ======================================================== */

    if (
      pointers.current.size ===
        1 &&
      scale > 1
    ) {
      event.preventDefault();

      if (
        !lastPointer.current
      ) {
        lastPointer.current = {
          x: event.clientX,
          y: event.clientY,
        };

        return;
      }


      const deltaX =
        event.clientX -
        lastPointer.current.x;

      const deltaY =
        event.clientY -
        lastPointer.current.y;


      setPosition(
        (currentPosition) =>
          clampPosition(
            currentPosition.x +
              deltaX,

            currentPosition.y +
              deltaY,

            scale
          )
      );


      lastPointer.current = {
        x: event.clientX,
        y: event.clientY,
      };
    }
  };


  /* ==========================================================
     POINTER UP
     ========================================================== */

  const handlePointerUp = (
    event
  ) => {
    if (
      event.pointerType !==
      'touch'
    ) {
      return;
    }

    pointers.current.delete(
      event.pointerId
    );


    if (
      pointers.current.size <
      2
    ) {
      lastDistance.current =
        null;

      lastCenter.current =
        null;
    }


    if (
      pointers.current.size ===
      1
    ) {
      const remaining = [
        ...pointers.current.values(),
      ][0];

      lastPointer.current = {
        x: remaining.clientX,
        y: remaining.clientY,
      };
    }


    if (
      pointers.current.size ===
      0
    ) {
      lastPointer.current =
        null;

      setScale(
        (currentScale) => {
          if (
            currentScale <
            1.05
          ) {
            setPosition({
              x: 0,
              y: 0,
            });

            return 1;
          }

          return currentScale;
        }
      );
    }
  };


  /* ==========================================================
     POINTER CANCEL
     ========================================================== */

  const handlePointerCancel = (
    event
  ) => {
    pointers.current.delete(
      event.pointerId
    );

    lastDistance.current =
      null;

    lastCenter.current =
      null;

    lastPointer.current =
      null;
  };


  /* ==========================================================
     DOUBLE TAP / DOUBLE CLICK
     ========================================================== */

  const handleDoubleClick = () => {
    setScale(
      (currentScale) => {
        const nextScale =
          currentScale > 1
            ? 1
            : 2;

        setPosition({
          x: 0,
          y: 0,
        });

        return nextScale;
      }
    );
  };


  /* ==========================================================
     RESET
     ========================================================== */

  useEffect(() => {
    setScale(1);

    setPosition({
      x: 0,
      y: 0,
    });

    pointers.current.clear();

    lastDistance.current =
      null;

    lastCenter.current =
      null;

    lastPointer.current =
      null;
  }, [project]);


  return (
    <div
      className="
        relative
        w-full
        max-w-full
        min-w-0

        overflow-hidden

        select-none

        rounded-[14px]

        bg-transparent
      "
      style={{
        touchAction:
          scale > 1
            ? 'none'
            : 'pan-y',
      }}
      onPointerDown={
        handlePointerDown
      }
      onPointerMove={
        handlePointerMove
      }
      onPointerUp={
        handlePointerUp
      }
      onPointerCancel={
        handlePointerCancel
      }
      onDoubleClick={
        handleDoubleClick
      }
    >

      {/* ======================================================
          ENTIRE PROJECT IMAGE STACK
          SCALES AS ONE GROUP
          ====================================================== */}

      <div
        ref={galleryRef}
        className="
          project-modal-mobile-group

          w-full
          max-w-full

          origin-center
        "
        style={{
          transform:
            `translate3d(${position.x}px, ${position.y}px, 0) scale(${scale})`,

          transformOrigin:
            'center center',

          willChange:
            scale > 1
              ? 'transform'
              : 'auto',
        }}
      >

        {images.map(
          (
            image,
            index
          ) => (

            <div
              key={`${image}-${index}`}
              className={`
                project-modal-gallery-item

                relative

                w-full
                max-w-full
                min-w-0

                group

                leading-[0]

                ${
                  index === 0
                    ? 'project-modal-gallery-first'
                    : ''
                }

                ${
                  index ===
                  images.length - 1
                    ? 'project-modal-gallery-last'
                    : ''
                }

                animate-modal-image
              `}
              style={{
                animationDelay:
                  `${120 + index * 70}ms`,
              }}
            >

              <img
                src={image}
                alt={`${project.title} - ${index + 1}`}
                loading={
                  index === 0
                    ? 'eager'
                    : 'lazy'
                }
                decoding="async"
                draggable="false"
                className="
                  project-modal-gallery-image

                  block

                  w-full
                  max-w-full
                  min-w-0

                  h-auto

                  object-contain

                  select-none

                  [-webkit-user-drag:none]
                "
                onError={(event) => {
                  if (
                    event.currentTarget.src.endsWith(
                      '.jpg'
                    )
                  ) {
                    event.currentTarget.src =
                      project.coverImage.replace(
                        '.jpg',
                        '.png'
                      );
                  } else {
                    event.currentTarget.style.display =
                      'none';
                  }
                }}
              />

            </div>

          )
        )}

      </div>


      {/* ======================================================
          ZOOM INDICATOR
          ====================================================== */}

      {scale > 1 && (
        <div
          className="
            absolute

            top-3
            right-3

            z-30

            px-2.5
            py-1

            rounded-full

            bg-black/70

            border
            border-white/10

            text-[9px]

            font-bold

            tracking-widest

            text-white/80

            backdrop-blur-md

            pointer-events-none
          "
        >
          {Math.round(
            scale * 100
          )}
          %
        </div>
      )}

    </div>
  );
}


/* ============================================================
   DESKTOP IMAGE GALLERY
   ============================================================ */

function DesktopGallery({
  images,
  project,
}) {
  return (
    <div
      className="
        project-modal-gallery

        w-full
        max-w-full
        min-w-0

        overflow-hidden

        rounded-[14px]

        bg-transparent
      "
    >

      {images.map(
        (
          image,
          index
        ) => (

          <div
            key={`${image}-${index}`}
            className={`
              project-modal-gallery-item

              relative

              w-full
              max-w-full
              min-w-0

              group

              leading-[0]

              ${
                index === 0
                  ? 'project-modal-gallery-first'
                  : ''
              }

              ${
                index ===
                images.length - 1
                  ? 'project-modal-gallery-last'
                  : ''
              }

              animate-modal-image
            `}
            style={{
              animationDelay:
                `${120 + index * 70}ms`,
            }}
          >

            <img
              src={image}
              alt={`${project.title} - ${index + 1}`}
              loading={
                index === 0
                  ? 'eager'
                  : 'lazy'
              }
              decoding="async"
              draggable="false"
              className="
                project-modal-gallery-image

                block

                w-full
                max-w-full
                min-w-0

                h-auto

                object-contain

                select-none

                [-webkit-user-drag:none]
              "
              onError={(event) => {
                if (
                  event.currentTarget.src.endsWith(
                    '.jpg'
                  )
                ) {
                  event.currentTarget.src =
                    project.coverImage.replace(
                      '.jpg',
                      '.png'
                    );
                } else {
                  event.currentTarget.style.display =
                    'none';
                }
              }}
            />

          </div>

        )
      )}

    </div>
  );
}


/* ============================================================
   PROJECT MODAL
   ============================================================ */

export default function ProjectModal({
  project,
  onClose,
  darkMode,
}) {
  const [appreciated, setAppreciated] =
    useState(false);

  const [visible, setVisible] =
    useState(false);


  /* ==========================================================
     OPEN / CLOSE
     ========================================================== */

  useEffect(() => {
    if (!project) return;

    const previousOverflow =
      document.body.style.overflow;

    const previousOverflowX =
      document.body.style.overflowX;


    document.body.style.overflow =
      'hidden';

    document.body.style.overflowX =
      'hidden';


    requestAnimationFrame(() => {
      setVisible(true);
    });


    const handleKeyDown = (
      event
    ) => {
      if (
        event.key ===
        'Escape'
      ) {
        handleClose();
      }
    };


    window.addEventListener(
      'keydown',
      handleKeyDown
    );


    return () => {
      document.body.style.overflow =
        previousOverflow;

      document.body.style.overflowX =
        previousOverflowX;

      window.removeEventListener(
        'keydown',
        handleKeyDown
      );
    };
  }, [project]);


  const handleClose = () => {
    setVisible(false);

    setTimeout(() => {
      onClose();
    }, 350);
  };


  if (!project) {
    return null;
  }


  const appreciationsCount =
    (project.appreciations || 0) +
    (appreciated ? 1 : 0);


  const projectImages =
    project.images &&
    project.images.length > 0
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

        w-[100vw]
        max-w-[100vw]
        min-w-0

        p-0
        sm:p-4
        md:p-6

        overflow-x-hidden
        overflow-y-hidden

        overscroll-x-none

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
          MODAL
          ===================================================== */}

      <div
        className={`
          relative
          z-10

          w-[100vw]
          max-w-[100vw]
          min-w-0

          sm:w-full
          sm:max-w-6xl

          h-[100dvh]
          max-h-[100dvh]

          sm:h-[94vh]
          sm:max-h-[94vh]

          overflow-hidden
          overflow-x-hidden

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
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
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

            w-full
            max-w-full
            min-w-0

            h-[calc(100dvh-58px)]
            sm:h-[calc(94vh-58px)]

            overflow-y-auto
            overflow-x-hidden

            overscroll-y-contain

            touch-pan-y

            scrollbar-thin
            scrollbar-track-[#0a0a0a]
            scrollbar-thumb-[#292929]

            [-webkit-overflow-scrolling:touch]

            [scrollbar-gutter:stable]
          "
        >

          <div
            className="
              w-full
              max-w-full
              min-w-0

              px-3
              py-5

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
                mb-5
                sm:mb-9

                animate-modal-header
              "
            >

              <div
                className="
                  flex
                  items-center
                  gap-2.5

                  mb-2
                "
              >

                <span
                  className="
                    font-display

                    text-xl
                    sm:text-2xl

                    font-extrabold

                    text-crimson

                    leading-none
                  "
                >
                  {project.number}
                </span>

                <span
                  className="
                    text-[8px]
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

                  text-2xl
                  sm:text-4xl
                  md:text-5xl

                  font-extrabold

                  tracking-tight

                  text-white

                  uppercase

                  leading-[0.95]

                  max-w-full
                  break-words
                "
              >
                {project.title}
              </h2>


              <div
                className="
                  mt-3
                  sm:mt-4

                  flex
                  items-center
                  gap-2
                "
              >

                <div
                  className="
                    w-10
                    sm:w-12

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
                ================================================= */}

            {projectImages.length > 0 ? (

              <>

                {/* DESKTOP / WEB */}

                <div
                  className="
                    hidden
                    sm:block
                  "
                >

                  <DesktopGallery
                    images={
                      projectImages
                    }
                    project={
                      project
                    }
                  />

                </div>


                {/* MOBILE */}

                <div
                  className="
                    block
                    sm:hidden
                  "
                >

                  <MobileZoomGallery
                    images={
                      projectImages
                    }
                    project={
                      project
                    }
                  />

                </div>

              </>

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

                my-6
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

                gap-10
                lg:gap-7

                animate-modal-content

                min-w-0
              "
            >

              <div
                className="
                  lg:col-span-8

                  space-y-10

                  min-w-0
                "
              >

                {/* OVERVIEW */}

                <div className="min-w-0">

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

                      break-words
                    "
                  >
                    {project.description ||
                      project.summary ||
                      'Creative design project developed as part of the selected portfolio work.'}
                  </p>

                </div>


                {/* PROCESS */}

                {project.process &&
                  project.process.length > 0 && (

                    <div className="min-w-0">

                      <h4
                        className="
                          text-[10px]

                          font-extrabold

                          tracking-widest

                          text-slate-500

                          uppercase

                          mb-4
                        "
                      >
                        PROCESS
                      </h4>


                      <div
                        className="
                          space-y-5
                          min-w-0
                        "
                      >

                        {project.process.map(
                          (
                            step,
                            index
                          ) => (

                            <div
                              key={index}
                              className="
                                flex
                                items-start
                                gap-3

                                min-w-0
                              "
                            >

                              <div
                                className="
                                  shrink-0

                                  flex
                                  items-center
                                  justify-center

                                  w-7
                                  h-7

                                  rounded-full

                                  bg-[#111]

                                  border
                                  border-[#333]

                                  text-[9px]

                                  font-extrabold

                                  text-crimson
                                "
                              >
                                {index + 1}
                              </div>


                              <div
                                className="
                                  min-w-0
                                  flex-1
                                "
                              >

                                <p
                                  className="
                                    text-xs

                                    font-bold

                                    text-white

                                    leading-relaxed

                                    break-words
                                  "
                                >
                                  {typeof step ===
                                  'string'
                                    ? step
                                    : step.title ||
                                      step.name ||
                                      `Step ${index + 1}`}
                                </p>


                                {typeof step !==
                                  'string' &&
                                  step.description && (

                                    <p
                                      className="
                                        mt-1

                                        text-[11px]

                                        leading-relaxed

                                        text-slate-500

                                        break-words
                                      "
                                    >
                                      {
                                        step.description
                                      }
                                    </p>

                                  )}

                              </div>

                            </div>

                          )
                        )}

                      </div>

                    </div>

                  )}


                {/* TOOLS */}

                {project.tools &&
                  project.tools.length > 0 && (

                    <div className="min-w-0">

                      <h4
                        className="
                          text-[10px]

                          font-extrabold

                          tracking-widest

                          text-slate-500

                          uppercase

                          mb-4

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

                          min-w-0
                        "
                      >

                        {project.tools.map(
                          (
                            tool,
                            index
                          ) => (

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


              {/* =================================================
                  INFO
                  ================================================= */}

              <div
                className="
                  lg:col-span-4

                  min-w-0
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

                    min-w-0
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
                ACTIONS
                ================================================= */}

            <div
              className="
                grid

                grid-cols-1
                sm:grid-cols-2

                gap-2

                mt-7

                animate-modal-content

                min-w-0
              "
              style={{
                animationDelay:
                  '150ms',
              }}
            >

              <button
                type="button"
                onClick={() =>
                  setAppreciated(
                    !appreciated
                  )
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

                  min-w-0

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

                    shrink-0

                    transition-transform
                    duration-300

                    ${
                      appreciated
                        ? 'fill-current scale-110'
                        : ''
                    }

                  `}
                />

                <span className="truncate">
                  {appreciated
                    ? `APPRECIATED (${appreciationsCount})`
                    : `APPRECIATE PROJECT (${appreciationsCount})`}
                </span>

              </button>


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

                  min-w-0

                  hover:bg-[#ff252d]

                  hover:-translate-y-0.5

                  hover:shadow-[0_12px_30px_rgba(197,5,15,.2)]

                  transition-all
                  duration-300
                "
              >

                <span className="truncate">
                  VIEW PROJECT ON BEHANCE
                </span>

                <ExternalLink
                  className="
                    w-3.5
                    h-3.5

                    shrink-0
                  "
                />

              </a>

            </div>


            {/* =================================================
                BACK TO PROJECTS
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
          STYLES
          ===================================================== */}

      <style>{`

        /* =====================================================
           ANIMATIONS
           ===================================================== */

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
            transform: translateY(18px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
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


        /* =====================================================
           GALLERY — BASE
           ===================================================== */

        .project-modal-gallery {

          display: block;

          width: 100%;
          max-width: 100%;
          min-width: 0;

          margin: 0;
          padding: 0;

          background: transparent;

          border: 0;

          box-shadow: none;

          line-height: 0;

        }


        .project-modal-gallery-item {

          position: relative;

          display: block;

          width: 100%;
          max-width: 100%;
          min-width: 0;

          margin: 0;
          padding: 0;

          overflow: hidden;

          background: transparent;

          border: 0;

          box-shadow: none;

          line-height: 0;

        }


        /* =====================================================
           FIRST IMAGE — TOP CORNERS
           ===================================================== */

        .project-modal-gallery-first {

          border-top-left-radius: 14px;
          border-top-right-radius: 14px;

          overflow: hidden;

        }


        /* =====================================================
           LAST IMAGE — BOTTOM CORNERS
           ===================================================== */

        .project-modal-gallery-last {

          border-bottom-left-radius: 14px;
          border-bottom-right-radius: 14px;

          overflow: hidden;

        }


        /* =====================================================
           BETWEEN IMAGES — COMPLETELY SEAMLESS
           ===================================================== */

        .project-modal-gallery-item
        + .project-modal-gallery-item {

          margin-top: 0;
          padding-top: 0;

          border-top: 0;

          border-radius: 0;

        }


        /* =====================================================
           IMAGE
           ===================================================== */

        .project-modal-gallery-image {

          display: block;

          width: 100%;
          max-width: 100%;
          min-width: 0;

          height: auto;

          margin: 0;
          padding: 0;

          object-fit: contain;

          object-position: center top;

          vertical-align: top;

          line-height: 0;

          user-select: none;

          -webkit-user-select: none;

          -webkit-user-drag: none;

          border: 0;

          border-radius: 0;

          box-shadow: none;

          outline: none;

          background: transparent;

        }


        /* =====================================================
           DESKTOP
           ===================================================== */

        @media (min-width: 641px) {

          .project-modal-gallery {

            overflow: hidden;

            border-radius: 14px;

          }


          .project-modal-gallery-item {

            overflow: hidden;

          }


          .project-modal-gallery-image {

            cursor: default;

          }

        }


        /* =====================================================
           MOBILE
           ===================================================== */

        @media (max-width: 640px) {

          html,
          body {

            width: 100%;
            max-width: 100%;

            overflow-x: hidden !important;

            overscroll-behavior-x: none !important;

          }


          .project-modal-gallery {

            display: block;

            width: 100%;
            max-width: 100%;
            min-width: 0;

            margin: 0;
            padding: 0;

            overflow: hidden;

            contain: none;

            background: transparent;

            border: 0;

            box-shadow: none;

            border-radius: 14px;

          }


          .project-modal-mobile-group {

            display: block;

            width: 100%;

            max-width: 100%;

            min-width: 0;

            margin: 0;
            padding: 0;

            background: transparent;

          }


          .project-modal-gallery-item {

            position: relative;

            display: block;

            width: 100%;
            max-width: 100%;
            min-width: 0;

            margin: 0;
            padding: 0;

            overflow: hidden;

            background: transparent;

            border: 0;

            box-shadow: none;

            line-height: 0;

          }


          .project-modal-gallery-item
          + .project-modal-gallery-item {

            margin-top: 0;

            padding-top: 0;

            border-top: 0;

            border-radius: 0;

          }


          .project-modal-gallery-first {

            border-top-left-radius: 14px;
            border-top-right-radius: 14px;

            overflow: hidden;

          }


          .project-modal-gallery-last {

            border-bottom-left-radius: 14px;
            border-bottom-right-radius: 14px;

            overflow: hidden;

          }


          .project-modal-gallery-image {

            display: block;

            width: 100%;
            max-width: 100%;
            min-width: 0;

            height: auto;

            margin: 0;
            padding: 0;

            object-fit: contain;

            object-position: center top;

            vertical-align: top;

            user-select: none;

            -webkit-user-select: none;

            -webkit-user-drag: none;

            border: 0;

            border-radius: 0;

            box-shadow: none;

            outline: none;

            background: transparent;

          }

        }


        /* =====================================================
           REDUCED MOTION
           ===================================================== */

        @media (prefers-reduced-motion: reduce) {

          .animate-modal-header,
          .animate-modal-image,
          .animate-modal-content {

            animation: none !important;

          }

        }


        /* =====================================================
           SCROLLBAR
           ===================================================== */

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

        w-full
        min-w-0

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


      <div
        className="
          min-w-0
          flex-1
        "
      >

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

            break-words
          "
        >
          {value}
        </p>

      </div>

    </div>
  );
}