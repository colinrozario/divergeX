import Breadcrumbs from '../components/layout/Breadcrumbs';
import TextProcessor from '../components/learning/TextProcessor';

const Learning = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs />
      
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-4xl">📚</span>
          <h1 className="text-4xl font-bold text-gray-900">Learning Assistance</h1>
        </div>
        <p className="text-lg text-gray-600">
          Simplify complex content and adapt it to your learning style
        </p>
      </div>

      <div className="max-w-4xl">
        <TextProcessor />
      </div>

      <div className="mt-8 max-w-4xl bg-green-50 border border-green-200 rounded-lg p-6">
        <h3 className="font-semibold text-green-900 mb-2">📖 How to Use</h3>
        <ul className="space-y-2 text-sm text-green-800">
          <li>• Paste any complex text you want to understand better</li>
          <li>• Adjust the reading level slider to match your comfort zone</li>
          <li>• Select the domain type for more accurate simplification</li>
          <li>• Review key points and vocabulary definitions for better comprehension</li>
        </ul>
      </div>
    </div>
  );
};

export default Learning;
