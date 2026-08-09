import React, { useState } from 'react';
import { Mail, Globe, Phone, MapPin, ArrowRight, ExternalLink, Send, CheckCircle2 } from 'lucide-react';
import { profileData } from '../data/portfolioData';

export default function ContactFooter() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <footer id="contact" className="bg-[#070707] pt-20 pb-12 border-t border-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          
          {/* Left Column: Headline & Quick Freelance Link */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-none uppercase">
              LET'S WORK <br />
              <span className="text-crimson">TOGETHER</span> <span className="text-crimson text-3xl">✦</span>
            </h2>

            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              I'm currently open for new projects, visual brand designs, UI/UX systems, and creative collaborations. Let's create something amazing that drives results.
            </p>

            <div className="pt-2">
              <a
                href={`mailto:${profileData.email}`}
                className="inline-flex items-center gap-3 px-6 py-3.5 rounded-xl bg-crimson hover:bg-crimson-dark text-white font-extrabold text-xs tracking-widest uppercase transition-all duration-300 shadow-xl shadow-crimson/20 hover:shadow-crimson/40 hover:-translate-y-0.5"
              >
                <span>SEND DIRECT EMAIL</span>
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Middle Column: Interactive Contact Form */}
          <div className="lg:col-span-4 bg-[#121212] border border-[#222] p-6 rounded-2xl">
            <h3 className="font-display text-lg font-bold text-white uppercase tracking-wider mb-4">
              QUICK MESSAGE FORM
            </h3>

            {submitted ? (
              <div className="py-8 text-center space-y-3 animate-in fade-in">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-sm text-white">Message Sent!</h4>
                <p className="text-xs text-slate-400">Erlan will reply to your email promptly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-[10px] font-extrabold tracking-widest text-slate-400 uppercase block mb-1">YOUR NAME</label>
                  <input
                    type="text"
                    required
                    placeholder="Juan Dela Cruz"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A1A1A] border border-[#333] text-xs text-white focus:outline-none focus:border-crimson"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-extrabold tracking-widest text-slate-400 uppercase block mb-1">YOUR EMAIL</label>
                  <input
                    type="email"
                    required
                    placeholder="juan@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A1A1A] border border-[#333] text-xs text-white focus:outline-none focus:border-crimson"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-extrabold tracking-widest text-slate-400 uppercase block mb-1">PROJECT DETAILS</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Tell me about your project goals..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A1A1A] border border-[#333] text-xs text-white focus:outline-none focus:border-crimson"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-crimson hover:bg-crimson-dark text-white font-extrabold text-xs tracking-widest uppercase transition-all flex items-center justify-center gap-2"
                >
                  <span>SUBMIT INQUIRY</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Clickable Contact Details */}
          <div className="lg:col-span-3 space-y-4">
            
            <a href={`mailto:${profileData.email}`} className="flex items-center gap-3 p-3 rounded-xl bg-[#121212] border border-[#222] hover:border-crimson transition-all group">
              <div className="w-9 h-9 rounded-lg bg-[#1D1D1D] text-slate-300 flex items-center justify-center shrink-0 group-hover:bg-crimson group-hover:text-white transition-colors">
                <Mail className="w-4 h-4 text-crimson group-hover:text-white" />
              </div>
              <div className="overflow-hidden">
                <div className="text-[10px] font-extrabold tracking-widest text-slate-500 uppercase">EMAIL</div>
                <div className="text-xs font-bold text-slate-200 truncate group-hover:text-crimson transition-colors">{profileData.email}</div>
              </div>
            </a>

            <a href={profileData.behanceUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-xl bg-[#121212] border border-[#222] hover:border-crimson transition-all group">
              <div className="w-9 h-9 rounded-lg bg-[#1D1D1D] text-slate-300 flex items-center justify-center shrink-0 group-hover:bg-crimson group-hover:text-white transition-colors">
                <Globe className="w-4 h-4 text-crimson group-hover:text-white" />
              </div>
              <div className="overflow-hidden">
                <div className="text-[10px] font-extrabold tracking-widest text-slate-500 uppercase">BEHANCE PROFILE</div>
                <div className="text-xs font-bold text-slate-200 truncate group-hover:text-crimson transition-colors">behance.net/erlanvillania</div>
              </div>
            </a>

            <a href={`tel:${profileData.phone}`} className="flex items-center gap-3 p-3 rounded-xl bg-[#121212] border border-[#222] hover:border-crimson transition-all group">
              <div className="w-9 h-9 rounded-lg bg-[#1D1D1D] text-slate-300 flex items-center justify-center shrink-0 group-hover:bg-crimson group-hover:text-white transition-colors">
                <Phone className="w-4 h-4 text-crimson group-hover:text-white" />
              </div>
              <div>
                <div className="text-[10px] font-extrabold tracking-widest text-slate-500 uppercase">PHONE / WHATSAPP</div>
                <div className="text-xs font-bold text-slate-200 group-hover:text-crimson transition-colors">{profileData.phone}</div>
              </div>
            </a>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-[#121212] border border-[#222]">
              <div className="w-9 h-9 rounded-lg bg-[#1D1D1D] text-slate-300 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 text-crimson" />
              </div>
              <div>
                <div className="text-[10px] font-extrabold tracking-widest text-slate-500 uppercase">LOCATION</div>
                <div className="text-xs font-bold text-slate-200">{profileData.city}</div>
              </div>
            </div>

          </div>

        </div>

        {/* Copyright Footer Line */}
        <div className="pt-8 border-t border-[#181818] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-extrabold tracking-widest text-slate-500 uppercase">
          <div>
            © {new Date().getFullYear()} ERLAN VILLANIA — ALL RIGHTS RESERVED
          </div>
          <div className="flex items-center gap-4">
            <a href={profileData.behanceUrl} target="_blank" rel="noopener noreferrer" className="hover:text-crimson transition-colors">BEHANCE</a>
            <span>•</span>
            <a href="#work" className="hover:text-crimson transition-colors">WORK</a>
            <span>•</span>
            <a href="#about" className="hover:text-crimson transition-colors">ABOUT</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
