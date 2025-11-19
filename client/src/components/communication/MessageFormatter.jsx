import { useState } from 'react';
import { formatMessage } from '../../services/api';
import { useToast } from '../shared/ToastContainer';
import Card from '../shared/Card';
import Button from '../shared/Button';
import LoadingSpinner from '../shared/LoadingSpinner';
import EmptyState from '../shared/EmptyState';
import { Wand2, Briefcase, Smile, Shield, Coffee, RefreshCw, Copy, ArrowRight, Lightbulb, MessageCircle } from 'lucide-react';

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
    { value: 'professional', label: 'Professional', icon: Briefcase, description: 'Business-appropriate' },
    { value: 'friendly', label: 'Friendly', icon: Smile, description: 'Warm and approachable' },
    { value: 'formal', label: 'Formal', icon: Shield, description: 'Very polite and proper' },
    { value: 'casual', label: 'Casual', icon: Coffee, description: 'Relaxed and informal' },
  ];

  return (
    <Card className="h-full">
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Wand2 className="w-6 h-6 text-purple-500" />
            <h2 className="text-xl font-bold text-[var(--text-primary)]">Message Formatter</h2>
          </div>
          {(text || result) && (
            <Button variant="secondary" size="sm" onClick={handleClear}>
              Clear
            </Button>
          )}
        </div>

        <div>
          <label htmlFor="original-message" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
            Original Message *
          </label>
          <textarea
            id="original-message"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your message here..."
            rows={5}
            className="w-full px-4 py-3 bg-[var(--bg-secondary)] border-2 border-[var(--border-default)] rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none text-[var(--text-primary)] placeholder-[var(--text-tertiary)]"
          />
          <p className="text-xs text-[var(--text-tertiary)] mt-1">{text.length} characters</p>
        </div>

        <div>
          <label htmlFor="target-tone" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
            Target Tone
          </label>
          <div className="grid grid-cols-2 gap-2">
            {toneOptions.map(option => (
              <button
                key={option.value}
                onClick={() => setTargetTone(option.value)}
                className={`p-3 rounded-lg border-2 text-left transition-all ${targetTone === option.value
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-[var(--border-subtle)] hover:border-[var(--border-default)] bg-[var(--bg-secondary)]'
                  }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <option.icon className={`w-5 h-5 ${targetTone === option.value ? 'text-blue-500' : 'text-[var(--text-secondary)]'}`} />
                  <span className={`font-medium ${targetTone === option.value ? 'text-blue-500' : 'text-[var(--text-primary)]'}`}>{option.label}</span>
                </div>
                <p className="text-xs text-[var(--text-secondary)]">{option.description}</p>
              </button>
            ))}
          </div>
        </div>

        <Button
          onClick={handleFormat}
          disabled={loading || !text.trim()}
          className="w-full flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              Formatting...
            </>
          ) : (
            <>
              <Wand2 className="w-4 h-4" />
              Format Message
            </>
          )}
        </Button>

        {loading && (
          <div className="py-8">
            <LoadingSpinner size="lg" />
            <p className="text-center text-[var(--text-secondary)] mt-4">Formatting your message...</p>
          </div>
        )}

        {result && !loading && (
          <div className="mt-6 space-y-4 animate-fade-in">
            <div className="grid gap-4">
              <div className="bg-[var(--bg-secondary)] p-5 rounded-xl border-2 border-[var(--border-default)]">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-[var(--text-primary)]">Original</h4>
                </div>
                <p className="text-[var(--text-secondary)] whitespace-pre-wrap leading-relaxed">{text}</p>
              </div>

              <div className="bg-gradient-to-br from-green-500/5 to-blue-500/5 p-5 rounded-xl border-2 border-green-500/20">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-green-600">Improved</h4>
                  <Button variant="secondary" size="sm" onClick={copyToClipboard} className="flex items-center gap-2">
                    <Copy className="w-4 h-4" /> Copy
                  </Button>
                </div>
                <p className="text-[var(--text-primary)] whitespace-pre-wrap leading-relaxed font-medium">{result.formattedMessage}</p>
              </div>
            </div>

            {result.changes && result.changes.length > 0 && (
              <div className="bg-blue-500/5 p-5 rounded-xl border border-blue-500/10">
                <h4 className="font-semibold text-blue-600 mb-3 flex items-center gap-2">
                  <RefreshCw className="w-5 h-5" /> Changes Made
                </h4>
                <ul className="space-y-3">
                  {result.changes.map((change, index) => (
                    <li key={index} className="bg-[var(--bg-primary)] p-3 rounded-lg border border-blue-500/10">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-red-500 line-through text-sm">{change.original}</span>
                        <ArrowRight className="w-4 h-4 text-[var(--text-tertiary)]" />
                        <span className="text-green-500 font-medium text-sm">{change.improved}</span>
                      </div>
                      <p className="text-[var(--text-secondary)] text-xs mt-1 italic">{change.reason}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-purple-500/5 p-4 rounded-xl border border-purple-500/10">
                <h4 className="font-semibold text-purple-600 mb-2 flex items-center gap-2">
                  <Smile className="w-5 h-5" /> Tone Adjustments
                </h4>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{result.toneAdjustments}</p>
              </div>

              <div className="bg-orange-500/5 p-4 rounded-xl border border-orange-500/10">
                <h4 className="font-semibold text-orange-600 mb-2 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" /> Clarity Improvements
                </h4>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{result.clarityImprovements}</p>
              </div>
            </div>
          </div>
        )}

        {!result && !loading && !text && (
          <EmptyState
            icon={<Wand2 className="w-12 h-12 text-[var(--text-tertiary)]" />}
            title="Ready to format"
            description="Enter a message and select a tone to get started"
          />
        )}
      </div>
    </Card>
  );
};

export default MessageFormatter;
