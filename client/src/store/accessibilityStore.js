import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAccessibilityStore = create(
  persist(
    (set) => ({
      theme: 'light',
      fontFamily: 'professional',
      fontSize: 100,
      motionReduced: false,
      highContrast: false,
      screenReaderMode: false,
      
      setTheme: (theme) => set({ theme }),
      setFontFamily: (fontFamily) => set({ fontFamily }),
      setFontSize: (fontSize) => set({ fontSize }),
      setMotionReduced: (motionReduced) => set({ motionReduced }),
      setHighContrast: (highContrast) => set({ highContrast }),
      setScreenReaderMode: (screenReaderMode) => set({ screenReaderMode }),
      
      updateSettings: (settings) => set(settings),
    }),
    {
      name: 'accessibility-storage',
    }
  )
);
