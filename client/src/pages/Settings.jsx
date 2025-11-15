import { useEffect, useState } from 'react';
import { useAccessibilityStore } from '../store/accessibilityStore';
import { getAccessibilitySettings, updateAccessibilitySettings } from '../services/api';
import { useToast } from '../components/shared/ToastContainer';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import Card from '../components/shared/Card';
import Button from '../components/shared/Button';

const Settings = () => {
  const {
    theme,
    fontFamily,
    fontSize,
    motionReduced,
    highContrast,
    screenReaderMode,
    updateSettings
  } = useAccessibilityStore();

  const [localSettings, setLocalSettings] = useState({
    theme,
    fontFamily,
    fontSize,
    motionReduced,
    highContrast,
    screenReaderMode
  });

  const [hasChanges, setHasChanges] = useState(false);
  const toast = useToast();

  useEffect(() => {
    fetchSettings();
  }, []);

  useEffect(() => {
    const changed = 
      localSettings.theme !== theme ||
      localSettings.fontFamily !== fontFamily ||
      localSettings.fontSize !== fontSize ||
      localSettings.motionReduced !== motionReduced ||
      localSettings.highContrast !== highContrast ||
      localSettings.screenReaderMode !== screenReaderMode;
    setHasChanges(changed);
  }, [localSettings, theme, fontFamily, fontSize, motionReduced, highContrast, screenReaderMode]);

  const fetchSettings = async () => {
    try {
      const response = await getAccessibilitySettings();
      const settings = response.data;
      setLocalSettings(settings);
      updateSettings(settings);
    } catch (error) {
      console.error('Failed to fetch settings:', error);
      toast.error('Failed to load settings');
    }
  };

  const handleSave = async () => {
    try {
      await updateAccessibilitySettings(localSettings);
      updateSettings(localSettings);
      toast.success('Settings saved successfully! ✨');
      setHasChanges(false);
    } catch (error) {
      console.error('Failed to save settings:', error);
      toast.error('Failed to save settings');
    }
  };

  const handleReset = () => {
    setLocalSettings({
      theme,
      fontFamily,
      fontSize,
      motionReduced,
      highContrast,
      screenReaderMode
    });
    toast.info('Changes discarded');
  };

  const themeOptions = [
    { value: 'light', label: 'Light', icon: '☀️', description: 'Bright and clear' },
    { value: 'dark', label: 'Dark', icon: '🌙', description: 'Easy on the eyes' },
    { value: 'high-contrast', label: 'High Contrast', icon: '⚫⚪', description: 'Maximum visibility' },
  ];

  const fontOptions = [
    { value: 'professional', label: 'Professional', icon: '📝', description: 'Arial - Clean and standard' },
    { value: 'dyslexic', label: 'Dyslexia-Friendly', icon: '📖', description: 'OpenDyslexic - Easier to read' },
    { value: 'clear', label: 'Clear', icon: '✨', description: 'Comic Sans - Simple and friendly' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs />
      
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-4xl">⚙️</span>
          <h1 className="text-4xl font-bold text-gray-900">Settings</h1>
        </div>
        <p className="text-lg text-gray-600">
          Customize your experience to match your preferences
        </p>
      </div>

      <div className="space-y-6">
        <Card>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🎨 Appearance</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Theme
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {themeOptions.map(option => (
                  <button
                    key={option.value}
                    onClick={() => setLocalSettings({ ...localSettings, theme: option.value })}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      localSettings.theme === option.value
                        ? 'border-blue-500 bg-blue-50 shadow-md'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{option.icon}</span>
                      <span className="font-semibold text-gray-900">{option.label}</span>
                    </div>
                    <p className="text-xs text-gray-600">{option.description}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Font Family
              </label>
              <div className="grid grid-cols-1 gap-3">
                {fontOptions.map(option => (
                  <button
                    key={option.value}
                    onClick={() => setLocalSettings({ ...localSettings, fontFamily: option.value })}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      localSettings.fontFamily === option.value
                        ? 'border-blue-500 bg-blue-50 shadow-md'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{option.icon}</span>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">{option.label}</div>
                        <p className="text-xs text-gray-600">{option.description}</p>
                      </div>
                      {localSettings.fontFamily === option.value && (
                        <span className="text-blue-600 text-xl">✓</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="font-size-setting" className="block text-sm font-medium text-gray-700 mb-3">
                Font Size: <span className="text-blue-600 font-bold">{localSettings.fontSize}%</span>
              </label>
              <div className="flex items-center gap-4">
                <span className="text-xs text-gray-600 font-medium">80%</span>
                <input
                  id="font-size-setting"
                  type="range"
                  min="80"
                  max="200"
                  step="10"
                  value={localSettings.fontSize}
                  onChange={(e) => setLocalSettings({ ...localSettings, fontSize: parseInt(e.target.value) })}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <span className="text-xs text-gray-600 font-medium">200%</span>
              </div>
              <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-gray-700" style={{ fontSize: `${localSettings.fontSize}%` }}>
                  Preview: This is how your text will look
                </p>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">♿ Accessibility Options</h2>
          
          <div className="space-y-4">
            <label className="flex items-start gap-4 p-4 rounded-xl border-2 border-gray-200 hover:border-blue-300 cursor-pointer transition-all bg-white">
              <input
                type="checkbox"
                checked={localSettings.motionReduced}
                onChange={(e) => setLocalSettings({ ...localSettings, motionReduced: e.target.checked })}
                className="mt-1 w-5 h-5 text-blue-600 rounded focus-visible-ring"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">🎬</span>
                  <span className="font-semibold text-gray-900">Reduce Motion</span>
                </div>
                <p className="text-sm text-gray-600">Minimize animations and transitions for a calmer experience</p>
              </div>
            </label>

            <label className="flex items-start gap-4 p-4 rounded-xl border-2 border-gray-200 hover:border-blue-300 cursor-pointer transition-all bg-white">
              <input
                type="checkbox"
                checked={localSettings.highContrast}
                onChange={(e) => setLocalSettings({ ...localSettings, highContrast: e.target.checked })}
                className="mt-1 w-5 h-5 text-blue-600 rounded focus-visible-ring"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">🔆</span>
                  <span className="font-semibold text-gray-900">High Contrast Mode</span>
                </div>
                <p className="text-sm text-gray-600">Increase contrast between text and background for better visibility</p>
              </div>
            </label>

            <label className="flex items-start gap-4 p-4 rounded-xl border-2 border-gray-200 hover:border-blue-300 cursor-pointer transition-all bg-white">
              <input
                type="checkbox"
                checked={localSettings.screenReaderMode}
                onChange={(e) => setLocalSettings({ ...localSettings, screenReaderMode: e.target.checked })}
                className="mt-1 w-5 h-5 text-blue-600 rounded focus-visible-ring"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">🔊</span>
                  <span className="font-semibold text-gray-900">Screen Reader Optimizations</span>
                </div>
                <p className="text-sm text-gray-600">Enhanced support and descriptions for screen reader users</p>
              </div>
            </label>
          </div>
        </Card>

        {hasChanges && (
          <div className="sticky bottom-4 bg-white border-2 border-blue-500 rounded-xl p-4 shadow-lg animate-slide-in">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">💾</span>
                <div>
                  <p className="font-semibold text-gray-900">You have unsaved changes</p>
                  <p className="text-sm text-gray-600">Save your preferences to apply them</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" onClick={handleReset}>
                  Discard
                </Button>
                <Button onClick={handleSave}>
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        )}

        {!hasChanges && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">✅</span>
              <p className="text-green-800">All settings are saved and up to date</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;

