import { useState } from 'react';
import { processText } from '../../services/api';
import { useToast } from '../shared/ToastContainer';
import Card from '../shared/Card';
import Button from '../shared/Button';
import LoadingSpinner from '../shared/LoadingSpinner';
import EmptyState from '../shared/EmptyState';
import { BookOpen, FileText, GraduationCap, Briefcase, Home, RefreshCw, Copy, Sparkles, Target, Book, Layers, ArrowRight } from 'lucide-react';

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
    { value: 'general', label: 'General', icon: FileText, description: 'Everyday content' },
    { value: 'education', label: 'Education', icon: GraduationCap, description: 'Academic material' },
    { value: 'workplace', label: 'Workplace', icon: Briefcase, description: 'Professional docs' },
    { value: 'daily-living', label: 'Daily Living', icon: Home, description: 'Life skills' },
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
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-blue-500" />
            <h2 className="text-2xl font-bold text-[var(--text-primary)]">Text Simplifier</h2>
          </div>
          {(text || result) && (
            <Button variant="secondary" size="sm" onClick={handleClear}>
              Clear
            </Button>
          )}
        </div>

        <div>
          <label htmlFor="input-text" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
            Text to Simplify *
          </label>
          <textarea
            id="input-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste complex text here..."
            rows={8}
            className="w-full px-4 py-3 bg-[var(--bg-secondary)] border-2 border-[var(--border-default)] rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none font-mono text-sm text-[var(--text-primary)] placeholder-[var(--text-tertiary)]"
          />
          <p className="text-xs text-[var(--text-tertiary)] mt-1">{text.length} characters • {text.split(/\s+/).filter(w => w).length} words</p>
        </div>

        <div>
          <label htmlFor="reading-level" className="block text-sm font-medium text-[var(--text-secondary)] mb-3">
            Target Reading Level: <span className="text-blue-500 font-bold">Grade {readingLevel}</span> ({getReadingLevelLabel(readingLevel)})
          </label>
          <div className="flex items-center gap-4">
            <span className="text-xs text-[var(--text-secondary)] font-medium">Grade 3</span>
            <input
              id="reading-level"
              type="range"
              min="3"
              max="12"
              value={readingLevel}
              onChange={(e) => setReadingLevel(parseInt(e.target.value))}
              className="flex-1 h-2 bg-[var(--bg-tertiary)] rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <span className="text-xs text-[var(--text-secondary)] font-medium">Grade 12</span>
          </div>
          <div className="mt-2 flex justify-between text-xs text-[var(--text-tertiary)]">
            <span>Simpler</span>
            <span>More Complex</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
            Domain Type
          </label>
          <div className="grid grid-cols-2 gap-2">
            {domainOptions.map(option => (
              <button
                key={option.value}
                onClick={() => setDomainType(option.value)}
                className={`p-3 rounded-lg border-2 text-left transition-all ${domainType === option.value
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-[var(--border-subtle)] hover:border-[var(--border-default)] bg-[var(--bg-secondary)]'
                  }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <option.icon className={`w-5 h-5 ${domainType === option.value ? 'text-blue-500' : 'text-[var(--text-secondary)]'}`} />
                  <span className={`font-medium ${domainType === option.value ? 'text-blue-500' : 'text-[var(--text-primary)]'}`}>{option.label}</span>
                </div>
                <p className="text-xs text-[var(--text-secondary)]">{option.description}</p>
              </button>
            ))}
          </div>
        </div>

        <Button
          onClick={handleProcess}
          disabled={loading || !text.trim()}
          className="w-full flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Simplify Text
            </>
          )}
        </Button>

        {loading && (
          <div className="py-8">
            <LoadingSpinner size="lg" />
            <p className="text-center text-[var(--text-secondary)] mt-4">Simplifying your text...</p>
          </div>
        )}

        {result && !loading && (
          <div className="mt-6 space-y-4 animate-fade-in">
            <div className="bg-gradient-to-br from-green-500/5 to-blue-500/5 p-6 rounded-xl border-2 border-green-500/20">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-green-600 text-lg flex items-center gap-2">
                  <Sparkles className="w-5 h-5" /> Simplified Text
                </h4>
                <Button variant="secondary" size="sm" onClick={copyToClipboard} className="flex items-center gap-2">
                  <Copy className="w-4 h-4" /> Copy
                </Button>
              </div>
              <p className="text-[var(--text-primary)] whitespace-pre-wrap leading-relaxed">{result.simplifiedText}</p>
            </div>

            {result.keyPoints && result.keyPoints.length > 0 && (
              <div className="bg-blue-500/5 p-5 rounded-xl border border-blue-500/10">
                <h4 className="font-semibold text-blue-600 mb-3 flex items-center gap-2">
                  <Target className="w-5 h-5" /> Key Points
                </h4>
                <ul className="space-y-2">
                  {result.keyPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-blue-500 font-bold mt-0.5">{index + 1}.</span>
                      <span className="text-[var(--text-secondary)] flex-1">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {result.vocabulary && result.vocabulary.length > 0 && (
              <div className="bg-purple-500/5 p-5 rounded-xl border border-purple-500/10">
                <h4 className="font-semibold text-purple-600 mb-3 flex items-center gap-2">
                  <Book className="w-5 h-5" /> Vocabulary Help
                </h4>
                <dl className="space-y-3">
                  {result.vocabulary.map((item, index) => (
                    <div key={index} className="bg-[var(--bg-primary)] p-3 rounded-lg border border-purple-500/10">
                      <dt className="font-bold text-purple-600 mb-1">{item.word}</dt>
                      <dd className="text-[var(--text-secondary)] text-sm">{item.definition}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {result.chunks && result.chunks.length > 1 && (
              <div className="bg-yellow-500/5 p-5 rounded-xl border border-yellow-500/10">
                <h4 className="font-semibold text-yellow-600 mb-3 flex items-center gap-2">
                  <Layers className="w-5 h-5" /> Text Chunks ({result.chunks.length} sections)
                </h4>
                <p className="text-sm text-[var(--text-secondary)] mb-3">The text has been broken into smaller, manageable sections:</p>
                <div className="space-y-3">
                  {result.chunks.map((chunk, index) => (
                    <div key={index} className="bg-[var(--bg-primary)] p-4 rounded-lg border border-yellow-500/10">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-yellow-500/10 text-yellow-600 px-2 py-1 rounded text-xs font-bold border border-yellow-500/20">
                          Section {index + 1}
                        </span>
                      </div>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{chunk}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {!result && !loading && !text && (
          <EmptyState
            icon={<BookOpen className="w-12 h-12 text-[var(--text-tertiary)]" />}
            title="Ready to simplify"
            description="Paste any complex text above and adjust the reading level to your preference"
          />
        )}
      </div>
    </Card>
  );
};

export default TextProcessor;
