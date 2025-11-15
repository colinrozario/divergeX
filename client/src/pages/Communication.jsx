import Breadcrumbs from '../components/layout/Breadcrumbs';
import ToneAnalyzer from '../components/communication/ToneAnalyzer';
import MessageFormatter from '../components/communication/MessageFormatter';

const Communication = () => {
  return (
    <div className="min-h-screen bg-neutral-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <Breadcrumbs />
        
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">💬</span>
            <h1 className="text-5xl font-bold text-gray-900">Communication Tools</h1>
          </div>
          <p className="text-xl text-gray-600">
            Enhance your communication with AI-powered tone analysis and message formatting
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <ToneAnalyzer />
          <MessageFormatter />
        </div>

        <div className="mt-8 bg-blue-50 rounded-3xl p-8">
          <h3 className="font-bold text-blue-900 mb-4 text-xl">💡 Pro Tips</h3>
          <ul className="space-y-3 text-blue-800">
            <li>• Add context to get more accurate tone analysis</li>
            <li>• Try different target tones to see how your message changes</li>
            <li>• Use the copy button to quickly paste formatted messages</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Communication;
