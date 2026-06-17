import PersonalInfo from './PersonalInfo';
import Education from './Education';
import Skills from './Skills';
import Experience from './Experience';
import Projects from './Projects';
import { FileDown } from 'lucide-react';

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
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Resume Builder
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Fill in your details and see a live preview
          </p>
        </div>
        <button
          type="button"
          onClick={onDownloadPDF}
          disabled={isDownloading}
          className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-medium text-sm hover:from-violet-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-violet-200"
        >
          <FileDown className="w-4 h-4" />
          {isDownloading ? 'Downloading...' : 'Download PDF'}
        </button>
      </div>

      <div className="space-y-8">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <PersonalInfo data={data.personalInfo} onChange={onUpdatePersonalInfo} />
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <Education data={data.education} onChange={onUpdateEducation} />
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <Skills
            skills={data.skills}
            onAdd={onAddSkill}
            onRemove={onRemoveSkill}
          />
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <Experience
            experiences={data.experiences}
            onChange={onUpdateExperience}
            onAdd={onAddExperience}
            onRemove={onRemoveExperience}
          />
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <Projects
            projects={data.projects}
            onChange={onUpdateProject}
            onAdd={onAddProject}
            onRemove={onRemoveProject}
          />
        </div>

        <div className="sm:hidden">
          <button
            type="button"
            onClick={onDownloadPDF}
            disabled={isDownloading}
            className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-medium text-sm hover:from-violet-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-violet-200"
          >
            <FileDown className="w-4 h-4" />
            {isDownloading ? 'Downloading...' : 'Download PDF'}
          </button>
        </div>
      </div>
    </div>
  );
}
