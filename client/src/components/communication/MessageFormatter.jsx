import { useState } from 'react';
import { formatMessage } from '../../services/api';
import { useToast } from '../shared/ToastContainer';
import Card from '../shared/Card';
import Button from '../shared/Button';
import LoadingSpinner from '../shared/LoadingSpinner';
import EmptyState from '../shared/EmptyState';

const MessageFormatter = () => {
  const [text, setText] = useState('');
  const [targetTone, setTargetTone] = useState('professional');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleFormat = async () => {
    if (!text.trim()) {
      toast.warning('Please enter a message to format');
      return;
    }
    
    setLoading(true);
    try {
      const response = await formatMessage({ text, targetTone });
      setResult(response.data);
      toast.success('Message formatted successfully!');
    } catch (error) {
      console.error('Formatting failed:', error);
      toast.error('Failed to format message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(result.formattedMessage);
      toast.success('Copied to clipboard! 📋');
    } catch (error) {
      toast.error('Failed to copy to clipboard');
    }
  };

  const handleClear = () => {
    setText('');
    setResult(null);
  };

  const toneOptions = [
    { value: 'professional', label: 'Professional', icon: '👔', description: 'Business-appropriate' },
    { value: 'friendly', label: 'Friendly', icon: '😊', description: 'Warm and approachable' },
    { value: 'formal', label: 'Formal', icon: '🎩', description: 'Very polite and proper' },
    { value: 'casual', label: 'Casual', icon: '😎', description: 'Relaxed and informal' },
  ];

  return (
    <Card>
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">✨ Message Formatter</h2>
          {(text || result) && (
            <Button variant="secondary" size="sm" onClick={handleClear}>
              Clear
            </Button>
          )}
        </div>

        <div>
          <label htmlFor="original-message" className="block text-sm font-medium text-gray-700 mb-2">
            Original Message *
          </label>
          <textarea
            id="original-message"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your message here..."
            rows={5}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus-visible-ring resize-none"
          />
          <p className="text-xs text-gray-500 mt-1">{text.length} characters</p>
        </div>

        <div>
          <label htmlFor="target-tone" className="block text-sm font-medium text-gray-700 mb-2">
            Target Tone
          </label>
          <div className="grid grid-cols-2 gap-2">
            {toneOptions.map(option => (
              <button
                key={option.value}
                onClick={() => setTargetTone(option.value)}
                className={`p-3 rounded-lg border-2 text-left transition-all ${
                  targetTone === option.value
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{option.icon}</span>
                  <span className="font-medium text-gray-900">{option.label}</span>
                </div>
                <p className="text-xs text-gray-600">{option.description}</p>
              </button>
            ))}
          </div>
        </div>

        <Button 
          onClick={handleFormat} 
          disabled={loading || !text.trim()}
          className="w-full"
        >
          {loading ? '🔄 Formatting...' : '✨ Format Message'}
        </Button>

        {loading && (
          <div className="py-8">
            <LoadingSpinner size="lg" />
            <p className="text-center text-gray-600 mt-4">Formatting your message...</p>
          </div>
        )}

        {result && !loading && (
          <div className="mt-6 space-y-4 animate-fade-in">
            <div className="grid gap-4">
              <div className="bg-gray-50 p-5 rounded-xl border-2 border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-900">📝 Original</h4>
                </div>
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{text}</p>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-blue-50 p-5 rounded-xl border-2 border-green-300">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-green-900">✨ Improved</h4>
                  <Button variant="secondary" size="sm" onClick={copyToClipboard}>
                    📋 Copy
                  </Button>
                </div>
                <p className="text-gray-900 whitespace-pre-wrap leading-relaxed font-medium">{result.formattedMessage}</p>
              </div>
            </div>

            {result.changes && result.changes.length > 0 && (
              <div className="bg-blue-50 p-5 rounded-xl border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                  <span>🔄</span> Changes Made
                </h4>
                <ul className="space-y-3">
                  {result.changes.map((change, index) => (
                    <li key={index} className="bg-white p-3 rounded-lg border border-blue-100">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-red-600 line-through text-sm">{change.original}</span>
                        <span className="text-gray-400">→</span>
                        <span className="text-green-600 font-medium text-sm">{change.improved}</span>
                      </div>
                      <p className="text-gray-600 text-xs mt-1 italic">{change.reason}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                <h4 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
                  <span>🎭</span> Tone Adjustments
                </h4>
                <p className="text-gray-700 text-sm leading-relaxed">{result.toneAdjustments}</p>
              </div>

              <div className="bg-orange-50 p-4 rounded-xl border border-orange-200">
                <h4 className="font-semibold text-orange-900 mb-2 flex items-center gap-2">
                  <span>💡</span> Clarity Improvements
                </h4>
                <p className="text-gray-700 text-sm leading-relaxed">{result.clarityImprovements}</p>
              </div>
            </div>
          </div>
        )}

        {!result && !loading && !text && (
          <EmptyState
            icon="✨"
            title="Ready to format"
            description="Enter a message and select a tone to get started"
          />
        )}
      </div>
    </Card>
  );
};

export default MessageFormatter;
