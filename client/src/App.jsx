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

  const themeClass = theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900';

  return (
    <Router>
      <ToastProvider>
        <div 
          className={`min-h-screen ${fontFamilyMap[fontFamily]} ${themeClass} ${motionReduced ? 'motion-reduce' : ''}`}
          style={{ fontSize: `${fontSize}%` }}
        >
          <Header />
          <AccessibilityToolbar />
          <main className="pb-8">
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