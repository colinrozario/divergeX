import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { useAccessibilityStore } from './store/accessibilityStore';
import { ToastProvider } from './components/shared/ToastContainer';
import Header from './components/layout/Header';
import AccessibilityToolbar from './components/layout/AccessibilityToolbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Communication from './pages/Communication';
import Learning from './pages/Learning';
import Planning from './pages/Planning';
import Settings from './pages/Settings';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  const { fontFamily, fontSize, theme, motionReduced } = useAccessibilityStore();

  const fontFamilyMap = {
    professional: 'font-professional',
    dyslexic: 'font-dyslexic',
    clear: 'font-clear'
  };

  // Theme is now handled by CSS variables, but we keep the class for potential future toggles if needed
  // or if we want to support light mode later via a class on the body/div
  const themeClass = theme === 'light' ? 'light' : '';

  return (
    <Router>
      <ToastProvider>
        <div
          className={`min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] ${fontFamilyMap[fontFamily]} ${themeClass} ${motionReduced ? 'motion-reduce' : ''}`}
          style={{ fontSize: `${fontSize}%` }}
        >
          <Header />
          {/* AccessibilityToolbar removed as per user request */}
          <main className="pt-24 pb-12 px-4 max-w-7xl mx-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/communication" element={<ProtectedRoute><Communication /></ProtectedRoute>} />
              <Route path="/learning" element={<ProtectedRoute><Learning /></ProtectedRoute>} />
              <Route path="/planning" element={<ProtectedRoute><Planning /></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            </Routes>
          </main>
        </div>
      </ToastProvider>
    </Router>
  );
};

export default App;