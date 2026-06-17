import { useState } from 'react';
import { Sparkles, Plus, X } from 'lucide-react';

export default function Skills({ skills, onAdd, onRemove }) {
  const [input, setInput] = useState('');

  const handleAdd = () => {
    const trimmed = input.trim();
    if (trimmed && !skills.includes(trimmed)) {
      onAdd(trimmed);
      setInput('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-white">
          <Sparkles className="w-5 h-5 text-black" />
        </div>
        <h2 className="text-xl font-bold text-white">Skills</h2>
      </div>

      <div className="flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 px-4 py-2.5 input text-sm"
          placeholder="Type a skill and press Enter..."
        />
        <button
          type="button"
          onClick={handleAdd}
          disabled={!input.trim()}
          className="flex items-center gap-2 px-5 py-2.5 btn text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="w-4 h-4" />
          Add
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {skills.length === 0 && (
          <p className="text-sm text-gray-600 italic w-full text-center py-4">
            No skills added yet. Type a skill and click Add.
          </p>
        )}
        {skills.map((skill, index) => (
          <span
            key={index}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-gray-300 text-sm font-medium group hover:bg-[rgba(255,255,255,0.08)] transition-all duration-200"
          >
            {skill}
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="ml-0.5 p-0.5 text-gray-500 hover:text-white hover:bg-[rgba(255,255,255,0.1)] transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
