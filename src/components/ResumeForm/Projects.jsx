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
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 shadow-lg shadow-rose-200">
            <FolderGit2 className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-800">Projects</h2>
        </div>
      </div>

      {projects.map((project, index) => (
        <div
          key={index}
          className="p-5 rounded-xl border border-gray-200 bg-gray-50/50 space-y-4 relative"
        >
          {projects.length > 1 && (
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="absolute top-4 right-4 p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {fields.map(({ label, field }) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-600 mb-1.5">
                  {label}
                </label>
                <input
                  type="text"
                  value={project[field]}
                  onChange={(e) => onChange(index, field, e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-800 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition-all duration-200 text-sm"
                />
              </div>
            ))}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1.5">
              Description
            </label>
            <textarea
              value={project.description}
              onChange={(e) => onChange(index, 'description', e.target.value)}
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-800 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition-all duration-200 text-sm resize-none"
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={onAdd}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-dashed border-gray-300 text-gray-500 font-medium text-sm hover:border-rose-400 hover:text-rose-600 hover:bg-rose-50/50 transition-all duration-200 w-full justify-center"
      >
        <Plus className="w-4 h-4" />
        Add Project
      </button>
    </div>
  );
}
