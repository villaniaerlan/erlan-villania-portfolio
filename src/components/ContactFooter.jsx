import React, { useEffect, useRef, useState } from 'react';
import { Mail, Globe, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { profileData } from '../data/portfolioData';

export default function ContactFooter() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  // =====================================================
  // ANIMATION
  // =====================================================

  const footerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // =====================================================
  // INTERSECTION OBSERVER
  // =====================================================

  useEffect(() => {
    const element = footerRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.12
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  // =====================================================
  // SUBTLE PARALLAX
  // =====================================================

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (footerRef.current) {
            const rect = footerRef.current.getBoundingClientRect();
            const viewportCenter = window.innerHeight / 2;

            const distanceFromCenter =
              rect.top + rect.height / 2 - viewportCenter;

            setScrollY(distanceFromCenter);
          }

          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, {
      passive: true
    });

    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // =====================================================
  // FORM SUBMIT
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.message ||
      sending
    ) {
      return;
    }

    setSending(true);

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim()
        })
      });

      const text = await response.text();

      let result = {};

      try {
        result = text ? JSON.parse(text) : {};
      } catch {
        result = {};
      }

      if (!response.ok) {
        throw new Error(
          result.error || `Server error: ${response.status}`
        );
      }

      setSubmitted(true);

      setFormData({
        name: '',
        email: '',
        message: ''
      });

      setTimeout(() => {
        setSubmitted(false);
      }, 4000);

    } catch (error) {
      console.error('Contact form error:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <footer
      ref={footerRef}
      id="contact"
      className="bg-[#070707] pt-20 pb-12 border-t border-[#1A1A1A] overflow-hidden"
    >

      {/* =====================================================
          ANIMATION STYLES
          ===================================================== */}

      <style>{`
        @keyframes contactGlow {
          0%, 100% {
            opacity: 0.08;
            transform: scale(1);
          }

          50% {
            opacity: 0.16;
            transform: scale(1.08);
          }
        }

        .contact-glow {
          animation: contactGlow 6s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .contact-glow {
            animation: none;
          }
        }
      `}</style>


      {/* =====================================================
          AMBIENT BACKGROUND GLOW
          ===================================================== */}

      <div
        className="
          contact-glow
          pointer-events-none
          absolute
          left-1/2
          -translate-x-1/2
          -translate-y-1/2
          w-[500px]
          h-[500px]
          rounded-full
          bg-crimson
          blur-[140px]
        "
        style={{
          top: `${180 + scrollY * -0.04}px`
        }}
      />


      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">

        {/* =====================================================
            MAIN CONTACT GRID
            ===================================================== */}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">


          {/* =================================================
              LEFT COLUMN
              ================================================= */}

          <div
            className={`
              lg:col-span-5
              space-y-6
              transition-all
              duration-1000
              ease-[cubic-bezier(0.22,1,0.36,1)]
              ${
                isVisible
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-10'
              }
            `}
            style={{
              transform: isVisible
                ? `translateY(${scrollY * -0.018}px)`
                : undefined
            }}
          >

            <h2
              className="
                font-display
                text-4xl
                sm:text-5xl
                lg:text-6xl
                font-extrabold
                tracking-tight
                text-white
                leading-none
                uppercase
                transition-transform
                duration-1000
              "
              style={{
                transform: isVisible
                  ? `translateY(${scrollY * -0.012}px)`
                  : undefined
              }}
            >
              LET'S WORK <br />

              <span className="text-crimson">
                TOGETHER
              </span>{' '}

              <span className="text-crimson text-3xl">
                ✦
              </span>
            </h2>


            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              I'm currently open for new projects, visual brand designs,
              UI/UX systems, and creative collaborations. Let's create
              something amazing that drives results.
            </p>


            <div
              className={`
                pt-2
                transition-all
                duration-700
                delay-300
                ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-5'
                }
              `}
            >

              <a
                href={`mailto:${profileData.email}`}
                className="
                  inline-flex
                  items-center
                  gap-3
                  px-6
                  py-3.5
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
                  shadow-xl
                  shadow-crimson/20
                  hover:shadow-crimson/40
                  hover:-translate-y-0.5
                "
              >

                <span>
                  SEND DIRECT EMAIL
                </span>

                <Mail className="w-4 h-4" />

              </a>

            </div>

          </div>


          {/* =================================================
              MIDDLE COLUMN — CONTACT FORM
              ================================================= */}

          <div
            className={`
              lg:col-span-4
              bg-[#121212]
              border
              border-[#222]
              p-6
              rounded-2xl
              transition-all
              duration-1000
              delay-150
              ease-[cubic-bezier(0.22,1,0.36,1)]
              ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }
            `}
            style={{
              transform: isVisible
                ? `translateY(${scrollY * 0.025}px)`
                : undefined
            }}
          >

            <h3 className="font-display text-lg font-bold text-white uppercase tracking-wider mb-4">
              QUICK MESSAGE FORM
            </h3>


            {submitted ? (

              <div className="py-8 text-center space-y-3 animate-in fade-in">

                <div
                  className="
                    w-12
                    h-12
                    rounded-full
                    bg-emerald-500/20
                    text-emerald-400
                    flex
                    items-center
                    justify-center
                    mx-auto
                  "
                >

                  <CheckCircle2 className="w-6 h-6" />

                </div>


                <h4 className="font-bold text-sm text-white">
                  Message Sent!
                </h4>


                <p className="text-xs text-slate-400">
                  Erlan will reply to your email promptly.
                </p>

              </div>

            ) : (

              <form
                onSubmit={handleSubmit}
                className="space-y-4"
              >

                {/* NAME */}

                <div>

                  <label className="text-[10px] font-extrabold tracking-widest text-slate-400 uppercase block mb-1">
                    YOUR NAME
                  </label>


                  <input
                    type="text"
                    required
                    placeholder="Juan Dela Cruz"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        name: e.target.value
                      })
                    }
                    className="
                      w-full
                      px-3.5
                      py-2.5
                      rounded-xl
                      bg-[#1A1A1A]
                      border
                      border-[#333]
                      text-xs
                      text-white
                      focus:outline-none
                      focus:border-crimson
                      transition-colors
                    "
                  />

                </div>


                {/* EMAIL */}

                <div>

                  <label className="text-[10px] font-extrabold tracking-widest text-slate-400 uppercase block mb-1">
                    YOUR EMAIL
                  </label>


                  <input
                    type="email"
                    required
                    placeholder="juan@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        email: e.target.value
                      })
                    }
                    className="
                      w-full
                      px-3.5
                      py-2.5
                      rounded-xl
                      bg-[#1A1A1A]
                      border
                      border-[#333]
                      text-xs
                      text-white
                      focus:outline-none
                      focus:border-crimson
                      transition-colors
                    "
                  />

                </div>


                {/* MESSAGE */}

                <div>

                  <label className="text-[10px] font-extrabold tracking-widest text-slate-400 uppercase block mb-1">
                    PROJECT DETAILS
                  </label>


                  <textarea
                    required
                    rows={3}
                    placeholder="Tell me about your project goals..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        message: e.target.value
                      })
                    }
                    className="
                      w-full
                      px-3.5
                      py-2.5
                      rounded-xl
                      bg-[#1A1A1A]
                      border
                      border-[#333]
                      text-xs
                      text-white
                      focus:outline-none
                      focus:border-crimson
                      transition-colors
                    "
                  />

                </div>


                {/* SUBMIT */}

                <button
                  type="submit"
                  disabled={sending}
                  className="
                    w-full
                    py-3
                    rounded-xl
                    bg-crimson
                    hover:bg-crimson-dark
                    disabled:opacity-60
                    disabled:cursor-not-allowed
                    text-white
                    font-extrabold
                    text-xs
                    tracking-widest
                    uppercase
                    transition-all
                    flex
                    items-center
                    justify-center
                    gap-2
                    hover:-translate-y-0.5
                  "
                >

                  <span>
                    {sending
                      ? 'SENDING...'
                      : 'SUBMIT INQUIRY'}
                  </span>

                  <Send className="w-3.5 h-3.5" />

                </button>

              </form>

            )}

          </div>


          {/* =================================================
              RIGHT COLUMN — CONTACT DETAILS
              ================================================= */}

          <div
            className={`
              lg:col-span-3
              space-y-4
              transition-all
              duration-1000
              delay-300
              ease-[cubic-bezier(0.22,1,0.36,1)]
              ${
                isVisible
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-10'
              }
            `}
            style={{
              transform: isVisible
                ? `translateY(${scrollY * -0.03}px)`
                : undefined
            }}
          >

            {/* EMAIL */}

            <a
              href={`mailto:${profileData.email}`}
              className="
                flex
                items-center
                gap-3
                p-3
                rounded-xl
                bg-[#121212]
                border
                border-[#222]
                hover:border-crimson
                transition-all
                duration-300
                group
                hover:-translate-y-1
              "
            >

              <div
                className="
                  w-9
                  h-9
                  rounded-lg
                  bg-[#1D1D1D]
                  text-slate-300
                  flex
                  items-center
                  justify-center
                  shrink-0
                  group-hover:bg-crimson
                  group-hover:text-white
                  transition-colors
                "
              >

                <Mail className="w-4 h-4 text-crimson group-hover:text-white" />

              </div>


              <div className="overflow-hidden">

                <div className="text-[10px] font-extrabold tracking-widest text-slate-500 uppercase">
                  EMAIL
                </div>

                <div className="text-xs font-bold text-slate-200 truncate group-hover:text-crimson transition-colors">
                  {profileData.email}
                </div>

              </div>

            </a>


            {/* BEHANCE */}

            <a
              href={profileData.behanceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex
                items-center
                gap-3
                p-3
                rounded-xl
                bg-[#121212]
                border
                border-[#222]
                hover:border-crimson
                transition-all
                duration-300
                group
                hover:-translate-y-1
              "
            >

              <div
                className="
                  w-9
                  h-9
                  rounded-lg
                  bg-[#1D1D1D]
                  text-slate-300
                  flex
                  items-center
                  justify-center
                  shrink-0
                  group-hover:bg-crimson
                  group-hover:text-white
                  transition-colors
                "
              >

                <Globe className="w-4 h-4 text-crimson group-hover:text-white" />

              </div>


              <div className="overflow-hidden">

                <div className="text-[10px] font-extrabold tracking-widest text-slate-500 uppercase">
                  BEHANCE PROFILE
                </div>

                <div className="text-xs font-bold text-slate-200 truncate group-hover:text-crimson transition-colors">
                  behance.net/erlanvillania
                </div>

              </div>

            </a>


            {/* PHONE */}

            <a
              href={`tel:${profileData.phone}`}
              className="
                flex
                items-center
                gap-3
                p-3
                rounded-xl
                bg-[#121212]
                border
                border-[#222]
                hover:border-crimson
                transition-all
                duration-300
                group
                hover:-translate-y-1
              "
            >

              <div
                className="
                  w-9
                  h-9
                  rounded-lg
                  bg-[#1D1D1D]
                  text-slate-300
                  flex
                  items-center
                  justify-center
                  shrink-0
                  group-hover:bg-crimson
                  group-hover:text-white
                  transition-colors
                "
              >

                <Phone className="w-4 h-4 text-crimson group-hover:text-white" />

              </div>


              <div>

                <div className="text-[10px] font-extrabold tracking-widest text-slate-500 uppercase">
                  PHONE / WHATSAPP
                </div>

                <div className="text-xs font-bold text-slate-200 group-hover:text-crimson transition-colors">
                  {profileData.phone}
                </div>

              </div>

            </a>


            {/* LOCATION */}

            <div
              className="
                flex
                items-center
                gap-3
                p-3
                rounded-xl
                bg-[#121212]
                border
                border-[#222]
                transition-all
                duration-300
                hover:border-[#333]
              "
            >

              <div
                className="
                  w-9
                  h-9
                  rounded-lg
                  bg-[#1D1D1D]
                  text-slate-300
                  flex
                  items-center
                  justify-center
                  shrink-0
                "
              >

                <MapPin className="w-4 h-4 text-crimson" />

              </div>


              <div>

                <div className="text-[10px] font-extrabold tracking-widest text-slate-500 uppercase">
                  LOCATION
                </div>

                <div className="text-xs font-bold text-slate-200">
                  {profileData.city}
                </div>

              </div>

            </div>

          </div>

        </div>


        {/* =====================================================
            COPYRIGHT FOOTER
            ===================================================== */}

        <div
          className={`
            pt-8
            border-t
            border-[#181818]
            flex
            flex-col
            sm:flex-row
            items-center
            justify-between
            gap-4
            text-xs
            font-extrabold
            tracking-widest
            text-slate-500
            uppercase
            transition-all
            duration-1000
            delay-500
            ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-5'
            }
          `}
        >

          <div className="text-center sm:text-left">
            © {new Date().getFullYear()} ERLAN VILLANIA — ALL RIGHTS RESERVED
          </div>


          <div className="flex items-center gap-4">

            <a
              href={profileData.behanceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-crimson transition-colors"
            >
              BEHANCE
            </a>


            <span>
              •
            </span>


            <a
              href="#work"
              className="hover:text-crimson transition-colors"
            >
              WORK
            </a>


            <span>
              •
            </span>


            <a
              href="#about"
              className="hover:text-crimson transition-colors"
            >
              ABOUT
            </a>

          </div>

        </div>

      </div>

    </footer>
  );
}