import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import Breadcrumbs from '../components/layout/Breadcrumbs';

const Dashboard = () => {
  const { user } = useAuthStore();

  const tools = [
    {
      path: '/communication',
      icon: '💬',
      title: 'Communication',
      description: 'Analyze tone, format messages, and practice conversations',
      color: 'text-blue-500',
      bg: 'bg-blue-500/10'
    },
    {
      path: '/learning',
      icon: '📚',
      title: 'Learning',
      description: 'Simplify text and generate visual summaries',
      color: 'text-purple-500',
      bg: 'bg-purple-500/10'
    },
    {
      path: '/planning',
      icon: '📅',
      title: 'Planning',
      description: 'Manage tasks and organize your schedule',
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10'
    }
  ];

  return (
    <div className="min-h-screen animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs />

        <div className="mb-12 mt-6">
          <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-3">
            Welcome back, <span className="text-gradient">{user?.username}</span>! 👋
          </h1>
          <p className="text-lg text-[var(--text-secondary)]">Choose a tool to get started with your day</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {tools.map((tool, index) => (
            <Link
              key={tool.path}
              to={tool.path}
              className={`group block animate-slide-up`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="glass-panel rounded-2xl p-8 h-full card-hover transition-all duration-300">
                <div className="flex flex-col items-center text-center">
                  <div className={`w-16 h-16 ${tool.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-3xl">{tool.icon}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">
                    {tool.title}
                  </h2>
                  <p className="text-[var(--text-secondary)] leading-relaxed">
                    {tool.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6 animate-slide-up delay-300">
          <div className="glass-panel rounded-2xl p-8">
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-6 flex items-center gap-2">
              <span className="text-yellow-500">💡</span> Quick Tips
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group">
                <span className="text-[var(--accent-primary)] font-bold group-hover:translate-x-1 transition-transform">→</span>
                <span className="text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">Use the accessibility toolbar to customize your experience</span>
              </li>
              <li className="flex items-start gap-3 group">
                <span className="text-[var(--accent-primary)] font-bold group-hover:translate-x-1 transition-transform">→</span>
                <span className="text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">All your data is saved automatically</span>
              </li>
              <li className="flex items-start gap-3 group">
                <span className="text-[var(--accent-primary)] font-bold group-hover:translate-x-1 transition-transform">→</span>
                <span className="text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">Try different reading levels in the Learning section</span>
              </li>
              <li className="flex items-start gap-3 group">
                <span className="text-[var(--accent-primary)] font-bold group-hover:translate-x-1 transition-transform">→</span>
                <span className="text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">Practice conversations in various scenarios</span>
              </li>
            </ul>
          </div>

          <div className="glass-panel rounded-2xl p-8">
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-6 flex items-center gap-2">
              <span className="text-red-500">🎯</span> Getting Started
            </h3>
            <div className="space-y-4">
              <p className="text-[var(--text-secondary)] mb-4">New to DivergeX? Here's what you can do:</p>
              <div className="space-y-3">
                <div className="bg-[var(--bg-tertiary)]/50 p-4 rounded-xl border border-[var(--border-subtle)] hover:border-[var(--accent-primary)]/50 transition-colors">
                  <p className="text-sm font-semibold text-[var(--accent-primary)]">1. Customize your settings</p>
                  <p className="text-xs text-[var(--text-secondary)] mt-1">Adjust fonts, colors, and accessibility options</p>
                </div>
                <div className="bg-[var(--bg-tertiary)]/50 p-4 rounded-xl border border-[var(--border-subtle)] hover:border-[var(--accent-primary)]/50 transition-colors">
                  <p className="text-sm font-semibold text-[var(--accent-primary)]">2. Try the Communication tools</p>
                  <p className="text-xs text-[var(--text-secondary)] mt-1">Analyze tone and format messages</p>
                </div>
                <div className="bg-[var(--bg-tertiary)]/50 p-4 rounded-xl border border-[var(--border-subtle)] hover:border-[var(--accent-primary)]/50 transition-colors">
                  <p className="text-sm font-semibold text-[var(--accent-primary)]">3. Create your first task</p>
                  <p className="text-xs text-[var(--text-secondary)] mt-1">Stay organized with energy-aware planning</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

