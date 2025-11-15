import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import Button from '../components/shared/Button';

const Home = () => {
  const { isAuthenticated } = useAuthStore();

  const features = [
    {
      icon: '💬',
      title: 'Communication Tools',
      description: 'Analyze tone, format messages, and practice conversations with AI-powered assistance.',
      gradient: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      icon: '📚',
      title: 'Learning Assistance',
      description: 'Simplify complex text, generate visual summaries, and adapt content to your reading level.',
      gradient: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      icon: '📅',
      title: 'Planning & Organization',
      description: 'Manage tasks, build timelines, and access executive function tools designed for your needs.',
      gradient: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center">
          <div className="inline-block mb-6 px-4 py-2 bg-blue-100 rounded-full">
            <span className="text-blue-800 font-semibold text-sm">✨ AI-Powered Assistive Platform</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Welcome to <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">DivergeX</span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-700 mb-10 max-w-3xl mx-auto leading-relaxed">
            An assistive platform designed for <strong>neurodivergent individuals</strong>.
            Enhance communication, simplify learning, and organize your life with tools built for you.
          </p>
          
          {!isAuthenticated && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/register">
                <Button size="lg" className="w-full sm:w-auto min-w-[200px] shadow-lg hover:shadow-xl">
                  🚀 Get Started Free
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg" className="w-full sm:w-auto min-w-[200px]">
                  🔑 Login
                </Button>
              </Link>
            </div>
          )}
          
          {isAuthenticated && (
            <Link to="/dashboard">
              <Button size="lg" className="shadow-lg hover:shadow-xl">
                📊 Go to Dashboard
              </Button>
            </Link>
          )}
        </div>

        {/* Features Grid */}
        <div className="mt-24 grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`${feature.bgColor} p-8 rounded-2xl border-2 ${feature.borderColor} hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2`}
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                <span className="text-4xl">{feature.icon}</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Accessibility Section */}
        <div className="mt-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-10 shadow-2xl text-white">
          <div className="text-center">
            <div className="text-5xl mb-4">♿</div>
            <h2 className="text-4xl font-bold mb-4">
              Accessibility First
            </h2>
            <p className="text-xl text-blue-50 max-w-3xl mx-auto leading-relaxed mb-6">
              DivergeX is built with WCAG 2.1 AA compliance and neurodiversity-focused design.
              Customize themes, fonts, motion, and more to create your perfect experience.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                <span className="font-semibold">🎨 Custom Themes</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                <span className="font-semibold">📝 Dyslexia-Friendly Fonts</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                <span className="font-semibold">🎬 Reduced Motion</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                <span className="font-semibold">🔊 Screen Reader Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        {!isAuthenticated && (
          <div className="mt-24 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to get started?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join DivergeX today and experience tools designed with you in mind.
            </p>
            <Link to="/register">
              <Button size="lg" className="shadow-lg hover:shadow-xl">
                Create Your Free Account →
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

