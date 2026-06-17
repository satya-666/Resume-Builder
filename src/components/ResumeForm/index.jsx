import { useState } from 'react';
import PersonalInfo from './PersonalInfo';
import Education from './Education';
import Skills from './Skills';
import Experience from './Experience';
import Projects from './Projects';

const steps = [
  { id: 'personal', label: 'Personal Info', number: 1 },
  { id: 'education', label: 'Education', number: 2 },
  { id: 'skills', label: 'Skills', number: 3 },
  { id: 'experience', label: 'Experience', number: 4 },
  { id: 'projects', label: 'Projects', number: 5 },
];

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default function ResumeForm({
  data,
  onUpdatePersonalInfo,
  onUpdateEducation,
  onAddSkill,
  onRemoveSkill,
  onUpdateExperience,
  onAddExperience,
  onRemoveExperience,
  onUpdateProject,
  onAddProject,
  onRemoveProject,
  onDownloadPDF,
  isDownloading,
}) {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Resume Builder
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Step {currentStep + 1} of {steps.length} — {steps[currentStep].label}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-6 mb-8">
          {steps.map((step, i) => (
            <div key={step.id} className="flex items-center flex-1">
              <button
                onClick={() => setCurrentStep(i)}
                className={`flex items-center gap-2 px-3 py-2 text-xs font-medium transition-all duration-200 ${
                  i <= currentStep ? 'text-white' : 'text-gray-600'
                }`}
              >
                <span className={`w-6 h-6 flex items-center justify-center text-xs font-bold transition-all ${
                  i <= currentStep ? 'bg-white text-black' : 'bg-[rgba(255,255,255,0.06)] text-gray-500'
                }`}>
                  {i < currentStep ? <CheckIcon /> : step.number}
                </span>
                <span className="hidden sm:inline">{step.label}</span>
              </button>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-px mx-2 transition-colors duration-300 ${
                  i < currentStep ? 'bg-white' : 'bg-[rgba(255,255,255,0.06)]'
                }`} />
              )}
            </div>
          ))}
        </div>

        <div className="min-h-[300px]">
          {currentStep === 0 && (
            <PersonalInfo data={data.personalInfo} onChange={onUpdatePersonalInfo} />
          )}
          {currentStep === 1 && (
            <Education data={data.education} onChange={onUpdateEducation} />
          )}
          {currentStep === 2 && (
            <Skills skills={data.skills} onAdd={onAddSkill} onRemove={onRemoveSkill} />
          )}
          {currentStep === 3 && (
            <Experience
              experiences={data.experiences}
              onChange={onUpdateExperience}
              onAdd={onAddExperience}
              onRemove={onRemoveExperience}
            />
          )}
          {currentStep === 4 && (
            <Projects
              projects={data.projects}
              onChange={onUpdateProject}
              onAdd={onAddProject}
              onRemove={onRemoveProject}
            />
          )}
        </div>

        <div className="flex items-center justify-between mt-8 pt-6 border-t border-[rgba(255,255,255,0.06)]">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className="px-5 py-2.5 text-sm font-medium text-gray-400 hover:text-white border border-[rgba(255,255,255,0.08)] hover:bg-[rgba(255,255,255,0.05)] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
          >
            Previous
          </button>

          <div className="flex items-center gap-3">
            {currentStep === steps.length - 1 ? (
              <button
                onClick={onDownloadPDF}
                disabled={isDownloading}
                className="btn text-sm px-6 py-2.5 flex items-center gap-2"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                {isDownloading ? 'Downloading...' : 'Download PDF'}
              </button>
            ) : (
              <button
                onClick={nextStep}
                className="btn text-sm px-6 py-2.5 flex items-center gap-2"
              >
                Next Step
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
