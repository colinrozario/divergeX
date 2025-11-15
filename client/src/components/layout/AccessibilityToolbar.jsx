import { useState } from 'react';
import { useAccessibilityStore } from '../../store/accessibilityStore';
import { updateAccessibilitySettings } from '../../services/api';

const AccessibilityToolbar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const {
    theme,
    fontFamily,
    fontSize,
    motionReduced,
    highContrast,
    setTheme,
    setFontFamily,
    setFontSize,
    setMotionReduced,
    setHighContrast,
  } = useAccessibilityStore();

  const handleSettingChange = async (setting, value) => {
    try {
      await updateAccessibilitySettings({ [setting]: value });
    } catch (error) {
      console.error('Failed to update settings:', error);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/50 transition-colors focus-visible-ring"
            aria-expanded={isExpanded}
            aria-label="Toggle accessibility toolbar"
          >
            <span className="text-lg">♿</span>
            <span className="text-sm font-medium text-gray-700">Quick Accessibility</span>
            <span className={`text-xs transition-transform ${isExpanded ? 'rotate-180' : ''}`}>▼</span>
          </button>

          {!isExpanded && (
            <div className="flex items-center gap-3 text-xs text-gray-600">
              <span className="hidden sm:inline">Current: {theme} • {fontFamily} • {fontSize}%</span>
            </div>
          )}
        </div>

        {isExpanded && (
          <div className="pb-4 animate-fade-in">
            <div className="bg-white rounded-lg p-4 shadow-md border border-gray-200">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="theme-select" className="block text-xs font-medium text-gray-700 mb-1">
                    Theme
                  </label>
                  <select
                    id="theme-select"
                    value={theme}
                    onChange={(e) => {
                      setTheme(e.target.value);
                      handleSettingChange('theme', e.target.value);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus-visible-ring text-sm"
                  >
                    <option value="light">☀️ Light</option>
                    <option value="dark">🌙 Dark</option>
                    <option value="high-contrast">⚫⚪ High Contrast</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="font-select" className="block text-xs font-medium text-gray-700 mb-1">
                    Font Family
                  </label>
                  <select
                    id="font-select"
                    value={fontFamily}
                    onChange={(e) => {
                      setFontFamily(e.target.value);
                      handleSettingChange('fontFamily', e.target.value);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus-visible-ring text-sm"
                  >
                    <option value="professional">📝 Professional</option>
                    <option value="dyslexic">📖 Dyslexia-Friendly</option>
                    <option value="clear">✨ Clear</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="font-size" className="block text-xs font-medium text-gray-700 mb-1">
                    Font Size: {fontSize}%
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      id="font-size"
                      type="range"
                      min="80"
                      max="200"
                      step="10"
                      value={fontSize}
                      onChange={(e) => {
                        setFontSize(parseInt(e.target.value));
                        handleSettingChange('fontSize', parseInt(e.target.value));
                      }}
                      className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                      aria-label="Font size"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200 flex flex-wrap gap-3">
                <label className="flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <input
                    type="checkbox"
                    checked={motionReduced}
                    onChange={(e) => {
                      setMotionReduced(e.target.checked);
                      handleSettingChange('motionReduced', e.target.checked);
                    }}
                    className="w-4 h-4 text-blue-600 rounded focus-visible-ring"
                  />
                  <span className="text-sm text-gray-700">🎬 Reduce Motion</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <input
                    type="checkbox"
                    checked={highContrast}
                    onChange={(e) => {
                      setHighContrast(e.target.checked);
                      handleSettingChange('highContrast', e.target.checked);
                    }}
                    className="w-4 h-4 text-blue-600 rounded focus-visible-ring"
                  />
                  <span className="text-sm text-gray-700">🔆 High Contrast</span>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccessibilityToolbar;

