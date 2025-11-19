import Breadcrumbs from '../components/layout/Breadcrumbs';
import TextProcessor from '../components/learning/TextProcessor';
import { BookOpen, HelpCircle } from 'lucide-react';

const Learning = () => {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <Breadcrumbs />

        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-purple-500/10 rounded-2xl">
              <BookOpen className="w-10 h-10 text-purple-500" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-[var(--text-primary)]">Learning Assistance</h1>
          </div>
          <p className="text-xl text-[var(--text-secondary)] max-w-2xl">
            Simplify complex content and adapt it to your learning style.
          </p>
        </div>

        <div className="max-w-4xl">
          <TextProcessor />
        </div>

        <div className="mt-12 max-w-4xl bg-green-500/5 border border-green-500/10 rounded-3xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <HelpCircle className="w-6 h-6 text-green-500" />
            <h3 className="font-bold text-[var(--text-primary)] text-xl">How to Use</h3>
          </div>
          <ul className="space-y-3 text-[var(--text-secondary)]">
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">•</span>
              <span>Paste any complex text you want to understand better</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">•</span>
              <span>Adjust the reading level slider to match your comfort zone</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">•</span>
              <span>Select the domain type for more accurate simplification</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">•</span>
              <span>Review key points and vocabulary definitions for better comprehension</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Learning;
