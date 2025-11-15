import Breadcrumbs from '../components/layout/Breadcrumbs';
import TextProcessor from '../components/learning/TextProcessor';

const Learning = () => {
  return (
    <div className="min-h-screen bg-neutral-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <Breadcrumbs />
        
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">📚</span>
            <h1 className="text-5xl font-bold text-gray-900">Learning Assistance</h1>
          </div>
          <p className="text-xl text-gray-600">
            Simplify complex content and adapt it to your learning style
          </p>
        </div>

        <div className="max-w-4xl">
          <TextProcessor />
        </div>

        <div className="mt-8 max-w-4xl bg-green-50 rounded-3xl p-8">
          <h3 className="font-bold text-green-900 mb-4 text-xl">📖 How to Use</h3>
          <ul className="space-y-3 text-green-800">
            <li>• Paste any complex text you want to understand better</li>
            <li>• Adjust the reading level slider to match your comfort zone</li>
            <li>• Select the domain type for more accurate simplification</li>
            <li>• Review key points and vocabulary definitions for better comprehension</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Learning;
