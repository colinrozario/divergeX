import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import Card from '../components/shared/Card';

const Dashboard = () => {
  const { user } = useAuthStore();

  const tools = [
    {
      path: '/communication',
      icon: '💬',
      title: 'Communication',
      description: 'Analyze tone, format messages, and practice conversations',
      color: 'blue',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      path: '/learning',
      icon: '📚',
      title: 'Learning',
      description: 'Simplify text and generate visual summaries',
      color: 'green',
      gradient: 'from-green-500 to-green-600'
    },
    {
      path: '/planning',
      icon: '📅',
      title: 'Planning',
      description: 'Manage tasks and organize your schedule',
      color: 'purple',
      gradient: 'from-purple-500 to-purple-600'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <Breadcrumbs />
        
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-white mb-3">
            Welcome back, {user?.username}! 👋
          </h1>
          <p className="text-xl text-slate-400">Choose a tool to get started with your day</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {tools.map((tool) => (
            <Link 
              key={tool.path}
              to={tool.path} 
              className="group block"
            >
              <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 hover:border-cyan-500 transition-all h-full">
                <div className="text-center">
                  <div className="w-16 h-16 bg-cyan-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-4xl">{tool.icon}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {tool.title}
                  </h2>
                  <p className="text-slate-400 leading-relaxed">
                    {tool.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
            <h3 className="text-2xl font-bold text-white mb-6">💡 Quick Tips</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-cyan-500 font-bold">→</span>
                <span className="text-slate-300">Use the accessibility toolbar to customize your experience</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cyan-500 font-bold">→</span>
                <span className="text-slate-300">All your data is saved automatically</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cyan-500 font-bold">→</span>
                <span className="text-slate-300">Try different reading levels in the Learning section</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cyan-500 font-bold">→</span>
                <span className="text-slate-300">Practice conversations in various scenarios</span>
              </li>
            </ul>
          </div>

          <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
            <h3 className="text-2xl font-bold text-white mb-6">🎯 Getting Started</h3>
            <div className="space-y-3">
              <p className="text-slate-300 mb-4">New to DivergeX? Here's what you can do:</p>
              <div className="space-y-3">
                <div className="bg-cyan-500/10 p-4 rounded-xl border border-cyan-500/20">
                  <p className="text-sm font-semibold text-cyan-400">1. Customize your settings</p>
                  <p className="text-xs text-slate-400 mt-1">Adjust fonts, colors, and accessibility options</p>
                </div>
                <div className="bg-cyan-500/10 p-4 rounded-xl border border-cyan-500/20">
                  <p className="text-sm font-semibold text-cyan-400">2. Try the Communication tools</p>
                  <p className="text-xs text-slate-400 mt-1">Analyze tone and format messages</p>
                </div>
                <div className="bg-cyan-500/10 p-4 rounded-xl border border-cyan-500/20">
                  <p className="text-sm font-semibold text-cyan-400">3. Create your first task</p>
                  <p className="text-xs text-slate-400 mt-1">Stay organized with energy-aware planning</p>
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

