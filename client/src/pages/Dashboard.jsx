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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs />
      
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.username}! 👋
        </h1>
        <p className="text-lg text-gray-600">Choose a tool to get started with your day</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {tools.map((tool) => (
          <Link 
            key={tool.path}
            to={tool.path} 
            className="group block transform hover:scale-105 transition-all duration-200"
          >
            <Card className="h-full hover:shadow-xl border-2 border-transparent group-hover:border-blue-300 transition-all">
              <div className="text-center">
                <div className={`w-20 h-20 bg-gradient-to-br ${tool.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-shadow`}>
                  <span className="text-4xl">{tool.icon}</span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {tool.title}
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {tool.description}
                </p>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card title="💡 Quick Tips">
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-blue-500 font-bold">→</span>
              <span className="text-gray-700">Use the accessibility toolbar to customize your experience</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-500 font-bold">→</span>
              <span className="text-gray-700">All your data is saved automatically</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-500 font-bold">→</span>
              <span className="text-gray-700">Try different reading levels in the Learning section</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-500 font-bold">→</span>
              <span className="text-gray-700">Practice conversations in various scenarios</span>
            </li>
          </ul>
        </Card>

        <Card title="🎯 Getting Started">
          <div className="space-y-3">
            <p className="text-gray-700">New to DivergeX? Here's what you can do:</p>
            <div className="space-y-2">
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm font-medium text-blue-900">1. Customize your settings</p>
                <p className="text-xs text-blue-700">Adjust fonts, colors, and accessibility options</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-sm font-medium text-green-900">2. Try the Communication tools</p>
                <p className="text-xs text-green-700">Analyze tone and format messages</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <p className="text-sm font-medium text-purple-900">3. Create your first task</p>
                <p className="text-xs text-purple-700">Stay organized with energy-aware planning</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

