import { useState } from 'react';
import { processText } from '../../services/api';
import { useToast } from '../shared/ToastContainer';
import Card from '../shared/Card';
import Button from '../shared/Button';
import LoadingSpinner from '../shared/LoadingSpinner';
import EmptyState from '../shared/EmptyState';

const TextProcessor = () => {
  const [text, setText] = useState('');
  const [readingLevel, setReadingLevel] = useState(8);
  const [domainType, setDomainType] = useState('general');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleProcess = async () => {
    if (!text.trim()) {
      toast.warning('Please enter text to simplify');
      return;
    }
    
    setLoading(true);
    try {
      const response = await processText({ text, readingLevel, domainType });
      setResult(response.data);
      toast.success('Text simplified successfully!');
    } catch (error) {
      console.error('Processing failed:', error);
      toast.error('Failed to process text. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setText('');
    setResult(null);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(result.simplifiedText);
      toast.success('Copied to clipboard! 📋');
    } catch (error) {
      toast.error('Failed to copy to clipboard');
    }
  };

  const domainOptions = [
    { value: 'general', label: 'General', icon: '📄', description: 'Everyday content' },
    { value: 'education', label: 'Education', icon: '🎓', description: 'Academic material' },
    { value: 'workplace', label: 'Workplace', icon: '💼', description: 'Professional docs' },
    { value: 'daily-living', label: 'Daily Living', icon: '🏠', description: 'Life skills' },
  ];

  const getReadingLevelLabel = (level) => {
    if (level <= 5) return 'Elementary';
    if (level <= 8) return 'Middle School';
    if (level <= 10) return 'High School';
    return 'Advanced';
  };

  return (
    <Card>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">📖 Text Simplifier</h2>
          {(text || result) && (
            <Button variant="secondary" size="sm" onClick={handleClear}>
              Clear
            </Button>
          )}
        </div>

        <div>
          <label htmlFor="input-text" className="block text-sm font-medium text-gray-700 mb-2">
            Text to Simplify *
          </label>
          <textarea
            id="input-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste complex text here..."
            rows={8}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus-visible-ring resize-none font-mono text-sm"
          />
          <p className="text-xs text-gray-500 mt-1">{text.length} characters • {text.split(/\s+/).filter(w => w).length} words</p>
        </div>

        <div>
          <label htmlFor="reading-level" className="block text-sm font-medium text-gray-700 mb-3">
            Target Reading Level: <span className="text-blue-600 font-bold">Grade {readingLevel}</span> ({getReadingLevelLabel(readingLevel)})
          </label>
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-600 font-medium">Grade 3</span>
            <input
              id="reading-level"
              type="range"
              min="3"
              max="12"
              value={readingLevel}
              onChange={(e) => setReadingLevel(parseInt(e.target.value))}
              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <span className="text-xs text-gray-600 font-medium">Grade 12</span>
          </div>
          <div className="mt-2 flex justify-between text-xs text-gray-500">
            <span>Simpler</span>
            <span>More Complex</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Domain Type
          </label>
          <div className="grid grid-cols-2 gap-2">
            {domainOptions.map(option => (
              <button
                key={option.value}
                onClick={() => setDomainType(option.value)}
                className={`p-3 rounded-lg border-2 text-left transition-all ${
                  domainType === option.value
                    ? 'border-green-500 bg-green-50'
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
          onClick={handleProcess} 
          disabled={loading || !text.trim()}
          className="w-full"
        >
          {loading ? '🔄 Processing...' : '🚀 Simplify Text'}
        </Button>

        {loading && (
          <div className="py-8">
            <LoadingSpinner size="lg" />
            <p className="text-center text-gray-600 mt-4">Simplifying your text...</p>
          </div>
        )}

        {result && !loading && (
          <div className="mt-6 space-y-4 animate-fade-in">
            <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-xl border-2 border-green-300">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-green-900 text-lg flex items-center gap-2">
                  <span>✨</span> Simplified Text
                </h4>
                <Button variant="secondary" size="sm" onClick={copyToClipboard}>
                  📋 Copy
                </Button>
              </div>
              <p className="text-gray-900 whitespace-pre-wrap leading-relaxed">{result.simplifiedText}</p>
            </div>

            {result.keyPoints && result.keyPoints.length > 0 && (
              <div className="bg-blue-50 p-5 rounded-xl border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                  <span>🎯</span> Key Points
                </h4>
                <ul className="space-y-2">
                  {result.keyPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold mt-0.5">{index + 1}.</span>
                      <span className="text-gray-700 flex-1">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {result.vocabulary && result.vocabulary.length > 0 && (
              <div className="bg-purple-50 p-5 rounded-xl border border-purple-200">
                <h4 className="font-semibold text-purple-900 mb-3 flex items-center gap-2">
                  <span>📚</span> Vocabulary Help
                </h4>
                <dl className="space-y-3">
                  {result.vocabulary.map((item, index) => (
                    <div key={index} className="bg-white p-3 rounded-lg border border-purple-100">
                      <dt className="font-bold text-purple-900 mb-1">{item.word}</dt>
                      <dd className="text-gray-700 text-sm">{item.definition}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {result.chunks && result.chunks.length > 1 && (
              <div className="bg-yellow-50 p-5 rounded-xl border border-yellow-200">
                <h4 className="font-semibold text-yellow-900 mb-3 flex items-center gap-2">
                  <span>📑</span> Text Chunks ({result.chunks.length} sections)
                </h4>
                <p className="text-sm text-yellow-800 mb-3">The text has been broken into smaller, manageable sections:</p>
                <div className="space-y-3">
                  {result.chunks.map((chunk, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg border border-yellow-200">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-yellow-200 text-yellow-900 px-2 py-1 rounded text-xs font-bold">
                          Section {index + 1}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">{chunk}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {!result && !loading && !text && (
          <EmptyState
            icon="📖"
            title="Ready to simplify"
            description="Paste any complex text above and adjust the reading level to your preference"
          />
        )}
      </div>
    </Card>
  );
};

export default TextProcessor;
