import { useState } from 'react';
import { analyzeTone } from '../../services/api';
import { useToast } from '../shared/ToastContainer';
import Card from '../shared/Card';
import Button from '../shared/Button';
import LoadingSpinner from '../shared/LoadingSpinner';
import EmptyState from '../shared/EmptyState';

const ToneAnalyzer = () => {
  const [text, setText] = useState('');
  const [context, setContext] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleAnalyze = async () => {
    if (!text.trim()) {
      toast.warning('Please enter a message to analyze');
      return;
    }
    
    setLoading(true);
    try {
      const response = await analyzeTone({ text, context });
      setAnalysis(response.data);
      toast.success('Analysis complete!');
    } catch (error) {
      console.error('Analysis failed:', error);
      toast.error('Failed to analyze tone. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setText('');
    setContext('');
    setAnalysis(null);
  };

  const getToneColor = (tone) => {
    const colors = {
      friendly: 'bg-green-100 text-green-800 border-green-200',
      formal: 'bg-blue-100 text-blue-800 border-blue-200',
      anxious: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      confident: 'bg-purple-100 text-purple-800 border-purple-200',
      neutral: 'bg-gray-100 text-gray-800 border-gray-200',
    };
    return colors[tone] || colors.neutral;
  };

  const getToneIcon = (tone) => {
    const icons = {
      friendly: '😊',
      formal: '👔',
      anxious: '😰',
      confident: '💪',
      neutral: '😐',
    };
    return icons[tone] || '💬';
  };

  return (
    <Card>
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">🎭 Tone Analyzer</h2>
          {(text || analysis) && (
            <Button variant="secondary" size="sm" onClick={handleClear}>
              Clear
            </Button>
          )}
        </div>

        <div>
          <label htmlFor="message-text" className="block text-sm font-medium text-gray-700 mb-2">
            Message to Analyze *
          </label>
          <textarea
            id="message-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter the message you want to analyze..."
            rows={5}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus-visible-ring resize-none"
          />
          <p className="text-xs text-gray-500 mt-1">{text.length} characters</p>
        </div>

        <div>
          <label htmlFor="context-text" className="block text-sm font-medium text-gray-700 mb-2">
            Context (Optional)
          </label>
          <input
            id="context-text"
            type="text"
            value={context}
            onChange={(e) => setContext(e.target.value)}
            placeholder="e.g., work email, text to friend, social media post"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus-visible-ring"
          />
        </div>

        <Button 
          onClick={handleAnalyze} 
          disabled={loading || !text.trim()}
          className="w-full"
        >
          {loading ? '🔄 Analyzing...' : '🔍 Analyze Tone'}
        </Button>

        {loading && (
          <div className="py-8">
            <LoadingSpinner size="lg" />
            <p className="text-center text-gray-600 mt-4">Analyzing your message...</p>
          </div>
        )}

        {analysis && !loading && (
          <div className="mt-6 space-y-4 animate-fade-in">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl border-2 border-blue-200">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-2xl">{getToneIcon(analysis.tone)}</span>
                Analysis Results
              </h4>
              <div className="flex gap-2 flex-wrap">
                <span className={`px-4 py-2 rounded-full text-sm font-medium border-2 ${getToneColor(analysis.tone)}`}>
                  Tone: {analysis.tone}
                </span>
                <span className={`px-4 py-2 rounded-full text-sm font-medium border-2 ${
                  analysis.sentiment === 'positive' ? 'bg-green-100 text-green-800 border-green-200' :
                  analysis.sentiment === 'negative' ? 'bg-red-100 text-red-800 border-red-200' :
                  'bg-gray-100 text-gray-800 border-gray-200'
                }`}>
                  {analysis.sentiment === 'positive' ? '😊' : analysis.sentiment === 'negative' ? '😟' : '😐'} {analysis.sentiment}
                </span>
                <span className="px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border-2 border-blue-200">
                  📍 {analysis.socialContext}
                </span>
              </div>
            </div>

            <div className="bg-blue-50 p-5 rounded-xl border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                <span>💡</span> Interpretation
              </h4>
              <p className="text-gray-700 leading-relaxed">{analysis.interpretation}</p>
            </div>

            {analysis.suggestions && analysis.suggestions.length > 0 && (
              <div className="bg-green-50 p-5 rounded-xl border border-green-200">
                <h4 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
                  <span>✨</span> Suggestions for Improvement
                </h4>
                <ul className="space-y-2">
                  {analysis.suggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-700">
                      <span className="text-green-600 font-bold mt-0.5">→</span>
                      <span>{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
              <span className="text-sm font-medium text-gray-700">Confidence Level</span>
              <div className="flex items-center gap-3">
                <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all"
                    style={{ width: `${analysis.confidence}%` }}
                  />
                </div>
                <span className="text-sm font-bold text-gray-900">{analysis.confidence}%</span>
              </div>
            </div>
          </div>
        )}

        {!analysis && !loading && !text && (
          <EmptyState
            icon="🎭"
            title="Ready to analyze"
            description="Enter a message above to understand its tone and sentiment"
          />
        )}
      </div>
    </Card>
  );
};

export default ToneAnalyzer;
