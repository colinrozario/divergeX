import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useAccessibilityStore } from '../../store/accessibilityStore';
import Button from '../shared/Button';

const Header = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const { theme, setTheme } = useAccessibilityStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const isActive = (path) => location.pathname === path;

  const navLinkClass = (path) => `
    relative px-3 py-2 text-sm font-medium transition-colors duration-200
    ${isActive(path)
      ? 'text-[var(--text-primary)]'
      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
    }
  `;

  const ActiveIndicator = () => (
    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[var(--accent-primary)] rounded-full shadow-[0_0_8px_var(--accent-glow)]" />
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-3' : 'py-5'
        }`}
    >
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 ${scrolled ? 'mx-4' : ''
        }`}>
        <div className={`glass-panel rounded-2xl px-6 flex justify-between items-center h-16 shadow-lg shadow-black/5 ${scrolled ? 'bg-[var(--glass-bg)]/90' : 'bg-[var(--glass-bg)]'
          }`}>
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-9 h-9 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <span className="text-white font-bold text-sm">DX</span>
            </div>
            <span className="text-[var(--text-primary)] font-bold text-lg tracking-tight">divergeX</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1" aria-label="Main navigation">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className={navLinkClass('/dashboard')}>
                  Dashboard
                  {isActive('/dashboard') && <ActiveIndicator />}
                </Link>
                <Link to="/communication" className={navLinkClass('/communication')}>
                  Communication
                  {isActive('/communication') && <ActiveIndicator />}
                </Link>
                <Link to="/learning" className={navLinkClass('/learning')}>
                  Learning
                  {isActive('/learning') && <ActiveIndicator />}
                </Link>
                <Link to="/planning" className={navLinkClass('/planning')}>
                  Planning
                  {isActive('/planning') && <ActiveIndicator />}
                </Link>
              </>
            ) : (
              <>
                <a href="#features" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] px-4 py-2 text-sm font-medium transition-colors">Features</a>
                <a href="#pricing" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] px-4 py-2 text-sm font-medium transition-colors">Pricing</a>
                <a href="#about" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] px-4 py-2 text-sm font-medium transition-colors">About</a>
              </>
            )}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>

            {isAuthenticated ? (
              <>
                <Link to="/settings" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] p-2 rounded-lg transition-colors hover:bg-[var(--bg-tertiary)]" aria-label="Settings">
                  <span className="text-xl">⚙️</span>
                </Link>
                <div className="flex items-center gap-3 pl-4 border-l border-[var(--border-subtle)]">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold text-white">
                    {user?.username?.charAt(0).toUpperCase()}
                  </div>
                  <Button variant="ghost" size="sm" onClick={logout} className="text-xs">
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">Log In</Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="sm" className="shadow-lg shadow-blue-500/25">Sign Up</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)] transition-colors"
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
          <div className="md:hidden mt-2 glass-panel rounded-2xl p-4 animate-fade-in">
            {isAuthenticated ? (
              <>
                <nav className="space-y-1 mb-4">
                  <Link
                    to="/dashboard"
                    className="block px-4 py-3 rounded-xl hover:bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="mr-3">📊</span> Dashboard
                  </Link>
                  <Link
                    to="/communication"
                    className="block px-4 py-3 rounded-xl hover:bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="mr-3">💬</span> Communication
                  </Link>
                  <Link
                    to="/learning"
                    className="block px-4 py-3 rounded-xl hover:bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="mr-3">📚</span> Learning
                  </Link>
                  <Link
                    to="/planning"
                    className="block px-4 py-3 rounded-xl hover:bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="mr-3">📅</span> Planning
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-3 rounded-xl hover:bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="mr-3">⚙️</span> Settings
                  </Link>
                </nav>
                <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between px-2">
                  <span className="text-sm text-[var(--text-muted)]">Logged in as <strong className="text-[var(--text-primary)]">{user?.username}</strong></span>
                  <Button variant="outline" size="sm" onClick={logout}>
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex flex-col gap-3">
                <Link to="/login">
                  <Button variant="ghost" size="md" className="w-full justify-center">Login</Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="md" className="w-full justify-center">Sign Up</Button>
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
