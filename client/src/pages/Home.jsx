import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import Button from '../components/shared/Button';

const Home = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Clarity in<br />
              Communication.<br />
              Simplicity in<br />
              Action.
            </h1>
            
            <p className="text-lg text-slate-400 mb-10 max-w-lg leading-relaxed">
              Empowering neurodivergent individuals by providing intuitive digital tools designed for your unique strengths.
            </p>
            
            {!isAuthenticated ? (
              <Link to="/register">
                <Button variant="primary" size="lg" className="rounded-lg px-8">
                  Create Your Account
                </Button>
              </Link>
            ) : (
              <Link to="/dashboard">
                <Button variant="primary" size="lg" className="rounded-lg px-8">
                  Go to Dashboard
                </Button>
              </Link>
            )}
          </div>

          {/* Right: Illustration/Image Placeholder */}
          <div className="relative">
            <div className="bg-gradient-to-br from-cyan-400 to-teal-500 rounded-3xl aspect-square flex items-center justify-center shadow-2xl">
              <div className="text-center p-8">
                <div className="text-8xl mb-4">🧠</div>
                <p className="text-slate-900 font-semibold text-xl">Neurodiversity-Focused</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tools Section */}
      <div className="bg-slate-800/50 py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Tools Tailored for You</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Explore features designed to support communication, learning, and organization in a way that works for you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Communication Tools */}
            <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 hover:border-cyan-500 transition-colors">
              <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Communication Tools</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Tools for clear expression and understanding social cues, making interactions more intuitive.
              </p>
            </div>

            {/* Learning Assistance */}
            <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 hover:border-cyan-500 transition-colors">
              <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Learning Assistance</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Explore text that support different learning styles and help you maintain focus and clarity.
              </p>
            </div>

            {/* Planning & Organization */}
            <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 hover:border-cyan-500 transition-colors">
              <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Planning & Organization</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Manage tasks, schedules, and daily routines with tools that reduce executive function.
              </p>
            </div>

            {/* Accessibility Features */}
            <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 hover:border-cyan-500 transition-colors">
              <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Accessibility Features</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Customize your interface with adjustable themes, fonts, and sensory profiles for comfort.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      {!isAuthenticated && (
        <div className="py-20">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Find Your Focus. Start for Free.
            </h2>
            <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
              Join divergeX today and discover a more comfortable way to navigate your digital world.
            </p>
            <Link to="/register">
              <Button variant="primary" size="lg" className="rounded-lg px-8">
                Create Your Account
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center">
                  <span className="text-slate-900 font-bold text-sm">DX</span>
                </div>
                <span className="text-white font-bold">divergeX</span>
              </div>
              <p className="text-slate-500 text-sm">© 2024 divergeX. All rights reserved.</p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#features" className="text-slate-400 hover:text-white text-sm transition-colors">Features</a></li>
                <li><a href="#pricing" className="text-slate-400 hover:text-white text-sm transition-colors">Pricing</a></li>
                <li><a href="#updates" className="text-slate-400 hover:text-white text-sm transition-colors">Updates</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#about" className="text-slate-400 hover:text-white text-sm transition-colors">About Us</a></li>
                <li><a href="#careers" className="text-slate-400 hover:text-white text-sm transition-colors">Careers</a></li>
                <li><a href="#contact" className="text-slate-400 hover:text-white text-sm transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#blog" className="text-slate-400 hover:text-white text-sm transition-colors">Blog</a></li>
                <li><a href="#help" className="text-slate-400 hover:text-white text-sm transition-colors">Help Center</a></li>
                <li><a href="#privacy" className="text-slate-400 hover:text-white text-sm transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;

