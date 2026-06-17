import { useRef, useState } from 'react';
import ResumeForm from './components/ResumeForm';
import ResumePreview from './components/ResumePreview';
import Footer from './components/Footer';
import { useResumeData } from './hooks/useResumeData';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { motion, AnimatePresence } from 'framer-motion';

const futureFeatures = [
  { title: 'GitHub Sync', desc: 'Import your repos and contributions directly.', icon: 'github' },
  { title: 'LinkedIn Sync', desc: 'Sync your LinkedIn profile with one click.', icon: 'linkedin' },
  { title: 'LeetCode Stats', desc: 'Showcase your problem-solving skills.', icon: 'code' },
  { title: 'Codeforces Stats', desc: 'Display competitive programming ratings.', icon: 'trophy' },
  { title: 'AI Resume Review', desc: 'Get AI-powered suggestions to improve.', icon: 'sparkles' },
  { title: 'Portfolio Builder', desc: 'Generate a developer portfolio page.', icon: 'globe' },
];

function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12h18M3 6h18M3 18h18" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function Bell() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
    </svg>
  );
}

function Search() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
    </svg>
  );
}

function DashboardIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
    </svg>
  );
}

function FileTextIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  );
}

function LayersIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function TrophyIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 010-5H6" /><path d="M18 9h1.5a2.5 2.5 0 000-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2H6v7a6 6 0 0012 0V2z" />
    </svg>
  );
}

function SparklesIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l1.912 5.813a2 2 0 001.9 1.387h5.898l-4.773 3.467a2 2 0 00-.726 2.235L18 22l-5.5-3.5a2 2 0 00-2.12 0L4.5 22l1.789-5.098a2 2 0 00-.726-2.235L.79 11.2h5.898a2 2 0 001.9-1.387L10.5 3h1.5z" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
    </svg>
  );
}

const featureIcons = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  code: CodeIcon,
  trophy: TrophyIcon,
  sparkles: SparklesIcon,
  globe: GlobeIcon,
};

function App() {
  const {
    personalInfo,
    updatePersonalInfo,
    education,
    updateEducation,
    skills,
    addSkill,
    removeSkill,
    experiences,
    updateExperience,
    addExperience,
    removeExperience,
    projects,
    updateProject,
    addProject,
    removeProject,
  } = useResumeData();

  const previewRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('builder');

  const handleDownloadPDF = async () => {
    const element = previewRef.current;
    if (!element) {
      alert('Please add some content to your resume first.');
      return;
    }

    setIsDownloading(true);
    try {
      function oklchToHex(s) {
        const m = s.match(/^oklch\(\s*([\d.]+%?)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*[\d.]+%?)?\s*\)$/);
        if (!m) return null;
        let L = parseFloat(m[1]);
        if (m[1].includes('%')) L /= 100;
        const C = parseFloat(m[2]);
        const H = (parseFloat(m[3]) * Math.PI) / 180;
        const a = C * Math.cos(H);
        const b = C * Math.sin(H);
        const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
        const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
        const s_ = L - 0.0894841775 * a - 1.2914855480 * b;
        const l3 = l_ * l_ * l_;
        const m3 = m_ * m_ * m_;
        const s3 = s_ * s_ * s_;
        let r = 4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3;
        let g = -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3;
        let b_ = -0.0041960863 * l3 - 0.7034186147 * m3 + 1.7076147010 * s3;
        const gamma = (c) => {
          const x = Math.min(1, Math.max(0, c));
          return x <= 0.0031308 ? 12.92 * x : 1.055 * x ** (1 / 2.4) - 0.055;
        };
        r = gamma(r);
        g = gamma(g);
        b_ = gamma(b_);
        const hex = (v) => Math.round(v * 255).toString(16).padStart(2, '0');
        return `#${hex(r)}${hex(g)}${hex(b_)}`;
      }

      const oklchRx = /oklch\([^)]+\)/g;
      const replaceInValue = (val) => val.replace(oklchRx, (m) => oklchToHex(m) || m);
      const allElements = [element, ...element.querySelectorAll('*')];
      for (const el of allElements) {
        const cs = getComputedStyle(el);
        for (const prop of cs) {
          const value = cs.getPropertyValue(prop);
          if (typeof value === 'string' && value.includes('oklch')) {
            el.style.setProperty(prop, replaceInValue(value), 'important');
          }
        }
      }

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });

      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      const pdf = new jsPDF('p', 'mm', 'a4');
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('resume.pdf');
    } catch (error) {
      console.error('PDF generation failed:', error);
      alert('Failed to generate PDF. Please check the console for details.');
    } finally {
      setIsDownloading(false);
    }
  };

  const resumeData = { personalInfo, education, skills, experiences, projects };

  const profileCompletion = [
    personalInfo.fullName ? 1 : 0,
    personalInfo.email ? 1 : 0,
    education.degree ? 1 : 0,
    skills.length > 0 ? 1 : 0,
    experiences.some(e => e.company) ? 1 : 0,
    projects.some(p => p.name) ? 1 : 0,
  ].reduce((a, b) => a + b, 0) / 6 * 100;

  const sidebarLinks = [
    { id: 'builder', label: 'Resume Builder', icon: FileTextIcon },
    { id: 'dashboard', label: 'Dashboard', icon: DashboardIcon },
    { id: 'templates', label: 'Templates', icon: LayersIcon },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ];

  return (
    <div className="min-h-screen bg-black flex">
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/80 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      <aside
        className={`fixed lg:static z-50 w-[260px] h-screen bg-black border-r border-[rgba(255,255,255,0.06)] flex flex-col transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-6 border-b border-[rgba(255,255,255,0.06)]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white flex items-center justify-center">
              <FileTextIcon />
            </div>
            <div>
              <h1 className="text-white font-bold text-lg leading-tight">ResumeAI</h1>
              <p className="text-gray-500 text-xs">Build & Optimize</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {sidebarLinks.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { setActiveSection(item.id); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-white text-black'
                    : 'text-gray-500 hover:text-white hover:bg-[rgba(255,255,255,0.03)]'
                }`}
              >
                <Icon />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[rgba(255,255,255,0.06)]">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-9 h-9 bg-white flex items-center justify-center text-black text-sm font-bold">
              S
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">Satya Prakash</p>
              <p className="text-gray-500 text-xs truncate">Pro Plan</p>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <header className="sticky top-0 z-30 bg-black/80 backdrop-blur-xl border-b border-[rgba(255,255,255,0.06)] no-print">
          <div className="flex items-center justify-between h-16 px-4 lg:px-8">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 text-gray-400 hover:text-white hover:bg-[rgba(255,255,255,0.05)] transition-colors"
              >
                {sidebarOpen ? <XIcon /> : <MenuIcon />}
              </button>

              <div className="hidden sm:flex items-center gap-2 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] px-4 py-2 w-64 lg:w-80">
                <Search />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent border-none outline-none text-sm text-white placeholder-gray-600 w-full"
                />
                <span className="text-gray-600 text-xs px-1.5 py-0.5 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.06)]">⌘K</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="relative p-2 text-gray-400 hover:text-white hover:bg-[rgba(255,255,255,0.05)] transition-all">
                <Bell />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-gray-400" />
              </button>

              <div className="flex items-center gap-3 pl-3 border-l border-[rgba(255,255,255,0.06)]">
                <div className="w-8 h-8 bg-white flex items-center justify-center text-black text-xs font-bold">
                  S
                </div>
                <div className="hidden sm:block">
                  <p className="text-white text-sm font-medium leading-tight">Satya Prakash</p>
                  <p className="text-gray-500 text-xs">Developer</p>
                </div>
                <ChevronDown />
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          {activeSection === 'builder' && (
            <>
              <section className="relative border-b border-[rgba(255,255,255,0.06)] no-print">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                      className="inline-flex items-center gap-2 px-4 py-1.5 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-gray-300 text-xs font-medium mb-6"
                    >
                      <span className="w-2 h-2 bg-white" />
                      AI-Powered Resume Builder
                    </motion.div>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
                      Build Developer Resumes
                      <br />
                      <span className="text-gray-400">That Get Interviews</span>
                    </h1>

                    <p className="text-lg sm:text-xl text-gray-500 mb-10 max-w-2xl mx-auto">
                      Create, optimize and manage all your professional profiles from one place.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                      <button className="btn text-base px-8 py-3 flex items-center gap-2">
                        Create Resume
                        <ArrowRight />
                      </button>
                      <button className="btn-outline text-base px-8 py-3 flex items-center gap-2">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                        Watch Demo
                      </button>
                    </div>
                  </motion.div>
                </div>
              </section>

              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 no-print">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: 'Resumes Created', value: '0' },
                    { label: 'Resume Score', value: '--' },
                    { label: 'Profile Completion', value: `${Math.round(profileCompletion)}%` },
                    { label: 'Applications Sent', value: '0' },
                  ].map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * i, duration: 0.4 }}
                      className="card p-5"
                    >
                      <p className="text-gray-500 text-xs font-medium mb-2">{stat.label}</p>
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                      <div className="mt-3 h-1 bg-[rgba(255,255,255,0.06)] overflow-hidden">
                        <div
                          className="h-full bg-white transition-all duration-500"
                          style={{
                            width: stat.label === 'Profile Completion' ? `${profileCompletion}%` : '0%',
                          }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>

              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <ResumeForm
                      data={resumeData}
                      onUpdatePersonalInfo={updatePersonalInfo}
                      onUpdateEducation={updateEducation}
                      onAddSkill={addSkill}
                      onRemoveSkill={removeSkill}
                      onUpdateExperience={updateExperience}
                      onAddExperience={addExperience}
                      onRemoveExperience={removeExperience}
                      onUpdateProject={updateProject}
                      onAddProject={addProject}
                      onRemoveProject={removeProject}
                      onDownloadPDF={handleDownloadPDF}
                      isDownloading={isDownloading}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="xl:sticky xl:top-24 self-start"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <h2 className="text-lg font-semibold text-white">Preview</h2>
                        <p className="text-sm text-gray-500">Your resume updates in real time</p>
                      </div>
                      <button
                        onClick={handleDownloadPDF}
                        disabled={isDownloading}
                        className="btn text-sm px-5 py-2.5 flex items-center gap-2"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        {isDownloading ? 'Downloading...' : 'Download PDF'}
                      </button>
                    </div>
                    <ResumePreview ref={previewRef} data={resumeData} />
                  </motion.div>
                </div>
              </section>

              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 no-print">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="text-center mb-12"
                >
                  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                    Everything You Need
                  </h2>
                  <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                    Powerful integrations and AI-powered tools to supercharge your job search.
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {futureFeatures.map((feature, i) => {
                    const Icon = featureIcons[feature.icon];
                    return (
                      <motion.div
                        key={feature.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.05 * i, duration: 0.4 }}
                        className="card p-6 group cursor-pointer relative overflow-hidden"
                      >
                        <div className="absolute top-0 right-0">
                          <span className="text-[10px] font-medium px-2.5 py-1 bg-[rgba(255,255,255,0.05)] text-gray-400 border border-[rgba(255,255,255,0.08)]">
                            Coming Soon
                          </span>
                        </div>

                        <div className="w-12 h-12 flex items-center justify-center mb-4 text-gray-400 transition-all duration-300 group-hover:scale-110">
                          {Icon && <Icon />}
                        </div>

                        <h3 className="text-white font-semibold text-lg mb-2">{feature.title}</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </section>
            </>
          )}

          {activeSection === 'dashboard' && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="text-center py-20">
                <div className="w-16 h-16 mx-auto mb-6 bg-[rgba(255,255,255,0.05)] flex items-center justify-center border border-[rgba(255,255,255,0.08)]">
                  <DashboardIcon />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Dashboard</h2>
                <p className="text-gray-500">Analytics and insights coming soon.</p>
              </div>
            </div>
          )}

          {activeSection === 'templates' && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="text-center py-20">
                <div className="w-16 h-16 mx-auto mb-6 bg-[rgba(255,255,255,0.05)] flex items-center justify-center border border-[rgba(255,255,255,0.08)]">
                  <LayersIcon />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Templates</h2>
                <p className="text-gray-500">Premium resume templates coming soon.</p>
              </div>
            </div>
          )}

          {activeSection === 'settings' && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="text-center py-20">
                <div className="w-16 h-16 mx-auto mb-6 bg-[rgba(255,255,255,0.05)] flex items-center justify-center border border-[rgba(255,255,255,0.08)]">
                  <SettingsIcon />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Settings</h2>
                <p className="text-gray-500">Account and preference settings coming soon.</p>
              </div>
            </div>
          )}
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;
