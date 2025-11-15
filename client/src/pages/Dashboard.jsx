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
    <div className="min-h-screen bg-neutral-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <Breadcrumbs />
        
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-3">
            Welcome back, {user?.username}! 👋
          </h1>
          <p className="text-xl text-gray-600">Choose a tool to get started with your day</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {tools.map((tool) => (
            <Link 
              key={tool.path}
              to={tool.path} 
              className="group block"
            >
              <div className="bg-white rounded-3xl p-8 hover:shadow-xl transition-shadow h-full">
                <div className="text-center">
                  <div className={`w-20 h-20 bg-gradient-to-br ${tool.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                    <span className="text-4xl">{tool.icon}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {tool.title}
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    {tool.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">💡 Quick Tips</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-gray-400 font-bold">→</span>
                <span className="text-gray-700">Use the accessibility toolbar to customize your experience</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gray-400 font-bold">→</span>
                <span className="text-gray-700">All your data is saved automatically</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gray-400 font-bold">→</span>
                <span className="text-gray-700">Try different reading levels in the Learning section</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gray-400 font-bold">→</span>
                <span className="text-gray-700">Practice conversations in various scenarios</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">🎯 Getting Started</h3>
            <div className="space-y-3">
              <p className="text-gray-700 mb-4">New to DivergeX? Here's what you can do:</p>
              <div className="space-y-3">
                <div className="bg-blue-50 p-4 rounded-2xl">
                  <p className="text-sm font-semibold text-blue-900">1. Customize your settings</p>
                  <p className="text-xs text-blue-700 mt-1">Adjust fonts, colors, and accessibility options</p>
                </div>
                <div className="bg-green-50 p-4 rounded-2xl">
                  <p className="text-sm font-semibold text-green-900">2. Try the Communication tools</p>
                  <p className="text-xs text-green-700 mt-1">Analyze tone and format messages</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-2xl">
                  <p className="text-sm font-semibold text-purple-900">3. Create your first task</p>
                  <p className="text-xs text-purple-700 mt-1">Stay organized with energy-aware planning</p>
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

