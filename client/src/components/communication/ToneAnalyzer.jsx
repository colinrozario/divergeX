import { useState } from 'react';
import { analyzeTone } from '../../services/api';
import { useToast } from '../shared/ToastContainer';
import Card from '../shared/Card';
import Button from '../shared/Button';
import LoadingSpinner from '../shared/LoadingSpinner';
import EmptyState from '../shared/EmptyState';
import { Smile, Briefcase, AlertCircle, Shield, Meh, MessageSquare, RefreshCw, Search, Lightbulb, Sparkles, BarChart2 } from 'lucide-react';

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
      friendly: 'bg-green-500/10 text-green-600 border-green-500/20',
      formal: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
      anxious: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
      confident: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
      neutral: 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] border-[var(--border-default)]',
    };
    return colors[tone] || colors.neutral;
  };

  const getToneIcon = (tone) => {
    const icons = {
      friendly: <Smile className="w-5 h-5" />,
      formal: <Briefcase className="w-5 h-5" />,
      anxious: <AlertCircle className="w-5 h-5" />,
      confident: <Shield className="w-5 h-5" />,
      neutral: <Meh className="w-5 h-5" />,
    };
    return icons[tone] || <MessageSquare className="w-5 h-5" />;
  };

  return (
    <Card>
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <BarChart2 className="w-6 h-6 text-blue-500" />
            <h2 className="text-xl font-bold text-[var(--text-primary)]">Tone Analyzer</h2>
          </div>
          {(text || analysis) && (
            <Button variant="secondary" size="sm" onClick={handleClear}>
              Clear
            </Button>
          )}
        </div>

        <div>
          <label htmlFor="message-text" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
            Message to Analyze *
          </label>
          <textarea
            id="message-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter the message you want to analyze..."
            rows={5}
            className="w-full px-4 py-3 bg-[var(--bg-secondary)] border-2 border-[var(--border-default)] rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none text-[var(--text-primary)] placeholder-[var(--text-tertiary)]"
          />
          <p className="text-xs text-[var(--text-tertiary)] mt-1">{text.length} characters</p>
        </div>

        <div>
          <label htmlFor="context-text" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
            Context (Optional)
          </label>
          <input
            id="context-text"
            type="text"
            value={context}
            onChange={(e) => setContext(e.target.value)}
            placeholder="e.g., work email, text to friend, social media post"
            className="w-full px-4 py-3 bg-[var(--bg-secondary)] border-2 border-[var(--border-default)] rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-[var(--text-primary)] placeholder-[var(--text-tertiary)]"
          />
        </div>

        <Button
          onClick={handleAnalyze}
          disabled={loading || !text.trim()}
          className="w-full flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Search className="w-4 h-4" />
              Analyze Tone
            </>
          )}
        </Button>

        {loading && (
          <div className="py-8">
            <LoadingSpinner size="lg" />
            <p className="text-center text-[var(--text-secondary)] mt-4">Analyzing your message...</p>
          </div>
        )}

        {analysis && !loading && (
          <div className="mt-6 space-y-4 animate-fade-in">
            <div className="bg-gradient-to-r from-blue-500/5 to-purple-500/5 p-4 rounded-xl border-2 border-blue-500/10">
              <h4 className="font-semibold text-[var(--text-primary)] mb-3 flex items-center gap-2">
                {getToneIcon(analysis.tone)}
                Analysis Results
              </h4>
              <div className="flex gap-2 flex-wrap">
                <span className={`px-4 py-2 rounded-full text-sm font-medium border-2 flex items-center gap-2 ${getToneColor(analysis.tone)}`}>
                  Tone: {analysis.tone}
                </span>
                <span className={`px-4 py-2 rounded-full text-sm font-medium border-2 flex items-center gap-2 ${analysis.sentiment === 'positive' ? 'bg-green-500/10 text-green-600 border-green-500/20' :
                    analysis.sentiment === 'negative' ? 'bg-red-500/10 text-red-600 border-red-500/20' :
                      'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] border-[var(--border-default)]'
                  }`}>
                  {analysis.sentiment === 'positive' ? <Smile className="w-4 h-4" /> : analysis.sentiment === 'negative' ? <Meh className="w-4 h-4" /> : <Meh className="w-4 h-4" />}
                  {analysis.sentiment}
                </span>
                <span className="px-4 py-2 rounded-full text-sm font-medium bg-blue-500/10 text-blue-600 border-2 border-blue-500/20">
                  📍 {analysis.socialContext}
                </span>
              </div>
            </div>

            <div className="bg-blue-500/5 p-5 rounded-xl border border-blue-500/10">
              <h4 className="font-semibold text-blue-600 mb-2 flex items-center gap-2">
                <Lightbulb className="w-5 h-5" /> Interpretation
              </h4>
              <p className="text-[var(--text-secondary)] leading-relaxed">{analysis.interpretation}</p>
            </div>

            {analysis.suggestions && analysis.suggestions.length > 0 && (
              <div className="bg-green-500/5 p-5 rounded-xl border border-green-500/10">
                <h4 className="font-semibold text-green-600 mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5" /> Suggestions for Improvement
                </h4>
                <ul className="space-y-2">
                  {analysis.suggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-start gap-2 text-[var(--text-secondary)]">
                      <span className="text-green-500 font-bold mt-0.5">→</span>
                      <span>{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex items-center justify-between p-4 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-default)]">
              <span className="text-sm font-medium text-[var(--text-secondary)]">Confidence Level</span>
              <div className="flex items-center gap-3">
                <div className="w-32 h-2 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all"
                    style={{ width: `${analysis.confidence}%` }}
                  />
                </div>
                <span className="text-sm font-bold text-[var(--text-primary)]">{analysis.confidence}%</span>
              </div>
            </div>
          </div>
        )}

        {!analysis && !loading && !text && (
          <EmptyState
            icon={<BarChart2 className="w-12 h-12 text-[var(--text-tertiary)]" />}
            title="Ready to analyze"
            description="Enter a message above to understand its tone and sentiment"
          />
        )}
      </div>
    </Card>
  );
};

export default ToneAnalyzer;
