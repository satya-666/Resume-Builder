import { useRef, useState } from 'react';
import ResumeForm from './components/ResumeForm';
import ResumePreview from './components/ResumePreview';
import Footer from './components/Footer';
import { useResumeData } from './hooks/useResumeData';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

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

  const handleDownloadPDF = async () => {
    const element = previewRef.current;
    if (!element) {
      alert('Please add some content to your resume first.');
      return;
    }

    setIsDownloading(true);
    try {
      // ── oklch → sRGB mathematical converter (CSS Color 4 standard) ──
      function oklchToHex(s) {
        const m = s.match(
          /^oklch\(\s*([\d.]+%?)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*[\d.]+%?)?\s*\)$/
        );
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

        const hex = (v) =>
          Math.round(v * 255).toString(16).padStart(2, '0');
        return `#${hex(r)}${hex(g)}${hex(b_)}`;
      }

      const oklchRx = /oklch\([^)]+\)/g;
      const replaceInValue = (val) =>
        val.replace(oklchRx, (m) => oklchToHex(m) || m);

      // ── Scan root element AND every descendant for oklch in ANY
      //     computed CSS property (color, shadow, gradient, SVG, etc.) ──
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

  const resumeData = {
    personalInfo,
    education,
    skills,
    experiences,
    projects,
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div>
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
          </div>

          <div className="xl:sticky xl:top-10 self-start">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Preview</h2>
              <p className="text-sm text-gray-400">Your resume updates in real time</p>
            </div>
            <ResumePreview ref={previewRef} data={resumeData} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;
