import Breadcrumbs from '../components/layout/Breadcrumbs';
import ToneAnalyzer from '../components/communication/ToneAnalyzer';
import MessageFormatter from '../components/communication/MessageFormatter';

const Communication = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs />
      
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-4xl">💬</span>
          <h1 className="text-4xl font-bold text-gray-900">Communication Tools</h1>
        </div>
        <p className="text-lg text-gray-600">
          Enhance your communication with AI-powered tone analysis and message formatting
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <ToneAnalyzer />
        <MessageFormatter />
      </div>

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 mb-2">💡 Pro Tips</h3>
        <ul className="space-y-2 text-sm text-blue-800">
          <li>• Add context to get more accurate tone analysis</li>
          <li>• Try different target tones to see how your message changes</li>
          <li>• Use the copy button to quickly paste formatted messages</li>
        </ul>
      </div>
    </div>
  );
};

export default Communication;
