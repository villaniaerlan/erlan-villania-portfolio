import React, { useState } from 'react';
import {
  X,
  ThumbsUp,
  Eye,
  ExternalLink,
  Calendar,
  User,
  Wrench,
  ArrowLeft
} from 'lucide-react';
import { profileData } from '../data/portfolioData';

export default function ProjectModal({ project, onClose, darkMode }) {
  const [appreciated, setAppreciated] = useState(false);

  if (!project) return null;

  const appreciationsCount =
    (project.appreciations || 0) + (appreciated ? 1 : 0);

  // Use all images from the project.
  // If images[] is missing, use coverImage as fallback.
  const projectImages =
    project.images && project.images.length > 0
      ? project.images
      : project.coverImage
        ? [project.coverImage]
        : [];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-sm">

      {/* BACKDROP */}
      <div
        className="absolute inset-0"
        onClick={onClose}
      />

      {/* MODAL */}
      <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-2xl bg-[#080808] text-white border border-[#292929] shadow-2xl z-10">

        {/* TOP BAR */}
        <div className="sticky top-0 z-30 flex items-center justify-between px-5 sm:px-7 py-4 bg-[#080808]/95 backdrop-blur-md border-b border-[#252525]">

          {/* BACK BUTTON */}
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-[10px] sm:text-xs font-bold tracking-widest text-slate-400 hover:text-white transition-colors uppercase"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>BACK</span>
          </button>

          {/* CATEGORY */}
          <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.25em] text-[#e21c23] uppercase">
            {project.title}
          </span>

          {/* CLOSE BUTTON */}
          <button
            onClick={onClose}
            className="p-2 rounded-lg border border-[#333] text-slate-400 hover:text-white hover:border-[#e21c23] hover:bg-[#e21c23]/10 transition-all"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>

        </div>

        {/* MAIN CONTENT */}
        <div className="p-5 sm:p-7 md:p-8">

          {/* PROJECT HEADER */}
          <div className="mb-7">

            <div className="flex items-center gap-3 mb-2">

              {/* PROJECT NUMBER */}
              <span className="font-display text-2xl font-extrabold text-[#e21c23]">
                {project.number}
              </span>

              {/* CATEGORY */}
              <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.2em] text-slate-500 uppercase">
                {project.category}
              </span>

            </div>

            {/* PROJECT TITLE */}
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white uppercase">
              {project.title}
            </h2>

            {/* RED LINE */}
            <div className="w-12 h-1 bg-[#e21c23] mt-4" />

          </div>


          {/* =====================================================
              PROJECT IMAGE GALLERY
              NO IMAGE NUMBER
              NO SPACE BETWEEN IMAGES
              ===================================================== */}

          <div className="space-y-0 -mx-5 sm:mx-0">

            {projectImages.map((image, index) => (

              <div
                key={`${image}-${index}`}
                className={`
                  relative
                  overflow-hidden
                  bg-[#101010]
                  border-x
                  border-[#292929]
                  group
                  ${index === 0 ? 'rounded-t-xl border-t' : ''}
                  ${index === projectImages.length - 1 ? 'rounded-b-xl border-b' : ''}
                `}
              >

                <img
                  src={image}
                  alt={`${project.title} - ${index + 1}`}
                  className="block w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.01]"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />

              </div>

            ))}

          </div>


          {/* NO IMAGE MESSAGE */}
          {projectImages.length === 0 && (
            <div className="py-20 text-center border border-[#292929] rounded-xl">

              <p className="text-sm text-slate-500">
                No project images available.
              </p>

            </div>
          )}


          {/* DIVIDER */}
          <div className="border-t border-[#292929] my-7" />


          {/* PROJECT INFORMATION */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">

            {/* LEFT SIDE */}
            <div className="lg:col-span-8 space-y-5">

              {/* PROJECT OVERVIEW */}
              <div>

                <h3 className="text-xs font-extrabold tracking-widest text-white uppercase mb-3">
                  PROJECT OVERVIEW
                </h3>

                <p className="text-sm leading-relaxed text-slate-400">
                  {project.description || project.summary}
                </p>

              </div>


              {/* TOOLS */}
              {project.tools && project.tools.length > 0 && (
                <div>

                  <h4 className="text-[10px] font-extrabold tracking-widest text-slate-500 uppercase mb-3 flex items-center gap-2">

                    <Wrench className="w-3.5 h-3.5 text-[#e21c23]" />

                    TOOLS & TECHNOLOGIES

                  </h4>

                  <div className="flex flex-wrap gap-2">

                    {project.tools.map((tool, index) => (

                      <span
                        key={index}
                        className="px-2.5 py-1.5 rounded-md bg-[#111] border border-[#333] text-[9px] font-bold text-slate-300 uppercase"
                      >
                        {tool}
                      </span>

                    ))}

                  </div>

                </div>
              )}

            </div>


            {/* RIGHT SIDE INFO CARD */}
            <div className="lg:col-span-4">

              <div className="rounded-xl border border-[#292929] bg-[#0d0d0d] p-5">

                {/* CLIENT */}
                <div className="flex items-start gap-3 pb-4 border-b border-[#292929]">

                  <User className="w-3.5 h-3.5 text-[#e21c23] mt-0.5" />

                  <div>

                    <p className="text-[8px] font-bold tracking-widest text-slate-600 uppercase">
                      CLIENT
                    </p>

                    <p className="text-xs font-bold text-white mt-1">
                      {project.client || 'Digital Marketing'}
                    </p>

                  </div>

                </div>


                {/* PUBLISHED DATE */}
                <div className="flex items-start gap-3 py-4 border-b border-[#292929]">

                  <Calendar className="w-3.5 h-3.5 text-[#e21c23] mt-0.5" />

                  <div>

                    <p className="text-[8px] font-bold tracking-widest text-slate-600 uppercase">
                      PUBLISHED
                    </p>

                    <p className="text-xs font-bold text-white mt-1">
                      {project.publishedDate || '2026'}
                    </p>

                  </div>

                </div>


                {/* VIEWS */}
                <div className="flex items-start gap-3 pt-4">

                  <Eye className="w-3.5 h-3.5 text-[#e21c23] mt-0.5" />

                  <div>

                    <p className="text-[8px] font-bold tracking-widest text-slate-600 uppercase">
                      VIEWS
                    </p>

                    <p className="text-xs font-bold text-white mt-1">
                      {project.views || '1.2K'}
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>


          {/* ACTION BUTTONS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-7">

            {/* APPRECIATE BUTTON */}
            <button
              onClick={() => setAppreciated(!appreciated)}
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
                ${
                  appreciated
                    ? 'bg-[#e21c23] border-[#e21c23] text-white'
                    : 'bg-[#111] border-[#333] text-slate-300 hover:border-[#e21c23] hover:text-white'
                }
              `}
            >

              <ThumbsUp
                className={`w-3.5 h-3.5 ${
                  appreciated ? 'fill-current' : ''
                }`}
              />

              {appreciated
                ? `APPRECIATED (${appreciationsCount})`
                : `APPRECIATE PROJECT (${appreciationsCount})`}

            </button>


            {/* BEHANCE BUTTON */}
            <a
              href={project.behanceLink || profileData.behanceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-4 rounded-lg bg-[#e21c23] border border-[#e21c23] text-white text-[10px] font-extrabold tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-[#ff252d] transition-all"
            >

              <span>
                VIEW PROJECT ON BEHANCE
              </span>

              <ExternalLink className="w-3.5 h-3.5" />

            </a>

          </div>


          {/* BOTTOM BACK BUTTON */}
          <button
            onClick={onClose}
            className="block mx-auto mt-6 text-[8px] font-bold tracking-[0.2em] text-slate-600 hover:text-[#e21c23] uppercase transition-colors"
          >
            ← BACK TO SELECTED PROJECTS
          </button>

        </div>

      </div>

    </div>
  );
}