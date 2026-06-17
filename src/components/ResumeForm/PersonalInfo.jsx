import { User, Mail, Phone, MapPin, Link, Globe } from 'lucide-react';

const fields = [
  { label: 'Full Name', field: 'fullName', type: 'text', icon: User },
  { label: 'Email', field: 'email', type: 'email', icon: Mail },
  { label: 'Phone', field: 'phone', type: 'tel', icon: Phone },
  { label: 'Location', field: 'location', type: 'text', icon: MapPin },
  { label: 'LinkedIn URL', field: 'linkedin', type: 'url', icon: Link },
  { label: 'GitHub URL', field: 'github', type: 'url', icon: Globe },
];

export default function PersonalInfo({ data, onChange }) {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-white">
          <User className="w-5 h-5 text-black" />
        </div>
        <h2 className="text-xl font-bold text-white">Personal Information</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {fields.map(({ label, field, type, icon: Icon }) => (
          <div key={field} className={field === 'fullName' ? 'md:col-span-2' : ''}>
            <label className="block text-sm font-medium text-gray-400 mb-1.5">
              {label}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                <Icon className="w-4 h-4" />
              </div>
              <input
                type={type}
                value={data[field]}
                onChange={(e) => onChange(field, e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 input text-sm"
                placeholder={`Enter ${label.toLowerCase()}`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
