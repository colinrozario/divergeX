import Breadcrumbs from '../components/layout/Breadcrumbs';
import ToneAnalyzer from '../components/communication/ToneAnalyzer';
import MessageFormatter from '../components/communication/MessageFormatter';
import { MessageSquare, Lightbulb } from 'lucide-react';

const Communication = () => {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <Breadcrumbs />

        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-500/10 rounded-2xl">
              <MessageSquare className="w-10 h-10 text-blue-500" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-[var(--text-primary)]">Communication Tools</h1>
          </div>
          <p className="text-xl text-[var(--text-secondary)] max-w-2xl">
            Enhance your communication with AI-powered tone analysis and message formatting.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <ToneAnalyzer />
          <MessageFormatter />
        </div>

        <div className="mt-12 bg-blue-500/5 border border-blue-500/10 rounded-3xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <Lightbulb className="w-6 h-6 text-blue-500" />
            <h3 className="font-bold text-[var(--text-primary)] text-xl">Pro Tips</h3>
          </div>
          <ul className="space-y-3 text-[var(--text-secondary)]">
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span>Add context to get more accurate tone analysis</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span>Try different target tones to see how your message changes</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span>Use the copy button to quickly paste formatted messages</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Communication;
