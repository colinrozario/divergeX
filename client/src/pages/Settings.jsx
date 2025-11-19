import { useEffect, useState } from 'react';
import { useAccessibilityStore } from '../store/accessibilityStore';
import { getAccessibilitySettings, updateAccessibilitySettings } from '../services/api';
import { useToast } from '../components/shared/ToastContainer';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import Card from '../components/shared/Card';
import Button from '../components/shared/Button';
import { Settings as SettingsIcon, Palette, Type, Monitor, Sun, Moon, Eye, FileText, Check, Save, X, Volume2, Activity } from 'lucide-react';

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
    { value: 'light', label: 'Light', icon: Sun, description: 'Bright and clear' },
    { value: 'dark', label: 'Dark', icon: Moon, description: 'Easy on the eyes' },
    { value: 'high-contrast', label: 'High Contrast', icon: Eye, description: 'Maximum visibility' },
  ];

  const fontOptions = [
    { value: 'professional', label: 'Professional', icon: Type, description: 'Arial - Clean and standard' },
    { value: 'dyslexic', label: 'Dyslexia-Friendly', icon: FileText, description: 'OpenDyslexic - Easier to read' },
    { value: 'clear', label: 'Clear', icon: Activity, description: 'Comic Sans - Simple and friendly' },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-12">
        <Breadcrumbs />

        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-gray-500/10 rounded-2xl">
              <SettingsIcon className="w-10 h-10 text-[var(--text-primary)]" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-[var(--text-primary)]">Settings</h1>
          </div>
          <p className="text-xl text-[var(--text-secondary)] max-w-2xl">
            Customize your experience to match your preferences.
          </p>
        </div>

        <div className="space-y-8">
          <Card>
            <div className="flex items-center gap-3 mb-6">
              <Palette className="w-6 h-6 text-blue-500" />
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">Appearance</h2>
            </div>

            <div className="space-y-8">
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-4">
                  Theme
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {themeOptions.map(option => (
                    <button
                      key={option.value}
                      onClick={() => setLocalSettings({ ...localSettings, theme: option.value })}
                      className={`p-4 rounded-2xl border-2 text-left transition-all ${localSettings.theme === option.value
                          ? 'border-blue-500 bg-blue-500/10 shadow-md'
                          : 'border-[var(--border-subtle)] hover:border-[var(--border-default)] bg-[var(--bg-secondary)]'
                        }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <option.icon className={`w-6 h-6 ${localSettings.theme === option.value ? 'text-blue-500' : 'text-[var(--text-secondary)]'}`} />
                        <span className={`font-semibold ${localSettings.theme === option.value ? 'text-blue-500' : 'text-[var(--text-primary)]'}`}>{option.label}</span>
                      </div>
                      <p className="text-xs text-[var(--text-secondary)]">{option.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-4">
                  Font Family
                </label>
                <div className="grid grid-cols-1 gap-4">
                  {fontOptions.map(option => (
                    <button
                      key={option.value}
                      onClick={() => setLocalSettings({ ...localSettings, fontFamily: option.value })}
                      className={`p-4 rounded-2xl border-2 text-left transition-all ${localSettings.fontFamily === option.value
                          ? 'border-blue-500 bg-blue-500/10 shadow-md'
                          : 'border-[var(--border-subtle)] hover:border-[var(--border-default)] bg-[var(--bg-secondary)]'
                        }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-lg ${localSettings.fontFamily === option.value ? 'bg-blue-500/20' : 'bg-[var(--bg-tertiary)]'}`}>
                          <option.icon className={`w-6 h-6 ${localSettings.fontFamily === option.value ? 'text-blue-500' : 'text-[var(--text-secondary)]'}`} />
                        </div>
                        <div className="flex-1">
                          <div className={`font-semibold ${localSettings.fontFamily === option.value ? 'text-blue-500' : 'text-[var(--text-primary)]'}`}>{option.label}</div>
                          <p className="text-xs text-[var(--text-secondary)]">{option.description}</p>
                        </div>
                        {localSettings.fontFamily === option.value && (
                          <Check className="w-6 h-6 text-blue-500" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="font-size-setting" className="block text-sm font-medium text-[var(--text-secondary)] mb-4">
                  Font Size: <span className="text-blue-500 font-bold">{localSettings.fontSize}%</span>
                </label>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-[var(--text-secondary)] font-medium">80%</span>
                  <input
                    id="font-size-setting"
                    type="range"
                    min="80"
                    max="200"
                    step="10"
                    value={localSettings.fontSize}
                    onChange={(e) => setLocalSettings({ ...localSettings, fontSize: parseInt(e.target.value) })}
                    className="flex-1 h-2 bg-[var(--bg-tertiary)] rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                  <span className="text-xs text-[var(--text-secondary)] font-medium">200%</span>
                </div>
                <div className="mt-4 p-6 bg-[var(--bg-secondary)] rounded-2xl border border-[var(--border-subtle)]">
                  <p className="text-[var(--text-primary)]" style={{ fontSize: `${localSettings.fontSize}%` }}>
                    Preview: This is how your text will look
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-3 mb-6">
              <Activity className="w-6 h-6 text-purple-500" />
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">Accessibility Options</h2>
            </div>

            <div className="space-y-4">
              <label className="flex items-start gap-4 p-4 rounded-xl border-2 border-[var(--border-subtle)] hover:border-blue-500/50 cursor-pointer transition-all bg-[var(--bg-secondary)]">
                <input
                  type="checkbox"
                  checked={localSettings.motionReduced}
                  onChange={(e) => setLocalSettings({ ...localSettings, motionReduced: e.target.checked })}
                  className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-blue-500 bg-[var(--bg-tertiary)] border-[var(--border-default)]"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Monitor className="w-5 h-5 text-[var(--text-secondary)]" />
                    <span className="font-semibold text-[var(--text-primary)]">Reduce Motion</span>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)]">Minimize animations and transitions for a calmer experience</p>
                </div>
              </label>

              <label className="flex items-start gap-4 p-4 rounded-xl border-2 border-[var(--border-subtle)] hover:border-blue-500/50 cursor-pointer transition-all bg-[var(--bg-secondary)]">
                <input
                  type="checkbox"
                  checked={localSettings.highContrast}
                  onChange={(e) => setLocalSettings({ ...localSettings, highContrast: e.target.checked })}
                  className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-blue-500 bg-[var(--bg-tertiary)] border-[var(--border-default)]"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Eye className="w-5 h-5 text-[var(--text-secondary)]" />
                    <span className="font-semibold text-[var(--text-primary)]">High Contrast Mode</span>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)]">Increase contrast between text and background for better visibility</p>
                </div>
              </label>

              <label className="flex items-start gap-4 p-4 rounded-xl border-2 border-[var(--border-subtle)] hover:border-blue-500/50 cursor-pointer transition-all bg-[var(--bg-secondary)]">
                <input
                  type="checkbox"
                  checked={localSettings.screenReaderMode}
                  onChange={(e) => setLocalSettings({ ...localSettings, screenReaderMode: e.target.checked })}
                  className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-blue-500 bg-[var(--bg-tertiary)] border-[var(--border-default)]"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Volume2 className="w-5 h-5 text-[var(--text-secondary)]" />
                    <span className="font-semibold text-[var(--text-primary)]">Screen Reader Optimizations</span>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)]">Enhanced support and descriptions for screen reader users</p>
                </div>
              </label>
            </div>
          </Card>

          {hasChanges && (
            <div className="sticky bottom-4 bg-[var(--bg-secondary)] border-2 border-blue-500 rounded-3xl p-6 shadow-xl animate-slide-in backdrop-blur-lg bg-opacity-95">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Save className="w-8 h-8 text-blue-500" />
                  <div>
                    <p className="font-semibold text-[var(--text-primary)]">You have unsaved changes</p>
                    <p className="text-sm text-[var(--text-secondary)]">Save your preferences to apply them</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="secondary" onClick={handleReset} className="rounded-full flex items-center gap-2">
                    <X className="w-4 h-4" /> Discard
                  </Button>
                  <Button variant="primary" onClick={handleSave} className="rounded-full flex items-center gap-2">
                    <Check className="w-4 h-4" /> Save Changes
                  </Button>
                </div>
              </div>
            </div>
          )}

          {!hasChanges && (
            <div className="bg-green-500/10 rounded-3xl p-6 border border-green-500/20">
              <div className="flex items-center gap-3">
                <Check className="w-6 h-6 text-green-500" />
                <p className="text-green-600 font-medium">All settings are saved and up to date</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;

