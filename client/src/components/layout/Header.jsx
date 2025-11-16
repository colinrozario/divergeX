import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import Button from '../shared/Button';

const Header = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;
  
  const navLinkClass = (path) => `
    px-3 py-2 rounded-lg transition-colors
    ${isActive(path) 
      ? 'bg-blue-100 text-blue-700 font-medium' 
      : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
    }
    focus-visible-ring
  `;

  return (
    <header className="bg-slate-900/95 backdrop-blur-sm sticky top-0 z-40 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center">
              <span className="text-slate-900 font-bold text-sm">DX</span>
            </div>
            <span className="text-white font-bold text-lg">divergeX</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8" aria-label="Main navigation">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-slate-300 hover:text-white font-medium text-sm transition-colors">
                  Dashboard
                </Link>
                <Link to="/communication" className="text-slate-300 hover:text-white font-medium text-sm transition-colors">
                  Communication
                </Link>
                <Link to="/learning" className="text-slate-300 hover:text-white font-medium text-sm transition-colors">
                  Learning
                </Link>
                <Link to="/planning" className="text-slate-300 hover:text-white font-medium text-sm transition-colors">
                  Planning
                </Link>
              </>
            ) : (
              <>
                <a href="#features" className="text-slate-300 hover:text-white font-medium text-sm transition-colors">Features</a>
                <a href="#pricing" className="text-slate-300 hover:text-white font-medium text-sm transition-colors">Pricing</a>
                <a href="#about" className="text-slate-300 hover:text-white font-medium text-sm transition-colors">About</a>
              </>
            )}
          </nav>
          
          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated ? (
              <>
                <Link to="/settings" className="text-slate-400 hover:text-white p-2 rounded-lg transition-colors" aria-label="Settings">
                  <span className="text-xl">⚙️</span>
                </Link>
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-full">
                  <span className="text-sm font-medium text-slate-200">{user?.username}</span>
                </div>
                <Button variant="outline" size="sm" onClick={logout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">Log In</Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="sm" className="rounded-lg">Sign Up</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 focus-visible-ring"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            {isAuthenticated ? (
              <>
                <nav className="space-y-1 mb-4">
                  <Link 
                    to="/dashboard" 
                    className={`block ${navLinkClass('/dashboard')}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="mr-2" aria-hidden="true">📊</span>
                    Dashboard
                  </Link>
                  <Link 
                    to="/communication" 
                    className={`block ${navLinkClass('/communication')}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="mr-2" aria-hidden="true">💬</span>
                    Communication
                  </Link>
                  <Link 
                    to="/learning" 
                    className={`block ${navLinkClass('/learning')}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="mr-2" aria-hidden="true">📚</span>
                    Learning
                  </Link>
                  <Link 
                    to="/planning" 
                    className={`block ${navLinkClass('/planning')}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="mr-2" aria-hidden="true">📅</span>
                    Planning
                  </Link>
                  <Link 
                    to="/settings" 
                    className={`block ${navLinkClass('/settings')}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="mr-2" aria-hidden="true">⚙️</span>
                    Settings
                  </Link>
                </nav>
                <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
                  <span className="text-sm text-gray-600">Logged in as <strong>{user?.username}</strong></span>
                  <Button variant="outline" size="sm" onClick={logout}>
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex gap-2">
                <Link to="/login" className="flex-1">
                  <Button variant="outline" size="md" className="w-full">Login</Button>
                </Link>
                <Link to="/register" className="flex-1">
                  <Button variant="primary" size="md" className="w-full">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

