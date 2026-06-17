import { forwardRef } from 'react';
import { Mail, Phone, MapPin, Link, Globe } from 'lucide-react';

const ResumePreview = forwardRef(function ResumePreview({ data }, ref) {
  const { personalInfo, education, skills, experiences, projects } = data;
  const hasAnyData = personalInfo.fullName || education.degree || skills.length > 0 ||
    experiences.some(e => e.company) || projects.some(p => p.name);

  if (!hasAnyData) {
    return (
      <div className="flex items-center justify-center h-full min-h-[500px] bg-white rounded-2xl border border-gray-200">
        <div className="text-center p-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-violet-100 to-purple-100 flex items-center justify-center">
            <svg className="w-8 h-8 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-1">No Content Yet</h3>
          <p className="text-sm text-gray-400">Fill in the form to see your resume preview</p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
    >
      <div className="p-8 space-y-6 preview-section">

        {personalInfo.fullName && (
          <div className="text-center pb-4 border-b border-gray-100">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              {personalInfo.fullName}
            </h1>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-gray-500 mt-2">
              {personalInfo.email && (
                <span className="flex items-center gap-1">
                  <Mail className="w-3 h-3" />
                  {personalInfo.email}
                </span>
              )}
              {personalInfo.phone && (
                <span className="flex items-center gap-1">
                  <Phone className="w-3 h-3" />
                  {personalInfo.phone}
                </span>
              )}
              {personalInfo.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {personalInfo.location}
                </span>
              )}
            </div>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-1">
              {personalInfo.linkedin && (
                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-violet-600 hover:underline">
                  <Link className="w-3 h-3" />
                  LinkedIn
                </a>
              )}
              {personalInfo.github && (
                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-violet-600 hover:underline">
                  <Globe className="w-3 h-3" />
                  GitHub
                </a>
              )}
            </div>
          </div>
        )}

        {education.degree && (
          <div>
            <h3>Education</h3>
            <p className="font-semibold text-gray-800">{education.degree}</p>
            <p className="text-gray-600">{education.institution}</p>
            <div className="flex gap-4 text-gray-500 mt-0.5">
              {education.year && <span>{education.year}</span>}
              {education.cgpa && <span>{education.cgpa}</span>}
            </div>
          </div>
        )}

        {skills.length > 0 && (
          <div>
            <h3>Skills</h3>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-700 text-xs font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {experiences.filter(e => e.company).length > 0 && (
          <div>
            <h3>Experience</h3>
            <div className="space-y-3">
              {experiences.filter(e => e.company).map((exp, i) => (
                <div key={i}>
                  <div className="flex justify-between items-baseline">
                    <p className="font-semibold text-gray-800">{exp.role}</p>
                    {exp.duration && <p className="text-gray-400 text-xs">{exp.duration}</p>}
                  </div>
                  <p className="text-gray-600 text-xs font-medium">{exp.company}</p>
                  {exp.description && (
                    <p className="text-gray-600 mt-0.5 text-xs">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {projects.filter(p => p.name).length > 0 && (
          <div>
            <h3>Projects</h3>
            <div className="space-y-3">
              {projects.filter(p => p.name).map((project, i) => (
                <div key={i}>
                  <div className="flex justify-between items-baseline">
                    <p className="font-semibold text-gray-800">{project.name}</p>
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-violet-600 hover:underline text-xs"
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                  {project.technologies && (
                    <p className="text-gray-500 text-xs">{project.technologies}</p>
                  )}
                  {project.description && (
                    <p className="text-gray-600 mt-0.5 text-xs">{project.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-gray-100">
          <p className="text-[10px] text-gray-400 italic text-center">
            This Resume Builder was created as part of a developer trial task.
          </p>
        </div>
      </div>
    </div>
  );
});

export default ResumePreview;
