import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProjectGallery from './components/ProjectGallery';
import EducationProcess from './components/EducationProcess';
import ContactFooter from './components/ContactFooter';
import ProjectModal from './components/ProjectModal';

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-slate-100 font-sans selection:bg-crimson selection:text-white">
      
      {/* Top Navbar Header */}
      <Navbar />

      {/* Main Sections matching reference layout */}
      <main>
        <Hero />
        <ProjectGallery onSelectProject={setSelectedProject} />
        <EducationProcess />
      </main>

      {/* Footer & Contact */}
      <ContactFooter />

      {/* Lightbox Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          darkMode={true}
        />
      )}

    </div>
  );
}
