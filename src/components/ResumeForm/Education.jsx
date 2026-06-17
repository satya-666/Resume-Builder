import { GraduationCap } from 'lucide-react';

const fields = [
  { label: 'Degree', field: 'degree' },
  { label: 'Institution', field: 'institution' },
  { label: 'Year', field: 'year' },
  { label: 'CGPA / Percentage', field: 'cgpa' },
];

export default function Education({ data, onChange }) {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-white">
          <GraduationCap className="w-5 h-5 text-black" />
        </div>
        <h2 className="text-xl font-bold text-white">Education</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {fields.map(({ label, field }) => (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-400 mb-1.5">
              {label}
            </label>
            <input
              type="text"
              value={data[field]}
              onChange={(e) => onChange(field, e.target.value)}
              className="w-full px-4 py-2.5 input text-sm"
              placeholder={`Enter ${label.toLowerCase()}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
