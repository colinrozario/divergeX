import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import Button from '../components/shared/Button';
import { MessageSquare, BookOpen, Zap } from 'lucide-react';

const Home = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-8 leading-tight">
              Think <span className="text-gradient">Differently</span>.<br />
              Thrive <span className="text-gradient">Effortlessly</span>.
            </h1>
            <p className="text-xl text-[var(--text-secondary)] mb-10 leading-relaxed">
              An AI-powered workspace designed for neurodivergent minds.
              Simplify communication, enhance learning, and master planning with tools that adapt to you.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto shadow-xl shadow-blue-500/20">
                    Go to Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/register">
                    <Button variant="primary" size="lg" className="w-full sm:w-auto shadow-xl shadow-blue-500/20">
                      Get Started Free
                    </Button>
                  </Link>
                  <a href="#features">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto">
                      Explore Features
                    </Button>
                  </a>
                </>
              )}
            </div>
          </div>

          {/* Visual Representation */}
          <div className="relative max-w-5xl mx-auto mt-12 rounded-3xl overflow-hidden shadow-2xl shadow-black/50 border border-[var(--border-subtle)] group">
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent z-10" />
            <img
              src="/dashboard_divergeX.jpg"
              alt="Empowering neurodiversity through collaboration"
              className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute bottom-0 left-0 right-0 p-8 z-20 text-center">
              <p className="text-[var(--text-secondary)] text-sm font-medium tracking-widest uppercase opacity-80">Unlock Your Potential. Empower Their Voice.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Tools that adapt to your mind</h2>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
              Our suite of tools is built to reduce cognitive load and enhance your natural strengths.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-panel p-8 rounded-3xl card-hover">
              <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 text-blue-500">
                <MessageSquare className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Clear Communication</h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Analyze tone, simplify complex messages, and practice conversations in a safe environment.
              </p>
            </div>

            <div className="glass-panel p-8 rounded-3xl card-hover">
              <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6 text-purple-500">
                <BookOpen className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Visual Learning</h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Transform dense text into clear summaries and visual aids to improve retention and understanding.
              </p>
            </div>

            <div className="glass-panel p-8 rounded-3xl card-hover">
              <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6 text-emerald-500">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Energy-Aware Planning</h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Manage tasks based on your energy levels, not just deadlines. Prevent burnout before it happens.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-secondary)] to-[var(--bg-primary)]" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-8">Ready to unlock your potential?</h2>
          <p className="text-xl text-[var(--text-secondary)] mb-10">
            Join thousands of users who are thriving with DivergeX.
          </p>
          {!isAuthenticated && (
            <Link to="/register">
              <Button variant="primary" size="lg" className="shadow-xl shadow-blue-500/20 px-12">
                Start Your Journey
              </Button>
            </Link>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-[var(--border-subtle)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-[10px]">DX</span>
            </div>
            <span className="font-bold text-[var(--text-primary)]">divergeX</span>
          </div>
          <div className="text-[var(--text-secondary)] text-sm">
            © 2025 DivergeX. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">Privacy</a>
            <a href="#" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">Terms</a>
            <a href="#" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
