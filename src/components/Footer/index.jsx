import { ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-[rgba(255,255,255,0.06)] no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-white flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.5 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" />
                </svg>
              </div>
              <span className="text-white font-bold text-sm">ResumeAI</span>
            </div>
            <p className="text-gray-500 text-xs leading-relaxed">
              Build resumes that get interviews.
            </p>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold mb-3">Product</h4>
            <ul className="space-y-2">
              {['Features', 'Templates', 'Pricing', 'FAQ'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-500 text-xs hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="sm:text-right">
            <p className="text-sm text-gray-400">
              Built by{' '}
              <span className="font-semibold text-white">Satya Prakash</span>
            </p>
            <p className="text-xs text-gray-500 mt-1">
              satya.prakash@digitalheroes.com
            </p>
            <a
              href="https://digitalheroesco.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-3 px-4 py-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-gray-300 text-xs font-medium hover:bg-[rgba(255,255,255,0.08)] transition-all"
            >
              Built for Digital Heroes
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[rgba(255,255,255,0.06)] text-center">
          <p className="text-gray-600 text-xs">
            &copy; {new Date().getFullYear()} ResumeAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
