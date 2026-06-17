import { FolderGit2, Plus, Trash2 } from 'lucide-react';

const fields = [
  { label: 'Project Name', field: 'name' },
  { label: 'Technologies Used', field: 'technologies' },
  { label: 'GitHub Link', field: 'githubLink' },
];

export default function Projects({ projects, onChange, onAdd, onRemove }) {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-white">
            <FolderGit2 className="w-5 h-5 text-black" />
          </div>
          <h2 className="text-xl font-bold text-white">Projects</h2>
        </div>
      </div>

      {projects.map((project, index) => (
        <div
          key={index}
          className="p-5 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] space-y-4 relative"
        >
          {projects.length > 1 && (
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="absolute top-4 right-4 p-2 text-gray-500 hover:text-white hover:bg-[rgba(255,255,255,0.1)] transition-all"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {fields.map(({ label, field }) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">
                  {label}
                </label>
                <input
                  type="text"
                  value={project[field]}
                  onChange={(e) => onChange(index, field, e.target.value)}
                  className="w-full px-4 py-2.5 input text-sm"
                  placeholder={`Enter ${label.toLowerCase()}`}
                />
              </div>
            ))}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1.5">
              Description
            </label>
            <textarea
              value={project.description}
              onChange={(e) => onChange(index, 'description', e.target.value)}
              rows={3}
              className="w-full px-4 py-2.5 input text-sm resize-none"
              placeholder="Describe your project..."
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={onAdd}
        className="flex items-center gap-2 px-5 py-2.5 border-2 border-dashed border-[rgba(255,255,255,0.08)] text-gray-500 font-medium text-sm hover:border-[rgba(255,255,255,0.2)] hover:text-white hover:bg-[rgba(255,255,255,0.03)] transition-all duration-200 w-full justify-center"
      >
        <Plus className="w-4 h-4" />
        Add Project
      </button>
    </div>
  );
}
